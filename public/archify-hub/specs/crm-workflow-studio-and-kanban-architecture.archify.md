# How does the SCRIPE CRM v3.0 Suite Unify Managed Graph Canvases, 13 Routes, and AstraFlow Persistence? {#crm-workflow-studio-kanban}

SCRIPE CRM v3.0 establishes end-to-end operational sovereignty across 13 core routes through a **managed `@xyflow/react` v12 Workflow Studio**, a **modular `@core/crud` unified view engine**, dynamic **Jira-style Transition Screens**, and an in-house **.NET 10 AstraFlow 2.3.0 monolith** anchored in PostgreSQL Single Source of Truth.[](source:agents_constitution)

- The 2D Workflow Studio v3.0 features 12 magnetic perimeter ports (`ConnectionMode.Loose`), a canonical `__start__` origin node, Jira wildcard `* ALL` satellite stubs, and cycle-safe Dagre/ELK rank layout.[](source:fe_studio)
- The `@core/crud` architecture unifies all 13 CRM routes (Leads, Deals, Accounts, Contacts, Activities) on `GenericCrudView` and virtualized `GenericWorkflowKanban` driven by dynamic `stageKey`.[](source:fe_core_crud)
- A dynamic `react-hook-form` + `zod` Transition Screen executes a Smart 3-State Drop with full Deal 360 and Lead 360 progression parity, protecting against OWASP A01/A04 privilege escalation.[](source:fe_transition_screen)
- The backend `.NET 10` `UniversalWorkflowEngine` enforces 3-tier Specific-Wins precedence (`Exact A->B` > `Outbound A->*` > `Global *->B`), rollback locks, and compile-time `[AstraGenerateMapping]`.[](source:be_workflow_engine)

@answer scope="SCRIPE CRM v3.0 · 13 Routes · Managed @xyflow/react · GenericCrudView · RHF+Zod Transition Screen · AstraFlow 2.3.0 · PostgreSQL SSOT"
@meta locale=en style=editorial quality_profile=showcase
@source agents_constitution title="SCRIPE v6.0 Universal Constitution" url=https://docs.scripe.org/architecture/constitution
@source fe_studio title="Workflow Studio Canvas Component (@xyflow/react v12)" url=https://docs.scripe.org/crm/workflow-studio
@source fe_core_crud title="Modular @core/crud Kanban Architecture" url=https://docs.scripe.org/crm/core-crud-kanban
@source fe_transition_screen title="Workflow Transition Dialog (RHF + Zod)" url=https://docs.scripe.org/crm/transition-screen
@source be_workflow_engine title=".NET 10 UniversalWorkflowEngine & Specific-Wins Precedence" url=https://docs.scripe.org/crm/universal-workflow-engine
@source be_stage_commands title="Unified Stage Mutation Commands (MoveOpportunityStage & MoveLeadStage)" url=https://docs.scripe.org/crm/stage-commands
@source crm_routes title="SCRIPE CRM v3.0 13-Route Architecture" url=https://docs.scripe.org/crm/routes
@source astraflow_crm title="AstraFlow 2.3.0 CRM CQRS & Compile-Time Mappings" url=https://docs.scripe.org/crm/backend-astraflow

## How does the managed @xyflow/react Workflow Studio visualize and edit complex pipeline topologies? {#workflow-studio-canvas}

@workflow id=workflow-studio-topology title="Managed @xyflow/react v12 Studio Canvas Architecture"
| startnode | Origin __start__ Anchor | frontend |
| canvas | Studio Canvas Container | frontend |
| stagenode | 12-Port Stage Nodes | frontend |
| edges | Loose Transition Edges | frontend |
| layout | Cycle-Safe Dagre & ELK | backend |
| rulemodal | Stage Rule Modal | frontend |
| exportpng | High-Res PNG Exporter | external |
| startnode > canvas | Initialize Origin Wire | emphasis |
| canvas > stagenode | Render 12-Port Stage Cards | |
| stagenode > edges | Dynamic Bezier Wire Routing | |
| edges > layout | Algorithmic Rank Computation | |
| stagenode > rulemodal | Configure Exit Gates | |
| canvas > exportpng | html-to-image High-Res Export | dashed |

