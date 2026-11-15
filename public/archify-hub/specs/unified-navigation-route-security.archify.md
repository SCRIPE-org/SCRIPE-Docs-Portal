# How does SCRIPE unify context-aware navigation and fail-closed route security? {#unified-nav-security}

SCRIPE removes `SupportsTenantGuidance` and enforces **one backend-driven authorization contract** (`AuthorizedRouteDescriptor`) with a fail-closed `RouteGuard` and inline shell context gates.[](source:route_guard)[](source:menu_evaluator)

- Every protected route is inventoried in `APP_ROUTE_MANIFEST` (`192` App Router pages) with zero `SYSTEM_PAGES` or module prefix bypasses.[](source:manifest)
- `MenuAccessEvaluator` evaluates workspace, ancestor chain, PBAC, `RoleMenuItem`, context flags, and features identically for navigation trees and routes.[](source:menu_evaluator)
- When a valid user lacks an active tenant or platform context, `RouteGuard` mounts a reusable shell gate inside `DashboardLayout` instead of the page.[](source:context_gates)
- Backend APIs block cross-tenant dashboard MRR leaks, `null == null` webhook IDORs, `system_settings` escalation, and unauthenticated workspace enumeration.[](source:sec_handlers)

@answer scope="Option C · .NET 10 AstraFlow Backend · Next.js 16 Frontend · 192 App Routes · Verified EN/AR & Dark/Light"
@meta locale=en style=editorial quality_profile=showcase
@source manifest title="Authoritative App Route Manifest (192 routes)" path=SCRIPE-Frontend/src/core/config/app-route-manifest.ts
@source route_guard title="Fail-Closed RouteGuard & Zero-Flash Transition Gate" path=SCRIPE-Frontend/src/core/providers/route-guard.tsx
@source context_gates title="Reusable Shell Context & Entitlement Gates" path=SCRIPE-Frontend/src/core/components/tenant-context/index.ts
@source menu_evaluator title="Unified Menu, Workspace & Route Access Evaluator" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Queries/Menu/MenuAccessEvaluator.cs
@source sec_handlers title="Backend Endpoint & Context Security Hardening" path=SCRIPE-Backend/src/Host/API/Middleware/TenantContextMiddleware.cs
@source dev_seeder title="Idempotent Dev OperationalScopeGrant Seeder" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/IdentityDevDataSeeder.OperationalScopeGrants.cs

## What connects the Next.js RouteGuard and .NET MenuAccessEvaluator? {#system-topology}

@architecture id=option-c-arch title="SCRIPE Unified Context-Aware Navigation & Route Security Architecture"
| proxy | Next.js Proxy | frontend | source:manifest |
| guard | RouteGuard | security | source:route_guard |
| manifest | Route Manifest | frontend | source:manifest |
| gates | Shell Gates | frontend | source:context_gates |
| switcher | Context Switcher | frontend | source:context_gates |
| nav_api | Menus API | backend | source:menu_evaluator |
| tenants_api | Tenants Switchable | backend | source:sec_handlers |
| evaluator | MenuAccessEvaluator | security | source:menu_evaluator |
| middleware | TenantMiddleware | security | source:sec_handlers |
| proxy > guard | Cookie gate | security |
| guard > manifest | Match binding | |
| guard > nav_api | Load descriptors | security |
| nav_api > evaluator | Evaluate rules | |
| guard > gates | Mount gate | |
| gates > switcher | Pick tenant | |
| switcher > tenants_api | List eligible | |
| switcher > middleware | Set context | emphasis |

@steps id=arch-walkthrough
| step_proxy | Next.js Proxy | Enforces `scr_auth_state` on manifest-protected paths at SSR while passing public and unknown 404 routes through. | option-c-arch | proxy |
| step_manifest | Route Manifest | `APP_ROUTE_MANIFEST` and fail-closed `PAGE_PERMISSIONS` replace `SYSTEM_PAGES` with a 192-route parity test. | option-c-arch | manifest |
| step_evaluator | MenuAccessEvaluator | Computes `AccessState` (`authorized`, `tenant_context_required`, `platform_context_required`, `feature_disabled`) without DB schema changes. | option-c-arch | evaluator |
| step_gates | Shell Gates | Renders `TenantContextRequiredGate`, `FeatureUnavailableGate`, or `PlatformContextRequiredGate` before page children mount. | option-c-arch | gates |
| step_switcher | Context Switcher | Loads `tenants.drill_down` and `identity_context.switch` candidates inline and re-validates without `/tenants` detours. | option-c-arch | switcher |

## How does direct URL access resolve across states? {#direct-url-flow}

@workflow id=url-resolution-flow title="RouteGuard Direct URL Decision Flow"
| lane intake | Intake & Auth |
| lane gates | Policy, Context & Render |
| url_in | URL Request | frontend | intake |
| norm_check | Public or 404? | security | intake |
| auth_check | Valid Auth? | security | intake |
| redirect_login | /login?redirect | security | intake |
| pbac_check | PBAC & Sync? | security | gates |
| deny_403 | /not-authorized | security | gates |
| ctx_check | Context & Feature? | security | gates |
| show_ctx_gate | Shell Gate | security | gates |
| render_page | Render Page | frontend | gates |
| url_in > norm_check | |
| norm_check > render_page | public |
| norm_check > auth_check | protected |
| auth_check > redirect_login | no | security |
| auth_check > pbac_check | yes |
| pbac_check > deny_403 | no | security |
| pbac_check > ctx_check | yes |
| ctx_check > show_ctx_gate | missing |
| ctx_check > render_page | ok | emphasis |

