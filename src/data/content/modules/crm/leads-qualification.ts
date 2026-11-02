import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "modules.crm.leads.intro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.leads.intakeTitle",
    id: "lead-intake-validation",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.leads.intakeIntro",
  },
  {
    type: "table",
    headers: ["Validation Rule", "Inspection Logic", "Enforcement & Outcome"],
    rows: [
      ["Workspace Collision", "Normalizes company name to slug and queries existing tenants", "Rejects with 'workspace_exists' conflict if duplicate found"],
      ["Email & Company Deduplication", "Checks active leads (non-Closed) with exact email and company match", "Rejects duplicate submission with 'duplicate_lead'"],
      ["ABM Colleague Linking", "Company match found but submitting email is distinct", "Preserves lead and links ParentLeadId for Enterprise ABM tracking"],
      ["Daily Ingestion Cap", "Counts total leads created by tenant or public IP today", "Rejects submission when exceeding 1,000 leads/day ('daily_cap_exceeded')"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.leads.lifecycleTitle",
    id: "lead-lifecycle-state-machine",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.leads.lifecycleIntro",
  },
  {
    type: "flowchart",
    direction: "vertical",
    nodes: [
      { id: "new", label: "New", description: "Inbound submission captured from web form or manual entry" },
      { id: "working", label: "Working", description: "Assigned sales rep initiates contact and discovery outreach" },
      { id: "qualified", label: "Qualified", description: "BANT criteria confirmed; ready for commercial conversion" },
      { id: "converted", label: "Converted", description: "Transformed into active Opportunity or provisioned Tenant" },
      { id: "disqualified", label: "Disqualified", description: "Closed due to budget, fit mismatch, or lack of response" },
    ],
    connections: [
      { from: "new", to: "working", label: "assign & contact" },
      { from: "working", to: "qualified", label: "BANT validation" },
      { from: "qualified", to: "converted", label: "execute conversion" },
      { from: "new", to: "disqualified", label: "spam / invalid" },
      { from: "working", to: "disqualified", label: "no fit / lost" },
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.leads.conversionTitle",
    id: "dual-conversion-pathways",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.leads.conversionIntro",
  },
  {
    type: "code",
    language: "csharp",
    filename: "src/Modules/CRM/CRM.Application/Leads/Commands/ConvertLeadToOpportunityCommandHandler.cs",
    code: `// Pathway B: Commercial Deal Conversion
public async Task<Result<ConvertLeadToOpportunityResult>> Handle(
    ConvertLeadToOpportunityCommand request,
    CancellationToken ct)
{
    var lead = await _leadRepo.GetByIdAsync(request.LeadId, ct);
    if (lead == null || lead.Status == LeadStatus.Converted)
        return Result.Fail("lead_invalid_or_already_converted");

    // 1. Resolve or create Commercial Account in CRM
    var accountId = request.AccountId ?? await ResolveOrCreateAccountAsync(lead, ct);

    // 2. Instantiate new Opportunity with PD-1 validated PartyId
    var opportunity = new CrmOpportunity
    {
        Id = Guid.NewGuid(),
        TenantId = lead.TenantId,
        Title = request.DealTitle ?? $"Deal: {lead.CompanyName ?? lead.ContactName}",
        LeadId = lead.Id,
        AccountId = accountId,
        PartyId = lead.VerifiedPartyId,
        EstimatedAmount = lead.EstimatedValue ?? 0,
        CurrencyCode = lead.Currency ?? "SAR",
        PipelineId = defaultPipeline.Id,
        StageId = initialStage.Id,
        StageKey = initialStage.Key,
        OwnerUserId = request.OwnerUserId ?? lead.OwnerUserId,
        Status = OpportunityStatus.Open
    };

    // 3. Mark Lead Converted
    lead.Status = LeadStatus.Converted;
    lead.ConvertedOpportunityId = opportunity.Id;

    await _unitOfWork.SaveChangesAsync(ct);
    return Result.Ok(new ConvertLeadToOpportunityResult(opportunity.Id, accountId));
}`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.leads.apiTitle",
    id: "api-endpoints-leads",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.leads.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      ["POST", "/api/v1/crm/leads", "crm.leads.create", "Admin or sales-rep creation of an inbound commercial prospect lead"],
      ["GET", "/api/v1/crm/leads", "crm.leads.read", "List leads with pagination, status filters, and assigned owner scope under D4/B"],
      ["GET", "/api/v1/crm/leads/{id}", "crm.leads.read", "Get full lead dossier including discovery notes, team size, and interest metadata"],
      ["PUT", "/api/v1/crm/leads/{id}/qualify", "crm.leads.qualify", "Transition lead state to Qualified with captured qualification notes and party verification"],
      ["POST", "/api/v1/crm/leads/{id}/convert-opportunity", "crm.leads.convert", "Convert qualified lead into an active CRM Opportunity and linked Commercial Account"],
      ["POST", "/api/v1/crm/leads/{id}/convert-tenant", "crm.leads.convert", "Execute atomic TenantProvisioner saga creating operational tenant, admin role, and edition"],
    ],
  },
];

registerPage({
  slug: "modules/crm/leads-qualification",
  titleKey: "modules.crm.leads.title",
  descriptionKey: "modules.crm.leads.description",
  category: "module-crm",
  order: 4,
  sections,
  relatedSlugs: [
    "modules/crm-overview",
    "modules/crm/opportunities-kanban",
    "modules/crm/accounts-360",
    "features/multi-tenancy",
  ],
  lastUpdated: "2026-11-02",
});
