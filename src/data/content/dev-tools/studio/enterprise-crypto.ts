// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.enterpriseCrypto.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.enterpriseCrypto.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.enterpriseCrypto.termOutputKeystore",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.enterpriseCrypto.termOutputRotate",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.enterpriseCrypto.nodeMaster", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.enterpriseCrypto.nodeKek", type: "info" },
      { id: "node3", labelKey: "devTools.studio.enterpriseCrypto.nodeDek", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.enterpriseCrypto.nodeFields", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.enterpriseCrypto.edgeWrapKek" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.enterpriseCrypto.edgeWrapDek" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.enterpriseCrypto.edgeEncrypt" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.enterpriseCrypto.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Keyring Table",
            "Inspect Rows",
            "Active / Retiring",
            "Lists Key Encryption Keys (KEK) with creation date, status, and algorithm"
      ],
      [
            "Encrypted Fields Catalog",
            "Inspect Table",
            "12 Fields",
            "Identifies all entity columns protected by [EncryptedField] attribute"
      ],
      [
            "Rotate Keyring CTA",
            "Click Button",
            "Safety Modal",
            "Generates new active KEK and moves current key to retiring state with zero downtime"
      ],
      [
            "Background Re-encryption Progress",
            "Live Progress Bar",
            "100% Rewrapped",
            "Tracks asynchronous background worker re-encrypting ciphertext with new key"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.enterpriseCrypto.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.enterpriseCrypto.title",
            "contentKey": "devTools.studio.enterpriseCrypto.description",
            "code": "scripe crypto rotate-key",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Rotate Key Encryption Key"
      },
      {
            "titleKey": "devTools.studio.enterpriseCrypto.title",
            "contentKey": "devTools.studio.enterpriseCrypto.description",
            "code": "scripe crypto re-encrypt --all",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Rewrap Field Ciphertexts"
      },
      {
            "titleKey": "devTools.studio.enterpriseCrypto.title",
            "contentKey": "devTools.studio.enterpriseCrypto.description",
            "code": "scripe crypto audit-keys",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Verify Keyring Integrity"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/ENTERPRISECRYPTOSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.ENTERPRISECRYPTO.Domain.Entities;

public class SampleEnterpriseCryptoEntity : AuditableEntity
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
    titleKey: "devTools.studio.enterpriseCrypto.title",
    contentKey: "devTools.studio.enterpriseCrypto.description",
  },
];

registerPage({
  slug: "dev-tools/studio/enterprise-crypto",
  titleKey: "devTools.studio.enterpriseCrypto.title",
  descriptionKey: "devTools.studio.enterpriseCrypto.description",
  category: "dev-tools",
  order: 16,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
