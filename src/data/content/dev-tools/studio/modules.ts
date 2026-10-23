// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.modules.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.modules.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.modules.termOutputGraph",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.modules.termOutputScaff",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.modules.nodeDomain", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.modules.nodeApp", type: "info" },
      { id: "node3", labelKey: "devTools.studio.modules.nodeInfra", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.modules.nodeWeb", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.modules.edgeDdd" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.modules.edgeDispatch" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.modules.edgeImpl" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.modules.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Search Modules Filter",
            "Typing in search bar",
            "Empty",
            "Filters module grid instantly by name, schema, or tags"
      ],
      [
            "Scope Dropdown Filter",
            "Select Option",
            "All Scopes",
            "Filters modules by TenantOnly, PlatformOnly, or Both"
      ],
      [
            "New Module CTA Button",
            "Click Button",
            "Opens Wizard",
            "Launches 4-step wizard to scaffold backend and frontend architecture"
      ],
      [
            "Layer Badges (5-Pill Stack)",
            "Hover Tooltip",
            "Verified",
            "Inspects existence of Domain, Application, Infra, WebAPI, and Frontend"
      ],
      [
            "Open in Schema Canvas",
            "Click Button",
            "Canvas View",
            "Loads all module entities directly onto the React Flow diagram stage"
      ],
      [
            "Unwire Module Action",
            "Click 'Delete Module'",
            "Confirmation Modal",
            "Safely unbinds module from .slnx, API, and DI with full rollback guard"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.modules.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.modules.title",
            "contentKey": "devTools.studio.modules.description",
            "code": "scripe new-module Invoicing --workspace billing",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Scaffold Invoicing Domain"
      },
      {
            "titleKey": "devTools.studio.modules.title",
            "contentKey": "devTools.studio.modules.description",
            "code": "scripe new-feature Invoicing Invoice -p \"Title:string:required,Amount:decimal\"",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Add Root Entity CRUD"
      },
      {
            "titleKey": "devTools.studio.modules.title",
            "contentKey": "devTools.studio.modules.description",
            "code": "scripe db add-migration InitialInvoicing -m Invoicing",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Generate Multi-DB Migrations"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/MODULESSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.MODULES.Domain.Entities;

public class SampleModulesEntity : AuditableEntity
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
    titleKey: "devTools.studio.modules.title",
    contentKey: "devTools.studio.modules.description",
  },
];

registerPage({
  slug: "dev-tools/studio/modules",
  titleKey: "devTools.studio.modules.title",
  descriptionKey: "devTools.studio.modules.description",
  category: "dev-tools",
  order: 3,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
