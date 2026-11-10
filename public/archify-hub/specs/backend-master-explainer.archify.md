# How is SCRIPE-Backend architected for zero-trust, multi-DB modular scale? {#scripe-backend-deep-dive}

SCRIPE-Backend runs a **zero-trust .NET 10 modular monolith** powered by **AstraFlow 2.3.0** that can split into server roles and multi-DB engines without code changes.[](source:program_entry)

- Every request passes ordered origin, JWT revocation, CSRF, replay, and tenant guards before reaching a controller.[](source:middleware_pipeline)
- AstraFlow runs six ordered behaviors (`Logging` to `Caching` + `Idempotency`) and sequential notifications across 927+ handlers.[](source:core_app_di)
- Startup DI guards enforce cross-module contract pairs so server-role splits fail at boot, not on traffic.[](source:module_reg)
- `BaseDbContext` commits domain rows, `outbox_messages`, and `idempotency_receipts` per module schema across PostgreSQL, SQL Server, and Oracle.[](source:base_dbcontext)

@answer scope=".NET 10 · AstraFlow 2.3.0 · 18 Modules · 927+ CQRS Handlers · PostgreSQL / SQL Server / Oracle"
@meta locale=en style=editorial quality_profile=showcase repo_url=https://github.com/SCRIPE-org/SCRIPE-Backend.git repo_revision=f941b1500a9ef98b0f81bdb473d1306f554d6526
@source program_entry title="Host API Entry Point" path=src/Host/API/Program.cs lines=18:35
@source middleware_pipeline title="29-Stage Middleware Pipeline" path=src/Host/API/Extensions/MiddlewarePipeline.cs lines=48:104
@source middleware_security title="Auth, CSRF, Replay & Tenant Guards" path=src/Host/API/Extensions/MiddlewarePipeline.cs lines=230:293
@source module_reg title="Conditional Module Registration & DI Guards" path=src/Host/API/Extensions/ModuleRegistration.cs lines=69:182
@source core_app_di title="AstraFlow Mediator & Pipeline Registration" path=src/Core/Core.Application/DependencyInjection.cs lines=59:117
@source idempotency_tx title="3-Transaction Durable Module Receipt Store" path=src/Core/Core.Application/Behaviors/IdempotencyBehavior.cs lines=346:490
@source base_dbcontext title="BaseDbContext SaveChanges & Outbox Capture" path=src/Core/Core.Infrastructure/Database/BaseDbContext.cs lines=280:361
@source tenant_filters title="Expression-Tree Tenant Query Filters" path=src/Core/Core.Infrastructure/Database/BaseDbContext.cs lines=450:553
@source multi_db title="Multi-Provider Module Database Registration" path=src/Core/Core.Infrastructure/Database/DatabaseExtensions.cs lines=200:272
@source outbox_proc title="OutboxProcessorJob Distributed Polling" path=src/Core/Core.Infrastructure/Outbox/OutboxProcessor.cs lines=55:176
@source quote_handler title="CalculatePriceQuoteCommandHandler" path=src/Modules/CatalogPricing/CatalogPricing.Application/Commands/CalculatePriceQuoteCommandHandler.cs lines=86:166

## How do requests flow from edge ingress to schema-isolated persistence? {#system-topology}

@diagram architecture id=backend-arch source=backend-architecture.architecture.json title="SCRIPE-Backend End-to-End Architecture"

@steps id=arch-tour
| step_edge |Middleware Pipeline| Enforces Cloudflare origin secret, rate limits, JWT revocation via `IAccountRevocationCache`, CSRF, replay nonce, and `X-Tenant-Context`. | backend-arch | http_pipeline |
| step_ctrl |API Controllers| Versioned REST controllers check `[PermissionRequired]` and send typed commands to `ISender` without business exceptions. | backend-arch | controllers |
| step_med |AstraFlow Mediator| Runs `Logging`, `Validation`, `Idempotency`, `Authorization`, `Caching`, and `PerformanceBehavior`. | backend-arch | mediator |
| step_hdl |18 Module Handlers| Executes domain logic and synchronous cross-module reads (`ICatalogPricingCalculationService`) returning `Result<T>`. | backend-arch | handlers |
| step_db |BaseDbContext & UoW| Applies expression-tree `TenantId` filters, UTC conversion, `RowVersion` bumps, and atomic outbox capture in one transaction. | backend-arch | base_dbcontext |
| step_out |OutboxProcessorJob| Acquires distributed lock and publishes pending events to `IEventBus` or `IDomainEventPublisher`. | backend-arch | outbox_processor |

