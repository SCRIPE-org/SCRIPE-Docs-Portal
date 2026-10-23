// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.liveIde.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.liveIde.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.liveIde.termOutputPreview",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.liveIde.termOutputDiff",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.liveIde.nodeCanvas", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.liveIde.nodeAst", type: "info" },
      { id: "node3", labelKey: "devTools.studio.liveIde.nodeMonaco", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.liveIde.nodeDisk", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.liveIde.edgeTransform" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.liveIde.edgeStream" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.liveIde.edgePersist" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.liveIde.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Target Stack Filter Tabs",
            "Click Full / BE / FE",
            "Full Stack",
            "Filters file tree to show all files, backend C# only, or frontend TypeScript only"
      ],
      [
            "Diff Mode Toggle",
            "Click 'AST Diff'",
            "Live Preview",
            "Switches from full file rendering to side-by-side on-disk diff inspection"
      ],
      [
            "Fuzzy File Search Input",
            "Ctrl + P / Focus Input",
            "All Files",
            "Filters file tree dynamically by typing file path substrings"
      ],
      [
            "Status Badge: + NEW",
            "Visual Tag",
            "Green",
            "Indicates file does not exist on disk and will be newly scaffolded"
      ],
      [
            "Status Badge: MOD",
            "Visual Tag",
            "Yellow",
            "Indicates existing file will be modified with new registrations or methods"
      ],
      [
            "Status Badge: ON DISK",
            "Visual Tag",
            "Neutral",
            "Indicates file already exists on physical disk and is unmodified in this session"
      ],
      [
            "Mermaid ERD Toolbar (+, -, 100%, Reset)",
            "Toolbar Buttons",
            "Interactive",
            "Allows zooming and panning across the visual entity-relationship diagram"
      ],
      [
            "Copy Mermaid Markdown",
            "Click Copy Button",
            "Copies to Clipboard",
            "Copies raw Mermaid markdown block for immediate pasting into PRs or docs"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.liveIde.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.liveIde.title",
            "contentKey": "devTools.studio.liveIde.description",
            "code": "Select Target Stack: Backend Only",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Filter File Tree"
      },
      {
            "titleKey": "devTools.studio.liveIde.title",
            "contentKey": "devTools.studio.liveIde.description",
            "code": "Press Ctrl+P and type 'Config'",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Jump to Entity Configuration"
      },
      {
            "titleKey": "devTools.studio.liveIde.title",
            "contentKey": "devTools.studio.liveIde.description",
            "code": "Toggle AST Diff Mode",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Inspect In-Memory Diff"
      },
      {
            "titleKey": "devTools.studio.liveIde.title",
            "contentKey": "devTools.studio.liveIde.description",
            "code": "Click 'View ERD' Modal",
            "codeLanguage": "bash",
            "codeFilename": "Step 4: Review Visual Relational Map"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/LIVEIDESample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.LIVEIDE.Domain.Entities;

public class SampleLiveIdeEntity : AuditableEntity
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
    titleKey: "devTools.studio.liveIde.title",
    contentKey: "devTools.studio.liveIde.description",
  },
];

registerPage({
  slug: "dev-tools/studio/live-ide",
  titleKey: "devTools.studio.liveIde.title",
  descriptionKey: "devTools.studio.liveIde.description",
  category: "dev-tools",
  order: 6,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
