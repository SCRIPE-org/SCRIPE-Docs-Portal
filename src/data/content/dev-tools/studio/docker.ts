// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.docker.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.docker.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.docker.termOutputTopology",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.docker.termOutputVolumes",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.docker.nodeStudio", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.docker.nodeSocket", type: "info" },
      { id: "node3", labelKey: "devTools.studio.docker.nodeCompose", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.docker.nodeSwarm", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.docker.edgeApi" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.docker.edgeDeploy" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.docker.edgeOrch" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.docker.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Docker Compose Grid",
            "Inspect Cards",
            "6 Containers",
            "Displays api, frontend, postgres, redis, seq, and mailhog services"
      ],
      [
            "Container State Pill",
            "Hover Tooltip",
            "Green (Up)",
            "Shows container status, CPU percentage, memory consumption, and restart count"
      ],
      [
            "Port Bindings Matrix",
            "Inspect Cell",
            "5432:5432, 6379:6379",
            "Displays exposed container ports mapped to localhost interfaces"
      ],
      [
            "Global Docker Up / Down",
            "Click Toolbar CTA",
            "Ready",
            "Executes docker compose up -d or docker compose down with volume guards"
      ],
      [
            "Service Restart Action",
            "Click Card Menu",
            "Per Container",
            "Restarts individual container without disrupting adjacent infrastructure"
      ],
      [
            "Live Log Stream Console",
            "Click 'View Logs'",
            "Streaming",
            "Streams docker container logs with search filter, pause, and auto-scroll"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.docker.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.docker.title",
            "contentKey": "devTools.studio.docker.description",
            "code": "scripe docker up",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Launch Infrastructure Containers"
      },
      {
            "titleKey": "devTools.studio.docker.title",
            "contentKey": "devTools.studio.docker.description",
            "code": "scripe docker logs backend",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Inspect Live API Logs"
      },
      {
            "titleKey": "devTools.studio.docker.title",
            "contentKey": "devTools.studio.docker.description",
            "code": "scripe docker down",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Cleanly Stop Environment"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/DOCKERSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.DOCKER.Domain.Entities;

public class SampleDockerEntity : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public EntityStatus Status { get; set; } = EntityStatus.Active;
    
    // Logical cross-module reference (Never direct physical foreign key)
    public Guid LogicalTenantId { get; set; }
}`,
  },

  // ─── Architectural Callout Info Alert ───────────────────────
  {
    type: "info",
    variant: "tip",
    titleKey: "devTools.studio.docker.title",
    contentKey: "devTools.studio.docker.description",
  },
];

registerPage({
  slug: "dev-tools/studio/docker",
  titleKey: "devTools.studio.docker.title",
  descriptionKey: "devTools.studio.docker.description",
  category: "dev-tools",
  order: 10,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