@steps id=url-steps
| step_known | Public or 404? | Public routes load cleanly, and unknown paths pass through to `not-found.tsx` without redirect leaks. | url-resolution-flow | norm_check |
| step_auth | Valid Auth? | Unauthenticated requests redirect to `/login?redirect=safe` with XSS/backslash validation in `proxy.ts` and `RouteGuard`. | url-resolution-flow | auth_check |
| step_pbac | PBAC & Sync? | Holds spinner until `routesContextKey` syncs, then runs fail-closed `canAccessPage` and `AuthorizedRouteDescriptor` checks. | url-resolution-flow | pbac_check |
| step_ctx | Context & Feature? | Intercepts missing tenant/platform context or disabled features in `DashboardLayout` without mounting page children. | url-resolution-flow | ctx_check |

## What changed from legacy guards to Option C? {#before-after}

| Dimension | Before Option C | After Option C |
| --- | --- | --- |
| `SupportsTenantGuidance` DB & DTOs | Extra DB column and 6 migrations {bad:Removed} | Zero new columns; reuses `RequiresTenantContext` {good:Consolidated} |
| `SYSTEM_PAGES` & `/crm` | 21 prefixes bypassed PBAC and features {bad:Critical bypass} | Removed; explicit `shell_authenticated` exact routes {good:Fail-closed} |
| `PAGE_PERMISSIONS` fallback | Returned `true` on `undefined` {bad:Default-allow} | Returns `false` + 192-route Vitest parity test {good:Default-deny} |
| `routeSlice` matching | Reverse prefix unlocked parent routes {bad:Privilege creep} | Canonical `menuRouteKey` descriptor lookup {good:Exact mapping} |
| Tenant switching UX | Hardcoded `/tenants` (`tenants.view`) {caution:Broken for restricted admin} | Inline shell `TenantContextRequiredGate` via `/tenants/switchable` {good:Contextual} |
| SSR & SPA transition | Rendered `{children}` before `useEffect` {bad:1-frame flash} | `useSyncExternalStore` + `targetKey` outcome gate {good:Zero flash} |
| Backend MRR & Webhooks | Unscoped subscriptions & `null == null` IDOR {bad:Data leak} | Strict tenant scoping & `IRequireFeature` parity {good:Tenant isolated} |

## How do route classification rules prevent bypasses? {#route-classification}

Every Next.js `page.tsx` template maps to exactly one manifest binding, keeping public routes minimal and module routes server-governed.[](source:manifest)

| Manifest Binding | Count | Included Routes | Enforcement Rule |
| --- | --- | --- | --- |
| `public` | `16` | Auth forms, callbacks, `/signup/finalize`, `/bookings/guest`, `/privacy`, `/terms`, `/not-authorized` | Anonymous allowed; `devOnly` entries blocked in prod |
| `shell_authenticated` | `17` | `/`, `/hub`, `/overview`, `/settings` exact, `/activate-workspace`, `/change-password`, `/account/*`, dev `/sileo-playground` | Authenticated session + fail-closed `PAGE_PERMISSIONS`; zero module prefixes |
| `menu_bound` | `159` | `/crm/**`, `/settings/*`, `/data-exchange/**`, `/venue/**`, `/analytics/**`, `/customization/**`, `/plugins/**`, previews | Requires auth, fail-closed PBAC, `AuthorizedRouteDescriptor`, and active context |

@callout id=cleanup-note level=note title="SupportsTenantGuidance & WIP Isolation"
All `24` modified backend files and `6` untracked migrations for `SupportsTenantGuidance` were reverted, `TENANT_SCOPED_GUIDANCE_PAGES` and `tenantGuidanceRoutes` were stripped from `10` frontend files with `NAV_STORE_VERSION = 3`, and all `48` unrelated frontend WIP files remain intact.

## How was end-to-end verification proven across stacks? {#verification-evidence}

After all final backend and frontend fixes, static gates, unit suites, database seeding, and `11` unmocked Playwright browser scenarios passed with `21` captured EN/AR and Dark/Light screenshots.[](source:dev_seeder)

@facts id=verification-facts
| Backend build & arch-check | `scripe build backend` `90/90` (`0` errors); `scripe arch-check` `95/100` (`0` errors, `134` repo warnings) |
| Backend unit tests (11 assemblies) | `3,614` passed, `0` failed, `39` Docker-DB skipped |
| Frontend static & build gates | `tsc` `0` errors, `oxlint` `0` errors, `validate-locales` `0` missing (`108` pairs), `next build` `202` routes |
| Frontend Vitest (`pnpm vitest run`) | `381/384` files passed (`3,296/3,301` tests); `3` pre-existing unrelated WIP failures reported separately |
| Live UAT DB & Playwright E2E | `19/19` PG migrations + `--dev` seed + `11/11` E2E scenarios PASS (`:5035` + `:3000` stopped cleanly) |

@callout id=residual-notes level=open-question title="Reported Non-Blocking Findings"
Three pre-existing unrelated frontend Vitest files fail on existing WIP (`optionSet.wiring.test.ts`, `VenueOverviewComponents.test.tsx`, `VenueOverviewView.test.tsx`). Minor polish items include the LTR route badge slash alignment in Arabic RTL views and adding `--no-build` to `scripe db seed`.

- [ ] Review pre-existing unrelated WIP failures before merging to `main` (`CustomFieldListView` and `VenueOverview` suites).
- [ ] Add `dir="ltr"` to the route badge pill on `TenantContextRequiredGate` for cleaner Arabic RTL alignment.
- [ ] Add optional `--no-build` flag support to `scripe db seed` in `SCRIPE-Dev-Tools`.
