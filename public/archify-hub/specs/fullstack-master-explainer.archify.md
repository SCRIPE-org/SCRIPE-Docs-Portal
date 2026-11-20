# How do SCRIPE-Frontend and SCRIPE-Backend unite into a zero-trust operating system? {#scripe-fullstack-ssot}

SCRIPE v6.0 pairs a **5-layer MVVM Next.js 16 portal** with an **18-module .NET 10 modular monolith** governed by `scripe-cli`.[](source:agents_constitution)

- Frontend features live in isolated sub-modules following `View -> ViewModel -> Repository -> Service -> IApiService` with co-located EN/AR locales.[](source:agents_frontend)
- Every API request clears a 29-stage security pipeline and a 6-behavior AstraFlow mediator before returning `Result<T>`.[](source:agents_backend)
- `BaseDbContext` atomically commits tenant-filtered rows, `idempotency_receipts`, and `outbox_messages` across PostgreSQL, SQL Server, and Oracle.[](source:agents_persistence)
- `scripe-cli` enforces boundary checks (`scripe arch-check`), locale parity (`scripe validate-locales`), and 11-point UAT readiness.[](source:uat_protocol)

@answer scope="Next.js 16 + React 19 · .NET 10 + AstraFlow 2.3.0 · 18 Backend Modules · 65+ Frontend Sub-Modules · 193 CLI Commands"
@meta locale=en style=editorial quality_profile=showcase repo_url=https://github.com/SCRIPE-org/SCRIPE.git repo_revision=ffc972a40a448abee3f41b394bd3e823457fc346
@source agents_constitution title="SCRIPE v6.0 Universal Constitution" path=AGENTS.md lines=15:64
@source agents_backend title="Backend Clean Architecture & AstraFlow Invariants" path=AGENTS.md lines=68:94
@source agents_frontend title="Frontend 5-Layer MVVM, Nexus UI & Bilingual Laws" path=AGENTS.md lines=95:130
@source agents_persistence title="5-Layer Security & Multi-Tenant Persistence" path=AGENTS.md lines=131:156
@source astraflow_lock title="AstraFlow 15-Package Total Ecosystem Lock" path=.agents/rules/astraflow-ecosystem-and-evolution.md lines=13:56
@source uat_protocol title="Permanent 11-Point UAT & Seeding Protocol" path=.agents/rules/uat-readiness-and-seeding.md lines=14:118

## How does a user action travel from a React 19 View to Dual-Mode persistence? {#fullstack-topology}

@diagram architecture id=fullstack-arch source=fullstack-architecture.architecture.json title="SCRIPE v6.0 End-to-End Full-Stack Topology"

@steps id=fullstack-tour
| st_edge |Edge & RouteGuard| Next.js `proxy.ts` checks auth cookies at the edge; `RouteGuard` verifies `PAGE_PERMISSIONS` and Edition entitlements. | fullstack-arch | edge_guard |
| st_mvvm |5-Layer MVVM UI & Data| Views compose `@core/ui` primitives and bind to ViewModels (`useCrudViewModel`) that call Repositories and Services. | fullstack-arch | mvvm_data |
| st_api |Single-Flight ApiService| Injects Bearer JWT, `X-Tenant-Id`, and `X-Idempotency-Key`, queuing concurrent 401 responses behind a single refresh mutex. | fullstack-arch | api_service |
| st_sec |29-Stage Security Gate| Enforces rate limits, Redis JWT revocation checks, CSRF tokens, replay nonces, and PBAC authorization. | fullstack-arch | http_security |
| st_af |AstraFlow 2.3.0 Pipeline| Dispatches `ICommand<T>` through Logging, Validation, 3-TX Idempotency, Caching, and compile-time `[AstraGenerateMapping]`. | fullstack-arch | astraflow_bus |
| st_db |BaseDbContext & Outbox| Commits schema-isolated rows and `outbox_messages` in one ACID transaction; `OutboxProcessor` broadcasts SignalR updates. | fullstack-arch | base_db |

## How do the 5 frontend MVVM layers and 3 backend transactions coordinate a mutation? {#fullstack-sequence}

