# How does SCRIPE isolate production and development database seeding across all 19 modules? {#backend-seeding-architecture-review}

SCRIPE enforces a **fail-closed, two-tier seeding architecture**. `DatabaseSeeder` (the sole `IHostedService`) runs idempotent **Tier 1 Production Baseline** `IModuleSeeder` classes, while `DevDataSeederRunner` runs **Tier 2 Development UAT** seeders only in authorized non-production environments.[](source:database-seeder)

- Production baseline seeders sync permissions, menus, features, editions, compliance rules, and system roles idempotently.[](source:database-seeder)
- `SeedingEnvironmentGuard` fails closed whenever `Production` or `Prod` appears in host or process environment variables, rejecting `--seed-dev`, `--seed-reset`, and config overrides.[](source:env-guard)
- `Entitlements`, `Compliance`, `Communication`, and `Plugins` no longer register duplicate `IHostedService` instances; `DatabaseSeeder` respects `SeedDatabase:Enabled: false` before running migrations.[](source:orchestration)
- `DatabaseSeeder` and `SeedingExtensions` propagate relational migration and seeder failures cleanly and set a non-zero CLI exit code (`1`).[](source:seeding-ext)

@answer scope="SCRIPE-Backend & scripe-cli · 19 modules · remediated"
@meta locale=en style=product
@source env-guard title="SeedingEnvironmentGuard fail-closed guard" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Architecture/SeedingEnvironmentGuard.cs
@source database-seeder title="DatabaseSeeder startup and CLI orchestrator" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/DatabaseSeeder.cs
@source orchestration title="DatabaseSeeder orchestration, targeting, and error propagation" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/DatabaseSeeder.Orchestration.cs
@source dev-runner title="DevDataSeederRunner ordered DAG executor" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Architecture/DevDataSeederRunner.cs
@source dev-constants title="DevSeedConstants deterministic UUID v4 catalog" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Architecture/DevSeedConstants.cs
@source seeding-scope title="SeedingScope outbox and audit suppressor" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Persistence/SeedingScope.cs
@source role-admin title="RoleAndAdminSeeder SEC-10 fail-closed guard" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/RoleAndAdminSeeder.AdminAndDomains.cs
@source seeding-ext title="SeedingExtensions CLI --seed entrypoint" path=SCRIPE-Backend/src/Host/API/Extensions/SeedingExtensions.cs
@source prod-config title="Production seeding disabled at web boot" path=SCRIPE-Backend/src/Host/API/appsettings.Production.json
@source cli-lifecycle title="scripe db seed and reseed CLI commands" path=SCRIPE-Dev-Tools/scripe-cli/src/commands/db-lifecycle.ts

## How do startup and CLI seeding execute end to end? {#seeding-pipeline}

`Program.cs` initializes schemas, delegates `--seed` CLI runs through `ExecuteCliSeedModeAsync` (which exits `0` or `1` without starting Kestrel), and otherwise runs `DatabaseSeeder` as the sole seeding `IHostedService`.[](source:seeding-ext)

@workflow id=seeding-flow title="SCRIPE remediated two-tier seeding pipeline"
| lane boot | Entry and fail-closed guard |
| lane prod | Tier 1 production baseline |
| lane dev | Tier 2 opt-in dev UAT |
| schema-init | Init schemas | database | boot |
| cli-check | Prod guard + enabled? | security | boot |
| scope-begin | Set SeedingScope | security | prod |
| core-sync | Sync Identity core | security | prod |
| module-seeders | Run targeted modules | backend | prod |
| dev-gate | Non-prod dev opt-in? | security | dev |
| dev-runner | Run 17 dev DAG | database | dev |
| host-exit | Exit 0/1 or serve | cloud | dev |
| schema-init > cli-check | ready | |
| cli-check > scope-begin | enabled | emphasis |
| scope-begin > core-sync | quiet | security |
| core-sync > module-seeders | next | |
| module-seeders > dev-gate | done | |
| dev-gate > dev-runner | authorized | emphasis |
| dev-gate > host-exit | skipped | dashed |
| dev-runner > host-exit | done | |

