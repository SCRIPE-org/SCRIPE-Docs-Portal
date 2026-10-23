// FILE-EXCEPTION: file length
import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Intro ──────────────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "tutorials.crossModContracts.intro",
  },

  // ─── Masterclass Simulator ──────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "tutorials.crossModContracts.title",
    tabs: [
      {
        tabId: "run-step-1",
        label: "Execute Primary Step",
        command: "scripe new-event Invoicing InvoicePaid",
        outputKey: "tutorials.crossModContracts.description",
      },
      {
        tabId: "run-gate",
        label: "Run Quality Gate",
        command: "scripe check --quick",
        outputKey: "tutorials.crossModContracts.description",
      },
    ],
  },

  // ─── Procedural Step-by-Step Implementation Guide ───────────
  {
    type: "heading",
    level: 2,
    titleKey: "tutorials.crossModContracts.title",
    id: "step-by-step-guide",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "tutorials.crossModContracts.title",
            "contentKey": "tutorials.crossModContracts.description",
            "code": "public class Match : AuditableEntity\n{\n    // Logical cross-module reference to Venue module\n    public Guid LogicalVenueId { get; set; }\n}",
            "codeLanguage": "csharp",
            "codeFilename": "Step 1: Logical Reference"
      },
      {
            "titleKey": "tutorials.crossModContracts.title",
            "contentKey": "tutorials.crossModContracts.description",
            "code": "match.AddDomainEvent(new MatchScheduledEvent(match.Id, match.LogicalVenueId, match.ScheduledAt));\nawait _repository.UpdateAsync(match, ct);",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Raise Domain Event"
      },
      {
            "titleKey": "tutorials.crossModContracts.title",
            "contentKey": "tutorials.crossModContracts.description",
            "code": "public class MatchScheduledConsumer : INotificationHandler<MatchScheduledEvent>\n{\n    public async Task Handle(MatchScheduledEvent notification, CancellationToken ct)\n    {\n        // Idempotent venue reservation logic\n    }\n}",
            "codeLanguage": "csharp",
            "codeFilename": "Step 3: Idempotent Consumer"
      }
],
  },

  // ─── Best Practice Callout Alert ────────────────────────────
  {
    type: "info",
    variant: "success",
    titleKey: "tutorials.crossModContracts.title",
    contentKey: "tutorials.crossModContracts.description",
  },
];

registerPage({
  slug: "tutorials/cross-module-contracts",
  titleKey: "tutorials.crossModContracts.title",
  descriptionKey: "tutorials.crossModContracts.description",
  category: "tutorials",
  order: 4,
  sections,
  relatedSlugs: ["tutorials/master-module-generation", "tutorials/database-crypto-migrations", "tutorials/studio-schema-canvas"],
  lastUpdated: "2026-10-23",
});
