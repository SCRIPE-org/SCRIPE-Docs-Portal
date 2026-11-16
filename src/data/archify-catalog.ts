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
      "End-to-End Platform Single Source of Truth uniting Next.js 16 MVVM, .NET 10 AstraFlow 2.3.0, Dual-Mode DB, Outbox & 193-Command CLI",
    repoName: "SCRIPE-org/SCRIPE",
    commit: "e0d390a",
    accentColor: "#B7FF00",
    count: 14,
  },
  backend: {
    label: "SCRIPE-Backend Deep Dive (.NET 10 & AstraFlow 2.3.0)",
    shortLabel: "Backend (.NET 10)",
    tagline:
      "18 Isolated 3-Project Domain Modules, 29-Stage Security Gate, 927+ CQRS Handlers, 3-TX Idempotency & Multi-DB Persistence",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    commit: "f941b150",
    accentColor: "#38BDF8",
    count: 10,
  },
  frontend: {
    label: "SCRIPE-Frontend Deep Dive (Next.js 16 + React 19 MVVM)",
    shortLabel: "Frontend (Next.js 16)",
    tagline:
      "65+ Isolated Sub-Modules, 5-Layer SOLID MVVM Data Flow, Inversify DI, Sileo UI & Bilingual EN/AR Parity",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    commit: "2915891e5",
    accentColor: "#A78BFA",
    count: 13,
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
  // PILLAR 1: SUPER FULL-STACK (BOTH BACKEND + FRONTEND + ECOSYSTEM) — 14 PAGES
  // ============================================================================
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
  // PILLAR 2: BACKEND DEEP DIVE (.NET 10 & ASTRAFLOW 2.3.0) — 10 PAGES
  // ============================================================================
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
    id: "backend-master-explainer",
    pillar: "backend",
    mode: "explainer",
    badge: "BACKEND MASTER BOARD",
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
  // PILLAR 3: FRONTEND DEEP DIVE (NEXT.JS 16 + REACT 19 MVVM) — 12 PAGES
  // ============================================================================
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


