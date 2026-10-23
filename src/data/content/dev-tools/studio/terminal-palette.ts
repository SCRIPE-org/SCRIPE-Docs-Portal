// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.termPalette.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.termPalette.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.termPalette.termOutputPalette",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.termPalette.termOutputMacro",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.termPalette.nodePalette", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.termPalette.nodeHotkey", type: "info" },
      { id: "node3", labelKey: "devTools.studio.termPalette.nodeFuzzy", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.termPalette.nodeExec", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.termPalette.edgeTrigger" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.termPalette.edgeSearch" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.termPalette.edgeDispatch" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.termPalette.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Command Palette Input",
            "Ctrl + K / Cmd + K",
            "Fuzzy Search",
            "Instant fuzzy search across all studio views, generators, and CLI tools"
      ],
      [
            "Terminal Session Tabs",
            "Click Tab (+ / -)",
            "Shell 1",
            "Multiple concurrent shell sessions running directly within the studio interface"
      ],
      [
            "Command History Buffer",
            "Up / Down Arrow",
            "History Stack",
            "Quickly recalls previously executed commands with parameter arguments"
      ],
      [
            "Quick Action Macros",
            "Click Button",
            "Pre-Configured",
            "One-click macros for 'Rebuild Monorepo', 'Sync Locales', or 'Clear Cache'"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.termPalette.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.termPalette.title",
            "contentKey": "devTools.studio.termPalette.description",
            "code": "Press Ctrl+K",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Open Command Palette"
      },
      {
            "titleKey": "devTools.studio.termPalette.title",
            "contentKey": "devTools.studio.termPalette.description",
            "code": "Type 'Generate Feature'",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Filter Actions"
      },
      {
            "titleKey": "devTools.studio.termPalette.title",
            "contentKey": "devTools.studio.termPalette.description",
            "code": "Press Enter",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Execute Selected Command"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/TERMPALETTESample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.TERMPALETTE.Domain.Entities;

public class SampleTermPaletteEntity : AuditableEntity
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
    titleKey: "devTools.studio.termPalette.title",
    contentKey: "devTools.studio.termPalette.description",
  },
];

registerPage({
  slug: "dev-tools/studio/terminal-palette",
  titleKey: "devTools.studio.termPalette.title",
  descriptionKey: "devTools.studio.termPalette.description",
  category: "dev-tools",
  order: 18,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
