# How Does SCRIPE Enforce Enterprise Security Assurance & Platform Hardening Across All 19 Modules? {#security-assurance-overview}

SCRIPE enforces 5-layer zero-trust defense across 19 backend modules, Next.js 16, and the CLI/CI toolchain. All 48 JSENTINEL findings, 26 net-new platform threats, and 10 adversarial review catches are closed and verified by 391 automated security tests.

- **JSENTINEL 48/48 Reconciled:** 13 confirmed live-drift findings closed (`F02, F10, F11, F12-F17, F18, F28-F30`), 31 bundle AST false positives disproved, and 4 managed-edge items bounded.
- **26 Net-New Threats & 10 Review Catches Closed:** 3 Critical (`TH-API-01` Paymob/PayPal webhook auth, `TH-TEN-01` DSR ownership, `TH-TEN-02` `_scripe-verify` DNS TXT), 15 High, and 8 Medium threats closed with 10 catches (`R-01` to `R-10`).
- **5-Layer Defense & Nonce CSP:** Per-request 128-bit `x-nonce` CSP, `/studio-preview` and `/dashboard-preview` frame isolation, 6-pass CSS/SVG sanitization, `postMessage` origin-plus-source guard, and DNS-pinned SSRF handlers protect all boundaries.
- **4-Layer Proof & Cutover Boundary:** 318 xUnit, 65 Vitest, 8 live Chromium E2E journeys, and 100/100 security arch-check rules (`BE-040..042`, `FE-035..036`) gate code release and external production cutover.

@answer scope="SCRIPE-Backend (9953d551e) + SCRIPE-Frontend (d8ec386ad) + SCRIPE-CLI (268f169) + Root (d1c5fdb)"
@meta locale=en

## Which Scanner Reconciliations, Threat Closures & 4-Layer Test Suites Govern Platform Security? {#threat-and-scanner-metrics}

Measured reconciliation counts, threat closures, 4-layer regression tests, and static architectural security rules across `SCRIPE-Backend`, `SCRIPE-Frontend`, and `SCRIPE-Dev-Tools`:

@metric id=m_jsentinel label="JSENTINEL Scanner Reconciliation" value=48 limit=48 unit="findings" note="13 Confirmed Live Drift / App-Hardened closed + 31 Codebase-Proven False Positives + 4 Managed-Edge items (11 playbooks, 70 endpoints)."
@metric id=m_threats label="Net-New Platform Threats Closed" value=26 limit=26 unit="closed" note="3 Critical (TH-API-01, TH-TEN-01, TH-TEN-02) + 15 High + 8 Medium threats closed alongside 10 independent catches (R-01..R-10, incl. 7 Phase S2 catches)."
@metric id=m_tests label="4-Layer Automated Security Suite" value=391 limit=391 unit="pass" note="318/318 Layer 1 xUnit across 36 classes + 65/65 Layer 2 Vitest (13 files) + 8/8 Layer 3 Live Chromium E2E journeys."
@metric id=m_arch label="Security Arch-Check & 0-CVE Gate" value=100 limit=100 unit="score" note="100/100 on BE-040..042 and FE-035..036 + 6/6 CI workflow policy tests + 0 NuGet CVEs across 88 projects + 0 pnpm advisories."

```mermaid title="Verified Enterprise Security Assurance Reconciliation, Threat Closure & Test Scoreboard"
xychart-beta horizontal
  x-axis ["xUnit Security (318)", "Security Arch (100)", "BE Projects 0-CVE (88)", "Endpoints Audited (70)", "Vitest Security (65)", "JSENTINEL Total (48)", "Net-New Threats (26)", "JSENTINEL Hardened (13)", "Review Catches (10)", "Live Chromium E2E (8)"]
  y-axis "Verified Count / Score" 0 --> 340
  bar "Verified Metric" [318, 100, 88, 70, 65, 48, 26, 13, 10, 8]
```

## How Do the 5 Defense Layers, Nonce CSP, Tenant Isolation & DNS-Pinned SSRF Connect? {#five-layer-defense-topology}

Click any highlighted node below to inspect how Next.js per-request nonce CSP, client storage guards, Kestrel ingress policies, 19-module tenant/DSR/FLS guards, DNS-pinned SSRF handlers, and CI supply-chain gates interlock.

