# How does SCRIPE separate production and development seeding, and where are the gaps? {#backend-seeding-architecture-review}

Yes: SCRIPE separates **production baseline seeders** (`DatabaseSeeder` and 18 `IModuleSeeder` implementations) from **opt-in development UAT seeders** (`DevDataSeederRunner` and 19 `IModuleDevDataSeeder` implementations) across all 19 modules.

- Production baseline seeders sync permissions, menus, features, editions, compliance rules, and system roles idempotently.[](source:database-seeder)
- Production web hosts disable startup seeding (`SeedDatabase:Enabled: false`), while `scripe db seed` runs `--seed` and exits before Kestrel starts.[](source:prod-config)
- Development UAT seeders stay opt-in (`SeedDatabase:SeedDevData: false`) and run in strict `Order` (`10` to `170`) via deterministic UUID v4 IDs.[](source:dev-runner)
- Audit uncovered 8 gaps, led by missing production environment guards on `--seed-dev` and double execution of 3 hosted seeders.[](source:orchestration)

@answer scope="SCRIPE-Backend · 19 modules · 2026-11-19"
@meta locale=en style=product
@source database-seeder title="DatabaseSeeder startup orchestrator" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/DatabaseSeeder.cs
@source orchestration title="DatabaseSeeder orchestration and dev gate" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/DatabaseSeeder.Orchestration.cs
@source dev-runner title="DevDataSeederRunner ordered DAG executor" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Architecture/DevDataSeederRunner.cs
@source dev-constants title="DevSeedConstants deterministic UUID v4 catalog" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Architecture/DevSeedConstants.cs
@source seeding-scope title="SeedingScope outbox and audit suppressor" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Persistence/SeedingScope.cs
@source role-admin title="RoleAndAdminSeeder SEC-10 fail-closed guard" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/RoleAndAdminSeeder.AdminAndDomains.cs
@source seeding-ext title="SeedingExtensions CLI --seed entrypoint" path=SCRIPE-Backend/src/Host/API/Extensions/SeedingExtensions.cs
@source prod-config title="Production seeding disabled at web boot" path=SCRIPE-Backend/src/Host/API/appsettings.Production.json
@source cli-lifecycle title="scripe db seed CLI command implementation" path=SCRIPE-Dev-Tools/scripe-cli/src/commands/db-lifecycle.ts

## How do startup and CLI seeding execute end to end? {#seeding-pipeline}

`Program.cs` ensures schemas exist first, runs CLI seed mode if `--seed` is present, and otherwise starts `DatabaseSeeder` as a hosted service.[](source:seeding-ext)

@workflow id=seeding-flow title="SCRIPE two-tier seeding pipeline"
| lane boot | Entry and scope |
| lane prod | Tier 1 production baseline |
| lane dev | Tier 2 opt-in dev UAT |
| schema-init | Init schemas | database | boot |
| cli-check | Seed enabled? | backend | boot |
| scope-begin | Set SeedingScope | security | prod |
| core-sync | Sync Identity core | security | prod |
| module-seeders | Run 18 modules | backend | prod |
| dev-gate | Dev opt-in? | security | dev |
| dev-runner | Run 19 dev DAG | database | dev |
| host-exit | Serve or exit | cloud | dev |
| schema-init > cli-check | ready | |
| cli-check > scope-begin | yes | emphasis |
| scope-begin > core-sync | quiet | security |
| core-sync > module-seeders | next | |
| module-seeders > dev-gate | done | |
| dev-gate > dev-runner | yes | emphasis |
| dev-gate > host-exit | no | dashed |
| dev-runner > host-exit | done | |

@steps id=seeding-steps
| step-schema | Init schemas | `InitializeDatabaseSchemasAsync()` creates module schemas and outbox or inbox tables before Kestrel or seeding runs. | seeding-flow | schema-init |
| step-cli | Seed enabled? | `ExecuteCliSeedModeAsync` intercepts `--seed` before Kestrel; normal boot skips seeding when `SeedDatabase:Enabled` is `false`. | seeding-flow | cli-check |
| step-scope | Set SeedingScope | `SeedingScope.Begin()` sets `AsyncLocal<bool>` so `BaseDbContext` and `AuditableEntityInterceptor` suppress outbox and audit floods. | seeding-flow | scope-begin |
| step-core | Sync Identity core | `DatabaseSeeder` migrates Identity and runs Guardian triggers, Permissions, Roles, Admin, Workspaces, Menus, Themes, and Presets. | seeding-flow | core-sync |
| step-modules | Run 18 modules | `RunModuleSeedersAsync` executes registered `IModuleSeeder` instances sorted by `Order` to migrate schemas and seed baseline catalogs. | seeding-flow | module-seeders |
| step-dev-gate | Dev opt-in? | `RunDevSeedersIfRequestedAsync` checks `--seed-dev` or `SeedDatabase:SeedDevData`; missing `IsProduction()` checks are an audit gap. | seeding-flow | dev-gate |
| step-dev-run | Run 19 dev DAG | `DevDataSeederRunner` runs all 19 dev seeders from Order `10` to `170` using deterministic UUID v4 IDs from `DevSeedConstants`. | seeding-flow | dev-runner |

