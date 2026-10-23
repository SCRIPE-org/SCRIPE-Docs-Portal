// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.monitoring.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.monitoring.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.monitoring.termOutputTrace",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.monitoring.termOutputMetrics",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.monitoring.nodeService", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.monitoring.nodeCollector", type: "info" },
      { id: "node3", labelKey: "devTools.studio.monitoring.nodeOtel", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.monitoring.nodeDashboard", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.monitoring.edgeEmit" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.monitoring.edgeExport" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.monitoring.edgeRender" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.monitoring.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Health Probe Status",
            "Live Indicator",
            "/health (200 OK)",
            "Displays liveness and readiness probe status for API, DB, and cache"
      ],
      [
            "OpenTelemetry Waterfall Viewer",
            "Click Trace",
            "Distributed Trace",
            "Visualizes request spans across API gateway, MediatR handlers, and SQL queries"
      ],
      [
            "Response Latency Histograms",
            "Hover Graph",
            "p95: 22ms",
            "Plots p50, p95, and p99 response time percentiles over 1-minute windows"
      ],
      [
            "Transactional Outbox Queue",
            "Inspect Table",
            "0 Pending",
            "Monitors AstraFlow domain events queued in outbox for asynchronous dispatch"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.monitoring.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.monitoring.title",
            "contentKey": "devTools.studio.monitoring.description",
            "code": "scripe health --ready",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Probe Readiness Status"
      },
      {
            "titleKey": "devTools.studio.monitoring.title",
            "contentKey": "devTools.studio.monitoring.description",
            "code": "scripe logs backend --follow",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Stream Structured Logs"
      },
      {
            "titleKey": "devTools.studio.monitoring.title",
            "contentKey": "devTools.studio.monitoring.description",
            "code": "scripe outbox status",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Inspect Outbox Queue"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/MONITORINGSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.MONITORING.Domain.Entities;

public class SampleMonitoringEntity : AuditableEntity
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
    titleKey: "devTools.studio.monitoring.title",
    contentKey: "devTools.studio.monitoring.description",
  },
];

registerPage({
  slug: "dev-tools/studio/monitoring",
  titleKey: "devTools.studio.monitoring.title",
  descriptionKey: "devTools.studio.monitoring.description",
  category: "dev-tools",
  order: 19,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
