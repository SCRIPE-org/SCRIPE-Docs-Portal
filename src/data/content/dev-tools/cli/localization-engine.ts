// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.locEngine.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "en",
            "labelKey": "devTools.cli.locEngine.nodeEn",
            "type": "primary"
      },
      {
            "id": "ast",
            "labelKey": "devTools.cli.locEngine.nodeAst",
            "type": "info"
      },
      {
            "id": "matrix",
            "labelKey": "devTools.cli.locEngine.nodeMatrix",
            "type": "warning"
      },
      {
            "id": "sync",
            "labelKey": "devTools.cli.locEngine.nodeSync",
            "type": "success"
      }
],
    connections: [
      {
            "from": "en",
            "to": "ast",
            "labelKey": "devTools.cli.locEngine.edgeExtract"
      },
      {
            "from": "ast",
            "to": "matrix",
            "labelKey": "devTools.cli.locEngine.edgeCompare"
      },
      {
            "from": "matrix",
            "to": "sync",
            "labelKey": "devTools.cli.locEngine.edgeBackfill"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.locEngine.termTitle",
    tabs: [
      {
            "tabId": "validate",
            "label": "Key Parity Gate",
            "command": "scripe validate-locales --strict",
            "outputKey": "devTools.cli.locEngine.termOutputValidate"
      },
      {
            "tabId": "sync",
            "label": "Sync Missing Keys",
            "command": "scripe locale sync ar -m Invoicing",
            "outputKey": "devTools.cli.locEngine.termOutputSync"
      },
      {
            "tabId": "stats",
            "label": "Language Coverage",
            "command": "scripe locale stats --json",
            "outputKey": "devTools.cli.locEngine.termOutputStats"
      },
      {
            "tabId": "fix",
            "label": "Fix Undefined Values",
            "command": "scripe locale fix-undefined --dry-run",
            "outputKey": "devTools.cli.locEngine.termOutputFix"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.locEngine.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.locEngine.cmdValidateLocales",
    id: "validate-locales",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.locEngine.cmdValidateLocalesDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe validate-locales [--strict] [--docs] [--fix]\n\n# Real-world usage:\n$ scripe validate-locales --strict`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--strict",
            "boolean",
            "false",
            "Fail verification gate if any language has missing keys or empty strings"
      ],
      [
            "--docs",
            "boolean",
            "false",
            "Audit documentation portal translations across all 7 supported locales"
      ],
      [
            "--fix",
            "boolean",
            "false",
            "Automatically backfill missing keys from English baseline with TODO placeholder"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.locEngine.cmdLocaleAdd",
    id: "locale-add",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.locEngine.cmdLocaleAddDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe locale add <langCode> [-m <module>]\n\n# Real-world usage:\n$ scripe locale add ja -m Invoicing`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<langCode>",
            "string (ISO-639-1)",
            "-",
            "Two-letter language code to scaffold (e.g. ja, it, pt)"
      ],
      [
            "-m, --module <name>",
            "string",
            "all",
            "Target module to receive new locale dictionary structure"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.locEngine.cmdLocaleSync",
    id: "locale-sync",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.locEngine.cmdLocaleSyncDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe locale sync <langCode> [-m <module>] [--dry-run]\n\n# Real-world usage:\n$ scripe locale sync ar -m Invoicing`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<langCode>",
            "string (required)",
            "-",
            "Target language to synchronize with English baseline"
      ],
      [
            "-m, --module <name>",
            "string",
            "all",
            "Target module to synchronize"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview keys to add without modifying filesystem dictionary files"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.locEngine.cmdLocaleStats",
    id: "locale-stats",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.locEngine.cmdLocaleStatsDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe locale stats [--json]\n\n# Real-world usage:\n$ scripe locale stats`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--json",
            "boolean",
            "false",
            "Output completion percentages across all 7 official platform locales"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.locEngine.cmdLocaleFixUndef",
    id: "locale-fix-undefined",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.locEngine.cmdLocaleFixUndefDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe locale fix-undefined [--dry-run]\n\n# Real-world usage:\n$ scripe locale fix-undefined`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--dry-run",
            "boolean",
            "false",
            "Report undefined/null dictionary entries without modifying files"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.locEngine.cmdLocaleExport",
    id: "locale-export",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.locEngine.cmdLocaleExportDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe locale export [--format csv|xliff] [--out <dir>]\n\n# Real-world usage:\n$ scripe locale export --format xliff --out ./translations`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--format <fmt>",
            "csv | xliff",
            "xliff",
            "Export translation files for professional localization agencies"
      ],
      [
            "--out <dir>",
            "string (filepath)",
            "./i18n-exports",
            "Destination folder path for translation bundles"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.locEngine.title",
    contentKey: "devTools.cli.locEngine.description",
  },
];

registerPage({
  slug: "dev-tools/cli/localization-engine",
  titleKey: "devTools.cli.locEngine.title",
  descriptionKey: "devTools.cli.locEngine.description",
  category: "dev-tools",
  order: 17,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
