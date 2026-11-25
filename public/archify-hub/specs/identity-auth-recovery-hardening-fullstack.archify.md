# How do Backend Policy Hardening, Session Governance, and Next.js 16 MVVM Lock SCRIPE Auth End-to-End? {#auth-hardening-overview}

SCRIPE secures Admin and User authentication across three coupled layers: `$s2$` cryptographic credential validation with non-auto-login recovery, unified `ISessionIssuerService` session ceilings and instant revocation, and fail-closed Next.js 16 Edge and `RouteGuard` MVVM boundaries.

- Pre-auth login, workspace discovery, password reset, and WebAuthn handlers reject invalid encrypted tenant IDs (`422`) and filter `.IgnoreQueryFilters()` queries explicitly by active and non-deleted flags.
- Recovery splits verification (`POST /verify-reset-otp` issuing a single-use `ResetGrantToken`) from mutation (`POST /reset-password` returning `204 No Content`) so password resets never auto-issue session tokens.
- Every password, SSO, SAML, magic-link, passkey, and OTP channel converges on `ISessionIssuerService`, ordering `HybridMfaPolicy` before `MustChangePassword` (`mcp=true`) and `RequireMfaEnrollment` (`mfa_enroll=true`).
- Frontend auth keeps Bearer JWTs in memory (`useAppStore`), deletes `defaultRedirectPath` persistence, exempts recovery routes, and gates SignalR & navigation until `mcp` and `mfa_enroll` are cleared.

@answer scope="SCRIPE-Backend + SCRIPE-Frontend + SCRIPE-CLI · Verified"
@meta locale=en

## Which Auth, Policy, and Governance Thresholds Govern Runtime Behavior? {#auth-metrics-chart}

Six bounded numeric thresholds control brute-force resistance, password reuse prevention, OTP exhaustion, and JWT/session windows across tenants (sources: `JwtOptions.cs`, `TenantSettings.cs`, `VerificationSettings.cs`, `SessionIssuerService.PolicyHelpers.cs`).

@metric id=m_jwt label="Default Access JWT Lifetime" value=30 limit=60 unit="min" note="JwtOptions.ExpiryMinutes = 30 fallback when SessionPolicy leaves AccessTokenExpiryMinutes unset; impersonation refresh caps at 8h."
@metric id=m_lockout label="Default Lockout Threshold" value=5 limit=5 unit="fails" note="LoginLockoutThreshold = 5 locks Admin and User logins for 15 minutes (LoginLockoutMinutes)."
@metric id=m_history label="Password History Window" value=5 limit=24 unit="pw" note="PasswordHistoryCount defaults to 5 previous $s2$ hashes and clamps per tenant up to 24."
@metric id=m_denylist label="Breached Password Denylist" value=8616 limit=10000 unit="entries" note="Embedded NFKC lowercase wordlist checked by BreachedPasswordChecker on password set and reset."

```mermaid title="Auth Remediation Backlog Distribution Across Severity & Drift Tracks (Observed Count in remediation-register.md)"
xychart-beta horizontal
  x-axis ["Critical (CRIT-01..03)", "High (HIGH-01..16)", "Medium (MED-01..21)", "Low (LOW-01..07)", "Doc Drift (DRIFT-01..10)"]
  y-axis "Tracked Items" 0 --> 25
  bar "Remediation Register Count" [3, 16, 21, 7, 10]
```

## How Do Next.js 16 MVVM, ASP.NET Core 33-Stage Middleware, and Identity Services Connect? {#fullstack-auth-topology}

Client requests cross Next.js 16 Edge routing and fail-closed middleware gates before reaching `SessionIssuerService` and Identity persistence. Click any linked child diagram to inspect the dedicated backend workflow, session lifecycle, physical schema, or frontend MVVM implementation.

@architecture id=fullstack-auth-arch title="End-to-End SCRIPE Auth, Policy & Session Hardening Topology"
| fe_edge | Next.js Edge Proxy | frontend |
| fe_guard | RouteGuard & MVVM | frontend |
| fe_api | 401 Mutex & Factory | frontend |
| edge_mw | Pipeline Stages 17-25 | security |
| ctrl_auth | Auth Controllers | backend |
| policy_svc | Policy & $s2$ Hasher | security |
| session_svc | Session & Revocation | security |
| id_store | Identity Schema DB | database |
| fe_edge > fe_guard | cookie + headers |
| fe_guard > fe_api | memory JWT + sudo |
| fe_api > edge_mw | Bearer + HttpOnly |
| edge_mw > ctrl_auth | authorized | emphasis |
| ctrl_auth > policy_svc | verify & check policy |
| ctrl_auth > session_svc | issue / revoke tokens | emphasis |
| policy_svc > id_store | PasswordHistory + Otp |
| session_svc > id_store | RefreshToken + Audit |

