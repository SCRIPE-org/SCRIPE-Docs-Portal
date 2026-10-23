// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.engineApi.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.engineApi.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.engineApi.termOutputRest",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.engineApi.termOutputWs",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.engineApi.nodeClient", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.engineApi.nodeRest", type: "info" },
      { id: "node3", labelKey: "devTools.studio.engineApi.nodeWs", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.engineApi.nodeDispatcher", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.engineApi.edgeHttp" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.engineApi.edgeBidirectional" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.engineApi.edgeHandle" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.engineApi.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "REST API Endpoints Table",
            "Inspect Specs",
            "GET/POST/PUT",
            "Documents /api/workspace, /api/scaffold, /api/diff, and /api/process"
      ],
      [
            "WebSocket JSON-RPC 2.0 Bus",
            "Inspect Protocol",
            "ws://:4201/rpc",
            "Details real-time terminal streaming, process exits, and file change events"
      ],
      [
            "X-Studio-Token Security Header",
            "Inspect Header",
            "Single-Use Secret",
            "Secures local daemon communication against unauthorized browser requests"
      ],
      [
            "Virtual Filesystem Sandbox",
            "Inspect Layer",
            "In-Memory AST",
            "Documents the in-memory compiler isolating changes until explicit user apply"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.engineApi.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.engineApi.title",
            "contentKey": "devTools.studio.engineApi.description",
            "code": "curl http://localhost:4201/api/workspace",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Query Workspace State"
      },
      {
            "titleKey": "devTools.studio.engineApi.title",
            "contentKey": "devTools.studio.engineApi.description",
            "code": "wscat -c ws://localhost:4201/rpc",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Connect WebSocket RPC"
      },
      {
            "titleKey": "devTools.studio.engineApi.title",
            "contentKey": "devTools.studio.engineApi.description",
            "code": "curl -X POST http://localhost:4201/api/diff",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Compute AST Diff"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/ENGINEAPISample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.ENGINEAPI.Domain.Entities;

public class SampleEngineApiEntity : AuditableEntity
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
    titleKey: "devTools.studio.engineApi.title",
    contentKey: "devTools.studio.engineApi.description",
  },
];

registerPage({
  slug: "dev-tools/studio/engine-api",
  titleKey: "devTools.studio.engineApi.title",
  descriptionKey: "devTools.studio.engineApi.description",
  category: "dev-tools",
  order: 20,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