## How do production and development seeders differ? {#tier-comparison}

SCRIPE uses two separate DI contracts so baseline catalog sync stays isolated from multi-tenant demo personas and sample transactions.[](source:database-seeder)

| Dimension | Production Baseline (`IModuleSeeder`) | Development UAT (`IModuleDevDataSeeder`) |
| --- | --- | --- |
| Master orchestrator | `DatabaseSeeder` (`IHostedService`) | `DevDataSeederRunner` (`Singleton`) |
| Default on local web boot | Runs (`SeedDatabase:Enabled: true`) | Skipped (`SeedDevData: false`) {good:Opt-in} |
| Default in Production config | Disabled (`appsettings.Production.json`) | Disabled, but lacks runtime block {bad:Unprotected} |
| CLI command | `scripe db seed` (`--seed`) | `scripe db seed --dev` (`--seed-dev`) |
| Execution scope | `SeedingScope` suppresses outbox and audit | `SeedingScope` suppresses outbox and audit |
| Failure propagation | Logs error and exits `0` {bad:Swallows} | Logs error and rethrows exception {good:Fail-fast} |
| Cross-module ID strategy | Natural keys (`Code`, `Slug`, `Key`) | Deterministic UUID v4 in `DevSeedConstants` |

Production seeders apply four distinct strategies rather than a single insert-once pattern.[](source:role-admin)

| Production strategy | Concrete seeders | Behavior on repeat startup |
| --- | --- | --- |
| Smart sync (upsert) | `PermissionSeeder`, `WorkspaceSeeder`, `MenuItemSeeder`, `MessageTemplateSeeder`, `PlatformOptionSetSeeder`, `Compliance` seeders | Inserts missing rows and updates changed metadata; keeps `IsSystem = false` items |
| Self-healing + SEC-10 | `RoleAndAdminSeeder`, `EnsureTenantDomainsAsync`, `CrmPipelineSeeder`, `CrmSettingsSeeder` | Restores `SYSTEM_SUPER_ADMIN`, `superadmin`, and tenant subdomains; fails closed in non-Development if password unset |
| DDL guardian triggers | `GuardianTriggerSeeder` (Oracle, PostgreSQL, SQL Server, SQLite/MySQL) | Runs `CREATE OR REPLACE` triggers blocking raw SQL deletion of system roles and `superadmin` |
| Seed-once (`SeedIfEmptyAsync`) | `LoginThemeSeeder`, `DashboardPresetSeeder`, `AppCategorySeeder`, `EditionSeeder`, `FeatureSeeder`, `Onboarding` seeders | Inserts only when missing so admin edits and deletions stay intact |

## Which modules seed production data versus dev UAT data? {#module-matrix}

All 19 backend modules provide an `IModuleDevDataSeeder`, while only 7 modules seed baseline production rows beyond EF Core migrations.[](source:dev-runner)

