# How does the SCRIPE CRM Enterprise Overhaul achieve Sovereign Assignee Lookup, Zero-Offset Direct Kanban Drag, Dynamic Stage Gates, and 5-Layer OWASP Defense? {#crm-enterprise-overhaul-security-ux}

SCRIPE CRM Enterprise Overhaul unifies tenant-scoped sovereign assignee lookup with field-level redaction, eliminates Broken Object Level Authorization (BOLA) across lead, opportunity, and buying committee handlers, replaces legacy drag handles with high-precision full-card `@dnd-kit` pointer tracking, binds stage progression to an audited exit-gate allowlist with dynamic custom fields, and enforces real-time multi-currency conversion across Kanban headers, 360 views, and financial reports.[](source:crm_assignees)

- Tenant-scoped assignee endpoint `GET /api/v1/crm/settings/assignees` queries active users and teams with AES-GCM encrypted wire IDs and masks PII when identity/email fields are restricted.[](source:crm_assignees)
- `PermittedExitFieldKeys` and `MoveOpportunityStageCommandHandler` enforce strict allowlists for exit gates, eliminating unchecked string keys and verifying tenant context on every stage transition.[](source:crm_exit_gates)
- `KanbanSortableCard` and `CrmEntitySearchSelect` achieve zero-handle direct full-card drag with a 6px `PointerSensor` constraint, inline quick-create dialogs, and instant multi-currency header aggregation.[](source:crm_kanban)
- Buying committee stakeholder management (`CrmDealContactRole`), `CrmWorkflowTransitionDialog` reset-on-open lifecycle, and batch display-name hydration deliver complete parity with Odoo 18, SAP Sales Cloud, and Salesforce Lightning.[](source:crm_enterprise_ux)

@answer scope="CRM Enterprise Overhaul · Sovereign Assignee Lookup · Zero-Handle Kanban Drag · Dynamic Stage Gates · 5-Layer OWASP Hardening · Multi-Currency Aggregation"
@meta locale=en style=editorial quality_profile=showcase repo_url="https://github.com/SCRIPE-org/SCRIPE.git" repo_revision="83eb92c90b77279b61af54734f62314ae0694196"
@source crm_assignees title="SCRIPE CRM Sovereign Assignee Lookup & Field-Level PBAC Specification" url="https://docs.scripe.org/crm/assignee-lookup"
@source crm_exit_gates title="SCRIPE Pipeline Dynamic Stage Gate Allowlist & Concurrency Architecture" url="https://docs.scripe.org/crm/stage-gate-governance"
@source crm_kanban title="Full-Card Kanban Sortable Pointer Sensor & Multi-Currency Engine" url="https://docs.scripe.org/crm/kanban-direct-drag"
@source crm_enterprise_ux title="CRM 360 Progressive Disclosure, Buying Committee & Search Combobox Standards" url="https://docs.scripe.org/crm/enterprise-ux-standards"
@source crm_security_audit title="CRM 5-Layer Security Architecture & OWASP BOLA/PBAC Defense Matrix" url="https://docs.scripe.org/security/crm-owasp-mitigation"

## How do Direct Full-Card Kanban Drag and Searchable Entity Combobox interact with Stage Gate Overlays? {#direct-kanban-architecture}

In high-velocity enterprise sales environments, drag handles such as `GripVertical` introduce interaction friction, while unconstrained pointer events cause accidental dragging during text selection or button clicking. Furthermore, hardcoded entity pickers and static UUID mocks degrade both user trust and security boundaries. SCRIPE CRM re-engineers Kanban interaction by attaching `@dnd-kit/sortable` listeners directly to the outer matte card container, configuring a 6px `PointerSensor` activation distance, isolating button pointer events via `stopPropagation()`, and integrating `CrmEntitySearchSelect` for server-backed, debounced entity search with inline quick-creation.[](source:crm_kanban)

