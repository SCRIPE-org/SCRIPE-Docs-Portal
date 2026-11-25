# How Does SCRIPE Enforce Enterprise Security Assurance & Platform Hardening Across All 19 Modules? {#security-assurance-overview}

SCRIPE enforces 5-layer zero-trust defense across 19 backend modules, Next.js 16, and the CLI/CI toolchain. All 48 JSENTINEL findings, 26 net-new platform threats, all Category 5 backlog items, and 16 adversarial catches are closed in code.

- **JSENTINEL 48/48 Reconciled:** 13 confirmed live-drift findings closed (`F02, F10, F11, F12-F17, F18, F28-F30`), 31 bundle AST false positives disproved, and 4 managed-edge items bounded.
- **26 Net-New Threats & Category 5 Closed:** 3 Critical (`TH-API-01`, `TH-TEN-01`, `TH-TEN-02`), 15 High, and 8 Medium threats are closed with `V10.2.2` SSO CSRF, Redis DataProtection, and export FLS.
- **5-Layer Defense & Nonce CSP:** Per-request 128-bit `x-nonce` CSP, `/studio-preview` and `/dashboard-preview` frame isolation, 6-pass CSS/SVG sanitization, `postMessage` origin-plus-source guard, and DNS-pinned SSRF handlers protect all boundaries.
- **4-Layer Proof & Zero Open Code Defects:** 318 baseline plus 150 Wave 4 xUnit, 65 plus 31 Vitest, 11 live Chromium E2E (`2f962e2a4`), and 100/100 arch-check rules gate release.

@answer scope="SCRIPE-Backend (0ffde14c9) + SCRIPE-Frontend (2f962e2a4) + SCRIPE-CLI (268f169) + Root (d1c5fdb)"
@meta locale=en

## Which Scanner Reconciliations, Threat Closures & 4-Layer Test Suites Govern Platform Security? {#threat-and-scanner-metrics}

Measured reconciliation counts, threat closures, 4-layer regression tests, and static architectural security rules across `SCRIPE-Backend`, `SCRIPE-Frontend`, and `SCRIPE-Dev-Tools`:

@metric id=m_jsentinel label="JSENTINEL Scanner Reconciliation" value=48 limit=48 unit="findings" note="13 Confirmed Live Drift / App-Hardened closed + 31 Codebase-Proven False Positives + 4 Managed-Edge items (11 playbooks, 70 endpoints)."
@metric id=m_threats label="Platform Threats & Catches Closed" value=26 limit=26 unit="closed" note="3 Critical + 15 High + 8 Medium threats closed alongside all Category 5 items (V10.2.2, DataProtection, FLS exports, defaults) and 16 review catches (R-01..R-16)."
@metric id=m_tests label="Live Unmocked Chromium Security E2E" value=11 limit=11 unit="journeys" note="11/11 Live Chromium E2E (4/4 platform matrix + 4/4 central federation + 3/3 SSO CSRF & 14-mode BFF relay) + 150/150 targeted xUnit + 31/31 targeted Vitest."
@metric id=m_arch label="Security Arch-Check & 0-CVE Gate" value=100 limit=100 unit="score" note="100/100 on BE-040..042 and FE-035..036 + 6/6 CI workflow policy tests + 0 NuGet CVEs across 88 projects + 0 pnpm advisories."

```mermaid title="Verified Enterprise Security Assurance Reconciliation, Threat Closure & Test Scoreboard"
xychart-beta horizontal
  x-axis ["xUnit Baseline (318)", "xUnit Final Wave (150)", "Security Arch (100)", "BE Projects 0-CVE (88)", "Endpoints Audited (70)", "Vitest Baseline (65)", "JSENTINEL Total (48)", "Vitest Final Wave (31)", "Net-New Threats (26)", "Live Chromium E2E (11)"]
  y-axis "Verified Count / Score" 0 --> 340
  bar "Verified Metric" [318, 150, 100, 88, 70, 65, 48, 31, 26, 11]
```