| Module | Production (`DatabaseSeeder` / `IModuleSeeder`) | Prod order | Dev (`IModuleDevDataSeeder`) | Dev order |
| --- | --- | --- | --- | --- |
| `Identity` | 8-stage core: triggers, perms, roles, `superadmin`, menus, themes, presets | Host | 6 tenants, SoD personas, IdPs, OAuth apps, scope grants | `10` |
| `Entitlements` | Features, 9 editions, onboarding rules, Connect & welcome settings | `10` | Tenant subscriptions, overrides, quota counters, gateways | `20` |
| `Compliance` | Regulations, consent purposes, PII inventory, retention policies | `20` | Compliance sample profiles and tenant records | `120` |
| `CRM` | Default commercial pipelines and tenant settings per tenant (`<= 1,000`) | `100` | Multi-stage leads, Party refs, Won and Lost deals across 6 tenants | `80` |
| `CustomFields` | ISO 3166-1 / ISO 4217 / BCP 47 option sets + tenant encryption key backfill | `100` | Custom field definitions and option values | `60` |
| `Communication` | Bilingual `MessageTemplateSeeder.SyncAsync` with brand logo URL | `100` | Sample notifications and communication logs | `110` |
| `Marketplace` | `AppCategorySeeder` + `MarketplaceCommissionSettingsSeeder` (providers deferred) | `100` | Sample marketplace listings and developer profiles | `130` |
| `Plugins` | `PluginsStartupSeeder`: EF migrations only (providers deferred) | `30` | Sample plugin definitions and installs | `170` |
| Other 11 modules | EF `MigrateAsync` only (`Analytics`, `CatalogPricing`, `DataTransfer`, `Finance`, `Hrms`, `Integrations`, `Media`, `OrganizationCore`, `PartyKernel`, `Venue`, `WorkManagement`) | `100` | Full UAT sample datasets ordered by cross-module DAG | `30`–`160` |

## What risks and CLI gaps did the audit uncover? {#audit-findings}

The code audit identified 8 architectural risks across environment safety, host startup concurrency, exception handling, and `scripe-cli` flags.[](source:cli-lifecycle)

| Finding | Severity | Exact evidence | Operational impact |
| --- | --- | --- | --- |
| No Production guard on dev seeding | Critical {bad:Critical} | `DatabaseSeeder.Orchestration.cs:66-112`, `DevDataSeederRunner.cs`, `db-lifecycle.ts` | Running `--seed-dev` in Production injects demo tenants and `P@ssw0rd` accounts |
| 3 seeders run twice on local boot | High {caution:High} | `Entitlements`, `Compliance`, and `Communication` DI register both `IModuleSeeder` and `IHostedService` | Host runs `SeedAsync` outside `SeedingScope`, and `Communication` ignores `SeedDatabase:Enabled: false` |
| Production seeders swallow errors | High {caution:High} | `DatabaseSeeder.Orchestration.cs:56-62`, `DatabaseSeeder.cs:90-96` | `scripe db seed` logs error and still returns exit code `0` on failure |
| Dead `IModuleSeeder.SeedDevAsync` contract | Medium {caution:Medium} | `IModuleSeeder.cs:11` vs `DevDataSeederRunner.cs` | 18 classes implement boilerplate that nothing invokes; template stub skips dev seeder |
| Unwired CLI seed flags | Medium {caution:Medium} | `db-lifecycle.ts:47-49`, `db-extended.ts:140-188` | `--seed-reset` does nothing in C#; `-m <Mod>` without `--dev` runs all prod modules; `generate-seed` is unwired |
| Startup tenant loop capped at 1,000 | Medium {caution:Medium} | `CRMModuleSeeder.cs:57`, `CustomFieldsModuleSeeder.cs:62` | Backfill skips tenants past 1,000; Production relies on runtime provisioning anyway |
| Orphaned `SubscriptionSeeder` and broken `DevSeeder` | Low | `SubscriptionSeeder.cs`, `DevSeeder.cs` | Both appear in `scripe list seeders`, but `SubscriptionSeeder` is unused and `DevSeeder` lacks `IIdEncryptionService` |
| Order ties and mixed DI lifetimes | Low | `Order => 80` tie (`CRM`, `CatalogPricing`); 3 `Singleton` vs 16 `Scoped` | Non-deterministic order on ties; `Singleton` vs `Scoped` registration drift |

Recommended hardening actions for the next engineering pass:

- [ ] Fail closed in `DevDataSeederRunner`, `DatabaseSeeder.RunDevSeedersIfRequestedAsync`, and `scripe db seed --dev` whenever environment is `Production`.
- [ ] Remove duplicate `IHostedService` registrations from `EntitlementsStartupSeeder`, `ComplianceStartupSeeder`, and `CommunicationModuleSeeder`.
- [ ] Rethrow critical failures inside `RunModuleSeedersAsync` so `scripe db seed` exits non-zero on broken migrations or seeders.
- [ ] Either implement `--seed-module` and `--seed-reset` in `DatabaseSeeder` or remove unsupported `--reset` / `reseed` CLI promises.
- [ ] Delete or deprecate `IModuleSeeder.SeedDevAsync`, `SubscriptionSeeder`, and broken `DevSeeder` so `scripe list seeders` stays accurate.
