// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbOps.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "mutation",
            "labelKey": "devTools.cli.dbOps.nodeMutation",
            "type": "primary"
      },
      {
            "id": "outbox",
            "labelKey": "devTools.cli.dbOps.nodeOutbox",
            "type": "warning"
      },
      {
            "id": "dispatcher",
            "labelKey": "devTools.cli.dbOps.nodeDispatcher",
            "type": "info"
      },
      {
            "id": "bus",
            "labelKey": "devTools.cli.dbOps.nodeBus",
            "type": "success"
      }
],
    connections: [
      {
            "from": "mutation",
            "to": "outbox",
            "labelKey": "devTools.cli.dbOps.edgeAtomic"
      },
      {
            "from": "outbox",
            "to": "dispatcher",
            "labelKey": "devTools.cli.dbOps.edgePoll"
      },
      {
            "from": "dispatcher",
            "to": "bus",
            "labelKey": "devTools.cli.dbOps.edgePublish"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.dbOps.termTitle",
    tabs: [
      {
            "tabId": "seed",
            "label": "Database Seeding",
            "command": "scripe db seed --dev -m Billing",
            "outputKey": "devTools.cli.dbOps.termOutputSeed"
      },
      {
            "tabId": "backup",
            "label": "Encrypted Backup",
            "command": "scripe db backup --all -e staging",
            "outputKey": "devTools.cli.dbOps.termOutputBackup"
      },
      {
            "tabId": "restore",
            "label": "Point-in-Time Restore",
            "command": "scripe db restore ./backups/billing.dump -e staging",
            "outputKey": "devTools.cli.dbOps.termOutputRestore"
      },
      {
            "tabId": "outbox",
            "label": "Outbox Dispatcher",
            "command": "scripe outbox flush",
            "outputKey": "devTools.cli.dbOps.termOutputOutbox"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.dbOps.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbOps.cmdSeed",
    id: "db-seed-&-reseed",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbOps.cmdSeedDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe db seed [options] / $ scripe db reseed [options]\n\n# Real-world usage:\n$ scripe db seed --dev -m Billing`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "-m, --module <name>",
            "string",
            "-",
            "Execute seeders for a specific module only"
      ],
      [
            "--dev",
            "boolean",
            "false",
            "Include DevSeeder fixtures (test accounts, sample invoices)"
      ],
      [
            "--reset",
            "boolean",
            "false",
            "Truncate module tables prior to executing seeders"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview seeders that would run without inserting rows"
      ],
      [
            "-e, --env <environment>",
            "production | development | local",
            "local",
            "Target environment"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbOps.cmdBackup",
    id: "db-backup-&-restore",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbOps.cmdBackupDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe db backup [options] / $ scripe db restore <file> [options]\n\n# Real-world usage:\n$ scripe db backup --all -e staging`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--all",
            "boolean",
            "false",
            "Backup all database schemas in active cluster"
      ],
      [
            "-m, --module <name>",
            "string",
            "-",
            "Backup single module schema"
      ],
      [
            "-e, --env <env>",
            "string",
            "local",
            "Environment configuration to connect to"
      ],
      [
            "<file>",
            "string (filepath)",
            "-",
            "Backup archive file path for restore operation"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbOps.cmdManageBackups",
    id: "db-list-backups-&-prune-backups",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbOps.cmdManageBackupsDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe db list-backups / $ scripe db prune-backups [--keep <n>]\n\n# Real-world usage:\n$ scripe db prune-backups --keep 5`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--keep <n>",
            "integer",
            "10",
            "Number of most recent backup archives to retain"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbOps.cmdAudit",
    id: "db-compare,-snapshot-&-history",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbOps.cmdAuditDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe db compare | snapshot | history\n\n# Real-world usage:\n$ scripe db compare -m Billing`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "-m, --module <name>",
            "string",
            "-",
            "Specific module target for comparison or snapshot"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dbOps.cmdOutbox",
    id: "outbox-status,-flush-&-prune",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dbOps.cmdOutboxDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe outbox status / flush / prune [--days <n>]\n\n# Real-world usage:\n$ scripe outbox prune --days 7`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "status",
            "subcommand",
            "-",
            "Inspect unprocessed outbox queue depth and failure counts"
      ],
      [
            "flush",
            "subcommand",
            "-",
            "Force immediate transactional outbox dispatching"
      ],
      [
            "prune --days <n>",
            "integer",
            "7",
            "Delete processed messages older than retention days"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.dbOps.title",
    contentKey: "devTools.cli.dbOps.description",
  },
];

registerPage({
  slug: "dev-tools/cli/db-operations",
  titleKey: "devTools.cli.dbOps.title",
  descriptionKey: "devTools.cli.dbOps.description",
  category: "dev-tools",
  order: 7,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
