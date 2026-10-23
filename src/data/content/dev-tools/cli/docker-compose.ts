// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.dockerCompose.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "compose",
            "labelKey": "devTools.cli.dockerCompose.nodeCompose",
            "type": "primary"
      },
      {
            "id": "infra",
            "labelKey": "devTools.cli.dockerCompose.nodeInfra",
            "type": "warning"
      },
      {
            "id": "api",
            "labelKey": "devTools.cli.dockerCompose.nodeApi",
            "type": "info"
      },
      {
            "id": "web",
            "labelKey": "devTools.cli.dockerCompose.nodeWeb",
            "type": "success"
      }
],
    connections: [
      {
            "from": "compose",
            "to": "infra",
            "labelKey": "devTools.cli.dockerCompose.edgeOrch"
      },
      {
            "from": "infra",
            "to": "api",
            "labelKey": "devTools.cli.dockerCompose.edgeDeps"
      },
      {
            "from": "api",
            "to": "web",
            "labelKey": "devTools.cli.dockerCompose.edgeUpstream"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.dockerCompose.termTitle",
    tabs: [
      {
            "tabId": "up",
            "label": "Start Stack",
            "command": "scripe docker up --infra --detach",
            "outputKey": "devTools.cli.dockerCompose.termOutputUp"
      },
      {
            "tabId": "build",
            "label": "Build Images",
            "command": "scripe docker build --tag 2.4.0 --no-cache",
            "outputKey": "devTools.cli.dockerCompose.termOutputBuild"
      },
      {
            "tabId": "status",
            "label": "Container Health",
            "command": "scripe docker status --json",
            "outputKey": "devTools.cli.dockerCompose.termOutputStatus"
      },
      {
            "tabId": "publish",
            "label": "Production Bundle",
            "command": "scripe publish --target linux-x64 --self-contained",
            "outputKey": "devTools.cli.dockerCompose.termOutputPublish"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.dockerCompose.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dockerCompose.cmdDockerUp",
    id: "docker-up",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dockerCompose.cmdDockerUpDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe docker up [--infra] [--build] [--detach] [-m <module>]\n\n# Real-world usage:\n$ scripe docker up --infra --detach`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--infra",
            "boolean",
            "false",
            "Start only foundational infrastructure containers (PostgreSQL, Redis, RabbitMQ)"
      ],
      [
            "--build",
            "boolean",
            "false",
            "Force rebuild of container images before starting services"
      ],
      [
            "--detach, -d",
            "boolean",
            "true",
            "Run containers in background daemon mode and print container IDs"
      ],
      [
            "-m, --module <name>",
            "string",
            "all",
            "Start only the container corresponding to a specific module class library"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dockerCompose.cmdDockerDown",
    id: "docker-down",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dockerCompose.cmdDockerDownDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe docker down [--volumes] [--remove-orphans]\n\n# Real-world usage:\n$ scripe docker down --volumes`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--volumes, -v",
            "boolean",
            "false",
            "Purge persistent container volume stores and reset database state"
      ],
      [
            "--remove-orphans",
            "boolean",
            "true",
            "Remove containers for services not defined in current compose manifest"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dockerCompose.cmdDockerBuild",
    id: "docker-build",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dockerCompose.cmdDockerBuildDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe docker build [--tag <tag>] [--no-cache] [--push]\n\n# Real-world usage:\n$ scripe docker build --tag v1.0.0 --no-cache`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--tag <tag>",
            "string",
            "latest",
            "Image tag identifier to stamp onto generated OCI image manifests"
      ],
      [
            "--no-cache",
            "boolean",
            "false",
            "Do not use cached build layers during image compilation"
      ],
      [
            "--push",
            "boolean",
            "false",
            "Push compiled images to remote registry specified in SCRIPE_DOCKER_REGISTRY"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dockerCompose.cmdDockerLogs",
    id: "docker-logs",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dockerCompose.cmdDockerLogsDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe docker logs [service] [--follow] [--tail <lines>]\n\n# Real-world usage:\n$ scripe docker logs api --follow --tail 100`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[service]",
            "string",
            "all",
            "Target service name to stream logs from (e.g., api, postgres, redis)"
      ],
      [
            "--follow, -f",
            "boolean",
            "false",
            "Stream real-time log outputs continuously to stdout"
      ],
      [
            "--tail <n>",
            "integer",
            "50",
            "Number of trailing log lines to output from each service buffer"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dockerCompose.cmdDockerStatus",
    id: "docker-status",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dockerCompose.cmdDockerStatusDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe docker status [--json]\n\n# Real-world usage:\n$ scripe docker status`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--json",
            "boolean",
            "false",
            "Format health, memory usage, and port mapping metrics as structured JSON"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.dockerCompose.cmdPublish",
    id: "publish",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.dockerCompose.cmdPublishDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe publish [--target <rid>] [--self-contained] [--out <dir>]\n\n# Real-world usage:\n$ scripe publish --target linux-x64 --self-contained --out ./dist/release`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--target <rid>",
            "string",
            "win-x64 | linux-x64",
            "Target Runtime Identifier (RID) for AOT compilation"
      ],
      [
            "--self-contained",
            "boolean",
            "true",
            "Bundle .NET runtime inside artifact package without host prerequisites"
      ],
      [
            "--out <dir>",
            "string (filepath)",
            "./dist/publish",
            "Destination directory path for compiled production binaries"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.dockerCompose.title",
    contentKey: "devTools.cli.dockerCompose.description",
  },
];

registerPage({
  slug: "dev-tools/cli/docker-compose",
  titleKey: "devTools.cli.dockerCompose.title",
  descriptionKey: "devTools.cli.dockerCompose.description",
  category: "dev-tools",
  order: 12,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
