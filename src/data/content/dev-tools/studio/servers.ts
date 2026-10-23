// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.servers.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.servers.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.servers.termOutputRestart",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.servers.termOutputSuper",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.servers.nodeSuper", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.servers.nodeApi", type: "info" },
      { id: "node3", labelKey: "devTools.studio.servers.nodeWeb", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.servers.nodeDocs", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.servers.edgeWatch" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.servers.edgeWatch" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.servers.edgeWatch" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.servers.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Process Card: Backend API",
            "Click Restart / Stop",
            "Port 5001 (Running)",
            "Controls dotnet watch process running ASP.NET Core API with hot-reload"
      ],
      [
            "Process Card: Frontend Portal",
            "Click Restart / Stop",
            "Port 3000 (Running)",
            "Controls Next.js Turbopack development server with React Fast Refresh"
      ],
      [
            "Process Card: Docs Portal",
            "Click Restart / Stop",
            "Port 3002 (Running)",
            "Controls Next.js documentation portal server"
      ],
      [
            "Process Card: Studio Engine",
            "Click Restart",
            "Port 4201 (Daemon)",
            "Controls Node.js Studio RPC daemon and WebSocket terminal stream"
      ],
      [
            "Port Conflict Guard",
            "Alert Banner",
            "Automated",
            "Detects rogue processes occupying required ports and offers one-click termination"
      ],
      [
            "Live Terminal Stream Tab",
            "Click Tab",
            "Console Output",
            "Streams stdout and stderr logs for each process with pause and clear controls"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.servers.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.servers.title",
            "contentKey": "devTools.studio.servers.description",
            "code": "scripe dev backend",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Start Backend in Watch Mode"
      },
      {
            "titleKey": "devTools.studio.servers.title",
            "contentKey": "devTools.studio.servers.description",
            "code": "scripe dev frontend",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Start Frontend with Turbopack"
      },
      {
            "titleKey": "devTools.studio.servers.title",
            "contentKey": "devTools.studio.servers.description",
            "code": "scripe dev all",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Launch Full Orchestrated Stack"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/SERVERSSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.SERVERS.Domain.Entities;

public class SampleServersEntity : AuditableEntity
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
    titleKey: "devTools.studio.servers.title",
    contentKey: "devTools.studio.servers.description",
  },
];

registerPage({
  slug: "dev-tools/studio/servers",
  titleKey: "devTools.studio.servers.title",
  descriptionKey: "devTools.studio.servers.description",
  category: "dev-tools",
  order: 9,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