@steps id=studio-canvas-steps
| st_start | Origin __start__ Anchor | Anchors the visual canvas top-left with an animated green pill and entry wire. | workflow-studio-topology | startnode |
| st_canvas | Studio Canvas Container | Provides managed zoom, pan, background grid, and multi-selection canvas. | workflow-studio-topology | canvas |
| st_nodes | 12-Port Loose Stage Nodes | Renders 3 discrete magnetic ports per face with ConnectionMode.Loose. | workflow-studio-topology | stagenode |
| st_edges | Multi-Parallel Loose Edges | Connects stages with dynamic Euclidean port pairing and parallel transition support. | workflow-studio-topology | edges |
| st_layout | Cycle-Safe Dagre & ELK | Breaks back-edge cycles to force terminal stages to the far right with generous ranksep. | workflow-studio-topology | layout |
| st_rules | Stage Rule Catalog | Configures required exit fields, party verification, and deal conversion actions. | workflow-studio-topology | rulemodal |
| st_export | High-Resolution Export | Serializes full canvas to high-density PNG with html-to-image. | workflow-studio-topology | exportpng |

The Workflow Studio replaces brittle, hardcoded custom SVG coordinate systems with `@xyflow/react` v12. Every pipeline stage operates as a custom reactive node featuring category pills (`todo`, `in_progress`, `done`, `lost`), SLA milestones, and an interactive `* From Any` inbound port. Transitions are modeled as Bezier curves with reconnection handles, while auto-layout algorithms calculate clean horizontal and vertical arrangements.[](source:fe_studio)

