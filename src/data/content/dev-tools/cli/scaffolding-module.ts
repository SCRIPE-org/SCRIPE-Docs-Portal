// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffModule.intro",
  },
  {
    type: "cli-simulator",
    titleKey: "devTools.cli.scaffModule.title",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "cli",
            "labelKey": "devTools.cli.scaffModule.nodeCli",
            "type": "primary"
      },
      {
            "id": "backend",
            "labelKey": "devTools.cli.scaffModule.nodeBackend",
            "type": "info"
      },
      {
            "id": "frontend",
            "labelKey": "devTools.cli.scaffModule.nodeFrontend",
            "type": "info"
      },
      {
            "id": "di",
            "labelKey": "devTools.cli.scaffModule.nodeDi",
            "type": "success"
      }
],
    connections: [
      {
            "from": "cli",
            "to": "backend",
            "labelKey": "devTools.cli.scaffModule.edgeDdd"
      },
      {
            "from": "cli",
            "to": "frontend",
            "labelKey": "devTools.cli.scaffModule.edgeMvvm"
      },
      {
            "from": "backend",
            "to": "di",
            "labelKey": "devTools.cli.scaffModule.edgeWire"
      },
      {
            "from": "frontend",
            "to": "di",
            "labelKey": "devTools.cli.scaffModule.edgeWire"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.scaffModule.termTitle",
    tabs: [
      {
            "tabId": "mod-full",
            "label": "Full-Stack Module",
            "command": "scripe new-module Billing --workspace billing",
            "outputKey": "devTools.cli.scaffModule.termOutputFull"
      },
      {
            "tabId": "feat-crud",
            "label": "Vertical Feature Slice",
            "command": "scripe new-feature Billing Invoice -p \"Title:string:required,Amount:decimal,DueDate:datetime\"",
            "outputKey": "devTools.cli.scaffModule.termOutputFeat"
      },
      {
            "tabId": "dry-run",
            "label": "Dry-Run Preview",
            "command": "scripe new-module Inventory --dry-run",
            "outputKey": "devTools.cli.scaffModule.termOutputDry"
      },
      {
            "tabId": "unwire",
            "label": "Safe Module Unwire",
            "command": "scripe remove-module Billing --confirm",
            "outputKey": "devTools.cli.scaffModule.termOutputRemove"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.scaffModule.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffModule.cmdNewModule",
    id: "new-module",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffModule.cmdNewModuleDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-module <Name> [options]\n\n# Real-world usage:\n$ scripe new-module Invoicing --workspace billing --entity Invoice --with-webhooks`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<Name>",
            "string (required)",
            "-",
            "PascalCase name of the module (e.g., Invoicing, Inventory)"
      ],
      [
            "--from-blueprint <file>",
            "string (filepath)",
            "-",
            "Generate complete module and all entities from a .scripe-blueprint.json file"
      ],
      [
            "--backend-only",
            "boolean",
            "false",
            "Generate only backend Clean Architecture class libraries (Domain, Application, Infrastructure)"
      ],
      [
            "--frontend-only",
            "boolean",
            "false",
            "Generate only Next.js frontend sub-module directory structure and DI registration"
      ],
      [
            "--entity <name>",
            "string",
            "<Name>",
            "Custom name for the initial root entity (default: singularized module name)"
      ],
      [
            "--with-no-entity",
            "boolean",
            "false",
            "Create empty module skeleton without domain entities or initial CRUD slices"
      ],
      [
            "--no-cache",
            "boolean",
            "false",
            "Skip Redis cache decorator and invalidation setup on generated queries"
      ],
      [
            "--no-cleaner-bg-service",
            "boolean",
            "false",
            "Skip soft-delete cleanup background job registration in BackgroundServices"
      ],
      [
            "--no-custom-fields",
            "boolean",
            "false",
            "Skip generating an entity-type-catalog registration for this entity"
      ],
      [
            "--with-webhooks",
            "boolean",
            "false",
            "Include IWebhookEmitter on generated CRUD commands"
      ],
      [
            "--idempotent",
            "boolean",
            "false",
            "Require durable idempotency receipt validation for all mutation commands"
      ],
      [
            "--lookup-provider",
            "boolean",
            "false",
            "Generate a tenant-scoped IEntityLookupProvider for reference pickers"
      ],
      [
            "--workspace-type <type>",
            "Admin | Module",
            "Module",
            "Workspace type determining layout wrapper and top-level navigation"
      ],
      [
            "--context-scope <scope>",
            "Both | PlatformOnly | TenantOnly",
            "TenantOnly",
            "Visibility scope: PlatformOnly, TenantOnly, or Both"
      ],
      [
            "--feature-flag <flag>",
            "string",
            "{ModuleName}.Access",
            "License gating feature flag name registered in database"
      ],
      [
            "--home-route <route>",
            "string (URI)",
            "/{entityPluralKebab}",
            "Landing route under tenant context"
      ],
      [
            "--platform-home-route <route>",
            "string (URI)",
            "null",
            "Landing route under platform context"
      ],
      [
            "--required-permission <permission>",
            "string",
            "null",
            "Explicit permission required to access the workspace"
      ],
      [
            "--color-hue <hue>",
            "integer (0-360)",
            "random",
            "OKLCH color hue angle for module brand accenting"
      ],
      [
            "--workspace <workspace>",
            "string",
            "shared",
            "Frontend workspace directory (e.g. admin, billing, hrms, shared)"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Simulate file creation and print colored diff tree without disk mutation"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffModule.cmdNewFeature",
    id: "new-feature",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffModule.cmdNewFeatureDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-feature <Module> <Entity> -p "<properties>" [options]\n\n# Real-world usage:\n$ scripe new-feature Invoicing LineItem -p "Description:string:required:max(250),Quantity:int:required:default(1),UnitPrice:decimal:required"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<Module>",
            "string (required)",
            "-",
            "Target existing module name (e.g., Invoicing)"
      ],
      [
            "<Entity>",
            "string (required)",
            "-",
            "PascalCase entity name (e.g., LineItem, Invoice)"
      ],
      [
            "-p, --properties <props>",
            "string (DSL)",
            "-",
            "Property definitions: Name:Type[:modifier1:modifier2]"
      ],
      [
            "--from-blueprint <file>",
            "string (filepath)",
            "-",
            "Generate entity vertical slice from blueprint definition file"
      ],
      [
            "--backend-only",
            "boolean",
            "false",
            "Generate only 18 backend Clean Architecture files"
      ],
      [
            "--frontend-only",
            "boolean",
            "false",
            "Generate only 10 frontend MVVM sub-module files"
      ],
      [
            "--no-controller",
            "boolean",
            "false",
            "Skip ASP.NET Core API controller generation"
      ],
      [
            "--no-cache",
            "boolean",
            "false",
            "Skip cache decorator and invalidation setup on queries/commands"
      ],
      [
            "--no-cleaner-bg-service",
            "boolean",
            "false",
            "Skip soft-delete cleanup background job check"
      ],
      [
            "--no-custom-fields",
            "boolean",
            "false",
            "Skip generating entity-type-catalog registration"
      ],
      [
            "--with-webhooks",
            "boolean",
            "false",
            "Include IWebhookEmitter on mutation commands"
      ],
      [
            "--idempotent",
            "boolean",
            "false",
            "Require durable idempotency check on Create/Update mutations"
      ],
      [
            "--lookup-provider",
            "boolean",
            "false",
            "Generate a tenant-scoped IEntityLookupProvider"
      ],
      [
            "--lookup-display-field <field>",
            "string",
            "Name",
            "Explicit non-PII string lookup label field"
      ],
      [
            "--lookup-search-fields <fields>",
            "string (comma-separated)",
            "Name",
            "Comma-separated non-PII lookup search fields"
      ],
      [
            "--requires-tenant-context",
            "boolean",
            "true",
            "Restrict navigation and queries to tenant context"
      ],
      [
            "--requires-platform-context",
            "boolean",
            "false",
            "Restrict navigation and queries to platform context"
      ],
      [
            "--feature-flag <flag>",
            "string",
            "-",
            "Feature flag required for menu item visibility"
      ],
      [
            "--paradigm <paradigm>",
            "ddd | standard",
            "ddd",
            "Domain paradigm: rich DDD entity vs standard POCO"
      ],
      [
            "--state-machine <spec>",
            "string (DSL)",
            "-",
            "Domain state transitions: Field:Action=From~To/Action2=From1|From2~To"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview generated files without writing to filesystem"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffModule.cmdRemoveModule",
    id: "remove-module",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffModule.cmdRemoveModuleDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe remove-module [name] [options]\n\n# Real-world usage:\n$ scripe remove-module Invoicing --confirm`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[name]",
            "string (optional)",
            "-",
            "Name of module to delete and unwire"
      ],
      [
            "--last",
            "boolean",
            "false",
            "Auto-detect and remove the last created module"
      ],
      [
            "--backend-only",
            "boolean",
            "false",
            "Only delete backend projects and solution links"
      ],
      [
            "--frontend-only",
            "boolean",
            "false",
            "Only delete frontend sub-module directory"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview all files and registrations that would be removed"
      ],
      [
            "--confirm",
            "boolean",
            "false",
            "Bypass interactive confirmation prompt (for CI/CD)"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffModule.cmdRemoveFeature",
    id: "remove-feature",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffModule.cmdRemoveFeatureDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe remove-feature <Module> <Entity> [options]\n\n# Real-world usage:\n$ scripe remove-feature Invoicing LineItem --confirm`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<Module>",
            "string (required)",
            "-",
            "Target module name"
      ],
      [
            "<Entity>",
            "string (required)",
            "-",
            "Target entity name"
      ],
      [
            "--backend-only",
            "boolean",
            "false",
            "Only remove backend files and EF DbSet registration"
      ],
      [
            "--frontend-only",
            "boolean",
            "false",
            "Only remove frontend ViewModel, View, and hook files"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview file deletion list without modifying disk"
      ],
      [
            "--confirm",
            "boolean",
            "false",
            "Bypass confirmation prompt"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffModule.cmdScaffoldFull",
    id: "scaffold-full",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffModule.cmdScaffoldFullDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe scaffold full <module> <entity> -p "<properties>" [options]\n\n# Real-world usage:\n$ scripe scaffold full Billing Customer -p "Name:string:required,Email:string:required:email"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Module name"
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
            "--idempotent",
            "boolean",
            "false",
            "Require durable idempotency check on mutation commands"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview files without writing"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffModule.cmdAddBgService",
    id: "add-bg-service",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffModule.cmdAddBgServiceDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe add-bg-service <Module> [options]\n\n# Real-world usage:\n$ scripe add-bg-service Billing --dry-run`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
        "<Module>",
        "string (required)",
        "-",
        "Target existing module name in PascalCase (e.g. Products, Billing)"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "Preview background job class and DI registration without filesystem changes"
      ]
    ],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.scaffModule.cmdRemoveBgService",
    id: "remove-bg-service",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.scaffModule.cmdRemoveBgServiceDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe remove-bg-service <Module> [options]\n\n# Real-world usage:\n$ scripe remove-bg-service Billing --confirm`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
        "<Module>",
        "string (required)",
        "-",
        "Target module name in PascalCase"
      ],
      [
        "--confirm",
        "boolean",
        "false",
        "Bypass interactive confirmation prompt for non-interactive CI/CD runs"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "Preview file deletions and DI unwiring without writing"
      ]
    ],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.scaffModule.title",
    contentKey: "devTools.cli.scaffModule.description",
  },
];

registerPage({
  slug: "dev-tools/cli/scaffolding-module",
  titleKey: "devTools.cli.scaffModule.title",
  descriptionKey: "devTools.cli.scaffModule.description",
  category: "dev-tools",
  order: 1,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain", "dev-tools/cli/codegen-application"],
  lastUpdated: "2026-03-03",
});
