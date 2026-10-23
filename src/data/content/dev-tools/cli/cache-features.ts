// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.cacheFeat.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "query",
            "labelKey": "devTools.cli.cacheFeat.nodeQuery",
            "type": "primary"
      },
      {
            "id": "l1",
            "labelKey": "devTools.cli.cacheFeat.nodeL1",
            "type": "success"
      },
      {
            "id": "redis",
            "labelKey": "devTools.cli.cacheFeat.nodeRedis",
            "type": "warning"
      },
      {
            "id": "db",
            "labelKey": "devTools.cli.cacheFeat.nodeDb",
            "type": "info"
      }
],
    connections: [
      {
            "from": "query",
            "to": "l1",
            "labelKey": "devTools.cli.cacheFeat.edgeCheckL1"
      },
      {
            "from": "l1",
            "to": "redis",
            "labelKey": "devTools.cli.cacheFeat.edgeCheckRedis"
      },
      {
            "from": "redis",
            "to": "db",
            "labelKey": "devTools.cli.cacheFeat.edgeMissDb"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.cacheFeat.termTitle",
    tabs: [
      {
            "tabId": "stats",
            "label": "Cache Metrics",
            "command": "scripe cache stats",
            "outputKey": "devTools.cli.cacheFeat.termOutputStats"
      },
      {
            "tabId": "flush",
            "label": "Flush Module Cache",
            "command": "scripe cache flush -m Billing --pattern 'invoices:*'",
            "outputKey": "devTools.cli.cacheFeat.termOutputFlush"
      },
      {
            "tabId": "webhook",
            "label": "Test Webhook",
            "command": "scripe webhook test Billing.InvoiceCreated --target http://localhost:8080/hook",
            "outputKey": "devTools.cli.cacheFeat.termOutputWebhook"
      },
      {
            "tabId": "toggle",
            "label": "Feature Toggle",
            "command": "scripe feature toggle Invoicing.AdvancedReports --enable",
            "outputKey": "devTools.cli.cacheFeat.termOutputToggle"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.cacheFeat.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cacheFeat.cmdCacheFlush",
    id: "cache-flush",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cacheFeat.cmdCacheFlushDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe cache flush [-m <module>] [--pattern <pattern>] [--all]\n\n# Real-world usage:\n$ scripe cache flush -m Billing --pattern 'invoices:*'`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "-m, --module <name>",
            "string",
            "all",
            "Target module namespace to invalidate"
      ],
      [
            "--pattern <pattern>",
            "string (glob)",
            "*",
            "Redis key pattern filter (e.g., 'tenant:*:rates')"
      ],
      [
            "--all",
            "boolean",
            "false",
            "Completely flush entire Redis database (requires confirmation)"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cacheFeat.cmdCacheStats",
    id: "cache-stats",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cacheFeat.cmdCacheStatsDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe cache stats [--json]\n\n# Real-world usage:\n$ scripe cache stats`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--json",
            "boolean",
            "false",
            "Output hit/miss ratios, key counts, and memory consumption as JSON"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cacheFeat.cmdWebhookTest",
    id: "webhook-test",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cacheFeat.cmdWebhookTestDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe webhook test <eventType> --target <url> [--secret <key>]\n\n# Real-world usage:\n$ scripe webhook test Billing.InvoiceCreated --target https://webhook.site/test`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<eventType>",
            "string (required)",
            "-",
            "Domain event type identifier to simulate (e.g., Billing.InvoiceCreated)"
      ],
      [
            "--target <url>",
            "string (URI, required)",
            "-",
            "HTTP endpoint destination to receive signed webhook payload"
      ],
      [
            "--secret <key>",
            "string",
            "auto",
            "Shared secret used to compute X-Signature-SHA256 HMAC header"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cacheFeat.cmdFeatToggle",
    id: "feature-toggle",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cacheFeat.cmdFeatToggleDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe feature toggle <featureName> [--enable|--disable] [--tenant <id>]\n\n# Real-world usage:\n$ scripe feature toggle Billing.MultiCurrency --enable`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<featureName>",
            "string (required)",
            "-",
            "Feature flag key declared in module specification"
      ],
      [
            "--enable",
            "boolean",
            "false",
            "Activate the feature flag globally or for designated tenant"
      ],
      [
            "--disable",
            "boolean",
            "false",
            "Deactivate the feature flag immediately"
      ],
      [
            "--tenant <id>",
            "guid",
            "-",
            "Scope feature toggle to an individual tenant workspace"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.cacheFeat.cmdFeatList",
    id: "feature-list",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.cacheFeat.cmdFeatListDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe feature list [--module <name>] [--json]\n\n# Real-world usage:\n$ scripe feature list`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--module <name>",
            "string",
            "all",
            "Filter feature flags by declaring module"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Format active/inactive feature matrix as JSON"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.cacheFeat.title",
    contentKey: "devTools.cli.cacheFeat.description",
  },
];

registerPage({
  slug: "dev-tools/cli/cache-features",
  titleKey: "devTools.cli.cacheFeat.title",
  descriptionKey: "devTools.cli.cacheFeat.description",
  category: "dev-tools",
  order: 16,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
