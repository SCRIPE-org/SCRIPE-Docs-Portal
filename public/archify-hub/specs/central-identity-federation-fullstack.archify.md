# How Does Central Identity Federation Unify Multi-Tenant SSO, Custom Domains & Dual-RP Passkeys? {#central-federation-overview}

SCRIPE decouples interactive identity workflows (`https://auth.scripe.org`) from protocol callback ingress (`https://api.scripe.org`) while keeping custom tenant domains, native admin logins, WebAuthn passkeys, Sudo step-up, and split logouts strictly fail-closed.

- **Central Callback & Single-Use Handoff:** External OIDC (`GET /api/v1/auth/oidc/callback`) and SAML (`POST /api/v1/auth/saml/acs/{providerId}`) callbacks on `api.scripe.org` consume server-side `ExternalAuthStateTicket` (never client `sessionStorage`), mint a 120s SHA-256 `ExternalAuthHandoffTicket`, and redeem it once via `POST /api/v1/auth/sso/handoff`.
- **Custom-Domain First-Party HMAC Relay:** Verified custom domains cannot share cross-site cookies with `api.scripe.org`, so Next.js BFF exposes `/api/auth/session/{establish,refresh,logout}` guarded by HMAC-SHA256 headers and issuing `__Host-scripe_refresh_token` (`HttpOnly`, `Secure`, `SameSite=Lax`).
- **Dynamic Origin Governance & Dual-RP Passkeys:** `IVerifiedOriginEvaluator` feeds dynamic CORS/CSRF checks with a 60s generation-keyed cache, while `AdminPasskey.RpId` / `WebAuthnChallenge.RpId` keep `EnableCentralNativeAndPasskeyMigration` locked `false` on `admin.scripe.org` and `*.admin.scripe.org`.
- **Sudo Expansion, Sibling-JTI Revoke & Split Logout:** `<SudoVerificationModal />` expands 403 retry across Sudo revocation/downgrade errors, `RevokeAllSessions` preserves the caller's session via sibling JTI blacklisting, and `AuthLogoutScopeHelper` preserves `scr.oidc.session` on `"app"` logouts.

@answer scope="SCRIPE-Backend + SCRIPE-Frontend + SCRIPE-CLI · Stage 6B"
@meta locale=en

## Which Verification Gates & Federation Timers Govern This Architecture? {#federation-metrics}

Measured test suites, architecture lint scores, and bounded cryptographic windows from `CentralFederationOptions`, `ExternalAuthHandoffStore`, `SessionRelayAuthenticator`, and `VerifiedOriginEvaluator`:

@metric id=m_be_unit label="Backend Unit Tests" value=702 limit=702 unit="pass" note="702/702 API.UnitTests + 200/200 AuthorizationGates verified passing on SCRIPE-Backend commit 970806205."
@metric id=m_fe_build label="Frontend Build Packages" value=208 limit=208 unit="ok" note="208/208 Next.js 16 packages built + 9/9 live E2E suites verified on SCRIPE-Frontend commit a9748503c."
@metric id=m_handoff label="SSO Handoff Ticket TTL" value=120 limit=120 unit="sec" note="SHA-256 ExternalAuthHandoffTicket expires in 120s with atomic TryAddAsync auth:ext-handoff-used:{sha256} replay lock."
@metric id=m_arch label="BE & FE Arch Scores" value=94 limit=100 unit="score" note="scripe arch-check scores: Backend 94/100 (90/90 builds), Frontend 92/100 across 65+ MVVM sub-modules."

```mermaid title="Verified Central Federation Quality Gates & Security Timers (Observed Counts & Windows)"
xychart-beta horizontal
  x-axis ["BE Unit Tests (702)", "Authz Gates (200)", "FE Packages (208)", "BE Projects (90)", "BE Arch Score (94)", "FE Arch Score (92)", "Live E2E (9)", "Handoff TTL (120s)", "Relay Nonce (60s)"]
  y-axis "Verified Value / Bounds" 0 --> 750
  bar "Observed Metric" [702, 200, 208, 90, 94, 92, 9, 120, 60]
```

## How Do Central Auth, API Callbacks, Custom-Domain Relay & Native Origins Connect? {#federation-topology}

Click any highlighted node below to step through host boundaries, cookie isolation, HMAC relay signing, Dual-RP WebAuthn, and Sudo enforcement across both repositories.

@architecture id=federation-fullstack-arch title="Central Identity Federation, Custom-Domain HMAC Relay & Dual-RP WebAuthn Topology"
| fe_auth | auth.scripe.org | frontend |
| fe_custom | Custom Tenant BFF | frontend |
| fe_native | admin.scripe.org | frontend |
| api_cb | api.scripe.org | backend |
| sec_gate | Relay, Sudo & Dual-RP | security |
| id_store | Redis + SQL Store | database |
| fe_auth > api_cb | OIDC/SAML | emphasis |
| fe_custom > sec_gate | HMAC BFF | security |
| sec_gate > api_cb | /sso/handoff |
| fe_native > sec_gate | WebAuthn + Sudo | security |
| api_cb > id_store |
| sec_gate > id_store |

