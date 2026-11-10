import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

/**
 * AstraFlow CLI — documents every `scripe astraflow` command and parameter.
 * All prose lives in locales/pages/dev-tools/*.ts under devTools.cli.astraflow.*
 */
const sections: DocSection[] = [
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.intro"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.intro2"
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.cli.astraflow.hMap",
    "id": "command-map"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thCommand",
      "devTools.cli.astraflow.thKind",
      "devTools.cli.astraflow.thPurpose"
    ],
    "rows": [
      [
        "scripe astraflow install",
        "devTools.cli.astraflow.kLifecycle",
        "devTools.cli.astraflow.dInstall"
      ],
      [
        "scripe astraflow update",
        "devTools.cli.astraflow.kLifecycle",
        "devTools.cli.astraflow.dUpdate"
      ],
      [
        "scripe astraflow uninstall",
        "devTools.cli.astraflow.kLifecycle",
        "devTools.cli.astraflow.dUninstall"
      ],
      [
        "scripe astraflow status",
        "devTools.cli.astraflow.kLifecycle",
        "devTools.cli.astraflow.dStatus"
      ],
      [
        "scripe astraflow versions",
        "devTools.cli.astraflow.kLifecycle",
        "devTools.cli.astraflow.dVersions"
      ],
      [
        "scripe astraflow inspect",
        "devTools.cli.astraflow.kPassthrough",
        "devTools.cli.astraflow.dInspect"
      ],
      [
        "scripe astraflow validate",
        "devTools.cli.astraflow.kPassthrough",
        "devTools.cli.astraflow.dValidate"
      ],
      [
        "scripe astraflow report",
        "devTools.cli.astraflow.kPassthrough",
        "devTools.cli.astraflow.dReport"
      ],
      [
        "scripe astraflow diff",
        "devTools.cli.astraflow.kPassthrough",
        "devTools.cli.astraflow.dDiff"
      ],
      [
        "scripe astraflow graph",
        "devTools.cli.astraflow.kPassthrough",
        "devTools.cli.astraflow.dGraph"
      ],
      [
        "scripe astraflow scan",
        "devTools.cli.astraflow.kPassthrough",
        "devTools.cli.astraflow.dScan"
      ],
      [
        "scripe astraflow run",
        "devTools.cli.astraflow.kPassthrough",
        "devTools.cli.astraflow.dRun"
      ],
      [
        "scripe astraflow baseline",
        "devTools.cli.astraflow.kWorkflow",
        "devTools.cli.astraflow.dBaseline"
      ],
      [
        "scripe astraflow baselines",
        "devTools.cli.astraflow.kWorkflow",
        "devTools.cli.astraflow.dBaselines"
      ],
      [
        "scripe astraflow compare",
        "devTools.cli.astraflow.kWorkflow",
        "devTools.cli.astraflow.dCompare"
      ],
      [
        "scripe astraflow export",
        "devTools.cli.astraflow.kWorkflow",
        "devTools.cli.astraflow.dExport"
      ],
      [
        "scripe astraflow doctor",
        "devTools.cli.astraflow.kWorkflow",
        "devTools.cli.astraflow.dDoctor"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.cli.astraflow.hLifecycle",
    "id": "lifecycle"
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_install",
    "id": "astraflow-install"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dInstall"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow install [--tool-version <v>] [--dry-run]\n\n# Example:\n$ scripe astraflow install --dry-run"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "--tool-version <v>",
        "string",
        "pinned",
        "devTools.cli.astraflow.fToolVer"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDry"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_update",
    "id": "astraflow-update"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dUpdate"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow update [--tool-version <v>] [--dry-run]\n\n# Example:\n$ scripe astraflow update --tool-version 2.3.0"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "--tool-version <v>",
        "string",
        "pinned",
        "devTools.cli.astraflow.fToolVer"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDry"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_uninstall",
    "id": "astraflow-uninstall"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dUninstall"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow uninstall [--dry-run]\n\n# Example:\n$ scripe astraflow uninstall --dry-run"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "--dry-run",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDry"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_status",
    "id": "astraflow-status"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dStatus"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow status [--json]\n\n# Example:\n$ scripe astraflow status --json"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "--json",
        "boolean",
        "false",
        "devTools.cli.astraflow.fJson"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_versions",
    "id": "astraflow-versions"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dVersions"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow versions [--json]\n\n# Example:\n$ scripe astraflow versions --json"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "--json",
        "boolean",
        "false",
        "devTools.cli.astraflow.fJson"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.cli.astraflow.hPassthrough",
    "id": "passthrough"
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_inspect",
    "id": "astraflow-inspect"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dInspect"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow inspect [handlers|notifications|mappings|projections] [path] [--detail] [-o json|markdown|sarif|text] [--out <file>] [--dry-run]\n\n# Example:\n$ scripe astraflow inspect handlers --detail -o markdown --out handlers.md"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "[target...]",
        "string",
        "SCRIPE-Backend",
        "devTools.cli.astraflow.fKind"
      ],
      [
        "--detail",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDetail"
      ],
      [
        "-o, --output <fmt>",
        "enum",
        "json",
        "devTools.cli.astraflow.fOutputAll"
      ],
      [
        "--out <file>",
        "path",
        "-",
        "devTools.cli.astraflow.fOut"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDry"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_validate",
    "id": "astraflow-validate"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dValidate"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow validate [path] [-o json|markdown|sarif|text] [--out <file>] [--dry-run]\n\n# Example:\n$ scripe astraflow validate -o sarif --out validate.sarif"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "[path...]",
        "path",
        "SCRIPE-Backend",
        "devTools.cli.astraflow.fPath"
      ],
      [
        "-o, --output <fmt>",
        "enum",
        "json",
        "devTools.cli.astraflow.fOutputAll"
      ],
      [
        "--out <file>",
        "path",
        "-",
        "devTools.cli.astraflow.fOut"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDry"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_report",
    "id": "astraflow-report"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dReport"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow report [path] [-o json|markdown|sarif|text] [--out <file>] [--dry-run]\n\n# Example:\n$ scripe astraflow report -o json --out report.json"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "[path...]",
        "path",
        "SCRIPE-Backend",
        "devTools.cli.astraflow.fPath"
      ],
      [
        "-o, --output <fmt>",
        "enum",
        "json",
        "devTools.cli.astraflow.fOutputAll"
      ],
      [
        "--out <file>",
        "path",
        "-",
        "devTools.cli.astraflow.fOut"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDry"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_diff",
    "id": "astraflow-diff"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dDiff"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow diff <before.json> <after.json> [-o json|markdown|text] [--out <file>] [--dry-run]\n\n# Example:\n$ scripe astraflow diff before.json after.json -o markdown"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "<before>",
        "path",
        "-",
        "devTools.cli.astraflow.fBefore"
      ],
      [
        "<after>",
        "path",
        "-",
        "devTools.cli.astraflow.fAfter"
      ],
      [
        "-o, --output <fmt>",
        "enum",
        "json",
        "devTools.cli.astraflow.fOutputNoSarif"
      ],
      [
        "--out <file>",
        "path",
        "-",
        "devTools.cli.astraflow.fOut"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDry"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_graph",
    "id": "astraflow-graph"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dGraph"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow graph [path] [--format mermaid|dot] [--direction TB|LR] [--cluster] [--out <file>] [--dry-run]\n\n# Example:\n$ scripe astraflow graph --format mermaid --direction LR --cluster --out graph.mmd"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "[path...]",
        "path",
        "SCRIPE-Backend",
        "devTools.cli.astraflow.fPath"
      ],
      [
        "--format <fmt>",
        "enum",
        "mermaid",
        "devTools.cli.astraflow.fFormat"
      ],
      [
        "--direction <dir>",
        "enum",
        "-",
        "devTools.cli.astraflow.fDirection"
      ],
      [
        "--cluster",
        "boolean",
        "false",
        "devTools.cli.astraflow.fCluster"
      ],
      [
        "--out <file>",
        "path",
        "-",
        "devTools.cli.astraflow.fOut"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDry"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_scan",
    "id": "astraflow-scan"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dScan"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow scan [path] [-o json|markdown|text] [--out <file>] [--dry-run]\n\n# Example:\n$ scripe astraflow scan -o markdown --out migration-candidates.md"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "[path...]",
        "path",
        "SCRIPE-Backend",
        "devTools.cli.astraflow.fPath"
      ],
      [
        "-o, --output <fmt>",
        "enum",
        "json",
        "devTools.cli.astraflow.fOutputNoSarif"
      ],
      [
        "--out <file>",
        "path",
        "-",
        "devTools.cli.astraflow.fOut"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDry"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_run",
    "id": "astraflow-run"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dRun"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow run [--dry-run] -- <raw astraflow args>\n\n# Example:\n$ scripe astraflow run -- inspect handlers .\\SCRIPE-Backend\\src --detail"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "<args...>",
        "string[]",
        "-",
        "devTools.cli.astraflow.fRawArgs"
      ],
      [
        "--dry-run",
        "boolean",
        "false",
        "devTools.cli.astraflow.fDry"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.cli.astraflow.hWorkflows",
    "id": "workflows"
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_baseline",
    "id": "astraflow-baseline"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dBaseline"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow baseline [name] [path] [--json]\n\n# Example:\n$ scripe astraflow baseline before-refactor"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "[name]",
        "string",
        "baseline",
        "devTools.cli.astraflow.fName"
      ],
      [
        "[path]",
        "path",
        "SCRIPE-Backend",
        "devTools.cli.astraflow.fPath"
      ],
      [
        "--json",
        "boolean",
        "false",
        "devTools.cli.astraflow.fJson"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_baselines",
    "id": "astraflow-baselines"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dBaselines"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow baselines [--json]\n\n# Example:\n$ scripe astraflow baselines --json"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "--json",
        "boolean",
        "false",
        "devTools.cli.astraflow.fJson"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_compare",
    "id": "astraflow-compare"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dCompare"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow compare [name] [path] [-o json|markdown|text] [--fail-on-change] [--json]\n\n# Example:\n$ scripe astraflow compare before-refactor --fail-on-change"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "[name]",
        "string",
        "baseline",
        "devTools.cli.astraflow.fName"
      ],
      [
        "[path]",
        "path",
        "SCRIPE-Backend",
        "devTools.cli.astraflow.fPath"
      ],
      [
        "-o, --output <fmt>",
        "enum",
        "summary",
        "devTools.cli.astraflow.fOutputCompare"
      ],
      [
        "--fail-on-change",
        "boolean",
        "false",
        "devTools.cli.astraflow.fFail"
      ],
      [
        "--json",
        "boolean",
        "false",
        "devTools.cli.astraflow.fJson"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_export",
    "id": "astraflow-export"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dExport"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow export [path] [--out <dir>] [--json]\n\n# Example:\n$ scripe astraflow export --out reports/astraflow/release-2026-11"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "[path]",
        "path",
        "SCRIPE-Backend",
        "devTools.cli.astraflow.fPath"
      ],
      [
        "--out <dir>",
        "path",
        "reports/astraflow/<timestamp>",
        "devTools.cli.astraflow.fOutDir"
      ],
      [
        "--json",
        "boolean",
        "false",
        "devTools.cli.astraflow.fJson"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.cli.astraflow.h_doctor",
    "id": "astraflow-doctor"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.dDoctor"
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Syntax & Example",
    "code": "$ scripe astraflow doctor [--json]\n\n# Example:\n$ scripe astraflow doctor --json"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thFlag",
      "devTools.cli.astraflow.thType",
      "devTools.cli.astraflow.thDefault",
      "devTools.cli.astraflow.thDesc"
    ],
    "rows": [
      [
        "--json",
        "boolean",
        "false",
        "devTools.cli.astraflow.fJson"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.cli.astraflow.hFlow",
    "id": "workflow"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.flowIntro"
  },
  {
    "type": "flowchart",
    "direction": "horizontal",
    "nodes": [
      {
        "id": "install",
        "labelKey": "devTools.cli.astraflow.nInstall",
        "type": "primary"
      },
      {
        "id": "baseline",
        "labelKey": "devTools.cli.astraflow.nBaseline",
        "type": "info"
      },
      {
        "id": "change",
        "labelKey": "devTools.cli.astraflow.nChange",
        "type": "warning"
      },
      {
        "id": "compare",
        "labelKey": "devTools.cli.astraflow.nCompare",
        "type": "info"
      },
      {
        "id": "export",
        "labelKey": "devTools.cli.astraflow.nExport",
        "type": "success"
      }
    ],
    "connections": [
      {
        "from": "install",
        "to": "baseline",
        "labelKey": "devTools.cli.astraflow.eInstallBaseline"
      },
      {
        "from": "baseline",
        "to": "change",
        "labelKey": "devTools.cli.astraflow.eBaselineChange"
      },
      {
        "from": "change",
        "to": "compare",
        "labelKey": "devTools.cli.astraflow.eChangeCompare"
      },
      {
        "from": "compare",
        "to": "export",
        "labelKey": "devTools.cli.astraflow.eCompareExport"
      }
    ]
  },
  {
    "type": "code",
    "language": "bash",
    "filename": "Workflow",
    "code": "$ scripe astraflow install\n$ scripe astraflow baseline before-refactor\n# ... change code ...\n$ scripe astraflow compare before-refactor\n$ scripe astraflow export"
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.cli.astraflow.hExit",
    "id": "exit-codes"
  },
  {
    "type": "table",
    "headers": [
      "devTools.cli.astraflow.thCode",
      "devTools.cli.astraflow.thWhen"
    ],
    "rows": [
      [
        "0",
        "devTools.cli.astraflow.eOk"
      ],
      [
        "1",
        "devTools.cli.astraflow.eAstra"
      ],
      [
        "1",
        "devTools.cli.astraflow.eValidate"
      ],
      [
        "1",
        "devTools.cli.astraflow.eCompare"
      ],
      [
        "1",
        "devTools.cli.astraflow.eExport"
      ],
      [
        "1",
        "devTools.cli.astraflow.eDoctor"
      ],
      [
        "1",
        "devTools.cli.astraflow.eBaseline"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.cli.astraflow.hJson",
    "id": "report-json"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.jsonIntro"
  },
  {
    "type": "code",
    "language": "json",
    "filename": "Report shape",
    "code": "{\n  \"command\": \"report\",\n  \"timestamp\": \"<ISO-8601>\",\n  \"path\": \"<analyzed path>\",\n  \"status\": \"<status>\",\n  \"sections\": [\n    { \"name\": \"<section>\", \"items\": [ { \"id\": \"File.cs:42:request-handler\", \"type\": \"<type>\", \"source\": \"<file>\", \"detail\": \"<detail>\" } ] }\n  ],\n  \"findings\": [\n    { \"code\": \"<code>\", \"severity\": \"<severity>\", \"subject\": \"<subject>\", \"message\": \"<message>\" }\n  ]\n}"
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.cli.astraflow.hCi",
    "id": "ci-recipes"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.cli.astraflow.ciIntro"
  },
  {
    "type": "tabs",
    "tabs": [
      {
        "label": "Compare gate",
        "language": "yaml",
        "filename": ".github/workflows/astraflow.yml",
        "code": "- name: Install AstraFlow CLI\n  run: scripe astraflow install\n- name: Fail when handlers / mappings changed\n  run: scripe astraflow compare main-baseline --fail-on-change"
      },
      {
        "label": "SARIF upload",
        "language": "yaml",
        "filename": ".github/workflows/astraflow-sarif.yml",
        "code": "- name: Generate SARIF\n  run: scripe astraflow validate -o sarif --out astraflow.sarif\n- name: Upload SARIF\n  uses: github/codeql-action/upload-sarif@v3\n  with:\n    sarif_file: astraflow.sarif"
      },
      {
        "label": "Evidence bundle",
        "language": "yaml",
        "filename": ".github/workflows/astraflow-export.yml",
        "code": "- name: Export AstraFlow evidence\n  run: scripe astraflow export --out reports/astraflow/ci\n- uses: actions/upload-artifact@v4\n  with:\n    name: astraflow-evidence\n    path: reports/astraflow/ci"
      }
    ]
  },
  {
    "type": "info",
    "variant": "note",
    "titleKey": "devTools.cli.astraflow.hCi",
    "contentKey": "devTools.cli.astraflow.ciNote"
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.cli.astraflow.hTerm",
    "id": "try-it"
  },
  {
    "type": "interactive-terminal",
    "titleKey": "devTools.cli.astraflow.termTitle",
    "tabs": [
      {
        "tabId": "status",
        "label": "Status",
        "command": "scripe astraflow status --json",
        "outputKey": "devTools.cli.astraflow.termStatus"
      },
      {
        "tabId": "report",
        "label": "Report",
        "command": "scripe astraflow report --out report.json",
        "outputKey": "devTools.cli.astraflow.termReport"
      },
      {
        "tabId": "compare",
        "label": "Compare",
        "command": "scripe astraflow compare before-refactor --fail-on-change",
        "outputKey": "devTools.cli.astraflow.termCompare"
      },
      {
        "tabId": "doctor",
        "label": "Doctor",
        "command": "scripe astraflow doctor",
        "outputKey": "devTools.cli.astraflow.termDoctor"
      },
      {
        "tabId": "scan",
        "label": "Scan",
        "command": "scripe astraflow scan -o markdown",
        "outputKey": "devTools.cli.astraflow.termScan"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.cli.astraflow.hTrouble",
    "id": "troubleshooting"
  },
  {
    "type": "info",
    "variant": "warning",
    "titleKey": "devTools.cli.astraflow.tIdsTitle",
    "contentKey": "devTools.cli.astraflow.tIds"
  },
  {
    "type": "info",
    "variant": "warning",
    "titleKey": "devTools.cli.astraflow.tScanTitle",
    "contentKey": "devTools.cli.astraflow.tScan"
  },
  {
    "type": "info",
    "variant": "caution",
    "titleKey": "devTools.cli.astraflow.tValTitle",
    "contentKey": "devTools.cli.astraflow.tVal"
  },
  {
    "type": "info",
    "variant": "note",
    "titleKey": "devTools.cli.astraflow.tTimeTitle",
    "contentKey": "devTools.cli.astraflow.tTime"
  },
  {
    "type": "info",
    "variant": "note",
    "titleKey": "devTools.cli.astraflow.tPathTitle",
    "contentKey": "devTools.cli.astraflow.tPath"
  },
  {
    "type": "info",
    "variant": "tip",
    "titleKey": "devTools.cli.astraflow.tDryTitle",
    "contentKey": "devTools.cli.astraflow.tDry"
  }
];

registerPage({
  slug: "dev-tools/cli/astraflow",
  titleKey: "devTools.cli.astraflow.title",
  descriptionKey: "devTools.cli.astraflow.description",
  category: "dev-tools",
  order: 21,
  sections,
  relatedSlugs: ["dev-tools/studio/astraflow", "dev-tools/cli/arch-intelligence", "dev-tools/cli/quality-check"],
  lastUpdated: "2026-11-09",
});
