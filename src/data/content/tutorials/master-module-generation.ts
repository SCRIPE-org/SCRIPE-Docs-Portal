// FILE-EXCEPTION: file length
import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Intro ──────────────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "tutorials.masterModuleGen.intro",
  },

  // ─── Masterclass Simulator ──────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "tutorials.masterModuleGen.title",
    tabs: [
      {
        tabId: "run-step-1",
        label: "Execute Primary Step",
        command: "scripe new-module Invoicing --workspace billing",
        outputKey: "tutorials.masterModuleGen.description",
      },
      {
        tabId: "run-gate",
        label: "Run Quality Gate",
        command: "scripe check --quick",
        outputKey: "tutorials.masterModuleGen.description",
      },
    ],
  },

  // ─── Procedural Step-by-Step Implementation Guide ───────────
  {
    type: "heading",
    level: 2,
    titleKey: "tutorials.masterModuleGen.title",
    id: "step-by-step-guide",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "tutorials.masterModuleGen.title",
            "contentKey": "tutorials.masterModuleGen.description",
            "code": "scripe new-module Invoicing --workspace billing --with-webhooks --idempotent",
            "codeLanguage": "bash",
            "codeFilename": "Step 1: Module Scaffolding"
      },
      {
            "titleKey": "tutorials.masterModuleGen.title",
            "contentKey": "tutorials.masterModuleGen.description",
            "code": "scripe new-feature Invoicing Invoice -p \"Title:string:required:max(120),Amount:decimal:required,Status:enum(Draft=0,Sent=1,Paid=2),DueDate:datetime\"",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Entity & CQRS Slice"
      },
      {
            "titleKey": "tutorials.masterModuleGen.title",
            "contentKey": "tutorials.masterModuleGen.description",
            "code": "scripe new-event Invoicing InvoicePaid -p \"InvoiceId:guid,AmountPaid:decimal,PaidAt:datetime\"",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Domain Event Wiring"
      },
      {
            "titleKey": "tutorials.masterModuleGen.title",
            "contentKey": "tutorials.masterModuleGen.description",
            "code": "scripe db add-migration InitialInvoicing -m Invoicing\nscripe db update -m Invoicing --no-build",
            "codeLanguage": "bash",
            "codeFilename": "Step 4: Relational Migrations"
      },
      {
            "titleKey": "tutorials.masterModuleGen.title",
            "contentKey": "tutorials.masterModuleGen.description",
            "code": "scripe new-page billing/invoices --permission Invoicing.Invoices.View",
            "codeLanguage": "bash",
            "codeFilename": "Step 5: Frontend MVVM Submodule"
      },
      {
            "titleKey": "tutorials.masterModuleGen.title",
            "contentKey": "tutorials.masterModuleGen.description",
            "code": "scripe check",
            "codeLanguage": "bash",
            "codeFilename": "Step 6: Universal Gate Verification"
      }
],
  },

  // ─── Best Practice Callout Alert ────────────────────────────
  {
    type: "info",
    variant: "success",
    titleKey: "tutorials.masterModuleGen.title",
    contentKey: "tutorials.masterModuleGen.description",
  },
];

registerPage({
  slug: "tutorials/master-module-generation",
  titleKey: "tutorials.masterModuleGen.title",
  descriptionKey: "tutorials.masterModuleGen.description",
  category: "tutorials",
  order: 1,
  sections,
  relatedSlugs: ["tutorials/master-module-generation", "tutorials/database-crypto-migrations", "tutorials/studio-schema-canvas"],
  lastUpdated: "2026-10-23",
});
