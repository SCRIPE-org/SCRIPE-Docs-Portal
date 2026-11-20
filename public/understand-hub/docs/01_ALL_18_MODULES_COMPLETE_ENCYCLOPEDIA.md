# SCRIPE-Backend — Complete 18-Module + Core + Host.API Encyclopedia

> **Exhaustive Codebase Inventory** extracted directly from all `6,077` C# files in `SCRIPE-Backend`. Every Entity, Command, Query, Handler, Validator, Controller, HTTP Endpoint (mapped from `src/Host/API/Controllers/<SubFolder>/`), Database Table (`DbSet<T>`), Background Job, and Seeder is cataloged below by module.

---

## Quick Navigation
1. [Host.API Module](#1-hostapi-module)
2. [Core Module](#2-core-module)
3. [Analytics Module](#3-analytics-module)
4. [CatalogPricing Module](#4-catalogpricing-module)
5. [Communication Module](#5-communication-module)
6. [Compliance Module](#6-compliance-module)
7. [CRM Module](#7-crm-module)
8. [CustomFields Module](#8-customfields-module)
9. [Entitlements Module](#9-entitlements-module)
10. [Finance Module](#10-finance-module)
11. [Hrms Module](#11-hrms-module)
12. [Identity Module](#12-identity-module)
13. [Integrations Module](#13-integrations-module)
14. [Marketplace Module](#14-marketplace-module)
15. [Media Module](#15-media-module)
16. [OrganizationCore Module](#16-organizationcore-module)
17. [PartyKernel Module](#17-partykernel-module)
18. [Plugins Module](#18-plugins-module)
19. [Venue Module](#19-venue-module)
20. [WorkManagement Module](#20-workmanagement-module)

---

## 1. Host.API Module

- **Schema**: `host.api`
- **Footprint**: `225` files | `0` entities | `2` commands | `0` queries | `2` handlers | `3` validators | **`156` controllers (`991` HTTP endpoints)** | `0` DB tables | `0` jobs | `1` seeders/providers | `0` test files

### Database Contexts & Tables (`DbSet<T>` — 0 tables)
_No module-owned DbSet tables in this layer._

### Domain Entities (0)
_No domain entity classes in this layer._

### REST API Endpoints (991 endpoints across 156 controllers)
| Verb & Route | Controller.Action | Auth / Permission | Source Location |
|---|---|---|---|
| **`GET api/v{version:apiVersion}/analytics/events`** | `AnalyticsMetricsController.GetEvents` | `analytics-events.view` | `src/Host/API/Controllers/Analytics/AnalyticsMetricsController.cs:42` |
| **`GET api/v{version:apiVersion}/analytics/daily-metrics`** | `AnalyticsMetricsController.GetDailyMetrics` | `analytics-events.view` | `src/Host/API/Controllers/Analytics/AnalyticsMetricsController.cs:66` |
| **`GET api/v{version:apiVersion}/account-setup/validate`** | `AccountSetupController.ValidateToken` | `Authenticated` | `src/Host/API/Controllers/Auth/AccountSetupController.cs:41` |
| **`GET api/v{version:apiVersion}/account-setup/custom-fields`** | `AccountSetupController.GetCustomFields` | `Authenticated` | `src/Host/API/Controllers/Auth/AccountSetupController.cs:60` |
| **`POST api/v{version:apiVersion}/account-setup/activate`** | `AccountSetupController.ActivateAccount` | `Authenticated` | `src/Host/API/Controllers/Auth/AccountSetupController.cs:79` |
| **`POST api/v{version:apiVersion}/account-setup/resend`** | `AccountSetupController.ResendSetupEmail` | `admins.update` | `src/Host/API/Controllers/Auth/AccountSetupController.cs:119` |
| **`POST api/v{version:apiVersion}/auth/admin/login`** | `AdminAuthController.Login` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:38` |
| **`POST api/v{version:apiVersion}/auth/admin/refresh`** | `AdminAuthController.RefreshToken` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:62` |
| **`POST api/v{version:apiVersion}/auth/admin/discover-workspaces`** | `AdminAuthController.DiscoverWorkspaces` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:85` |
| **`POST api/v{version:apiVersion}/auth/admin/logout`** | `AdminAuthController.Logout` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:102` |
| **`GET api/v{version:apiVersion}/auth/admin/sessions`** | `AdminAuthController.GetSessions` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:118` |
| **`DELETE api/v{version:apiVersion}/auth/admin/sessions/{tokenId}`** | `AdminAuthController.RevokeSession` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:145` |
| **`POST api/v{version:apiVersion}/auth/admin/sessions/revoke-all`** | `AdminAuthController.RevokeAllSessions` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:165` |
| **`POST api/v{version:apiVersion}/auth/admin/2fa/enable`** | `AdminAuthController.Enable2FA` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:189` |
| **`POST api/v{version:apiVersion}/auth/admin/2fa/confirm`** | `AdminAuthController.Confirm2FA` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:209` |
| **`POST api/v{version:apiVersion}/auth/admin/2fa/verify`** | `AdminAuthController.Verify2FA` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:232` |
| **`POST api/v{version:apiVersion}/auth/admin/2fa/disable`** | `AdminAuthController.Disable2FA` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:255` |
| **`POST api/v{version:apiVersion}/auth/admin/2fa/backup-codes/regenerate`** | `AdminAuthController.RegenerateBackupCodes` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:278` |
| **`GET api/v{version:apiVersion}/auth/admin/security-log`** | `AdminAuthController.GetSecurityLog` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:304` |
| **`POST api/v{version:apiVersion}/auth/admin/impersonate/{id}`** | `AdminAuthController.Impersonate` | `admins.impersonate` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:332` |
| **`POST api/v{version:apiVersion}/auth/admin/stop-impersonation`** | `AdminAuthController.StopImpersonation` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:352` |
| **`GET api/v{version:apiVersion}/auth/admin/external-logins`** | `AdminAuthController.GetExternalLogins` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:381` |
| **`POST api/v{version:apiVersion}/auth/admin/external-logins/link`** | `AdminAuthController.LinkExternalAccount` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:398` |
| **`DELETE api/v{version:apiVersion}/auth/admin/external-logins/{externalLoginId}`** | `AdminAuthController.UnlinkExternalAccount` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:433` |
| **`POST api/v{version:apiVersion}/auth/admin/request-password-reset`** | `AdminAuthController.RequestPasswordReset` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:461` |
| **`POST api/v{version:apiVersion}/auth/admin/verify-reset-otp`** | `AdminAuthController.VerifyResetOtp` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:503` |
| **`POST api/v{version:apiVersion}/auth/admin/reset-password`** | `AdminAuthController.ResetPassword` | `Authenticated` | `src/Host/API/Controllers/Auth/AdminAuthController.cs:520` |
| **`POST api/v{version:apiVersion}/auth/magic-link/request`** | `MagicLinkController.RequestMagicLink` | `Authenticated` | `src/Host/API/Controllers/Auth/MagicLinkController.cs:38` |
| **`POST api/v{version:apiVersion}/auth/magic-link/verify`** | `MagicLinkController.VerifyMagicLink` | `Authenticated` | `src/Host/API/Controllers/Auth/MagicLinkController.cs:60` |
| **`GET api/v{version:apiVersion}/auth/oidc/providers/admin`** | `OidcClientController.GetAdminProviders` | `Authenticated` | `src/Host/API/Controllers/Auth/OidcClientController.cs:40` |
| **`GET api/v{version:apiVersion}/auth/oidc/providers/user`** | `OidcClientController.GetUserProviders` | `Authenticated` | `src/Host/API/Controllers/Auth/OidcClientController.cs:64` |
| **`POST api/v{version:apiVersion}/auth/oidc/challenge`** | `OidcClientController.Challenge` | `Authenticated` | `src/Host/API/Controllers/Auth/OidcClientController.cs:88` |
| **`POST api/v{version:apiVersion}/auth/oidc/callback`** | `OidcClientController.Callback` | `Authenticated` | `src/Host/API/Controllers/Auth/OidcClientController.cs:121` |
| **`POST api/v{version:apiVersion}/auth/oidc/complete-workspace-selection`** | `OidcClientController.CompleteWorkspaceSelection` | `Authenticated` | `src/Host/API/Controllers/Auth/OidcClientController.cs:203` |
| **`GET /api/v1/host.api/~/oidc/login`** | `OidcLoginController.Login` | `Authenticated` | `src/Host/API/Controllers/Auth/OidcLoginController.cs:48` |
| **`GET /api/v1/host.api/~/oidc/logout`** | `OidcLoginController.Logout` | `Authenticated` | `src/Host/API/Controllers/Auth/OidcLoginController.cs:125` |
| **`POST /api/v1/host.api/~/connect/authorize`** | `OidcServerController.Authorize` | `Authenticated` | `src/Host/API/Controllers/Auth/OidcServerController.cs:73` |
| **`POST /api/v1/host.api/~/connect/token`** | `OidcServerController.Exchange` | `Authenticated` | `src/Host/API/Controllers/Auth/OidcServerController.cs:257` |
| **`POST api/v{version:apiVersion}/auth/passkeys/registration/begin`** | `PasskeyController.BeginRegistration` | `Authorize` | `src/Host/API/Controllers/Auth/PasskeyController.cs:48` |
| **`POST api/v{version:apiVersion}/auth/passkeys/registration/complete`** | `PasskeyController.CompleteRegistration` | `Authorize` | `src/Host/API/Controllers/Auth/PasskeyController.cs:70` |
| **`POST api/v{version:apiVersion}/auth/passkeys/authentication/begin`** | `PasskeyController.BeginAuthentication` | `Authenticated` | `src/Host/API/Controllers/Auth/PasskeyController.cs:103` |
| **`POST api/v{version:apiVersion}/auth/passkeys/authentication/verify`** | `PasskeyController.VerifyAuthentication` | `Authenticated` | `src/Host/API/Controllers/Auth/PasskeyController.cs:128` |
| **`POST api/v{version:apiVersion}/auth/passkeys/api/v{version:apiVersion}/auth/me/sudo-verify`** | `PasskeyController.SudoVerify` | `Authorize` | `src/Host/API/Controllers/Auth/PasskeyController.cs:171` |
| **`GET api/v{version:apiVersion}/auth/passkeys`** | `PasskeyController.ListPasskeys` | `Authorize` | `src/Host/API/Controllers/Auth/PasskeyController.cs:204` |
| **`DELETE api/v{version:apiVersion}/auth/passkeys/{id}`** | `PasskeyController.RemovePasskey` | `Authorize` | `src/Host/API/Controllers/Auth/PasskeyController.cs:220` |
| **`PATCH api/v{version:apiVersion}/auth/passkeys/{id}/name`** | `PasskeyController.RenamePasskey` | `Authorize` | `src/Host/API/Controllers/Auth/PasskeyController.cs:237` |
| **`POST api/v{version:apiVersion}/auth/phone-otp/request`** | `PhoneOtpLoginController.RequestOtp` | `Authenticated` | `src/Host/API/Controllers/Auth/PhoneOtpLoginController.cs:37` |
| **`POST api/v{version:apiVersion}/auth/phone-otp/verify`** | `PhoneOtpLoginController.VerifyOtp` | `Authenticated` | `src/Host/API/Controllers/Auth/PhoneOtpLoginController.cs:58` |
| **`POST api/v{version:apiVersion}/auth/qr-login/session`** | `QrLoginController.CreateSession` | `Authenticated` | `src/Host/API/Controllers/Auth/QrLoginController.cs:38` |
| **`GET api/v{version:apiVersion}/auth/qr-login/session/{sessionId}/status`** | `QrLoginController.CheckStatus` | `Authenticated` | `src/Host/API/Controllers/Auth/QrLoginController.cs:61` |
| **`POST api/v{version:apiVersion}/auth/qr-login/approve`** | `QrLoginController.ApproveSession` | `Authorize` | `src/Host/API/Controllers/Auth/QrLoginController.cs:83` |
| **`POST api/v{version:apiVersion}/auth/qr-login/reject`** | `QrLoginController.RejectSession` | `Authorize` | `src/Host/API/Controllers/Auth/QrLoginController.cs:111` |
| **`GET api/v{version:apiVersion}/auth/saml/login`** | `SamlClientController.Login` | `Authenticated` | `src/Host/API/Controllers/Auth/SamlClientController.cs:56` |
| **`POST api/v{version:apiVersion}/auth/saml/acs/{providerId}`** | `SamlClientController.AssertionConsumerService` | `Authenticated` | `src/Host/API/Controllers/Auth/SamlClientController.cs:95` |
| **`POST api/v{version:apiVersion}/auth/saml/callback`** | `SamlClientController.Callback` | `Authenticated` | `src/Host/API/Controllers/Auth/SamlClientController.cs:220` |
| **`POST api/v{version:apiVersion}/auth/saml/sso`** | `SamlServerController.SingleSignOnService` | `Authenticated` | `src/Host/API/Controllers/Auth/SamlServerController.cs:51` |
| **`GET api/v{version:apiVersion}/auth/saml/metadata`** | `SamlServerController.Metadata` | `Authenticated` | `src/Host/API/Controllers/Auth/SamlServerController.cs:130` |
| **`GET api/v{version:apiVersion}/auth/signup/pricing-context`** | `SelfServiceSignupController.GetPricingContext` | `Authenticated` | `src/Host/API/Controllers/Auth/SelfServiceSignupController.cs:84` |
| **`GET api/v{version:apiVersion}/auth/signup/categories`** | `SelfServiceSignupController.GetCategories` | `Authenticated` | `src/Host/API/Controllers/Auth/SelfServiceSignupController.cs:106` |
| **`GET api/v{version:apiVersion}/auth/signup/editions`** | `SelfServiceSignupController.GetEditions` | `Authenticated` | `src/Host/API/Controllers/Auth/SelfServiceSignupController.cs:136` |

*... plus 931 additional endpoints in Host.API.*

### CQRS Commands (2)
- `ChangePlanSagaCommand` (`src/Host/API/Handlers/ChangePlanSagaHandler.cs:22`)
- `RegisterSelfServiceSagaCommand` (`src/Host/API/Handlers/RegisterSelfServiceSagaHandler.cs:24`)

### CQRS Queries (0)
_No CQRS queries._

### Background Jobs (0) & UAT Seeders / Providers (1)
- **[Provider]** `ModuleControllerFeatureProvider` (`src/Host/API/Extensions/ModuleControllerFeatureProvider.cs:17`)

---

## 2. Core Module

- **Schema**: `core`
- **Footprint**: `699` files | `0` entities | `54` commands | `22` queries | `47` handlers | `32` validators | **`1` controllers (`0` HTTP endpoints)** | `3` DB tables | `10` jobs | `5` seeders/providers | `145` test files

### Database Contexts & Tables (`DbSet<T>` — 3 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `core.OutboxMessages` | `OutboxMessage` | `BaseDbContext` | `src/Core/Core.Infrastructure/Database/BaseDbContext.cs:52` |
| `core.InboxMessages` | `InboxMessage` | `BaseDbContext` | `src/Core/Core.Infrastructure/Database/BaseDbContext.cs:58` |
| `core.IdempotencyReceipts` | `ModuleIdempotencyReceipt` | `BaseDbContext` | `src/Core/Core.Infrastructure/Database/BaseDbContext.cs:64` |

### Domain Entities (0)
_No domain entity classes in this layer._

### REST API Endpoints (0 endpoints across 1 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (54)
- `ICommand` (`src/Core/Core.Application/Abstractions/ICommand.cs:22`)
- `ICommand` (`src/Core/Core.Application/Abstractions/ICommand.cs:36`)
- `CancelEmailCommand` (`src/Core/Core.Application/Features/Email/Commands/CancelEmailCommand.cs:18`)
- `ResendEmailCommand` (`src/Core/Core.Application/Features/Email/Commands/ResendEmailCommand.cs:19`)
- `SendBulkEmailCommand` (`src/Core/Core.Application/Features/Email/Commands/SendBulkEmailCommand.cs:22`)
- `SendManualEmailCommand` (`src/Core/Core.Application/Features/Email/Commands/SendManualEmailCommand.cs:37`)
- `CreateMessageTemplateCommand` (`src/Core/Core.Application/Features/MessageTemplates/Commands/MessageTemplateCommands.cs:15`)
- `UpdateMessageTemplateCommand` (`src/Core/Core.Application/Features/MessageTemplates/Commands/MessageTemplateCommands.cs:36`)
- `DeleteMessageTemplateCommand` (`src/Core/Core.Application/Features/MessageTemplates/Commands/MessageTemplateCommands.cs:69`)
- `CloneMessageTemplateCommand` (`src/Core/Core.Application/Features/MessageTemplates/Commands/MessageTemplateCommands.cs:81`)
- `PublishMessageTemplateCommand` (`src/Core/Core.Application/Features/MessageTemplates/Commands/MessageTemplateCommands.cs:93`)
- `ArchiveMessageTemplateCommand` (`src/Core/Core.Application/Features/MessageTemplates/Commands/MessageTemplateCommands.cs:105`)
- `ResetMessageTemplateDesignCommand` (`src/Core/Core.Application/Features/MessageTemplates/Commands/MessageTemplateCommands.cs:121`)
- `SendNotificationCommand` (`src/Core/Core.Application/Features/Notification/Commands/NotificationCommands.cs:13`)
- `MarkAsReadCommand` (`src/Core/Core.Application/Features/Notification/Commands/NotificationCommands.cs:32`)
- `MarkAllAsReadCommand` (`src/Core/Core.Application/Features/Notification/Commands/NotificationCommands.cs:42`)
- `DeleteNotificationCommand` (`src/Core/Core.Application/Features/Notification/Commands/NotificationCommands.cs:50`)
- `UpdatePreferencesCommand` (`src/Core/Core.Application/Features/Notification/Commands/NotificationCommands.cs:60`)
- `CreateWebhookSubscriptionCommand` (`src/Core/Core.Application/Features/Webhooks/Commands/WebhookCommands.cs:13`)
- `UpdateWebhookSubscriptionCommand` (`src/Core/Core.Application/Features/Webhooks/Commands/WebhookCommands.cs:35`)
- `DeleteWebhookSubscriptionCommand` (`src/Core/Core.Application/Features/Webhooks/Commands/WebhookCommands.cs:54`)
- `ToggleWebhookSubscriptionCommand` (`src/Core/Core.Application/Features/Webhooks/Commands/WebhookCommands.cs:69`)
- `RotateWebhookSecretCommand` (`src/Core/Core.Application/Features/Webhooks/Commands/WebhookCommands.cs:84`)
- `TestWebhookSubscriptionCommand` (`src/Core/Core.Application/Features/Webhooks/Commands/WebhookCommands.cs:99`)
- `ReplayDeadLetterCommand` (`src/Core/Core.Application/Features/Webhooks/Commands/WebhookCommands.cs:112`)
- `ReplayAllDeadLettersCommand` (`src/Core/Core.Application/Features/Webhooks/Commands/WebhookCommands.cs:124`)
- `BulkToggleWebhooksCommand` (`src/Core/Core.Application/Features/Webhooks/Commands/WebhookCommands.cs:137`)
- `IIdempotentCommand` (`src/Core/Core.Application/Idempotency/IIdempotentCommand.cs:9`)
- `IModuleTestCommand` (`tests/API.UnitTests/Idempotency/PerModuleIdempotencyTests.cs:144`)
- `ModuleCreateCommand` (`tests/API.UnitTests/Idempotency/PerModuleIdempotencyTests.cs:150`)
- `ModuleDeleteCommand` (`tests/API.UnitTests/Idempotency/PerModuleIdempotencyTests.cs:157`)
- `ModuleSecretLoginCommand` (`tests/API.UnitTests/Idempotency/PerModuleIdempotencyTests.cs:165`)
- `SampleMutatingCommand` (`tests/API.UnitTests/Idempotency/UnifiedIdempotencyPipelineTests.cs:30`)
- `SampleHydratedCommand` (`tests/API.UnitTests/Idempotency/UnifiedIdempotencyPipelineTests.cs:33`)
- `SampleFingerprintedCommand` (`tests/API.UnitTests/Idempotency/UnifiedIdempotencyPipelineTests.cs:432`)
- `SampleCommand` (`tests/Core.Application.Tests/AstraFlowMilestone3ChallengerTests.cs:36`)
- `ThrowingValueCommand` (`tests/Core.Application.Tests/Behaviors/DomainExceptionHandlerTests.cs:178`)
- `ThrowingVoidCommand` (`tests/Core.Application.Tests/Behaviors/DomainExceptionHandlerTests.cs:193`)
- `PlainCommand` (`tests/Core.Application.Tests/Behaviors/FieldRestrictionEnforcementBehaviorTests.cs:28`)
- `FieldsCommand` (`tests/Core.Application.Tests/Behaviors/FieldRestrictionEnforcementBehaviorTests.cs:30`)
- `BlanketCommand` (`tests/Core.Application.Tests/Behaviors/FieldRestrictionEnforcementBehaviorTests.cs:37`)
- `TestItemCommand` (`tests/Core.Application.Tests/Idempotency/IdempotencyConditionsTests.cs:658`)
- `DummyUnannotatedCommand` (`tests/Core.Application.Tests/Idempotency/IdempotencyGovernanceTests.cs:28`)
- `DummyTodoReasonCommand` (`tests/Core.Application.Tests/Idempotency/IdempotencyGovernanceTests.cs:31`)
- `DummyShortReasonCommand` (`tests/Core.Application.Tests/Idempotency/IdempotencyGovernanceTests.cs:34`)
- *... plus 9 more commands.*

### CQRS Queries (22)
- `ICustomFieldRequiredFieldsQuery` (`src/Core/Core.Application/Abstractions/ICustomFieldRequiredFieldsQuery.cs:18`)
- `IFieldRestrictionQuery` (`src/Core/Core.Application/Abstractions/IFieldRestrictionQuery.cs:17`)
- `IQuery` (`src/Core/Core.Application/Abstractions/IQuery.cs:28`)
- `IStreamQuery` (`src/Core/Core.Application/Abstractions/IStreamQuery.cs:37`)
- `GetSentEmailsQuery` (`src/Core/Core.Application/Features/Email/Queries/EmailQueryContracts.cs:48`)
- `GetSentEmailByIdQuery` (`src/Core/Core.Application/Features/Email/Queries/EmailQueryContracts.cs:60`)
- `GetEmailStatisticsQuery` (`src/Core/Core.Application/Features/Email/Queries/EmailStatisticsQuery.cs:31`)
- `GetMessageTemplatesQuery` (`src/Core/Core.Application/Features/MessageTemplates/Queries/MessageTemplateQueryContracts.cs:43`)
- `GetMessageTemplateByIdQuery` (`src/Core/Core.Application/Features/MessageTemplates/Queries/MessageTemplateQueryContracts.cs:56`)
- `GetNotificationsQuery` (`src/Core/Core.Application/Features/Notification/Queries/NotificationQueries.cs:11`)
- `GetUnreadCountQuery` (`src/Core/Core.Application/Features/Notification/Queries/NotificationQueries.cs:22`)
- `GetPreferencesQuery` (`src/Core/Core.Application/Features/Notification/Queries/NotificationQueries.cs:27`)
- `GetWebhookSubscriptionsQuery` (`src/Core/Core.Application/Features/Webhooks/Queries/WebhookQueries.cs:11`)
- `GetWebhookSubscriptionByIdQuery` (`src/Core/Core.Application/Features/Webhooks/Queries/WebhookQueries.cs:21`)
- `GetWebhookDeliveryLogsQuery` (`src/Core/Core.Application/Features/Webhooks/Queries/WebhookQueries.cs:28`)
- `GetAvailableWebhookEventsQuery` (`src/Core/Core.Application/Features/Webhooks/Queries/WebhookQueries.cs:39`)
- `GetWebhookAnalyticsQuery` (`src/Core/Core.Application/Features/Webhooks/Queries/WebhookQueries.cs:45`)
- `GetWebhookDeadLettersQuery` (`src/Core/Core.Application/Features/Webhooks/Queries/WebhookQueries.cs:51`)
- `GetWebhookHealthSummaryQuery` (`src/Core/Core.Application/Features/Webhooks/Queries/WebhookQueries.cs:60`)
- `ThrowingResultQuery` (`tests/Core.Application.Tests/Behaviors/DomainExceptionHandlerTests.cs:207`)
- `ThrowingRawQuery` (`tests/Core.Application.Tests/Behaviors/DomainExceptionHandlerTests.cs:222`)
- `TestQuery` (`tests/Core.Application.Tests/LoggingBehaviorTests.cs:16`)

### Background Jobs (10) & UAT Seeders / Providers (5)
- **[Job]** `EmailProcessingJob` (`src/Core/Core.Infrastructure/BackgroundJobs/EmailProcessingJob.cs:11`)
- **[Job]** `IAutoRegisteredJob` (`src/Core/Core.Infrastructure/BackgroundJobs/IAutoRegisteredJob.cs:6`)
- **[Job]** `IdempotencyReceiptPurgeJob` (`src/Core/Core.Infrastructure/BackgroundJobs/IdempotencyReceiptPurgeJob.cs:13`)
- **[Job]** `OutboxCleanupJob` (`src/Core/Core.Infrastructure/BackgroundJobs/OutboxCleanupJob.cs:13`)
- **[Job]** `RecurringJobBase` (`src/Core/Core.Infrastructure/BackgroundJobs/RecurringJobBase.cs:9`)
- **[Job]** `SoftDeleteCleanupJob` (`src/Core/Core.Infrastructure/BackgroundJobs/SoftDeleteCleanupJob.cs:52`)
- **[Job]** `WebhookLogCleanupJob` (`src/Core/Core.Infrastructure/BackgroundJobs/WebhookLogCleanupJob.cs:12`)
- **[Job]** `WebhookRetryJob` (`src/Core/Core.Infrastructure/BackgroundJobs/WebhookRetryJob.cs:14`)
- **[Job]** `OutboxProcessorJob` (`src/Core/Core.Infrastructure/Outbox/OutboxProcessor.cs:22`)
- **[Job]** `EmailQueueWorker` (`src/Core/Core.Infrastructure/Services/EmailQueueWorker.cs:11`)
- **[Provider]** `IModuleFeatureProvider` (`src/Core/Core.Application/Abstractions/Seeding/IModuleFeatureProvider.cs:11`)
- **[Provider]** `IModuleMenuProvider` (`src/Core/Core.Application/Abstractions/Seeding/IModuleMenuProvider.cs:15`)
- **[Provider]** `IModulePermissionProvider` (`src/Core/Core.Application/Abstractions/Seeding/IModulePermissionProvider.cs:12`)
- **[Seeder]** `IModuleDevDataSeeder` (`src/Core/Core.Infrastructure/Architecture/IModuleDevDataSeeder.cs:7`)
- **[Seeder]** `IModuleSeeder` (`src/Core/Core.Infrastructure/Architecture/IModuleSeeder.cs:6`)

---

## 3. Analytics Module

- **Schema**: `analytics`
- **Footprint**: `62` files | `2` entities | `1` commands | `2` queries | `3` handlers | `1` validators | **`0` controllers (`0` HTTP endpoints)** | `2` DB tables | `0` jobs | `5` seeders/providers | `11` test files

### Database Contexts & Tables (`DbSet<T>` — 2 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `analytics.AnalyticsEvents` | `AnalyticsEvent` | `AnalyticsDbContext` | `src/Modules/Analytics/Analytics.Infrastructure/Persistence/AnalyticsDbContext.cs:34` |
| `analytics.AnalyticsDailyMetrics` | `AnalyticsDailyMetric` | `AnalyticsDbContext` | `src/Modules/Analytics/Analytics.Infrastructure/Persistence/AnalyticsDbContext.cs:35` |

### Domain Entities (2)
- **`AnalyticsDailyMetric`** (`src/Modules/Analytics/Analytics.Domain/Entities/AnalyticsDailyMetric.cs:17`) : `AuditableEntity, ITenantAwareEntity`
- **`AnalyticsEvent`** (`src/Modules/Analytics/Analytics.Domain/Entities/AnalyticsEvent.cs:20`) : `AuditableEntity, ITenantAwareEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (1)
- `TrackEventCommand` (`src/Modules/Analytics/Analytics.Application/Commands/Events/TrackEventCommand.cs:13`)

### CQRS Queries (2)
- `GetAnalyticsEventsQuery` (`src/Modules/Analytics/Analytics.Application/Queries/AnalyticsQueries.cs:24`)
- `GetDailyMetricsQuery` (`src/Modules/Analytics/Analytics.Application/Queries/AnalyticsQueries.cs:41`)

### Background Jobs (0) & UAT Seeders / Providers (5)
- **[Provider]** `AnalyticsFeatureProvider` (`src/Modules/Analytics/Analytics.Infrastructure/Providers/AnalyticsFeatureProvider.cs:8`)
- **[Provider]** `AnalyticsMenuProvider` (`src/Modules/Analytics/Analytics.Infrastructure/Providers/AnalyticsMenuProvider.cs:29`)
- **[Provider]** `AnalyticsPermissionProvider` (`src/Modules/Analytics/Analytics.Infrastructure/Providers/AnalyticsPermissionProvider.cs:16`)
- **[Seeder]** `AnalyticsModuleSeeder` (`src/Modules/Analytics/Analytics.Infrastructure/Persistence/AnalyticsModuleSeeder.cs:17`)
- **[Seeder]** `AnalyticsDevDataSeeder` (`src/Modules/Analytics/Analytics.Infrastructure/Persistence/Seeding/AnalyticsDevDataSeeder.cs:13`)

---

## 4. CatalogPricing Module

- **Schema**: `catalog_pricing`
- **Footprint**: `191` files | `27` entities | `4` commands | `2` queries | `6` handlers | `4` validators | **`0` controllers (`0` HTTP endpoints)** | `15` DB tables | `2` jobs | `5` seeders/providers | `38` test files

### Database Contexts & Tables (`DbSet<T>` — 15 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `catalog_pricing.CatalogItems` | `CatalogItem` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:35` |
| `catalog_pricing.Offerings` | `Offering` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:36` |
| `catalog_pricing.ResourceRentalOfferings` | `ResourceRentalOffering` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:37` |
| `catalog_pricing.PriceBooks` | `PriceBook` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:38` |
| `catalog_pricing.PriceBookVersions` | `PriceBookVersion` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:39` |
| `catalog_pricing.PriceEntries` | `PriceEntry` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:40` |
| `catalog_pricing.PricingRules` | `PricingRule` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:41` |
| `catalog_pricing.CustomerAgreementRates` | `CustomerAgreementRate` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:42` |
| `catalog_pricing.DiscountRules` | `DiscountRule` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:43` |
| `catalog_pricing.TaxCategories` | `TaxCategory` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:44` |
| `catalog_pricing.PriceQuotes` | `PriceQuote` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:45` |
| `catalog_pricing.PriceQuoteLines` | `PriceQuoteLine` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:46` |
| `catalog_pricing.PriceQuoteOverrides` | `PriceQuoteOverride` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:47` |
| `catalog_pricing.PriceSnapshots` | `PriceSnapshot` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:48` |
| `catalog_pricing.PriceSnapshotLines` | `PriceSnapshotLine` | `CatalogPricingDbContext` | `src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingDbContext.cs:49` |

### Domain Entities (27)
- **`CalculationType`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/CalculationType.cs:14`)
- **`CatalogItem`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/CatalogItem.cs:13`) : `AuditableEntity, ITenantAwareEntity`
- **`CatalogItemStatus`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/CatalogItemStatus.cs:8`)
- **`CustomerAgreementRate`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/CustomerAgreementRate.cs:15`) : `AuditableEntity, ITenantAwareEntity`
- **`DiscountCalculationType`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/DiscountCalculationType.cs:10`)
- **`DiscountRule`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/DiscountRule.cs:15`) : `AuditableEntity, ITenantAwareEntity`
- **`Offering`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/Offering.cs:13`) : `AuditableEntity, ITenantAwareEntity`
- **`OfferingStatus`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/OfferingStatus.cs:9`)
- **`PriceBook`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceBook.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`PriceBookStatus`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceBookStatus.cs:8`)
- **`PriceBookVersion`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceBookVersion.cs:15`) : `AuditableEntity, ITenantAwareEntity`
- **`PriceBookVersionStatus`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceBookVersionStatus.cs:10`)
- **`PriceEntry`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceEntry.cs:11`) : `AuditableEntity, ITenantAwareEntity`
- **`PriceQuote`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceQuote.cs:14`) : `AuditableEntity, ITenantAwareEntity`
- **`PriceQuoteLine`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceQuoteLine.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`PriceQuoteLineType`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceQuoteLineType.cs:12`)
- **`PriceQuoteOverride`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceQuoteOverride.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`PriceQuoteStatus`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceQuoteStatus.cs:8`)
- **`PriceSnapshot`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceSnapshot.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`PriceSnapshotLine`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceSnapshotLine.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`PriceSnapshotStatus`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceSnapshotStatus.cs:8`)
- **`PricingRule`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PricingRule.cs:12`) : `AuditableEntity, ITenantAwareEntity`
- **`PricingUnit`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PricingUnit.cs:10`)
- **`ResourceRentalOffering`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/ResourceRentalOffering.cs:12`) : `AuditableEntity, ITenantAwareEntity`
- **`StackingPolicy`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/StackingPolicy.cs:14`)
- **`TaxCategory`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/TaxCategory.cs:13`) : `AuditableEntity, ITenantAwareEntity`
- **`TaxCategoryStatus`** (`src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/TaxCategoryStatus.cs:8`)

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (4)
- `CalculatePriceQuoteCommand` (`src/Modules/CatalogPricing/CatalogPricing.Application/Commands/CalculatePriceQuoteCommand.cs:14`)
- `ConfigureResourceRentalPriceCommand` (`src/Modules/CatalogPricing/CatalogPricing.Application/Commands/ConfigureResourceRentalPriceCommand.cs:13`)
- `CreateTaxCategoryCommand` (`src/Modules/CatalogPricing/CatalogPricing.Application/Commands/CreateTaxCategoryCommand.cs:12`)
- `OverridePriceQuoteCommand` (`src/Modules/CatalogPricing/CatalogPricing.Application/Commands/OverridePriceQuoteCommand.cs:12`)

### CQRS Queries (2)
- `GetResourceRentalPriceConfigurationQuery` (`src/Modules/CatalogPricing/CatalogPricing.Application/Queries/GetResourceRentalPriceConfigurationQuery.cs:12`)
- `GetTaxCategoriesQuery` (`src/Modules/CatalogPricing/CatalogPricing.Application/Queries/GetTaxCategoriesQuery.cs:11`)

### Background Jobs (2) & UAT Seeders / Providers (5)
- **[Job]** `CatalogPricingSoftDeleteCleanupJob` (`src/Modules/CatalogPricing/CatalogPricing.Infrastructure/BackgroundJobs/CatalogPricingSoftDeleteCleanupJob.cs:20`)
- **[Job]** `PriceQuoteExpiryJob` (`src/Modules/CatalogPricing/CatalogPricing.Infrastructure/BackgroundJobs/PriceQuoteExpiryJob.cs:14`)
- **[Provider]** `CatalogPricingFeatureProvider` (`src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Providers/CatalogPricingFeatureProvider.cs:10`)
- **[Provider]** `CatalogPricingMenuProvider` (`src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Providers/CatalogPricingMenuProvider.cs:20`)
- **[Provider]** `CatalogPricingPermissionProvider` (`src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Providers/CatalogPricingPermissionProvider.cs:34`)
- **[Seeder]** `CatalogPricingModuleSeeder` (`src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/CatalogPricingModuleSeeder.cs:17`)
- **[Seeder]** `CatalogPricingDevDataSeeder` (`src/Modules/CatalogPricing/CatalogPricing.Infrastructure/Persistence/Seeding/CatalogPricingDevDataSeeder.cs:14`)

---

## 5. Communication Module

- **Schema**: `communication`
- **Footprint**: `96` files | `4` entities | `2` commands | `0` queries | `4` handlers | `2` validators | **`0` controllers (`0` HTTP endpoints)** | `6` DB tables | `2` jobs | `6` seeders/providers | `10` test files

### Database Contexts & Tables (`DbSet<T>` — 6 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `communication.MessageTemplates` | `MessageTemplate` | `CommunicationDbContext` | `src/Modules/Communication/Communication.Infrastructure/Persistence/CommunicationDbContext.cs:37` |
| `communication.MessageTemplateVersions` | `MessageTemplateVersion` | `CommunicationDbContext` | `src/Modules/Communication/Communication.Infrastructure/Persistence/CommunicationDbContext.cs:39` |
| `communication.SentEmailLogs` | `SentEmailLog` | `CommunicationDbContext` | `src/Modules/Communication/Communication.Infrastructure/Persistence/CommunicationDbContext.cs:41` |
| `communication.SentSmsLogs` | `SentSmsLog` | `CommunicationDbContext` | `src/Modules/Communication/Communication.Infrastructure/Persistence/CommunicationDbContext.cs:43` |
| `communication.ChannelConfigurations` | `ChannelConfiguration` | `CommunicationDbContext` | `src/Modules/Communication/Communication.Infrastructure/Persistence/CommunicationDbContext.cs:45` |
| `communication.DeliveryAttempts` | `DeliveryAttempt` | `CommunicationDbContext` | `src/Modules/Communication/Communication.Infrastructure/Persistence/CommunicationDbContext.cs:47` |

### Domain Entities (4)
- **`ChannelConfiguration`** (`src/Modules/Communication/Communication.Domain/Entities/ChannelConfiguration.cs:9`) : `AuditableEntity`
- **`DeliveryAttempt`** (`src/Modules/Communication/Communication.Domain/Entities/DeliveryAttempt.cs:8`) : `AuditableEntity`
- **`MessageTemplateVersion`** (`src/Modules/Communication/Communication.Domain/Entities/MessageTemplateVersion.cs:8`) : `AuditableEntity`
- **`SentSmsLog`** (`src/Modules/Communication/Communication.Domain/Entities/SentSmsLog.cs:10`) : `AuditableEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (2)
- `UploadEmailAttachmentCommand` (`src/Modules/Communication/Communication.Application/Commands/UploadEmailAttachmentCommand.cs:22`)
- `UploadEmailImageCommand` (`src/Modules/Communication/Communication.Application/Commands/UploadEmailImageCommand.cs:12`)

### CQRS Queries (0)
_No CQRS queries._

### Background Jobs (2) & UAT Seeders / Providers (6)
- **[Job]** `CommunicationSoftDeleteCleanupJob` (`src/Modules/Communication/Communication.Infrastructure/BackgroundJobs/CommunicationSoftDeleteCleanupJob.cs:20`)
- **[Job]** `MessageRetryJob` (`src/Modules/Communication/Communication.Infrastructure/BackgroundJobs/MessageRetryJob.cs:18`)
- **[Provider]** `CommunicationFeatureProvider` (`src/Modules/Communication/Communication.Infrastructure/Providers/CommunicationFeatureProvider.cs:8`)
- **[Provider]** `CommunicationMenuProvider` (`src/Modules/Communication/Communication.Infrastructure/Providers/CommunicationMenuProvider.cs:21`)
- **[Provider]** `CommunicationPermissionProvider` (`src/Modules/Communication/Communication.Infrastructure/Providers/CommunicationPermissionProvider.cs:9`)
- **[Seeder]** `CommunicationModuleSeeder` (`src/Modules/Communication/Communication.Infrastructure/Persistence/CommunicationModuleSeeder.cs:13`)
- **[Seeder]** `CommunicationDevDataSeeder` (`src/Modules/Communication/Communication.Infrastructure/Persistence/Seeding/CommunicationDevDataSeeder.cs:15`)
- **[Seeder]** `MessageTemplateSeeder` (`src/Modules/Communication/Communication.Infrastructure/Persistence/Seeding/MessageTemplateSeeder.cs:23`)

---

## 6. Compliance Module

- **Schema**: `compliance`
- **Footprint**: `202` files | `11` entities | `19` commands | `14` queries | `32` handlers | `32` validators | **`0` controllers (`0` HTTP endpoints)** | `11` DB tables | `6` jobs | `9` seeders/providers | `24` test files

### Database Contexts & Tables (`DbSet<T>` — 11 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `compliance.RegulationProfiles` | `RegulationProfile` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:35` |
| `compliance.ConsentPurposes` | `ConsentPurpose` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:36` |
| `compliance.ConsentRecords` | `ConsentRecord` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:39` |
| `compliance.ConsentSnapshots` | `ConsentSnapshot` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:40` |
| `compliance.DataSubjectRequests` | `DataSubjectRequest` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:43` |
| `compliance.DsrStatusHistories` | `DsrStatusHistory` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:44` |
| `compliance.DsrModuleExecutions` | `DsrModuleExecution` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:45` |
| `compliance.RetentionPolicies` | `RetentionPolicy` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:48` |
| `compliance.RetentionExecutions` | `RetentionExecution` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:49` |
| `compliance.DataInventoryItems` | `DataInventoryItem` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:52` |
| `compliance.ComplianceReports` | `ComplianceReport` | `ComplianceDbContext` | `src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceDbContext.cs:53` |

### Domain Entities (11)
- **`ComplianceReport`** (`src/Modules/Compliance/Compliance.Domain/Entities/ComplianceReport.cs:9`) : `AuditableEntity`
- **`ConsentPurpose`** (`src/Modules/Compliance/Compliance.Domain/Entities/ConsentPurpose.cs:9`) : `AuditableEntity`
- **`ConsentRecord`** (`src/Modules/Compliance/Compliance.Domain/Entities/ConsentRecord.cs:11`) : `AuditableEntity`
- **`ConsentSnapshot`** (`src/Modules/Compliance/Compliance.Domain/Entities/ConsentSnapshot.cs:11`) : `AuditableEntity`
- **`DataInventoryItem`** (`src/Modules/Compliance/Compliance.Domain/Entities/DataInventoryItem.cs:11`) : `AuditableEntity`
- **`DataSubjectRequest`** (`src/Modules/Compliance/Compliance.Domain/Entities/DataSubjectRequest.cs:10`) : `AuditableEntity`
- **`DsrModuleExecution`** (`src/Modules/Compliance/Compliance.Domain/Entities/DsrModuleExecution.cs:10`) : `AuditableEntity`
- **`DsrStatusHistory`** (`src/Modules/Compliance/Compliance.Domain/Entities/DsrStatusHistory.cs:10`) : `AuditableEntity`
- **`RegulationProfile`** (`src/Modules/Compliance/Compliance.Domain/Entities/RegulationProfile.cs:9`) : `AuditableEntity`
- **`RetentionExecution`** (`src/Modules/Compliance/Compliance.Domain/Entities/RetentionExecution.cs:9`) : `AuditableEntity`
- **`RetentionPolicy`** (`src/Modules/Compliance/Compliance.Domain/Entities/RetentionPolicy.cs:11`) : `AuditableEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (19)
- `RecordConsentCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Consent/RecordConsentCommand.cs:12`)
- `CreateDataInventoryCommand` (`src/Modules/Compliance/Compliance.Application/Commands/DataInventory/CreateDataInventoryCommand.cs:12`)
- `DeleteDataInventoryCommand` (`src/Modules/Compliance/Compliance.Application/Commands/DataInventory/DeleteDataInventoryCommand.cs:13`)
- `UpdateDataInventoryCommand` (`src/Modules/Compliance/Compliance.Application/Commands/DataInventory/UpdateDataInventoryCommand.cs:13`)
- `CancelDsrCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Dsr/CancelDsrCommand.cs:10`)
- `ConfirmErasureCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Dsr/ConfirmErasureCommand.cs:10`)
- `ReviewDsrCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Dsr/ReviewDsrCommand.cs:10`)
- `SubmitDsrCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Dsr/SubmitDsrCommand.cs:21`)
- `AddConsentPurposeCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Regulations/AddConsentPurposeCommand.cs:12`)
- `CreateRegulationCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Regulations/CreateRegulationCommand.cs:12`)
- `DeleteRegulationCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Regulations/DeleteRegulationCommand.cs:13`)
- `RemoveConsentPurposeCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Regulations/RemoveConsentPurposeCommand.cs:12`)
- `UpdateConsentPurposeCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Regulations/UpdateConsentPurposeCommand.cs:13`)
- `UpdateRegulationCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Regulations/UpdateRegulationCommand.cs:13`)
- `GenerateComplianceReportCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Reports/GenerateComplianceReportCommand.cs:19`)
- `CreateRetentionPolicyCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Retention/CreateRetentionPolicyCommand.cs:20`)
- `DeleteRetentionPolicyCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Retention/DeleteRetentionPolicyCommand.cs:13`)
- `UpdateRetentionPolicyCommand` (`src/Modules/Compliance/Compliance.Application/Commands/Retention/UpdateRetentionPolicyCommand.cs:12`)
- `TestSecretCommand` (`tests/Compliance.Application.Tests/Idempotency/ComplianceIdempotencyReceiptTests.cs:547`)

