import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "modules.crm.contacts.intro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.contacts.conceptTitle",
    id: "canonical-person-references",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.contacts.conceptIntro",
  },
  {
    type: "table",
    headers: ["Role Category", "Description", "Commercial Authority"],
    rows: [
      ["Primary Commercial Contact", "Default liaison for quotes, scheduling, and notifications", "Operational / Day-to-Day"],
      ["Economic Decision Maker", "Authorized to approve contracts, pricing, and capital outlays", "Executive / Budget Authority"],
      ["Technical / Athletic Evaluator", "Reviews facility specifications, pitch surfaces, and academy schedules", "Operational Evaluator"],
      ["Procurement / Billing Liaison", "Coordinates purchase orders, tax receipts, and payment settlements", "Financial / Administrative"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.contacts.modelTitle",
    id: "crm-contact-model",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.contacts.modelIntro",
  },
  {
    type: "code",
    language: "csharp",
    filename: "src/Modules/CRM/CRM.Domain/Entities/CrmContactPartyRef.cs",
    code: `public class CrmContactPartyRef : AuditableEntity<Guid>, ITenantAwareEntity, ICrmScopedRecord
{
    public Guid? TenantId { get; set; }
    
    /// <summary>
    /// Logical reference to PartyKernel Party aggregate (PartyType.Person).
    /// </summary>
    public Guid PartyId { get; set; }
    
    /// <summary>
    /// Optional parent Commercial Account.
    /// </summary>
    public Guid? AccountId { get; set; }
    
    public string ContactNameSnapshot { get; set; } = null!;
    public string? JobTitle { get; set; }
    public string? Department { get; set; }
    public bool IsPrimaryContact { get; set; }
    
    public string? DirectEmail { get; set; }
    public string? DirectPhone { get; set; }
}`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.contacts.apiTitle",
    id: "api-endpoints-contacts",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.contacts.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      ["GET", "/api/v1/crm/contacts", "crm.contacts.read", "List contacts with account, job title, and keyword filtering under D4/B visibility"],
      ["GET", "/api/v1/crm/contacts/{id}", "crm.contacts.read", "Retrieve contact details, account associations, and recent interaction timeline"],
      ["POST", "/api/v1/crm/contacts", "crm.contacts.create", "Create and link a contact profile referencing a verified PartyKernel Person party"],
      ["PUT", "/api/v1/crm/contacts/{id}", "crm.contacts.update", "Update job title, primary commercial contact flag, or communication channels"],
    ],
  },
];

registerPage({
  slug: "modules/crm/contacts-context",
  titleKey: "modules.crm.contacts.title",
  descriptionKey: "modules.crm.contacts.description",
  category: "module-crm",
  order: 3,
  sections,
  relatedSlugs: [
    "modules/crm-overview",
    "modules/crm/accounts-360",
    "modules/party-kernel-overview",
  ],
  lastUpdated: "2026-11-02",
});
