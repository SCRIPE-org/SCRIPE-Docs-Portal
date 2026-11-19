export type ArchifyPillar = "fullstack" | "backend" | "frontend";

export type ArchifyMode =
  | "explainer"
  | "architecture"
  | "sequence"
  | "workflow"
  | "erd"
  | "class"
  | "lifecycle"
  | "dataflow"
  | "tree"
  | "timeline"
  | "waterfall";

export interface ArchifyArtifactItem {
  id: string;
  pillar: ArchifyPillar;
  mode: ArchifyMode;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  htmlUrl: string;
  specUrl: string;
  repoName: string;
  repoCommit: string;
  featured?: boolean;
  highlights: string[];
  keySources: string[];
  viewsCount?: number;
}

export const ARCHIFY_PILLAR_META: Record<
  ArchifyPillar,
  {
    label: string;
    shortLabel: string;
    tagline: string;
    repoName: string;
    commit: string;
    accentColor: string;
    count: number;
  }
> = {
  fullstack: {
    label: "Super Full-Stack (Both Backend + Frontend)",
    shortLabel: "Super Full-Stack",
    tagline:
      "End-to-End Platform Single Source of Truth uniting Next.js 16 MVVM, .NET 10 AstraFlow 2.4.7, Dual-Mode DB, Outbox & 193-Command CLI",
    repoName: "SCRIPE-org/SCRIPE",
    commit: "960923d",
    accentColor: "#B7FF00",
    count: 21,
  },
  backend: {
    label: "SCRIPE-Backend Deep Dive (.NET 10 & AstraFlow 2.4.7)",
    shortLabel: "Backend (.NET 10)",
    tagline:
      "18 Isolated 3-Project Domain Modules, 29-Stage Security Gate, 927+ CQRS Handlers, 3-TX Idempotency & Multi-DB Persistence",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    commit: "e772fd54bb8d0b3361190a33f0137487310c8791",
    accentColor: "#38BDF8",
    count: 14,
  },
  frontend: {
    label: "SCRIPE-Frontend Deep Dive (Next.js 16 + React 19 MVVM)",
    shortLabel: "Frontend (Next.js 16)",
    tagline:
      "65+ Isolated Sub-Modules, 5-Layer SOLID MVVM Data Flow, Inversify DI, Sileo UI & Bilingual EN/AR Parity",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    commit: "91232f19b",
    accentColor: "#A78BFA",
    count: 14,
  },
};

export const ARCHIFY_MODE_META: Record<
  ArchifyMode,
  { label: string; shortBadge: string; category: "board" | "diagram" }
> = {
  explainer: { label: "Explainer Board", shortBadge: "EXPLAINER", category: "board" },
  architecture: { label: "Architecture Topology", shortBadge: "ARCH", category: "diagram" },
  sequence: { label: "Sequence Trace", shortBadge: "SEQUENCE", category: "diagram" },
  workflow: { label: "Swimlane Workflow", shortBadge: "WORKFLOW", category: "diagram" },
  erd: { label: "Physical ERD Schema", shortBadge: "ERD", category: "diagram" },
  class: { label: "UML Class & Contracts", shortBadge: "CLASS", category: "diagram" },
  lifecycle: { label: "State Machine Lifecycle", shortBadge: "LIFECYCLE", category: "diagram" },
  dataflow: { label: "Data Lineage & Security", shortBadge: "DATAFLOW", category: "diagram" },
  tree: { label: "Containment Tree", shortBadge: "TREE", category: "diagram" },
  timeline: { label: "Evolution Timeline", shortBadge: "TIMELINE", category: "diagram" },
  waterfall: { label: "Latency Waterfall", shortBadge: "WATERFALL", category: "diagram" },
};

