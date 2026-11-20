# How does SCRIPE-Backend enforce 5-layer zero-trust security and multi-DB tenant isolation? {#backend-security-persistence}

SCRIPE-Backend enforces a **29-stage ordered HTTP middleware gate**, **fail-closed Redis JWT revocation**, **expression-tree tenant query filters**, and **Dual-Mode persistence** across PostgreSQL, SQL Server, and Oracle.[](source:mw_sec_stages)

- Every mutating request must clear Cloudflare origin verification, rate limits, JWT revocation, CSRF, replay nonce, and PBAC before entering AstraFlow.[](source:mw_early_stages)
- `BaseDbContext` compiles expression-tree global filters for `TenantId` and `!IsDeleted` on every entity while stamping UTC audit trails.[](source:db_tenant_filters)
- `AddModuleMultiProviderDatabase` resolves each module's `DbContext` to either the shared physical database (Mode 1) or a dedicated module database (Mode 2) while preserving isolated schemas.[](source:db_multi_provider)
- Sensitive PII and idempotency receipt payloads are encrypted with **AES-GCM** and external IDs are obfuscated via `ScripeSecureIdCodec`.[](source:idem_encryption)

@answer scope="29-Stage HTTP Gate · PBAC (RBAC+GBAC+ABAC) · AES-GCM · PostgreSQL / SQL Server / Oracle"
@meta locale=en style=editorial quality_profile=showcase repo_url=https://github.com/SCRIPE-org/SCRIPE-Backend.git repo_revision=f941b1500a9ef98b0f81bdb473d1306f554d6526
@source mw_early_stages title="Middleware Stages 1-6 (Headers, OTel, Rate Limits)" path=src/Host/API/Extensions/MiddlewarePipeline.cs lines=48:104
@source mw_sec_stages title="Auth, Revocation, CSRF, Replay & Tenant Pipeline" path=src/Host/API/Extensions/MiddlewarePipeline.cs lines=230:293
@source jwt_revocation title="JWT Bearer & Fail-Closed Account Revocation" path=src/Core/Core.Infrastructure/DependencyInjection.cs lines=544:652
@source db_schema_tables title="Per-Schema Outbox, Inbox & Idempotency Tables" path=src/Core/Core.Infrastructure/Database/BaseDbContext.cs lines=185:274
@source db_tenant_filters title="Expression-Tree Tenant & Soft-Delete Filters" path=src/Core/Core.Infrastructure/Database/BaseDbContext.cs lines=450:553
@source db_multi_provider title="Dual-Mode Multi-Provider Database Registration" path=src/Core/Core.Infrastructure/Database/DatabaseExtensions.cs lines=200:272
@source idem_encryption title="AES-GCM Encrypted Idempotency Receipts" path=src/Core/Core.Application/Behaviors/IdempotencyBehavior.cs lines=346:490

## How are the 5 defense layers and Dual-Mode schemas wired across the backend host? {#sec-topology}

@diagram architecture id=sec-arch source=backend-architecture.architecture.json title="SCRIPE-Backend Security & Persistence Topology"

@facts id=security-layer-facts
| Layer 1: Network & Ingress | TLS 1.3, ForwardedHeaders, Cloudflare origin guard, strict CORS, and per-user/login/global rate limiting |
| Layer 2: Authentication | 15-minute access JWT + 30-day httpOnly refresh cookie + fail-closed Redis IAccountRevocationCache |
| Layer 3: Authorization (PBAC) | Declarative [PermissionRequired] combining RBAC roles, GBAC groups, and ABAC resource policies |
| Layer 4: Data & Tenant Isolation | Expression-tree TenantId query filters, AES-GCM PII encryption, and ScripeSecureIdCodec opaque IDs |
| Layer 5: Immutable Audit | Automatic before/after JSON field diffs written to core.audit_logs inside BaseDbContext.SaveChangesAsync |

## How does the 29-stage security gate validate and authorize a mutating request? {#sec-sequence}

@sequence id=sec-gate-seq title="Zero-Trust Ingress, Revocation Check, Replay Guard & Tenant Filter"
| actor client | API Caller | external | source:mw_early_stages |
| actor mw | MiddlewarePipeline | security | source:mw_sec_stages |
| actor redis | Redis Revocation/Nonce | database | source:jwt_revocation |
| actor pbac | PBAC Auth Handler | security | source:mw_sec_stages |
| actor db | BaseDbContext | database | source:db_tenant_filters |
| phase | 1. Ingress, JWT Revocation & Replay Nonce Verification |
| client | mw | POST /api/v1/venue/reservations (JWT + CSRF + Nonce) | emphasis |
| mw | redis | Check IAccountRevocationCache & Replay Nonce | security |
| redis | mw | Token Active & Nonce Fresh | return |
| phase | 2. Tenant Context & PBAC Policy Evaluation |
| mw | pbac | Evaluate [PermissionRequired] + Tenant Claim | security |
| pbac | mw | Policy Granted | return |
| phase | 3. Expression-Tree Tenant-Filtered Persistence |
| mw | db | Execute Handler -> SaveChangesAsync (TenantId == Current) | emphasis |
| db | client | 200 OK Result<T> (Sensitive Fields Redacted) | return |

@callout level=warning title="Fail-Closed Account Revocation & Cross-Tenant Guard"
If a user's role or session is revoked, `IAccountRevocationCache` immediately blocks active 15-minute JWTs before they expire. At the data layer, `BaseDbContext` rejects any entity mutation whose `TenantId` mismatches the authenticated `ICurrentUser.TenantId`.[](source:jwt_revocation)

## How does Dual-Mode persistence adapt across PostgreSQL, SQL Server, and Oracle? {#dual-mode-table}

| Persistence Dimension | Mode 1: Single Physical Database | Mode 2: Multi-Database (Per-Module DBs) |
| --- | --- | --- |
| Connection Config {#row-conn} | Shared `Database:ConnectionString` {good:Zero infra overhead} | `Database:Modules:{Module}:ConnectionString` {good:Independent scaling} |
| Schema Isolation {#row-schema} | Mandatory `identity.*`, `venue.*`, `crm.*`, `pricing.*` {good:Zero dbo/public pollution} | Retains module schema inside dedicated physical database |
| Outbox & Receipts {#row-outbox} | Per-schema `{module}.outbox_messages` & `idempotency_receipts` | Per-database `{module}.outbox_messages` & `idempotency_receipts` |
| Provider Support {#row-prov} | PostgreSQL, SQL Server, Oracle (<=30-char safe identifiers) | Can mix providers per module without changing Domain/Application code |

## How are the middleware security gates and multi-provider DbContexts implemented? {#sec-code}

@code source=mw_sec_stages language=csharp

@code source=db_multi_provider language=csharp
