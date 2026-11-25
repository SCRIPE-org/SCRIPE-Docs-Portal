import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  { type: "paragraph", contentKey: "security.overview.intro" },
  {
    type: "heading",
    level: 2,
    titleKey: "security.overview.layersTitle",
    id: "security-layers",
  },
  {
    type: "flowchart",
    title: "Security Defense Layers",
    direction: "vertical",
    nodes: [
      { id: "l1", label: "Layer 1: Network (CORS + HSTS + Rate Limiting)", type: "danger" },
      { id: "l2", label: "Layer 2: Authentication (JWT + 2FA + Lockout)", type: "warning" },
      { id: "l3", label: "Layer 3: Authorization (RBAC + Permissions)", type: "info" },
      { id: "l4", label: "Layer 4: Data (Tenant Isolation + Encryption)", type: "primary" },
      { id: "l5", label: "Layer 5: Audit (Full Event Logging + Real-time)", type: "success" },
    ],
    connections: [
      { from: "l1", to: "l2" },
      { from: "l2", to: "l3" },
      { from: "l3", to: "l4" },
      { from: "l4", to: "l5" },
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "security.overview.featuresTitle",
    id: "security-features",
  },
  {
    type: "feature-grid",
    columns: 3,
    items: [
      {
        icon: "lock",
        titleKey: "security.overview.featureJwt",
        descriptionKey: "security.overview.featureJwtDesc",
      },
      {
        icon: "shield",
        titleKey: "security.overview.feature2fa",
        descriptionKey: "security.overview.feature2faDesc",
      },
      {
        icon: "key",
        titleKey: "security.overview.featureRbac",
        descriptionKey: "security.overview.featureRbacDesc",
      },
      {
        icon: "clock",
        titleKey: "security.overview.featureRateLimit",
        descriptionKey: "security.overview.featureRateLimitDesc",
      },
      {
        icon: "eye",
        titleKey: "security.overview.featureAudit",
        descriptionKey: "security.overview.featureAuditDesc",
      },
      {
        icon: "globe",
        titleKey: "security.overview.featureCors",
        descriptionKey: "security.overview.featureCorsDesc",
      },
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "security.overview.corsTitle",
    id: "cors-config",
  },
  { type: "paragraph", contentKey: "security.overview.corsIntro" },
  {
    type: "tabs",
    tabs: [
      {
        label: "Development",
        language: "csharp",
        code: `// Development: Open CORS for local testing
policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
      .AllowAnyMethod()
      .AllowAnyHeader()
      .AllowCredentials();`,
      },
      {
        label: "Production",
        language: "csharp",
        code: `// Production: Strict CORS with specific origins
var allowedOrigins = configuration
    .GetSection("CorsSettings:AllowedOrigins")
    .Get<string[]>();

policy.WithOrigins(allowedOrigins)
      .WithMethods("GET", "POST", "PUT", "DELETE")
      .WithHeaders("Content-Type", "Authorization")
      .AllowCredentials();`,
      },
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "security.overview.rateLimitTitle",
    id: "rate-limiting",
  },
  {
    type: "table",
    headers: ["Policy", "Limit", "Window", "Response", "Applied To"],
    rows: [
      ["Global", "1000 req/min", "1 minute", "429 Too Many", "Server-wide DDoS ceiling"],
      ["PerIp", "200 req/min", "1 minute", "429 Too Many", "Per client IP"],
      ["Login", "10 req/5 min (Prod) + 5/15m lockout", "5 minutes", "429 / 423 Locked", "/api/v1/auth/{admin,user}/login & /2fa/verify"],
      ["password-reset", "5 req / 15 min", "15 minutes", "202 Accepted (cooldown) / 429 IP", "/api/v1/auth/{admin,user}/request-password-reset, verify-reset-otp, reset-password"],
      ["mutation-api", "30 req/min", "1 minute", "429 Too Many", "POST/PUT/DELETE endpoints"],
    ],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "security.overview.passwordTitle",
    id: "password-policy",
  },
  {
    type: "table",
    headers: ["Requirement", "Minimum / Default", "Details"],
    rows: [
      ["Length", "8–128 characters", "Configurable via TenantSettings.PasswordMinLength (bounded by Identity.PasswordPolicy.MinLength)"],
      ["Uppercase", "1 character (default: true)", "A-Z configurable via PasswordRequireUppercase"],
      ["Lowercase", "Configurable (default: false)", "a-z configurable via PasswordRequireLowercase"],
      ["Digit", "1 digit (default: true)", "0-9 configurable via PasswordRequireNumber"],
      ["Special Character", "Configurable (default: false)", "Special symbols configurable via PasswordRequireSpecial"],
      ["Password History", "5 previous (0–24)", "PasswordHistory table blocks password reuse per account"],
      ["Breached Denylist", "8,616 entries (default: true)", "CheckBreachedPasswords checks NFKC normalized denylist + context tokens"],
      ["Hashing", "$s2$ SHA-256 + BCrypt (wf 12)", "Versioned SHA-256 Base64 pre-hash prevents >72-byte / NUL truncation with legacy $2a$/$2b$/$2y$ compatibility"],
    ],
  },
  {
    type: "info",
    variant: "warning",
    contentKey: "security.overview.securityWarning",
  },
];

registerPage({
  slug: "security/overview",
  titleKey: "security.overview.title",
  descriptionKey: "security.overview.description",
  category: "security",
  order: 1,
  sections,
  relatedSlugs: ["features/authentication", "features/role-permissions"],
  lastUpdated: "2026-02-19",
});