@steps id=seeding-steps
| step-schema | Init schemas | `InitializeDatabaseSchemasAsync()` creates module schemas and outbox or inbox tables before Kestrel or seeding runs. | seeding-flow | schema-init |
| step-cli | Prod guard + enabled? | `SeedingEnvironmentGuard` rejects `--seed-dev` or `--seed-reset` in Production; normal boot skips migrations and seeders when `SeedDatabase:Enabled` is `false`. | seeding-flow | cli-check |
| step-scope | Set SeedingScope | `SeedingScope.Begin()` sets `AsyncLocal<bool>` so `BaseDbContext` and `AuditableEntityInterceptor` suppress outbox and audit floods. | seeding-flow | scope-begin |
| step-core | Sync Identity core | `DatabaseSeeder` runs `Identity` migrations, Guardian triggers, Permissions, Roles, SEC-10 Admin, Workspaces, Menus, Themes, and Presets (when unscoped or targeting `Identity`). | seeding-flow | core-sync |
| step-modules | Run targeted modules | `RunModuleSeedersAsync` validates `--seed-module`, executes registered `IModuleSeeder` instances sorted by `(Order, ModuleName)`, and propagates any error. | seeding-flow | module-seeders |
| step-dev-gate | Non-prod dev opt-in? | `RunDevSeedersIfRequestedAsync` enforces the `Development`/`Local`/`UAT`/`Testing` allowlist via `SeedingEnvironmentGuard` before accepting `--seed-dev` or `SeedDatabase:SeedDevData`. | seeding-flow | dev-gate |
| step-dev-run | Run 17 dev DAG | `DevDataSeederRunner` runs all 17 active `Scoped` dev seeders from Order `10` to `160` using deterministic UUID v4 IDs from `DevSeedConstants`. | seeding-flow | dev-runner |

## How do production and development seeders differ? {#tier-comparison}

SCRIPE separates `IModuleSeeder` (single-method production baseline) from `IModuleDevDataSeeder` (development UAT datasets), eliminating the dead `SeedDevAsync` method from `IModuleSeeder`.[](source:database-seeder)

| Dimension | Production Baseline (`IModuleSeeder`) | Development UAT (`IModuleDevDataSeeder`) |
| --- | --- | --- |
| Master orchestrator | `DatabaseSeeder` (sole `IHostedService`) | `DevDataSeederRunner` (runs inside DI scope) |
| Default on local web boot | Runs (`SeedDatabase:Enabled: true`) | Skipped (`SeedDevData: false`) {good:Opt-in} |
| Default in Production | Disabled at boot; CLI `--seed` allowed | Blocked by `SeedingEnvironmentGuard` {good:Fail-closed} |
| CLI command | `scripe db seed [-m Mod]` (`--seed`) | `scripe db seed --dev [-m Mod]` (`--seed-dev`) |
| Reset and reseed command | `scripe db reseed -m <Mod> --confirm` | `scripe db reseed -m <Mod> --dev --confirm` |
| Failure propagation | Logs critical error and exits `1` {good:Fail-fast} | Logs error, rethrows, and exits `1` {good:Fail-fast} |
| DI registration lifetime | `Scoped` or `Singleton` (self-scoped) | All 17 active seeders `Scoped` {good:Consistent} |

Production seeders apply four idempotent strategies so admin edits and tenant settings stay intact across repeated runs.[](source:role-admin)

| Production strategy | Concrete seeders | Behavior on repeat startup |
| --- | --- | --- |
| Smart sync (upsert) | `PermissionSeeder`, `WorkspaceSeeder`, `MenuItemSeeder`, `MessageTemplateSeeder`, `PlatformOptionSetSeeder`, `Compliance` seeders | Inserts missing rows and updates metadata; keeps `IsSystem = false` customizations |
| Self-healing + SEC-10 | `RoleAndAdminSeeder`, `EnsureTenantDomainsAsync`, `CrmPipelineSeeder`, `CrmSettingsSeeder` | Restores system roles and tenant metadata; never overwrites existing admin passwords and fails closed without `SuperAdminInitialPassword` outside `Development` |
| DDL guardian triggers | `GuardianTriggerSeeder` (Oracle, PostgreSQL, SQL Server, SQLite/MySQL) | Runs `CREATE OR REPLACE` triggers blocking raw SQL deletion of system roles and `superadmin` |
| Seed-once (`SeedIfEmptyAsync`) | `LoginThemeSeeder`, `DashboardPresetSeeder`, `AppCategorySeeder`, `EditionSeeder`, `FeatureSeeder`, `Onboarding` seeders | Inserts only when missing so admin edits and deletions stay intact |

## Which modules seed production data versus dev UAT data? {#module-matrix}

All 19 backend modules provide an `IModuleSeeder` (Identity host + 18 registered `IModuleSeeder` services), while 17 active modules register `IModuleDevDataSeeder` (`Marketplace` and `Plugins` remain business-deferred). All `IModuleDevDataSeeder` implementations use unique `(Order, ModuleName)` values (`Order 80` for `CatalogPricing`, `Order 85` for `CRM`).[](source:dev-runner)

