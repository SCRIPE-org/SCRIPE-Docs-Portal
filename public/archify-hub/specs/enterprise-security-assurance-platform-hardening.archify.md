# How Does SCRIPE Enforce Enterprise Security Assurance & Platform Hardening Across All 19 Modules? {#security-assurance-overview}

SCRIPE enforces 5-layer zero-trust defense across 19 backend modules, Next.js 16, and the CLI/CI toolchain. All 48 JSENTINEL findings and 26 net-new platform threats are remediated and verified by 391 automated security tests.

- **JSENTINEL 48/48 Reconciled:** 13 confirmed live-drift and app-hardened findings closed, 31 verified bundle AST false positives documented, and 4 managed-edge informational items bounded.
- **26 Net-New Threats & 7 Review Catches Closed:** 3 Critical (`TH-API-01` webhook HMAC, `TH-TEN-01` DSR ownership, `TH-TEN-02` custom-domain DNS TXT), 15 High, and 8 Medium findings remediated alongside 7 independent review fixes.
- **5-Layer Defense & Nonce CSP:** Per-request 128-bit `x-nonce` CSP, 6-pass CSS/SVG sanitization, `postMessage` origin-plus-source validation, and DNS-pinned SSRF handlers protect all boundaries.
- **4-Layer Proof & Cutover Boundary:** 318 xUnit, 65 Vitest, 8 live Chromium E2E journeys, and 100/100 security arch-check rules gate code release and external production cutover.

@answer scope="SCRIPE-Backend (49b8f5c76) + SCRIPE-Frontend (d8ec386ad) + SCRIPE-CLI (268f169) + Root (d1c5fdb)"
@meta locale=en

## Which Scanner Reconciliations, Threat Closures & 4-Layer Test Suites Govern Platform Security? {#threat-and-scanner-metrics}

Measured reconciliation counts, threat closures, 4-layer regression tests, and static architectural security rules across `SCRIPE-Backend`, `SCRIPE-Frontend`, and `SCRIPE-Dev-Tools`:

@metric id=m_jsentinel label="JSENTINEL Scanner Reconciliation" value=48 limit=48 unit="findings" note="13 Confirmed Live Drift / App-Hardened closed + 31 Verified Bundle AST False Positives + 4 Managed-Edge items."
@metric id=m_threats label="Net-New Platform Threats Closed" value=26 limit=26 unit="closed" note="3 Critical (TH-API-01, TH-TEN-01, TH-TEN-02) + 15 High + 8 Medium threats remediated alongside 7 Phase S2 review catches."
@metric id=m_tests label="4-Layer Automated Security Suite" value=391 limit=391 unit="pass" note="318/318 Layer 1 xUnit across 36 classes + 65/65 Layer 2 Vitest (13 files) + 8/8 Layer 3 Live Chromium E2E journeys."
@metric id=m_arch label="Security Arch-Check & 0-CVE Gate" value=100 limit=100 unit="score" note="100/100 on BE-040..042 and FE-034..036 + 6/6 CI workflow policy tests + 0 NuGet CVEs across 88 projects + 0 pnpm advisories."

