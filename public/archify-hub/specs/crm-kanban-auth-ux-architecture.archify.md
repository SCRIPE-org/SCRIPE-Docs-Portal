# How does SCRIPE v4.0 unify Sovereign REST Endpoints, Principal Permanence, 4-Tier Dynamic Workflow Evaluation, and 12-Port Directed Studio Wiring? {#crm-kanban-auth-ux}

SCRIPE v4.0 eliminates colloquial first-person REST routes, repairs session refresh RBAC wiping, enforces a strict 4-tier dynamic workflow graph evaluator with zero hardcoded stage keys or linear `sortOrder` assumptions, locks all 12 React Flow Studio handles as directed sources with card-body drop resolution, upgrades Kanban drag-and-drop to zero-offset `DragOverlay` portals, and restructures 360 views under strict `<= 300`-line and 100% EN/AR parity invariants.[](source:endpoint_contract)

- All 12 first-person `me` / `my` / `myTenant` endpoint groups standardize on third-person, kebab-case sovereign REST naming (`/principal`, `/current`, `/current-tenant`, `/effective`, `/navigation`, `/self-service`) enforced in CI by `endpoint-casing-contract.test.ts`.[](source:endpoint_contract)
- `GET /api/v1/auth/admin/principal` and `RefreshTokenCommandHandler` re-prime `_permissionCache.PrimeCache` while `use-auth-refresh.ts` defensively preserves `roles` and `permissions`.[](source:auth_refresh)
- Both `UniversalWorkflowEngine` and `evaluateWorkflowTransition` execute strict 4-tier precedence without hardcoded stage-key hijacks or `sortOrder`-based rollback traps, computing `allowed_instant` vs. `allowed_screen_required` vs. `blocked` dynamically.[](source:kanban_core)
- `CrmStageFlowHandles`, `useCrmWorkflowCanvasGraph`, and `crmWorkflowStudioMappers` lock all 12 interactive ports to `type="source"`, capture `connectOriginRef`, resolve card-body drops via `onConnectEnd`, and preserve entity-scoped `promptFields` and `allowInboundFromAny`.[](source:studio_wiring)

@answer scope="Sovereign REST Endpoints · Principal Permanence · 4-Tier Dynamic Workflow Graph · 12-Port source-Locked Studio Wiring · @dnd-kit DragOverlay · 360 Progressive Disclosure"
@meta locale=en style=editorial quality_profile=showcase
@source endpoint_contract title="SCRIPE API Endpoint Casing & Sovereign Naming Contract" url=https://docs.scripe.org/architecture/endpoint-casing-contract
@source auth_refresh title="Principal Session Refresh & Permission Cache Priming" url=https://docs.scripe.org/security/principal-session-permanence
@source kanban_core title="Strict 4-Tier Dynamic Workflow Graph & GenericWorkflowKanban Auto-Drop" url=https://docs.scripe.org/crm/kanban-instant-autodrop
@source studio_wiring title="12-Port source-Locked React Flow Studio Wiring & Lossless Mappers" url=https://docs.scripe.org/crm/studio-directed-wiring
@source detail_360 title="CRM 360 Detail Pages Progressive Disclosure & Nexus Tokens" url=https://docs.scripe.org/crm/360-progressive-disclosure

## How does the Sovereign Enterprise Endpoint Naming Overhaul eliminate 404 drift and first-person routes? {#sovereign-endpoint-naming}

ASP.NET Core registers `SlugifyParameterTransformer` globally so every `[controller]` route token renders as lowercase kebab-case (for example `UserGroupsController` becomes `/api/v1/user-groups`), whereas ASP.NET route matching is case-insensitive only on exact hyphen placement.[](source:endpoint_contract) Colloquial first-person segments (`/me`, `/my*`, `myTenant`, `createForMyTenant`, `myChildren`, `my-tenant`) and un-hyphenated PascalCase segments (`UserGroups`) caused client/server contract drift. SCRIPE v4.0 replaces first-person routes with a third-person Sovereign Enterprise Principal vocabulary (`/principal`, `/effective`, `/navigation`, `/current`, `/current-tenant`, `/self-service`, `/sudo-verify` — eliminating colloquial `/me` and `/my-*` naming in favor of explicit scope nouns) across all 12 domain endpoint groups and pins the frontend endpoint registry in CI.

