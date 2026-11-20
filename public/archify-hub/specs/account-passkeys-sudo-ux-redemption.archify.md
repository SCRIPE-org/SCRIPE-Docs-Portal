# How were SCRIPE passkeys, Sudo Mode, Account UX, and Quotas fixed? {#account-passkeys-sudo-redemption}

Adopting polymorphic `Fido2NetLib`, cookie-backed 15m Sudo, `mcp=true` first-login, principal separation, and entitlement-gated quotas resolved every Track 1–4 and Milestone 9 failure.[](source:passkey_req)[](source:crypto_svc)

- `Fido2NetLib` replaces hand-rolled ECDSA crypto with array `Transports`, `IDistributedCache` ceremonies, encrypted string delete/rename IDs, and safe sole-passkey removal.[](source:passkey_req)[](source:crypto_svc)[](source:passkey_ctrl)
- `SudoService` persists `scripe_sudo_token` across reloads via `HttpOnly` cookie, avoids empty-factor deadlocks, and `ForceChangePasswordView` updates tokens in one step.[](source:sudo_behavior)[](source:force_pw)
- Principal context separates `PlatformAdmin` from `TenantUser`, removes static club mocks, queues preferences against `RowVersion` races, and renders per-card skeletons.[](source:gov_view)[](source:pref_view)
- Feature/quota plumbing uses real `Edition` and `TenantFeatureOverride` keys (`ApiKey` `QuotaCounter`), `.IgnoreQueryFilters()`, post-commit `FeatureCache` eviction, and zero-phantom UI gating.[](source:int_view)

@answer scope="Tracks 1–4 + Milestone 9 · Verified E2E"
@meta locale=en style=editorial quality_profile=showcase
@source passkey_req title="CompletePasskeyRegistrationRequest DTO (string[] Transports)" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/DTOs/Auth/CompletePasskeyRegistrationRequest.cs
@source crypto_svc title="Fido2WebAuthnService Fido2NetLib implementation" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/Fido2WebAuthnService.Crypto.cs
@source passkey_ctrl title="PasskeyController encrypted string ID routes" path=SCRIPE-Backend/src/Host/API/Controllers/Auth/PasskeyController.cs
@source sudo_behavior title="SovereignAccountSecurityBehavior AstraFlow pipeline" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Behaviors/SovereignAccountSecurityBehavior.cs
@source security_view title="AccountSecurityView Passkey Vault and Standalone 2FA" path=SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountSecurityView.tsx
@source sudo_gate title="Account layout shell and sidebar feature gating" path=SCRIPE-Frontend/src/app/(account)/account/layout.tsx
@source gov_view title="AccountGovernanceView delegation modal and feature gate" path=SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountGovernanceView.tsx
@source pref_view title="AccountPreferencesView FIFO RowVersion save queue" path=SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountPreferencesView.tsx
@source int_view title="AccountIntegrationsView PAT quota and telemetry gate" path=SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountIntegrationsView.tsx
@source pat_studio_view title="PatCreatePageView full-canvas PAT creation and blast-radius rail" path=SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/PatCreatePageView.tsx
@source pat_detail_view title="PatDetailPageView token inspection, policy update, and SDK quick-start" path=SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/PatDetailPageView.tsx
@source pat_scope_helper title="AccountScopePolicyHelper bilingual NameEn/NameAr scope catalog builder" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Services/AccountScopePolicyHelper.cs
@source force_pw title="ForceChangePasswordView MMC-parity onboarding" path=SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/ForceChangePasswordView.tsx

## How do polymorphic Fido2NetLib passkeys and Unified Sudo connect? {#polymorphic-security-topology}

One `Fido2NetLib` service backed by `IDistributedCache` replaces custom WebAuthn parsing for both Platform Admins and Tenant Users.[](source:crypto_svc)[](source:sudo_behavior)

@architecture id=security-control-arch title="Polymorphic Passkeys, Adaptive Sudo & Principal Separation"
| ui_shell | Account Persistent Shell | frontend | source:sudo_gate |
| sudo_modal | Sudo Verification Modal | security | source:security_view |
| ctx_guard | Principal Context Guard | frontend | source:gov_view |
| api_gate | Identity Controllers | backend | source:passkey_ctrl |
| astra_pipe | Sudo Security Behavior | security | source:sudo_behavior |
| fido_svc | Fido2NetLib Service | security | source:crypto_svc |
| chal_cache | Distributed Challenge Cache | database |
| pk_store | Passkey Credential Table | database | source:passkey_ctrl |
| ui_shell > sudo_modal | Step-up gate | security |
| ui_shell > ctx_guard | Scope tabs |
| ui_shell > api_gate | X-Sudo-Token | security |
| api_gate > astra_pipe | Validate policy | security |
| astra_pipe > fido_svc | Verify assertion | security |
| fido_svc > chal_cache | Consume nonce |
| fido_svc > pk_store | Load key | default |

