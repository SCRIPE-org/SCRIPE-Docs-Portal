// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.envConfig.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "env",
            "labelKey": "devTools.cli.envConfig.nodeEnv",
            "type": "primary"
      },
      {
            "id": "appsettings",
            "labelKey": "devTools.cli.envConfig.nodeAppSettings",
            "type": "info"
      },
      {
            "id": "validator",
            "labelKey": "devTools.cli.envConfig.nodeValidator",
            "type": "warning"
      },
      {
            "id": "runtime",
            "labelKey": "devTools.cli.envConfig.nodeRuntime",
            "type": "success"
      }
],
    connections: [
      {
            "from": "env",
            "to": "appsettings",
            "labelKey": "devTools.cli.envConfig.edgeMerge"
      },
      {
            "from": "appsettings",
            "to": "validator",
            "labelKey": "devTools.cli.envConfig.edgeSchema"
      },
      {
            "from": "validator",
            "to": "runtime",
            "labelKey": "devTools.cli.envConfig.edgeInject"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.envConfig.termTitle",
    tabs: [
      {
            "tabId": "validate",
            "label": "Validate Configuration",
            "command": "scripe env validate --strict",
            "outputKey": "devTools.cli.envConfig.termOutputValidate"
      },
      {
            "tabId": "init",
            "label": "Scaffold .env",
            "command": "scripe env init --template docker-compose",
            "outputKey": "devTools.cli.envConfig.termOutputInit"
      },
      {
            "tabId": "show",
            "label": "Inspect Active Config",
            "command": "scripe config show --mask-secrets",
            "outputKey": "devTools.cli.envConfig.termOutputShow"
      },
      {
            "tabId": "set",
            "label": "Set Config Key",
            "command": "scripe config set Database:Mode Multi",
            "outputKey": "devTools.cli.envConfig.termOutputSet"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.envConfig.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.envConfig.cmdEnvInit",
    id: "env-init",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.envConfig.cmdEnvInitDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe env init [--template <name>] [--overwrite]\n\n# Real-world usage:\n$ scripe env init --template docker-compose`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--template <name>",
            "string",
            "development",
            "Template preset: development, docker-compose, staging, production"
      ],
      [
            "--overwrite",
            "boolean",
            "false",
            "Overwrite existing .env and .env.local files"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.envConfig.cmdEnvValidate",
    id: "env-validate",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.envConfig.cmdEnvValidateDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe env validate [--strict] [--file <path>]\n\n# Real-world usage:\n$ scripe env validate --strict`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--strict",
            "boolean",
            "false",
            "Verify that all required environment variables are set and non-empty"
      ],
      [
            "--file <path>",
            "string (filepath)",
            ".env",
            "Specific environment file to validate against configuration schema"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.envConfig.cmdEnvGen",
    id: "env-generate",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.envConfig.cmdEnvGenDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe env generate [--provider <provider>] [--out <path>]\n\n# Real-world usage:\n$ scripe env generate --provider PostgreSql`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--provider <provider>",
            "SqlServer | PostgreSql | Oracle",
            "PostgreSql",
            "Target database provider connection string template"
      ],
      [
            "--out <path>",
            "string (filepath)",
            ".env.generated",
            "Target output path for generated environment file"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.envConfig.cmdConfigShow",
    id: "config-show",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.envConfig.cmdConfigShowDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe config show [--mask-secrets] [--json]\n\n# Real-world usage:\n$ scripe config show --mask-secrets`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--mask-secrets",
            "boolean",
            "true",
            "Redact sensitive password, token, and JWT private keys in stdout display"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Display effective merged appsettings configuration as structured JSON"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.envConfig.cmdConfigGet",
    id: "config-get",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.envConfig.cmdConfigGetDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe config get <keyPath>\n\n# Real-world usage:\n$ scripe config get Database:Provider`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<keyPath>",
            "string (required)",
            "-",
            "Hierarchical configuration path (e.g., Database:Mode, Jwt:Issuer)"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.envConfig.cmdConfigSet",
    id: "config-set",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.envConfig.cmdConfigSetDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe config set <keyPath> <value>\n\n# Real-world usage:\n$ scripe config set Database:Mode Multi`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<keyPath>",
            "string (required)",
            "-",
            "Hierarchical key identifier to modify in appsettings.json"
      ],
      [
            "<value>",
            "string (required)",
            "-",
            "New configuration value to write"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.envConfig.cmdConfigReset",
    id: "config-reset",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.envConfig.cmdConfigResetDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe config reset [--confirm]\n\n# Real-world usage:\n$ scripe config reset --confirm`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--confirm",
            "boolean",
            "false",
            "Reset appsettings.json to pristine repo boilerplate default template"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.envConfig.title",
    contentKey: "devTools.cli.envConfig.description",
  },
];

registerPage({
  slug: "dev-tools/cli/environment-config",
  titleKey: "devTools.cli.envConfig.title",
  descriptionKey: "devTools.cli.envConfig.description",
  category: "dev-tools",
  order: 18,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