@architecture id=platform-security-arch title="SCRIPE 5-Layer Zero-Trust Defense & Supply-Chain Boundary"
| edge_csp | Next.js Nonce Proxy | frontend |
| client_store | Sanitizer & sw.js v3 | frontend |
| api_ingress | Kestrel & FallbackPolicy | backend |
| tenant_fls | 19-Mod Tenant & DSR Guard | security |
| ssrf_crypto | DNS-Pin SSRF & HMAC | security |
| ci_audit | CLI Arch-Check & 0-CVE | database |
| edge_csp > client_store | x-nonce + Origin | security |
| edge_csp > api_ingress | HTTPS + CSRF | emphasis |
| api_ingress > tenant_fls | 4x9 PBAC + FLS | security |
| tenant_fls > ssrf_crypto | Outbox + FixedTime |
| ci_audit > api_ingress | BE/FE Rules + RE2 |

@steps id=defense-layers-walkthrough
| st-csp | Per-Request Nonce CSP & Preview Framing | `src/proxy.ts` and `security-headers.ts` mint a 128-bit cryptographic `x-nonce` per request (`ed2a07b3e`) and allow `SAMEORIGIN` / `frame-ancestors 'self'` strictly on `/studio-preview` and `/dashboard-preview` (`next.config.ts:14` `(?:/|$)` lookahead `84be82539`; `DENY` elsewhere). | platform-security-arch | edge_csp |
| st-client | Sanitization, `postMessage` & `sw.js` v3 | 6-pass `sanitize-css.ts` unescapes CSS L3 backslashes, strips control chars, and validates `url(...)` via `sanitizeCssAssetUrl` (`84be82539`), `postmessage-security.ts` verifies `origin`+`source`+schema (`c036eb63e`), `/sw.js` (`scripe-v3-static-only`) excludes `"/"`, `/api/*`, and `?_rsc=` (`c7f4a2d3e`), and `session-cleanup-registry.ts` purges storage (`4595de933`). | platform-security-arch | client_store |
| st-ingress | Kestrel Ingress, FallbackPolicy & `no-store` | Fail-closed `FallbackPolicy` (`TH-API-02`, `1c01a2843`) protects all `198` controllers, Layer 2.5 CSRF normalizes trailing slashes (`1b8461544`), `CacheHeadersMiddleware` enforces `Cache-Control: no-store` on GET/POST and `/plugin-api/*` (`0085f65df`), and Track 2 proxy hardening sets `ForwardLimit = 2`. | platform-security-arch | api_ingress |
| st-tenant | 19-Module Tenant, DSR, FLS & Custom Domain | `IDsrSubjectOwnershipVerifier` blocks cross-tenant and protected-admin DSR requests (`TH-TEN-01`, `b446a5575`), `DnsVerificationService` (`AddTenantDomainCommandHandler` / `VerifyTenantDomainCommandHandler`) requires `_scripe-verify` DNS TXT and RFC 1123 FQDN (`TH-TEN-02`, `9fffee765`), and `EndpointResourceResolver.ResolveAll`, `TenantMembershipContextResolver`, and `IOperationalScopeAccessResolver` enforce FLS and scope ceilings (`d36731937`, `51480e2a7`). | platform-security-arch | tenant_fls |
| st-ssrf | DNS-Pinned SSRF, Webhooks & Plugin JWTs | `SsrfSafeHttpClientHandlerFactory` and `PrivateNetworkIpPolicy` pin validated public IPs at connect time with `AllowAutoRedirect = false` (`31fbcc376`, `88d921d3c`), `PaymobPaymentGateway` and PayPal remove Flow A tenant overrides and use `CryptographicOperations.FixedTimeEquals` (`TH-API-01`, `8567de9c3`), and `PluginTokenService` issues short-lived HS256 JWTs (`jti`/`iat`/`scripe_iat_ms`, `"plugin_token"="true"`) confined to `/plugin-api/*` via `PluginTokenValidationGuard` (`31fbcc376`, `88d921d3c`). | platform-security-arch | ssrf_crypto |
| st-ci | Static Security Rules, Fail-Closed Audit & RE2 | `BE-040..042` and `FE-035..036` enforce static security invariants (`100/100`, `e5fbb64`), `scripe audit --json` fails closed on malformed JSON (`01fa10b`), `.gitleaks.toml` uses pure Go RE2 syntax (`d1c5fdb`), and rootless `Dockerfile` / `.dockerignore` preserve tracked `appsettings.Production.json` (`cc11ad9e5`, `268f169`). | platform-security-arch | ci_audit |