## How Do the 5 Defense Layers, Nonce CSP, Tenant Isolation & DNS-Pinned SSRF Connect? {#five-layer-defense-topology}

Click any highlighted node below to inspect how Next.js per-request nonce CSP, first-party SSO Login CSRF binding, Kestrel ingress policies, 19-module tenant/DSR/FLS guards, DNS-pinned SSRF handlers, and CI supply-chain gates interlock.

@architecture id=platform-security-arch title="SCRIPE 5-Layer Zero-Trust Defense & Supply-Chain Boundary"
| edge_csp | Next.js Nonce & SSO BFF | frontend |
| client_store | Sanitizer & sw.js v3 | frontend |
| api_ingress | Kestrel & OIDC TX Guard | backend |
| tenant_fls | 19-Mod Tenant, DSR & FLS | security |
| ssrf_crypto | SSRF Pin, HMAC & DP Ring | security |
| ci_audit | CLI Arch-Check & 0-CVE | database |
| edge_csp > client_store | x-nonce + Origin | security |
| edge_csp > api_ingress | SSO Hash + CSRF | emphasis |
| api_ingress > tenant_fls | 4x9 PBAC + FLS | security |
| tenant_fls > ssrf_crypto | Outbox + FixedTime |
| ci_audit > api_ingress | BE/FE Rules + RE2 |

@steps id=defense-layers-walkthrough
| st-csp | Nonce CSP, Preview Framing & 14-Mode SSO BFF | `src/proxy.ts` mints a 128-bit `x-nonce` per request (`ed2a07b3e`), scopes `SAMEORIGIN` to `/studio-preview` and `/dashboard-preview` (`84be82539`), and binds `ASVS V10.2.2` SSO Login CSRF via `/api/auth/sso/{bind,consume-binding}` (`__Host-scripe_sso_nonce`) and 14-mode `/api/auth/session/establish` (`f93fc3533`, `be2b8783b`, `a2e951352`). | platform-security-arch | edge_csp |
| st-client | Sanitization, `postMessage` & `sw.js` v3 | 6-pass `sanitize-css.ts` unescapes CSS L3 backslashes, strips control chars, and validates `url(...)` via `sanitizeCssAssetUrl` (`84be82539`), `postmessage-security.ts` verifies `origin`+`source`+schema (`c036eb63e`), `/sw.js` (`scripe-v3-static-only`) excludes `"/"`, `/api/*`, and `?_rsc=` (`c7f4a2d3e`), and `session-cleanup-registry.ts` purges storage (`4595de933`). | platform-security-arch | client_store |
| st-ingress | Kestrel Ingress, `/oidc/start` TX & Sudo | Fail-closed `FallbackPolicy` (`TH-API-02`, `1c01a2843`) protects all `198` controllers, `GET /api/v1/auth/oidc/start` sets `__Host-scripe_oidc_tx` (`ExternalAuthTokenHash`, `ead632a6a`, `9ca1916e9`, `ac5955af2`), `AssignPermissionsToRoleCommand` enforces Sudo (`ba2e85344`), and `QrLoginController` / `/2fa/verify` scope OIDC cookies (`c081fded9`). | platform-security-arch | api_ingress |
| st-tenant | 19-Module Tenant, DSR, Binary FLS & Domains | `IDsrSubjectOwnershipVerifier` isolates DSR requests (`TH-TEN-01`, `b446a5575`), `DnsVerificationService` requires `_scripe-verify` DNS TXT and fail-closed `ITenantDomainRepository` (`TH-TEN-02`, `9fffee765`, `ead632a6a`), and binary exports enforce cell/DTO FLS shrinking `FieldProjectionMiddleware.FileGuard.cs` strictly to `["/compliance/dsr", "/downloads"]` (`1d8a856c1`). | platform-security-arch | tenant_fls |
| st-ssrf | DNS-Pinned SSRF, Webhooks & Redis DP Key-Ring | `SsrfSafeHttpClientHandlerFactory` and `PrivateNetworkIpPolicy` pin public IPs at connect time (`31fbcc376`, `88d921d3c`), `PaymobPaymentGateway` and PayPal enforce `CryptographicOperations.FixedTimeEquals` (`TH-API-01`, `8567de9c3`), `IdEncryptionOptions` and `VerificationSettings` (`CodeLength` `6..10`, `10m` reset TTL) fail closed (`ba2e85344`, `efcacddc8`), and `IDataProtectionProvider` persists AES-256-GCM keys in Redis `dataprotection:keys` (`8968bee3b`). | platform-security-arch | ssrf_crypto |
| st-ci | Static Security Rules, Fail-Closed Audit & RE2 | `BE-040..042` and `FE-035..036` enforce static security invariants (`100/100`, `e5fbb64`), `scripe audit --json` fails closed on malformed JSON (`01fa10b`), `.gitleaks.toml` uses pure Go RE2 syntax (`d1c5fdb`), and rootless `Dockerfile` / `.dockerignore` preserve `appsettings.Production.json` (`cc11ad9e5`, `268f169`). | platform-security-arch | ci_audit |

