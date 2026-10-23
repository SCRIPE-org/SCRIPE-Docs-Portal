// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.testing.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.testing.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.testing.termOutputRun",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.testing.termOutputE2e",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.testing.nodeRunner", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.testing.nodeVitest", type: "info" },
      { id: "node3", labelKey: "devTools.studio.testing.nodePlaywright", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.testing.nodeCoverage", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.testing.edgeUnit" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.testing.edgeE2e" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.testing.edgeReport" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.testing.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Test Suite Tabs",
            "Click Suite Tab",
            "All Tests (14)",
            "Filters test runner by Unit Tests, Integration Tests, Vitest, or Playwright E2E"
      ],
      [
            "Run All Tests CTA",
            "Click Button / Hotkey",
            "Armed",
            "Executes entire monorepo test suite with live terminal progress stream"
      ],
      [
            "Watch Mode Toggle",
            "Click Switch",
            "Disabled",
            "Re-runs relevant test files automatically when saving code changes"
      ],
      [
            "Coverage Percentage Bars",
            "Inspect Bar",
            "88.4% Line",
            "Displays Line, Branch, and Method code coverage metrics per module"
      ],
      [
            "Failed Test Diagnostics Drawer",
            "Click Error",
            "Stack Trace",
            "Opens detailed failure assertion with clickable file links directly to source"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.testing.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.testing.title",
            "contentKey": "devTools.studio.testing.description",
            "code": "scripe test backend",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Run xUnit Backend Tests"
      },
      {
            "titleKey": "devTools.studio.testing.title",
            "contentKey": "devTools.studio.testing.description",
            "code": "scripe test frontend",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Run Vitest Frontend Tests"
      },
      {
            "titleKey": "devTools.studio.testing.title",
            "contentKey": "devTools.studio.testing.description",
            "code": "scripe e2e --headed",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Run Playwright Browser E2E"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/TESTINGSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.TESTING.Domain.Entities;

public class SampleTestingEntity : AuditableEntity
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
    titleKey: "devTools.studio.testing.title",
    contentKey: "devTools.studio.testing.description",
  },
];

registerPage({
  slug: "dev-tools/studio/testing",
  titleKey: "devTools.studio.testing.title",
  descriptionKey: "devTools.studio.testing.description",
  category: "dev-tools",
  order: 14,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