### CQRS Queries (14)
- `GetConsentAnalyticsQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Consent/GetConsentAnalyticsQuery.cs:11`)
- `GetMyConsentQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Consent/GetMyConsentQuery.cs:12`)
- `GetComplianceDashboardQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Dashboard/GetComplianceDashboardQuery.cs:11`)
- `GetDataInventoryQuery` (`src/Modules/Compliance/Compliance.Application/Queries/DataInventory/GetDataInventoryQuery.cs:8`)
- `GetDsrByIdQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Dsr/GetDsrByIdQuery.cs:13`)
- `GetDsrExportDownloadQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Dsr/GetDsrExportDownloadQuery.cs:12`)
- `GetDsrListQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Dsr/GetDsrListQuery.cs:12`)
- `GetRegulationByIdQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Regulations/GetRegulationByIdQuery.cs:11`)
- `GetRegulationsQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Regulations/GetRegulationsQuery.cs:11`)
- `DownloadComplianceReportQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Reports/DownloadComplianceReportQuery.cs:11`)
- `GetComplianceReportByIdQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Reports/GetComplianceReportByIdQuery.cs:11`)
- `GetComplianceReportsQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Reports/GetComplianceReportsQuery.cs:15`)
- `GetRetentionExecutionsQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Retention/GetRetentionExecutionsQuery.cs:11`)
- `GetRetentionPoliciesQuery` (`src/Modules/Compliance/Compliance.Application/Queries/Retention/GetRetentionPoliciesQuery.cs:11`)

### Background Jobs (6) & UAT Seeders / Providers (9)
- **[Job]** `ComplianceSoftDeleteCleanupJob` (`src/Modules/Compliance/Compliance.Infrastructure/BackgroundJobs/ComplianceSoftDeleteCleanupJob.cs:20`)
- **[Job]** `ConsentExpiryJob` (`src/Modules/Compliance/Compliance.Infrastructure/BackgroundJobs/ConsentExpiryJob.cs:19`)
- **[Job]** `DsrEscalationJob` (`src/Modules/Compliance/Compliance.Infrastructure/BackgroundJobs/DsrEscalationJob.cs:19`)
- **[Job]** `DsrExecutionJob` (`src/Modules/Compliance/Compliance.Infrastructure/BackgroundJobs/DsrExecutionJob.cs:17`)
- **[Job]** `DsrExportCleanupJob` (`src/Modules/Compliance/Compliance.Infrastructure/BackgroundJobs/DsrExportCleanupJob.cs:11`)
- **[Job]** `RetentionEnforcementJob` (`src/Modules/Compliance/Compliance.Infrastructure/BackgroundJobs/RetentionEnforcementJob.cs:10`)
- **[Provider]** `ComplianceFeatureProvider` (`src/Modules/Compliance/Compliance.Infrastructure/Providers/ComplianceFeatureProvider.cs:16`)
- **[Provider]** `ComplianceMenuProvider` (`src/Modules/Compliance/Compliance.Infrastructure/Providers/ComplianceMenuProvider.cs:22`)
- **[Provider]** `CompliancePermissionProvider` (`src/Modules/Compliance/Compliance.Infrastructure/Providers/CompliancePermissionProvider.cs:15`)
- **[Seeder]** `ComplianceStartupSeeder` (`src/Modules/Compliance/Compliance.Infrastructure/Persistence/ComplianceModuleSeeder.cs:15`)
- **[Seeder]** `ComplianceDevDataSeeder` (`src/Modules/Compliance/Compliance.Infrastructure/Persistence/Seeding/ComplianceDevDataSeeder.cs:14`)
- **[Seeder]** `ConsentPurposeSeeder` (`src/Modules/Compliance/Compliance.Infrastructure/Persistence/Seeding/ConsentPurposeSeeder.cs:10`)
- **[Seeder]** `DataInventorySeeder` (`src/Modules/Compliance/Compliance.Infrastructure/Persistence/Seeding/DataInventorySeeder.cs:10`)
- **[Seeder]** `RegulationProfileSeeder` (`src/Modules/Compliance/Compliance.Infrastructure/Persistence/Seeding/RegulationProfileSeeder.cs:10`)
- **[Seeder]** `RetentionPolicySeeder` (`src/Modules/Compliance/Compliance.Infrastructure/Persistence/Seeding/RetentionPolicySeeder.cs:10`)

---

## 7. CRM Module

- **Schema**: `crm`
- **Footprint**: `399` files | `18` entities | `30` commands | `16` queries | `64` handlers | `30` validators | **`0` controllers (`0` HTTP endpoints)** | `16` DB tables | `1` jobs | `13` seeders/providers | `26` test files

### Database Contexts & Tables (`DbSet<T>` — 16 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `crm.Leads` | `CrmLead` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:44` |
| `crm.Opportunities` | `CrmOpportunity` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:45` |
| `crm.OpportunityStageHistory` | `CrmOpportunityStageHistory` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:46` |
| `crm.AccountPartyRefs` | `CrmAccountPartyRef` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:48` |
| `crm.ContactPartyRefs` | `CrmContactPartyRef` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:49` |
| `crm.Pipelines` | `CrmPipeline` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:50` |
| `crm.PipelineStages` | `CrmPipelineStage` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:51` |
| `crm.PipelineTransitions` | `CrmPipelineTransition` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:52` |
| `crm.PipelineRules` | `CrmPipelineRule` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:53` |
| `crm.DealContactRoles` | `CrmDealContactRole` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:54` |
| `crm.RecordManagerGrants` | `CrmRecordManagerGrant` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:55` |
| `crm.PartyCorrelations` | `CrmPartyOperationCorrelation` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:57` |
| `crm.LegacyOrigins` | `CrmLegacyOrigin` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:59` |
| `crm.SalesActivities` | `CrmSalesActivity` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:60` |
| `crm.TenantSettings` | `CrmTenantSettings` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:61` |
| `crm.UserPreferences` | `CrmUserPreferenceSettings` | `CRMDbContext` | `src/Modules/CRM/CRM.Infrastructure/Persistence/CRMDbContext.cs:62` |