| Module | Production (`DatabaseSeeder` / `IModuleSeeder`) | Prod order | Dev (`IModuleDevDataSeeder`) | Dev order |
| --- | --- | --- | --- | --- |
| `Identity` | 8-stage core: triggers, perms, SEC-10 admin, menus, themes, presets | Host | 6 tenants, SoD personas, IdPs, OAuth apps, scope grants | `10` |
| `Entitlements` | Features, 9 editions, onboarding rules, Connect & welcome settings | `10` | Tenant subscriptions, overrides, quota counters, gateways | `20` |
| `Compliance` | Regulations, consent purposes, PII inventory, retention policies | `20` | Compliance sample profiles and tenant records | `120` |
| `Plugins` | `PluginsStartupSeeder`: EF migrations only (providers deferred) | `30` | Deferred (DI registration commented out) | — |
| `CRM` | Paginated (`200`/page) default pipelines & tenant settings across all tenants | `100` | Multi-stage leads, Party refs, Won and Lost deals | `85` |
| `CustomFields` | ISO option sets + paginated (`200`/page) tenant encryption key backfill | `100` | Custom field definitions and option values | `60` |
| `Communication` | Bilingual `MessageTemplateSeeder.SyncAsync` with brand logo URL | `100` | Sample notifications and communication logs | `110` |
| `Marketplace` | EF migrations; catalog & commission seeded only when permission provider active | `100` | Deferred (DI registration commented out) | — |
| Other 11 modules | EF `MigrateAsync` only (`Analytics`, `CatalogPricing`, `DataTransfer`, `Finance`, `Hrms`, `Integrations`, `Media`, `OrganizationCore`, `PartyKernel`, `Venue`, `WorkManagement`) | `100` | Full UAT sample datasets ordered deterministically (`30`–`160`) | `30`–`160` |

## How were all 8 audit findings remediated across P0, P1, and P2? {#remediation-status}

Every P0, P1, and P2 finding from the initial audit has been resolved and backed by automated regression tests in `API.UnitTests`, `CRM.Application.Tests`, `CustomFields.Application.Tests`, and `scripe-cli`.[](source:cli-lifecycle)

| Audit finding | Priority | Remediation implemented | Verification |
| --- | --- | --- | --- |
| Missing Production guard on dev seeding | P0 {good:Resolved} | `SeedingEnvironmentGuard` allowlist + Production/Prod block across `DatabaseSeeder`, `DevDataSeederRunner`, and `scripe db seed` | `SeedingArchitectureAndSafetyTests` + `vitest` |
| Duplicate `IHostedService` seeders (3 modules) | P0 {good:Resolved} | Removed `IHostedService` from `Entitlements`, `Compliance`, `Communication`, and `Plugins`; `DatabaseSeeder` exits early when disabled | Host DI inspection + `DatabaseSeeder` tests |
| Swallowed exceptions & exit code `0` on failure | P0 {good:Resolved} | Removed swallowing `catch` blocks around `MigrateAsync` and `RunModuleSeedersAsync`; `ExecuteCliSeedModeAsync` sets exit code `1` | Unreachable PostgreSQL migration + failing seeder tests |
| Incomplete CLI flags (`--reset`, `-m`, `reseed`, `generate-seed`) | P1 {good:Resolved} | Added `--seed-module` in backend, removed `--reset` (rejects `--seed-reset`), wired `reseed` via `dbResetCommand`, fixed `generate-seed` DI wiring | `seeding-remediation.test.ts` + `db-lifecycle.reset.test.ts` |
| Redundant `IModuleSeeder.SeedDevAsync` contract | P1 {good:Resolved} | Removed `SeedDevAsync` from `IModuleSeeder`, all 18 implementations, and `ModuleSeeder.cs.hbs` template | Reflection assertion + solution build |
| Tenant backfill capped at 1,000 in CRM & CustomFields | P2 {good:Resolved} | Added `ITenantInfoResolver.GetPagedAsync(page, 200)` with `ChangeTracker.Clear()` and propagated key-provision `Result` failures | `CrmTenantBackfillPaginationTests` + `CustomFieldsTenantBackfillPaginationTests` |
| Deferred module & broken legacy seeder drift | P2 {good:Resolved} | Gated `MarketplaceModuleSeeder` on active provider, kept deferred dev seeders unwired, deleted `SubscriptionSeeder` & `DevSeeder` | Type reflection + `MarketplaceModuleSeeder` test |
| Order ties & `Singleton` vs `Scoped` dev seeder lifetimes | P2 {good:Resolved} | Moved `CRMDevDataSeeder.Order` to `85` (breaking tie with `80`), normalized all 17 dev seeders to `Scoped`, sorted by `(Order, ModuleName)` | Host DI lifetime & distinct-order assertions |

Operational verification checks before releasing seeding changes:

- [ ] Run `dotnet test SCRIPE-Backend/tests/API.UnitTests/API.UnitTests.csproj --filter "FullyQualifiedName~SeedingArchitectureAndSafetyTests"` to confirm fail-closed Production guards and DI invariants.
- [ ] Run `scripe db seed --dev -e production` and verify the CLI blocks execution with a non-zero exit code.
- [ ] Confirm `appsettings.Production.json` keeps `SeedDatabase:Enabled` set to `false` and `SeedDatabase:SuperAdminInitialPassword` is injected via secret store.
