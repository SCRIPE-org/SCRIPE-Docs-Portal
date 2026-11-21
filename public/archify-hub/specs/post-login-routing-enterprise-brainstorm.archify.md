# What changed to finalize SCRIPE Admin post-login routing and `/hub` Personal Home? {#post-login-routing-enterprise-brainstorm}

Five fresh-context reviewers and Founder refinements locked **single-pass `GET /menus/navigation` landing resolution**, **`NexusLayout`-unified `/hub`**, and **independent `WorkManagement` security fixes**.[](source:be_nav) Authorized deep links outrank enforced role landing without altering `Role.Priority` ceilings, while `IsSystem` menu slugs stay locked.[](source:be_role_graph) Zero-loop error recovery, empirically measured SQL counts, and phased `WorkItems` widget deferral complete the build specification.[](source:fe_nav)

- Auth handlers stay lean and return `"/"`; `PasswordlessSessionIssuer` gains `ISubscriptionStatusProvider`, and `RefreshToken` skips routing.[](source:be_ext_auth)
- Removing `/my-subscription` and `/my-plan` from `Workspace("admin")` fixes ghost Admin tiles, rail pins, and single-module auto-launch.[](source:be_my_acct)
- Setting `rootMenuItems = []` when `activeWorkspaceKey === null` lets `/hub` live inside `NexusLayout` cleanly.[](source:fe_ws_prov)
- System slug locks, custom slug cascades, Oracle UTF-8 byte checks, `WorkManagement` fixes, and SQL counter benchmarks harden rollout.[](source:be_work)

@answer scope="SCRIPE Admin Routing · Approved Final Spec"
@meta locale=en style=editorial quality_profile=showcase
@source be_nav title="GetAuthorizedNavigationQueryHandler.cs & Workspaces.cs" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Queries/Menu/GetAuthorizedNavigationQueryHandler.cs
@source be_ext_auth title="ExternalAdminSessionService.cs & PasswordlessSessionIssuer.cs" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Services/ExternalAdminSessionService.cs
@source be_feat title="FeatureChecker.cs (ResolveValueAsync negative-cache miss)" path=SCRIPE-Backend/src/Modules/Entitlements/Entitlements.Infrastructure/Services/FeatureChecker.cs
@source be_role_graph title="AdminRepository.RoleGraph.cs & Role.cs" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/Repositories/AdminRepository.RoleGraph.cs
@source be_pref_cfg title="AdminPreferenceConfiguration.cs (Oracle identity schema)" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/Configurations/AdminPreferenceConfiguration.cs
@source be_my_acct title="IdentityMenuProvider.MyAccountGroup.cs" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Providers/IdentityMenuProvider.MyAccountGroup.cs
@source be_acct_act title="GetAccountActivityQueryHandler.cs (SecurityEventTypes)" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Queries/Account/GetAccountActivityQueryHandler.cs
@source be_work title="WorkItemsController.cs & WorkItemQueries.cs (WM-1 to WM-4)" path=SCRIPE-Backend/src/Host/API/Controllers/WorkManagement/WorkItemsController.cs
@source fe_nav title="NavigationProvider (navigation-provider.tsx)" path=SCRIPE-Frontend/src/core/providers/navigation-provider.tsx
@source fe_nexus title="NexusLayout (nexus-layout.tsx)" path=SCRIPE-Frontend/src/core/ui/layout/nexus/nexus-layout.tsx
@source fe_ws_prov title="WorkspaceProvider (workspace-provider.tsx)" path=SCRIPE-Frontend/src/core/providers/workspace-provider.tsx
@source fe_hub title="WorkspaceHubView.tsx & NexusSearchPalette.tsx" path=SCRIPE-Frontend/src/modules/shared/home/presentation/views/WorkspaceHubView.tsx

## How does the 6-tier precedence cascade and single bootstrap work? {#bootstrap-resolution-flow}

Computing landing inside `GET /menus/navigation` reuses one `IMenuAccessEvaluator` pass while `/` resolves Tier 1 deep links before Tier 2.[](source:be_nav)