### Domain Entities (18)
- **`CrmAccountPartyRef`** (`src/Modules/CRM/CRM.Domain/Entities/CrmAccountPartyRef.cs:12`)
- **`CrmContactPartyRef`** (`src/Modules/CRM/CRM.Domain/Entities/CrmContactPartyRef.cs:11`)
- **`CrmDealContactRole`** (`src/Modules/CRM/CRM.Domain/Entities/CrmDealContactRole.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`CrmIdempotencyReceipt`** (`src/Modules/CRM/CRM.Domain/Entities/CrmIdempotencyReceipt.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`CrmLead`** (`src/Modules/CRM/CRM.Domain/Entities/CrmLead.Behavior.cs:11`)
- **`CrmLead`** (`src/Modules/CRM/CRM.Domain/Entities/CrmLead.cs:12`)
- **`CrmLegacyOrigin`** (`src/Modules/CRM/CRM.Domain/Entities/CrmLegacyOrigin.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`CrmOpportunity`** (`src/Modules/CRM/CRM.Domain/Entities/CrmOpportunity.cs:12`)
- **`CrmOpportunityStageHistory`** (`src/Modules/CRM/CRM.Domain/Entities/CrmOpportunityStageHistory.cs:11`) : `Entity, ITenantAwareEntity`
- **`CrmPartyOperationCorrelation`** (`src/Modules/CRM/CRM.Domain/Entities/CrmPartyOperationCorrelation.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`CrmPipeline`** (`src/Modules/CRM/CRM.Domain/Entities/CrmPipeline.cs:9`) : `AuditableEntity, ITenantAwareEntity, IConcurrencyAwareEntity`
- **`CrmPipelineRule`** (`src/Modules/CRM/CRM.Domain/Entities/CrmPipelineRule.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`CrmPipelineStage`** (`src/Modules/CRM/CRM.Domain/Entities/CrmPipelineStage.cs:11`) : `AuditableEntity, ITenantAwareEntity`
- **`CrmPipelineTransition`** (`src/Modules/CRM/CRM.Domain/Entities/CrmPipelineTransition.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`CrmRecordManagerGrant`** (`src/Modules/CRM/CRM.Domain/Entities/CrmRecordManagerGrant.cs:11`) : `AuditableEntity, ITenantAwareEntity`
- **`CrmSalesActivity`** (`src/Modules/CRM/CRM.Domain/Entities/CrmSalesActivity.cs:11`) : `Entity, ITenantAwareEntity`
- **`CrmTenantSettings`** (`src/Modules/CRM/CRM.Domain/Entities/CrmTenantSettings.cs:13`) : `AuditableEntity, ITenantAwareEntity, IConcurrencyAwareEntity`
- **`CrmUserPreferenceSettings`** (`src/Modules/CRM/CRM.Domain/Entities/CrmUserPreferenceSettings.cs:12`)

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (30)
- `CreateAccountCommand` (`src/Modules/CRM/CRM.Application/Commands/Accounts/CreateAccountCommand.cs:12`)
- `UpdateAccountCommand` (`src/Modules/CRM/CRM.Application/Commands/Accounts/UpdateAccountCommand.cs:13`)
- `CreateActivityFollowUpCommand` (`src/Modules/CRM/CRM.Application/Commands/Activities/CreateActivityFollowUpCommand.cs:13`)
- `CreateSalesActivityCommand` (`src/Modules/CRM/CRM.Application/Commands/Activities/CreateSalesActivityCommand.cs:13`)
- `CreateContactCommand` (`src/Modules/CRM/CRM.Application/Commands/Contacts/CreateContactCommand.cs:12`)
- `UpdateContactCommand` (`src/Modules/CRM/CRM.Application/Commands/Contacts/UpdateContactCommand.cs:13`)
- `AssignLeadOwnerCommand` (`src/Modules/CRM/CRM.Application/Commands/Leads/AssignLeadOwnerCommand.cs:12`)
- `ConvertLeadToOpportunityCommand` (`src/Modules/CRM/CRM.Application/Commands/Leads/ConvertLeadToOpportunityCommand.cs:11`)
- `CreateLeadCommand` (`src/Modules/CRM/CRM.Application/Commands/Leads/CreateLeadCommand.cs:12`)
- `LinkPartyToLeadCommand` (`src/Modules/CRM/CRM.Application/Commands/Leads/LinkPartyToLeadCommand.cs:10`)
- `MoveLeadStageCommand` (`src/Modules/CRM/CRM.Application/Commands/Leads/MoveLeadStageCommand.cs:12`)
- `QualifyLeadCommand` (`src/Modules/CRM/CRM.Application/Commands/Leads/QualifyLeadCommand.cs:11`)
- `SubmitContactSalesLeadCommand` (`src/Modules/CRM/CRM.Application/Commands/Leads/SubmitContactSalesLeadCommand.cs:14`)
- `UpdateLeadCommand` (`src/Modules/CRM/CRM.Application/Commands/Leads/UpdateLeadCommand.cs:14`)
- `AddDealContactRoleCommand` (`src/Modules/CRM/CRM.Application/Commands/Opportunities/AddDealContactRoleCommand.cs:18`)
- `AssignOpportunityOwnerCommand` (`src/Modules/CRM/CRM.Application/Commands/Opportunities/AssignOpportunityOwnerCommand.cs:10`)
- `CloseOpportunityCommand` (`src/Modules/CRM/CRM.Application/Commands/Opportunities/CloseOpportunityCommand.cs:11`)
- `CreateOpportunityCommand` (`src/Modules/CRM/CRM.Application/Commands/Opportunities/CreateOpportunityCommand.cs:13`)
- `MoveOpportunityStageCommand` (`src/Modules/CRM/CRM.Application/Commands/Opportunities/MoveOpportunityStageCommand.cs:10`)
- `RemoveDealContactRoleCommand` (`src/Modules/CRM/CRM.Application/Commands/Opportunities/RemoveDealContactRoleCommand.cs:16`)
- `ReopenOpportunityCommand` (`src/Modules/CRM/CRM.Application/Commands/Opportunities/ReopenOpportunityCommand.cs:10`)
- `UpdateOpportunityCommand` (`src/Modules/CRM/CRM.Application/Commands/Opportunities/UpdateOpportunityCommand.cs:12`)
- `ActivatePipelineCommand` (`src/Modules/CRM/CRM.Application/Commands/Pipelines/ActivatePipelineCommand.cs:14`)
- `CreatePipelineCommand` (`src/Modules/CRM/CRM.Application/Commands/Pipelines/CreatePipelineCommand.cs:14`)
- `DeletePipelineCommand` (`src/Modules/CRM/CRM.Application/Commands/Pipelines/DeletePipelineCommand.cs:15`)
- `ReplacePipelineStageCommand` (`src/Modules/CRM/CRM.Application/Commands/Pipelines/ReplacePipelineStageCommand.cs:14`)
- `UpdateDefaultPipelineCommand` (`src/Modules/CRM/CRM.Application/Commands/Pipelines/UpdateDefaultPipelineCommand.cs:13`)
- `UpdatePipelineCommand` (`src/Modules/CRM/CRM.Application/Commands/Pipelines/UpdatePipelineCommand.cs:15`)
- `UpdateCrmTenantSettingsCommand` (`src/Modules/CRM/CRM.Application/Commands/Settings/UpdateCrmTenantSettingsCommand.cs:11`)
- `UpdateCrmUserPreferencesCommand` (`src/Modules/CRM/CRM.Application/Commands/Settings/UpdateCrmUserPreferencesCommand.cs:11`)

### CQRS Queries (16)
- `GetAccountByIdQuery` (`src/Modules/CRM/CRM.Application/Queries/Accounts/GetAccountByIdQuery.cs:11`)
- `GetAccountsQuery` (`src/Modules/CRM/CRM.Application/Queries/Accounts/GetAccountsQuery.cs:11`)
- `LookupCandidatePartiesQuery` (`src/Modules/CRM/CRM.Application/Queries/Accounts/LookupCandidatePartiesQuery.cs:11`)
- `GetSalesActivitiesQuery` (`src/Modules/CRM/CRM.Application/Queries/Activities/GetSalesActivitiesQuery.cs:16`)
- `GetContactByIdQuery` (`src/Modules/CRM/CRM.Application/Queries/Contacts/GetContactByIdQuery.cs:11`)
- `GetContactsQuery` (`src/Modules/CRM/CRM.Application/Queries/Contacts/GetContactsQuery.cs:11`)
- `GetLeadByIdQuery` (`src/Modules/CRM/CRM.Application/Queries/Leads/GetLeadByIdQuery.cs:12`)
- `GetLeadsQuery` (`src/Modules/CRM/CRM.Application/Queries/Leads/GetLeadsQuery.cs:12`)
- `GetDealContactRolesQuery` (`src/Modules/CRM/CRM.Application/Queries/Opportunities/GetDealContactRolesQuery.cs:15`)
- `GetOpportunitiesQuery` (`src/Modules/CRM/CRM.Application/Queries/Opportunities/GetOpportunitiesQuery.cs:12`)
- `GetOpportunityByIdQuery` (`src/Modules/CRM/CRM.Application/Queries/Opportunities/GetOpportunityByIdQuery.cs:11`)
- `GetAllPipelinesQuery` (`src/Modules/CRM/CRM.Application/Queries/Pipelines/GetAllPipelinesQuery.cs:15`)
- `GetDefaultPipelineQuery` (`src/Modules/CRM/CRM.Application/Queries/Pipelines/GetDefaultPipelineQuery.cs:11`)
- `GetPipelineReportQuery` (`src/Modules/CRM/CRM.Application/Queries/Reports/GetPipelineReportQuery.cs:11`)
- `GetCrmGovernanceCatalogQuery` (`src/Modules/CRM/CRM.Application/Queries/Settings/GetCrmGovernanceCatalogQuery.cs:11`)
- `GetCrmSettingsQuery` (`src/Modules/CRM/CRM.Application/Queries/Settings/GetCrmSettingsQuery.cs:11`)

### Background Jobs (1) & UAT Seeders / Providers (13)
- **[Job]** `CRMSoftDeleteCleanupJob` (`src/Modules/CRM/CRM.Infrastructure/BackgroundJobs/CRMSoftDeleteCleanupJob.cs:20`)
- **[Provider]** `CRMFeatureProvider` (`src/Modules/CRM/CRM.Infrastructure/Providers/CRMFeatureProvider.cs:10`)
- **[Provider]** `CRMMenuProvider` (`src/Modules/CRM/CRM.Infrastructure/Providers/CRMMenuProvider.cs:14`)
- **[Provider]** `CRMPermissionProvider` (`src/Modules/CRM/CRM.Infrastructure/Providers/CRMPermissionProvider.Bridge.cs:8`)
- **[Provider]** `CRMPermissionProvider` (`src/Modules/CRM/CRM.Infrastructure/Providers/CRMPermissionProvider.cs:12`)
- **[Seeder]** `CRMModuleSeeder` (`src/Modules/CRM/CRM.Infrastructure/Persistence/CRMModuleSeeder.cs:18`)
- **[Seeder]** `CRMDevDataSeeder` (`src/Modules/CRM/CRM.Infrastructure/Persistence/Seeding/CRMDevDataSeeder.AhlyClosedAndActivities.cs:12`)
- **[Seeder]** `CRMDevDataSeeder` (`src/Modules/CRM/CRM.Infrastructure/Persistence/Seeding/CRMDevDataSeeder.AhlyOpportunities.cs:12`)
- **[Seeder]** `CRMDevDataSeeder` (`src/Modules/CRM/CRM.Infrastructure/Persistence/Seeding/CRMDevDataSeeder.ApexAndCommunity.cs:13`)
- **[Seeder]** `CRMDevDataSeeder` (`src/Modules/CRM/CRM.Infrastructure/Persistence/Seeding/CRMDevDataSeeder.City.cs:13`)
- **[Seeder]** `CRMDevDataSeeder` (`src/Modules/CRM/CRM.Infrastructure/Persistence/Seeding/CRMDevDataSeeder.Falcon.cs:13`)
- **[Seeder]** `CRMDevDataSeeder` (`src/Modules/CRM/CRM.Infrastructure/Persistence/Seeding/CRMDevDataSeeder.cs:19`)
- **[Seeder]** `CrmPipelineSeeder` (`src/Modules/CRM/CRM.Infrastructure/Persistence/Seeding/CrmPipelineSeeder.cs:11`)
- **[Seeder]** `CrmSettingsSeeder` (`src/Modules/CRM/CRM.Infrastructure/Persistence/Seeding/CrmSettingsSeeder.cs:11`)

---

## 8. CustomFields Module

- **Schema**: `custom_fields`
- **Footprint**: `524` files | `17` entities | `39` commands | `30` queries | `75` handlers | `45` validators | **`0` controllers (`0` HTTP endpoints)** | `17` DB tables | `5` jobs | `8` seeders/providers | `141` test files

### Database Contexts & Tables (`DbSet<T>` — 17 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `custom_fields.CustomFields` | `CustomField` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:35` |
| `custom_fields.CustomFieldValues` | `CustomFieldValue` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:36` |
| `custom_fields.FieldDefinitions` | `FieldDefinition` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:37` |
| `custom_fields.FieldVersions` | `FieldVersion` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:38` |
| `custom_fields.FieldOptions` | `FieldOption` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:39` |
| `custom_fields.FieldGroups` | `FieldGroup` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:40` |
| `custom_fields.FieldVisibilityRules` | `FieldVisibilityRule` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:41` |
| `custom_fields.EntityFieldValues` | `EntityFieldValue` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:42` |
| `custom_fields.EntityFieldValueOptions` | `EntityFieldValueOption` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:43` |
| `custom_fields.ExtensibleEntityTypes` | `ExtensibleEntityType` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:44` |
| `custom_fields.OptionSets` | `OptionSet` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:45` |
| `custom_fields.OptionSetVersions` | `OptionSetVersion` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:46` |
| `custom_fields.OptionSetItems` | `OptionSetItem` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:47` |
| `custom_fields.FieldValueSnapshots` | `FieldValueSnapshot` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:48` |
| `custom_fields.CustomFieldTenantEncryptionKeys` | `CustomFieldTenantEncryptionKey` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:49` |
| `custom_fields.CustomFieldMigrationSessions` | `CustomFieldMigrationSession` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:51` |
| `custom_fields.CustomFieldEncryptionAuditLogs` | `CustomFieldEncryptionAuditLog` | `CustomFieldsDbContext` | `src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsDbContext.cs:53` |

### Domain Entities (17)
- **`CustomField`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/CustomField.cs:17`) : `AuditableEntity, ITenantAwareEntity`
- **`CustomFieldEncryptionAuditLog`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/CustomFieldEncryptionAuditLog.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`CustomFieldMigrationSession`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/CustomFieldMigrationSession.cs:11`) : `AuditableEntity, ITenantAwareEntity`
- **`CustomFieldTenantEncryptionKey`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/CustomFieldTenantEncryptionKey.cs:11`) : `AuditableEntity, ITenantAwareEntity`
- **`CustomFieldValue`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/CustomFieldValue.cs:15`) : `AuditableEntity, ITenantAwareEntity`
- **`EntityFieldValue`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/EntityFieldValue.cs:21`) : `AuditableEntity, ITenantAwareEntity`
- **`EntityFieldValueOption`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/EntityFieldValueOption.cs:18`) : `AuditableEntity, ITenantAwareEntity`
- **`ExtensibleEntityType`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/ExtensibleEntityType.cs:24`) : `AuditableEntity`
- **`FieldDefinition`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/FieldDefinition.cs:17`) : `AuditableEntity, ITenantAwareEntity`
- **`FieldGroup`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/FieldGroup.cs:21`) : `AuditableEntity, ITenantAwareEntity`
- **`FieldOption`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/FieldOption.cs:24`) : `AuditableEntity, ITenantAwareEntity`
- **`FieldValueSnapshot`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/FieldValueSnapshot.cs:49`) : `Entity, ITenantAwareEntity`
- **`FieldVersion`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/FieldVersion.cs:23`) : `AuditableEntity, ITenantAwareEntity`
- **`FieldVisibilityRule`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/FieldVisibilityRule.cs:19`) : `AuditableEntity, ITenantAwareEntity`
- **`OptionSet`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/OptionSet.cs:27`) : `AuditableEntity, ITenantAwareEntity`
- **`OptionSetItem`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/OptionSetItem.cs:36`) : `AuditableEntity, ITenantAwareEntity`
- **`OptionSetVersion`** (`src/Modules/CustomFields/CustomFields.Domain/Entities/OptionSetVersion.cs:32`) : `AuditableEntity, ITenantAwareEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (39)
- `BackfillEntityFieldValuesCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/BackfillEntityFieldValuesCommand.cs:19`)
- `BackfillFieldDefinitionsCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/BackfillFieldDefinitionsCommand.cs:16`)
- `BackfillFieldGroupStableKeysCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/BackfillFieldGroupStableKeysCommand.cs:33`)
- `CreateCustomFieldCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/CustomFieldCommands.cs:14`)
- `UpdateCustomFieldCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/CustomFieldCommands.cs:76`)
- `DeleteCustomFieldCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/CustomFieldCommands.cs:149`)
- `InitializeTenantEncryptionKeyCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/EncryptionKeyCommands.cs:11`)
- `RotateTenantEncryptionKeyCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/EncryptionKeyCommands.cs:21`)
- `RevokeTenantEncryptionKeyCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/EncryptionKeyCommands.cs:32`)
- `StartTenantRewrapMigrationCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/EncryptionKeyCommands.cs:43`)
- `CancelTenantRewrapMigrationCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/EncryptionKeyCommands.cs:55`)
- `StartClusterRewrapMigrationCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/EncryptionKeyCommands.cs:65`)
- `CreateFieldGroupCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/FieldGroupCommands.cs:12`)
- `UpdateFieldGroupCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/FieldGroupCommands.cs:37`)
- `DeleteFieldGroupCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/FieldGroupCommands.cs:57`)
- `ReorderFieldGroupsCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/FieldGroupCommands.cs:77`)
- `CreateFieldVisibilityRuleCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/FieldVisibilityRuleCommands.cs:19`)
- `UpdateFieldVisibilityRuleCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/FieldVisibilityRuleCommands.cs:42`)
- `DeleteFieldVisibilityRuleCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/FieldVisibilityRuleCommands.cs:58`)
- `ImportSchemaBundleCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/ImportSchemaBundleCommand.cs:23`)
- `MoveDateValuesToDateOnlyCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/MoveDateValuesToDateOnlyCommand.cs:37`)
- `RepairFieldDefinitionTwinsCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/RepairFieldDefinitionTwinsCommand.cs:27`)
- `RevealCustomFieldValueCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/RevealCustomFieldValueCommand.cs:13`)
- `SaveEntityCustomFieldValuesCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/SaveEntityCustomFieldValuesCommand.cs:15`)
- `SweepOrphanedFieldDefinitionTwinsCommand` (`src/Modules/CustomFields/CustomFields.Application/Commands/SweepOrphanedFieldDefinitionTwinsCommand.cs:24`)
- `CreateFieldVersionDraftCommand` (`src/Modules/CustomFields/CustomFields.Application/FieldVersions/CreateFieldVersionDraftCommand.cs:29`)
- `DiscardFieldVersionDraftCommand` (`src/Modules/CustomFields/CustomFields.Application/FieldVersions/DiscardFieldVersionDraftCommand.cs:81`)
- `PublishFieldVersionCommand` (`src/Modules/CustomFields/CustomFields.Application/FieldVersions/PublishFieldVersionCommand.cs:23`)
- `BindOptionSetCommand` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetBindingCommands.cs:50`)
- `RebindOptionSetCommand` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetBindingCommands.cs:72`)
- `UnbindOptionSetCommand` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetBindingCommands.cs:102`)
- `CreateOptionSetCommand` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetCommands.cs:47`)
- `UpdateOptionSetCommand` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetCommands.cs:65`)
- `DeleteOptionSetCommand` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetCommands.cs:90`)
- `CreateOptionSetVersionCommand` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetCommands.cs:109`)
- `UpdateOptionSetVersionCommand` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetCommands.cs:128`)
- `PublishOptionSetVersionCommand` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetCommands.cs:149`)
- `ChangeFieldTypeCommand` (`src/Modules/CustomFields/CustomFields.Application/TypeChange/ChangeFieldTypeCommand.cs:35`)
- `RollbackFieldTypeChangeCommand` (`src/Modules/CustomFields/CustomFields.Application/TypeChange/RollbackFieldTypeChangeCommand.cs:26`)

### CQRS Queries (30)
- `GetFieldVersionsQuery` (`src/Modules/CustomFields/CustomFields.Application/FieldVersions/GetFieldVersionsQuery.cs:48`)
- `GetOptionSetsQuery` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetQueries.cs:19`)
- `GetOptionSetByIdQuery` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetQueries.cs:25`)
- `GetOptionSetVersionQuery` (`src/Modules/CustomFields/CustomFields.Application/OptionSets/OptionSetQueries.cs:31`)
- `GetCustomFieldsQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/CustomFieldQueries.cs:12`)
- `GetCustomFieldByIdQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/CustomFieldQueries.cs:22`)
- `GetTenantEncryptionStatusQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/EncryptionKeyQueries.cs:11`)
- `GetMigrationSessionProgressQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/EncryptionKeyQueries.cs:17`)
- `GetEncryptionAuditLogsQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/EncryptionKeyQueries.cs:23`)
- `GetPlatformKeyringStatusQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/EncryptionKeyQueries.cs:32`)
- `ExportCustomFieldDefinitionsQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/ExportCustomFieldDefinitionsQuery.cs:31`)
- `ExportCustomFieldValuesQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/ExportCustomFieldValuesQuery.cs:68`)
- `ExportSchemaQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/ExportSchemaQueryHandler.cs:26`)
- `GetFieldGroupsQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/FieldGroupQueries.cs:11`)
- `GetFieldHistoryQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/FieldHistoryQueries.cs:24`)
- `GetFieldUsageQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/FieldUsageQueries.cs:21`)
- `GetFieldVisibilityRulesQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/FieldVisibilityRuleQueries.cs:14`)
- `GetBulkEntityCustomFieldValuesQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/GetBulkEntityCustomFieldValuesQuery.cs:15`)
- `GetEntityCustomFieldValuesQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/GetEntityCustomFieldValuesQuery.cs:14`)
- `GetEntityTypesQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/GetEntityTypesQuery.cs:13`)
- `ReconcileEntityFieldValuesQuery` (`src/Modules/CustomFields/CustomFields.Application/Queries/ReconcileEntityFieldValuesQuery.cs:60`)
- `FakeFieldRestrictionQuery` (`tests/API.IntegrationTests/CustomFields/CreateCustomFieldValueTypeReachabilityIntegrationTests.cs:282`)
- `FakeFieldRestrictionQuery` (`tests/API.IntegrationTests/CustomFields/CurrencyDurationTimeColorIntegrationTests.cs:1027`)
- `FakeFieldRestrictionQuery` (`tests/API.IntegrationTests/CustomFields/DefinitionDualWriteIntegrationTests.cs:744`)
- `FakeFieldRestrictionQuery` (`tests/API.IntegrationTests/CustomFields/DualWriteIntegrationTests.cs:755`)
- `FakeFieldRestrictionQuery` (`tests/API.IntegrationTests/CustomFields/EmailUrlPhonePercentRatingIntegrationTests.cs:1023`)
- `FakeFieldRestrictionQuery` (`tests/API.IntegrationTests/CustomFields/NewValueTypesIntegrationTests.cs:1127`)
- `FakeFieldRestrictionQuery` (`tests/API.IntegrationTests/CustomFields/ReadCutoverIntegrationTests.cs:807`)
- `FakeFieldRestrictionQuery` (`tests/API.IntegrationTests/CustomFields/ValidatorKindIntegrationTests.cs:729`)
- `FakeFieldRestrictionQuery` (`tests/API.IntegrationTests/CustomFields/ValueTypeHandlerIntegrationTests.cs:855`)

### Background Jobs (5) & UAT Seeders / Providers (8)
- **[Job]** `CustomFieldsSoftDeleteCleanupJob` (`src/Modules/CustomFields/CustomFields.Infrastructure/BackgroundJobs/CustomFieldsSoftDeleteCleanupJob.cs:20`)
- **[Job]** `FieldValueSnapshotPurgeJob` (`src/Modules/CustomFields/CustomFields.Infrastructure/BackgroundJobs/FieldValueSnapshotPurgeJob.cs:27`)
- **[Job]** `TenantKeyRewrapJob` (`src/Modules/CustomFields/CustomFields.Infrastructure/BackgroundJobs/TenantKeyRewrapJob.Cluster.cs:10`)
- **[Job]** `TenantKeyRewrapJob` (`src/Modules/CustomFields/CustomFields.Infrastructure/BackgroundJobs/TenantKeyRewrapJob.Tenant.cs:10`)
- **[Job]** `TenantKeyRewrapJob` (`src/Modules/CustomFields/CustomFields.Infrastructure/BackgroundJobs/TenantKeyRewrapJob.cs:16`)
- **[Provider]** `CustomFieldOptionSetsPermissionProvider` (`src/Modules/CustomFields/CustomFields.Infrastructure/Providers/CustomFieldOptionSetsPermissionProvider.cs:21`)
- **[Provider]** `CustomFieldsFeatureProvider` (`src/Modules/CustomFields/CustomFields.Infrastructure/Providers/CustomFieldsFeatureProvider.cs:9`)
- **[Provider]** `CustomFieldsMenuProvider` (`src/Modules/CustomFields/CustomFields.Infrastructure/Providers/CustomFieldsMenuProvider.cs:40`)
- **[Provider]** `CustomFieldsPermissionProvider` (`src/Modules/CustomFields/CustomFields.Infrastructure/Providers/CustomFieldsPermissionProvider.cs:18`)
- **[Provider]** `FakeCanaryModuleFeatureProvider` (`tests/API.IntegrationTests/CustomFields/ReadCutoverIntegrationTests.cs:883`)
- **[Seeder]** `CustomFieldsModuleSeeder` (`src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/CustomFieldsModuleSeeder.cs:19`)
- **[Seeder]** `CustomFieldsDevDataSeeder` (`src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/Seeding/CustomFieldsDevDataSeeder.cs:15`)
- **[Seeder]** `PlatformOptionSetSeeder` (`src/Modules/CustomFields/CustomFields.Infrastructure/Persistence/Seeding/PlatformOptionSetSeeder.cs:16`)