@steps id=topology-steps
| st-edge | Next.js Edge Proxy | Evaluates `scr_auth_state` hint cookie, `APP_ROUTE_MANIFEST`, and `isSafeRedirectTarget` while enforcing strict `next.config.ts` CSP and WebAuthn headers. | fullstack-auth-arch | fe_edge |
| st-guard | RouteGuard & MVVM | Keeps `accessToken` in memory-only `useAppStore`, exempts recovery routes, orders `PendingPayment -> mcp -> mfa_enroll`, and blocks SignalR until clear. | fullstack-auth-arch | fe_guard |
| st-api | 401 Mutex & Factory | Shares `activeRefreshHandler`, `activeLogoutHandler`, `withCredentials: true`, and tenant headers across all per-module `ApiService` clients via `api-factory.ts`. | fullstack-auth-arch | fe_api |
| st-mw | Pipeline Stages 17-25 | Validates `scripe_iat_ms (+5ms)`, `jti`, and `imp` in `OnTokenValidated`, then runs `ApiKeyUsage`, post-auth rate limits, `TrustedCidr`, `MustChangePassword`, and `RequireMfaEnrollment`. | fullstack-auth-arch | edge_mw |
| st-ctrl | Auth Controllers | Enforces fail-closed tenant ID decryption (`422`), `[AllowAnonymous]` `/user/logout`, `password-policy` & `force-change-password` parity, and `410 Gone` on `/external-logins/link`. | fullstack-auth-arch | ctrl_auth |
| st-policy | Policy & $s2$ Hasher | Verifies `$s2$` SHA-256 pre-hashed BCrypt (work factor 12), `8,616` denylist entries, `PasswordHistory`, and `Verification:VerifierKey` HMAC OTPs. | fullstack-auth-arch | policy_svc |
| st-session | Session & Revocation | Enforces `TwoFactorPendingToken` (`5m`), `TwoFactorAttemptLockHelper`, immutable `AbsoluteExpiresAt` (`24h` / `>=30d` / `8h` imp), and `MaxConcurrentSessions`. | fullstack-auth-arch | session_svc |
| st-db | Identity Schema DB | Persists `RefreshTokens`, `PasswordHistories`, `PasswordResetTokens` (`varchar(64)` hash), `OtpCodes`, and `admin_security_profiles` with zero plaintext secrets. | fullstack-auth-arch | id_store |

```csharp title="SCRIPE-Backend: Monotonic Revocation Fence & 30m Default JWT Issuance (DependencyInjection.cs & JwtService.cs)"
// Core.Infrastructure/DependencyInjection.cs — OnTokenValidated fail-closed revocation gate
var preciseIatClaim = context.Principal?.FindFirst("scripe_iat_ms")?.Value;
var jtiClaim = context.Principal?.FindFirst("jti")?.Value;
// Validates account + impersonator ("imp") revocation cutoff (revokedAt + 5ms) and Redis JTI denylist
```

## How Does Non-Auto-Login Password Recovery Interact With Session Issuance and Revocation? {#recovery-session-sequence}

Password recovery separates OTP validation from password mutation, revokes all active sessions atomically, and requires a clean sign-in afterward.

@sequence id=recovery-signin-seq title="Recovery ResetGrantToken Flow Followed by Unified Session Sign-In"
| actor user | Browser / Recovery UI | frontend |
| actor ctrl | AdminAuth / UserAuth | backend |
| actor otp | Otp & Reset Store | security |
| actor rev | Session & Revocation | security |
| user | ctrl | POST request-password-reset |
| ctrl | user | 202 Accepted (uniform) | return |
| user | ctrl | POST verify-reset-otp (code/token) |
| ctrl | otp | Check HMAC / SHA-256 hash |
| otp | user | 200 workspaces + policy + ResetGrantToken | return |
| user | ctrl | POST reset-password (ResetGrantToken) |
| ctrl | rev | Mutate $s2$ + PasswordHistory + Revoke all | security |
| rev | user | 204 No Content (no tokens issued) | return |
| user | ctrl | POST login (fresh credentials) |
| ctrl | rev | Issue Session + scripe_iat_ms + JTI | emphasis |

@callout id=recovery-no-autologin level=warning title="Why Reset Password Returns 204 Without Auto-Login"
Returning `204 No Content` eliminates post-reset session fixation, preserves `MustChangePassword` and `RequireMfaEnrollment` wall ordering, and forces fresh MFA evaluation (`TwoFactorPendingToken`) on the next login.

## Which Dedicated Child Architecture Boards Drill Into Each Layer? {#child-boards-index}

Use these dedicated Story-enabled interactive diagrams to trace each layer at symbol and column resolution:

