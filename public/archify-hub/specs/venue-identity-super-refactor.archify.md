# How do the Venue and Identity refactors unify Clean Architecture, AstraFlow 2.3.0, and 3-DB concurrency? {#venue-identity-super-refactor}

Venue, Identity, Core, and Frontend Profile pass every Clean Architecture, AstraFlow 2.3.0, and 3-provider concurrency gate with `100/100` module scores.[](source:gate_backend)

- Domain hardening moved `Court`, `CourtCluster`, `FacilityModel`, `SignupSession`, `TenantThemeFavorite`, and `NotificationPreference` onto `AuditableEntity<Guid>` with encapsulated collections.[](source:venue_domain)
- Compile-time `[AstraGenerateMapping]` bridges retired `IdentityConventionProfile` and nine legacy Venue rule files while removing EF Core from `Identity.Application`.[](source:astraflow_map)
- Three-provider migrations added 19 Identity and Core `RowVersion` tokens plus Venue `GuestReservationAccess` and `IdempotencyReceipts` across 54 total migrations.[](source:migrations_gate)
- Frontend `profile` carries `rowVersion` end-to-end, clears stale TanStack Query caches on HTTP `409`, and passes 24 of 24 scoped tests.[](source:frontend_profile)

@answer scope="Venue + Identity + Core + Profile (3-DB)"
@meta locale=en style=editorial quality_profile=showcase repo_url=https://github.com/SCRIPE-org/SCRIPE.git repo_revision=b28278fd9402a58d0b21c0c262d89cd6b281d74d
@source gate_backend title="Wave 3B Backend Verification Gates (API Build, 7 Test Suites, Roslyn AST & arch-check)" url=https://github.com/SCRIPE-org/SCRIPE-Backend
@source venue_domain title="Venue CourtCluster & FacilityModel AuditableEntity Domain Encapsulation" path=SCRIPE-Backend/src/Modules/Venue/Venue.Domain/Entities/CourtCluster.cs
@source identity_domain title="SignupSession Protected Constructor, Create Factory & NotificationPreference" path=SCRIPE-Backend/src/Modules/Identity/Identity.Domain/Entities/SignupSession.cs
@source astraflow_map title="AstraFlow 2.3.0 AstraGenerateMapping & Flat MapModel Bridges" path=SCRIPE-Backend/src/Modules/Venue/Venue.Application/Mapping/CourtMaps.cs
@source migrations_gate title="IdempotencyMigrationPresenceTests (54 Migrations / 18 Modules)" path=SCRIPE-Backend/tests/Core.Application.Tests/Idempotency/IdempotencyMigrationPresenceTests.cs
@source venue_idem title="Venue ADR-040 Module Receipt Store & ReservationsController" path=SCRIPE-Backend/src/Modules/Venue/Venue.Infrastructure/DependencyInjection.cs
@source identity_db title="IdentityDbContext ConfigureConcurrencyAwareEntities & Split IdentityFeatureProvider" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs
@source frontend_profile title="Frontend Profile RowVersion & invalidateOnConcurrencyConflict" path=SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/utils/concurrency.ts

## How do Frontend Profile, AstraFlow 2.3.0, and 3-DB modules connect? {#refactor-topology}

@architecture id=refactor-arch title="Refactored Venue, Identity & Profile Topology"
| fe_profile | Profile MVVM Hooks | frontend | source:frontend_profile |
| api_gw | Sealed Controllers | backend | source:venue_idem |
| med_pipe | AstraFlow Pipeline | backend | source:astraflow_map |
| idem_store | Module Receipt Store | security | source:venue_idem |
| venue_app | Venue & Identity App | backend | source:venue_domain |
| map_gen | MapModel & Converters | backend | source:astraflow_map |
| ef_ctx | BaseDb & Module DBs | database | source:identity_db |
| db_providers | SQL, Oracle, Postgres | database | source:migrations_gate |
| fe_profile > api_gw | rowVersion PUT |
| api_gw > med_pipe | ICommand & Clamp |
| med_pipe > idem_store | receipt lease |
| med_pipe > venue_app | Result<T> |
| venue_app > map_gen | MapModel |
| venue_app > ef_ctx | pure domain |
| ef_ctx > db_providers | 54 migrations | emphasis |

@steps id=arch-tour
| step_fe | Frontend Profile MVVM | `ProfileMapper`, `SovereignAccountRepository`, and `useProfileDossierViewModel` forward `rowVersion` and trigger conflict cache invalidation on HTTP `409`. | refactor-arch | fe_profile |
| step_ctrl | Sealed Endpoints & Clamping | Venue and Identity controllers are `sealed partial` classes under 300 lines with `Math.Clamp` pagination limits (`<= 100`) and `ToIdempotent*Result` adapters. | refactor-arch | api_gw |
| step_pipe | AstraFlow Mediator & Idempotency | All mutating handlers implement `ICommand` (never `IQuery`), register `IInvalidatesCache`, and claim receipts via `AddModuleReceiptContext<VenueDbContext>("Venue")`. | refactor-arch | idem_store |
| step_app | Decoupled Application & Mapping | EF Core was removed from `Identity.Application.csproj`; `[AstraGenerateMapping]` bridges entities through flat `*MapModel` types with `[AstraSensitive]` and `IdentityGuid`. | refactor-arch | map_gen |
| step_db | Dual-Mode 3-Provider Persistence | `IdentityDbContext` enforces `HasMaxLength(16)` concurrency tokens and `BaseDbContext` rotates `RowVersion` across SQL Server, Oracle, and PostgreSQL. | refactor-arch | db_providers |