---

## 9. Entitlements Module

- **Schema**: `entitlements`
- **Footprint**: `928` files | `80` entities | `109` commands | `75` queries | `185` handlers | `113` validators | **`0` controllers (`0` HTTP endpoints)** | `49` DB tables | `16` jobs | `13` seeders/providers | `63` test files

### Database Contexts & Tables (`DbSet<T>` — 49 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `entitlements.Features` | `Feature` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:35` |
| `entitlements.Editions` | `Edition` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:36` |
| `entitlements.EditionCategories` | `EditionCategory` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:37` |
| `entitlements.EditionFeatures` | `EditionFeature` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:38` |
| `entitlements.TenantSubscriptions` | `TenantSubscription` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:39` |
| `entitlements.TenantFeatureOverrides` | `TenantFeatureOverride` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:40` |
| `entitlements.TrialSnapshots` | `TrialSnapshot` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:41` |
| `entitlements.QuotaCounters` | `QuotaCounter` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:42` |
| `entitlements.TrialNotifications` | `TrialNotification` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:43` |
| `entitlements.EditionVersions` | `EditionVersion` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:44` |
| `entitlements.EditionPrices` | `EditionPrice` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:45` |
| `entitlements.OverrideCostAdjustments` | `OverrideCostAdjustment` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:46` |
| `entitlements.EditionPromotions` | `EditionPromotion` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:47` |
| `entitlements.PromotionRedemptions` | `PromotionRedemption` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:48` |
| `entitlements.OperationalAlerts` | `OperationalAlert` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:49` |
| `entitlements.Invoices` | `Invoice` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:50` |
| `entitlements.InvoiceLineItems` | `InvoiceLineItem` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:51` |
| `entitlements.PaymentTransactions` | `PaymentTransaction` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:52` |
| `entitlements.DunningNotifications` | `DunningNotification` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:53` |
| `entitlements.TenantPlans` | `TenantPlan` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:56` |
| `entitlements.TenantPlanFeatures` | `TenantPlanFeature` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:57` |
| `entitlements.UserSubscriptions` | `UserSubscription` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:58` |
| `entitlements.TenantFeatureDefinitions` | `TenantFeatureDefinition` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:59` |
| `entitlements.TenantPlanPrices` | `TenantPlanPrice` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:61` |
| `entitlements.TenantPlanVersions` | `TenantPlanVersion` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:62` |
| `entitlements.TenantPlanPromotions` | `TenantPlanPromotion` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:63` |
| `entitlements.TenantStripeAccounts` | `TenantStripeAccount` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:66` |
| `entitlements.TenantPaymentGateways` | `TenantPaymentGateway` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:67` |
| `entitlements.PlatformCommissions` | `PlatformCommission` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:68` |
| `entitlements.ConnectPlatformSettings` | `ConnectPlatformSettings` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:69` |
| `entitlements.AnalyticsSnapshots` | `AnalyticsSnapshot` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:72` |
| `entitlements.AnalyticsReportPreferences` | `AnalyticsReportPreference` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:73` |
| `entitlements.CommissionLedgerEntries` | `CommissionLedgerEntry` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:77` |
| `entitlements.CommissionInvoices` | `CommissionInvoice` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:78` |
| `entitlements.CommissionChargeAttempts` | `CommissionChargeAttempt` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:79` |
| `entitlements.GatewayPriceMappings` | `GatewayPriceMapping` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:81` |
| `entitlements.OnboardingQuestions` | `OnboardingQuestion` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:84` |
| `entitlements.OnboardingAnswerOptions` | `OnboardingAnswerOption` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:85` |
| `entitlements.OnboardingAnswerOptionConditions` | `OnboardingAnswerOptionCondition` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:86` |
| `entitlements.RecommendationRules` | `RecommendationRule` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:88` |
| `entitlements.SignupSessionAnswers` | `SignupSessionAnswer` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:89` |
| `entitlements.SignupWelcomeContents` | `SignupWelcomeContent` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:92` |
| `entitlements.SignupTrustMarks` | `SignupTrustMark` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:93` |
| `entitlements.SignupCustomerLogos` | `SignupCustomerLogo` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:94` |
| `entitlements.SignupContentSettings` | `SignupContentSettings` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:95` |
| `entitlements.StripeEventLogs` | `StripeEventLog` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:98` |
| `entitlements.PaymobEventLogs` | `PaymobEventLog` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:99` |
| `entitlements.PendingSignupSessions` | `PendingSignupSession` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:100` |
| `entitlements.RecurringBillingAttempts` | `RecurringBillingAttempt` | `EntitlementsDbContext` | `src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/EntitlementsDbContext.cs:101` |

### Domain Entities (80)
- **`AnalyticsReportPreference`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/AnalyticsReportPreference.cs:9`) : `AuditableEntity`
- **`ReportCadence`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/AnalyticsReportPreference.cs:43`)
- **`AnalyticsSnapshot`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/AnalyticsSnapshot.cs:20`) : `AuditableEntity`
- **`BillingCycle`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/BillingCycle.cs:7`)
- **`BillingCycleHelper`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/BillingCycle.cs:22`)
- **`CommissionChargeAttempt`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/CommissionChargeAttempt.cs:11`) : `AuditableEntity`
- **`CommissionChargeAttemptStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/CommissionChargeAttempt.cs:72`)
- **`CommissionLedgerStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/CommissionEnums.cs:6`)
- **`CommissionInvoiceStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/CommissionEnums.cs:27`)
- **`CommissionInvoice`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/CommissionInvoice.cs:19`) : `AuditableEntity`
- **`CommissionInvoiceTrigger`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/CommissionInvoice.cs:119`)
- **`CommissionLedgerEntry`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/CommissionLedgerEntry.cs:17`) : `AuditableEntity`
- **`ConnectPlatformSettings`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/ConnectPlatformSettings.cs:16`) : `AuditableEntity`
- **`DunningNotification`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/DunningNotification.cs:15`) : `AuditableEntity`
- **`Edition`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/Edition.cs:10`) : `AuditableEntity`
- **`EditionCategory`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/EditionCategory.cs:9`) : `AuditableEntity`
- **`EditionFeature`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/EditionFeature.cs:9`) : `AuditableEntity`
- **`EditionPrice`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/EditionPrice.cs:21`) : `AuditableEntity`
- **`EditionPromotion`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/EditionPromotion.cs:18`) : `AuditableEntity`
- **`PromotionType`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/EditionPromotion.cs:152`)
- **`PromotionDurationType`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/EditionPromotion.cs:165`)
- **`PromoSyncStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/EditionPromotion.cs:184`)
- **`EditionVersion`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/EditionVersion.cs:10`) : `AuditableEntity`
- **`Feature`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/Feature.cs:10`) : `AuditableEntity`
- **`FeatureValueType`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/FeatureValueType.cs:7`)
- **`GatewayPriceMapping`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/GatewayPriceMapping.cs:16`) : `AuditableEntity`
- **`Invoice`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/Invoice.cs:15`) : `AuditableEntity`
- **`InvoiceLineItem`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/InvoiceLineItem.cs:10`) : `AuditableEntity`
- **`InvoiceStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/InvoiceStatus.cs:7`)
- **`OnboardingAnswerOption`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/OnboardingAnswerOption.cs:11`) : `AuditableEntity`
- **`OnboardingAnswerOptionCondition`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/OnboardingAnswerOptionCondition.cs:14`) : `AuditableEntity`
- **`ConditionMatchMode`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/OnboardingAnswerOptionCondition.cs:72`)
- **`OnboardingQuestion`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/OnboardingQuestion.cs:11`) : `AuditableEntity`
- **`QuestionType`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/OnboardingQuestion.cs:123`)
- **`OperationalAlert`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/OperationalAlert.cs:20`) : `AuditableEntity`
- **`AlertStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/OperationalAlert.cs:80`)
- **`OverflowPolicy`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/OverflowPolicy.cs:7`)
- **`OverrideCostAdjustment`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/OverrideCostAdjustment.cs:22`) : `AuditableEntity`
- **`PaymentTransaction`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/PaymentTransaction.cs:11`) : `AuditableEntity`
- **`PaymobEventLog`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/PaymobEventLog.cs:6`) : `AuditableEntity`
- **`PendingSignupSession`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/PendingSignupSession.cs:8`) : `AuditableEntity`
- **`PlanBillingCycle`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/PlanBillingCycle.cs:7`)
- **`PlanStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/PlanStatus.cs:13`)
- **`PlatformCommission`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/PlatformCommission.cs:12`) : `AuditableEntity`
- **`PromotionRedemption`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/PromotionRedemption.cs:19`) : `Entity`
- **`QuotaCounter`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/QuotaCounter.cs:16`) : `AuditableEntity`
- **`RecommendationRule`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/RecommendationRule.cs:10`) : `AuditableEntity`
- **`RecurringBillingAttempt`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/RecurringBillingAttempt.cs:11`) : `AuditableEntity`
- **`RecurringBillingAttemptStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/RecurringBillingAttempt.cs:52`)
- **`RecurringBillingSubjectType`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/RecurringBillingAttempt.cs:66`)
- **`RolloutStrategy`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/RolloutEnums.cs:6`)
- **`RolloutStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/RolloutEnums.cs:24`)
- **`SignupContentSettings`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/SignupContentSettings.cs:12`) : `AuditableEntity`
- **`SignupCustomerLogo`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/SignupCustomerLogo.cs:12`) : `AuditableEntity`
- **`SignupSessionAnswer`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/SignupSessionAnswer.cs:11`) : `AuditableEntity`
- **`SignupTrustMark`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/SignupTrustMark.cs:12`) : `AuditableEntity`
- **`TrustMarkKind`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/SignupTrustMark.cs:62`)
- **`SignupWelcomeContent`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/SignupWelcomeContent.cs:14`) : `AuditableEntity`
- **`ConnectOnboardingStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/StripeConnectEnums.cs:6`)
- **`StripeAccountType`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/StripeConnectEnums.cs:24`)
- **`CommissionStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/StripeConnectEnums.cs:36`)
- **`StripeEventLog`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/StripeEventLog.cs:7`) : `AuditableEntity`
- **`SubscriptionStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/SubscriptionStatus.cs:7`)
- **`SubscriptionType`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/SubscriptionType.cs:7`)
- **`TenantFeatureDefinition`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantFeatureDefinition.cs:16`) : `AuditableEntity`
- **`TenantFeatureOverride`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantFeatureOverride.cs:11`) : `AuditableEntity`
- **`TenantPaymentGateway`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantPaymentGateway.cs:11`) : `AuditableEntity`
- **`TenantPlan`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantPlan.cs:25`) : `AuditableEntity`
- **`TenantPlanFeature`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantPlanFeature.cs:16`) : `Entity`
- **`TenantPlanPrice`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantPlanPrice.cs:19`) : `AuditableEntity`
- **`TenantPlanPromotion`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantPlanPromotion.cs:19`) : `AuditableEntity`
- **`TenantPlanVersion`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantPlanVersion.cs:16`) : `AuditableEntity`
- **`PlanVersionStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantPlanVersion.cs:62`)
- **`TenantStripeAccount`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantStripeAccount.cs:12`) : `AuditableEntity`
- **`TenantSubscription`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TenantSubscription.cs:11`) : `AuditableEntity`
- **`TransactionStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TransactionStatus.cs:7`)
- **`TrialNotification`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TrialNotification.cs:9`) : `AuditableEntity`
- **`TrialSnapshot`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/TrialSnapshot.cs:10`) : `AuditableEntity`
- **`UserSubscription`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/UserSubscription.cs:30`) : `AuditableEntity`
- **`UserSubscriptionStatus`** (`src/Modules/Entitlements/Entitlements.Domain/Entities/UserSubscriptionStatus.cs:6`)

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (109)
- `CancelStripeSubscriptionCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/CancelStripeSubscription/CancelStripeSubscriptionCommand.cs:13`)
- `ConfigureTenantGatewayCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ConfigureTenantGateway/ConfigureTenantGatewayCommand.cs:22`)
- `CreateBillingPortalCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/CreateBillingPortal/CreateBillingPortalCommand.cs:13`)
- `CreateCheckoutSessionCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/CreateCheckoutSession/CreateCheckoutSessionCommand.cs:24`)
- `CreatePaymentLinkCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/CreatePaymentLink/CreatePaymentLinkCommand.cs:15`)
- `CreateSignupCheckoutSessionCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/CreateSignupCheckoutSession/CreateSignupCheckoutSessionCommand.cs:11`)
- `ProcessPayPalWebhookCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessPayPalWebhook/ProcessPayPalWebhookCommand.cs:12`)
- `ProcessPaymobWebhookCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessPaymobWebhook/ProcessPaymobWebhookCommand.cs:12`)
- `ProcessStripeWebhookCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/ProcessStripeWebhookCommand.cs:12`)
- `ProcessStripeCheckoutCompletedCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/SubHandlers/ProcessStripeCheckoutCompletedCommandHandler.cs:33`)
- `ProcessCheckoutAsyncPaymentFailedCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/SubHandlers/StripeEventSubHandlers.cs:36`)
- `ProcessCheckoutExpiredCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/SubHandlers/StripeEventSubHandlers.cs:104`)
- `ProcessInvoicePaidCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/SubHandlers/StripeEventSubHandlers.cs:217`)
- `ProcessPaymentFailedCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/SubHandlers/StripeEventSubHandlers.cs:362`)
- `ProcessSubscriptionDeletedCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/SubHandlers/StripeEventSubHandlers.cs:486`)
- `ProcessSubscriptionUpdatedCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/SubHandlers/StripeEventSubHandlers.cs:560`)
- `ProcessTrialWillEndCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/SubHandlers/StripeEventSubHandlers.cs:744`)
- `ProcessChargeRefundedCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/SubHandlers/StripeEventSubHandlers.cs:914`)
- `ProcessPaymentIntentSucceededCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/ProcessStripeWebhook/SubHandlers/StripeEventSubHandlers.cs:1030`)
- `RemoveTenantGatewayCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/RemoveTenantGateway/RemoveTenantGatewayCommand.cs:16`)
- `SendInvoiceEmailCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/SendInvoiceEmail/SendInvoiceEmailCommand.cs:18`)
- `VerifyTenantGatewayCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/VerifyTenantGateway/VerifyTenantGatewayCommand.cs:13`)
- `RetryCommissionInvoiceChargeCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Commissions/RetryCommissionInvoiceCharge/RetryCommissionInvoiceChargeCommand.cs:11`)
- `WaiveCommissionInvoiceCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Commissions/WaiveCommissionInvoice/WaiveCommissionInvoiceCommand.cs:19`)
- `CreateConnectAccountCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Connect/CreateConnectAccount/CreateConnectAccountCommand.cs:14`)
- `ProcessConnectWebhookCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Connect/ProcessConnectWebhook/ProcessConnectWebhookCommand.cs:13`)
- `RefreshOnboardingLinkCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Connect/RefreshOnboardingLink/RefreshOnboardingLinkCommand.cs:13`)
- `SyncMyAccountCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Connect/SyncMyAccount/SyncMyAccountCommand.cs:17`)
- `UpdateGlobalCommissionRateCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Connect/UpdateGlobalCommissionRate/UpdateGlobalCommissionRateCommand.cs:26`)
- `UpdateTenantCommissionRateCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Connect/UpdateTenantCommissionRate/UpdateTenantCommissionRateCommand.cs:25`)
- `CreateEditionCategoryCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/EditionCategories/CreateEditionCategory/CreateEditionCategoryCommand.cs:14`)
- `DeleteEditionCategoryCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/EditionCategories/DeleteEditionCategory/DeleteEditionCategoryCommand.cs:14`)
- `UpdateEditionCategoryCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/EditionCategories/UpdateEditionCategory/UpdateEditionCategoryCommand.cs:27`)
- `CancelEditionVersionCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/EditionVersions/CancelEditionVersion/CancelEditionVersionCommand.cs:15`)
- `CreateEditionVersionCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/EditionVersions/CreateEditionVersion/CreateEditionVersionCommand.cs:15`)
- `PublishEditionVersionCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/EditionVersions/PublishEditionVersion/PublishEditionVersionCommand.cs:15`)
- `CreateEditionCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Editions/CreateEdition/CreateEditionCommand.cs:15`)
- `DeleteEditionCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Editions/DeleteEdition/DeleteEditionCommand.cs:15`)
- `RemoveEditionFeatureCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Editions/RemoveEditionFeature/RemoveEditionFeatureCommand.cs:15`)
- `SetEditionFeatureCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Editions/SetEditionFeature/SetEditionFeatureCommand.cs:33`)
- `SetEditionPricesCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Editions/SetEditionPrices/SetEditionPricesCommand.cs:31`)
- `UpdateEditionCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Editions/UpdateEdition/UpdateEditionCommand.cs:35`)
- `CreateFeatureCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Features/CreateFeature/CreateFeatureCommand.cs:13`)
- `DeleteFeatureCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Features/DeleteFeature/DeleteFeatureCommand.cs:13`)
- `DirectApplyEditionFeaturesCommand` (`src/Modules/Entitlements/Entitlements.Application/Commands/Features/DirectApplyEditionFeatures/DirectApplyEditionFeaturesCommand.cs:29`)
- *... plus 64 more commands.*

### CQRS Queries (75)
- `GetCohortAnalysisQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Analytics/GetCohortAnalysis/GetCohortAnalysisQuery.cs:11`)
- `GetLtvByEditionQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Analytics/GetLtvByEdition/GetLtvByEditionQuery.cs:11`)
- `GetMrrMovementQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Analytics/GetMrrMovement/GetMrrMovementQuery.cs:11`)
- `GetReportPreferenceQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Analytics/GetReportPreference/GetReportPreferenceQuery.cs:11`)
- `GetRevenueAnalyticsQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Analytics/GetRevenueAnalytics/GetRevenueAnalyticsQuery.cs:12`)
- `GetRevenueForecastQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Analytics/GetRevenueForecast/GetRevenueForecastQuery.cs:11`)
- `GetTenantHealthByIdQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Analytics/GetTenantHealthById/GetTenantHealthByIdQuery.cs:11`)
- `GetTenantHealthScoresQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Analytics/GetTenantHealthScores/GetTenantHealthScoresQuery.cs:11`)
- `GetBillingDashboardQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Billing/GetBillingDashboard/GetBillingDashboardQuery.cs:12`)
- `GetInvoiceByIdQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Billing/GetInvoiceById/GetInvoiceByIdQuery.cs:11`)
- `GetInvoicePdfQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Billing/GetInvoicePdf/GetInvoicePdfQuery.cs:12`)
- `GetInvoicesQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Billing/GetInvoices/GetInvoicesQuery.cs:12`)
- `GetPlatformStripeDashboardQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Billing/GetPlatformStripeDashboard/GetPlatformStripeDashboardQuery.cs:15`)
- `GetSignupCheckoutStatusQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Billing/GetSignupCheckoutStatus/GetSignupCheckoutStatusQuery.cs:9`)
- `GetTenantGatewaysQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Billing/GetTenantGateways/GetTenantGatewaysQuery.cs:12`)
- `GetAllCommissionsQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetAllCommissions/GetAllCommissionsQuery.cs:12`)
- `GetCommissionDashboardQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetCommissionDashboard/GetCommissionDashboardQuery.cs:12`)
- `GetCommissionInvoicesQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetCommissionInvoices/GetCommissionInvoicesQuery.cs:15`)
- `GetCommissionLedgersQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetCommissionLedgers/GetCommissionLedgersQuery.cs:15`)
- `GetCommissionTrendsQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetCommissionTrends/GetCommissionTrendsQuery.cs:12`)
- `GetEligibleTenantsForConnectQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetEligibleTenantsForConnect/GetEligibleTenantsForConnectQuery.cs:12`)
- `GetMyTransactionsQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetMyTransactions/GetMyTransactionsQuery.cs:13`)
- `GetTenantCommissionsQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetTenantCommissions/GetTenantCommissionsQuery.cs:12`)
- `GetTenantPayoutsQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetTenantPayouts/GetTenantPayoutsQuery.cs:12`)
- `GetTopTenantsQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetTopTenants/GetTopTenantsQuery.cs:12`)
- `GetTransactionsByTenantQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Commissions/GetTransactionsByTenant/GetTransactionsByTenantQuery.cs:12`)
- `GetConnectAccountQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Connect/GetConnectAccount/GetConnectAccountQuery.cs:12`)
- `GetConnectAccountsQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Connect/GetConnectAccounts/GetConnectAccountsQuery.cs:12`)
- `GetConnectDashboardLinkQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Connect/GetConnectDashboardLink/GetConnectDashboardLinkQuery.cs:11`)
- `GetEditionCategoriesQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/EditionCategories/GetEditionCategories/GetEditionCategoriesQuery.cs:12`)
- `GetEditionCategoryByIdQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/EditionCategories/GetEditionCategoryById/GetEditionCategoryByIdQuery.cs:12`)
- `GetEditionVersionsQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/EditionVersions/GetEditionVersions/GetEditionVersionsQuery.cs:15`)
- `GetEditionByIdQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Editions/GetEditionById/GetEditionByIdQuery.cs:13`)
- `GetEditionPricesQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Editions/GetEditionPrices/GetEditionPricesQuery.cs:14`)
- `GetEditionsQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Editions/GetEditions/GetEditionsQuery.cs:13`)
- `GetSignupRecommendationQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Editions/GetSignupRecommendation/GetSignupRecommendationQuery.cs:27`)
- `GetFeatureByIdQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Features/GetFeatureById/GetFeatureByIdQuery.cs:12`)
- `GetFeaturesQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Features/GetFeatures/GetFeaturesQuery.cs:12`)
- `GetGroupedFeaturesQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Features/GetGroupedFeatures/GetGroupedFeaturesQuery.cs:14`)
- `GetResolvedFeaturesQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Features/GetResolvedFeatures/GetResolvedFeaturesQuery.cs:12`)
- `GetTenantEffectiveFeaturesQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Features/GetTenantEffectiveFeatures/GetTenantEffectiveFeaturesQuery.cs:12`)
- `GetOnboardingFlowQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Onboarding/GetOnboardingFlow/GetOnboardingFlowQuery.cs:18`)
- `GetOnboardingRecommendationQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Onboarding/GetOnboardingRecommendation/GetOnboardingRecommendationQuery.cs:8`)
- `GetSignupWelcomeContentQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Onboarding/GetSignupWelcomeContent/GetSignupWelcomeContentQuery.cs:13`)
- `GetOnboardingQuestionByIdQuery` (`src/Modules/Entitlements/Entitlements.Application/Queries/Onboarding/Questions/GetOnboardingQuestionById/GetOnboardingQuestionByIdQuery.cs:11`)
- *... plus 30 more queries.*

