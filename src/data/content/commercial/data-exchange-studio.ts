import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  { type: "paragraph", contentKey: "commercial.dataExchangeStudio.intro" },
  {
    type: "stats-strip-block",
    stats: [
      { value: "25 MB", labelKey: "commercial.dataExchangeStudio.statUploadCeiling" },
      { value: "17 Rules", labelKey: "commercial.dataExchangeStudio.statTransformRules" },
      { value: "250 Rows", labelKey: "commercial.dataExchangeStudio.statChunkSize" },
      { value: "10 Entities", labelKey: "commercial.dataExchangeStudio.statEntityProviders" },
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "commercial.dataExchangeStudio.valueTitle",
    id: "business-value",
  },
  {
    type: "feature-grid",
    columns: 3,
    items: [
      {
        icon: "check",
        titleKey: "commercial.dataExchangeStudio.featDryRunQuota",
        descriptionKey: "commercial.dataExchangeStudio.featDryRunQuotaDesc",
      },
      {
        icon: "globe",
        titleKey: "commercial.dataExchangeStudio.featMenaBilingual",
        descriptionKey: "commercial.dataExchangeStudio.featMenaBilingualDesc",
      },
      {
        icon: "workflow",
        titleKey: "commercial.dataExchangeStudio.featMultiSheetDag",
        descriptionKey: "commercial.dataExchangeStudio.featMultiSheetDagDesc",
      },
      {
        icon: "sliders",
        titleKey: "commercial.dataExchangeStudio.featCustomFieldsPresets",
        descriptionKey: "commercial.dataExchangeStudio.featCustomFieldsPresetsDesc",
      },
      {
        icon: "refresh",
        titleKey: "commercial.dataExchangeStudio.featPartialCommit",
        descriptionKey: "commercial.dataExchangeStudio.featPartialCommitDesc",
      },
      {
        icon: "shield",
        titleKey: "commercial.dataExchangeStudio.featEnterpriseSecurity",
        descriptionKey: "commercial.dataExchangeStudio.featEnterpriseSecurityDesc",
      },
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "commercial.dataExchangeStudio.tiersTitle",
    id: "editions",
  },
  { type: "paragraph", contentKey: "commercial.dataExchangeStudio.tiersIntro" },
  {
    type: "table",
    headers: ["Edition Tier", "Smart Templates & Export", "Bulk Import & Presets", "Multi-Sheet DAG Migration"],
    rows: [
      ["Platform Free", "Disabled", "Disabled", "Disabled"],
      ["Sports Starter", "Enabled", "Disabled", "Disabled"],
      ["Standard", "Enabled", "Enabled", "Disabled"],
      ["Sports Pro", "Enabled", "Enabled", "Disabled"],
      ["Sports Ultra", "Enabled", "Enabled", "Enabled"],
      ["Sports Enterprise", "Enabled", "Enabled", "Enabled"],
      ["Enterprise", "Enabled", "Enabled", "Enabled"],
    ],
  },
  {
    type: "cta-banner-block",
    titleKey: "commercial.dataExchangeStudio.ctaTitle",
    subtitleKey: "commercial.dataExchangeStudio.ctaSubtitle",
    primaryCtaKey: "commercial.dataExchangeStudio.ctaPrimary",
    primaryCtaHref: "/commercial/pricing-showcase",
    secondaryCtaKey: "commercial.dataExchangeStudio.ctaSecondary",
    secondaryCtaHref: "/technical/modules/data-transfer-overview",
  },
];

registerPage({
  slug: "commercial/data-exchange-studio",
  titleKey: "commercial.dataExchangeStudio.title",
  descriptionKey: "commercial.dataExchangeStudio.description",
  category: "commercial-modules",
  order: 22,
  sections,
  relatedSlugs: [
    "commercial/multi-tenancy",
    "commercial/custom-fields",
    "modules/data-transfer-overview",
  ],
  lastUpdated: "2026-11-15",
});