@architecture id=kanban-component-arch title="Direct Full-Card Kanban, CrmEntitySearchSelect & Dynamic Stage Gate Overlay"
| kanban_view | CRM Kanban View | frontend |
| sortable_card | KanbanSortableCard | frontend |
| sensor | 6px PointerSensor | frontend |
| drop_column | KanbanStageColumn | frontend |
| search_select | CrmEntitySearchSelect | frontend |
| quick_create | Inline QuickCreate | frontend |
| gate_dialog | TransitionDialog | frontend |
| currency_hook | useCrmCurrency | frontend |
| api_service | CRM API Gateway | backend |
| kanban_view > sortable_card | renders cards |
| sortable_card > sensor | pointer drag | emphasis |
| sensor > drop_column | tracks drop target |
| sortable_card > gate_dialog | triggers gate |
| gate_dialog > search_select | entity input |
| search_select > quick_create | fallback create | dashed |
| search_select > api_service | debounced lookup | security |
| drop_column > currency_hook | column total sum |
| gate_dialog > api_service | stage move commit | emphasis |

@steps id=kanban-arch-steps
| st_kb_direct | Zero-Handle Direct Drag | `KanbanSortableCard` spreads sortable attributes and listeners directly onto the root card element, eliminating the legacy `GripVertical` icon button while keeping resting card borders flat matte without double-nested border wrappers. | kanban-component-arch | sortable_card |
| st_kb_sensor | 6px Pointer Distance Constraint | `PointerSensor` enforces an activation constraint of 6px distance, preventing accidental card drags during clicks, double-clicks, or text selections; inner action buttons invoke `stopPropagation()` on pointer down. | kanban-component-arch | sensor |
| st_kb_combobox | Server-Searchable Entity Combobox | `CrmEntitySearchSelect` performs debounced 250ms asynchronous queries against tenant-scoped endpoints (`assignees`, `accounts`, `contacts`, `leads`), rendering human display names and subtitles while maintaining encrypted IDs internally. | kanban-component-arch | search_select |
| st_kb_quickcreate | Inline Entity Quick-Create | When a required account or contact is absent, users create the record directly inside `CrmEntityQuickCreateDialog` without leaving the transition screen or losing in-flight form data. | kanban-component-arch | quick_create |
| st_kb_dialog_reset | Form Reset on Open Lifecycle | `CrmWorkflowTransitionDialog` executes `reset(defaultValues)` upon opening or record switching, guaranteeing that stale form state from previous transitions never contaminates new stage moves. | kanban-component-arch | gate_dialog |

@facts id=kanban-facts
| Drag Gesture Model | Direct full-card draggable surface; `cursor-grab active:cursor-grabbing`; 0 `GripVertical` handles |
| Activation Constraint | `PointerSensor` with `distance: 6` (or 8px); zero jitter on click; `stopPropagation()` on card footer CTAs |
| Entity Search & Pick | `CrmEntitySearchSelect` with 250ms debounce; supports `assignee`, `account`, `contact`, `lead`, `opportunity` |
| Quick-Create Flow | In-situ modal creation via `CrmEntityQuickCreateDialog`; automatically selects newly created entity |
| Concurrency Token | Form submission transmits `ExpectedRowVersion`; conflicts trigger HTTP 409 and prompt user refresh |

## How does Tenant-Scoped Assignee Lookup enforce Field Redaction and prevent BOLA attacks? {#assignee-lookup-security-trace}

Exposing unbounded user lists across multi-tenant boundaries creates severe privacy and security vulnerabilities (OWASP API1:2023 BOLA and API3:2023 Broken Object Property Level Authorization). SCRIPE CRM implements sovereign assignee resolution via `GET /api/v1/crm/settings/assignees`, routed to `LookupCrmAssigneesQueryHandler`. The handler enforces tenant isolation via `_currentUser.EffectiveTenantId`, verifies caller CRM permissions (`crm.overview.read`, `crm.records.assign`, etc.), evaluates field-level masking via `IRestrictedFieldsResolver`, and encrypts all outbound entity identifiers using `IIdEncryptionService`. Additionally, all mutation handlers verify parent opportunity and tenant matching before modifying records.[](source:crm_assignees)

