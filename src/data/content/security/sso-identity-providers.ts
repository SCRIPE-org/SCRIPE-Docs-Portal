import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  { type: "paragraph", contentKey: "security.sso.intro" },

  // ── How SSO Works ──
  { type: "heading", level: 2, titleKey: "security.sso.howItWorksTitle", id: "how-it-works" },
  { type: "paragraph", contentKey: "security.sso.howItWorksContent" },
  {
    type: "step-guide",
    steps: [
      { titleKey: "security.sso.step1Title", contentKey: "security.sso.step1Content" },
      { titleKey: "security.sso.step2Title", contentKey: "security.sso.step2Content" },
      { titleKey: "security.sso.step3Title", contentKey: "security.sso.step3Content" },
      { titleKey: "security.sso.step4Title", contentKey: "security.sso.step4Content" },
      { titleKey: "security.sso.step5Title", contentKey: "security.sso.step5Content" },
    ],
  },

  // ── PKCE Security ──
  { type: "heading", level: 2, titleKey: "security.sso.pkceTitle", id: "pkce" },
  { type: "paragraph", contentKey: "security.sso.pkceContent" },
  {
    type: "table",
    headers: ["Component", "Purpose"],
    rows: [
      [
        "code_verifier",
        "Cryptographically random string held server-side inside ExternalAuthStateTicket (never browser sessionStorage)",
      ],
      [
        "handoffCode / handoffState",
        "120s single-use ExternalAuthHandoffTicket indexed by SHA-256 hex digest (auth:ext-handoff:{sha256}) with atomic Replay Guard (auth:ext-handoff-used:{sha256})",
      ],
      ["code_challenge", "SHA-256 hash of the code_verifier sent to the IdP"],
      ["state", "CSRF protection — verified on callback"],
      ["Authorization Code", "One-time code from IdP, exchanged server-side"],
    ],
  },

  // ── Identity Provider Model ──
  { type: "heading", level: 2, titleKey: "security.sso.entityModelTitle", id: "entity-model" },
  { type: "paragraph", contentKey: "security.sso.entityModelContent" },
  {
    type: "table",
    headers: ["Field", "Type", "Description"],
    rows: [
      ["Name", "string(100)", "Human-readable provider name (e.g., 'Corporate Azure AD')"],
      ["Slug", "string(50)", "URL-safe identifier, unique per tenant"],
      ["Protocol", "string(30)", "Authentication protocol: oidc, oauth2, saml (future)"],
      ["TenantId", "Guid?", "Null = system-wide; set = tenant-specific provider"],
      ["Authority", "string(500)", "OIDC issuer URL for discovery document"],
      ["ClientId", "string(200)", "OAuth2 client_id registered with the provider"],
      ["ClientSecretEncrypted", "string(500)", "AES-encrypted secret, never returned to frontend"],
      ["Scopes", "string(1000)", "OAuth2 scopes (default: openid profile email)"],
      ["ClaimMappingJson", "string(2000)", "JSON mapping external claims to SCRIPE claims"],
      ["EnabledForAdmins", "bool", "Show on admin login page"],
      ["EnabledForUsers", "bool", "Show on user login page"],
      ["ButtonColor", "string(50)", "CSS color for branded login button"],
      ["ButtonLabel", "string(200)", "Custom button text"],
      ["DisplayOrder", "int", "Sort order on the login page"],
    ],
  },

  // ── External Login Linking ──
  { type: "heading", level: 2, titleKey: "security.sso.linkingTitle", id: "linking" },
  { type: "paragraph", contentKey: "security.sso.linkingContent" },
  {
    type: "list",
    variant: "ordered",
    items: [
      "Admin signs in with username/password (native credentials on admin.scripe.org / *.admin.scripe.org)",
      "Navigates to Account → Security (/account/security) → External Logins",
      "Satisfies Sudo elevation (<SudoVerificationModal /> / X-Sudo-Token) when clicking 'Link External Account'",
      "Frontend calls POST /api/v1/auth/admin/external-logins/initiate-link (direct /external-logins/link returns 410 Gone); server persists ExternalAuthStateTicket",
      "IdP returns centrally to https://api.scripe.org/api/v1/auth/oidc/callback (or /api/v1/auth/saml/acs/{providerId}), creating the ExternalLogin record and minting a link-purpose ExternalAuthHandoffTicket",
      "Browser completes handoff via POST /api/v1/auth/sso/handoff and redirects to /account/security?ssoLinked=success",
    ],
  },

  // ── OAuth Applications ──
  { type: "heading", level: 2, titleKey: "security.sso.oauthAppsTitle", id: "oauth-apps" },
  { type: "paragraph", contentKey: "security.sso.oauthAppsContent" },
  {
    type: "table",
    headers: ["Field", "Description"],
    rows: [
      ["Application Name", "Display name for the third-party app"],
      ["Client ID", "Auto-generated unique identifier"],
      ["Client Secret", "Auto-generated secret (shown only once on creation)"],
      ["Client Type", "Confidential (server-side) or Public (SPA/mobile)"],
      ["Redirect URIs", "Allowed callback URLs"],
      ["Allowed Scopes", "openid, profile, email, roles (configurable)"],
      ["PKCE Required", "Enforce Proof Key for Code Exchange"],
    ],
  },

  // ── Claim Mapping ──
  { type: "heading", level: 2, titleKey: "security.sso.claimMappingTitle", id: "claim-mapping" },
  { type: "paragraph", contentKey: "security.sso.claimMappingContent" },
  {
    type: "code",
    language: "json",
    code: `{
  "sub": "oid",
  "email": "preferred_username",
  "name": "display_name",
  "given_name": "first_name",
  "family_name": "last_name"
}`,
  },

  // ── Tenant Scoping ──
  { type: "heading", level: 2, titleKey: "security.sso.tenantScopingTitle", id: "tenant-scoping" },
  { type: "paragraph", contentKey: "security.sso.tenantScopingContent" },
  {
    type: "info",
    variant: "note",
    contentKey: "security.sso.tenantScopingNote",
  },

  // ── Custom-Domain HMAC Session Relay & Split Logout ──
  {
    type: "heading",
    level: 2,
    titleKey: "security.sso.centralRelayTitle",
    id: "custom-domain-session-relay",
  },
  { type: "paragraph", contentKey: "security.sso.centralRelayContent" },
  {
    type: "heading",
    level: 2,
    titleKey: "security.sso.splitLogoutTitle",
    id: "split-logout-scope",
  },
  { type: "paragraph", contentKey: "security.sso.splitLogoutContent" },
  {
    type: "table",
    headers: ["Provider / Edge Layer", "Protocol & Canonical Callback", "Mandatory Production Setup & Invariants"],
    rows: [
      [
        "Cloudflare & Railway Edge (api.scripe.org / auth.scripe.org)",
        "Orange Cloud on api.scripe.org · Grey Cloud DNS-only on auth/admin.scripe.org",
        "Inject X-Scripe-Origin-Verify via Cloudflare Transform Rule (/health/ready probe bypass); set ForwardedHeaders__ForwardLimit=2 + KnownNetworks__0 on Railway (fixes OpenIddict ID2083); set Saml__SpBaseUrl=https://api.scripe.org and SCRIPE_API_INTERNAL_URL=https://api.scripe.org/api",
      ],
      [
        "Google Workspace",
        "oidc · GET https://api.scripe.org/api/v1/auth/oidc/callback",
        "Authority https://accounts.google.com; scopes 'openid email profile'; PKCE S256; keep TrustIdpMfa = false so HybridMfaPolicy enforces SCRIPE 2FA/Passkey when required",
      ],
      [
        "Microsoft Entra ID (Azure AD)",
        "oidc · GET https://api.scripe.org/api/v1/auth/oidc/callback",
        "Authority https://login.microsoftonline.com/<Tenant-GUID|organizations|common>/v2.0 (replace literal {tenant-id} before Test Connection); enable optional ID token claims 'email' and 'xms_edov' for verified-email auto-linking",
      ],
      [
        "GitHub OAuth2",
        "oauth2 + PKCE S256 · GET https://api.scripe.org/api/v1/auth/oidc/callback",
        "Authorize https://github.com/login/oauth/authorize, Token https://github.com/login/oauth/access_token, UserInfo https://api.github.com/user (User-Agent: SCRIPE-SSO/1.0); mandatory scopes 'user:email read:user' (queries /user/emails for verified address); TrustIdpMfa = false",
      ],
      [
        "Enterprise SAML 2.0 (Okta / Entra SAML / ADFS / Ping)",
        "saml · POST https://api.scripe.org/api/v1/auth/saml/acs/{encryptedProviderId}",
        "Two-step setup: create provider in SCRIPE first with SamlIdpEntityId, SamlSsoUrl & X.509 SamlCertificate to obtain encrypted ACS URL; register SP Entity ID https://api.scripe.org at IdP; rejects unsolicited IdP-initiated assertions (RelayState + InResponseTo) and enforces verified TenantDomain on Global SAML (SEC-SAML-01)",
      ],
      [
        "Custom-Domain + Hybrid-2FA Post-MFA Bridge (#227/#228)",
        "POST /api/v1/auth/admin|user/2fa/verify -> POST /api/v1/auth/sso/handoff",
        "PostMfaHandoffHelper + TenantOriginOwnershipValidator + ssoTwoFactorBridge.ts mint a post-MFA 120s ExternalAuthHandoffTicket on auth.scripe.org/sso/continue and return cleanly to verified {ReturnOrigin}/sso/callback",
      ],
    ],
  },

  // ── API Endpoints ──
  { type: "heading", level: 2, titleKey: "security.sso.apiTitle", id: "api" },
  {
    type: "api-table",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/auth/oidc/providers/admin",
        descriptionKey: "List SSO providers for admin login",
        auth: "Public",
      },
      {
        method: "GET",
        path: "/api/v1/auth/oidc/providers/user",
        descriptionKey: "List SSO providers for user login",
        auth: "Public",
      },
      {
        method: "POST",
        path: "/api/v1/auth/oidc/challenge",
        descriptionKey: "Create server-side ExternalAuthStateTicket + PKCE challenge & IdP URL",
        auth: "Public",
      },
      {
        method: "GET",
        path: "/api/v1/auth/oidc/callback",
        descriptionKey: "Central OIDC callback on api.scripe.org consuming ExternalAuthStateTicket and minting 120s ExternalAuthHandoffTicket",
        auth: "Public ([AllowAnonymous])",
      },
      {
        method: "POST",
        path: "/api/v1/auth/saml/acs/{providerId}",
        descriptionKey: "Central SAML 2.0 ACS handler validating XML signatures and minting 120s ExternalAuthHandoffTicket",
        auth: "Public ([AllowAnonymous])",
      },
      {
        method: "POST",
        path: "/api/v1/auth/sso/handoff",
        descriptionKey: "Atomically redeem 120s SHA-256 ExternalAuthHandoffTicket (auth:ext-handoff-used:{sha256})",
        auth: "Public ([AllowAnonymous])",
      },
      {
        method: "POST",
        path: "/api/v1/auth/oidc/callback",
        descriptionKey: "Direct OIDC POST callback exchange (single-origin / continuation flows)",
        auth: "Public",
      },
      {
        method: "POST",
        path: "/api/auth/session/establish",
        descriptionKey: "Next.js BFF custom-domain HMAC micro-relay setting first-party __Host-scripe_refresh_token",
        auth: "Same-Origin + HMAC-SHA256 Relay",
      },
      {
        method: "POST",
        path: "/api/auth/session/refresh",
        descriptionKey: "Next.js BFF custom-domain HMAC micro-relay rotating __Host-scripe_refresh_token",
        auth: "__Host-scripe_refresh_token + HMAC Relay",
      },
      {
        method: "POST",
        path: "/api/auth/session/logout",
        descriptionKey: "Next.js BFF custom-domain HMAC micro-relay forwarding logoutScope ('app' | 'central') and clearing local cookie",
        auth: "__Host-scripe_refresh_token + HMAC Relay",
      },
      {
        method: "GET",
        path: "/api/v1/IdentityProviders",
        descriptionKey: "List identity providers (CRUD)",
        auth: "Required",
        permission: "identity_providers.view",
      },
      {
        method: "POST",
        path: "/api/v1/IdentityProviders",
        descriptionKey: "Create identity provider",
        auth: "Required",
        permission: "identity_providers.create",
      },
      {
        method: "PUT",
        path: "/api/v1/IdentityProviders/{id}",
        descriptionKey: "Update identity provider",
        auth: "Required",
        permission: "identity_providers.update",
      },
      {
        method: "DELETE",
        path: "/api/v1/IdentityProviders/{id}",
        descriptionKey: "Delete identity provider",
        auth: "Required",
        permission: "identity_providers.delete",
      },
      {
        method: "POST",
        path: "/api/v1/IdentityProviders/{id}/test",
        descriptionKey: "Test OIDC connection",
        auth: "Required",
        permission: "identity_providers.update",
      },
      {
        method: "GET",
        path: "/api/v1/OAuthApplications",
        descriptionKey: "List OAuth applications (CRUD)",
        auth: "Required",
        permission: "oauth_apps.view",
      },
      {
        method: "POST",
        path: "/api/v1/OAuthApplications",
        descriptionKey: "Create OAuth application",
        auth: "Required",
        permission: "oauth_apps.create",
      },
      {
        method: "POST",
        path: "/api/v1/OAuthApplications/{id}/regenerate-secret",
        descriptionKey: "Regenerate client secret",
        auth: "Required",
        permission: "oauth_apps.update",
      },
    ],
  },
];

registerPage({
  slug: "security/sso-identity-providers",
  titleKey: "security.sso.title",
  descriptionKey: "security.sso.description",
  category: "security",
  order: 7,
  sections,
  relatedSlugs: ["security/authentication-deep", "security/api-security", "features/sso-oauth"],
  lastUpdated: "2026-06-28",
});
