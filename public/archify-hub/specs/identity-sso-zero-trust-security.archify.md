# How does SCRIPE enforce zero-trust Multi-Tenant Identity, Federated SSO, Hybrid MFA, and runtime security? {#identity-sso-zero-trust-security}

SCRIPE eliminates pre-auth filter leaks, unverified SSO linking, and dead security tables by enforcing cryptographic proofs, encrypted IDs, and live middleware checks across **every tenant and module**.[](source:sec_rules)

- Pre-auth and cross-tenant lookups bypass ambient tenant filters safely with explicit `!IsDeleted`, lockout, and tenant-status checks.[](source:oidc_ctrl)
- External IDs resolve exclusively through `EncryptedGuidModelBinder` or `_idEncryption.TryDecrypt`, failing closed (`422`/`404`) instead of falling back to Platform scope.[](source:enc_binder)
- Apple, Microsoft, Google, OIDC, OAuth2, and SAML verify signatures, `sub`, and `email_verified` before `HybridMfaPolicy` issues a single-use `TwoFactorPendingToken`.[](source:hybrid_mfa)
- `PersonalAccessTokenAuthenticationHandler`, `ApiKeyUsageMiddleware`, `AdminPermissionCache`, and `TrustedCidrEnforcementMiddleware` enforce PATs, API keys, delegations, and CIDRs live.[](source:cidr_mw)

@answer scope="SCRIPE Identity · SSO · Hybrid MFA · Runtime"
@meta locale=en style=editorial quality_profile=showcase
@source sec_rules title="SCRIPE Security & Infrastructure Invariants" path=.agents/rules/security-and-infrastructure.md
@source enc_binder title="EncryptedGuidModelBinder Fail-Closed Decoder" path=SCRIPE-Backend/src/Host/API/Extensions/EncryptedGuidModelBinder.cs
@source oidc_ctrl title="OidcClientController & Server-Side State Tickets" path=SCRIPE-Backend/src/Host/API/Controllers/Auth/OidcClientController.cs
@source oidc_svc title="OidcClientService OIDC & Pure OAuth2 Verification" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/OidcClientService.cs
@source saml_svc title="SamlClientService & SamlServerService X.509 Validation" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/SamlClientService.cs
@source ext_auth title="ExternalAuthService Apple JWKS & Microsoft v2.0 Validation" path=SCRIPE-Backend/src/Modules/Identity/Identity.Infrastructure/Services/ExternalAuthService.cs
@source hybrid_mfa title="HybridMfaPolicy & TwoFactorPendingTicketService" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Abstractions/HybridMfaPolicy.cs
@source oidc_srv title="OidcServerController Consent Deny & Live Token Validation" path=SCRIPE-Backend/src/Host/API/Controllers/Auth/OidcServerController.cs
@source tenant_idp title="PlatformTenantIdentityProvidersController Tenant-Scoped IdP CRUD" path=SCRIPE-Backend/src/Host/API/Controllers/Identity/PlatformTenantIdentityProvidersController.cs
@source pat_auth title="PersonalAccessTokenAuthenticationHandler & Authenticator" path=SCRIPE-Backend/src/Core/Core.Infrastructure/Authentication/PersonalAccessTokenAuthenticationHandler.cs
@source pbac_hdl title="PermissionAuthorizationHandler PAT Scope & Delegation Gate" path=SCRIPE-Backend/src/Core/Core.Application/Authorization/PermissionAuthorizationHandler.cs
@source apikey_mw title="ApiKeyUsageMiddleware SHA-256, Whitelist & Rate Limit" path=SCRIPE-Backend/src/Host/API/Middleware/ApiKeyUsageMiddleware.cs
@source cidr_mw title="TrustedCidrEnforcementMiddleware Global Post-Auth CIDR Gate" path=SCRIPE-Backend/src/Host/API/Middleware/TrustedCidrEnforcementMiddleware.cs
@source fe_login title="LoginView & SsoCallbackContent Sign-In Flow" path=SCRIPE-Frontend/src/modules/shared/auth/signin/src/presentation/views/LoginView.tsx
@source fe_acct title="AccountSecurityView Live SSO Discovery & Sudo Console" path=SCRIPE-Frontend/src/modules/shared/profile/core/src/presentation/views/AccountSecurityView.tsx
@source fe_idp title="IdentityProvidersView & TenantIdentityProvidersTab Admin UI" path=SCRIPE-Frontend/src/modules/admin/identity/identity-providers/src/presentation/views/IdentityProvidersView.tsx

