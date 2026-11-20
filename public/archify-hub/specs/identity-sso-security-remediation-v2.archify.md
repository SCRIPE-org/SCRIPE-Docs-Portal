# How does SCRIPE Identity & Multi-Tenant SSO V2 deliver 36/36 security remediation, Smart Adaptive SSO, and CLI hardening? {#identity-sso-security-remediation-v2}

SCRIPE V2 closes **36 of 36 confirmed security findings** and unifies Smart Adaptive SSO across all 6 seeded tenants plus Platform Root. Hardened `scripe-cli` streaming and `1,926` backend tests plus `21` Playwright screenshots verify the release.[](source:audit_report)

- Security Audit `run-2` mitigated `2` Critical, `17` High, `16` Medium, and `1` Low findings across Identity, SSO, RBAC, Delegations, Media, Host Cookies, and Frontend stores.[](source:audit_report)
- `SsoProviderButtons` adapts across `AHLY`, `CITY`, `FALCON`, `APEX`, `COMMUNITY`, `ACFC`, Platform Root, and fail-closed `UNKNOWN_999` with zero clipping in EN and AR RTL.[](source:fe_sso_btns)
- `SudoService` and `CookieAuthMiddleware` bind `scripe_sudo_token` to `sid`/`jti` and clear refresh, OIDC, and Sudo cookies atomically while Frontend sign-out wipes Zustand singletons.[](source:sudo_val)
- `scripe-cli` streams `1.37 GB` (`26` Cobertura files) in `2.63s`, removes the `-v` collision, isolates `SQLCMDPASSWORD`, enforces `shell: false`, and guards `db outbox purge --confirm`.[](source:cli_cov)

@answer scope="SCRIPE V2 · 36/36 Audit · 6-Tenant SSO · CLI"
@meta locale=en style=editorial quality_profile=showcase
@source audit_report title="SCRIPE Security Audit & Remediation Report (run-2)" path=.agents/rules/security-and-infrastructure.md
@source agents_const title="SCRIPE v6.0 AI Engineering Constitution (AGENTS.md)" path=AGENTS.md
@source fe_sso_btns title="SsoProviderButtons Smart Adaptive Layout & i18n Prefix Strip" path=SCRIPE-Frontend/src/modules/shared/auth/signin/src/presentation/components/SsoProviderButtons.tsx
@source fe_pwd_in title="CredentialsPasswordInput Logical RTL Input" path=SCRIPE-Frontend/src/modules/shared/auth/signin/src/presentation/components/CredentialsPasswordInput.tsx
@source fe_acct_lay title="AccountLayout Real Backend Logout & Store Reset" path=SCRIPE-Frontend/src/app/(account)/layout.tsx
@source fe_impers title="ImpersonationRepository & authBroadcast Sibling-Tab Isolation" path=SCRIPE-Frontend/src/modules/shared/auth/core/data/repositories/ImpersonationRepository.ts
@source fe_pat_store title="usePatOneTimeSecretStore Owner-Bound Receipt Guard" path=SCRIPE-Frontend/src/core/store/usePatOneTimeSecretStore.ts
@source sudo_val title="SudoService.Validation Session-Bound HMAC & Anti-Downgrade" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/SudoService.Validation.cs
@source sudo_cookie title="SudoCookieExtensions & CookieAuthMiddleware Atomic Clearing" path=SCRIPE-Backend/src/Host/API/Middleware/CookieAuthMiddleware.cs
@source role_graph title="AdminRepository.RoleGraph Live Delegations & Break-Glass Custody" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Persistence/Repositories/AdminRepository.RoleGraph.Delegations.BreakGlass.cs
@source scope_grant title="GrantScopedAccessCommandHandler & TransferProtection Guards" path=SCRIPE-Backend/src/Host/API/Extensions/MiddlewarePipeline.cs
@source sso_cb title="OidcClientService & ProcessOidcCallback Role/2FA Isolation" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/OidcClientService.cs
@source media_sec title="FileService SVG Sanitizer & UploadChunkCommand Magic-Byte Guard" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Services/FileService.cs
@source cli_cov title="scripe-cli Streaming Cobertura Parser & Security Hardening" path=SCRIPE-Dev-Tools/scripe-cli/src/utils/coverage-checker.ts

