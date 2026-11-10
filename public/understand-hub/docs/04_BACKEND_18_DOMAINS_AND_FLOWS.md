# SCRIPE-Backend — Complete 18-Module Business Domains & Operational Flows (/understand-domain)

> **Generated from `SCRIPE-Backend/.ua/domain-graph.json`** — **18 Business Domains**, **36 End-to-End Business Flows**, **144 Code-Anchored Execution Steps**, and **29 Cross-Domain Interactions** (`198` nodes, `209` edges).

---

## 1. All 18 Business Domains & Their Flows

### Domain: Identity: Identity, Auth & PBAC Security (`domain:identity`)

- **Summary**: Multi-tenant users, roles, PBAC permissions, JWT/Refresh tokens, sessions, OIDC/SAML/Passkey auth, and security policies. Comprises 49 domain entities, 0 HTTP endpoints, 175 commands, 117 queries, and 46 database tables in schema 'identity'.
- **Entities**: `Admin`, `Admin`, `AdminDelegation`, `AdminPasskey`, `AdminPreference`, `AdminRole`, `AdminSecurityProfile`, `AdminUserGroup`, `AdminWorkspacePin`, `DashboardPreset`, `DeviceRegistration`, `ExternalLogin`
- **Business Rules**:
  - All Identity entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'identity'.
  - All 175 Commands and 117 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Identity uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Identity enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Identity Command & Transactional Write Flow (ISovereignSudoProtectedCommand) (`POST /api/v1/identity` · `http-command`)