## How does a mutating command guarantee at-most-once execution and at-least-once events? {#command-sequence}

@sequence id=cqrs-flow title="3-Transaction Idempotency & Transactional Outbox Flow"
| actor ctrl | API Controller | backend | source:quote_handler |
| actor med | IdempotencyBehavior | backend | source:idempotency_tx |
| actor cache | Redis L1 Cache | database | source:idempotency_tx |
| actor hdl | CommandHandler | backend | source:quote_handler |
| actor db | BaseDbContext (DB) | database | source:base_dbcontext |
| actor outbox | OutboxProcessorJob | backend | source:outbox_proc |
| phase | 1. Fast L1 Check & Autonomous Claim TX |
| ctrl | med | Send(Command + IdempotencyKey) | emphasis |
| med | cache | GET idempotency:receipt |
| cache | med | L1 Miss | return |
| med | db | TX 1: INSERT InProgress claim (2m lease) | security |
| db | med | Claim committed | return |
| phase | 2. Business TX + Atomic Outbox & Receipt Completion |
| med | hdl | next() -> Handle(Command) | emphasis |
| hdl | db | TX 2: SaveChanges (Entity + OutboxMessage) | emphasis |
| med | db | TX 2/3: UPDATE Receipt Status=Completed (AES-GCM) | security |
| med | cache | SET L1 receipt cache (24h TTL) | dashed |
| med | ctrl | Result<T> (201 Created) | return |
| phase | 3. Asynchronous Outbox Dispatch |
| outbox | db | Poll unprocessed OutboxMessages (Batch=50) | dashed |
| db | outbox | Pending Domain / Integration Events | return |
| outbox | db | Mark ProcessedOn = UtcNow | emphasis |

@callout level=note title="Why three separate persistence phases?"
Transaction 1 commits the `InProgress` claim row immediately so concurrent duplicate requests hit the unique index `(TenantId, ActorKey, Operation, KeyHash)` and return `409 Conflict` instead of racing inside the handler.[](source:idempotency_tx)

## How are the 18 modules organized and guarded across deployment modes? {#module-hierarchy}

@tree id=module-tree title="SCRIPE-Backend 3-Layer Core & 18 Business Modules"
| root | SCRIPE-Backend | - |
| host | Host (API) | root |
| core | Core (Domain / App / Infra) | root |
| sec_mods | Security & Platform | root |
| ops_mods | Sports & Venue Ops | root |
| com_mods | Commercial & Enterprise | root |
| m_id | Identity & Auth | sec_mods |
| m_ent | Entitlements & Quotas | sec_mods |
| m_comp | Compliance & Audit | sec_mods |
| m_cf | CustomFields & FLS | sec_mods |
| m_ven | Venue & Booking | ops_mods |
| m_org | OrganizationCore | ops_mods |
| m_pk | PartyKernel | ops_mods |
| m_wm | WorkManagement | ops_mods |
| m_cat | CatalogPricing | com_mods |
| m_fin | Finance & Receivables | com_mods |
| m_crm | CRM & Pipelines | com_mods |
| m_other | Media, Comms, Hrms & Plugins | com_mods |

| Architectural Axis | Mode 1: Single Monolith / Single DB | Mode 2: Server Roles / Multi-DB |
| --- | --- | --- |
| Process Topology {#row-proc} | `MODULE_NAME` unset loads all 18 modules in one host {good:Zero network hop} | `MODULE_NAME` loads role slice; YARP routes external traffic {caution:Requires DI co-deployment guards} |
| Cross-Module Auth & Feature Checks {#row-auth} | In-memory `PermissionChecker` and `FeatureChecker` | `HttpPermissionReader` and `HttpFeatureChecker` signed with `InternalServiceRequestSigner` {good:Fail-closed} |
| Database Topology {#row-db} | Shared `Database:ConnectionString` with strict per-module schemas (`identity.*`, `venue.*`) {good:Zero dbo collapse} | Per-module `Database:Modules:{Name}:ConnectionString` across SQL Server, PostgreSQL, or Oracle {good:Zero code change} |
| Event Delivery {#row-events} | `InProcessEventBus` + `NotificationPublishStrategy.Sequential` | MassTransit `RabbitMqEventBus` with `IntegrationEventConsumer<T>` bridging to AstraFlow |

## What do the core pipeline and persistence seams look like in code? {#code-evidence}

@code source=core_app_di language=csharp

@code source=base_dbcontext language=csharp
