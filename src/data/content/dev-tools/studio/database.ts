// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.database.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.database.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.database.termOutputMig",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.database.termOutputSeed",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.database.nodeUi", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.database.nodeEf", type: "info" },
      { id: "node3", labelKey: "devTools.studio.database.nodePg", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.database.nodeSqlServer", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.database.edgePlan" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.database.edgeMigrate" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.database.edgePlan" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.database.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Provider Selector",
            "Toggle PG / MSSQL / Oracle",
            "PostgreSQL",
            "Switches target EF Core database engine and schema dialect"
      ],
      [
            "Migration Stepper Timeline",
            "Scroll / Inspect",
            "Chronological",
            "Displays historical migrations with status (Applied green / Pending yellow)"
      ],
      [
            "Add Migration CTA",
            "Click Button",
            "Modal Open",
            "Prompts for PascalCase migration name and runs dotnet ef migrations add"
      ],
      [
            "Update Database Button",
            "Click 'Update Database'",
            "Safety Armed",
            "Executes scripe db update applying pending migrations with zero-downtime"
      ],
      [
            "Run Seeders Drawer",
            "Click 'Seed Data'",
            "Drawer Open",
            "Triggers production system seeders, dev sample data seeders, or reset seeders"
      ],
      [
            "Backup / Restore Modal",
            "Click 'Backup Manager'",
            "Modal Open",
            "Creates compressed SQL dump archive or restores snapshot with one click"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.database.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.database.title",
            "contentKey": "devTools.studio.database.description",
            "code": "scripe db add-migration AddInvoiceLineItems -m Billing",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Scaffold Migration"
      },
      {
            "titleKey": "devTools.studio.database.title",
            "contentKey": "devTools.studio.database.description",
            "code": "scripe db update -m Billing --no-build",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Apply Pending Migration"
      },
      {
            "titleKey": "devTools.studio.database.title",
            "contentKey": "devTools.studio.database.description",
            "code": "scripe db seed --dev -m Billing",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Seed Development Fixtures"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/DATABASESample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.DATABASE.Domain.Entities;

public class SampleDatabaseEntity : AuditableEntity
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
    titleKey: "devTools.studio.database.title",
    contentKey: "devTools.studio.database.description",
  },
];

registerPage({
  slug: "dev-tools/studio/database",
  titleKey: "devTools.studio.database.title",
  descriptionKey: "devTools.studio.database.description",
  category: "dev-tools",
  order: 8,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
