// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbMigrations.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "model",
            "labelKey": "devTools.cli.dbMigrations.nodeModel",
            "type": "primary"
      },
      {
            "id": "pg",
            "labelKey": "devTools.cli.dbMigrations.nodePg",
            "type": "info"
      },
      {
            "id": "sql",
            "labelKey": "devTools.cli.dbMigrations.nodeSql",
            "type": "warning"
      },
      {
            "id": "ora",
            "labelKey": "devTools.cli.dbMigrations.nodeOra",
            "type": "success"
      }
],
    connections: [
      {
            "from": "model",
            "to": "pg",
            "labelKey": "devTools.cli.dbMigrations.edgePg"
      },
      {
            "from": "model",
            "to": "sql",
            "labelKey": "devTools.cli.dbMigrations.edgeSql"
      },
      {
            "from": "model",
            "to": "ora",
            "labelKey": "devTools.cli.dbMigrations.edgeOra"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.dbMigrations.termTitle",
    tabs: [
      {
            "tabId": "add-mig",
            "label": "Add Tri-Provider Migration",
            "command": "scripe db add-migration AddInvoiceLineItems -m Billing",
            "outputKey": "devTools.cli.dbMigrations.termOutputAdd"
      },
      {
            "tabId": "upd-all",
            "label": "Update All Modules",
            "command": "scripe db update --all",
            "outputKey": "devTools.cli.dbMigrations.termOutputUpd"
      },
      {
            "tabId": "status",
            "label": "Migration Status",
            "command": "scripe db status --all",
            "outputKey": "devTools.cli.dbMigrations.termOutputStatus"
      },
      {
            "tabId": "diff",
            "label": "Schema Diff",
            "command": "scripe db diff -m Billing",
            "outputKey": "devTools.cli.dbMigrations.termOutputDiff"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.dbMigrations.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbMigrations.cmdAddMigration",
    id: "db-add-migration",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbMigrations.cmdAddMigrationDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe db add-migration <name> -m <module> [options]\n\n# Real-world usage:\n$ scripe db add-migration AddEncryptedTaxId -m Billing -p PostgreSql`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<name>",
            "string (required)",
            "-",
            "Migration name in PascalCase"
      ],
      [
            "-m, --module <module>",
            "string (required)",
            "-",
            "Target backend module name"
      ],
      [
            "-p, --provider <provider>",
            "SqlServer | Oracle | PostgreSql",
            "All",
            "Generate for a specific provider only (default: all 3 simultaneously)"
      ],
      [
            "-e, --env <environment>",
            "production | development | local",
            "local",
            "Target environment configuration"
      ],
      [
            "--no-build",
            "boolean",
            "false",
            "Use existing build outputs and skip EF Core's solution compilation"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbMigrations.cmdUpdate",
    id: "db-update",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbMigrations.cmdUpdateDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe db update [-m <module> | --all] [options]\n\n# Real-world usage:\n$ scripe db update --all --confirm`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "-m, --module <module>",
            "string",
            "-",
            "Target backend module name"
      ],
      [
            "--all",
            "boolean",
            "false",
            "Update all modules across active database provider"
      ],
      [
            "-p, --provider <provider>",
            "SqlServer | Oracle | PostgreSql",
            "Configured",
            "Specific database provider"
      ],
      [
            "-e, --env <environment>",
            "production | development | local",
            "local",
            "Target environment"
      ],
      [
            "--confirm",
            "boolean",
            "false",
            "Required when applying migrations to Production environment"
      ],
      [
            "--no-build",
            "boolean",
            "false",
            "Use existing build outputs to accelerate execution"
      ],
      [
            "--show-errors",
            "boolean",
            "false",
            "Display detailed diagnostic cards and stack traces on failure"
      ],
      [
            "-v, --verbose",
            "boolean",
            "false",
            "Enable verbose error logs and connection telemetry"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbMigrations.cmdRemoveMigration",
    id: "db-remove-migration",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbMigrations.cmdRemoveMigrationDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe db remove-migration -m <module> [options]\n\n# Real-world usage:\n$ scripe db remove-migration -m Billing -p PostgreSql --force`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "-m, --module <module>",
            "string (required)",
            "-",
            "Target backend module name"
      ],
      [
            "-p, --provider <provider>",
            "SqlServer | Oracle | PostgreSql",
            "-",
            "Specific provider to revert"
      ],
      [
            "-e, --env <environment>",
            "string",
            "local",
            "Target environment"
      ],
      [
            "--force",
            "boolean",
            "false",
            "Force removal and roll back an applied migration in database"
      ],
      [
            "--no-build",
            "boolean",
            "false",
            "Skip EF Core project compilation"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbMigrations.cmdStatus",
    id: "db-status",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbMigrations.cmdStatusDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe db status --all\n\n# Real-world usage:\n$ scripe db status --all`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--all",
            "boolean",
            "true",
            "Inspect applied vs pending migrations across all registered modules"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbMigrations.cmdDiff",
    id: "db-diff",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbMigrations.cmdDiffDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe db diff -m <module>\n\n# Real-world usage:\n$ scripe db diff -m Billing`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "-m, --module <module>",
            "string (required)",
            "-",
            "Target backend module name"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbMigrations.cmdReset",
    id: "db-reset",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbMigrations.cmdResetDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe db reset [-m <name> | --all] [--confirm]\n\n# Real-world usage:\n$ scripe db reset -m Billing --confirm`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "-m, --module <name>",
            "string",
            "-",
            "Single module to roll back and reapply"
      ],
      [
            "--all",
            "boolean",
            "false",
            "Reset all modules in database (destructive)"
      ],
      [
            "--confirm",
            "boolean",
            "false",
            "Bypass confirmation prompt"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview rollback sequence"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.dbMigrations.title",
    contentKey: "devTools.cli.dbMigrations.description",
  },
];

registerPage({
  slug: "dev-tools/cli/db-migrations",
  titleKey: "devTools.cli.dbMigrations.title",
  descriptionKey: "devTools.cli.dbMigrations.description",
  category: "dev-tools",
  order: 6,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
