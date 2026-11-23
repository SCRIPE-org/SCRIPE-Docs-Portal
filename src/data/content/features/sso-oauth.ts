import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  { type: "paragraph", contentKey: "features.ssoOauth.intro" },

  // ── Feature Overview ──
  { type: "heading", level: 2, titleKey: "features.ssoOauth.overviewTitle", id: "overview" },
  {
    type: "feature-grid",
    columns: 2,
    items: [
      {
        icon: "Fingerprint",
        titleKey: "features.ssoOauth.feat1Title",
        descriptionKey: "features.ssoOauth.feat1Desc",
      },
      {
        icon: "KeyRound",
        titleKey: "features.ssoOauth.feat2Title",
        descriptionKey: "features.ssoOauth.feat2Desc",
      },
      {
        icon: "Shield",
        titleKey: "features.ssoOauth.feat3Title",
        descriptionKey: "features.ssoOauth.feat3Desc",
      },
      {
        icon: "Building2",
        titleKey: "features.ssoOauth.feat4Title",
        descriptionKey: "features.ssoOauth.feat4Desc",
      },
    ],
  },

  // ── Configuration Guide ──
  { type: "heading", level: 2, titleKey: "features.ssoOauth.configTitle", id: "configuration" },
  { type: "paragraph", contentKey: "features.ssoOauth.configContent" },
  {
    type: "step-guide",
    steps: [
      {
        titleKey: "features.ssoOauth.config1Title",
        contentKey: "features.ssoOauth.config1Content",
      },
      {
        titleKey: "features.ssoOauth.config2Title",
        contentKey: "features.ssoOauth.config2Content",
      },
      {
        titleKey: "features.ssoOauth.config3Title",
        contentKey: "features.ssoOauth.config3Content",
      },
      {
        titleKey: "features.ssoOauth.config4Title",
        contentKey: "features.ssoOauth.config4Content",
      },
      {
        titleKey: "features.ssoOauth.config5Title",
        contentKey: "features.ssoOauth.config5Content",
      },
    ],
  },

  // ── Manager Pages ──
  { type: "heading", level: 2, titleKey: "features.ssoOauth.managementTitle", id: "management" },
  { type: "paragraph", contentKey: "features.ssoOauth.managementContent" },
  {
    type: "table",
    headers: ["Page", "URL", "Permission", "Purpose"],
    rows: [
      [
        "Identity Providers",
        "/settings/identity-providers",
        "identity_providers.view",
        "CRUD management of external IdPs (Azure AD, Google, Okta, etc.)",
      ],
      [
        "OAuth Applications",
        "/settings/oauth-apps",
        "oauth_apps.view",
        "Register third-party apps that login via SCRIPE as OIDC server",
      ],
    ],
  },

  // ── Login Flow ──
  { type: "heading", level: 2, titleKey: "features.ssoOauth.loginFlowTitle", id: "login-flow" },
  { type: "paragraph", contentKey: "features.ssoOauth.loginFlowContent" },
  {
    type: "list",
    variant: "ordered",
    items: [
      "User visits https://auth.scripe.org (or tenant login origin) — OriginRouting and Tenancy:AuthBaseUrl discover enabled SSO providers via GET /api/v1/auth/oidc/providers/admin",
      "User clicks a provider button → frontend calls POST /api/v1/auth/oidc/challenge → backend stores code_verifier, nonce, state, and validated returnOrigin in server-side ExternalAuthStateTicket (never sessionStorage)",
      "Browser redirects to the external IdP (Azure AD, Google, Okta, etc.) with redirect_uri pinned to central https://api.scripe.org/api/v1/auth/oidc/callback (or /api/v1/auth/saml/acs/{providerId})",
      "IdP returns authorization code / SAML assertion centrally to api.scripe.org; backend exchanges code server-side using the stored code_verifier and validates tenant status + HybridMfaPolicy",
      "Backend mints a 120s single-use SHA-256 ExternalAuthHandoffTicket (auth:ext-handoff:{sha256}) and 302-redirects to https://auth.scripe.org/sso/continue (workspace picker / 2FA) or verified {ReturnOrigin}/sso/callback?code=&state=",
      "Destination callback calls POST /api/v1/auth/sso/handoff (or Next.js /api/auth/session/establish HMAC micro-relay on verified custom domains) to atomically claim auth:ext-handoff-used:{sha256}",
      "Custom domains receive a first-party __Host-scripe_refresh_token (HttpOnly, Secure, SameSite=Lax) cookie, while platform origins use {CookiePrefix}_refresh_token + memory JWT",
      "Frontend keeps bearer tokens in memory (useAppStore), validates tab principal scope via BroadcastChannel + ActivePrincipal, and routes cleanly while preserving scr.oidc.session across app-scoped logouts",
    ],
  },

  // ── Central Federation & Custom-Domain Relay ──
  {
    type: "heading",
    level: 2,
    titleKey: "features.ssoOauth.centralFederationTitle",
    id: "central-federation",
  },
  { type: "paragraph", contentKey: "features.ssoOauth.centralFederationContent" },
  {
    type: "table",
    headers: ["Setting / Route", "Role", "Security Invariant"],
    rows: [
      [
        "Authentication:CentralFederation",
        "Master feature-flag block in CentralFederationOptions.cs",
        "Enables central callbacks, SHA-256 handoff, dynamic CORS/CSRF, custom-domain relay, and keeps EnableCentralNativeAndPasskeyMigration = false",
      ],
      [
        "Tenancy:AuthBaseUrl & OpenIddict:FrontendBaseUrl",
        "Decoupled interactive UI origin (https://auth.scripe.org)",
        "Separates central Auth/Consent UI from https://api.scripe.org external callbacks and workspace dashboards",
      ],
      [
        "/api/auth/session/{establish,refresh,logout}",
        "First-party Next.js BFF HMAC micro-relay for custom domains",
        "Enforces Sec-Fetch-Site/Origin + HMAC-SHA256 (30s skew, 60s atomic nonce in SessionRelayAuthenticator); issues __Host-scripe_refresh_token",
      ],
      [
        "IVerifiedOriginEvaluator",
        "60s generation-cached custom-domain verifier",
        "Authorizes active non-suspended verified tenant origins dynamically in DynamicVerifiedCorsPolicyProvider and CSRF guards",
      ],
    ],
  },

  // ── Tenant Scoping ──
  { type: "heading", level: 2, titleKey: "features.ssoOauth.scopingTitle", id: "scoping" },
  { type: "paragraph", contentKey: "features.ssoOauth.scopingContent" },
  {
    type: "info",
    variant: "tip",
    contentKey: "features.ssoOauth.scopingTip",
  },

  // ── SAML 2.0 & Cryptographic Assertion Security ──
  { type: "heading", level: 2, titleKey: "features.ssoOauth.samlTitle", id: "saml-integration" },
  { type: "paragraph", contentKey: "features.ssoOauth.samlContent" },

  // ── OIDC Callback & Workspace Caching Flow ──
  {
    type: "heading",
    level: 2,
    titleKey: "features.ssoOauth.oidcCallbackTitle",
    id: "oidc-caching",
  },
  { type: "paragraph", contentKey: "features.ssoOauth.oidcCallbackContent" },

  // ── OAuth Application Mirroring & Subscription Quotas ──
  {
    type: "heading",
    level: 2,
    titleKey: "features.ssoOauth.oauthMirroringTitle",
    id: "oauth-quotas",
  },
  { type: "paragraph", contentKey: "features.ssoOauth.oauthMirroringContent" },
];

registerPage({
  slug: "features/sso-oauth",
  titleKey: "features.ssoOauth.title",
  descriptionKey: "features.ssoOauth.description",
  category: "features",
  order: 14,
  sections,
  relatedSlugs: ["security/sso-identity-providers", "features/authentication"],
  lastUpdated: "2026-06-28",
});
