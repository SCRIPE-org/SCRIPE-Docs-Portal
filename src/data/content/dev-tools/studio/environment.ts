// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.environment.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.environment.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.environment.termOutputMask",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.environment.termOutputMatrix",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.environment.nodeEnv", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.environment.nodeAppSettings", type: "info" },
      { id: "node3", labelKey: "devTools.studio.environment.nodeVault", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.environment.nodeSchema", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.environment.edgeValidate" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.environment.edgeMerge" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.environment.edgeDecrypt" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.environment.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Profile Switcher Tabs",
            "Click Dev / Stage / Prod",
            "Development",
            "Switches active environment view between development, staging, and production"
      ],
      [
            "Key-Value Grid",
            "Edit In-Place",
            "Editable Rows",
            "Displays environment variables and appsettings.json hierarchically"
      ],
      [
            "Secret Masking Toggle",
            "Click Eye Icon",
            "Masked (••••••••)",
            "Reveals secret with security audit log entry and clipboard copy action"
      ],
      [
            "256-Bit Secret Generator",
            "Click 'Generate Secret'",
            "Crypto Ready",
            "Generates high-entropy cryptographic keys for JWT signatures and AES encryption"
      ],
      [
            "Schema Validator Badge",
            "Automated",
            "Valid (Green)",
            "Validates required configuration keys against JSON schema definitions"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.environment.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.environment.title",
            "contentKey": "devTools.studio.environment.description",
            "code": "scripe env init",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Scaffold Local Environment"
      },
      {
            "titleKey": "devTools.studio.environment.title",
            "contentKey": "devTools.studio.environment.description",
            "code": "scripe secrets generate",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Generate Cryptographic Keys"
      },
      {
            "titleKey": "devTools.studio.environment.title",
            "contentKey": "devTools.studio.environment.description",
            "code": "scripe env validate",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Enforce Config Schema"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/ENVIRONMENTSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.ENVIRONMENT.Domain.Entities;

public class SampleEnvironmentEntity : AuditableEntity
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
    titleKey: "devTools.studio.environment.title",
    contentKey: "devTools.studio.environment.description",
  },
];

registerPage({
  slug: "dev-tools/studio/environment",
  titleKey: "devTools.studio.environment.title",
  descriptionKey: "devTools.studio.environment.description",
  category: "dev-tools",
  order: 11,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
