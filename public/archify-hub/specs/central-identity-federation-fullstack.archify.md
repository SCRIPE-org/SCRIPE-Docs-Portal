# How Does Central Identity Federation Unify Multi-Tenant SSO, Custom Domains & Dual-RP Passkeys? {#central-federation-overview}

SCRIPE decouples interactive identity UI (`https://auth.scripe.org`) from callback ingress (`https://api.scripe.org`). Custom domains, post-MFA handoffs, Dual-RP passkeys, Sudo step-up, and split logouts remain strictly fail-closed.

- **Central Callback, `/oidc/start` TX & Post-MFA Bridge:** `GET /api/v1/auth/oidc/start` binds a 43-char SHA-256 `browserBindingHash` and sets `__Host-scripe_oidc_tx`. `OidcClientController.Central` and `PostMfaHandoffHelper` (`ssoTwoFactorBridge.ts`) propagate `ASVS V10.2.2` binding through hybrid-2FA back to `{ReturnOrigin}/sso/callback`.
- **12-Mode Custom-Domain First-Party HMAC Relay:** Next.js BFF exposes `/api/auth/sso/{bind,consume-binding}` (`__Host-scripe_sso_nonce`) and 12-mode `/api/auth/session/{establish,refresh,logout}` with HMAC-SHA256 headers (`30s` skew, `60s` nonce, `Client-Ip` rate limit, Sudo step-up forwarding, `0` third-party cookies) and issues `__Host-scripe_refresh_token` (`SameSite=Lax`).
- **Dual-RP Passkeys, Redis DataProtection & 3-DB Parity:** `AdminPasskey.RpId` keeps `EnableCentralNativeAndPasskeyMigration` locked `false` with `WebAuthn:UserVerification = "required"`, `PasskeyAuthLimit = 12` (15m), multi-replica AES-256-GCM Redis `dataprotection:keys` (`8968bee3b`), and `--idempotent` parity on PostgreSQL 18, SQL Server 2025, and Oracle 21c XE.
- **Cloudflare Edge, Provider Runbook, Sudo & Split Logout:** Edge enforces Cloudflare `X-Scripe-Origin-Verify` -> Railway `ForwardedHeaders__ForwardLimit=2`, Entra `email`+`xms_edov`, GitHub `user:email read:user`, 2-step SAML ACS, 403 `<SudoVerificationModal />` retry, sibling-JTI `RevokeAllSessions`, and scoped `[JsonIgnore] IsExternalSsoFlow` / split `logoutScope` (`c081fded9`).

@answer scope="SCRIPE-Backend (ac5955af2) + SCRIPE-Frontend (2f962e2a4) + SCRIPE-CLI (268f169)"
@meta locale=en

## Which Verification Gates, Multi-DB Engines & Timers Govern This Architecture? {#federation-metrics}

Measured test suites, live browser E2E, multi-DB migrations, and bounded security windows across `CentralFederationOptions`, `RateLimitingSettings`, `ExternalAuthHandoffStore`, and `SessionRelayAuthenticator`:

@metric id=m_be_unit label="Backend Unit & Authz Gates" value=902 limit=902 unit="pass" note="702/702 API.UnitTests + 200/200 AuthorizationGates + 3/3 idempotent DB engines (PG 18, SQL 2025, Oracle 21c XE)."
@metric id=m_fe_build label="Frontend Build & Live E2E" value=208 limit=208 unit="ok" note="208/208 Next.js 16 packages built + 9/9 live RateLimiting=true E2E suites + 24/24 visual gallery captures."
@metric id=m_handoff label="SSO Handoff Ticket TTL" value=120 limit=120 unit="sec" note="SHA-256 ExternalAuthHandoffTicket (initial & post-MFA) expires in 120s with atomic TryAddAsync replay lock."
@metric id=m_passkey_rl label="Passkey Auth Rate Limit" value=12 limit=12 unit="req/15m" note="RateLimiting:PasskeyAuthLimit = 12 per 15m (WebAuthn:UserVerification = required; client-IP partitioned on BFF relay)."

```mermaid title="Verified Central Federation Quality Gates, Timers & Multi-DB Scoreboard"
xychart-beta horizontal
  x-axis ["BE Unit Tests (702)", "Authz Gates (200)", "FE Packages (208)", "BE Projects (90)", "BE Arch Score (94)", "FE Arch Score (92)", "Handoff TTL (120s)", "Relay Nonce (60s)", "Gallery Captures (24)", "PasskeyLimit (12)"]
  y-axis "Verified Value / Bounds" 0 --> 750
  bar "Observed Metric" [702, 200, 208, 90, 94, 92, 120, 60, 24, 12]
```

