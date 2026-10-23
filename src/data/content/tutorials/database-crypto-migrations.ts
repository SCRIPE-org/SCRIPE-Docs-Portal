// FILE-EXCEPTION: file length
import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  // ─── Intro ──────────────────────────────────────────────────
  {
    type: "paragraph",
    contentKey: "tutorials.dbCryptoMig.intro",
  },

  // ─── Masterclass Simulator ──────────────────────────────────
  {
    type: "interactive-terminal",
    titleKey: "tutorials.dbCryptoMig.title",
    tabs: [
      {
        tabId: "run-step-1",
        label: "Execute Primary Step",
        command: "scripe crypto rotate-key",
        outputKey: "tutorials.dbCryptoMig.description",
      },
      {
        tabId: "run-gate",
        label: "Run Quality Gate",
        command: "scripe check --quick",
        outputKey: "tutorials.dbCryptoMig.description",
      },
    ],
  },

  // ─── Procedural Step-by-Step Implementation Guide ───────────
  {
    type: "heading",
    level: 2,
    titleKey: "tutorials.dbCryptoMig.title",
    id: "step-by-step-guide",
  },
  {
    type: "step-guide",
    steps: [
      {
            "titleKey": "tutorials.dbCryptoMig.title",
            "contentKey": "tutorials.dbCryptoMig.description",
            "code": "public class PaymentCard : AuditableEntity\n{\n    [EncryptedField]\n    public string CardNumber { get; set; } = string.Empty;\n    [EncryptedField]\n    public string CVV { get; set; } = string.Empty;\n}",
            "codeLanguage": "csharp",
            "codeFilename": "Step 1: Domain Entity Encryption"
      },
      {
            "titleKey": "tutorials.dbCryptoMig.title",
            "contentKey": "tutorials.dbCryptoMig.description",
            "code": "scripe db add-migration AddEncryptedPaymentCard -m Billing -p PostgreSql\nscripe db add-migration AddEncryptedPaymentCard -m Billing -p SqlServer",
            "codeLanguage": "bash",
            "codeFilename": "Step 2: Provider Migrations"
      },
      {
            "titleKey": "tutorials.dbCryptoMig.title",
            "contentKey": "tutorials.dbCryptoMig.description",
            "code": "scripe crypto rotate-key\nscripe crypto re-encrypt --all",
            "codeLanguage": "bash",
            "codeFilename": "Step 3: Keyring Rotation"
      }
],
  },

  // ─── Best Practice Callout Alert ────────────────────────────
  {
    type: "info",
    variant: "success",
    titleKey: "tutorials.dbCryptoMig.title",
    contentKey: "tutorials.dbCryptoMig.description",
  },
];

registerPage({
  slug: "tutorials/database-crypto-migrations",
  titleKey: "tutorials.dbCryptoMig.title",
  descriptionKey: "tutorials.dbCryptoMig.description",
  category: "tutorials",
  order: 2,
  sections,
  relatedSlugs: ["tutorials/master-module-generation", "tutorials/database-crypto-migrations", "tutorials/studio-schema-canvas"],
  lastUpdated: "2026-10-23",
});