## How do optimistic concurrency and ADR-040 receipts run end-to-end? {#e2e-concurrency-idempotency}

@sequence id=concurrency-idempotency-seq title="Profile RowVersion 409 Recovery & Venue 3-TX Receipt Execution"
| actor fe | Profile ViewModel | frontend | source:frontend_profile |
| actor tq | TanStack Cache | frontend | source:frontend_profile |
| actor ctrl | Sealed Controller | backend | source:venue_idem |
| actor app | AstraFlow + Idem | backend | source:astraflow_map |
| actor db | 3-DB Contexts | database | source:identity_db |
| phase | 1. Optimistic Concurrency & HTTP 409 Cache Recovery |
| fe | ctrl | PUT dossier/preferences + rowVersion | emphasis |
| ctrl | app | Dispatch Update Command (Result<T>) |
| app | db | Compare RowVersion + AdvanceRowVersion() | security |
| db | app | DbUpdateConcurrencyException (stale) | dashed |
| app | ctrl | Conflict Result (409) | return |
| ctrl | fe | HTTP 409 ProblemDetails | return |
| fe | tq | invalidateOnConcurrencyConflict() | emphasis |
| phase | 2. Venue ADR-040 Module Receipt & Cache Eviction |
| ctrl | app | ConfirmReservationCommand + IdempotencyKey | emphasis |
| app | db | TX 1 claim venue.IdempotencyReceipts | security |
| app | db | TX 2 save entity + AdvanceRowVersion | emphasis |
| app | ctrl | ToIdempotentCreatedResult (201) | return |

@callout level=note title="Why route stale profile writes to HTTP 409 instead of swallowing failures?"
Previously `useWorkstationPreferencesViewModel` swallowed rejections while backend Identity entities omitted concurrency columns. Pairing `IConcurrencyAwareEntity.AdvanceRowVersion()` with `isConcurrencyConflictError` guarantees conflicts fail safely and trigger a fresh TanStack refetch.[](source:frontend_profile)

## What state transitions govern 3-provider RowVersion tokens? {#concurrency-lifecycle-panel}

@diagram lifecycle id=concurrency-lifecycle source=venue-identity-concurrency-lifecycle.lifecycle.json title="3-Provider Optimistic Concurrency & Profile Conflict Recovery Lifecycle"

@facts id=concurrency-facts
| Identity + Core Concurrency Tables | 19 tables (18 Identity + Core NotificationPreference) using HasMaxLength(16).IsConcurrencyToken() |
| Venue Concurrency & Receipts | GuestReservationAccess IsRowVersion() + venue.IdempotencyReceipts added in 3-DB migrations |
| Cross-Provider Migration Parity | 54 Idempotency migrations verified across 18 modules x 3 providers (SqlServer, Oracle, PostgreSql) |
| SignupSession Domain Guard | protected parameterless ctor + SignupSession.Create(...) factory + [Timestamp] RowVersion |

## How did the refactor move from baseline audit to Wave 3B gates? {#refactor-workflow-panel}

@workflow id=refactor-wf title="5-Wave Venue & Identity Refactoring Pipeline"
| lane audit | Baseline & Domain |
| lane impl | AstraFlow & 3-DB |
| lane gate | Verification |
| w_audit | Audit Venue & Identity | external | audit |
| w_domain | Harden Entity<Guid> | backend | audit |
| w_map | Migrate Maps & EF | backend | impl |
| w_db | Run 54 Migrations | database | impl |
| w_fe | Wire Profile 409 | frontend | gate |
| w_verify | Pass Wave 3B Gates | security | gate |
| w_audit > w_domain | scope map |
| w_domain > w_map | clean POCOs |
| w_map > w_db | zero EF in App |
| w_db > w_fe | 3-DB synced | emphasis |
| w_fe > w_verify | 24/24 FE pass | emphasis |

## How do compliance scores, structural limits, and tests compare before and after? {#before-after-metrics}

```mermaid title="Measured structural and concurrency violations across Venue and Identity before vs after refactor"
xychart-beta
  x-axis ["Venue >300L", "Identity >300L", "Multi-Type Files", "Legacy Rules", "Missing Concurrency"]
  y-axis "Count" 0 --> 200
  bar "Before" [12, 43, 192, 10, 19]
  bar "After" [0, 0, 0, 0, 0]
```

Each bar totals audited baseline findings (`41` Venue and `151` Identity multi-type files, `1` `IdentityConventionProfile` plus `9` Venue mapping rules, `19` missing `RowVersion` tables). Wave 3B Roslyn AST and migration gates verify zero remaining defects.[](source:gate_backend)

