import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "modules.crm.workflowStudio.intro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.workflowStudio.canvasTitle",
    id: "sovereign-2d-canvas-architecture",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.workflowStudio.canvasIntro",
  },
  {
    type: "table",
    headers: ["Canvas Feature", "Implementation Mechanism", "Architectural Advantage"],
    rows: [
      [
        "8-Port Connection Geometry",
        "2 connection ports per side (t1/t2, r1/r2, b1/b2, l1/l2) on every stage node",
        "Enables clean multi-edge fan-out and fan-in without line collision or overlapping connectors.",
      ],
      [
        "Orthogonal SVG Routing",
        "Computed 90-degree bend paths with directed arrowheads and interactive labels",
        "Provides clear visual pathways for forward progressions and backward revision loops.",
      ],
      [
        "Dynamic 1..N Stages",
        "Zero fixed stages; support for empty start, arbitrary stage addition, deletion, and re-ordering",
        "Tenants configure specialized commercial workflows (e.g., Simple 2-stage or Enterprise 10-stage).",
      ],
      [
        "Bidirectional Transitions",
        "Explicit Forward and Backward transition types with distinct visual styles and rules",
        "Prevents unintended state skipping while allowing controlled regression to preceding stages.",
      ],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.workflowStudio.validatorsTitle",
    id: "stage-exit-validators-and-custom-fields",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.workflowStudio.validatorsIntro",
  },
  {
    type: "table",
    headers: ["Validator Rule", "Inspection Logic", "Enforcement & Gate Purpose"],
    rows: [
      [
        "Commercial Value Required",
        "Estimated commercial value > 0",
        "Guarantees opportunity is priced before advancing to formal commercial stages.",
      ],
      [
        "Target Close Date",
        "Target close date is populated and in the future",
        "Ensures sales velocity and accurate quarterly revenue forecasting.",
      ],
      [
        "Party & Contact Verification",
        "Valid PartyId and primary contact assigned",
        "Enforces Invariant PD-1: formal proposals require verified legal counterparty identity.",
      ],
      [
        "Decision Maker Identified",
        "At least one linked contact designated with Decision Maker authority",
        "Prevents premature progression before identifying economic buyers.",
      ],
      [
        "Tenant Custom Field Binding",
        "Dynamically bound to custom attributes (e.g. Tender Reference, Legal Clearance)",
        "Enables sports federations and venues to enforce tenant-specific governance checklists.",
      ],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.workflowStudio.boardMappingTitle",
    id: "decoupled-board-column-mapping",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.workflowStudio.boardMappingIntro",
  },
  {
    type: "code",
    language: "json",
    filename: "CRM Pipeline Workflow & Board Column Mapping Contract",
    code: `{
  "pipelineId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Enterprise Sports Sponsorship Pipeline",
  "stages": [
    { "key": "discovery", "nameEn": "Discovery", "nameAr": "الاستكشاف", "winProbability": 10, "order": 1, "category": "Open" },
    { "key": "qualification", "nameEn": "Qualification", "nameAr": "التأهيل", "winProbability": 30, "order": 2, "category": "InProgress" },
    { "key": "solution_fit", "nameEn": "Solution Fit", "nameAr": "ملاءمة الحل", "winProbability": 50, "order": 3, "category": "InProgress" },
    { "key": "proposal", "nameEn": "Proposal", "nameAr": "تقديم العرض", "winProbability": 70, "order": 4, "category": "InProgress", "requiredValidators": ["party_verified", "estimated_amount_gt_zero"] },
    { "key": "closing", "nameEn": "Closing", "nameAr": "الإغلاق", "winProbability": 90, "order": 5, "category": "InProgress" }
  ],
  "transitions": [
    { "from": "discovery", "to": "qualification", "name": "Qualify Deal", "direction": "Forward" },
    { "from": "qualification", "to": "discovery", "name": "Return to Discovery", "direction": "Backward" },
    { "from": "qualification", "to": "solution_fit", "name": "Confirm Fit", "direction": "Forward" },
    { "from": "solution_fit", "to": "proposal", "name": "Submit Proposal", "direction": "Forward" },
    { "from": "proposal", "to": "solution_fit", "name": "Revise Scope", "direction": "Backward" },
    { "from": "proposal", "to": "closing", "name": "Execute Contract", "direction": "Forward" }
  ],
  "boardColumns": [
    { "id": "col-1", "name": "Intake", "mappedStageKeys": ["discovery"] },
    { "id": "col-2", "name": "Assessment", "mappedStageKeys": ["qualification", "solution_fit"] },
    { "id": "col-3", "name": "Contracting", "mappedStageKeys": ["proposal", "closing"] }
  ]
}`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.workflowStudio.apiTitle",
    id: "workflow-studio-api-endpoints",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.workflowStudio.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      [
        "GET",
        "/api/v1/crm/pipelines/default",
        "crm.pipelines.read",
        "Retrieve the active pipeline graph including stages, transitions, validators, and board column mappings.",
      ],
      [
        "PUT",
        "/api/v1/crm/pipelines/default",
        "crm.pipelines.manage",
        "Update pipeline definition: saves 2D node coordinates, transitions, stage exit validators, and board columns.",
      ],
      [
        "POST",
        "/api/v1/crm/pipelines/validate",
        "crm.pipelines.manage",
        "Dry-run graph validation to check reachability, cycle detection, orphan nodes, and validator completeness.",
      ],
    ],
  },
];

registerPage({
  slug: "modules/crm/workflow-studio-2d",
  titleKey: "modules.crm.workflowStudio.title",
  descriptionKey: "modules.crm.workflowStudio.description",
  category: "module-crm",
  order: 7,
  sections,
  relatedSlugs: [
    "modules/crm-overview",
    "modules/crm/pipeline-admin",
    "modules/crm/opportunities-kanban",
  ],
  lastUpdated: "2026-11-05",
});
