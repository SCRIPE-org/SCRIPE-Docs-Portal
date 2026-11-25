# SCRIPE Authorization, Entitlements & Multi-Role RBAC Remediation {#scripe-authorization-remediation}

SCRIPE enforces fail-closed authorization across `490` permissions, `190` features, `16` internal roles, and `10` UserGroups. Every boundary preserves dotted FLS keys, non-destructive feature toggles, and post-commit cache invalidation.

- `Core.Application` catalog reconciliation leaves `0` broken `RequiredFeature` links and classifies `56` literal-unreferenced permissions with `0` exceptions.
- `scripe-internal` activates `389` tenant-safe permissions while quarantining `69` `PlatformOnly` permissions and disabling `Marketplace` (`18`) and `Plugins` (`14`).
- `TenantContextMiddleware` runs pre-authorization with cold-cache warming and fail-closed `HttpFeatureChecker` live feature verification.
- `AdminSecurityService` orders roles by ascending `Priority` (`0` = highest), intersects read FLS masks across roles, and unions additive `UserGroup` caps without truncating dotted resource keys.

@answer scope="SCRIPE monorepo · 490 perms · 16 roles · 10 groups"
@meta locale=en style=editorial quality_profile=showcase

## What does the remediated authorization partition look like? {#partition-metrics}

Reconciled counts below come from the `19` backend `*PermissionProvider*.cs` and `*FeatureProvider*.cs` files paired with `EditionSeeder` for `scripe-internal`.

@metric id=metric-total-perms label="Total Catalog Permissions" value=490 unit="perms" note="19 modules, 190 features, 0 unclassified"
@metric id=metric-active-scripe label="SCRIPE Active Tenant Pool" value=389 limit=421 unit="perms" note="366 core modules + 23 Tier-2 Entitlements"
@metric id=metric-platform-only label="PlatformOnly Blocked Fence" value=69 unit="perms" note="Plus 32 disabled in Marketplace & Plugins"
@metric id=metric-internal-roles label="Internal Sovereign RBAC Roles" value=16 unit="roles" note="Priority 0..900 with 10 UserGroups"

```mermaid title="SCRIPE Internal Permission Partition by Top Module (490 Total)"
xychart-beta
    x-axis ["Identity", "Entitlements", "Venue", "CRM", "PartyKernel", "CustomFields", "Hrms", "OrgCore", "Compliance", "Marketplace", "Plugins", "Other 8"]
    y-axis "Permissions" 0 --> 100
    bar "Catalog Total" [94, 70, 49, 46, 37, 32, 28, 24, 21, 20, 14, 55]
    bar "SCRIPE Active" [83, 23, 49, 45, 37, 24, 28, 24, 21, 0, 0, 55]
```

| Catalog Bucket | Permission Count | Included Scope on `scripe-internal` |
| --- | --- | --- |
| Core Active Operational Modules | `366` | `16` active operational modules {good:Active} |
| Entitlements Tier-2 Self-Service | `23` | `TenantPlans`, `UserSubscriptions`, `TenantStripeConnect`, `TenantGateways` {good:Active} |
| Disabled Optional Modules | `32` | `Marketplace` (`18` incl. `10` `RequiredAnyFeatures`) and `Plugins` (`14`) {caution:Flag Off} |
| `PlatformOnly` Sovereign Fence | `69` | `Entitlements` Tier-1 (`47`), `Identity` (`11`), `CustomFields` (`8`), `Marketplace` (`2`), `CRM` (`1`) {bad:Tenant Denied} |

@facts id=catalog-invariants
| Broken `RequiredFeature` fixes | `compliance_regulations.manage` -> `Compliance.Enabled`; `users.reset_password` -> `Identity.Users.Enabled` |
| `IsGloballyAvailable` (`10`) | `7` tenant self-service (`tenants.view_self`, `profile.*`, `identity_context.*`) plus `3` `PlatformOnly` |
| Feature resolution order | `TenantFeatureOverride` -> `EditionFeature` -> `FeaturePackExpansion` (`IsMarketingOnly` last) -> `FeatureDefinition.DefaultValue` |
| Verified Commit Baseline | Backend `ba10de98f`..`e32ae3f78` (`13` commits); Frontend `def51bf48`..`5c36a85e4` (`10` commits) |

## How do the authorization layers connect end to end? {#system-topology}

Request ingress, catalog metadata, live Entitlements checks, multi-role FLS merges, and post-commit cache eviction run across explicit module boundaries without violating Clean Architecture.

@diagram architecture id=authz-arch source=authorization-feature-permission-architecture.architecture.json title="SCRIPE Authorization & Entitlements Architecture"