@steps id=arch-steps
| step_fido | Fido2NetLib Service | Parses ES256 DER, EdDSA, RS256, and hardware AAGUIDs cleanly across all authenticators. | security-control-arch | fido_svc |
| step_poly | Passkey Credential Table | Stores keys for both `PlatformAdmin` and `TenantUser` principals with strict `TenantId` isolation. | security-control-arch | pk_store |
| step_sudo | Sudo Security Behavior | Validates cryptographic 15-minute `X-Sudo-Token` values before allowing destructive Identity commands. | security-control-arch | astra_pipe |
| step_ctx | Principal Context Guard | Shows `Global Control Plane` and Platform scopes to SuperAdmin while keeping `/account/plan` tenant-only. | security-control-arch | ctx_guard |

## How do first-login password change and Sudo step-up execute? {#sudo-and-firstlogin-flow}

Users on `mcp=true` finish password setup in one step, while sensitive mutations trigger adaptive Sudo step-up on demand.[](source:force_pw)[](source:passkey_ctrl)

@sequence id=sudo-fcp-sequence title="MMC-Parity First-Login & On-Demand Sudo Flow"
| actor user | User Browser | frontend |
| actor guard | Middleware & API | security |
| actor fido | Fido2 & Cache | backend |
| actor db | Multi-DB Store | database |
| phase | First-login mandatory password change (mcp=true) |
| user | guard | Login returns JWT (mcp=true) |
| guard | user | Route to /change-password | security |
| user | guard | Submit New + Confirm Password | emphasis |
| guard | db | Hash password, keep session |
| guard | user | Refresh JWT (mcp cleared) | return |
| phase | On-demand 15m Sudo elevation |
| user | guard | Delete passkey (no token) |
| guard | user | Require SudoVerificationModal | return |
| user | fido | Verify Passkey, TOTP, or password | security |
| fido | user | Issue 15m X-Sudo-Token | return |
| user | db | Delete encrypted passkey ID | emphasis |

@steps id=seq-steps
| seq_mcp | Middleware & API | Blocks business endpoints on `mcp=true` except password completion, profile, refresh, and logout routes. | sudo-fcp-sequence | guard |
| seq_sudo | Fido2 & Cache | Falls back from Passkey to TOTP 2FA or current password so accounts without hardware keys stay unblocked. | sudo-fcp-sequence | fido |
| seq_delete | Multi-DB Store | Decrypts string passkey IDs inside the handler and enforces the last-credential lockout guard before deletion. | sudo-fcp-sequence | db |

## What fails today vs what changes across all four tracks? {#root-cause-comparison}

Comparing current code behavior against the locked design highlights every protocol, tenancy, and UX correction.[](source:passkey_req)[](source:pref_view)

| Area | Current Behavior | Locked Target Design |
| --- | --- | --- |
| Passkey registration | Sends `string[]`, server expects `string?` {bad:HTTP 400} | `Fido2NetLib` + 3 enrollment modes {good:RFC compliant} |
| Signature verification | P1363 ECDSA mismatch rejects DER keys {bad:100% failure} | `IFido2.MakeAssertionAsync` for ES256, EdDSA, RS256 {good:Hardware verified} |
| Passkey rename & delete | String ID fails `Guid` binding, SuperAdmin password delete blocked {bad:Failure / 422} | Decrypt string ID, confirm modal, allow removal with password when `!Require2FA` {good:Guarded lifecycle} |
| Sudo step-up & reload | Fake gate, JS-only token lost on reload, empty `[]` on factorless SuperAdmin {bad:403 deadlock} | Adaptive modal (`Passkey -> TOTP -> Password`), `scripe_sudo_token` cookie, standard fallback {good:15m real Sudo} |
| First-login password | Asks current password again, forces logout {bad:Double login} | New + Confirm only, refreshes JWT inline {good:MMC parity} |
| SuperAdmin vs Tenant | Hardcoded `al-ahly.org` and `CRM` mocks {bad:Context leak} | `Global Control Plane` badge, Platform PAT scopes, hidden `/account/plan` {good:Strict separation} |
| Preferences saving | Auto-save races manual button `RowVersion` {bad:409 Conflict} | Sequential queue chaining latest `rowVersion` {good:Zero conflicts} |
| Governance & PATs | Crushed `colle` input, wrong `actionType` (`CreateDelegation`), static telemetry {bad:400 / mock telemetry} | Modal delegation (`DelegateAuthority` + `targetAdminId`), live RPM/PAT telemetry {good:Real telemetry} |
| Features & Quotas | Broken quota keys (`Identity.MaxAdmins`), phantom disabled cards, stale `FeatureCache` {bad:Wrong limits} | Real `MaxPerTenant` keys, `.IgnoreQueryFilters()` overrides, post-commit cache clear, hidden disabled UI {good:Fail-closed sync} |
| Loading states | Flash fallbacks and plain text loaders {caution:Layout jump} | Persistent shell + per-card `@core/ui/skeleton` {good:Zero jank} |