- End-to-end transactional mutation flow for Identity: PBAC authorization -> FluentValidation -> ISovereignSudoProtectedCommandHandler -> IdentityDbContext ('identity') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches ISovereignSudoProtectedCommand via AstraFlow ISender. (`src/Host/API/Controllers/Identity/AccountController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes ISovereignSudoProtectedCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Identity/Identity.Application/Abstractions/ITenantPasswordValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes ISovereignSudoProtectedCommandHandler, enforces Identity aggregate invariants, and raises domain events on the entity. (`src/Modules/Identity/Identity.Application/Commands/Account/CreateAccountGovernanceActionCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'identity' via IdentityDbContext. (`src/Modules/Identity/Identity.Infrastructure/IdentityDbContextFactory.cs:1-75`)

#### Flow: Identity High-Speed Query & Projection Flow (ValidateSetupTokenQuery) (`GET /api/v1/identity` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Identity: executes ValidateSetupTokenQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends ValidateSetupTokenQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Identity/AccountController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes ValidateSetupTokenQueryHandler against IdentityDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Identity/Identity.Application/Commands/Auth/GetSetupAccountCustomFieldsQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Identity entities to response DTOs using static partial extension methods with zero reflection. (`src/Modules/Identity/Identity.Application/Users/Maps/User.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/Identity/Identity.Application/DTOs/Admin/AdminListResponse.cs:1-75`)

### Domain: Entitlements: Entitlements, Editions, Features & Quotas (`domain:entitlements`)

- **Summary**: Commercial SaaS editions, feature flags, tenant subscriptions, quota limits, usage meters, and licensing engine. Comprises 80 domain entities, 0 HTTP endpoints, 109 commands, 75 queries, and 49 database tables in schema 'entitlements'.
- **Entities**: `AnalyticsReportPreference`, `ReportCadence`, `AnalyticsSnapshot`, `BillingCycle`, `BillingCycleHelper`, `CommissionChargeAttempt`, `CommissionChargeAttemptStatus`, `CommissionLedgerStatus`, `CommissionInvoiceStatus`, `CommissionInvoice`, `CommissionInvoiceTrigger`, `CommissionLedgerEntry`
- **Business Rules**:
  - All Entitlements entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'entitlements'.
  - All 109 Commands and 75 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Entitlements uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Entitlements enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Entitlements Command & Transactional Write Flow (CancelStripeSubscriptionCommand) (`POST /api/v1/entitlements` · `http-command`)
- End-to-end transactional mutation flow for Entitlements: PBAC authorization -> FluentValidation -> CancelStripeSubscriptionCommandHandler -> EntitlementsDbContext ('entitlements') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches CancelStripeSubscriptionCommand via AstraFlow ISender. (`src/Host/API/Controllers/Entitlements/AnalyticsController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes CancelStripeSubscriptionCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Entitlements/Entitlements.Application/Abstractions/IDowngradeImpactValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes CancelStripeSubscriptionCommandHandler, enforces Entitlements aggregate invariants, and raises domain events on the entity. (`src/Modules/Entitlements/Entitlements.Application/Commands/Billing/CancelStripeSubscription/CancelStripeSubscriptionCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'entitlements' via EntitlementsDbContext. (`src/Modules/Entitlements/Entitlements.Infrastructure/EntitlementsDbContextFactory.cs:1-75`)

#### Flow: Entitlements High-Speed Query & Projection Flow (GetCohortAnalysisQuery) (`GET /api/v1/entitlements` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Entitlements: executes GetCohortAnalysisQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetCohortAnalysisQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Entitlements/AnalyticsController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetCohortAnalysisQueryHandler against EntitlementsDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Entitlements/Entitlements.Application/Queries/Analytics/GetCohortAnalysis/GetCohortAnalysisQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Entitlements entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/Entitlements/AnalyticsController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/Entitlements/Entitlements.Application/DTOs/Billing/SignupCheckoutStatusResponse.cs:1-75`)

### Domain: Venue: Venue, Court Topology & Football Ops (`domain:venue`)

- **Summary**: Facility topology, courts, bookings, conflict engine, maintenance windows, pricing rules, and football operations. Comprises 33 domain entities, 0 HTTP endpoints, 37 commands, 32 queries, and 17 database tables in schema 'venue'.
- **Entities**: `AvailabilityCalendar`, `AvailabilityCalendarStatus`, `AvailabilityException`, `AvailabilityExceptionMode`, `AvailabilityExceptionSource`, `AvailabilityWindow`, `Blackout`, `BookingHold`, `BookingHoldStatus`, `BookingIdempotencyRecord`, `BookingRequest`, `BookingSlotPolicy`
- **Business Rules**:
  - All Venue entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'venue'.
  - All 37 Commands and 32 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Venue uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Venue enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Venue Command & Transactional Write Flow (DefineAvailabilityCommand) (`POST /api/v1/venue` · `http-command`)
- End-to-end transactional mutation flow for Venue: PBAC authorization -> FluentValidation -> DefineAvailabilityCommandHandler -> VenueDbContext ('venue') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches DefineAvailabilityCommand via AstraFlow ISender. (`src/Host/API/Controllers/Venue/AvailabilityCalendarsController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes DefineAvailabilityCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Venue/Venue.Application/Abstractions/IBookingSlotPolicyValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes DefineAvailabilityCommandHandler, enforces Venue aggregate invariants, and raises domain events on the entity. (`src/Modules/Venue/Venue.Application/Commands/ConfirmReservationCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'venue' via VenueDbContext. (`src/Modules/Venue/Venue.Infrastructure/Migrations/Oracle/OracleVenueDbContextModelSnapshot.cs:1-75`)

#### Flow: Venue High-Speed Query & Projection Flow (GetAvailabilityCalendarsQuery) (`GET /api/v1/venue` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Venue: executes GetAvailabilityCalendarsQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetAvailabilityCalendarsQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Venue/AvailabilityCalendarsController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetAvailabilityCalendarsQueryHandler against VenueDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Venue/Venue.Application/Queries/GetAvailabilityCalendarByIdQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Venue entities to response DTOs using static partial extension methods with zero reflection. (`src/Modules/Venue/Venue.Application/Mapping/CourtMaps.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/Venue/Venue.Application/DTOs/AvailabilityCalendarListResponse.cs:1-75`)

### Domain: CRM: CRM & Commercial Pipeline (`domain:crm`)

- **Summary**: Leads, contacts, accounts, opportunities, commercial pipelines, stages, activities, quotes, and conversion workflows. Comprises 18 domain entities, 0 HTTP endpoints, 30 commands, 16 queries, and 16 database tables in schema 'crm'.
- **Entities**: `CrmAccountPartyRef`, `CrmContactPartyRef`, `CrmDealContactRole`, `CrmIdempotencyReceipt`, `CrmLead`, `CrmLead`, `CrmLegacyOrigin`, `CrmOpportunity`, `CrmOpportunityStageHistory`, `CrmPartyOperationCorrelation`, `CrmPipeline`, `CrmPipelineRule`
- **Business Rules**:
  - All CRM entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'crm'.
  - All 30 Commands and 16 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from CRM uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in CRM enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: CRM Command & Transactional Write Flow (CreateAccountCommand) (`POST /api/v1/crm` · `http-command`)
- End-to-end transactional mutation flow for CRM: PBAC authorization -> FluentValidation -> CreateAccountCommandHandler -> CRMDbContext ('crm') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches CreateAccountCommand via AstraFlow ISender. (`src/Host/API/Controllers/CRM/AccountsController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes CreateAccountCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/CRM/CRM.Application/Commands/Accounts/CreateAccountCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes CreateAccountCommandHandler, enforces CRM aggregate invariants, and raises domain events on the entity. (`src/Modules/CRM/CRM.Application/Commands/Accounts/CreateAccountCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'crm' via CRMDbContext. (`src/Modules/CRM/CRM.Infrastructure/BaseCRMDbContextFactory.cs:1-75`)

#### Flow: CRM High-Speed Query & Projection Flow (GetAccountByIdQuery) (`GET /api/v1/crm` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for CRM: executes GetAccountByIdQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetAccountByIdQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/CRM/AccountsController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetAccountByIdQueryHandler against CRMDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/CRM/CRM.Application/Queries/Accounts/GetAccountByIdQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps CRM entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/CRM/AccountsController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/CRM/CRM.Application/DTOs/Activities/FollowUpCreatedResponseDto.cs:1-75`)

### Domain: CustomFields: CustomFields & Dynamic Schema Engine (`domain:custom-fields`)

- **Summary**: Tenant-extensible custom field definitions, validation rules, entity bindings, and typed metadata values. Comprises 17 domain entities, 0 HTTP endpoints, 39 commands, 30 queries, and 17 database tables in schema 'custom_fields'.
- **Entities**: `CustomField`, `CustomFieldEncryptionAuditLog`, `CustomFieldMigrationSession`, `CustomFieldTenantEncryptionKey`, `CustomFieldValue`, `EntityFieldValue`, `EntityFieldValueOption`, `ExtensibleEntityType`, `FieldDefinition`, `FieldGroup`, `FieldOption`, `FieldValueSnapshot`
- **Business Rules**:
  - All CustomFields entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'custom_fields'.
  - All 39 Commands and 30 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from CustomFields uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in CustomFields enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: CustomFields Command & Transactional Write Flow (BackfillEntityFieldValuesCommand) (`POST /api/v1/custom-fields` · `http-command`)
- End-to-end transactional mutation flow for CustomFields: PBAC authorization -> FluentValidation -> BackfillEntityFieldValuesCommandHandler -> CustomFieldsDbContext ('custom_fields') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches BackfillEntityFieldValuesCommand via AstraFlow ISender. (`src/Host/API/Controllers/CustomFields/CustomFieldValuesController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes BackfillEntityFieldValuesCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/CustomFields/CustomFields.Application/Commands/BackfillEntityFieldValuesCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes BackfillEntityFieldValuesCommandHandler, enforces CustomFields aggregate invariants, and raises domain events on the entity. (`src/Modules/CustomFields/CustomFields.Application/Commands/BackfillEntityFieldValuesCommandHandler.Mapper.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'custom_fields' via CustomFieldsDbContext. (`src/Modules/CustomFields/CustomFields.Infrastructure/CustomFieldsDbContextFactory.cs:1-75`)

#### Flow: CustomFields High-Speed Query & Projection Flow (GetFieldVersionsQuery) (`GET /api/v1/custom-fields` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for CustomFields: executes GetFieldVersionsQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetFieldVersionsQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/CustomFields/CustomFieldValuesController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetFieldVersionsQueryHandler against CustomFieldsDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/CustomFields/CustomFields.Application/OptionSets/GetOptionSetByIdQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps CustomFields entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/CustomFields/CustomFieldValuesController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/CustomFields/CustomFields.Application/DTOs/BulkEntityCustomFieldValuesResponse.cs:1-75`)

### Domain: PartyKernel: PartyKernel & Unified Party Graph (`domain:party-kernel`)

- **Summary**: Canonical party model (individuals, organizations, households), relationships, addresses, and contact mechanisms. Comprises 11 domain entities, 0 HTTP endpoints, 26 commands, 17 queries, and 12 database tables in schema 'party_kernel'.
- **Entities**: `ContactPoint`, `ContactPointCreateReceipt`, `MergeCandidate`, `Party`, `PartyOrganization`, `PartyOrganizationCreateReceipt`, `PartyPerson`, `PartyPersonCreateReceipt`, `PartyRelationship`, `PartyRole`, `PartyTenantUsage`
- **Business Rules**:
  - All PartyKernel entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'party_kernel'.
  - All 26 Commands and 17 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from PartyKernel uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in PartyKernel enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: PartyKernel Command & Transactional Write Flow (BackfillPartyLookupSearchTermsCommand) (`POST /api/v1/party-kernel` · `http-command`)
- End-to-end transactional mutation flow for PartyKernel: PBAC authorization -> FluentValidation -> BackfillPartyLookupSearchTermsCommandHandler -> PartyKernelDbContext ('party_kernel') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches BackfillPartyLookupSearchTermsCommand via AstraFlow ISender. (`src/Host/API/Controllers/PartyKernel/ContactPointsController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes BackfillPartyLookupSearchTermsCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/PartyKernel/PartyKernel.Application/Commands/CreateContactPointCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes BackfillPartyLookupSearchTermsCommandHandler, enforces PartyKernel aggregate invariants, and raises domain events on the entity. (`src/Modules/PartyKernel/PartyKernel.Application/Commands/CreateContactPointCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'party_kernel' via PartyKernelDbContext. (`src/Modules/PartyKernel/PartyKernel.Infrastructure/Migrations/Oracle/OraclePartyKernelDbContextModelSnapshot.cs:1-75`)

#### Flow: PartyKernel High-Speed Query & Projection Flow (GetContactPointsQuery) (`GET /api/v1/party-kernel` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for PartyKernel: executes GetContactPointsQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetContactPointsQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/PartyKernel/ContactPointsController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetContactPointsQueryHandler against PartyKernelDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/PartyKernel/PartyKernel.Application/Queries/GetContactPointByIdQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps PartyKernel entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/PartyKernel/ContactPointsController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/PartyKernel/PartyKernel.Application/DTOs/ContactPointListResponse.cs:1-75`)

### Domain: CatalogPricing: CatalogPricing & Commercial Offers (`domain:catalog-pricing`)

- **Summary**: Product/service catalogs, price books, tiered pricing rules, discount schedules, and tax models. Comprises 27 domain entities, 0 HTTP endpoints, 4 commands, 2 queries, and 15 database tables in schema 'catalog_pricing'.
- **Entities**: `CalculationType`, `CatalogItem`, `CatalogItemStatus`, `CustomerAgreementRate`, `DiscountCalculationType`, `DiscountRule`, `Offering`, `OfferingStatus`, `PriceBook`, `PriceBookStatus`, `PriceBookVersion`, `PriceBookVersionStatus`
- **Business Rules**:
  - All CatalogPricing entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'catalog_pricing'.
  - All 4 Commands and 2 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from CatalogPricing uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in CatalogPricing enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: CatalogPricing Command & Transactional Write Flow (CalculatePriceQuoteCommand) (`POST /api/v1/catalog-pricing` · `http-command`)
- End-to-end transactional mutation flow for CatalogPricing: PBAC authorization -> FluentValidation -> CalculatePriceQuoteCommandHandler -> CatalogPricingDbContext ('catalog_pricing') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches CalculatePriceQuoteCommand via AstraFlow ISender. (`src/Host/API/Controllers/CatalogPricing/PriceQuotesController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes CalculatePriceQuoteCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/CatalogPricing/CatalogPricing.Application/Commands/CalculatePriceQuoteCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes CalculatePriceQuoteCommandHandler, enforces CatalogPricing aggregate invariants, and raises domain events on the entity. (`src/Modules/CatalogPricing/CatalogPricing.Application/Commands/CalculatePriceQuoteCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'catalog_pricing' via CatalogPricingDbContext. (`src/Modules/CatalogPricing/CatalogPricing.Infrastructure/CatalogPricingDbContextFactory.cs:1-75`)

#### Flow: CatalogPricing High-Speed Query & Projection Flow (GetResourceRentalPriceConfigurationQuery) (`GET /api/v1/catalog-pricing` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for CatalogPricing: executes GetResourceRentalPriceConfigurationQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetResourceRentalPriceConfigurationQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/CatalogPricing/PriceQuotesController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetResourceRentalPriceConfigurationQueryHandler against CatalogPricingDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/CatalogPricing/CatalogPricing.Application/Queries/GetResourceRentalPriceConfigurationQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps CatalogPricing entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/CatalogPricing/PriceQuotesController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/CatalogPricing/CatalogPricing.Application/DTOs/CatalogItemListResponse.cs:1-75`)

### Domain: Marketplace: Marketplace, Listings & Vendor Settlement (`domain:marketplace`)

- **Summary**: Public/tenant marketplace listings, discovery catalog, vendor onboarding, reviews, and commission rules. Comprises 14 domain entities, 0 HTTP endpoints, 23 commands, 14 queries, and 14 database tables in schema 'marketplace'.
- **Entities**: `AppCategory`, `AppCategoryMapping`, `AppInstallCount`, `AppListing`, `AppPricing`, `AppPurchase`, `AppReview`, `AppReviewReply`, `AppReviewTask`, `AppScreenshot`, `AppSubmission`, `DeveloperPayout`
- **Business Rules**:
  - All Marketplace entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'marketplace'.
  - All 23 Commands and 14 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Marketplace uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Marketplace enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Marketplace Command & Transactional Write Flow (RegisterDeveloperProfileCommand) (`POST /api/v1/marketplace` · `http-command`)
- End-to-end transactional mutation flow for Marketplace: PBAC authorization -> FluentValidation -> RegisterDeveloperProfileCommandHandler -> MarketplaceDbContext ('marketplace') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches RegisterDeveloperProfileCommand via AstraFlow ISender. (`src/Host/API/Controllers/Marketplace/AppCatalogController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes RegisterDeveloperProfileCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Marketplace/Marketplace.Application/Commands/ApproveSubmissionCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes RegisterDeveloperProfileCommandHandler, enforces Marketplace aggregate invariants, and raises domain events on the entity. (`src/Modules/Marketplace/Marketplace.Application/Commands/MarketplaceCommandHandlers.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'marketplace' via MarketplaceDbContext. (`src/Modules/Marketplace/Marketplace.Infrastructure/MarketplaceDbContextFactory.cs:1-75`)

#### Flow: Marketplace High-Speed Query & Projection Flow (GetMarketplaceCommissionSettingsQuery) (`GET /api/v1/marketplace` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Marketplace: executes GetMarketplaceCommissionSettingsQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetMarketplaceCommissionSettingsQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Marketplace/AppCatalogController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetMarketplaceCommissionSettingsQueryHandler against MarketplaceDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Marketplace/Marketplace.Application/Queries/MarketplaceQueryHandlers.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Marketplace entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/Marketplace/AppCatalogController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Host/API/Controllers/Marketplace/AppCatalogController.cs:1-75`)

### Domain: Compliance: Compliance, Waivers & Data Governance (`domain:compliance`)

- **Summary**: Legal waivers, consent records, GDPR/DSR privacy workflows, audit policies, and regulatory compliance checks. Comprises 11 domain entities, 0 HTTP endpoints, 19 commands, 14 queries, and 11 database tables in schema 'compliance'.
- **Entities**: `ComplianceReport`, `ConsentPurpose`, `ConsentRecord`, `ConsentSnapshot`, `DataInventoryItem`, `DataSubjectRequest`, `DsrModuleExecution`, `DsrStatusHistory`, `RegulationProfile`, `RetentionExecution`, `RetentionPolicy`
- **Business Rules**:
  - All Compliance entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'compliance'.
  - All 19 Commands and 14 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Compliance uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Compliance enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Compliance Command & Transactional Write Flow (RecordConsentCommand) (`POST /api/v1/compliance` · `http-command`)
- End-to-end transactional mutation flow for Compliance: PBAC authorization -> FluentValidation -> RecordConsentCommandHandler -> ComplianceDbContext ('compliance') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches RecordConsentCommand via AstraFlow ISender. (`src/Host/API/Controllers/Compliance/ComplianceConsentController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes RecordConsentCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Compliance/Compliance.Application/Commands/ComplianceValidatorsPlaceholder.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes RecordConsentCommandHandler, enforces Compliance aggregate invariants, and raises domain events on the entity. (`src/Modules/Compliance/Compliance.Application/Commands/Consent/RecordConsentCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'compliance' via ComplianceDbContext. (`src/Modules/Compliance/Compliance.Infrastructure/ComplianceDbContextFactory.cs:1-75`)

#### Flow: Compliance High-Speed Query & Projection Flow (GetConsentAnalyticsQuery) (`GET /api/v1/compliance` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Compliance: executes GetConsentAnalyticsQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetConsentAnalyticsQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Compliance/ComplianceConsentController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetConsentAnalyticsQueryHandler against ComplianceDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Compliance/Compliance.Application/Queries/Consent/GetConsentAnalyticsQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Compliance entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/Compliance/ComplianceConsentController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Host/API/Controllers/Compliance/ComplianceConsentController.cs:1-75`)

### Domain: Hrms: Hrms, Staff, Shifts & Workforce (`domain:hrms`)

- **Summary**: Staff profiles, organizational assignments, shift rosters, attendance, leave management, and HR workflows. Comprises 7 domain entities, 0 HTTP endpoints, 21 commands, 14 queries, and 7 database tables in schema 'hrms'.
- **Entities**: `Certification`, `EmploymentRecord`, `Qualification`, `StaffAssignment`, `StaffAvailability`, `StaffCompetency`, `StaffMember`
- **Business Rules**:
  - All Hrms entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'hrms'.
  - All 21 Commands and 14 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Hrms uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Hrms enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Hrms Command & Transactional Write Flow (CreateCertificationCommand) (`POST /api/v1/hrms` · `http-command`)
- End-to-end transactional mutation flow for Hrms: PBAC authorization -> FluentValidation -> CreateCertificationCommandHandler -> HrmsDbContext ('hrms') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches CreateCertificationCommand via AstraFlow ISender. (`src/Host/API/Controllers/Hrms/CertificationsController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes CreateCertificationCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Hrms/Hrms.Application/Commands/CreateCertificationCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes CreateCertificationCommandHandler, enforces Hrms aggregate invariants, and raises domain events on the entity. (`src/Modules/Hrms/Hrms.Application/Commands/CreateCertificationCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'hrms' via HrmsDbContext. (`src/Modules/Hrms/Hrms.Infrastructure/HrmsDbContextFactory.cs:1-75`)

#### Flow: Hrms High-Speed Query & Projection Flow (GetCertificationsQuery) (`GET /api/v1/hrms` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Hrms: executes GetCertificationsQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetCertificationsQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Hrms/CertificationsController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetCertificationsQueryHandler against HrmsDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Hrms/Hrms.Application/Queries/GetCertificationByIdQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Hrms entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/Hrms/CertificationsController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/Hrms/Hrms.Application/DTOs/CertificationListResponse.cs:1-75`)

### Domain: OrganizationCore: OrganizationCore, Branches & Hierarchy (`domain:organization-core`)

- **Summary**: Multi-branch organizational hierarchy, business units, operating hours, locations, and regional settings. Comprises 6 domain entities, 0 HTTP endpoints, 19 commands, 13 queries, and 7 database tables in schema 'organization_core'.
- **Entities**: `Branch`, `BusinessUnit`, `Department`, `LegalEntity`, `Site`, `Team`
- **Business Rules**:
  - All OrganizationCore entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'organization_core'.
  - All 19 Commands and 13 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from OrganizationCore uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in OrganizationCore enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: OrganizationCore Command & Transactional Write Flow (BackfillBranchSearchNamesCommand) (`POST /api/v1/organization-core` · `http-command`)
- End-to-end transactional mutation flow for OrganizationCore: PBAC authorization -> FluentValidation -> BackfillBranchSearchNamesCommandHandler -> OrganizationCoreDbContext ('organization_core') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches BackfillBranchSearchNamesCommand via AstraFlow ISender. (`src/Host/API/Controllers/OrganizationCore/BranchesController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes BackfillBranchSearchNamesCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/CreateBranchCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes BackfillBranchSearchNamesCommandHandler, enforces OrganizationCore aggregate invariants, and raises domain events on the entity. (`src/Modules/OrganizationCore/OrganizationCore.Application/Commands/CreateBranchCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'organization_core' via OrganizationCoreDbContext. (`src/Modules/OrganizationCore/OrganizationCore.Infrastructure/Migrations/Oracle/OracleOrganizationCoreDbContextModelSnapshot.cs:1-75`)

#### Flow: OrganizationCore High-Speed Query & Projection Flow (GetBranchesQuery) (`GET /api/v1/organization-core` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for OrganizationCore: executes GetBranchesQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetBranchesQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/OrganizationCore/BranchesController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetBranchesQueryHandler against OrganizationCoreDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/OrganizationCore/OrganizationCore.Application/Queries/GetBranchByIdQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps OrganizationCore entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/OrganizationCore/BranchesController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/OrganizationCore/OrganizationCore.Application/DTOs/BranchListResponse.cs:1-75`)

### Domain: Plugins: Plugins, Webhooks & Extension Runtime (`domain:plugins`)

- **Summary**: Tenant plugin registry, lifecycle hooks, extension sandboxes, and custom integration manifests. Comprises 8 domain entities, 0 HTTP endpoints, 19 commands, 6 queries, and 8 database tables in schema 'plugins'.
- **Entities**: `PluginApiKey`, `PluginDataStore`, `PluginDefinition`, `PluginExecutionLog`, `PluginInstallation`, `PluginPermissionGrant`, `PluginVersion`, `PluginWebhookSubscription`
- **Business Rules**:
  - All Plugins entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'plugins'.
  - All 19 Commands and 6 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Plugins uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Plugins enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Plugins Command & Transactional Write Flow (ActivatePluginCommand) (`POST /api/v1/plugins` · `http-command`)
- End-to-end transactional mutation flow for Plugins: PBAC authorization -> FluentValidation -> ActivatePluginCommandHandler -> PluginsDbContext ('plugins') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches ActivatePluginCommand via AstraFlow ISender. (`src/Host/API/Controllers/Plugins/PluginAuthController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes ActivatePluginCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Plugins/Plugins.Application/Commands/ActivatePlugin/ActivatePluginCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes ActivatePluginCommandHandler, enforces Plugins aggregate invariants, and raises domain events on the entity. (`src/Modules/Plugins/Plugins.Application/Commands/ActivatePlugin/ActivatePluginCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'plugins' via PluginsDbContext. (`src/Modules/Plugins/Plugins.Infrastructure/Migrations/Oracle/OraclePluginsDbContextModelSnapshot.cs:1-75`)

#### Flow: Plugins High-Speed Query & Projection Flow (GetInstalledPluginsQuery) (`GET /api/v1/plugins` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Plugins: executes GetInstalledPluginsQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetInstalledPluginsQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Plugins/PluginAuthController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetInstalledPluginsQueryHandler against PluginsDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Plugins/Plugins.Application/Queries/PluginQueryHandlers.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Plugins entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/Plugins/PluginAuthController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Host/API/Controllers/Plugins/PluginAuthController.cs:1-75`)

### Domain: Finance: Finance, Invoicing & Ledger (`domain:finance`)

- **Summary**: Invoices, payments, refunds, ledger entries, financial reconciliation, and revenue recognition. Comprises 11 domain entities, 0 HTTP endpoints, 5 commands, 10 queries, and 7 database tables in schema 'finance'.
- **Entities**: `CustomerInvoice`, `CustomerInvoiceAdjustment`, `CustomerInvoiceLine`, `InvoiceLineType`, `InvoiceStatus`, `PaymentAllocation`, `PaymentMethod`, `PaymentReceipt`, `PaymentRefund`, `PaymentStatus`, `RecordedPayment`
- **Business Rules**:
  - All Finance entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'finance'.
  - All 5 Commands and 10 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Finance uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Finance enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Finance Command & Transactional Write Flow (IssueCustomerInvoiceCommand) (`POST /api/v1/finance` · `http-command`)
- End-to-end transactional mutation flow for Finance: PBAC authorization -> FluentValidation -> IssueCustomerInvoiceCommandHandler -> FinanceDbContext ('finance') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches IssueCustomerInvoiceCommand via AstraFlow ISender. (`src/Host/API/Controllers/Finance/CustomerInvoicesController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes IssueCustomerInvoiceCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Finance/Finance.Application/Commands/AllocatePaymentCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes IssueCustomerInvoiceCommandHandler, enforces Finance aggregate invariants, and raises domain events on the entity. (`src/Modules/Finance/Finance.Application/Commands/FinanceCommandHandlers.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'finance' via FinanceDbContext. (`src/Modules/Finance/Finance.Infrastructure/FinanceDbContextFactory.cs:1-75`)

#### Flow: Finance High-Speed Query & Projection Flow (GetVenueMoneySummaryQuery) (`GET /api/v1/finance` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Finance: executes GetVenueMoneySummaryQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetVenueMoneySummaryQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Finance/CustomerInvoicesController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetVenueMoneySummaryQueryHandler against FinanceDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Finance/Finance.Application/Queries/FinanceAnalyticsQueryHandlers.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Finance entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/Finance/CustomerInvoicesController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Host/API/Controllers/Finance/CustomerInvoicesController.cs:1-75`)

### Domain: Integrations: Integrations & External Connectors (`domain:integrations`)

- **Summary**: Third-party payment gateways, messaging providers, calendar sync, ERP webhooks, and outbound adapters. Comprises 5 domain entities, 0 HTTP endpoints, 8 commands, 7 queries, and 7 database tables in schema 'integrations'.
- **Entities**: `ApiKey`, `ApiKeyDailyStats`, `ApiKeyScopeChangeLog`, `ApiKeyUsageLog`, `Integration`
- **Business Rules**:
  - All Integrations entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'integrations'.
  - All 8 Commands and 7 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Integrations uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Integrations enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Integrations Command & Transactional Write Flow (CreateApiKeyCommand) (`POST /api/v1/integrations` · `http-command`)
- End-to-end transactional mutation flow for Integrations: PBAC authorization -> FluentValidation -> CreateApiKeyCommandHandler -> IntegrationsDbContext ('integrations') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches CreateApiKeyCommand via AstraFlow ISender. (`src/Host/API/Controllers/Integrations/IntegrationsController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes CreateApiKeyCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Integrations/Integrations.Application/Commands/CreateApiKeyCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes CreateApiKeyCommandHandler, enforces Integrations aggregate invariants, and raises domain events on the entity. (`src/Modules/Integrations/Integrations.Application/Commands/CreateIntegrationCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'integrations' via IntegrationsDbContext. (`src/Modules/Integrations/Integrations.Infrastructure/IntegrationsDbContextFactory.cs:1-75`)

#### Flow: Integrations High-Speed Query & Projection Flow (GetApiKeyActivityQuery) (`GET /api/v1/integrations` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Integrations: executes GetApiKeyActivityQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetApiKeyActivityQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Integrations/IntegrationsController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetApiKeyActivityQueryHandler against IntegrationsDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Integrations/Integrations.Application/Queries/GetIntegrationByIdQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Integrations entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/Integrations/IntegrationsController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/Integrations/Integrations.Application/DTOs/ApiKeyDetailResponse.cs:1-75`)

### Domain: Media: Media, Assets & Storage Engine (`domain:media`)

- **Summary**: Multi-tenant file uploads, media asset metadata, signed URLs, image processing, and storage quotas. Comprises 4 domain entities, 0 HTTP endpoints, 6 commands, 6 queries, and 4 database tables in schema 'media'.
- **Entities**: `MediaAccessGrant`, `MediaFile`, `MediaFolder`, `Medias`
- **Business Rules**:
  - All Media entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'media'.
  - All 6 Commands and 6 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Media uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Media enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Media Command & Transactional Write Flow (CreateMediasCommand) (`POST /api/v1/media` · `http-command`)
- End-to-end transactional mutation flow for Media: PBAC authorization -> FluentValidation -> CreateMediasCommandHandler -> MediaDbContext ('media') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches CreateMediasCommand via AstraFlow ISender. (`src/Host/API/Controllers/Media/DownloadsController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes CreateMediasCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Media/Media.Application/Commands/CreateMediasCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes CreateMediasCommandHandler, enforces Media aggregate invariants, and raises domain events on the entity. (`src/Modules/Media/Media.Application/Commands/CreateMediasCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'media' via MediaDbContext. (`src/Modules/Media/Media.Infrastructure/MediaDbContextFactory.cs:1-75`)

#### Flow: Media High-Speed Query & Projection Flow (GetDownloadInfoQuery) (`GET /api/v1/media` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Media: executes GetDownloadInfoQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetDownloadInfoQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Media/DownloadsController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetDownloadInfoQueryHandler against MediaDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Media/Media.Application/Queries/GetMediasByIdQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Media entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/Media/DownloadsController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/Media/Media.Application/DTOs/MediaFileResponse.cs:1-75`)

### Domain: Communication: Communication, Templates & Dispatch (`domain:communication`)

- **Summary**: Email/SMS/push notification templates, delivery logs, omni-channel outbox dispatchers, and preferences. Comprises 4 domain entities, 0 HTTP endpoints, 2 commands, 0 queries, and 6 database tables in schema 'communication'.
- **Entities**: `ChannelConfiguration`, `DeliveryAttempt`, `MessageTemplateVersion`, `SentSmsLog`
- **Business Rules**:
  - All Communication entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'communication'.
  - All 2 Commands and 0 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Communication uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Communication enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Communication Command & Transactional Write Flow (UploadEmailAttachmentCommand) (`POST /api/v1/communication` · `http-command`)
- End-to-end transactional mutation flow for Communication: PBAC authorization -> FluentValidation -> UploadEmailAttachmentCommandHandler -> CommunicationDbContext ('communication') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches UploadEmailAttachmentCommand via AstraFlow ISender. (`src/Host/API/Controllers/Communication/EmailsController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes UploadEmailAttachmentCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Communication/Communication.Application/Commands/UploadEmailAttachmentCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes UploadEmailAttachmentCommandHandler, enforces Communication aggregate invariants, and raises domain events on the entity. (`src/Modules/Communication/Communication.Application/Commands/Templates/ArchiveMessageTemplateCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'communication' via CommunicationDbContext. (`src/Modules/Communication/Communication.Infrastructure/CommunicationDbContextFactory.cs:1-75`)

#### Flow: Communication High-Speed Query & Projection Flow (GetCommunicationListQuery) (`GET /api/v1/communication` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Communication: executes GetCommunicationListQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetCommunicationListQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Communication/EmailsController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetCommunicationListQueryHandler against CommunicationDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Host/API/Controllers/Communication/EmailsController.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Communication entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/Communication/EmailsController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Host/API/Controllers/Communication/EmailsController.cs:1-75`)

### Domain: WorkManagement: WorkManagement, Tasks & Action Items (`domain:work-management`)

- **Summary**: Operational tasks, assignments, SLA deadlines, and cross-module work item tracking. Comprises 1 domain entities, 0 HTTP endpoints, 3 commands, 2 queries, and 1 database tables in schema 'work_management'.
- **Entities**: `WorkItem`
- **Business Rules**:
  - All WorkManagement entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'work_management'.
  - All 3 Commands and 2 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from WorkManagement uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in WorkManagement enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: WorkManagement Command & Transactional Write Flow (CreateWorkItemCommand) (`POST /api/v1/work-management` · `http-command`)
- End-to-end transactional mutation flow for WorkManagement: PBAC authorization -> FluentValidation -> CreateWorkItemCommandHandler -> WorkManagementDbContext ('work_management') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches CreateWorkItemCommand via AstraFlow ISender. (`src/Host/API/Controllers/WorkManagement/WorkItemsController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes CreateWorkItemCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/WorkManagement/WorkManagement.Application/Commands/CreateWorkItemCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes CreateWorkItemCommandHandler, enforces WorkManagement aggregate invariants, and raises domain events on the entity. (`src/Modules/WorkManagement/WorkManagement.Application/Commands/CreateWorkItemCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'work_management' via WorkManagementDbContext. (`src/Modules/WorkManagement/WorkManagement.Infrastructure/Migrations/Oracle/OracleWorkManagementDbContextModelSnapshot.cs:1-75`)

#### Flow: WorkManagement High-Speed Query & Projection Flow (GetWorkItemsQuery) (`GET /api/v1/work-management` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for WorkManagement: executes GetWorkItemsQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetWorkItemsQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/WorkManagement/WorkItemsController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetWorkItemsQueryHandler against WorkManagementDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/WorkManagement/WorkManagement.Application/Queries/GetWorkItemByIdQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps WorkManagement entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/WorkManagement/WorkItemsController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/WorkManagement/WorkManagement.Application/DTOs/WorkItemListResponse.cs:1-75`)

### Domain: Analytics: Analytics, Telemetry & KPIs (`domain:analytics`)

- **Summary**: Event telemetry ingestion, daily metric aggregations, operational KPIs, and executive dashboards. Comprises 2 domain entities, 0 HTTP endpoints, 1 commands, 2 queries, and 2 database tables in schema 'analytics'.
- **Entities**: `AnalyticsDailyMetric`, `AnalyticsEvent`
- **Business Rules**:
  - All Analytics entities inherit from AuditableEntity and enforce automatic TenantId query filtering in schema 'analytics'.
  - All 1 Commands and 2 Queries execute through AstraFlow 2.2.0 and return Result<T> (zero business exceptions).
  - Cross-module communication from Analytics uses logical Guid IDs, Scripe.Core Contracts, and transactional Outbox domain events.
  - All 0 HTTP endpoints in Analytics enforce declarative PBAC policies via [PermissionRequired].
- **Cross-Domain Interactions**:
  - Authenticates actors and evaluates PBAC permissions via Identity & Entitlements contracts.
  - Publishes transactional Outbox domain events to Communication, Analytics, and Audit pipelines.

#### Flow: Analytics Command & Transactional Write Flow (TrackEventCommand) (`POST /api/v1/analytics` · `http-command`)
- End-to-end transactional mutation flow for Analytics: PBAC authorization -> FluentValidation -> TrackEventCommandHandler -> AnalyticsDbContext ('analytics') + Outbox event persistence.
  - **1. Controller & PBAC Guard**: Validates JWT tenant context, checks [PermissionRequired], and dispatches TrackEventCommand via AstraFlow ISender. (`src/Host/API/Controllers/Analytics/AnalyticsMetricsController.cs:1-75`)
  - **2. FluentValidation Pipeline**: Executes TrackEventCommandValidator rules in ValidationBehavior; returns HTTP 400/422 ProblemDetails if invalid. (`src/Modules/Analytics/Analytics.Application/Commands/Events/TrackEventCommandValidator.cs:1-75`)
  - **3. AstraFlow CommandHandler & Domain Logic**: Invokes TrackEventCommandHandler, enforces Analytics aggregate invariants, and raises domain events on the entity. (`src/Modules/Analytics/Analytics.Application/Commands/Events/TrackEventCommandHandler.cs:1-75`)
  - **4. Schema-Isolated DbContext & Outbox Commit**: Persists entity changes and OutboxMessage atomically inside schema 'analytics' via AnalyticsDbContext. (`src/Modules/Analytics/Analytics.Infrastructure/AnalyticsDbContextFactory.cs:1-75`)

#### Flow: Analytics High-Speed Query & Projection Flow (GetAnalyticsEventsQuery) (`GET /api/v1/analytics` · `http-query`)
- Zero-tracking read and compile-time DTO projection flow for Analytics: executes GetAnalyticsEventsQueryHandler with AsNoTracking(), TenantId filter, pagination guard (<= 100), and [AstraGenerateMapping].
  - **1. Query Endpoint Dispatch**: Binds pagination/filter query parameters and sends GetAnalyticsEventsQuery to the AstraFlow mediator pipeline. (`src/Host/API/Controllers/Analytics/AnalyticsMetricsController.cs:1-75`)
  - **2. AsNoTracking Tenant-Isolated Query**: Executes GetAnalyticsEventsQueryHandler against AnalyticsDbContext with AsNoTracking() and automatic TenantId filtering. (`src/Modules/Analytics/Analytics.Application/Queries/GetAnalyticsEventsQueryHandler.cs:1-75`)
  - **3. Compile-Time DTO Projection ([AstraGenerateMapping])**: Maps Analytics entities to response DTOs using static partial extension methods with zero reflection. (`src/Host/API/Controllers/Analytics/AnalyticsMetricsController.cs:1-75`)
  - **4. Result<PagedResult<T>> HTTP Serialization**: Unwraps Result<T> into a standardized JSON response envelope with pagination metadata. (`src/Modules/Analytics/Analytics.Application/DTOs/AnalyticsDailyMetricResponse.cs:1-75`)