## How Do Central Auth, API Callbacks, Post-MFA Bridging & Custom-Domain Relay Connect? {#federation-topology}

Click any highlighted node below to trace host boundaries, post-MFA handoff bridging, HMAC relay signing, Dual-RP WebAuthn (`UserVerification=required`), and multi-DB persistence.

@architecture id=federation-fullstack-arch title="Central Identity Federation, Post-MFA Bridge, Custom-Domain HMAC Relay & Dual-RP Topology"
| fe_auth | auth.scripe.org | frontend |
| fe_custom | Custom Tenant BFF | frontend |
| fe_native | admin.scripe.org | frontend |
| api_cb | api.scripe.org | backend |
| sec_gate | Relay, Sudo & Dual-RP | security |
| id_store | PG / SQL / Oracle 21c | database |
| fe_auth > api_cb | OIDC/SAML + 2FA | emphasis |
| fe_custom > sec_gate | HMAC BFF | security |
| sec_gate > api_cb | /sso/handoff |
| fe_native > sec_gate | WebAuthn + Sudo | security |
| api_cb > id_store |
| sec_gate > id_store |

@steps id=topology-walkthrough
| st-auth | auth.scripe.org UI & Post-MFA Bridge | Interactive SSO start, `/sso/continue` workspace picker, and hybrid-2FA challenge (`ssoTwoFactorBridge.ts` -> `PostMfaHandoffHelper` + `TenantOriginOwnershipValidator`). | federation-fullstack-arch | fe_auth |
| st-bff | Custom-Domain BFF Relay | Next.js `/api/auth/session/{establish,refresh,logout}` enforces same-origin headers, signs `X-Scripe-Session-Relay-*` (with `Client-Ip` & `MaxAge: 0` parity), and sets `__Host-scripe_refresh_token` (`Lax`). | federation-fullstack-arch | fe_custom |
| st-native | Native & Passkey Origin | Locked on `admin.scripe.org` and `*.admin.scripe.org` (`EnableCentralNativeAndPasskeyMigration: false`, `WebAuthn:UserVerification = "required"`, `PasskeyAuthLimit = 12`). | federation-fullstack-arch | fe_native |
| st-cb | Central Callback & Cloudflare Edge | `OidcClientController.Central` and SAML ACS behind Cloudflare `X-Scripe-Origin-Verify` + Railway `ForwardedHeaders__ForwardLimit=2` redeem server state and mint 120s SHA-256 `ExternalAuthHandoffTicket`. | federation-fullstack-arch | api_cb |
| st-sec | Relay, Dual-RP & Sudo Gate | `SessionRelayAuthenticator` (30s skew, 60s nonce), `IVerifiedOriginEvaluator`, `Fido2PasskeyService`, `RevokeAllSessions` sibling-JTI blacklist, and `AuthLogoutScopeHelper` (`POST ~/oidc/logout`). | federation-fullstack-arch | sec_gate |
| st-store | Redis + 3-DB Persistence | Stores `auth:ext-handoff-used:{sha256}`, relay nonces, and `AdminPasskey.RpId` (`varchar(253)`) verified `--idempotent` across PostgreSQL 18, SQL Server 2025, and live Oracle 21c XE. | federation-fullstack-arch | id_store |

```csharp title="SCRIPE-Backend: Post-MFA Custom-Domain Handoff Validation & Relay Rate-Limit Partitioning"
// PostMfaHandoffHelper.cs — requires pending federated SSO ticket & validates tenant domain ownership
if (!isPendingPath || (pendingTicket is not null && !IsFederatedSsoSource(pendingTicket.Source)))
    return Result.Failure<ValidatedHandoffOrigin?>(Error.Forbidden("HANDOFF_REQUIRES_PENDING_TICKET", "..."));

// RateLimitingSettings.cs & RateLimitingConfiguration.AuthPolicies.cs — PasskeyAuthLimit = 12 (15m)
public int PasskeyAuthLimit { get; set; } = 12; // Partitioned by X-Scripe-Session-Relay-Client-Ip on HMAC relay
```

## How Do Central Callback, Post-MFA Bridging & Custom-Domain Relay Execute Step by Step? {#federation-sequence-section}

When a custom-domain user authenticates via an external IdP and tenant policy requires SCRIPE 2FA, `auth.scripe.org/sso/continue` completes the 2FA challenge and mints a fresh single-use post-MFA `ExternalAuthHandoffTicket` back to `{ReturnOrigin}/sso/callback`.

