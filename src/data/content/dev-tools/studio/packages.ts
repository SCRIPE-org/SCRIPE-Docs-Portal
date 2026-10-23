// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Hero Overview ──────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "devTools.studio.packages.intro",
  },

  // ─── Interactive Terminal ────────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "devTools.studio.packages.termTitle",
    tabs: [
      {
        tabId: "primary",
        label: "Primary Daemon Execution",
        command: "scripe studio --port 4200 --engine-port 4201",
        outputKey: "devTools.studio.packages.termOutputDeps",
      },
      {
        tabId: "secondary",
        label: "Reconciliation & AST Verification",
        command: "scripe studio status --json",
        outputKey: "devTools.studio.packages.termOutputCve",
      },
    ],
  },

  // ─── Visual Architecture Flowchart ──────────────────────────
  {
    type: "flowchart",
    nodes: [
      { id: "node1", labelKey: "devTools.studio.packages.nodeManifest", type: "primary" },
      { id: "node2", labelKey: "devTools.studio.packages.nodeNuget", type: "info" },
      { id: "node3", labelKey: "devTools.studio.packages.nodePnpm", type: "warning" },
      { id: "node4", labelKey: "devTools.studio.packages.nodeSbom", type: "success" },
    ],
    connections: [
      { from: "node1", to: "node2", labelKey: "devTools.studio.packages.edgeResolveDotnet" },
      { from: "node2", to: "node3", labelKey: "devTools.studio.packages.edgeResolveNode" },
      { from: "node3", to: "node4", labelKey: "devTools.studio.packages.edgeAudit" },
    ],
  },

  // ─── Surface Controls & User Interface Table ────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.studio.packages.title",
    id: "ui-controls-matrix",
  },
  {
    type: "table",
    headers: ["Interface Control", "Trigger / Hotkey", "Default State", "Operational Behavior & Effect"],
    rows: [
      [
            "Package Manager Tabs",
            "Click NuGet / pnpm",
            "NuGet (.NET 9)",
            "Toggles between backend C# package tree and frontend Node.js dependencies"
      ],
      [
            "Outdated Semver Badges",
            "Inspect Tag",
            "Up to Date (Green)",
            "Highlights available patch (yellow), minor (blue), or major (red) upgrades"
      ],
      [
            "CVE Vulnerability Scanner",
            "Click 'Scan Security'",
            "0 Advisories",
            "Audits installed packages against GitHub Advisory and NIST databases"
      ],
      [
            "Add Dependency Modal",
            "Click 'Add Package'",
            "Search Ready",
            "Provides live autocomplete from nuget.org and npmjs.com with version picker"
      ],
      [
            "Prune Unused Packages",
            "Click Action",
            "Safe Prune",
            "Identifies unreferenced packages and removes them from project files cleanly"
      ]
],
  },

  // ─── Junior Developer Step-by-Step Guide ────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.studio.packages.title",
    id: "step-guide-junior",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "devTools.studio.packages.title",
            "contentKey": "devTools.studio.packages.description",
            "code": "scripe outdated",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Inspect Outdated Dependencies"
      },
      {
            "titleKey": "devTools.studio.packages.title",
            "contentKey": "devTools.studio.packages.description",
            "code": "scripe add-pkg backend MediatR",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Install NuGet Package"
      },
      {
            "titleKey": "devTools.studio.packages.title",
            "contentKey": "devTools.studio.packages.description",
            "code": "scripe audit --fix",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Resolve Security Vulnerabilities"
      }
],
  },

  // ─── Code Snippet ───────────────────────────────────────────
  {
    type: "code",
    language: "csharp",
    filename: "Domain/Entities/PACKAGESSample.cs",
    code: `// Clean Architecture Virtual AST Output
namespace SCRIPE.PACKAGES.Domain.Entities;

public class SamplePackagesEntity : AuditableEntity
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
    titleKey: "devTools.studio.packages.title",
    contentKey: "devTools.studio.packages.description",
  },
];

registerPage({
  slug: "dev-tools/studio/packages",
  titleKey: "devTools.studio.packages.title",
  descriptionKey: "devTools.studio.packages.description",
  category: "dev-tools",
  order: 12,
  sections,
  relatedSlugs: ["dev-tools/studio/overview", "dev-tools/studio/dashboard", "dev-tools/studio/schema-designer"],
  lastUpdated: "2026-10-23",
});