@steps id=topology-walkthrough
| st-auth | auth.scripe.org UI | Interactive SSO start, `/sso/continue` workspace picker & 2FA challenge (`Tenancy:AuthBaseUrl`, `OpenIddict:FrontendBaseUrl`). | federation-fullstack-arch | fe_auth |
| st-bff | Custom-Domain BFF Relay | Next.js `/api/auth/session/{establish,refresh,logout}` checks same-origin headers, signs `X-Scripe-Session-Relay-*`, and sets `__Host-scripe_refresh_token` (`Lax`). | federation-fullstack-arch | fe_custom |
| st-native | Native & Passkey Origin | Locked on `admin.scripe.org` and `*.admin.scripe.org` (`EnableCentralNativeAndPasskeyMigration: false`) with `OriginRouting` + `BroadcastChannel` isolation. | federation-fullstack-arch | fe_native |
| st-cb | Central Callback Ingress | `OidcClientController.Central` and SAML ACS redeem server `ExternalAuthStateTicket`, mint 120s SHA-256 `ExternalAuthHandoffTicket`, and `302` redirect. | federation-fullstack-arch | api_cb |
| st-sec | Relay, Dual-RP & Sudo Gate | `SessionRelayAuthenticator` (30s skew, 60s nonce), `IVerifiedOriginEvaluator`, `Fido2PasskeyService.ResolveAndValidateRpId`, `RevokeAllSessions` JTI blacklist, and `AuthLogoutScopeHelper`. | federation-fullstack-arch | sec_gate |
| st-store | Redis + SQL Persistence | Stores `auth:ext-handoff-used:{sha256}`, relay nonces, `AdminPasskey.RpId` (`varchar(253)`), and hashed `RefreshTokens`. | federation-fullstack-arch | id_store |

```csharp title="SCRIPE-Backend: Atomic Single-Use Handoff Claim & Split Logout Helper"
// ExternalAuthHandoffStore.cs — atomic SHA-256 digest lookup + TryAddAsync replay guard
var digest = ComputeSha256Hex(rawCode);
var claimed = await _cache.TryAddAsync($"auth:ext-handoff-used:{digest}", "1", ReplayGuardTtl, ct);

// AuthLogoutScopeHelper.cs — keep scr.oidc.session during app logout; clear only on "central"
public static bool ShouldClearOidcSession(string? scope) =>
    string.Equals(scope?.Trim(), "central", StringComparison.OrdinalIgnoreCase);
```

## How Do Central Callback, Custom-Domain Relay & Split Logout Execute Step by Step? {#federation-sequence-section}

Custom-domain workspaces route refresh tokens through their own Next.js first-party BFF (`__Host-scripe_refresh_token`) while keeping `scr.oidc.session` isolated until explicit `"central"` logout.

@sequence id=federation-runtime-seq title="Central OIDC Callback, Custom-Domain HMAC Relay & Split Logout Trace"
| actor spa | Custom Domain SPA | frontend |
| actor bff | Next.js HMAC Relay | frontend |
| actor api | api.scripe.org | backend |
| actor sec | Relay & Store | security |
| actor idp | External IdP | external |
| spa | api | POST /api/v1/auth/oidc/challenge |
| api | spa | idpUrl (ExternalAuthStateTicket cached) | return |
| spa | idp | authenticate at IdP |
| idp | api | GET /api/v1/auth/oidc/callback | emphasis |
| api | sec | mint 120s SHA-256 HandoffTicket | security |
| api | spa | 302 {ReturnOrigin}/sso/callback?code= | return |
| spa | bff | POST /api/auth/session/establish | emphasis |
| bff | api | HMAC X-Scripe-Session-Relay-* + /sso/handoff | security |
| api | sec | atomic claim auth:ext-handoff-used:{sha256} | security |
| bff | spa | Access JWT JSON + __Host-scripe_refresh_token | return |
| spa | bff | POST /api/auth/session/logout (app default) |
| bff | api | revoke refresh cookie (keep scr.oidc.session) | return |

@callout id=dual-rp-lock level=note title="Decision 2: Why Native Admin Login & Passkeys Stay Locked on admin.scripe.org"
`CentralFederationOptions.EnableCentralNativeAndPasskeyMigration` stays `false` in all environments. Existing `AdminPasskey` credentials bind cryptographically to the registering Relying Party (`rpId`); migrating native login to `auth.scripe.org` without Dual-RP opt-in would orphan enrolled hardware keys. Adding `AdminPasskey.RpId` (`varchar(253)`, backfilled `'admin.scripe.org'`) and `AllowedRpIds` provides non-breaking forward compatibility.

## Which Configuration Flags & Security Contracts Govern Central Federation? {#federation-matrix}

| Contract / Component | Owner Repository | Invariant & Bounded Behavior | Child Drilldown |
| --- | --- | --- | --- |
| `CentralFederationOptions` | `SCRIPE-Backend` (`970806205`) | 5 federation toggles `true`; `EnableCentralNativeAndPasskeyMigration` locked `false` | `backend-central-federation-relay-sequence.html` |
| `ExternalAuthHandoffStore` | `SCRIPE-Backend` (`970806205`) | `120s` TTL SHA-256 ticket key + `TryAddAsync` single-use replay guard | `backend-central-federation-relay-sequence.html` |
| `SessionRelayAuthenticator` | `SCRIPE-Backend` (`970806205`) | `30s` timestamp skew, `60s` atomic nonce, `>=32`-char fail-closed HMAC secret | `backend-central-federation-relay-sequence.html` |
| `VerifiedOriginEvaluator` | `SCRIPE-Backend` (`970806205`) | `60s` generation cache authorizing verified active non-suspended custom domains | `backend-central-federation-relay-sequence.html` |
| `OriginRouting` & `ssoHandoffDispatch` | `SCRIPE-Frontend` (`a9748503c`) | Strict HTTPS/origin checks, zero `sessionStorage` PKCE, central continuation dispatch | `frontend-central-auth-sudo-mvvm.html` |
| `SudoVerificationModal` & `useAuthLogout` | `SCRIPE-Frontend` (`a9748503c`) | Expands 403 Sudo retry (`SudoRevokedOrExpired`, `DowngradeRefused`, `TokenInvalid`) + split `logoutScope` | `frontend-central-auth-sudo-mvvm.html` |