```csharp title="SCRIPE-Backend: ASVS V10.2.2 Constant-Time SSO Binding (ead632a6a) & SSRF/Webhook Guards"
// ExternalAuthTokenHash.cs + OidcClientController.StartAndBinding.cs + RedeemExternalAuthHandoffCommandHandler.cs
if (!ExternalAuthTokenHash.VerifyBindingHash(ticket.BrowserBindingHash, request.BrowserBindingNonce))
    return Result.Failure<ExternalAuthHandoffResultDto>(Error.Forbidden("SSO_LOGIN_CSRF_MISMATCH", "SSO login browser binding verification failed."));
var handler = new SocketsHttpHandler { AllowAutoRedirect = false }; // ConnectCallback pins public IP via PrivateNetworkIpPolicy
```

## How Does the 4×9 Domain-Identity Assurance Flow Execute & What Governs External Production Cutover? {#live-assurance-verification-sequence}

Every request is evaluated across 4 domain tiers (`D1` Central Auth, `D2` Tenant Subdomains, `D3` Custom Domains, `D4` Invalid/SQLi). It simultaneously enforces 9 identity tiers (`I1` Protected Super Admin through `I9` Suspended Accounts and Tenants).

@sequence id=security-assurance-seq title="Live Security Verification Flow Across Domain Tiers D1-D4 & Identity Tiers I1-I9"
| actor browser | Browser / Playwright | frontend |
| actor proxy | Next.js Nonce & SSO BFF | frontend |
| actor studio | Studio Preview Guard | frontend |
| actor api | .NET 10 API Ingress | backend |
| actor guard | Tenant, DSR & FLS Guard | security |
| browser | proxy | GET /login, /studio-preview, /dashboard-preview |
| proxy | browser | x-nonce CSP + DENY (SAMEORIGIN preview routes) | return |
| browser | proxy | POST /api/auth/sso/bind -> __Host-scripe_sso_nonce | security |
| browser | studio | Dispatch cross-origin postMessage spoofing payload | emphasis |
| studio | browser | Reject mismatched event.origin / event.source / schema | return |
| browser | api | GET /oidc/start + POST /sso/handoff or DSR/Export | security |
| api | guard | ExternalAuthTokenHash + IDsrSubjectOwnershipVerifier + FLS | security |
| guard | api | 200 OK (bound) or 401/403/400 + tenant cache key | return |
| api | browser | Fail-closed response + Cache-Control: no-store | return |

