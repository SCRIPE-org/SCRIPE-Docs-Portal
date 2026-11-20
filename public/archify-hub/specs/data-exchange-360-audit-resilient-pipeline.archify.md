# Why did `.xlsx` uploads return HTTP `500` and how does SCRIPE Data Exchange harden uploads, OWASP security, and 10-provider flows? {#data-exchange-360-audit-resilient-pipeline}

Cloud R2 credential errors inside `.env` crashed staging uploads while `OwaspSpreadsheetSecurityValidator` classified infrastructure errors as parse errors; **zero HTTP `500` responses** remain.[](source:dx_blob_cfg)

- `ResilientDevelopmentBlobStorage` rewinds upload streams and latches all five blob actions to `LocalBlobStorage` when cloud transport fails in Development.[](source:dx_blob_cfg)
- `SpreadsheetValidationException` separates malformed or hostile files (`422`) from storage outages (`503`) and sanitizes background `ErrorSummary` strings.[](source:dx_owasp_val)
- `DataExchangeOrchestrator` enforces fail-closed FLS and `cf:*` clearance on downloads while `IdempotencyBehavior` caches safe retries by stream `SHA-256`.[](source:dx_jobs_fls)
- All 10 `CRM`, `PartyKernel`, and `Identity` providers align natural keys, batch lookups, and quotas alongside Nexus `--nx-*` and RTL Studio UX.[](source:dx_fe_studio)

@answer scope="Data Exchange · 500 Fix · OWASP · 10 Providers"
@meta locale=en style=editorial quality_profile=showcase
@source dx_blob_cfg title="ResilientDevelopmentBlobStorage & LocalBlobStorage Hierarchy" url=https://docs.scripe.org/backend/blob-storage-configuration
@source dx_owasp_val title="OwaspSpreadsheetSecurityValidator & SpreadsheetValidationException" url=https://docs.scripe.org/security/owasp-spreadsheet-validator
@source dx_jobs_fls title="DataExchangeOrchestrator Artifact FLS & Ambient Context" url=https://docs.scripe.org/backend/data-exchange-orchestrator
@source dx_idem title="IdempotencyBehavior Stream SHA-256 & Response Caching" url=https://docs.scripe.org/backend/idempotency-behavior
@source dx_providers title="CRM, PartyKernel, Identity & CustomFields Providers" url=https://docs.scripe.org/backend/data-exchange-providers
@source dx_fe_studio title="Data Exchange Studio, Scoped Caches & Bilingual Portal" url=https://docs.scripe.org/frontend/data-exchange-studio

## How does the resilient upload pipeline eliminate `.xlsx` HTTP `500` crashes and retry `409` conflicts? {#resilient-upload-pipeline}

@sequence id=resilient-inspect-seq title="Resilient Upload Staging, Stream SHA-256 Idempotency & Deterministic 422/503 Mapping"
| actor studio | Studio Client | frontend |
| actor ctrl | Transfer API | backend |
| actor idem | Idempotency Gate | security |
| actor owasp | OWASP Validator | security |
| actor blob | Resilient Blob | cloud |
| actor local | Local FileHost | database |
| phase | 1. Seekable Buffering & Stream-Hashed Idempotency |
| studio | ctrl | POST /inspect (.xlsx + Idempotency-Key) | emphasis |
| ctrl | idem | Buffer Stream & Hash Tenant + Actor + SHA-256 | security |
| phase | 2. OWASP Inspection & Automatic Local Fallback |
| idem | owasp | Verify PK Magic, ZIP Ratio, XML & Macros | security |
| owasp | blob | Stage Verified Workbook Stream | emphasis |
| blob | local | Rewind Stream & Latch to FileHost on R2 Error | dashed |
| local | studio | 200 OK (Sheets, Samples & Cached Envelope) | return |

