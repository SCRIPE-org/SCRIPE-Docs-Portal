// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.overview.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.overview.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.overview.termOutputStart",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.overview.termOutputDaemon",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.overview.nodeUi", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.overview.nodeIpc", type: "info" },
      { id: "node3", labelKey: "devTools.studio.overview.nodeEngine", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.overview.nodeMonorepo", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.overview.edgeWs" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.overview.edgeRpc" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.overview.edgeFs" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.overview.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Global Command Palette",
            "Ctrl + K / Cmd + K",
            "Hidden",
            "Fuzzy search across all 60+ commands, pages, and generators with instant execution"
      ],
      [
            "Live IDE File Search",
            "Ctrl + P / Cmd + P",
            "Focused",
            "Filters AST preview file tree by relative path with nearest substring matching"
      ],
      [
            "Target Stack Tabs",
            "Tab Click (Full/BE/FE)",
            "Full Stack",
            "Filters file tree to show both, backend-only (.cs), or frontend-only (.ts/.tsx)"
      ],
      [
            "Mermaid ERD Modal",
            "Click 'View ERD'",
            "Closed",
            "Opens interactive zoomable entity-relationship diagram with markdown copy button"
      ],
      [
            "Auto-Layout Canvas",
            "Shift + L",
            "Manual",
            "Executes Dagre layout algorithm to organize entity nodes without overlapping edges"
      ],
      [
            "Apply Changes to Disk",
            "Click 'Apply Changes'",
            "Safety Guarded",
            "Flushes sandboxed in-memory AST modifications to disk with automatic git staging"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.overview.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.overview.title",
            "contentKey": "devTools.studio.overview.description",
            "code": "pnpm studio:dev",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Launch Studio Daemon & UI"
      },
      {
            "titleKey": "devTools.studio.overview.title",
            "contentKey": "devTools.studio.overview.description",
            "code": "scripe new-module Logistics --workspace logistics",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Scaffold Initial Domain Module"
      },
      {
            "titleKey": "devTools.studio.overview.title",
            "contentKey": "devTools.studio.overview.description",
            "code": "scripe check --quick",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Universal Quality Gate Verification"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/OVERVIEWSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.OVERVIEW.Domain.Entities;

public class SampleOverviewEntity : AuditableEntity
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
    titleKey: "devTools.studio.overview.title",
    contentKey: "devTools.studio.overview.description",
  },
];

registerPage({
  slug: "dev-tools/studio/overview",
  titleKey: "devTools.studio.overview.title",
  descriptionKey: "devTools.studio.overview.description",
  category: "dev-tools",
  order: 1,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