## How do SCRIPE's Identity Provider, Federated SSO, and Runtime Guards connect? {#zero-trust-topology}

@architecture id=identity-zero-trust-arch title="Multi-Tenant Identity, Federated SSO & Runtime Enforcement Topology"
| fe_login | Login & SSO UI | frontend | source:fe_acct |
| fe_console | Account & IdP UI | frontend | source:fe_idp |
| edge_mw | Auth, PAT & CIDR Gate | security | source:cidr_mw |
| sso_eng | OIDC, OAuth2 & SAML | backend | source:oidc_svc |
| state_mfa | State & 2FA Tickets | security | source:hybrid_mfa |
| pbac_gate | PBAC & Delegation | security | source:pbac_hdl |
| id_db | Identity Schema DB | database | source:tenant_idp |
| int_db | Integrations Schema DB | database | source:apikey_mw |
| fe_login > edge_mw | Encrypted IDs | emphasis |
| fe_console > edge_mw | Sudo + RowVersion | emphasis |
| edge_mw > sso_eng | Verify Proofs | security |
| edge_mw > pbac_gate | PAT & API Key | security |
| sso_eng > state_mfa | Nonce & 2FA | security |
| sso_eng > id_db | IgnoreFilters |
| pbac_gate > id_db | Live Grants |
| edge_mw > int_db | X-API-Key Log |

@steps id=identity-arch-steps
| st_login | Login & SSO UI | Discovers active tenant or platform IdPs via `GET /api/v1/auth/oidc/providers/admin` and runs `/sso/callback` and passwordless 2FA step-up. | identity-zero-trust-arch | fe_login |
| st_console | Account & IdP UI | Renders live `availableSsoProviders`, enforces Sudo for linking/passkeys, and edits IdPs with `RowVersion` concurrency on `/settings/identity-providers` and `/tenants/[id]`. | identity-zero-trust-arch | fe_console |
| st_edge | Auth, PAT & CIDR Gate | Runs `PersonalAccessTokenAuthenticationHandler`, `ApiKeyUsageMiddleware`, `CookieAuthMiddleware`, and `TrustedCidrEnforcementMiddleware` across all modules. | identity-zero-trust-arch | edge_mw |
| st_sso | OIDC, OAuth2 & SAML | Validates JWKS ID tokens, pure OAuth2 GitHub emails, and X.509 SAML assertions without mutating shared `HttpClient` headers. | identity-zero-trust-arch | sso_eng |
| st_mfa | State & 2FA Tickets | Stores single-use `IExternalAuthStateStore` login/link tickets and 5-minute `TwoFactorPendingToken` challenges in `IDistributedCache`. | identity-zero-trust-arch | state_mfa |
| st_pbac | PBAC & Delegation | Intersects `pat_scope` claims without `SystemProtected` bypass and unions active `AdminDelegation` permissions via `AdminPermissionCache`. | identity-zero-trust-arch | pbac_gate |

Every authentication and authorization boundary enforces four non-negotiable invariants across `SCRIPE-Backend` and `SCRIPE-Frontend`.[](source:sec_rules)

