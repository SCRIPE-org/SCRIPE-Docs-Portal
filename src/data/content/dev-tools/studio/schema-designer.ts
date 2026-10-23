// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.schemaDesigner.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.schemaDesigner.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.schemaDesigner.termOutputErd",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.schemaDesigner.termOutputDiff",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.schemaDesigner.nodeCanvas", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.schemaDesigner.nodeRelations", type: "info" },
      { id: "node3", labelKey: "devTools.studio.schemaDesigner.nodeCodegen", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.schemaDesigner.nodeEfCore", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.schemaDesigner.edgeCard" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.schemaDesigner.edgeAst" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.schemaDesigner.edgeSync" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.schemaDesigner.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Canvas Pan & Drag",
            "Middle Click / Space + Drag",
            "Infinite Canvas",
            "Pans viewport across large entity diagrams smoothly"
      ],
      [
            "Zoom Controls (+, -, 100%, Fit)",
            "Toolbar Buttons / Mouse Wheel",
            "100%",
            "Zooms between 25% and 200% with crisp vector text rendering"
      ],
      [
            "Minimap Radar",
            "Bottom-Right Widget",
            "Visible",
            "Displays global thumbnail of all module entities with draggable camera frame"
      ],
      [
            "Entity Node 4-Sided Ports",
            "Hover on Node Edge",
            "Top/Bottom/Left/Right",
            "Interactive connection points for drawing non-overlapping relational lines"
      ],
      [
            "Add Entity CTA Button",
            "Sidebar Button",
            "Static",
            "Spawns new entity card on canvas with AuditableEntity base inheritance"
      ],
      [
            "Auto-Layout Diagram",
            "Shift + L / Toolbar Button",
            "Manual",
            "Reorganizes all entity cards using hierarchical directed acyclic graph layout"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.schemaDesigner.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.schemaDesigner.title",
            "contentKey": "devTools.studio.schemaDesigner.description",
            "code": "Add Entity: Tournament",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Create Root Entity"
      },
      {
            "titleKey": "devTools.studio.schemaDesigner.title",
            "contentKey": "devTools.studio.schemaDesigner.description",
            "code": "Add Entity: Match",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Create Child Entity"
      },
      {
            "titleKey": "devTools.studio.schemaDesigner.title",
            "contentKey": "devTools.studio.schemaDesigner.description",
            "code": "Connect Ports: Top to Bottom",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Establish 1:N Relationship"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/SCHEMADESIGNERSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.SCHEMADESIGNER.Domain.Entities;

public class SampleSchemaDesignerEntity : AuditableEntity
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
    titleKey: "devTools.studio.schemaDesigner.title",
    contentKey: "devTools.studio.schemaDesigner.description",
  },
];

registerPage({
  slug: "dev-tools/studio/schema-designer",
  titleKey: "devTools.studio.schemaDesigner.title",
  descriptionKey: "devTools.studio.schemaDesigner.description",
  category: "dev-tools",
  order: 4,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
