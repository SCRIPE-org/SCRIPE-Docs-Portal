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
    commit: "9dfe79d",
    accentColor: "#B7FF00",
    count: 27,
  },
  backend: {
    label: "SCRIPE-Backend Deep Dive (.NET 10 & AstraFlow 2.4.7)",
    shortLabel: "Backend (.NET 10)",
    tagline:
      "18 Isolated 3-Project Domain Modules, 29-Stage Security Gate, 927+ CQRS Handlers, 3-TX Idempotency & Multi-DB Persistence",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    commit: "42629f69a3081a83e7e69e678b1b04b28c12e1f0",
    accentColor: "#38BDF8",
    count: 22,
  },
  frontend: {
    label: "SCRIPE-Frontend Deep Dive (Next.js 16 + React 19 MVVM)",
    shortLabel: "Frontend (Next.js 16)",
    tagline:
      "65+ Isolated Sub-Modules, 5-Layer SOLID MVVM Data Flow, Inversify DI, Sileo UI & Bilingual EN/AR Parity",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    commit: "044ecc1eeac75d0a443c118701292fa1bf749507",
    accentColor: "#A78BFA",
    count: 18,
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
  // PILLAR 1: SUPER FULL-STACK (BOTH BACKEND + FRONTEND + ECOSYSTEM) — 27 PAGES
  // ============================================================================
  {
    id: "scripe-internal-sovereign-tenant-architecture",
    pillar: "fullstack",
    mode: "explainer",
    badge: "INTERNAL TENANT · IDENTITY + ENTITLEMENTS",
    title: "SCRIPE Internal Sovereign Tenant Architecture & Isolation Specification",
    subtitle:
      "TenantKind.Internal + EditionScope.Internal + Separate Bootstrap Admin + Hardened Safeguards + 3-DB Guardians & Security Backlog",
    description:
      "Architecture explainer documenting SCRIPE as a first-class internal tenant (SCRIPE, scripe.admin.scripe.org, EGP) alongside Platform Root via separate company email provisioning (seif@scripe.org), first-create-only complex bootstrap passwords with forced Production/Staging first-login rotation, TenantKind and EditionScope commercial isolation, hardened security/upload limits, 3-DB guardian triggers, CRM HQ routing, FIDO2 subdomain origins, and the prioritized deferred auth security backlog.",
    htmlUrl: "/archify-hub/scripe-internal-sovereign-tenant-architecture.html",
    specUrl: "/archify-hub/specs/scripe-internal-sovereign-tenant-architecture.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "Update/CRM",
    featured: true,
    highlights: [
      "Separates Platform Root (admin-seif@scripe.org) from scripeadmin (seif@scripe.org / SCRIPE_TENANT_ADMIN_EMAIL) and documents deferred shared-email auth vulnerabilities",
      "Introduces TenantKind (Customer/Internal) and EditionScope (Commercial/Internal) preserving Edition.IsSystem and Edition.IsFree across SQL Server, PostgreSQL, and Oracle",
      "Grants 17 active tenant-operational modules and lock-free -1 capacity quotas while blocking platform-only flags, deferred modules, and negative upload/password bypasses",
      "Enforces public signup rejection, KPI/Analytics/Connect exclusion, billing-suspension immunity, purge-job exclusion, 3-DB guardian triggers, and minimal Frontend guards",
    ],
    keySources: [
      "docs/superpowers/specs/2026-11-20-scripe-internal-sovereign-tenant-design.md",
      "docs/superpowers/plans/2026-11-20-scripe-internal-sovereign-tenant.md",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Domain/Entities/Tenant.cs",
      "SCRIPE-Backend/src/Modules/Entitlements/Entitlements.Domain/Entities/Edition.cs",
      "SCRIPE-Backend/src/Modules/Entitlements/Entitlements.Infrastructure/Persistence/Seeding/EditionSeeder.cs",
    ],
  },
  {
    id: "post-login-routing-enterprise-brainstorm",
    pillar: "fullstack",
    mode: "explainer",
    badge: "ADMIN ROUTING · APPROVED DESIGN SPEC",
    title: "Admin Post-Login Routing, /hub Personal Home & WorkManagement Audit: Approved Spec",
    subtitle:
      "6-Tier Deep-Link Precedence · Single-Pass GET /menus/navigation · Role.Priority Non-Regression · Unified NexusLayout · WM-1..WM-4 Fixes",
    description:
      "Approved specification for SCRIPE Admin post-login routing (strictly separated from external User auth), /hub Operational Personal Home, and independent WorkManagement security remediation: prioritizes authorized ?redirect= ahead of IsLandingEnforced without altering global Role.Priority ceilings, locks IsSystem menu slugs while cascading custom renames, ensures zero-loop error recovery, measures SQL queries via SqlCommandCounterInterceptor, fixes WM-1..WM-4 now (Tasks widget Phase 1b), and unifies /hub inside NexusLayout.",
    htmlUrl: "/archify-hub/post-login-routing-enterprise-brainstorm.html",
    specUrl: "/archify-hub/specs/post-login-routing-enterprise-brainstorm.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "Update/CRM",
    featured: true,
    highlights: [
      "Locks 6-tier precedence (Tier 0 gates > Tier 1 authorized ?redirect= > Tier 2 non-Super IsLandingEnforced > context AdminPreference > Role/Super > 1-ws vs /hub) without altering Role.Priority ceilings",
      "Coalesces bootstrap into one GET /menus/navigation pass, adds IsSystem slug lock + custom slug cascade + lazy fallback, and measures SQL counts against pre-refactor baseline",
      "Remediates WorkManagement WorkManagement.Enabled read gates, tenant guards, own PermissionScopes, and Location URI in Phase 1 while deferring the Hub Tasks widget to Phase 1b",
      "Unifies /hub inside NexusLayout (activeWorkspaceKey=null -> rootMenuItems=[]) with Passwordless billing gate parity, impersonation guards, zero-loop recovery, and EN/AR RTL search",
    ],
    keySources: [
      "SCRIPE-Backend/src/Modules/Identity/Identity.Application/Queries/Menu/GetAuthorizedNavigationQueryHandler.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Application/Services/ExternalAdminSessionService.cs",
      "SCRIPE-Backend/src/Modules/Entitlements/Entitlements.Infrastructure/Services/FeatureChecker.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/Repositories/AdminRepository.RoleGraph.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Providers/IdentityMenuProvider.MyAccountGroup.cs",
      "SCRIPE-Backend/src/Host/API/Controllers/WorkManagement/WorkItemsController.cs",
      "SCRIPE-Frontend/src/core/ui/layout/nexus/nexus-layout.tsx",
      "SCRIPE-Frontend/src/core/providers/workspace-provider.tsx",
      "SCRIPE-Frontend/src/modules/shared/home/presentation/views/WorkspaceHubView.tsx",
    ],
  },
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
  {
    id: "identity-auth-recovery-hardening-fullstack",
    pillar: "fullstack",
    mode: "explainer",
    badge: "AUTH HARDENING · DRIFT-01..10 · SHOWCASE",
    title: "End-to-End Authentication, Recovery & Session Governance Hardening",
    subtitle:
      "$s2$ Crypto + ResetGrantToken 204 Recovery -> ISessionIssuerService Caps & +5ms Revocation -> Next.js 16 Proxy & RouteGuard MVVM",
    description:
      "Full-stack Archify Explainer board uniting the finalized Backend security remediation, Frontend Next.js 16 MVVM lockdown, scripe-cli BE-037..039 & Verification.VerifierKey scanners, and 7-language DRIFT-01..10 documentation convergence.",
    htmlUrl: "/archify-hub/identity-auth-recovery-hardening-fullstack.html",
    specUrl: "/archify-hub/specs/identity-auth-recovery-hardening-fullstack.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "1c1631172 / d3978a00e / e838fe5",
    featured: true,
    highlights: [
      "Covers 4 KPIs (30m JWT, 5-fail lockout, 5 PasswordHistory, 8,616 denylist), xychart-beta backlog distribution, and DRIFT-01..10 register",
      "Traces ResetGrantToken no-auto-login recovery (204 No Content), HybridMfaPolicy, and mcp=true -> mfa_enroll=true ordering",
      "Links dedicated child Workflow, Lifecycle, Physical ERD, and Frontend MVVM Architecture boards",
    ],
    keySources: [
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/SessionIssuerService.PolicyHelpers.cs",
      "SCRIPE-Frontend/src/core/providers/route-guard.tsx",
      "SCRIPE-Dev-Tools/scripe-cli/src/commands/arch-check-scanner.ts",
    ],
  },
  {
    id: "central-identity-federation-fullstack",
    pillar: "fullstack",
    mode: "explainer",
    badge: "CENTRAL FEDERATION · ASVS V10.2.2 SSO CSRF · 12-MODE BFF",
    title: "Central Identity Federation, ASVS V10.2.2 SSO Login CSRF, 12-Mode HMAC Relay & Dual-RP WebAuthn",
    subtitle:
      "auth.scripe.org + api.scripe.org -> __Host-scripe_sso_nonce & /oidc/start __Host-scripe_oidc_tx -> 12-Mode Custom-Domain BFF Relay -> Redis DataProtection & 3-DB Parity",
    description:
      "Full-stack Archify Explainer uniting Central Identity Federation across SCRIPE-Backend (ac5955af2), SCRIPE-Frontend (2f962e2a4), and SCRIPE-Dev-Tools (268f169): ASVS V10.2.2 browser-bound SSO Login CSRF (__Host-scripe_sso_nonce, GET /api/v1/auth/oidc/start __Host-scripe_oidc_tx, ExternalAuthTokenHash, ProcessOidcCallbackCommandValidator ac5955af2), server-held PKCE ExternalAuthStateTicket, 120s ExternalAuthHandoffTicket (mandatory Origin + fail-closed ITenantDomainRepository), PostMfaHandoffHelper + ssoTwoFactorBridge.ts hybrid-2FA custom-domain bridging, 12-mode HMAC BFF micro-relay (/api/auth/session/establish with Sudo step-up forwarding & 0 third-party cookies), multi-replica AES-256-GCM Redis dataprotection:keys (8968bee3b), scoped IsExternalSsoFlow (c081fded9), WebAuthn:UserVerification='required', PasskeyAuthLimit=12, 0-error --idempotent PG 18 / SQL 2025 / live Oracle 21c XE parity, and 11/11 Live Chromium E2E.",
    htmlUrl: "/archify-hub/central-identity-federation-fullstack.html",
    specUrl: "/archify-hub/specs/central-identity-federation-fullstack.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "ac5955af2 / 2f962e2a4 / 268f169",
    featured: true,
    highlights: [
      "Covers ASVS V10.2.2 SSO Login CSRF (__Host-scripe_sso_nonce + /oidc/start __Host-scripe_oidc_tx + ExternalAuthTokenHash ead632a6a/9ca1916e9/ac5955af2), 12-mode custom-domain BFF relay (f93fc3533/be2b8783b/a2e951352), and multi-replica AES-256-GCM Redis DataProtection (8968bee3b)",
      "Documents Cloudflare X-Scripe-Origin-Verify -> Railway ForwardedHeaders__ForwardLimit=2 edge topology plus Google, Microsoft Entra (email+xms_edov), GitHub (user:email read:user) & 2-step Enterprise SAML ACS setup",
      "Cross-links Backend Relay Sequence (backend-central-federation-relay-sequence.html), Frontend Central Auth MVVM (frontend-central-auth-sudo-mvvm.html), and Enterprise Security Assurance (enterprise-security-assurance-platform-hardening.html)",
    ],
    keySources: [
      "SCRIPE-Backend/src/Modules/Identity/Identity.Application/Services/PostMfaHandoffHelper.cs",
      "SCRIPE-Backend/src/Host/API/Controllers/Identity/OidcClientController.StartAndBinding.cs",
      "SCRIPE-Frontend/src/core/services/session-relay-sso-binding.ts",
      "SCRIPE-Frontend/e2e/sso-csrf-and-custom-domain-relay.spec.ts",
    ],
  },
  {
    id: "enterprise-security-assurance-platform-hardening",
    pillar: "fullstack",
    mode: "explainer",
    badge: "SECURITY ASSURANCE · JSENTINEL 48/48 · 0 OPEN CODE DEFECTS",
    title: "Enterprise Security Assurance, JSENTINEL 48/48 & 19-Module Platform Hardening",
    subtitle:
      "5-Layer Defense Topology, 26 Net-New Threats & All Category 5 Closures, Nonce CSP, DNS-Pinned SSRF, 4×9 Domain-Identity Matrix & 11/11 Live Chromium E2E",
    description:
      "Authoritative Single Source of Truth for SCRIPE Enterprise Security Assurance & Platform Hardening across all 19 backend modules, Next.js 16 frontend, and CLI/CI supply chain. Reconciles all 48 JSENTINEL findings (13 confirmed live-drift/app-hardened, 31 codebase-proven false positives, 4 managed-edge items), closes all 26 net-new platform threats (3 Critical: Paymob/PayPal constant-time webhook auth 8567de9c3, IDsrSubjectOwnershipVerifier DSR isolation b446a5575, DnsVerificationService _scripe-verify DNS TXT & RFC 1123 ASCII FQDN 9fffee765; 15 High; 8 Medium), closes all Category 5 hardening items (ASVS V10.2.2 SSO Login CSRF ead632a6a/9ca1916e9/ac5955af2/f93fc3533/be2b8783b/a2e951352, multi-replica AES-256-GCM Redis IDataProtectionProvider 8968bee3b, fail-closed IdEncryptionOptions/VerificationSettings/AssignPermissionsToRoleCommand Sudo ba2e85344/efcacddc8, binary export cell/DTO FLS 1d8a856c1 shrinking FileGuard to 2 prefixes, scoped 2FA IsExternalSsoFlow & QrLoginController relay c081fded9), and proves 4×9 domain-identity isolation with 318 baseline + 150 Wave 4 xUnit tests, 65 baseline + 31 Wave 4 Vitest checks, 11/11 live unmocked Chromium E2E journeys (2f962e2a4), 100/100 security arch-check rules (BE-040..042, FE-035..036), and 0 NuGet/pnpm CVEs.",
    htmlUrl: "/archify-hub/enterprise-security-assurance-platform-hardening.html",
    specUrl: "/archify-hub/specs/enterprise-security-assurance-platform-hardening.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "32b9074bc / 2f962e2a4 / 268f169 / d1c5fdb",
    featured: true,
    highlights: [
      "JSENTINEL 48/48 Reconciled: 13 confirmed live-drift/app-hardened findings closed, 31 codebase-proven bundle AST false positives disproved, and 4 managed-edge items bounded",
      "26 Net-New Threats & All Category 5 Closures: 3 Critical (TH-API-01 Paymob/PayPal FixedTimeEquals 8567de9c3, TH-TEN-01 IDsrSubjectOwnershipVerifier b446a5575, TH-TEN-02 _scripe-verify DNS TXT 9fffee765), 15 High, 8 Medium, plus V10.2.2 SSO Login CSRF, Redis DataProtection (8968bee3b), binary export FLS (1d8a856c1), and 16/16 review catches (R-01..R-16) closed",
      "Nonce CSP & Browser Hardening: Per-request 128-bit x-nonce script-src, /studio-preview & /dashboard-preview SAMEORIGIN framing, 6-pass CSS L3 & SVG sanitization (84be82539), strict postMessage origin+source+schema, and sw.js v3 static-only",
      "4-Layer Proof & Cutover Boundary: 318 + 150 xUnit, 65 + 31 Vitest, 11/11 live Chromium E2E (2f962e2a4), 100/100 BE-040..042 & FE-035..036 (0 CVEs); Scoped GO (0 open code defects) and explicit 4-gate external production cutover checklist",
    ],
    keySources: [
      "SCRIPE-Backend/docs/security/enterprise-assurance/SECURITY_GO_NO_GO.md",
      "SCRIPE-Backend/docs/security/enterprise-assurance/INDEPENDENT_SECURITY_REVIEW.md",
      "SCRIPE-Backend/docs/security/enterprise-assurance/PLATFORM_SECURITY_AUDIT.md",
      "SCRIPE-Backend/docs/security/enterprise-assurance/OWASP_SECURITY_REQUIREMENTS_TRACEABILITY.md",
      "SCRIPE-Backend/docs/security/enterprise-assurance/SECURITY_REGRESSION_TEST_MATRIX.md",
      "SCRIPE-Frontend/e2e/sso-csrf-and-custom-domain-relay.spec.ts",
    ],
  },
  {
    id: "authorization-remediation-rbac-fullstack",
    pillar: "fullstack",
    mode: "explainer",
    badge: "AUTHORIZATION REMEDIATION · 490 PERMS · 16 ROLES · 10 GROUPS",
    title: "SCRIPE Authorization, Entitlements & Multi-Role RBAC Remediation",
    subtitle:
      "490 Permissions, 190 Features, 389 Active Tenant Perms, 69 PlatformOnly Fence, 16 Internal Roles, 10 UserGroups & Multi-Role Dotted FLS",
    description:
      "End-to-end Single Source of Truth for SCRIPE's fail-closed authorization and internal tenant RBAC remediation across SCRIPE-Backend (ba10de98f..42629f69a) and SCRIPE-Frontend (def51bf48..044ecc1ee). Reconciles all 490 catalog permissions across 19 modules and 190 features (10 RequiredAnyFeatures, 10 IsGloballyAvailable, 0 broken links), establishes the 389-perm scripe-internal tenant pool (quarantining 69 PlatformOnly permissions and disabling 32 in Marketplace & Plugins), seeds 16 internal roles (Priority 0..900) and 10 UserGroups, enforces live IFeatureChecker PBAC and TenantContextMiddleware cold-cache warming, merges multi-role read-preferred FLS + additive dotted UserGroupRestrictions across API & exports, and decouples Frontend Platform vs Tenant SuperAdmin gates.",
    htmlUrl: "/archify-hub/authorization-remediation-rbac-fullstack.html",
    specUrl: "/archify-hub/specs/authorization-remediation-rbac-fullstack.archify.md",
    repoName: "SCRIPE-org/SCRIPE",
    repoCommit: "42629f69a / 044ecc1ee / 9dfe79d",
    featured: true,
    highlights: [
      "Reconciled 490-perm / 190-feature catalog across 19 modules with 389 scripe-internal active perms, 69 PlatformOnly quarantined, and 32 disabled in Marketplace & Plugins",
      "Fail-closed runtime authorization: TenantContextMiddleware pre-authz cold-cache warming, live HttpFeatureChecker PBAC, 16 transactional feature-sync publishers, and post-commit cache eviction",
      "Multi-role Priority 0 Asc read-preferred FLS intersection unioned with additive UserGroupRestrictions, preserving dotted resource keys (crm.opportunities) across JSON & audit/CSV exports",
      "16 Sovereign Internal Roles (Priority 0..900) + 10 UserGroups with SoD boundaries and Frontend Platform (!user?.tenantId) vs Tenant SuperAdmin split across Next.js 16 MVVM",
    ],
    keySources: [
      "SCRIPE-Backend/src/Core/Core.Application/Authorization/PermissionAuthorizationHandler.cs",
      "SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/AdminSecurityService.cs",
      "SCRIPE-Backend/src/Host/API/Middleware/TenantContextMiddleware.cs",
      "SCRIPE-Frontend/src/core/providers/route-guard.tsx",
      "docs/architecture/authorization-remediation/FEATURE_PERMISSION_CATALOG.md",
      "docs/architecture/authorization-remediation/SCRIPE_Internal_Tenant_RBAC_Matrix.xlsx",
    ],
  },

  // ============================================================================
  // PILLAR 2: BACKEND DEEP DIVE (.NET 10 & ASTRAFLOW 2.4.7) — 22 PAGES
  // ============================================================================
  {
    id: "backend-seeding-architecture-review",
    pillar: "backend",
    mode: "explainer",
    badge: "SEEDING REMEDIATED · 19 MODULES · P0–P2",
    title: "SCRIPE-Backend Two-Tier Seeding Architecture: Fail-Closed P0–P2 Remediation Across 19 Modules",
    subtitle:
      "DatabaseSeeder (sole IHostedService) + 18 IModuleSeeder vs. DevDataSeederRunner + 17 Scoped IModuleDevDataSeeder, SeedingEnvironmentGuard & Paginated Tenant Backfill",
    description:
      "Architecture and remediation reference for SCRIPE's fail-closed two-tier database seeding system across all 19 backend modules and scripe-cli: Production baseline seeding (DatabaseSeeder sole IHostedService, IModuleSeeder contracts, RoleAndAdminSeeder SEC-10 guard, Guardian triggers, and paginated >1,000-tenant backfill) vs. opt-in development UAT seeding (SeedingEnvironmentGuard allowlist, DevDataSeederRunner Order 10..160 with Scoped lifetimes, and repaired CLI seed/reseed/generate-seed workflows).",
    htmlUrl: "/archify-hub/backend-seeding-architecture-review.html",
    specUrl: "/archify-hub/specs/backend-seeding-architecture-review.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "71028fb748e2e98b277a90b10a8e1785293fc897",
    featured: true,
    highlights: [
      "Fail-closed Production safety via SeedingEnvironmentGuard (Development/Local/UAT/Testing allowlist) across Backend & scripe-cli",
      "Single seeding IHostedService (DatabaseSeeder) with strict SeedDatabase:Enabled gating, zero swallowed exceptions, and non-zero CLI exit codes",
      "Clean two-tier contract separation: IModuleSeeder (18 modules, SeedDevAsync removed) vs. 17 active Scoped IModuleDevDataSeeder (Marketplace & Plugins deferred)",
      "Paginated ITenantInfoResolver.GetPagedAsync (200/page + ChangeTracker.Clear) eliminates 1,000-tenant CRM & CustomFields backfill limits",
    ],
    keySources: [
      "src/Core/Core.Infrastructure/Architecture/SeedingEnvironmentGuard.cs",
      "src/Modules/Identity/Identity.Infrastructure/Persistence/DatabaseSeeder.cs",
      "src/Modules/Identity/Identity.Infrastructure/Persistence/DatabaseSeeder.Orchestration.cs",
      "src/Core/Core.Infrastructure/Architecture/DevDataSeederRunner.cs",
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
  {
    id: "backend-auth-session-pipeline",
    pillar: "backend",
    mode: "workflow",
    badge: "33-STAGE PIPELINE · STORY V2",
    title: "SCRIPE-Backend Auth, Middleware & Session Hardening Workflow",
    subtitle:
      "Pre-Auth & BrandingSettings Cookies -> OnTokenValidated (+5ms / jti / imp) & mcp/mfa_enroll Walls -> SessionIssuerService & Sudo",
    description:
      "Native Archify Workflow v2 diagram with attached 3-scene interactive Story pinned to SCRIP-Backend commit 1c1631172, modeling controller parity, dynamic BrandingSettings cookies, fail-closed revocation fences, $s2$ + HMAC OTP validation, and SessionPolicy ceilings.",
    htmlUrl: "/archify-hub/backend-auth-session-pipeline.html",
    specUrl: "/archify-hub/specs/backend-auth-session-pipeline.workflow.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "1c1631172d447d311686211c07b52b84a6245678",
    featured: true,
    highlights: [
      "Pinned to AdminAuthController, UserAuthController, CookieAuthMiddleware, DependencyInjection OnTokenValidated & SudoService",
      "Documents BrandingSettings dynamic cookies, +5ms MarkRevokedAsync cutoff, 8h impersonation ceiling & StopImpersonation revocation checks",
      "Includes 3-scene Story playback walking ingress, security walls, and atomic session revocation",
    ],
    keySources: [
      "src/Host/API/Middleware/CookieAuthMiddleware.cs",
      "src/Core/Core.Infrastructure/DependencyInjection.cs",
      "src/Modules/Identity/Identity.Infrastructure/Services/SessionIssuerService.PolicyHelpers.cs",
      "src/Modules/Identity/Identity.Infrastructure/Services/SudoService.cs",
    ],
  },
  {
    id: "auth-recovery-lifecycle",
    pillar: "backend",
    mode: "lifecycle",
    badge: "9 STATES · STORY V2",
    title: "Identity Authentication, Recovery & Session Lifecycle",
    subtitle:
      "Pre-Auth .IgnoreQueryFilters() -> $s2$ + Lockout -> TwoFactorPendingToken -> mcp/mfa_enroll -> Active Session -> +5ms Revoke",
    description:
      "Native Archify Lifecycle v3 state machine with interactive Story playback tracking login, Hybrid MFA pending tickets, ResetGrantToken 204 no-auto-login recovery, lockout exits, and AbsoluteExpiresAt session termination.",
    htmlUrl: "/archify-hub/auth-recovery-lifecycle.html",
    specUrl: "/archify-hub/specs/auth-recovery-lifecycle.lifecycle.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "1c1631172d447d311686211c07b52b84a6245678",
    highlights: [
      "Models 6 primary checkpoints plus Recovery Grant (204), Lockout (5/15m), and Ceiling Hit (24h/30d/8h) exits",
      "Strictly orders HybridMfaPolicy -> MustChangePassword (mcp=true) -> RequireMfaEnrollment (mfa_enroll=true)",
    ],
    keySources: [
      "src/Host/API/Controllers/Auth/AdminAuthController.ExternalAndReset.cs",
      "src/Host/API/Extensions/MiddlewarePipeline.cs",
      "src/Modules/Identity/Identity.Infrastructure/Services/SessionIssuerService.PolicyHelpers.cs",
    ],
  },
  {
    id: "identity-auth-security-erd",
    pillar: "backend",
    mode: "erd",
    badge: "9 TABLES · IDENTITY SCHEMA · STORY V2",
    title: "Identity Authentication, Password History & Session Security Schema (ERD)",
    subtitle:
      "identity.Tenants, TenantSettings, Admins, Users, admin_security_profiles, RefreshTokens, OtpCodes, PasswordResetTokens & PasswordHistories",
    description:
      "Physical EF Core entity-relationship diagram inside identity.* with 0 crossings and 9/9 verified configuration sources, detailing $s2$ password history indexing, HMAC OTP storage, SHA-256 refresh hashing, and ResetGrantToken scoping.",
    htmlUrl: "/archify-hub/identity-auth-security-erd.html",
    specUrl: "/archify-hub/specs/identity-auth-security-erd.erd.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "1c1631172d447d311686211c07b52b84a6245678",
    highlights: [
      "Models Admin vs User isolation, polymorphic PasswordHistories (PrincipalType, PrincipalId), and AdminSecurityProfiles",
      "Documents SHA-256 RefreshToken hashing on SaveChangesAsync and unique 64-char PasswordResetTokens TokenHash",
    ],
    keySources: [
      "src/Modules/Identity/Identity.Infrastructure/Persistence/IdentityDbContext.cs",
      "src/Modules/Identity/Identity.Infrastructure/Persistence/Configurations/RefreshTokenConfiguration.cs",
      "src/Modules/Identity/Identity.Infrastructure/Persistence/Configurations/PasswordResetTokenConfiguration.cs",
      "src/Modules/Identity/Identity.Infrastructure/Persistence/Configurations/PasswordHistoryConfiguration.cs",
    ],
  },
  {
    id: "backend-central-federation-relay-sequence",
    pillar: "backend",
    mode: "sequence",
    badge: "POST-MFA BRIDGE · 3-DB PARITY · STORY V2",
    title: "SCRIPE-Backend Central Identity Federation, Post-MFA Handoff, HMAC Relay & Dual-RP Sequence",
    subtitle:
      "api.scripe.org OIDC/SAML -> PostMfaHandoffHelper & ExternalAuthHandoffStore (120s SHA-256) -> SessionRelayAuthenticator -> Dual-RP UV=required & Split Logout",
    description:
      "Native Archify Sequence diagram with attached 2-scene Story pinned to SCRIPE-Backend commit e64e61e651ba3bef36c56866f777d5c1b6761f29 (12/12 verified source citations, 702/702 API.UnitTests, 200/200 AuthorizationGates, 90/90 builds, 0-error --idempotent PG 18 / SQL 2025 / Oracle 21c XE parity), tracing central callbacks, PostMfaHandoffHelper custom-domain 2FA bridging, X-Scripe-Session-Relay-Client-Ip rate-limit partitioning (PasskeyAuthLimit=12), CookieAuthMiddleware.Relay MaxAge: 0 parity, sibling-JTI RevokeAllSessions, and AuthLogoutScopeHelper.",
    htmlUrl: "/archify-hub/backend-central-federation-relay-sequence.html",
    specUrl: "/archify-hub/specs/backend-central-federation-relay-sequence.sequence.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "e64e61e651ba3bef36c56866f777d5c1b6761f29",
    featured: true,
    highlights: [
      "12/12 verified SCRIPE-Backend sources across OidcClientController.Central, PostMfaHandoffHelper, SessionRelayAuthenticator, RateLimitingSettings (PasskeyAuthLimit=12), CookieAuthMiddleware.Relay & Fido2PasskeyService",
      "Traces PostMfaHandoffHelper custom-domain hybrid-2FA handoff, 30s/60s HMAC relay validation, WebAuthn:UserVerification='required' & split scr.oidc.session teardown",
    ],
    keySources: [
      "src/Modules/Identity/Identity.Application/Services/PostMfaHandoffHelper.cs",
      "src/Host/API/Middleware/SessionRelayAuthenticator.cs",
      "src/Host/API/Extensions/RateLimitingSettings.cs",
      "src/Host/API/Middleware/CookieAuthMiddleware.Relay.cs",
    ],
  },
  {
    id: "authorization-feature-permission-architecture",
    pillar: "backend",
    mode: "architecture",
    badge: "16 MODULES · 490 PERMS · 4 VIEWS · STORY V2",
    title: "SCRIPE Authorization, Feature-Permission & Internal RBAC Architecture",
    subtitle:
      "TenantContextMiddleware -> HttpFeatureChecker & PermissionAuthorizationHandler -> 16 Feature-Sync Publishers -> Multi-Role FLS & 16-Role RBAC",
    description:
      "Interactive Showcase Architecture diagram with 4 Guided Views and a 3-scene Story pinned to SCRIPE-Backend commit 42629f69a3081a83e7e69e678b1b04b28c12e1f0 (16/16 verified source citations). Maps pre-authorization TenantContextMiddleware warming, fail-closed PermissionAuthorizationHandler with live IFeatureChecker evaluation, EffectiveFeatureMapBuilder across 16 transactional feature-sync publishers, post-commit cache invalidation, and multi-role FLS + dotted resource enforcement across endpoints and exports.",
    htmlUrl: "/archify-hub/authorization-feature-permission-architecture.html",
    specUrl: "/archify-hub/specs/authorization-feature-permission-architecture.architecture.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "42629f69a3081a83e7e69e678b1b04b28c12e1f0",
    featured: true,
    viewsCount: 4,
    highlights: [
      "16/16 verified SCRIPE-Backend source citations pinned to commit 42629f69a3081a83e7e69e678b1b04b28c12e1f0",
      "4 Guided Views: 1. Edge, Context & Feature Gate, 2. Feature Sync & Cache Eviction, 3. Multi-Role FLS & Exports, 4. SCRIPE 16-Role Internal Tenant",
    ],
    keySources: [
      "src/Host/API/Middleware/TenantContextMiddleware.cs",
      "src/Host/API/Extensions/MiddlewarePipeline.cs",
      "src/Core/Core.Application/Authorization/PermissionAuthorizationHandler.cs",
      "src/Core/Core.Application/Services/PermissionCatalogCache.cs",
      "src/Modules/Entitlements/Entitlements.Infrastructure/Services/FeatureChecker.cs",
      "src/Core/Core.Infrastructure/Services/HttpFeatureChecker.cs",
    ],
  },
  {
    id: "authorization-enforcement-sequence",
    pillar: "backend",
    mode: "sequence",
    badge: "FAIL-CLOSED RBAC · CONTEXT SWITCH · STORY V2",
    title: "Authorization Enforcement, Context-Switch & Post-Commit Eviction Sequence",
    subtitle:
      "Next.js Client -> TenantContextMiddleware (Cold Warm + Mode) -> PermissionAuthorizationHandler (HttpFeatureChecker) -> Post-Commit Eviction",
    description:
      "Interactive Showcase Sequence diagram with a 3-scene Story pinned to SCRIPE-Backend commit 42629f69a3081a83e7e69e678b1b04b28c12e1f0 (9 verified source citations). Traces live runtime enforcement across TenantContextMiddleware cold-cache warming, PermissionAuthorizationHandler fail-closed IFeatureChecker gates, EndpointResourceResolver + FieldLevelSecurityMergeHelper projection, and post-commit outbox/role cache eviction.",
    htmlUrl: "/archify-hub/authorization-enforcement-sequence.html",
    specUrl: "/archify-hub/specs/authorization-enforcement-sequence.sequence.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "42629f69a3081a83e7e69e678b1b04b28c12e1f0",
    featured: true,
    highlights: [
      "9 verified SCRIPE-Backend source citations pinned to commit 42629f69a3081a83e7e69e678b1b04b28c12e1f0",
      "Attached 3-scene Story walking through fail-closed PBAC checks, entitlement sync, and post-commit cache invalidation",
    ],
    keySources: [
      "src/Host/API/Middleware/TenantContextMiddleware.cs",
      "src/Core/Core.Application/Authorization/PermissionAuthorizationHandler.cs",
      "src/Host/API/Filters/EndpointResourceResolver.cs",
      "src/Core/Core.Application/Abstractions/FieldLevelSecurityMergeHelper.cs",
      "src/Modules/Entitlements/Entitlements.Application/Services/EffectiveFeatureMapBuilder.cs",
      "src/Modules/Identity/Identity.Application/Services/PrincipalResponseCacheHelper.cs",
    ],
  },
  {
    id: "permission-feature-lifecycle",
    pillar: "backend",
    mode: "lifecycle",
    badge: "5-STATE LIFECYCLE · ENTITLEMENTS TO EFFECTIVE · STORY V2",
    title: "SCRIPE Feature & Permission 5-State Lifecycle",
    subtitle:
      "Defined (490 Perms / 190 Feats) -> Available (389 Pool) -> Assignable -> Assigned (16 Roles) -> Effective Runtime + Eviction",
    description:
      "Interactive Showcase 5-State Lifecycle diagram (schema_version 3) with a 3-scene Story pinned to SCRIPE-Backend commit 42629f69a3081a83e7e69e678b1b04b28c12e1f0 (9 verified source citations). Models every state transition from Defined (490 catalog perms across 19 providers), Available (389 scripe-internal pool via EffectiveFeatureMapBuilder), Assignable (PlatformOnly + catalog scope fence), Assigned (16 roles + Priority 0 Asc FLS + 10 UserGroups), to Effective runtime enforcement and cache invalidation.",
    htmlUrl: "/archify-hub/permission-feature-lifecycle.html",
    specUrl: "/archify-hub/specs/permission-feature-lifecycle.lifecycle.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "42629f69a3081a83e7e69e678b1b04b28c12e1f0",
    featured: true,
    highlights: [
      "9 verified SCRIPE-Backend source citations pinned to commit 42629f69a3081a83e7e69e678b1b04b28c12e1f0",
      "Traces exact 5-state transitions (Defined -> Available -> Assignable -> Assigned -> Effective) plus non-destructive toggle & eviction loops",
    ],
    keySources: [
      "src/Core/Core.Application/Services/PermissionCatalogCache.cs",
      "src/Modules/Identity/Identity.Infrastructure/Services/TenantPermissionManager.cs",
      "src/Modules/Identity/Identity.Application/Queries/Permission/PermissionCatalogTenantScopeHelper.cs",
      "src/Modules/Identity/Identity.Infrastructure/Services/AdminSecurityService.cs",
      "src/Modules/Identity/Identity.Application/Services/PrincipalResponseCacheHelper.cs",
    ],
  },
  {
    id: "rbac-fls-projection-dataflow",
    pillar: "backend",
    mode: "dataflow",
    badge: "DOTTED FLS MERGE · EXPORTS · AUDITING · STORY V2",
    title: "SCRIPE Multi-Role FLS, Dotted Resource Normalization & Export Security Dataflow",
    subtitle:
      "Priority 0 Asc Role FLS Intersection + Additive UserGroupRestrictions -> PermissionResourceNormalizer -> FieldProjectionMiddleware & Export Guards",
    description:
      "Interactive Showcase 5-Stage Dataflow diagram with a 2-scene Story pinned to SCRIPE-Backend commit 42629f69a3081a83e7e69e678b1b04b28c12e1f0 (9 verified source citations). Details how Role FLS intersections (Priority 0 Asc) merge with additive UserGroupRestrictions without truncating dotted resource keys (crm.opportunities), flowing into EndpointResourceResolver, FieldProjectionMiddleware, FieldRestrictionEnforcementBehavior, and AuditExportRedactionHelper.",
    htmlUrl: "/archify-hub/rbac-fls-projection-dataflow.html",
    specUrl: "/archify-hub/specs/rbac-fls-projection-dataflow.dataflow.json",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    repoCommit: "42629f69a3081a83e7e69e678b1b04b28c12e1f0",
    featured: true,
    highlights: [
      "9 verified SCRIPE-Backend source citations pinned to commit 42629f69a3081a83e7e69e678b1b04b28c12e1f0",
      "Attached 2-scene Story illustrating dotted resource key preservation and export/API FLS redaction sinks",
    ],
    keySources: [
      "src/Modules/Identity/Identity.Infrastructure/Services/AdminSecurityService.cs",
      "src/Modules/Identity/Identity.Infrastructure/Persistence/Seeding/IdentityDevDataSeeder.ScripeGroupCatalog.cs",
      "src/Core/Core.Application/Abstractions/PermissionResourceNormalizer.cs",
      "src/Core/Core.Application/Abstractions/FieldLevelSecurityMergeHelper.cs",
      "src/Host/API/Middleware/FieldProjectionMiddleware.cs",
      "src/Modules/Identity/Identity.Application/Services/AuditExportRedactionHelper.cs",
    ],
  },

  // ============================================================================
  // PILLAR 3: FRONTEND DEEP DIVE (NEXT.JS 16 + REACT 19 MVVM) — 18 PAGES
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
    id: "crm-10-submodule-super-architecture",
    pillar: "frontend",
    mode: "explainer",
    badge: "CRM 10-SUBMODULE SSOT",
    title: "CRM Frontend 10-Submodule Clean Architecture, Zero-Leak Persistence & 2D Studio",
    subtitle:
      "TanStack Query v5 · FE-030..FE-033 = 0 · Decoupled Per-Deal Quotes · Unified CrmWorkflowTransitionDialog",
    description:
      "Complete architectural remediation blueprint and interactive diagrams for SCRIPE-Frontend src/modules/crm: 10 bounded sub-modules, Repository-Mapper-Entity contracts (FE-030), zero Zustand persist() domain stores (FE-031), React 19 compiler-safe primitive dependencies (FE-033), per-deal quote isolation, and unified GenericWorkflowKanban + @xyflow/react Studio.",
    htmlUrl: "/archify-hub/crm-10-submodule-super-architecture.html",
    specUrl: "/archify-hub/specs/crm-10-submodule-super-architecture.archify.md",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "91232f19b",
    featured: true,
    highlights: [
      "10 cleanly bounded CRM sub-modules with zero useCrmSettingsStore compat store or circular DI cycles",
      "All CRM repositories map DTOs via *Mapper.toEntity() (FE-030 = 0, FE-010..012 = 0)",
      "All CRM ViewModels powered by TanStack Query v5 + React 19 compiler-safe primitive deps (FE-033 = 0)",
      "Commercial package quotes scoped per opportunityId without hitting tenant settings endpoints",
    ],
    keySources: [
      "src/modules/crm/__tests__/crmLocalizationAndArchGate.test.ts",
      "src/modules/crm/workflows/src/presentation/stores/useCrmWorkflowsStore.ts",
      "src/modules/crm/opportunities/src/presentation/viewmodels/useOpportunitiesViewModel.ts",
      "src/modules/crm/leads/src/presentation/viewmodels/useLeadsViewModel.ts",
      "src/modules/crm/shared/src/presentation/stores/useCrmClientPrefsStore.ts",
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
  {
    id: "frontend-auth-recovery-mvvm",
    pillar: "frontend",
    mode: "architecture",
    badge: "NEXT.JS 16 MVVM · STORY V2",
    title: "SCRIPE-Frontend Auth, Recovery & MFA Boundary Architecture",
    subtitle:
      "next.config.ts CSP -> proxy.ts Edge -> RouteGuard (mcp/mfa_enroll) -> useAppStore Memory JWT & api-factory 401 Mutex",
    description:
      "Native Archify Architecture diagram with attached 3-scene Story pinned to SCRIPE-Frontend commit d3978a00e, mapping CSP headers, scr_auth_state edge gating, RouteGuard exemption/remediation routing, URL hash recovery handling, memory-only JWT state, and shared axios mutex refresh.",
    htmlUrl: "/archify-hub/frontend-auth-recovery-mvvm.html",
    specUrl: "/archify-hub/specs/frontend-auth-recovery-mvvm.architecture.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "d3978a00ea6a51f625bc14a9fd6bb52cef07a02f",
    featured: true,
    highlights: [
      "12/12 verified source references across next.config.ts, proxy.ts, route-guard.tsx, useAppStore.ts, api-factory.ts & signalr-provider.tsx",
      "Details removal of persisted defaultRedirectPath, RequireMfaEnrollment routing to /account/security?setupMfa=1, and SignalR gating",
    ],
    keySources: [
      "next.config.ts",
      "src/proxy.ts",
      "src/core/store/useAppStore.ts",
      "src/core/providers/route-guard.tsx",
      "src/core/services/api-factory.ts",
    ],
  },
  {
    id: "frontend-central-auth-sudo-mvvm",
    pillar: "frontend",
    mode: "architecture",
    badge: "POST-MFA BRIDGE · BFF RELAY · STORY V2",
    title: "SCRIPE-Frontend Central Auth, Post-MFA Bridge, HMAC Session Relay & Sudo MVVM",
    subtitle:
      "OriginRouting -> ssoTwoFactorBridge & ActivePrincipal -> Next.js BFF /api/auth/session/* HMAC Relay -> ApiService Sudo 403 Retry & useAuthLogout",
    description:
      "Native Archify Architecture diagram with attached 3-scene Story and 3 Guided Views pinned to SCRIPE-Frontend commit eea985c95d7a718593029ceeede1b9f745dc1adc (12/12 verified source citations, 208/208 build, 92 arch score, 9/9 Live RateLimiting=true E2E, 24/24 visual gallery), detailing ssoTwoFactorBridge.ts post-MFA custom-domain bridging, __Host-scripe_refresh_token HMAC relay (Client-Ip + MaxAge: 0 parity), cross-tab ActivePrincipal + BroadcastChannel isolation, expanded 403 Sudo retry, and split logoutScope.",
    htmlUrl: "/archify-hub/frontend-central-auth-sudo-mvvm.html",
    specUrl: "/archify-hub/specs/frontend-central-auth-sudo-mvvm.architecture.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "eea985c95d7a718593029ceeede1b9f745dc1adc",
    featured: true,
    viewsCount: 3,
    highlights: [
      "12/12 verified SCRIPE-Frontend sources covering origin-routing.ts, ssoTwoFactorBridge.ts, ssoHandoffDispatch.ts, session-relay-hmac.ts, /api/auth/session/{establish,refresh,logout}, active-principal.ts & SudoVerificationModal.tsx",
      "Models 3 Guided Views: Origin Routing & HMAC Relay, Post-MFA Bridge & Tab Isolation, and Sudo 403 Retry & Split Logout",
    ],
    keySources: [
      "src/modules/shared/auth/signin/src/presentation/utils/ssoTwoFactorBridge.ts",
      "src/core/common/origin-routing.ts",
      "src/core/services/session-relay-hmac.ts",
      "src/app/api/auth/session/establish/route.ts",
      "src/core/services/api.service.ts",
    ],
  },
  {
    id: "frontend-rbac-superadmin-fls-mvvm",
    pillar: "frontend",
    mode: "architecture",
    badge: "SUPERADMIN SPLIT · DOTTED FLS STUDIO · SESSION SYNC · STORY V2",
    title: "SCRIPE-Frontend Multi-Role RBAC, Dotted FLS & Session Sync Architecture",
    subtitle:
      "RouteGuard & SuperAdmin Split -> Tenant Pickers & Dotted FLS Studio -> useAuthorizationSync & Partial CRM FLS Mutations",
    description:
      "Interactive Showcase Architecture diagram with 3 Guided Views and a 3-scene Story pinned to SCRIPE-Frontend commit 044ecc1eeac75d0a443c118701292fa1bf749507 (16/16 verified source citations). Details the Platform vs Tenant SuperAdmin split (!user?.tenantId), fail-closed RouteGuard + PAGE_PERMISSIONS, platformOnly catalog filtering, dotted FLS resource preservation (crm.opportunities) in Roles & UserGroups Studio, live Zustand principal cache resync via useAuthorizationSync, and partial-payload CRM FLS mutations.",
    htmlUrl: "/archify-hub/frontend-rbac-superadmin-fls-mvvm.html",
    specUrl: "/archify-hub/specs/frontend-rbac-superadmin-fls-mvvm.architecture.json",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    repoCommit: "044ecc1eeac75d0a443c118701292fa1bf749507",
    featured: true,
    viewsCount: 3,
    highlights: [
      "16/16 verified SCRIPE-Frontend source citations pinned to commit 044ecc1eeac75d0a443c118701292fa1bf749507",
      "Models 3 Guided Views: 1. RouteGuard & SuperAdmin Split, 2. Tenant Pickers & Dotted FLS Studio, 3. Session Sync & Partial CRM FLS",
    ],
    keySources: [
      "src/core/providers/route-guard.tsx",
      "src/core/common/types/permissions.ts",
      "src/core/providers/permission-provider.tsx",
      "src/core/hooks/use-permission.ts",
      "src/core/hooks/use-restricted-fields.ts",
      "src/core/hooks/use-authorization-sync.ts",
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