### Background Jobs (16) & UAT Seeders / Providers (13)
- **[Job]** `AnalyticsReportJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/AnalyticsReportJob.cs:23`)
- **[Job]** `AnalyticsSnapshotJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/AnalyticsSnapshotJob.cs:29`)
- **[Job]** `CommissionAutoChargeJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/CommissionAutoChargeJob.cs:15`)
- **[Job]** `CommissionChargeReconciliationJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/CommissionChargeReconciliationJob.cs:15`)
- **[Job]** `CommissionInvoicingJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/CommissionInvoicingJob.cs:18`)
- **[Job]** `DunningNotificationJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/DunningNotificationJob.cs:31`)
- **[Job]** `EditionRolloutJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/EditionRolloutJob.cs:17`)
- **[Job]** `EntitlementsSoftDeleteCleanupJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/EntitlementsSoftDeleteCleanupJob.cs:20`)
- **[Job]** `PaymobRecurringBillingJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/PaymobRecurringBillingJob.cs:20`)
- **[Job]** `PendingSignupSessionRecoveryJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/PendingSignupSessionRecoveryJob.cs:16`)
- **[Job]** `PromoReconcileJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/PromoReconcileJob.cs:23`)
- **[Job]** `SignupReconciliationSweepJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/SignupReconciliationSweepJob.cs:33`)
- **[Job]** `SubscriptionReconciliationJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/SubscriptionReconciliationJob.cs:31`)
- **[Job]** `TenantHealthScoreJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/TenantHealthScoreJob.cs:29`)
- **[Job]** `TrialNotificationJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/TrialNotificationJob.cs:28`)
- **[Job]** `UserSubscriptionReconciliationJob` (`src/Modules/Entitlements/Entitlements.Infrastructure/BackgroundJobs/UserSubscriptionReconciliationJob.cs:36`)
- **[Provider]** `EntitlementsFeatureProvider` (`src/Modules/Entitlements/Entitlements.Infrastructure/Providers/EntitlementsFeatureProvider.cs:24`)
- **[Provider]** `EntitlementsMenuProvider` (`src/Modules/Entitlements/Entitlements.Infrastructure/Providers/EntitlementsMenuProvider.cs:17`)
- **[Provider]** `EntitlementsPermissionProvider` (`src/Modules/Entitlements/Entitlements.Infrastructure/Providers/EntitlementsPermissionProvider.cs:31`)
- **[Provider]** `SportsOperationsPacksFeatureProvider` (`src/Modules/Entitlements/Entitlements.Infrastructure/Providers/SportsOperationsPacksFeatureProvider.cs:23`)
- **[Seeder]** `EntitlementsStartupSeeder` (`src/Modules/Entitlements/Entitlements.Infrastructure/EntitlementsStartupSeeder.cs:16`)
- **[Seeder]** `ConnectSettingsSeeder` (`src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/Seeding/ConnectSettingsSeeder.cs:15`)
- **[Seeder]** `EditionSeeder` (`src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/Seeding/EditionSeeder.cs:38`)
- **[Seeder]** `EntitlementsDevDataSeeder` (`src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/Seeding/EntitlementsDevDataSeeder.cs:14`)
- **[Seeder]** `FeatureSeeder` (`src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/Seeding/FeatureSeeder.cs:20`)
- **[Seeder]** `OnboardingQuestionSeeder` (`src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/Seeding/OnboardingQuestionSeeder.cs:36`)
- **[Seeder]** `OnboardingRecommendationRuleSeeder` (`src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/Seeding/OnboardingRecommendationRuleSeeder.cs:31`)
- **[Seeder]** `SignupWelcomeContentSeeder` (`src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/Seeding/SignupWelcomeContentSeeder.cs:23`)
- **[Seeder]** `SubscriptionSeeder` (`src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/Seeding/SubscriptionSeeder.cs:21`)

---

## 10. Finance Module

- **Schema**: `finance`
- **Footprint**: `94` files | `11` entities | `5` commands | `10` queries | `15` handlers | `5` validators | **`0` controllers (`0` HTTP endpoints)** | `7` DB tables | `1` jobs | `5` seeders/providers | `9` test files

### Database Contexts & Tables (`DbSet<T>` — 7 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `finance.CustomerInvoices` | `CustomerInvoice` | `FinanceDbContext` | `src/Modules/Finance/Finance.Infrastructure/Persistence/FinanceDbContext.cs:32` |
| `finance.CustomerInvoiceLines` | `CustomerInvoiceLine` | `FinanceDbContext` | `src/Modules/Finance/Finance.Infrastructure/Persistence/FinanceDbContext.cs:33` |
| `finance.CustomerInvoiceAdjustments` | `CustomerInvoiceAdjustment` | `FinanceDbContext` | `src/Modules/Finance/Finance.Infrastructure/Persistence/FinanceDbContext.cs:34` |
| `finance.RecordedPayments` | `RecordedPayment` | `FinanceDbContext` | `src/Modules/Finance/Finance.Infrastructure/Persistence/FinanceDbContext.cs:36` |
| `finance.PaymentAllocations` | `PaymentAllocation` | `FinanceDbContext` | `src/Modules/Finance/Finance.Infrastructure/Persistence/FinanceDbContext.cs:37` |
| `finance.PaymentReceipts` | `PaymentReceipt` | `FinanceDbContext` | `src/Modules/Finance/Finance.Infrastructure/Persistence/FinanceDbContext.cs:38` |
| `finance.PaymentRefunds` | `PaymentRefund` | `FinanceDbContext` | `src/Modules/Finance/Finance.Infrastructure/Persistence/FinanceDbContext.cs:39` |

### Domain Entities (11)
- **`CustomerInvoice`** (`src/Modules/Finance/Finance.Domain/Entities/CustomerInvoice.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`CustomerInvoiceAdjustment`** (`src/Modules/Finance/Finance.Domain/Entities/CustomerInvoiceAdjustment.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`CustomerInvoiceLine`** (`src/Modules/Finance/Finance.Domain/Entities/CustomerInvoiceLine.cs:8`) : `AuditableEntity, ITenantAwareEntity`
- **`InvoiceLineType`** (`src/Modules/Finance/Finance.Domain/Entities/InvoiceLineType.cs:6`)
- **`InvoiceStatus`** (`src/Modules/Finance/Finance.Domain/Entities/InvoiceStatus.cs:6`)
- **`PaymentAllocation`** (`src/Modules/Finance/Finance.Domain/Entities/PaymentAllocation.cs:8`) : `AuditableEntity, ITenantAwareEntity`
- **`PaymentMethod`** (`src/Modules/Finance/Finance.Domain/Entities/PaymentMethod.cs:6`)
- **`PaymentReceipt`** (`src/Modules/Finance/Finance.Domain/Entities/PaymentReceipt.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`PaymentRefund`** (`src/Modules/Finance/Finance.Domain/Entities/PaymentRefund.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`PaymentStatus`** (`src/Modules/Finance/Finance.Domain/Entities/PaymentStatus.cs:6`)
- **`RecordedPayment`** (`src/Modules/Finance/Finance.Domain/Entities/RecordedPayment.cs:9`) : `AuditableEntity, ITenantAwareEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (5)
- `IssueCustomerInvoiceCommand` (`src/Modules/Finance/Finance.Application/Commands/FinanceCommands.cs:13`)
- `RecordExternalPaymentCommand` (`src/Modules/Finance/Finance.Application/Commands/FinanceCommands.cs:37`)
- `AllocatePaymentCommand` (`src/Modules/Finance/Finance.Application/Commands/FinanceCommands.cs:83`)
- `IssuePaymentReceiptCommand` (`src/Modules/Finance/Finance.Application/Commands/FinanceCommands.cs:99`)
- `RefundPaymentCommand` (`src/Modules/Finance/Finance.Application/Commands/FinanceCommands.cs:117`)

### CQRS Queries (10)
- `GetVenueMoneySummaryQuery` (`src/Modules/Finance/Finance.Application/Queries/FinanceAnalyticsQueries.cs:8`)
- `GetVenueMoneyTrendQuery` (`src/Modules/Finance/Finance.Application/Queries/FinanceAnalyticsQueries.cs:19`)
- `GetVenueMoneyByResourceQuery` (`src/Modules/Finance/Finance.Application/Queries/FinanceAnalyticsQueries.cs:31`)
- `GetVenueMoneyByTimeOfDayQuery` (`src/Modules/Finance/Finance.Application/Queries/FinanceAnalyticsQueries.cs:41`)
- `GetVenueMoneyPaymentMethodsQuery` (`src/Modules/Finance/Finance.Application/Queries/FinanceAnalyticsQueries.cs:52`)
- `GetCustomerInvoicesQuery` (`src/Modules/Finance/Finance.Application/Queries/FinanceQueries.cs:11`)
- `GetCustomerInvoiceByIdQuery` (`src/Modules/Finance/Finance.Application/Queries/FinanceQueries.cs:24`)
- `GetRecordedPaymentsQuery` (`src/Modules/Finance/Finance.Application/Queries/FinanceQueries.cs:34`)
- `GetRecordedPaymentByIdQuery` (`src/Modules/Finance/Finance.Application/Queries/FinanceQueries.cs:47`)
- `GetRecordedPaymentTimelineQuery` (`src/Modules/Finance/Finance.Application/Queries/FinanceQueries.cs:57`)

### Background Jobs (1) & UAT Seeders / Providers (5)
- **[Job]** `FinanceSoftDeleteCleanupJob` (`src/Modules/Finance/Finance.Infrastructure/BackgroundJobs/FinanceSoftDeleteCleanupJob.cs:20`)
- **[Provider]** `FinanceFeatureProvider` (`src/Modules/Finance/Finance.Infrastructure/Providers/FinanceFeatureProvider.cs:10`)
- **[Provider]** `FinanceMenuProvider` (`src/Modules/Finance/Finance.Infrastructure/Providers/FinanceMenuProvider.cs:9`)
- **[Provider]** `FinancePermissionProvider` (`src/Modules/Finance/Finance.Infrastructure/Providers/FinancePermissionProvider.cs:9`)
- **[Seeder]** `FinanceModuleSeeder` (`src/Modules/Finance/Finance.Infrastructure/Persistence/FinanceModuleSeeder.cs:17`)
- **[Seeder]** `FinanceDevDataSeeder` (`src/Modules/Finance/Finance.Infrastructure/Persistence/Seeding/FinanceDevDataSeeder.cs:14`)

---

## 11. Hrms Module

- **Schema**: `hrms`
- **Footprint**: `223` files | `7` entities | `21` commands | `14` queries | `35` handlers | `22` validators | **`0` controllers (`0` HTTP endpoints)** | `7` DB tables | `1` jobs | `6` seeders/providers | `44` test files

### Database Contexts & Tables (`DbSet<T>` — 7 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `hrms.StaffMembers` | `StaffMember` | `HrmsDbContext` | `src/Modules/Hrms/Hrms.Infrastructure/Persistence/HrmsDbContext.cs:33` |
| `hrms.EmploymentRecords` | `EmploymentRecord` | `HrmsDbContext` | `src/Modules/Hrms/Hrms.Infrastructure/Persistence/HrmsDbContext.cs:34` |
| `hrms.StaffAssignments` | `StaffAssignment` | `HrmsDbContext` | `src/Modules/Hrms/Hrms.Infrastructure/Persistence/HrmsDbContext.cs:35` |
| `hrms.StaffCompetencies` | `StaffCompetency` | `HrmsDbContext` | `src/Modules/Hrms/Hrms.Infrastructure/Persistence/HrmsDbContext.cs:36` |
| `hrms.Qualifications` | `Qualification` | `HrmsDbContext` | `src/Modules/Hrms/Hrms.Infrastructure/Persistence/HrmsDbContext.cs:37` |
| `hrms.Certifications` | `Certification` | `HrmsDbContext` | `src/Modules/Hrms/Hrms.Infrastructure/Persistence/HrmsDbContext.cs:38` |
| `hrms.StaffAvailabilities` | `StaffAvailability` | `HrmsDbContext` | `src/Modules/Hrms/Hrms.Infrastructure/Persistence/HrmsDbContext.cs:39` |

### Domain Entities (7)
- **`Certification`** (`src/Modules/Hrms/Hrms.Domain/Entities/Certification.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`EmploymentRecord`** (`src/Modules/Hrms/Hrms.Domain/Entities/EmploymentRecord.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`Qualification`** (`src/Modules/Hrms/Hrms.Domain/Entities/Qualification.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`StaffAssignment`** (`src/Modules/Hrms/Hrms.Domain/Entities/StaffAssignment.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`StaffAvailability`** (`src/Modules/Hrms/Hrms.Domain/Entities/StaffAvailability.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`StaffCompetency`** (`src/Modules/Hrms/Hrms.Domain/Entities/StaffCompetency.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`StaffMember`** (`src/Modules/Hrms/Hrms.Domain/Entities/StaffMember.cs:19`) : `AggregateRoot, ITenantAwareEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (21)
- `CreateCertificationCommand` (`src/Modules/Hrms/Hrms.Application/Commands/CertificationCommands.cs:11`)
- `UpdateCertificationCommand` (`src/Modules/Hrms/Hrms.Application/Commands/CertificationCommands.cs:27`)
- `DeleteCertificationCommand` (`src/Modules/Hrms/Hrms.Application/Commands/CertificationCommands.cs:60`)
- `CreateEmploymentRecordCommand` (`src/Modules/Hrms/Hrms.Application/Commands/EmploymentRecordCommands.cs:11`)
- `UpdateEmploymentRecordCommand` (`src/Modules/Hrms/Hrms.Application/Commands/EmploymentRecordCommands.cs:26`)
- `DeleteEmploymentRecordCommand` (`src/Modules/Hrms/Hrms.Application/Commands/EmploymentRecordCommands.cs:58`)
- `CreateQualificationCommand` (`src/Modules/Hrms/Hrms.Application/Commands/QualificationCommands.cs:11`)
- `UpdateQualificationCommand` (`src/Modules/Hrms/Hrms.Application/Commands/QualificationCommands.cs:26`)
- `DeleteQualificationCommand` (`src/Modules/Hrms/Hrms.Application/Commands/QualificationCommands.cs:58`)
- `CreateStaffAssignmentCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffAssignmentCommands.cs:11`)
- `UpdateStaffAssignmentCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffAssignmentCommands.cs:27`)
- `DeleteStaffAssignmentCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffAssignmentCommands.cs:55`)
- `CreateStaffAvailabilityCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffAvailabilityCommands.cs:11`)
- `UpdateStaffAvailabilityCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffAvailabilityCommands.cs:27`)
- `DeleteStaffAvailabilityCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffAvailabilityCommands.cs:58`)
- `CreateStaffCompetencyCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffCompetencyCommands.cs:11`)
- `UpdateStaffCompetencyCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffCompetencyCommands.cs:25`)
- `DeleteStaffCompetencyCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffCompetencyCommands.cs:51`)
- `CreateStaffMemberCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffMemberCommands.cs:11`)
- `UpdateStaffMemberCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffMemberCommands.cs:28`)
- `DeleteStaffMemberCommand` (`src/Modules/Hrms/Hrms.Application/Commands/StaffMemberCommands.cs:62`)

### CQRS Queries (14)
- `GetCertificationsQuery` (`src/Modules/Hrms/Hrms.Application/Queries/CertificationQueries.cs:12`)
- `GetCertificationByIdQuery` (`src/Modules/Hrms/Hrms.Application/Queries/CertificationQueries.cs:23`)
- `GetEmploymentRecordsQuery` (`src/Modules/Hrms/Hrms.Application/Queries/EmploymentRecordQueries.cs:12`)
- `GetEmploymentRecordByIdQuery` (`src/Modules/Hrms/Hrms.Application/Queries/EmploymentRecordQueries.cs:23`)
- `GetQualificationsQuery` (`src/Modules/Hrms/Hrms.Application/Queries/QualificationQueries.cs:12`)
- `GetQualificationByIdQuery` (`src/Modules/Hrms/Hrms.Application/Queries/QualificationQueries.cs:23`)
- `GetStaffAssignmentsQuery` (`src/Modules/Hrms/Hrms.Application/Queries/StaffAssignmentQueries.cs:12`)
- `GetStaffAssignmentByIdQuery` (`src/Modules/Hrms/Hrms.Application/Queries/StaffAssignmentQueries.cs:23`)
- `GetStaffAvailabilitiesQuery` (`src/Modules/Hrms/Hrms.Application/Queries/StaffAvailabilityQueries.cs:12`)
- `GetStaffAvailabilityByIdQuery` (`src/Modules/Hrms/Hrms.Application/Queries/StaffAvailabilityQueries.cs:23`)
- `GetStaffCompetenciesQuery` (`src/Modules/Hrms/Hrms.Application/Queries/StaffCompetencyQueries.cs:12`)
- `GetStaffCompetencyByIdQuery` (`src/Modules/Hrms/Hrms.Application/Queries/StaffCompetencyQueries.cs:23`)
- `GetStaffMembersQuery` (`src/Modules/Hrms/Hrms.Application/Queries/StaffMemberQueries.cs:12`)
- `GetStaffMemberByIdQuery` (`src/Modules/Hrms/Hrms.Application/Queries/StaffMemberQueries.cs:23`)

### Background Jobs (1) & UAT Seeders / Providers (6)
- **[Job]** `HrmsSoftDeleteCleanupJob` (`src/Modules/Hrms/Hrms.Infrastructure/BackgroundJobs/HrmsSoftDeleteCleanupJob.cs:20`)
- **[Provider]** `HrmsFeatureProvider` (`src/Modules/Hrms/Hrms.Infrastructure/Providers/HrmsFeatureProvider.cs:8`)
- **[Provider]** `HrmsMenuProvider` (`src/Modules/Hrms/Hrms.Infrastructure/Providers/HrmsMenuProvider.cs:21`)
- **[Provider]** `HrmsPermissionProvider` (`src/Modules/Hrms/Hrms.Infrastructure/Providers/HrmsPermissionProvider.Competencies.cs:8`)
- **[Provider]** `HrmsPermissionProvider` (`src/Modules/Hrms/Hrms.Infrastructure/Providers/HrmsPermissionProvider.cs:16`)
- **[Seeder]** `HrmsModuleSeeder` (`src/Modules/Hrms/Hrms.Infrastructure/Persistence/HrmsModuleSeeder.cs:17`)
- **[Seeder]** `HrmsDevDataSeeder` (`src/Modules/Hrms/Hrms.Infrastructure/Persistence/Seeding/HrmsDevDataSeeder.cs:14`)

---

## 12. Identity Module

- **Schema**: `identity`
- **Footprint**: `1101` files | `49` entities | `175` commands | `117` queries | `292` handlers | `170` validators | **`0` controllers (`0` HTTP endpoints)** | `46` DB tables | `5` jobs | `14` seeders/providers | `108` test files

### Database Contexts & Tables (`DbSet<T>` — 46 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `identity.Admins` | `Admin` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:45` |
| `identity.Users` | `User` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:46` |
| `identity.Roles` | `Role` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:47` |
| `identity.Permissions` | `Permission` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:48` |
| `identity.Tenants` | `Tenant` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:49` |
| `identity.AdminRoles` | `AdminRole` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:50` |
| `identity.RolePermissions` | `RolePermission` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:51` |
| `identity.RefreshTokens` | `RefreshToken` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:52` |
| `identity.OtpCodes` | `OtpCode` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:53` |
| `identity.MenuItems` | `MenuItem` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:54` |
| `identity.Workspaces` | `Workspace` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:55` |
| `identity.TenantPermissions` | `TenantPermission` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:56` |
| `identity.TenantSettings` | `TenantSettings` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:57` |
| `identity.TenantDomains` | `TenantDomain` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:58` |
| `identity.RoleMenuItems` | `RoleMenuItem` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:59` |
| `identity.TenantMenuOverrides` | `TenantMenuOverride` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:60` |
| `identity.SystemSettings` | `SystemSettings` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:63` |
| `identity.LoginThemes` | `LoginTheme` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:64` |
| `identity.SettingsAuditLogs` | `SettingsAuditLog` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:65` |
| `identity.TenantThemeFavorites` | `TenantThemeFavorite` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:68` |
| `identity.ThemeApplyLogs` | `ThemeApplyLog` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:69` |
| `identity.LoginThemePurchases` | `LoginThemePurchase` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:70` |
| `identity.DashboardPresets` | `DashboardPreset` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:73` |
| `identity.AdminWorkspacePins` | `AdminWorkspacePin` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:76` |
| `identity.UserGroups` | `UserGroup` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:79` |
| `identity.AdminUserGroups` | `AdminUserGroup` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:80` |
| `identity.UserGroupRoles` | `UserGroupRole` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:81` |
| `identity.UserGroupRestrictions` | `UserGroupRestriction` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:82` |
| `identity.AuditLogs` | `AuditLog` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:85` |
| `identity.UserNotifications` | `UserNotification` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:88` |
| `identity.NotificationPreferences` | `NotificationPreference` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:89` |
| `identity.ExternalLogins` | `ExternalLogin` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:92` |
| `identity.IdentityProviders` | `IdentityProvider` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:93` |
| `identity.OAuthApplications` | `OAuthApplication` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:94` |
| `identity.AdminPasskeys` | `AdminPasskey` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:97` |
| `identity.WebAuthnChallenges` | `WebAuthnChallenge` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:98` |
| `identity.QrLoginSessions` | `QrLoginSession` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:99` |
| `identity.SignupSessions` | `SignupSession` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:102` |
| `identity.TenantMemberships` | `TenantMembership` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:105` |
| `identity.ScopeGrants` | `ScopeGrant` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:106` |
| `identity.OperationalScopeGrants` | `OperationalScopeGrant` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:107` |
| `identity.DeviceRegistrations` | `DeviceRegistration` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:108` |
| `identity.PersonalAccessTokens` | `PersonalAccessToken` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:111` |
| `identity.AdminSecurityProfiles` | `AdminSecurityProfile` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:112` |
| `identity.AdminPreferences` | `AdminPreference` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:113` |
| `identity.AdminDelegations` | `AdminDelegation` | `IdentityDbContext` | `src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs:114` |

