// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.cryptoEnvelope.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "kek",
            "labelKey": "devTools.cli.cryptoEnvelope.nodeKek",
            "type": "danger"
      },
      {
            "id": "dek",
            "labelKey": "devTools.cli.cryptoEnvelope.nodeDek",
            "type": "warning"
      },
      {
            "id": "data",
            "labelKey": "devTools.cli.cryptoEnvelope.nodeData",
            "type": "info"
      },
      {
            "id": "cipher",
            "labelKey": "devTools.cli.cryptoEnvelope.nodeCipher",
            "type": "success"
      }
],
    connections: [
      {
            "from": "kek",
            "to": "dek",
            "labelKey": "devTools.cli.cryptoEnvelope.edgeWrap"
      },
      {
            "from": "dek",
            "to": "data",
            "labelKey": "devTools.cli.cryptoEnvelope.edgeEncrypt"
      },
      {
            "from": "data",
            "to": "cipher",
            "labelKey": "devTools.cli.cryptoEnvelope.edgePersist"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.cryptoEnvelope.termTitle",
    tabs: [
      {
            "tabId": "status",
            "label": "Key Hierarchy",
            "command": "scripe crypto status",
            "outputKey": "devTools.cli.cryptoEnvelope.termOutputStatus"
      },
      {
            "tabId": "rotate",
            "label": "Rotate KEK",
            "command": "scripe crypto rotate --kek --dry-run",
            "outputKey": "devTools.cli.cryptoEnvelope.termOutputRotate"
      },
      {
            "tabId": "rewrap",
            "label": "Rewrap DEKs",
            "command": "scripe crypto rewrap --all-tenants --batch 500",
            "outputKey": "devTools.cli.cryptoEnvelope.termOutputRewrap"
      },
      {
            "tabId": "verify",
            "label": "Integrity Audit",
            "command": "scripe crypto verify --tamper-check",
            "outputKey": "devTools.cli.cryptoEnvelope.termOutputVerify"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.cryptoEnvelope.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cryptoEnvelope.cmdCryptoStatus",
    id: "crypto-status",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cryptoEnvelope.cmdCryptoStatusDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe crypto status [--tenant <id>] [--json]\n\n# Real-world usage:\n$ scripe crypto status`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--tenant <id>",
            "guid",
            "-",
            "Inspect encryption keys associated with a specific tenant boundary"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Print key versions, creation timestamps, and rotation horizons as JSON"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cryptoEnvelope.cmdCryptoRotate",
    id: "crypto-rotate",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cryptoEnvelope.cmdCryptoRotateDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe crypto rotate [--kek] [--dek] [--tenant <id>] [--dry-run]\n\n# Real-world usage:\n$ scripe crypto rotate --kek`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--kek",
            "boolean",
            "false",
            "Rotate Master Key Encryption Key (KEK) and archive preceding version"
      ],
      [
            "--dek",
            "boolean",
            "false",
            "Generate fresh Data Encryption Keys (DEK) for active tenant scopes"
      ],
      [
            "--tenant <id>",
            "guid",
            "-",
            "Scope rotation to a specific tenant workspace"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Simulate key rotation without altering keystore records"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cryptoEnvelope.cmdCryptoRewrap",
    id: "crypto-rewrap",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cryptoEnvelope.cmdCryptoRewrapDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe crypto rewrap [--all-tenants] [--batch <size>] [--concurrency <n>]\n\n# Real-world usage:\n$ scripe crypto rewrap --all-tenants --batch 500`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--all-tenants",
            "boolean",
            "true",
            "Rewrap DEKs across all active tenant databases"
      ],
      [
            "--batch <size>",
            "integer",
            "250",
            "Transaction chunk size for rewrapping ciphertext entries"
      ],
      [
            "--concurrency <n>",
            "integer",
            "4",
            "Parallel worker thread count for high-volume keystores"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cryptoEnvelope.cmdCryptoVerify",
    id: "crypto-verify",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cryptoEnvelope.cmdCryptoVerifyDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe crypto verify [--tamper-check] [--tenant <id>]\n\n# Real-world usage:\n$ scripe crypto verify --tamper-check`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--tamper-check",
            "boolean",
            "true",
            "Validate HMAC signatures and cryptographic integrity of stored envelopes"
      ],
      [
            "--tenant <id>",
            "guid",
            "-",
            "Scope cryptographic audit to single tenant record store"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cryptoEnvelope.cmdCryptoRevoke",
    id: "crypto-revoke",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cryptoEnvelope.cmdCryptoRevokeDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe crypto revoke <keyId> --reason <reason> [--confirm]\n\n# Real-world usage:\n$ scripe crypto revoke key-7f91a --reason "Key compromised" --confirm`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<keyId>",
            "string (required)",
            "-",
            "Cryptographic key identifier targeted for permanent de-activation"
      ],
      [
            "--reason <reason>",
            "string (required)",
            "-",
            "Audit justification record logged into platform audit ledger"
      ],
      [
            "--confirm",
            "boolean",
            "false",
            "Bypass interactive terminal confirmation safeguards"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cryptoEnvelope.cmdCryptoAll",
    id: "crypto-all",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cryptoEnvelope.cmdCryptoAllDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe crypto all [--report-file <path>]\n\n# Real-world usage:\n$ scripe crypto all --report-file ./audit/crypto-report.json`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--report-file <path>",
            "string (filepath)",
            "-",
            "Export full cryptographic posture assessment to file"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.cryptoEnvelope.title",
    contentKey: "devTools.cli.cryptoEnvelope.description",
  },
];

registerPage({
  slug: "dev-tools/cli/crypto-envelope",
  titleKey: "devTools.cli.cryptoEnvelope.title",
  descriptionKey: "devTools.cli.cryptoEnvelope.description",
  category: "dev-tools",
  order: 13,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