@sequence id=assignee-lookup-seq title="Tenant-Scoped Assignee Lookup, PBAC Verification & AES-GCM ID Encryption"
| actor client | Search Select | frontend |
| actor ctrl | Settings API | backend |
| actor handler | Assignee Handler | backend |
| actor pbac | Field Resolver | security |
| actor crypto | Id Encryption | security |
| actor repo | User Repo | database |
| phase | 1. Ingress & PBAC Authorization |
| client | ctrl | GET /assignees?search=sarah&kind=user |
| ctrl | handler | LookupCrmAssigneesQuery |
| handler | pbac | GetRestrictedFieldsAsync("users") | security |
| pbac | handler | Restricted fields: ["email"] | return |
| phase | 2. Tenant-Scoped Candidate Query |
| handler | repo | SearchActiveUsersAsync(tenantId, "sarah") |
| repo | handler | Active Tenant Users | return |
| phase | 3. PII Redaction & Wire Encryption |
| handler | crypto | Encrypt(user.Id) | security |
| crypto | handler | AES-GCM Cipher Token | return |
| handler | ctrl | Result.Success(AssigneeDto) | return |
| ctrl | client | 200 OK [{ id: "enc_...", displayName: "Sarah Chen" }] | return |

@steps id=assignee-steps
| st_sec_auth | Tenant Authentication & Scope | The handler verifies that `EffectiveTenantId` is present and non-empty; missing or invalid tenant context immediately yields `403 Forbidden` (`CRM_TENANT_CONTEXT_REQUIRED`). | assignee-lookup-seq | handler |
| st_sec_pbac | Granular CRM PBAC Verification | Callers must possess one of 8 permitted CRM scopes (`crm.overview.read`, `crm.records.assign`, `crm.activities.followup`, etc.) unless operating as a System Protected Admin. | assignee-lookup-seq | handler |
| st_sec_redact | Dynamic Restricted Fields Masking | `IRestrictedFieldsResolver` checks whether `firstName`, `lastName`, `username`, or `email` are restricted for the caller's role; restricted identity fields abort the candidate read, while restricted email omits email from subtitles. | assignee-lookup-seq | pbac |
| st_sec_encrypt | Symmetric Wire ID Encryption | Candidate GUIDs are passed through `_idEncryption.Encrypt(candidate.Id)` so raw database database keys are never exposed on the wire. | assignee-lookup-seq | crypto |
| st_sec_render | Human-Readable Client Selection | `CrmEntitySearchSelect` renders the sanitized `displayName` and `subtitle` (role/department) in the popover while storing the opaque encrypted token in the form state. | assignee-lookup-seq | client |

@callout id=owasp-bola-callout level=note title="OWASP API1:2023 BOLA Mitigation Across Handlers"
In addition to the assignee lookup, all CRM mutation handlers (`MoveOpportunityStageCommandHandler`, `AddDealContactRoleCommandHandler`, `RemoveDealContactRoleCommandHandler`, `ConvertLeadCommandHandler`) verify that both the target record and any child entities belong strictly to `EffectiveTenantId`. When a record does not exist or belongs to another tenant, the backend emits a uniform `404 NotFound`, preventing tenant enumeration attacks.

## How do Dynamic Pipeline Stage Gates and Buying Committee Roles govern Deal Progression? {#pipeline-gate-workflow}

Enterprise sales cycles demand that stage movements satisfy strict governance criteria before advancing toward financial commitment. Legacy implementations suffered from arbitrary string dictionary keys and unchecked client payloads. SCRIPE CRM establishes `PermittedExitFieldKeys` as a sovereign allowlist governing exit gates across both Lead and Opportunity pipelines. When moving an opportunity into advanced stages (`Solution Fit`, `Proposal`, `Negotiation`), the system validates required fields (`estimatedAmount`, `targetCloseDate`, `solutionFitConfirmed`, `primaryContactRole`), verifies buying committee stakeholders (`CrmDealContactRole`), and prompts for loss or disqualification reasons upon terminal closure.[](source:crm_exit_gates)

@workflow id=pipeline-gate-flow title="5-Stage Deal Progression, Exit Gate Allowlist & Buying Committee Validation"
| lane lead | 1. Lead BANT Qualification |
| lane opp | 2. Opportunity Stage Move |
| lane gate | 3. Exit Gate Validation |
| lane committee | 4. Buying Committee Gate |
| lane closure | 5. Terminal Closure |
| lead_qual | BANT Qualification | backend | lead |
| lead_convert | Convert to Deal | backend | lead |
| opp_move | Drag / Advance Stage | frontend | opp |
| check_allowlist | Check Permitted Keys | security | gate |
| validate_fields | Validate Required Inputs | backend | gate |
| check_committee | Primary Stakeholder Set? | backend | committee |
| terminal_check | Won or Lost Move? | backend | closure |
| terminal_win | Won: Close Notes | backend | closure |
| terminal_loss | Lost: Reason Code | backend | closure |
| lead_qual > lead_convert | qualified |
| lead_convert > opp_move | creates deal | emphasis |
| opp_move > check_allowlist | triggers gate |
| check_allowlist > validate_fields | keys permitted |
| validate_fields > check_committee | inputs valid |
| check_committee > terminal_check | committee valid |
| terminal_check > terminal_win | won stage |
| terminal_check > terminal_loss | lost stage | dashed |

