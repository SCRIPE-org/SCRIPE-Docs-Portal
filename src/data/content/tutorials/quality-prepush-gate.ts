// FILE-EXCEPTION: file length
import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Intro ──────────────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "tutorials.qualityGate.intro",
  },

  // ─── Masterclass Simulator ──────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "tutorials.qualityGate.title",
    tabs: [
      {
        tabId: "run-step-1",
        label: "Execute Primary Step",
        command: "scripe check",
        outputKey: "tutorials.qualityGate.description",
      },
      {
        tabId: "run-gate",
        label: "Run Quality Gate",
        command: "scripe check --quick",
        outputKey: "tutorials.qualityGate.description",
      },
    ],
  },

  // ─── Procedural Step-by-Step Implementation Guide ───────────
  {
    type: "heading",
    level: 2,
    titleKey: "tutorials.qualityGate.title",
    id: "step-by-step-guide",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "tutorials.qualityGate.title",
            "contentKey": "tutorials.qualityGate.description",
            "code": "scripe lint",
            "codeLanguage": "bash",
            "codeFilename": "Stage 1: Linting"
      },
      {
            "titleKey": "tutorials.qualityGate.title",
            "contentKey": "tutorials.qualityGate.description",
            "code": "scripe format --check",
            "codeLanguage": "bash",
            "codeFilename": "Stage 2: Formatting"
      },
      {
            "titleKey": "tutorials.qualityGate.title",
            "contentKey": "tutorials.qualityGate.description",
            "code": "scripe build backend",
            "codeLanguage": "bash",
            "codeFilename": "Stage 3: Backend Build"
      },
      {
            "titleKey": "tutorials.qualityGate.title",
            "contentKey": "tutorials.qualityGate.description",
            "code": "scripe build frontend",
            "codeLanguage": "bash",
            "codeFilename": "Stage 4: Frontend Build"
      },
      {
            "titleKey": "tutorials.qualityGate.title",
            "contentKey": "tutorials.qualityGate.description",
            "code": "scripe check",
            "codeLanguage": "bash",
            "codeFilename": "Stage 5: Universal Gate"
      }
],
  },

  // ─── Best Practice Callout Alert ────────────────────────────
  {
    type: "info",
    variant: "success",
    titleKey: "tutorials.qualityGate.title",
    contentKey: "tutorials.qualityGate.description",
  },
];

registerPage({
  slug: "tutorials/quality-prepush-gate",
  titleKey: "tutorials.qualityGate.title",
  descriptionKey: "tutorials.qualityGate.description",
  category: "tutorials",
  order: 5,
  sections,
  relatedSlugs: ["tutorials/master-module-generation", "tutorials/database-crypto-migrations", "tutorials/studio-schema-canvas"],
  lastUpdated: "2026-10-23",
});
