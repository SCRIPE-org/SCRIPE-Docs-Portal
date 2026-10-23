// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.secAudit.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "source",
            "labelKey": "devTools.cli.secAudit.nodeSource",
            "type": "primary"
      },
      {
            "id": "ast",
            "labelKey": "devTools.cli.secAudit.nodeAst",
            "type": "warning"
      },
      {
            "id": "trivy",
            "labelKey": "devTools.cli.secAudit.nodeTrivy",
            "type": "info"
      },
      {
            "id": "gate",
            "labelKey": "devTools.cli.secAudit.nodeGate",
            "type": "success"
      }
],
    connections: [
      {
            "from": "source",
            "to": "ast",
            "labelKey": "devTools.cli.secAudit.edgeScan"
      },
      {
            "from": "ast",
            "to": "trivy",
            "labelKey": "devTools.cli.secAudit.edgeDepScan"
      },
      {
            "from": "trivy",
            "to": "gate",
            "labelKey": "devTools.cli.secAudit.edgeValidate"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.secAudit.termTitle",
    tabs: [
      {
            "tabId": "audit",
            "label": "Security Scan",
            "command": "scripe audit --strict",
            "outputKey": "devTools.cli.secAudit.termOutputAudit"
      },
      {
            "tabId": "secrets",
            "label": "Generate Keys",
            "command": "scripe secrets generate --length 64",
            "outputKey": "devTools.cli.secAudit.termOutputSecrets"
      },
      {
            "tabId": "scan",
            "label": "Secret Scan",
            "command": "scripe secret-scan --deep",
            "outputKey": "devTools.cli.secAudit.termOutputScan"
      },
      {
            "tabId": "perm",
            "label": "Permissions Map",
            "command": "scripe permissions audit --unused",
            "outputKey": "devTools.cli.secAudit.termOutputPerm"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.secAudit.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.secAudit.cmdSecretsGen",
    id: "secrets-generate",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.secAudit.cmdSecretsGenDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe secrets generate [--length <n>] [--format hex|base64] [--env-file <path>]\n\n# Real-world usage:\n$ scripe secrets generate --length 32 --format base64`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--length <n>",
            "integer",
            "32",
            "Entropy bit-length for cryptographically secure random bytes"
      ],
      [
            "--format <fmt>",
            "hex | base64",
            "hex",
            "Output encoding format for generated secret tokens"
      ],
      [
            "--env-file <path>",
            "string (filepath)",
            "-",
            "Automatically inject generated keys into specified .env file"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.secAudit.cmdAudit",
    id: "audit",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.secAudit.cmdAuditDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe audit [frontend|backend] [--fix] [--json] [--strict]\n\n# Real-world usage:\n$ scripe audit --strict`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[target]",
            "frontend | backend | all",
            "all",
            "Subsystem targeted for CVE vulnerability audit"
      ],
      [
            "--fix",
            "boolean",
            "false",
            "Automatically update dependencies to non-vulnerable semantic versions"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Output vulnerabilities and CVSS scores as structured JSON"
      ],
      [
            "--strict",
            "boolean",
            "false",
            "Fail immediately with exit code 1 on any Moderate or higher vulnerability"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.secAudit.cmdSecretScan",
    id: "secret-scan",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.secAudit.cmdSecretScanDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe secret-scan [--staged] [--deep] [--rules <path>]\n\n# Real-world usage:\n$ scripe secret-scan --staged`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--staged",
            "boolean",
            "false",
            "Scan only git staged files before allowing commit execution"
      ],
      [
            "--deep",
            "boolean",
            "false",
            "Scan entire git commit history for inadvertently committed tokens"
      ],
      [
            "--rules <path>",
            "string (filepath)",
            "-",
            "Custom regex and entropy detection rule manifest"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.secAudit.cmdLicense",
    id: "license-check",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.secAudit.cmdLicenseDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe license check [--allow <licenses>] [--json]\n\n# Real-world usage:\n$ scripe license check --allow MIT,Apache-2.0,BSD-3-Clause`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--allow <licenses>",
            "comma-separated",
            "MIT,Apache-2.0,BSD-3-Clause",
            "Permitted open source license whitelist"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Export complete software bill of materials (SBOM) license table"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.secAudit.cmdCors",
    id: "cors-check",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.secAudit.cmdCorsDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe cors check [--env <env>]\n\n# Real-world usage:\n$ scripe cors check --env production`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--env <env>",
            "string",
            "production",
            "Target environment configuration to verify against wildcard origin rules"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.secAudit.cmdPermAudit",
    id: "permissions-audit",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.secAudit.cmdPermAuditDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe permissions audit [--unused] [--orphans]\n\n# Real-world usage:\n$ scripe permissions audit --unused`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--unused",
            "boolean",
            "false",
            "Detect PBAC permissions registered in code but unreferenced in controllers"
      ],
      [
            "--orphans",
            "boolean",
            "false",
            "Identify permissions in database missing from frontend route guards"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.secAudit.title",
    contentKey: "devTools.cli.secAudit.description",
  },
];

registerPage({
  slug: "dev-tools/cli/security-audit",
  titleKey: "devTools.cli.secAudit.title",
  descriptionKey: "devTools.cli.secAudit.description",
  category: "dev-tools",
  order: 14,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