@workflow id=bootstrap-landing-flow title="Locked 6-Tier Admin Landing & Single-Pass Bootstrap Flow"
| lane auth_lane | 1. Lean Auth |
| lane boot_lane | 2. Single Bootstrap |
| lane shell_lane | 3. Frame-1 Shell |
| any_auth | Any Admin Auth | security | auth_lane |
| gate_chk | Password / Billing? | security | auth_lane |
| nav_boot | GET /menus/navigation | backend | boot_lane |
| resolve_ld | LandingResolution | backend | boot_lane |
| open_ws | Deep Link / Workspace | frontend | shell_lane |
| open_hub | Personal Home /hub | frontend | shell_lane |
| any_auth > gate_chk | token minted |
| gate_chk > nav_boot | clear via / | emphasis |
| nav_boot > resolve_ld | 1 eval pass |
| resolve_ld > open_ws | redirect/1-mod | emphasis |
| resolve_ld > open_hub | 2+ or hub |

@steps id=bootstrap-steps
| bs_auth | Any Admin Auth | Password, 2FA, OIDC/SAML (`ExternalAdminSessionService`), Magic Link, Passkey, OTP, QR, and Impersonation mint tokens and return `"/"`; `RefreshToken` skips routing. | bootstrap-landing-flow | any_auth |
| bs_gate | Password / Billing? | Tier 0 gates (`MustChangePassword`, `PendingPayment`) run first across all channels including `PasswordlessSessionIssuer`; remove `localStorage.defaultRedirectPath`. | bootstrap-landing-flow | gate_chk |
| bs_nav | GET /menus/navigation | Returns `AuthorizedRoutes`, `WorkspaceRouteMap`, `RouteDescriptors`, `WorkspaceGroups` (with `EffectiveHomeRoute`), hydrated target menus, and `LandingResolution`; 500/429 renders `NavigationErrorRecovery`. | bootstrap-landing-flow | nav_boot |
| bs_res | LandingResolution | Preserves global `Role.Priority`; exempts Super Admins; resolves `IsLandingEnforced` (Tier 2), context `AdminPreference` (Tier 3), Role/Super default (Tier 4), and cardinality (Tier 5). | bootstrap-landing-flow | resolve_ld |
| bs_ws | Deep Link / Workspace | Entry route `/` checks authorized Tier 1 `?redirect=` ahead of Tier 2 enforcement, then paints hydrated `--workspace-hue` on frame 1 without JIT delay. | bootstrap-landing-flow | open_ws |
| bs_hub | Personal Home /hub | Renders inside `NexusLayout` with `activeWorkspaceKey === null` (`rootMenuItems = []`), collapsing the secondary rail while keeping Primary Rail, Topbar, and Tenant Switcher. | bootstrap-landing-flow | open_hub |

## Which review findings and refinements locked the final architecture? {#arbitrated-decision-log}

Every finding from the 5-lens review, the 5 Founder refinements, and the independent `WorkManagement` security audit is resolved below.[](source:be_feat)