| Pillar | Interactive Board | Diagram Type | Coverage Focus |
| --- | --- | --- | --- |
| Backend | `backend-auth-session-pipeline.html` — Backend Auth, Middleware & Session Workflow {#lnk-be-wf} | Workflow + Story | `CookieAuthMiddleware`, `OnTokenValidated`, `SudoService`, `SessionIssuerService`, `StopImpersonation` |
| Backend | `auth-recovery-lifecycle.html` — Authentication, Recovery & Session Lifecycle {#lnk-be-lc} | Lifecycle + Story | Pre-auth `.IgnoreQueryFilters()`, `ResetGrantToken`, `HybridMfaPolicy`, `AbsoluteExpiresAt` ceilings |
| Backend | `identity-auth-security-erd.html` — Identity Schema Security Data Model {#lnk-be-erd} | Physical ERD + Story | `identity.Tenants`, `TenantSettings`, `Admins`, `Users`, `admin_security_profiles`, `RefreshTokens`, `PasswordResetTokens` |
| Frontend | `frontend-auth-recovery-mvvm.html` — Frontend Auth, Recovery & MFA MVVM Boundary {#lnk-fe-arch} | Architecture + Story | `next.config.ts`, `proxy.ts`, `RouteGuard.tsx`, `useAppStore.ts`, `api-factory.ts`, `signalr-provider.tsx` |
| Full-Stack | `sovereign-account-security-architecture.html` — Zero-Trust Identity & Sovereign Account Security {#lnk-sov} | Architecture | Enterprise B2B passkeys, biometric Sudo elevation, support verification PIN, CIDR allowlists |

## Which Documentation Drift Tracks (`DRIFT-01..10`) Align Across Code, CLI, and Portal? {#drift-reconciliation}

All ten documentation-vs-code drift tracks identified in `remediation-register.md` are reconciled across Backend, Frontend, CLI (`SCRIPE-Dev-Tools`), and the 7-language Docs Portal.

| Track | Previous Stale Claim | Reconciled System Contract | Owner Surfaces |
| --- | --- | --- | --- |
| `DRIFT-01` Lockout Defaults {#dr-01} | Lockout cited `3` or `30m` | `LoginLockoutThreshold = 5`, `LoginLockoutMinutes = 15` across TenantSettings and RateLimiting {good:Reconciled} | `overview.ts`, `multi-tenancy.ts`, `authentication.ts` |
| `DRIFT-02` Password Hashing {#dr-02} | Claimed plain BCrypt `250ms` or Argon2id | Versioned `$s2$` SHA-256 Base64 pre-hash + BCrypt (wf 12) + `8,616` denylist + `PasswordHistory` {good:Reconciled} | `authentication-deep.ts`, `overview.ts`, `data-protection.ts` |
| `DRIFT-03` JWT & Session Lifetimes {#dr-03} | Cited `15m` / `expiresIn: 3600` / RSA API JWTs | `JwtOptions.ExpiryMinutes = 30` HS256 default + `SessionPolicyDto` + `AbsoluteExpiresAt` (`24h`/`>=30d`/`8h`) {good:Reconciled} | `authentication-api.ts`, `user-auth-api.ts`, `comm-pages/security/*` |
| `DRIFT-04` Tenant Password Policy {#dr-04} | Cited wrong property names (`MinPasswordLength`) | Exact `TenantSettings` names (`PasswordMinLength=8`, `Lowercase=false`, `Special=false`, `ExpiryDays=null`) {good:Reconciled} | `multi-tenancy.ts`, `authentication.ts`, `tenant-api.ts` |
| `DRIFT-05` Recovery Grant Flow {#dr-05} | Two-step OTP without `ResetGrantToken` | `verify-reset-otp` issues `ResetGrantToken`; `reset-password` returns `204 No Content` without login {good:Reconciled} | `authentication-api.ts`, `api-reference/*` locales |
| `DRIFT-06` External Link Endpoint {#dr-06} | Cited direct `POST /external-logins/link` | Sudo-gated `initiate-link` handshake; legacy `/link` endpoints return `410 Gone` {good:Reconciled} | `authentication-api.ts`, `user-auth-api.ts`, `sovereign-account` |
| `DRIFT-07` 2FA Pending Ticket {#dr-07} | Cited `twoFactorSessionToken` | Single-use 5-minute `TwoFactorPendingToken` with `TwoFactorAttemptLockHelper` {good:Reconciled} | `authentication-api.ts`, `security/*` locales |
| `DRIFT-08` Rate Limit & OTP Spec {#dr-08} | Cited 15m plaintext OTP & `global` reset limit | `Verification:VerifierKey` HMAC-SHA256 (`10m`/`30m Prod`, `5` attempts) + `password-reset` (`5/15m`) {good:Reconciled} | `auth-sessions.ts`, `user-auth-api.ts`, `security/overview.ts` |
| `DRIFT-09` Middleware & User Parity {#dr-09} | Stale pipeline, `useAuthStore`, missing `user/*` parity | 33-stage `MiddlewarePipeline`, `mfa_enroll=true`, `useAppStore`, `password-policy`, `force-change-password`, `[AllowAnonymous] /user/logout` {good:Reconciled} | `middleware-pipeline.ts`, `state-management.ts`, `user-auth-api.ts` |
| `DRIFT-10` CLI Auth & Secret Gates {#dr-10} | `"auth"` exempted; `Verification.VerifierKey` unconfigured | Removed `"auth"` from `UTILITY_CATEGORIES`; added `BE-037..039` + `Verification.VerifierKey` secret gen {good:Reconciled} | `arch-check-scanner.ts`, `security.ts`, `security-and-infrastructure.md` |
