import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  { type: "paragraph", contentKey: "apiReference.dataTransferApi.intro" },

  // ─── Base Config ──────────────────────────────────────────
  {
    type: "table",
    headers: ["Setting", "Value"],
    rows: [
      ["Base URL", "/api/v1/data-transfer"],
      ["API Version", "1.0 (DataTransferModuleRegistration)"],
      ["Auth Required", "Yes — Bearer JWT + [Authorize] + Tenant Context (No [AdminOnly])"],
      ["Permission Prefix", "datatransfer.* (jobs.*, presets.*, migrations.execute)"],
      ["Rate Limits", "per-user (100 req/min sliding) + export-heavy (5 req/min fixed)"],
      ["Upload Max Size", "26,214,400 bytes (25 MB) + X-Content-Type-Options: nosniff"],
    ],
  },
  {
    type: "info",
    variant: "warning",
    titleKey: "apiReference.dataTransferApi.authNoteTitle",
    contentKey: "apiReference.dataTransferApi.authNote",
  },

  // ─── Discovery & Smart Templates ──────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "apiReference.dataTransferApi.discoveryTitle",
    id: "discovery",
  },
  { type: "paragraph", contentKey: "apiReference.dataTransferApi.discoveryIntro" },
  {
    type: "api-table",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/data-transfer/entities",
        descriptionKey: "apiReference.dataTransferApi.epListEntitiesDesc",
        auth: "datatransfer.jobs.view",
        permission: "datatransfer.jobs.view",
      },
      {
        method: "GET",
        path: "/api/v1/data-transfer/entities/{entityKey}/descriptor",
        descriptionKey: "apiReference.dataTransferApi.epGetDescriptorDesc",
        auth: "datatransfer.jobs.view",
        permission: "datatransfer.jobs.view",
      },
      {
        method: "GET",
        path: "/api/v1/data-transfer/template",
        descriptionKey: "apiReference.dataTransferApi.epDownloadTemplateDesc",
        auth: "datatransfer.jobs.view",
        permission: "datatransfer.jobs.view",
      },
    ],
  },

  // ─── 4-Step Ingestion Pipeline ────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "apiReference.dataTransferApi.pipelineTitle",
    id: "pipeline",
  },
  { type: "paragraph", contentKey: "apiReference.dataTransferApi.pipelineIntro" },
  {
    type: "api-table",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/data-transfer/inspect",
        descriptionKey: "apiReference.dataTransferApi.epInspectDesc",
        auth: "datatransfer.jobs.manage",
        permission: "datatransfer.jobs.manage",
      },
      {
        method: "POST",
        path: "/api/v1/data-transfer/dry-run",
        descriptionKey: "apiReference.dataTransferApi.epDryRunDesc",
        auth: "datatransfer.jobs.manage",
        permission: "datatransfer.jobs.manage",
      },
      {
        method: "POST",
        path: "/api/v1/data-transfer/import",
        descriptionKey: "apiReference.dataTransferApi.epImportDesc",
        auth: "datatransfer.jobs.manage",
        permission: "datatransfer.jobs.manage",
      },
    ],
  },

  // ─── Formula-Safe Exports ─────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "apiReference.dataTransferApi.exportTitle",
    id: "exports",
  },
  { type: "paragraph", contentKey: "apiReference.dataTransferApi.exportIntro" },
  {
    type: "api-table",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/data-transfer/export",
        descriptionKey: "apiReference.dataTransferApi.epExportSyncDesc",
        auth: "datatransfer.jobs.manage",
        permission: "datatransfer.jobs.manage",
      },
      {
        method: "POST",
        path: "/api/v1/data-transfer/export/jobs",
        descriptionKey: "apiReference.dataTransferApi.epExportAsyncDesc",
        auth: "datatransfer.jobs.manage",
        permission: "datatransfer.jobs.manage",
      },
    ],
  },

  // ─── Saved Mapping Presets ────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "apiReference.dataTransferApi.presetsTitle",
    id: "presets",
  },
  { type: "paragraph", contentKey: "apiReference.dataTransferApi.presetsIntro" },
  {
    type: "api-table",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/data-transfer/presets",
        descriptionKey: "apiReference.dataTransferApi.epListPresetsDesc",
        auth: "datatransfer.presets.view",
        permission: "datatransfer.presets.view",
      },
      {
        method: "POST",
        path: "/api/v1/data-transfer/presets",
        descriptionKey: "apiReference.dataTransferApi.epSavePresetDesc",
        auth: "datatransfer.presets.manage",
        permission: "datatransfer.presets.manage",
      },
      {
        method: "POST",
        path: "/api/v1/data-transfer/presets/{id}/default",
        descriptionKey: "apiReference.dataTransferApi.epSetDefaultPresetDesc",
        auth: "datatransfer.presets.manage",
        permission: "datatransfer.presets.manage",
      },
      {
        method: "DELETE",
        path: "/api/v1/data-transfer/presets/{id}",
        descriptionKey: "apiReference.dataTransferApi.epDeletePresetDesc",
        auth: "datatransfer.presets.manage",
        permission: "datatransfer.presets.manage",
      },
    ],
  },

  // ─── Jobs & Artifacts ─────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "apiReference.dataTransferApi.jobsTitle",
    id: "jobs",
  },
  { type: "paragraph", contentKey: "apiReference.dataTransferApi.jobsIntro" },
  {
    type: "api-table",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/data-transfer/jobs",
        descriptionKey: "apiReference.dataTransferApi.epListJobsDesc",
        auth: "datatransfer.jobs.view",
        permission: "datatransfer.jobs.view",
      },
      {
        method: "GET",
        path: "/api/v1/data-transfer/jobs/{jobId}",
        descriptionKey: "apiReference.dataTransferApi.epGetJobDesc",
        auth: "datatransfer.jobs.view",
        permission: "datatransfer.jobs.view",
      },
      {
        method: "POST",
        path: "/api/v1/data-transfer/jobs/{jobId}/cancel",
        descriptionKey: "apiReference.dataTransferApi.epCancelJobDesc",
        auth: "datatransfer.jobs.manage",
        permission: "datatransfer.jobs.manage",
      },
      {
        method: "GET",
        path: "/api/v1/data-transfer/jobs/{jobId}/download/{artifactKind}",
        descriptionKey: "apiReference.dataTransferApi.epDownloadArtifactDesc",
        auth: "datatransfer.jobs.view",
        permission: "datatransfer.jobs.view",
      },
    ],
  },

  // ─── Verified Payload Examples ────────────────────────────
  {
    type: "tabs",
    tabs: [
      {
        label: "Dry-Run (POST)",
        language: "json",
        filename: "POST /api/v1/data-transfer/dry-run",
        code: `{
  "uploadId": "7f3c92b0-4f1b-4c28-9b7a-100293847561",
  "format": "xlsx",
  "entityKey": "crm.lead",
  "isMultiSheet": false,
  "mode": "Upsert",
  "onboardingMode": "StagedPendingInvite",
  "allowCreateMissingLookups": true,
  "timeZoneId": "Africa/Cairo",
  "mappings": [
    {
      "sourceColumnHeader": "Email",
      "targetFieldKey": "Email",
      "transform": { "trim": true, "normalizeEmailAddress": true }
    },
    {
      "sourceColumnHeader": "Phone",
      "targetFieldKey": "Phone",
      "transform": { "trim": true, "defaultCountryDialCode": "+20" }
    }
  ]
}`,
      },
      {
        label: "Execute Import (POST)",
        language: "json",
        filename: "POST /api/v1/data-transfer/import",
        code: `{
  "uploadId": "7f3c92b0-4f1b-4c28-9b7a-100293847561",
  "format": "xlsx",
  "originalFileName": "ahly-initial-leads-migration.xlsx",
  "entityKey": "crm.lead",
  "isMultiSheet": false,
  "mode": "Upsert",
  "onboardingMode": "StagedPendingInvite",
  "allowCreateMissingLookups": true,
  "timeZoneId": "Africa/Cairo",
  "mappings": [
    { "sourceColumnHeader": "Email", "targetFieldKey": "Email" }
  ],
  "runInBackground": false
}`,
      },
      {
        label: "Job Telemetry (GET)",
        language: "json",
        filename: "GET /api/v1/data-transfer/jobs/{jobId}",
        code: `{
  "id": "b8c4f1d2-6e92-4c4b-9e08-221133445566",
  "kind": "Import",
  "entityKey": "crm.lead",
  "isMultiSheet": false,
  "importMode": "Upsert",
  "onboardingMode": "StagedPendingInvite",
  "fileFormat": "xlsx",
  "originalFileName": "ahly-initial-leads-migration.xlsx",
  "status": "CompletedWithErrors",
  "totalRows": 120,
  "processedRows": 120,
  "progressPercent": 100,
  "validRows": 115,
  "committedRows": 115,
  "createdRows": 90,
  "updatedRows": 25,
  "rejectedRows": 5,
  "hasRejectedWorkbook": true,
  "hasExportWorkbook": false,
  "createdAt": "2026-11-14T10:00:00Z",
  "expiresAtUtc": "2026-11-15T10:00:00Z"
}`,
      },
      {
        label: "Save Preset (POST)",
        language: "json",
        filename: "POST /api/v1/data-transfer/presets",
        code: `{
  "entityKey": "crm.lead",
  "name": "Standard Lead Intake",
  "importMode": "Upsert",
  "isDefault": true,
  "mappings": [
    {
      "sourceColumnHeader": "Club Email",
      "targetFieldKey": "Email",
      "transform": { "trim": true, "lowercase": true }
    }
  ]
}`,
      },
    ],
  },

  // ─── Rate Limits & Operational Bounds ─────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "apiReference.dataTransferApi.rateLimitsTitle",
    id: "rate-limits",
  },
  { type: "paragraph", contentKey: "apiReference.dataTransferApi.rateLimitsIntro" },
  {
    type: "table",
    headers: ["Policy / Boundary", "Configured Threshold", "Applies To"],
    rows: [
      ["per-user limiter", "100 requests / 1-min sliding window", "All 16 /api/v1/data-transfer endpoints"],
      ["export-heavy limiter", "5 requests / 1-min fixed window", "template, export, export/jobs, jobs/{jobId}/download/{artifactKind}"],
      ["Upload size limit", "26,214,400 bytes (25 MB)", "POST /api/v1/data-transfer/inspect"],
      ["Synchronous import ceiling", "<= 250 rows (or <= 100 for OneTimeAutoPassword)", "POST /api/v1/data-transfer/import"],
      ["Quota lease TTL", "2 hours (TryReserveSlotsAsync / ReconcileReservationLeaseAsync)", "Import dry-run & execution"],
      ["Blob artifact TTL", "24 hours (rejected & export artifacts)", "GET /jobs/{jobId}/download/{artifactKind}"],
      ["Jobs pagination clamp", "page >= 1, pageSize clamped 1..100", "GET /api/v1/data-transfer/jobs"],
    ],
  },

  // ─── Error Codes ──────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "apiReference.dataTransferApi.errorCodesTitle",
    id: "error-codes",
  },
  { type: "paragraph", contentKey: "apiReference.dataTransferApi.errorCodesIntro" },
  {
    type: "table",
    headers: ["Error Code", "HTTP Status", "Meaning & Trigger Condition"],
    rows: [
      ["DataTransfer.TenantRequired", "400 / 422", "Orchestrator invoked without an active resolved tenant context"],
      ["DataTransfer.UnknownEntity", "404", "Requested entityTypeKey has no registered IEntityDataExchangeProvider"],
      ["DataTransfer.Forbidden", "403", "Caller lacks required datatransfer.* or target module/entity permission"],
      ["FeatureDisabled", "403", "Missing DataTransfer.* edition entitlement or target module feature flag"],
      ["DataTransfer.PresetNotFound", "404", "Requested saved mapping preset missing or outside caller tenant"],
      ["DataTransfer.QuotaExceeded", "400 / 422", "Tenant edition quota exceeded during TryReserveSlotsAsync reservation"],
      ["DataTransfer.OneTimePasswordLimit", "400 / 422", "Interactive sync import > 100 password-protected rows rejected"],
      ["DataTransfer.JobNotCancellable", "400 / 422", "Cancellation requested for an already terminal job state"],
      ["ValidationFailed", "400", "Null/empty multipart file on inspect or FluentValidation contract failure"],
      ["UNKNOWN_COLUMN", "422 (Row/Mapping)", "Mapped targetFieldKey hidden by FLS or absent from descriptor"],
      ["UNMAPPABLE_SYSTEM_COLUMN", "422 (Row/Mapping)", "Attempt to map read-only Id or ExportOnly/SystemGenerated column"],
      ["MASKED_SENTINEL", "422 (Row Diagnostic)", "Redacted sentinel placeholder detected by LooksLikeMaskedSentinel"],
      ["PARENT_ROW_FAILED", "422 (Cascade)", "Child row deferred in multi-sheet DAG with _CascadeParentRef diagnostic"],
    ],
  },
];

registerPage({
  slug: "api-reference/data-transfer-api",
  titleKey: "apiReference.dataTransferApi.title",
  descriptionKey: "apiReference.dataTransferApi.description",
  category: "api-reference",
  order: 10,
  sections,
  relatedSlugs: [
    "modules/data-transfer-overview",
    "commercial/data-exchange-studio",
  ],
  lastUpdated: "2026-11-14",
});
