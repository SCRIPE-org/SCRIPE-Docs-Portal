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
    commit: "ffc972a4",
    accentColor: "#B7FF00",
    count: 9,
  },
  backend: {
    label: "SCRIPE-Backend Deep Dive (.NET 10 & AstraFlow 2.3.0)",
    shortLabel: "Backend (.NET 10)",
    tagline:
      "18 Isolated 3-Project Domain Modules, 29-Stage Security Gate, 927+ CQRS Handlers, 3-TX Idempotency & Multi-DB Persistence",
    repoName: "SCRIPE-org/SCRIPE-Backend",
    commit: "f941b150",
    accentColor: "#38BDF8",
    count: 9,
  },
  frontend: {
    label: "SCRIPE-Frontend Deep Dive (Next.js 16 + React 19 MVVM)",
    shortLabel: "Frontend (Next.js 16)",
    tagline:
      "65+ Isolated Sub-Modules, 5-Layer SOLID MVVM Data Flow, 100% @core/ui/* Nexus Tokens, 401 Mutex & Bilingual EN/AR Parity",
    repoName: "SCRIPE-org/SCRIPE-Frontend",
    commit: "f7d148d6",
    accentColor: "#A78BFA",
    count: 8,
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
  // PILLAR 1: SUPER FULL-STACK (BOTH BACKEND + FRONTEND + ECOSYSTEM) — 7 PAGES
  // ============================================================================
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
  // PILLAR 2: BACKEND DEEP DIVE (.NET 10 & ASTRAFLOW 2.3.0) — 8 PAGES
  // ============================================================================
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
  // PILLAR 3: FRONTEND DEEP DIVE (NEXT.JS 16 + REACT 19 MVVM) — 8 PAGES
  // ============================================================================
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