### Domain Entities (49)
- **`Admin`** (`src/Modules/Identity/Identity.Domain/Entities/Admin.Authentication.cs:10`)
- **`Admin`** (`src/Modules/Identity/Identity.Domain/Entities/Admin.cs:10`) : `AggregateRoot`
- **`AdminDelegation`** (`src/Modules/Identity/Identity.Domain/Entities/AdminDelegation.cs:10`) : `AuditableEntity`
- **`AdminPasskey`** (`src/Modules/Identity/Identity.Domain/Entities/AdminPasskey.cs:12`) : `AuditableEntity`
- **`AdminPreference`** (`src/Modules/Identity/Identity.Domain/Entities/AdminPreference.cs:10`) : `AuditableEntity`
- **`AdminRole`** (`src/Modules/Identity/Identity.Domain/Entities/AdminRole.cs:6`) : `AuditableEntity`
- **`AdminSecurityProfile`** (`src/Modules/Identity/Identity.Domain/Entities/AdminSecurityProfile.cs:10`) : `AuditableEntity`
- **`AdminUserGroup`** (`src/Modules/Identity/Identity.Domain/Entities/AdminUserGroup.cs:8`) : `AuditableEntity`
- **`AdminWorkspacePin`** (`src/Modules/Identity/Identity.Domain/Entities/AdminWorkspacePin.cs:26`) : `AuditableEntity`
- **`DashboardPreset`** (`src/Modules/Identity/Identity.Domain/Entities/DashboardPreset.cs:11`) : `AuditableEntity`
- **`DeviceRegistration`** (`src/Modules/Identity/Identity.Domain/Entities/DeviceRegistration.cs:13`) : `AuditableEntity`
- **`ExternalLogin`** (`src/Modules/Identity/Identity.Domain/Entities/ExternalLogin.cs:12`) : `AuditableEntity`
- **`IdentityProvider`** (`src/Modules/Identity/Identity.Domain/Entities/IdentityProvider.cs:11`) : `AuditableEntity, ITenantAwareEntity`
- **`LoginTheme`** (`src/Modules/Identity/Identity.Domain/Entities/LoginTheme.cs:11`) : `AuditableEntity`
- **`LoginThemePurchase`** (`src/Modules/Identity/Identity.Domain/Entities/LoginThemePurchase.cs:10`) : `AuditableEntity`
- **`MenuItem`** (`src/Modules/Identity/Identity.Domain/Entities/MenuItem.cs:14`) : `AuditableEntity`
- **`MenuOverrideScope`** (`src/Modules/Identity/Identity.Domain/Entities/MenuOverrideScope.cs:15`)
- **`OAuthApplication`** (`src/Modules/Identity/Identity.Domain/Entities/OAuthApplication.cs:11`) : `AuditableEntity, ITenantAwareEntity`
- **`OperationalScopeGrant`** (`src/Modules/Identity/Identity.Domain/Entities/OperationalScopeGrant.cs:11`) : `AuditableEntity`
- **`OtpCode`** (`src/Modules/Identity/Identity.Domain/Entities/OtpCode.cs:9`) : `AuditableEntity`
- **`Permission`** (`src/Modules/Identity/Identity.Domain/Entities/Permission.cs:8`) : `AuditableEntity`
- **`PersonalAccessToken`** (`src/Modules/Identity/Identity.Domain/Entities/PersonalAccessToken.cs:13`) : `AuditableEntity`
- **`QrLoginSession`** (`src/Modules/Identity/Identity.Domain/Entities/QrLoginSession.cs:18`) : `AuditableEntity`
- **`QrSessionStatus`** (`src/Modules/Identity/Identity.Domain/Entities/QrLoginSession.cs:95`)
- **`RefreshToken`** (`src/Modules/Identity/Identity.Domain/Entities/RefreshToken.cs:9`) : `AuditableEntity`
- **`Role`** (`src/Modules/Identity/Identity.Domain/Entities/Role.cs:8`) : `AuditableEntity`
- **`RoleMenuItem`** (`src/Modules/Identity/Identity.Domain/Entities/RoleMenuItem.cs:14`) : `AuditableEntity`
- **`RolePermission`** (`src/Modules/Identity/Identity.Domain/Entities/RolePermission.cs:11`) : `AuditableEntity`
- **`ScopeGrant`** (`src/Modules/Identity/Identity.Domain/Entities/ScopeGrant.cs:14`) : `AuditableEntity`
- **`SettingsAuditLog`** (`src/Modules/Identity/Identity.Domain/Entities/SettingsAuditLog.cs:12`) : `AuditableEntity`
- **`SignupSession`** (`src/Modules/Identity/Identity.Domain/Entities/SignupSession.cs:23`) : `Entity`
- **`SignupSessionStatus`** (`src/Modules/Identity/Identity.Domain/Entities/SignupSession.cs:118`)
- **`SystemSettings`** (`src/Modules/Identity/Identity.Domain/Entities/SystemSettings.cs:10`) : `AuditableEntity`
- **`Tenant`** (`src/Modules/Identity/Identity.Domain/Entities/Tenant.cs:10`) : `AuditableEntity`
- **`TenantDomain`** (`src/Modules/Identity/Identity.Domain/Entities/TenantDomain.cs:13`) : `AuditableEntity`
- **`TenantMembership`** (`src/Modules/Identity/Identity.Domain/Entities/TenantMembership.cs:14`) : `AuditableEntity`
- **`TenantMenuOverride`** (`src/Modules/Identity/Identity.Domain/Entities/TenantMenuOverride.cs:16`) : `AuditableEntity`
- **`TenantPermission`** (`src/Modules/Identity/Identity.Domain/Entities/TenantPermission.cs:12`) : `AuditableEntity`
- **`TenantSettings`** (`src/Modules/Identity/Identity.Domain/Entities/TenantSettings.cs:10`) : `AuditableEntity`
- **`TenantThemeFavorite`** (`src/Modules/Identity/Identity.Domain/Entities/TenantThemeFavorite.cs:9`) : `Entity`
- **`ThemeApplyLog`** (`src/Modules/Identity/Identity.Domain/Entities/ThemeApplyLog.cs:10`) : `AuditableEntity`
- **`User`** (`src/Modules/Identity/Identity.Domain/Entities/User.cs:9`) : `AggregateRoot`
- **`UserGroup`** (`src/Modules/Identity/Identity.Domain/Entities/UserGroup.cs:11`) : `AuditableEntity`
- **`UserGroupRestriction`** (`src/Modules/Identity/Identity.Domain/Entities/UserGroupRestriction.cs:10`) : `AuditableEntity`
- **`UserGroupRole`** (`src/Modules/Identity/Identity.Domain/Entities/UserGroupRole.cs:7`) : `AuditableEntity`
- **`WebAuthnChallenge`** (`src/Modules/Identity/Identity.Domain/Entities/WebAuthnChallenge.cs:11`) : `AuditableEntity`
- **`WorkspaceType`** (`src/Modules/Identity/Identity.Domain/Entities/Workspace.cs:8`)
- **`WorkspaceContextScope`** (`src/Modules/Identity/Identity.Domain/Entities/Workspace.cs:22`)
- **`Workspace`** (`src/Modules/Identity/Identity.Domain/Entities/Workspace.cs:45`) : `AuditableEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (175)
- `ISovereignSudoProtectedCommand` (`src/Modules/Identity/Identity.Application/Behaviors/ISovereignSudoProtectedCommand.cs:7`)
- `CreateAccountGovernanceActionCommand` (`src/Modules/Identity/Identity.Application/Commands/Account/CreateAccountGovernanceActionCommand.cs:11`)
- `CreateAccountIntegrationItemCommand` (`src/Modules/Identity/Identity.Application/Commands/Account/CreateAccountIntegrationItemCommand.cs:11`)
- `CreateAccountPlanActionCommand` (`src/Modules/Identity/Identity.Application/Commands/Account/CreateAccountPlanActionCommand.cs:12`)
- `DeleteAccountIntegrationItemCommand` (`src/Modules/Identity/Identity.Application/Commands/Account/DeleteAccountIntegrationItemCommand.cs:10`)
- `RevokeAccountDelegationCommand` (`src/Modules/Identity/Identity.Application/Commands/Account/RevokeAccountDelegationCommand.cs:10`)
- `SendTestAccountNotificationCommand` (`src/Modules/Identity/Identity.Application/Commands/Account/SendTestAccountNotificationCommand.cs:12`)
- `UpdateAccountNotificationsCommand` (`src/Modules/Identity/Identity.Application/Commands/Account/UpdateAccountNotificationsCommand.cs:12`)
- `UpdateAccountPreferencesCommand` (`src/Modules/Identity/Identity.Application/Commands/Account/UpdateAccountPreferencesCommand.cs:11`)
- `UpdateAccountSecurityCommand` (`src/Modules/Identity/Identity.Application/Commands/Account/UpdateAccountSecurityCommand.cs:12`)
- `UpdateAdminCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/AdminCommands.cs:12`)
- `DeleteAdminCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/AdminCommands.cs:42`)
- `SetAdminActiveCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/AdminCommands.cs:51`)
- `ChangeAdminPasswordCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/AdminCommands.cs:65`)
- `ResetAdminPasswordCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/AdminCommands.cs:80`)
- `ManualSetupAdminCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/AdminCommands.cs:98`)
- `AssignRoleToAdminCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/AssignRoleToAdminCommand.cs:10`)
- `BulkDeleteAdminsCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/BulkDeleteAdminsCommand.cs:12`)
- `BulkUpdateAdminsStatusCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/BulkUpdateAdminsStatusCommand.cs:12`)
- `CreateAdminCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/CreateAdminCommand.cs:13`)
- `ImpersonateAdminCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/ImpersonateAdminCommand.cs:14`)
- `RemoveRoleFromAdminCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/RemoveRoleFromAdminCommand.cs:10`)
- `StopImpersonationCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/StopImpersonationCommand.cs:13`)
- `SyncAdminRolesCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/SyncAdminRolesCommand.cs:20`)
- `TransferAdminCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/TransferAdminCommand.cs:11`)
- `TransferProtectionCommand` (`src/Modules/Identity/Identity.Application/Commands/Admin/TransferProtectionCommand.cs:11`)
- `ActivateAccountCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/AccountSetupCommands.cs:54`)
- `ResendAccountSetupEmailCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/AccountSetupCommands.cs:82`)
- `UpdateAdminAvatarCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/AdminAvatarCommands.cs:12`)
- `RemoveAdminAvatarCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/AdminAvatarCommands.cs:26`)
- `AdminLoginCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/AdminLoginCommand.cs:11`)
- `AdminRequestPasswordResetCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/AdminPasswordResetCommands.cs:12`)
- `AdminVerifyResetOtpCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/AdminPasswordResetCommands.cs:25`)
- `AdminResetPasswordWithOtpCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/AdminPasswordResetCommands.cs:36`)
- `AuthenticateExternalSamlUserCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/AuthenticateExternalSamlUserCommand.cs:23`)
- `CompleteOidcWorkspaceSelectionCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/CompleteOidcWorkspaceSelectionCommand.cs:17`)
- `CompleteSamlLoginCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/CompleteSamlLoginCommand.cs:15`)
- `Confirm2FACommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/Confirm2FACommand.cs:11`)
- `ConfirmUser2FACommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/ConfirmUser2FACommand.cs:10`)
- `Disable2FACommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/Disable2FACommand.cs:11`)
- `DisableUser2FACommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/DisableUser2FACommand.cs:10`)
- `Enable2FACommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/Enable2FACommand.cs:12`)
- `EnableUser2FACommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/EnableUser2FACommand.cs:12`)
- `LinkAdminExternalAccountCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/ExternalAccountLinkingCommands.cs:27`)
- `UnlinkAdminExternalAccountCommand` (`src/Modules/Identity/Identity.Application/Commands/Auth/ExternalAccountLinkingCommands.cs:44`)
- *... plus 130 more commands.*

### CQRS Queries (117)
- `ValidateSetupTokenQuery` (`src/Modules/Identity/Identity.Application/Commands/Auth/AccountSetupCommands.cs:12`)
- `GetSetupAccountCustomFieldsQuery` (`src/Modules/Identity/Identity.Application/Commands/Auth/AccountSetupCommands.cs:22`)
- `GetDashboardPresetsQuery` (`src/Modules/Identity/Identity.Application/Commands/DashboardPreset/DashboardPresetCommands.cs:12`)
- `CheckQrSessionStatusQuery` (`src/Modules/Identity/Identity.Application/Commands/QrLogin/QrLoginCommands.cs:24`)
- `CheckSubdomainAvailabilityQuery` (`src/Modules/Identity/Identity.Application/Commands/Signup/SignupCommands.cs:36`)
- `GetPricingContextQuery` (`src/Modules/Identity/Identity.Application/Commands/Signup/SignupCommands.cs:90`)
- `GetPublicCategoriesQuery` (`src/Modules/Identity/Identity.Application/Commands/Signup/SignupCommands.cs:101`)
- `GetPublicEditionsQuery` (`src/Modules/Identity/Identity.Application/Commands/Signup/SignupCommands.cs:114`)
- `GetSignupStatusQuery` (`src/Modules/Identity/Identity.Application/Commands/Signup/SignupSessionCommands.cs:14`)
- `ResumeSignupSessionQuery` (`src/Modules/Identity/Identity.Application/Commands/Signup/SignupSessionCommands.cs:46`)
- `GetTenantDomainsQuery` (`src/Modules/Identity/Identity.Application/Commands/TenantDomain/TenantDomainCommands.cs:86`)
- `SearchRecipientsQuery` (`src/Modules/Identity/Identity.Application/Features/Email/Queries/SearchRecipientsQuery.cs:13`)
- `SearchNotificationTargetsQuery` (`src/Modules/Identity/Identity.Application/Features/Notification/Queries/SearchNotificationTargetsQuery.cs:29`)
- `GetAccountActivityQuery` (`src/Modules/Identity/Identity.Application/Queries/Account/GetAccountActivityQuery.cs:10`)
- `GetAccountContextQuery` (`src/Modules/Identity/Identity.Application/Queries/Account/GetAccountContextQuery.cs:10`)
- `GetAccountDossierQuery` (`src/Modules/Identity/Identity.Application/Queries/Account/GetAccountDossierQuery.cs:10`)
- `GetAccountGovernanceQuery` (`src/Modules/Identity/Identity.Application/Queries/Account/GetAccountGovernanceQuery.cs:10`)
- `GetAccountIntegrationsQuery` (`src/Modules/Identity/Identity.Application/Queries/Account/GetAccountIntegrationsQuery.cs:10`)
- `GetAccountNotificationsQuery` (`src/Modules/Identity/Identity.Application/Queries/Account/GetAccountNotificationsQuery.cs:10`)
- `GetAccountPlanQuery` (`src/Modules/Identity/Identity.Application/Queries/Account/GetAccountPlanQuery.cs:10`)
- `GetAccountPreferencesQuery` (`src/Modules/Identity/Identity.Application/Queries/Account/GetAccountPreferencesQuery.cs:10`)
- `GetAccountSecurityQuery` (`src/Modules/Identity/Identity.Application/Queries/Account/GetAccountSecurityQuery.cs:10`)
- `GetAccountSessionsQuery` (`src/Modules/Identity/Identity.Application/Queries/Account/GetAccountSessionsQuery.cs:10`)
- `GetCurrentAdminQuery` (`src/Modules/Identity/Identity.Application/Queries/Admin/AdminQueries.cs:10`)
- `GetAdminRolesQuery` (`src/Modules/Identity/Identity.Application/Queries/Admin/AdminQueries.cs:15`)
- `GetAdminByIdQuery` (`src/Modules/Identity/Identity.Application/Queries/Admin/GetAdminByIdQuery.cs:10`)
- `GetAdminsQuery` (`src/Modules/Identity/Identity.Application/Queries/Admin/GetAdminsQuery.cs:10`)
- `GetAdminsByTenantIdQuery` (`src/Modules/Identity/Identity.Application/Queries/Admin/GetAdminsQuery.cs:21`)
- `GetMyTenantAdminsQuery` (`src/Modules/Identity/Identity.Application/Queries/Admin/GetAdminsQuery.cs:33`)
- `GetMySecurityLogQuery` (`src/Modules/Identity/Identity.Application/Queries/Admin/GetMySecurityLogQuery.cs:12`)
- `GetMySessionsQuery` (`src/Modules/Identity/Identity.Application/Queries/Admin/GetMySessionsQuery.cs:15`)
- `StreamAdminsQuery` (`src/Modules/Identity/Identity.Application/Queries/Admin/StreamAdminsQuery.cs:21`)
- `GetAuditLogsQuery` (`src/Modules/Identity/Identity.Application/Queries/Audit/AuditQueries.cs:12`)
- `GetAuditLogDetailQuery` (`src/Modules/Identity/Identity.Application/Queries/Audit/AuditQueries.cs:31`)
- `ExportAuditLogsQuery` (`src/Modules/Identity/Identity.Application/Queries/Audit/AuditQueries.cs:38`)
- `GetHubActivitySummaryQuery` (`src/Modules/Identity/Identity.Application/Queries/Audit/GetHubActivitySummaryQuery.cs:16`)
- `StreamAuditLogsQuery` (`src/Modules/Identity/Identity.Application/Queries/Audit/StreamAuditLogsQuery.cs:22`)
- `DiscoverWorkspacesQuery` (`src/Modules/Identity/Identity.Application/Queries/Auth/DiscoverWorkspacesQueryHandler.cs:16`)
- `GetAdminExternalLoginsQuery` (`src/Modules/Identity/Identity.Application/Queries/Auth/GetExternalLoginsQueries.cs:9`)
- `GetUserExternalLoginsQuery` (`src/Modules/Identity/Identity.Application/Queries/Auth/GetExternalLoginsQueries.cs:15`)
- `ExportDashboardOverviewQuery` (`src/Modules/Identity/Identity.Application/Queries/Dashboard/DashboardExportQueries.cs:12`)
- `ExportDashboardAnalyticsQuery` (`src/Modules/Identity/Identity.Application/Queries/Dashboard/DashboardExportQueries.cs:24`)
- `ExportDashboardSecurityQuery` (`src/Modules/Identity/Identity.Application/Queries/Dashboard/DashboardExportQueries.cs:36`)
- `GetDashboardSummaryQuery` (`src/Modules/Identity/Identity.Application/Queries/Dashboard/DashboardQueries.cs:11`)
- `GetLoginActivityQuery` (`src/Modules/Identity/Identity.Application/Queries/Dashboard/DashboardQueries.cs:16`)
- *... plus 72 more queries.*

### Background Jobs (5) & UAT Seeders / Providers (14)
- **[Job]** `AuditArchivalJob` (`src/Modules/Identity/Identity.Infrastructure/BackgroundJobs/AuditArchivalJob.cs:40`)
- **[Job]** `AuthSessionCleanupJob` (`src/Modules/Identity/Identity.Infrastructure/BackgroundJobs/AuthSessionCleanupJob.cs:13`)
- **[Job]** `IdentitySoftDeleteCleanupJob` (`src/Modules/Identity/Identity.Infrastructure/BackgroundJobs/IdentitySoftDeleteCleanupJob.cs:22`)
- **[Job]** `PendingSignupReaperJob` (`src/Modules/Identity/Identity.Infrastructure/BackgroundJobs/PendingSignupReaperJob.cs:29`)
- **[Job]** `SignupSessionCleanupJob` (`src/Modules/Identity/Identity.Infrastructure/BackgroundJobs/SignupSessionCleanupJob.cs:20`)
- **[Provider]** `IdentityFeatureProvider` (`src/Modules/Identity/Identity.Infrastructure/Providers/IdentityFeatureProvider.cs:20`)
- **[Provider]** `IdentityMenuProvider` (`src/Modules/Identity/Identity.Infrastructure/Providers/IdentityMenuProvider.cs:25`)
- **[Provider]** `IdentityPermissionProvider` (`src/Modules/Identity/Identity.Infrastructure/Providers/IdentityPermissionProvider.cs:9`)
- **[Provider]** `FakeMenuProvider` (`tests/Identity.Application.Tests/Seeding/MenuItemSeederTests.cs:25`)
- **[Seeder]** `DatabaseSeeder` (`src/Modules/Identity/Identity.Infrastructure/Persistence/DatabaseSeeder.cs:31`)
- **[Seeder]** `DashboardPresetSeeder` (`src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/DashboardPresetSeeder.cs:17`)
- **[Seeder]** `DevSeeder` (`src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/DevSeeder.cs:14`)
- **[Seeder]** `GuardianTriggerSeeder` (`src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/GuardianTriggerSeeder.cs:13`)
- **[Seeder]** `IdentityDevDataSeeder` (`src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/IdentityDevDataSeeder.cs:17`)
- **[Seeder]** `LoginThemeSeeder` (`src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/LoginThemeSeeder.cs:14`)
- **[Seeder]** `MenuItemSeeder` (`src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/MenuItemSeeder.cs:27`)
- **[Seeder]** `PermissionSeeder` (`src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/PermissionSeeder.cs:18`)
- **[Seeder]** `RoleAndAdminSeeder` (`src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/RoleAndAdminSeeder.cs:19`)
- **[Seeder]** `WorkspaceSeeder` (`src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/WorkspaceSeeder.cs:23`)

---

## 13. Integrations Module

- **Schema**: `integrations`
- **Footprint**: `103` files | `5` entities | `8` commands | `7` queries | `15` handlers | `8` validators | **`0` controllers (`0` HTTP endpoints)** | `7` DB tables | `5` jobs | `5` seeders/providers | `12` test files

### Database Contexts & Tables (`DbSet<T>` — 7 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `integrations.Integrations` | `Integration` | `IntegrationsDbContext` | `src/Modules/Integrations/Integrations.Infrastructure/Persistence/IntegrationsDbContext.cs:35` |
| `integrations.ApiKeys` | `ApiKey` | `IntegrationsDbContext` | `src/Modules/Integrations/Integrations.Infrastructure/Persistence/IntegrationsDbContext.cs:36` |
| `integrations.WebhookSubscriptions` | `WebhookSubscription` | `IntegrationsDbContext` | `src/Modules/Integrations/Integrations.Infrastructure/Persistence/IntegrationsDbContext.cs:37` |
| `integrations.WebhookDeliveryLogs` | `WebhookDeliveryLog` | `IntegrationsDbContext` | `src/Modules/Integrations/Integrations.Infrastructure/Persistence/IntegrationsDbContext.cs:39` |
| `integrations.ApiKeyUsageLogs` | `ApiKeyUsageLog` | `IntegrationsDbContext` | `src/Modules/Integrations/Integrations.Infrastructure/Persistence/IntegrationsDbContext.cs:41` |
| `integrations.ApiKeyDailyStats` | `ApiKeyDailyStats` | `IntegrationsDbContext` | `src/Modules/Integrations/Integrations.Infrastructure/Persistence/IntegrationsDbContext.cs:42` |
| `integrations.ApiKeyScopeChangeLogs` | `ApiKeyScopeChangeLog` | `IntegrationsDbContext` | `src/Modules/Integrations/Integrations.Infrastructure/Persistence/IntegrationsDbContext.cs:43` |

### Domain Entities (5)
- **`ApiKey`** (`src/Modules/Integrations/Integrations.Domain/Entities/ApiKey.cs:11`) : `AuditableEntity`
- **`ApiKeyDailyStats`** (`src/Modules/Integrations/Integrations.Domain/Entities/ApiKeyDailyStats.cs:8`) : `Entity`
- **`ApiKeyScopeChangeLog`** (`src/Modules/Integrations/Integrations.Domain/Entities/ApiKeyScopeChangeLog.cs:9`) : `Entity`
- **`ApiKeyUsageLog`** (`src/Modules/Integrations/Integrations.Domain/Entities/ApiKeyUsageLog.cs:9`) : `Entity`
- **`Integration`** (`src/Modules/Integrations/Integrations.Domain/Entities/Integration.cs:8`) : `AuditableEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (8)
- `CreateApiKeyCommand` (`src/Modules/Integrations/Integrations.Application/Commands/CreateApiKeyCommand.cs:16`)
- `DeleteApiKeyCommand` (`src/Modules/Integrations/Integrations.Application/Commands/DeleteApiKeyCommand.cs:16`)
- `CreateIntegrationCommand` (`src/Modules/Integrations/Integrations.Application/Commands/IntegrationCommands.cs:11`)
- `UpdateIntegrationCommand` (`src/Modules/Integrations/Integrations.Application/Commands/IntegrationCommands.cs:25`)
- `DeleteIntegrationCommand` (`src/Modules/Integrations/Integrations.Application/Commands/IntegrationCommands.cs:54`)
- `RevokeApiKeyCommand` (`src/Modules/Integrations/Integrations.Application/Commands/RevokeApiKeyCommand.cs:14`)
- `RotateApiKeyCommand` (`src/Modules/Integrations/Integrations.Application/Commands/RotateApiKeyCommand.cs:16`)
- `UpdateApiKeyCommand` (`src/Modules/Integrations/Integrations.Application/Commands/UpdateApiKeyCommand.cs:15`)

### CQRS Queries (7)
- `GetApiKeyActivityQuery` (`src/Modules/Integrations/Integrations.Application/Queries/GetApiKeyActivityQuery.cs:14`)
- `GetApiKeyByIdQuery` (`src/Modules/Integrations/Integrations.Application/Queries/GetApiKeyByIdQuery.cs:14`)
- `GetApiKeyChartDataQuery` (`src/Modules/Integrations/Integrations.Application/Queries/GetApiKeyChartDataQuery.cs:23`)
- `GetApiKeyStatsQuery` (`src/Modules/Integrations/Integrations.Application/Queries/GetApiKeyStatsQuery.cs:14`)
- `GetApiKeysQuery` (`src/Modules/Integrations/Integrations.Application/Queries/GetApiKeysQuery.cs:14`)
- `GetIntegrationsQuery` (`src/Modules/Integrations/Integrations.Application/Queries/IntegrationQueries.cs:12`)
- `GetIntegrationByIdQuery` (`src/Modules/Integrations/Integrations.Application/Queries/IntegrationQueries.cs:18`)

### Background Jobs (5) & UAT Seeders / Providers (5)
- **[Job]** `ApiKeyQuotaAlertJob` (`src/Modules/Integrations/Integrations.Infrastructure/BackgroundJobs/ApiKeyQuotaAlertJob.cs:16`)
- **[Job]** `ApiKeyQuotaResetJob` (`src/Modules/Integrations/Integrations.Infrastructure/BackgroundJobs/ApiKeyQuotaResetJob.cs:15`)
- **[Job]** `ApiKeyStatsAggregatorJob` (`src/Modules/Integrations/Integrations.Infrastructure/BackgroundJobs/ApiKeyStatsAggregatorJob.cs:16`)
- **[Job]** `ApiKeyUsageLogCleanupJob` (`src/Modules/Integrations/Integrations.Infrastructure/BackgroundJobs/ApiKeyUsageLogCleanupJob.cs:15`)
- **[Job]** `IntegrationsSoftDeleteCleanupJob` (`src/Modules/Integrations/Integrations.Infrastructure/BackgroundJobs/IntegrationsSoftDeleteCleanupJob.cs:21`)
- **[Provider]** `IntegrationsFeatureProvider` (`src/Modules/Integrations/Integrations.Infrastructure/Providers/IntegrationsFeatureProvider.cs:8`)
- **[Provider]** `IntegrationsMenuProvider` (`src/Modules/Integrations/Integrations.Infrastructure/Providers/IntegrationsMenuProvider.cs:21`)
- **[Provider]** `IntegrationsPermissionProvider` (`src/Modules/Integrations/Integrations.Infrastructure/Providers/IntegrationsPermissionProvider.cs:18`)
- **[Seeder]** `IntegrationsModuleSeeder` (`src/Modules/Integrations/Integrations.Infrastructure/Persistence/IntegrationsModuleSeeder.cs:17`)
- **[Seeder]** `IntegrationsDevDataSeeder` (`src/Modules/Integrations/Integrations.Infrastructure/Persistence/Seeding/IntegrationsDevDataSeeder.cs:13`)

---

## 14. Marketplace Module

- **Schema**: `marketplace`
- **Footprint**: `172` files | `14` entities | `23` commands | `14` queries | `44` handlers | `37` validators | **`0` controllers (`0` HTTP endpoints)** | `14` DB tables | `4` jobs | `7` seeders/providers | `22` test files

### Database Contexts & Tables (`DbSet<T>` — 14 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `marketplace.DeveloperProfiles` | `DeveloperProfile` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:39` |
| `marketplace.AppListings` | `AppListing` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:40` |
| `marketplace.AppCategories` | `AppCategory` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:41` |
| `marketplace.AppCategoryMappings` | `AppCategoryMapping` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:42` |
| `marketplace.AppScreenshots` | `AppScreenshot` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:43` |
| `marketplace.AppPricings` | `AppPricing` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:44` |
| `marketplace.AppSubmissions` | `AppSubmission` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:47` |
| `marketplace.AppReviewTasks` | `AppReviewTask` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:48` |
| `marketplace.AppReviews` | `AppReview` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:51` |
| `marketplace.AppReviewReplies` | `AppReviewReply` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:52` |
| `marketplace.AppPurchases` | `AppPurchase` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:55` |
| `marketplace.DeveloperPayouts` | `DeveloperPayout` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:56` |
| `marketplace.MarketplaceCommissionSettings` | `MarketplaceCommissionSettings` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:57` |
| `marketplace.AppInstallCounts` | `AppInstallCount` | `MarketplaceDbContext` | `src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceDbContext.cs:61` |

