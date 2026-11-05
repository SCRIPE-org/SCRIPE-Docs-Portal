import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "modules.crm.opportunities.intro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.opportunities.invariantsTitle",
    id: "five-pipeline-invariants",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.opportunities.invariantsIntro",
  },
  {
    type: "table",
    headers: ["Invariant Code", "Rule Definition", "Validation & Architectural Guarantee"],
    rows: [
      [
        "PD-1",
        "Non-Bypassable Party Verification Gate",
        "PartyId (PartyKernel Organization or Person) is strictly required before entering Proposal stage, Won closure, or HQ contract fulfillment.",
      ],
      [
        "PD-2",
        "Directed Transition Graph Progression",
        "Stage transitions must follow configured directed transitions in the active pipeline workflow, obeying stage exit validator gates and forward/backward path rules.",
      ],
      [
        "PD-3",
        "Deterministic Reopen State Preservation",
        "Reopening a closed opportunity restores its exact pre-closure stage stored in LastActiveStageKey rather than resetting to stage 1.",
      ],
      [
        "PD-4",
        "Segregated Closed Outcomes",
        "Closed opportunities terminate in distinct terminal states: ClosedWon, ClosedLost (requires reason code & competitor), ClosedDisqualified, or HqWithdrawn.",
      ],
      [
        "PD-5",
        "Triple-Value Multi-Currency FX Engine",
        "Deals track Original Amount + Currency, Converted Base Amount, and FxRateSnapshot. Aggregates and kanban headers compute standardized Base Currency rollups.",
      ],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.opportunities.concurrencyTitle",
    id: "concurrency-fls",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.opportunities.concurrencyIntro",
  },
  {
    type: "code",
    language: "csharp",
    filename: "src/Modules/CRM/CRM.Application/Opportunities/Services/OpportunityFlsProjector.cs",
    code: `// Server-Side Field-Level Security (FLS) Financial Projection
public static OpportunityDto ProjectWithFls(CrmOpportunity opp, bool canViewFinancials)
{
    return new OpportunityDto
    {
        Id = opp.Id,
        Title = opp.Title,
        StageKey = opp.StageKey,
        EstimatedAmount = canViewFinancials ? opp.EstimatedAmount : null,
        BaseEstimatedAmount = canViewFinancials ? opp.BaseEstimatedAmount : null,
        CurrencyCode = opp.CurrencyCode,
        CanViewFinancials = canViewFinancials,
        MaskedFieldKeys = canViewFinancials ? [] : ["EstimatedAmount", "BaseEstimatedAmount"],
        RowVersion = Convert.ToBase64String(opp.RowVersion)
    };
}`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.opportunities.kanbanTitle",
    id: "high-velocity-kanban-board",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.opportunities.kanbanIntro",
  },
  {
    type: "table",
    headers: ["Kanban Capability", "Implementation Pattern", "User Experience Impact"],
    rows: [
      [
        "Base Currency Header Rollup",
        "Multi-currency sum formatted with converted base total (e.g. USD 2.7M / SAR 6.1M -> Base USD 4.3M)",
        "Gives commercial directors instant aggregate pipeline visibility across international currencies.",
      ],
      [
        "Dynamic Board Columns",
        "Columns dynamically map to workflow stages or grouped status categories",
        "Adapts seamlessly whether the pipeline has 3 simple stages or 8 specialized enterprise stages.",
      ],
      [
        "Optimistic Movement & Rollback",
        "Instant UI position update with automatic revert if server-side validator gate fails",
        "Provides lightning-fast user experience while maintaining absolute server validation integrity.",
      ],
      [
        "WCAG 2.1 AA Keyboard Traversal",
        "Space/Enter pick, arrow key traversal between columns, Esc cancellation",
        "100% accessible to assistive technologies without requiring a mouse.",
      ],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.opportunities.apiTitle",
    id: "opportunities-api-endpoints",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.opportunities.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      ["GET", "/api/v1/crm/opportunities", "crm.opportunities.read", "List opportunities with pagination, search, status filter, and FLS masking"],
      ["POST", "/api/v1/crm/opportunities", "crm.opportunities.create", "Create commercial opportunity with currency code and initial stage"],
      ["PUT", "/api/v1/crm/opportunities/{id}/stage", "crm.opportunities.advance", "Advance or regress stage according to active pipeline transitions and exit validators"],
      ["POST", "/api/v1/crm/opportunities/{id}/close", "crm.opportunities.close", "Terminate deal as ClosedWon, ClosedLost, or ClosedDisqualified"],
      ["POST", "/api/v1/crm/opportunities/{id}/reopen", "crm.opportunities.manage", "Restore closed deal to its exact pre-closure stage stored in LastActiveStageKey"],
    ],
  },
];

registerPage({
  slug: "modules/crm/opportunities-kanban",
  titleKey: "modules.crm.opportunities.title",
  descriptionKey: "modules.crm.opportunities.description",
  category: "module-crm",
  order: 5,
  sections,
  relatedSlugs: [
    "modules/crm-overview",
    "modules/crm/pipeline-admin",
    "modules/crm/workflow-studio-2d",
    "modules/crm/settings-governance",
  ],
  lastUpdated: "2026-11-05",
});
