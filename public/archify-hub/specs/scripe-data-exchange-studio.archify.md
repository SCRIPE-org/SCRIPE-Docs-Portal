# How does SCRIPE Data Exchange Studio Unify Portal UX, 17-Rule MENA Normalization, 5-Sheet DAG Imports, and CRUD Actions? {#scripe-data-exchange-studio}

SCRIPE Data Exchange Studio unifies **full-viewport portal UX**, 17-rule MENA normalization, 5-sheet topological CRM migrations, and `GenericCrudView` action menus across CRM, PartyKernel, and Identity.[](source:dx_overview)

- `DataExchangeStudioOverlay` mounts via `createPortal` at `z-[900]` with body scroll lock and `StudioConfirmExitDialog` (`z-[960]`) guarding unsaved work.[](source:dx_studio_ui)
- `ColumnNormalizationPopover` (`z-[950]`) exposes all 17 `O(n)` `DataExchangeTransformRule` options in a context-smart scrollable body paired with Step 2 `@core/ui/tooltip` diagnostics.[](source:dx_normalizer)
- `DataExchangeOrchestrator` executes 5-sheet CRM topological DAG imports (`Account -> Contact -> Lead -> Opportunity -> Activity`) while `sileo-toast` morphs `dx-job-{id}` states in place.[](source:dx_orchestrator)
- All 8 Admin, CRM, and Party views standardize on `GenericCrudView` `getActions` `⋯` dropdowns and flat matte Nexus `CardGrid` slabs.[](source:dx_admin_mvvm)

@answer scope="16 PBAC Endpoints · Portal Studio z-900 · 17-Rule Normalizer · 5-Sheet DAG · 7-Lang Docs"
@meta locale=en style=editorial quality_profile=showcase
@source dx_overview title="SCRIPE Data Exchange Studio Architecture Overview" url=https://docs.scripe.org/architecture/data-exchange-studio
@source dx_studio_ui title="Full-Viewport Portal Studio & StudioConfirmExitDialog" url=https://docs.scripe.org/frontend/data-exchange-studio-overlay
@source dx_normalizer title="17-Rule O(n) MENA & Enterprise Normalization Engine" url=https://docs.scripe.org/backend/spreadsheet-value-normalizer
@source dx_orchestrator title="5-Sheet Topological DAG & DataExchangeOrchestrator" url=https://docs.scripe.org/backend/data-exchange-orchestrator
@source dx_worker title="DataTransferImmediateWorker Tenant Snapshot & Concurrency" url=https://docs.scripe.org/backend/data-transfer-immediate-worker
@source dx_owasp title="OWASP Spreadsheet Security & Formula Neutralization" url=https://docs.scripe.org/security/owasp-spreadsheet-validator
@source dx_admin_mvvm title="Unified GenericCrudView Actions & Executive Nexus CardGrid" url=https://docs.scripe.org/frontend/admin-data-transfer-module
@source dx_sileo title="Idiomatic sileo-toast ID-Morphing & Localized Entity Names" url=https://docs.scripe.org/frontend/data-exchange-sileo-lifecycle
@source dx_docs title="7-Language SCRIPE Docs Portal (EN/AR/DE/ES/FR/RU/ZH) Parity" url=https://docs.scripe.org/technical/modules/data-transfer-overview

## How does the Full-Viewport Portal Studio (`z-[900]`) coordinate validation, worker execution, and Sileo morphing? {#portal-studio-pipeline}

