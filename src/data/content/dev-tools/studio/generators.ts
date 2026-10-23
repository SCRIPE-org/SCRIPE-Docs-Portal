// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.generators.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.generators.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.generators.termOutputCatalog",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.generators.termOutputEvolve",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.generators.nodeWizard", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.generators.nodeTemplates", type: "info" },
      { id: "node3", labelKey: "devTools.studio.generators.nodeGenerator", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.generators.nodeArtifacts", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.generators.edgeSelect" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.generators.edgeCompile" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.generators.edgeEmit" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.generators.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Generator Catalog Grid",
            "Click Card",
            "10 Generators",
            "Select from Feature, Event, Spec, Validator, Background Job, Hook, Page, Component"
      ],
      [
            "Interactive Wizard Form",
            "Input Fields",
            "Default Form",
            "Provides field validation and auto-generates CLI command preview in real-time"
      ],
      [
            "CLI Command Mirror",
            "Select / Copy",
            "Read-Only Preview",
            "Displays the exact scripe command that will execute for complete auditability"
      ],
      [
            "Dry-Run Safety Toggle",
            "Click Switch",
            "Enabled",
            "Runs generator in virtual AST memory to inspect preview before committing to disk"
      ],
      [
            "Execute Generator CTA",
            "Click Button",
            "Armed",
            "Executes generator via Studio Engine daemon and displays terminal output stream"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.generators.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.generators.title",
            "contentKey": "devTools.studio.generators.description",
            "code": "Select 'CRUD Slice' Generator",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Pick Generator Template"
      },
      {
            "titleKey": "devTools.studio.generators.title",
            "contentKey": "devTools.studio.generators.description",
            "code": "Fill Module: Venue, Entity: Court",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Specify Domain Details"
      },
      {
            "titleKey": "devTools.studio.generators.title",
            "contentKey": "devTools.studio.generators.description",
            "code": "Click 'Dry Run Preview'",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Review In-Memory AST"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/GENERATORSSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.GENERATORS.Domain.Entities;

public class SampleGeneratorsEntity : AuditableEntity
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
    titleKey: "devTools.studio.generators.title",
    contentKey: "devTools.studio.generators.description",
  },
];

registerPage({
  slug: "dev-tools/studio/generators",
  titleKey: "devTools.studio.generators.title",
  descriptionKey: "devTools.studio.generators.description",
  category: "dev-tools",
  order: 7,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