export const ARCHIFY_CATALOG: ArchifyArtifactItem[] = [
  // ============================================================================
  // PILLAR 1: SUPER FULL-STACK (BOTH BACKEND + FRONTEND + ECOSYSTEM) — 21 PAGES
  // ============================================================================
  {
    id: "identity-sso-security-remediation-v2",
    pillar: "fullstack",
    mode: "explainer",
    badge: "IDENTITY & SSO V2 · 36/36 AUDIT + CLI",
    title: "Identity & Multi-Tenant SSO Security Remediation V2: 36/36 Audit, Smart Adaptive SSO & Hardened CLI",
    subtitle:
      "6-Tenant Adaptive SSO + Fail-Closed UNKNOWN_999 · 36/36 Run-2 Findings Mitigated · scripe_sudo_token Session Binding · 1.37 GB Cobertura Stream",
    description:
      "Single Source of Truth explainer board for the Identity & Multi-Tenant SSO Security Remediation V2 milestone: Smart Adaptive SSO across AHLY, CITY, FALCON, APEX, COMMUNITY, ACFC, Platform Root, and fail-closed UNKNOWN_999 (with zero clipping in EN/AR RTL and 375px mobile), 36/36 Security Audit run-2 mitigations (2 Critical, 17 High, 16 Medium, 1 Low across Identity, SSO, RBAC, Delegations/Break-Glass, OpenIddict/SAML, Media Uploads, Host Cookies, and Frontend store cleanup), scripe-cli streaming Cobertura XML parser (1.37 GB / 26 files in 2.63s) and command hardening, verified across 1,926 backend tests, arch-check 96/100, astraflow validate ok, check --quick 5/5, 6/6 live Playwright (21 PNGs), and ux-expert-v4 PASS.",
    htmlUrl: "/archify-hub/identity-sso-security-remediation-v2.html",
    specUrl: "/archify-hub/specs/identity-sso-security-remediation-v2.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "960923d",
    featured: true,
    highlights: [
      "36/36 Security Audit run-2 findings mitigated (2 Critical: ScopeGrant #23 & TransferProtection #27; 17 High, 16 Medium, 1 Low; 0 gaps)",
      "Smart Adaptive SSO across all 6 tenants (AHLY, CITY, FALCON, APEX, COMMUNITY, ACFC) + Platform Root + fail-closed UNKNOWN_999 with 0px clipping in EN/AR RTL & 375px mobile",
      "Session-bound scripe_sudo_token (sid/jti) + atomic CookieAuthMiddleware logout clearing + AccountLayout real POST /logout + ownerUserId PAT & Sudo store purge",
      "scripe-cli streams 1.37 GB (26 Cobertura files) in 2.63s (59.9 MB heap), removes -v collision, isolates SQLCMDPASSWORD, enforces shell:false & db outbox purge --confirm",
      "Verified gates: 1,926 backend tests (359+127+539+901), arch-check 96/100, astraflow validate ok, check --quick 5/5, live Playwright 6/6 (21 PNGs), ux-expert-v4 PASS",
    ],
    keySources: [
      ".agents/rules/security-and-infrastructure.md",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/SudoService.Validation.cs",
      "SCRIPE-Backend/src/Host/API/Middleware/CookieAuthMiddleware.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/Repositories/AdminRepository.RoleGraph.Delegations.BreakGlass.cs",
      "SCRIPE-Backend/src/Core/Core.Infrastructure/Services/FileService.cs",
      "SCRIPE-Frontend/src/modules/shared/auth/signin/src/presentation/components/SsoProviderButtons.tsx",
      "SCRIPE-Frontend/src/app/(account)/layout.tsx",
      "SCRIPE-Frontend/src/core/store/usePatOneTimeSecretStore.ts",
      "SCRIPE-Dev-Tools/scripe-cli/src/utils/coverage-checker.ts",
    ],
  },
  {
    id: "identity-sso-remediation-v2-architecture",
    pillar: "fullstack",
    mode: "architecture",
    badge: "4 GUIDED VIEWS · V2 REMEDIATION",
    title: "Identity & Multi-Tenant SSO Security Remediation V2 Architecture",
    subtitle:
      "4 Guided Views: Smart Adaptive SSO & Fail-Closed · Audit run-2 (36/36) Shield · Sudo Cookie & Store Cleanup · Hardened CLI & Quality Gates",
    description:
      "Native Archify Architecture diagram with 4 Guided Views mapping SCRIPE V2 across Adaptive SSO Login, Account & Store Isolation, Auth-First Rate Limiting & Cookie Clearing, Session-Bound Sudo, Critical RBAC & Break-Glass Custody, Media/SVG Quota Shield, Hardened scripe-cli, and Verified Quality Gates.",
    htmlUrl: "/archify-hub/identity-sso-remediation-v2-architecture.html",
    specUrl: "/archify-hub/specs/identity-sso-remediation-v2-architecture.architecture.json",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "960923d",
    featured: true,
    viewsCount: 4,
    highlights: [
      "4 Guided Views covering Smart Adaptive SSO, Audit run-2 (36/36), Session-Bound Sudo & Store Cleanup, and Hardened CLI & Quality Gates",
      "Zero-crossing showcase topology verified by automated check and real browser-check (0 errors, 0 warnings)",
      "Covers all 6 seeded tenants + Platform Root + fail-closed UNKNOWN_999 and 1,926 passing backend tests",
    ],
    keySources: [
      "AGENTS.md",
      ".agents/skills/scripe-security-crypto/SKILL.md",
      "SCRIPE-Backend/src/Host/API/Middleware/CookieAuthMiddleware.cs",
      "SCRIPE-Frontend/src/modules/shared/auth/signin/src/presentation/components/SsoProviderButtons.tsx",
      "SCRIPE-Dev-Tools/scripe-cli/src/utils/coverage-checker.ts",
    ],
  },
  {
    id: "identity-sso-zero-trust-security",
    pillar: "fullstack",
    mode: "explainer",
    badge: "ZERO-TRUST IDENTITY · SSO + HYBRID MFA + RUNTIME",
    title: "Multi-Tenant Identity Provider, Federated SSO, Hybrid MFA & Runtime Security Enforcement",
    subtitle:
      "Pre-Auth IgnoreQueryFilters + Fail-Closed Encrypted IDs + OIDC/OAuth2/SAML Cryptographic Proof + TwoFactorPendingToken + Sudo Console + Live PAT/API-Key/Delegation/CIDR",
    description:
      "Comprehensive Single Source of Truth explainer board documenting the hardened SCRIPE Multi-Tenant Identity Provider, Federated SSO (OIDC, pure OAuth2/GitHub, SAML 2.0 SP & IdP, Apple/Microsoft/Google/Facebook JWKS & debug_token), HybridMfaPolicy TwoFactorPendingToken step-up across SSO and passwordless flows (Magic Link, Phone OTP, atomic QR Login), Sudo-gated Account Security console eliminating mock SSO catalogs (410 Gone direct link), Platform-Admin /tenants/[id] IdP management with RowVersion/IsActive/TrustIdpMfa, and live runtime enforcement for PATs (scr_pat_...), X-API-Key, AdminDelegation, and Global CIDR.",
    htmlUrl: "/archify-hub/identity-sso-zero-trust-security.html",
    specUrl: "/archify-hub/specs/identity-sso-zero-trust-security.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "960923d",
    featured: true,
    highlights: [
      "Enforces .IgnoreQueryFilters() with explicit !IsDeleted/lockout/tenant guards on pre-auth & cross-tenant lookups plus fail-closed EncryptedGuidModelBinder/_idEncryption.TryDecrypt (422/404, zero Guid.TryParse)",
      "Cryptographically verifies Apple/Microsoft/Google/OIDC JWKS (MapInboundClaims=false), GitHub OAuth2 /user/emails, and SAML X.509 + InResponseTo with subject-first lookup and verified-email auto-link",
      "Unifies HybridMfaPolicy TwoFactorPendingToken step-up across OIDC, OAuth2, SAML, Magic Link, and Phone OTP plus atomic Approved->Consumed QR Login and OpenIddict /connect/authorize Deny",
      "Eliminates mock catalogs and dead security tables: live DB availableSsoProviders, Sudo initiate-link (410 Gone legacy link), PAT scr_pat_... pat_scope enforcement, X-API-Key, AdminDelegation, and Global CIDR across all modules",
    ],
    keySources: [
      ".agents/rules/security-and-infrastructure.md",
      ".agents/skills/scripe-security-crypto/SKILL.md",
      "SCRIPE-Backend/src/Host/API/Extensions/EncryptedGuidModelBinder.cs",
      "SCRIPE-Backend/src/Host/API/Controllers/Auth/OidcClientController.cs",
      "SCRIPE-Backend/src/Host/API/Controllers/Auth/OidcServerController.cs",
      "SCRIPE-Backend/src/Host/API/Controllers/Identity/PlatformTenantIdentityProvidersController.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Application/Abstractions/HybridMfaPolicy.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/OidcClientService.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/SamlClientService.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/ExternalAuthService.cs",
      "SCRIPE-Backend/src/Core/Core.Infrastructure/Authentication/PersonalAccessTokenAuthenticationHandler.cs",
      "SCRIPE-Backend/src/Core/Core.Application/Authorization/PermissionAuthorizationHandler.cs",
      "SCRIPE-Backend/src/Host/API/Middleware/ApiKeyUsageMiddleware.cs",
      "SCRIPE-Backend/src/Host/API/Middleware/TrustedCidrEnforcementMiddleware.cs",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountSecurityView.tsx",
      "SCRIPE-Frontend/src/modules/admin/identity/identity-providers/src/presentation/views/IdentityProvidersView.tsx",
      "SCRIPE-Frontend/src/modules/admin/identity/tenants/src/presentation/components/tabs/TenantIdentityProvidersTab.tsx",
      "SCRIPE-Frontend/src/modules/shared/auth/signin/src/presentation/views/LoginView.tsx",
    ],
  },
  {
    id: "identity-sso-zero-trust-architecture",
    pillar: "fullstack",
    mode: "architecture",
    badge: "4 GUIDED VIEWS · ZERO-TRUST IDENTITY",
    title: "Multi-Tenant Identity, Federated SSO, Hybrid MFA & Runtime Security Architecture",
    subtitle:
      "4 Guided Views: Multi-Tenant IdP Discovery, Federated SSO & Hybrid MFA, Sudo Account Console & Live PAT/API-Key/Delegation/Global CIDR Enforcement",
    description:
      "Native Archify Architecture diagram with 4 Guided Views mapping Next.js 16 Login & Account/IdP Consoles, Zero-Trust ASP.NET Core Edge Middleware (PAT, X-API-Key, Global CIDR), Encrypted ID & Sudo PBAC Gate, OIDC/OAuth2/SAML/Passwordless Engines, OpenIddict Server, HybridMfaPolicy, Distributed Cache Tickets, and Identity/Integrations Schemas.",
    htmlUrl: "/archify-hub/identity-sso-zero-trust-architecture.html",
    specUrl: "/archify-hub/specs/identity-sso-zero-trust-architecture.architecture.json",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "960923d",
    featured: true,
    viewsCount: 4,
    highlights: [
      "4 Guided Views covering IdP Discovery, Federated SSO & Hybrid MFA, Sudo Account Console, and Live Runtime Guards",
      "Zero-crossing topology uniting Frontend MVVM, ASP.NET Core security edge, External IdPs, OpenIddict, and isolated DB schemas",
      "Verified with showcase quality gate and real-browser check (0 diagnostics)",
    ],
    keySources: [
      "SCRIPE-Backend/src/Host/API/Middleware/TrustedCidrEnforcementMiddleware.cs",
      "SCRIPE-Backend/src/Host/API/Middleware/ApiKeyUsageMiddleware.cs",
      "SCRIPE-Backend/src/Core/Core.Infrastructure/Authentication/PersonalAccessTokenAuthenticationHandler.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Application/Abstractions/HybridMfaPolicy.cs",
      "SCRIPE-Backend/src/Host/API/Controllers/Identity/PlatformTenantIdentityProvidersController.cs",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountSecurityView.tsx",
    ],
  },
  {
    id: "identity-sso-hybrid-mfa-sequence",
    pillar: "fullstack",
    mode: "sequence",
    badge: "6 PARTICIPANTS · FEDERATED SSO + 2FA",
    title: "Federated SSO, Sudo Link, Hybrid MFA & Runtime Guard Sequence",
    subtitle:
      "Next.js 16 SPA -> Security Edge (Sudo/PAT/CIDR) -> SSO & Auth API -> External IdP (JWKS/X.509) -> State & 2FA Cache -> Identity DB",
    description:
      "Native Archify Sequence diagram tracing the 3-phase lifecycle of Sudo-gated federated linking and SSO login: encrypted ID & Sudo validation, server-side single-use state/nonce/PKCE tickets, cryptographic JWKS/X.509 proof with subject-first .IgnoreQueryFilters() binding, HybridMfaPolicy TwoFactorPendingToken step-up, and post-auth PAT/CIDR runtime enforcement.",
    htmlUrl: "/archify-hub/identity-sso-hybrid-mfa-sequence.html",
    specUrl: "/archify-hub/specs/identity-sso-hybrid-mfa-sequence.sequence.json",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "960923d",
    highlights: [
      "3 Segmented Phases: Sudo/Login Challenge, Cryptographic Verification & Subject-First Binding, Hybrid MFA & Runtime Guard",
      "Traces single-use IExternalAuthStateStore tickets and 5-minute TwoFactorPendingToken redemption with empty pre-2FA tokens",
      "Verified with showcase quality gate and real-browser check (0 diagnostics)",
    ],
    keySources: [
      "SCRIPE-Backend/src/Host/API/Controllers/Auth/OidcClientController.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/OidcClientService.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/SamlClientService.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/TwoFactorPendingTicketService.cs",
      "SCRIPE-Frontend/src/modules/shared/auth/signin/src/presentation/components/SsoCallbackContent.tsx",
    ],
  },
  {
    id: "data-exchange-360-audit-resilient-pipeline",
    pillar: "fullstack",
    mode: "explainer",
    badge: "DATA EXCHANGE 360° AUDIT · 500 FIX & OWASP",
    title: "Data Exchange 360° Audit: Resilient Upload Pipeline, 7-Vector OWASP Shield & 10-Provider Parity",
    subtitle:
      "ResilientDevelopmentBlobStorage + SpreadsheetValidationException (422/503) + Stream SHA-256 Idempotency + Artifact FLS Clearance + 10-Provider DAG & RTL Studio",
    description:
      "End-to-end Single Source of Truth explainer board and interactive native sequence, workflow, and architecture diagrams documenting the elimination of .xlsx upload HTTP 500 errors (ResilientDevelopmentBlobStorage + LocalBlobStorage hierarchical relative paths + SpreadsheetValidationException 422/503 separation), 7-vector OWASP spreadsheet & formula defense, DataExchangeAmbientContext worker privilege scoping, fail-closed ValidateDownloadArtifactFieldClearanceAsync FLS & confidential cf:* enforcement, 10-provider natural-key/batch-lookup/quota hardening across CRM, PartyKernel, Identity & CustomFields, and context-scoped Next.js 16 Studio & Hub UX verified across 11 live Playwright E2E screenshots.",
    htmlUrl: "/archify-hub/data-exchange-360-audit-resilient-pipeline.html",
    specUrl: "/archify-hub/specs/data-exchange-360-audit-resilient-pipeline.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "83eb92c",
    featured: true,
    highlights: [
      "Eliminates .xlsx/.csv upload HTTP 500 crashes via ResilientDevelopmentBlobStorage stream rewind & LocalBlobStorage fallback plus SpreadsheetValidationException 422/503 mapping",
      "Enforces 7-vector OWASP upload shield (.xls OLE2, 100 MB ZIP ratio, full XML/DTD/vbaProject/.rels scan, Unicode format-char CSV formula guard) and sanitized job ErrorSummary",
      "Hardens worker DataExchangeAmbientContext, membership-only AdminDataExchangeProvider.Assignability, stream SHA-256 idempotency, and fail-closed download FLS & cf:* clearance",
      "Unifies all 10 CRM/PartyKernel/Identity providers (ResolvePartyIdsBatchAsync >2,000 rows, pre-commit ValidateReferenceAsync, WasCreated quota billing) & EN/AR RTL Nexus Studio UX",
    ],
    keySources: [
      "SCRIPE-Backend/src/Host/API/Extensions/BlobStorageConfiguration.cs",
      "SCRIPE-Backend/src/Core/Core.Infrastructure/Storage/LocalBlobStorage.cs",
      "SCRIPE-Backend/src/Core/Core.Infrastructure/DataExchange/OwaspSpreadsheetSecurityValidator.cs",
      "SCRIPE-Backend/src/Core/Core.Infrastructure/DataExchange/SpreadsheetValidationException.cs",
      "SCRIPE-Backend/src/Modules/DataTransfer/DataTransfer.Infrastructure/Services/DataExchangeOrchestrator.Jobs.cs",
      "SCRIPE-Backend/src/Modules/DataTransfer/DataTransfer.Infrastructure/Services/DataExchangeOrchestrator.ExecutionChunkCommit.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/DataExchange/AdminDataExchangeProvider.Assignability.cs",
      "SCRIPE-Backend/src/Modules/CRM/CRM.Infrastructure/DataExchange/CrmEntityLookupProvider.cs",
      "SCRIPE-Backend/src/Modules/CustomFields/CustomFields.Infrastructure/Services/CustomFieldBatchDataExchangeBridge.cs",
      "SCRIPE-Frontend/src/core/data-exchange/infrastructure/repositories/data-exchange.repository.ts",
      "SCRIPE-Frontend/src/core/data-exchange/presentation/stores/data-exchange-jobs.store.ts",
      "SCRIPE-Frontend/src/modules/admin/data-transfer/src/presentation/views/EntitiesCatalogView.tsx",
    ],
  },
  {
    id: "crm-enterprise-overhaul-security-ux",
    pillar: "fullstack",
    mode: "explainer",
    badge: "CRM ENTERPRISE OVERHAUL · OWASP & UX AUDIT",
    title: "CRM Enterprise Overhaul, Sovereign Assignees, Full-Card Kanban & 5-Layer OWASP Defense",
    subtitle:
      "Tenant Assignee Lookup + Exit Gate Allowlist + BOLA/PBAC Defense + Zero-Handle Direct Drag + Multi-Currency Kanban + Dynamic Stage Gates",
    description:
      "Comprehensive publication-grade Single Source of Truth explainer board and interactive diagrams documenting the SCRIPE CRM Enterprise Overhaul: tenant-scoped sovereign assignee lookup (/api/v1/crm/settings/assignees) with PII field redaction and AES-GCM encrypted wire IDs, PermittedExitFieldKeys exit gate allowlists, OWASP BOLA/PBAC elimination across lead/opportunity/contact-role handlers, zero-handle direct full-card Kanban drag with 6px PointerSensor, CrmEntitySearchSelect server combobox with inline quick-creation, multi-currency column and reporting conversions, and batch display-name hydration benchmarked against Odoo 18, SAP Sales Cloud, and Salesforce Lightning.",
    htmlUrl: "/archify-hub/crm-enterprise-overhaul-security-ux.html",
    specUrl: "/archify-hub/specs/crm-enterprise-overhaul-security-ux.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "83eb92c9",
    featured: true,
    highlights: [
      "Tenant-scoped sovereign assignee resolution (GET /api/v1/crm/settings/assignees) with PBAC verification, PII field masking via IRestrictedFieldsResolver, and AES-GCM ID encryption",
      "PermittedExitFieldKeys exit gate allowlist and MoveOpportunityStageCommandHandler gate validation eliminating untrusted dictionary keys and verifying tenant context",
      "Zero-handle direct full-card Kanban dragging via KanbanSortableCard and 6px PointerSensor activation constraint, removing GripVertical friction and outer border nesting",
      "CrmEntitySearchSelect debounced server combobox with CrmEntityQuickCreateDialog inline creation, CrmWorkflowTransitionDialog form reset on open, and live multi-currency column aggregation",
    ],
    keySources: [
      "SCRIPE-Backend/src/Host/API/Controllers/CRM/SettingsController.cs",
      "SCRIPE-Backend/src/Modules/CRM/CRM.Application/Queries/Settings/LookupCrmAssigneesQueryHandler.cs",
      "SCRIPE-Backend/src/Modules/CRM/CRM.Application/Common/PermittedExitFieldKeys.cs",
      "SCRIPE-Backend/src/Modules/CRM/CRM.Application/Commands/Opportunities/MoveOpportunityStageCommandHandler.GateValidation.cs",
      "SCRIPE-Backend/src/Host/API/Controllers/CRM/DealContactRolesController.cs",
      "SCRIPE-Backend/src/Modules/CRM/CRM.Application/Commands/Opportunities/RemoveDealContactRoleCommandHandler.cs",
      "SCRIPE-Backend/src/Modules/CRM/CRM.Application/Common/CrmDisplayNameResolutionHelper.cs",
      "SCRIPE-Frontend/src/core/crud/kanban/KanbanSortableCard.tsx",
      "SCRIPE-Frontend/src/modules/crm/overview/src/presentation/components/CrmEntitySearchSelect.tsx",
      "SCRIPE-Frontend/src/modules/crm/overview/src/presentation/components/CrmWorkflowTransitionDialog.tsx",
      "SCRIPE-Frontend/src/modules/crm/overview/src/presentation/viewmodels/useCrmCurrency.ts",
      "SCRIPE-Frontend/src/modules/crm/overview/src/presentation/components/settings/CrmCustomFieldsStudioCard.tsx",
    ],
  },
  {
    id: "account-passkeys-sudo-ux-redemption",
    pillar: "fullstack",
    mode: "explainer",
    badge: "4-TRACK + MILESTONE 9 + PAT STUDIO · PASSKEYS + SUDO",
    title: "Account World, Fido2NetLib Passkeys, Unified Sudo, Quotas & GitHub+ PAT Studio",
    subtitle:
      "Polymorphic Fido2NetLib + Cookie Sudo + MMC First-Login + Principal Isolation + Real Quotas + Bilingual PAT Studio",
    description:
      "Complete 4-track + Milestone 9 + GitHub+ PAT Studio implementation uniting Fido2NetLib passkeys, reload-safe HttpOnly cookie Sudo, MMC-parity mcp=true first-login password setup, strict Platform vs Tenant isolation, real MaxPerTenant plan quotas with post-commit override sync, full-canvas bilingual EN/AR /account/integrations/new and /account/integrations/[id] with RowVersion concurrency, per-card @core/ui/skeletons, and 14/14 unmocked Chromium Playwright verification.",
    htmlUrl: "/archify-hub/account-passkeys-sudo-ux-redemption.html",
    specUrl: "/archify-hub/specs/account-passkeys-sudo-ux-redemption.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "e0d390a",
    featured: true,
    highlights: [
      "Polymorphic Fido2NetLib passkeys + HttpOnly cookie Sudo (Passkey -> TOTP -> Password fallback) + safe sole-passkey removal",
      "Strict Platform SuperAdmin vs Tenant isolation (Global Control Plane badge, hidden /account/plan, DelegateAuthority + Break-Glass guard)",
      "Real Edition & TenantFeatureOverride quotas (.IgnoreQueryFilters() + post-commit FeatureCache clear + api_key QuotaCounter) with 422 QuotaExceeded enforcement",
      "GitHub+ PAT Studio (/account/integrations/new & [id]) with bilingual NameEn/NameAr, inline descriptions + HoverCard/Popover, technical key switch, RowVersion edits & 14/14 Chromium E2E",
    ],
    keySources: [
      "docs/superpowers/specs/2026-11-15-account-passkeys-sudo-ux-redemption-design.md",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Application/DTOs/Auth/CompletePasskeyRegistrationRequest.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/Fido2WebAuthnService.Crypto.cs",
      "SCRIPE-Backend/src/Host/API/Controllers/Auth/PasskeyController.cs",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountSecurityView.tsx",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountGovernanceView.tsx",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountIntegrationsView.tsx",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/PatCreatePageView.tsx",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/PatDetailPageView.tsx",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountPreferencesView.tsx",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/ForceChangePasswordView.tsx",
    ],
  },
  {
    id: "unified-navigation-route-security",
    pillar: "fullstack",
    mode: "explainer",
    badge: "OPTION C · UNIFIED AUTHZ & ROUTING",
    title: "Unified Context-Aware Navigation & Fail-Closed Route Security (Option C)",
    subtitle:
      "AuthorizedRouteDescriptor + MenuAccessEvaluator + 192-Route APP_ROUTE_MANIFEST + Fail-Closed RouteGuard & Reusable Shell Context Gates",
    description:
      "Full-stack security and architecture explainer detailing the retirement of SupportsTenantGuidance and TENANT_SCOPED_GUIDANCE_PAGES, remediation of /crm and /settings/* SYSTEM_PAGES bypasses, cross-tenant dashboard MRR and webhook IDOR hardening, 192-route manifest parity, inline TenantContextRequiredGate / FeatureUnavailableGate / PlatformContextRequiredGate UX, and live E2E verification.",
    htmlUrl: "/archify-hub/unified-navigation-route-security.html",
    specUrl: "/archify-hub/specs/unified-navigation-route-security.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "1ce419b",
    featured: true,
    highlights: [
      "Removes SupportsTenantGuidance DB columns/migrations and TENANT_SCOPED_GUIDANCE_PAGES with zero new database columns",
      "Eliminates SYSTEM_PAGES /crm & /settings/* bypasses, reverse-prefix matching, SSR/SPA flashes, and default-allow PAGE_PERMISSIONS",
      "Unifies .NET MenuAccessEvaluator across Navigation, Workspaces & Routes emitting AuthorizedRouteDescriptor + AccessState",
      "Delivers inline shell TenantContextRequiredGate, PlatformContextRequiredGate & FeatureUnavailableGate via /api/v1/tenants/switchable",
    ],
    keySources: [
      "SCRIPE-Backend/src/Modules/Identity/Identity.Application/Queries/Menu/MenuAccessEvaluator.cs",
      "SCRIPE-Backend/src/Host/API/Middleware/TenantContextMiddleware.cs",
      "SCRIPE-Backend/src/Host/API/Controllers/Tenancy/TenantsController.Switchable.cs",
      "SCRIPE-Frontend/src/core/config/app-route-manifest.ts",
      "SCRIPE-Frontend/src/core/providers/route-guard.tsx",
      "SCRIPE-Frontend/src/core/hooks/useTenantContextSwitcher.ts",
      "SCRIPE-Frontend/src/core/components/tenant-context/index.ts",
    ],
  },
  {
    id: "venue-identity-super-refactor",
    pillar: "fullstack",
    mode: "explainer",
    badge: "SUPER FULL-STACK · VENUE + IDENTITY + PROFILE",
    title: "Venue & Identity Super Refactor: AstraFlow 2.3.0 & 3-DB Concurrency",
    subtitle:
      "AuditableEntity<Guid>, Compile-Time [AstraGenerateMapping], 19+1 RowVersion Tokens Across 54 Migrations, ADR-040 Receipts & Profile 409 Recovery",
    description:
      "End-to-end architectural deep dive documenting the Venue, Identity, Core, and Frontend Profile refactor with native architecture, sequence, lifecycle, and workflow diagrams plus verified Wave 3B Before/After gates.",
    htmlUrl: "/archify-hub/venue-identity-super-refactor.html",
    specUrl: "/archify-hub/specs/venue-identity-super-refactor.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "b28278fd",
    featured: true,
    highlights: [
      "100/100 arch-check on Venue & Identity with 0 files >300L across 2,177 `.cs` files and 0 `FILE-EXCEPTION` waivers",
      "19 Identity + Core `RowVersion` columns + Venue `GuestReservationAccess` across 54 3-provider migrations (`6/6` pass)",
      "AstraFlow 2.3.0 `[AstraGenerateMapping]` + `*MapModel` bridges retiring `IdentityConventionProfile` & 9 Venue rule files",
      "Frontend `profile` end-to-end `rowVersion` + HTTP `409` invalidation passing `24/24` tests and `7/7` backend suites",
    ],
    keySources: [
      "SCRIPE-Backend/src/Modules/Venue/Venue.Domain/Entities/CourtCluster.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Domain/Entities/SignupSession.cs",
      "SCRIPE-Backend/src/Modules/Venue/Venue.Application/Mapping/CourtMaps.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs",
      "SCRIPE-Backend/tests/Core.Application.Tests/Idempotency/IdempotencyMigrationPresenceTests.cs",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/utils/concurrency.ts",
    ],
  },
  {
    id: "scripe-data-exchange-studio",
    pillar: "fullstack",
    mode: "explainer",
    badge: "DATA EXCHANGE STUDIO",
    title: "SCRIPE Data Exchange Studio: 16 PBAC Endpoints, Portal UX (z-900), 17-Rule Normalizer, 5-Sheet DAG & 7-Lang Docs",
    subtitle:
      "16 PBAC REST Endpoints (+SetDefaultPreset) + Full-Viewport Portal & ConfirmExitDialog + 17-Rule Popover + 5-Sheet DAG + Unified ⋯ CRUD + 7-Lang Docs",
    description:
      "End-to-end architectural explainer board covering Zero-Coupling DataTransfer plugin discovery (IEntityDataExchangeProvider in Core, DataExchangeJobCompletedEvent Outbox, GenericCrudView entityTypeKey via @core/data-exchange with zero @modules/admin/data-transfer imports), 16 [Authorize] PBAC endpoints across 7 roles without [AdminOnly] (POST presets/{id}/default, DataTransfer.UnknownEntity 404, dynamic relatedMultiSheetEntityKeys across CRM 5-sheet & PartyKernel 3-sheet clusters with Identity entities standalone), Read-Only Entity Catalog vs /custom-fields cf:* vs Jobs vs Presets, RequiresTenantContext = true + DataExchangeTenantRequiredCard, full-viewport createPortal Studio (z-[900]) with StudioConfirmExitDialog (z-[960]), scrollable 9-stage/17-rule O(n) ColumnNormalizationPopover (z-[950]), Dry-Run + 250-row isolated chunks + cooperative cancel + orphaned job recovery + fail-closed finite quotas, Showing 0-0 of 0 results pagination, and 7-language SCRIPE-Docs-Portal parity.",
    htmlUrl: "/archify-hub/scripe-data-exchange-studio.html",
    specUrl: "/archify-hub/specs/scripe-data-exchange-studio.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "228f6a1",
    featured: true,
    highlights: [
      "Zero-Coupling Core Plugin (IEntityDataExchangeProvider, @core/data-exchange) + DataExchangeJobCompletedEvent Outbox & 16 [Authorize] 7-Role Endpoints (No [AdminOnly])",
      "Read-Only DI Entity Catalog vs /custom-fields (cf:*) vs Jobs vs Presets + TenantRequired Card + Safe Recovery Without Global Rollback",
      "Scrollable 9-Stage / 17-Rule O(n) ColumnNormalizationPopover (z-[950], Tashkeel/Tatweel, Alef/ى/ک, DateFormat, UTC) + Step 2 Tooltips",
      "4 Dynamic DAG Unlock Gates (useDataExchangeToolbarViewModel), Unified ⋯ Menus, Showing 0-0 of 0 results & 7-Language SCRIPE-Docs-Portal Parity",
    ],
    keySources: [
      "SCRIPE-Backend/src/Host/API/Controllers/DataTransfer/DataTransferController.cs",
      "SCRIPE-Backend/src/Core/Core.Application/DataExchange/SpreadsheetValueNormalizer.cs",
      "SCRIPE-Backend/src/Modules/DataTransfer/DataTransfer.Infrastructure/Services/DataExchangeOrchestrator.Execution.cs",
      "SCRIPE-Frontend/src/core/data-exchange/presentation/components/DataExchangeStudioOverlay.tsx",
      "SCRIPE-Frontend/src/core/data-exchange/presentation/components/ColumnNormalizationPopover.tsx",
      "SCRIPE-Docs-Portal/src/data/content/modules/data-transfer/data-transfer-overview.ts",
      "SCRIPE-Docs-Portal/src/data/content/api-reference/data-transfer-api.ts",
    ],
  },
  {
    id: "fullstack-master-explainer",
    pillar: "fullstack",
    mode: "explainer",
    badge: "MASTER SSOT BOARD",
    title: "SCRIPE v6.0 Super Full-Stack Single Source of Truth",
    subtitle:
      "End-to-End Platform Architecture: Next.js 16 MVVM Portal + .NET 10 AstraFlow Modular Monolith + Dual-Mode Persistence + 193-Command CLI",
    description:
      "Flagship multi-panel Explainer Board uniting Frontend, Backend, 5-Layer Security, Dual-Mode Persistence, Outbox Eventing, and CLI Governance with 4 style switchers (Clean/Editorial/Product/Swiss), interactive diagram tour, sequence flow, comparison matrix, and pinned Git citations.",
    htmlUrl: "/archify-hub/fullstack-master-explainer.html",
    specUrl: "/archify-hub/specs/fullstack-master-explainer.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "ffc972a4",
    featured: true,
    highlights: [
      "4 Interactive Style Presets (Clean, Editorial, Product, Swiss) + Dark/Light",
      "Embedded Full-Stack Architecture Canvas + 6-Step Guided Tour",
      "End-to-End 5-Layer MVVM -> 3-TX Backend Sequence Trace",
      "Cross-Stack Symmetry Matrix + Monorepo Tree + Pinned AGENTS.md Code",
    ],
    keySources: [
      "AGENTS.md:65-135",
      "SCRIPE-Backend/src/Host/API/Extensions/MiddlewarePipeline.cs",
      "SCRIPE-Frontend/src/core/services/api.service.ts",
    ],
  },
  {
    id: "sovereign-account-security-architecture-fullstack",
    pillar: "fullstack",
    mode: "explainer",
    badge: "SOVEREIGN SECURITY",
    title: "Sovereign Account Security & Passkey Architecture",
    subtitle:
      "W3C WebAuthn Level 3 Passkeys + Enterprise SSO Federation + CIDR Perimeter Allowlist & 15-Min Sudo Mode",
    description:
      "Comprehensive end-to-end explainer board covering W3C WebAuthn L3 passkey registration/authentication ceremonies, RFC 4648 §5 unpadded Base64Url normalization, FIDO2 AAGUID model resolution, Enterprise SSO dual-mode identity binding, and interactive CIDR perimeter allowlist with nuclear lockdown shield.",
    htmlUrl: "/archify-hub/sovereign-account-security-architecture.html",
    specUrl: "/archify-hub/specs/sovereign-account-security-architecture.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "ea66ecc5",
    featured: true,
    highlights: [
      "W3C WebAuthn Level 3 Passkey ceremonies with asymmetric hardware keypairs",
      "RFC 4648 §5 unpadded Base64Url normalization & FIDO2 AAGUID hardware registry",
      "Enterprise SSO identity federation (OIDC / SAML 2.0) with dual-mode binding",
      "Interactive CIDR perimeter allowlist manager with 15-min biometric sudo mode",
    ],
    keySources: [
      "SCRIPE-Backend/src/Host/API/Controllers/Auth/PasskeyController.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/Fido2WebAuthnService.cs",
      "SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountSecurityView.tsx",
    ],
  },
  {
    id: "crm-kanban-auth-ux-architecture",
    pillar: "fullstack",
    mode: "explainer",
    badge: "CRM v4.0 + REST CONTRACT",
    title: "Sovereign REST Endpoints, Principal Permanence, 4-Tier Workflow Engine & 12-Port Studio",
    subtitle:
      "12 Sovereign Endpoint Groups + /auth/admin/principal + 4-Tier Dynamic Graph + 12-Port source-Locked Studio + 360 Tabs",
    description:
      "Full-stack v4.0 architectural explainer covering the 12-group Sovereign Enterprise Principal Endpoint Architecture, Principal Session Refresh permanence via /api/v1/auth/admin/principal, Strict 4-Tier Dynamic Workflow Graph Evaluation (zero stage-key or linear sortOrder hardcoding), 12-Port source-locked directed React Flow Studio wiring with card-body drop resolution, document.body DragOverlay portals, and <= 300-line CRM 360 progressive disclosure.",
    htmlUrl: "/archify-hub/crm-kanban-auth-ux-architecture.html",
    specUrl: "/archify-hub/specs/crm-kanban-auth-ux-architecture.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "8ff5f73",
    featured: true,
    highlights: [
      "12 Sovereign REST endpoint groups across Backend CQRS (GetCurrentPrincipalQuery, CurrentTenantSubscriptionController, MenusController) & Frontend CI contract guard",
      "Principal Session Refresh permanence (/api/v1/auth/admin/principal, admin:principal: cache, MustChangePasswordMiddleware, _permissionCache.PrimeCache)",
      "Strict 4-Tier Dynamic Workflow Graph Evaluation across UniversalWorkflowEngine, MoveOpportunityStageCommandHandler, and crmWorkflowEngine (zero stage-key hijacks)",
      "12-Port source-locked React Flow Studio wiring (CrmStageFlowHandles type=\"source\", connectOriginRef, onConnectEnd card-body drop, lossless crmWorkflowStudioMappers)",
      "Jira-grade @dnd-kit DragOverlay portaled to document.body (0px cursor offset) + 3-state kanban-drop-slot feedback + <= 300-line 360 Tabs",
    ],
    keySources: [
      "SCRIPE-Frontend/src/core/config/api-endpoints/__tests__/endpoint-casing-contract.test.ts",
      "SCRIPE-Frontend/src/core/hooks/use-auth-refresh.ts",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Application/Queries/Admin/GetCurrentPrincipalQueryHandler.cs",
      "SCRIPE-Backend/src/Host/API/Middleware/MustChangePasswordMiddleware.cs",
      "SCRIPE-Backend/src/Modules/CRM/CRM.Application/Services/UniversalWorkflowEngine.EvaluateSingle.cs",
      "SCRIPE-Backend/src/Modules/CRM/CRM.Application/Commands/Opportunities/MoveOpportunityStageCommandHandler.GateValidation.cs",
      "SCRIPE-Frontend/src/modules/crm/overview/src/domain/constants/crmWorkflowEngine.ts",
      "SCRIPE-Frontend/src/modules/crm/opportunities/src/presentation/components/workflow/CrmStageFlowHandles.tsx",
      "SCRIPE-Frontend/src/modules/crm/opportunities/src/presentation/components/workflow/crmWorkflowConnectHelpers.ts",
      "SCRIPE-Frontend/src/modules/crm/opportunities/src/presentation/components/workflow/useCrmWorkflowCanvasGraph.ts",
      "SCRIPE-Frontend/src/modules/crm/opportunities/src/presentation/components/workflow/crmWorkflowEdgeBuilder.ts",
      "SCRIPE-Frontend/src/modules/crm/opportunities/src/presentation/components/workflow/crmWorkflowStudioMappers.ts",
      "SCRIPE-Frontend/src/core/crud/kanban/GenericWorkflowKanban.tsx",
      "SCRIPE-Frontend/src/modules/crm/opportunities/src/presentation/views/OpportunityDetailView.tsx",
    ],
  },
  {
    id: "crm-workflow-studio-and-kanban-architecture-fullstack",
    pillar: "fullstack",
    mode: "explainer",
    badge: "CRM v3.0 SUITE",
    title: "SCRIPE CRM v3.0 Suite: 13-Route Architecture & Workflow Studio",
    subtitle:
      "Managed @xyflow/react Canvas + 13-Route GenericCrudView + Jira Transition Screen + AstraFlow 2.3.0 Engine",
    description:
      "Comprehensive end-to-end explainer board and interactive diagrams covering the complete SCRIPE CRM v3.0 production suite: all 13 CRM routes on unified GenericCrudView, 2D Workflow Studio v3.0 with 12 magnetic ports and highway routing, dynamic Deal 360 and Lead 360 state progression, and backend AstraFlow 2.3.0 CQRS and UniversalWorkflowEngine precedence.",
    htmlUrl: "/archify-hub/crm-workflow-studio-and-kanban-architecture.html",
    specUrl: "/archify-hub/specs/crm-workflow-studio-and-kanban-architecture.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "ffc972a4",
    featured: true,
    highlights: [
      "All 13 CRM routes unified on GenericCrudView (Leads, Deals, Accounts, Contacts, Activities)",
      "2D Workflow Studio v3.0 with 12 perimeter ports, connected START node & Jira * ALL satellite stubs",
      "Cycle-safe Dagre & ELK auto-layout with terminal Won/Lost alignment and zero-collision highway routing",
      "Dynamic react-hook-form + zod Transition Screen with Deal 360 & Lead 360 parity",
      "Total Backend AstraFlow 2.3.0 lock with [AstraGenerateMapping] and UniversalWorkflowEngine precedence",
    ],
    keySources: [
      "SCRIPE-Frontend/src/modules/crm/opportunities/src/presentation/components/workflow/CrmWorkflowCanvas2D.tsx",
      "SCRIPE-Frontend/src/modules/crm/opportunities/src/presentation/components/workflow/CrmStageFlowNode.tsx",
      "SCRIPE-Frontend/src/core/crud/kanban/GenericWorkflowKanban.tsx",
      "SCRIPE-Frontend/src/modules/crm/overview/src/presentation/components/CrmWorkflowTransitionDialog.tsx",
      "SCRIPE-Frontend/src/modules/crm/opportunities/src/presentation/viewmodels/useOpportunitiesCrudConfig.tsx",
      "SCRIPE-Backend/src/Modules/CRM/CRM.Application/Services/UniversalWorkflowEngine.cs",
      "SCRIPE-Backend/src/Modules/CRM/CRM.Application/Commands/Opportunities/MoveOpportunityStageCommandHandler.cs",
    ],
  },
  {
    id: "fullstack-architecture",
    pillar: "fullstack",
    mode: "architecture",
    badge: "5 GUIDED VIEWS",
    title: "SCRIPE v6.0 Full-Stack System Architecture",
    subtitle:
      "Interactive Full-Stack Topology: Next.js 16 MVVM Portal -> 29-Stage Security Ingress -> AstraFlow 2.3.0 CQRS -> 18 Domain Modules -> Dual-Mode DB & SignalR",
    description:
      "Native Archify Architecture canvas with 5 Guided Views, Live/Still comet animations, Route Probe, Semantic Lens, and pinned monorepo source citations.",
    htmlUrl: "/archify-hub/fullstack-architecture.html",
    specUrl: "/archify-hub/specs/fullstack-architecture.architecture.json",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "ffc972a4",
    featured: true,
    viewsCount: 5,
    highlights: [
      "5 Guided Views: Full OS, Write Path, Outbox Loop, Security, CLI Gate",
      "Interactive Route Probe & Semantic Lens inspection",
      "Live comet signal animation + PNG/SVG/WebM export",
    ],
    keySources: [
      "AGENTS.md:32-135",
      ".agents/rules/astraflow-ecosystem-and-evolution.md",
      ".agents/rules/uat-readiness-and-seeding.md",
    ],
  },
  {
    id: "fullstack-e2e-sequence",
    pillar: "fullstack",
    mode: "sequence",
    badge: "7 PARTICIPANTS",
    title: "Full-Stack End-to-End Mutation, 401 Refresh & SignalR Sequence",
    subtitle:
      "BookingView -> ViewModel/Repo -> ApiService (401 Mutex) -> 29-Stage Security -> AstraFlow 3-TX -> BaseDbContext -> SignalR Push",
    description:
      "Native Archify Sequence diagram capturing every synchronous and asynchronous hop of a full-stack SCRIPE transaction, including single-flight 401 token refresh recovery and Outbox broadcast.",
    htmlUrl: "/archify-hub/fullstack-e2e-sequence.html",
    specUrl: "/archify-hub/specs/fullstack-e2e-sequence.sequence.json",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "ffc972a4",
    highlights: [
      "3 Segmented Phases: Client MVVM, 3-TX Backend Commit, SignalR Sync",
      "Activation bars & security-highlighted interactions",
      "Trace animation showing forward calls, returns, and async events",
    ],
    keySources: [
      "SCRIPE-Frontend/src/core/services/api.service.ts",
      "SCRIPE-Backend/src/Core/Core.Application/Behaviors/IdempotencyBehavior.cs",
      "SCRIPE-Backend/src/Core/Core.Infrastructure/Messaging/OutboxProcessor.cs",
    ],
  },
  {
    id: "fullstack-dataflow",
    pillar: "fullstack",
    mode: "dataflow",
    badge: "5 STAGES",
    title: "Full-Stack Data Lineage, AES-GCM Encryption & Projection Pipeline",
    subtitle:
      "Client MVVM Sources -> 29-Stage Ingress -> AstraFlow CQRS & FLS -> Dual-Mode Schemas -> ProjectTo & SignalR",
    description:
      "Native Archify Dataflow diagram tracing how payloads move from React 19 forms and the Flutter Coach App through security scrubbing, AES-GCM field encryption, isolated schemas, and compile-time projections.",
    htmlUrl: "/archify-hub/fullstack-dataflow.html",
    specUrl: "/archify-hub/specs/fullstack-dataflow.dataflow.json",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "ffc972a4",
    highlights: [
      "5-Stage Lineage: Client -> Ingress -> CQRS/FLS -> Dual-Mode DB -> Projections",
      "Highlights AES-GCM PII encryption & AstraFlow.Security redaction paths",
      "Separates hot write paths from AsNoTracking() read projections",
    ],
    keySources: [
      "AGENTS.md:136-155",
      ".agents/rules/security-and-infrastructure.md",
      ".agents/rules/astraflow-ecosystem-and-evolution.md",
    ],
  },
  {
    id: "fullstack-waterfall",
    pillar: "fullstack",
    mode: "waterfall",
    badge: "OTEL P95 TRACE",
    title: "End-to-End Full-Stack Request Latency Waterfall (115ms)",
    subtitle:
      "OpenTelemetry Distributed Span Breakdown across Next.js 16, 29-Stage Security, AstraFlow 3-TX, PostgreSQL & Outbox Worker",
    description:
      "Native Archify Waterfall diagram profiling the millisecond execution spans of a full-stack SCRIPE write transaction (88ms synchronous HTTP 200 + background Outbox/SignalR push).",
    htmlUrl: "/archify-hub/fullstack-waterfall.html",
    specUrl: "/archify-hub/specs/fullstack-waterfall.waterfall.json",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "ffc972a4",
    highlights: [
      "9 Hierarchical OpenTelemetry spans measured in milliseconds",
      "Separates synchronous HTTP SLA (88ms) from async Outbox push (115ms)",
      "Inspects TX-1, TX-2, and TX-3 persistence timings",
    ],
    keySources: [
      "SCRIPE-Backend/src/Host/API/Extensions/CoreServiceRegistration.cs",
      "SCRIPE-Backend/src/Core/Core.Application/Behaviors/IdempotencyBehavior.cs",
    ],
  },
  {
    id: "fullstack-devops-workflow",
    pillar: "fullstack",
    mode: "workflow",
    badge: "193 CLI COMMANDS",
    title: "SCRIPE CLI Toolchain, Multi-DB Migration & 11-Point UAT Workflow",
    subtitle:
      "Swimlane Pipeline: scripe new-* -> scripe arch-check & validate-locales -> scripe check -> scripe db seed -> Live Browser UAT",
    description:
      "Native Archify Workflow v2 diagram illustrating the mandatory CLI-First engineering pipeline, Undo Journal recovery, and 11-Point UAT Definition of Done.",
    htmlUrl: "/archify-hub/fullstack-devops-workflow.html",
    specUrl: "/archify-hub/specs/fullstack-devops-workflow.workflow.json",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "ffc972a4",
    highlights: [
      "4 Swimlanes: Scaffolding, 5-Stage Gate, Undo Recovery, Seeding & UAT",
      "Models fail-closed boundary/locale checks and scripe undo rollback",
      "Links directly to AGENTS.md and UAT Readiness Protocol",
    ],
    keySources: [
      "AGENTS.md:32-64",
      ".agents/rules/cli-tools.md",
      ".agents/rules/uat-readiness-and-seeding.md",
    ],
  },
  {
    id: "fullstack-timeline",
    pillar: "fullstack",
    mode: "timeline",
    badge: "ROADMAP & HISTORY",
    title: "SCRIPE v6.0 Platform Architecture & Governance Timeline",
    subtitle:
      "Chronological Milestones across SCRIPE-Backend, SCRIPE-Frontend, Dual-Mode Persistence, scripe-cli & Archify Docs Portal SSOT",
    description:
      "Native Archify Timeline diagram tracking the major architectural evolutions across the SCRIPE monorepo.",
    htmlUrl: "/archify-hub/fullstack-timeline.html",
    specUrl: "/archify-hub/specs/fullstack-timeline.timeline.json",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "ffc972a4",
    highlights: [
      "3 Parallel Tracks: Backend (.NET 10), Frontend (Next.js 16), CLI & Docs SSOT",
      "Tracks Clean Architecture, 5-Layer MVVM, Dual-Mode DB, and AstraFlow 2.3.0 Lock",
    ],
    keySources: [
      "AGENTS.md:1-190",
      ".agents/rules/archify-docs-portal-ssot.md",
    ],
  },

  // ============================================================================
  // PILLAR 2: BACKEND DEEP DIVE (.NET 10 & ASTRAFLOW 2.4.7) — 14 PAGES
  // ============================================================================
  {
    id: "backend-seeding-architecture-review",
    pillar: "backend",
    mode: "explainer",
    badge: "SEEDING AUDIT · 19 MODULES · PROD VS DEV",
    title: "SCRIPE-Backend Seeding Architecture Review: Production Baseline vs. Opt-In Dev Seeders & 8 Audit Gaps",
    subtitle:
      "DatabaseSeeder + 18 IModuleSeeder (Smart Sync, Self-Healing + SEC-10, DDL Guardians, Seed-Once) vs. 19 IModuleDevDataSeeder DAG (Order 10..170) & SeedingScope",
    description:
      "Comprehensive audit of SCRIPE's two-tier database seeding architecture across all 19 backend modules and scripe-cli: Production baseline seeding (DatabaseSeeder, IModulePermissionProvider, IModuleMenuProvider, IModuleFeatureProvider, RoleAndAdminSeeder SEC-10 fail-closed guard, Oracle/PG/SQLServer Guardian triggers, and 12 migration-only seeders) vs. opt-in development UAT seeding (DevDataSeederRunner Order 10..170 and DevSeedConstants deterministic UUID v4 catalog), plus 8 architectural risks and CLI gaps including missing Production guards on --seed-dev, double execution of 3 hosted seeders, swallowed exceptions in RunModuleSeedersAsync, and unwired CLI flags (--seed-reset, prod -m).",
    htmlUrl: "/archify-hub/backend-seeding-architecture-review.html",
    specUrl: "/archify-hub/specs/backend-seeding-architecture-review.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "e772fd54bb8d0b3361190a33f0137487310c8791",
    featured: true,
    highlights: [
      "Two-tier DI contract separation across 19 modules: Tier 1 Production Baseline (DatabaseSeeder + 18 IModuleSeeder) vs. Tier 2 Opt-In Dev UAT (DevDataSeederRunner + 19 IModuleDevDataSeeder)",
      "4 Production strategies: Smart-Sync providers, Self-Healing + SEC-10 fail-closed admin provisioning, 4-DB DDL Guardian triggers, and Seed-Once lookup catalogs",
      "SeedingScope (AsyncLocal<bool>) suppresses OutboxMessage emission and AuditableEntityInterceptor audit floods across both startup and dev seeding",
      "Identifies 8 concrete gaps: missing IsProduction() guard on --seed-dev, double execution of Entitlements/Compliance/Communication hosted seeders, swallowed production exceptions, and unwired --seed-reset / prod -m CLI flags",
    ],
    keySources: [
      "src/Modules/Identity/Identity.Infrastructure/Persistence/DatabaseSeeder.cs",
      "src/Modules/Identity/Identity.Infrastructure/Persistence/DatabaseSeeder.Orchestration.cs",
      "src/Core/Core.Infrastructure/Architecture/DevDataSeederRunner.cs",
      "src/Core/Core.Infrastructure/Architecture/DevSeedConstants.cs",
      "src/Core/Core.Infrastructure/Persistence/SeedingScope.cs",
      "src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/RoleAndAdminSeeder.AdminAndDomains.cs",
      "SCRIPE-Dev-Tools/scripe-cli/src/commands/db-lifecycle.ts",
    ],
  },
  {
    id: "backend-security-remediation-v2-sequence",
    pillar: "backend",
    mode: "sequence",
    badge: "36/36 AUDIT · SUDO, RBAC & MEDIA",
    title: "SCRIPE-Backend Security Remediation V2: Sudo Binding, Critical RBAC & Federated Isolation",
    subtitle:
      "Auth-First Rate Limiting + sid/jti scripe_sudo_token -> Critical ScopeGrant (#23) / TransferProtection (#27) / Break-Glass (#11) -> Media Shield & Atomic Logout Clear",
    description:
      "Native Archify Sequence diagram tracing the 3 hardened backend security lifecycles verified in Security Audit run-2 (36/36 mitigated across 1,926 backend tests): Auth-First rate limiting and 5-part HMAC + session-bound scripe_sudo_token anti-downgrade verification, Critical RBAC ceilings (#23 ScopeGrant, #27 TransferProtection) with live Break-Glass custody (#11) and OIDC/SAML role isolation (#01/#02/#22), and Media/SVG SMIL+magic-byte+quota defense (#06/#31-33) plus atomic Refresh/OidcSession/Sudo cookie clearing (#16).",
    htmlUrl: "/archify-hub/backend-security-remediation-v2-sequence.html",
    specUrl: "/archify-hub/specs/backend-security-remediation-v2-sequence.sequence.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "e772fd54bb8d0b3361190a33f0137487310c8791",
    featured: true,
    highlights: [
      "Traces Auth-First MiddlewarePipeline ordering, 5-part HMAC + replay nonce, and session-bound scripe_sudo_token sid/jti verification without header-to-cookie downgrade",
      "Models Critical #23 ScopeGrant & #27 TransferProtection guards, #11 live Break-Glass custody intersection, and #01/#02 OIDC/SAML role + 2FA isolation",
      "Traces Media/SVG SMIL stripping, sandbox CSP, staging quota accounting (#06/#31-33), and atomic clearing of scr_refresh_token, scr.oidc.session & scripe_sudo_token",
    ],
    keySources: [
      "src/Host/API/Extensions/MiddlewarePipeline.cs",
      "src/Host/API/Middleware/CookieAuthMiddleware.cs",
      "src/Modules/Identity/Identity.Infrastructure/Services/SudoService.Validation.cs",
      "src/Modules/Identity/Identity.Infrastructure/Persistence/Repositories/AdminRepository.RoleGraph.Delegations.BreakGlass.cs",
      "src/Core/Core.Infrastructure/Services/FileService.cs",
    ],
  },
  {
    id: "astraflow-247-full-migration",
    pillar: "backend",
    mode: "explainer",
    badge: "CURRENT · ASTRAFLOW 2.4.7 · .NET 10",
    title: "SCRIPE AstraFlow 2.4.7 Full-Family Migration",
    subtitle:
      "All 16 packages: generated mapping, CQRS, projection, validation, diagnostics, security, telemetry, assertions & CLI",
    description:
      "Current SCRIPE backend audit documenting all 16 AstraFlow 2.4.7 packages, active capabilities, Identity projection, passing backend build and test suites, complete CRM refusal coverage, and two AstraFlow CLI/convention limitations triaged as non-blocking. The repository-wide quick gate still reports unrelated CSharpier drift and a docs Turbopack build failure.",
    htmlUrl: "/archify-hub/astraflow-247-full-migration.html",
    specUrl: "/archify-hub/specs/astraflow-247-full-migration.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "e772fd54bb8d0b3361190a33f0137487310c8791",
    featured: true,
    highlights: [
      "All 16 AstraFlow packages centrally pinned to 2.4.7; the backend stays on .NET 10",
      "AstraFlow mediator and generated mappings used across 20+ application projects",
      "Provider-translatable projections validated for SQL Server, Oracle, and PostgreSQL",
      "Diagnostics, redaction, FluentValidation, OpenTelemetry, assertions, testing, and CLI integrated",
      "All 26 CRM authorization refusals have real test coverage; the backend build and all 25 test suites pass",
      "AwesomeAssertions removed from backend references; a 2.4.7 bundled-doc version typo reported upstream",
    ],
    keySources: [],
  },
  {
    id: "scripe-data-exchange-architecture",
    pillar: "backend",
    mode: "architecture",
    badge: "5 GUIDED VIEWS",
    title: "SCRIPE-Backend Data Exchange: 16 PBAC Endpoints, 17-Rule MENA Normalizer, 5-Sheet DAG & Worker Architecture",
    subtitle:
      "16 PBAC Endpoints (+DefaultPreset) -> OWASP + 17-Rule O(n) Normalizer -> 5-Sheet CRM DAG -> IgnoreQueryFilters Worker -> Order 155 Seeder",
    description:
      "Native Archify Architecture diagram with 5 Guided Views modeling the zero-coupling .NET 10 DataTransfer module (IEntityDataExchangeProvider in Core, DataExchangeJobCompletedEvent Outbox in datatransfer.outbox_messages), 16 [Authorize] + [PermissionRequired] REST endpoints across 7 roles without [AdminOnly] (returning DataTransfer.UnknownEntity 404 on unknown keys), 9-stage / 17-rule O(n) SpreadsheetValueNormalizer (Tashkeel/Tatweel, Alef/ى/ک, currency, E.164, UTC), 5-sheet CRM topological DAG migration with dynamic RelatedMultiSheetEntityKeys, sessionResolvedKeys, ExternalLegacyKeyMap, pass-2 self-FK, and cascade deferral, plus TryReserveSlotsAsync / ReconcileReservationLeaseAsync leases, DetachPendingOutboxMessages() cancel safety, and safe recovery without post-completion global rollback.",
    htmlUrl: "/archify-hub/scripe-data-exchange-architecture.html",
    specUrl: "/archify-hub/specs/scripe-data-exchange-architecture.architecture.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "50133ec3a",
    featured: true,
    viewsCount: 5,
    highlights: [
      "Zero-Coupling Core Plugin (IEntityDataExchangeProvider) + DataExchangeJobCompletedEvent Outbox & 16 [Authorize] 7-Role Endpoints (No [AdminOnly])",
      "5 Guided Views: OWASP (25/100 MB) & 9-Stage Normalizer, 5-Sheet CRM DAG, Worker Context & Outbox/Cancel, Quota/FLS & 10 Providers, Portal/CRUD/Sileo",
      "TopologicalSortSheets (ParentEntityKeys) with sessionResolvedKeys, ExternalLegacyKeyMap, pass-2 self-FK & PARENT_ROW_FAILED deferral",
      "9-Stage O(n) SpreadsheetValueNormalizer (17 rules incl. DateFormat, SourceTimeZoneId, Alef/ى/ک folding, accounting decimals, E.164 phone)",
    ],
    keySources: [
      "src/Core/Core.Application/DataExchange/SpreadsheetValueNormalizer.cs",
      "src/Modules/DataTransfer/DataTransfer.Infrastructure/Services/DataExchangeOrchestrator.Execution.cs",
      "src/Modules/CRM/CRM.Infrastructure/DataExchange/CrmEntityLookupProvider.cs",
      "src/Modules/DataTransfer/DataTransfer.Infrastructure/BackgroundJobs/DataTransferImmediateWorker.cs",
      "src/Host/API/Controllers/DataTransfer/DataTransferController.cs",
    ],
  },
  {
    id: "astraflow-242-assertion-gap",
    pillar: "backend",
    mode: "explainer",
    badge: "HISTORICAL SNAPSHOT · ASTRAFLOW 2.4.2",
    title: "Historical AstraFlow 2.4.2 Assertions Diagnosis",
    subtitle:
      "This earlier assertion-gap snapshot was superseded by the AstraFlow 2.4.7 migration",
    description:
      "Historical .NET 10 migration diagnosis for AstraFlow 2.4.2. Its missing assertion overloads and compile failures describe that old package snapshot and are not the current 2.4.7 migration status.",
    htmlUrl: "/archify-hub/astraflow-242-assertion-gap.html",
    specUrl: "/archify-hub/specs/astraflow-242-assertion-gap.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "980cd2217882f9080ae0a1ce65a9c87e1e576719",
    highlights: [
      "AstraFlow.Assertions 2.4.2 adds formatted BeTrue and BeFalse reason overloads",
      "The old snapshot recorded compiler errors, including missing reason overloads and Be(bool)",
      "Superseded by the current AstraFlow 2.4.7 full-family migration",
    ],
    keySources: [],
  },
  {
    id: "backend-master-explainer",
    pillar: "backend",
    mode: "explainer",
    badge: "HISTORICAL SNAPSHOT · ASTRAFLOW 2.3.0",
    title: "SCRIPE-Backend Master Deep Dive: .NET 10 Modular Monolith & AstraFlow 2.3.0",
    subtitle:
      "18 Isolated 3-Project Domain Modules, 927+ AstraFlow CQRS Handlers, 3-Transaction Idempotency & Transactional Outbox",
    description:
      "Comprehensive interactive Explainer Board for SCRIPE-Backend covering Clean Architecture invariants, AstraFlow 2.3.0 pipeline behaviors, Mode 1 vs Mode 2 deployment, and real C# code excerpts.",
    htmlUrl: "/archify-hub/backend-master-explainer.html",
    specUrl: "/archify-hub/specs/backend-master-explainer.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "f941b150",
    featured: true,
    highlights: [
      "Interactive Backend Architecture Canvas + 6-Step Execution Tour",
      "3-Transaction Idempotency & Transactional Outbox Sequence",
      "18-Module Containment Tree + Mode 1 vs Mode 2 Comparison Table",
      "Pinned C# Code from DependencyInjection.cs & BaseDbContext.cs",
    ],
    keySources: [
      "src/Core/Core.Application/DependencyInjection.cs",
      "src/Core/Core.Infrastructure/Persistence/BaseDbContext.cs",
      "src/Modules/CatalogPricing/CatalogPricing.Application/Mappings/PriceQuoteMaps.cs",
    ],
  },
  {
    id: "backend-security-persistence-explainer",
    pillar: "backend",
    mode: "explainer",
    badge: "SECURITY & DATA BOARD",
    title: "SCRIPE-Backend Deep Dive: 5-Layer Security, 29-Stage Gate & Dual-Mode DB",
    subtitle:
      "PBAC Policy Engine, Fail-Closed JWT Revocation, CSRF & Replay Defense, AES-GCM Encryption & Multi-Provider Schema Isolation",
    description:
      "Dedicated interactive Explainer Board for SCRIPE-Backend's 5-layer defense architecture, 29-stage HTTP middleware ordering, expression-tree tenant filters, and PostgreSQL/SQL Server/Oracle persistence.",
    htmlUrl: "/archify-hub/backend-security-persistence-explainer.html",
    specUrl: "/archify-hub/specs/backend-security-persistence-explainer.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "f941b150",
    highlights: [
      "5-Layer Defense Facts & Zero-Trust Ingress Sequence",
      "Single-DB (Mode 1) vs Multi-DB (Mode 2) Persistence Matrix",
      "Pinned C# Code from MiddlewarePipeline.cs & DatabaseExtensions.cs",
    ],
    keySources: [
      "src/Host/API/Extensions/MiddlewarePipeline.cs",
      "src/Core/Core.Infrastructure/Persistence/DatabaseExtensions.cs",
      "src/Core/Core.Infrastructure/DependencyInjection.cs",
    ],
  },
  {
    id: "sovereign-account-security-architecture-backend",
    pillar: "backend",
    mode: "explainer",
    badge: "WEBAUTHN L3 & SSO",
    title: "Sovereign Account Security & Identity Federation Deep Dive",
    subtitle:
      "PasskeyController + Fido2WebAuthnService + Challenge Caching + Admin External Logins Binding",
    description:
      "Technical deep dive into backend cryptographic ceremonies: CBOR attestation parsing, COSE public key extraction, clone counter detection, RFC 4648 §5 challenge normalization, and tenant-isolated ExternalLogin persistence.",
    htmlUrl: "/archify-hub/sovereign-account-security-architecture.html",
    specUrl: "/archify-hub/specs/sovereign-account-security-architecture.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "5f9290bc",
    featured: true,
    highlights: [
      "Fido2WebAuthnService zero-dependency CBOR/COSE crypto verification",
      "Triple-variation challenge cache lookup preventing padding mismatches",
      "Monotonic signature counter validation for authenticator cloning defense",
      "Dual-mode identity binding via /api/v1/auth/admin/external-logins",
    ],
    keySources: [
      "SCRIPE-Backend/src/Host/API/Controllers/Auth/PasskeyController.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/Fido2WebAuthnService.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Application/Services/WebAuthnChallengeHelper.cs",
    ],
  },
  {
    id: "backend-architecture",
    pillar: "backend",
    mode: "architecture",
    badge: "4 GUIDED VIEWS",
    title: "SCRIPE-Backend .NET 10 Modular Monolith Architecture",
    subtitle:
      "Interactive C4 Container & Component Map: 29-Stage Security Pipeline, AstraFlow 2.3.0 Mediator, 18 Modules, BaseDbContext & OutboxProcessor",
    description:
      "Native Archify Architecture diagram for SCRIPE-Backend with 4 Guided Views (Security Ingress, AstraFlow CQRS, Dual-Mode DB & Outbox, Cross-Module Contracts).",
    htmlUrl: "/archify-hub/backend-architecture.html",
    specUrl: "/archify-hub/specs/backend-architecture.architecture.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "f941b150",
    featured: true,
    viewsCount: 4,
    highlights: [
      "4 Guided Views across 13 backend components and 2 security boundaries",
      "Every node pinned to exact C# file paths and line ranges in SCRIPE-Backend",
      "Live comet routing, Route Probe, and Semantic Lens",
    ],
    keySources: [
      "src/Host/API/Extensions/MiddlewarePipeline.cs:48-308",
      "src/Core/Core.Application/DependencyInjection.cs:31-76",
      "src/Core/Core.Infrastructure/Persistence/BaseDbContext.cs:81-225",
    ],
  },
  {
    id: "backend-middleware-workflow",
    pillar: "backend",
    mode: "workflow",
    badge: "29-STAGE GATE",
    title: "29-Stage Zero-Trust HTTP Security & PBAC Ingress Workflow",
    subtitle:
      "Exact Execution Flow of MiddlewarePipeline.cs: Network Hardening -> JWT & Revocation -> CSRF & Replay -> Tenant & PBAC -> AstraFlow",
    description:
      "Native Archify Workflow v2 diagram modeling every security gate and fail-closed RFC 7807 rejection branch in SCRIPE-Backend's MiddlewarePipeline.cs.",
    htmlUrl: "/archify-hub/backend-middleware-workflow.html",
    specUrl: "/archify-hub/specs/backend-middleware-workflow.workflow.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "f941b150",
    highlights: [
      "4 Swimlanes with explicit 401/403/409/429 fail-closed stops",
      "Pinned to MiddlewarePipeline.cs and IAccountRevocationCache",
    ],
    keySources: [
      "src/Host/API/Extensions/MiddlewarePipeline.cs:48-308",
      "src/Core/Core.Infrastructure/DependencyInjection.cs:544-652",
    ],
  },
  {
    id: "backend-cqrs-sequence",
    pillar: "backend",
    mode: "sequence",
    badge: "3-TX IDEMPOTENCY",
    title: "AstraFlow 3-Transaction Idempotency & Cross-Module Outbox Sequence",
    subtitle:
      "PriceQuotesController -> IdempotencyBehavior -> Redis L1 -> CalculatePriceQuoteCommandHandler -> BaseDbContext -> OutboxProcessorJob",
    description:
      "Native Archify Sequence diagram detailing how SCRIPE-Backend guarantees at-most-once command execution via 3 persistence phases and at-least-once event delivery.",
    htmlUrl: "/archify-hub/backend-cqrs-sequence.html",
    specUrl: "/archify-hub/specs/backend-cqrs-sequence.sequence.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "f941b150",
    highlights: [
      "Traces TX-1 InProgress lease, TX-2 Entity+Outbox commit, and TX-3 AES-GCM receipt",
      "Pinned to IdempotencyBehavior.cs, BaseDbContext.cs & OutboxProcessor.cs",
    ],
    keySources: [
      "src/Core/Core.Application/Behaviors/IdempotencyBehavior.cs:88-334",
      "src/Core/Core.Infrastructure/Persistence/BaseDbContext.cs:81-225",
      "src/Core/Core.Infrastructure/Messaging/OutboxProcessor.cs:66-225",
    ],
  },
  {
    id: "backend-erd",
    pillar: "backend",
    mode: "erd",
    badge: "9 TABLES · 3 VIEWS",
    title: "SCRIPE-Backend Multi-Schema Physical Entity-Relationship Model (ERD)",
    subtitle:
      "Physical Schema Model across identity.*, venue.*, catalog_pricing.*, finance.*, crm.* & Per-Schema Outbox/Receipts",
    description:
      "Native Archify ERD diagram with 3 Guided Views showing physical tables, PK/FK/UK keys, logical cross-module UUID references, and per-schema outbox/idempotency tables.",
    htmlUrl: "/archify-hub/backend-erd.html",
    specUrl: "/archify-hub/specs/backend-erd.erd.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "f941b150",
    viewsCount: 3,
    highlights: [
      "3 Guided Views: Identity & Venue, Pricing/Finance/CRM, Outbox & Receipts",
      "Distinguishes solid intra-schema FKs from dashed logical cross-module IDs",
    ],
    keySources: [
      "src/Modules/Venue/Venue.Domain/Entities/Reservation.cs",
      "src/Modules/CatalogPricing/CatalogPricing.Domain/Entities/PriceQuote.cs",
      "src/Core/Core.Infrastructure/Persistence/BaseDbContext.cs",
    ],
  },
  {
    id: "backend-class",
    pillar: "backend",
    mode: "class",
    badge: "DDD & ASTRAFLOW UML",
    title: "SCRIPE-Backend Clean Architecture & AstraFlow Class Hierarchy",
    subtitle:
      "AuditableEntity -> AggregateRoot -> Reservation & PriceQuote, IDomainEvent & BaseDbContext",
    description:
      "Native Archify Class diagram illustrating the core C# abstractions, domain primitives, aggregate roots, and persistence hooks in SCRIPE-Backend.",
    htmlUrl: "/archify-hub/backend-class.html",
    specUrl: "/archify-hub/specs/backend-class.class.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "f941b150",
    highlights: [
      "Models inheritance, aggregation, and dependency links across Core & Modules",
      "Pinned to AuditableEntity.cs, AggregateRoot.cs, Reservation.cs & PriceQuote.cs",
    ],
    keySources: [
      "src/Core/Core.Domain/Common/AuditableEntity.cs",
      "src/Core/Core.Domain/Common/AggregateRoot.cs",
      "src/Modules/Venue/Venue.Domain/Entities/Reservation.cs",
    ],
  },
  {
    id: "backend-lifecycle",
    pillar: "backend",
    mode: "lifecycle",
    badge: "10 STATES · V3",
    title: "Venue Reservation, Commercial Snapshot & Idempotency State Machine",
    subtitle:
      "SlotHold -> QuoteFrozen -> Confirmed -> CheckedIn -> Settled (+ Credit Approval, Payment Retry, Reschedule & Terminal Exits)",
    description:
      "Native Archify Lifecycle v3 state machine diagram modeling the guarded transitions, waiting states, retry loops, and terminal exits of a Venue Reservation.",
    htmlUrl: "/archify-hub/backend-lifecycle.html",
    specUrl: "/archify-hub/specs/backend-lifecycle.lifecycle.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "f941b150",
    highlights: [
      "5-Step main path + waiting/approval states + retry loops + terminal exits",
      "Pinned to BookingHold.cs, PriceQuote.cs, ReservationLifecycle.cs & CustomerInvoice.cs",
    ],
    keySources: [
      "src/Modules/Venue/Venue.Domain/Entities/BookingHold.cs",
      "src/Modules/Venue/Venue.Domain/Entities/ReservationLifecycle.cs",
      "src/Modules/Finance/Finance.Domain/Entities/CustomerInvoice.cs",
    ],
  },

  // ============================================================================
  // PILLAR 3: FRONTEND DEEP DIVE (NEXT.JS 16 + REACT 19 MVVM) — 14 PAGES
  // ============================================================================
  {
    id: "frontend-adaptive-sso-and-cleanup-workflow",
    pillar: "frontend",
    mode: "workflow",
    badge: "ADAPTIVE SSO · RTL & STORE PURGE",
    title: "SCRIPE-Frontend Smart Adaptive SSO, RTL Polish & Store Cleanup Workflow",
    subtitle:
      "6-Tenant Adaptive Hierarchy + Fail-Closed UNKNOWN_999 -> Concise 2-Col & AR RTL Polish -> Real AccountLayout Logout & Zustand/Broadcast Purge",
    description:
      "Native Archify Workflow v2 diagram mapping the V2 frontend authentication and security hardening journey: live DB provider discovery across Platform Root and all 6 tenants (AHLY, CITY, FALCON, APEX, COMMUNITY, ACFC) with fail-closed UNKNOWN_999, Smart Adaptive SSO layout with prefix stripping (0px clipping on 1440px and 375px mobile), localized AR RTL hero prefixes and logical password input, 1-row 4-chip telemetry HUD with <bdi> isolation and <Sun>/<Moon> sync, and remediation of Findings #34, #35, and #36 across AccountLayout, ImpersonationRepository, authBroadcast, useSudoStore, and ownerUserId-scoped usePatOneTimeSecretStore.",
    htmlUrl: "/archify-hub/frontend-adaptive-sso-and-cleanup-workflow.html",
    specUrl: "/archify-hub/specs/frontend-adaptive-sso-and-cleanup-workflow.workflow.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "91232f19b",
    featured: true,
    highlights: [
      "4 Swimlanes: Tenant & IdP Discovery, Adaptive SSO & RTL UI, Fail-Closed & HUD, Sign-Out & Store Isolation",
      "Documents Smart Adaptive SSO across AHLY, CITY, FALCON, APEX, COMMUNITY, ACFC, Platform Root & UNKNOWN_999 with 0px clipping at 1440px & 375px",
      "Covers Findings #34 (AccountLayout real POST /logout), #35 (ImpersonationRepository + authBroadcast Set purge) & #36 (ownerUserId PAT secret + Sudo store reset)",
      "Verified by 6/6 live unmocked Playwright specs (21 PNGs, 0 pageerrors, 0 5xx) and ux-expert-v4 PASS",
    ],
    keySources: [
      "src/modules/shared/auth/signin/src/presentation/components/SsoProviderButtons.tsx",
      "src/modules/shared/auth/signin/src/presentation/components/CredentialsPasswordInput.tsx",
      "src/app/(account)/layout.tsx",
      "src/modules/shared/auth/core/data/repositories/ImpersonationRepository.ts",
      "src/core/common/broadcast-auth.ts",
      "src/core/store/usePatOneTimeSecretStore.ts",
      "src/core/ui/layout/common/theme-switcher.tsx",
    ],
  },
  {
    id: "frontend-vitest-diagnosis-remediation",
    pillar: "frontend",
    mode: "explainer",
    badge: "VITEST TRIAGE & MAIN APP FIXES",
    title: "SCRIPE-Frontend Vitest Suite Diagnosis: Main App vs. Test Issues & Remediation",
    subtitle:
      "5 Failed Suites (7/3301 Tests) · Main App i18n/UI Bugs (Header/KPI/Nav) · OptionSet Slice · RestrictedFields Scan Cache & 30s Load Headroom",
    description:
      "Diagnostic Explainer Board and triage workflow mapping all 5 failing Vitest suites in SCRIPE-Frontend across Main App UI/i18n bugs, brittle text-slice test assertions, redundant monorepo tree-walk scans (14.2s -> 595ms), and 12-worker Windows CPU contention timeouts.",
    htmlUrl: "/archify-hub/frontend-vitest-diagnosis-remediation.html",
    specUrl: "/archify-hub/specs/frontend-vitest-diagnosis-remediation.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "a65306410",
    featured: true,
    highlights: [
      "Exposes & fixes 3 Main App UI bugs in Venue Overview (hardcoded English buttons + dead useAppStore, raw camelCase KPI fallbacks, VenueNav Dashboard mismatch)",
      "Replaces brittle isPlatformContext end-marker slice in optionSet.wiring.test.ts with block extraction preserving React 19 useMemo dependencies",
      "Caches monorepo tree scans in use-restricted-fields.backendContract.test.ts (cutting 3x ~14s walks to 595ms total) and raises Vitest testTimeout to 30000ms",
      "Verified post-edit across scripe test frontend (349.59s), validate-locales (18,677 keys), arch-check (93/100), oxlint (0 errors), and build (202 routes)",
    ],
    keySources: [
      "src/modules/venue/venue-overview/src/presentation/components/VenueOverviewHeader.tsx",
      "src/modules/venue/venue-overview/src/presentation/components/VenueOverviewKpiStrip.tsx",
      "src/modules/venue/shared/src/presentation/components/VenueNav.tsx",
      "src/modules/custom-fields/custom-fields/option-set/optionSet.wiring.test.ts",
      "src/core/hooks/use-restricted-fields.backendContract.test.ts",
      "vitest.config.ts",
    ],
  },
  {
    id: "sileo-toast-hardening-guide",
    pillar: "frontend",
    mode: "explainer",
    badge: "SILEO UI & THEME PARITY",
    title: "SCRIPE Sileo Gooey Toast Architecture: Light/Dark/HC Parity, SVG Motion Isolation & RTL",
    subtitle:
      "var(--nx-surface) Reactive Fill · [data-sileo-*] 0ms Motion Gate · Single-Mirror RTL · OKLCH Pill Action Buttons",
    description:
      "Interactive Explainer Board and Native Architecture/Sequence Diagrams documenting SCRIPE's full review and hardening of sileo-toast across Light/Dark/High-Contrast themes, Framer Motion SVG rect isolation under data-animation='moderate', pill width sizing, tailwind-merge style composition, and RTL timer-safe lifecycle transitions.",
    htmlUrl: "/archify-hub/sileo-toast-hardening-guide.html",
    specUrl: "/archify-hub/specs/sileo-toast-hardening-guide.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "2915891e5",
    featured: true,
    highlights: [
      "Eliminates OS-dark/app-light inversion & SSR race via var(--nx-surface) fill, .dark/.light class priority, and Contrast Lock presets",
      "Isolates Framer Motion SVG rects from global data-animation='moderate' transitions so Retry/Action buttons stay 15.75px inside cards",
      "Removes max-width: 100% pill clamp (223px-246px full titles) and aligns OKLCH semantic button borders via color-mix()",
      "Single-pass RTL position normalization, activeToastTimers cleanup, and twMerge override composition verified in Playwright & Vitest",
    ],
    keySources: [
      "src/core/ui/sileo-toast/sileo-config.ts",
      "src/core/ui/sileo-toast/sileo-toast.ts",
      "src/core/ui/sileo-toast/sileo-toaster.tsx",
      "src/app/globals.css",
      "src/app/(auth)/sileo-playground/page.tsx",
    ],
  },
  {
    id: "scripe-data-exchange-workflow",
    pillar: "frontend",
    mode: "workflow",
    badge: "PORTAL z-900, 17 RULES & ⋯ CRUD",
    title: "SCRIPE-Frontend Portal Studio (z-900), 17-Rule Smart Popover, Unified ⋯ CRUD & Sileo Workflow",
    subtitle:
      "Unified ⋯ Menus & CardGrid -> Portal Studio (z-900) & Exit Guard -> 17-Rule Popover & 5-Sheet DAG -> Sileo dx-job-{id} Morphing",
    description:
      "Native Archify Workflow v2 diagram with 3 Guided Views illustrating the zero-coupling @core/data-exchange journey: GenericCrudView entityTypeKey auto-mounting DataExchangeToolbarActions (4 DAG unlock gates in useDataExchangeToolbarViewModel; zero @modules/admin/data-transfer imports), read-only Entity Catalog vs /custom-fields cf:* vs Jobs & Presets flows, DataExchangeTenantRequiredCard for Platform Super Admin context switches, full-viewport createPortal Studio (z-[900]) with StudioConfirmExitDialog (z-[960]), 9-stage / 17-rule ColumnNormalizationPopover (z-[950]), and idiomatic sileo-toast dx-job-{id} morphing without destructive global rollback.",
    htmlUrl: "/archify-hub/scripe-data-exchange-workflow.html",
    specUrl: "/archify-hub/specs/scripe-data-exchange-workflow.workflow.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "8ff5f73",
    featured: true,
    highlights: [
      "Zero-Coupling @core/data-exchange (GenericCrudView entityTypeKey, useDataExchangeToolbarViewModel 4 DAG gates) & Read-Only Catalog vs Jobs/Presets",
      "Isolated createPortal(studioEl, document.body) at z-[900] with body scroll lock, DataExchangeTenantRequiredCard & <= 280-line MVVM modules",
      "Scrollable context-smart ColumnNormalizationPopover (z-[950]) exposing all 17 rules across 9 deterministic stages + 1-click Smart Presets",
      "Unified getActions sticky w-16 ⋯ dropdown across Admin/CRM/Party views + shadow-free Nexus CardGrid slabs + Outbox & Sileo dx-job-{id} morphing",
    ],
    keySources: [
      "src/core/data-exchange/presentation/components/DataExchangeStudioOverlay.tsx",
      "src/core/data-exchange/presentation/components/ColumnNormalizationPopover.tsx",
      "src/core/crud/views/CrudCardGridSection.tsx",
      "src/modules/admin/data-transfer/di.ts",
      "src/modules/party-kernel/party-kernel/party/src/presentation/views/PartyDirectoryView.tsx",
    ],
  },
  {
    id: "scripe-data-exchange-lifecycle",
    pillar: "frontend",
    mode: "lifecycle",
    badge: "EXIT GUARD & SILEO LIFECYCLE",
    title: "SCRIPE-Frontend StudioConfirmExitDialog (z-960) & Sileo dx-job-{id} Morphing State Machine",
    subtitle:
      "Portal Upload (z-900) -> Dirty Mapping & ConfirmExitDialog (z-960) -> Lossless Step 3 Back -> Queued/Running/Completed Sileo Morphing",
    description:
      "Native Archify Lifecycle v3 state machine with 3 Guided Views modeling the Data Exchange Studio unsaved-progress guard (StudioConfirmExitDialog at z-[960] intercepting Close, Escape, Step 2 -> Step 1 Back, Replace File, and un-dismissed ephemeral credentials while allowing lossless Step 3 -> Step 2 Back without prompts), DataExchangeTenantRequiredCard (TenantRequired 400/422), 7-role [Authorize] RBAC without [AdminOnly], DataExchangeJobCompletedEvent Outbox emission on completion, ReconcileReservationLeaseAsync + DetachPendingOutboxMessages() on cooperative cancel (no global post-completion rollback), and in-place sileo-toast dx-job-{id} morphing.",
    htmlUrl: "/archify-hub/scripe-data-exchange-lifecycle.html",
    specUrl: "/archify-hub/specs/scripe-data-exchange-lifecycle.lifecycle.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "8ff5f73",
    featured: true,
    viewsCount: 3,
    highlights: [
      "StudioConfirmExitDialog (z-[960]) guards X, Escape, Step 2 Back, Replace File, and Credential Vaults + DataExchangeTenantRequiredCard",
      "Lossless Step 3 (dryRun) -> Step 2 (mapping) back-navigation preserves all mappings & 17 rules without prompting",
      "DataExchangeJobCompletedEvent Outbox on completion + ReconcileReservationLeaseAsync & DetachPendingOutboxMessages() on cancel (no global undo)",
      "Idiomatic sileo-toast { id: 'dx-job-' + job.id } morphing with localized entity display names & 7-role [Authorize] RBAC (no [AdminOnly])",
    ],
    keySources: [
      "src/core/data-exchange/presentation/components/studio/StudioConfirmExitDialog.tsx",
      "src/core/data-exchange/presentation/viewmodels/useDataExchangeStudioViewModel.ts",
      "src/core/data-exchange/presentation/components/DataExchangeFloatingDock.tsx",
      "src/modules/admin/data-transfer/jobs/src/presentation/viewmodels/useJobsViewModel.ts",
    ],
  },
  {
    id: "frontend-master-explainer",
    pillar: "frontend",
    mode: "explainer",
    badge: "FRONTEND MASTER BOARD",
    title: "SCRIPE-Frontend Master Deep Dive: Next.js 16 + React 19 SOLID MVVM",
    subtitle:
      "65+ Isolated Sub-Modules, 5-Layer MVVM Data Flow, Inversify DI, Generic CRUD Engine, TanStack Query + Zustand & Single-Flight 401 Mutex",
    description:
      "Interactive Explainer Board for SCRIPE-Frontend covering sub-module isolation, the 5-layer SOLID MVVM pipeline, ApiService 401 refresh queuing, and actual TypeScript source code.",
    htmlUrl: "/archify-hub/frontend-master-explainer.html",
    specUrl: "/archify-hub/specs/frontend-master-explainer.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "f7d148d6",
    featured: true,
    highlights: [
      "Interactive Frontend MVVM Architecture Canvas + 6-Step Layer Tour",
      "Single-Flight 401 Token Refresh Mutex Sequence Trace",
      "GenericCrudView vs Custom Domain Workspace Comparison Matrix",
      "Pinned TypeScript Code from src/proxy.ts & useCrudViewModel.ts",
    ],
    keySources: [
      "src/proxy.ts:1-90",
      "src/core/crud/viewmodels/useCrudViewModel.ts",
      "src/core/services/api.service.ts",
    ],
  },
  {
    id: "frontend-design-i18n-explainer",
    pillar: "frontend",
    mode: "explainer",
    badge: "NEXUS UI & I18N BOARD",
    title: "SCRIPE-Frontend Deep Dive: Nexus Token System, @core/ui/* & Bilingual i18n",
    subtitle:
      "Surface Hierarchy (--nx-ground, --nx-surface, --nx-raised), Signal Lime Contrast Law, Flat Matte Cards & Zero Inline Ternaries",
    description:
      "Dedicated interactive Explainer Board detailing SCRIPE's Nexus Design System tokens, mandatory @core/ui/* component library, and strict bilingual English/Arabic localization rules.",
    htmlUrl: "/archify-hub/frontend-design-i18n-explainer.html",
    specUrl: "/archify-hub/specs/frontend-design-i18n-explainer.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "f7d148d6",
    highlights: [
      "Nexus 3-Tier Surface & Ink Token Reference + Flat Matte Card Law",
      "Mandatory vs Blocked UI & Localization Pattern Matrix",
      "Pinned TypeScript Code from @core/ui/card.tsx & booking.en.ts",
    ],
    keySources: [
      "src/core/ui/card.tsx",
      "src/core/providers/I18nProvider.tsx",
      "src/modules/venue-operations/booking/locales/booking.en.ts",
    ],
  },
  {
    id: "frontend-architecture",
    pillar: "frontend",
    mode: "architecture",
    badge: "4 GUIDED VIEWS",
    title: "SCRIPE-Frontend Next.js 16 MVVM & Provider Topology",
    subtitle:
      "Interactive Map: Edge Proxy, Provider Stack, 5-Layer MVVM Sub-Modules, Generic CRUD Engine, ApiService & SignalR",
    description:
      "Native Archify Architecture diagram for SCRIPE-Frontend with 4 Guided Views (5-Layer MVVM Pipeline, Edge/PBAC/RTL Providers, Generic CRUD Engine, 401 Mutex & SignalR).",
    htmlUrl: "/archify-hub/frontend-architecture.html",
    specUrl: "/archify-hub/specs/frontend-architecture.architecture.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "f7d148d6",
    featured: true,
    viewsCount: 4,
    highlights: [
      "4 Guided Views across 13 frontend components and 2 boundaries",
      "Every node pinned to exact TypeScript files in SCRIPE-Frontend",
      "Live comet routing, Route Probe, and Semantic Lens",
    ],
    keySources: [
      "src/proxy.ts",
      "src/core/crud/viewmodels/useCrudViewModel.ts",
      "src/core/services/api.service.ts",
    ],
  },
  {
    id: "frontend-mvvm-sequence",
    pillar: "frontend",
    mode: "sequence",
    badge: "5-LAYER MVVM TRACE",
    title: "5-Layer MVVM Mutation, Optimistic Cache & 401 Refresh Mutex Sequence",
    subtitle:
      "BookingWorkspaceView -> useBookingWorkspaceVM -> BookingRepository -> BookingService -> ApiService (401 Mutex) -> Backend API",
    description:
      "Native Archify Sequence diagram tracing the exact runtime execution of a frontend mutation across all 5 MVVM layers and the single-flight 401 refresh queue.",
    htmlUrl: "/archify-hub/frontend-mvvm-sequence.html",
    specUrl: "/archify-hub/specs/frontend-mvvm-sequence.sequence.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "f7d148d6",
    highlights: [
      "Traces View -> VM -> Repo -> Service -> ApiService forward & return hops",
      "Models single-flight 401 refresh lock (isRefreshing) and failedQueue replay",
    ],
    keySources: [
      "src/modules/venue-operations/booking/presentation/views/BookingWorkspaceView.tsx",
      "src/modules/venue-operations/booking/data/repositories/BookingRepository.ts",
      "src/core/services/api.service.ts",
    ],
  },
  {
    id: "frontend-routing-workflow",
    pillar: "frontend",
    mode: "workflow",
    badge: "EDGE + PBAC + RTL",
    title: "Next.js 16 Edge Proxy, PBAC RouteGuard, Feature Gate & RTL Hydration Workflow",
    subtitle:
      "Swimlane Pipeline: src/proxy.ts -> RouteGuard (PAGE_PERMISSIONS + 2FA) -> UserFeatureGate -> I18nProvider -> Sub-Module Mount",
    description:
      "Native Archify Workflow v2 diagram illustrating how SCRIPE-Frontend guards routes at the edge and client, enforces edition entitlements, and hydrates LTR/RTL layouts.",
    htmlUrl: "/archify-hub/frontend-routing-workflow.html",
    specUrl: "/archify-hub/specs/frontend-routing-workflow.workflow.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "f7d148d6",
    highlights: [
      "4 Swimlanes: Edge Proxy, PBAC & Entitlements, Fallbacks, RTL Hydration",
      "Shows /login redirect, 403 fallback, and clean commercial upgrade banners",
    ],
    keySources: [
      "src/proxy.ts",
      "src/core/components/RouteGuard.tsx",
      "src/core/components/UserFeatureGate.tsx",
    ],
  },
  {
    id: "frontend-class",
    pillar: "frontend",
    mode: "class",
    badge: "SOLID MVVM & DI UML",
    title: "SCRIPE-Frontend TypeScript SOLID MVVM & Inversify DI Class Model",
    subtitle:
      "IApiService <- ApiService, ICrudRepository <- BookingRepository, BookingService & useCrudViewModel",
    description:
      "Native Archify Class diagram modeling the TypeScript interfaces, Inversify DI classes, generic CRUD contracts, and domain repositories in SCRIPE-Frontend.",
    htmlUrl: "/archify-hub/frontend-class.html",
    specUrl: "/archify-hub/specs/frontend-class.class.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "f7d148d6",
    highlights: [
      "Shows realization, composition, and DI dependency links across the 5 layers",
      "Pinned to api.interface.ts, api.service.ts, BookingRepository.ts & useCrudViewModel.ts",
    ],
    keySources: [
      "src/core/interfaces/api.interface.ts",
      "src/core/services/api.service.ts",
      "src/core/crud/viewmodels/useCrudViewModel.ts",
    ],
  },
  {
    id: "frontend-lifecycle",
    pillar: "frontend",
    mode: "lifecycle",
    badge: "10 STATES · V3",
    title: "Frontend Booking Workspace, Optimistic Mutation & Session State Machine",
    subtitle:
      "CalendarSynced -> SlotHoldActive -> QuotePreview -> OptimisticCommit -> ConfirmedSynced (+ 401 Mutex, Rollback & Peer Hold)",
    description:
      "Native Archify Lifecycle v3 diagram modeling the client-side state transitions of the Booking Workspace, TanStack Query optimistic cache snapshots, and SignalR sync.",
    htmlUrl: "/archify-hub/frontend-lifecycle.html",
    specUrl: "/archify-hub/specs/frontend-lifecycle.lifecycle.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "f7d148d6",
    highlights: [
      "Models TanStack Query onMutate cache snapshot and onError deterministic rollback",
      "Includes 401 Mutex pause state and SignalR peer slot conflict handling",
    ],
    keySources: [
      "src/modules/venue-operations/booking/presentation/viewmodels/useBookingWorkspaceViewModel.ts",
      "src/core/services/api.service.ts",
    ],
  },
  {
    id: "frontend-tree",
    pillar: "frontend",
    mode: "tree",
    badge: "65+ SUB-MODULES",
    title: "SCRIPE-Frontend Workspace, Sub-Module & @core/ui/* Containment Tree",
    subtitle:
      "Hierarchical Decomposition of src/app, src/core (UI Primitives, CRUD Engine, Providers, Services) & 65+ Isolated Feature Sub-Modules",
    description:
      "Native Archify Tree diagram mapping the directory and architectural containment hierarchy of SCRIPE-Frontend.",
    htmlUrl: "/archify-hub/frontend-tree.html",
    specUrl: "/archify-hub/specs/frontend-tree.tree.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "f7d148d6",
    highlights: [
      "Decomposes src/app, src/core, and src/modules into clean containment branches",
      "Pinned to layout.tsx, proxy.ts, di.ts, card.tsx, and BookingWorkspaceView.tsx",
    ],
    keySources: [
      "src/app/layout.tsx",
      "src/core/di.ts",
      "src/core/ui/card.tsx",
      "src/modules/venue-operations/di.ts",
    ],
  },
  {
    id: "frontend-design-system-transformation",
    pillar: "frontend",
    mode: "explainer",
    badge: "RELAY vNEXT & OVERLAYS",
    title: "SCRIPE Relay vNext Design System, WCAG Contrast & Frame-0 Floating Overlay Architecture",
    subtitle:
      "--scripe-* Token Cascade -> Light/Dark/DEF-03 AA Contrast Calibration -> Radix Popper Wrapper Lock & transition-none Origin Snap",
    description:
      "Validated Archify Explainer Board with embedded native Architecture, Sequence, and xychart-beta diagrams documenting the SCRIPE Relay vNext token evolution, disabled CTA contrast fix (DEF-03), and systemic Frame-0 floating overlay origin-snap fix.",
    htmlUrl: "/archify-hub/frontend-design-system-transformation.html",
    specUrl: "/archify-hub/specs/frontend-design-system-transformation.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "a65306410",
    featured: true,
    highlights: [
      "Documents the --scripe-* -> --nx-* / --sx-* token cascade eliminating #050506 dark black-crush and unifying semantic status hues",
      "Includes before/after WCAG 2.2 AA xychart-beta chart covering DEF-03 Dark disabled CTA (1.09:1 -> 8.20:1) & Light status pills",
      "Traces how [data-radix-popper-content-wrapper] lock, --nx-t-micro CSS vars, and transition-none eliminate viewport overlay slide-in",
      "Pinned to src/app/globals.css lines 306-364 and verified with 25/25 Radix Popper + 4/4 DatePicker 0px drift traces",
    ],
    keySources: [
      "src/app/globals.css",
      "src/core/ui/tooltip.tsx",
      "src/core/ui/dropdown-menu.tsx",
      "src/core/ui/select.tsx",
      "src/core/ui/notification/NotificationBell.tsx",
    ],
  },
];

