// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffBlueprint.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "bp",
            "labelKey": "devTools.cli.scaffBlueprint.nodeBp",
            "type": "primary"
      },
      {
            "id": "schema",
            "labelKey": "devTools.cli.scaffBlueprint.nodeSchema",
            "type": "warning"
      },
      {
            "id": "ast",
            "labelKey": "devTools.cli.scaffBlueprint.nodeAst",
            "type": "info"
      },
      {
            "id": "disk",
            "labelKey": "devTools.cli.scaffBlueprint.nodeDisk",
            "type": "success"
      }
],
    connections: [
      {
            "from": "bp",
            "to": "schema",
            "labelKey": "devTools.cli.scaffBlueprint.edgeValidate"
      },
      {
            "from": "schema",
            "to": "ast",
            "labelKey": "devTools.cli.scaffBlueprint.edgeCompile"
      },
      {
            "from": "ast",
            "to": "disk",
            "labelKey": "devTools.cli.scaffBlueprint.edgeEmit"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.scaffBlueprint.termTitle",
    tabs: [
      {
            "tabId": "bp-val",
            "label": "Validate Blueprint",
            "command": "scripe blueprint validate ./blueprints/billing.json",
            "outputKey": "devTools.cli.scaffBlueprint.termOutputVal"
      },
      {
            "tabId": "bp-init",
            "label": "Reverse Engineer",
            "command": "scripe blueprint init -m Logistics",
            "outputKey": "devTools.cli.scaffBlueprint.termOutputInit"
      },
      {
            "tabId": "rebrand",
            "label": "Monorepo Rebrand",
            "command": "scripe rebrand --name \"SCRIPE\" --confirm",
            "outputKey": "devTools.cli.scaffBlueprint.termOutputRebrand"
      },
      {
            "tabId": "verify-cg",
            "label": "Codegen Gate",
            "command": "scripe verify-codegen --quick",
            "outputKey": "devTools.cli.scaffBlueprint.termOutputVerify"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.scaffBlueprint.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffBlueprint.cmdValidate",
    id: "blueprint-validate",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffBlueprint.cmdValidateDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe blueprint validate [file] [--all]\n\n# Real-world usage:\n$ scripe blueprint validate .scripe/blueprints/venue.json`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[file]",
            "string (filepath)",
            "-",
            "Path to .scripe-blueprint.json file to validate"
      ],
      [
            "--all",
            "boolean",
            "false",
            "Scan and validate all blueprints inside .scripe/blueprints/"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffBlueprint.cmdInit",
    id: "blueprint-init",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffBlueprint.cmdInitDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe blueprint init -m <Module>\n\n# Real-world usage:\n$ scripe blueprint init -m Logistics`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "-m, --module <module>",
            "string (required)",
            "-",
            "Existing module to inspect and reverse-engineer into a blueprint manifest"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffBlueprint.cmdRebrand",
    id: "rebrand",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffBlueprint.cmdRebrandDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe rebrand -n <Name> [options]\n\n# Real-world usage:\n$ scripe rebrand -n "SCRIPE" --prefix "scripe" --domain "scripe.io" --confirm`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "-n, --name <name>",
            "string (required)",
            "-",
            "New enterprise brand name (e.g., SCRIPE)"
      ],
      [
            "--prefix <prefix>",
            "string",
            "lowercase name",
            "Cookie, local-storage, and Redis key prefix"
      ],
      [
            "--domain <domain>",
            "string",
            "<name>.com",
            "Default platform domain"
      ],
      [
            "--skip-rename",
            "boolean",
            "false",
            "Skip renaming physical directories and .sln files"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview replacement matches across all files"
      ],
      [
            "--confirm",
            "boolean",
            "false",
            "Execute irreversible in-place replacement without prompt"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffBlueprint.cmdVerify",
    id: "verify-codegen",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffBlueprint.cmdVerifyDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe verify-codegen [--quick]\n\n# Real-world usage:\n$ scripe verify-codegen --quick`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--quick",
            "boolean",
            "false",
            "Run in-memory AST validation and skip slow compilation passes"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.scaffBlueprint.title",
    contentKey: "devTools.cli.scaffBlueprint.description",
  },
];

registerPage({
  slug: "dev-tools/cli/scaffolding-blueprint",
  titleKey: "devTools.cli.scaffBlueprint.title",
  descriptionKey: "devTools.cli.scaffBlueprint.description",
  category: "dev-tools",
  order: 2,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/codegen-domain", "dev-tools/cli/codegen-application"],
  lastUpdated: "2026-03-03",
});
