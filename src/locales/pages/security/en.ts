// FILE-EXCEPTION: file length
/**
 * Docs page locale — EN
 * Auto-generated from monolithic doc locale. Do not edit the generation source.
 */
export const en = {
  security: {
    overview: {
      title: "Security Overview",
      description:
        "5-layer defense strategy, security features, CORS configuration, rate limiting, and password policies.",
      intro:
        "SCRIPE implements a defense-in-depth security strategy with five layers: network protection, authentication, authorization, data isolation, and audit logging. Every request passes through multiple security checks before reaching business logic.",
      layersTitle: "Security Defense Layers",
      featuresTitle: "Security Features",
      featureJwt: "JWT Authentication",
      featureJwtDesc:
        "Access tokens (30 min default via Jwt:ExpiryMinutes) with automatic refresh. HMAC-SHA256 signing and millisecond revocation cutoff.",
      feature2fa: "Two-Factor Auth",
      feature2faDesc:
        "TOTP-based 2FA with QR code setup. Optional per-user, enforceable per-tenant or globally.",
      featureRbac: "RBAC Permissions",
      featureRbacDesc:
        "A complete PBAC enforcement engine executing Role-Based (RBAC), Group-Based (GBAC), and Attribute/Field-Based (ABAC) rules instantly via zero-latency server-side JWT caching.",
      featureRateLimit: "Rate Limiting",
      featureRateLimitDesc:
        "4-tier rate limiting: global DDoS, per-IP, per-endpoint, and authentication-specific.",
      featureAudit: "Audit Logging",
      featureAuditDesc:
        "Every action logged with who, what, when, where. Real-time SignalR broadcasting.",
      featureCors: "CORS Configuration",
      featureCorsDesc:
        "Strict origin validation in production. Open CORS for localhost in development.",
      corsTitle: "CORS Configuration",
      corsIntro:
        "CORS policies differ between development and production environments. In development, all localhost origins are allowed. In production, only explicitly configured origins are accepted.",
      rateLimitTitle: "Rate Limiting Policies",
      passwordTitle: "Password Policies",
      securityWarning:
        "Always review security settings before deploying to production. Change default secrets, configure CORS origins, and set appropriate rate limits. Enable 2FA for all admin accounts.",
    },
    authDeep: {
      title: "Authentication Deep Dive",
      description:
        "Multi-workspace routing, JWT lifecycle, BCrypt hashing, password expiry enforcement, account lockout, 2FA TOTP, external OAuth, OTP system, impersonation, SSO suspension gate, and session management.",
      intro:
        "This page dives deep into every authentication mechanism in SCRIPE — from multi-workspace login routing and JWT token issuance, through BCrypt password hashing, password expiry enforcement, and account lockout, to TOTP-based two-factor authentication, external OAuth providers, OTP codes, admin impersonation, SSO tenant suspension gates, and session management.",
      workspaceRoutingTitle: "Multi-Workspace Login Routing",
      workspaceRoutingIntro:
        "When an admin logs in from the platform domain without a pre-resolved tenant, the login handler executes a 3-case routing algorithm: Case A (tenant-scoped login with a provided tenantId), Case A' (explicit platform admin selection via the isPlatformAdmin flag — bypasses workspace discovery entirely), and Case B (workspace discovery — searches all tenants by email, returns a workspace picker if multiple matches are found). The isPlatformAdmin flag was introduced to prevent an infinite loop where selecting 'Platform Administration' from the workspace picker would re-trigger discovery.",
      workspaceRoutingTip:
        "The isPlatformAdmin flag is set by the frontend when the user explicitly selects 'Platform Administration' from the workspace picker. This flag signals the backend to look up the admin with TenantId = null (platform-level) instead of running workspace discovery again.",
      jwtLifecycleTitle: "JWT Token Lifecycle",
      jwtLifecycleIntro:
        "Access tokens default to 30 minutes (Jwt:ExpiryMinutes / SessionPolicyDto) signed with HMAC-SHA256 and carry jti + scripe_iat_ms for monotonic revocation checks (revokedAt + 5ms). Refresh tokens rotate once inside HttpOnly cookies ({CookiePrefix}_refresh_token) under AbsoluteExpiresAt bounds (24h, >=30d StaySignedIn, 8h impersonation).",
      tokenStructureTitle: "JWT Token Structure",
      bcryptTitle: "$s2$ SHA-256 Pre-Hash + BCrypt Password Hashing",
      bcryptIntro:
        "Passwords are hashed with a versioned SHA-256 Base64 pre-hash ($s2$ prefix) followed by BCrypt (work factor 12), eliminating 72-byte and NUL truncation while retaining backward compatibility with legacy $2a$/$2b$/$2y$ hashes. Password mutations also enforce PasswordHistory (default 5 previous hashes) and an 8,616-entry breached password denylist.",
      lockoutTitle: "Account Lockout",
      lockoutIntro:
        "After 5 consecutive failed login or 2FA attempts (TenantSettings.LoginLockoutThreshold, bounded by Identity.Login.MaxAttempts), the account is locked for 15 minutes (TenantSettings.LoginLockoutMinutes). The counter resets on successful verification, and admins can manually unlock accounts.",
      tfaTitle: "Two-Factor Authentication (TOTP)",
      tfaIntro:
        "SCRIPE supports TOTP-based 2FA compatible with Google Authenticator, Authy, and Microsoft Authenticator. When enabled, login returns a single-use twoFactorPendingToken instead of JWTs until verified; accounts with TenantSettings.Require2FA = true receive mfa_enroll=true and must enroll before general access.",
      passwordExpiryTitle: "Password Expiry Enforcement",
      passwordExpiryIntro:
        "After credentials are validated and lockout checks pass, the login handler invokes ITenantPasswordValidator.IsPasswordExpiredAsync to check if the admin's password has exceeded the tenant's configured PasswordExpiryDays. If expired, the TokenResponse includes MustChangePassword = true, which forces the frontend to redirect the admin to the change-password page before granting dashboard access. This check uses the admin's PasswordLastChanged field against the tenant's security policy.",
      passwordExpiryNote:
        "Password expiry is a per-tenant setting configured via TenantSettings.PasswordExpiryDays. A value of 0 disables expiry entirely. When the feature is active, the ITenantPasswordValidator computes (PasswordLastChanged + ExpiryDays) and compares it to DateTime.UtcNow. The admin is never locked out — they receive a valid JWT but with the MustChangePassword flag set, which the frontend enforces as a redirect.",
      externalAuthTitle: "External Authentication (OAuth)",
      externalAuthIntro:
        "SCRIPE integrates with Google, Facebook, Apple, and Microsoft OAuth providers. External tokens are validated server-side before creating or linking local accounts.",
      otpTitle: "OTP System & Recovery Credentials",
      otpIntro:
        "OTP codes are 6-digit cryptographically random challenges stored as keyed HMAC-SHA256 verifiers via Verification:VerifierKey (never BCrypt or plaintext), defaulting to 10-minute expiry (30-minute Production password reset) and 5 verification attempts. Multi-workspace admin password recovery issues single-use SHA-256 PasswordResetToken records without consuming the OTP until step 3 validates complexity and history.",
      impersonationTitle: "Admin Impersonation",
      impersonationIntro:
        "SuperAdmins can impersonate other admins to troubleshoot issues. An impersonation token carries the target admin's claims plus an impersonator_id claim. All actions during impersonation are audited with the original admin's identity.",
      impersonationWarning:
        "Impersonation is a privileged operation. The impersonator must be a SuperAdmin, cannot impersonate protected admins or admins with equal/higher roles, and all actions are logged with the impersonator's identity for accountability.",
      sessionTitle: "Session Management",
      sessionIntro:
        "SCRIPE uses a stateless JWT-based session model paired with database-backed single-use rotating refresh tokens. Access tokens live strictly in client memory (never localStorage), refresh tokens ride in HttpOnly Secure SameSite=Lax cookies ({CookiePrefix}_refresh_token on platform/workspace origins or __Host-scripe_refresh_token via the custom-domain micro-relay), 2FA pending tickets expire in 5 minutes, and RevokeAllSessions revokes sibling sessions' JTIs (BlacklistSessionJtisAsync) while preserving the caller's current active session.",
      cookieAuthTip:
        "Workspace and custom-domain browser sessions use SameSite=Lax HttpOnly Secure refresh cookies (__Host-scripe_refresh_token on custom domains via HMAC micro-relay) so top-level cross-origin SSO redirects work cleanly while cross-site subrequests remain blocked.",
      federationControlsTitle: "Dual-RP WebAuthn & Sudo Step-Up Governance",
      federationControlsContent:
        "Under Central Federation (Authentication:CentralFederation), native admin login and WebAuthn passkeys remain locked on admin.scripe.org and *.admin.scripe.org (EnableCentralNativeAndPasskeyMigration = false) with WebAuthn:UserVerification = 'required', PasskeyAuthLimit = 12 (15m window), and 0-error --idempotent schema parity across PostgreSQL 18, SQL Server 2025, and live Oracle 21c XE (IDENTITY schema). AdminPasskey.RpId (varchar(253)) and WebAuthnChallenge.RpId enforce AllowedRpIds validation in Fido2PasskeyService, while privileged mutations decorated with ISovereignSudoProtectedCommand enforce 15-minute HMAC X-Sudo-Token verification with automatic frontend <SudoVerificationModal /> challenge-and-replay across Identity.SudoRequired, Identity.SudoRevokedOrExpired, Identity.SudoPolicyDowngradeRefused, and Identity.SudoTokenInvalid.",
      ssoSuspensionTitle: "SSO Tenant Suspension Gate",
      ssoSuspensionIntro:
        "The ExternalLoginCommandHandler now includes a tenant suspension security gate. Before issuing a JWT after SSO/OIDC authentication, the handler checks the admin's tenant status. If the tenant is Suspended or Cancelled, the login is rejected with a localized error — preventing deactivated users from bypassing the standard login checks via SSO. This gate runs after token validation and account linking but before JWT issuance.",
      ssoSuspensionWarning:
        "Without this gate, SSO users could authenticate via an external IdP (e.g., Google, Azure AD) and receive a valid SCRIPE JWT even if their tenant has been suspended or cancelled. This was a critical security gap that has been remediated.",
    },
    dataProtection: {
      title: "Data Protection",
      description:
        "Tenant isolation, data encryption at rest and in transit, restricted fields, ID encryption, and GDPR compliance.",
      intro:
        "SCRIPE protects data at every layer  from network encryption (TLS 1.2+) and database encryption (TDE), through row-level tenant isolation and field-level access control, to GDPR-compliant data portability and right-to-delete mechanisms.",
      tenantIsolationTitle: "Tenant Data Isolation",
      tenantIsolationIntro:
        "Every query is automatically scoped to the current tenant via EF Core global query filters. The ITenantAwareEntity interface marks entities that must be tenant-scoped, and the TenantContextMiddleware extracts the tenant ID from the JWT token.",
      tenantScopingTitle: "Query Filter Scoping",
      tenantServicesTitle: "Tenant-Aware Services",
      tenantServicesIntro:
        "Services that need to access tenant-specific data inject IDataScopeService to get the current tenant ID. This service reads the tenant_id claim from the JWT token and makes it available throughout the request pipeline.",
      dataAtRestTitle: "Data at Rest Encryption",
      dataAtRestIntro:
        "Database-level Transparent Data Encryption (TDE) encrypts data files. Application-level encryption using ASP.NET Core Data Protection API secures sensitive fields like HMAC secrets and backup codes.",
      dataInTransitTitle: "Data in Transit Encryption",
      dataInTransitIntro:
        "All communication uses TLS 1.2 or higher. HSTS headers enforce HTTPS in production. Internal service communication between YARP gateway and backend modules also uses TLS.",
      restrictedFieldsTitle: "Restricted Fields (Field-Level Security)",
      restrictedFieldsIntro:
        "Roles can restrict access to specific entity fields. When a role has restricted fields configured, the FieldProjectionMiddleware automatically removes those fields from API responses, preventing unauthorized data exposure.",
      idEncryptionTitle: "ID Encryption",
      idEncryptionIntro:
        "SCRIPE can encrypt Guid entity IDs in API responses using AES-256. This prevents enumeration attacks and hides internal database identifiers from external consumers.",
      gdprTitle: "GDPR Compliance",
      gdprIntro:
        "SCRIPE provides mechanisms for GDPR compliance including data portability (export user data as JSON), right to delete (anonymize or purge user data), consent tracking, and configurable data retention policies.",
      rightToDeleteTitle: "Right to Delete",
      dataPortabilityTitle: "Data Portability",
      consentTitle: "Consent Management",
      retentionTitle: "Data Retention Policies",
      auditTrailTitle: "Audit Trail for Compliance",
      rightToDeleteDesc:
        "Enforce permanent erasure of user records and PII across all tenant databases upon request.",
      dataPortabilityDesc:
        "Export comprehensive machine-readable archives of all user-associated data in JSON format.",
      consentDesc:
        "Immutable append-only tracking of consent timestamps, policy versions, and user agents.",
      auditTrailDesc:
        "Tamper-evident audit logging for every read, write, export, and deletion of sensitive personal data.",
      tenantScopingDesc:
        "Strict multi-tenant isolation ensuring personal data never leaks across tenant boundaries.",
      retentionDesc:
        "Automated background pruning and anonymization based on regulatory and corporate retention rules.",
      bypassWarning:
        "IgnoreQueryFilters() bypasses ALL global query filters including tenant isolation. Always add explicit tenant filtering when using this method to prevent cross-tenant data leaks.",
    },
    apiSecurity: {
      title: "API Security",
      description:
        "Rate limiting, CORS configuration, input validation, CSRF protection, security headers, and replay attack prevention.",
      intro:
        "SCRIPE applies multiple layers of API security: rate limiting prevents abuse, CORS restricts cross-origin access, input validation rejects malformed data, security headers protect against common web attacks, and anti-replay mechanisms prevent request replay attacks.",
      rateLimitTitle: "Rate Limiting",
      rateLimitIntro:
        "SCRIPE implements 4-tier rate limiting using ASP.NET Core's built-in rate limiter: global DDoS protection, per-IP limits, per-endpoint limits, and authentication-specific limits for login and token refresh.",
      corsTitle: "CORS Configuration",
      corsIntro:
        "Cross-Origin Resource Sharing policies differ between environments. Development allows all localhost origins. Production requires explicitly configured allowed origins, methods, and headers.",
      inputValidationTitle: "Input Validation",
      inputValidationIntro:
        "All incoming requests are validated through FluentValidation at the SCRIPE mediator pipeline level. The ValidationBehavior runs before the command handler and returns structured validation errors with field-level messages.",
      csrfTitle: "CSRF Protection",
      csrfIntro:
        "SCRIPE uses the SameSite cookie attribute and anti-forgery tokens to prevent Cross-Site Request Forgery attacks. API endpoints rely on Bearer token authentication which is inherently CSRF-resistant.",
      headersTitle: "Security Headers",
      headersIntro:
        "Production responses include security headers: X-Content-Type-Options (nosniff), X-Frame-Options (DENY), X-XSS-Protection, Referrer-Policy, and Content-Security-Policy.",
      headersTip:
        "Test your security headers using securityheaders.com. SCRIPE's default configuration scores A+ when properly configured.",
      replayTitle: "Replay Attack Prevention",
      replayIntro:
        "Short-lived access tokens (30 minutes default via Jwt:ExpiryMinutes), JTI revocation denylists, single-use refresh tokens with rotation, and TOTP time-step validation prevent replay attacks across all authentication flows.",
    },
    middlewarePipeline: {
      title: "Middleware Pipeline",
      description:
        "33 ordered stages in MiddlewarePipeline.cs — from edge headers, JWT/API-key auth, and post-auth rate limiting to Trusted CIDR, mcp=true, mfa_enroll=true, and field projection.",
      intro:
        "SCRIPE's HTTP request pipeline executes 33 ordered stages in MiddlewarePipeline.cs. Each stage enforces a single boundary—including post-auth rate limiting, Trusted CIDR checks, MustChangePasswordMiddleware, and RequireMfaEnrollmentMiddleware—and short-circuits on failure.",
      overviewTitle: "Pipeline Overview",
      overviewIntro:
        "Requests flow through the middleware pipeline from top to bottom. Each middleware can process the request, modify it, or short-circuit by returning a response directly. The order matters  tenant context must be established before any tenant-scoped operation.",
      globalExceptionTitle: "1. Global Exception Handler",
      globalExceptionIntro:
        "Catches all unhandled exceptions and returns structured JSON error responses. In development, includes stack traces. In production, returns generic error messages to prevent information leakage.",
      correlationIdTitle: "2. Correlation ID",
      correlationIdIntro:
        "Generates or reads an X-Correlation-ID header for distributed tracing. The same ID is attached to all log entries, audit records, and downstream API calls for the request.",
      requestLoggingTitle: "3. Request Logging",
      requestLoggingIntro:
        "Logs request metadata (method, path, status, duration) with Serilog structured logging. Sensitive paths (login, password) have their body masked to prevent credential leakage in logs.",
      cookieAuthTitle: "4. Cookie-to-Bearer Conversion",
      cookieAuthIntro:
        "Reads the access_token cookie and injects it as a Bearer token in the Authorization header. This allows the frontend to use HttpOnly cookies while maintaining JWT-based authentication.",
      tenantContextTitle: "5. Tenant Context",
      tenantContextIntro:
        "Extracts the tenant_id claim from the JWT token and sets the current tenant in IDataScopeService. All subsequent database queries are automatically scoped to this tenant via EF Core global query filters.",
      tenantContextNote:
        "The Tenant Context middleware must run AFTER authentication but BEFORE any database access. If a request has no tenant claim (e.g., SuperAdmin without tenant), the middleware allows tenant-less operations for global endpoints.",
      cacheHeadersTitle: "6. Cache Headers",
      cacheHeadersIntro:
        "Sets appropriate Cache-Control headers based on response type. API responses use no-cache, no-store. Static files use max-age with ETag validation. Uploaded files use tenant-specific cache keys.",
      fieldProjectionTitle: "7. Field Projection",
      fieldProjectionIntro:
        "Removes restricted fields from JSON responses based on the current user's role permissions. Uses the restrictedFields configuration to filter out sensitive properties before the response is sent to the client.",
      observabilityTitle: "Observability Middleware",
      observabilityIntro:
        "Collects request metrics (duration, status codes, error rates) and exposes them via a /metrics endpoint for Prometheus scraping. Includes distributed tracing with OpenTelemetry integration.",
      registrationTitle: "Middleware Registration Order",
      registrationIntro:
        "The registration order in MiddlewarePipeline.cs determines execution order. Changing the order breaks invariants—for example, ApiKeyUsageMiddleware and Rate Limiting rely on UseAuthentication() running first, while TrustedCidrEnforcementMiddleware, MustChangePasswordMiddleware (mcp=true), and RequireMfaEnrollmentMiddleware (mfa_enroll=true) run right after UseAuthorization().",
      summaryTitle: "Middleware Summary",
      orderWarning:
        "Changing middleware registration order can cause cascading failures. Always test the full request pipeline after modifying middleware order.",
    },
    auditCompliance: {
      title: "Audit & Compliance",
      description:
        "Complete audit pipeline, entity tracking, SignalR streaming, CSV/Excel/PDF export, and compliance features.",
      intro:
        "SCRIPE provides a comprehensive audit system that tracks every data modification, API request, and security event. Audit logs are automatically generated by EF Core interceptors, streamed in real-time via SignalR, and exportable in CSV, Excel, and PDF formats.",
      architectureTitle: "Audit Architecture",
      architectureIntro:
        "The audit system consists of HTTP request logging and database entity mutation interception. Request metadata is logged asynchronously at the host level via the RequestLoggingMiddleware, while database-level mutations are captured by the AuditableEntityInterceptor before SaveChanges.",
      interceptorTitle: "Entity Change Interceptor",
      interceptorIntro:
        "The AuditableEntityInterceptor hooks into EF Core's SaveChangesAsync pipeline. For every Added, Modified, or Deleted entity (including soft-deletes), it captures the old and new values as JSON, the user who made the change, and the timestamp. It skips AuditLog entities to prevent infinite recursion.",
      auditLogEntityTitle: "AuditLog Entity Structure",
      signalrTitle: "Real-Time SignalR Streaming",
      signalrIntro:
        "Audit logs are broadcast in real-time via the AuditHub SignalR hub. Connected admin clients receive instant notifications when any data changes occur, enabling live monitoring dashboards.",
      exportTitle: "Export Capabilities",
      exportIntro:
        "Audit logs can be exported in three formats: CSV for data analysis, Excel for business reporting, and PDF for compliance documentation. Exports support date range filtering, user filtering, and entity type filtering.",
      exportDetail:
        "The AuditExportService provides multi-format exports. CSV export uses CsvHelper with quotes around all fields to prevent CSV injection (RFC 4180) and a UTF-8 BOM prefix for Excel. Excel export generates a ClosedXML workbook with three detailed sheets: Executive Summary (dashboard stats/KPIs), Audit Data (with auto-filters, frozen headers, and green/red conditional formatting), and Security Analysis. PDF export uses QuestPDF layout engine, which is marked as Obsolete for large datasets due to memory footprint. To protect resources, all exports are capped to a maximum of 10,000 rows and loaded in-memory before transmission.",
      queryApiTitle: "Query & Export API",
      queryApiIntro:
        "The audit API provides search, filter, and export capabilities for audit logs. All endpoints require admin authentication and the audit.view or audit.export permission.",
      querySearchDesc: "Search and filter audit logs with pagination",
      queryExportCsvDesc: "Export audit logs as CSV file",
      queryExportExcelDesc: "Export audit logs as Excel spreadsheet",
      queryExportPdfDesc: "Export audit logs as PDF document",
      scopingTitle: "Hierarchical Tenant Scoping & Security Isolation",
      scopingDetail:
        "Data isolation is enforced dynamically at query execution. The DataScopeService resolves the administrator's effective scope based on a strict priority chain: ContextTenant (drill-down via AES-encrypted context headers), Permission Overrides, SystemProtectedAdmin, Hierarchy (including children), or OwnTenant. Descendants are traversed in constant time via materialized paths, where starts-with matches translate to index-backed SQL LIKE queries. The repository applies AuditByTenantScopeSpec to ensure 'WHERE TenantId IN (...)' isolation, while direct Guid-based requests are verified by GetAuditLogDetailQueryHandler to prevent horizontal privilege escalation.",
      complianceTitle: "Compliance Features",
      immutableTitle: "Immutable Logs",
      immutableDesc:
        "Logs are locked and stored in a read-only fashion, preventing deletion or updates once committed.",
      fullTraceTitle: "Full Trace",
      fullTraceDesc:
        "Captures HTTP headers, request context, and entity mutations to ensure complete trace visibility.",
      searchableTitle: "Searchable",
      searchableDesc:
        "Optimized indexes on Timestamp, UserId, EventType, and CorrelationId enable instant lookup.",
      tenantScopedTitle: "Tenant Scoped",
      tenantScopedDesc:
        "Logs are automatically isolated by TenantId and descendant tree boundaries, preventing leaks.",
      realtimeTitle: "Real-Time",
      realtimeDesc:
        "Stream live security events and mutations directly to tenant-scoped SignalR dashboards.",
      retentionTitle: "Retention Policy",
      retentionDesc:
        "Configured retention periods automatically purge expired audit logs via background workers.",
    },
    sso: {
      samlTitle: "SAML 2.0 & Cryptographic Assertion Security",
      samlContent:
        "In addition to OIDC, the platform integrates SAML 2.0 authentication using the ITfoxtec.Identity.Saml2 library. For inbound SSO, public X.509 certificates are loaded from base64 string configurations to validate SAML response signatures while ignoring certificate chain validations. Outbound client connections use platform-wide signing certificates to issue secure SAML assertions.",
      oidcCallbackTitle: "Central OIDC/SAML Callback & Single-Use Handoff Ticket",
      oidcCallbackContent:
        "Central callbacks at https://api.scripe.org (GET /api/v1/auth/oidc/callback and POST /api/v1/auth/saml/acs/{providerId}) decrypt the provider reference, validate the server-side ExternalAuthStateTicket (including PKCE code_verifier, nonce, and validated returnOrigin), enforce tenant suspension and HybridMfaPolicy, and mint an ephemeral ExternalAuthHandoffTicket (120s TTL, SHA-256 keyed auth:ext-handoff:{sha256} with atomic single-use auth:ext-handoff-used:{sha256} replay guard). The callback then 302-redirects to https://auth.scripe.org/sso/continue (for workspace discovery or 2FA) or to the verified tenant {ReturnOrigin}/sso/callback?code=&state=, where POST /api/v1/auth/sso/handoff redeems the ticket once.",
      oauthMirroringTitle: "OAuth Application Mirroring & Subscription Quotas",
      oauthMirroringContent:
        "Administrators can register custom client applications to use SCRIPE as their primary OIDC server. New application creations are gated by tenant-scoped quotas. Once validated, client details are registered in OpenIddict and mirrored locally in the platform's OAuthApplication database table for fast performance, masking confidential client secrets.",
      title: "SSO & Identity Providers",
      description:
        "OIDC/OAuth2 SSO architecture, PKCE flow, identity provider model, external login linking, OAuth applications, claim mapping, and full API reference.",
      intro:
        "SCRIPE supports Single Sign-On (SSO) via external OIDC identity providers. This page covers the complete SSO architecture: PKCE authorization code flow, the identity provider entity model, external login linking, OAuth application registration, claim mapping, tenant scoping, and all API endpoints.",
      howItWorksTitle: "How SSO Works",
      howItWorksContent:
        "SCRIPE uses the Authorization Code Flow with PKCE (Proof Key for Code Exchange) for SSO. This is the most secure OAuth2 flow, recommended by the OAuth 2.1 specification for all client types.",
      step1Title: "1. Provider Discovery",
      step1Content:
        "The login surface at https://auth.scripe.org (or tenant origin) fetches enabled external providers via GET /api/v1/auth/oidc/providers/admin (or user discovery), honoring Tenancy:AuthBaseUrl and OriginRouting.",
      step2Title: "2. Server-Side PKCE & State Ticket",
      step2Content:
        "When the user clicks an SSO provider, the frontend calls POST /api/v1/auth/oidc/challenge. The backend generates the cryptographic code_verifier, nonce, state, and validated returnOrigin inside a server-side ExternalAuthStateTicket (never browser sessionStorage) and returns the IdP authorization URL.",
      step3Title: "3. External IdP Redirect (Central Callback)",
      step3Content:
        "The browser redirects directly to the external IdP with redirect_uri pinned to central https://api.scripe.org/api/v1/auth/oidc/callback (or /api/v1/auth/saml/acs/{providerId}). No secrets or PKCE verifiers reside in client storage.",
      step4Title: "4. Central Callback & Handoff Ticket",
      step4Content:
        "The user authenticates at the external IdP (Azure AD, Google, Okta, etc.) and returns to api.scripe.org. The backend consumes ExternalAuthStateTicket, exchanges the code server-side, evaluates tenant suspension and MFA gates, mints a 120s SHA-256 ExternalAuthHandoffTicket, and 302-redirects to auth.scripe.org/sso/continue or verified {ReturnOrigin}/sso/callback.",
      step5Title: "5. Single-Use Handoff & Origin Session Establish",
      step5Content:
        "The destination /sso/callback or /sso/continue page calls POST /api/v1/auth/sso/handoff (or /api/auth/session/establish HMAC relay on custom domains) to atomically consume the 120s ExternalAuthHandoffTicket and hydrate memory JWT + HttpOnly Lax refresh cookie state.",
      pkceTitle: "PKCE & Central Handoff Security Model",
      pkceContent:
        "Server-side ExternalAuthStateTicket persistence eliminates browser sessionStorage PKCE/state exposure. Central callbacks mint single-use 120s SHA-256 ExternalAuthHandoffTicket payloads claimed atomically via auth:ext-handoff-used:{sha256}, binding returnOrigin against IVerifiedOriginEvaluator to block open redirects and authorization-code interception.",
      entityModelTitle: "Identity Provider Entity",
      entityModelContent:
        "The IdentityProvider entity stores all OIDC configuration for an external IdP. Each provider is optionally scoped to a tenant (TenantId = null means system-wide).",
      linkingTitle: "External Login Linking",
      linkingContent:
        "Authenticated account linking requires Sudo elevation (X-Sudo-Token) via POST /api/v1/auth/admin/external-logins/initiate-link (direct /external-logins/link is removed with 410 Gone). The IdP returns to the central callback on api.scripe.org, mints a link-purpose ExternalAuthHandoffTicket, and completes linking before returning to /account/security?ssoLinked=success.",
      centralRelayTitle: "Custom-Domain First-Party Session Micro-Relay & Dynamic CORS",
      centralRelayContent:
        "Verified custom tenant domains cannot share cross-site cookies with api.scripe.org, so Next.js BFF exposes three fail-closed routes (/api/auth/session/establish, /api/auth/session/refresh, /api/auth/session/logout) gated by same-origin Sec-Fetch-Site/Origin checks and signed with HMAC-SHA256 (X-Scripe-Session-Relay-Ts/Nonce/Client-Ip/Sig, 30s skew, 60s atomic nonce in SessionRelayAuthenticator, rate-limited by X-Scripe-Session-Relay-Client-Ip, and honoring X-Scripe-Relay-Refresh-MaxAge: 0 ephemeral staySignedIn=false cookies). When SSO on auth.scripe.org/sso/continue requires SCRIPE 2FA, PostMfaHandoffHelper, TenantOriginOwnershipValidator, and ssoTwoFactorBridge.ts mint a post-MFA ExternalAuthHandoffTicket back to {ReturnOrigin}/sso/callback. Production Cloudflare edge requires X-Scripe-Origin-Verify on api.scripe.org, ForwardedHeaders ForwardLimit=2, Saml:SpBaseUrl=https://api.scripe.org, Entra email+xms_edov claims, GitHub user:email read:user scopes, and 2-step SAML ACS setup.",
      splitLogoutTitle: "Split App vs. Central SSO Logout (scr.oidc.session)",
      splitLogoutContent:
        "Logout accepts logoutScope ('app' default or 'central'). CookieAuthMiddleware and AuthLogoutScopeHelper preserve the central OpenIddict server cookie (scr.oidc.session) during silent /refresh, /sso/handoff, /complete-workspace-selection, and app-scoped logouts so signing out of one workspace tab clears local bearer and refresh cookies without destroying the user's central SSO session; passing logoutScope: 'central' clears scr.oidc.session across the identity plane.",
      oauthAppsTitle: "OAuth Applications",
      oauthAppsContent:
        "OAuth Applications are third-party apps that authenticate against SCRIPE as an OIDC server. Each app gets a Client ID and Client Secret, with configurable redirect URIs, scopes, and PKCE enforcement.",
      claimMappingTitle: "Claim Mapping",
      claimMappingContent:
        "When an external IdP uses non-standard claim names, the ClaimMappingJson field maps them to SCRIPE's expected claims. If null, standard OIDC claim names (sub, email, name) are used.",
      tenantScopingTitle: "Tenant Scoping",
      tenantScopingContent:
        "Identity Providers are tenant-scoped via the TenantId column. Providers with null TenantId are system-wide (available to all tenants). The backend automatically filters providers by the current admin's tenant context.",
      tenantScopingNote:
        "Host admins can manage any tenant's SSO providers by using the 'Enter Tenant World' feature from the Tenants page. This scopes all API calls to the target tenant without needing to log in as that tenant's admin.",
      apiTitle: "API Endpoints",
    },
    login_failed: "Failed Login Attempt",
    account_locked: "Account Security Lockout",
    view: "Security View",
  },
};
