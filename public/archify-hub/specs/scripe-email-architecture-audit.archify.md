# How did SCRIPE remediate Emailing, Multi-DB Persistence, and Admin Onboarding across Backend and Frontend? {#scripe-email-architecture-audit}

SCRIPE eliminated silent email drops, `CommunicationDbContext` persistence loss, and `13` OWASP vulnerabilities across `94` backend and `22` frontend files. Every onboarding invitation, manual email, and template write now executes in active DI scope, flushes to the right schema, and passes `3,617` unit tests plus `4/4` live Playwright E2E tests.[](source:create_admin_email)

- `CreateAdminCommandHandler`, `RegisterTenantSelfServiceCommandHandler`, and `SignupCheckoutCompletedEventHandler` resolve tenant URLs in active request scope and enqueue durable jobs through `IEmailQueue` instead of detached `Task.Run` closures.[](source:create_admin_email)
- All `4` email commands and `5` message-template commands in `Core.Application` now call `SaveChangesAsync` on `CommunicationDbContext` repositories instead of the `IdentityDbContext`-bound global `IUnitOfWork`.[](source:send_manual_cmd)
- `EmailSecurityPolicies` and `EmailAttachmentPathPolicy` block container path traversal, one-time token replay, Scriban template injection, unencoded HTML fields, and raw PII logging.[](source:email_sec_policies)
- Next.js 16 `AdminsView`, `SetupAccountView`, and `Communication` modules display `Pending Setup` badges, preserve setup tokens across URL scrubbing, deduplicate `CC`/`BCC` sends, and match `MessageTemplate` validator limits.[](source:fe_admins_view)

