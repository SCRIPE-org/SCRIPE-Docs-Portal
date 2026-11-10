# How is SCRIPE-Frontend architected for strict 5-layer SOLID MVVM and sub-module isolation? {#scripe-frontend-deep-dive}

SCRIPE-Frontend runs a **Next.js 16 + React 19 portal** where **65+ sub-modules** follow a strict **5-layer SOLID MVVM pipeline** with **Inversify DI** and **TanStack Query v5**.[](source:core_di)

- Every feature resides in an isolated sub-module (`src/modules/{workspace}/{sub-module}/`) containing `domain/`, `data/`, `presentation/`, and co-located `locales/`.[](source:booking_view)
- Presentation Views and ViewModels never import `IApiService` or wire DTOs; all traffic flows through `View -> ViewModel -> Repository -> Service -> IApiService`.[](source:booking_repo)
- `ApiService` automatically attaches `X-Tenant-Id` and `X-Idempotency-Key` headers and queues concurrent `401` responses behind a single refresh request.[](source:api_mutex)
- `useCrudViewModel` and `GenericCrudView` standardize pagination (`<= 100`), debounced search, and optimistic TanStack Query mutations across master-data modules.[](source:crud_vm)

@answer scope="Next.js 16 · React 19 Compiler · 65+ Sub-Modules · 5-Layer MVVM · TanStack Query v5 + Zustand"
@meta locale=en style=editorial quality_profile=showcase repo_url=https://github.com/SCRIPE-org/SCRIPE-Frontend.git repo_revision=f7d148d6630baadee15b5b41b1933cc4fdd9a75f
@source edge_proxy title="Next.js Edge Auth Proxy" path=src/proxy.ts lines=21:56
@source core_di title="Core Inversify DI Container" path=src/core/di.ts lines=1:55
@source api_headers title="ApiService Request Interceptor & Headers" path=src/core/services/api.service.ts lines=58:120
@source api_mutex title="Single-Flight 401 Token Refresh Queue" path=src/core/services/api.service.ts lines=200:310
@source crud_vm title="Generic useCrudViewModel Hook" path=src/core/crud/hooks/useCrudViewModel.ts lines=27:86
@source route_guard title="PBAC RouteGuard & Feature Entitlement Gate" path=src/core/providers/route-guard.tsx lines=1:100
@source booking_view title="BookingWorkspaceView (1. View Layer)" path=src/modules/venue/booking/src/presentation/views/BookingWorkspaceView.tsx lines=1:95
@source booking_vm title="useBookingWorkspaceViewModel (2. ViewModel Layer)" path=src/modules/venue/booking/src/presentation/viewmodels/useBookingWorkspaceViewModel.ts lines=1:95
@source booking_repo title="BookingRepository (3. Repository Layer)" path=src/modules/venue/booking/src/data/repositories/BookingRepository.ts lines=1:90
@source booking_svc title="BookingService (4. Data Service Layer)" path=src/modules/venue/booking/src/data/services/BookingService.ts lines=1:90

## How do the 5 MVVM layers, providers, and state stores connect across a feature sub-module? {#fe-topology}

@diagram architecture id=fe-arch source=frontend-architecture.architecture.json title="SCRIPE-Frontend 5-Layer MVVM & Provider Architecture"

@steps id=fe-mvvm-tour
| step_proxy |Edge & RouteGuard| `src/proxy.ts` verifies session cookies at the edge; `RouteGuard` enforces `PAGE_PERMISSIONS` and Edition feature entitlements. | fe-arch | route_guard |
| step_view |1. Feature View| Declarative React 19 UI built exclusively from `@core/ui` primitives, Nexus tokens, and `t("...")` locale keys. | fe-arch | feature_view |
| step_vm |2. ViewModel Hook| `useBookingWorkspaceViewModel` or `useCrudViewModel` manages local UI state and TanStack Query caches without touching HTTP. | fe-arch | viewmodel_hook |
| step_repo |3. Domain Repository| `BookingRepository` translates backend wire DTOs into clean frontend Domain Entities (`Booking`). | fe-arch | domain_repo |
| step_svc |4. Data Service| `BookingService` encapsulates versioned endpoint paths and delegates network calls to the injected `IApiService`. | fe-arch | data_service |
| step_api |5. ApiService Adapter| Attaches JWT, tenant, and idempotency headers, unwraps `Result<T>`, and coordinates single-flight 401 refreshes. | fe-arch | api_service |

## How does ApiService prevent 401 refresh storms during concurrent mutations? {#fe-sequence}

@sequence id=fe-mutex-seq title="5-Layer MVVM Mutation & Single-Flight 401 Refresh Mutex"
| actor view | BookingWorkspaceView | frontend | source:booking_view |
| actor vm | useBookingWorkspaceVM | frontend | source:booking_vm |
| actor repo | BookingRepo + Service | backend | source:booking_repo |
| actor api | ApiService (401 Mutex) | security | source:api_mutex |
| actor srv | SCRIPE-Backend API | external | source:api_headers |
| phase | 1. 5-Layer MVVM Dispatch & Expired Token Detection |
| view | vm | handleConfirmBooking(formValues) | emphasis |
| vm | repo | repository.create(payload) -> service.post() | emphasis |
| repo | api | apiService.post('/api/v1/venue/reservations') | emphasis |
| api | srv | POST (Expired 15m JWT + X-Idempotency-Key) | security |
| srv | api | 401 Unauthorized | return |
| phase | 2. Single-Flight Refresh Lock & Queue Replay |
| api | srv | Lock isRefreshing=true -> POST /api/v1/auth/refresh | security |
| srv | api | New 15m Access JWT + Rotated Cookie | return |
| api | srv | Drain failedQueue -> Replay POST (Same IdempotencyKey) | emphasis |
| srv | api | 200 OK Result<ReservationDto> | return |
| phase | 3. Domain Mapping & Optimistic Cache Invalidation |
| api | repo | Unwrap Result<T> Data | return |
| repo | vm | Map to Booking Domain Entity | return |
| vm | view | Invalidate TanStack Query + Toast Success | return |

@callout level=note title="Why is DTO-to-Entity mapping inside the Repository non-negotiable?"
Mapping DTOs inside `BookingRepository` ensures backend property renames or SecureId adjustments never leak into React components.[](source:booking_repo)

## When should a sub-module use GenericCrudView vs a Custom Domain Workspace? {#crud-matrix}

| Architectural Axis | Generic CRUD Engine (`useCrudViewModel`) | Custom Domain Workspace (`useWorkspaceViewModel`) |
| --- | --- | --- |
| Primary Use Case {#row-use} | Master-data tables, lookups, roles, pipeline configs {good:Rapid scaffolding} | Multi-pane resource calendars, pitch tactical boards, kanban pipelines |
| State & Query Hook {#row-hook} | `useCrudViewModel(repository, options)` with built-in debounce & pagination | Custom ViewModel hook composing `useGenericQuery` & `useGenericMutations` |
| UI Surface {#row-ui} | `GenericCrudView` composing `@core/ui/table`, `dialog`, `button`, `badge` | Custom views built 100% from `@core/ui` and Nexus CSS surface tokens |
| Real-Time Sync {#row-rt} | Automatic query invalidation on create/update/delete | Optimistic slot holds + live `SignalRProvider` event subscriptions |

## What do the Edge Proxy and generic CRUD ViewModel look like in code? {#fe-code}

@code source=edge_proxy language=typescript

@code source=crud_vm language=typescript