@sequence id=federation-runtime-seq title="Central OIDC Callback, Hybrid-2FA Post-MFA Bridge & Custom-Domain HMAC Relay Trace"
| actor spa | Custom Domain SPA | frontend |
| actor auth | auth.scripe.org | frontend |
| actor bff | Next.js HMAC Relay | frontend |
| actor api | api.scripe.org | backend |
| actor idp | External IdP | external |
| spa | api | POST /api/v1/auth/oidc/challenge |
| api | spa | idpUrl (ExternalAuthStateTicket cached) | return |
| spa | idp | authenticate at IdP |
| idp | api | GET /api/v1/auth/oidc/callback | emphasis |
| api | auth | 302 auth.scripe.org/sso/continue (Requires2FA) | return |
| auth | api | POST /2fa/verify (twoFactorPendingToken + returnOrigin) | security |
| api | auth | PostMfaHandoffHelper -> 120s post-MFA HandoffTicket | return |
| auth | spa | 302 {ReturnOrigin}/sso/callback?code=&state= | return |
| spa | bff | POST /api/auth/session/establish | emphasis |
| bff | api | HMAC X-Scripe-Session-Relay-* + /sso/handoff | security |
| bff | spa | Access JWT JSON + __Host-scripe_refresh_token | return |

@callout id=dual-rp-lock level=note title="Decision 2, ASVS V10.2.2 SSO Login CSRF, Multi-Replica Redis DataProtection & 3-DB Parity"
`CentralFederationOptions.EnableCentralNativeAndPasskeyMigration` stays `false` in all environments while `WebAuthn:UserVerification` is `"required"` and `RateLimiting:PasskeyAuthLimit` is `12` (15m). `ASVS V10.2.2` browser-bound SSO Login CSRF (`__Host-scripe_sso_nonce`, `GET /api/v1/auth/oidc/start` `__Host-scripe_oidc_tx`, `ExternalAuthTokenHash`, `ProcessOidcCallbackCommandValidator` `ac5955af2`), 12-mode `/api/auth/session/establish` (`f93fc3533`, `be2b8783b`, `a2e951352`), and multi-replica AES-256-GCM + HKDF-SHA256 Redis `dataprotection:keys` (`8968bee3b`) are verified across `150/150` targeted Backend xUnit tests, `31/31` Frontend Vitest checks, `11/11` live Chromium E2E specs (`2f962e2a4`), and `0`-error `--idempotent` runs on PostgreSQL 18, SQL Server 2025, and live Oracle 21c XE.

## Which Production Edge, External IdP & Security Contracts Govern Central Federation? {#federation-matrix}

| Contract / Provider | Owner Surface | Code-Verified Production Invariant | Child Drilldown |
| --- | --- | --- | --- |
| Cloudflare & Railway Edge | `api.scripe.org` / `auth.scripe.org` | Orange Cloud `X-Scripe-Origin-Verify` Transform Rule (`/health/ready` bypass); Railway `ForwardedHeaders__ForwardLimit=2` + `KnownNetworks__0`; `Saml__SpBaseUrl=https://api.scripe.org` | `backend-central-federation-relay-sequence.html` |
| Google / Microsoft Entra / GitHub / SAML | `/settings/identity-providers` | Google (`openid email profile`, `TrustIdpMfa=false`); Entra (`email` + `xms_edov` ID claims, replace `{tenant-id}`); GitHub (`user:email read:user`); 2-step SAML ACS + `SEC-SAML-01` | `backend-central-federation-relay-sequence.html` |
| `PostMfaHandoffHelper` & `TenantOriginOwnershipValidator` | `SCRIPE-Backend` (`e64e61e65`) | Validates federated `TwoFactorPendingTicket.Source`, enforces tenant-domain ownership, and mints 120s post-MFA `ExternalAuthHandoffTicket` | `backend-central-federation-relay-sequence.html` |
| `SessionRelayAuthenticator` & `CookieAuthMiddleware.Relay` | `SCRIPE-Backend` (`e64e61e65`) | `30s` skew, `60s` atomic nonce, `X-Scripe-Session-Relay-Client-Ip` rate-limit key, `X-Scripe-Relay-Refresh-MaxAge: 0` ephemeral cookie parity | `backend-central-federation-relay-sequence.html` |
| `ssoTwoFactorBridge.ts` & `session-relay-hmac.ts` | `SCRIPE-Frontend` (`eea985c95`) | Bridges post-MFA cross-origin handoff, extracts trusted client IP / `host` authority, and fails closed (`502`) if refresh token is missing | `frontend-central-auth-sudo-mvvm.html` |
| `SudoVerificationModal` & `useAuthLogout` | `SCRIPE-Frontend` (`eea985c95`) | Expands 403 Sudo retry (`SudoRevokedOrExpired`, `DowngradeRefused`, `TokenInvalid`) and preserves `scr.oidc.session` on `"app"` logout (`POST ~/oidc/logout`) | `frontend-central-auth-sudo-mvvm.html` |
