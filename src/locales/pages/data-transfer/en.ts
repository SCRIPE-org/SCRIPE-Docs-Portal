/**
 * SCRIPE Data Exchange Studio & DataTransfer Module Documentation Locales — EN
 * Covers Technical Module Overview, REST API Reference, and Commercial Showcase.
 */
export const en = {
  modules: {
    dataTransfer: {
      overview: {
        title: "Data Exchange Studio & DataTransfer Engine",
        description:
          "Enterprise multi-tenant bulk import, export, smart ClosedXML template generation, 17-rule MENA normalization, pre-flight quota verification, topological multi-sheet migration DAGs, and OWASP spreadsheet security.",
        intro:
          "SCRIPE Data Exchange Studio unites a sovereign Clean Architecture backend module (DataTransfer) with extensible Shared Core engines (Core.Application.DataExchange and Core.Infrastructure.DataExchange) and a 4-step full-viewport frontend Studio (@core/data-exchange). It replaces fragile manual CSV scripts with OWASP-hardened ingestion, deterministic linear-time normalization, atomic quota leasing, and fault-isolated chunked execution across SQL Server, PostgreSQL, and Oracle.",
        infoTitle: "Tenant Context Boundary & Shared Core Architecture",
        infoContent:
          "Data Exchange endpoints and DataTransferMenuProvider routes enforce RequiresTenantContext = true; calling orchestrator routes without a resolved tenant returns DataTransfer.TenantRequired (400/422) and renders DataExchangeTenantRequiredCard guiding Platform Super Admins to select a tenant. Shared spreadsheet streaming, formula neutralization, OWASP ZIP validation, and IEntityDataExchangeProvider live in Core so domain modules plug in with zero coupling.",
        archTitle: "3-Project Clean Architecture & AstraFlow Lock",
        archIntro:
          "In accordance with SCRIPE backend invariants, DataTransfer isolates domain entities, CQRS contracts/compile-time mappers, and multi-DB infrastructure across three strictly decoupled projects with dedicated datatransfer schema isolation and transactional Outbox/Inbox support.",
        featArchitecture: "Strict 3-Layer Modular Isolation",
        featArchitectureDesc:
          "DataTransfer.*.csproj carry zero project references to CRM, Identity, or PartyKernel. DataTransfer.Domain models DataTransferJob (emitting DataExchangeJobCompletedEvent to datatransfer.outbox_messages), SavedMappingPreset, and ExternalLegacyKeyMap; DataTransfer.Application dispatches 16 AstraFlow CQRS requests using [AstraGenerateMapping] DataTransferMaps; DataTransfer.Infrastructure persists to datatransfer across SQL Server, PostgreSQL, and Oracle.",
        featSmartTemplates: "ClosedXML Smart Templates & Field Guide",
        featSmartTemplatesDesc:
          "Generates localized .xlsx, .csv, and .tsv workbooks with @ Text formatting (OOXML NumberFormatId 49) to protect leading zeros and phone numbers, native Excel in-cell validation dropdowns (up to row 5,000), a bilingual Field Guide sheet, and a VeryHidden _scripe_meta sheet storing a SHA-256 SchemaFingerprint verified against drift on upload.",
        featNormalization: "17-Rule Linear-Time MENA Normalization",
        featNormalizationDesc:
          "SpreadsheetValueNormalizer runs in deterministic O(n) time with zero ReDoS-prone regexes: converting Arabic/Persian digits, stripping diacritics and BiDi controls, canonicalizing null placeholders, parsing SAR/EGP/AED/USD currency tokens and accounting negatives, normalizing E.164 phones, and blocking masked sentinels.",
        featDryRunQuota: "Pre-Flight Dry-Run & Hard Quota Leasing",
        featDryRunQuotaDesc:
          "Simulates schema, domain rules, Custom Fields, and license limits without writing a row. Before execution, TryReserveSlotsAsync acquires a 2-hour atomic relational quota lease (fail-closed finite EnsureCounterAsync across all 6 quota-bound entities) that ReconcileReservationLeaseAsync settles dynamically on completion, failure, or cancellation.",
        featTopologicalDag: "Topological Multi-Sheet DAG & 2-Pass Self-FK",
        featTopologicalDagDesc:
          "ComputeRelatedMultiSheetEntityKeys dynamically discovers caller-authorized multi-sheet DAG clusters (CRM 5-sheet, PartyKernel 3-sheet; Identity entities standalone) and enables Multi-Sheet Migration automatically in DataExchangeToolbarActions and EntitiesCatalogView. TopologicalSortSheets orders parent-child tabs, ExternalLegacyKeyMap resolves legacy keys per chunk, and 2-pass self-FK resolution connects in-sheet hierarchies.",
        featOwaspFls: "OWASP Upload Defense, FLS Redaction & BYOK",
        featOwaspFlsDesc:
          "OwaspSpreadsheetSecurityValidator enforces 25 MB uploads, 100 MB uncompressed / 1,000-entry / 100x ZIP bounds, macro blocking, DTD prohibition, HTML sanitization, and CsvFormulaGuard apostrophe neutralization alongside [AstraSensitive], IRestrictedFieldsResolver filtering, and confidential cf:* tenant BYOK encryption/decryption.",
        domainTitle: "Domain Aggregate Roots & Persistence Schema",
        domainIntro:
          "All persistence entities inherit AuditableEntity<Guid> and implement ITenantAwareEntity, enforcing automatic query filters and multi-provider migrations across SQL Server, PostgreSQL, and Oracle inside the datatransfer schema.",
        pipelineTitle: "4-Step Full-Viewport Studio Pipeline",
        pipelineIntro:
          "DataExchangeStudioOverlay orchestrates end-to-end ingestion from initial template download or OWASP file inspection through declarative transform configuration, zero-write Dry-Run verification, and chunked synchronous or queued background execution.",
        stepUpload: "Step 1 — Template Download & OWASP Inspection",
        stepUploadDesc:
          "Download a smart single-entity or multi-sheet template or upload an existing .xlsx, .csv, or .tsv file (max 25 MB). InspectUploadAsync validates magic bytes, strips malicious markup, reads headers and 5 sample rows, and runs 3-tier header matching (exact, alias, Levenshtein >= 0.72).",
        stepMap: "Step 2 — Column Mapping, Presets & Transform Rules",
        stepMapDesc:
          "Bind file headers to descriptor columns and dynamically discovered Custom Fields (cf:* via ICustomFieldBatchDataExchangeBridge), attach 17-rule DataExchangeTransformRule policies, promote default tenant presets via POST /presets/{id}/default, or launch Studio pre-loaded with initialPresetId while canonical @core/ui/confirmation-dialog guards unsaved exits, job cancellations, and preset deletions.",
        stepDryRun: "Step 3 — Pre-Flight Dry-Run & Hard Quota Check",
        stepDryRunDesc:
          "DryRunAsync validates every row across type parsers, lookup integrity, custom field rules, and license quotas before touching database tables, reporting exact valid/invalid counts, estimated inserts vs updates, and sync eligibility (<= 250 rows).",
        stepExecute: "Step 4 — Partial-Commit Execution & Rejected Workbook",
        stepExecuteDesc:
          "Imports <= 250 rows synchronously (unless RunInBackground is set or OneTimeAutoPassword <= 100 applies) and queues larger batches with orphaned Running job lease recovery. Each 250-row chunk isolates failures, persists ExternalLegacyKeyMaps (guarded by a unique composite index and pre-commit EXTERNAL_KEY_CONFLICT check), and exports rejected rows with _RowNumber, _ErrorCode, _ErrorColumn, _ErrorMessage, and _CascadeParentRef (24h TTL).",
        entitiesTitle: "Registered Entity Providers & Extensibility",
        entitiesIntro:
          "Ten domain providers ship out of the box across CRM, Identity, and PartyKernel, and any new module can join the Studio by implementing IEntityDataExchangeProvider directly (the legacy EfCoreEntityDataExchangeProviderBase helper is deprecated/unused by production providers).",
        normalizationTitle: "Declarative 17-Rule Transform Contract",
        normalizationIntro:
          "Every DataExchangeColumnMapping optionally carries a DataExchangeTransformRule record executed cleanly in linear time prior to strict type parsing and validation.",
        securityTitle: "OWASP Ceilings, Hard Field Denylist & FLS",
        securityIntro:
          "Security controls operate identically across API uploads, background workers (via DataExchangeAmbientContext restored from ActorSnapshotJson), and formula-safe exports.",
        securityWarnTitle: "Credential & System Field Immutability",
        securityWarnContent:
          "DataExchangeSecurityPolicy hard-blocks password hashes, security stamps, API keys, TOTP secrets, audit columns, RowVersion, and any member carrying [AstraSensitive] or [AstraRedact]. Sentinel tokens (such as redacted placeholders) are detected by LooksLikeMaskedSentinel and never overwrite live values during Update/Upsert.",
        governanceTitle: "PBAC Permissions, Feature Flags & Workspace Menu",
        governanceIntro:
          "DataTransferPermissionProvider (7 standard roles including CRM_SALES_REP; 6 roles excluding CRM_SALES_REP for migrations.execute), DataTransferFeatureProvider, DataTransferMenuProvider (RequiresTenantContext = true), and DataTransferDevDataSeeder (Order = 155) enforce [Authorize] + [PermissionRequired] without [AdminOnly] and mount Entity Catalog, Execution History, and Saved Mapping Presets on GenericCrudView with Showing 0-0 of 0 results pagination hardening.",
        tenantContextTitle: "Tenant-Scoped Execution & Platform Super Admin Flow",
        tenantContextContent:
          "Every entity, job, preset, and ExternalLegacyKeyMap is tenant-scoped; sovereign platform tables are blocked by DataExchangeSecurityPolicy. When logged in at global Platform level, Platform Super Admins simply pick a target tenant via the header Tenant Switcher (or follow the DataExchangeTenantRequiredCard banner) so the Administration → Data Exchange routes activate safely.",
        recoveryTitle: "Safety Model: Pre-Flight Dry-Run, Partial Chunk Commits & Cooperative Cancel (No Global Rollback)",
        recoveryContent:
          "DataTransfer intentionally omits a destructive post-completion global rollback job that could revert concurrent edits. Instead, DryRunAsync catches validation/quota issues before any write; ExecuteImport commits isolated 250-row chunks and emits a downloadable Rejected .xlsx (_RowNumber, _ErrorCode, _ErrorColumn, _ErrorMessage, _CascadeParentRef); and POST /jobs/{id}/cancel reconciles unused quota via ReconcileReservationLeaseAsync while calling DetachPendingOutboxMessages().",
        outboxTitle: "Zero-Coupling Plugin Architecture & Outbox Integration",
        outboxIntro:
          "DataTransfer discovers domain entities via Core abstractions and communicates completion asynchronously through its module Outbox — never referencing sibling module assemblies on backend or frontend.",
        adminSurfacesTitle: "Why Entity Catalog Is Read-Only & How Every Surface Works",
        adminSurfacesIntro:
          "Operators often wonder why /admin/data-exchange has no manual 'Add Entity' button: entity providers come dynamically from backend DI and custom columns come from /custom-fields, while Jobs and Presets are populated directly from Data Exchange Studio workflows.",
        dagComparisonTitle: "Single-Entity Import vs Multi-Sheet Topological Migration (DAG)",
        dagComparisonIntro:
          "Both modes share the same OWASP, normalization, and 250-row chunk engine, while Multi-Sheet Migration unlocks automatically via ComputeRelatedMultiSheetEntityKeys when a module cluster spans two or more authorized parent-child entities.",
        dynamicMatrixTitle: "Dynamic Runtime Behavior vs Hardcoded Security Boundaries",
        dynamicMatrixIntro:
          "Schema, custom fields, permissions, quotas, and cluster discovery adapt dynamically per tenant and caller, whereas security ceilings and linear-time normalization remain hardcoded against abuse.",
        normalizationPipelineTitle: "9-Stage Deterministic Linear-Time O(n) Execution Order",
        normalizationPipelineIntro:
          "Enabled DataExchangeTransformRule toggles execute sequentially in deterministic O(n) passes before strict type parsing so MENA scripts, currencies, phone numbers, and timestamps clean consistently across preview, dry-run, and worker commits.",
        editionsTitle: "Edition Entitlement Matrix (EditionSeeder)",
        editionsIntro:
          "Capability availability resolves dynamically through the Entitlements engine based on tenant subscription edition tiers.",
      },
    },
  },
  apiReference: {
    dataTransferApi: {
      title: "Data Exchange Studio API",
      description:
        "Complete REST API reference for SCRIPE Data Exchange Studio (/api/v1/data-transfer): entity descriptors, smart templates, OWASP inspection, dry-run simulation, import/export, mapping presets, and job telemetry.",
      intro:
        "The DataTransferController exposes 16 REST endpoints under /api/v1/data-transfer (API v1.0) dispatched exclusively through AstraFlow Mediator. All endpoints return standard Result<T> envelopes with RFC-7807 problem details on validation, permission, feature, or quota failures.",
      authNoteTitle: "Authentication, Tenant Resolution & Rate Limits",
      authNote:
        "Every endpoint requires [Authorize] and endpoint-level [PermissionRequired(\"datatransfer.*\")] alongside an active tenant context — class-level [AdminOnly] was intentionally removed so all 7 authorized roles including CRM_SALES_REP operate seamlessly (6 roles excluding CRM_SALES_REP for migrations.execute; missing tenant yields DataTransfer.TenantRequired; unknown entity keys return DataTransfer.UnknownEntity 404). Enforces per-user (100 req/min) and export-heavy (5 req/min) limits with X-Content-Type-Options: nosniff.",
      discoveryTitle: "Entity Discovery, Descriptors & Smart Templates",
      discoveryIntro:
        "Inspect caller-authorized entities, retrieve dynamic column descriptors merged with Custom Fields (cf:*) and Field-Level Security redactions, and download formatted templates.",
      epListEntitiesDesc:
        "Lists all registered Data Exchange entities filtered by caller view permissions and tenant edition features, including topologically ordered relatedMultiSheetEntityKeys, remaining quota slots, and import/export capability flags.",
      epGetDescriptorDesc:
        "Returns the effective DataExchangeEntityDescriptor for an entity, caller-authorized relatedMultiSheetEntityKeys DAG cluster, restricted FLS field keys, import/export feature flags, and live quota usage/reservation counters.",
      epDownloadTemplateDesc:
        "Streams a localized (.xlsx, .csv, or .tsv) single-entity or topologically ordered multi-sheet template containing @ Text column formats, Excel dropdown validations, Field Guide, and hidden _scripe_meta metadata.",
      pipelineTitle: "4-Step Import Ingestion Pipeline",
      pipelineIntro:
        "Stage validated uploads, run zero-write simulations against live lookup tables and quotas, and execute partial-commit imports synchronously (<= 250 rows) or in the background worker.",
      epInspectDesc:
        "Accepts multipart/form-data (.xlsx, .csv, .tsv up to 25 MB / 26,214,400 bytes), enforces OWASP container/XXE/macro checks, stages the sanitized file in blob storage, and returns sheets, headers, 5 sample rows, and suggested column mappings.",
      epDryRunDesc:
        "Simulates schema validation, 17-rule transforms, custom field batch checks, lookup resolution, and hard license quota limits against a staged UploadId without persisting database changes.",
      epImportDesc:
        "Executes a single-entity or multi-sheet topological import with 2-hour TryReserveSlotsAsync / ReconcileReservationLeaseAsync quota leasing, 250-row partial-commit chunks, optional identity onboarding modes, rejected workbook generation, and DataExchangeJobCompletedEvent Outbox emission.",
      exportTitle: "Formula-Safe Streaming Exports",
      exportIntro:
        "Generate on-demand or background workbook exports filtered automatically by tenant isolation, DataScope, and IRestrictedFieldsResolver FLS policies with CsvFormulaGuard neutralization.",
      epExportSyncDesc:
        "Streams a formula-neutralized, FLS-redacted .xlsx, .csv, or .tsv export workbook directly in the HTTP response and records a completed audit job.",
      epExportAsyncDesc:
        "Enqueues a heavy export job for background worker rendering into 24h-TTL blob storage and immediately returns HTTP 202 Accepted with the DataTransferJobDto tracker.",
      presetsTitle: "Saved Column-Mapping Presets",
      presetsIntro:
        "Manage reusable tenant-scoped column mappings and per-column transform rule configurations.",
      epListPresetsDesc:
        "Lists tenant-scoped saved mapping presets, optionally filtered by entityKey or search term.",
      epSavePresetDesc:
        "Creates a new mapping preset or updates an existing preset owned by the current tenant (persisted cleanly via DataTransferMaps compile-time projection).",
      epSetDefaultPresetDesc:
        "Atomically promotes a tenant-owned mapping preset to default for its entityKey, demoting sibling defaults and logging DATA_EXCHANGE_PRESET_DEFAULT_SET.",
      epDeletePresetDesc:
        "Soft-deletes a tenant-owned mapping preset and returns HTTP 204 No Content.",
      jobsTitle: "Job History, Cancellation & Artifact Downloads",
      jobsIntro:
        "Monitor queued background transfers via ProcessedRows and ProgressPercent telemetry, cancel active runs with automatic quota lease reconciliation, and download rejected or exported workbooks.",
      epListJobsDesc:
        "Returns paginated DataTransferJobDto records for the current tenant (page >= 1, pageSize clamped 1..100), filterable by entityKey, search, and DataTransferJobStatus.",
      epGetJobDesc:
        "Retrieves full execution metrics, row counters, artifact flags, and UTC timestamps for a single Data Transfer job.",
      epCancelJobDesc:
        "Signals cooperative cancellation for a queued or running job, updates terminal status, reconciles unused quota lease slots, and writes an immutable security audit event.",
      epDownloadArtifactDesc:
        "Streams either the error-annotated rejected workbook (artifactKind = rejected) or completed background export file (artifactKind = export) within its 24-hour blob retention window.",
      rateLimitsTitle: "Payload & Rate-Limit Safeguards",
      rateLimitsIntro:
        "Summary of enforced request size limits, sliding/fixed rate limit policies, synchronous vs async cutoffs, and diagnostic download retention bounds.",
      errorCodesTitle: "Canonical Error Codes & HTTP Mapping",
      errorCodesIntro:
        "AstraFlow.AspNetCore translates handler Result<T> failures cleanly into standardized HTTP responses without throwing business exceptions.",
    },
  },
  commercial: {
    dataExchangeStudio: {
      title: "SCRIPE Data Exchange Studio",
      description:
        "Onboard entire organizations, contacts, CRM pipelines, and staff rosters in minutes with MENA-aware normalization, zero-risk Dry-Run simulation, and enterprise security.",
      intro:
        "Migrating spreadsheets into multi-tenant enterprise software usually means brittle CSV scripts, broken Arabic encodings, mangled phone leading zeros, and partial imports that corrupt relational integrity. SCRIPE Data Exchange Studio turns spreadsheet onboarding and reporting into a guided, reversible, enterprise-safe studio built directly into your operations portal.",
      statUploadCeiling: "OWASP-Scanned Workbook Upload Limit",
      statTransformRules: "Built-In Linear-Time Cleanup Rules",
      statChunkSize: "Fault-Isolated Commit Chunk Size",
      statEntityProviders: "Ready-to-Use CRM, Identity & Party Entities",
      valueTitle: "Why Operations & Onboarding Teams Choose Data Exchange Studio",
      featDryRunQuota: "Zero-Risk Pre-Flight Dry-Run",
      featDryRunQuotaDesc:
        "Preview exact valid rows, new inserts vs updates, lookup matches, and license quota consumption before a single database record is modified.",
      featMenaBilingual: "MENA & Bilingual Spreadsheet Intelligence",
      featMenaBilingualDesc:
        "Automatically converts Arabic/Persian Eastern digits, cleans diacritics and hidden directional markers, normalizes SAR/EGP/AED/USD amounts, protects phone leading zeros with @ Text formatting, and speaks Arabic and English natively.",
      featMultiSheetDag: "One-Workbook Multi-Sheet Migration",
      featMultiSheetDagDesc:
        "Import parent organizations, people, CRM accounts, contacts, leads, opportunities, and activities in a single multi-tab Excel file while topological ordering guarantees referential integrity.",
      featCustomFieldsPresets: "Custom Fields & One-Click Mapping Presets",
      featCustomFieldsPresetsDesc:
        "Every tenant Custom Field is discovered automatically for mapping and validation. Save team mapping presets once and reuse vendor or legacy ERP layouts effortlessly.",
      featPartialCommit: "Partial-Commit & Instant Error Workbooks",
      featPartialCommitDesc:
        "Valid rows commit immediately instead of failing a 10,000-row file over three typos. Rejected rows export into a ready-to-fix Excel sheet highlighting the exact row, column, error code, and cascaded parent dependency.",
      featEnterpriseSecurity: "Zero-Trust OWASP & Field-Level Protection",
      featEnterpriseSecurityDesc:
        "Rejects macro workbooks, XXE payloads, ZIP bombs, and spreadsheet formula injection while preventing password hashes, tokens, or FLS-restricted columns from ever entering or leaving a workbook.",
      tiersTitle: "Capabilities by SCRIPE Edition",
      tiersIntro:
        "Formula-safe exports and smart templates launch right on Sports Starter, full import automation unlocks on Standard and Sports Pro, and multi-sheet topological tenant migration scales cleanly on Sports Ultra and Enterprise tiers.",
      ctaTitle: "Accelerate Customer & Club Onboarding",
      ctaSubtitle:
        "Explore SCRIPE licensing tiers or dive into the clean DataTransfer architecture and REST API specification.",
      ctaPrimary: "View Pricing & Editions",
      ctaSecondary: "Explore Technical Architecture",
    },
  },
};
