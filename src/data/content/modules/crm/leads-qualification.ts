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
    id: "dual-conversion-and-governance",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.leads.conversionIntro",
  },
  {
    type: "table",
    headers: ["Conversion Policy", "Configuration Mode", "System Behavior"],
    rows: [
      [
        "Configurable Deal Creation",
        "Tenant Setting (Auto vs Manual)",
        "Converting a lead marks status as Converted. Opportunity generation can be automatic or initiated manually by the sales rep.",
      ],
      [
        "Rollback Lock Protection",
        "Pipeline Governance Rule",
        "Converted leads are locked from accidental regression unless explicitly authorized by a Commercial Manager grant.",
      ],
      [
        "Tenant Provisioning Saga",
        "SaaS Self-Serve Pathway",
        "Triggers the atomic TenantProvisioner saga to instantiate an operational tenant workspace, admin user, and edition plan.",
      ],
    ],
  },
  {
    type: "code",
    language: "csharp",
    filename: "src/Modules/CRM/CRM.Application/Leads/Commands/ConvertLeadToOpportunityCommandHandler.cs",
    code: `// Lead to Opportunity Conversion with PartyKernel Linkage
public async Task<Result<Guid>> Handle(ConvertLeadToOpportunityCommand request, CancellationToken ct)
{
    var lead = await _db.Leads.FirstOrDefaultAsync(l => l.Id == request.LeadId, ct);
    if (lead == null) return Result.Fail("lead_not_found");
    if (lead.Status == LeadStatus.Converted) return Result.Fail("lead_already_converted");

    // 1. Resolve or establish Party identity
    var partyId = await _partyContract.EnsurePartyAsync(lead.CompanyName, lead.Email, ct);

    // 2. Instantiate commercial opportunity
    var opp = new CrmOpportunity
    {
        Id = Guid.NewGuid(),
        TenantId = lead.TenantId,
        LeadId = lead.Id,
        PartyId = partyId,
        Title = $"Deal -- {lead.CompanyName}",
        EstimatedAmount = request.EstimatedAmount ?? 0m,
        CurrencyCode = request.CurrencyCode ?? "SAR",
        StageKey = "discovery"
    };

    lead.Status = LeadStatus.Converted;
    lead.ConvertedAtUtc = DateTime.UtcNow;

    _db.Opportunities.Add(opp);
    await _db.SaveChangesAsync(ct);
    return Result.Ok(opp.Id);
}`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.leads.apiTitle",
    id: "leads-api-endpoints",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.leads.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      ["GET", "/api/v1/crm/leads", "crm.leads.read", "List leads with status filter, ABM hierarchy, and contact metadata"],
      ["POST", "/api/v1/crm/leads", "crm.leads.create", "Create inbound lead via sales rep entry or CRM API"],
      ["POST", "/api/v1/crm/leads/{id}/qualify", "crm.leads.qualify", "Advance lead to Qualified stage with qualification notes"],
      ["POST", "/api/v1/crm/leads/{id}/convert/opportunity", "crm.leads.convert", "Convert qualified lead into commercial opportunity"],
      ["POST", "/api/v1/crm/leads/{id}/convert/tenant", "crm.leads.convert", "Convert qualified lead into fully provisioned SCRIPE tenant"],
      ["POST", "/api/v1/crm/leads/{id}/disqualify", "crm.leads.qualify", "Disqualify lead with structured reason code"],
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
    "modules/crm/contacts-context",
  ],
  lastUpdated: "2026-11-05",
});