@steps id=arch-walkthrough
| fe_portal | Next.js 16 MVVM Portal | Enforces tenant SuperAdmin separation and fail-closed `PAGE_PERMISSIONS`, paired with the dedicated `frontend-rbac-superadmin-fls-mvvm` board. | authz-arch | fe_portal |
| mw_context | Tenant Context & MFA Gate | Skips anonymous routes, cold-warms `AdminPermissionCache`, and validates bidirectional `MembershipMode` before `UseAuthorization`. | authz-arch | mw_context |
| authz_handler | Permission Authz Handler | Evaluates `RequiredAnyFeatures`, `IsGloballyAvailable`, and fail-closed `IFeatureChecker` plus `pat_scope` intersection. | authz-arch | authz_handler |
| fls_merge | FLS Merge Engine | Unions masks within each role, intersects across read-capable roles by ascending `Priority`, and keeps dotted keys like `crm.opportunities`. | authz-arch | fls_merge |
| feature_builder | Effective Feature Builder | Commits overrides and edition updates in `EntitlementsDbContext` before emitting post-commit `SubscriptionChanged` events. | authz-arch | feature_builder |

## How do cross-tenant requests and cache invalidation execute in order? {#runtime-sequence}

Middleware establishes authoritative context first, live feature gates reject disabled modules immediately, and override mutations commit to the database before clearing caches and version stamps.

@diagram sequence id=authz-seq source=authorization-enforcement-sequence.sequence.json title="Authorization Enforcement, Context-Switch & Post-Commit Eviction"

@steps id=seq-walkthrough
| m1 | Inbound Switch Request | Next.js attaches `X-Tenant-Context` on `GET /crm/opportunities`. | authz-seq | spa |
| m2 | Cold-Cache Context Warm | `TenantContextMiddleware` warms `AdminPermissionCache` before verifying target membership so cache eviction never triggers false `403` responses. | authz-seq | ctx_mw |
| m5 | Live Entitlements Check | `PermissionAuthorizationHandler` verifies `IFeatureChecker.IsEnabledAsync(TargetTenant, CRM.Enabled)` instead of trusting JWT claims. | authz-seq | authz |
| m10 | Commit Before Invalidate | `Entitlements` persists overrides via `SaveChangesAsync`, evicts `FeatureCache`, and bumps `admin:principal:*` version stamps to stop stale tokens immediately. | authz-seq | ent |

## How do permissions transition across all five lifecycle states? {#feature-lifecycle}

Every catalog permission travels from compile-time definition into active tenant pools, pickers, persisted roles, and runtime enforcement while isolating `PlatformOnly` and disabled features non-destructively.

@diagram lifecycle id=perm-lifecycle source=permission-feature-lifecycle.lifecycle.json title="SCRIPE Feature & Permission 5-State Lifecycle"

@steps id=lifecycle-walkthrough
| defined | Defined (`490` Perms) | Catalog providers declare explicit `RequiredFeature`, `RequiredAnyFeatures` (`10`), or `IsGloballyAvailable` (`10`) predicates. | perm-lifecycle | defined |
| available | Available (`389` SCRIPE) | `TenantPermissionManager` syncs satisfied `!PlatformOnly` permissions into `TenantPermissions` and `T_SCRIPE_SA`. | perm-lifecycle | available |
| platform_only_blocked | PlatformOnly (`69` Exit) | Host permissions exit before entering `TenantPermissions`, UI pickers, Break-Glass elevation, or tenant execution. | perm-lifecycle | platform_only_blocked |
| feature_disabled | Non-Destructive Disable | Turning a feature off revokes `Effective` access immediately while keeping custom `RolePermissions` rows intact for restore. | perm-lifecycle | feature_disabled |

## How are multi-role FLS, dotted keys, and file exports governed? {#fls-export-flow}

One canonical merge pipeline normalizes dotted resource names without splitting on dots and applies identical masking across JSON APIs, writes, and exported files.

@diagram dataflow id=fls-dataflow source=rbac-fls-projection-dataflow.dataflow.json title="Multi-Role Dotted FLS & Export Security Dataflow"

| Remediation Area | Previous Failure Mode | Enforced Control |
| --- | --- | --- |
| Dotted Resource Keys | `Split('.')[0]` dropped `crm.opportunities` {bad:Mask Bypassed} | `PermissionResourceNormalizer.ExtractResource` preserves full keys {good:Exact Match} |
| Multi-Role Precedence | First single role won (`MaxRolesPerAdmin` clamp) {bad:Over-Masked} | Read-capable roles intersect; `UserGroups` union additive caps {good:Deterministic} |
| `UpdateOpportunity` & Close | Default `0m` / `"SAR"` / `NewBusiness` created oracles {bad:Oracle + Deadlock} | Nullable partial DTO + `closeOpportunity` / `updateOpportunity` omission (`403`) {good:Oracle-Free} |
| Audit & Dashboard Exports | `dashboard.view` alone exported audit rows; TSV unescaped {bad:Exfiltration} | Requires `audit.export`, unions `audit+dashboard+security` FLS, `CsvFormulaGuard` {good:Redacted} |
| `Downloads` & `Compliance` | Unchecked `Range` sought negative offset (`500`); `TenantId == null` leaked {bad:500 / Leak} | Clamped `416 Range Not Satisfiable`, traversal-safe paths, strict platform check {good:Isolated} |