| Domain Group | Legacy Colloquial Route | Sovereign REST v4.0 Route | Finalized Backend CQRS & Frontend Contract Symbols |
| --- | --- | --- | --- |
| 1. Admin Principal Session {#row-ep-principal} | `/api/v1/auth/admin/me` | `/api/v1/auth/admin/principal` | BE `AdminAuthController.GetCurrentPrincipal`, `GetCurrentPrincipalQuery`, `GetCurrentPrincipalQueryHandler`, `admin:principal:` cache, `MustChangePasswordMiddleware`; FE `AUTH_CORE_ENDPOINTS.PRINCIPAL` & `authRepository.getCurrentPrincipal()` {good:Full-Stack Live} |
| 2. Navigation & Workspaces {#row-ep-menus} | `/api/v1/Menus/my`, `/my/workspaces`, `/my/workspaces/{key}/pin`, `/my/routes`, `/overrides/my` | `/api/v1/menus/navigation`, `/navigation/workspaces`, `/navigation/workspaces/{key}/pin`, `/navigation/routes`, `/navigation/overrides` | BE `MenusController`, `GetAuthorizedNavigationQuery`, `AuthorizedNavigationResponse`, `GetAuthorizedRoutesQuery`, `GetAuthorizedWorkspacesQuery`, `GetActiveMenuOverridesQuery`; FE `AuthorizedNavigationResponseDto` & `NAVIGATION_ENDPOINTS.MENUS.*` {good:Full-Stack Live} |
| 3. Effective Permissions {#row-ep-permissions} | `/api/v1/Permissions/my` | `/api/v1/permissions/effective` | BE `PermissionsController.GetEffectivePermissions`, `GetEffectivePermissionsQuery`; FE `IDENTITY_ENDPOINTS.PERMISSIONS.EFFECTIVE` & `PERMISSIONS_ENDPOINTS.EFFECTIVE` {good:Full-Stack Live} |
| 4. Self-Service User Identity {#row-ep-users} | `/api/v1/Users/me` | `/api/v1/users/current` | BE `UsersController.GetCurrentUser`, `GetCurrentUserQuery`; Sovereign Account profile reads `/api/v1/account/dossier` (`SovereignAccountRepository`) {good:Full-Stack Live} |
| 5. Biometric Sudo Step-Up {#row-ep-sudo} | `/api/v1/auth/me/sudo-verify` | `/api/v1/auth/passkeys/sudo-verify` | BE `PasskeyController.SudoVerify`, `BiometricSudoVerifyCommand`; FE `PROFILE_ENDPOINTS.SUDO_VERIFY` {good:Full-Stack Live} |
| 6. Tenant Admins {#row-ep-admins} | `/api/v1/Admins/myTenantAdmins`, `/createForMyTenant` | `/api/v1/admins/current-tenant` (`GET`, `POST`) | BE `AdminsController.GetCurrentTenantAdmins` / `CreateCurrentTenantAdmin`, `GetCurrentTenantAdminsQuery`; FE `IDENTITY_ENDPOINTS.ADMINS.CURRENT_TENANT` & `admin.endpoints.ts` {good:Full-Stack Live} |
| 7. Tenant Roles & Permissions {#row-ep-roles} | `/api/v1/Roles/myTenantRoles`, `/createForMyTenant`, `/myTenant/available-permissions*` | `/api/v1/roles/current-tenant`, `/current-tenant/available-permissions`, `/current-tenant/available-permissions/grouped` | BE `RolesController`, `GetCurrentTenantRolesQuery`, `GetCurrentTenantAvailablePermissionsQuery`; FE `ROLES_ENDPOINTS.*`, `getCurrentTenantRoles()` {good:Full-Stack Live} |
| 8. User Groups {#row-ep-groups} | `/api/v1/UserGroups/myTenantGroups`, `/createForMyTenant` | `/api/v1/user-groups/current-tenant` (`GET`, `POST`) | BE `UserGroupsController.GetCurrentTenantGroups`, `GetCurrentTenantUserGroupsQuery`; FE `IDENTITY_ENDPOINTS.USER_GROUPS.CURRENT_TENANT` & `user-groups.endpoints.ts` {good:Full-Stack Live} |
| 9. Tenant Hierarchy & Branding {#row-ep-tenants} | `/api/v1/Tenants/myChildren`, `/myTenantAndChildren`, `MY_SETTINGS`, `MY_BRANDING` | `/api/v1/tenants/current-tenant/children`, `/tenants/current-tenant/hierarchy`, `/customization/settings`, `/customization/branding` | BE `TenantsController`, `GetCurrentTenantChildrenQuery`, `GetCurrentTenantHierarchyQuery`; FE `TENANTS_ENDPOINTS.TENANTS.*` (`CURRENT_TENANT_CHILDREN`, `CURRENT_TENANT_HIERARCHY`, `CURRENT_BRANDING`) {good:Full-Stack Live} |
| 10. Tenant Subscriptions {#row-ep-subs} | `GET_MY_SUBSCRIPTION` (`/subscriptions/my-tenant`) | `/api/v1/subscriptions/current-tenant` | BE `CurrentTenantSubscriptionController`, `GetCurrentTenantSubscriptionQuery`; FE `SUBSCRIPTION_ENDPOINTS.CURRENT_TENANT` (`getCurrentTenantSubscription`) {good:Full-Stack Live} |
| 11. User Subscriptions {#row-ep-user-subs} | `/api/v1/user-subscriptions/me`, `/me/cancel` | `/api/v1/user-subscriptions/current`, `/current/cancel` | BE `UserSubscriptionsController`, `GetCurrentUserSubscriptionQuery`; FE `getCurrentSubscription()`, `useCurrentTenantSubscriptionViewModel`, `useCurrentSubscriberSubscriptionViewModel`, `CurrentTenantSubscriptionView` {good:Full-Stack Live} |
| 12. Compliance Consent & DSR {#row-ep-compliance} | `/api/v1/compliance/consent/me` | `/api/v1/compliance/consent/current`, `/api/v1/compliance/dsr/self-service` | BE `ComplianceConsentController.GetCurrentSubjectConsent` (`GetCurrentSubjectConsentQuery`) & `ComplianceDsrController.SubmitSelfServiceDsr`; FE `CONSENT_ENDPOINTS.CURRENT_CONSENT` {good:Full-Stack Live} |

@facts id=endpoint-contract-facts
| CI Contract Test | `SCRIPE-Frontend/src/core/config/api-endpoints/__tests__/endpoint-casing-contract.test.ts` (3/3 Vitest assertions passing) |
| Frontend Surface Guarded | All discovered `*.endpoints.ts` modules across core, shared, admin, billing, and CRM + `0` legacy `MyMenu*` / `useMySubscription*` / `MySubscriptionView` / `getMySubscription` symbols |
| Rule 1 — Controller Casing | Rejects multi-word PascalCase or camelCase first static segments (`/^[a-z0-9][A-Z]/`) so frontend paths never mismatch `SlugifyParameterTransformer` |
| Rule 2 — Sovereign Ban | Scans every template literal for `/me\b`, `/my\b`, `myTenant`, `createForMyTenant`, `myChildren`, `myTenantAndChildren`, and `my-tenant` |
| Full-Stack Cutover Status | Both Backend controllers/CQRS/middleware (`GetCurrentPrincipalQueryHandler`, `CurrentTenantSubscriptionController`, `MenusController`, `ComplianceConsentController`) and Frontend constants/ViewModels run 100% on sovereign REST naming |

@callout id=backend-cutover-note level=note title="Contract Allowlist & Middleware Enforcement"
`endpoint-casing-contract.test.ts` retains only one documented allowlist entry (`ThemeBundles`) for a not-yet-implemented backend controller so missing features remain explicit. On the backend, `MustChangePasswordMiddleware` explicitly whitelists `^/api/v\d+/auth/admin/principal$` alongside `change-password`, `refresh`, `logout`, and `revoke` while blocking all other routes with `403` until password rotation finishes.

## How does Principal Session Refresh guarantee RBAC permanence across token rotations? {#principal-session-permanence}

Previously, frontend auth refresh called `/account/dossier`, whose account dossier payload lacked full administrative `roles` and `inheritedPermissions` arrays, resetting Zustand RBAC state (`roles: []`) and triggering spurious 403/navigation lockouts. SCRIPE v4.0 binds auth hydration exclusively to `GET /api/v1/auth/admin/principal` (`AdminAuthController.GetCurrentPrincipal` -> `GetCurrentPrincipalQueryHandler`, cached under `admin:principal:{userId}:{tenantId}` and whitelisted in `MustChangePasswordMiddleware`), re-primes `_permissionCache.PrimeCache` on both principal reads and token rotations, and preserves existing RBAC arrays in `use-auth-refresh.ts`.[](source:auth_refresh)

@sequence id=principal-refresh-seq title="Legacy Dossier Wipe vs. Sovereign Principal & Token Rotation Flow"
| actor client | Guard & useAuthRefresh | frontend |
| actor store | Zustand useAppStore | frontend |
| actor api | AdminAuthController | backend |
| actor cache | IAdminPermissionCache | security |
| actor db | Identity Repo & UoW | database |
| phase | 1. Legacy Wipe Defect (Fixed) |
| client | api | GET /api/v1/account/dossier (missing Admin roles) | dashed |
| api | client | 200 OK Account Dossier without full Role/Permission graph | return |
| client | store | setAuth(user, perms, []) wipes client RBAC | dashed |
| phase | 2. Sovereign Principal Hydration (v4.0) |
| client | api | GET /api/v1/auth/admin/principal (authRepository.getCurrentPrincipal) | emphasis |
| api | db | GetCurrentPrincipalQueryHandler loads Admin + Roles |
| db | api | Admin entity with role assignments & tenant status | return |
| api | cache | _permissionCache.PrimeCache(adminId, roles, perms, restricted, scopes) | security |
| cache | api | 30s admin:principal IMemoryCache & PermCache Primed | return |
| api | client | 200 OK AdminResponse / AdminProfileDto (Roles + Permissions) | return |
| client | store | Guard !user.id; preserve roles & perms | emphasis |
| phase | 3. Refresh Token Rotation & Server Cache Re-Priming |
| client | api | POST /api/v1/auth/admin/refresh (RefreshToken) |
| api | db | CAS TryRevokeAsync + Rotate RefreshToken (reuse protection) | security |
| db | api | Token rotated + Admin entity loaded | return |
| api | cache | RefreshTokenCommandHandler calls _permissionCache.PrimeCache(...) | security |
| api | client | 200 OK TokenResponse (Lean JWT + embedded UserProfile) | return |

@steps id=principal-refresh-steps
| st_princ_call | Sovereign Principal Endpoint | `useAuthRefresh` and `route-guard.tsx` call `authRepository.getCurrentPrincipal()` (`AUTH_CORE_ENDPOINTS.PRINCIPAL`), whitelisted during `mcp=true` by `MustChangePasswordMiddleware`. | principal-refresh-seq | client |
| st_princ_prime | Server Cache Re-Priming | `GetCurrentPrincipalQueryHandler` caches under `admin:principal:{id}:{tenant}` (invalidated by `UpdateAccountDossierCommandHandler`) and calls `_permissionCache.PrimeCache(...)` for full `Permissions` and `RestrictedFields` parity. | principal-refresh-seq | cache |
| st_princ_guard | Defensive Client Hydration | If `!user?.id`, `setAuth` is skipped so malformed responses never clear auth state; if fresh arrays are empty, `use-auth-refresh.ts` retains `state.roles` and `state.permissions`. | principal-refresh-seq | store |
| st_princ_rotate | Token Rotation with UserProfile | `RefreshTokenCommandHandler` executes conditional atomic revocation (revoking all sessions on token reuse), re-primes `_permissionCache`, and embeds fresh `UserProfile` in `TokenResponse`. | principal-refresh-seq | api |

## How do Kanban DragOverlay portals and Strict 4-Tier Dynamic Workflow Graph Evaluation work together? {#kanban-drag-autodrop}

Ancestor containers with CSS `transform`, `filter`, or `overflow` break `@dnd-kit` drag coordinates by shifting the floating card away from the pointer. Simultaneously, legacy stage transition checks contained hardcoded target stage-key hijacks (`closed_won`, `discovery`, `Disqualified`, `Qualified`), linear `sortOrder` assumptions that misclassified unconnected edges as "Rollback" or blocked `* -> closed_lost` wildcards from higher-order custom stages, catch-block dialog fallbacks on backend rejections, and intermediate `SortOrder` exit-gate checks that ignored configured graph skip edges. SCRIPE v4.0 isolates `DragOverlay` in `document.body`, enforces pure 4-tier workflow graph precedence with lossless PostgreSQL hydration (`fetchPipelinesFromBackend`), and drives Kanban drops and `CrmWorkflowTransitionDialog` strictly from dynamic evaluation.[](source:kanban_core)

@architecture id=kanban-overlay-arch title="Jira-Grade @dnd-kit Portal Overlay & 3-State Drop Column Architecture"
| card | KanbanCard UI | frontend |
| sensor | PointerSensor (5px) | frontend |
| collision | pointerWithin Collision | frontend |
| portal | body DragOverlay | frontend |
| column | KanbanStageColumn Slot | frontend |
| engine | 4-Tier Workflow Engine | backend |
| card > sensor | pointer down |
| sensor > collision | track rect | emphasis |
| collision > portal | 0px ghost |
| collision > column | hover slot |
| column > engine | evaluate | security |

Cards strip native HTML5 `draggable` attributes so `@dnd-kit` owns every drag sequence, while `onPointerDown` `stopPropagation()` shields inner action buttons (`Link Organization`, `Convert to Deal`, and stage chevron steppers) from initiating accidental drags. During hover, `KanbanStageColumn` renders a dashed `kanban-drop-slot-${stageKey}` indicator (`data-drop-status`) driven solely by `evaluateWorkflowTransition`: Signal Lime (`border-nx-accent bg-nx-accent-wash`) for `allowed_instant`, Amber (`border-warning/60 bg-warning/10`) for `allowed_screen_required`, and Red (`border-destructive/60 bg-destructive/10`) for `blocked` — with backend catch handlers reverting optimistic moves cleanly instead of forcing popups.

@workflow id=kanban-autodrop-flow title="Strict 4-Tier Dynamic Workflow Graph Evaluation & 1-Gesture Drop"
| lane match | 1. 4-Tier Graph |
| lane gates | 2. Explicit Gates |
| lane outcome | 3. Drop Outcome |
| drop | Column Drop | frontend | match |
| resolve | 4-Tier Precedence | backend | match |
| rollback | Explicit Backward | security | gates |
| check | Dynamic Fields | backend | gates |
| blocked | Blocked Slot | frontend | outcome |
| instant | allowed_instant | frontend | outcome |
| modal | Screen Modal | frontend | outcome |
| drop > resolve | graph lookup |
| resolve > blocked | no edge | dashed |
| resolve > rollback | matched edge |
| rollback > blocked | locked or rule | dashed |
| rollback > check | permitted |
| check > instant | ready | emphasis |
| check > modal | input needed | security |

@steps id=kanban-autodrop-steps
| st_kb_match | Strict 4-Tier Precedence | Evaluates Tier 1 Direct `(from -> to)`, Tier 2 Outbound Wildcard `(from -> *)`, Tier 3 Global Inbound `(* -> to)`, Tier 4 Global Wildcard `(* -> *)` plus `allowInboundFromAny`; removes hardcoded stage-key hijacks in `crmWorkflowEngine.ts`, `useOpportunityViewModelHelpers.ts`, and `useLeadWorkflowActions.ts`. | kanban-autodrop-flow | resolve |
| st_kb_gate | Order-Agnostic Rollback & Rules | Emits order-agnostic blocked copy (`No transition is configured from ... to ...`); checks `isExplicitBackward` so `* -> lost` / `done` / `direction: "global"` edges skip `allowRollback` locks even when custom stages carry higher `sortOrder`; enforces `restrict.*` and Buying Committee rules. | kanban-autodrop-flow | rollback |
| st_kb_fields | Dynamic Field & Gate Evaluation | Frontend `isFieldSatisfiedOnRecord` and backend `ApplyAndSnapshotStageGateFieldsAsync` / `MoveOpportunityStageCommandHandler.GateValidation.cs` (`hasConfiguredTransitions`) validate `partyId`, `estimatedAmount`, `targetCloseDate`, `solutionFitConfirmed`, `primaryContactRole`, `qualificationNotes`, and `lossReasonCode` against configured target and active exit gates without scanning skipped intermediate `SortOrder` stages; `WorkflowPipelineMapper.RulesParsing.cs` and `UniversalWorkflowEngine.ValidateTransition.cs` evaluate financial forecast bounds independently. | kanban-autodrop-flow | check |
| st_kb_instant | Dynamic Screen vs. Instant Commit | `requiresScreen` computes purely from `unfulfilledFields`, `promptFields`, `promptForComment`, `requiresLossReason`, `requiresCloseNotes`, `requiresReopenReason`, `shouldTriggerDealConversion`, and `matchedTransitions.length > 1`; `CrmWorkflowTransitionDialog` + `deriveTransitionDialogFlags` + `CrmWorkflowTransitionDynamicFields` render `@core/ui/*` fields dynamically and commit ready moves in 1 gesture. | kanban-autodrop-flow | instant |

@callout id=workflow-sync-note level=note title="Lossless PostgreSQL Catalog & Store Hydration"
`crmWorkflowInitialCatalog.ts` aligns `wf-deal-default` transitions 1:1 with `CrmPipelineSeedCatalog.DefaultTransitions.cs` (9 canonical edges, zero phantom local-only transitions), `crmWorkflowsStoreHelpers.ts` strips hardcoded transition-ID `promptForComment` overrides while preserving empty parsed `transitions` arrays (`hasParsedTransitionsArray`), `useCrmWorkflowsStore` persists schema `version: 3`, and both `useOpportunityLifecycleActions.ts` and `LeadsView.tsx` invoke `fetchPipelinesFromBackend()` on mount so Kanban and 2D Studio always share live PostgreSQL graph state.

## How does the 12-Port source-Locked Directed React Flow Studio prevent wire reversal? {#studio-directed-wiring}

In `@xyflow/react` running with `ConnectionMode.Loose`, perimeter handles declared with `type="target"` (previously `top-1`, `bottom-1`, `bottom-2`, and `left-1..3` in `CrmStageFlowHandles`) caused React Flow to automatically swap `params.source` and `params.target` before invoking `onConnect`, opening `Create Workflow Transition` with inverted `From status` and `To status` (for example turning `Solution Fit -> Discovery` into `Discovery -> Solution Fit`). Meanwhile, storing `wireDraftSource` in React state forced `initialNodes` to re-render mid-drag, and dropping a wire anywhere onto a stage card body outside a 7px handle circle failed without an `onConnectEnd` pointer fallback.[](source:studio_wiring)

@architecture id=studio-12port-arch title="12-Port source-Locked Directed React Flow Wiring & Lossless Persistence"
| ports | 12 source Handles | frontend |
| companions | 12 target Anchors | frontend |
| originref | connectOriginRef Ref | frontend |
| connectend | onConnect / End Drop | frontend |
| mapper | Lossless Studio Mapper | frontend |
| api | CRM Pipeline API | backend |
| ports > originref | onConnectStart | emphasis |
| originref > connectend | enforce origin | security |
| companions > connectend | passive target | dashed |
| connectend > mapper | direction & ports | emphasis |
| mapper > api | PUT pipeline graph |

| Studio Component | Legacy Defect | v4.0 Directed Architecture | Guaranteed Invariant |
| --- | --- | --- | --- |
| Handle Topology (`CrmStageFlowHandles.tsx`) {#row-studio-handles} | Mixed `source`/`target` interactive handles caused `ConnectionMode.Loose` source/target swapping | All 12 interactive `PORT_DEFINITIONS` set `type="source"`; all 12 `BIDIRECTIONAL_COMPANION_HANDLES` render matching `type="target"` with `isConnectable={false}`, `pointerEvents: "none"`, `opacity: 0` | Dragging from any top/right/bottom/left port preserves exact user drag direction while persisted edges still render on `targetHandle` {good:12 Source Ports} |
| Gesture State & Card-Body Drop (`crmWorkflowConnectHelpers.ts`, `useCrmWorkflowCanvasGraph.ts`, `CrmWorkflowCanvas2D.tsx`) {#row-studio-drop} | `wireDraftSource` state triggered `setNodes` mid-drag; no `onConnectStart` or `onConnectEnd` fallback on card bodies | `connectOriginRef` + `didConnectInGestureRef` + `reactFlowConnectingRef` replace state churn; `resolveDirectedConnection` enforces origin in `onConnect`; `resolveConnectEndTarget` maps `screenToFlowPosition` via `resolveDropTargetAtPointer` & `chooseBestTargetPort` | Releasing on a handle port OR anywhere over `[data-stage-node-key]` opens the modal with `From status` = drag origin and `To status` = drop target {good:Zero Reversal} |
| Edge Routing & Lossless Mapper (`crmWorkflowEdgeBuilder.ts`, `crmWorkflowStudioMappers.ts`, `CrmTransitionFlowEdge.tsx`) {#row-studio-mappers} | Inline `isAr` ternaries; `promptFields: tr.requireNote ? ["qualificationNotes"] : []` stripped Deal fields (`lossReasonCode`, `closeNotes`) | `crmWorkflowEdgeBuilder.ts` computes RTL/LTR ports cleanly (`0` inline ternaries); `buildTransitionsFromWorkflow` & `serializeStudioDraftToWorkflow` preserve `promptFields`, `sourcePort`/`targetPort`, `allowInboundFromAny`, and `closeNotes` vs. `qualificationNotes` | Saving and publishing in 2D Studio never mutates non-note Deal rules or wildcard inbound stage flags {good:Lossless Round-Trip} |

## How do Deal, Lead, Account, and Contact 360 views achieve progressive disclosure under 300 lines? {#detail-360-progressive-disclosure}

CRM 360 entity pages suffered from monolithic vertical stacks, duplicate transition/conversion cards, missing quick actions, and noisy multi-currency badges. SCRIPE v4.0 refactors all four 360 entity workspaces into modular, `@core/ui/tabs`-organized views that stay strictly below the `<= 300`-line architecture ceiling, obey Nexus matte surface tokens (`--nx-surface`, `border-nx-line`, `shadow-none`), and achieve zero inline bilingual ternaries across `108` locale pairs (`18,040` keys).[](source:detail_360)

| Entity / Surface | Before v4.0 State | After v4.0 Architecture & Line Count | Measured UX & Architecture Gain |
| --- | --- | --- | --- |
| Deal 360 (`OpportunityDetailView.tsx`) {#row-360-deal} | 8-card 318-line vertical scroll with duplicate `deal-transition-audit-ledger` | 3 `@core/ui/tabs` (`overview`, `commercial`, `activity`, `forceMount`); `OpportunityDetailHeaderActions` (84 lines), `useOpportunityDetailStages` (96 lines), `OpportunityDetailDialogs` (132 lines), view `269` lines | Zero duplicate ledger, unconditional Rules of Hooks ordering, focal stage progression above the fold {good:269 lines} |
| Lead 360 (`LeadDetailView.tsx`) {#row-360-lead} | Competing duplicate conversion CTA inside `LeadDetailProfileCards` | Contextual header CTA (`Qualify Lead` or `Convert to Deal`) + tabbed `profile`, `linkage`, `activities` (`LeadDetailView` `296` lines; `LeadDetailProfileCards` `240` lines) | Single unambiguous primary conversion path per lead lifecycle status {good:296 lines} |
| Account 360 (`AccountDetailView.tsx`) {#row-360-account} | Missing quick activity logging & broken `/crm/opportunities/all` empty-state route | `Log Activity` header CTA (`/crm/activities?account=...`), extracted `AccountContactsCard` (84 lines), fixed `/crm/opportunities` CTA, localized `ar-SA` / `en-US` formatting (`255` lines) | Instant context-scoped activity capture and 0 broken empty-state navigation {good:255 lines} |
| Contact 360 (`ContactDetailView.tsx`) {#row-360-contact} | `ActivityTimeline` hidden unless `primaryAccountId` was populated | Unconditional `ActivityTimeline`, `Log Activity` header action, actionable empty-state CTAs, async `onSave` returning `Promise<void>` (`294` lines) | Full engagement visibility for standalone contacts {good:294 lines} |
| Kanban Cards & Smart Tip {#row-360-cards} | 3-line currency clutter (`Corp: ≈ USD ...`); dismissed Smart Tip reappeared on reload | Single primary + converted currency pill (`LeadsKanbanCardItem` `198` lines, `KanbanCard` `215` lines); `scripe_crm_tip_dismissed = "1"` in `localStorage` (`CrmShell` `222` lines, `CrmSmartTipRibbon` `64` lines) | Matte `shadow-none` cards + persistent dismissal with toolbar `Smart Guide` restore {good:Persistent UX} |

@facts id=crm-v4-verification-facts
| Locale & Architecture Gates | `scripe arch-check -m CRM --depth deep`: Backend `100/100`, Frontend `0` errors / `0` warnings; `scripe validate-locales`: `108` module pairs (`18,040` keys, `0` missing/undefined); `crmLocalizationAndArchGate.test.ts`: `7/7` passing |
| Frontend CRM Vitest Suites | `16/16` files / `112/112` tests passing across `src/modules/crm/{leads,opportunities,overview}` (`CrmWorkflowStudioDirectedWire`, `crmWorkflowEngine`, `crmStageExecution`, `leadStageExecution`) + `endpoint-casing-contract` & `use-auth-refresh` |
| Backend CRM Unit Suite | `CRM.Application.Tests`: `317/317` passing (`0` failed, `0` skipped), including 5 `CrmDynamicWorkflowParityTests` facts (`UniversalWorkflowEngine`, `MoveOpportunityStageCommandHandler.GateValidation`, `SolutionFitConfirmed`, granular financial rules) |
| Live E2E Certification Spec | `SCRIPE-Frontend/e2e/crm-kanban-auth-ux-certification.spec.ts` (`6` Playwright tests: `Part A, B1, B2, C, D, G` covering unconfigured `blocked` drag, directed Studio wire `Solution Fit -> Discovery`, `allowed_instant` drop, and reload persistence) |

## How do operators verify every invariant before promotion? {#v4-verification-checklist}

- [ ] Run `vitest run src/core/config/api-endpoints/__tests__/endpoint-casing-contract.test.ts` and confirm 3/3 assertions pass with zero `me` / `my` / `myTenant` templates.
- [ ] Run `dotnet test SCRIPE-Backend/tests/Modules/CRM/CRM.Application.Tests` and `vitest run src/modules/crm` to certify 4-tier graph parity, `SolutionFitConfirmed` inline gates, and 12-port directed React Flow wiring.
- [ ] Inspect `/crm/pipelines` 2D Diagram drag wire from `Solution Fit` to `Discovery` (both port-to-port and port-to-card-body) and confirm `From status` = `Solution Fit` and `To status` = `Discovery` before and after `Save & Publish`.
- [ ] Inspect `/crm/opportunities` Kanban drag gestures to verify `data-drop-status="blocked"` (0 dialogs) before adding a wire, and `data-drop-status="allowed_instant"` with 0px `DragOverlay` offset and reload persistence once configured.
- [ ] Run `scripe validate-locales` and `scripe arch-check --target frontend -m crm` and confirm 0 errors and 0 warnings before release.