## How do the four implementation tracks sequence safely? {#phased-delivery-plan}

Each vertical track delivers testable backend, database, and UI scope while honoring SCRIPE CLI verification gates.[](source:passkey_ctrl)[](source:int_view)

@workflow id=delivery-tracks-flow title="Four-Track Delivery Pipeline"
| lane core | Security & Context Foundation |
| lane console | Page Redesign & Visual Polish |
| track1 | Track 1 Auth | security | core |
| track2 | Track 2 Context | backend | core |
| track3 | Track 3 Page UX | frontend | console |
| track4 | Track 4 Skeletons | frontend | console |
| track1 > track2 | | security |
| track2 > track3 | | default |
| track3 > track4 | | emphasis |

@steps id=wf-steps
| wf_track1 | Track 1 Auth | Replace WebAuthn service, migrate polymorphic passkeys, unify Sudo step-up, and ship MMC-style first-login flow. | delivery-tracks-flow | track1 |
| wf_track2 | Track 2 Context | Emit `AccountPrincipalContext`, swap branch picker for Control Plane badge, hide `/account/plan` for SuperAdmin. | delivery-tracks-flow | track2 |
| wf_track3 | Track 3 Page UX | Rebuild Delegation, Break-Glass, PAT Console, Preferences sequential save, `(i)` popovers, and bilingual locales. | delivery-tracks-flow | track3 |
| wf_track4 | Track 4 Skeletons | Keep Left Rail and Telemetry HUD mounted across navigation with exact-anatomy Nexus skeletons per card. | delivery-tracks-flow | track4 |

## How does SCRIPE's PAT Studio improve on GitHub Fine-Grained PATs? {#pat-studio-ux-comparison}

Sending full bilingual `NameEn`, `NameAr`, `DescriptionEn`, `DescriptionAr`, `Category`, `Resource`, and `Action` metadata lets `/account/integrations/new` and `/account/integrations/[id]` surpass GitHub's pattern without sacrificing mobile ergonomics.[](source:pat_scope_helper)[](source:pat_studio_view)[](source:pat_detail_view)

| Capability | Legacy 580px Modal | GitHub Fine-Grained | SCRIPE PAT Studio |
| --- | --- | --- | --- |
| Creation & detail layout | Cramped 580px dialog {bad:Clipped} | Dedicated full page | Dedicated canvas plus sticky blast-radius rail {good:Full context} |
| Primary scope label | Raw snake/dot machine key | English resource noun only | Active locale `NameEn` or `NameAr` {good:Bilingual} |
| Scope description placement | Omitted | Inline muted line only | Inline caption plus HoverCard and tap Popover {good:Touch safe} |
| Technical key visibility | Always shown inline | Hidden in static form | Opt-in switch plus 1-click copy in inspector {good:Noise free} |
| Post-issue editing | Delete or roll only | Edit scopes on token page | Live `PUT` policy edit with `RowVersion` check {good:Optimistic locking} |

## Which end-to-end delivery gates were verified? {#design-verification-checklist}

All four blueprint tracks, Milestone 9 Quotas, and the GitHub+ PAT Studio passed build, architecture, and unmocked browser verification.[](source:security_view)[](source:pat_studio_view)

- [x] Track 1: `Fido2NetLib` passkey enrollment, login, rename, delete, `HttpOnly` cookie Sudo survival across reload, and `mcp=true` one-step setup passed Chromium WebAuthn E2E.
- [x] Track 2 & 3: Principal context isolation (`PlatformAdmin` vs Enterprise, Pro, Starter tenants), `DelegateAuthority` + Break-Glass non-escalation, PAT one-time secrets, and FIFO Preferences queue (`0` `409`s).
- [x] Track 4 & Architecture: Strict 5-layer MVVM (`shared/profile = 100/100`), `@core/ui/skeleton` shimmer (`9/9` routes), `1440x900`/`768x1024`/`390x844` Light/Dark EN/AR RTL, `scripe validate-locales` (`0` errors).
- [x] Milestone 9 & PAT Studio: Real `MaxPerTenant` keys, `.IgnoreQueryFilters()` overrides, bilingual PAT scopes on `/account/integrations/new` and `[id]`, and hidden disabled UI passed `14/14` Chromium E2E tests.