```csharp title="SCRIPE-Backend: Connect-Time SSRF Socket Pinning (31fbcc376) & Constant-Time Paymob HMAC (8567de9c3)"
// SsrfSafeHttpClientHandlerFactory.cs + PrivateNetworkIpPolicy.cs + PaymobPaymentGateway.cs
var handler = new SocketsHttpHandler { AllowAutoRedirect = false }; // ConnectCallback pins validated public IP via PrivateNetworkIpPolicy
var expectedBytes = Encoding.UTF8.GetBytes(computedHmac.ToLowerInvariant());
var actualBytes = Encoding.UTF8.GetBytes(receivedHmac.Trim().ToLowerInvariant());
var isValid = CryptographicOperations.FixedTimeEquals(expectedBytes, actualBytes);
```

## How Does the 4×9 Domain-Identity Assurance Flow Execute & What Governs External Production Cutover? {#live-assurance-verification-sequence}

Every request is evaluated across 4 domain tiers (`D1` Central Auth, `D2` Tenant Subdomains, `D3` Custom Domains, `D4` Invalid/SQLi). It simultaneously enforces 9 identity tiers (`I1` Protected Super Admin through `I9` Suspended Accounts and Tenants).

@sequence id=security-assurance-seq title="Live Security Verification Flow Across Domain Tiers D1-D4 & Identity Tiers I1-I9"
| actor browser | Browser / Playwright | frontend |
| actor proxy | Next.js Nonce Proxy | frontend |
| actor studio | Studio Preview Guard | frontend |
| actor api | .NET 10 API Ingress | backend |
| actor guard | Tenant, DSR & SSRF Guard | security |
| browser | proxy | GET /login, /studio-preview, /dashboard-preview |
| proxy | browser | x-nonce CSP + DENY (SAMEORIGIN preview routes) | return |
| browser | studio | Dispatch cross-origin postMessage spoofing payload | emphasis |
| studio | browser | Reject mismatched event.origin / event.source / schema | return |
| browser | api | Anonymous or cross-tenant POST / DSR / Webhook | security |
| api | guard | FallbackPolicy + IDsrSubjectOwnershipVerifier + FixedTimeEquals | security |
| guard | api | 401/403/400 + tenant-scoped CachingBehavior key | return |
| api | browser | Fail-closed response + Cache-Control: no-store | return |

@callout id=cutover-boundary level=warning title="Release Readiness Verdict: Scoped GO vs. Conditional NO-GO for External Production Cutover"
Code, branch merge, pre-production, and local UAT hold a **Scoped GO** (`9953d551e` Backend, `d8ec386ad` Frontend, `268f169` Dev-Tools, `d1c5fdb` root). Unconditional external production cutover remains a **Conditional NO-GO** until four live infrastructure gates pass. Gate 1 requires Vercel production redeploy (`>= d8ec386ad`) serving per-request `x-nonce` CSP and `scripe-v3-static-only` `/sw.js`. Gate 2 requires `auth.scripe.org` Cloudflare DNS `CNAME` and Vercel domain attachment (`EnableCentralNativeAndPasskeyMigration=false`, `RpId=admin.scripe.org`). Gate 3 requires Railway production deploy (`>= 9953d551e`) injecting `ForwardedHeaders__ForwardLimit=2`, `ForwardedHeaders__KnownNetworks__0`, `GeoIp__OriginVerificationSecret`, `IdEncryption__AllowLegacyPlaintextStringFallback=false`, `Tenancy__VerificationPrefix=_scripe-verify`, `WebAuthn__RpId=admin.scripe.org`, `WebAuthn__UserVerification=required`, and `Authentication__CentralFederation__EnableCentralNativeAndPasskeyMigration=false`. Gate 4 covers external IdP secrets outside git plus post-deploy smoke verification and carried Category 5 notes (`V10.2.2`, `IdEncryptionService.cs:43` non-prod default retirement, OTP digits/TTL, and `FieldProjectionMiddleware.FileGuard.cs:11-19` binary export FLS).

## Which Commits & Automated Test Suites Prove Each Threat Category & 4×9 Isolation Invariant? {#domain-identity-and-threat-matrix}