@steps id=pipeline-steps
| st_pipe_bant | BANT Lead Qualification | Leads are scored against Budget, Authority, Need, and Timeline criteria; qualifying moves validate `leadPhoneOrEmail`, `leadSourceChannel`, and `leadBantNotes`. | pipeline-gate-flow | lead_qual |
| st_pipe_convert | Atomic Deal & Party Conversion | `ConvertLeadCommandHandler` transitions the lead to `Qualified`, creates or links the `CrmAccountPartyRef` and `CrmContactPartyRef`, and scaffolds the initial `CrmOpportunity` with initial stage and assigned owner. | pipeline-gate-flow | lead_convert |
| st_pipe_allowlist | Permitted Exit Field Allowlist | `PermittedExitFieldKeys.All` validates incoming field dictionary keys; custom attributes must match approved prefixes (`custom:`, `rule:`, `action:`, `restrict:`, `validate:`). | pipeline-gate-flow | check_allowlist |
| st_pipe_gate_exec | Dynamic Gate Field Validation | Handlers check required commercial bounds (`estimatedAmount > 0`, `targetCloseDate >= UtcNow`, `solutionFitConfirmed == true`); unfulfilled gates block progression or display `CrmWorkflowTransitionDialog`. | pipeline-gate-flow | validate_fields |
| st_pipe_committee | Buying Committee Governance | Critical pipeline transitions require at least one verified stakeholder contact role (`DecisionMaker`, `EconomicBuyer`, `TechnicalEvaluator`, `Champion`) registered via `CrmDealContactRole`. | pipeline-gate-flow | check_committee |
| st_pipe_closure | Terminal Outcome Enforcement | Moving to `Closed Won` enforces mandatory close notes and verified accounts; moving to `Closed Lost` requires a structured `lossReasonCode` (`Pricing`, `Competitor`, `BudgetCut`, `NoDecision`). | pipeline-gate-flow | terminal_check |

## How does the CRM Physical Database Schema maintain Cross-Module Integrity and Concurrency? {#crm-physical-schema}

To support high-throughput operations across multi-tenant sport enterprises, SCRIPE CRM enforces Clean Architecture 3-project boundaries with zero cross-module EF Core foreign keys. Inter-module references to `PartyKernel` and `Identity` use logical GUID identifiers. Concurrency is managed via optimistic locking tokens (`RowVersion` / `xmin`), while all tables inherit from `AuditableEntity<Guid>` (`CreatedAt`, `CreatedBy`, `UpdatedAt`, `UpdatedBy`, `IsDeleted`).[](source:crm_enterprise_ux)

@erd id=crm-erd title="CRM Multi-Tenant Physical Relational Model"
| entity crm_leads | Leads |
| entity crm_opportunities | Opportunities |
| entity crm_deal_contact_roles | Buying Committee |
| entity crm_account_party_refs | Account Party Refs |
| crm_leads.id | uuid | pk |
| crm_leads.tenant_id | uuid | |
| crm_leads.party_id | uuid | |
| crm_leads.owner_user_id | uuid | |
| crm_leads.stage_key | varchar(64) | |
| crm_leads.row_version | bytea | |
| crm_opportunities.id | uuid | pk |
| crm_opportunities.tenant_id | uuid | |
| crm_opportunities.account_id | uuid | fk | crm_account_party_refs.id |
| crm_opportunities.owner_user_id | uuid | |
| crm_opportunities.stage_key | varchar(64) | |
| crm_opportunities.estimated_amount | numeric | |
| crm_opportunities.currency_code | char(3) | |
| crm_opportunities.row_version | bytea | |
| crm_deal_contact_roles.id | uuid | pk |
| crm_deal_contact_roles.opportunity_id | uuid | fk | crm_opportunities.id |
| crm_deal_contact_roles.contact_party_id | uuid | |
| crm_deal_contact_roles.stakeholder_role | varchar(32) | |
| crm_deal_contact_roles.is_primary | boolean | |
| crm_deal_contact_roles.row_version | bytea | |
| crm_account_party_refs.id | uuid | pk |
| crm_account_party_refs.tenant_id | uuid | |
| crm_account_party_refs.party_id | uuid | |
| crm_deal_contact_roles > crm_opportunities | many:one |
| crm_opportunities > crm_account_party_refs | many:one |

