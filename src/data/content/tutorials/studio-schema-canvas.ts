// FILE-EXCEPTION: file length
import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Intro ──────────────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "tutorials.studioSchemaCanvas.intro",
  },

  // ─── Masterclass Simulator ──────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "tutorials.studioSchemaCanvas.title",
    tabs: [
      {
        tabId: "run-step-1",
        label: "Execute Primary Step",
        command: "scripe new-feature Tournament Tournament",
        outputKey: "tutorials.studioSchemaCanvas.description",
      },
      {
        tabId: "run-gate",
        label: "Run Quality Gate",
        command: "scripe check --quick",
        outputKey: "tutorials.studioSchemaCanvas.description",
      },
    ],
  },

  // ─── Procedural Step-by-Step Implementation Guide ───────────
  {
    type: "heading",
    level: 2,
    titleKey: "tutorials.studioSchemaCanvas.title",
    id: "step-by-step-guide",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "tutorials.studioSchemaCanvas.title",
            "contentKey": "tutorials.studioSchemaCanvas.description",
            "code": "scripe new-feature Tournament Tournament -p \"Title:string:required:max(100),StartDate:datetime\"",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Canvas Entity Creation"
      },
      {
            "titleKey": "tutorials.studioSchemaCanvas.title",
            "contentKey": "tutorials.studioSchemaCanvas.description",
            "code": "scripe new-feature Tournament Match -p \"TournamentId:guid:required,Score:string,ScheduledAt:datetime\"",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Relational Port Connection"
      },
      {
            "titleKey": "tutorials.studioSchemaCanvas.title",
            "contentKey": "tutorials.studioSchemaCanvas.description",
            "code": "builder.HasIndex(x => new { x.TournamentId, x.ScheduledAt })\n       .HasFilter(\"[IsDeleted] = 0\");",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Composite Index Generation"
      }
],
  },

  // ─── Best Practice Callout Alert ────────────────────────────
  {
    type: "info",
    variant: "success",
    titleKey: "tutorials.studioSchemaCanvas.title",
    contentKey: "tutorials.studioSchemaCanvas.description",
  },
];

registerPage({
  slug: "tutorials/studio-schema-canvas",
  titleKey: "tutorials.studioSchemaCanvas.title",
  descriptionKey: "tutorials.studioSchemaCanvas.description",
  category: "tutorials",
  order: 3,
  sections,
  relatedSlugs: ["tutorials/master-module-generation", "tutorials/database-crypto-migrations", "tutorials/studio-schema-canvas"],
  lastUpdated: "2026-10-23",
});
