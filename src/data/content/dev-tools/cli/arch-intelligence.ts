// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.archIntel.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "ast",
            "labelKey": "devTools.cli.archIntel.nodeAst",
            "type": "primary"
      },
      {
            "id": "rules",
            "labelKey": "devTools.cli.archIntel.nodeRules",
            "type": "warning"
      },
      {
            "id": "matrix",
            "labelKey": "devTools.cli.archIntel.nodeMatrix",
            "type": "info"
      },
      {
            "id": "gate",
            "labelKey": "devTools.cli.archIntel.nodeGate",
            "type": "success"
      }
],
    connections: [
      {
            "from": "ast",
            "to": "rules",
            "labelKey": "devTools.cli.archIntel.edgeParse"
      },
      {
            "from": "rules",
            "to": "matrix",
            "labelKey": "devTools.cli.archIntel.edgeEvaluate"
      },
      {
            "from": "matrix",
            "to": "gate",
            "labelKey": "devTools.cli.archIntel.edgeEnforce"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.archIntel.termTitle",
    tabs: [
      {
            "tabId": "arch",
            "label": "Clean Arch Verification",
            "command": "scripe arch-check --strict",
            "outputKey": "devTools.cli.archIntel.termOutputArch"
      },
      {
            "tabId": "graph",
            "label": "Module Dependency Graph",
            "command": "scripe graph --svg ./dist/graph.svg",
            "outputKey": "devTools.cli.archIntel.termOutputGraph"
      },
      {
            "tabId": "unused",
            "label": "Dead Code Detection",
            "command": "scripe unused --all",
            "outputKey": "devTools.cli.archIntel.termOutputUnused"
      },
      {
            "tabId": "bench",
            "label": "CQRS Benchmarks",
            "command": "scripe benchmark --iterations 5000",
            "outputKey": "devTools.cli.archIntel.termOutputBench"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.archIntel.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.archIntel.cmdArchCheck",
    id: "arch-check",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.archIntel.cmdArchCheckDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe arch-check [--target frontend|backend] [--json] [--strict]\n\n# Real-world usage:\n$ scripe arch-check --strict`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--target <target>",
            "frontend | backend | all",
            "all",
            "Scope architecture enforcement to specific layer"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Output dependency graph violations as structured JSON"
      ],
      [
            "--strict",
            "boolean",
            "false",
            "Fail immediately if Domain imports Application, or View imports IApiService"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.archIntel.cmdSearch",
    id: "search",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.archIntel.cmdSearchDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe search <query> [--type entity|handler|hook|route]\n\n# Real-world usage:\n$ scripe search Invoice --type entity`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<query>",
            "string (required)",
            "-",
            "Symbol or term to locate across monorepo AST index"
      ],
      [
            "--type <type>",
            "entity | handler | hook | route | all",
            "all",
            "Filter results by semantic architectural symbol type"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.archIntel.cmdGraph",
    id: "graph",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.archIntel.cmdGraphDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe graph [--format dot|json|svg] [--out <path>]\n\n# Real-world usage:\n$ scripe graph --format svg --out ./dist/modules.svg`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--format <fmt>",
            "dot | json | svg",
            "dot",
            "Output diagram format for visual graph visualization"
      ],
      [
            "--out <path>",
            "string (filepath)",
            "-",
            "Destination file path for generated module dependency diagram"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.archIntel.cmdUnused",
    id: "unused",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.archIntel.cmdUnusedDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe unused [--all] [--fix]\n\n# Real-world usage:\n$ scripe unused --all`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--all",
            "boolean",
            "true",
            "Detect unused DTOs, mappers, domain events, and React hooks"
      ],
      [
            "--fix",
            "boolean",
            "false",
            "Safely unregister or delete unreferenced boilerplate files"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.archIntel.cmdBenchmark",
    id: "benchmark",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.archIntel.cmdBenchmarkDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe benchmark [--iterations <n>] [--profile memory|throughput]\n\n# Real-world usage:\n$ scripe benchmark --iterations 10000`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--iterations <n>",
            "integer",
            "1000",
            "Number of operations to benchmark in tight loop execution"
      ],
      [
            "--profile <type>",
            "memory | throughput | all",
            "all",
            "Performance profiling focus: allocations or RPS"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.archIntel.cmdDocsSync",
    id: "docs-sync",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.archIntel.cmdDocsSyncDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe docs sync [--validate] [--coverage]\n\n# Real-world usage:\n$ scripe docs sync --validate`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--validate",
            "boolean",
            "false",
            "Assert all TypeScript symbols and API routes match documentation specs"
      ],
      [
            "--coverage",
            "boolean",
            "false",
            "Calculate documentation coverage percentage across all platform modules"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.archIntel.title",
    contentKey: "devTools.cli.archIntel.description",
  },
];

registerPage({
  slug: "dev-tools/cli/arch-intelligence",
  titleKey: "devTools.cli.archIntel.title",
  descriptionKey: "devTools.cli.archIntel.description",
  category: "dev-tools",
  order: 20,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