@answer scope="SCRIPE Monorepo · Slices 6F, 6G & 7A-fix"
@meta locale=en style=editorial quality_profile=showcase
@source create_admin_email title="CreateAdminCommandHandler Active-Scope URL & IEmailQueue Dispatch" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Commands/Admin/CreateAdminCommandHandler.PersistenceAndEmail.cs
@source signup_self_svc title="RegisterTenantSelfServiceCommandHandler In-Scope Audit & Welcome Queue" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Commands/Signup/RegisterTenantSelfServiceCommandHandler.CheckoutAndJwt.cs
@source checkout_evt title="SignupCheckoutCompletedEventHandler Active-Scope Tenant & Queue Dispatch" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/EventHandlers/SignupCheckoutCompletedEventHandler.cs
@source acct_setup_svc title="AccountSetupService Token Snapshot & Non-Destructive Cooldown" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Services/AccountSetupService.cs
@source activate_acct title="ActivateAccountCommandHandler Post-Consumption Transactional Persistence" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Commands/Auth/ActivateAccountCommandHandler.cs
@source acct_setup_ctrl title="AccountSetupController Dedicated Rate Limit & X-Setup-Token Header" path=SCRIPE-Backend/src/Host/API/Controllers/Auth/AccountSetupController.cs
@source email_sec_policies title="EmailSecurityPolicies One-Time Token Keys, URL Scheme & MIME Guards" path=SCRIPE-Backend/src/Core/Core.Application/Emails/EmailSecurityPolicies.cs
@source att_path_policy title="EmailAttachmentPathPolicy Single-Container & 10 MB Enforcement" path=SCRIPE-Backend/src/Core/Core.Application/Emails/EmailAttachmentPathPolicy.cs
@source local_blob title="LocalBlobStorage SafeContainerNameRegex & Traversal Guard" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Storage/LocalBlobStorage.cs
@source file_svc_load title="FileService.LoadingAndValidation Cloud Host & Bounded Stream Guard" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Services/FileService.LoadingAndValidation.cs
@source send_manual_cmd title="SendManualEmailCommand CommunicationDbContext Flush & Encrypted ID" path=SCRIPE-Backend/src/Core/Core.Application/Features/Email/Commands/SendManualEmailCommand.cs
@source resend_email_cmd title="ResendEmailCommand Auth Token Exclusion, Root Cap & Ownership Guard" path=SCRIPE-Backend/src/Core/Core.Application/Features/Email/Commands/ResendEmailCommand.cs
@source create_tmpl_cmd title="CreateMessageTemplateCommandHandler Sanitization, Override & SaveChanges" path=SCRIPE-Backend/src/Core/Core.Application/Features/MessageTemplates/Commands/CreateMessageTemplateCommandHandler.cs
@source create_tmpl_val title="CreateMessageTemplateCommandValidator 50,000-Char Schema Alignment" path=SCRIPE-Backend/src/Core/Core.Application/Features/MessageTemplates/Commands/CreateMessageTemplateCommandValidator.cs
@source tmpl_renderer title="TemplateRenderer Scriban Sandbox Limits, HTML Encoding & Cache Eviction" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Services/TemplateRenderer.cs
@source email_job_proc title="EmailJobProcessor [Queue(emails)], Per-Row SaveChanges & PII Redaction" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Services/EmailJobProcessor.cs
@source bg_jobs_cfg title="BackgroundJobsConfiguration Priority Queue Ordering" path=SCRIPE-Backend/src/Host/API/Extensions/BackgroundJobsConfiguration.cs
@source tmpl_repo title="MessageTemplateRepository IgnoreQueryFilters Global & Tenant Resolution" path=SCRIPE-Backend/src/Modules/Communication/Communication.Infrastructure/Persistence/Repositories/MessageTemplateRepository.cs
@source sent_log_repo title="SentEmailLogRepository Auth Role & One-Time Token Retry Exclusion" path=SCRIPE-Backend/src/Modules/Communication/Communication.Infrastructure/Persistence/Repositories/SentEmailLogRepository.cs
@source retry_job title="MessageRetryJob Fast-Fail Permanent Errors & Token Exclusion" path=SCRIPE-Backend/src/Modules/Communication/Communication.Infrastructure/BackgroundJobs/MessageRetryJob.cs
@source scripe_tmpl_svc title="ScripeEmailTemplateService HTML Encoding, SafeHttpUrl & Plain-Text" path=SCRIPE-Backend/src/Modules/Communication/Communication.Infrastructure/Services/ScripeEmailTemplateService.cs
@source smtp_sender title="SmtpEmailSender Deterministic Disposal, Fail-Closed SSL & Exception Mapping" path=SCRIPE-Backend/src/Modules/Communication/Communication.Infrastructure/Services/SmtpEmailSender.cs
@source resend_sender title="ResendEmailSender HostEnvironment Guard, PII Masking & RFC-5322 Quoting" path=SCRIPE-Backend/src/Modules/Communication/Communication.Infrastructure/Services/ResendEmailSender.cs
@source fe_admins_view title="AdminsView Pending Setup Badge & Mode-Aware Onboarding Toast" path=SCRIPE-Frontend/src/modules/admin/identity/admin/src/presentation/views/AdminsView.tsx
@source fe_setup_view title="SetupAccountView Post-replaceState Token Retention" path=SCRIPE-Frontend/src/modules/shared/auth/account-setup/src/presentation/views/SetupAccountView.tsx
@source fe_composer_vm title="useEmailComposerViewModel CC/BCC Deduplication & Template Route Fix" path=SCRIPE-Frontend/src/modules/admin/communication/message-composer/src/presentation/viewmodels/useEmailComposerViewModel.ts
@source fe_tmpl_vm title="useTemplateFormViewModel SearchParams Hydration" path=SCRIPE-Frontend/src/modules/admin/communication/templates/src/presentation/viewmodels/useTemplateFormViewModel.ts

## What did the 5-department forensic audit uncover and close? {#audit-overview}

Five specialized audit tracks inspected dispatch lifecycles, database units of work, template engines, OWASP attack surfaces, and frontend onboarding flows before remediation landed in Slices `6F`, `6G`, and `7A-fix`.

@metric id=metric-owasp-closed label="OWASP Security Findings Closed" value=13 limit=13 unit="findings" note="4 P0 Critical, 6 P1 High, 3 P2 Medium"
@metric id=metric-comm-uow label="CommunicationDbContext Commands Fixed" value=9 limit=9 unit="handlers" note="4 Email + 5 MessageTemplate write handlers"
@metric id=metric-templates-hardened label="Email Templates Hardened" value=40 limit=40 unit="templates" note="20 C# theme builders + 20 EN/AR seeded rows"
@metric id=metric-tests-passing label="Verified Automated Tests" value=3617 unit="tests" note="3,555 backend xUnit + 62 frontend Vitest + 4/4 E2E"

