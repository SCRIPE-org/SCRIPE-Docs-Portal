// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.qualityCheck.intro",
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.qualityCheck.termTitle",
    tabs: [
      {
            "tabId": "check",
            "label": "5-Stage Pre-Push Gate",
            "command": "scripe check",
            "outputKey": "devTools.cli.qualityCheck.termOutputCheck"
      },
      {
            "tabId": "lint",
            "label": "Linting (oxlint)",
            "command": "scripe lint --fix",
            "outputKey": "devTools.cli.qualityCheck.termOutputLint"
      },
      {
            "tabId": "format",
            "label": "Formatting (CSharpier)",
            "command": "scripe format --check",
            "outputKey": "devTools.cli.qualityCheck.termOutputFormat"
      },
      {
            "tabId": "analyze",
            "label": "Bundle Analyzer",
            "command": "scripe analyze frontend --size",
            "outputKey": "devTools.cli.qualityCheck.termOutputAnalyze"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.qualityCheck.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.qualityCheck.cmdCheck",
    id: "check",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.qualityCheck.cmdCheckDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe check [--quick] [--fix] [--json]\n\n# Real-world usage:\n$ scripe check --fix`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--quick",
            "boolean",
            "false",
            "Fast mode: run linting + compilation only, skipping test execution"
      ],
      [
            "--fix",
            "boolean",
            "false",
            "Automatically auto-fix lint and code formatting violations before verifying"
      ],
      [
            "--json",
            "boolean",
            "false",
            "Structured JSON audit output for pull request gatekeepers"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.qualityCheck.cmdLint",
    id: "lint",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.qualityCheck.cmdLintDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe lint [target] [--fix] [--dry-run]\n\n# Real-world usage:\n$ scripe lint frontend --fix`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[target]",
            "frontend | backend | docs",
            "all",
            "Target codebase subsystem"
      ],
      [
            "--fix",
            "boolean",
            "false",
            "Auto-fix detected stylistic issues in place"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview what --fix would change without modifying files"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.qualityCheck.cmdFormat",
    id: "format",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.qualityCheck.cmdFormatDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe format [target] [--check] [--dry-run]\n\n# Real-world usage:\n$ scripe format --check`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[target]",
            "frontend | backend | docs",
            "all",
            "Target subsystem"
      ],
      [
            "--check",
            "boolean",
            "false",
            "Verify-only mode (fails with non-zero exit code if unformatted)"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Show unified diff of unformatted files"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.qualityCheck.cmdAnalyze",
    id: "analyze",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.qualityCheck.cmdAnalyzeDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe analyze [target] [--size] [--deps]\n\n# Real-world usage:\n$ scripe analyze frontend --size`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[target]",
            "frontend | backend",
            "frontend",
            "Target subsystem"
      ],
      [
            "--size",
            "boolean",
            "true",
            "Show bundle size table and Next.js route chunks"
      ],
      [
            "--deps",
            "boolean",
            "false",
            "Show dependency count breakdown per module"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.qualityCheck.title",
    contentKey: "devTools.cli.qualityCheck.description",
  },
];

registerPage({
  slug: "dev-tools/cli/quality-check",
  titleKey: "devTools.cli.qualityCheck.title",
  descriptionKey: "devTools.cli.qualityCheck.description",
  category: "dev-tools",
  order: 10,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