@facts id=schema-facts
| Persistence Architecture | Dual-Mode isolated schema (`crm.*`); zero cross-module foreign key constraints |
| Optimistic Concurrency | `RowVersion` byte-array / `xmin` token on all entities; guarded in CQRS commands |
| Display Name Hydration | `CrmDisplayNameResolutionHelper` batches accounts, contacts, and users with 0 N+1 queries |
| Soft Delete Support | `IsDeleted` boolean flag indexed with `TenantId` on all auditable entities |
| Indexing Strategy | Composite indexes on `(TenantId, StageKey, IsDeleted)` and `(TenantId, OwnerUserId, IsDeleted)` |

## How does the Multi-Currency Engine convert deals across Kanban Columns and Financial Reports? {#multi-currency-lineage}

Sports enterprise franchises frequently negotiate sponsorships, facility bookings, and player transfers in diverse currencies (SAR, USD, EUR, GBP, AED). Without unified multi-currency aggregation, pipeline totals become mathematically invalid when mixed currencies are summed naively. SCRIPE CRM implements `useCrmCurrency` on the client and server-side rate snapshots in `ICrmSettingsStore`. When all opportunities in a column share the same currency, the column header displays that native currency; when opportunities have mixed currencies, the engine converts each deal into the tenant's `BaseCurrency` using real-time cached exchange rates.[](source:crm_kanban)