## How do Adaptive SSO, 36/36 Security Gates, and CLI Tooling fit together? {#v2-system-overview}

@architecture id=v2-remediation-arch title="SCRIPE V2 Adaptive SSO, 36/36 Security Shield & Hardened CLI"
| fe_login | Adaptive SSO Login | frontend | source:fe_sso_btns |
| fe_acct | Account & Store Guard | frontend | source:fe_acct_lay |
| edge_pipe | Auth-First Rate & Cookies | security | source:sudo_cookie |
| sso_core | OIDC, SAML & Passkeys | backend | source:sso_cb |
| rbac_core | RBAC, Scope & Break-Glass | security | source:role_graph |
| media_core | SVG & Quota Shield | security | source:media_sec |
| id_store | Identity & Cache DB | database | source:sudo_val |
| cli_gate | Hardened scripe-cli | backend | source:cli_cov |
| fe_login > edge_pipe | Adaptive SSO | emphasis |
| fe_acct > edge_pipe | Logout & Sudo | emphasis |
| edge_pipe > sso_core | Session Check | security |
| edge_pipe > rbac_core | Auth-First | security |
| edge_pipe > media_core | Upload Gate | security |
| sso_core > id_store | IgnoreFilters |
| rbac_core > id_store | Live Grants |
| cli_gate > id_store | Outbox Confirm | dashed |

