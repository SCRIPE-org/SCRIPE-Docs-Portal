// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeApp.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "ctrl",
            "labelKey": "devTools.cli.codeApp.nodeCtrl",
            "type": "primary"
      },
      {
            "id": "handler",
            "labelKey": "devTools.cli.codeApp.nodeHandler",
            "type": "info"
      },
      {
            "id": "repo",
            "labelKey": "devTools.cli.codeApp.nodeRepo",
            "type": "warning"
      },
      {
            "id": "db",
            "labelKey": "devTools.cli.codeApp.nodeDb",
            "type": "success"
      }
],
    connections: [
      {
            "from": "ctrl",
            "to": "handler",
            "labelKey": "devTools.cli.codeApp.edgeSend"
      },
      {
            "from": "handler",
            "to": "repo",
            "labelKey": "devTools.cli.codeApp.edgeQuery"
      },
      {
            "from": "repo",
            "to": "db",
            "labelKey": "devTools.cli.codeApp.edgePersist"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.codeApp.termTitle",
    tabs: [
      {
            "tabId": "dto",
            "label": "Request/Response DTO",
            "command": "scripe new-dto Billing Invoice -p \"Title:string,Total:decimal,Status:string\"",
            "outputKey": "devTools.cli.codeApp.termOutputDto"
      },
      {
            "tabId": "repo",
            "label": "Repository Slice",
            "command": "scripe new-repository Billing Invoice",
            "outputKey": "devTools.cli.codeApp.termOutputRepo"
      },
      {
            "tabId": "ctrl",
            "label": "API Controller",
            "command": "scripe new-controller Billing Invoice",
            "outputKey": "devTools.cli.codeApp.termOutputCtrl"
      },
      {
            "tabId": "job",
            "label": "Background Worker",
            "command": "scripe new-job Billing InvoiceCleanup -s \"0 2 * * *\"",
            "outputKey": "devTools.cli.codeApp.termOutputJob"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.codeApp.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeApp.cmdNewDto",
    id: "new-dto",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeApp.cmdNewDtoDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-dto <module> <entity> -p "<properties>" [--dry-run]\n\n# Real-world usage:\n$ scripe new-dto Billing Invoice -p "Title:string,Amount:decimal,DueDate:datetime"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<entity>",
            "string (required)",
            "-",
            "Entity name"
      ],
      [
            "-p, --properties <props>",
            "string (DSL)",
            "-",
            "Comma-separated Name:Type pairs"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview DTO files"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeApp.cmdNewMapper",
    id: "new-mapper",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeApp.cmdNewMapperDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-mapper <module> <entity> [--dry-run]\n\n# Real-world usage:\n$ scripe new-mapper Billing Invoice`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<entity>",
            "string (required)",
            "-",
            "Entity to map between DTO and Domain Entity"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview mapping rules"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeApp.cmdNewRepo",
    id: "new-repository",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeApp.cmdNewRepoDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-repository <module> <entity> [--dry-run]\n\n# Real-world usage:\n$ scripe new-repository Billing Invoice`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<entity>",
            "string (required)",
            "-",
            "Entity name for repository interface and EF implementation"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview repository files"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeApp.cmdNewService",
    id: "new-service",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeApp.cmdNewServiceDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-service <module> <name> [--dry-run]\n\n# Real-world usage:\n$ scripe new-service Billing TaxCalculatorService`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<name>",
            "string (required)",
            "-",
            "Application service class name"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview service implementation"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeApp.cmdNewCtrl",
    id: "new-controller",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeApp.cmdNewCtrlDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-controller <module> <entity> [--dry-run]\n\n# Real-world usage:\n$ scripe new-controller Billing Invoice`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<entity>",
            "string (required)",
            "-",
            "Entity name for RESTful CRUD controller"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview controller code"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeApp.cmdNewJob",
    id: "new-job",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeApp.cmdNewJobDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-job <module> <name> -s "<cron>" [--dry-run]\n\n# Real-world usage:\n$ scripe new-job Billing InactiveInvoicePruner -s "0 3 * * *"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<name>",
            "string (required)",
            "-",
            "Job name implementing IAutoRegisteredJob"
      ],
      [
            "-s, --schedule <cron>",
            "string (cron)",
            "0 3 * * *",
            "Standard 5-part cron expression for execution timing"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview job class and DI registration"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeApp.cmdNewSeeder",
    id: "new-seeder",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeApp.cmdNewSeederDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-seeder <module> <name> [--dry-run]\n\n# Real-world usage:\n$ scripe new-seeder Billing DefaultTaxRatesSeeder`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<name>",
            "string (required)",
            "-",
            "Database seeder class name implementing ICustomSeeder"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview seeder class"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeApp.cmdNewMiddleware",
    id: "new-middleware",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeApp.cmdNewMiddlewareDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-middleware <name> [--wire] [--stage <stage>] [--dry-run]\n\n# Real-world usage:\n$ scripe new-middleware RateLimitEnforcer --wire --stage security`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<name>",
            "string (required)",
            "-",
            "Middleware class name (e.g., RateLimitEnforcer)"
      ],
      [
            "--wire",
            "boolean",
            "false",
            "Automatically inject middleware into ASP.NET Core MiddlewarePipeline.cs"
      ],
      [
            "--stage <stage>",
            "early | security | tenant | ratelimiting | routing",
            "routing",
            "Pipeline execution order stage"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview middleware and pipeline modifications"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.codeApp.title",
    contentKey: "devTools.cli.codeApp.description",
  },
];

registerPage({
  slug: "dev-tools/cli/codegen-application",
  titleKey: "devTools.cli.codeApp.title",
  descriptionKey: "devTools.cli.codeApp.description",
  category: "dev-tools",
  order: 4,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