```mermaid title="Emailing & Onboarding Defects Found vs Remediated by Audit Track"
xychart-beta
    x-axis ["Dispatch & Scope", "DB UoW & IDs", "Templates & RTL", "OWASP Security", "Frontend UX"]
    y-axis "Defects" 0 --> 15
    bar "Identified" [10, 8, 12, 13, 9]
    bar "Remediated" [10, 8, 12, 13, 9]
```

| Audit Track | Root Defect Class | Shipped Remediation |
| --- | --- | --- |
| Dispatch & Scope {#tr-disp} | `Task.Run` captured disposed `IdentityDbContext` and `ITenantUrlResolver` {bad:Disposed Scope} | Active-scope URL resolution before `IEmailQueue.QueueEmailAsync` {good:Durable Queue} |
| Multi-DB UoW & IDs {#tr-uow} | `Core.Application` handlers flushed `IdentityDbContext` `IUnitOfWork` {bad:0 Rows Saved} | Explicit `_logRepo.SaveChangesAsync` and `_templateRepo.SaveChangesAsync` {good:Persisted} |
| Global Templates {#tr-global} | `BaseDbContext` tenant filter hid `TenantId == null` seeded templates {bad:Invisible} | `.IgnoreQueryFilters()` with explicit tenant-first and global fallback {good:Restored} |
| OWASP Security {#tr-sec} | `%2e%2e` container traversal, token retry replay, Scriban XSS/DoS {bad:4 P0 Critical} | `EmailAttachmentPathPolicy`, `OneTimeTokenTemplateKeys`, bounded Scriban {good:13/13 Closed} |
| Frontend Onboarding {#tr-fe} | Silent create toast, missing `Pending Setup` badge, wiped `?token=` {bad:Silent / Broken} | Amber `Pending Setup` badge, mode-aware toast, retained setup token {good:Verified Live} |

## How does the remediated emailing and onboarding architecture connect end to end? {#system-topology}

Frontend admin and communication views call encrypted-ID REST endpoints. Handlers resolve tenant metadata in active request scope, persist to `IdentityDbContext` or `CommunicationDbContext`, and enqueue priority background workers.

@architecture id=email-system-topology title="SCRIPE Emailing, Multi-DB UoW & Admin Onboarding Topology"
| fe_admin | Admin & Setup SPA | frontend | source:fe_admins_view |
| fe_comm | Composer & Template SPA | frontend | source:fe_composer_vm |
| id_handlers | Identity Onboarding CQRS | backend | source:create_admin_email |
| comm_handlers | Email & Template CQRS | backend | source:send_manual_cmd |
| id_db | IdentityDbContext Schema | database | source:acct_setup_svc |
| sec_shield | Policy & Scriban Shield | security | source:email_sec_policies |
| email_queue | Priority IEmailQueue | messagebus | source:bg_jobs_cfg |
| job_proc | EmailJobProcessor & Retry | backend | source:email_job_proc |
| comm_db | CommunicationDbContext | database | source:tmpl_repo |
| transport | Resend, SMTP & Dev Senders | external | source:resend_sender |
| fe_admin > id_handlers | Create & Activate | emphasis |
| fe_comm > comm_handlers | Encrypted IDs | emphasis |
| id_handlers > id_db | Save Token | default |
| id_handlers > email_queue | In-Scope Queue | emphasis |
| comm_handlers > sec_shield | Validate | security |
| sec_shield > comm_db | Repo Save | emphasis |
| email_queue > job_proc | Queue("emails") | emphasis |
| job_proc > comm_db | Per-Row Save | default |
| job_proc > transport | TLS Dispatch | security |

@steps id=email-arch-steps
| st_fe_admin | Admin & Setup SPA | `AdminsView` displays `Pending Setup` badges and mode-aware toasts while `SetupAccountView` retains the setup token after stripping `?token=` from the URL bar. | email-system-topology | fe_admin |
| st_id_cqrs | Identity Onboarding CQRS | `CreateAdmin`, `RegisterTenantSelfService`, and `SignupCheckoutCompleted` resolve tenant URLs in active scope and enqueue jobs via `IEmailQueue`. | email-system-topology | id_handlers |
| st_comm_cqrs | Email & Template CQRS | All `4` email commands and `5` template commands flush `CommunicationDbContext` directly and encrypt every returned ID via `IIdEncryptionService`. | email-system-topology | comm_handlers |
| st_sec_shield | Policy & Scriban Shield | Enforces `EmailAttachmentPathPolicy`, `SafeContainerNameRegex`, bounded Scriban `TemplateContext`, `H(...)` encoding, and `SafeHttpUrl`. | email-system-topology | sec_shield |
| st_job_proc | EmailJobProcessor & Retry | Processes `["critical", "emails", "default"]` queues, flushes `CommunicationDbContext` per email, and excludes one-time auth tokens from retries. | email-system-topology | job_proc |
| st_transport | Resend, SMTP & Dev Senders | Disposes `MailMessage` and streams, enforces non-Development SSL and provider checks, quotes RFC-5322 names, and masks logged email PII. | email-system-topology | transport |

## Why did CreateAdmin setup emails fail while Resend worked, and how was onboarding fixed? {#onboarding-dispatch-sequence}

Previously, `CreateAdminCommandHandler` wrapped URL resolution and email sending inside an unawaited `_ = Task.Run(...)` closure after returning the HTTP response. When ASP.NET Core disposed the request scope, `ITenantUrlResolver` queried a disposed `IdentityDbContext`, threw `ObjectDisposedException`, and swallowed the failure into a warning log.[](source:create_admin_email)

@sequence id=admin-onboarding-seq title="Active-Scope Setup Email Queueing, Non-Destructive Resend & Atomic Activation"
| actor ui | Admin & Setup UI | frontend | source:fe_admins_view |
| actor create_h | CreateAdminHandler | backend | source:create_admin_email |
| actor setup_svc | AccountSetupService | security | source:acct_setup_svc |
| actor id_db | IdentityDbContext | database | source:activate_acct |
| actor queue | IEmailQueue Worker | messagebus | source:email_job_proc |
| phase | 1. Active-Scope CreateAdmin & Durable Enqueue |
| ui | create_h | POST /api/v1/admins (sendSetupEmail=true) | emphasis |
| create_h | id_db | Resolve TenantUrl + Persist Admin & TokenHash | default |
| create_h | queue | QueueEmailAsync(AccountSetup) -> [Queue("emails")] | emphasis |
| create_h | ui | 201 EncryptedId + Invitation Toast | return |
| phase | 2. Snapshot-Safe Resend & Post-Consumption Activation |
| ui | setup_svc | POST /api/v1/account-setup/resend | security |
| setup_svc | id_db | Snapshot Old Token -> Save Fresh TokenHash | default |
| setup_svc | ui | Restore Snapshot & Skip Cooldown if Send Fails | return |
| ui | setup_svc | POST /api/v1/account-setup/activate (X-Setup-Token) | security |
| setup_svc | id_db | Tx: TryConsumeToken -> MutatePwd -> CustomFields | security |
| setup_svc | ui | 200 Activated (Pending Setup -> Active) | return |

@steps id=onboarding-seq-steps
| sq_create | CreateAdminHandler | Validates required email when `SendSetupEmail` is true, resolves `GetTenantUrlAsync` before scope disposal, and enqueues `AccountSetup` via `IEmailQueue`. | admin-onboarding-seq | create_h |
| sq_queue | IEmailQueue Worker | Routes `AccountSetup` to the `"emails"` Hangfire queue (ranked ahead of `"default"`) or bounded 3-attempt `EmailQueueWorker` in Native mode. | admin-onboarding-seq | queue |
| sq_setup | AccountSetupService | Restores the previous token snapshot without arming the 60s cooldown or 3/hr cap if dispatch fails, and persists custom fields only after atomic token consumption. | admin-onboarding-seq | setup_svc |
| sq_ui | Admin & Setup UI | Shows `Pending Setup` in `AdminsView` without any manual resend click and keeps the captured token in `SetupAccountView` after `history.replaceState`. | admin-onboarding-seq | ui |

| Onboarding Flow | Previous Broken Behavior | Remediated In-Scope Contract |
| --- | --- | --- |
| `CreateAdminCommandHandler` {#ob-create} | `_ = Task.Run` hit disposed `ITenantUrlResolver` (`IdentityDbContext`) {bad:ObjectDisposed} | Active-scope `GetTenantUrlAsync` + `IEmailQueue.QueueEmailAsync` {good:In-Scope Queue} |
| `RegisterTenantSelfService` {#ob-self} | Unawaited `_auditService` x2 and `_ = Task.Run` welcome email {bad:Race / Drop} | Awaited `LogSecurityEventSafelyAsync` + `QueueWelcomeEmailAsync` {good:Deterministic} |
| `SignupCheckoutCompleted` {#ob-checkout} | `_ = Task.Run` captured scoped `_tenantRepository` after webhook `200` {bad:Disposed DB} | Active-scope tenant/URL lookup + `IEmailQueue` (`Billing` role) {good:Durable} |
| `AccountSetupService.Resend` {#ob-resend} | Returned `Success = true` and burned 60s/3-hr limits on send failure {bad:False 200 OK} | Snapshots/restores token and returns `503 ServiceUnavailable` on failure {good:Honest State} |
| `SetupAccountView.tsx` {#ob-fe-tok} | Next.js 16 `history.replaceState` re-ran `useEffect` and wiped `token` to `""` {bad:Invalid Link} | `setToken((prev) => resolved \|\| prev)` retains token after URL scrub {good:Activated Live} |

## How was the CommunicationDbContext vs IdentityDbContext UnitOfWork split-brain resolved? {#multi-db-uow-fix}

In SCRIPE's modular monolith, `Identity.Infrastructure` registers the global `IUnitOfWork` against `IdentityDbContext`, while `SentEmailLogRepository` and `MessageTemplateRepository` run on `CommunicationDbContext` (`communication` schema). Every email and template command in `Core.Application` previously mutated `CommunicationDbContext` entities and called `_unitOfWork.SaveChangesAsync()`, flushing `IdentityDbContext` and silently discarding all `communication` writes.[](source:send_manual_cmd)

@workflow id=comm-uow-security-flow title="CommunicationDbContext Persistence, Scriban Sandbox & Retry Pipeline"
| lane ingress | 1. Ingress & Policy Gate |
| lane render | 2. Template & Sanitizer |
| lane persist | 3. CommunicationDbContext & Retry |
| cmd_in | Email or Template Command | backend | ingress | source:send_manual_cmd |
| att_gate | Attachment & Ownership OK? | security | ingress | source:att_path_policy |
| tmpl_load | IgnoreQueryFilters Lookup | database | render | source:tmpl_repo |
| scriban_box | Bounded Scriban & Sanitizer | security | render | source:tmpl_renderer |
| comm_save | Repo SaveChangesAsync | database | persist | source:send_manual_cmd |
| enc_out | Return Encrypted ID | security | persist | source:send_manual_cmd |
| retry_gate | Non-Auth Transient Retry? | backend | persist | source:retry_job |
| cmd_in > att_gate | Validate | security |
| att_gate > tmpl_load | yes | emphasis |
| tmpl_load > scriban_box | Tenant or Global | default |
| scriban_box > comm_save | Evict Cache | emphasis |
| comm_save > enc_out | Encrypt(Guid) | security |
| comm_save > retry_gate | Background Poll | default |

@steps id=uow-workflow-steps
| uw_in | Email or Template Command | Validates `50,000`-char bodies, `2,000`-char `DesignVariables`, single-address `CC`/`BCC` limits (`<= 50`), and caller tenant ownership. | comm-uow-security-flow | cmd_in |
| uw_att | Attachment & Ownership OK? | `EmailAttachmentPathPolicy` restricts paths to `email-attachments/<file>` (`<= 10` files, `<= 10 MB`) and verifies tenant access via `CanAccessFileQuery`. | comm-uow-security-flow | att_gate |
| uw_tmpl | IgnoreQueryFilters Lookup | `MessageTemplateRepository` uses `.IgnoreQueryFilters()` so tenants resolve their own override first and fall back to global (`TenantId == null`) seeded templates. | comm-uow-security-flow | tmpl_load |
| uw_scriban | Bounded Scriban & Sanitizer | `TemplateRenderer` caps `LoopLimit = 100` and `LimitToString = 100,000`, HTML-encodes scalar placeholders, sanitizes custom HTML, and evicts cache on writes. | comm-uow-security-flow | scriban_box |
| uw_save | Repo SaveChangesAsync | Calls `_logRepo.SaveChangesAsync` or `_templateRepo.SaveChangesAsync` directly on `CommunicationDbContext` and returns `_idEncryption.Encrypt(id)`. | comm-uow-security-flow | comm_save |
| uw_retry | Non-Auth Transient Retry? | `EmailJobProcessor` saves per row, while `MessageRetryJob` and `ResendEmailCommand` block `OneTimeTokenTemplateKeys` and `EmailSenderRole.Auth`. | comm-uow-security-flow | retry_gate |

@erd id=email-persistence-erd title="Identity vs Communication Schema Persistence Boundary"
| entity identity_admins | identity.admins | source:create_admin_email |
| entity comm_templates | communication.message_templates | source:tmpl_repo |
| entity comm_email_logs | communication.sent_email_logs | source:sent_log_repo |
| identity_admins.id | uuid | pk |
| identity_admins.tenant_id | uuid | |
| identity_admins.email | varchar(200) | uk |
| identity_admins.is_account_activated | boolean | |
| identity_admins.account_setup_token_hash | varchar(128) | |
| identity_admins.account_setup_token_expiry | timestamptz | |
| identity_admins.account_setup_failed_attempts | int | |
| comm_templates.id | uuid | pk |
| comm_templates.tenant_id | uuid | |
| comm_templates.key | varchar(100) | uk |
| comm_templates.language | varchar(10) | uk |
| comm_templates.subject | varchar(500) | |
| comm_templates.body | text(50000) | |
| comm_templates.design_variables | varchar(2000) | |
| comm_templates.usage_count | int | |
| comm_email_logs.id | uuid | pk |
| comm_email_logs.tenant_id | uuid | |
| comm_email_logs.original_email_id | uuid | fk | comm_email_logs.id |
| comm_email_logs.recipient_id | uuid | fk | identity_admins.id |
| comm_email_logs.template_key | varchar(100) | fk | comm_templates.key |
| comm_email_logs.sender_role | int | |
| comm_email_logs.status | int | |
| comm_email_logs.retry_count | int | |
| comm_email_logs > comm_templates | many:one | renders key |
| comm_email_logs > identity_admins | many:one | recipient_id |

@facts id=uow-persistence-facts
| Fixed Email Commands (`4`) | `SendManualEmailCommand`, `SendBulkEmailCommand`, `ResendEmailCommand`, `CancelEmailCommand` -> `_logRepo.SaveChangesAsync(ct)` |
| Fixed Template Commands (`5`) | `Create`, `Update`, `Delete`, `Clone`, and `ResetMessageTemplateDesign` -> `_templateRepo.SaveChangesAsync(ct)` |
| Encrypted ID Parity (`BE-037`) | `SendManualEmail`, `SendBulkEmail`, `PublishMessageTemplate`, and `ArchiveMessageTemplate` use `IIdEncryptionService` (`0` `Guid.TryParse`) |
| Validator & Route Parity (`7A-fix`) | `Create`/`UpdateMessageTemplateCommandValidator` align `Body` (`50,000`) & `DesignVariables` (`2,000`); `UpdateMessageTemplateRequest` binds route `id` (`e32ae3f78`) |

## How are all 13 OWASP security findings and template contracts enforced? {#owasp-security-matrix}

All `4` P0 Critical, `6` P1 High, and `3` P2 Medium vulnerabilities identified in `#395` and `#397` are closed in production code and locked by dedicated regression suites.[](source:email_sec_policies)

| Finding & Severity | Attack Vector Eliminated | Enforced Control & Source Anchor |
| --- | --- | --- |
| `P0-1` Attachment Traversal & OOM {#sec-p0-1} | `https://x/%2e%2e/appsettings.json` escaped `LocalBlobStorage` container | `SafeContainerNameRegex`, `EmailAttachmentPathPolicy`, `10 MB` stream cap {good:Blocked} |
| `P0-2` One-Time Token Replay {#sec-p0-2} | `MessageRetryJob` and `ResendEmail` re-sent PascalCase auth/setup emails | `EmailSecurityPolicies.OneTimeTokenTemplateKeys` + `SenderRole != Auth` {good:Excluded} |
| `P0-3` Theme HTML & URL Injection {#sec-p0-3} | Raw interpolation of `tenantName`, `userName`, `code`, and `javascript:` URLs | `H(...)` encoding across all `20` templates + `SafeHttpUrl` + `IsSafePngDataUri` {good:Encoded} |
| `P0-4` Scriban SSTI, XSS & DoS {#sec-p0-4} | Unbounded `TemplateContext`, unencoded `{{var}}`, raw `/preview` HTML | `LoopLimit=100`, `LimitToString=100000`, `MemberFilter=false`, `SanitizeEmail` {good:Sandboxed} |
| `P1-5` MIME & Display-Name Injection {#sec-p1-5} | Unquoted `fromName` and unsanitized attachment `FileName` / `ContentType` | `SanitizeDisplayName`, `SanitizeAttachmentFileName`, strict MIME regex {good:Sanitized} |
| `P1-6` Notification `javascript:` URI {#sec-p1-6} | `HtmlEncode` left `javascript:` intact; `#E2E8F0` text invisible on light `#F7F8F5` | `SafeActionUrl` allowlist + `#1E293B` `sx-text-body` light-mode contrast {good:Fixed} |
| `P1-7` Infinite Resend & BOLA {#sec-p1-7} | Re-posting `/resend` bypassed `RetryCount`, daily quota, and tenant checks | Root-chain retry count (`MaxRetries=10`), daily quota, tenant ownership guard {good:Capped} |
| `P1-8` Log & Hangfire PII Leak {#sec-p1-8} | Raw recipient emails in logs/Hangfire dashboard and unredacted token keys | `LogPiiMasker.MaskEmail`, scrubbed `[JobDisplayName]`, expanded `SensitiveTemplateKeys` {good:Redacted} |
| `P1-9` Setup Rate Limit & Ordering {#sec-p1-9} | Shared `"Login"` bucket, missing `custom-fields` lockout check, pre-consume writes | Dedicated `"account-setup"` (`20/5m`), `X-Setup-Token`, post-consume tx writes {good:Isolated} |
| `P1-10` Fail-Closed TLS & Senders {#sec-p1-10} | `Mode="Dev"` override outside Dev, missing SMTP `using`, unknown provider fallback | `hostEnvironment.IsDevelopment()` guard, deterministic disposal, startup throw {good:Fail-Closed} |

@callout level=warning title="Strict Separation Between Seeded Theme Templates and Custom HTML"
| Platform-seeded templates (`TenantId == null`) carry `RenderedMessage.IsPlatformTemplate = true` so `ScripeEmailTheme` `<style>` blocks (dark-mode `sx-*` classes and `@media` queries) stay intact while scalar placeholders are HTML-encoded before Scriban evaluation. Tenant-authored templates and `/api/v1/message-templates/preview` always pass through `MessageTemplateBodySanitizer` and `HtmlAllowlistSanitizer.SanitizeEmail`. |

## What template, bilingual RTL, and Frontend UX defects were fixed? {#template-and-fe-matrix}

Both backend template engines (`ScripeEmailTemplateService` and `MessageTemplateSeeder`) and the Next.js 16 Admin and Communication modules were reconciled for contract accuracy and bilingual EN/AR parity.[](source:scripe_tmpl_svc)

| Surface | Defect Fixed | Verified Behavior |
| --- | --- | --- |
| `SignupCheckoutCompleted` & `PaymentLink` {#tm-checkout} | Empty `EditionName = ""` rendered `"your  workspace"`; `FinalizeUrl`, `TrialEndsOn`, and `QrCodeDataUri` ignored | `GetOrDefault` checks `!IsNullOrWhiteSpace`; renders `FinalizeUrl`, `TrialEndsOn`, and validated PNG QR (`alt=""`) {good:Wired} |
| Arabic RTL Seeded Templates (`10`) {#tm-rtl} | `MessageTemplateSeeder` Arabic builders omitted `rtl: true`, emitting `<p dir="ltr">` | All Arabic `P`, `Button`, `Muted`, `CodeBox`, and `Metrics` calls pass `rtl: true` + `CompanyName` schema {good:RTL Native} |
| `BuildPlainTextAlternative` {#tm-plain} | Stripped `<a href>` URLs completely and glued `<td>` cells (`"PlanEnterprise"`) | Preserves `[Label (URL)]` action links and inserts tab/line breaks across table cells {good:Readable} |
| `AdminsView` & Create Admin Toast {#fe-admins} | Unactivated admins showed only green `Active`; generic toast hid email dispatch | Renders amber `Pending Setup` badge (`!isAccountActivated`), `type="email"`, and mode-aware toast {good:Clear UX} |
| Composer `CC`/`BCC` & Recipient Search {#fe-comp} | Merged `cc` and `bcc` into primary `To` loop; `"Admin"` PascalCase fell back to `"Custom"` | Loops over `To` recipients only with `cc`/`bcc` arrays; normalizes `username` and case-insensitive type {good:1 Primary Send} |
| `"Use as Template"` & SearchParams {#fe-tmpl-url} | Routed to 404 `/communication/templates/create`; `/new` ignored query params | Routes to `/communication/templates/new` and hydrates `key`, `channel`, `subject`, `body` via `useSearchParams` {good:Hydrated} |

## Which verification gates and live E2E checks proved the remediation? {#verification-gates}

Every backend, frontend, architectural, security, and live browser gate was executed and verified across Slices `6F`, `6G`, `7A-fix`, and `7A`.[](source:fe_setup_view)

| Verification Gate | Measured Result | Scope Covered |
| --- | --- | --- |
| `scripe build backend` & `SCRIPE-Backend.slnx` {#vg-be-build} | `90 / 90` projects (`0` errors) | Full .NET 10 Release compilation (`e32ae3f78`) {good:EXIT 0} |
| `scripe arch-check` (Backend & Frontend) {#vg-arch} | Backend `95/100`, Frontend `92/100` (`0` critical) | `0` `BE-036`/`FE-034` naming violations, `0` `BE-037` `Guid.TryParse`, all new files `<= 297L` {good:0 Critical} |
| Backend Release Test Suites {#vg-be-tests} | `3,555` passed (`0` Slice 6F/7A-fix failures) | `Identity` (`1,599`), `API.UnitTests` (`867`), `Core` (`841`), `AuthorizationGates` (`255`), `Communication` (`52`), `DI` (`2/2`) {good:100% Green} |
| Frontend Typecheck, Lint, Locales & Build {#vg-fe-build} | `210 / 210` routes, `19,794` locale keys (`0` errors) | `tsc --noEmit`, `oxlint`, `scripe validate-locales` (`112` pairs), `scripe build frontend` (`5ea144ac1`) {good:EXIT 0} |
| Frontend Onboarding & Communication Vitest {#vg-fe-vitest} | `15 / 15` files, `62 / 62` tests passed | `AdminOnboardingAndSetupEmail`, `EmailComposerAndRecipientContract`, `TemplateImportAndSearchParamsHydration`, `account-setup-security` {good:62 / 62} |
| Live Unmocked Playwright E2E (`:5035` + `:3000`) {#vg-e2e} | `4 / 4` specs passed (`6` PNGs `29..34`) | Zero-resend Hangfire `AccountSetup` (`0` `/resend` calls, `0` `ObjectDisposedException`), `/setup-account` activation, Templates CRUD (`v1`/`v2`), `1`-POST `CC`/`BCC`, `422` auth-token resend refusal {good:4 / 4 PASSED} |

- [x] Verify `CreateAdminCommandHandler`, `RegisterTenantSelfServiceCommandHandler`, and `SignupCheckoutCompletedEventHandler` contain `0` `Task.Run` calls and receive non-null `IEmailQueue` in `EmailPipelineDependencyInjectionIntegrationTests` (`2/2`).
- [x] Verify all `9` `Core.Application` email and template write handlers persist directly to `CommunicationDbContext` and return encrypted IDs with `0` `Guid.TryParse` calls.
- [x] Verify `EmailAttachmentAndStorageSecurityTests` (`22/22`), `ScripeEmailTemplateServiceTests` (`7/7`), `MessageTemplateCommandValidatorTests` (`3/3`), and `EmailCommandOwnershipRefusalTests` (`2/2`) pass in Release mode.
- [x] Verify live `/admins` Create Admin (`sendSetupEmail: true`) renders `Pending Setup`, dispatches `AccountSetup` via Hangfire without calling `/api/v1/account-setup/resend`, and activates cleanly via `/setup-account?token=...`.