@sequence id=e2e-booking-seq title="End-to-End Reservation Confirmation & Single-Flight 401 Recovery"
| actor view | BookingWorkspaceView | frontend | source:agents_frontend |
| actor vm | ViewModel + Repo | frontend | source:agents_frontend |
| actor api | ApiService (401 Mutex) | frontend | source:agents_frontend |
| actor mw | 29-Stage Pipeline | security | source:agents_persistence |
| actor af | AstraFlow + 3-TX Idem | backend | source:astraflow_lock |
| actor db | BaseDbContext + Outbox | database | source:agents_backend |
| phase | 1. Frontend 5-Layer MVVM Dispatch & 401 Mutex |
| view | vm | confirmReservation(slotId, quoteId) | emphasis |
| vm | api | BookingRepository.create() -> Service.post() | emphasis |
| api | mw | POST /api/v1/venue/reservations (X-Idempotency-Key) | security |
| phase | 2. Backend 3-Transaction Idempotency & Atomic Outbox |
| mw | af | PBAC + Replay Verified -> ISender.Send(Command) | emphasis |
| af | db | TX 1: INSERT Reserved Receipt (2m Lease) | security |
| db | af | Claim Committed | return |
| af | db | TX 2: Save Reservation + AuditLog + outbox_messages | emphasis |
| af | db | TX 3: UPDATE Receipt Completed (AES-GCM Envelope) | security |
| af | api | 200 OK Result<ReservationResponse> | return |
| phase | 3. Cache Invalidation & Real-Time SignalR Broadcast |
| api | vm | Unwrap Result<T> -> Map Domain Entity | return |
| vm | view | Invalidate TanStack Query + Semantic Toast | return |
| db | view | OutboxProcessor -> SignalR Live Calendar Sync | dashed |

@callout level=note title="Why pair client X-Idempotency-Key headers with backend 3-TX receipts?"
When `ApiService` replays a mutating call after a single-flight `401` refresh, it reuses the same `X-Idempotency-Key`. `IdempotencyBehavior` returns the sealed `Result<T>` receipt instead of double-booking.[](source:agents_backend)

## How are architectural invariants enforced symmetrically across the monorepo? {#symmetry-matrix}

| Architectural Dimension | SCRIPE-Frontend (`Next.js 16 + React 19`) | SCRIPE-Backend (`.NET 10 + AstraFlow 2.3.0`) | Verification Gate (`scripe-cli`) |
| --- | --- | --- | --- |
| Layer Boundaries {#row-layers} | `View -> ViewModel -> Repository -> Service -> IApiService` {good:Zero fetch in hooks} | `Controller -> AstraFlow -> Application -> Domain <- Infrastructure` {good:3 projects/module} | `scripe arch-check` (0 boundary errors) |
| Business Error Contract {#row-result} | Envelope unwrap + typed `ApiError` + localized toast | `Result<T>` & `Error` structs {good:Zero business exceptions} | Static analyzers & unit test suite |
| Multi-Tenant Isolation {#row-tenant} | `useAppStore` active tenant + `X-Tenant-Id` header | `TenantResolutionMiddleware` + expression-tree `TenantId` filter {good:Zero cross-tenant leak} | Multi-tenant security integration tests |
| Authorization (PBAC) {#row-pbac} | Edge `proxy.ts` + `RouteGuard` + `PermissionGate` | `[PermissionRequired]` + `PermissionAuthorizationHandler` {good:RBAC+GBAC+ABAC} | `PermissionSeeder` & UAT role matrix |
| Design & Localization {#row-i18n} | 100% `@core/ui` primitives + Nexus tokens + EN/AR locales {good:Zero inline ternaries} | Bilingual entity columns (`NameEn`/`NameAr`) + `Accept-Language` | `scripe validate-locales` (100% EN/AR parity) |

## How is the SCRIPE monorepo structured across its five operational pillars? {#monorepo-tree}

@tree id=monorepo-hierarchy title="SCRIPE v6.0 Monorepo & Pillar Decomposition"
| root | SCRIPE Monorepo (v6.0) | - |
| be | SCRIPE-Backend (.NET 10) | root |
| fe | SCRIPE-Frontend (Next.js 16) | root |
| docs | SCRIPE-Docs-Portal (:3002) | root |
| cli | SCRIPE-Dev-Tools (scripe-cli) | root |
| be_host | Host API & 29-Stage Pipeline | be |
| be_core | Core (AstraFlow 2.3.0 + BaseDbContext) | be |
| be_mods | 18 Isolated 3-Project Modules | be |
| fe_core | Core UI + CRUD Engine + ApiService | fe |
| fe_mods | 65+ MVVM Sub-Modules + EN/AR Locales | fe |
| docs_arch | /archify Integrated SSOT Mode (23 Pages) | docs |
| docs_und | /understand + /technical + /commercial | docs |
| cli_cmds | 193 Commands (scaffold, db, check) | cli |

@facts id=platform-scale-facts
| Backend Domain Modules | 18 isolated modules (54 Clean Architecture projects) with per-module schemas |
| AstraFlow CQRS Ecosystem | 15 in-house packages at v2.3.0 powering 927+ request/event handlers |
| Frontend Sub-Modules | 65+ isolated MVVM sub-modules with shared UI primitives and EN/AR parity |
| Database Agnosticism | Dual-Mode (Single-DB or Multi-DB) across PostgreSQL, SQL Server, and Oracle |
| Universal Verification Gate | scripe check + 11-Point UAT Readiness & Seeding Protocol |

## What does the universal constitution mandate in code? {#constitution-code}

@code source=agents_backend language=markdown

@code source=agents_frontend language=markdown
