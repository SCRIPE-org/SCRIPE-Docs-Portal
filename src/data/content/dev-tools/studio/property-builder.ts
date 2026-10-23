// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.propBuilder.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.propBuilder.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.propBuilder.termOutputDsl",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.propBuilder.termOutputBitwise",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.propBuilder.nodeInput", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.propBuilder.nodeDsl", type: "info" },
      { id: "node3", labelKey: "devTools.studio.propBuilder.nodeValidators", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.propBuilder.nodeEntity", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.propBuilder.edgeParse" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.propBuilder.edgeInfer" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.propBuilder.edgeEmit" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.propBuilder.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Primitive Type Dropdown",
            "Select string/int/decimal/etc.",
            "string",
            "Maps selected primitive to C# CLR type, TypeScript interface, and SQL data type"
      ],
      [
            "Required Modifier Checkbox",
            "Click Checkbox",
            "Unchecked",
            "Emits FluentValidation .NotEmpty(), EF .IsRequired(), and non-null TS property"
      ],
      [
            "Max / Min Bound Inputs",
            "Enter numeric values",
            "Empty",
            "Sets SQL nvarchar(max) length, decimal precision(18,2), or integer range bounds"
      ],
      [
            "Enum Mode: Single vs Flags",
            "Toggle Segment",
            "Single",
            "Switches between sequential values (0, 1, 2) and [Flags] bitwise powers of two (1, 2, 4, 8)"
      ],
      [
            "Auto-Sequence Token Input",
            "Enter token pattern",
            "Empty",
            "Supports tokens {YYYY}, {MM}, {DD}, and {SEQ:6} for automatic reference number generation"
      ],
      [
            "Composite SQL Index Builder",
            "Multi-Select Columns",
            "None",
            "Creates composite index with optional SQL filter preset like [IsDeleted] = 0"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.propBuilder.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.propBuilder.title",
            "contentKey": "devTools.studio.propBuilder.description",
            "code": "Title:string:required:max(120)",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Add Constrained String"
      },
      {
            "titleKey": "devTools.studio.propBuilder.title",
            "contentKey": "devTools.studio.propBuilder.description",
            "code": "Amount:decimal:required",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Add Financial Decimal"
      },
      {
            "titleKey": "devTools.studio.propBuilder.title",
            "contentKey": "devTools.studio.propBuilder.description",
            "code": "Status:enum(Draft=0,Sent=1,Paid=2)",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Add Strongly-Typed Enum"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/PROPBUILDERSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.PROPBUILDER.Domain.Entities;

public class SamplePropBuilderEntity : AuditableEntity
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
    titleKey: "devTools.studio.propBuilder.title",
    contentKey: "devTools.studio.propBuilder.description",
  },
];

registerPage({
  slug: "dev-tools/studio/property-builder",
  titleKey: "devTools.studio.propBuilder.title",
  descriptionKey: "devTools.studio.propBuilder.description",
  category: "dev-tools",
  order: 5,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