| Reviewer Objection & Refinement | Root Code Evidence | Locked Resolution |
| --- | --- | --- |
| **3x Evaluator Storm & Auth Drift** {#dl-boot} | Login + `/routes` + `/navigation` runs `31-44` queries; OIDC/SAML use `ExternalAdminSessionService`.[](source:be_ext_auth) | Single coalesced `GET /menus/navigation` bootstrap; `PasswordlessSessionIssuer` gets billing status; exclude `RefreshToken` {good:Approved} |
| **Tier 1 Deep Link vs. `IsLandingEnforced`** {#dl-deep} | Hard landing enforcement must govern startup preferences, not legitimate `?redirect=` links. | Authorize `?redirect=` at Tier 1 ahead of Tier 2 `IsLandingEnforced`; unauthorized deep links fall back without loops {good:Approved} |
| **Preserve `Role.Priority` & Super Admins** {#dl-prio} | 18 security ceilings use `0 = highest` while `AdminSecurityService` sorts descending.[](source:be_role_graph) | Keep global `Role.Priority` untouched; exempt Super Admins explicitly; scope by `EffectiveRoleCode` + 4-key ranker {good:Approved} |
| **Slug Mutability & Raw Route Rot** {#dl-slug} | `UpdateMenuItemCommandHandler.cs:70` mutates `Slug`; raw route strings break on refactors. | Lock `IsSystem` slugs; cascade custom renames to `Role.DefaultLandingTarget`; migrate retired slugs; lazy read fallback {good:Approved} |
| **Orphan `(hub)` Shell & Admin Contamination** {#dl-hub} | `/my-plan` inflates `Workspace("admin")`; `WorkspaceHubView` bounces 1-ws Admins; duplicate `<main>`.[](source:fe_hub) | Move `/my-plan` & `/my-subscription` out; move `/hub` into `(modules)`; set `rootMenuItems = []`; delete mount bounce {good:Approved} |
| **`WorkManagement` Audit (`WM-1`–`WM-4`)** {#dl-work} | `WorkItemQueries.cs` lacks `IRequireFeature` & tenant/`own` scope; Hub Tasks card deferred.[](source:be_work) | Fix `WM-1`–`WM-4` now in Task 1 (`WorkManagement.Enabled` + `"own"` scope + Location URI); defer Tasks widget to Phase 1b {good:Approved} |

## How do `/hub` widgets stay honest, fast, and impersonation-safe? {#hub-data-contracts}

Moving `/hub` into `DashboardLayout` fixes shell parity, while deferred queries protect `"per-user"` `100/min` limits and `LoginWelcomeLoader`.[](source:fe_nexus)

| Hub Surface | Backed Data Source | Guardrail & UX Correction |
| --- | --- | --- |
| **Workspace Launcher & Pins** {#hw-ws} | `useNavigationStore.workspaceGroups` + `AdminWorkspacePin` | Zero extra HTTP calls; precomputed `EffectiveHomeRoute`; use `router.push`; touch `pointer:coarse` pin buttons {good:Ready} |
| **Workspace & Menu Search** {#hw-srch} | `NexusSearchPalette` + `routeDescriptors` + JIT `workspaces` Map | Index unlocked workspaces in EN + AR + key; `<bdi>` mixed breadcrumbs; clear button on inline filter {good:Phase 1} |
| **Recent Workspaces** {#hw-rec} | `useNavigationStore` client list (last `4` per `contextKey`) | Strictly intersected with live unlocked `workspaceGroups`; cleared on logout; zero `AdminPreference` `RowVersion` churn {good:Zero DB Cost} |
| **Actionable Notifications** {#hw-notif} | `GET /api/v1/account/notifications` (unread/recent feed slice) | Deferred past welcome loader (`staleTime: 60s`, `retry: 0`); independent Retry state; suppressed while `isImpersonating` {good:Ready} |
| **Account & Sign-In Activity** {#hw-act} | `GET /api/v1/account/activity?pageSize=5` | Labeled honestly as **Account & Sign-In Activity** (18 security events, not bookings/leads); suppressed while `isImpersonating` {good:Phase 1} |
| **Pending Work Items** {#hw-work} | Deferred widget (`WM-1`–`WM-4` fixed immediately in Backend Task 1).[](source:be_work) | Security fixes ship in Phase 1; `/hub` Pending Work Items card deferred to Phase 1b {caution:Phase 1b} |

## What multi-DB, failure-recovery, and benchmark gates verify rollout? {#migration-sre-gates}

- Keep `AdminPreferenceConfiguration.cs` schema `"identity"` unchanged so Oracle does not generate destructive cross-schema `RenameTable` DDL.[](source:be_pref_cfg)
- Enforce ASCII structured targets, `.HasDefaultValue(false)` on `Role.IsLandingEnforced`, UTF-8 `<= 4000` bytes, and `SchemaVersion = 5`.
- Reject `UpdateAccountPreferences` and `ToggleWorkspacePin` writes during impersonation (`"imp"` claim) with `403`, and fix `FeatureChecker` cache thrashing.[](source:be_feat)
- Measure SQL command counts with `SqlCommandCounterInterceptor` in `API.IntegrationTests` (baseline vs. post-refactor) before claiming query reductions.
- Avoid retrying `401`/`403`/`429` in `NavigationProvider`, release the welcome curtain on `routesError`, and emit `LandingResolutionReason` metrics.