export interface ArchifyArtifact extends ArchifyArtifactItem {
  modeLabel: string;
  htmlPath: string;
  specPath: string;
  repoLabel: string;
  commitSha: string;
}

export const ARCHIFY_PILLARS: Array<{
  id: ArchifyPillar;
  label: string;
  shortLabel: string;
  badge: string;
  description: string;
  count: number;
}> = (["fullstack", "backend", "frontend"] as ArchifyPillar[]).map((id) => ({
  id,
  label: ARCHIFY_PILLAR_META[id].label,
  shortLabel: ARCHIFY_PILLAR_META[id].shortLabel,
  badge: `${ARCHIFY_PILLAR_META[id].repoName} @ ${ARCHIFY_PILLAR_META[id].commit}`,
  description: ARCHIFY_PILLAR_META[id].tagline,
  count: ARCHIFY_PILLAR_META[id].count,
}));

export const ARCHIFY_MODES: Array<{
  id: ArchifyMode;
  label: string;
  description: string;
}> = (Object.keys(ARCHIFY_MODE_META) as ArchifyMode[]).map((id) => ({
  id,
  label: ARCHIFY_MODE_META[id].label,
  description: `${ARCHIFY_MODE_META[id].shortBadge} (${ARCHIFY_MODE_META[id].category})`,
}));

export const ARCHIFY_ARTIFACTS: ArchifyArtifact[] = ARCHIFY_CATALOG.map(
  (item) => ({
    ...item,
    modeLabel: ARCHIFY_MODE_META[item.mode].shortBadge,
    htmlPath: item.htmlUrl,
    specPath: item.specUrl,
    repoLabel: item.repoName,
    commitSha: item.repoCommit,
  })
);


