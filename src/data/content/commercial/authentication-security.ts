import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  { type: "paragraph", contentKey: "commercial.authSecurity.intro" },

  { type: "heading", level: 2, titleKey: "commercial.authSecurity.jwtTitle", id: "jwt" },
  { type: "paragraph", contentKey: "commercial.authSecurity.jwtContent" },
  {
    type: "table",
    headers: ["Feature", "Implementation"],
    rows: [
      ["Token Algorithm", "HS256 (HMAC-SHA256) for API Bearer JWTs; RS256 for OpenIddict OIDC Server"],
      ["Access Token Lifetime", "Configurable (default: 30 minutes via Jwt:ExpiryMinutes / SessionPolicy)"],
      ["Refresh Token Lifetime", "Configurable (default: 7 days; AbsoluteExpiresAt 24h / >=30d / 8h imp)"],
      ["Token Storage", "Access token in client memory; refresh token in HttpOnly SameSite=Lax cookie ({CookiePrefix}_refresh_token or __Host-scripe_refresh_token relay)"],
      ["Claims", "jti, sub, admin, tenantId, mcp, mfa_enroll, scripe_iat_ms (roles/permissions live via IAdminPermissionCache)"],
      ["Revocation & Cookies", "JTI denylist + 5ms millisecond cutoff + BrandingSettings dynamic cookies"],
    ],
  },

  { type: "heading", level: 2, titleKey: "commercial.authSecurity.twoFaTitle", id: "2fa" },
  { type: "paragraph", contentKey: "commercial.authSecurity.twoFaContent" },
  {
    type: "step-guide",
    steps: [
      {
        titleKey: "commercial.authSecurity.twoFa1Title",
        contentKey: "commercial.authSecurity.twoFa1Content",
      },
      {
        titleKey: "commercial.authSecurity.twoFa2Title",
        contentKey: "commercial.authSecurity.twoFa2Content",
      },
      {
        titleKey: "commercial.authSecurity.twoFa3Title",
        contentKey: "commercial.authSecurity.twoFa3Content",
      },
      {
        titleKey: "commercial.authSecurity.twoFa4Title",
        contentKey: "commercial.authSecurity.twoFa4Content",
      },
    ],
  },

  { type: "heading", level: 2, titleKey: "commercial.authSecurity.sessionTitle", id: "session" },
  {
    type: "table",
    headers: ["Feature", "Description"],
    rows: [
      ["Device tracking", "Each login session identified by device fingerprint"],
      ["Active sessions list", "Users can view all active login sessions"],
      ["Force logout", "Admins can terminate any session remotely"],
      ["Concurrent session limit", "Configurable max sessions per user"],
      ["Session expiry", "Automatic cleanup of expired sessions"],
      ["Geo-location tracking", "IP-based location tracking for sessions"],
    ],
  },

  { type: "heading", level: 2, titleKey: "commercial.authSecurity.passwordTitle", id: "password" },
  { type: "paragraph", contentKey: "commercial.authSecurity.passwordContent" },
  {
    type: "list",
    variant: "unordered",
    items: [
      "Minimum length and complexity requirements (configurable)",
      "Password history prevention (last N passwords blocked)",
      "Account lockout after N failed attempts",
      "Automatic unlock after configurable timeout",
      "Password expiration policies (optional)",
      "Versioned $s2$ SHA-256 Base64 pre-hash + BCrypt (work factor 12) + 8,616-entry breached password denylist",
    ],
  },

  { type: "heading", level: 2, titleKey: "commercial.authSecurity.apiTitle", id: "api" },
  {
    type: "api-table",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/auth/admin/login",
        descriptionKey: "Authenticate principal (returns TokenResponse or TwoFactorPendingToken challenge)",
        auth: "Public",
      },
      {
        method: "POST",
        path: "/api/v1/auth/admin/refresh",
        descriptionKey: "Rotate refresh token cookie / payload and issue new JWT pair",
        auth: "Refresh Token",
      },
      {
        method: "POST",
        path: "/api/v1/auth/admin/logout",
        descriptionKey: "Revoke refresh token and clear session cookies (204 No Content)",
        auth: "Public ([AllowAnonymous])",
      },
      {
        method: "POST",
        path: "/api/v1/auth/admin/2fa/enable",
        descriptionKey: "Enable TOTP two-factor authentication (Sudo / Bearer required)",
        auth: "Required",
      },
      {
        method: "POST",
        path: "/api/v1/auth/admin/2fa/verify",
        descriptionKey: "Verify 2FA code via password or single-use TwoFactorPendingToken",
        auth: "Public",
      },
      {
        method: "POST",
        path: "/api/v1/auth/admin/request-password-reset",
        descriptionKey: "Request password recovery challenge (202 Accepted)",
        auth: "Public",
      },
      {
        method: "POST",
        path: "/api/v1/auth/admin/reset-password",
        descriptionKey: "Complete password reset via ResetGrantToken (204 No Content, no auto-login)",
        auth: "Public",
      },
      {
        method: "GET",
        path: "/api/v1/auth/admin/sessions",
        descriptionKey: "List active sessions with device, IP, and absolute expiry",
        auth: "Required",
      },
    ],
  },
];

registerPage({
  slug: "commercial/authentication-security",
  titleKey: "commercial.authSecurity.title",
  descriptionKey: "commercial.authSecurity.description",
  category: "commercial-security",
  order: 2,
  sections,
  relatedSlugs: ["commercial/security-overview", "commercial/data-protection"],
  lastUpdated: "2026-03-13",
});
