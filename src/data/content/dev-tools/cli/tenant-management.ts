// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.tenantMgmt.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "req",
            "labelKey": "devTools.cli.tenantMgmt.nodeReq",
            "type": "primary"
      },
      {
            "id": "gate",
            "labelKey": "devTools.cli.tenantMgmt.nodeGate",
            "type": "warning"
      },
      {
            "id": "filter",
            "labelKey": "devTools.cli.tenantMgmt.nodeFilter",
            "type": "info"
      },
      {
            "id": "db",
            "labelKey": "devTools.cli.tenantMgmt.nodeDb",
            "type": "success"
      }
],
    connections: [
      {
            "from": "req",
            "to": "gate",
            "labelKey": "devTools.cli.tenantMgmt.edgeResolve"
      },
      {
            "from": "gate",
            "to": "filter",
            "labelKey": "devTools.cli.tenantMgmt.edgeScope"
      },
      {
            "from": "filter",
            "to": "db",
            "labelKey": "devTools.cli.tenantMgmt.edgeIsolate"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.tenantMgmt.termTitle",
    tabs: [
      {
            "tabId": "list",
            "label": "List Tenants",
            "command": "scripe tenant list --active",
            "outputKey": "devTools.cli.tenantMgmt.termOutputList"
      },
      {
            "tabId": "verify",
            "label": "Verify Isolation",
            "command": "scripe tenant verify --all --leak-check",
            "outputKey": "devTools.cli.tenantMgmt.termOutputVerify"
      },
      {
            "tabId": "clone",
            "label": "Clone Tenant",
            "command": "scripe tenant clone 8a1e-4bf2 --target staging-demo",
            "outputKey": "devTools.cli.tenantMgmt.termOutputClone"
      },
      {
            "tabId": "export",
            "label": "GDPR DSR Export",
            "command": "scripe tenant export 8a1e-4bf2 --format zip",
            "outputKey": "devTools.cli.tenantMgmt.termOutputExport"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.tenantMgmt.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.tenantMgmt.cmdTenantList",
    id: "tenant-list",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.tenantMgmt.cmdTenantListDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe tenant list [--active] [--status <status>] [--json]\n\n# Real-world usage:\n$ scripe tenant list --active`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--active",
            "boolean",
            "false",
            "Filter output to currently active, non-suspended tenant accounts"
      ],
      [
            "--status <status>",
            "string",
            "all",
            "Filter by tenant subscription lifecycle: trial, active, grace, suspended"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Format tenant metadata and resource allocation stats as JSON"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.tenantMgmt.cmdTenantVerify",
    id: "tenant-verify",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.tenantMgmt.cmdTenantVerifyDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe tenant verify [id] [--all] [--leak-check] [--strict]\n\n# Real-world usage:\n$ scripe tenant verify --all --leak-check`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[id]",
            "guid",
            "-",
            "Specific tenant ID to verify against cross-tenant isolation predicates"
      ],
      [
            "--all",
            "boolean",
            "false",
            "Execute cross-tenant leakage matrix check across all tenant databases"
      ],
      [
            "--leak-check",
            "boolean",
            "true",
            "Inject foreign keys and verify that DbContext query filters block access"
      ],
      [
            "--strict",
            "boolean",
            "false",
            "Halt build pipeline if any entity query misses HasQueryFilter(TenantId)"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.tenantMgmt.cmdTenantClone",
    id: "tenant-clone",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.tenantMgmt.cmdTenantCloneDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe tenant clone <sourceId> --target <newIdentifier> [--anonymize]\n\n# Real-world usage:\n$ scripe tenant clone 8a1e-4bf2 --target staging-demo --anonymize`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<sourceId>",
            "guid (required)",
            "-",
            "Source tenant identifier to clone data from"
      ],
      [
            "--target <name>",
            "string (required)",
            "-",
            "Identifier name for newly created destination tenant workspace"
      ],
      [
            "--anonymize",
            "boolean",
            "false",
            "Scramble PII data (names, emails, phone numbers) during copy pass"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.tenantMgmt.cmdTenantExport",
    id: "tenant-export",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.tenantMgmt.cmdTenantExportDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe tenant export <id> [--format json|zip] [--out <path>]\n\n# Real-world usage:\n$ scripe tenant export 8a1e-4bf2 --format zip --out ./dsr-exports`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<id>",
            "guid (required)",
            "-",
            "Tenant ID to package for GDPR/CCPA data portability compliance"
      ],
      [
            "--format <fmt>",
            "json | zip",
            "zip",
            "Package format: raw JSON stream or compressed archive"
      ],
      [
            "--out <path>",
            "string (filepath)",
            "./exports",
            "Destination folder for exported data archives"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.tenantMgmt.title",
    contentKey: "devTools.cli.tenantMgmt.description",
  },
];

registerPage({
  slug: "dev-tools/cli/tenant-management",
  titleKey: "devTools.cli.tenantMgmt.title",
  descriptionKey: "devTools.cli.tenantMgmt.description",
  category: "dev-tools",
  order: 15,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
