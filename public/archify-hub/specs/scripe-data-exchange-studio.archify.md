# How does SCRIPE Data Exchange Studio Deliver MENA Normalization, Streaming Excel Imports, and Partial Commits? {#scripe-data-exchange-studio}

SCRIPE Data Exchange Studio unifies enterprise spreadsheet imports, exports, and background execution across CRM, PartyKernel, and Identity modules. It pairs a **compact 1-button `Data Exchange` dropdown**, a **4-step Next.js 16 wizard with live normalization preview**, a **3-route Admin `data-transfer` module**, and an **AstraFlow 2.3.0 streaming engine**.[](source:dx_overview)

- The backend `OwaspSpreadsheetSecurityValidator` verifies magic bytes, blocks ZIP bombs, neutralizes formula payloads, and locks audit timestamps as `ExportOnly` via `IsImportDeniedField`.[](source:dx_owasp)
- `SpreadsheetValueNormalizer` runs deterministic `O(n)` MENA and enterprise transforms with zero user regexes, while `ColumnNormalizationPopover` renders live `Raw -> Normalized` previews in Step 2.[](source:dx_normalizer)
- `DataTransferImmediateWorker` dispatches via `Channel<Guid>`, applies `.IgnoreQueryFilters()` before `DataExchangeAmbientContext.Begin(snapshot)`, and handles `DbUpdateConcurrencyException` safely on concurrent cancellation.[](source:dx_worker)
- `GenericCrudView` pages mount one compact `@core/ui/dropdown-menu` `Data Exchange` trigger inside `CrmSectionHeader`, while `/admin/data-exchange` provides 3 dedicated `GenericCrudView<T>` routes.[](source:dx_admin_mvvm)

@answer scope="SCRIPE Data Exchange Studio · O(n) MENA Normalization · Compact Dropdown Toolbar · 3-Route Admin MVVM · Immediate Worker Tenant Fix · OWASP Security · 10 Entity Providers"
@meta locale=en style=editorial quality_profile=showcase
@source dx_overview title="SCRIPE Data Exchange Studio Architecture Overview" url=https://docs.scripe.org/architecture/data-exchange-studio
@source dx_owasp title="OWASP Spreadsheet Security & Formula Neutralization" url=https://docs.scripe.org/security/owasp-spreadsheet-validator
@source dx_normalizer title="O(n) MENA & Enterprise Normalization Engine" url=https://docs.scripe.org/backend/spreadsheet-value-normalizer
@source dx_stream title="OpenXML SpreadsheetStreamEngine & 3-Tab Templates" url=https://docs.scripe.org/backend/spreadsheet-stream-engine
@source dx_worker title="DataTransferImmediateWorker Tenant Snapshot & Concurrency" url=https://docs.scripe.org/backend/data-transfer-immediate-worker
@source dx_orchestrator title="DataExchangeOrchestrator Dry-Run & Partial Commit Engine" url=https://docs.scripe.org/backend/data-exchange-orchestrator
@source dx_providers title="10 Pluggable IEntityDataExchangeProvider Contracts" url=https://docs.scripe.org/backend/entity-data-exchange-providers
@source dx_quota_fls title="Atomic Edition Quota Leases & Field-Level Security" url=https://docs.scripe.org/security/quota-and-fls-governance
@source dx_studio_ui title="Compact Dropdown Toolbar & ColumnNormalizationPopover" url=https://docs.scripe.org/frontend/data-exchange-studio-overlay
@source dx_admin_mvvm title="3-Route Admin DataTransfer 5-Layer MVVM Module" url=https://docs.scripe.org/frontend/admin-data-transfer-module

## How does the 4-step Data Exchange Studio pipeline normalize, validate, and commit spreadsheets? {#data-exchange-pipeline}

