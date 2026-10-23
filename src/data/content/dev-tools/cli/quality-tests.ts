// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.qualityTests.intro",
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.qualityTests.termTitle",
    tabs: [
      {
            "tabId": "test-all",
            "label": "Run All Tests",
            "command": "scripe test --coverage",
            "outputKey": "devTools.cli.qualityTests.termOutputTestAll"
      },
      {
            "tabId": "test-be",
            "label": "xUnit + Moq Backend",
            "command": "scripe test backend --verbose",
            "outputKey": "devTools.cli.qualityTests.termOutputTestBe"
      },
      {
            "tabId": "test-e2e",
            "label": "Playwright UI Mode",
            "command": "scripe e2e --ui",
            "outputKey": "devTools.cli.qualityTests.termOutputE2e"
      },
      {
            "tabId": "storybook",
            "label": "Storybook Catalog",
            "command": "scripe storybook --build",
            "outputKey": "devTools.cli.qualityTests.termOutputSb"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.qualityTests.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.qualityTests.cmdTest",
    id: "test",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.qualityTests.cmdTestDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe test [target] [options]\n\n# Real-world usage:\n$ scripe test backend --coverage`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[target]",
            "frontend | backend | docs | e2e",
            "all",
            "Test runner target"
      ],
      [
            "--coverage",
            "boolean",
            "false",
            "Generate code coverage report with threshold enforcement"
      ],
      [
            "--watch",
            "boolean",
            "false",
            "Watch mode: re-execute affected test files on code change"
      ],
      [
            "--verbose",
            "boolean",
            "false",
            "Display full test case names and duration breakdown"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.qualityTests.cmdE2e",
    id: "e2e",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.qualityTests.cmdE2eDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe e2e [suite] [options]\n\n# Real-world usage:\n$ scripe e2e --headed --debug`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "[suite]",
            "string (filepath)",
            "-",
            "Specific Playwright test spec to execute"
      ],
      [
            "--headed",
            "boolean",
            "false",
            "Launch visible Chromium/WebKit/Firefox browser instances"
      ],
      [
            "--ui",
            "boolean",
            "false",
            "Open interactive Playwright UI trace inspector"
      ],
      [
            "--debug",
            "boolean",
            "false",
            "Pause at every step for manual debugging"
      ],
      [
            "--update-snapshots",
            "boolean",
            "false",
            "Update visual regression baseline PNGs"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.qualityTests.cmdStorybook",
    id: "storybook",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.qualityTests.cmdStorybookDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe storybook [--build] [--port <port>]\n\n# Real-world usage:\n$ scripe storybook --port 6006`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "--build",
            "boolean",
            "false",
            "Compile static Storybook HTML catalog into dist/storybook"
      ],
      [
            "--port <port>",
            "integer",
            "6006",
            "Custom HTTP listening port for Storybook dev server"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.qualityTests.title",
    contentKey: "devTools.cli.qualityTests.description",
  },
];

registerPage({
  slug: "dev-tools/cli/quality-tests",
  titleKey: "devTools.cli.qualityTests.title",
  descriptionKey: "devTools.cli.qualityTests.description",
  category: "dev-tools",
  order: 11,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-domain"],
  lastUpdated: "2026-03-03",
});
