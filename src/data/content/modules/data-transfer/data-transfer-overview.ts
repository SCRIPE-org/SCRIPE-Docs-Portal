import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.intro" },
  {
    type: "info",
    variant: "warning",
    titleKey: "modules.dataTransfer.overview.infoTitle",
    contentKey: "modules.dataTransfer.overview.infoContent",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.archTitle",
    id: "architecture",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.archIntro" },
  {
    type: "feature-grid",
    columns: 2,
    items: [
      {
        icon: "layers",
        titleKey: "modules.dataTransfer.overview.featArchitecture",
        descriptionKey: "modules.dataTransfer.overview.featArchitectureDesc",
      },
      {
        icon: "file",
        titleKey: "modules.dataTransfer.overview.featSmartTemplates",
        descriptionKey: "modules.dataTransfer.overview.featSmartTemplatesDesc",
      },
      {
        icon: "refresh",
        titleKey: "modules.dataTransfer.overview.featNormalization",
        descriptionKey: "modules.dataTransfer.overview.featNormalizationDesc",
      },
      {
        icon: "check",
        titleKey: "modules.dataTransfer.overview.featDryRunQuota",
        descriptionKey: "modules.dataTransfer.overview.featDryRunQuotaDesc",
      },
      {
        icon: "workflow",
        titleKey: "modules.dataTransfer.overview.featTopologicalDag",
        descriptionKey: "modules.dataTransfer.overview.featTopologicalDagDesc",
      },
      {
        icon: "shield",
        titleKey: "modules.dataTransfer.overview.featOwaspFls",
        descriptionKey: "modules.dataTransfer.overview.featOwaspFlsDesc",
      },
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.domainTitle",
    id: "domain-model",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.domainIntro" },
  {
    type: "table",
    headers: ["Entity", "Schema & Table", "Base & Tenant Contract", "Key Persisted Columns"],
    rows: [
      [
        "DataTransferJob",
        "datatransfer.data_transfer_jobs",
        "AuditableEntity<Guid>, ITenantAwareEntity",
        "Kind, EntityKey, IsMultiSheet, ImportMode, OnboardingMode, FileFormat, Status, TotalRows, ProcessedRows, CommittedRows, CreatedRows, UpdatedRows, RejectedRows, QuotaResourceType, SourceBlobKey, RejectedBlobKey, ExportBlobKey, ExpiresAtUtc, RowVersion",
      ],
      [
        "SavedMappingPreset",
        "datatransfer.saved_mapping_presets",
        "AuditableEntity<Guid>, ITenantAwareEntity",
        "EntityKey, Name, ImportMode, MappingJson, IsDefault, RowVersion (Index: TenantId, EntityKey, Name)",
      ],
      [
        "ExternalLegacyKeyMap",
        "datatransfer.external_legacy_key_maps",
        "AuditableEntity<Guid>, ITenantAwareEntity",
        "EntityKey, ExternalKey, InternalEntityId (Composite indexes without cross-schema FKs)",
      ],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.pipelineTitle",
    id: "studio-pipeline",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.pipelineIntro" },
  {
    type: "step-guide",
    steps: [
      {
        titleKey: "modules.dataTransfer.overview.stepUpload",
        contentKey: "modules.dataTransfer.overview.stepUploadDesc",
        codeLanguage: "bash",
        codeFilename: "GET /api/v1/data-transfer/template + POST /api/v1/data-transfer/inspect",
        code: `# Download single-entity or topologically sorted multi-sheet workbook
GET /api/v1/data-transfer/template?entityKey=crm.lead&format=xlsx&locale=en&multiSheet=true

# Upload workbook for OWASP scan, staging & 3-tier header suggestions (<= 25 MB)
POST /api/v1/data-transfer/inspect
Content-Type: multipart/form-data (entityKey, multiSheet, file)`,
      },
      {
        titleKey: "modules.dataTransfer.overview.stepMap",
        contentKey: "modules.dataTransfer.overview.stepMapDesc",
        codeLanguage: "json",
        codeFilename: "DataExchangeColumnMapping + POST /api/v1/data-transfer/presets/{id}/default (initialPresetId)",
        code: `{
  "initialPresetId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "sourceColumnHeader": "Mobile Phone",
  "targetFieldKey": "PhoneNumber",
  "transform": {
    "trim": true,
    "canonicalizeNullTokens": true,
    "normalizeUnicodeCompatibility": true,
    "defaultCountryDialCode": "+20"
  }
}`,
      },
      {
        titleKey: "modules.dataTransfer.overview.stepDryRun",
        contentKey: "modules.dataTransfer.overview.stepDryRunDesc",
        codeLanguage: "csharp",
        codeFilename: "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/DataExchange/UserDataExchangeProvider.cs",
        code: `// Domain modules implement IEntityDataExchangeProvider without coupling to DataTransfer
public sealed partial class UserDataExchangeProvider(
    IdentityDbContext db,
    IPasswordHasher passwordHasher, ...
) : IEntityDataExchangeProvider
{
    public string EntityKey => "identity.user";
}`,
      },
      {
        titleKey: "modules.dataTransfer.overview.stepExecute",
        contentKey: "modules.dataTransfer.overview.stepExecuteDesc",
        codeLanguage: "json",
        codeFilename: "Rejected Workbook Diagnostic Columns (24h Blob TTL)",
        code: `{
  "diagnosticColumns": [
    "_RowNumber",
    "_ErrorCode",
    "_ErrorColumn",
    "_ErrorMessage",
    "_CascadeParentRef"
  ],
  "syncCutoffRows": 250,
  "oneTimeAutoPasswordCutoffRows": 100
}`,
      },
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.entitiesTitle",
    id: "entities",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.entitiesIntro" },
  {
    type: "table",
    headers: ["EntityKey", "Owning Module", "DAG Parent Keys", "RelatedMultiSheetEntityKeys & Notes"],
    rows: [
      ["crm.account", "CRM", "-", "5-sheet CRM DAG cluster (crm.account -> contact -> lead -> opportunity -> activity)"],
      ["crm.contact", "CRM", "crm.account", "5-sheet CRM DAG cluster + self-FK pass-2"],
      ["crm.lead", "CRM", "-", "5-sheet CRM DAG cluster; Quota (CRM.MaxLeads) & CustomFields (cf:*) aware"],
      ["crm.opportunity", "CRM", "crm.account, crm.lead", "5-sheet CRM DAG cluster; Quota (CRM.MaxOpportunities) & Account/Contact/Lead lookup"],
      ["crm.activity", "CRM", "crm.account, crm.lead, crm.opportunity", "5-sheet CRM DAG cluster; Insert-only; defers on parent cascade error"],
      ["identity.admin", "Identity", "-", "Standalone Identity entity (relatedMultiSheetEntityKeys: []); QuotaResourceTypes.Admin"],
      ["identity.user", "Identity", "-", "Standalone Identity entity (relatedMultiSheetEntityKeys: []); 3 onboarding modes (StagedPendingInvite default)"],
      ["party.organization", "PartyKernel", "-", "3-sheet PartyKernel cluster (shared QuotaResourceTypes.Party -> contact-point)"],
      ["party.person", "PartyKernel", "-", "3-sheet PartyKernel cluster (shared QuotaResourceTypes.Party); MENA Arabic & E.164 normalization"],
      ["party.contact-point", "PartyKernel", "party.person, party.organization", "3-sheet PartyKernel cluster; multi-parent lookup"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.normalizationTitle",
    id: "normalization",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.normalizationIntro" },
  {
    type: "table",
    headers: ["Property (DataExchangeTransformRule)", "Type", "Deterministic O(n) Behavior"],
    rows: [
      ["Trim", "bool", "Trims leading and trailing Unicode whitespace"],
      ["Uppercase", "bool", "Converts characters to invariant uppercase"],
      ["Lowercase", "bool", "Converts characters to invariant lowercase"],
      ["DefaultValue", "string?", "Supplies fallback value when cell resolves empty or null"],
      ["DateFormat", "string?", "Explicit date/time format pattern prioritized during parsing"],
      ["SourceTimeZoneId", "string?", "IANA or Windows source timezone normalized to UTC"],
      ["CanonicalizeNullTokens", "bool", "Maps N/A, null, NULL, and Arabic placeholders to null"],
      ["CollapseWhitespace", "bool", "Collapses repeated inline whitespace and converts NBSP cleanly"],
      ["NormalizeUnicodeCompatibility", "bool", "Applies FormKC normalization and removes hidden format chars"],
      ["StripArabicDiacritics", "bool", "Removes Arabic Tashkeel (\\u064B-\\u065F, \\u0670) and Tatweel (\\u0640)"],
      ["NormalizeArabicLetters", "bool", "Unifies Alef variants (أ/إ/آ/ٱ → ا), ى/ی → ي, and Persian ک → ك"],
      ["CaseMode", "None | Lower | Upper | Title", "Structured casing policy including Title Case normalization"],
      ["StripCurrencyAndGrouping", "bool", "Parses SAR/EGP/AED/USD/EUR symbols and grouping separators"],
      ["ConvertAccountingNegatives", "bool", "Converts (1,250.50) accounting notation to -1250.50"],
      ["DefaultCountryDialCode", "string?", "Normalizes local phone numbers to E.164 with dial prefix"],
      ["NormalizeEmailAddress", "bool", "Trims and normalizes email domain/local casing safely"],
      ["MultiValueDelimiter", "string?", "Splits, trims, and deduplicates delimited multi-value tokens"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.securityTitle",
    id: "security",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.securityIntro" },
  {
    type: "info",
    variant: "warning",
    titleKey: "modules.dataTransfer.overview.securityWarnTitle",
    contentKey: "modules.dataTransfer.overview.securityWarnContent",
  },
  {
    type: "table",
    headers: ["Safeguard / Mechanism", "Enforced Limit or Token", "Component"],
    rows: [
      ["Upload size cap", "25 MB (26,214,400 bytes)", "DataTransferController / OwaspSpreadsheetSecurityValidator"],
      ["Uncompressed ZIP ceiling", "100 MB across OpenXML entries", "OwaspSpreadsheetSecurityValidator"],
      ["Archive entry & ratio bounds", "Max 1,000 entries; max 100x compression ratio", "OwaspSpreadsheetSecurityValidator"],
      ["XML / XXE & macros", "DtdProcessing.Prohibit, XmlResolver = null, .xlsm blocked", "OwaspSpreadsheetSecurityValidator"],
      ["Formula injection neutralization", "Prefixes '= + - @ \\t \\r \\n' neutralized + BiDi stripped", "CsvFormulaGuard"],
      ["Hidden metadata sheet", "VeryHidden _scripe_meta sheet (SHA-256 SchemaFingerprint validated via TEMPLATE_FINGERPRINT_DRIFT)", "SpreadsheetStreamEngine (ClosedXML) & Orchestrator"],
      ["Temp blob retention & lease", "24h artifact TTL; 2h fail-closed TryReserveSlotsAsync lease + orphan recovery", "DataTransferArtifactCleanupJob / Orchestrator"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.governanceTitle",
    id: "governance",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.governanceIntro" },
  {
    type: "table",
    headers: ["Permission Key", "Provider", "Default Roles", "Scope"],
    rows: [
      [
        "datatransfer.jobs.view",
        "DataTransferPermissionProvider",
        "7 standard roles (incl. CRM_SALES_REP)",
        "View Entity Catalog, descriptors, templates, job status, artifacts",
      ],
      [
        "datatransfer.jobs.manage",
        "DataTransferPermissionProvider",
        "7 standard roles (incl. CRM_SALES_REP)",
        "Upload/inspect, dry-run, import, export, cancel active jobs",
      ],
      [
        "datatransfer.presets.view",
        "DataTransferPermissionProvider",
        "7 standard roles (incl. CRM_SALES_REP)",
        "List tenant saved column-mapping presets",
      ],
      [
        "datatransfer.presets.manage",
        "DataTransferPermissionProvider",
        "7 standard roles (incl. CRM_SALES_REP)",
        "Create, update, promote default, and delete mapping presets",
      ],
      [
        "datatransfer.migrations.execute",
        "DataTransferPermissionProvider",
        "6 roles (excludes CRM_SALES_REP)",
        "Execute multi-sheet topological tenant migrations",
      ],
    ],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "modules.dataTransfer.overview.tenantContextTitle",
    contentKey: "modules.dataTransfer.overview.tenantContextContent",
  },
  {
    type: "info",
    variant: "note",
    titleKey: "modules.dataTransfer.overview.recoveryTitle",
    contentKey: "modules.dataTransfer.overview.recoveryContent",
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.outboxTitle",
    id: "zero-coupling-outbox",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.outboxIntro" },
  {
    type: "table",
    headers: ["Integration Layer", "Decoupling Mechanism", "Guarantee"],
    rows: [
      [
        "Backend Domain Discovery",
        "IEntityDataExchangeProvider in Core (legacy EfCoreEntityDataExchangeProviderBase unused by current 10 providers)",
        "Zero cross-module .csproj references in DataTransfer.*.csproj; modules opt in via DI",
      ],
      [
        "Asynchronous Completion Outbox",
        "DataExchangeJobCompletedEvent persisted to datatransfer.outbox_messages on Completed / CompletedWithErrors",
        "Cancelled runs invoke DetachPendingOutboxMessages() so aborted jobs never notify subscribers",
      ],
      [
        "Frontend Operation Isolation",
        "@core/data-exchange (GenericCrudView entityTypeKey -> DataExchangeToolbarActions + StudioOverlay)",
        "Feature modules (CRM, Identity, PartyKernel) never import @modules/admin/data-transfer",
      ],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.adminSurfacesTitle",
    id: "admin-surfaces",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.adminSurfacesIntro" },
  {
    type: "table",
    headers: ["Route", "Surface & Edit Model", "Why It Works This Way & Available Actions"],
    rows: [
      [
        "/admin/data-exchange",
        "Entities Catalog (Auto-Discovered Read-Only Registry)",
        "Schemas, keys, and quotas come dynamically from DI IEntityDataExchangeProvider + Edition entitlements. Supports Launch Import Studio, dynamic Multi-Sheet Migration, Download Template, and Export Data.",
      ],
      [
        "/custom-fields",
        "Custom Fields (Tenant Schema Extension)",
        "Tenant custom fields created here auto-inject cf:* columns and OptionSet dropdowns into descriptors, Smart Templates, Dry-Run, Import, and Export without restarting or editing DataTransfer.",
      ],
      [
        "/admin/data-exchange/jobs",
        "Execution History (Monitor + Launch Studio)",
        "Records queued and synchronous runs initiated from any module toolbar or the Jobs Launch Studio CTA. Shows real API errors, DataExchangeTenantRequiredCard, cooperative Cancel, and Rejected/Export .xlsx download.",
      ],
      [
        "/admin/data-exchange/presets",
        "Saved Mapping Presets (Create, Default, Reuse, Delete)",
        "Saved during Step 2 (Column Mapping) or launched via Create Preset in Studio. Supports Use Preset in Import Studio (initialPresetId), Set as Default (POST /presets/{id}/default), and soft Delete.",
      ],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.dagComparisonTitle",
    id: "single-vs-multisheet",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.dagComparisonIntro" },
  {
    type: "table",
    headers: ["Dimension", "Single-Entity Import", "Multi-Sheet Topological Migration (DAG)"],
    rows: [
      [
        "Scope & Dependency Graph",
        "1 entity sheet (e.g., only crm.lead or only party.person)",
        "Connected cluster ordered by ParentEntityKeys or shared quota resource/feature: CRM 5-sheet, PartyKernel 3-sheet (Identity entities standalone)",
      ],
      [
        "UI Discovery Gates (4/4 Required)",
        "Requires DataTransfer.Import + datatransfer.jobs.manage + entity import permission",
        "Auto-enabled in useDataExchangeToolbarViewModel when datatransfer.migrations.execute, DataTransfer.MultiSheetMigration, supportsImport, and relatedMultiSheetEntityKeys.length >= 2 all pass",
      ],
      [
        "Key Resolution & Ordering",
        "Natural-key lookup, pre-commit Insert ExternalKey conflict guard, & pass-2 self-FK resolution inside 250-row chunks",
        "Kahn's TopologicalSortSheets executes parents before children, propagates sessionResolvedKeys across sheets, and persists per-chunk ExternalLegacyKeyMap (unique composite index)",
      ],
      [
        "Cascade Failure Handling",
        "Failed rows exported with _RowNumber, _ErrorCode, _ErrorColumn, _ErrorMessage",
        "Failed parent rows defer child rows via PARENT_ROW_FAILED and populate _CascadeParentRef inside the downloadable Rejected .xlsx",
      ],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.dynamicMatrixTitle",
    id: "dynamic-vs-hardcoded",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.dynamicMatrixIntro" },
  {
    type: "table",
    headers: ["Capability", "Classification", "Runtime Behavior vs Hardened Boundary"],
    rows: [
      [
        "Entity Catalog, cf:* Columns & OptionSet Dropdowns",
        "100% Dynamic",
        "Merged per request from DI providers, ICustomFieldBatchDataExchangeBridge, and live DB lookups (<= 5,000 dropdown rows) using backend displayNameEn/Ar first",
      ],
      [
        "Related Multi-Sheet DAG Cluster",
        "Dynamic Cluster Discovery",
        "ComputeRelatedMultiSheetEntityKeys traverses ParentEntityKeys and shared quota resource/feature edges dynamically filtered by caller PBAC and tenant Edition entitlements",
      ],
      [
        "PBAC, Editions, FLS & Quotas",
        "Dynamic Policy Enforcement",
        "IRequireFeature on all 8 queries, atomic relational IQuotaCounterService (fail-closed finite EnsureCounterAsync + TryReserveSlotsAsync / ReconcileReservationLeaseAsync), and IRestrictedFieldsResolver + BYOK confidential cf:* protection",
      ],
      [
        "17-Rule Normalizer & Security Blacklist",
        "Hardcoded Deterministic Engine",
        "O(n) SpreadsheetValueNormalizer (zero arbitrary user regexes) + DataExchangeSecurityPolicy blacklist + LooksLikeMaskedSentinel cannot be weakened by tenants",
      ],
      [
        "OWASP Container & Chunk Bounds",
        "Hardcoded Safety Ceilings",
        "25 MB upload, 100 MB uncompressed / 1,000 entries / 100x ZIP ratio, 250-row chunks/sync cap, 100-row OneTimePassword cap, 50,000 max rows, 24h artifact TTL",
      ],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.normalizationPipelineTitle",
    id: "normalization-pipeline",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.normalizationPipelineIntro" },
  {
    type: "table",
    headers: ["Stage", "Deterministic Operation", "Exact Transformation Scope"],
    rows: [
      ["Stage 1", "Unicode NFKC & Invisible Controls", "Normalizes FormKC compatibility glyphs and strips BiDi / zero-width format characters"],
      ["Stage 2", "Arabic-Indic & Persian Digits", "Normalizes Arabic-Indic (٠-٩) and Persian (۰-۹) digits plus decimal ٫ to ASCII before parsing"],
      ["Stage 3", "Canonical Null Placeholders", "Maps '-', '—', N/A, #N/A, null, NULL, and Arabic equivalents ('غير متاح', 'لا يوجد') to null"],
      ["Stage 4", "Trim & Whitespace Collapse", "Trims outer padding, converts NBSP to spaces, and collapses repeated inline whitespace"],
      ["Stage 5", "MENA Arabic Script Cleanup", "Strips Tashkeel (\\u064B-\\u065F, \\u0670) and Tatweel (\\u0640); unifies أ/إ/آ/ٱ → ا, ى/ی → ي, ک → ك"],
      ["Stage 6", "Structured CaseMode", "Applies None, Lower, Upper, or Title case policy deterministically"],
      ["Stage 7", "Currency & Accounting Numerics", "Strips SAR/EGP/AED/USD/EUR/GBP/% and converts accounting '(1,250.50)' or European decimals cleanly"],
      ["Stage 8", "Contact & Multi-Value Channels", "Normalizes emails (Trim + Lower), formats E.164 phones with DefaultCountryDialCode, deduplicates delimiters"],
      ["Stage 9", "Typed Parse, UTC & DefaultValue", "Applies DefaultValue fallback, parses DateFormat + IANA/Windows SourceTimeZoneId to UTC, rejects malformed cells"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "modules.dataTransfer.overview.editionsTitle",
    id: "editions",
  },
  { type: "paragraph", contentKey: "modules.dataTransfer.overview.editionsIntro" },
  {
    type: "table",
    headers: ["SCRIPE Edition", "DataTransfer.Access", "DataTransfer.Export", "DataTransfer.Import", "DataTransfer.MultiSheetMigration"],
    rows: [
      ["Platform Free", "false", "false", "false", "false"],
      ["Sports Starter", "true", "true", "false", "false"],
      ["Standard", "true", "true", "true", "false"],
      ["Sports Pro", "true", "true", "true", "false"],
      ["Sports Ultra", "true", "true", "true", "true"],
      ["Sports Enterprise", "true", "true", "true", "true"],
      ["Enterprise", "true", "true", "true", "true"],
    ],
  },
];

registerPage({
  slug: "modules/data-transfer-overview",
  titleKey: "modules.dataTransfer.overview.title",
  descriptionKey: "modules.dataTransfer.overview.description",
  category: "modules",
  order: 1,
  sections,
  relatedSlugs: [
    "api-reference/data-transfer-api",
    "commercial/data-exchange-studio",
    "modules/analytics-overview",
    "modules/work-management-overview",
  ],
  lastUpdated: "2026-11-15",
});
