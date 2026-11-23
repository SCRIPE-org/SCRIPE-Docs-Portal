// FILE-EXCEPTION: file length
import { registerPage } from "../../repositories/DocsRepository";
import type { DocSection } from "../../../domain/entities/DocSection";

const sections: DocSection[] = [
  { type: "paragraph", contentKey: "security.authDeep.intro" },

  // ─── Multi-Workspace Login Routing ────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.workspaceRoutingTitle",
    id: "workspace-routing",
  },
  { type: "paragraph", contentKey: "security.authDeep.workspaceRoutingIntro" },
  {
    type: "flowchart",
    title: "Multi-Workspace Login Routing",
    direction: "vertical",
    nodes: [
      { id: "login", label: "POST /auth/login", type: "primary" },
      {
        id: "route",
        label: "Route Decision",
        type: "info",
        description: "Inspect tenantId & isPlatformAdmin",
      },
      {
        id: "caseA",
        label: "Case A: Tenant-Scoped",
        type: "primary",
        description: "tenantId present → strict isolation",
      },
      {
        id: "caseAp",
        label: "Case A': Platform Admin",
        type: "success",
        description: "isPlatformAdmin=true → TenantId=null lookup",
      },
      {
        id: "caseB",
        label: "Case B: Discovery",
        type: "warning",
        description: "No tenantId → search all tenants",
      },
      { id: "found0", label: "0 Matches", type: "danger", description: "Invalid credentials" },
      {
        id: "found1",
        label: "1 Match",
        type: "success",
        description: "Direct auth for that tenant",
      },
      { id: "foundN", label: "N Matches", type: "info", description: "Return workspace list" },
      { id: "picker", label: "Workspace Picker (Frontend)", type: "info" },
      { id: "relogin", label: "Re-login with tenantId", type: "primary" },
      { id: "auth", label: "Authenticate", type: "success" },
    ],
    connections: [
      { from: "login", to: "route" },
      { from: "route", to: "caseA", label: "has tenantId" },
      { from: "route", to: "caseAp", label: "isPlatformAdmin" },
      { from: "route", to: "caseB", label: "neither" },
      { from: "caseA", to: "auth" },
      { from: "caseAp", to: "auth" },
      { from: "caseB", to: "found0", label: "no results" },
      { from: "caseB", to: "found1", label: "exact one" },
      { from: "caseB", to: "foundN", label: "multiple" },
      { from: "found1", to: "auth" },
      { from: "foundN", to: "picker" },
      { from: "picker", to: "relogin" },
      { from: "relogin", to: "caseA", style: "dashed" },
    ],
  },
  {
    type: "table",
    headers: ["Flag", "Type", "Purpose"],
    rows: [
      [
        "tenantId",
        "string?",
        "Encrypted tenant ID from workspace selection or domain resolution. Triggers Case A.",
      ],
      [
        "isPlatformAdmin",
        "boolean",
        "Set to true when user selects 'Platform Administration' workspace. Triggers Case A' to prevent infinite discovery loop.",
      ],
    ],
  },
  {
    type: "info",
    variant: "tip",
    contentKey: "security.authDeep.workspaceRoutingTip",
  },

  // ─── JWT Lifecycle ────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.jwtLifecycleTitle",
    id: "jwt-lifecycle",
  },
  { type: "paragraph", contentKey: "security.authDeep.jwtLifecycleIntro" },
  {
    type: "flowchart",
    title: "JWT Token Lifecycle",
    direction: "horizontal",
    nodes: [
      { id: "login", label: "POST /auth/login", type: "primary" },
      {
        id: "validate",
        label: "Validate Credentials",
        type: "warning",
        description: "BCrypt verify + account checks",
      },
      {
        id: "pwExpiry",
        label: "Password Expiry Check",
        type: "warning",
        description: "ITenantPasswordValidator → MustChangePassword",
      },
      {
        id: "issue",
        label: "Issue Token Pair",
        type: "success",
        description: "Access (15min) + Refresh (7d)",
      },
      {
        id: "use",
        label: "API Requests",
        type: "info",
        description: "Bearer token in Authorization header",
      },
      { id: "expire", label: "Access Token Expires", type: "danger" },
      { id: "refresh", label: "POST /auth/refresh", type: "primary" },
      {
        id: "reissue",
        label: "New Token Pair",
        type: "success",
        description: "Old refresh token revoked",
      },
      {
        id: "logout",
        label: "POST /auth/logout",
        type: "danger",
        description: "Revoke all tokens",
      },
    ],
    connections: [
      { from: "login", to: "validate" },
      { from: "validate", to: "pwExpiry" },
      { from: "pwExpiry", to: "issue", label: "not expired" },
      { from: "issue", to: "use" },
      { from: "use", to: "expire", label: "after 15min" },
      { from: "expire", to: "refresh" },
      { from: "refresh", to: "reissue" },
      { from: "reissue", to: "use", label: "continue", style: "dashed" },
      { from: "use", to: "logout" },
    ],
  },

  // ─── JWT Token Structure ──────────────────────────────────
  {
    type: "heading",
    level: 3,
    titleKey: "security.authDeep.tokenStructureTitle",
    id: "token-structure",
  },
  {
    type: "code",
    language: "json",
    filename: "Access Token Payload (decoded)",
    code: `{
  "sub": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "admin@example.com",
  "given_name": "John",
  "family_name": "Doe",
  "role": "SuperAdmin",
  "permissions": [
    "admins.view", "admins.create", "admins.update",
    "users.view", "users.create", "roles.manage"
  ],
  "tenant_id": "f8e7d6c5-b4a3-2190-fedc-ba0987654321",
  "is_admin": "true",
  "impersonator_id": null,
  "iat": 1708444800,
  "exp": 1708445700,
  "iss": "scripe-api",
  "aud": "scripe-client"
}`,
  },
  {
    type: "table",
    headers: ["Claim", "Purpose", "Set By"],
    rows: [
      ["sub", "User/Admin unique ID (Guid)", "JwtService"],
      ["email", "Email address", "JwtService"],
      ["role", "Primary role name", "JwtService"],
      ["permissions", "Array of permission slugs", "JwtService (from role)"],
      ["tenant_id", "Owning tenant ID", "JwtService"],
      ["is_admin", "Admin vs User discriminator", "JwtService"],
      ["impersonator_id", "Original admin ID during impersonation", "ImpersonateCommand"],
      ["exp", "Expiration (15 min default)", "JwtService"],
    ],
  },

  // ─── Versioned Pre-Hashed BCrypt ($s2$) & Reuse Guards ───
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.bcryptTitle",
    id: "bcrypt",
  },
  { type: "paragraph", contentKey: "security.authDeep.bcryptIntro" },
  {
    type: "code",
    language: "csharp",
    filename: "Identity.Infrastructure/Services/PasswordHasher.cs",
    code: `// Versioned SHA-256 Base64 pre-hash ($s2$) + BCrypt (work factor 12)
// Eliminates silent 72-byte / NUL-byte BCrypt truncation while retaining $2a$/$2b$/$2y$ verify compatibility
private const int WorkFactor = 12;
private const string PreHashPrefix = "$s2$";

public string Hash(string password)
{
    var digest = Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(password)));
    return string.Concat(PreHashPrefix, BCrypt.Net.BCrypt.HashPassword(digest, WorkFactor));
}

public bool Verify(string password, string hash) =>
    hash.StartsWith(PreHashPrefix, StringComparison.Ordinal)
        ? BCrypt.Net.BCrypt.Verify(PreHash(password), hash[PreHashPrefix.Length..])
        : BCrypt.Net.BCrypt.Verify(password, hash);`,
  },
  {
    type: "table",
    headers: ["Control", "Default / Scope", "Enforcement Point"],
    rows: [
      ["Hash Scheme", "$s2$ SHA-256 Base64 pre-hash + BCrypt wf 12", "PasswordHasher.cs (all password writes)"],
      ["Password History", "5 previous hashes (configurable 0–24)", "PasswordHistory table via IPermission/IPasswordMutationService"],
      ["Breached Denylist", "8,616 NFKC-normalized entries + repeated-char check", "BreachedPasswordChecker.cs (CheckBreachedPasswords = true)"],
      ["Context Identifiers", "Rejects email local-part, username, name, tenant code, 'scripe'", "BreachedPasswordChecker.ContainsContextIdentifier"],
      ["Complexity Bounds", "8–128 chars, Upper=true, Digit=true, Lower/Special configurable", "ITenantPasswordValidator + PasswordValidationService"],
    ],
  },

  // ─── Account Lockout ──────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.lockoutTitle",
    id: "account-lockout",
  },
  { type: "paragraph", contentKey: "security.authDeep.lockoutIntro" },
  {
    type: "flowchart",
    title: "Account Lockout Flow",
    direction: "vertical",
    nodes: [
      { id: "attempt", label: "Login / 2FA Attempt", type: "primary" },
      { id: "check", label: "Check LockoutEnd > UtcNow", type: "info" },
      { id: "locked", label: "Account Locked", type: "danger", description: "Return AUTH_ACCOUNT_LOCKED (423)" },
      { id: "verify", label: "Verify Credential ($s2$ / TOTP)", type: "warning" },
      { id: "fail", label: "Invalid Credential", type: "danger", description: "Increment FailedLoginAttempts" },
      { id: "threshold", label: "Attempts >= Effective MaxAttempts (default 5)?", type: "warning" },
      { id: "lock", label: "Lock Account (default 15 min)", type: "danger" },
      { id: "success", label: "Verification Success", type: "success", description: "ResetFailedAttempts()" },
    ],
    connections: [
      { from: "attempt", to: "check" },
      { from: "check", to: "locked", label: "is locked" },
      { from: "check", to: "verify", label: "not locked" },
      { from: "verify", to: "fail", label: "wrong" },
      { from: "verify", to: "success", label: "correct" },
      { from: "fail", to: "threshold" },
      { from: "threshold", to: "lock", label: "yes" },
      { from: "threshold", to: "attempt", label: "no", style: "dashed" },
    ],
  },
  {
    type: "table",
    headers: ["Setting", "Default Value", "Resolution Source"],
    rows: [
      ["LoginLockoutThreshold", "5 failed attempts", "TenantSettings / Security:MaxFailedAttempts clamped by Identity.Login.MaxAttempts"],
      ["LoginLockoutMinutes", "15 minutes", "TenantSettings / Security:LockoutMinutes via ISecurityPolicyService"],
      ["Lockout on First Failure", "No", "—"],
      ["Reset Counter on Success", "Yes (automatic)", "—"],
      ["Admin Can Unlock", "Yes (POST /api/v1/admins/{id}/unlock)", "—"],
    ],
  },

  // ─── Two-Factor Authentication ────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.tfaTitle",
    id: "two-factor-auth",
  },
  { type: "paragraph", contentKey: "security.authDeep.tfaIntro" },
  {
    type: "flowchart",
    title: "2FA Setup & Verification Flow",
    direction: "vertical",
    nodes: [
      {
        id: "enable",
        label: "POST /auth/2fa/enable",
        type: "primary",
        description: "Generate TOTP secret + QR code",
      },
      {
        id: "qr",
        label: "Display QR Code",
        type: "info",
        description: "User scans with authenticator app",
      },
      {
        id: "confirm",
        label: "POST /auth/2fa/confirm",
        type: "warning",
        description: "User enters 6-digit code to verify setup",
      },
      {
        id: "backup",
        label: "Generate Backup Codes",
        type: "success",
        description: "10 one-time-use recovery codes",
      },
      { id: "active", label: "2FA Active", type: "success" },
      { id: "login", label: "Login Attempt", type: "primary" },
      {
        id: "verify",
        label: "POST /auth/2fa/verify",
        type: "warning",
        description: "Enter TOTP code or backup code",
      },
      { id: "granted", label: "Access Granted", type: "success" },
    ],
    connections: [
      { from: "enable", to: "qr" },
      { from: "qr", to: "confirm" },
      { from: "confirm", to: "backup" },
      { from: "backup", to: "active" },
      { from: "login", to: "verify", label: "if 2FA enabled" },
      { from: "verify", to: "granted", label: "valid code" },
    ],
  },
  {
    type: "code",
    language: "csharp",
    filename: "TfaService — TOTP Implementation",
    code: `public class TfaService : ITfaService
{
    private const int SecretLength = 20;     // 160-bit secret
    private const int CodeLength = 6;        // 6-digit TOTP
    private const int TimeStep = 30;         // 30-second window
    private const int BackupCodeCount = 10;  // 10 backup codes

    public TfaSetupResult EnableTfa(string userId)
    {
        // 1. Generate random secret
        var secretBytes = RandomNumberGenerator.GetBytes(SecretLength);
        var secret = Base32Encoding.ToString(secretBytes);

        // 2. Generate QR code URI (otpauth:// format)
        var uri = $"otpauth://totp/SCRIPE:{userId}?secret={secret}&issuer=SCRIPE";

        // 3. Generate backup codes
        var backupCodes = Enumerable.Range(0, BackupCodeCount)
            .Select(_ => GenerateBackupCode())
            .ToList();

        return new TfaSetupResult(secret, uri, backupCodes);
    }

    public bool VerifyCode(string secret, string code)
    {
        // Validate TOTP with ±1 time step tolerance
        var totp = new Totp(Base32Encoding.ToBytes(secret),
            step: TimeStep, totpSize: CodeLength);

        return totp.VerifyTotp(code, out _, new VerificationWindow(1, 1));
    }

    private static string GenerateBackupCode()
        => $"{Random.Shared.Next(10000000, 99999999)}"; // 8-digit
}`,
    highlightLines: [3, 4, 5, 6, 27, 28, 29, 30],
  },

  // ─── Password Expiry Enforcement ─────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.passwordExpiryTitle",
    id: "password-expiry",
  },
  { type: "paragraph", contentKey: "security.authDeep.passwordExpiryIntro" },
  {
    type: "table",
    headers: ["Check", "Source", "Outcome"],
    rows: [
      ["PasswordExpiryDays > 0", "TenantSettings", "Feature enabled for tenant"],
      ["PasswordLastChanged + ExpiryDays < Now", "Admin entity", "Password is expired"],
      ["MustChangePassword = true", "TokenResponse", "Frontend forces redirect to change-password"],
    ],
  },
  {
    type: "info",
    variant: "note",
    contentKey: "security.authDeep.passwordExpiryNote",
  },

  // ─── External Authentication ──────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.externalAuthTitle",
    id: "external-auth",
  },
  { type: "paragraph", contentKey: "security.authDeep.externalAuthIntro" },
  {
    type: "table",
    headers: ["Provider", "Auth Type", "Token Validation", "Config Key"],
    rows: [
      [
        "Google",
        "OAuth 2.0 / OpenID Connect",
        "Google TokenInfo API",
        "ExternalAuth:Google:ClientId",
      ],
      ["Facebook", "OAuth 2.0", "Facebook Graph API /me", "ExternalAuth:Facebook:AppId"],
      ["Apple", "Sign in with Apple", "Apple public keys + JWT", "ExternalAuth:Apple:ServiceId"],
      ["Microsoft", "OAuth 2.0 / MSAL", "Microsoft Graph API", "ExternalAuth:Microsoft:ClientId"],
    ],
  },
  {
    type: "code",
    language: "csharp",
    filename: "ExternalAuthService — Provider Validation",
    code: `public class ExternalAuthService : IExternalAuthService
{
    public async Task<ExternalUserInfo?> ValidateTokenAsync(
        string provider, string token)
    {
        return provider.ToLower() switch
        {
            "google" => await ValidateGoogleTokenAsync(token),
            "facebook" => await ValidateFacebookTokenAsync(token),
            "apple" => await ValidateAppleTokenAsync(token),
            "microsoft" => await ValidateMicrosoftTokenAsync(token),
            _ => throw new ArgumentException($"Unknown provider: {provider}")
        };
    }
}

// Returned user info for account linking/creation
public record ExternalUserInfo(
    string ProviderId,     // Provider's unique user ID
    string Email,
    string? FirstName,
    string? LastName,
    string? AvatarUrl,
    string Provider        // "google", "facebook", etc.
);`,
  },

  // ─── OTP System ───────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.otpTitle",
    id: "otp-system",
  },
  { type: "paragraph", contentKey: "security.authDeep.otpIntro" },
  {
    type: "table",
    headers: ["Credential / Flow", "Crypto / Storage", "Length", "Expiry", "Max Attempts"],
    rows: [
      ["Email & Phone OTP", "HMAC-SHA256 verifier (Verification:VerifierKey)", "6 digits", "10 min (Verification:ExpirationMinutes)", "5"],
      ["Password Reset OTP", "HMAC-SHA256 verifier + otp-scope token", "6 digits", "10 min (30 min Production)", "5"],
      ["Magic Link / Reset Grant", "PasswordResetToken SHA-256 hex digest", "256-bit random", "10 min (30 min Production)", "5 (single-use)"],
      ["Endpoint Throttle", "Fixed Window password-reset limiter", "—", "15 min window", "5 req / 15 min / IP"],
    ],
  },
  {
    type: "code",
    language: "csharp",
    filename: "OtpService & PasswordResetToken — Verifier & Atomic Consume",
    code: `// OTPs are NEVER stored or hashed with BCrypt or plaintext.
// OtpService binds each 6-digit code with HMAC-SHA256(Verification:VerifierKey):
//   • Normalized email (.Trim().ToLowerInvariant()) across generate/peek/consume
//   • Lookback window clamped safely against VerificationSettings.ResendWindowMinutes
//   • Step 2 (AdminVerifyResetOtp) peeks OTP without consuming it and mints a
//     single-use PasswordResetToken (Purpose = "reset-grant", MaxVerificationAttempts = 5)
//   • Step 3 (AdminResetPasswordWithOtp) validates TenantPasswordValidator + Breached + History
//     FIRST so HTTP 422 never burns the OTP, then atomically consumes grant + OtpCode
//     and revokes all active RefreshTokens inside one ExecuteInTransactionAsync unit of work.`,
  },

  // ─── Impersonation ────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.impersonationTitle",
    id: "impersonation",
  },
  { type: "paragraph", contentKey: "security.authDeep.impersonationIntro" },
  {
    type: "flowchart",
    title: "Admin Impersonation Flow",
    direction: "horizontal",
    nodes: [
      { id: "super", label: "SuperAdmin", type: "primary" },
      { id: "impersonate", label: "POST /auth/admin/impersonate/{id}", type: "warning" },
      {
        id: "check",
        label: "Security & Sudo Checks",
        type: "danger",
        description: "Can't impersonate protected/superior admins",
      },
      {
        id: "token",
        label: "Issue Impersonation Token",
        type: "success",
        description: "Claims of target + impersonator_id claim",
      },
      { id: "act", label: "Act as Target Admin", type: "info" },
      { id: "stop", label: "POST /auth/admin/stop-impersonation", type: "primary" },
      { id: "restore", label: "Restore Original Token", type: "success" },
    ],
    connections: [
      { from: "super", to: "impersonate" },
      { from: "impersonate", to: "check" },
      { from: "check", to: "token", label: "allowed" },
      { from: "token", to: "act" },
      { from: "act", to: "stop" },
      { from: "stop", to: "restore" },
    ],
  },
  {
    type: "info",
    variant: "danger",
    contentKey: "security.authDeep.impersonationWarning",
  },

  // ─── Session Management ───────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.sessionTitle",
    id: "session-management",
  },
  { type: "paragraph", contentKey: "security.authDeep.sessionIntro" },
  {
    type: "table",
    headers: ["Token", "Storage", "Lifetime", "Rotation"],
    rows: [
      ["Access Token", "Client memory (not localStorage)", "15 minutes", "On refresh"],
      ["Refresh Token", "HttpOnly secure cookie or DB", "7 days", "Single-use (rotate on use)"],
      ["2FA Session Token", "Temporary in-memory", "5 minutes", "One-time use"],
      [
        "Impersonation Token",
        "Client (replaces access)",
        "Same as access",
        "On stop-impersonation",
      ],
    ],
  },
  {
    type: "info",
    variant: "tip",
    contentKey: "security.authDeep.cookieAuthTip",
  },

  // ─── SSO Tenant Suspension Gate ──────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "security.authDeep.ssoSuspensionTitle",
    id: "sso-suspension-gate",
  },
  { type: "paragraph", contentKey: "security.authDeep.ssoSuspensionIntro" },
  {
    type: "info",
    variant: "danger",
    contentKey: "security.authDeep.ssoSuspensionWarning",
  },
];

registerPage({
  slug: "security/authentication-deep",
  titleKey: "security.authDeep.title",
  descriptionKey: "security.authDeep.description",
  category: "security",
  order: 2,
  sections,
  relatedSlugs: [
    "security/overview",
    "security/data-protection",
    "security/api-security",
    "features/authentication",
  ],
  lastUpdated: "2026-05-02",
});
