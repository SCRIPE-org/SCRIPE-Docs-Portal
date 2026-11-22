# How will SCRIPE run as an internal sovereign tenant across Production and Development? {#scripe-internal-tenant}

SCRIPE runs as a dedicated internal tenant (`Code = "SCRIPE"`, subdomain `scripe.admin.scripe.org`) backed by explicit `TenantKind.Internal` and `EditionScope.Internal` flags, separated from Platform Root (`superadmin`) via a distinct verified company email (`seif@scripe.org`).

- Separate emails eliminate shared-email lockouts and OTP/magic-link collisions without delaying delivery for a login redesign.
- Explicit `TenantKind` and `EditionScope` enums preserve `Edition.IsSystem`, avoid `Edition.IsFree` collisions, and exclude internal records from commercial KPIs and Stripe Connect.
- First-create-only complex bootstrap validation enforces `MustChangePassword = true` in Production and Staging without breaking restarts or automated test suites.
- Capacity quotas use `-1` with lock-free short-circuiting while security, SLA, and upload limits remain capped.

@answer scope="Backend + Frontend + 3 DB Providers · Shipped"
@meta locale=en

## How do Identity bootstrap and Entitlements connect on startup? {#startup-architecture}

@architecture id=internal-tenant-topology title="Internal Sovereign Tenant Topology"
| root | Platform Root Admin | security |
| seeder | ScripeInternalSeeder | backend |
| domain | RoleAndAdminSeeder | backend |
| id_db | Identity Schema DB | database |
| sub_seed | EntitlementsStartupSeeder | backend |
| ent_db | Entitlements Schema DB | database |
| crm_cf | CRM + CustomFields | backend |
| guard | Isolation & Triggers | security |
| root > domain | owns TenantId=null | security |
| seeder > domain | runs before | emphasis |
| seeder > id_db | writes TenantKind=Internal | default |
| domain > id_db | writes domain + roles | default |
| domain > sub_seed | precedes | default |
| sub_seed > ent_db | writes scripe-internal | emphasis |
| ent_db > crm_cf | unlocks modules | default |
| crm_cf > crm_cf | seeds EGP + keys | default |
| id_db > guard | enforces triggers | security |

@steps id=startup-steps
| step-seeder | ScripeInternalSeeder | Upserts SCRIPE tenant, tenant settings, role, and initial scripeadmin before RoleAndAdminSeeder runs. | internal-tenant-topology | seeder |
| step-domain | RoleAndAdminSeeder | Syncs tenant permissions onto T_SCRIPE_SA, creates scripe.admin.scripe.org, and keeps superadmin scoped to null TenantId. | internal-tenant-topology | domain |
| step-ent | EntitlementsStartupSeeder | Seeds scripe-internal edition, assigns an active Lifetime subscription, and provisions lock-free Unlimited QuotaCounters. | internal-tenant-topology | sub_seed |
| step-crm | CRM + CustomFields | Paginates active tenants to create canonical pipelines, EGP settings, HQ lead routing, and AES encryption keys. | internal-tenant-topology | crm_cf |
| step-guard | Isolation & Triggers | Enforces DB triggers, soft-delete purge exclusions, signup blocks, and commercial KPI filters. | internal-tenant-topology | guard |

## How do Platform Root, SCRIPE Internal, and Commercial Club tenants compare? {#tenant-comparison}

| Criterion | Platform Root (`superadmin`) | SCRIPE Internal (`scripeadmin`) | Commercial Clubs (6 Dev Tenants) |
| --- | --- | --- | --- |
| Tenant Scope | `TenantId = null` | `Guid.NewGuid()` (`Code = "SCRIPE"`, `Kind = Internal`) {good:Isolated} | Customer IDs (`Kind = Customer`) |
| Admin Email | `admin-seif@scripe.org` | `seif@scripe.org` (`SCRIPE_TENANT_ADMIN_EMAIL`) {good:Separate} | Tenant admin emails |
| Edition Classification | Not tenant-scoped | `scripe-internal` (`Scope = Internal`) {good:Non-Billable} | `sports-*` (`Scope = Commercial`) |
| Capacity Quotas | Unrestricted operator | `-1` lock-free capacity + `TotalAdminPool = -1` {good:Unlimited} | Edition tier limits |
| Security & Upload Bounds | Standard platform policy | `MinLength = 12`, `MaxAttempts = 3`, `500 MB` cap {good:Bounded} | Edition security tier |
| Commercial KPIs & Connect | Excluded (`TenantId = null`) | Excluded by `TenantKind` + `EditionScope` {good:Excluded} | Included in MRR / churn / Connect |
| Public End-User Signup | Not applicable | Blocked (`RegisterUserCommandHandler`) {bad:Blocked} | Open if active |
| Deletion & Suspension | Protected trigger | Application + purge job + 3-DB triggers {good:Immutable} | Admin / billing lifecycle |