@steps id=resilient-inspect-steps
| rs_ctrl | Transfer API | Copies non-seekable multipart streams into memory before validation and applies rate limits. | resilient-inspect-seq | ctrl |
| rs_idem | Idempotency Gate | Hashes `ActorScope` and stream `SHA-256` and caches non-secret `Inspect` and `DryRun` replies. | resilient-inspect-seq | idem |
| rs_owasp | OWASP Validator | Throws `SpreadsheetValidationException` on `.xls`, macros, XXE, external `.rels`, or ZIP bombs. | resilient-inspect-seq | owasp |
| rs_blob | Resilient Blob | Catches cloud auth or socket errors in Development, logs once, and switches to `LocalBlobStorage`. | resilient-inspect-seq | blob |
| rs_local | Local FileHost | Preserves `staging/{tenantId}/` sub-paths while blocking rooted or `..` traversal paths. | resilient-inspect-seq | local |

Before this fix, `.env` `Storage__Provider=S3` overrode `appsettings.json` while `Path.GetFileName` flattened tenant folders in `LocalBlobStorage`.[](source:dx_blob_cfg)

| Failure Vector | Previous Behavior | Hardened Pipeline Behavior | Outcome |
| --- | --- | --- | --- |
| Unreachable R2 or S3 in Dev {#fv-r2} | `AwsS3BlobStorage` threw unhandled `500` {bad:500 Crash} | `ResilientDevelopmentBlobStorage` rewinds and latches to `LocalBlobStorage` | {good:200 OK} |
| Hierarchical `staging/{tenant}/` key {#fv-path} | `Path.GetFileName` stripped tenant folders | `ResolveSafeRelativePath` keeps subfolders and blocks `..` traversal | {good:Tenant-Isolated} |
| Legacy `.xls`, macro, XXE, or `.rels` {#fv-owasp} | Leaked `500` or truncated XML scan at `512` nodes | Full-stream scan throws `SpreadsheetValidationException` | {good:422 InvalidFile} |
| Cloud storage outage in Production {#fv-503} | Unhandled `HttpRequestException` returned `500` | `IsStorageTransportException` maps to `DataTransfer.StorageUnavailable` | {good:503 Retryable} |
| Network retry on `Inspect` or `DryRun` {#fv-idem} | `IsResponseCacheable = false` returned `409` {caution:409 Conflict} | `IsResponseCacheable = true` replays cached result; `ExecuteImport` stays single-shot | {good:Safe Replay} |

## How do OWASP spreadsheet checks, ambient worker context, and artifact FLS block data leaks? {#owasp-and-fls-security}

@workflow id=security-gate-flow title="7-Vector OWASP Upload Gate, Worker Ambient Context & Fail-Closed Artifact Clearance"
| lane upload_lane | Upload & Formula Defense |
| lane auth_lane | Worker Context & Download Clearance |
| up_file | Incoming File | external | upload_lane |
| owasp_chk | Safe PK, ZIP & XML? | security | upload_lane |
| reject_422 | 422 InvalidFile | security | upload_lane |
| csv_guard | Formula & Raw Redact | security | upload_lane |
| amb_ctx | Ambient Actor Scope | backend | auth_lane |
| fls_gate | Clear for FLS & cf? | security | auth_lane |
| allow_dl | Stream Artifact | backend | auth_lane |
| deny_403 | 403 Forbidden | security | auth_lane |
| up_file > owasp_chk | |
| owasp_chk > reject_422 | no | security |
| owasp_chk > csv_guard | yes | emphasis |
| csv_guard > amb_ctx | stage job | emphasis |
| amb_ctx > fls_gate | download | security |
| fls_gate > allow_dl | yes | emphasis |
| fls_gate > deny_403 | no | security |

@steps id=security-gate-steps
| sg_owasp | Safe PK, ZIP & XML? | Rejects OLE2 `.xls` bytes, `100 MB` ZIP bombs, DTDs, `vbaProject.bin`, ActiveX, and external `.rels`. | security-gate-flow | owasp_chk |
| sg_422 | 422 InvalidFile | Throws `SpreadsheetValidationException` so hostile or corrupt files return `422` without `500` leaks. | security-gate-flow | reject_422 |
| sg_csv | Formula & Raw Redact | Strips `UnicodeCategory.Format` chars before prefix checks and redacts restricted raw cells. | security-gate-flow | csv_guard |
| sg_amb | Ambient Actor Scope | Overrides `_permissionCache` in workers with snapshot `IsMembershipContext`, `RestrictedFields`, and `EffectivePermissions`. | security-gate-flow | amb_ctx |
| sg_fls | Clear for FLS & cf? | Fails closed when `ActorSnapshotJson` is null and blocks unauthorized FLS or `cf:*` downloads with `403`. | security-gate-flow | fls_gate |

Narrowing `IsFileParseException` to `SpreadsheetValidationException` ensures database or driver `InvalidOperationException` strings never leak into `DataTransferJob.ErrorSummary`.[](source:dx_owasp_val)

| Security Boundary | Threat Mitigated | Enforcement Mechanism | Status |
| --- | --- | --- | --- |
| Archive & XML Parser {#sb-xml} | `.xls` OLE2, ZIP bombs, VBA macros, XXE, external `.rels` | `BoundedZipEntryStream` + full `XmlReader` & `.rels` scan -> `422` | {good:7/7 Blocked} |
| Formula & Clipboard CSV {#sb-csv} | Zero-width / BiDi prefix bypass in Excel exports and credentials | `CsvFormulaGuard.Neutralize` + `sanitizeCsvFormulaCell` + `60s` clipboard wipe | {good:Neutralized} |
| Background Worker Scope {#sb-amb} | Home-tenant privilege bleed during membership-context jobs | `CurrentUserService` prioritizes `DataExchangeAmbientContext.Current` | {good:Scoped} |
| Membership Role Assign {#sb-adm} | Escalating roles via Home-Tenant `AdminRoles` on `identity.admin` | `AdminDataExchangeProvider.Assignability` resolves `db.TenantMemberships` only | {good:Least-Privilege} |
| Artifact Download FLS {#sb-dl} | Downloading exports or rejected `.xlsx` containing restricted `cf:*` | `ValidateDownloadArtifactFieldClearanceAsync` fails closed (`403`) | {good:Fail-Closed} |
| Background Auto-Password {#sb-pwd} | Unrecoverable credentials when `OneTimeAutoPassword` runs async | `Import` and `Jobs` reject `RunInBackground && OneTimeAutoPassword` (`422`) | {good:Guarded} |

## How do all 10 module providers, quota ledgers, and Frontend Studio/Portal surfaces stay synchronized? {#providers-and-frontend-architecture}

@architecture id=dx-system-arch title="10-Provider Backend Mesh, CustomFields Bridge & Context-Scoped Frontend MVVM"
| studio_ui | Studio Overlay & Dock | frontend |
| admin_hub | Admin Transfer Hub | frontend |
| fe_repo | Scoped Repository & Store | frontend |
| dx_orch | DataExchangeOrchestrator | backend |
| cf_bridge | CustomField Batch Bridge | backend |
| quota_svc | QuotaCounter & Usage | database |
| crm_prov | 5 CRM Providers | backend |
| party_prov | 3 Party Providers | backend |
| id_prov | 2 Identity Providers | security |
| studio_ui > fe_repo | MVVM hooks | emphasis |
| admin_hub > fe_repo | TenantRequired |
| fe_repo > dx_orch | REST + Blob | emphasis |
| dx_orch > cf_bridge | ValidateRef | security |
| dx_orch > quota_svc | Lease & Bill | emphasis |
| dx_orch > crm_prov | Batch Lookup |
| dx_orch > party_prov | 3-Sheet DAG |
| dx_orch > id_prov | Scoped Roles | security |

@steps id=dx-system-steps
| sys_fe | Scoped Repository & Store | Keys descriptor caches and `sessionStorage` job docks by `userId + tenantId` and clears on switch. | dx-system-arch | fe_repo |
| sys_orch | DataExchangeOrchestrator | Runs topological DAG dry-runs, bills `WasCreated` quota slots before post-commit skips, and re-orders keyset cursors. | dx-system-arch | dx_orch |
| sys_cf | CustomField Batch Bridge | Calls `IReferenceValidatingValueTypeHandler.ValidateReferenceAsync` during `ValidateBatchAsync` before entity writes. | dx-system-arch | cf_bridge |
| sys_crm | 5 CRM Providers | Resolves `crm.account` and `crm.contact` via `ResolvePartyIdsBatchAsync` without `.Take(2000)` caps. | dx-system-arch | crm_prov |
| sys_pty | 3 Party Providers | Supports composite keys on `party.contact-point`, polymorphic parent lookups, and `PartyTenantUsageStore` sync. | dx-system-arch | party_prov |
| sys_id | 2 Identity Providers | Validates blank emails under throttled invites, sets `PasswordLastChanged`, and isolates SMTP errors. | dx-system-arch | id_prov |

Replacing uncompiled Tailwind v3 slash-opacity utilities (`bg-warning/10`, `border-nx-accent/40`) with semantic HSL and `color-mix(...)` tokens restores crisp Dark, Light, and RTL rendering across all Studio and Hub views.[](source:dx_fe_studio)

| Domain Slice | Key Engineering Upgrades | Verification Gate |
| --- | --- | --- |
| `DataTransfer` & `Core` {#ds-core} | `ResilientDevelopmentBlobStorage`, `SpreadsheetValidationException`, Oracle `RAW(16)` fix, `WasCreated` quota billing, keyset `OrderByDescending` | `215/215` DataTransfer + `473/473` API + `171/171` Core {good:Passed} |
| `CRM` (`5` providers) {#ds-crm} | Batch `ResolvePartyIdsBatchAsync` (`> 2,000` rows), mixed-case `.ToLower()` fallback, custom stage keys, `CRM.Activities.Enabled` gate | `348/348` `CRM.Application.Tests` {good:Passed} |
| `PartyKernel` & `CustomFields` {#ds-pty} | Composite `party.contact-point` upsert, org cascade deferral, pre-commit `ValidateReferenceAsync`, `PartyTenantUsageStore` quota sync | `357/357` PartyKernel + `5/5` CF DataExchange {good:Passed} |
| `Identity` (`2` providers) {#ds-id} | Membership-only role assignability, blank-email guard, `PasswordLastChanged`, `13` single-type files `<= 300` lines | `Identity` DataExchange `3/3` + Structure Gate {good:Passed} |
| Frontend Studio & Portal {#ds-fe} | Tenant-scoped caches & `sessionStorage`, `decodeBlobErrorResponse`, `<bdi dir="ltr">`, `TenantRequired` gate, `.tsv`/`.csv`/`.xlsx` jobs | `72/72` Vitest (`368` tests), `0` `tsc`/`oxlint`/locale errors {good:Passed} |
| Live Unmocked Playwright E2E {#ds-e2e} | `.xlsx`/`.csv` inspect `200`, 4-step Studio, Party DAG, Sync/Async Export + Dock, EN/AR Dark/Light Hub, `7` OWASP `422` checks | `11/11` `dx-final-*.png` + UX & PM Sign-Off {good:Verified} |

- [x] `POST /api/v1/data-transfer/inspect` returns `200 OK` on real `.xlsx` and `.csv` uploads across `crm.lead`, `crm.account`, `party.person`, and `identity.user` with zero HTTP `500` responses.
- [x] All `7` negative OWASP spreadsheet vectors (`.xlsm`, OLE2 `.xls`, corrupt ZIP, embedded `vbaProject.bin`, XXE DTD, external `.rels`, invalid UTF-8 CSV) return `422 DataTransfer.InvalidFile` with sanitized messages.
- [x] Backend (`scripe arch-check --target backend` `0` errors) and Frontend (`scripe arch-check --target frontend` `0` errors, `scripe validate-locales` `0` errors, `scripe build frontend` `0` errors) pass all static and unit gates.
- [x] All `11` `1440x900` E2E screenshots (`dx-final-01` through `dx-final-11`) pass `dx-ux-expert` visual inspection and `dx-pm-lead` business sign-off.