@sequence id=dx-portal-sequence title="Portal Studio (z-900), 17-Rule Popover (z-950), Worker Context & Sileo Morphing"
| actor operator | Tenant Operator | external |
| actor portal | Portal Studio | frontend |
| actor popover | Normalizer z-950 | frontend |
| actor orchestrator | DAG Orchestrator | backend |
| actor worker | ImmediateWorker | backend |
| actor sileo | Sileo & Dock | frontend |
| phase | 1. Full-Viewport Portal Launch & OWASP Inspect |
| operator | portal | Open Data Exchange Dropdown & Mount Portal (z-900) | emphasis |
| portal | orchestrator | Upload .xlsx for Magic-Byte & ZIP-Ratio Inspect | security |
| orchestrator | portal | Return Sheets, Sample Rows & Compatibility Hash | return |
| phase | 2. Tooltip Validation & 17-Rule Context-Smart Popover |
| operator | popover | Hover Incompatible Row Tooltip or Open Normalizer | emphasis |
| popover | portal | Apply Smart Preset & Preview Raw -> Transformed | return |
| portal | orchestrator | Run 5-Sheet DAG Dry-Run & Edition Quota Check | emphasis |
| phase | 3. Tenant-Safe Worker & Sileo ID-Morphing Lifecycle |
| portal | worker | Enqueue Job & Emit sileo-toast (id: dx-job-{id}) | emphasis |
| worker | orchestrator | Query IgnoreQueryFilters & Enter AmbientContext | security |
| orchestrator | sileo | Morph dx-job-{id} Pill (Queued -> Running -> Done) | return |

@steps id=dx-portal-steps
| st_portal | Portal Studio | Mounts on document.body at z-900 with w-screen h-screen overflow-hidden and body scroll lock. | dx-portal-sequence | portal |
| st_popover | Normalizer z-950 | Layers tooltips, selects, and the 17-rule normalizer at z-950 above the z-900 studio shell. | dx-portal-sequence | popover |
| st_dag | DAG Orchestrator | Validates OWASP signatures, runs O(n) MENA transforms, and resolves 5-sheet CRM parent keys. | dx-portal-sequence | orchestrator |
| st_worker | ImmediateWorker | Claims queued jobs with IgnoreQueryFilters and enters DataExchangeAmbientContext per tenant. | dx-portal-sequence | worker |
| st_sileo | Sileo & Dock | Updates one toast pill in place via id dx-job-{id} using localized entity display names. | dx-portal-sequence | sileo |

Decomposing the monolithic overlay into eight focused sub-components under `presentation/components/studio/` keeps every file within `250` lines while isolating z-index layers cleanly.[](source:dx_studio_ui)

