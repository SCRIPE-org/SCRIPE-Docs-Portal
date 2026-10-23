// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.localization.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.localization.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.localization.termOutputMatrix",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.localization.termOutputEditor",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.localization.nodeLocales", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.localization.nodeEn", type: "info" },
      { id: "node3", labelKey: "devTools.studio.localization.nodeEditor", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.localization.nodeParity", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.localization.edgeSeed" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.localization.edgeSync" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.localization.edgeValidate" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.localization.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "7-Language Parity Matrix",
            "Inspect Grid",
            "100% Complete",
            "Tracks translation parity across EN, AR, DE, ES, FR, RU, and ZH"
      ],
      [
            "Untranslated / Missing Filter",
            "Click Filter",
            "0 Missing",
            "Isolates keys present in English but missing in target language catalogs"
      ],
      [
            "Sync Locales One-Click Button",
            "Click Button",
            "Automated",
            "Auto-scaffolds missing key templates across all 7 language files"
      ],
      [
            "RTL / LTR Live Preview Switcher",
            "Click Toggle",
            "LTR (English)",
            "Renders UI components in Right-to-Left Arabic mode to verify layout integrity"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.localization.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.localization.title",
            "contentKey": "devTools.studio.localization.description",
            "code": "scripe validate-locales",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Audit Translation Parity"
      },
      {
            "titleKey": "devTools.studio.localization.title",
            "contentKey": "devTools.studio.localization.description",
            "code": "scripe locale sync ar -m Billing",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Sync Module Translations"
      },
      {
            "titleKey": "devTools.studio.localization.title",
            "contentKey": "devTools.studio.localization.description",
            "code": "scripe locale add es -m Billing",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Scaffold New Language"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/LOCALIZATIONSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.LOCALIZATION.Domain.Entities;

public class SampleLocalizationEntity : AuditableEntity
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
    titleKey: "devTools.studio.localization.title",
    contentKey: "devTools.studio.localization.description",
  },
];

registerPage({
  slug: "dev-tools/studio/localization",
  titleKey: "devTools.studio.localization.title",
  descriptionKey: "devTools.studio.localization.description",
  category: "dev-tools",
  order: 15,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
