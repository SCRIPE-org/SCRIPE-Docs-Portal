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
        "Contiguous 5-Stage Progression",
        "Standard transitions advance to adjacent forward stage (Discovery -> Qualification -> Proposal -> Negotiation -> Closing). Skipping requires explicit override.",
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
        "Strict Per-Currency Estimation",
        "Deals and kanban columns are strictly partitioned by currency code (SAR, USD, EUR); cross-currency arithmetic is strictly prohibited in aggregates.",
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
        Status = opp.Status,
        CurrencyCode = opp.CurrencyCode,
        RowVersion = Convert.ToBase64String(opp.RowVersion),
        
        // FLS Projection: Hide amounts from unauthorized roles
        EstimatedAmount = canViewFinancials ? opp.EstimatedAmount : null,
        MaskedFieldKeys = canViewFinancials ? [] : new[] { "estimatedAmount" }
    };
}`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.opportunities.kanbanTitle",
    id: "interactive-kanban-ux",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.opportunities.kanbanIntro",
  },
  {
    type: "flowchart",
    direction: "horizontal",
    nodes: [
      { id: "s1", label: "1. Discovery", description: "Initial stakeholder discovery & scope qualification" },
      { id: "s2", label: "2. Qualification", description: "BANT confirmation & technical evaluation" },
      { id: "s3", label: "3. Proposal", description: "Commercial terms transmittal (PD-1 Party Verified)" },
      { id: "s4", label: "4. Negotiation", description: "Contract pricing review & legal drafting" },
      { id: "s5", label: "5. Closing", description: "Final signature authorization (Won or Lost outcome)" },
    ],
    connections: [
      { from: "s1", to: "s2", label: "Advance" },
      { from: "s2", to: "s3", label: "Advance (PD-1 Gate)" },
      { from: "s3", to: "s4", label: "Advance" },
      { from: "s4", to: "s5", label: "Advance" },
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.opportunities.apiTitle",
    id: "api-endpoints-opportunities",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.opportunities.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      ["GET", "/api/v1/crm/opportunities", "crm.opportunities.read", "List opportunities with pagination, search, status, and stage filtering under D4/B"],
      ["GET", "/api/v1/crm/opportunities/kanban", "crm.opportunities.read", "Get currency-partitioned Kanban board view with per-stage deal groupings and aggregate totals"],
      ["GET", "/api/v1/crm/opportunities/{id}", "crm.opportunities.read", "Get detailed opportunity record including stage history, PartyKernel party profile, and FLS figures"],
      ["POST", "/api/v1/crm/opportunities", "crm.opportunities.create", "Create an opportunity validating party verification, pipeline currency, and initial stage"],
      ["PUT", "/api/v1/crm/opportunities/{id}/stage", "crm.opportunities.stage", "Advance or transition opportunity stage verifying contiguous order (PD-2) and RowVersion"],
      ["POST", "/api/v1/crm/opportunities/{id}/close-won", "crm.opportunities.close", "Mark deal ClosedWon enforcing PD-1 Party Verification and recording win timestamp"],
      ["POST", "/api/v1/crm/opportunities/{id}/close-lost", "crm.opportunities.close", "Mark deal ClosedLost capturing mandatory loss reason code and optional competitor name"],
      ["POST", "/api/v1/crm/opportunities/{id}/reopen", "crm.opportunities.reopen", "Reopen terminal deal restoring its exact pre-closure LastActiveStageKey (PD-3)"],
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
    "modules/crm/accounts-360",
    "modules/crm/sales-activities",
  ],
  lastUpdated: "2026-11-02",
});