## How do first-create bootstrap and forced password change behave by environment? {#bootstrap-flow}

@sequence id=bootstrap-sequence title="Bootstrap Credential and First-Login Enforcement"
| actor env | Startup Env & Secrets | cloud |
| actor seeder | Admin Bootstrap Seeder | backend |
| actor db | Identity DB | database |
| actor client | Browser / Test Fixture | frontend |
| actor mw | MustChangePasswordMiddleware | security |
| seeder | db | Query scoped admin row |
| db | seeder | Null on initial provision | return |
| env | seeder | Read initial password + complexity |
| seeder | db | Insert MustChangePassword=true | emphasis |
| client | mw | Login and call API |
| mw | client | 403 MUST_CHANGE_PASSWORD | security |
| client | mw | POST force-change-password |
| mw | client | Rotated token without bypass | return |

@callout id=restart-safety level=note title="Restart Safety After Secret Rotation"
Bootstrap secret checks execute solely inside the first-time `existingAdmin == null` branch. Subsequent restarts in Production succeed when bootstrap environment variables are cleared after onboarding. Test harnesses pass test secrets via `TestWebApplicationFactory` and complete password setup inside explicit test fixtures.

## Which security backlog items remain outside this feature? {#security-backlog}

| Priority | Vulnerability Area | Primary Location | Remediation Track |
| --- | --- | --- | --- |
| P0 {#p0-otp} | Cross-tenant OTP scope escalation | `AdminResetPasswordWithOtpCommandHandler.cs` | Bind OTP payload strictly to target tenant {bad:Deferred Security PR} |
| P0 {#p0-discovery} | Pre-auth & sibling lockout oracle | `AdminLoginCommandHandler.Discovery.cs` | Scope challenge before revealing match state {bad:Deferred Security PR} |
| P0 {#p0-magic} | Magic-link widening (`Guid.Empty`) & query tokens | `RequestMagicLinkLoginCommandHandler.cs` | Reject `Guid.Empty` fallback and query tokens {bad:Deferred Security PR} |
| P1 {#p1-index-otel} | PostgreSQL NULL email index & route cardinality | `AdminConfiguration.cs`, `ObservabilityMiddleware.cs` | Partial unique index + `"tenantId"` claim key {caution:Follow-Up Fix} |

## Cross-Subdomain Cookies, FIDO2 & UI Guards {#cross-subdomain-guards}

| Concern | Mechanism Implemented | Security & Isolation Guarantee |
| --- | --- | --- |
| Subdomain Auth Cookies {#cookie-policy} | `AuthCookiePolicy` shared helper across login, QR, OIDC, and sudo cookies | Sets `SameSite=None; Secure=true` on `*.localhost` in Development only; Production stays strict {good:Enforced} |
| Passkey Origin Validation {#fido2-origins} | FIDO2 `AllowedOrigins` exact host suffix validator | Rejects single-label wildcard suffixes and state-changing `Referer` spoofing {good:Enforced} |
| Dev Email Fallback {#dev-email} | `ResendEmailSender` development fallback logger | Logs sanitized OTP only when `_isDevelopment` is true; throws fail-closed in Staging/Production {good:Safe} |
| Admin UI Guards {#ui-guards} | `/tenants`, `/entitlements/subscriptions`, and `/entitlements/editions` guards | Hides destructive lifecycle controls, locks internal edition wizard, and flags KPI exclusion {good:Verified} |

## Shipped Verification & Hardening Checklist {#verification-checklist}

- [x] Generated `AddTenantKind` (Identity) and `AddEditionScope` (Entitlements) migrations across SQL Server, PostgreSQL, and Oracle plus 3-DB immutability triggers.
- [x] Verified fail-closed initial bootstrap complexity (`>= 12` chars) in Production/Staging while preserving restart idempotency and `--seed-dev` dogfooding.
- [x] Confirmed `scripe-internal` keeps lock-free `-1` capacity quotas while capping `Identity.PasswordPolicy.MinLength = "12"`, `Media.MaxFileSizeMB = "500"`, and platform-only flags.
- [x] Closed all 17 security review findings across tenant isolation, CRM HQ `EGP` routing, secret hygiene, FIDO2 wildcard validation, and Production CORS indexing.
- [x] Verified live unmocked Playwright UAT (`8/8` passing across `*.localhost` subdomains and `/signup`), visual QA approval across all 19 screenshots, `scripe arch-check` (`0` errors), and `scripe validate-locales` (`0` missing keys).
