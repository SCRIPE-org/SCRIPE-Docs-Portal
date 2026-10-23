// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.buildServers.intro",
  },
  {
    type: "cli-simulator",
    titleKey: "devTools.cli.buildServers.title",
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.buildServers.termTitle",
    tabs: [
      {
            "tabId": "dev-all",
            "label": "Dev All Concurrent",
            "command": "scripe dev all",
            "outputKey": "devTools.cli.buildServers.termOutputDevAll"
      },
      {
            "tabId": "build-be",
            "label": "Backend Roslyn Build",
            "command": "scripe build backend --release",
            "outputKey": "devTools.cli.buildServers.termOutputBuildBe"
      },
      {
            "tabId": "build-fe",
            "label": "Frontend Turbopack",
            "command": "scripe build frontend",
            "outputKey": "devTools.cli.buildServers.termOutputBuildFe"
      },
      {
            "tabId": "start-prod",
            "label": "Production Boot",
            "command": "scripe start all --published",
            "outputKey": "devTools.cli.buildServers.termOutputStart"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.buildServers.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.buildServers.cmdBuild",
    id: "build",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.buildServers.cmdBuildDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe build <backend | frontend | docs | all | cli> [options]\n\n# Real-world usage:\n$ scripe build all --release`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<target>",
            "backend | frontend | docs | all | cli",
            "-",
            "Monorepo subsystem to compile"
      ],
      [
            "--release",
            "boolean",
            "false",
            "Compile backend in Release configuration with optimizations"
      ],
      [
            "--no-restore",
            "boolean",
            "false",
            "Skip implicit NuGet restoration during build"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.buildServers.cmdDev",
    id: "dev",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.buildServers.cmdDevDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe dev <backend | frontend | docs | all> [options]\n\n# Real-world usage:\n$ scripe dev all --no-browser`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<target>",
            "backend | frontend | docs | all",
            "-",
            "Development server target"
      ],
      [
            "--no-browser",
            "boolean",
            "false",
            "Prevent automatic browser launch on startup"
      ],
      [
            "-e, --env <env>",
            "string",
            "development",
            "Target environment variables configuration"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.buildServers.cmdStart",
    id: "start",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.buildServers.cmdStartDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe start <frontend | backend | docs | all> [options]\n\n# Real-world usage:\n$ scripe start all --published`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<target>",
            "frontend | backend | docs | all",
            "-",
            "Production runtime target"
      ],
      [
            "--published",
            "boolean",
            "false",
            "Start backend directly from pre-compiled published DLLs"
      ],
      [
            "-p, --port <port>",
            "integer",
            "3000",
            "Custom HTTP listening port for frontend"
      ],
      [
            "-e, --env <env>",
            "string",
            "production",
            "Production environment profile"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.buildServers.title",
    contentKey: "devTools.cli.buildServers.description",
  },
];

registerPage({
  slug: "dev-tools/cli/build-servers",
  titleKey: "devTools.cli.buildServers.title",
  descriptionKey: "devTools.cli.buildServers.description",
  category: "dev-tools",
  order: 8,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
