/**
 * SCRIPE CRM Product & Architecture Documentation Locales — EN
 * Comprehensive technical and functional documentation for the SCRIPE CRM system.
 */
export const en = {
  modules: {
    crm: {
      overview: {
        title: "Commercial CRM & Revenue Engine",
        description:
          "Enterprise multi-tenant commercial operations platform uniting Commercial Accounts 360, Contacts Context, Lead Intake & Qualification, Opportunity Progression with Interactive Kanban, Pipeline Administration, and Sales Activities Timeline.",
        intro:
          "The SCRIPE CRM module is the central commercial operating engine designed for sports organizations, venue operators, and enterprise clubs. It orchestrates end-to-end revenue lifecycles from multi-channel prospect intake, deduplication, and party verification to 5-stage opportunity pipeline progression, optimistic Kanban deal velocity, administrative pipeline governance, and append-only sales interaction timeline tracking.",
        archTitle: "Architectural Foundations & System Boundaries",
        archIntro:
          "Built on Clean Architecture .NET 10, AstraFlow CQRS, Next.js 16 MVVM, and multi-DB schema isolation (PostgreSQL 18 runtime engine, SQL Server, Oracle). In accordance with Platform Invariant D5/B, the CRM module maintains zero physical cross-module foreign keys, utilizing logical GUID contracts with PartyKernel (Party identities), Identity (Users/Tenants), and WorkManagement (Follow-up Tasks).",
        featureAccounts: "Commercial Accounts 360",
        featureAccountsDesc:
          "Holistic 360-degree commercial customer profiles referencing PartyKernel Organization entities with aggregate pipeline value, deal counts, and contact trees.",
        featureContacts: "Contacts Context & Stakeholders",
        featureContactsDesc:
          "Role-aware contact profiles mapped to PartyKernel Person entities with primary commercial contact flags, communication channels, and account associations.",
        featureLeads: "Lead Intake & Dual Conversion",
        featureLeadsDesc:
          "Multi-channel prospect intake with ABM parent linking, daily rate caps, qualification verification gates, and dual conversion pathways (Tenant Provisioning vs Commercial Deal).",
        featureOpportunities: "5-Stage Opportunity Progression",
        featureOpportunitiesDesc:
          "Rigorous deal progression enforcing PD-1 Party Verification, PD-2 Contiguous Stages, PD-3 Reopen Preservation, PD-4 Segregated Outcomes, and PD-5 Per-Currency Partitioning.",
        featureKanban: "Interactive Accessible Kanban",
        featureKanbanDesc:
          "High-velocity visual deal board with full WCAG 2.1 AA keyboard support, drag-and-drop mechanics, and optimistic client state rollback on server rejection.",
        featurePipeline: "Default Pipeline Administration",
        featurePipelineDesc:
          "Tenant-level pipeline configuration studio for stage labeling, contiguous 1..5 permutation sorting, win probabilities, and pre-proposal reachability gates.",
        featureActivities: "Sales Execution Desk & Timeline",
        featureActivitiesDesc:
          "Chronological append-only interaction logging (Calls, Meetings, Emails, Tasks, Notes) and seamless delegation of actionable follow-ups to WorkManagement.",
        modelTitle: "Core Domain Aggregate Roots & Models",
        modelIntro:
          "The CRM domain model enforces strict business invariants, UTC timestamp precision, Base64 RowVersion concurrency tokens, and D4/B Row-Level Security.",
        securityTitle: "5-Layer Security, FLS Masking & PBAC Matrix",
        securityIntro:
          "Governed by 31 granular PBAC permissions across 6 resources, D4/B row-level security (Owner, Team, and Manager Grant scopes), and server-authoritative Field-Level Security (FLS) masking financial figures for unauthorized roles.",
        apiTitle: "CRM REST API Controller Catalog",
        apiIntro:
          "Server-authoritative ASP.NET Core API controllers returning uniform Result<T> envelopes with standard RFC-7807 error problem details.",
        providersSeedersTitle: "Module Providers, Seeders, Entitlements & Workspaces",
        providersSeedersIntro:
          "Integration with SCRIPE platform foundations via specialized providers and seeders. Enforces strict commercial isolation, quota management, role initialization, and primary rail workspace navigation.",
        endpointsNote:
          "All mutating endpoints require valid Bearer JWT tokens, Tenant context resolution, and Base64 RowVersion concurrency tokens where applicable.",
      },
      accounts: {
        title: "Commercial Accounts 360",
        description:
          "Unified 360-degree commercial customer view, PartyKernel universal organization linkage, pipeline value aggregation, and financial metrics.",
        intro:
          "Commercial Accounts represent legal business entities, corporate sponsors, federations, and partner clubs doing business with the tenant. Instead of duplicating organizational metadata, CRM maintains a logical reference (CrmAccountPartyRef) to PartyKernel Organization entities, layering commercial relationship parameters, account owner assignments, active opportunities, and historical financial value onto the canonical identity.",
        conceptTitle: "PartyKernel Integration & Universal Party Architecture",
        conceptIntro:
          "In alignment with Invariant D5/B, CRM never duplicates legal names, tax identifiers, or corporate registration numbers. PartyKernel serves as the sole system of record for party identity, while CRM manages the commercial relationship layer, pipeline value rollups, and sales engagement.",
        modelTitle: "CrmAccountPartyRef Entity & 360 DTO Projections",
        modelIntro:
          "The account aggregate root combines logical party references with commercial metadata, lifetime value calculations, and row-level ownership grants.",
        securityTitle: "D4/B Row-Level Security & Financial FLS Masking",
        securityIntro:
          "Sales reps only see accounts assigned to their user ID or team, while managers access records via explicit CrmRecordManagerGrant permissions. When a user lacks financial view entitlements, estimated deal values and pipeline metrics are masked on both the API and presentation layers.",
        apiTitle: "Accounts REST Endpoints & Contracts",
        apiIntro:
          "Provides paginated catalog search, 360-degree detail retrieval, commercial account creation, and ownership management.",
      },
      contacts: {
        title: "Contacts Context & Stakeholders",
        description:
          "Stakeholder management linking PartyKernel Person identities to commercial accounts with communication roles and influence hierarchy.",
        intro:
          "Contacts Context enables commercial teams to map individuals, decision-makers, athletic directors, and procurement officers to Commercial Accounts. Each contact record (CrmContactPartyRef) references a canonical PartyKernel Person identity while maintaining tenant-specific job titles, decision authority designations, primary contact flags, and communication preferences.",
        conceptTitle: "Canonical Person References & Communication Context",
        conceptIntro:
          "By separating person identity in PartyKernel from commercial role context in CRM, contacts retain unified personal identities across multiple accounts, tenancies, or contractual engagements without data synchronization drift.",
        modelTitle: "CrmContactPartyRef Entity & Association Rules",
        modelIntro:
          "Enforces one primary commercial contact per account, valid email/phone format checks, and logical party verification prior to association.",
        apiTitle: "Contacts REST Endpoints & Query Surface",
        apiIntro:
          "Full CRUD surface for contact creation, account linkage, primary designation toggles, and contextual contact point retrieval.",
      },
      leads: {
        title: "Lead Intake, Qualification & Dual Conversion",
        description:
          "Multi-channel prospect intake, deduplication checks, qualification gates, and dual conversion pathways (Tenant Provisioning vs Commercial Deal).",
        intro:
          "Leads represent top-of-funnel inbound prospects originating from public signup wizards, marketing campaigns, partner referrals, or direct sales entry. The CRM Lead engine enforces strict intake deduplication, Account-Based Marketing (ABM) colleague linking, qualification gates, and two distinct conversion destinations.",
        intakeTitle: "Intake Validation, Deduplication & Daily Rate Caps",
        intakeIntro:
          "Every incoming lead undergoes three automated ingestion validations: normalized workspace collision detection, exact company/email deduplication, and tenant daily rate cap enforcement (1,000 leads/day).",
        lifecycleTitle: "Lead Lifecycle & Qualification State Machine",
        lifecycleIntro:
          "Leads progress through deterministic states: New, Working, Qualified, Converted, or Disqualified. Transitions require captured qualification notes, decision rationale, and stakeholder party verification.",
        conversionTitle: "Dual Conversion Pathways: Tenant Provisioning vs Commercial Deal",
        conversionIntro:
          "Qualified leads can be converted through two specialized pipelines: Pathway A triggers the atomic TenantProvisioner saga (creating a new operational tenant, default admin role, and subscription edition); Pathway B converts the lead into an active CRM Opportunity and linked Commercial Account for direct deal pursuit.",
        apiTitle: "Leads REST Endpoints & Public Form Ingestion",
        apiIntro:
          "Encompasses both public unauthenticated contact sales endpoints and authenticated administrative lead management routes.",
      },
      opportunities: {
        title: "Opportunities Lifecycle & Kanban Velocity",
        description:
          "Complete commercial deal lifecycle engine, 5 non-negotiable pipeline invariants (PD-1..PD-5), RowVersion concurrency, FLS financial masking, and WCAG-accessible Kanban.",
        intro:
          "Opportunities are the core revenue drivers of SCRIPE CRM, representing qualified deals moving through a structured 5-stage sales cycle. The engine guarantees strict server-authoritative stage progression, party verification gates, currency partitioning, deterministic reopen semantics, and real-time visual Kanban orchestration.",
        invariantsTitle: "The 5 Non-Negotiable Pipeline Invariants (PD-1 through PD-5)",
        invariantsIntro:
          "Every opportunity mutation is strictly validated by AstraFlow pipeline behaviors against platform invariants: PD-1 Non-Bypassable Party Verification Gate; PD-2 Contiguous 5-Stage Progression; PD-3 Deterministic Reopen Stage Preservation; PD-4 Segregated Closed Outcomes; PD-5 Strict Per-Currency Estimation.",
        concurrencyTitle: "Base64 RowVersion Concurrency & Server-Side FLS Masking",
        concurrencyIntro:
          "Eliminates lost updates across concurrent sales representatives using 16-byte RowVersion concurrency tokens. For sales reps lacking financial read privileges, monetary figures are masked as null with maskedFieldKeys indicators, rendered on UI as secure dot sequences.",
        kanbanTitle: "High-Velocity Interactive Kanban Board Architecture",
        kanbanIntro:
          "Designed with Next.js 16 and @core/ui/* design system primitives. Features full WCAG 2.1 AA keyboard navigation (Space/Enter pick, arrow key traversal), optimistic UI stage movement, and instant rollback on server validation failure.",
        apiTitle: "Opportunities REST Endpoints & Lifecycle Commands",
        apiIntro:
          "Comprehensive API surface covering stage advance, close-won/close-lost outcomes, deterministic reopen, Kanban grouped queries, and FLS projection.",
      },
      pipeline: {
        title: "Tenant Default Pipeline Administration Studio",
        description:
          "Single tenant default pipeline governance, canonical 5-stage immutability, contiguous 1..5 permutation ordering, and pre-proposal reachability gates.",
        intro:
          "The Pipeline Administration Studio gives authorized administrators (crm.pipelines.manage) control over their tenant's commercial sales workflow while enforcing rock-solid system integrity rules that protect active deals from pipeline corruption.",
        governanceTitle: "The Single Default Pipeline & Canonical Immutability Law",
        governanceIntro:
          "Every tenant operates exactly one active default pipeline (key = 'default'). The 5 canonical active stage keys (discovery, qualification, proposal, negotiation, closing) are immutable and cannot be deleted or re-keyed, ensuring consistent cross-tenant reporting.",
        rulesTitle: "Permutation Sort Ordering & Pre-Proposal Reachability Gate",
        rulesIntro:
          "Administrators can reorder stages, but the sort order must form a strict contiguous 1..5 permutation. Furthermore, the Proposal stage must always be preceded by Discovery, Qualification, or Solution Fit to guarantee deal maturity before formal proposal submission.",
        apiTitle: "Pipeline Configuration REST Endpoints",
        apiIntro:
          "Endpoints for retrieving the default pipeline definition and executing two-phase atomic pipeline updates in PostgreSQL.",
      },
      activities: {
        title: "Sales Activities Execution Desk & Timeline",
        description:
          "Append-only commercial interaction logging, Sales Execution Desk, and WorkManagement task delegation without cross-module physical constraints.",
        intro:
          "The Sales Activities subsystem gives commercial reps an integrated workspace to record customer touchpoints, log calls, schedule meetings, capture notes, and assign actionable follow-up tasks to teammates in the WorkManagement module.",
        archTitle: "Append-Only Timeline Ownership & Invariant D5/B",
        archIntro:
          "CRM maintains authoritative ownership of the append-only interaction audit timeline (crm.crm_sales_activities). When an activity generates a follow-up action item, the task is created in WorkManagement via logical GUID references without cross-module foreign key constraints.",
        deskTitle: "Sales Execution Desk Layout & Split-View UX",
        deskIntro:
          "Built using 100% @core/ui/* primitives and Nexus design tokens. Provides a responsive split-view interface with customer context on the left and chronological activity feed on the right, backed by bilingual English/Arabic RTL parity.",
        tasksTitle: "WorkManagement Follow-Up Task Delegation Workflow",
        tasksIntro:
          "Seamlessly converts meeting action items into trackable operational work items with assigned assignees, due dates, and bidirectional logical status references.",
        apiTitle: "Activities REST Endpoints & Activity Logging",
        apiIntro:
          "Provides endpoints for querying entity timelines, logging completed interactions, and scheduling delegated follow-up tasks.",
      },
    },
  },
};
