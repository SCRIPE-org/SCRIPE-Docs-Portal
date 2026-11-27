# SCRIPE Unified Identity & Platform Security Remediation {#security-remediation-program}

SCRIPE replaced legacy local credential assignment flows and hardened edge, origin, rate-limit, and host boundaries across `.NET 10`, `Next.js 16`, and three database providers on isolated branch `security/unified-identity-platform-remediation`.

- Email invitations and short-lived `#token=` links replace all manual setup and admin-set password flows ([CreateAdmin](source:be-create-admin), [ResetAdminPassword](source:be-reset-password)).
- Every admin login, refresh, and WebAuthn ceremony binds request origin to tenant scope and enforces `Hybrid` vs `SsoOnly` policy ([OriginEvaluator](source:be-origin-eval), [LoginView](source:fe-login)).
- Edge and host guards add trusted proxy IP extraction, Redis Lua distributed rate limiting, fail-closed prod checks, and Gitleaks CI ([RateLimit](source:be-ratelimit)).
- Automated checks pass locally across `2,788` Backend test executions, `3,945` Frontend tests, `scripe arch-check` (`0` errors), and `3` EF Core migrations; live edge/container checks await Staging ([Runbook](source:docs-runbook)).

@answer scope="Branch security/unified-identity-platform-remediation · 2026-11-27"
@meta locale=en
@source be-create-admin title="CreateAdminCommandHandler.cs" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Commands/Admin/CreateAdminCommandHandler.cs
@source be-reset-password title="ResetAdminPasswordCommandHandler.cs" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Commands/Admin/ResetAdminPasswordCommandHandler.cs
@source be-origin-eval title="AuthOriginPolicyEvaluator.cs" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/AuthOriginPolicyEvaluator.cs
@source be-ratelimit title="DistributedRateLimitStore.cs" path=SCRIPE-Backend/src/Host/API/Security/DistributedRateLimitStore.cs
@source fe-login title="SsoOnlyCredentialsPanel.tsx" path=SCRIPE-Frontend/src/modules/shared/auth/signin/src/presentation/components/SsoOnlyCredentialsPanel.tsx
@source docs-runbook title="Staging Rollout Runbook" path=SCRIPE_SECURITY_REMEDIATION_STAGING_RUNBOOK_2026-11-27.md

## How do hardened auth and edge boundaries fit together? {#architecture-overview}

Requests traverse Vercel BFF header normalization, ASP.NET Core forwarded-header and Redis rate-limit middleware, and strict Identity origin and policy gates before mutating database state.

@architecture id=sec-topology title="Remediated SCRIPE Identity & Edge Topology"
| fe-bff | Next.js 16 BFF & Auth UI | frontend |
| edge-proxy | ForwardedHeaders & Single HSTS | security |
| rate-redis | Redis Lua Rate Limit & Lock | database |
| origin-gate | AuthOriginPolicyEvaluator | security |
| identity-cmd | Identity CQRS Handlers | backend |
| id-db | PG / SQL Server / Oracle DB | database |
| fe-bff > edge-proxy | X-Vercel-Forwarded-For | default |
| edge-proxy > rate-redis | Per-IP + auth quota | emphasis |
| edge-proxy > origin-gate | Origin + principal | security |
| origin-gate > identity-cmd | Verified tenant scope | default |
| identity-cmd > id-db | Parameterized EF Core | default |

## How do password reset and MFA recovery eliminate admin password exposure? {#recovery-sequence}

Administrators only trigger single-use recovery or MFA resets under Sudo elevation and privilege ceilings; targets set new credentials themselves via `#token=` links and `X-Setup-Token` headers.

@sequence id=pwd-mfa-flow title="Sudo-Guarded Recovery & Session Containment"
| actor admin | Delegated Admin | frontend |
| actor ctrl | AdminsController | backend |
| actor guard | Privilege & Sudo Guard | security |
| actor store | Identity DB & Revocation | database |
| actor target | Target Admin | external |
| admin | ctrl | POST reset-password or reset-mfa + Sudo token |
| ctrl | guard | Validate scope, IsProtected, ceiling, SsoOnly |
| guard | store | Persist 256-bit SHA-256 TargetAdminId token |
| store | guard | Revoke refresh tokens, cache, Sudo & SignalR | return |
| ctrl | target | Send #token= email link (never log password) |
| target | ctrl | Submit new password or confirm MFA re-enroll |

