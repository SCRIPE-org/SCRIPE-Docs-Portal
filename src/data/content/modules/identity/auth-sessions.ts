// FILE-EXCEPTION: static documentation content
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "modules.identityAuthSessions.intro",
  },

  // ── RefreshToken ─────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "modules.identityAuthSessions.refreshTokenTitle",
    id: "refresh-token",
  },
  {
    type: "paragraph",
    contentKey: "modules.identityAuthSessions.refreshTokenIntro",
  },
  {
    type: "table",
    headers: ["Field", "Type", "Notes"],
    rows: [
      ["UserId", "Guid?", "FK → User. Mutually exclusive with AdminId"],
      ["AdminId", "Guid?", "FK → Admin. Mutually exclusive with UserId"],
      [
        "ImpersonatorAdminId",
        "Guid?",
        "Set when this token represents an impersonation session; points to the admin who initiated it",
      ],
      ["Token", "string (max 500)", "Opaque refresh token value — cryptographically random"],
      ["ExpiresAt", "DateTime", "Hard expiry timestamp"],
      ["RevokedAt", "DateTime?", "Set when the token is explicitly revoked"],
      [
        "ReplacedByToken",
        "string? (max 500)",
        "New token value that replaced this one on rotation",
      ],
      ["RevokedReason", "string? (max 200)", "Human-readable reason for revocation"],
      ["DeviceInfo", "string? (max 500)", "User-agent / device string for the session"],
      ["IpAddress", "string? (max 50)", "IP address at token issuance"],
      ["StaySignedIn", "bool", "Whether the user opted into extended session duration"],
      ["IsActive", "bool (computed)", "true when RevokedAt == null && ExpiresAt > UtcNow"],
    ],
  },
  {
    type: "code",
    language: "csharp",
    filename: "Identity.Domain/Entities/RefreshToken.cs",
    code: `public class RefreshToken : AuditableEntity<Guid>
{
    public Guid? UserId { get; set; }
    public Guid? AdminId { get; set; }

    /// If set, this token represents an impersonation session.
    /// Points to the admin who initiated the impersonation.
    public Guid? ImpersonatorAdminId { get; set; }

    [MaxLength(500)]
    public string Token { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }

    [MaxLength(500)]
    public string? ReplacedByToken { get; set; }

    [MaxLength(200)]
    public string? RevokedReason { get; set; }

    public bool StaySignedIn { get; set; }

    public new bool IsActive => RevokedAt == null && ExpiresAt > DateTime.UtcNow;

    public void Revoke(string reason, string? ipAddress = null, string? replacedByToken = null)
    {
        RevokedAt = DateTime.UtcNow;
        RevokedReason = reason;
        IpAddress = ipAddress;
        ReplacedByToken = replacedByToken;
    }
}`,
  },

  // ── OtpCode ──────────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "modules.identityAuthSessions.otpCodeTitle",
    id: "otp-code",
  },
  {
    type: "paragraph",
    contentKey: "modules.identityAuthSessions.otpCodeIntro",
  },
  {
    type: "table",
    headers: ["Field", "Type", "Notes"],
    rows: [
      ["UserId", "Guid?", "FK → User. Set for user-facing OTP flows"],
      ["AdminId", "Guid?", "FK → Admin. Set for admin-facing OTP flows"],
      ["Code", "string (max 10)", "Keyed HMAC-SHA256 verifier tag derived with Verification:VerifierKey (never plaintext OTP)"],
      [
        "Purpose",
        "int",
        "Enum integer: identifies the OTP purpose (email verify, password reset, phone login, etc.)",
      ],
      ["ExpiresAt", "DateTime", "OTP expiry (10 min default ExpirationMinutes / PasswordResetExpirationMinutes; 30 min Prod reset)"],
      ["Attempts", "int", "Number of failed validation attempts so far"],
      ["MaxAttempts", "int (default 5)", "Maximum allowed failed attempts before invalidation (Verification:MaxVerificationAttempts)"],
      ["IsUsed", "bool", "Atomically set to true inside the recovery/verification transaction via ExecuteUpdateAsync"],
      ["Email", "string (max 200)", "Normalized lowercase trimmed email address the OTP was sent to"],
    ],
  },
  {
    type: "info",
    variant: "note",
    contentKey: "modules.identityAuthSessions.otpCodeNote",
  },

  // ── PasswordResetToken ────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "modules.identityAuthSessions.passwordResetTokenTitle",
    id: "password-reset-token",
  },
  {
    type: "paragraph",
    contentKey: "modules.identityAuthSessions.passwordResetTokenIntro",
  },
  {
    type: "table",
    headers: ["Field", "Type", "Notes"],
    rows: [
      ["NormalizedEmail", "string (max 256)", "Lowercase trimmed email bound to the recovery credential (`[AuditRedacted]`)"],
      ["TokenHash", "string (max 64)", "Unique lowercase SHA-256 hex digest of the raw magic-link or reset-grant token"],
      ["Purpose", "string (max 32)", "`magic-link`, `reset-grant`, or `otp-scope` recovery tenant binding"],
      ["ScopedTenantId", "Guid?", "Optional single-tenant / portal scope requested at recovery initiation"],
      ["AllowedTenantIdsJson", "string (max 4000)", "JSON array of authorized tenant IDs selectable in step 3"],
      ["SourceCredentialId", "Guid?", "Originating OtpCode or PasswordResetToken ID consumed atomically with the grant"],
      ["FailedAttempts", "int (max 5)", "Failed verification attempts counter (`MaxVerificationAttempts = 5`)"],
      ["IsConsumed", "bool", "Atomically flipped to true inside `ExecuteInTransactionAsync`"],
      ["ExpiresAt / ConsumedAt", "DateTime / DateTime?", "UTC expiry and single-use consumption timestamps"],
    ],
  },

  // ── PasswordHistory ───────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "modules.identityAuthSessions.passwordHistoryTitle",
    id: "password-history",
  },
  {
    type: "paragraph",
    contentKey: "modules.identityAuthSessions.passwordHistoryIntro",
  },
  {
    type: "table",
    headers: ["Field", "Type", "Notes"],
    rows: [
      ["PrincipalType", "PasswordPrincipalType", "Admin or User principal discriminator"],
      ["PrincipalId", "Guid", "Owning Admin or User identifier (composite index with `RecordedAtUtc`)"],
      ["PasswordHash", "string (max 200)", "Salted `$s2$` SHA-256 pre-hash + BCrypt (work factor 12) digest (`[AuditRedacted]`)"],
      ["RecordedAtUtc", "DateTime", "UTC timestamp preserved for enforcing `PasswordHistoryCount` (default 5, range 0..24)"],
    ],
  },

  // ── QrLoginSession ────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "modules.identityAuthSessions.qrLoginTitle",
    id: "qr-login-session",
  },
  {
    type: "paragraph",
    contentKey: "modules.identityAuthSessions.qrLoginIntro",
  },
  {
    type: "table",
    headers: ["Field", "Type", "Notes"],
    rows: [
      [
        "SessionToken",
        "string (max 200)",
        "64-byte cryptographically random token embedded in the QR code (base64url)",
      ],
      [
        "Status",
        "QrSessionStatus",
        "Pending → Scanned → Approved → Consumed (or Rejected / Expired)",
      ],
      [
        "InitiatorIp",
        "string? (max 50)",
        "IP address of the desktop browser that generated the QR",
      ],
      [
        "InitiatorUserAgent",
        "string? (max 500)",
        "User-Agent of the initiating browser (shown to approver for verification)",
      ],
      [
        "ApprovedByAdminId",
        "Guid?",
        "Admin who approved the session from their authenticated mobile device",
      ],
      ["ApprovedAt", "DateTime?", "Timestamp of mobile approval"],
      [
        "AccessToken",
        "string? (max 2000)",
        "JWT access token generated for the desktop after approval; consumed once",
      ],
      [
        "RefreshTokenValue",
        "string? (max 500)",
        "Refresh token value issued for the new desktop session",
      ],
      ["TokenExpiresAt", "DateTime?", "Expiry of the issued JWT access token"],
      ["ExpiresAt", "DateTime", "Session TTL — 5 minutes from creation"],
      ["TenantId", "Guid?", "Optional tenant scope for the login session"],
      ["CreatedAt", "DateTime", "Session creation timestamp (UTC)"],
    ],
  },
  {
    type: "flowchart",
    direction: "horizontal",
    nodes: [
      { id: "A", label: "Desktop: create session\n(Pending)", type: "primary" },
      { id: "B", label: "Display QR code", type: "default" },
      { id: "C", label: "Mobile: scan QR\n(Scanned)", type: "default" },
      { id: "D", label: "Mobile: user approves\n(Approved)", type: "primary" },
      { id: "E", label: "Desktop: poll & receive tokens\n(Consumed)", type: "primary" },
      { id: "F", label: "Rejected / Expired", type: "default" },
    ],
    connections: [
      { from: "A", to: "B" },
      { from: "B", to: "C" },
      { from: "C", to: "D" },
      { from: "C", to: "F", label: "deny / timeout" },
      { from: "D", to: "E" },
    ],
  },
  {
    type: "info",
    variant: "warning",
    contentKey: "modules.identityAuthSessions.qrLoginWarning",
  },

  // ── WebAuthnChallenge ─────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "modules.identityAuthSessions.webAuthnChallengeTitle",
    id: "webauthn-challenge",
  },
  {
    type: "paragraph",
    contentKey: "modules.identityAuthSessions.webAuthnChallengeIntro",
  },
  {
    type: "table",
    headers: ["Field", "Type", "Notes"],
    rows: [
      [
        "Challenge",
        "string (max 200)",
        "Cryptographically random bytes (base64url) sent to the authenticator",
      ],
      [
        "AdminId",
        "Guid?",
        "Admin performing the ceremony. Null during discoverable (usernameless) authentication",
      ],
      [
        "CeremonyType",
        "string (max 20)",
        '"registration" or "authentication" — used to match the challenge at verification',
      ],
      ["ExpiresAt", "DateTime", "5-minute TTL from creation"],
      ["IsUsed", "bool", "Marked true after ceremony completion to prevent replay"],
      [
        "Origin",
        "string? (max 200)",
        "Origin (scheme + host) that initiated the ceremony; verified to prevent cross-origin attacks",
      ],
    ],
  },

  // ── AdminPasskey ──────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "modules.identityAuthSessions.adminPasskeyTitle",
    id: "admin-passkey",
  },
  {
    type: "paragraph",
    contentKey: "modules.identityAuthSessions.adminPasskeyIntro",
  },
  {
    type: "table",
    headers: ["Field", "Type", "Notes"],
    rows: [
      ["AdminId", "Guid", "FK → Admin who owns this passkey"],
      [
        "CredentialId",
        "string (max 1024)",
        "Unique credential ID from the authenticator (base64url). Used to look up the credential during authentication",
      ],
      [
        "PublicKey",
        "string (max 2048)",
        "COSE public key (base64url). Used to verify assertion signatures",
      ],
      [
        "SignatureCounter",
        "uint",
        "Incremented by the authenticator on each use. Backwards counter = cloned credential",
      ],
      [
        "Aaguid",
        "string? (max 36)",
        "Authenticator model identifier (e.g., YubiKey 5, iCloud Keychain). All-zeros for privacy-preserving devices",
      ],
      [
        "DeviceName",
        "string (max 100)",
        "User-assigned friendly name (e.g., 'MacBook Touch ID', 'YubiKey 5C NFC')",
      ],
      [
        "AttestationType",
        "string (max 20)",
        "Attestation type used at registration: none / indirect / direct / enterprise",
      ],
      [
        "Transports",
        "string? (max 100)",
        "Comma-separated transport hints: usb, nfc, ble, internal",
      ],
      ["LastUsedAt", "DateTime?", "When this passkey was last successfully used"],
      [
        "IsDiscoverable",
        "bool",
        "true = resident credential enabling passwordless login without a username",
      ],
      [
        "RpId",
        "string (max 253)",
        "Bound WebAuthn Relying Party ID (Dual-RP validated via AllowedRpIds; backfilled to 'admin.scripe.org'; verified --idempotent across PostgreSQL 18, SQL Server 2025 & live Oracle 21c XE)",
      ],
      [
        "RegistrationOrigin",
        "string? (max 255)",
        "Validated registration ceremony origin (EnableCentralNativeAndPasskeyMigration = false; WebAuthn:UserVerification = 'required'; PasskeyAuthLimit = 12/15m)",
      ],
    ],
  },
  {
    type: "info",
    variant: "note",
    contentKey: "modules.identityAuthSessions.adminPasskeyNote",
  },

  // ── ExternalLogin ─────────────────────────────────────────────────────────────
  {
    type: "heading",
    level: 2,
    titleKey: "modules.identityAuthSessions.externalLoginTitle",
    id: "external-login",
  },
  {
    type: "paragraph",
    contentKey: "modules.identityAuthSessions.externalLoginIntro",
  },
  {
    type: "table",
    headers: ["Field", "Type", "Notes"],
    rows: [
      ["AdminId", "Guid?", "FK → Admin. Mutually exclusive with UserId"],
      ["UserId", "Guid?", "FK → User. Mutually exclusive with AdminId"],
      [
        "ProviderName",
        "string (max 50)",
        "Provider identifier: 'google', 'facebook', 'apple', 'microsoft', 'azure-ad', or an IdentityProvider.Slug for custom OIDC",
      ],
      [
        "ProviderKey",
        "string (max 500)",
        "The user's unique ID in the external system (the 'sub' claim in OIDC)",
      ],
      [
        "Email",
        "string? (max 200)",
        "Email from the external provider — used for initial account matching",
      ],
      ["DisplayName", "string? (max 200)", "Display name from the provider (for UI purposes)"],
      [
        "IdentityProviderId",
        "Guid?",
        "FK → IdentityProvider config. Null for built-in social providers (Google, Facebook, Apple, Microsoft)",
      ],
      ["LinkedAt", "DateTime", "When this external identity was linked to the Admin/User"],
      ["LastUsedAt", "DateTime?", "When this external identity was last used to authenticate"],
    ],
  },
  {
    type: "info",
    variant: "note",
    contentKey: "modules.identityAuthSessions.externalLoginNote",
  },
];

registerPage({
  slug: "modules/identity/auth-sessions",
  titleKey: "modules.identityAuthSessions.title",
  descriptionKey: "modules.identityAuthSessions.description",
  category: "modules",
  order: 60,
  sections,
  relatedSlugs: ["features/authentication", "features/sso-oauth", "security/authentication-deep"],
  lastUpdated: "2026-06-29",
});
