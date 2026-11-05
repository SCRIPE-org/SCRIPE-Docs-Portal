import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "modules.crm.overview.intro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.overview.archTitle",
    id: "architectural-design",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.overview.archIntro",
  },
  {
    type: "feature-grid",
    columns: 3,
    items: [
      {
        icon: "Building",
        titleKey: "modules.crm.overview.featureAccounts",
        descriptionKey: "modules.crm.overview.featureAccountsDesc",
      },
      {
        icon: "Users",
        titleKey: "modules.crm.overview.featureContacts",
        descriptionKey: "modules.crm.overview.featureContactsDesc",
      },
      {
        icon: "UserPlus",
        titleKey: "modules.crm.overview.featureLeads",
        descriptionKey: "modules.crm.overview.featureLeadsDesc",
      },
      {
        icon: "TrendingUp",
        titleKey: "modules.crm.overview.featureOpportunities",
        descriptionKey: "modules.crm.overview.featureOpportunitiesDesc",
      },
      {
        icon: "Kanban",
        titleKey: "modules.crm.overview.featureKanban",
        descriptionKey: "modules.crm.overview.featureKanbanDesc",
      },
      {
        icon: "Sliders",
        titleKey: "modules.crm.overview.featurePipeline",
        descriptionKey: "modules.crm.overview.featurePipelineDesc",
      },
      {
        icon: "Network",
        titleKey: "modules.crm.overview.featureWorkflowStudio",
        descriptionKey: "modules.crm.overview.featureWorkflowStudioDesc",
      },
      {
        icon: "DollarSign",
        titleKey: "modules.crm.overview.featureSettings",
        descriptionKey: "modules.crm.overview.featureSettingsDesc",
      },
      {
        icon: "Activity",
        titleKey: "modules.crm.overview.featureActivities",
        descriptionKey: "modules.crm.overview.featureActivitiesDesc",
      },
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.overview.modelTitle",
    id: "domain-models",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.overview.modelIntro",
  },
  {
    type: "code",
    language: "csharp",
    filename: "src/Modules/CRM/CRM.Domain/Entities/CrmOpportunity.cs",
    code: `public class CrmOpportunity : AuditableEntity<Guid>, ITenantAwareEntity, ICrmScopedRecord, IConcurrencyAwareEntity
{
    public Guid? TenantId { get; set; }
    public string Title { get; set; } = null!;
    public Guid? LeadId { get; set; }
    public Guid? AccountId { get; set; }
    public Guid? PartyId { get; set; } // Required before Proposal / Won (PD-1)
    
    public Guid PipelineId { get; set; }
    public Guid StageId { get; set; }
    public string StageKey { get; set; } = null!;
    public string? LastActiveStageKey { get; set; } // Preserved on close for PD-3 reopen
    
    public Guid? OwnerUserId { get; set; }
    public Guid? OwnerTeamId { get; set; }
    public DealKind DealKind { get; set; } = DealKind.NewBusiness;
    public HqOutcomeKind? HqOutcomeKind { get; set; }
    
    public decimal EstimatedAmount { get; set; } // Protected by FLS masking
    public string CurrencyCode { get; set; } = "SAR";
    public DateTime? TargetCloseDate { get; set; }
    public OpportunityStatus Status { get; set; } = OpportunityStatus.Open;
    public byte[] RowVersion { get; set; } = []; // Concurrency token
}`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.overview.securityTitle",
    id: "security-pbac",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.overview.securityIntro",
  },
  {
    type: "table",
    headers: ["Resource Area", "Permissions", "Access Gate & Visibility Scope"],
    rows: [
      ["Accounts", "crm.accounts.read, create, update, delete, view_financials", "D4/B Row-Level Security: Owner / Team / Manager Grant"],
      ["Contacts", "crm.contacts.read, create, update, delete", "Linked to canonical PartyKernel Person identities"],
      ["Leads", "crm.leads.read, create, update, delete, qualify, convert", "Deduplication gate, daily intake caps, ABM colleague linking"],
      ["Opportunities", "crm.opportunities.read, create, update, stage, close, reopen, view_financials", "PD-1..PD-5 pipeline rules, FLS financial figure masking"],
      ["Pipelines", "crm.pipelines.read, manage", "Single tenant default pipeline invariant, contiguous 1..5 permutations"],
      ["Activities", "crm.activities.read, create", "Append-only interaction audit timeline, WorkManagement follow-ups"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.overview.apiTitle",
    id: "api-catalog",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.overview.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      ["GET", "/api/v1/crm/opportunities", "crm.opportunities.read", "List CRM opportunities with pagination, search, status, and stage filters under D4/B visibility"],
      ["POST", "/api/v1/crm/opportunities", "crm.opportunities.create", "Create a qualified commercial opportunity adhering to PD-1 and currency rules"],
      ["PUT", "/api/v1/crm/opportunities/{id}/stage", "crm.opportunities.stage", "Advance or transition opportunity stage with RowVersion concurrency guard (PD-2)"],
      ["POST", "/api/v1/crm/opportunities/{id}/close-won", "crm.opportunities.close", "Close opportunity as Won enforcing verified PartyId (PD-1, PD-4)"],
      ["POST", "/api/v1/crm/opportunities/{id}/reopen", "crm.opportunities.reopen", "Reopen terminal opportunity restoring exact LastActiveStageKey (PD-3)"],
      ["GET", "/api/v1/crm/accounts/{id}", "crm.accounts.read", "Retrieve comprehensive 360-degree commercial account details with FLS projection"],
      ["GET", "/api/v1/crm/pipelines/default", "crm.pipelines.read", "Retrieve tenant default commercial pipeline definition with 5 canonical stages"],
      ["PUT", "/api/v1/crm/pipelines/default", "crm.pipelines.manage", "Update default pipeline stage order, win probabilities, and labels in PostgreSQL"],
      ["GET", "/api/v1/crm/activities", "crm.activities.read", "Query chronological sales interaction timeline filtered by account or opportunity"],
      ["POST", "/api/v1/crm/activities", "crm.activities.create", "Log append-only sales touchpoint and optionally delegate follow-up task to WorkManagement"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.overview.providersSeedersTitle",
    id: "providers-seeders-entitlements",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.overview.providersSeedersIntro",
  },
  {
    type: "table",
    headers: ["Subsystem Component", "Contract Interface & Implementation", "Responsibility & Governance"],
    rows: [
      ["Permission Provider", "IModulePermissionProvider (CRMPermissionProvider)", "Supplies 32 granular permissions (27 route/action + 5 bridge) to global PermissionSeeder. Strictly enforces zero read_all bypass."],
      ["Feature & Quota Provider", "IModuleFeatureProvider (CRMFeatureProvider)", "Defines boolean feature gates (CRM.Enabled, CRM.Pipelines.Custom, CRM.ManagerGrants.Enabled, CRM.Activities.Enabled) and quotas (CRM.MaxPipelines, CRM.MaxLeads, CRM.MaxOpportunities)."],
      ["Menu & Workspace Provider", "IModuleMenuProvider (CRMMenuProvider)", "Registers isolated 'crm' Workspace in primary rail (SortOrder 10, Hue 249) with secondary rail navigation across Leads, Deals, Accounts, Contacts, and Activities."],
      ["Production Seeder", "IModuleSeeder (CRMModuleSeeder)", "Idempotently initializes the default commercial pipeline with 5 canonical stages (Discovery, Qualification, SolutionFit, Proposal, Negotiation) across tenant schemas."],
      ["Development Seeder", "IModuleDevDataSeeder (CRMDevDataSeeder)", "Seeds deterministic multi-status test data and Ahly SC demo personas for unmocked local development and UAT readiness."],
    ],
  },
  {
    type: "info",
    variant: "note",
    contentKey: "modules.crm.overview.endpointsNote",
  },
];

registerPage({
  slug: "modules/crm-overview",
  titleKey: "modules.crm.overview.title",
  descriptionKey: "modules.crm.overview.description",
  category: "module-crm",
  order: 1,
  sections,
  relatedSlugs: [
    "modules/crm/accounts-360",
    "modules/crm/contacts-context",
    "modules/crm/leads-qualification",
    "modules/crm/opportunities-kanban",
    "modules/crm/pipeline-admin",
    "modules/crm/workflow-studio-2d",
    "modules/crm/settings-governance",
    "modules/crm/sales-activities",
  ],
  lastUpdated: "2026-11-05",
});
