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
    id: "dynamic-pipeline-stages-and-governance",
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
      ["solution_fit", "Solution Fit / ملاءمة الحل", "50%", "Technical evaluation & requirements alignment"],
      ["proposal", "Proposal / تقديم العرض", "70%", "Commercial terms transmittal (Requires verified PartyId)"],
      ["negotiation", "Negotiation / التفاوض", "85%", "Contract legal review & procurement negotiations"],
      ["closing", "Closing / الإغلاق", "95%", "Final signatory execution & fulfillment handoff"],
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
    code: `// Validation 1: Contiguous Permutation Sort Order (1..N)
var sortOrders = request.Stages.Select(s => s.SortOrder).OrderBy(x => x).ToList();
var expectedContiguous = Enumerable.Range(1, request.Stages.Count).ToList();
if (!sortOrders.SequenceEqual(expectedContiguous))
    return Result.Fail("pipeline_stages_order_must_be_contiguous_permutation");

// Validation 2: Transition Integrity & Reachability
var stageKeySet = request.Stages.Select(s => s.Key).ToHashSet();
foreach (var transition in request.Transitions)
{
    if (!stageKeySet.Contains(transition.FromStageKey) || !stageKeySet.Contains(transition.ToStageKey))
        return Result.Fail("pipeline_transition_references_unknown_stage");
}

// Validation 3: Pre-Proposal Reachability Gate
var proposalStage = request.Stages.FirstOrDefault(s => s.Key == "proposal");
if (proposalStage != null)
{
    var hasPrecedingDiscoveryOrQualification = request.Stages
        .Any(s => s.SortOrder < proposalStage.SortOrder && s.Key is "discovery" or "qualification" or "solution_fit");
    if (!hasPrecedingDiscoveryOrQualification)
        return Result.Fail("pipeline_proposal_must_be_preceded_by_qualification");
}`,
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
      ["GET", "/api/v1/crm/pipelines/default", "crm.pipelines.read", "Retrieve tenant's default commercial pipeline definition with all active stages, transitions, and column mappings"],
      ["PUT", "/api/v1/crm/pipelines/default", "crm.pipelines.manage", "Update default commercial pipeline labels, stage ordering, win probabilities, and exit validators"],
      ["POST", "/api/v1/crm/pipelines/validate", "crm.pipelines.manage", "Validate pipeline graph consistency, directed edge connectivity, and gate rules prior to commit"],
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
    "modules/crm/workflow-studio-2d",
    "modules/crm/opportunities-kanban",
    "modules/crm/settings-governance",
  ],
  lastUpdated: "2026-11-05",
});
