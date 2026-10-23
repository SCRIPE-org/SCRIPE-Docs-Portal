// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.secTenants.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.secTenants.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.secTenants.termOutputIsolation",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.secTenants.termOutputPbac",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.secTenants.nodeTenant", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.secTenants.nodeRoles", type: "info" },
      { id: "node3", labelKey: "devTools.studio.secTenants.nodePerms", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.secTenants.nodeQueryFilter", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.secTenants.edgeBind" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.secTenants.edgeAuthorize" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.secTenants.edgeEnforce" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.secTenants.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Multi-Tenant Schema Inspector",
            "Inspect Tree",
            "Dedicated Schemas",
            "Displays physical schema separation per module (identity, billing, venue)"
      ],
      [
            "Tenant Quota Gauges",
            "Inspect Meters",
            "Tier: Enterprise",
            "Visualizes active user counts, storage capacity, and rate limit consumption"
      ],
      [
            "PBAC Permission Matrix Editor",
            "Toggle Checkbox",
            "Role Mappings",
            "Maps granular permissions (e.g. CanCreateInvoice) to roles in real-time"
      ],
      [
            "RLS Query Simulator",
            "Run Query Test",
            "Verified",
            "Simulates tenant queries ensuring WHERE TenantId = @TenantId is injected"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.secTenants.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.secTenants.title",
            "contentKey": "devTools.studio.secTenants.description",
            "code": "scripe tenant provision --name 'Acme Sports'",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Provision New Tenant"
      },
      {
            "titleKey": "devTools.studio.secTenants.title",
            "contentKey": "devTools.studio.secTenants.description",
            "code": "scripe tenant quota AcmeSports --set users=500",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Configure Resource Quotas"
      },
      {
            "titleKey": "devTools.studio.secTenants.title",
            "contentKey": "devTools.studio.secTenants.description",
            "code": "scripe tenant migrate --all",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Apply Tenant Migrations"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/SECTENANTSSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.SECTENANTS.Domain.Entities;

public class SampleSecTenantsEntity : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public EntityStatus Status { get; set; } = EntityStatus.Active;
    
    // Logical cross-module reference (Never direct physical foreign key)
    public Guid LogicalTenantId { get; set; }
}`,
  },

  // ─── Architectural Callout Info Alert ───────────────────────
  {
    type: "info",
    variant: "tip",
    titleKey: "devTools.studio.secTenants.title",
    contentKey: "devTools.studio.secTenants.description",
  },
];

registerPage({
  slug: "dev-tools/studio/security-tenants",
  titleKey: "devTools.studio.secTenants.title",
  descriptionKey: "devTools.studio.secTenants.description",
  category: "dev-tools",
  order: 17,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
