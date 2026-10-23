// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeUi.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "swagger",
            "labelKey": "devTools.cli.codeUi.nodeSwagger",
            "type": "primary"
      },
      {
            "id": "zod",
            "labelKey": "devTools.cli.codeUi.nodeZod",
            "type": "warning"
      },
      {
            "id": "hook",
            "labelKey": "devTools.cli.codeUi.nodeHook",
            "type": "info"
      },
      {
            "id": "view",
            "labelKey": "devTools.cli.codeUi.nodeView",
            "type": "success"
      }
],
    connections: [
      {
            "from": "swagger",
            "to": "zod",
            "labelKey": "devTools.cli.codeUi.edgeGenerate"
      },
      {
            "from": "zod",
            "to": "hook",
            "labelKey": "devTools.cli.codeUi.edgeValidate"
      },
      {
            "from": "hook",
            "to": "view",
            "labelKey": "devTools.cli.codeUi.edgeRender"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.codeUi.termTitle",
    tabs: [
      {
            "tabId": "hook",
            "label": "TanStack Query Hook",
            "command": "scripe new-hook Billing useInvoiceStats",
            "outputKey": "devTools.cli.codeUi.termOutputHook"
      },
      {
            "tabId": "comp",
            "label": "shadcn/ui Component",
            "command": "scripe new-component Billing InvoiceStatusBadge --type view",
            "outputKey": "devTools.cli.codeUi.termOutputComp"
      },
      {
            "tabId": "page",
            "label": "Next.js Route Page",
            "command": "scripe new-page invoices/manage --permission \"Billing.Invoices.Manage\"",
            "outputKey": "devTools.cli.codeUi.termOutputPage"
      },
      {
            "tabId": "sync",
            "label": "Swagger API Sync",
            "command": "scripe sync-api https://localhost:5035/swagger/v1/swagger.json -m Billing --check",
            "outputKey": "devTools.cli.codeUi.termOutputSync"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.codeUi.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeUi.cmdNewHook",
    id: "new-hook",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeUi.cmdNewHookDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-hook <module> <name> [--dry-run]\n\n# Real-world usage:\n$ scripe new-hook Billing useInvoices`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target sub-module directory"
      ],
      [
            "<name>",
            "string (required)",
            "-",
            "Hook function name (e.g., useInvoices)"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview hook file"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeUi.cmdNewComponent",
    id: "new-component",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeUi.cmdNewComponentDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-component <module> <name> [-t <type>] [--dry-run]\n\n# Real-world usage:\n$ scripe new-component Billing InvoiceTable -t view`,
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
            "React component name"
      ],
      [
            "-t, --type <type>",
            "ui | view | form | card | list | dialog",
            "ui",
            "Component archetype and style preset"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview component file"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeUi.cmdNewPage",
    id: "new-page",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeUi.cmdNewPageDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-page <route> [--permission <perm>] [--dry-run]\n\n# Real-world usage:\n$ scripe new-page billing/invoices/[id] --permission "Invoicing.View"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<route>",
            "string (required)",
            "-",
            "Next.js App Router path (e.g. billing/invoices/[id])"
      ],
      [
            "--permission <perm>",
            "string",
            "-",
            "PBAC permission constant to bind in PAGE_PERMISSIONS"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview page.tsx file"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeUi.cmdNewZod",
    id: "new-zod-schema",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeUi.cmdNewZodDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-zod-schema <module> <entity> -p "<properties>" [--dry-run]\n\n# Real-world usage:\n$ scripe new-zod-schema Billing Invoice -p "Title:string:required,Amount:decimal:min(0)"`,
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
            "Entity name for Zod schema"
      ],
      [
            "-p, --properties <props>",
            "string (DSL)",
            "-",
            "Property definitions DSL"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview Zod schema"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeUi.cmdNewZustand",
    id: "new-zustand-store",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeUi.cmdNewZustandDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-zustand-store <module> <name> [--dry-run]\n\n# Real-world usage:\n$ scripe new-zustand-store Billing InvoiceSelection`,
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
            "Store name (e.g., InvoiceSelection)"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview store file"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeUi.cmdNewStorybook",
    id: "new-storybook",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeUi.cmdNewStorybookDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-storybook <module> <component> [--dry-run]\n\n# Real-world usage:\n$ scripe new-storybook Billing InvoiceCard`,
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
            "<component>",
            "string (required)",
            "-",
            "Target component name"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview CSF3 story file"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeUi.cmdNewE2e",
    id: "new-e2e-spec",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeUi.cmdNewE2eDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-e2e-spec <module> <entity> [--route <route>] [--dry-run]\n\n# Real-world usage:\n$ scripe new-e2e-spec Billing Invoice --route billing/invoices`,
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
            "--route <route>",
            "string",
            "{module}/{entity-kebab}",
            "Frontend page route to target"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview Playwright test spec"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeUi.cmdSyncApi",
    id: "sync-api",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeUi.cmdSyncApiDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe sync-api <url> -m <module> [options]\n\n# Real-world usage:\nscripe sync-api https://localhost:5035/swagger/v1/swagger.json -m Billing --check`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<url>",
            "string (URL, required)",
            "-",
            "Swagger/OpenAPI JSON endpoint URL"
      ],
      [
            "-m, --module <module>",
            "string (required)",
            "-",
            "Target frontend module name"
      ],
      [
            "--check",
            "boolean",
            "false",
            "Drift gate: exit 1 if generated files differ from spec (CI)"
      ],
      [
            "--tag <tags>",
            "string (comma-separated)",
            "-",
            "Only generate clients for specified OpenAPI tags"
      ],
      [
            "--prune",
            "boolean",
            "false",
            "Delete generated clients whose tag no longer exists in spec"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Machine-readable change report"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview generated clients without disk mutation"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.codeUi.title",
    contentKey: "devTools.cli.codeUi.description",
  },
];

registerPage({
  slug: "dev-tools/cli/codegen-ui",
  titleKey: "devTools.cli.codeUi.title",
  descriptionKey: "devTools.cli.codeUi.description",
  category: "dev-tools",
  order: 5,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