@steps id=v2-arch-steps
| st_fe_login | Adaptive SSO Login | Renders full-width `[Org]` heroes above concise 2-column `Google` and `Microsoft` slots, and fails closed on `UNKNOWN_999`. | v2-remediation-arch | fe_login |
| st_fe_acct | Account & Store Guard | Calls real `POST /api/v1/auth/admin/logout`, resets `useSudoStore`, clears `usePatOneTimeSecretStore`, and isolates sibling tabs on impersonation. | v2-remediation-arch | fe_acct |
| st_edge | Auth-First Rate & Cookies | Runs `UseCookieAuth` and `UseAuthentication` before rate limiting, and clears `scr_refresh_token`, `scr.oidc.session`, and `scripe_sudo_token` together. | v2-remediation-arch | edge_pipe |
| st_sso | OIDC, SAML & Passkeys | Enforces `EnabledForAdmins`/`EnabledForUsers`, tenant health, SSRF checks, unique `SamlSpEntityId`, and `TwoFactorPendingToken`. | v2-remediation-arch | sso_core |
| st_rbac | RBAC, Scope & Break-Glass | Blocks self-grant `ScopeGrant` (#23) and `TransferProtection` (#27) takeovers while intersecting live grantor permissions on delegations. | v2-remediation-arch | rbac_core |
| st_media | SVG & Quota Shield | Strips SMIL and control-char URIs, checks PNG/file magic bytes, counts active staging bytes in quotas, and applies `sandbox` CSP on `.svg`. | v2-remediation-arch | media_core |
| st_cli | Hardened scripe-cli | Streams `1.37 GB` Cobertura XML in `2.63s`, removes `-v` flag conflicts, moves SQL passwords to `SQLCMDPASSWORD`, and uses `shell: false`. | v2-remediation-arch | cli_gate |

```mermaid title="Security Audit run-2: 36/36 Confirmed Findings Mitigated by Severity (Measured)"
xychart-beta
  x-axis ["Critical", "High", "Medium", "Low"]
  y-axis "Findings" 0 --> 20
  bar "Confirmed (36)" [2, 17, 16, 1]
  bar "Mitigated (36)" [2, 17, 16, 1]
```

Every severity band reached `100%` mitigation (`2 + 17 + 16 + 1 = 36` findings; `0` partial, `0` unfixed, `0` open leads) across `16` coverage ledger units.[](source:audit_report)

## How does Smart Adaptive SSO behave across all 6 tenants, Platform Root, and fail-closed inputs? {#adaptive-sso-matrix}

`SsoProviderButtons` partitions active database providers by `scope === "organization"` versus global scope, strips verbose English prefixes in compact 2-column slots, and localizes full-width hero prefixes via `auth.sso.signInWithProvider`.[](source:fe_sso_btns)

| Tenant / Context | Branding Accent | IdP Mode | Active Providers & Layout Rule | Compact & AR RTL Behavior |
| --- | --- | --- | --- | --- |
| Platform Root (`/login`) {#t-root} | Nexus Signal Lime | Global | 2 global OIDC providers in 2-col grid | Concise `Google` \| `Microsoft` (`0px` clip) {good:2-Col} |
| `AHLY` (`Al-Ahly SC`) {#t-ahly} | `#C4122F` | Inherit + Org | `ahly-okta` `[Org]` hero `col-span-2` + 2-col global | AR hero `تسجيل الدخول عبر Ahly Corporate ID [المنظمة]` {good:Hero + 2-Col} |
| `CITY` (`City Club`) {#t-city} | `#6CABDD` | Inherit | 2 global providers side-by-side | Concise `Google` \| `Microsoft`; subdomain parity |
| `FALCON` (`Falcons`) {#t-falcon} | `#E5A93C` | Custom (Isolated) | 1 custom OIDC hero (`falcon-entra`) full-width | Full-width hero button; global IdPs hidden {good:Custom 1-Org} |
| `APEX` (`Apex Academy`) {#t-apex} | `#0D9488` | Inherit | 2 global providers side-by-side | Concise `Google` \| `Microsoft`; zero colored dots |
| `COMMUNITY` {#t-comm} | `#16A34A` | Inherit | 2 global providers side-by-side | Concise `Google` \| `Microsoft`; dark & light parity |
| `ACFC` (`Arab Contractors`) {#t-acfc} | `#FACC15` | Inherit + SAML | `acfc-saml` `[Org]` SAML 2.0 hero + 2-col global | `<bdi>` Arabic club wrap; `375px` mobile `0px` clip {good:SAML Hero} |
| `UNKNOWN_999` {#t-unk} | Fail-Closed | Rejected | Not Found screen with `0` SSO buttons | Blocks tenant spoofing and Platform fallback {good:Fail-Closed} |

`CredentialsPasswordInput` replaced hardcoded LTR inline styles with logical RTL classes (`ps-4 pe-12 text-start` and `end-1` toggle), `NxThemeSwitcher` syncs `<Sun>`/`<Moon>` via `MutationObserver`, and `ProfileTelemetryHud` keeps all `4` chips on one row at `1440px`.[](source:fe_pwd_in)

## What did Security Audit run-2 mitigate across all 36 findings? {#audit-run2-ledger}

All `36` confirmed findings from `run-2` were independently re-verified in Phase 5 against production code and `45` unique regression test methods (`0` gaps).[](source:audit_report)

| Domain Surface | Findings & Severity | Root Risk Eliminated | Verified Remediation Anchor |
| --- | --- | --- | --- |
| Critical RBAC Ownership {#s-crit} | `#23`, `#27` (`2 Critical`) | Self-granted `all_tenants` `ScopeGrant` and `admins.update` seizing `IsProtected` Super Admin | Caller ownership, non-self-grant, and role-assignability ceilings {good:2/2 Critical} |
| Delegations & Break-Glass {#s-deleg} | `#11`, `#09`, `#13`, `#19`, `#20`, `#21`, `#24`, `#26`, `#28`, `#29` (`6 High, 4 Med`) | Scope/FLS stripping, grantor survival, guardian bypass, RecycleBin & UserGroup escalation | Live grantor intersection, custody ceilings, `!IsDeleted`, `IDataScopeService` {good:10/10 Mitigated} |
| Federated SSO & Passkeys {#s-sso} | `#01`, `#02`, `#03`, `#04`, `#05`, `#15`, `#17`, `#25`, `#30` (`7 High, 2 Med`) | Admin/User IdP cross-use, passkey/OIDC 2FA & tenant-status bypass, SSRF, signup replay | Role flags, tenant health gates, SHA-256 backup codes, atomic OTP nonce {good:9/9 Mitigated} |
| OpenIddict, SAML & Cookies {#s-oidc} | `#14`, `#16`, `#22` (`2 High, 1 Med`) | Surviving 30-min `scr.oidc.session`, cross-tenant `SamlSpEntityId` collision, missing lockout | Cookie deletion on login/logout, tenant-scoped SP lookup, live claim checks {good:3/3 Mitigated} |
| Host Edge & Internal Auth {#s-host} | `#07`, `#08`, `#10`, `#12`, `#18` (`2 High, 3 Med`) | Pre-auth IP rate collapse, unsigned query/body, bulk empty-ID wipe, PAT scope bypass | Auth-first pipeline, 5-part HMAC + nonce, bulk 400 guard, strict PAT scopes {good:5/5 Mitigated} |
| Media & SVG Uploads {#s-media} | `#06`, `#31`, `#32`, `#33` (`3 Med, 1 Low`) | SMIL/whitespace `javascript:` SVG XSS, chunk magic-byte bypass, quota bypass, scoped loss | DTD prohibit + SMIL strip + `.svg` sandbox CSP + staging quota + `IServiceScopeFactory` {good:4/4 Mitigated} |
| Frontend Store Cleanup {#s-fe} | `#34`, `#35`, `#36` (`3 Medium`) | `/account/*` skipping backend logout, stale `scr_tenant_ctx`, cross-user PAT/Sudo leak | Real `POST /logout`, `authBroadcast` Set cleanup, `ownerUserId` PAT guard {good:3/3 Mitigated} |

## How do session-bound Sudo cookies and Frontend sign-out prevent cross-session bleed? {#sudo-session-sequence}

@sequence id=v2-sudo-logout-seq title="Session-Bound scripe_sudo_token & Atomic Sign-Out Cleanup"
| actor spa | Next.js 16 SPA | frontend | source:fe_acct_lay |
| actor stores | Zustand & Broadcast | frontend | source:fe_pat_store |
| actor edge | Cookie & Sudo Gate | security | source:sudo_cookie |
| actor sudo | SudoService | security | source:sudo_val |
| actor cache | Distributed Cache | database | source:sudo_val |
| phase | 1. Session-Bound Sudo Verification |
| spa | edge | Mutation + scripe_sudo_token | emphasis |
| edge | sudo | ValidateCurrentSessionElevation | security |
| sudo | cache | Verify sid/jti Hash + TokenSha256 | security |
| cache | sudo | Match or SudoSessionMismatch | return |
| phase | 2. Sovereign Sign-Out & Cross-Tab Purge |
| spa | stores | Reset Sudo, PAT & AppStore | emphasis |
| spa | edge | POST /api/v1/auth/admin/logout | security |
| edge | cache | Revoke Refresh & Sudo Ticket | security |
| edge | spa | Clear Refresh, OidcSession & Sudo | return |
| stores | spa | Broadcast Logout to Sibling Tabs | dashed |

@steps id=v2-sudo-steps
| sl_val | SudoService | Validates HMAC signature, `AdminId`, and `sid`/`jti` `SessionHash`; if an explicit `X-Sudo-Token` header is present, never falls back to cookie. | v2-sudo-logout-seq | sudo |
| sl_store | Zustand & Broadcast | Clears `useSudoStore`, `usePatOneTimeSecretStore`, `useAppStore`, `scr_tenant_ctx`, and `scr_tenant_breadcrumbs`, then notifies sibling tabs via Set listeners. | v2-sudo-logout-seq | stores |
| sl_edge | Cookie & Sudo Gate | `CookieAuthMiddleware` deletes `scr_refresh_token`, `scr.oidc.session`, and `scripe_sudo_token` together on logout and new SPA session setup. | v2-sudo-logout-seq | edge |

@callout level=note title="Live QA Observation on Sudo Session Mismatch"
| `SudoService.Validation.cs` intentionally rejects stale cross-session Sudo tickets with `403 Identity.SudoSessionMismatch`. Ensure every logout path invokes `ClearSudoCookie` and treat `Identity.SudoSessionMismatch` as a fresh Sudo elevation prompt in the UI. |

## How did scripe-cli evolve to stream 1.37 GB coverage files safely? {#cli-evolution-workflow}

@workflow id=v2-cli-workflow title="Hardened scripe-cli Streaming Coverage & Command Safety"
| lane parse | Streaming Parser |
| lane harden | Command Safety |
| scan | Find 26 XML Files | backend | parse | source:cli_cov |
| chunk | 4 MB Chunk Stream | backend | parse | source:cli_cov |
| dedup | Max-Hits Map | backend | parse | source:cli_cov |
| flags | Safe Flags & Env | security | harden | source:cli_cov |
| exec_safe | shell:false Spawn | security | harden | source:cli_cov |
| purge_gate | Outbox Confirm? | security | harden | source:cli_cov |
| scan > chunk | <= 512 MB | emphasis |
| chunk > dedup | <= 32 MB carry | emphasis |
| flags > exec_safe | no -v clash | security |
| exec_safe > purge_gate | --confirm | security |

@steps id=v2-cli-steps
| wc_chunk | 4 MB Chunk Stream | Replaces `readFileSync` (`50 MB` crash) with `openSync`/`readSync`/`closeSync` + `StringDecoder("utf8")`, scanning `1.37 GB` across `26` files in `2.63s` (`59.9 MB` heap). | v2-cli-workflow | chunk |
| wc_dedup | Max-Hits Map | Extracts complete `<class>...</class>` blocks across chunk boundaries and computes `Math.max` per `(className, lineNumber)` without backtracking regexes. | v2-cli-workflow | dedup |
| wc_flags | Safe Flags & Env | Removes the global `-v` shorthand collision with subcommands and passes SQL Server credentials through `SQLCMDPASSWORD` instead of CLI argv. | v2-cli-workflow | flags |
| wc_exec | shell:false Spawn | Replaces shell-interpolated strings with `shell: false` argument arrays, path-confined undo journals, and strict regex validation on `rebrand`. | v2-cli-workflow | exec_safe |
| wc_purge | Outbox Confirm? | Enforces fail-closed `scripe db outbox purge --confirm` so destructive Tier 4 purges cannot run implicitly. | v2-cli-workflow | purge_gate |

@facts
| Real Disk Cobertura Benchmark | `26` files (`1.37 GB` total, `130.3 MB` max) parsed in `2,630.64 ms` (`59.9 MB` heap, `2,851` classes) |
| Coverage Parser Ceilings | `512 MB` max file size (`MAX_COBERTURA_FILE_BYTES`) and `32 MB` unclosed carry-over guard |
| CLI Hardening Test Suite | `20/20` targeted coverage + security tests passing (`0` build errors in `scripe-cli`) |

## Which quality gates and visual UAT checks verified this milestone? {#verified-quality-gates}

All backend, architectural, CLI, live browser, and executive UX visual gates passed with zero remaining defects.[](source:agents_const)

| Verification Gate | Measured Result | Scope Verified | Status |
| --- | --- | --- | --- |
| Backend Security & Unit Tests {#g-be} | `1,926` passed (`359 + 127 + 539 + 901`) | `Entitlements`, `Media`, `API.UnitTests`, `Identity.Application.Tests` | {good:1,926 / 1,926} |
| `scripe arch-check` {#g-arch} | `96 / 100` (`0` errors) | Clean Architecture, module isolation, MVVM & file-size gates | {good:96 / 100} |
| `scripe astraflow validate` {#g-af} | `ok` (`0` findings) | AstraFlow 2.4.7 mediator, mapping & conventions integrity | {good:OK} |
| `scripe check --quick` {#g-quick} | `5 / 5` gates passing | Lint, format, build, locales (`19,312` keys), and quick checks | {good:5 / 5} |
| Live Unmocked Playwright V2 {#g-pw} | `6 / 6` specs, `21` full-res PNGs | All `6` tenants + Root + `UNKNOWN_999`, Light/Dark, AR RTL, `375px` mobile, WebAuthn Passkey, PBAC | {good:6 / 6 · 0 5xx} |
| `ux-expert-v4` Visual Audit {#g-ux} | `PASS` across all `21` PNGs | Zero SSO label clipping, AR RTL parity, `<bdi>` wrap, `<Sun>`/`<Moon>` sync, 1-row HUD | {good:PASS} |

- [ ] Confirm `36/36` findings remain `mitigated` with `0` regressions on `Identity.Application.Tests` (`901`) and `API.UnitTests` (`539`).
- [ ] Confirm `/login` renders concise 2-column `Google` / `Microsoft` labels with `scrollWidth <= clientWidth + 2` at `1440px` and `375px`.
- [ ] Confirm `scripe_sudo_token`, `scr.oidc.session`, and `scr_refresh_token` clear on logout and `usePatOneTimeSecretStore` filters by `ownerUserId`.
- [ ] Confirm `scripe check --quick`, `scripe arch-check`, `scripe astraflow validate`, and `scripe build docs` exit with `0` errors.
