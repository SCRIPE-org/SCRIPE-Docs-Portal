import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "modules.crm.settings.intro",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.settings.archTitle",
    id: "dual-tier-architecture",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.settings.archIntro",
  },
  {
    type: "table",
    headers: ["Settings Tier", "Storage Entity", "Target Audience", "Authorization & Scope"],
    rows: [
      [
        "Tenant Governance",
        "crm.crm_tenant_settings",
        "Entire Organization",
        "crm.pipelines.manage (Commercial Directors & Admins). Controls base currency, FX rates, and exit policies.",
      ],
      [
        "User Presentation",
        "crm.crm_user_preferences",
        "Individual Sales Rep",
        "crm.leads.read / crm.opportunities.read (Personalized display currency, board density, and notifications).",
      ],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.settings.fxEngineTitle",
    id: "triple-value-fx-engine",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.settings.fxEngineIntro",
  },
  {
    type: "table",
    headers: ["Component", "Field / Type", "Financial Invariant & Purpose"],
    rows: [
      [
        "Original Transaction",
        "EstimatedAmount (decimal) + CurrencyCode (string)",
        "The contractually agreed currency and amount entered by the sales representative (e.g. SAR 6,120,000).",
      ],
      [
        "Base Converted Value",
        "BaseAmount (decimal)",
        "Standardized pipeline valuation computed against tenant's base currency (e.g. USD 1,632,000) for cross-deal rollups.",
      ],
      [
        "Audit Snapshot",
        "FxRate (decimal) + FxTimestampUtc (DateTime)",
        "Immutable exchange rate snapshot recorded at transaction time, immune to historical currency market fluctuations.",
      ],
    ],
  },
  {
    type: "code",
    language: "csharp",
    filename: "src/Modules/CRM/CRM.Domain/Entities/CrmOpportunity.cs",
    code: `// Triple-Value Multi-Currency FX Snapshot Architecture
public decimal EstimatedAmount { get; set; }
public string CurrencyCode { get; set; } = "SAR";

public decimal BaseEstimatedAmount { get; set; }
public decimal FxConversionRate { get; set; } = 1.0m;
public DateTime FxRateSnapshotUtc { get; set; } = DateTime.UtcNow;`,
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.crm.settings.apiTitle",
    id: "settings-api-endpoints",
  },
  {
    type: "paragraph",
    contentKey: "modules.crm.settings.apiIntro",
  },
  {
    type: "table",
    headers: ["Method", "Endpoint Route", "Required Permission", "Description"],
    rows: [
      [
        "GET",
        "/api/v1/crm/settings",
        "crm.leads.read",
        "Retrieve unified CRM settings payload containing tenant governance settings, custom FX rates, and user preferences.",
      ],
      [
        "PUT",
        "/api/v1/crm/settings/tenant",
        "crm.pipelines.manage",
        "Update organization-wide governance rules, tenant base currency, exchange rates, and validation policies.",
      ],
      [
        "PUT",
        "/api/v1/crm/settings/user",
        "crm.leads.read",
        "Persist individual sales rep preferences (display currency, default board layout, compact view, notifications).",
      ],
    ],
  },
];

registerPage({
  slug: "modules/crm/settings-governance",
  titleKey: "modules.crm.settings.title",
  descriptionKey: "modules.crm.settings.description",
  category: "module-crm",
  order: 8,
  sections,
  relatedSlugs: [
    "modules/crm-overview",
    "modules/crm/pipeline-admin",
    "modules/crm/opportunities-kanban",
  ],
  lastUpdated: "2026-11-05",
});
