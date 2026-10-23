// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.platDiag.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "probe",
            "labelKey": "devTools.cli.platDiag.nodeProbe",
            "type": "primary"
      },
      {
            "id": "toolchain",
            "labelKey": "devTools.cli.platDiag.nodeToolchain",
            "type": "info"
      },
      {
            "id": "db",
            "labelKey": "devTools.cli.platDiag.nodeDb",
            "type": "warning"
      },
      {
            "id": "ready",
            "labelKey": "devTools.cli.platDiag.nodeReady",
            "type": "success"
      }
],
    connections: [
      {
            "from": "probe",
            "to": "toolchain",
            "labelKey": "devTools.cli.platDiag.edgeCheckTools"
      },
      {
            "from": "toolchain",
            "to": "db",
            "labelKey": "devTools.cli.platDiag.edgeCheckDb"
      },
      {
            "from": "db",
            "to": "ready",
            "labelKey": "devTools.cli.platDiag.edgeVerify"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.platDiag.termTitle",
    tabs: [
      {
            "tabId": "doctor",
            "label": "Platform Doctor",
            "command": "scripe doctor --full",
            "outputKey": "devTools.cli.platDiag.termOutputDoctor"
      },
      {
            "tabId": "info",
            "label": "System Info",
            "command": "scripe info",
            "outputKey": "devTools.cli.platDiag.termOutputInfo"
      },
      {
            "tabId": "undo",
            "label": "Safe Scaffolding Undo",
            "command": "scripe undo --last",
            "outputKey": "devTools.cli.platDiag.termOutputUndo"
      },
      {
            "tabId": "health",
            "label": "Health Probe",
            "command": "scripe health --ready",
            "outputKey": "devTools.cli.platDiag.termOutputHealth"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.platDiag.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.platDiag.cmdInfo",
    id: "info",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.platDiag.cmdInfoDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe info [--json]\n\n# Real-world usage:\n$ scripe info`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--json",
            "boolean",
            "false",
            "Output system environment, Node, .NET, pnpm, and Git versions as JSON"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.platDiag.cmdDoctor",
    id: "doctor",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.platDiag.cmdDoctorDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe doctor [--full] [--fix]\n\n# Real-world usage:\n$ scripe doctor --full`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--full",
            "boolean",
            "false",
            "Inspect .NET SDK, Node, pnpm, Docker, database connections, and ports"
      ],
      [
            "--fix",
            "boolean",
            "false",
            "Automatically resolve toolchain configuration issues and install missing global tools"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.platDiag.cmdUndo",
    id: "undo",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.platDiag.cmdUndoDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe undo [--last] [--id <transactionId>] [--confirm]\n\n# Real-world usage:\n$ scripe undo --last`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--last",
            "boolean",
            "true",
            "Roll back the most recent scaffolding operation using transaction ledger"
      ],
      [
            "--id <id>",
            "string",
            "-",
            "Specific scaffolding journal transaction ID to selectively reverse"
      ],
      [
            "--confirm",
            "boolean",
            "false",
            "Bypass interactive terminal confirmation before file deletions"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.platDiag.cmdList",
    id: "list",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.platDiag.cmdListDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe list <modules|features|routes|permissions> [--json]\n\n# Real-world usage:\n$ scripe list modules`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<type>",
            "modules | features | routes | permissions",
            "modules",
            "Category of platform components to introspect"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Format introspection listing as structured JSON"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.platDiag.cmdTheme",
    id: "theme",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.platDiag.cmdThemeDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe theme [default|matrix|cyberpunk|minimal]\n\n# Real-world usage:\n$ scripe theme cyberpunk`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[name]",
            "string",
            "default",
            "CLI terminal aesthetic palette to activate for terminal outputs"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.platDiag.cmdHealth",
    id: "health",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.platDiag.cmdHealthDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe health [--ready] [--url <url>]\n\n# Real-world usage:\n$ scripe health --ready`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--ready",
            "boolean",
            "false",
            "Probe readiness endpoint checking DB, Redis, and message broker health"
      ],
      [
            "--url <url>",
            "string (URI)",
            "http://localhost:5000",
            "Custom target backend host to probe"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.platDiag.cmdLogs",
    id: "logs",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.platDiag.cmdLogsDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe logs <backend|frontend> [--follow] [--level <level>]\n\n# Real-world usage:\n$ scripe logs backend --follow --level Warning`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<target>",
            "backend | frontend",
            "backend",
            "Subsystem to tail logs from"
      ],
      [
            "--follow, -f",
            "boolean",
            "false",
            "Stream real-time log entries continuously to stdout"
      ],
      [
            "--level <level>",
            "Verbose|Debug|Information|Warning|Error|Fatal",
            "Information",
            "Minimum log level filter"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.platDiag.cmdTrace",
    id: "trace",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.platDiag.cmdTraceDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe trace <traceId>\n\n# Real-world usage:\n$ scripe trace tr-8f92a104`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<traceId>",
            "string (required)",
            "-",
            "Distributed OpenTelemetry activity trace ID to inspect across microservices"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.platDiag.title",
    contentKey: "devTools.cli.platDiag.description",
  },
];

registerPage({
  slug: "dev-tools/cli/platform-diagnostics",
  titleKey: "devTools.cli.platDiag.title",
  descriptionKey: "devTools.cli.platDiag.description",
  category: "dev-tools",
  order: 19,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