| Invariant Law | Defect Eliminated | Verified Enforcement Site | Status |
| --- | --- | --- | --- |
| Pre-Auth `.IgnoreQueryFilters()` {#law-qfilter} | Anonymous callbacks missed tenant admins when `_currentTenant.Id` was `null` | `AdminRepository`, `UserRepository`, `QrLoginSessionRepository`, `IdentityProviderRepository` | {good:Enforced} |
| Encrypted ID Fail-Closed {#law-encid} | `Guid.TryParse` or silent `null` fallback shifted malformed tenant IDs into Platform scope | `EncryptedGuidModelBinder`, `CompleteOidcWorkspaceSelectionCommandHandler`, `PlatformTenantIdentityProvidersController` | {good:422 / 404} |
| Federated Cryptographic Proof {#law-crypto} | Raw Base64 Apple decode, stripped `sub` claim, client-supplied email link takeover | `ExternalAuthService`, `OidcClientService`, `SamlClientService`, `HybridMfaPolicy` | {good:JWKS + X.509} |
| Zero Mock & Zero Dead Tables {#law-live} | Hardcoded SSO lists and un-enforced PAT, CIDR, delegation, or `IsActive` tables | `PersonalAccessTokenAuthenticator`, `ApiKeyUsageMiddleware`, `TrustedCidrEnforcementMiddleware`, `AdminPermissionCache` | {good:100% Live} |

## How do OIDC, OAuth2, SAML, and Hybrid MFA block account takeover? {#federated-sso-hybrid-mfa}

@sequence id=sso-hybrid-mfa-seq title="Federated SSO Callback, Subject-First Binding & Hybrid MFA Step-Up"
| actor spa | Next.js 16 SPA | frontend | source:fe_login |
| actor api | Auth Controllers | backend | source:oidc_ctrl |
| actor idp | External IdP | external | source:ext_auth |
| actor store | State & 2FA Cache | security | source:hybrid_mfa |
| actor db | Identity DB | database | source:oidc_svc |
| phase | 1. Challenge & Server-Side State Ticket |
| spa | api | Initiate Login or Sudo Link | emphasis |
| api | store | Save State, Nonce, PKCE & Purpose | security |
| api | spa | Redirect URL (Allowlisted Origin) | return |
| spa | idp | Authenticate at External IdP |
| idp | spa | Callback Code or SAML Assertion | return |
| phase | 2. Cryptographic Verification & Subject-First Lookup |
| spa | api | POST Callback (Code + State) | emphasis |
| api | store | Consume Single-Use State Ticket | security |
| api | idp | Verify JWKS Signature or X.509 Cert | security |
| api | db | Lookup (ProviderId, sub) First |
| db | api | Admin + Tenant + Lockout Status | return |
| phase | 3. Hybrid MFA Evaluation & Session Issuance |
| api | store | Issue 5-Min TwoFactorPendingToken | security |
| api | spa | 200 Requires2FA (Empty Tokens) | return |
| spa | api | POST /2fa/verify (TOTP + Ticket) | emphasis |
| api | spa | Access JWT + HttpOnly Refresh Cookie | return |

@steps id=sso-mfa-steps
| sm_ticket | State & 2FA Cache | Consumes `state`, `nonce`, PKCE `codeVerifier`, and `purpose` (`login` or `link`) once from `IDistributedCache`. | sso-hybrid-mfa-seq | store |
| sm_idp | External IdP | Verifies issuer JWKS with `MapInboundClaims = false` or mandatory X.509 cert with `AllowedAudienceUris` and `InResponseTo`. | sso-hybrid-mfa-seq | idp |
| sm_db | Identity DB | Matches `(IdentityProviderId, ProviderKey)` first, rejects subject-swap (`sso.subjectMismatch`), and auto-links only if `EmailVerified` is true. | sso-hybrid-mfa-seq | db |
| sm_api | Auth Controllers | Checks `HybridMfaPolicy.RequiresSecondFactor` and withholds tokens until `POST /api/v1/auth/{admin\|user}/2fa/verify` redeems the ticket. | sso-hybrid-mfa-seq | api |

Login updates run through `UpdateLastLoginAtAsync` (`ExecuteUpdateAsync`) so synthetic role graphs never trigger EF Core tracking collisions.[](source:oidc_svc)

| Auth Flow | Cryptographic Proof | Account Binding & Lockout Guard | Hybrid MFA & Session Delivery |
| --- | --- | --- | --- |
| Enterprise OIDC {#flow-oidc} | `JsonWebTokenHandler` JWKS, `MapInboundClaims = false`, Entra `{tenantid}` | `(ProviderId, sub)` first; `email_verified` auto-link; `LockoutEnd` check | `TrustIdpMfa` or `amr`/`acr` skips 2FA; else `TwoFactorPendingToken` {good:Hybrid MFA} |
| Pure OAuth2 (GitHub) {#flow-oauth2} | Explicit endpoints + PKCE + `ClaimMappingJson` + `/user/emails` primary verified | `(ProviderId, sub)` first; blocks subject swap (`sso.subjectMismatch`) | Same `HybridMfaPolicy` gate; `CookieAuthMiddleware` moves refresh to cookie |
| SAML 2.0 SP & IdP {#flow-saml} | `SamlCertificateHelper` PEM strip + mandatory IdP cert + `InResponseTo` | Tenant-scoped `GetByEmailAsync`; `OidcSession` cookie on IdP Server | `AuthnContextClassRef` MFA classifier; `TwoFactorPendingToken` on step-up |
| Social (Apple / MS / FB) {#flow-social} | Apple JWKS, Entra v2.0 ID token `{tid}:{oid}`, Facebook `debug_token` `app_id` | Per-request `HttpRequestMessage`; `xms_edov`/`email_verified` only | `IssueForUserAsync` issues user 2FA ticket; rejects admin tickets {good:Isolated} |
| Magic Link / OTP / QR {#flow-pwless} | Atomic single-use token consume; QR `Approved -> Consumed` exactly once | Encrypted `tenantId` `422` on bad decode; cross-tenant QR returns `403` | Magic Link & OTP use `PasswordlessSessionIssuer`; QR stores zero tokens at rest |
| OIDC Server Consent {#flow-consent} | OpenIddict validates `client_id` & `redirect_uri` + `consent_ticket` | `decision=deny` uses OpenIddict `Forbid` (`access_denied`); no SPA redirect | `/connect/token` re-checks live user, lockout, tenant, and `OAuthApplication.IsActive` |

## How do Sudo-gated Account Security and Tenant IdP administration eliminate mock catalogs? {#sudo-account-console}

@workflow id=sudo-link-workflow title="Sudo-Gated Federated Linking & Sole-Auth Guard"
| lane elev_lane | Sudo Elevation |
| lane bind_lane | Link & Unlink |
| acct_view | Account UI | frontend | elev_lane | source:fe_acct |
| sudo_gate | Sudo Valid? | security | elev_lane | source:oidc_ctrl |
| sudo_step | Verify Sudo | security | elev_lane | source:fe_acct |
| init_link | Link Ticket | backend | bind_lane | source:oidc_ctrl |
| idp_cb | Link Admin | security | bind_lane | source:saml_svc |
| sole_chk | Sole-Auth Guard | security | bind_lane | source:tenant_idp |
| acct_view > sudo_gate | link | emphasis |
| sudo_gate > sudo_step | no | security |
| sudo_gate > init_link | yes | emphasis |
| init_link > idp_cb | callback | security |
| idp_cb > sole_chk | unlink |

@steps id=sudo-link-steps
| sl_acct | Account UI | Loads real `availableSsoProviders` from `GET /api/v1/account/security` honoring `inherit` or `custom` mode and slug shadowing. | sudo-link-workflow | acct_view |
| sl_sudo | Sudo Valid? | Requires fresh `X-Sudo-Token` or HttpOnly Sudo cookie on `initiate-link`, `DELETE` unlink, and passkey registration. | sudo-link-workflow | sudo_gate |
| sl_init | Link Ticket | Binds `purpose = "link"` and `linkAdminId` inside `IExternalAuthStateStore`; legacy direct `/external-logins/link` returns `410 Gone`. | sudo-link-workflow | init_link |
| sl_cb | Link Admin | OIDC returns `{ linked: true }` without tokens; SAML 302-redirects to `/sso/saml/callback?linked=1`. | sudo-link-workflow | idp_cb |
| sl_sole | Sole-Auth Guard | Rejects `DELETE` unlink with `422` when removing the admin or user's last remaining authentication method. | sudo-link-workflow | sole_chk |

Both Platform Admins (`/tenants/[id]` via `PlatformTenantIdentityProvidersController`) and Tenant Admins (`/settings/identity-providers`) manage active IdPs with `IsActive`, `TrustIdpMfa`, `RowVersion` optimistic concurrency (`409` refresh), and detailed `test-connection` diagnostics.[](source:fe_idp)

| Surface | Previous Gap | Repaired Contract & UX | Guardrail |
| --- | --- | --- | --- |
| `/account/security` SSO {#ux-acct} | Hardcoded catalog; hidden for Platform Admin when `externalLogins == 0` | Live `availableSsoProviders` from DB with `OrphanedExternalLoginTile` fallback | {good:Zero Mocks} |
| Direct External Link {#ux-link} | Client sent arbitrary email and `ProviderKey` to link | Legacy endpoint returns `410 Gone`; replaced by Sudo `initiate-link` handshake | {good:410 Gone} |
| `/tenants/[id]` IdP Tab {#ux-tidp} | Platform Admins could not inspect or manage tenant IdPs | `[PlatformAdminOnly]` `/api/v1/tenants/{tenantId}/identity-providers` + `TenantIdentityProvidersTab` | {good:Tenant-Scoped} |
| `/settings/identity-providers` {#ux-idp} | Missing `isActive` toggle, `trustIdpMfa`, `rowVersion`, and GitHub OAuth2 URLs | Optimistic `isActive` toggle, `trustIdpMfa` switch, `RowVersion`, live test diagnostics | {good:409 Safe} |
| CIDR Allowlist Form {#ux-cidr} | Admins risked locking themselves out with blind CIDR edits | `currentClientIp` `/32` quick-add helper plus backend anti-lockout validation | {good:Anti-Lockout} |

## How are PATs, API Keys, Delegations, and Global CIDR enforced on every request? {#runtime-security-enforcement}

Every security table in `Identity` and `Integrations` now executes on the live ASP.NET Core request pipeline rather than sitting as passive metadata.[](source:pat_auth)

| Security Construct | Live Enforcement Component | Runtime Checks Executed | Failure Mode |
| --- | --- | --- | --- |
| PAT (`scr_pat_...`) {#rt-pat} | `PersonalAccessTokenAuthenticationHandler` + `PersonalAccessTokenAuthenticator` + `PermissionAuthorizationHandler` | SHA-256 hash lookup (`.IgnoreQueryFilters()`), expiry, revocation, owner lockout, tenant status, PAT CIDR allowlist, and `pat_scope` intersection without `SystemProtected` bypass | {good:401 / 403} |
| API Key (`X-API-Key`) {#rt-apikey} | `ApiKeyUsageMiddleware` | SHA-256 hash lookup (`.IgnoreQueryFilters()`), `IsCurrentlyActive`, `IpWhitelist`, per-minute + burst Redis rate limit, and `ApiKeyUsageLogs` write | {good:401 / 403 / 429} |
| `AdminDelegation` {#rt-deleg} | `AdminPermissionCache` + `RevokeAccountDelegationCommandHandler` | Unions active, unrevoked, unexpired delegated permissions into live evaluation and evicts cache immediately on revoke | {good:Live & Revocable} |
| Global Admin CIDR {#rt-cidr} | `TrustedCidrEnforcementMiddleware` | Evaluates `AdminSecurityProfile.AllowedCidrsJson` post-authentication across **every module** (Identity, Venue, Academy, CRM, Finance, HRMS) | {good:403 Global} |
| `IdentityProvider.IsActive` {#rt-idp} | `IdentityProviderRepository` + OIDC/SAML Challenge & Callback Handlers | Excludes inactive providers from discovery, rejects inactive challenges, and feeds `TrustIdpMfa` into `HybridMfaPolicy` | {good:404 / Rejected} |

## What invariants must every Identity and Security change verify? {#verification-checklist}

- [ ] Verify every pre-auth and cross-tenant query uses `.IgnoreQueryFilters()` with explicit `!IsDeleted`, tenant, active, and lockout checks.
- [ ] Verify zero `Guid.TryParse` calls exist on external encrypted IDs and malformed non-empty `tenantId` values fail closed (`422` or `404`).
- [ ] Verify every external token or SAML assertion checks issuer signature, audience, expiry, `sub`, and `email_verified` before account binding.
- [ ] Verify every non-password primary login evaluates `HybridMfaPolicy.RequiresSecondFactor` and withholds tokens until `TwoFactorPendingToken` redemption.
- [ ] Verify `POST /api/v1/auth/admin/external-logins/initiate-link`, unlink, and passkey registration enforce Sudo (`X-Sudo-Token` or cookie) and sole-auth protection.
- [ ] Verify PAT (`scr_pat_...`), `X-API-Key`, `AdminDelegation`, Global CIDR, and `IdentityProvider.IsActive` tests pass in `scripe test` and `scripe check`.