@callout level=warning title="Critical Oracle & Sovereign Isolation Boundaries"
| Never compare submitted restricted values against stored database values inside `UpdateOpportunityCommandHandler`, because differing HTTP status codes leak secret field values. |
| Never grant `PlatformOnly` permissions to any tenant role, `UserGroup`, `AdminDelegation`, or `MembershipMode` context, and keep `T_SCRIPE_SA` locked out of platform-admin actions. |

## How are the 16 internal SCRIPE roles partitioned by authority? {#role-hierarchy}

The internal `SCRIPE` corporate tenant seeds `16` functional roles ranked by ascending `Priority` (`0` = highest) paired with `10` dotted `UserGroup` policies including `GRP_SCRIPE_PII_MASKED`.

```mermaid title="Seeded Active Permissions Across SCRIPE Internal 16 RBAC Roles"
xychart-beta
    x-axis ["SA", "IT_SEC", "DATA_INT", "AUDITOR", "CRM_MGR", "VENUE_OPS", "HR_MGR", "FIN_CTRL", "EXEC", "DPO", "CRM_REP", "HR_CRD", "VENUE_CRD", "SDR", "ACCT", "EMP"]
    y-axis "Active Permissions" 0 --> 400
    bar "Granted Perms" [389, 133, 121, 113, 90, 89, 83, 71, 59, 56, 50, 41, 40, 37, 25, 15]
```

| Role Tier (`Priority`) | Roles & Active Grants | Primary Landing & Scope Invariant |
| --- | --- | --- |
| Executive & Super Admin (`0..10`) | `T_SCRIPE_SA` (`389`), `T_SCRIPE_EXEC_LEAD` (`59`) | `overview` / `hub` (`hierarchy`; `0` `PlatformOnly`; SA locked mirror) |
| Security, Data, Compliance & Audit (`20..35, 85`) | `T_SCRIPE_IT_SEC` (`133`), `T_SCRIPE_DATA_INT` (`121`), `T_SCRIPE_COMPLIANCE_DPO` (`56`), `T_SCRIPE_AUDITOR` (`113`) | `workspace:admin`, `menu:data-transfer-entities`, `workspace:compliance`, `menu:audit` (`0` mutations on Auditor; `cascade_delete`/`impersonate` SA-only) {good:Read-Only Enforced} |
| Department Managers (`40..50`) | `T_SCRIPE_CRM_MANAGER` (`90`), `T_SCRIPE_VENUE_OPS` (`89`), `T_SCRIPE_HR_MGR` (`83`), `T_SCRIPE_FIN_CTRL` (`71`) | `workspace:crm`, `workspace:venue`, `workspace:hrms`, `menu:venue-money` (`Manager` unlocks Rep FLS) {good:Priority Wins} |
| Specialists & Employee (`60..80, 900`) | `CRM_SALES_REP` (`50`), `HR_COORD` (`41`), `VENUE_CRD` (`40`), `CRM_SDR` (`37`), `FIN_ACCT` (`25`, `menu:venue-payments`), `EMPLOYEE` (`15`, `hub`) | Dedicated desk routes; Sales Rep masked on `EstimatedAmount`, `CloseNotes`, `ApprovalEvidenceRef` {caution:FLS Masked} |

## What must pass before final release sign-off? {#verification-checklist}

- [x] Run `PermissionFeatureCatalogIntegrityTests` confirming `490` permissions, `190` features, and `0` unclassified literal-unreferenced codes.
- [x] Run `InternalEditionFeatureSafeguardTests` (`5/5`) confirming `scripe-internal` excludes all `47` Tier-1 host flags and enables `23` Tier-2 self-service flags.
- [x] Run `AuthorizationGates.Tests` (`255/255`, `!~TwoFactorAuthorizationRefusalTests`) verifying guarded endpoints and handlers with `0` regressions in `KnownUncoveredRefusals`.
- [x] Run `scripe arch-check` confirming `0` critical Clean Architecture or `BE-036`/`FE-034` Domain-First Naming violations across backend (`95`) and frontend (`92`).
- [x] Run `scripe build backend` (`90/90`), `scripe build frontend` (`210/210`), and `scripe validate-locales` confirming `0` build errors and full English/Arabic parity.
- [x] Execute unmocked Playwright browser E2E (`14/14` PASSED: `10/10` RBAC `#485` + `4/4` Email/Communication `#496`) across `SCRIPE` accounts with `34` PNG captures (`01`–`34`).