@callout id=cutover-boundary level=warning title="Release Readiness Verdict: Scoped GO (0 Open Code Defects) vs. Conditional NO-GO for External Cutover"
Code, branch merge, pre-production, and local UAT hold a **Scoped GO** with **0 unresolved actionable engineering defects** (`0ffde14c9` Backend, `2f962e2a4` Frontend, `268f169` Dev-Tools, `d1c5fdb` root). All former Category 5 backlog items are **CLOSED in code**. That includes `ASVS V10.2.2` SSO Login CSRF (`ead632a6a`, `9ca1916e9`, `ac5955af2`, `f93fc3533`, `be2b8783b`, `a2e951352`, `2f962e2a4`) and multi-replica AES-256-GCM Redis `IDataProtectionProvider` (`8968bee3b`). It also closes fail-closed `IdEncryptionOptions`, `_scripe-verify`/`nxr_` C# defaults, and `AssignPermissionsToRoleCommand` Sudo (`ba2e85344`). `VerificationSettings` (`CodeLength` `6..10`, `PasswordResetExpirationMinutes = 10`) startup validation (`efcacddc8`), binary export cell/DTO FLS (`FieldProjectionMiddleware.FileGuard.cs` shrunk to `["/compliance/dsr", "/downloads"]` in `1d8a856c1`), and scoped 2FA `IsExternalSsoFlow` / `QrLoginController` relay guards (`c081fded9`) are closed. Only intentional policies (Decision 2 `EnableCentralNativeAndPasskeyMigration=false` / `WebAuthn:RpId=admin.scripe.org` and `ASVS V6.2.5` B2B password policy) remain by design. Unconditional live production cutover remains a **Conditional NO-GO** pending external cloud execution. Gate 1 requires Vercel deploy (`>= 2f962e2a4`) and Gate 2 requires `auth.scripe.org` Cloudflare DNS `CNAME` plus Vercel attachment. Gate 3 requires Railway deploy (`>= 0ffde14c9`) with `ForwardedHeaders__ForwardLimit=2`, `ForwardedHeaders__KnownNetworks__0`, `GeoIp__OriginVerificationSecret`, and optional `DataProtection__EncryptionKey` (falls back to HKDF-derived `IdEncryption__Key`). Gate 4 covers external IdP secrets outside git and post-deploy smoke verification.

## Which Commits & Automated Test Suites Prove Each Threat Category & 4×9 Isolation Invariant? {#domain-identity-and-threat-matrix}

