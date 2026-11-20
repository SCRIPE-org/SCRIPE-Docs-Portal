import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "modules.crm.activities.intro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.activities.archTitle",
    id: "append-only-timeline-architecture",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.activities.archIntro",
  },
  {
    type: "table",
    headers: ["Activity Kind", "Business Purpose", "WorkManagement Task Delegation"],
    rows: [
      ["Call", "Outbound or inbound phone touchpoint with decision makers", "Creates follow-up call task with due date"],
      ["Meeting", "Product demonstration, pitch meeting, or contract negotiation", "Creates preparation task or proposal transmittal milestone"],
      ["Email", "Direct correspondence, RFP submissions, or quote follow-ups", "Generates reminder to track client confirmation"],
      ["Task", "Internal commercial operational action items", "Directly synchronized to assignee's task backlog"],
      ["Note", "Unstructured qualitative context and account observations", "Informational audit trail; does not require task creation"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.activities.deskTitle",
    id: "sales-execution-desk-ux",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.activities.deskIntro",
  },
  {
    type: "code",
    language: "csharp",
    filename: "src/Modules/CRM/CRM.Domain/Entities/CrmSalesActivity.cs",
    code: `public class CrmSalesActivity : AuditableEntity<Guid>, ITenantAwareEntity, ICrmScopedRecord
{
    public Guid? TenantId { get; set; }
    
    public SalesActivityKind Kind { get; set; }
    public string Subject { get; set; } = null!;
    public string? Description { get; set; }
    public DateTime ActivityDateUtc { get; set; }
    
    // Associations
    public Guid? OpportunityId { get; set; }
    public Guid? AccountId { get; set; }
    public Guid? ContactId { get; set; }
    
    // Invariant D5/B: Logical reference to WorkManagement Task
    public Guid? FollowUpTaskId { get; set; }
    
    public Guid LoggedByUserId { get; set; }
    public int? DurationMinutes { get; set; }
    public string? OutcomeNotes { get; set; }
}`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.activities.tasksTitle",
    id: "work-management-delegation",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.activities.tasksIntro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.activities.apiTitle",
    id: "api-endpoints-activities",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.activities.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      ["GET", "/api/v1/crm/activities", "crm.activities.read", "Query chronological sales interaction timeline filtered by account or opportunity"],
      ["POST", "/api/v1/crm/activities", "crm.activities.create", "Log append-only sales touchpoint and optionally delegate follow-up task to WorkManagement"],
    ],
  },
];

registerPage({
  slug: "modules/crm/sales-activities",
  titleKey: "modules.crm.activities.title",
  descriptionKey: "modules.crm.activities.description",
  category: "module-crm",
  order: 7,
  sections,
  relatedSlugs: [
    "modules/crm-overview",
    "modules/crm/accounts-360",
    "modules/crm/opportunities-kanban",
    "modules/work-management/work-items",
  ],
  lastUpdated: "2026-11-02",
});