| Studio Component | Layer & Elevation | Core Responsibility | UX & Architecture Guarantee |
| --- | --- | --- | --- |
| `DataExchangeStudioOverlay` {#st-shell} | `createPortal` (`z-[900]`) | Orchestrates full-screen `w-screen h-screen` shell and locks `document.body` scroll | {good:Zero background bleed} |
| `StudioHeader` & `StudioStepper` {#st-hdr} | Sticky top bar (`shrink-0`) | Renders localized entity title, 4-step progress pills, and guarded `Close` button | {good:Clear wizard context} |
| `StudioUploadStep` {#st-s1} | Step 1 body (`flex-1`) | Non-nested dropzone, 3-tab `.xlsx` or `.csv` templates, and multi-sheet mode toggle | {good:WCAG keyboard clean} |
| `StudioMappingStep` {#st-s2} | Step 2 + `z-[950]` overlays | DAG sheet tabs, jump-to-row error pills, `@core/ui/tooltip` hints, and normalizer trigger | {good:Actionable error guidance} |
| `StudioDryRunStep` {#st-s3} | Step 3 body (`flex-1`) | Localized `sheetSummaries`, cell diagnostics, and finite edition quota guardrails | {good:Pre-commit certainty} |
| `StudioResultsStep` {#st-s4} | Step 4 body (`flex-1`) | Partial commit counters, rejected `.xlsx` download, and one-time credential vault | {good:Self-service recovery} |
| `StudioFooter` {#st-ftr} | Sticky bottom (`shrink-0`) | Guards disabled `Run Dry-Run` CTA with blocker tooltip and handles `Back` routing | {good:Explicit blocker count} |
| `StudioConfirmExitDialog` {#st-exit} | `@core/ui/confirmation-dialog` (`z-[960]`) | Canonical destructive confirmation shared with `CancelJobDialog` and `DeletePresetDialog` | {good:Zero accidental loss} |

## How do `StudioConfirmExitDialog` and the 17-Rule `ColumnNormalizationPopover` protect operator mappings? {#exit-guard-and-normalizer}

@workflow id=exit-guard-flow title="StudioConfirmExitDialog Unsaved-Progress Guard & Lossless Back Navigation"
| lane nav_lane | Wizard Navigation |
| lane guard_lane | Unsaved-Progress Guard (z-960) |
| step1_up | Step 1 Upload | frontend | nav_lane |
| step2_map | Step 2 Mapping | frontend | nav_lane |
| step3_dry | Step 3 Dry-Run | frontend | nav_lane |
| dirty_gate | Unsaved Work? | security | guard_lane |
| exit_alert | Confirm Exit z-960 | security | guard_lane |
| clean_exit | Reset or Unmount | external | guard_lane |
| step1_up > step2_map | inspect | emphasis |
| step2_map > step3_dry | dry-run | emphasis |
| step3_dry > step2_map | lossless back | dashed |
| step2_map > dirty_gate | X or Step 1 | security |
| dirty_gate > exit_alert | yes | security |
| dirty_gate > clean_exit | no |
| exit_alert > clean_exit | discard | security |

@steps id=exit-guard-steps
| eg_s2 | Step 2 Mapping | Holds active column mappings, custom cf: fields, and 17-rule transforms after file inspection. | exit-guard-flow | step2_map |
| eg_s3 | Step 3 Dry-Run | Pressing Back from Step 3 returns to Step 2 immediately without clearing mappings or prompting. | exit-guard-flow | step3_dry |
| eg_gate | Unsaved Work? | Triggers on X, Escape, Back from Step 2 to Step 1, Replace File, or un-dismissed credentials. | exit-guard-flow | dirty_gate |
| eg_alert | Confirm Exit z-960 | Renders above z-900 and z-950 layers with Keep Editing and destructive Discard & Exit buttons. | exit-guard-flow | exit_alert |

Inside Step 2, `ColumnNormalizationPopover` (`w-[440px]`, `max-h-[min(600px,82vh)]`, `z-[950]`) pairs sticky header and live preview bars with an `overflow-y-auto overscroll-contain` body (never `no-scrollbar`). It dynamically promotes the rule group matching `targetDataType` or Arabic sample text to the top with a `Recommended` badge and 1-click **Apply Smart Preset** button.[](source:dx_normalizer)

| Normalizer Group | Exposed `DataExchangeTransformRule` Controls (All 17) | Live Preview & Validation Behavior |
| --- | --- | --- |
| Sticky Header & Preview {#norm-sticky} | Target type `<Badge>`, `Reset to Defaults`, and live `rawSample -> transformedSample` box | Simulates all 17 active rules instantaneously in TypeScript before dry-run |
| Context-Smart Priority {#norm-smart} | Dynamic top section with `Recommended` badge and 1-click `Apply Smart Preset` action | Prioritizes Temporal, Numeric, Phone, Email, or Arabic rules per column |
| Whitespace, Unicode & Nulls {#norm-core} | `trim`, `collapseWhitespace`, `normalizeUnicodeCompatibility`, `canonicalizeNullTokens`, `caseMode` (`uppercase`/`lowercase`), `defaultValue` | Converts `N/A`, `غير متاح`, NBSP, and zero-width chars deterministically in `O(n)` |
| MENA Arabic Script {#norm-mena} | `stripArabicDiacritics` (Tashkeel `\u064B-\u065F`, `\u0670`, Tatweel `\u0640`) and `normalizeArabicLetters` (Alef `أ/إ/آ/ٱ → ا`, `ى/ی → ي`, Persian `ک → ك`) | Normalizes Arabic names and lookup tokens deterministically across all 9 pipeline stages with zero user-supplied regexes |
| Currency & Accounting {#norm-num} | `stripCurrencyAndGrouping` (`SAR`, `EGP`, `AED`, `USD`, `EUR`, `%`) and `convertAccountingNegatives` | Parses `(1,250.50)` and `1.250,50` while rejecting formula strings |
| Contact, Temporal & Lists {#norm-date} | `normalizeEmailAddress`, `defaultCountryDialCode`, `dateFormat`, `sourceTimeZoneId`, `multiValueDelimiter` | Canonicalizes E.164 phones, converts IANA/Windows timezones to UTC, deduplicates tags |
| Tooltip Error Pipeline {#norm-tip} | Row `<SelectTrigger>` tooltip, jump-to-row `<Alert>` pills, and disabled footer CTA tooltip | Shows exact offending sample value, missing fields, and normalizer fix hint |

## How does 5-Sheet CRM Topological DAG Migration link parent records and morph `sileo-toast` states? {#crm-dag-and-sileo}

@workflow id=crm-dag-flow title="5-Sheet CRM Topological DAG Migration & Cascade Deferral"
| lane dag_lane | Topological Parent-First Execution Order |
| lane err_lane | Session Lookup & Recovery |
| sh_acc | 1. crm.account | backend | dag_lane |
| sh_con | 2. crm.contact | backend | dag_lane |
| sh_lead | 3. crm.lead | backend | dag_lane |
| sh_opp | 4. crm.opportunity | backend | dag_lane |
| sh_act | 5. crm.activity | backend | dag_lane |
| sess_map | sessionResolvedKeys | database | err_lane |
| rej_xlsx | Cascade & Rejected .xlsx | security | err_lane |
| sh_acc > sh_con | account fk | emphasis |
| sh_con > sh_lead | contact fk | emphasis |
| sh_lead > sh_opp | lead fk | emphasis |
| sh_opp > sh_act | deal fk | emphasis |
| sh_acc > sess_map | register key | dashed |
| sess_map > sh_opp | natural key | dashed |
| sh_lead > rej_xlsx | bad parent | security |

@steps id=crm-dag-steps
| dag_1 | 1. crm.account | Imports sponsor and club accounts first and records ExternalKey and Name into sessionResolvedKeys. | crm-dag-flow | sh_acc |
| dag_2 | 2. crm.contact | Links contacts to newly staged or persisted accounts and handles pass-2 self-FK manager references. | crm-dag-flow | sh_con |
| dag_3 | 3. crm.lead | Matches leads by Email, Title, or ExternalKey during both multi-sheet dry-run and chunk commit. | crm-dag-flow | sh_lead |
| dag_4 | 4. crm.opportunity | Resolves parent Account, Contact, and Lead links across earlier workbook sheets without false errors. | crm-dag-flow | sh_opp |
| dag_5 | 5. crm.activity | Links tasks and calls to upstream CRM entities while deferring children of rejected parent rows. | crm-dag-flow | sh_act |

@callout level=note title="In-Place Sileo Toast Morphing & Localized Entity Names"
Every job notification passes `{ id: "dx-job-" + job.id, title, description, button }` to `@core/ui/sileo-toast` and resolves localized display names (such as `Leads` or `العملاء المحتملون`) instead of raw `'crm.lead'` keys. As a job moves from `Queued` to `Running` and `Completed`, `Failed`, or `Cancelled`, Sileo morphs the existing toast pill in place with zero toast stacking.[](source:dx_sileo)

## How do Unified `GenericCrudView` `⋯` Dropdowns and Executive Nexus `CardGrid` Slabs standardize all 8 views? {#crud-actions-and-cardgrid}

@facts id=crud-unification-facts
| Unified Row Menu | All 8 Data Transfer, CRM, and Party views use GenericCrudView getActions sticky w-16 ⋯ DropdownMenu |
| Automatic DAG Discovery | relatedMultiSheetEntityKeys enables Multi-Sheet Migration automatically across CRM (5), Party (3), Identity (2) & Catalog |
| Preset Studio Launch | PresetsView supports Set as Default (POST /presets/{id}/default) and Use Preset in Import Studio (initialPresetId) |
| Canonical Confirmations | StudioConfirmExitDialog, CancelJobDialog, and DeletePresetDialog standardize on @core/ui/confirmation-dialog |
| Pagination & Tenant Guard | GenericTable guarantees Showing 0-0 of 0 results while JobsExecutionView shows real API errors and TenantRequired guard |
| Bilingual Entity Labels | getEntityDisplayName resolves backend displayNameEn/Ar first across Studio, Dock, Export, Jobs, and Presets |

Standardizing on the `/admins` sticky `w-16` `⋯` action menu eliminates horizontal table clipping while keeping keyboard accessibility, RBAC permission gates, and confirmation dialogs uniform across modules.[](source:dx_admin_mvvm)

| Unified Surface | Component or View | Action & CardGrid Architecture | Compliance Result |
| --- | --- | --- | --- |
| Admin Entity Catalog {#ug-ent} | `EntitiesCatalogView` & `EntityCatalogCard` | `getActions` (`Launch Import Studio`, dynamic `Multi-Sheet Migration`, `Download Template`, `Export Data`) + client pagination | {good:Auto DAG discovery} |
| Admin Execution Jobs {#ug-job} | `JobsExecutionView` & `JobExecutionCard` | `Launch Studio` header CTA, `TenantRequired` guard banner, real API error display, and `@core/ui/confirmation-dialog` cancel | {good:Zero right-edge clip} |
| Admin Mapping Presets {#ug-pre} | `PresetsView` & `MappingPresetCard` | `Create Preset in Studio`, `Use Preset in Import Studio` (`initialPresetId`), `Set as Default`, and `@core/ui/confirmation-dialog` delete | {good:1-click preset launch} |
| 4 CRM Operational Tables {#ug-crm} | `Contacts`, `Activities`, `Accounts`, `Opportunities` | Automatic `relatedMultiSheetEntityKeys` 5-sheet migration + `GenericCrudView` `getActions` `⋯` dropdown | {good:Unclipped CRM columns} |
| Party Kernel Directory {#ug-pty} | `PartyDirectoryView` (`<= 300` lines) | Automatic 3-sheet `PartyKernel` migration + `/admins`-parity `⋯` dropdown actions | {good:FE-V001 compliant} |
| Shared CRUD & Table {#ug-grid} | `GenericCrudView`, `GenericTable` & `CrudCardGridSection` | Finite pagination sanitizer (`Showing 0-0 of 0 results`) + responsive `bg-nx-raised` hairline grid with zero shadows | {good:Zero NaN/1-0 bugs} |

## Why is the Entity Catalog Read-Only and How Do Zero-Coupling Plugins, Outbox Events, and Governance Work? {#zero-coupling-and-governance}

DataTransfer keeps zero project references to sibling domain modules (`DataTransfer.*.csproj` reference only `Core.*` and `AstraFlow.*`), discovering entities through `IEntityDataExchangeProvider` in `Core.Application` and publishing terminal job completion via `DataExchangeJobCompletedEvent` in `datatransfer.outbox_messages` (retracted via `DetachPendingOutboxMessages()` on cancellation). On the frontend, `GenericCrudView` reads `entityTypeKey` and mounts `@core/data-exchange` (`DataExchangeToolbarActions` + `useDataExchangeToolbarViewModel`) automatically without ever importing `@modules/admin/data-transfer`.[](source:dx_overview)

| Architectural Question | Authoritative Design Answer | Code & Governance Proof | Result |
| --- | --- | --- | --- |
| Why is Entity Catalog read-only? {#qg-cat} | Schemas, keys & quotas come from DI `IEntityDataExchangeProvider` + `EditionSeeder` | Extend custom columns via `/custom-fields` (`cf:*`); run jobs or save presets from Studio | {good:Zero drift} |
| How do Jobs & Presets populate? {#qg-jp} | `/jobs` captures module toolbar or **Launch Studio** runs; `/presets` saves Step 2 mappings | Supports `initialPresetId`, `POST /presets/{id}/default`, `Use Preset in Import Studio` | {good:Self-service lifecycle} |
| Single vs Multi-Sheet DAG? {#qg-dag} | `useDataExchangeToolbarViewModel` unlocks Multi-Sheet when all 4 gates pass | `migrations.execute`, `DataTransfer.MultiSheetMigration`, `supportsImport`, `>= 2` `relatedMultiSheetEntityKeys` | {good:Automatic cluster DAG} |
| Platform vs Tenant context? {#qg-ten} | Strictly tenant-scoped; `DataTransferMenuProvider` enforces `RequiresTenantContext = true` | Platform Super Admin switches tenant or sees `DataExchangeTenantRequiredCard` (`TenantRequired` 400/422) | {good:Zero cross-tenant leak} |
| Role access & no `[AdminOnly]`? {#qg-rbac} | `[Authorize]` + `[PermissionRequired("datatransfer.*")]` + target entity checks | 7 standard roles incl. `CRM_SALES_REP`; 6 roles excl. `CRM_SALES_REP` for `migrations.execute`; unknown key -> `404` | {good:Least-privilege CRM} |
| Dynamic vs Hardcoded split? {#qg-dyn} | Descriptors, `cf:*`, FLS, quotas, DB dropdowns (`<= 5,000`), DAGs & labels are dynamic | Hardcoded invariants: 9-stage `O(n)` normalizer, OWASP (`25 MB`/`100 MB`/`1,000`/`100x`), `250`-row chunks | {good:Hardened boundary} |
| Why no post-completion rollback? {#qg-rec} | Global undo job would overwrite concurrent tenant edits after commit | Safe recovery uses pre-flight `DryRunAsync`, isolated `250`-row chunks, 5-col Rejected `.xlsx`, and `POST /jobs/{id}/cancel` | {good:Concurrent-safe} |

@callout level=note title="2-Pass Key Resolution & Deterministic 9-Stage Normalization Pipeline"
Multi-sheet DAG imports run Kahn's `TopologicalSortSheets` (`ParentEntityKeys` / `DependsOnEntityKeys`), pass `sessionResolvedKeys` across sheets, persist idempotent lookups in `datatransfer.external_legacy_key_maps`, resolve self-FK links in Pass 2, and defer child rows with `PARENT_ROW_FAILED` (`_CascadeParentRef`). Every mapped cell runs deterministically through Stages 1–9 (`NFKC/BiDi -> Arabic/Persian digits -> Null tokens -> Trim/Whitespace -> Tashkeel/Tatweel & Alef/ى/ک -> CaseMode -> Currency/Accounting -> Email/E.164/MultiValue -> Typed Parse & UTC`).[](source:dx_normalizer)

- [x] `DataExchangeStudioOverlay` extracted into `<= 250`-line studio components mounted via `createPortal` (`z-[900]`) with `z-[950]`/`z-[960]` inner overlays and `initialPresetId` support.
- [x] `StudioConfirmExitDialog`, `CancelJobDialog`, and `DeletePresetDialog` standardize onto canonical `@core/ui/confirmation-dialog` while keeping `Step 3 -> Step 2 Back` prompt-free.
- [x] `ColumnNormalizationPopover` exposes all 17 `DataExchangeTransformRule` fields (`dateFormat`, `sourceTimeZoneId`) in a context-smart scrollable container with live preview.
- [x] Automatic backend-driven `relatedMultiSheetEntityKeys` DAG discovery across CRM (5-sheet), PartyKernel (3-sheet), Identity (2-sheet), and `EntitiesCatalogView`.
- [x] All 8 Data Transfer, CRM, and Party views unified onto `GenericCrudView` `getActions` `⋯` dropdowns, `Showing 0-0 of 0 results` finite pagination hardening, and flat matte Nexus `CardGrid` slabs.
- [x] `DataTransferController` exposes 16 PBAC REST endpoints (`POST presets/{id}/default` -> `SetDefaultPreset`), `DataTransferMenuProvider` (`RequiresTenantContext: true`), and `DataTransferDevDataSeeder` (`Order = 155`).[](source:dx_overview)
- [x] `SCRIPE-Docs-Portal` delivers 100% 7-language parity (`en`, `ar`, `de`, `es`, `fr`, `ru`, `zh`) across technical module, 16-endpoint API reference, and commercial showcase pages.[](source:dx_docs)