### Domain Entities (14)
- **`AppCategory`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppCategory.cs:8`) : `AuditableEntity`
- **`AppCategoryMapping`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppCategoryMapping.cs:8`) : `AuditableEntity`
- **`AppInstallCount`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppInstallCount.cs:8`) : `AuditableEntity`
- **`AppListing`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppListing.cs:9`) : `AuditableEntity`
- **`AppPricing`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppPricing.cs:9`) : `AuditableEntity`
- **`AppPurchase`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppPurchase.cs:8`) : `AuditableEntity`
- **`AppReview`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppReview.cs:10`) : `AuditableEntity`
- **`AppReviewReply`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppReviewReply.cs:7`) : `AuditableEntity`
- **`AppReviewTask`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppReviewTask.cs:10`) : `AuditableEntity`
- **`AppScreenshot`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppScreenshot.cs:8`) : `AuditableEntity`
- **`AppSubmission`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/AppSubmission.cs:10`) : `AuditableEntity`
- **`DeveloperPayout`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/DeveloperPayout.cs:10`) : `AuditableEntity`
- **`DeveloperProfile`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/DeveloperProfile.cs:8`) : `AuditableEntity`
- **`MarketplaceCommissionSettings`** (`src/Modules/Marketplace/Marketplace.Domain/Entities/MarketplaceCommissionSettings.cs:27`) : `AuditableEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (23)
- `RegisterDeveloperProfileCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:25`)
- `UpdateDeveloperProfileCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:43`)
- `VerifyDeveloperCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:69`)
- `CreateAppListingCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:88`)
- `UpdateAppListingCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:106`)
- `PublishAppListingCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:134`)
- `UnpublishAppListingCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:143`)
- `FeatureAppListingCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:152`)
- `DeleteAppListingCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:163`)
- `SetAppPricingCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:187`)
- `CreateAppCategoryCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:208`)
- `UpdateAppCategoryCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:224`)
- `DeleteAppCategoryCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:251`)
- `SubmitAppForReviewCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:263`)
- `ApproveSubmissionCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:277`)
- `RejectSubmissionCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:288`)
- `RequestRevisionsCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:299`)
- `CreateAppReviewCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:324`)
- `DeleteAppReviewCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:341`)
- `PurchaseAppCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommands.cs:364`)
- `ProcessPayoutCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/ProcessPayoutCommand.cs:17`)
- `RetryFailedPayoutCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/RetryFailedPayoutCommand.cs:25`)
- `UpdateMarketplaceCommissionRateCommand` (`src/Modules/Marketplace/Marketplace.Application/Commands/UpdateMarketplaceCommissionRate/UpdateMarketplaceCommissionRateCommand.cs:32`)

### CQRS Queries (14)
- `GetMarketplaceCommissionSettingsQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/GetMarketplaceCommissionSettingsQuery.cs:12`)
- `GetDeveloperProfileByIdQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:14`)
- `GetDeveloperProfilesQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:21`)
- `GetDeveloperProfileByTenantQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:28`)
- `GetAppListingByIdQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:39`)
- `GetAppListingsQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:45`)
- `GetFeaturedListingsQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:59`)
- `GetAppCategoriesQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:70`)
- `GetAppCategoryByIdQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:76`)
- `GetAppSubmissionsQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:86`)
- `GetAppSubmissionByIdQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:93`)
- `GetAppReviewsQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:103`)
- `GetAppPurchasesQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:114`)
- `GetDeveloperPayoutsQuery` (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueries.cs:125`)

### Background Jobs (4) & UAT Seeders / Providers (7)
- **[Job]** `InstallCountAggregationJob` (`src/Modules/Marketplace/Marketplace.Infrastructure/BackgroundJobs/InstallCountAggregationJob.cs:16`)
- **[Job]** `MarketplaceSoftDeleteCleanupJob` (`src/Modules/Marketplace/Marketplace.Infrastructure/BackgroundJobs/MarketplaceSoftDeleteCleanupJob.cs:20`)
- **[Job]** `PayoutBatchJob` (`src/Modules/Marketplace/Marketplace.Infrastructure/BackgroundJobs/PayoutBatchJob.cs:24`)
- **[Job]** `StaleSubmissionReminderJob` (`src/Modules/Marketplace/Marketplace.Infrastructure/BackgroundJobs/StaleSubmissionReminderJob.cs:17`)
- **[Provider]** `MarketplaceFeatureProvider` (`src/Modules/Marketplace/Marketplace.Infrastructure/Providers/MarketplaceFeatureProvider.cs:12`)
- **[Provider]** `MarketplaceMenuProvider` (`src/Modules/Marketplace/Marketplace.Infrastructure/Providers/MarketplaceMenuProvider.cs:32`)
- **[Provider]** `MarketplacePermissionProvider` (`src/Modules/Marketplace/Marketplace.Infrastructure/Providers/MarketplacePermissionProvider.cs:24`)
- **[Seeder]** `MarketplaceModuleSeeder` (`src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/MarketplaceModuleSeeder.cs:17`)
- **[Seeder]** `AppCategorySeeder` (`src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/Seeding/AppCategorySeeder.cs:13`)
- **[Seeder]** `MarketplaceCommissionSettingsSeeder` (`src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/Seeding/MarketplaceCommissionSettingsSeeder.cs:12`)
- **[Seeder]** `MarketplaceDevDataSeeder` (`src/Modules/Marketplace/Marketplace.Infrastructure/Persistence/Seeding/MarketplaceDevDataSeeder.cs:14`)

---

## 15. Media Module

- **Schema**: `media`
- **Footprint**: `98` files | `4` entities | `6` commands | `6` queries | `13` handlers | `6` validators | **`0` controllers (`0` HTTP endpoints)** | `4` DB tables | `1` jobs | `5` seeders/providers | `23` test files

### Database Contexts & Tables (`DbSet<T>` — 4 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `media.Medias` | `Medias` | `MediaDbContext` | `src/Modules/Media/Media.Infrastructure/Persistence/MediaDbContext.cs:43` |
| `media.MediaFiles` | `MediaFile` | `MediaDbContext` | `src/Modules/Media/Media.Infrastructure/Persistence/MediaDbContext.cs:44` |
| `media.MediaFolders` | `MediaFolder` | `MediaDbContext` | `src/Modules/Media/Media.Infrastructure/Persistence/MediaDbContext.cs:45` |
| `media.MediaAccessGrants` | `MediaAccessGrant` | `MediaDbContext` | `src/Modules/Media/Media.Infrastructure/Persistence/MediaDbContext.cs:46` |

### Domain Entities (4)
- **`MediaAccessGrant`** (`src/Modules/Media/Media.Domain/Entities/MediaAccessGrant.cs:9`) : `AuditableEntity`
- **`MediaFile`** (`src/Modules/Media/Media.Domain/Entities/MediaFile.cs:9`) : `AuditableEntity`
- **`MediaFolder`** (`src/Modules/Media/Media.Domain/Entities/MediaFolder.cs:9`) : `AuditableEntity`
- **`Medias`** (`src/Modules/Media/Media.Domain/Entities/Medias.cs:8`) : `AuditableEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (6)
- `CreateMediasCommand` (`src/Modules/Media/Media.Application/Commands/MediasCommands.cs:11`)
- `UpdateMediasCommand` (`src/Modules/Media/Media.Application/Commands/MediasCommands.cs:25`)
- `DeleteMediasCommand` (`src/Modules/Media/Media.Application/Commands/MediasCommands.cs:54`)
- `StartUploadSessionCommand` (`src/Modules/Media/Media.Application/Commands/StartUploadSessionCommand.cs:30`)
- `UploadChunkCommand` (`src/Modules/Media/Media.Application/Commands/UploadChunkCommand.cs:17`)
- `CreateDownloadSessionCommand` (`src/Modules/Media/Media.Application/Queries/DownloadQueries.cs:28`)

### CQRS Queries (6)
- `GetDownloadInfoQuery` (`src/Modules/Media/Media.Application/Queries/DownloadQueries.cs:17`)
- `GetFileStreamQuery` (`src/Modules/Media/Media.Application/Queries/DownloadQueries.cs:22`)
- `ValidateSessionQuery` (`src/Modules/Media/Media.Application/Queries/DownloadQueries.cs:40`)
- `CanAccessFileQuery` (`src/Modules/Media/Media.Application/Queries/DownloadQueries.cs:80`)
- `GetMediasQuery` (`src/Modules/Media/Media.Application/Queries/MediasQueries.cs:12`)
- `GetMediasByIdQuery` (`src/Modules/Media/Media.Application/Queries/MediasQueries.cs:18`)

### Background Jobs (1) & UAT Seeders / Providers (5)
- **[Job]** `MediaSoftDeleteCleanupJob` (`src/Modules/Media/Media.Infrastructure/BackgroundJobs/MediaSoftDeleteCleanupJob.cs:20`)
- **[Provider]** `MediaFeatureProvider` (`src/Modules/Media/Media.Infrastructure/Providers/MediaFeatureProvider.cs:8`)
- **[Provider]** `MediaMenuProvider` (`src/Modules/Media/Media.Infrastructure/Providers/MediaMenuProvider.cs:35`)
- **[Provider]** `MediaPermissionProvider` (`src/Modules/Media/Media.Infrastructure/Providers/MediaPermissionProvider.cs:18`)
- **[Seeder]** `MediaModuleSeeder` (`src/Modules/Media/Media.Infrastructure/Persistence/MediaModuleSeeder.cs:17`)
- **[Seeder]** `MediaDevDataSeeder` (`src/Modules/Media/Media.Infrastructure/Persistence/Seeding/MediaDevDataSeeder.cs:13`)

---

## 16. OrganizationCore Module

- **Schema**: `organization_core`
- **Footprint**: `209` files | `6` entities | `19` commands | `13` queries | `31` handlers | `18` validators | **`0` controllers (`0` HTTP endpoints)** | `7` DB tables | `1` jobs | `5` seeders/providers | `45` test files

### Database Contexts & Tables (`DbSet<T>` — 7 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `organization_core.LegalEntities` | `LegalEntity` | `OrganizationCoreDbContext` | `src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Persistence/OrganizationCoreDbContext.cs:36` |
| `organization_core.BusinessUnits` | `BusinessUnit` | `OrganizationCoreDbContext` | `src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Persistence/OrganizationCoreDbContext.cs:37` |
| `organization_core.Branches` | `Branch` | `OrganizationCoreDbContext` | `src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Persistence/OrganizationCoreDbContext.cs:38` |
| `organization_core.BranchSearchTerms` | `BranchSearchTerm` | `OrganizationCoreDbContext` | `src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Persistence/OrganizationCoreDbContext.cs:39` |
| `organization_core.Sites` | `Site` | `OrganizationCoreDbContext` | `src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Persistence/OrganizationCoreDbContext.cs:40` |
| `organization_core.Departments` | `Department` | `OrganizationCoreDbContext` | `src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Persistence/OrganizationCoreDbContext.cs:41` |
| `organization_core.Teams` | `Team` | `OrganizationCoreDbContext` | `src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Persistence/OrganizationCoreDbContext.cs:42` |

### Domain Entities (6)
- **`Branch`** (`src/Modules/OrganizationCore/OrganizationCore.Domain/Entities/Branch.cs:19`) : `AggregateRoot, ITenantAwareEntity`
- **`BusinessUnit`** (`src/Modules/OrganizationCore/OrganizationCore.Domain/Entities/BusinessUnit.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`Department`** (`src/Modules/OrganizationCore/OrganizationCore.Domain/Entities/Department.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`LegalEntity`** (`src/Modules/OrganizationCore/OrganizationCore.Domain/Entities/LegalEntity.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`Site`** (`src/Modules/OrganizationCore/OrganizationCore.Domain/Entities/Site.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`Team`** (`src/Modules/OrganizationCore/OrganizationCore.Domain/Entities/Team.cs:19`) : `AggregateRoot, ITenantAwareEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (19)
- `BackfillBranchSearchNamesCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/BackfillBranchSearchNamesCommand.cs:11`)
- `CreateBranchCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/BranchCommands.cs:11`)
- `UpdateBranchCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/BranchCommands.cs:25`)
- `DeleteBranchCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/BranchCommands.cs:53`)
- `CreateBusinessUnitCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/BusinessUnitCommands.cs:11`)
- `UpdateBusinessUnitCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/BusinessUnitCommands.cs:25`)
- `DeleteBusinessUnitCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/BusinessUnitCommands.cs:53`)
- `CreateDepartmentCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/DepartmentCommands.cs:11`)
- `UpdateDepartmentCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/DepartmentCommands.cs:25`)
- `DeleteDepartmentCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/DepartmentCommands.cs:53`)
- `CreateLegalEntityCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/LegalEntityCommands.cs:11`)
- `UpdateLegalEntityCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/LegalEntityCommands.cs:26`)
- `DeleteLegalEntityCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/LegalEntityCommands.cs:61`)
- `CreateSiteCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/SiteCommands.cs:11`)
- `UpdateSiteCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/SiteCommands.cs:26`)
- `DeleteSiteCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/SiteCommands.cs:59`)
- `CreateTeamCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/TeamCommands.cs:11`)
- `UpdateTeamCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/TeamCommands.cs:25`)
- `DeleteTeamCommand` (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/TeamCommands.cs:52`)

### CQRS Queries (13)
- `GetBranchesQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/BranchQueries.cs:12`)
- `GetBranchByIdQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/BranchQueries.cs:18`)
- `GetBusinessUnitsQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/BusinessUnitQueries.cs:12`)
- `GetBusinessUnitByIdQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/BusinessUnitQueries.cs:18`)
- `GetDepartmentsQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/DepartmentQueries.cs:12`)
- `GetDepartmentByIdQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/DepartmentQueries.cs:18`)
- `GetLegalEntitiesQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/LegalEntityQueries.cs:12`)
- `GetLegalEntityByIdQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/LegalEntityQueries.cs:18`)
- `GetSitesQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/SiteQueries.cs:12`)
- `GetSiteByIdQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/SiteQueries.cs:18`)
- `GetTeamsQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/TeamQueries.cs:12`)
- `GetTeamByIdQuery` (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/TeamQueries.cs:18`)
- `CapturedCandidateQuery` (`tests/OrganizationCore.Application.Tests/Persistence/OrganizationCorePostgreSqlAcceptanceTests.cs:1749`)

### Background Jobs (1) & UAT Seeders / Providers (5)
- **[Job]** `OrganizationCoreSoftDeleteCleanupJob` (`src/Modules/OrganizationCore/OrganizationCore.Infrastructure/BackgroundJobs/OrganizationCoreSoftDeleteCleanupJob.cs:20`)
- **[Provider]** `OrganizationCoreFeatureProvider` (`src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Providers/OrganizationCoreFeatureProvider.cs:8`)
- **[Provider]** `OrganizationCoreMenuProvider` (`src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Providers/OrganizationCoreMenuProvider.cs:34`)
- **[Provider]** `OrganizationCorePermissionProvider` (`src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Providers/OrganizationCorePermissionProvider.cs:18`)
- **[Seeder]** `OrganizationCoreModuleSeeder` (`src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Persistence/OrganizationCoreModuleSeeder.cs:17`)
- **[Seeder]** `OrganizationCoreDevDataSeeder` (`src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Persistence/Seeding/OrganizationCoreDevDataSeeder.cs:14`)

---

## 17. PartyKernel Module

- **Schema**: `party_kernel`
- **Footprint**: `306` files | `11` entities | `26` commands | `17` queries | `43` handlers | `24` validators | **`0` controllers (`0` HTTP endpoints)** | `12` DB tables | `1` jobs | `6` seeders/providers | `65` test files

### Database Contexts & Tables (`DbSet<T>` — 12 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `party_kernel.Parties` | `Party` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:37` |
| `party_kernel.PartyTenantUsages` | `PartyTenantUsage` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:38` |
| `party_kernel.PartyPersonCreateReceipts` | `PartyPersonCreateReceipt` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:39` |
| `party_kernel.PartyOrganizationCreateReceipts` | `PartyOrganizationCreateReceipt` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:41` |
| `party_kernel.ContactPointCreateReceipts` | `ContactPointCreateReceipt` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:43` |
| `party_kernel.PartyPeople` | `PartyPerson` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:45` |
| `party_kernel.PartyOrganizations` | `PartyOrganization` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:46` |
| `party_kernel.PartyRoles` | `PartyRole` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:47` |
| `party_kernel.ContactPoints` | `ContactPoint` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:48` |
| `party_kernel.PartyRelationships` | `PartyRelationship` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:49` |
| `party_kernel.MergeCandidates` | `MergeCandidate` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:50` |
| `party_kernel.PartyLookupSearchTerms` | `PartyLookupSearchTerm` | `PartyKernelDbContext` | `src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelDbContext.cs:51` |

### Domain Entities (11)
- **`ContactPoint`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/ContactPoint.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`ContactPointCreateReceipt`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/ContactPointCreateReceipt.cs:7`) : `AuditableEntity, ITenantAwareEntity`
- **`MergeCandidate`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/MergeCandidate.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`Party`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/Party.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`PartyOrganization`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/PartyOrganization.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`PartyOrganizationCreateReceipt`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/PartyOrganizationCreateReceipt.cs:7`) : `AuditableEntity, ITenantAwareEntity`
- **`PartyPerson`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/PartyPerson.cs:17`) : `AggregateRoot, ITenantAwareEntity`
- **`PartyPersonCreateReceipt`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/PartyPersonCreateReceipt.cs:7`) : `AuditableEntity, ITenantAwareEntity`
- **`PartyRelationship`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/PartyRelationship.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`PartyRole`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/PartyRole.cs:9`) : `AuditableEntity, ITenantAwareEntity`
- **`PartyTenantUsage`** (`src/Modules/PartyKernel/PartyKernel.Domain/Entities/PartyTenantUsage.cs:10`) : `AuditableEntity, ITenantAwareEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (26)
- `BackfillPartyLookupSearchTermsCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/BackfillPartyLookupSearchTermsCommand.cs:11`)
- `CreateContactPointCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/ContactPointCommands.cs:14`)
- `UpdateContactPointCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/ContactPointCommands.cs:55`)
- `DeleteContactPointCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/ContactPointCommands.cs:83`)
- `CreatePersonCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/CreatePersonCommand.cs:11`)
- `CreateMergeCandidateCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/MergeCandidateCommands.cs:11`)
- `UpdateMergeCandidateCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/MergeCandidateCommands.cs:28`)
- `DeleteMergeCandidateCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/MergeCandidateCommands.cs:57`)
- `CreatePartyCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyCommands.cs:11`)
- `UpdatePartyCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyCommands.cs:29`)
- `DeletePartyCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyCommands.cs:57`)
- `CreateOrganizationCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyCreateCommands.cs:12`)
- `CreatePartyOrganizationCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyOrganizationCommands.cs:11`)
- `UpdatePartyOrganizationCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyOrganizationCommands.cs:27`)
- `UpdateOrganizationCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyOrganizationCommands.cs:52`)
- `DeletePartyOrganizationCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyOrganizationCommands.cs:69`)
- `CreatePartyPersonCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyPersonCommands.cs:11`)
- `UpdatePartyPersonCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyPersonCommands.cs:28`)
- `UpdatePersonCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyPersonCommands.cs:57`)
- `DeletePartyPersonCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyPersonCommands.cs:80`)
- `CreatePartyRelationshipCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyRelationshipCommands.cs:11`)
- `UpdatePartyRelationshipCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyRelationshipCommands.cs:28`)
- `DeletePartyRelationshipCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyRelationshipCommands.cs:57`)
- `CreatePartyRoleCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyRoleCommands.cs:11`)
- `UpdatePartyRoleCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyRoleCommands.cs:27`)
- `DeletePartyRoleCommand` (`src/Modules/PartyKernel/PartyKernel.Application/Commands/PartyRoleCommands.cs:54`)

### CQRS Queries (17)
- `GetContactPointsQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/ContactPointQueries.cs:11`)
- `GetContactPointByIdQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/ContactPointQueries.cs:21`)
- `GetPartyContactLookupQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/GetPartyContactLookupQuery.cs:9`)
- `GetMergeCandidatesQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/MergeCandidateQueries.cs:12`)
- `GetMergeCandidateByIdQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/MergeCandidateQueries.cs:22`)
- `GetPartyIdentityAuditQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyIdentityAuditQueries.cs:8`)
- `GetPartyOrganizationsQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyOrganizationQueries.cs:12`)
- `GetPartyOrganizationByIdQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyOrganizationQueries.cs:22`)
- `GetPartyPeopleQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyPersonQueries.cs:12`)
- `GetPartyPersonByIdQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyPersonQueries.cs:22`)
- `GetPartyProfileByIdQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyProfileQueries.cs:9`)
- `GetPartiesQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyQueries.cs:12`)
- `GetPartyByIdQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyQueries.cs:23`)
- `GetPartyRelationshipsQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyRelationshipQueries.cs:12`)
- `GetPartyRelationshipByIdQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyRelationshipQueries.cs:22`)
- `GetPartyRolesQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyRoleQueries.cs:12`)
- `GetPartyRoleByIdQuery` (`src/Modules/PartyKernel/PartyKernel.Application/Queries/PartyRoleQueries.cs:22`)

### Background Jobs (1) & UAT Seeders / Providers (6)
- **[Job]** `PartyKernelSoftDeleteCleanupJob` (`src/Modules/PartyKernel/PartyKernel.Infrastructure/BackgroundJobs/PartyKernelSoftDeleteCleanupJob.cs:20`)
- **[Provider]** `PartyKernelFeatureProvider` (`src/Modules/PartyKernel/PartyKernel.Infrastructure/Providers/PartyKernelFeatureProvider.cs:8`)
- **[Provider]** `PartyKernelMenuProvider` (`src/Modules/PartyKernel/PartyKernel.Infrastructure/Providers/PartyKernelMenuProvider.cs:21`)
- **[Provider]** `PartyKernelPermissionProvider` (`src/Modules/PartyKernel/PartyKernel.Infrastructure/Providers/PartyKernelPermissionProvider.Relationships.cs:8`)
- **[Provider]** `PartyKernelPermissionProvider` (`src/Modules/PartyKernel/PartyKernel.Infrastructure/Providers/PartyKernelPermissionProvider.cs:16`)
- **[Seeder]** `PartyKernelModuleSeeder` (`src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/PartyKernelModuleSeeder.cs:17`)
- **[Seeder]** `PartyKernelDevDataSeeder` (`src/Modules/PartyKernel/PartyKernel.Infrastructure/Persistence/Seeding/PartyKernelDevDataSeeder.cs:15`)

---

## 18. Plugins Module

- **Schema**: `plugins`
- **Footprint**: `148` files | `8` entities | `19` commands | `6` queries | `30` handlers | `28` validators | **`0` controllers (`0` HTTP endpoints)** | `8` DB tables | `3` jobs | `5` seeders/providers | `15` test files

### Database Contexts & Tables (`DbSet<T>` — 8 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `plugins.PluginDefinitions` | `PluginDefinition` | `PluginsDbContext` | `src/Modules/Plugins/Plugins.Infrastructure/Persistence/PluginsDbContext.cs:33` |
| `plugins.PluginVersions` | `PluginVersion` | `PluginsDbContext` | `src/Modules/Plugins/Plugins.Infrastructure/Persistence/PluginsDbContext.cs:34` |
| `plugins.PluginInstallations` | `PluginInstallation` | `PluginsDbContext` | `src/Modules/Plugins/Plugins.Infrastructure/Persistence/PluginsDbContext.cs:35` |
| `plugins.PluginPermissionGrants` | `PluginPermissionGrant` | `PluginsDbContext` | `src/Modules/Plugins/Plugins.Infrastructure/Persistence/PluginsDbContext.cs:36` |
| `plugins.PluginDataStores` | `PluginDataStore` | `PluginsDbContext` | `src/Modules/Plugins/Plugins.Infrastructure/Persistence/PluginsDbContext.cs:37` |
| `plugins.PluginApiKeys` | `PluginApiKey` | `PluginsDbContext` | `src/Modules/Plugins/Plugins.Infrastructure/Persistence/PluginsDbContext.cs:38` |
| `plugins.PluginWebhookSubscriptions` | `PluginWebhookSubscription` | `PluginsDbContext` | `src/Modules/Plugins/Plugins.Infrastructure/Persistence/PluginsDbContext.cs:39` |
| `plugins.PluginExecutionLogs` | `PluginExecutionLog` | `PluginsDbContext` | `src/Modules/Plugins/Plugins.Infrastructure/Persistence/PluginsDbContext.cs:41` |