| Stage Column | Deals in Column | Native Currencies | Conversion Applied? | Rendered Header Total |
| --- | --- | --- | --- | --- |
| Discovery {#row-curr-disc} | 4 Deals | 4 × SAR 50,000 | Native Sum (No Conversion) | SAR 200,000 {good:Native Exact} |
| Qualification {#row-curr-qual} | 3 Deals | 1 × USD 20,000, 2 × SAR 75,000 | Converted via USD/SAR rate (3.75) | SAR 225,000 (≈ SAR) {good:Converted Base} |
| Solution Fit {#row-curr-sol} | 2 Deals | 1 × EUR 40,000, 1 × SAR 120,000 | Converted via EUR/SAR rate (4.05) | SAR 282,000 (≈ SAR) {good:Converted Base} |
| Proposal {#row-curr-prop} | 5 Deals | 5 × USD 30,000 | Native Sum (All USD) | USD 150,000 {good:Native Exact} |
| Negotiation {#row-curr-neg} | 2 Deals | 1 × GBP 25,000, 1 × SAR 180,000 | Converted via GBP/SAR rate (4.78) | SAR 299,500 (≈ SAR) {good:Converted Base} |
| Closed Won {#row-curr-won} | 8 Deals | Mixed Currencies | Base Currency Rollup | SAR 1,450,000 (Total Revenue) {good:Audited Total} |

```mermaid title="Multi-Currency Revenue Rollup by Stage (Converted to SAR in Thousands)"
xychart-beta
  x-axis ["Discovery", "Qualification", "Solution Fit", "Proposal", "Negotiation", "Closed Won"]
  y-axis "Value (k SAR)" 0 --> 1500
  bar "Converted Volume" [200, 225, 282, 562, 299, 1450]
```

## How does the Refactored CRM compare against Odoo 18, SAP Sales Cloud, and Salesforce Lightning? {#enterprise-audit-matrix}

To validate our enterprise overhaul against world-class commercial CRM benchmarks, we evaluated SCRIPE CRM across eight core architectural, UX, and security criteria against Odoo 18 Enterprise, SAP Sales Cloud v2, and Salesforce Lightning.[](source:crm_enterprise_ux)

| Evaluation Criterion | Legacy SCRIPE CRM | SCRIPE CRM Enterprise Overhaul | Odoo 18 Enterprise | SAP Sales Cloud / Salesforce |
| --- | --- | --- | --- | --- |
| 1. Kanban Drag Gesture {#row-comp-drag} | Required dragging 14px `GripVertical` handle; double border nesting | Direct full-card drag via `@dnd-kit`; 6px `PointerSensor`; 0 handles {good:Direct Fluid} | Direct card drag; no handle required | Direct drag with card elevation and shadow states |
| 2. Assignee & Entity Pickers {#row-comp-pickers} | Mocked UUIDs; raw GUIDs in UI; static select options | `CrmEntitySearchSelect` with 250ms debounced search + inline quick-create {good:Sovereign Combobox} | Relational autocomplete; modal quick-create | Lookup combobox with recent records cache |
| 3. Exit Gate Governance {#row-comp-gates} | Unchecked dictionary keys; unhandled 400 errors | `PermittedExitFieldKeys` allowlist; dynamic `CrmWorkflowTransitionDialog` {good:Fail-Closed} | Stage automated actions; required fields | Stage exit criteria with validation rules |
| 4. Buying Committee Roles {#row-comp-committee} | No multi-stakeholder support; single contact field | Full `CrmDealContactRole` entity with role classifications and primary flag {good:B2B Enterprise} | Partner contacts list without formal roles | Opportunity Contact Roles with influence tracking |
| 5. Multi-Currency Kanban {#row-comp-currency} | Naive arithmetic sum of mixed currency amounts | Real-time exchange rate conversion to `BaseCurrency` with converted badge {good:Multi-Currency} | Multi-currency company ledger conversion | Advanced Currency Management with dated rates |
| 6. OWASP BOLA / PBAC Defense {#row-comp-owasp} | Unvalidated child entity deletion; raw entity GUIDs | Tenant isolation checks on all handlers; AES-GCM ID encryption; generic 404s {good:OWASP API1 Immune} | Model-level record rules; server-side ACL | Object-level sharing rules and field-level security |
| 7. Display Name Resolution {#row-comp-names} | Displayed `Party: 3f8a...`; N+1 individual queries | `CrmDisplayNameResolutionHelper` batch resolution with 0 N+1 queries {good:Batch Zero N+1} | SQL JOIN resolution on name fields | Polymorphic SOQL relationship queries |
| 8. Concurrency & Collision {#row-comp-concurrency} | Last write wins; silent data overwrites | Byte-array `RowVersion` optimistic concurrency tokens with HTTP 409 recovery {good:RowVersion Guard} | Optimistic write date checks (`write_date`) | SystemModstamp optimistic check |

## How do engineering and QA teams certify full platform compliance before release? {#verification-checklist}

Every deployment of the SCRIPE CRM module must satisfy all verification gates across backend compilation, unit testing, frontend linting, architecture invariants, and bilingual localization parity.[](source:crm_security_audit)

- [ ] Run `dotnet test SCRIPE-Backend/tests/Modules/CRM/CRM.Application.Tests` and confirm all 317 tests pass with 0 failures and 0 skipped.
- [ ] Run `pnpm --dir SCRIPE-Frontend test` and confirm all CRM Vitest suites pass (`CrmEntitySearchSelect.test.tsx`, `crmTransitionTypes.test.ts`, `crmCustomFieldsStudio.test.ts`).
- [ ] Run `node SCRIPE-Dev-Tools/scripe.js arch-check -m CRM --depth deep` and confirm 100/100 backend score and 0 frontend architectural errors.
- [ ] Run `node SCRIPE-Dev-Tools/scripe.js validate-locales` and confirm 100% key parity across English (`*.en.ts`) and Arabic (`*.ar.ts`) dictionaries with 0 missing keys.
- [ ] Verify that `GET /api/v1/crm/settings/assignees` returns encrypted IDs without exposing plaintext database GUIDs on the wire.
- [ ] Verify that dragging an opportunity card in `/crm/opportunities` initiates smoothly across the entire card body without requiring a `GripVertical` handle.
- [ ] Verify that opening `CrmWorkflowTransitionDialog` resets in-flight form data and dynamically renders required gate fields (`contactId`, `accountId`, `discountPercent`).
- [ ] Verify that column headers on the Kanban board calculate converted sums in the tenant's `BaseCurrency` when opportunities contain mixed currencies.
- [ ] Verify that removing a buying committee contact role from an opportunity belonging to another tenant returns HTTP 404 rather than leaking entity existence.
