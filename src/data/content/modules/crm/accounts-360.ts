import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "modules.crm.accounts.intro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.accounts.conceptTitle",
    id: "party-kernel-integration",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.accounts.conceptIntro",
  },
  {
    type: "table",
    headers: ["Attribute / Concept", "System of Record", "CRM Role & Responsibility"],
    rows: [
      ["Party Identity (PartyId)", "PartyKernel (Party)", "Logical GUID reference; immutable organization identity."],
      ["Legal Name & Registration", "PartyKernel (PartyOrganization)", "PartyKernel owns company registration, legal names, and tax identifiers."],
      ["Account Classification", "CRM (CrmAccountPartyRef)", "Enterprise, Mid-Market, SME, Federation, or Partner Club."],
      ["Commercial Ownership", "CRM (OwnerUserId, OwnerTeamId)", "D4/B record ownership and assignment for sales representatives."],
      ["Pipeline Value Rollup", "CRM (Computed Aggregate)", "Sum of estimated amount for open vs won opportunities."],
      ["Interaction History", "CRM (CrmSalesActivity)", "Chronological timeline of touchpoints with this legal entity."],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.accounts.modelTitle",
    id: "crm-account-model",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.accounts.modelIntro",
  },
  {
    type: "code",
    language: "csharp",
    filename: "src/Modules/CRM/CRM.Domain/Entities/CrmAccountPartyRef.cs",
    code: `public class CrmAccountPartyRef : AuditableEntity<Guid>, ITenantAwareEntity, ICrmScopedRecord
{
    public Guid? TenantId { get; set; }
    
    /// <summary>
    /// Logical reference to PartyKernel Party aggregate (PartyType.Organization).
    /// </summary>
    public Guid PartyId { get; set; }
    
    public string AccountNameSnapshot { get; set; } = null!;
    public string? CommercialSector { get; set; }
    public string? AccountTier { get; set; } // Tier 1, Strategic, Enterprise, Standard
    
    public Guid? OwnerUserId { get; set; }
    public Guid? OwnerTeamId { get; set; }
    
    public decimal TotalWonRevenue { get; set; }
    public int ActiveOpportunitiesCount { get; set; }
}`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.accounts.securityTitle",
    id: "security-fls-accounts",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.accounts.securityIntro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.accounts.apiTitle",
    id: "api-endpoints-accounts",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.accounts.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      ["GET", "/api/v1/crm/accounts", "crm.accounts.read", "List commercial accounts with search, sector, and ownership filtering under D4/B visibility"],
      ["GET", "/api/v1/crm/accounts/{id}", "crm.accounts.read", "Get full 360-degree commercial profile including active deals, contacts, and FLS figures"],
      ["POST", "/api/v1/crm/accounts", "crm.accounts.create", "Register a new commercial account referencing an existing PartyKernel organization"],
      ["PUT", "/api/v1/crm/accounts/{id}", "crm.accounts.update", "Update commercial classification, tier, or ownership assignment"],
    ],
  },
];

registerPage({
  slug: "modules/crm/accounts-360",
  titleKey: "modules.crm.accounts.title",
  descriptionKey: "modules.crm.accounts.description",
  category: "module-crm",
  order: 2,
  sections,
  relatedSlugs: [
    "modules/crm-overview",
    "modules/crm/contacts-context",
    "modules/crm/opportunities-kanban",
    "modules/party-kernel-overview",
  ],
  lastUpdated: "2026-11-02",
});
