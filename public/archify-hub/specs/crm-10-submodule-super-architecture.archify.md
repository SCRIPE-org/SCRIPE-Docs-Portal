# How does SCRIPE CRM Frontend enforce 10-Submodule Clean Architecture, Zero-Leak Persistence, and 2D Workflow Studio? {#crm-10-submodule-super-arch}

SCRIPE CRM Frontend (`src/modules/crm`) now operates as **10 strictly decoupled Clean Architecture sub-modules** (`shared`, `workflows`, `settings`, `reports`, `overview`, `leads`, `opportunities`, `accounts`, `contacts`, `activities`) backed by TanStack Query v5, Repository-to-Entity mappers, zero `persist()` domain stores, and automated `FE-030`..`FE-033` + `crmLocalizationAndArchGate` gates.[](source:crm_gate)

- Client-side domain workflow snapshots no longer use Zustand `persist()` (`FE-031 = 0`) and commercial package quotes are decoupled from `PUT /v1/crm/settings/tenant` via per-deal persistence (`useOpportunityCommercialPackage`).[](source:crm_shared_prefs)
- All 4 legacy CRM entity repositories (`leads`, `accounts`, `contacts`, `activities`) and `opportunities`/`workflows`/`settings` normalize payloads through domain `*Mapper.toEntity()` contracts (`FE-030 = 0`, `FE-010 = 0`, `FE-011 = 0`).[](source:crm_repos)
- All CRM ViewModels (`opportunities`, `leads`, `accounts`, `contacts`, `activities`, `settings`, `reports`, `overview`, `workflows`) consume TanStack Query v5 with `qk.crm.*` tenant-scoped keys, `useSafeQueryClient`, and React 19 compiler-safe primitive dependencies (`FE-033 = 0`).[](source:crm_viewmodels)
- Legacy parallel Kanban boards, redundant transition modals, dead entity tables, and the monolithic `useCrmSettingsStore` compatibility store have been removed in favor of unified `GenericCrudView`, `GenericWorkflowKanban`, and `CrmWorkflowTransitionDialog`.[](source:crm_unified_ui)

@answer scope="SCRIPE-Frontend CRM · 10 Sub-Modules · TanStack Query v5 · @xyflow/react Studio · FE-030..FE-033 Gates"
@meta locale=en style=editorial quality_profile=showcase
@source crm_gate title="CRM Localization & Architecture Gate Suite" url=https://docs.scripe.org/crm/architecture-gates
@source crm_shared_prefs title="Client UI Preferences & Deal Package Scope" url=https://docs.scripe.org/crm/client-prefs-and-quotes
@source crm_repos title="CRM Repository-Mapper-Entity Normalization" url=https://docs.scripe.org/crm/repositories
@source crm_viewmodels title="TanStack Query v5 & React 19 Compiler Safe ViewModels" url=https://docs.scripe.org/crm/tanstack-viewmodels
@source crm_unified_ui title="Unified GenericCrudView, Workflow Studio & Transition Screen" url=https://docs.scripe.org/crm/unified-crud-studio

## How do the 10 CRM sub-modules isolate Domain, Data, Presentation, and DI? {#ten-submodule-topology}

@architecture id=crm-10-submodule-map title="SCRIPE CRM Frontend 10-Submodule Clean Architecture"
| core_crud | @core/crud Kanban & Table | frontend |
| di_root | crm/di.ts Root Container | security |
| shared_mod | crm/shared (Prefs, Lookups, PBAC) | security |
| workflows_mod | crm/workflows (Studio & Engine) | frontend |
| settings_mod | crm/settings (Tenant Governance) | frontend |
| opps_mod | crm/opportunities (Deals & 360) | frontend |
| leads_mod | crm/leads (Capture & Convert) | frontend |
| dir_mods | crm/accounts + contacts + activities | frontend |
| exec_mods | crm/overview + crm/reports | frontend |
| core_crud > opps_mod | Unified Board & Table | |
| core_crud > leads_mod | Stage Progression Grid | |
| shared_mod > workflows_mod | Client Prefs & Tokens | |
| di_root > opps_mod | Injects Opportunity & Workflow Repos | |
| di_root > leads_mod | Injects Lead & Account Repos | |
| di_root > dir_mods | Injects Account, Contact & Activity Repos | |
| di_root > settings_mod | Injects Settings & Catalog Repos | |
| di_root > exec_mods | Injects Overview & Reports Repos | |
| workflows_mod > opps_mod | CrmWorkflowTransitionDialog | dashed |
| workflows_mod > leads_mod | Stage Evaluation & Transition Screen | dashed |

Each sub-module owns isolated `src/domain`, `src/data`, `src/presentation`, and co-located `locales/` dictionaries without cross-layer leaks. Route entrypoints under `src/app/(modules)/(workspace-crm)/crm/**` pair every list and 360 detail route with a dedicated `loading.tsx` skeleton boundary (`ModulesLoadingSkeleton`).[](source:crm_unified_ui)

