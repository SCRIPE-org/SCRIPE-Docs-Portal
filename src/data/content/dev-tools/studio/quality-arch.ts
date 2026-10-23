// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.qualityArch.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.qualityArch.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.qualityArch.termOutputAst",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.qualityArch.termOutputHeat",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.qualityArch.nodeRules", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.qualityArch.nodeParser", type: "info" },
      { id: "node3", labelKey: "devTools.studio.qualityArch.nodeGate", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.qualityArch.nodeReport", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.qualityArch.edgeLint" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.qualityArch.edgeEnforce" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.qualityArch.edgeMap" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.qualityArch.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Clean Architecture Rule Visualizer",
            "Inspect Grid",
            "5 Invariants",
            "Enforces 4-layer dependency model: Domain -> App -> Infra -> WebAPI"
      ],
      [
            "Roslyn / Oxlint Diagnostics List",
            "Click Violation",
            "0 Errors",
            "Displays prohibited imports, direct DbContext queries, and unhandled throws"
      ],
      [
            "Architectural Health Gauge",
            "Circular Meter",
            "100% Score",
            "Real-time health metric calculated from code complexity and rule compliance"
      ],
      [
            "Auto-Fix All Violations CTA",
            "Click Button",
            "Automated",
            "Applies automatic code refactoring to resolve formatting and namespace rules"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.qualityArch.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.qualityArch.title",
            "contentKey": "devTools.studio.qualityArch.description",
            "code": "scripe arch-check",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Validate Clean Architecture"
      },
      {
            "titleKey": "devTools.studio.qualityArch.title",
            "contentKey": "devTools.studio.qualityArch.description",
            "code": "scripe lint --fix",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Run Monorepo Linter"
      },
      {
            "titleKey": "devTools.studio.qualityArch.title",
            "contentKey": "devTools.studio.qualityArch.description",
            "code": "scripe format --check",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Verify Code Formatting"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/QUALITYARCHSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.QUALITYARCH.Domain.Entities;

public class SampleQualityArchEntity : AuditableEntity
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
    titleKey: "devTools.studio.qualityArch.title",
    contentKey: "devTools.studio.qualityArch.description",
  },
];

registerPage({
  slug: "dev-tools/studio/quality-arch",
  titleKey: "devTools.studio.qualityArch.title",
  descriptionKey: "devTools.studio.qualityArch.description",
  category: "dev-tools",
  order: 13,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