@sequence id=data-exchange-sequence title="Streaming Data Exchange, O(n) MENA Normalization, Tenant Snapshot & Partial Commit Sequence"
| actor user | Tenant Operator | external |
| actor studio | Studio & Popover | frontend |
| actor owasp | OwaspValidator | security |
| actor worker | ImmediateWorker | backend |
| actor orchestrator | Orchestrator | backend |
| actor quota | QuotaService | security |
| actor db | DataTransferDb | database |
| phase | 1. Compact Dropdown Trigger & OWASP Stream Gate |
| user | studio | Open Data Exchange Dropdown & Upload Workbook | emphasis |
| studio | owasp | POST /api/v1/data-transfer/{entity}/dry-run | security |
| owasp | orchestrator | Verify Magic Bytes, ZIP Ratio & Sanitize Formulas | emphasis |
| phase | 2. MENA Normalization, Live Preview & Dry-Run |
| studio | orchestrator | Configure 17-Rule Transform & Preview Normalized Values | emphasis |
| orchestrator | db | Run O(n) Normalizer & 10-Provider Dry-Run | emphasis |
| db | studio | Return Dry-Run Summary & Custom Field cf:\* Diagnostics | return |
| phase | 3. Channel Worker, Tenant Snapshot & Cancel Safety |
| user | studio | Enqueue Commit or Export Job (POST /export/jobs) | emphasis |
| studio | worker | Enqueue Job ID via Bounded Channel Queue | emphasis |
| worker | orchestrator | Load Job via IgnoreQueryFilters & Enter AmbientContext | emphasis |
| orchestrator | quota | Reserve Atomic Edition Quota Lease | security |
| orchestrator | db | Commit Chunks & Guard DbUpdateConcurrencyException | emphasis |
| db | studio | Poll Progress (2s) to FloatingDock & Progress Bar | return |
| phase | 4. Recovery Loop, Ephemeral Vault & Admin Routes |
| user | studio | Optional: Cancel Job (POST /jobs/{id}/cancel) | security |
| studio | worker | Reload Cancelled Row & Reconcile Reserved Quota | security |
| orchestrator | db | Persist Valid Rows + Generate Rejected .xlsx | emphasis |
| db | studio | Sileo Alerts, Ephemeral Vault & /admin/data-exchange | return |

@steps id=data-exchange-steps
| st_upload | Compact Dropdown & Upload | Operator opens one compact Data Exchange dropdown inside CrmSectionHeader or GenericCrudView. | data-exchange-sequence | user |
| st_owasp | OWASP Gate & Timestamp Lock | Validator verifies file signatures, blocks ZIP bombs, and denies inbound audit timestamps. | data-exchange-sequence | owasp |
| st_norm | O(n) MENA Normalizer & Popover | ColumnNormalizationPopover previews 17 DataExchangeTransformRule transforms before running dry-run validation. | data-exchange-sequence | orchestrator |
| st_worker | Tenant-Safe Channel Dispatch | ImmediateWorker queries pending jobs with IgnoreQueryFilters and enters DataExchangeAmbientContext per job. | data-exchange-sequence | worker |
| st_commit | Concurrency-Safe Commit & Recovery | Orchestrator reloads on DbUpdateConcurrencyException, reconciles quota leases, and exports rejected rows. | data-exchange-sequence | db |

The pipeline separates transformation preview from batch persistence through a staged protocol. Operators tune normalization rules and inspect cell diagnostics before committing records.[](source:dx_orchestrator)