```mermaid title="Verified Enterprise Security Assurance Reconciliation, Threat Closure & Test Scoreboard"
xychart-beta horizontal
  x-axis ["xUnit Security (318)", "Security Arch (100)", "BE Projects 0-CVE (88)", "Vitest Security (65)", "JSENTINEL Total (48)", "Net-New Threats (26)", "JSENTINEL Hardened (13)", "Live Chromium E2E (8)", "Review Catches (7)", "CI Policy Tests (6)"]
  y-axis "Verified Count / Score" 0 --> 340
  bar "Verified Metric" [318, 100, 88, 65, 48, 26, 13, 8, 7, 6]
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
| st-csp | Per-Request Nonce CSP & Frame Policy | `src/proxy.ts` and `security-headers.ts` mint a 128-bit cryptographic `x-nonce` per request, enforce `script-src 'self' 'nonce-<b64>'`, and restrict `SAMEORIGIN` framing strictly to `/en/dashboard/studio/preview/*` (`DENY` elsewhere). | platform-security-arch | edge_csp |
| st-client | Sanitization, `postMessage` & `sw.js` v3 | 6-pass `sanitize-css.ts` strips `url()`/`@import`/Unicode escapes, `sanitize-svg.ts` blocks dangerous tags, `postmessage-security.ts` verifies `origin`+`source`+schema, `/sw.js` (`scripe-v3-static-only`) excludes `/api/` & `/auth/`, and logout wipes storage. | platform-security-arch | client_store |
| st-ingress | Kestrel Ingress, FallbackPolicy & `no-store` | Global `FallbackPolicy` (`TH-TEN-05`) closes anonymous mutation fallbacks, `RateLimitingMiddleware` fails closed in production (`TH-TEN-06`), `ForwardLimit = 2` hardens proxy trust (`E1`), and `GET`/`POST` login emit `Cache-Control: no-store`. | platform-security-arch | api_ingress |
| st-tenant | 19-Module Tenant, DSR, FLS & Custom Domain | `CreateDataSubjectRequestCommandHandler` enforces `SubjectUserId == callerUserId` (`TH-TEN-01`), `AddCustomDomainCommandHandler` requires `_scripe-verify.<domain>` DNS TXT (`TH-TEN-02`), and `FieldMaskingHelper` / `RequireOperationalScope` protect all 19 modules. | platform-security-arch | tenant_fls |
| st-ssrf | DNS-Pinned SSRF & Constant-Time Webhooks | `SsrfSafeHttpClientHandlerFactory` pins validated public IPs in `ConnectCallback` with `AllowAutoRedirect = false` (`TH-API-02`, `B2-1`), Paymob/PayPal/Elsystem webhooks enforce constant-time HMAC (`TH-API-01`, `TH-API-03`), and plugin JWTs use an isolated secret (`TH-API-04`). | platform-security-arch | ssrf_crypto |
| st-ci | Static Security Rules, Fail-Closed Audit & RE2 | `BE-040..042` and `FE-034..036` enforce domain-first naming and security rules (`100/100`), `scripe audit --json` fails closed on advisories (`01fa10b`), `.gitleaks.toml` uses Go RE2 syntax (`d1c5fdb`), and `Dockerfile` runs rootless (`cc11ad9e5`). | platform-security-arch | ci_audit |

```csharp title="SCRIPE-Backend: DNS-Pinned SSRF ConnectCallback & Constant-Time Paymob Webhook HMAC"
// SsrfSafeHttpClientHandlerFactory.cs + PaymobPaymentGateway.cs (8567de9c3 / b7f00a236)
var resolvedIps = await SsrfUrlValidator.ValidateAndResolvePublicIpsAsync(uri, ct);
handler.AllowAutoRedirect = false; // Every 301/302/307/308 hop re-validated against RFC1918/link-local
var expectedBytes = Encoding.UTF8.GetBytes(computedHex.ToLowerInvariant());
var providedBytes = Encoding.UTF8.GetBytes(hmacHeader.Trim().ToLowerInvariant());
if (!CryptographicOperations.FixedTimeEquals(expectedBytes, providedBytes))
    return Result.Failure(Error.Unauthorized("Payment.InvalidSignature"));
```

## How Does the 4×9 Domain-Identity Assurance Flow Execute & What Governs External Production Cutover? {#live-assurance-verification-sequence}

Every request is evaluated across 4 domain tiers (`D1` Central Auth, `D2` Tenant Subdomains, `D3` Custom Domains, `D4` Invalid/SQLi). It simultaneously enforces 9 identity tiers (`I1` Protected Super Admin through `I9` Suspended Accounts and Tenants).

@sequence id=security-assurance-seq title="Live Security Verification Flow Across Domain Tiers D1-D4 & Identity Tiers I1-I9"
| actor browser | Browser / Playwright | frontend |
| actor proxy | Next.js Nonce Proxy | frontend |
| actor studio | Studio Preview Guard | frontend |
| actor api | .NET 10 API Ingress | backend |
| actor guard | Tenant, DSR & SSRF Guard | security |
| browser | proxy | GET /en/auth/signin or /en/dashboard/studio |
| proxy | browser | x-nonce CSP + DENY (or SAMEORIGIN on /preview/*) | return |
| browser | studio | Dispatch cross-origin postMessage spoofing payload | emphasis |
| studio | browser | Reject mismatched event.origin / event.source / schema | return |
| browser | api | Anonymous or cross-tenant POST / DSR / Webhook | security |
| api | guard | FallbackPolicy + SubjectUserId + FixedTimeEquals | security |
| guard | api | 401/403/400 + tenant-prefixed cache key | return |
| api | browser | Fail-closed response + Cache-Control: no-store | return |

@callout id=cutover-boundary level=warning title="Release Readiness Verdict: Scoped GO vs. Conditional NO-GO for External Production Cutover"
Code, pre-production, and local UAT hold a **Scoped GO** (`a64aa9a4f` Backend, `d8ec386ad` Frontend, `268f169` Dev-Tools, `d1c5fdb` root). Unconditional external production cutover remains a **Conditional NO-GO** until four live infrastructure gates pass. Gate 1 requires Vercel production redeploy (`>= d8ec386ad`) serving per-request `x-nonce` CSP and `scripe-v3-static-only` `/sw.js`. Gate 2 requires Railway production deploy (`>= efc0c6219`) with `ForwardedHeaders__ForwardLimit=2`, `ForwardedHeaders__KnownNetworks__0`, and `GeoIp__OriginVerificationSecret`. Gate 3 requires `auth.scripe.org` DNS and Vercel domain attachment (`EnableCentralNativeAndPasskeyMigration=false`, `RpId=admin.scripe.org`). Gate 4 covers live external IdP credentials plus carried post-launch notes (`V10.2.2`, `IdEncryption` fallback, OTP digits/TTL, and `FileGuard` cell-level FLS).

## Which Commits & Automated Test Suites Prove Each Threat Category & 4×9 Isolation Invariant? {#domain-identity-and-threat-matrix}

| Security Axis / Finding Group | Scope & Disposition | Primary Code & Commit Anchors | Automated Verification Proof |
| --- | --- | --- | --- |
| JSENTINEL Confirmed / App-Hardened (`13`) | `F02, F10, F11, F12-F17, F18, F28, F29, F30` closed in code (`x-nonce` CSP, 6-pass CSS/SVG sanitizer, `postMessage` guard, `sw.js` v3, storage wipe, `no-store` login) | `ed2a07b3e`, `b70d0fd35`, `3a4f78c62`, `baaa235aa`, `330795b63`, `7593d3752` | `65/65` Vitest (`13/13` files) + `8/8` Live Chromium E2E (`d8ec386ad`) |
| JSENTINEL False Positives (`31`) & Edge (`4`) | `F01, F03-F08, F19-F27, F31-F37, F39-F42, F44, F45, F47, F48` (Next.js bundle AST tokens); `F09, F38, F43, F46` (Cloudflare / Vercel / Railway edge headers) | `PLATFORM_SECURITY_AUDIT.md` (`49b8f5c76`) | `BrowserBundleFalsePositiveRegressionTests` + `SecurityHeadersMiddlewareTests` |
| Critical Net-New Threats (`3`) | `TH-API-01` Paymob/PayPal webhook auth & constant-time HMAC; `TH-TEN-01` Compliance DSR subject ownership; `TH-TEN-02` Custom-Domain `_scripe-verify` DNS TXT & ASCII FQDN | `8567de9c3`, `b446a5575`, `9fffee765` | `PaymentWebhookSecurityHardeningTests`, `ComplianceAndCustomDomainIsolationTests` |
| High & Medium Platform Threats (`23`) | `TH-TEN-03..07` (FLS, operational scope, anonymous fallback, rate limit, tenant cache), `TH-API-02..04` (DNS-pinned SSRF, Elsystem HMAC, plugin JWT), `TH-WEB-01..03`, `TH-STOR-01..04`, `TH-INFRA-01..02`, `TH-SUP-01..06` | `32761d90b`, `18f8be4c7`, `b7f00a236`, `cc11ad9e5`, `64215a462`, `871195572`, `01fa10b`, `d1c5fdb` | `318/318` Layer 1 xUnit (`36` classes) + `6/6` `.github/tests/*.mjs` (`268f169`) |
| Independent Security Review Catches (`7`) | `S2.2-1` preview-only framing, `J3-1/J3-2` 6-pass CSS url/Unicode stripping, `J3-3` strict `postMessage` source, `J1` logout wipe, `B2-1/B2-2` manual SSRF redirect hop check, `S2.3-1` `POST` `no-store`, `E1` `ForwardLimit=2` | `b70d0fd35`, `3a4f78c62`, `baaa235aa`, `b7f00a236`, `7593d3752`, `64215a462` | `csp-and-frame-policy.security.test.ts`, `sanitize-css.security.test.ts`, `SsrfRedirectHopPinningTests` |
| 4-Tier Domain × 9-Tier Identity Matrix (`D1-D4` × `I1-I9`) | `D1` Platform/Central Auth, `D2` Tenant Subdomains, `D3` Verified Custom Domains, `D4` Invalid/SQLi × `I1` Protected Super Admin .. `I9` Suspended Accounts/Tenants | `central-identity-federation-fullstack.html`, `backend-central-federation-relay-sequence.html`, `frontend-central-auth-sudo-mvvm.html` | `platform-security-assurance-matrix.spec.ts` (`4/4`) + `central-federation-and-account-security.spec.ts` (`4/4`) |