### Domain Entities (8)
- **`PluginApiKey`** (`src/Modules/Plugins/Plugins.Domain/Entities/PluginApiKey.cs:10`) : `AuditableEntity`
- **`PluginDataStore`** (`src/Modules/Plugins/Plugins.Domain/Entities/PluginDataStore.cs:10`) : `AuditableEntity`
- **`PluginDefinition`** (`src/Modules/Plugins/Plugins.Domain/Entities/PluginDefinition.cs:12`) : `AuditableEntity`
- **`PluginExecutionLog`** (`src/Modules/Plugins/Plugins.Domain/Entities/PluginExecutionLog.cs:11`) : `AuditableEntity`
- **`PluginInstallation`** (`src/Modules/Plugins/Plugins.Domain/Entities/PluginInstallation.cs:12`) : `AuditableEntity`
- **`PluginPermissionGrant`** (`src/Modules/Plugins/Plugins.Domain/Entities/PluginPermissionGrant.cs:10`) : `AuditableEntity`
- **`PluginVersion`** (`src/Modules/Plugins/Plugins.Domain/Entities/PluginVersion.cs:10`) : `AuditableEntity`
- **`PluginWebhookSubscription`** (`src/Modules/Plugins/Plugins.Domain/Entities/PluginWebhookSubscription.cs:10`) : `AuditableEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (19)
- `ActivatePluginCommand` (`src/Modules/Plugins/Plugins.Application/Commands/ActivatePlugin/ActivatePluginCommand.cs:10`)
- `ExchangePluginTokenCommand` (`src/Modules/Plugins/Plugins.Application/Commands/Auth/ExchangePluginToken/ExchangePluginTokenCommand.cs:12`)
- `DeactivatePluginCommand` (`src/Modules/Plugins/Plugins.Application/Commands/DeactivatePlugin/DeactivatePluginCommand.cs:10`)
- `DeletePluginDefinitionCommand` (`src/Modules/Plugins/Plugins.Application/Commands/DeletePluginDefinition/DeletePluginDefinitionCommand.cs:12`)
- `DeprecatePluginDefinitionCommand` (`src/Modules/Plugins/Plugins.Application/Commands/DeprecatePluginDefinition/DeprecatePluginDefinitionCommand.cs:11`)
- `GrantPluginPermissionCommand` (`src/Modules/Plugins/Plugins.Application/Commands/GrantPluginPermission/GrantPluginPermissionCommand.cs:10`)
- `InstallPluginCommand` (`src/Modules/Plugins/Plugins.Application/Commands/InstallPlugin/InstallPluginCommand.cs:12`)
- `DeletePluginDataCommand` (`src/Modules/Plugins/Plugins.Application/Commands/PluginDataStore/DeletePluginDataCommand.cs:18`)
- `SetPluginDataCommand` (`src/Modules/Plugins/Plugins.Application/Commands/PluginDataStore/SetPluginDataCommand.cs:18`)
- `PublishPluginDefinitionCommand` (`src/Modules/Plugins/Plugins.Application/Commands/PublishPluginDefinition/PublishPluginDefinitionCommand.cs:11`)
- `RegisterPluginDefinitionCommand` (`src/Modules/Plugins/Plugins.Application/Commands/RegisterPluginDefinition/RegisterPluginDefinitionCommand.cs:12`)
- `RevokePluginPermissionCommand` (`src/Modules/Plugins/Plugins.Application/Commands/RevokePluginPermission/RevokePluginPermissionCommand.cs:10`)
- `UninstallPluginCommand` (`src/Modules/Plugins/Plugins.Application/Commands/UninstallPlugin/UninstallPluginCommand.cs:10`)
- `UpdatePluginDefinitionCommand` (`src/Modules/Plugins/Plugins.Application/Commands/UpdatePluginDefinition/UpdatePluginDefinitionCommand.cs:14`)
- `UpdatePluginSettingsCommand` (`src/Modules/Plugins/Plugins.Application/Commands/UpdatePluginSettings/UpdatePluginSettingsCommand.cs:13`)
- `RollbackPluginInstallationCommand` (`src/Modules/Plugins/Plugins.Application/Commands/UpgradePlugin/RollbackPluginInstallationCommand.cs:10`)
- `UpgradePluginCommand` (`src/Modules/Plugins/Plugins.Application/Commands/UpgradePlugin/UpgradePluginCommand.cs:10`)
- `SubscribePluginWebhookCommand` (`src/Modules/Plugins/Plugins.Application/Commands/WebhookSubscription/SubscribePluginWebhookCommand.cs:18`)
- `UnsubscribePluginWebhookCommand` (`src/Modules/Plugins/Plugins.Application/Commands/WebhookSubscription/UnsubscribePluginWebhookCommand.cs:17`)

### CQRS Queries (6)
- `GetInstalledPluginsQuery` (`src/Modules/Plugins/Plugins.Application/Queries/PluginQueries.cs:11`)
- `GetPluginCatalogQuery` (`src/Modules/Plugins/Plugins.Application/Queries/PluginQueries.cs:18`)
- `GetPluginDefinitionsQuery` (`src/Modules/Plugins/Plugins.Application/Queries/PluginQueries.cs:25`)
- `GetPluginDetailsQuery` (`src/Modules/Plugins/Plugins.Application/Queries/PluginQueries.cs:31`)
- `GetPluginExecutionLogsQuery` (`src/Modules/Plugins/Plugins.Application/Queries/PluginQueries.cs:38`)
- `GetPluginDataStoreQuery` (`src/Modules/Plugins/Plugins.Application/Queries/PluginQueries.cs:52`)

### Background Jobs (3) & UAT Seeders / Providers (5)
- **[Job]** `PluginDataCleanupJob` (`src/Modules/Plugins/Plugins.Infrastructure/BackgroundJobs/PluginDataCleanupJob.cs:13`)
- **[Job]** `PluginHealthCheckJob` (`src/Modules/Plugins/Plugins.Infrastructure/BackgroundJobs/PluginHealthCheckJob.cs:33`)
- **[Job]** `PluginsSoftDeleteCleanupJob` (`src/Modules/Plugins/Plugins.Infrastructure/BackgroundJobs/PluginsSoftDeleteCleanupJob.cs:12`)
- **[Provider]** `PluginsFeatureProvider` (`src/Modules/Plugins/Plugins.Infrastructure/Providers/PluginsFeatureProvider.cs:12`)
- **[Provider]** `PluginsMenuProvider` (`src/Modules/Plugins/Plugins.Infrastructure/Providers/PluginsMenuProvider.cs:23`)
- **[Provider]** `PluginsPermissionProvider` (`src/Modules/Plugins/Plugins.Infrastructure/Providers/PluginsPermissionProvider.cs:10`)
- **[Seeder]** `PluginsStartupSeeder` (`src/Modules/Plugins/Plugins.Infrastructure/Persistence/PluginsStartupSeeder.cs:13`)
- **[Seeder]** `PluginsDevDataSeeder` (`src/Modules/Plugins/Plugins.Infrastructure/Persistence/Seeding/PluginsDevDataSeeder.cs:15`)

---

## 19. Venue Module

- **Schema**: `venue`
- **Footprint**: `439` files | `33` entities | `37` commands | `32` queries | `60` handlers | `35` validators | **`0` controllers (`0` HTTP endpoints)** | `17` DB tables | `3` jobs | `5` seeders/providers | `99` test files

### Database Contexts & Tables (`DbSet<T>` — 17 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `venue.VenueProfiles` | `VenueProfile` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:32` |
| `venue.Facilities` | `Facility` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:33` |
| `venue.FacilityResourceProfiles` | `FacilityResourceProfile` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:34` |
| `venue.SchedulableResources` | `SchedulableResource` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:38` |
| `venue.AvailabilityCalendars` | `AvailabilityCalendar` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:39` |
| `venue.AvailabilityWindows` | `AvailabilityWindow` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:40` |
| `venue.AvailabilityExceptions` | `AvailabilityException` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:41` |
| `venue.Blackouts` | `Blackout` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:42` |
| `venue.MaintenanceBlocks` | `MaintenanceBlock` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:43` |
| `venue.Reservations` | `Reservation` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:46` |
| `venue.BookingRequests` | `BookingRequest` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:47` |
| `venue.BookingHolds` | `BookingHold` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:48` |
| `venue.ResourceCapacityBuckets` | `ResourceCapacityBucket` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:49` |
| `venue.CapacityLedgerEntries` | `CapacityLedgerEntry` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:50` |
| `venue.BookingStatusHistories` | `BookingStatusHistory` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:51` |
| `venue.BookingIdempotencyRecords` | `BookingIdempotencyRecord` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:52` |
| `venue.GuestReservationAccesses` | `GuestReservationAccess` | `VenueDbContext` | `src/Modules/Venue/Venue.Infrastructure/Persistence/VenueDbContext.cs:54` |

### Domain Entities (33)
- **`AvailabilityCalendar`** (`src/Modules/Venue/Venue.Domain/Entities/AvailabilityCalendar.cs:13`) : `AuditableEntity, ITenantAwareEntity`
- **`AvailabilityCalendarStatus`** (`src/Modules/Venue/Venue.Domain/Entities/AvailabilityCalendarStatus.cs:7`)
- **`AvailabilityException`** (`src/Modules/Venue/Venue.Domain/Entities/AvailabilityException.cs:12`) : `AuditableEntity, ITenantAwareEntity`
- **`AvailabilityExceptionMode`** (`src/Modules/Venue/Venue.Domain/Entities/AvailabilityExceptionMode.cs:7`)
- **`AvailabilityExceptionSource`** (`src/Modules/Venue/Venue.Domain/Entities/AvailabilityExceptionSource.cs:7`)
- **`AvailabilityWindow`** (`src/Modules/Venue/Venue.Domain/Entities/AvailabilityWindow.cs:12`) : `AuditableEntity, ITenantAwareEntity`
- **`Blackout`** (`src/Modules/Venue/Venue.Domain/Entities/Blackout.cs:13`) : `AuditableEntity, ITenantAwareEntity`
- **`BookingHold`** (`src/Modules/Venue/Venue.Domain/Entities/BookingHold.cs:18`) : `AuditableEntity, ITenantAwareEntity`
- **`BookingHoldStatus`** (`src/Modules/Venue/Venue.Domain/Entities/BookingHoldStatus.cs:9`)
- **`BookingIdempotencyRecord`** (`src/Modules/Venue/Venue.Domain/Entities/BookingIdempotencyRecord.cs:16`) : `AuditableEntity, ITenantAwareEntity`
- **`BookingRequest`** (`src/Modules/Venue/Venue.Domain/Entities/BookingRequest.cs:13`) : `AuditableEntity, ITenantAwareEntity`
- **`BookingSlotPolicy`** (`src/Modules/Venue/Venue.Domain/Entities/BookingSlotPolicy.cs:13`)
- **`BookingStatusHistory`** (`src/Modules/Venue/Venue.Domain/Entities/BookingStatusHistory.cs:10`) : `AuditableEntity, ITenantAwareEntity`
- **`CapacityLedgerEntry`** (`src/Modules/Venue/Venue.Domain/Entities/CapacityLedgerEntry.cs:11`) : `AuditableEntity, ITenantAwareEntity`
- **`CapacityLedgerEntryReason`** (`src/Modules/Venue/Venue.Domain/Entities/CapacityLedgerEntryReason.cs:7`)
- **`CapacityPolicy`** (`src/Modules/Venue/Venue.Domain/Entities/CapacityPolicy.cs:13`)
- **`Court`** (`src/Modules/Venue/Venue.Domain/Entities/Court.cs:8`)
- **`Facility`** (`src/Modules/Venue/Venue.Domain/Entities/Facility.cs:10`) : `AuditableEntity, ITenantAwareEntity, IHasRowVersion`
- **`FacilityResourceProfile`** (`src/Modules/Venue/Venue.Domain/Entities/FacilityResourceProfile.cs:14`) : `AuditableEntity, ITenantAwareEntity, IHasRowVersion`
- **`FacilityResourceUsageType`** (`src/Modules/Venue/Venue.Domain/Entities/FacilityResourceUsageType.cs:12`)
- **`GuestReservationAccess`** (`src/Modules/Venue/Venue.Domain/Entities/GuestReservationAccess.cs:11`) : `AuditableEntity, ITenantAwareEntity`
- **`IHasRowVersion`** (`src/Modules/Venue/Venue.Domain/Entities/IHasRowVersion.cs:7`)
- **`MaintenanceBlock`** (`src/Modules/Venue/Venue.Domain/Entities/MaintenanceBlock.cs:12`) : `AuditableEntity, ITenantAwareEntity`
- **`OperatingDays`** (`src/Modules/Venue/Venue.Domain/Entities/OperatingDays.cs:8`)
- **`OperatingPolicy`** (`src/Modules/Venue/Venue.Domain/Entities/OperatingPolicy.cs:14`)
- **`PublicationStatus`** (`src/Modules/Venue/Venue.Domain/Entities/PublicationStatus.cs:9`)
- **`Reservation`** (`src/Modules/Venue/Venue.Domain/Entities/Reservation.cs:19`) : `AggregateRoot, ITenantAwareEntity`
- **`ReservationLifecycle`** (`src/Modules/Venue/Venue.Domain/Entities/ReservationLifecycle.cs:26`)
- **`ReservationStatus`** (`src/Modules/Venue/Venue.Domain/Entities/ReservationStatus.cs:12`)
- **`ResourceAllocationMode`** (`src/Modules/Venue/Venue.Domain/Entities/ResourceAllocationMode.cs:7`)
- **`ResourceCapacityBucket`** (`src/Modules/Venue/Venue.Domain/Entities/ResourceCapacityBucket.cs:19`) : `AuditableEntity, ITenantAwareEntity`
- **`SchedulableResource`** (`src/Modules/Venue/Venue.Domain/Entities/SchedulableResource.cs:13`) : `AuditableEntity, ITenantAwareEntity, IHasRowVersion`
- **`VenueProfile`** (`src/Modules/Venue/Venue.Domain/Entities/VenueProfile.cs:11`) : `AuditableEntity, ITenantAwareEntity, IHasRowVersion`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (37)
- `DefineAvailabilityCommand` (`src/Modules/Venue/Venue.Application/Commands/AvailabilityCommands.cs:29`)
- `ReplaceAvailabilityCalendarCommand` (`src/Modules/Venue/Venue.Application/Commands/AvailabilityCommands.cs:46`)
- `CreateAvailabilityExceptionCommand` (`src/Modules/Venue/Venue.Application/Commands/AvailabilityCommands.cs:69`)
- `CreateBookingDraftCommand` (`src/Modules/Venue/Venue.Application/Commands/BookingCommands.cs:18`)
- `RequestBookingCommand` (`src/Modules/Venue/Venue.Application/Commands/BookingCommands.cs:40`)
- `CreateHoldCommand` (`src/Modules/Venue/Venue.Application/Commands/BookingCommands.cs:71`)
- `ConfirmReservationCommand` (`src/Modules/Venue/Venue.Application/Commands/BookingCommands.cs:108`)
- `CheckInReservationCommand` (`src/Modules/Venue/Venue.Application/Commands/BookingCommands.cs:135`)
- `CompleteReservationCommand` (`src/Modules/Venue/Venue.Application/Commands/BookingCommands.cs:150`)
- `MarkReservationNoShowCommand` (`src/Modules/Venue/Venue.Application/Commands/BookingCommands.cs:166`)
- `CancelReservationCommand` (`src/Modules/Venue/Venue.Application/Commands/BookingCommands.cs:190`)
- `RescheduleReservationCommand` (`src/Modules/Venue/Venue.Application/Commands/BookingCommands.cs:213`)
- `ChangeReservationResourceCommand` (`src/Modules/Venue/Venue.Application/Commands/BookingCommands.cs:252`)
- `CreateFacilityCommand` (`src/Modules/Venue/Venue.Application/Commands/FacilityCommands.cs:12`)
- `UpdateFacilityCommand` (`src/Modules/Venue/Venue.Application/Commands/FacilityCommands.cs:28`)
- `DeleteFacilityCommand` (`src/Modules/Venue/Venue.Application/Commands/FacilityCommands.cs:58`)
- `CreateFacilityResourceProfileCommand` (`src/Modules/Venue/Venue.Application/Commands/FacilityResourceProfileCommands.cs:16`)
- `UpdateFacilityResourceProfileCommand` (`src/Modules/Venue/Venue.Application/Commands/FacilityResourceProfileCommands.cs:40`)
- `DeleteFacilityResourceProfileCommand` (`src/Modules/Venue/Venue.Application/Commands/FacilityResourceProfileCommands.cs:82`)
- `ExchangeGuestSessionCommand` (`src/Modules/Venue/Venue.Application/Commands/GuestExperienceCommands.cs:13`)
- `CancelGuestReservationCommand` (`src/Modules/Venue/Venue.Application/Commands/GuestExperienceCommands.cs:24`)
- `GenerateGuestAccessCommand` (`src/Modules/Venue/Venue.Application/Commands/GuestExperienceCommands.cs:43`)
- `RevokeGuestAccessCommand` (`src/Modules/Venue/Venue.Application/Commands/GuestExperienceCommands.cs:54`)
- `SendGuestLinkCommand` (`src/Modules/Venue/Venue.Application/Commands/GuestExperienceCommands.cs:65`)
- `CreateBlackoutCommand` (`src/Modules/Venue/Venue.Application/Commands/ResourceBlockCommands.cs:12`)
- `UpdateBlackoutCommand` (`src/Modules/Venue/Venue.Application/Commands/ResourceBlockCommands.cs:29`)
- `DeleteBlackoutCommand` (`src/Modules/Venue/Venue.Application/Commands/ResourceBlockCommands.cs:48`)
- `CreateMaintenanceBlockCommand` (`src/Modules/Venue/Venue.Application/Commands/ResourceBlockCommands.cs:63`)
- `UpdateMaintenanceBlockCommand` (`src/Modules/Venue/Venue.Application/Commands/ResourceBlockCommands.cs:80`)
- `DeleteMaintenanceBlockCommand` (`src/Modules/Venue/Venue.Application/Commands/ResourceBlockCommands.cs:99`)
- `CreateSchedulableResourceCommand` (`src/Modules/Venue/Venue.Application/Commands/SchedulableResourceCommands.cs:17`)
- `UpdateSchedulableResourceCommand` (`src/Modules/Venue/Venue.Application/Commands/SchedulableResourceCommands.cs:41`)
- `DeleteSchedulableResourceCommand` (`src/Modules/Venue/Venue.Application/Commands/SchedulableResourceCommands.cs:83`)
- `PublishSchedulableResourceCommand` (`src/Modules/Venue/Venue.Application/Commands/SchedulableResourceCommands.cs:100`)
- `CreateVenueProfileCommand` (`src/Modules/Venue/Venue.Application/Commands/VenueProfileCommands.cs:12`)
- `UpdateVenueProfileCommand` (`src/Modules/Venue/Venue.Application/Commands/VenueProfileCommands.cs:30`)
- `DeleteVenueProfileCommand` (`src/Modules/Venue/Venue.Application/Commands/VenueProfileCommands.cs:63`)

### CQRS Queries (32)
- `GetAvailabilityCalendarsQuery` (`src/Modules/Venue/Venue.Application/Queries/AvailabilityCalendarQueries.cs:12`)
- `GetAvailabilityCalendarByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/AvailabilityCalendarQueries.cs:25`)
- `GetAvailabilityExceptionsQuery` (`src/Modules/Venue/Venue.Application/Queries/AvailabilityExceptionQueries.cs:12`)
- `GetAvailabilityExceptionByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/AvailabilityExceptionQueries.cs:25`)
- `GetBookingHoldsQuery` (`src/Modules/Venue/Venue.Application/Queries/BookingHoldQueries.cs:12`)
- `GetBookingHoldByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/BookingHoldQueries.cs:22`)
- `GetBookingRequestsQuery` (`src/Modules/Venue/Venue.Application/Queries/BookingRequestQueries.cs:13`)
- `GetBookingRequestByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/BookingRequestQueries.cs:23`)
- `GetCourtsQuery` (`src/Modules/Venue/Venue.Application/Queries/CourtQueries.cs:9`)
- `GetCourtByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/CourtQueries.cs:12`)
- `GetFacilitiesQuery` (`src/Modules/Venue/Venue.Application/Queries/FacilityQueries.cs:12`)
- `GetFacilityByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/FacilityQueries.cs:18`)
- `GetFacilityResourceProfilesQuery` (`src/Modules/Venue/Venue.Application/Queries/FacilityResourceProfileQueries.cs:12`)
- `GetFacilityResourceProfileByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/FacilityResourceProfileQueries.cs:25`)
- `GetOperationsCalendarQuery` (`src/Modules/Venue/Venue.Application/Queries/GetOperationsCalendarQuery.cs:11`)
- `GetVenueOverviewQuery` (`src/Modules/Venue/Venue.Application/Queries/GetVenueOverviewQuery.cs:11`)
- `GetGuestReservationViewQuery` (`src/Modules/Venue/Venue.Application/Queries/GuestExperienceQueries.cs:12`)
- `GetGuestAccessStatusQuery` (`src/Modules/Venue/Venue.Application/Queries/GuestExperienceQueries.cs:29`)
- `GetReservationsQuery` (`src/Modules/Venue/Venue.Application/Queries/ReservationQueries.cs:12`)
- `GetReservationByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/ReservationQueries.cs:23`)
- `GetReservationOperationalDetailQuery` (`src/Modules/Venue/Venue.Application/Queries/ReservationQueries.cs:35`)
- `GetBlackoutsQuery` (`src/Modules/Venue/Venue.Application/Queries/ResourceBlockQueries.cs:11`)
- `GetBlackoutByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/ResourceBlockQueries.cs:21`)
- `GetMaintenanceBlocksQuery` (`src/Modules/Venue/Venue.Application/Queries/ResourceBlockQueries.cs:31`)
- `GetMaintenanceBlockByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/ResourceBlockQueries.cs:41`)
- `GetSchedulableResourcesQuery` (`src/Modules/Venue/Venue.Application/Queries/SchedulableResourceQueries.cs:12`)
- `GetSchedulableResourceByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/SchedulableResourceQueries.cs:25`)
- `GetSchedulableResourcePublicationChecklistQuery` (`src/Modules/Venue/Venue.Application/Queries/SchedulableResourceQueries.cs:41`)
- `SearchAvailabilityQuery` (`src/Modules/Venue/Venue.Application/Queries/SearchAvailabilityQuery.cs:11`)
- `GetVenueAttentionSignalsQuery` (`src/Modules/Venue/Venue.Application/Queries/VenueAttentionQueries.cs:11`)
- `GetVenueProfilesQuery` (`src/Modules/Venue/Venue.Application/Queries/VenueProfileQueries.cs:12`)
- `GetVenueProfileByIdQuery` (`src/Modules/Venue/Venue.Application/Queries/VenueProfileQueries.cs:18`)

### Background Jobs (3) & UAT Seeders / Providers (5)
- **[Job]** `BookingHoldExpiryJob` (`src/Modules/Venue/Venue.Infrastructure/BackgroundJobs/BookingHoldExpiryJob.cs:42`)
- **[Job]** `BookingQuotaReconciliationJob` (`src/Modules/Venue/Venue.Infrastructure/BackgroundJobs/BookingQuotaReconciliationJob.cs:35`)
- **[Job]** `VenueSoftDeleteCleanupJob` (`src/Modules/Venue/Venue.Infrastructure/BackgroundJobs/VenueSoftDeleteCleanupJob.cs:13`)
- **[Provider]** `VenueFeatureProvider` (`src/Modules/Venue/Venue.Infrastructure/Providers/VenueFeatureProvider.cs:10`)
- **[Provider]** `VenueMenuProvider` (`src/Modules/Venue/Venue.Infrastructure/Providers/VenueMenuProvider.cs:10`)
- **[Provider]** `VenuePermissionProvider` (`src/Modules/Venue/Venue.Infrastructure/Providers/VenuePermissionProvider.cs:10`)
- **[Seeder]** `VenueDevDataSeeder` (`src/Modules/Venue/Venue.Infrastructure/Persistence/Seeding/VenueDevDataSeeder.cs:16`)
- **[Seeder]** `VenueModuleSeeder` (`src/Modules/Venue/Venue.Infrastructure/Persistence/VenueModuleSeeder.cs:13`)

---

## 20. WorkManagement Module

- **Schema**: `work_management`
- **Footprint**: `68` files | `1` entities | `3` commands | `2` queries | `5` handlers | `3` validators | **`0` controllers (`0` HTTP endpoints)** | `1` DB tables | `1` jobs | `5` seeders/providers | `9` test files

### Database Contexts & Tables (`DbSet<T>` — 1 tables)
| Schema.Table | Entity Type | DbContext | Source Location |
|---|---|---|---|
| `work_management.WorkItems` | `WorkItem` | `WorkManagementDbContext` | `src/Modules/WorkManagement/WorkManagement.Infrastructure/Persistence/WorkManagementDbContext.cs:35` |

### Domain Entities (1)
- **`WorkItem`** (`src/Modules/WorkManagement/WorkManagement.Domain/Entities/WorkItem.cs:14`) : `AuditableEntity, ITenantAwareEntity`

### REST API Endpoints (0 endpoints across 0 controllers)
_No HTTP controller endpoints in this module._

### CQRS Commands (3)
- `CreateWorkItemCommand` (`src/Modules/WorkManagement/WorkManagement.Application/Commands/WorkItemCommands.cs:13`)
- `UpdateWorkItemCommand` (`src/Modules/WorkManagement/WorkManagement.Application/Commands/WorkItemCommands.cs:35`)
- `DeleteWorkItemCommand` (`src/Modules/WorkManagement/WorkManagement.Application/Commands/WorkItemCommands.cs:70`)

### CQRS Queries (2)
- `GetWorkItemsQuery` (`src/Modules/WorkManagement/WorkManagement.Application/Queries/WorkItemQueries.cs:13`)
- `GetWorkItemByIdQuery` (`src/Modules/WorkManagement/WorkManagement.Application/Queries/WorkItemQueries.cs:23`)

### Background Jobs (1) & UAT Seeders / Providers (5)
- **[Job]** `WorkManagementSoftDeleteCleanupJob` (`src/Modules/WorkManagement/WorkManagement.Infrastructure/BackgroundJobs/WorkManagementSoftDeleteCleanupJob.cs:20`)
- **[Provider]** `WorkManagementFeatureProvider` (`src/Modules/WorkManagement/WorkManagement.Infrastructure/Providers/WorkManagementFeatureProvider.cs:8`)
- **[Provider]** `WorkManagementMenuProvider` (`src/Modules/WorkManagement/WorkManagement.Infrastructure/Providers/WorkManagementMenuProvider.cs:35`)
- **[Provider]** `WorkManagementPermissionProvider` (`src/Modules/WorkManagement/WorkManagement.Infrastructure/Providers/WorkManagementPermissionProvider.cs:18`)
- **[Seeder]** `WorkManagementDevDataSeeder` (`src/Modules/WorkManagement/WorkManagement.Infrastructure/Persistence/Seeding/WorkManagementDevDataSeeder.cs:14`)
- **[Seeder]** `WorkManagementModuleSeeder` (`src/Modules/WorkManagement/WorkManagement.Infrastructure/Persistence/WorkManagementModuleSeeder.cs:17`)

---