| Security Axis / Finding Group | Scope & Disposition | Primary Code & Commit Anchors | Automated Verification Proof |
| --- | --- | --- | --- |
| JSENTINEL Confirmed / App-Hardened (`13`) | `F02, F10, F11, F12-F17, F18, F28, F29, F30` closed in code (`x-nonce` CSP, `/studio-preview` & `/dashboard-preview` framing, 6-pass CSS/SVG sanitizer, `postMessage` guard, `sw.js` v3, storage wipe, `no-store`) | `ed2a07b3e`, `ed4c1e414`, `7b4547616`, `c036eb63e`, `84be82539`, `c7f4a2d3e`, `4595de933`, `330795b63`, `0085f65df`, `118982aab` | `proxy-security-headers.test.ts`, `sanitize-xss-and-css-hardening.test.ts` (`65/65` Vitest) + `platform-security-assurance-matrix.spec.ts` (`4/4` Live E2E) |
| JSENTINEL False Positives (`31`) & Edge (`4`) | `F01, F03-F08, F19-F27, F31-F37, F39-F42, F44, F45, F47, F48` (codebase-proven bundle AST tokens); `F09, F38, F43, F46` (Cloudflare / Vercel / Railway edge headers) | `6cf0e4ad2`, `e1a196eb7`, `fc4272e8c`, `ec9399e78` (`JSENTINEL_FINDINGS_TRACEABILITY_MATRIX.md`) | `HostFramingAndSecurityHeadersTests`, `EndpointAuthorizationFallbackTests` (`318/318` xUnit) |
| Critical Net-New Threats (`3`) | `TH-API-01` Paymob/PayPal Flow A override removal & `FixedTimeEquals` HMAC; `TH-TEN-01` `IDsrSubjectOwnershipVerifier` DSR isolation; `TH-TEN-02` `DnsVerificationService` `_scripe-verify` DNS TXT & RFC 1123 FQDN | `8567de9c3`, `b446a5575`, `9fffee765` | `BillingWebhookSecurityTests`, `ComplianceDsrTenantIsolationTests`, `CustomDomainDnsVerificationSecurityTests` |
| High & Medium Platform Threats (`23`) | `TH-TEN-03..07` (FLS, operational scope, membership, SignalR, tenant cache), `TH-API-02..04` (`FallbackPolicy`, DNS-pinned SSRF, `/plugin-api/*` JWT), `TH-WEB-01..03`, `TH-STOR-01..03`, `TH-INFRA-01..03`, `TH-SUP-01..06` | `1c01a2843`, `31fbcc376`, `51a6732fe`, `a3dc6f086`, `d36731937`, `51480e2a7`, `8932ab86f`, `cc11ad9e5`, `2887eb0cb`, `baaa235aa`, `e5fbb64`, `dd38cf6` | `SsrfSafeHttpClientHandlerFactoryTests`, `OperationalScopeAndMembershipHardeningTests`, `CachingBehaviorScopeAndInvalidationTests`, `ExchangePluginTokenHealthSecurityTests`, `SignalRAndNotificationIsolationTests` |
| Adversarial Security Review Catches (`10`) | `R-01` (`P1` CSRF trailing slash `1b8461544`), `R-02` (`S1` `/plugin-api` `no-store` `0085f65df`), `R-03` (`S2.1` webhook override `8567de9c3`), `R-04` (`E1` `sw.js`/logout purge `c7f4a2d3e`/`4595de933`), `R-05` (`B2-1/B2-2` CSS L3/SVG/preview regex `84be82539`), `R-06` (`S2.2-1` plugin JWT active tenant `88d921d3c`), `R-07` (`J3-1..3` Gitleaks RE2 & fail-closed `scripe audit` `d1c5fdb`+`01fa10b`), `R-08` (`J1` `.dockerignore` `appsettings.Production.json` `cc11ad9e5`+`268f169`), `R-09` (`S2.3-1` `UploadsController` `e74943254`), `R-10` (`S3 Docs` `e1a196eb7`+`bb123b36b`) | `1b8461544`, `0085f65df`, `8567de9c3`, `c7f4a2d3e`, `f8b9a9980`, `4595de933`, `84be82539`, `88d921d3c`, `d1c5fdb`, `01fa10b`, `cc11ad9e5`, `268f169`, `e74943254`, `a64aa9a4f` | `INDEPENDENT_SECURITY_REVIEW.md` (`a64aa9a4f`), `RateLimitingAndHostSecretHardeningTests`, `6/6` `.github/tests/*.mjs`, `5/5` `security-gates.test.ts` |
| 4-Tier Domain × 9-Tier Identity Matrix (`D1-D4` × `I1-I9`) | `D1` Platform/Central Auth, `D2` Tenant Subdomains, `D3` Verified Custom Domains, `D4` Invalid/SQLi × `I1` Protected Super Admin .. `I9` Suspended Accounts/Tenants (+ CLI `--port` hardening `50238ed`/`0cc99a3`) | `central-identity-federation-fullstack.html`, `backend-central-federation-relay-sequence.html`, `frontend-central-auth-sudo-mvvm.html` | `platform-security-assurance-matrix.spec.ts` (`4/4`) + `central-federation-and-account-security.spec.ts` (`4/4`) (`d8ec386ad`, `d3bd74b37`) |