## How does the 2D Workflow Studio and Transition Pipeline execute safely? {#workflow-studio-transition-flow}

@workflow id=crm-transition-quote-pipeline title="Unified Stage Transition & Scoped Quote Persistence"
| user_action | Kanban Drag or Table Action | frontend |
| engine_eval | Pure Domain Engine (No Locales) | security |
| modal_gate | CrmWorkflowTransitionDialog (RHF + Zod) | frontend |
| quote_scope | useOpportunityCommercialPackage | database |
| repo_sync | Repository + Mapper.toEntity() | backend |
| tq_invalidate | TanStack Query qk.crm.* Invalidation | messagebus |
| user_action > engine_eval | Evaluate Specific-Wins Edge | |
| engine_eval > modal_gate | Screen Required or Exit Gates | emphasis |
| engine_eval > repo_sync | Allowed Instant Move | dashed |
| modal_gate > repo_sync | Submit Validated Gate Payload | |
| quote_scope > repo_sync | Isolated Per-Deal Package Sync | dashed |
| repo_sync > tq_invalidate | Refresh Deal, Lead & Pipeline Cache | |

@steps id=crm-transition-steps
| st_eval | Pure Domain Evaluation | `crmWorkflowEngine` evaluates transition precedence using injected locale messages with zero `locales/` imports. | crm-transition-quote-pipeline | engine_eval |
| st_dialog | Unified Transition Screen | Both `OpportunitiesView` and `LeadsView` open `CrmWorkflowTransitionDialog` with RHF + Zod validation and custom field gates. | crm-transition-quote-pipeline | modal_gate |
| st_quote | Per-Deal Quote Isolation | Deal commercial line items persist under `useOpportunityCommercialPackage` scoped by `opportunityId`, never mutating tenant governance settings. | crm-transition-quote-pipeline | quote_scope |
| st_cache | TanStack Query v5 Refresh | Mutations invalidate `qk.crm.*` tenant-scoped cache keys cleanly via `useSafeQueryClient`. | crm-transition-quote-pipeline | tq_invalidate |

## What changed across the CRM architecture remediation scorecard? {#remediation-scorecard}

| Architecture Invariant | Pre-Remediation State | Post-Remediation State | Automated Gate |
| --- | --- | --- | --- |
| `FE-031` Store Persistence {#row-fe031} | `useCrmWorkflowsStore` used Zustand `persist()` {bad:Stale State} | Server-authoritative store + `useCrmClientPrefsStore` {good:0 Violations} | `scripe arch-check --rules FE-031` |
| `FE-030` Entity & Mapper Wiring {#row-fe030} | 4 Repositories bypassed `*Mapper.toEntity()` {bad:Hollow Mappers} | All CRM repositories map through Domain Entities {good:0 Violations} | `scripe arch-check --rules FE-030` |
| `FE-033` React 19 Hook Deps {#row-fe033} | 25 member-expression deps across ViewModels {caution:Compiler Misses} | Primitive & destructured dependency arrays {good:0 Violations} | `scripe arch-check --rules FE-033` |
| `FE-010..012` Layer Boundaries {#row-layers} | View->Data & VM->Data imports in Settings/Leads/Workflows {caution:Layer Leak} | Pure Domain codecs + `copyWith` entities {good:0 Violations} | `scripe arch-check` |
| `FE-025` & View Line Budgets {#row-budgets} | `useOpportunityViewModelHelpers.ts`, >200L Views, 292L VM {caution:Oversized} | `utils/` helpers, Views <=200L, all files <=260L {good:100% Pass} | `crmLocalizationAndArchGate.test.ts` |
| Commercial Quote Boundary {#row-quote} | Deal quote edits hit `PUT /v1/crm/settings/tenant` {bad:Tenant Mutation} | Decoupled `useOpportunityCommercialPackage` {good:Deal-Scoped} | `OpportunityDetailView.test.tsx` |

## What verification gates enforce these invariants continuously? {#verification-checklist}

- [x] `pnpm exec tsc --noEmit` compiles `SCRIPE-Frontend` with 0 TypeScript errors and zero `any` regressions in CRM.
- [x] `crmLocalizationAndArchGate.test.ts` enforces 0 raw Arabic in presentation, 0 native tables, `<= 260L` files, `< 200L` workflow `.tsx` components, and strict `FE-030..FE-033` CRM gates.
- [x] `scripe arch-check --target frontend` verifies `FE-030`, `FE-031`, `FE-032`, `FE-033`, `FE-010`, `FE-011`, and `FE-012` at 0 CRM violations.
- [x] `scripe build frontend` and `scripe build docs` validate Next.js production bundles across all CRM and Docs Portal routes.