| Security Axis / Finding Group | Scope & Disposition | Primary Code & Commit Anchors | Automated Verification Proof |
| --- | --- | --- | --- |
| JSENTINEL Confirmed / App-Hardened (`13`) | `F02, F10, F11, F12-F17, F18, F28, F29, F30` closed in code (`x-nonce` CSP, `/studio-preview` & `/dashboard-preview` framing, 6-pass CSS/SVG sanitizer, `postMessage` guard, `sw.js` v3, storage wipe, `no-store`) | `ed2a07b3e`, `ed4c1e414`, `7b4547616`, `c036eb63e`, `84be82539`, `c7f4a2d3e`, `4595de933`, `330795b63`, `0085f65df`, `118982aab` | `proxy-security-headers.test.ts`, `sanitize-xss-and-css-hardening.test.ts` (`65/65` Vitest) + `platform-security-assurance-matrix.spec.ts` (`4/4` Live E2E) |
| JSENTINEL False Positives (`31`) & Edge (`4`) | `F01, F03-F08, F19-F27, F31-F37, F39-F42, F44, F45, F47, F48` (codebase-proven bundle AST tokens); `F09, F38, F43, F46` (Cloudflare / Vercel / Railway edge headers) | `6cf0e4ad2`, `e1a196eb7`, `519622d2c`, `0ffde14c9` (`JSENTINEL_FINDINGS_TRACEABILITY_MATRIX.md`) | `HostFramingAndSecurityHeadersTests`, `EndpointAuthorizationFallbackTests` (`318/318` xUnit) |
| Critical Net-New Threats (`3`) | `TH-API-01` Paymob/PayPal Flow A override removal & `FixedTimeEquals` HMAC; `TH-TEN-01` `IDsrSubjectOwnershipVerifier` DSR isolation; `TH-TEN-02` `DnsVerificationService` `_scripe-verify` DNS TXT & RFC 1123 FQDN | `8567de9c3`, `b446a5575`, `9fffee765` | `BillingWebhookSecurityTests`, `ComplianceDsrTenantIsolationTests`, `CustomDomainDnsVerificationSecurityTests` |
| High & Medium Platform Threats (`23`) | `TH-TEN-03..07` (FLS, operational scope, membership, SignalR, tenant cache), `TH-API-02..04` (`FallbackPolicy`, DNS-pinned SSRF, `/plugin-api/*` JWT), `TH-WEB-01..03`, `TH-STOR-01..03`, `TH-INFRA-01..03`, `TH-SUP-01..06` | `1c01a2843`, `31fbcc376`, `51a6732fe`, `a3dc6f086`, `d36731937`, `51480e2a7`, `8932ab86f`, `cc11ad9e5`, `2887eb0cb`, `baaa235aa`, `e5fbb64`, `dd38cf6` | `SsrfSafeHttpClientHandlerFactoryTests`, `OperationalScopeAndMembershipHardeningTests`, `CachingBehaviorScopeAndInvalidationTests`, `ExchangePluginTokenHealthSecurityTests`, `SignalRAndNotificationIsolationTests` |
| Wave 1+2 Final Hardening Closures (`0` Open Backlog) | Multi-replica AES-256-GCM Redis `IDataProtectionProvider` (`#257`); fail-closed `IdEncryptionOptions`/`_scripe-verify`/`nxr_`/Sudo (`AssignPermissionsToRoleCommand`); `VerificationSettings` `CodeLength` `6..10` & `10m` reset TTL; binary export FLS (`F-4`, `FileGuard` shrunk to `2` prefixes); scoped 2FA `IsExternalSsoFlow` & `QrLoginController` relay; `ASVS V10.2.2` SSO Login CSRF (`__Host-scripe_sso_nonce`, `/oidc/start` `__Host-scripe_oidc_tx`, `ExternalAuthTokenHash`, `ProcessOidcCallbackCommandValidator`) & 14-mode BFF relay | `8968bee3b`, `ba2e85344`, `efcacddc8`, `1d8a856c1`, `c081fded9`, `ead632a6a`, `9ca1916e9`, `ac5955af2`, `f93fc3533`, `be2b8783b`, `a2e951352`, `2f962e2a4` | `DataProtectionKeyRingTests`, `SafeSecurityDefaultsAndVerificationPolicyTests`, `DownloadComplianceReportFlsTests`, `AnalyticsAndInvoiceExportFlsTests`, `SubscriptionExportAndReceiptFlsTests`, `OidcStartAndBrowserBindingTests`, `SsoBrowserBindingAndOriginTests`, `sso-csrf-and-custom-domain-relay.spec.ts` (`3/3` Live E2E) |
| Adversarial Security Review Catches (`16/16` Closed) | `R-01`..`R-10` (`1b8461544`, `0085f65df`, `8567de9c3`, `c7f4a2d3e`/`4595de933`, `84be82539`, `88d921d3c`, `d1c5fdb`+`01fa10b`, `cc11ad9e5`+`268f169`, `e74943254`, `e1a196eb7`+`bb123b36b`, `bec9101`) + Wave 1–4 catches `R-11` (`F-CSR-01` `a2e951352`), `R-12` (`FE-RELAY-SUDO-01/02` `a2e951352`), `R-13` (`OTP-VAL-01` `efcacddc8`), `R-14` (`FED-TX-01` `9ca1916e9`), `R-15` (`FED-WS-01` `9ca1916e9`), and `R-16` (`LIVE-VAL-01` `ac5955af2`) | `1b8461544`, `0085f65df`, `8567de9c3`, `4595de933`, `84be82539`, `88d921d3c`, `d1c5fdb`, `01fa10b`, `cc11ad9e5`, `268f169`, `e74943254`, `9ca1916e9`, `a2e951352`, `ac5955af2`, `32b9074bc`, `0ffde14c9` | `INDEPENDENT_SECURITY_REVIEW.md` (`32b9074bc`), `SECURITY_GO_NO_GO.md` (`0ffde14c9`), `150/150` Wave 4 xUnit, `31/31` Wave 4 Vitest, `11/11` Live Chromium E2E (`2f962e2a4`) |
