// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.packagesEnv.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "root",
            "labelKey": "devTools.cli.packagesEnv.nodeRoot",
            "type": "primary"
      },
      {
            "id": "nuget",
            "labelKey": "devTools.cli.packagesEnv.nodeNuget",
            "type": "info"
      },
      {
            "id": "pnpm",
            "labelKey": "devTools.cli.packagesEnv.nodePnpm",
            "type": "warning"
      },
      {
            "id": "cache",
            "labelKey": "devTools.cli.packagesEnv.nodeCache",
            "type": "success"
      }
],
    connections: [
      {
            "from": "root",
            "to": "nuget",
            "labelKey": "devTools.cli.packagesEnv.edgeRestoreBe"
      },
      {
            "from": "root",
            "to": "pnpm",
            "labelKey": "devTools.cli.packagesEnv.edgeRestoreFe"
      },
      {
            "from": "pnpm",
            "to": "cache",
            "labelKey": "devTools.cli.packagesEnv.edgeCache"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.packagesEnv.termTitle",
    tabs: [
      {
            "tabId": "restore",
            "label": "Restore Monorepo",
            "command": "scripe restore --frozen",
            "outputKey": "devTools.cli.packagesEnv.termOutputRestore"
      },
      {
            "tabId": "clean",
            "label": "Deep Cleanup",
            "command": "scripe clean --deep",
            "outputKey": "devTools.cli.packagesEnv.termOutputClean"
      },
      {
            "tabId": "add-pkg",
            "label": "Layered Package Add",
            "command": "scripe add backend FluentValidation -m Billing -l Application",
            "outputKey": "devTools.cli.packagesEnv.termOutputAdd"
      },
      {
            "tabId": "outdated",
            "label": "Outdated Audit",
            "command": "scripe outdated --json",
            "outputKey": "devTools.cli.packagesEnv.termOutputOutdated"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.packagesEnv.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.packagesEnv.cmdRestore",
    id: "install-&-restore",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.packagesEnv.cmdRestoreDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe install [target] / $ scripe restore [target] [--frozen]\n\n# Real-world usage:\n$ scripe restore --frozen`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[target]",
            "frontend | backend | docs",
            "all",
            "Subsystem to restore"
      ],
      [
            "--frozen",
            "boolean",
            "false",
            "Enforce frozen lockfile check in CI pipeline"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.packagesEnv.cmdClean",
    id: "clean",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.packagesEnv.cmdCleanDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe clean [target] [--deep] [--dry-run]\n\n# Real-world usage:\n$ scripe clean --deep`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[target]",
            "backend | frontend | docs | docker",
            "all",
            "Target cleanup area"
      ],
      [
            "--deep",
            "boolean",
            "false",
            "Also purge node_modules and global NuGet caches"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview directories and total megabytes that would be deleted"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.packagesEnv.cmdAddPkg",
    id: "add-&-remove-pkg",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.packagesEnv.cmdAddPkgDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe add <target> <packages...> [options] / $ scripe remove-pkg <target> <packages...>\n\n# Real-world usage:\n$ scripe add backend Polly -m Billing -l Infrastructure`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<target>",
            "frontend | backend | cli",
            "-",
            "Target platform subsystem"
      ],
      [
            "<packages...>",
            "string (space-separated)",
            "-",
            "Package names to add or remove"
      ],
      [
            "-D, --dev",
            "boolean",
            "false",
            "Install as devDependency (frontend only)"
      ],
      [
            "-m, --module <name>",
            "string",
            "-",
            "Target backend module (required for backend)"
      ],
      [
            "-l, --layer <layer>",
            "Domain | Application | Infrastructure",
            "Application",
            "Specific Clean Architecture layer csproj to mutate"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview dependency mutations"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.packagesEnv.cmdOutdated",
    id: "outdated-&-deps",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.packagesEnv.cmdOutdatedDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe outdated [target] [--json] / $ scripe deps [target] [--tree]\n\n# Real-world usage:\n$ scripe deps backend -m Billing --tree`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[target]",
            "frontend | backend | cli | docs",
            "all",
            "Target scope"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Machine-readable JSON output for CI pipeline"
      ],
      [
            "--tree",
            "boolean",
            "false",
            "Render hierarchical visual dependency tree in terminal"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.packagesEnv.title",
    contentKey: "devTools.cli.packagesEnv.description",
  },
];

registerPage({
  slug: "dev-tools/cli/packages-env",
  titleKey: "devTools.cli.packagesEnv.title",
  descriptionKey: "devTools.cli.packagesEnv.description",
  category: "dev-tools",
  order: 9,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