| Workflow Studio Capability | Technical Implementation | Architectural Advantage | Enterprise Benefit |
| --- | --- | --- | --- |
| 12-Port Magnetic Handles {#row-12-ports} | 3 ports per face (`top-1..3`, `right-1..3`, `bottom-1..3`, `left-1..3`) | `ConnectionMode.Loose` with Euclidean pairing | {good:Zero tangled wire crossings} |
| Graph Origin Node {#row-origin-node} | Canonical `__start__` pill wired to initial stage | Explicit top-left visual anchor | {good:Instant flow orientation} |
| Jira Wildcard ALL Satellite Stubs {#row-satellite-node} | Floating external `CrmGlobalInboundSatelliteNode` | Renders physical visible wildcard arrow | {good:Zero invisible global rules} |
| Cycle-Safe Auto-Layout {#row-cycle-layout} | Dagre & ELK ranker with back-edge reversal | Forces Won and Lost to far right | {good:Won and Lost always at end} |
| Multi-Parallel Transitions {#row-parallel-trans} | Unique transition IDs per `(from, to)` pair | Preserves distinct fast-track vs standard paths | {good:Multi-track governance} |
| Single-Row Command Bar {#row-command-bar} | Height constrained to `h-12` (`<= 52px`) | Undo/Redo stack with keyboard shortcuts | {good:Zero viewport crowding} |
| Canvas Image Serialization {#row-canvas-export} | `html-to-image` high-resolution renderer | Client-side 300-DPI PNG generation | {good:Audit & board reporting} |

## How does the modular @core/crud architecture power all 13 CRM routes and unified entity views? {#modular-crud-decomposition}

@tree id=core-crud-tree title="SCRIPE CRM v3.0 13-Route Unified Architecture"
| root | SCRIPE CRM v3.0 Unified Workspace | - |
| pipeline_ops | Pipeline & Workflow Operations | root |
| studio_route | /crm/opportunities/pipelines (Studio v3.0) | pipeline_ops |
| deals_route | /crm/opportunities (Deals Kanban & Table) | pipeline_ops |
| leads_route | /crm/leads (Leads Kanban & Table) | pipeline_ops |
| entity_360 | Entity 360 Master Workspaces | root |
| deal_360 | /crm/opportunities/[id] (Deal 360 Cockpit) | entity_360 |
| lead_360 | /crm/leads/[id] (Lead 360 Profile) | entity_360 |
| accounts_route | /crm/accounts (Corporate Accounts Grid) | entity_360 |
| account_360 | /crm/accounts/[id] (Account 360 Workspace) | entity_360 |
| contacts_route | /crm/contacts (Professional Contacts Grid) | entity_360 |
| contact_360 | /crm/contacts/[id] (Contact 360 Workspace) | entity_360 |
| desk_analytics | Execution Desk & Analytics | root |
| activities_route | /crm/activities (Activities Execution Desk) | desk_analytics |
| overview_route | /crm/overview (Executive Cockpit & Funnel) | desk_analytics |
| reports_route | /crm/reports (Pipeline Velocity & Win-Loss) | desk_analytics |
| settings_route | /crm/settings (Governance & SLA Policies) | desk_analytics |

@facts id=crud-unification-facts
| Unified Route Footprint | 13 production CRM routes operating on unified @core/crud foundations |
| Generic Type Constraint | Polymorphic interface requiring id and stageKey |
| Drag-and-Drop Library | @dnd-kit/core + @dnd-kit/sortable with pointerWithin detection |
| Table & Virtualization | @tanstack/react-table v8 + @tanstack/react-virtual for large pipelines |
| Dynamic Stage Grouping | Columns derived strictly from pipeline.stages (stageKey) |
| Status Parity | Canonical status categories (todo, in_progress, done, lost) mapped symmetrically |
| Custom Stage Scalability | Dynamic 1..N custom stages with horizontal scroll & virtual rows |
| Multi-Parallel Transition Selection | Transition dialog allows selecting between multiple eligible paths |

The monolithic `generic-crud-view.tsx` is partitioned into focused, single-responsibility sub-components. `GenericWorkflowKanban` powers both Leads and Opportunities using a polymorphic contract constrained to records containing an `id` and `stageKey`. Rigid status enums are completely replaced by dynamic `stageKey` columns defined in the pipeline configuration, while `@tanstack/react-virtual` ensures 60 FPS scrolling across high-volume pipelines.[](source:fe_core_crud)

| Route Path | Entity & Feature | View Modes Supported | PBAC Enforcement |
| --- | --- | --- | --- |
| `/crm/overview` {#r-overview} | Executive KPI Cockpit & Forecasts | Metric Cards & Funnel Charts | `crm.overview.view` {good:Executive Desk} |
| `/crm/leads` {#r-leads} | Lead Capture & Dynamic Stage Progression | Table, CardGrid, Kanban, SplitPane | `crm.leads.view` {good:stageKey Grouping} |
| `/crm/leads/[id]` {#r-lead360} | Lead 360 Dynamic Qualification Workspace | Interactive Stepper & History Log | `crm.leads.view` {good:Transition Dialog} |
| `/crm/opportunities` {#r-opps} | Deal Pipeline & 3-State Drop Board | Table, CardGrid, Kanban, SplitPane | `crm.opportunities.view` {good:Won/Lost Dropzones} |
| `/crm/opportunities/[id]` {#r-opp360} | Deal 360 Financial Cockpit & Quote Hub | Interactive Stepper & History Log | `crm.opportunities.view` {good:Transition Dialog} |
| `/crm/opportunities/pipelines` {#r-studio} | 2D Workflow Studio v3.0 | `@xyflow/react` Canvas | `crm.pipelines.manage` {good:12-Port Loose Flow} |
| `/crm/accounts` {#r-accounts} | Corporate Accounts Directory | Table, CardGrid, SplitPane | `crm.accounts.view` {good:Virtual Rows} |
| `/crm/accounts/[id]` {#r-account360} | Account 360 Hierarchy & Association Hub | 360 Master-Detail View | `crm.accounts.view` {good:Zero Split-Brain} |
| `/crm/contacts` {#r-contacts} | Professional Contacts Directory | Table, CardGrid, SplitPane | `crm.contacts.view` {good:Virtual Rows} |
| `/crm/contacts/[id]` {#r-contact360} | Contact 360 Interaction Timeline | 360 Master-Detail View | `crm.contacts.view` {good:Zero Split-Brain} |
| `/crm/activities` {#r-activities} | Activities & Task Execution Desk | Table, CardGrid, SplitPane | `crm.activities.view` {good:Unified GenericCrud} |
| `/crm/reports` {#r-reports} | Pipeline Velocity & Conversion Analytics | Visual Report Widgets | `crm.reports.view` {good:Real-Time SQL} |
| `/crm/settings` {#r-settings} | CRM Governance & Quota Configuration | Configuration Panels | `crm.settings.manage` {good:Edition Entitlements} |

## How does the Smart 3-State Drop evaluate stage transitions and render dynamic forms? {#smart-drop-lifecycle}

@sequence id=kanban-drop-sequence title="Smart 3-State Drop & Dynamic Jira Transition Screen Sequence"
| actor user | Sales Representative | external |
| actor kanban | GenericWorkflowKanban | frontend |
| actor dialog | WorkflowTransitionDialog | frontend |
| actor engine | UniversalWorkflowEngine | backend |
| actor postgres | PostgreSQL CRM Database | database |
| phase | 1. Card Drag & 3-State Drop Target Evaluation |
| user | kanban | Drag Card from Stage A to Stage B | emphasis |
| phase | 2. Dynamic Jira Transition Screen Interception |
| kanban | dialog | Intercept Drop & Open Transition Screen | emphasis |
| dialog | user | Present Dynamic RHF + Zod Validation Form | return |
| user | dialog | Submit Close Notes & Outcome Fields | emphasis |
| phase | 3. Backend Atomic Stage Mutation & Persistence |
| dialog | engine | POST /api/v1/crm/opportunities/{id}/stage | security |
| engine | postgres | UPDATE StageKey + INSERT StageHistory + Outbox | emphasis |
| postgres | engine | Commit Transaction | return |
| engine | dialog | 200 OK Result<OpportunityResponse> | return |
| dialog | kanban | Close Dialog & Invalidate Query Cache | return |

@steps id=drop-steps
| st_drag | Drag Card Across Columns | User picks up deal or lead card and hovers over target stage column. | kanban-drop-sequence | user |
| st_eval | Smart 3-State Drop Evaluation | Kanban checks direct edges, gate requirements, and lock conditions. | kanban-drop-sequence | kanban |
| st_dialog | Dynamic Transition Screen | Dialog renders dynamic input fields derived from workflow exit rules. | kanban-drop-sequence | dialog |
| st_backend | Backend Precedence Validation | UniversalWorkflowEngine verifies permissions, rollbacks, and exit criteria. | kanban-drop-sequence | engine |
| st_commit | Atomic PostgreSQL Persistence | Updates record stage, appends stage history log, and emits Outbox event. | kanban-drop-sequence | postgres |

When a card is dropped on a column, `GenericWorkflowKanban` executes a Smart 3-State Drop evaluation: **Direct Allowed** (no exit gates exist and the card advances immediately with an optimistic UI update), **Transition Screen Required** (the target stage or transition edge requires mandatory fields such as `closeNotes`, `lossReasonCode`, or `validate.verified_party`, prompting `WorkflowTransitionDialog` with dynamic `react-hook-form` and `zod` validation), or **Disallowed / Blocked** (the transition path is restricted or backward rollback is disallowed, rejecting the drop and displaying a diagnostic locked pill). Both Deal 360 and Lead 360 views enforce identical progression gates when advancing stages from header action buttons.[](source:fe_transition_screen)

@callout level=note title="Zero Client Privilege Escalation (OWASP A01 / A04)"
To prevent privilege escalation attacks where untrusted clients submit reserved evaluation keys inside `CustomFields`, the backend sanitization pipeline strips keys such as `userRoles`, `approvedByRoles`, `visitedStageKeys`, `hasManagerApproval`, and `ActorUserId` before exit checklist and rule evaluation occurs.[](source:agents_constitution)

## How does the .NET 10 UniversalWorkflowEngine enforce Specific-Wins precedence and transactional persistence? {#backend-engine-precedence}

The backend `.NET 10` `UniversalWorkflowEngine` enforces deterministic graph evaluation with **Specific-Wins Precedence**. The inverted rollback lock bug is resolved by ensuring `if (isBackward && !matched.AllowRollback)` restricts only backward transitions while permitting unrestricted forward flows. Furthermore, all stages (including `done` and `lost`) can declare outbound transitions, enabling seamless Reopen (`Closed Lost -> Discovery`) and Requalification (`Disqualified -> Working`) operations.[](source:be_workflow_engine)

| Precedence Tier | Transition Matching Logic | Evaluation Order | Result Contract |
| --- | --- | --- | --- |
| Tier 1: Exact Direct Edge {#tier-direct} | `CurrentStageKey -> TargetStageKey` | 1st Priority (Specific-Wins) | {good:Direct transition rules apply} |
| Tier 2: Outbound Wildcard {#tier-outbound} | `CurrentStageKey -> *` | 2nd Priority | {good:Stage-specific exit rules apply} |
| Tier 3: Global Inbound {#tier-inbound} | `* -> TargetStageKey` or `AllowInboundFromAny` | 3rd Priority | {good:Global transition rules apply} |
| Tier 4: Fallback Blocked {#tier-blocked} | No matching edge or wildcard transition | Terminal Evaluation | {bad:Result.Failure(CrmErrors.Workflow)} |

Unified commands `MoveOpportunityStageCommand` and `MoveLeadStageCommand` persist stage mutations atomically to PostgreSQL. Legacy terminal endpoints are unified under stage evaluation, recording complete audit history and dispatching transactional Outbox events.[](source:be_stage_commands)

| AstraFlow Package | CRM v3.0 Implementation | Architectural Invariant |
| --- | --- | --- |
| `AstraFlow.Mediator` {#af-mediator} | 100% CQRS commands and queries | Zero business logic in controllers {good:High Throughput} |
| `AstraFlow.Generators` {#af-generators} | Compile-time `[AstraGenerateMapping]` | Static unboxed partial mappers {good:Zero Reflection} |
| `AstraFlow.Security` {#af-security} | Dynamic field-level redaction (`IRestrictedFieldsResolver`) | PII and commercial secrets scrubbing {good:OWASP Compliant} |
| `AstraFlow.FluentValidation` {#af-validation} | Pipeline validation behavior | Pre-handler contract verification {good:Fail-Fast Validation} |
| `AstraFlow.Mapper.EntityFrameworkCore` {#af-linq} | Native LINQ `ProjectTo` projections | Direct SQL SELECT column minimization {good:Zero-Allocation Reads} |

## How is end-to-end pipeline integrity verified across all six transition scenarios? {#production-verification}

| Transition Scenario | Source Stage | Target Stage | Triggered Workflow Rules | Dynamic Form Fields |
| --- | --- | --- | --- | --- |
| 1. Instant Advance {#scen-instant} | `default.discovery` | `default.qualification` | None (Direct edge) | Instant move (no dialog) |
| 2. Gate Validation {#scen-gate} | `default.qualification` | `default.solution_validation` | `validate.solution_fit_confirmed` | Solution fit checkbox + audit note |
| 3. Deal Closed Won {#scen-won} | `default.negotiation` | `default.closed_won` | `validate.verified_party`, `done` | Verified party + close notes + actual amount |
| 4. Deal Closed Lost {#scen-lost} | Any active stage | `default.closed_lost` | Global wildcard `* -> Lost`, `lost` | Loss reason code + competitor name |
| 5. Deal Reopen {#scen-reopen} | `default.closed_lost` | `default.discovery` | Outbound transition from lost stage | Reopen justification note |
| 6. Lead Conversion {#scen-convert} | `default.qualified` | `default.converted` | `action.convert_lead_to_deal` | Target deal pipeline + estimated value |

- [ ] Code implemented with Clean Architecture .NET 10 backend and Next.js 16 MVVM frontend.
- [ ] Automated compilation passing with zero warnings or errors.
- [ ] Database migrations applied and verified against PostgreSQL single source of truth.
- [ ] Permissions registered in `IModulePermissionProvider` and assigned to test roles.
- [ ] Features activated for development tenant via `EditionSeeder`.
- [ ] Quotas configured and verified in `IModuleFeatureProvider`.
- [ ] Menu routes accessible and discoverable in application navigation across all 13 CRM views.
- [ ] Baseline production seeders verified with idempotent execution.
- [ ] Rich development data seeded covering all six pipeline lifecycle stages.
- [ ] Live unmocked browser Playwright E2E test suite passing with high-resolution screenshots.
- [ ] Delivery report and evidence pack generated and mirrored to documentation portal.
