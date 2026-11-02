import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "modules.crm.pipeline.intro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.pipeline.governanceTitle",
    id: "single-default-pipeline-law",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.pipeline.governanceIntro",
  },
  {
    type: "table",
    headers: ["Canonical Stage Key", "Default Label (EN / AR)", "Default Win %", "Stage Category"],
    rows: [
      ["discovery", "Discovery / الاستكشاف", "10%", "Initial lead qualification & needs analysis"],
      ["qualification", "Qualification / التأهيل", "30%", "BANT confirmation & stakeholder engagement"],
      ["proposal", "Proposal / تقديم العرض", "60%", "Commercial terms transmittal (Requires verified PartyId)"],
      ["negotiation", "Negotiation / التفاوض", "80%", "Contract legal review & procurement"],
      ["closing", "Closing / الإغلاق", "90%", "Final signatory execution"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.pipeline.rulesTitle",
    id: "reordering-reachability-rules",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.pipeline.rulesIntro",
  },
  {
    type: "code",
    language: "csharp",
    filename: "src/Modules/CRM/CRM.Application/Pipelines/Commands/UpdateDefaultPipelineCommandHandler.cs",
    code: `// Validation 1: Canonical 5-Stage Set Immutability
var expectedKeys = new HashSet<string> { "discovery", "qualification", "proposal", "negotiation", "closing" };
var incomingKeys = request.Stages.Select(s => s.Key).ToHashSet();
if (!expectedKeys.SetEquals(incomingKeys))
    return Result.Fail("pipeline_stages_canonical_set_immutable");

// Validation 2: Contiguous 1..5 Permutation Sort Order
var sortOrders = request.Stages.Select(s => s.SortOrder).OrderBy(x => x).ToList();
if (!sortOrders.SequenceEqual(new[] { 1, 2, 3, 4, 5 }))
    return Result.Fail("pipeline_stages_order_must_be_contiguous_permutation");

// Validation 3: Pre-Proposal Reachability Gate
var proposalOrder = request.Stages.First(s => s.Key == "proposal").SortOrder;
var precedingStages = request.Stages.Where(s => s.SortOrder < proposalOrder).Select(s => s.Key);
if (!precedingStages.Any(k => k is "discovery" or "qualification"))
    return Result.Fail("pipeline_proposal_must_be_preceded_by_qualification");`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.pipeline.apiTitle",
    id: "api-endpoints-pipelines",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.pipeline.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      ["GET", "/api/v1/crm/pipelines/default", "crm.pipelines.read", "Retrieve tenant's single default commercial pipeline definition with all 5 active stages"],
      ["PUT", "/api/v1/crm/pipelines/default", "crm.pipelines.manage", "Update default commercial pipeline labels, stage ordering, and win probabilities in PostgreSQL"],
    ],
  },
];

registerPage({
  slug: "modules/crm/pipeline-admin",
  titleKey: "modules.crm.pipeline.title",
  descriptionKey: "modules.crm.pipeline.description",
  category: "module-crm",
  order: 6,
  sections,
  relatedSlugs: [
    "modules/crm-overview",
    "modules/crm/opportunities-kanban",
  ],
  lastUpdated: "2026-11-02",
});
