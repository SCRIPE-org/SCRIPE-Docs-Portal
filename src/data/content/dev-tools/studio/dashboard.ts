// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.dashboard.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.dashboard.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.dashboard.termOutputHealth",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.dashboard.termOutputTelemetry",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.dashboard.nodeHub", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.dashboard.nodeMetrics", type: "info" },
      { id: "node3", labelKey: "devTools.studio.dashboard.nodeWorkers", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.dashboard.nodeHealth", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.dashboard.edgePoll" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.dashboard.edgeStream" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.dashboard.edgeProbe" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.dashboard.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Total Modules Metric Card",
            "Hover / Click",
            "14 Modules",
            "Shows total registered modules; clicking jumps directly to Module Catalog"
      ],
      [
            "Pending Migrations Card",
            "Hover / Click",
            "0 Pending (Green)",
            "Highlights unapplied EF Core migrations; clicking opens Database Manager"
      ],
      [
            "Service Status Pill: API",
            "Hover / Toggle",
            "Port 5001 (Healthy)",
            "Shows liveness status; provides quick restart and log streaming actions"
      ],
      [
            "Service Status Pill: Web",
            "Hover / Toggle",
            "Port 3000 (Healthy)",
            "Shows Next.js dev server status; provides port collision detection"
      ],
      [
            "Recent Activity Stream",
            "Scroll / Filter",
            "Chronological",
            "Audit log of all scaffolding events, migrations, and CLI executions"
      ],
      [
            "Quick Action Bar",
            "Click Shortcut",
            "Always Visible",
            "One-click shortcuts to scaffold modules, run check, or launch migrations"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.dashboard.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.dashboard.title",
            "contentKey": "devTools.studio.dashboard.description",
            "code": "scripe doctor --full",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Run Environment Diagnostics"
      },
      {
            "titleKey": "devTools.studio.dashboard.title",
            "contentKey": "devTools.studio.dashboard.description",
            "code": "scripe dev all",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Launch Full Development Stack"
      },
      {
            "titleKey": "devTools.studio.dashboard.title",
            "contentKey": "devTools.studio.dashboard.description",
            "code": "scripe health --ready",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Probe Readiness Endpoints"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/DASHBOARDSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.DASHBOARD.Domain.Entities;

public class SampleDashboardEntity : AuditableEntity
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
    titleKey: "devTools.studio.dashboard.title",
    contentKey: "devTools.studio.dashboard.description",
  },
];

registerPage({
  slug: "dev-tools/studio/dashboard",
  titleKey: "devTools.studio.dashboard.title",
  descriptionKey: "devTools.studio.dashboard.description",
  category: "dev-tools",
  order: 2,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