@steps id=recovery-steps
| verify-sudo | Privilege & Sudo Guard | Confirms step-up elevation, tenant scope, `IsProtected`, and `admins.update` / `admins.reset_password` ceiling. | pwd-mfa-flow | guard |
| bind-target | Identity DB & Revocation | Stores SHA-256 token bound to `TargetAdminId`, strips `?token=` from transport, and revokes active tokens and Sudo tickets. | pwd-mfa-flow | store |
| complete-target | Target Admin | Sets own password via `#token=` fragment or re-enrolls TOTP / passkey cleanly. | pwd-mfa-flow | target |

## What changed across identity, host, and frontend controls? {#control-matrix}

All validated High, Medium, Low, and Informational findings received targeted code, schema, and regression-test closures while preserving working controls (`PasswordRecoveryView.tsx`, DOMPurify, nonce CSP).

| Area | Hardened Control & Outcome | Verification Status |
| --- | --- | --- |
| Manual setup & admin password assignment | Deleted `ManualSetup*`; link-only reset with Sudo & ceiling {good:Fixed} | `Identity.Application.Tests` |
| Tenant `SsoOnly` & Break-Glass policy | `TenantAuthenticationMode` column + login/recovery enforcement {good:Fixed} | Unit + `SsoOnlyAndBreakGlassLogin.test.tsx` |
| Setup links & timing parity | `#token=` fragment, `X-Setup-Token`, `$s2$` dummy BCrypt verify {good:Fixed} | `account-setup-security.test.tsx` |
| Admin cross-origin & CORS | `AuthOriginPolicyEvaluator` + single-label `*.admin.scripe.org` {good:Fixed} | `CorsOriginValidatorTests` (17/17) |
| Passkeys & domain revalidation | Custom-domain WebAuthn RP ID + `TenantDomainRevalidationJob` {good:Fixed} | `MfaRecoveryAndOriginPolicyTests` |
| Proxy, Redis limiter & Prod defaults | Trusted proxies, Lua Redis limiter, `Sms:Mode=Disabled` {caution:Live Edge Pending} | Unit tests pass; Docker/live `NOT_VERIFIED` |

## What verified locally vs. what awaits Staging verification? {#verification-checklist}

Local automated test, build, migration, secret-scan, and `scripe arch-check` gates passed; external edge, Redis container, and live-DB browser runs remain `NOT_VERIFIED` until Staging executes.

- [x] Backend compilation & unit gates: `API.csproj` builds with 0 errors; `Identity.Application.Tests` (`1,618` passed), `AuthorizationGates.Tests` (`258` passed), `API.UnitTests` (`881` passed filtered), `Core.Application.Tests` (`14/14` targeted), and `CorsOriginValidatorTests` (`17/17`) passed.
- [x] Three-provider EF migrations & scripts: PostgreSQL (`20261127151428`), SQL Server (`20261127151433`), and Oracle (`20261127151437`) generated with idempotent DDL scripts and `IdempotencyMigrationPresenceTests` (`6/6`).
- [x] Frontend & monorepo gates: `tsc --noEmit` (0 errors), `oxlint` (0 errors), `vitest` (`515` files / `3,945` tests), `pnpm build`, EN/AR parity (`0` gaps), `identity-security-remediation.spec.ts` listed (`10` tests), redacted secret scan (`src_hits=0`), and `scripe arch-check` (`0` errors, score `94/100`).
- [ ] Apply `SecurityIdentityRemediationFields` migrations in Staging and run `INFRA-FWD-01`, `RATE-MEM-01`, `LOCK-MEM-01`, `NEW-10`, `NEW-12`, and `TENANT-FED-DRIFT-01` live probes.
- [ ] Run `pnpm exec playwright test e2e/identity-security-remediation.spec.ts` against a live Staging stack and review `.auth-storage-state.json` git-history purge policy.