| Quality Gate / Metric | Baseline Before Refactor | Verified After Wave 3B | Gate Evidence |
| --- | --- | --- | --- |
| Venue `scripe arch-check` {#row-arch-venue} | Score `73/100` (`27` findings: `20` warn, `7` info) | Score `100/100` (`0` critical, `0` warning, `0` info) {good:100/100} | `scripe arch-check --target backend` |
| Identity & Controller `arch-check` {#row-arch-id} | EF Core in App, inverted `IQuery` commands, unguarded `pageSize` | Identity `100/100` (`0/0/0`), `0` violations in `7` controller dirs {good:100/100} | Global score `96/100` |
| Roslyn AST `<= 300L` & Single Type {#row-ast} | Venue `12` >300L (max `2,129L`); Identity `43` >300L (max `3,527L`); `192` multi-type files | `0` >300L across `2,177` `.cs` files (max `296L`), `0` `FILE-EXCEPTION`, `0` multi-type {good:0 / 2,177} | `0` missing type `<summary>`, `0` stacked |
| AstraFlow 2.3.0 Mappings {#row-af} | `IdentityConventionProfile.cs` + `9` `*MappingRule.cs` files | Static `[AstraGenerateMapping]` + `[AstraSensitive]` + `IdentityGuid` {good:doctor/validate 0} | `scripe astraflow doctor` & `inspect` |
| 3-Provider Concurrency & Migrations {#row-db} | `1` Identity concurrency table (`SignupSessions`); Venue omitted from receipts (`17/18`) | `19` Identity+Core `RowVersion` tables + Venue `GuestReservationAccess` + receipts {good:54 migrations (6/6)} | `IdempotencyMigrationPresenceTests` |
| Identity Feature Provider Split {#row-feat} | Single `795L` `IdentityFeatureProvider.cs` exceeding line ceiling | Split cleanly into `5` partial files under `300L` {good:68 features} | Restored `68` unique features |
| Backend Build & Test Suites {#row-be-tests} | Dirty pre-refactor workspace failures blocked `API.UnitTests` | `API.csproj` `0` errors / `0` warnings; `7/7` unit & app suites pass (`28` Venue + `4` Identity DB-skipped) {good:7/7 suites} | Plus `PendingSignupReaperJobTests` (`2/2`) |
| Frontend Profile & Locales {#row-fe-tests} | Profile omitted `rowVersion` on saves and swallowed update failures | End-to-end `rowVersion` + HTTP `409` invalidation; `3/3` files (`24/24` tests) {good:0 profile TS errors} | `108` pairs, `18,576` keys (`0` missing) |

## Which architectural trade-offs shaped the final implementation? {#adr-tradeoffs}

| Architectural Decision | Chosen Implementation | Rejected Alternative | Trade-Off & Guarantee |
| --- | --- | --- | --- |
| AstraFlow `AFM001` Inheritance Constraint {#row-adr-afm} | Flat `sealed *MapModel` (`System.Object`) + `[AstraValueConverter]` bridge {good:Compile-time C#} | Keep reflection `IdentityConventionProfile` or loosen analyzer rules | Adds small projection classes per aggregate while eliminating all runtime reflection. |
| Cross-DB Optimistic Concurrency {#row-adr-db} | `IConcurrencyAwareEntity.AdvanceRowVersion()` with `HasMaxLength(16).ValueGeneratedNever` {good:Identical on 3 DBs} | Rely on database `IsRowVersion()` across PostgreSQL | PostgreSQL `bytea rowVersion: true` lacks auto-increment without triggers; `BaseDbContext` rotates GUID tokens on all 3 engines. |
| Oracle Schema Resolution {#row-adr-oracle} | Canonical 1-arg `ToTable("GuestReservationAccesses")` {good:Stays in VENUE} | Hardcoded 2-arg schema strings (`ToTable(name, "venue")`) | Avoids Oracle case-sensitive lowercase schema drift and matches sibling Venue entity configurations. |
| Venue ADR-040 Idempotency {#row-adr-idem} | `AddModuleReceiptContext<VenueDbContext>("Venue")` + `UsesModuleReceiptStore => true` {good:Durable 3-TX} | Custom ad-hoc `BookingIdempotencyRecords` handler loops | Standardizes 2-minute leases, `ToIdempotent*Result` adapters, and `IdempotencyMigrationPresenceTests` coverage (`18/18`). |
| Strict `<= 300L` Decomposition {#row-adr-split} | `sealed partial` feature/handler splits + typed `Result` errors {good:0 FILE-EXCEPTION} | Retaining `// FILE-EXCEPTION` waivers in large handlers/seeders | Keeps every single class and controller concise while preserving namespace compatibility and testability. |

- [ ] Keep `SCRIPE-Backend` and `SCRIPE-Frontend` clean before committing submodule pointers.
- [ ] Run PostgreSQL / SQL Server live database acceptance tests when targeting integration DB instances (`28` Venue + `4` Identity env-gated tests were DB-skipped in offline unit run).
- [ ] Review `/archify/venue-identity-super-refactor` inside `SCRIPE-Docs-Portal` after `scripe build docs` passes.