| Pipeline Stage | Core Component | Execution Behavior | Operational Guarantee |
| --- | --- | --- | --- |
| 1. Compact Dropdown & Upload {#stage-template} | `DataExchangeToolbarActions` & `SpreadsheetStreamEngine` | Renders one `@core/ui/dropdown-menu` trigger (`dx-trigger-{entityKey}`) and builds 3-tab `.xlsx` templates | {good:Zero filter-bar overflow} |
| 2. OWASP & Timestamp Gate {#stage-security} | `OwaspSpreadsheetSecurityValidator` | Blocks macros, ZIP bombs, and formula injection, enforcing `ExportOnly` timestamps | {good:OWASP & ExportOnly locked} |
| 3. MENA Normalizer & Dry-Run {#stage-normalizer} | `SpreadsheetValueNormalizer` & `DataExchangeOrchestrator` | Runs linear-time `O(n)` MENA transforms and verifies SHA-256 schema compatibility hashes | {good:ReDoS-free preview parity} |
| 4. Tenant-Safe Worker Queue {#stage-worker} | `DataTransferImmediateWorker` & `DataExchangeAmbientContext` | Dispatches via `Channel<Guid>`, loads jobs with `.IgnoreQueryFilters()`, enters tenant context | {good:Multi-tenant worker safe} |
| 5. Concurrency & Recovery {#stage-commit} | `DataExchangeOrchestrator` & `DataExchangeFloatingDock` | Reloads cancelled jobs on `DbUpdateConcurrencyException` and exports rejected rows `.xlsx` | {good:Self-service error recovery} |

## How does the O(n) MENA & Enterprise Normalization Engine standardize spreadsheet data safely? {#mena-normalization-engine}

Every spreadsheet cell flows through deterministic linear-time normalization before type parsing or provider persistence. Neither backend C# nor frontend TypeScript accepts user-supplied regular expressions, eliminating ReDoS risks across untrusted uploads.[](source:dx_normalizer)

| Normalization Capability | Method or Transform Field | Deterministic Transformation Behavior | Supported Edge Cases |
| --- | --- | --- | --- |
| Null Placeholders {#norm-null} | `IsNullPlaceholder` & `CanonicalizeNullTokens` | Maps `N/A`, `#N/A`, `NA`, `null`, `nil`, `none`, `-`, `—`, `--`, `غير متاح`, and `لا يوجد` to `null` | {good:Optional-safe nulls} |
| Unicode & Invisible Chars {#norm-unicode} | `NormalizeUnicodeCompatibility` & `CollapseWhitespace` | Applies NFKC, replaces NBSP `\u00A0`, strips zero-width and Bidi isolates, unescapes `'+digit` | {good:Clean copy-paste text} |
| Arabic Script Hygiene {#norm-arabic} | `NormalizeArabicText` & `StripArabicDiacritics` | Strips Tashkeel `\u064B-\u065F`, `\u0670`, Tatweel `\u0640`, with optional Alef/Ya folding | {good:MENA bilingual parity} |
| Currency & Accounting {#norm-currency} | `TryParseDecimalStrict` & `ConvertAccountingNegatives` | Parses `SAR`, `EGP`, `AED`, `USD`, `EUR`, `GBP`, `%`, `(1,250.50)` negatives, and `1.250,50` | {good:Rejects alpha formulas} |
| E.164 Phone & Email {#norm-contact} | `NormalizePhoneNumber` & `NormalizeEmailAddress` | Normalizes Arabic digits, swaps `00` to `+`, prepends `DefaultCountryDialCode`, extracts `Name <addr>` | {good:RFC & E.164 ready} |
| Enum, Timezone & Lists {#norm-enum} | `NormalizeTokenKey` & `SplitAndDeduplicateMultiValues` | Matches enums separator-insensitively, converts `SourceTimeZoneId` to UTC, deduplicates delimited lists | {good:Zero-alloc token match} |

@callout level=note title="17-Rule Frontend & Backend Normalization Parity"
Both `DataExchangeTransformRule` in `Core.Application` and `previewNormalizedSample` in `mapping-validation.ts` share identical 17-option semantics. Operators configure rules inside `ColumnNormalizationPopover` during Step 2 and inspect `Raw -> Normalized` outputs live before submitting dry-run jobs.[](source:dx_studio_ui)

## How do the Backend Orchestrator, Worker Tenant Context, and Providers enforce security and concurrency? {#backend-governance-security}

@facts id=data-exchange-facts
| Sovereign Schema | Isolated datatransfer schema managing DataTransferJob with ProcessedRows and DataTransferRowError |
| Worker Tenant Isolation | IgnoreQueryFilters loads queued job rows before entering DataExchangeAmbientContext.Begin(snapshot) |
| Concurrency Guard | ReloadAsync catches DbUpdateConcurrencyException when POST /jobs/{id}/cancel bumps RowVersion |
| OWASP Protection | Blocks =, +, -, @, tab, and CR/LF formula triggers on import, export, and rejected workbooks |
| Timestamp Protection | IsImportDeniedField forces CreatedAt, UpdatedAt, and ModifiedAt to ExportOnly status |
| Compatibility Lock | SHA-256 schema fingerprint prevents importing outdated spreadsheet templates |
| Search & Status API | ListJobs accepts search and status query filters while ListPresets supports search filtering |
| Quota & FLS Governance | IQuotaCounterService reserves atomic edition leases while IRestrictedFieldsResolver prunes PII |
| 10 Entity Providers | Complete parity across 5 CRM, 3 PartyKernel, and 2 Identity user and admin providers |
| Onboarding Vault | Ephemeral one-time credential export for bulk Identity user and admin provisioning |

Every module integrates with `DataExchangeOrchestrator` through `IEntityDataExchangeProvider`. Background execution resolves tenant scope cleanly per job and prevents cancel races from crashing worker loops.[](source:dx_worker)

| Governance Layer | Backend Service | Enforcement Mechanism | Security Outcome |
| --- | --- | --- | --- |
| Worker Tenant Scope {#gov-tenant} | `DataTransferImmediateWorker` & `DataExchangeAmbientContext` | Queries queued jobs with `.IgnoreQueryFilters()` (`!IsDeleted`), then scopes tenant from `ActorSnapshotJson` | {good:Tenant-safe worker execution} |
| Concurrency Cancellation {#gov-cancel} | `DataExchangeOrchestrator` & `IDataTransferCancellationRegistry` | Catches `DbUpdateConcurrencyException`, reloads row, honors `Cancelled` status, reconciles quota hold | {good:Zero race crashes} |
| OWASP & Timestamp Gate {#gov-owasp} | `OwaspSpreadsheetSecurityValidator` | Magic-byte checks, ZIP ratio limits, formula escaping, and `IsImportDeniedField` enforcement | {good:OWASP A03/A04 compliant} |
| Edition Quota & FLS {#gov-quota} | `IQuotaCounterService` & `IRestrictedFieldsResolver` | Reserves atomic edition leases pre-commit and strips unauthorized fields from templates and rows | {good:Zero quota or PII leaks} |
| 10 Pluggable Providers {#gov-providers} | CRM, PartyKernel, and Identity Providers | Batch upserts across 5 CRM, 3 Party (`party.contact-point`), and 2 Identity entities with `cf:*` fields | {good:100% module parity} |

## How do the Compact Toolbar, Popover, and 3-Route Admin MVVM Module work across Frontend pages? {#frontend-studio-recovery}

Replacing multi-button toolbars with one compact `@core/ui/dropdown-menu` trigger eliminates filter-bar overflow on every CRM page. Meanwhile, a dedicated 3-route `@modules/data-transfer` Admin module replaces legacy hub views using strict 5-layer SOLID MVVM.[](source:dx_admin_mvvm)

| Frontend Surface | Component or Route | UX Behavior & Design System Compliance | Architectural Benefit |
| --- | --- | --- | --- |
| Compact CRM Header Trigger {#ui-toolbar} | `DataExchangeToolbarActions` & `CrmSectionHeader` | Renders one `dx-trigger-{entityKey}` dropdown inside section headers with `hideToolbarActions: true` in CRUD | {good:No Table/Kanban clipping} |
| Flex-Hardened Filter Bar {#ui-crud} | `GenericCrudView` | Adds `flex-wrap` and `shrink-0` on view-mode toggles for `hidePageHeader` pages across all modules | {good:Responsive across viewports} |
| Step 1 & Header Polish {#ui-step1} | `DataExchangeStudioOverlay` | Removes header `Cancel` collision with `DialogContent` close button and drops `div[role="button"]` nesting | {good:Clean a11y & token contrast} |
| Step 2 Live Normalization {#ui-step2} | `ColumnNormalizationPopover` | `@core/ui/popover` per column showing active transform pill and live `Raw -> Normalized` preview | {good:Instant mapping feedback} |
| Admin Entity Catalog {#ui-admin-entities} | `/admin/data-exchange` (`EntitiesCatalogView`) | `GenericCrudView<T>` (`Table`, `CardGrid`, `SplitPane`) launching Studio, Multi-Sheet, Export, and Templates | {good:5-layer SOLID MVVM} |
| Admin Execution History {#ui-admin-jobs} | `/admin/data-exchange/jobs` (`JobsHistoryView`) | Server `search` and `status` filtering, KPI strip, cooperative Cancel `ConfirmationDialog`, and error downloads | {good:Observable operations} |
| Admin Saved Presets {#ui-admin-presets} | `/admin/data-exchange/presets` (`PresetsCatalogView`) | Server `search` filtering across saved column maps and 17-rule transforms with safe deletion dialogs | {good:Reusable tenant presets} |

- [x] `Core.Application` `SpreadsheetValueNormalizer` and 17-property `DataExchangeTransformRule` verified with deterministic `O(n)` MENA transforms.
- [x] `DataExchangeOrchestrator` background worker fixed with `.IgnoreQueryFilters()` tenant snapshot scoping and `DbUpdateConcurrencyException` reload safety.
- [x] `DataTransferMenuProvider` and `PAGE_PERMISSIONS` wired for `/admin/data-exchange`, `/admin/data-exchange/jobs`, and `/admin/data-exchange/presets`.
- [x] `DataExchangeToolbarActions` consolidated into one compact `@core/ui/dropdown-menu` trigger across CRM section headers and `GenericCrudView`.
- [x] `ColumnNormalizationPopover` and `previewNormalizedSample` verified in Step 2 with live `Raw -> Normalized` preview.
- [x] Legacy `DataExchangeAdminHubView` replaced by 3-route 5-layer SOLID MVVM `@modules/data-transfer` module powered by `GenericCrudView<T>`.
- [x] Archify explainer, architecture, and workflow diagrams verified and registered in `SCRIPE-Docs-Portal`.