// FILE-EXCEPTION: file length
/**
 * Docs page locale — DE
 * Auto-generated from monolithic doc locale. Do not edit the generation source.
 */
export const de = {
  security: {
    overview: {
      title: "Sicherheitsübersicht",
      description:
        "5-Schichten-Verteidigungsstrategie, CORS-Konfiguration, Rate Limiting und Passwortrichtlinien.",
      intro:
        "SCRIPE implementiert eine Defense-in-Depth-Strategie mit mehreren Sicherheitsprüfungen.",
      layersTitle: "Verteidigungsschichten",
      featuresTitle: "Sicherheitsfunktionen",
      featureJwt: "JWT-Authentifizierung",
      featureJwtDesc: "Kurzlebige Access-Tokens mit HMAC-SHA256 Signatur.",
      feature2fa: "Zwei-Faktor-Auth (2FA)",
      feature2faDesc: "TOTP-basiertes 2FA, pro Mandant erzwingbar.",
      featureRbac: "RBAC-Berechtigungen",
      featureRbacDesc: "Umfassende PBAC-Durchsetzung für Rollen, Gruppen und Felder.",
      featureRateLimit: "Rate Limiting",
      featureRateLimitDesc:
        "4-stufiger Schutz: DDoS, pro IP, pro Endpunkt und für Authentifizierung.",
      featureAudit: "Audit Logging",
      featureAuditDesc: "Wer, Was, Wann, Wo mit Echtzeit-Broadcasting.",
      featureCors: "CORS Konfiguration",
      featureCorsDesc: "Strenge Validierung in Produktion, offenes CORS für localhost.",
      corsTitle: "CORS Konfiguration",
      corsIntro: "Unterscheidet sich zwischen Entwicklungs- und Produktionsumgebungen.",
      rateLimitTitle: "Rate Limiting Richtlinien",
      passwordTitle: "Passwortrichtlinien",
      securityWarning:
        "Überprüfen Sie immer die Sicherheitseinstellungen vor dem Production-Deployment.",
    },
    authDeep: {
      title: "Authentifizierung im Detail",
      description: "JWT-Lebenszyklus, BCrypt, Account-Lockout, OAuth, OTP und Impersonation.",
      intro: "Tiefer Einblick in alle Authentifizierungsmechanismen von SCRIPE.",
      jwtLifecycleTitle: "JWT Token-Lebenszyklus",
      jwtLifecycleIntro: "Rotierende Refresh-Tokens nach jeder Benutzung.",
      tokenStructureTitle: "JWT Token-Struktur",
      bcryptTitle: "$s2$ SHA-256 Pre-Hash + BCrypt Passwort-Hashing",
      bcryptIntro:
        "Passwörter werden über einen SHA-256 Base64 Pre-Hash ($s2$) plus BCrypt (Work Factor 12) gehasht (kein 72-Byte-Limit, Abwärtskompatibilität für $2a$/$2b$/$2y$), ergänzt durch PasswordHistory (5 Einträge) und 8.616 bekannte geleakte Passwörter.",
      lockoutTitle: "Account-Lockout (Sperre)",
      lockoutIntro:
        "15 Minuten Sperre (LoginLockoutMinutes) nach 5 Fehlversuchen (LoginLockoutThreshold / Identity.Login.MaxAttempts).",
      tfaTitle: "Zwei-Faktor-Authentifizierung (TOTP)",
      tfaIntro:
        "Kompatibel mit Google Authenticator und Authy; gibt ein einmaliges twoFactorPendingToken zurück und setzt bei erzwungener Einrichtung mfa_enroll=true.",
      externalAuthTitle: "Externe Authentifizierung (OAuth)",
      externalAuthIntro: "Integration von Google, Facebook, Apple, Microsoft.",
      otpTitle: "OTP-System & Recovery-Tokens",
      otpIntro:
        "6-stellige OTPs werden mit HMAC-SHA256 (Verification:VerifierKey) statt Klartext oder BCrypt verifiziert (10 Min. bzw. 30 Min. Prod-Reset, max. 5 Versuche); Admin-Resets nutzen einmalige PasswordResetToken-Grants.",
      impersonationTitle: "Admin-Impersonation (Identitätsannahme)",
      impersonationIntro: "Erlaubt SuperAdmins Fehlerbehebung mit angehängtem Audit-Trail.",
      impersonationWarning: "Alle Aktionen werden der Identität des Impersonators zugeordnet.",
      sessionTitle: "Sitzungsmanagement (Session Management)",
      sessionIntro:
        "Zustandsloses JWT-Modell kombiniert mit einmalig rotierenden Refresh-Tokens in der Datenbank. Access-Tokens verbleiben im Client-Speicher, Refresh-Tokens liegen in HttpOnly Secure SameSite=Lax Cookies ({CookiePrefix}_refresh_token oder __Host-scripe_refresh_token über das Custom-Domain-Micro-Relay), und RevokeAllSessions sperrt nur Geschwister-JTIs unter Beibehaltung der aktuellen Sitzung.",
      cookieAuthTip:
        "Arbeitsbereichs- und Custom-Domain-Sitzungen nutzen HttpOnly Secure SameSite=Lax Refresh-Cookies (__Host-scripe_refresh_token per HMAC-Relay), damit Top-Level-SSO-Weiterleitungen funktionieren und Cross-Site-Unteranfragen blockiert bleiben.",
      federationControlsTitle: "Dual-RP WebAuthn & Sudo Step-Up Governance",
      federationControlsContent:
        "Im Rahmen der Central Federation bleiben native Admin-Logins und WebAuthn-Passkeys strikt auf admin.scripe.org und *.admin.scripe.org beschränkt (EnableCentralNativeAndPasskeyMigration = false), ergänzt durch WebAuthn:UserVerification = 'required', PasskeyAuthLimit = 12 (15 Min.) und 0-Fehler --idempotent Migrationsparität über PostgreSQL 18, SQL Server 2025 und live Oracle 21c XE (IDENTITY-Schema). AdminPasskey.RpId (varchar(253)) und AllowedRpIds werden durch Fido2PasskeyService validiert; ISovereignSudoProtectedCommand-Befehle erzwingen 15-Minuten X-Sudo-Token HMAC-Prüfungen mit automatischem <SudoVerificationModal /> Retry.",
      workspaceRoutingTitle: "Multi-Workspace-Login-Routing",
      workspaceRoutingIntro:
        "Beim Anmelden über die Plattform-Domain ohne vorab festgelegten Mandanten führt der Handler einen 3-Wege-Algorithmus aus: Mandanten-Login bei übergebener ID, Plattform-Admin-Direktlogin bei gesetztem isPlatformAdmin-Flag und Workspace-Suche anhand der E-Mail-Adresse.",
      workspaceRoutingTip:
        "Das isPlatformAdmin-Flag signalisiert dem Backend, den globalen Administrator (TenantId = null) direkt abzufragen, anstatt erneut die Workspace-Erkennung auszuführen.",
      passwordExpiryTitle: "Durchsetzung von Passwort-Ablaufzeiten",
      passwordExpiryIntro:
        "Nach der Verifizierung prüft ITenantPasswordValidator, ob das Passwort des Administrators die konfigurierten PasswordExpiryDays überschritten hat. Bei Ablauf wird MustChangePassword = true zurückgegeben und eine Weiterleitung erzwungen.",
      passwordExpiryNote:
        "Ein Wert von 0 in TenantSettings.PasswordExpiryDays deaktiviert den Ablauf. Ist die Funktion aktiv, vergleicht das System (PasswordLastChanged + ExpiryDays) mit DateTime.UtcNow.",
      ssoSuspensionTitle: "SSO-Mandantensperrfilter",
      ssoSuspensionIntro:
        "ExternalLoginCommandHandler prüft vor der Token-Ausstellung den Status des Mandanten. Ist dieser gesperrt oder gekündigt, wird der Login sofort abgewiesen.",
      ssoSuspensionWarning:
        "Ohne diesen Sicherheitsfilter könnten Benutzer gesperrter Mandanten über externe IdPs (wie Google oder Azure AD) gültige JWTs erhalten.",
    },
    sso: {
      title: "Single Sign-On (SSO)",
      description: "OIDC-Authentifizierung, externe Identitätsverknüpfung und OAuth-Apps.",
      intro:
        "Das SCRIPE-System unterstützt die Authentifizierung über externe Anbieter basierend auf dem OIDC-Protokoll und die Bereitstellung von Anmeldeinformationen über OAuth-Anwendungen. Das System ist auf Mandantenfähigkeit ausgelegt, mit starkem Fokus auf PKCE-Sicherheit.",
      architectureTitle: "OIDC/OAuth Auth-Architektur",
      endpointsTitle: "Endpunkte & Flow",
      flowIntro:
        "Der SSO-Authentifizierungsprozess besteht aus einem mehrstufigen Flow, um maximale Sicherheit zu gewährleisten:",
      authEndpointTitle: "1. Autorisierungs-Endpunkt",
      authEndpointDesc:
        "Leitet den Benutzer zur Anmeldeseite des externen Identitätsanbieters weiter. Enthält PKCE-Verifizierung und Status-Token-Generierung.",
      callbackEndpointTitle: "2. Callback-Endpunkt",
      callbackEndpointDesc:
        "Empfängt den Benutzer nach erfolgreicher Authentifizierung und tauscht den Autorisierungscode gegen Sicherheitstokens auf der Serverseite aus – ohne Eingriff des Browsers.",
      linkingTitle: "Verknüpfung und Identitätsverarbeitung",
      linkingIntro:
        "Wenn ein Benutzer den Login abschließt, wird die E-Mail-Adresse mit der vorhandenen Benutzer-Datenbank abgeglichen. Wenn es sich um den ersten Login handelt, wird das externe OIDC-Konto mit dem internen SCRIPE-Konto verknüpft, um Duplikate zu vermeiden.",
      pkceWarning:
        "Die Unterstützung für veraltete implizite OAuth-Flows (Implicit Flow) entfällt. Stattdessen ist PKCE in allen Varianten zwingend erforderlich.",
      howItWorksTitle: "How SSO Works",
      howItWorksContent:
        "SCRIPE uses the Authorization Code Flow with PKCE (Proof Key for Code Exchange) for SSO. This is the most secure OAuth2 flow, recommended by the OAuth 2.1 specification for all client types.",
      step1Title: "1. Anbieter-Erkennung",
      step1Content:
        "Die Anmeldeoberfläche auf https://auth.scripe.org lädt verfügbare SSO-Anbieter über GET /api/v1/auth/oidc/providers/admin gemäß Tenancy:AuthBaseUrl und OriginRouting.",
      step2Title: "2. Serverseitiges PKCE & State-Ticket",
      step2Content:
        "Beim Klick auf einen SSO-Anbieter ruft das Frontend POST /api/v1/auth/oidc/challenge auf. Das Backend speichert code_verifier, nonce, state und validierte returnOrigin im serverseitigen ExternalAuthStateTicket (niemals im Browser-sessionStorage).",
      step3Title: "3. IdP-Weiterleitung mit zentralem Callback",
      step3Content:
        "Der Browser leitet direkt zum externen IdP weiter, wobei redirect_uri fest auf das zentrale https://api.scripe.org/api/v1/auth/oidc/callback (bzw. /api/v1/auth/saml/acs/{providerId}) verweist.",
      step4Title: "4. Zentraler Callback & Handoff-Ticket",
      step4Content:
        "Nach Anmeldung am externen IdP empfängt api.scripe.org den Callback, prüft ExternalAuthStateTicket, Mandantenstatus und HybridMfaPolicy und erstellt ein 120s SHA-256 ExternalAuthHandoffTicket (auth:ext-handoff:{sha256}, atomarer Replay-Schutz auth:ext-handoff-used:{sha256}) mit Redirect zu auth.scripe.org/sso/continue oder {ReturnOrigin}/sso/callback.",
      step5Title: "5. Einmaliger Handoff & Sitzungsaufbau",
      step5Content:
        "Die Zielseite löst das Ticket einmalig über POST /api/v1/auth/sso/handoff (auf Custom-Domains über /api/auth/session/establish HMAC-Relay) ein und initialisiert Memory-JWT sowie HttpOnly Lax Refresh-Cookie.",
      pkceTitle: "PKCE & Central Handoff Sicherheitsmodell",
      pkceContent:
        "Serverseitige ExternalAuthStateTicket-Verwaltung verhindert sessionStorage-Manipulationen. Einmalige 120s SHA-256 ExternalAuthHandoffTicket-Payloads binden returnOrigin gegen IVerifiedOriginEvaluator und verhindern Open-Redirects sowie Code-Interception.",
      entityModelTitle: "Identity Provider Entity",
      entityModelContent:
        "The IdentityProvider entity stores all OIDC configuration for an external IdP. Each provider is optionally scoped to a tenant (TenantId = null means system-wide).",
      linkingContent:
        "Die Verknüpfung eines bestehenden Kontos erfordert Sudo-Erhöhung (X-Sudo-Token) über POST /api/v1/auth/admin/external-logins/initiate-link (direktes /external-logins/link liefert 410 Gone) und schließt über zentralen Callback plus Handoff ab.",
      centralRelayTitle: "Custom-Domain First-Party Session Micro-Relay & Dynamisches CORS",
      centralRelayContent:
        "Verifizierte Custom-Domains teilen keine Cross-Site-Cookies mit api.scripe.org; daher stellt Next.js BFF drei Fail-Closed-Routen bereit (/api/auth/session/establish, /refresh, /logout), geschützt durch Sec-Fetch-Site/Origin-Prüfungen und HMAC-SHA256-Header (X-Scripe-Session-Relay-*, 30s Skew, 60s Nonce, Rate-Limit-Partitionierung via X-Scripe-Session-Relay-Client-Ip sowie X-Scripe-Relay-Refresh-MaxAge: 0 für staySignedIn=false), die __Host-scripe_refresh_token lokal setzen. Bei Hybrid-2FA auf auth.scripe.org/sso/continue erzeugen PostMfaHandoffHelper, TenantOriginOwnershipValidator und ssoTwoFactorBridge.ts ein Post-MFA-Handoff-Ticket zurück zu {ReturnOrigin}/sso/callback; Produktion erfordert Cloudflare X-Scripe-Origin-Verify, ForwardedHeaders ForwardLimit=2, Entra email+xms_edov Claims, GitHub user:email read:user Scopes und 2-stufiges SAML ACS Setup.",
      splitLogoutTitle: "Getrennter App- vs. Zentral-Logout (scr.oidc.session)",
      splitLogoutContent:
        "Logout unterstützt logoutScope ('app' Standard oder 'central'). AuthLogoutScopeHelper und CookieAuthMiddleware erhalten das zentrale OpenIddict-Cookie scr.oidc.session bei /refresh, /sso/handoff, /complete-workspace-selection und 'app'-Logouts; erst 'central' löscht es.",
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
    dataProtection: {
      title: "Datenschutz (Data Protection)",
      description:
        "Mandantenisolierung, Verschlüsselung, Field-Level-Security und DSGVO-Compliance.",
      intro: "SCRIPE schützt Daten auf jeder Ebene, vom Netzwerk bis zur Zeile in der Datenbank.",
      tenantIsolationTitle: "Datenisolierung für Mandanten",
      tenantIsolationIntro: "Alle Abfragen werden über globale Query Filter beschränkt.",
      tenantScopingTitle: "Query Filter Scoping",
      tenantServicesTitle: "Tenant-Aware Services",
      tenantServicesIntro: "Verwendet den IDataScopeService für Zugriff auf die Mandanten-ID.",
      dataAtRestTitle: "Verschlüsselung gespeicherter Daten (Data at Rest)",
      dataAtRestIntro: "Datenbankseitiges TDE und ASP.NET Core Data Protection API.",
      dataInTransitTitle: "Verschlüsselung bei der Übertragung (Data in Transit)",
      dataInTransitIntro: "Ausschließlich TLS 1.2+ mit HSTS-Headern.",
      restrictedFieldsTitle: "Eingeschränkte Felder (Field-Level Security)",
      restrictedFieldsIntro:
        "FieldProjectionMiddleware entfernt sensible Felder aus der JSON-Antwort.",
      idEncryptionTitle: "ID-Verschlüsselung",
      idEncryptionIntro: "Maskiert interne Guid-IDs vor externen Benutzern mittels AES-256.",
      gdprTitle: "DSGVO Compliance (GDPR)",
      gdprIntro: "Recht auf Löschung, Datenübertragbarkeit und Zustimmungsverwaltung.",
      rightToDeleteTitle: "Recht auf Löschung",
      dataPortabilityTitle: "Datenübertragbarkeit",
      consentTitle: "Zustimmungsverwaltung (Consent Management)",
      retentionTitle: "Datenaufbewahrungsrichtlinien",
      auditTrailTitle: "Audit-Trail für Compliance",
      bypassWarning:
        "Vorsicht bei der Verwendung von IgnoreQueryFilters() in Bezug auf Datenlecks.",
      rightToDeleteDesc:
        "Dauerhafte Löschung von Benutzerdaten und PII über alle Mandanten-Datenbanken hinweg auf Anfrage.",
      dataPortabilityDesc:
        "Export umfassender, maschinenlesbarer Archive aller benutzerbezogenen Daten im JSON-Format.",
      consentDesc:
        "Unveränderbare, chronologische Nachverfolgung von Einwilligungszeitpunkten, Richtlinienversionen und User-Agents.",
      auditTrailDesc:
        "Manipulationssichere Protokollierung jedes Lese-, Schreib-, Export- und Löschvorgangs sensibler personenbezogener Daten.",
      tenantScopingDesc:
        "Strikte Mandantentrennung, die sicherstellt, dass persönliche Daten niemals Mandantengrenzen überschreiten.",
      retentionDesc:
        "Automatische Hintergrundbereinigung und Anonymisierung gemäß regulatorischen Aufbewahrungsfristen.",
    },
    apiSecurity: {
      title: "API-Sicherheit",
      description: "Rate Limiting, CORS, Input Validierung, CSRF-Schutz und Security Headers.",
      intro: "Mehrere Verteidigungslinien für die Web-API.",
      rateLimitTitle: "Rate Limiting",
      rateLimitIntro: "4-stufiges Rate Limiting über den in ASP.NET Core integrierten Limiter.",
      corsTitle: "CORS Konfiguration",
      corsIntro: "Eingeschränkt in der Produktion, offen für localhost-Entwicklung.",
      inputValidationTitle: "Input-Validierung",
      inputValidationIntro:
        "Strukturierte Validierungsfehler über FluentValidation in der Pipeline.",
      csrfTitle: "CSRF-Schutz",
      csrfIntro: "Bear-Tokens und SameSite-Cookies schützen vor Cross-Site Request Forgery.",
      headersTitle: "Security Headers",
      headersIntro: "A+ Score Standard: nosniff, DENY, CSP.",
      headersTip: "Testen Sie Ihre Header immer über securityheaders.com.",
      replayTitle: "Schutz vor Replay-Angriffen",
      replayIntro: "Einmal-Tokens und Zeitstempel verhindern Replays.",
    },
    middlewarePipeline: {
      title: "Middleware-Pipeline",
      description:
        "33 geordnete Pipeline-Stufen in MiddlewarePipeline.cs — von Security-Headern und JWT/API-Key-Auth über Post-Auth Rate Limiting bis Trusted CIDR, mcp=true und mfa_enroll=true.",
      intro:
        "SCRIPEs HTTP-Pipeline durchläuft 33 streng geordnete Stufen in MiddlewarePipeline.cs und bricht bei Richtlinienverstößen sofort ab.",
      overviewTitle: "Pipeline-Übersicht",
      overviewIntro: "Der Flow verläuft von oben nach unten. Die Reihenfolge ist heilig.",
      globalExceptionTitle: "1. Global Exception Handler",
      globalExceptionIntro:
        "Fängt ungehandelte Ausnahmen ab und gibt standardisiertes JSON zurück.",
      correlationIdTitle: "2. Correlation ID",
      correlationIdIntro: "Für Distributed Tracing und Logs.",
      requestLoggingTitle: "3. Request Logging",
      requestLoggingIntro: "Protokolliert Metadaten; maskiert sensible Routen (wie /login).",
      cookieAuthTitle: "4. Cookie-to-Bearer Conversion",
      cookieAuthIntro: "Projiziert HttpOnly Cookies in den Authorization-Header für das Frontend.",
      tenantContextTitle: "5. Tenant Context",
      tenantContextIntro: "Extrahiert die tenant_id für IDataScopeService.",
      tenantContextNote: "MUSS nach Auth und vor jedem DB-Zugriff ausgeführt werden.",
      cacheHeadersTitle: "6. Cache Headers",
      cacheHeadersIntro: "Setzt No-Cache für APIs und Max-Age für statische Dateien.",
      fieldProjectionTitle: "7. Field Projection",
      fieldProjectionIntro:
        "Löscht aus der Antwort jene Felder, für die der User keine Berechtigung hat.",
      observabilityTitle: "Observability Middleware",
      observabilityIntro: "OpenTelemetry und Prometheus /metrics-Endpunkt.",
      registrationTitle: "Registrierungsreihenfolge",
      registrationIntro:
        "Die Registrierung in MiddlewarePipeline.cs ist strikt geordnet: ApiKeyUsageMiddleware und Rate Limiting folgen auf UseAuthentication(), während TrustedCidrEnforcementMiddleware, MustChangePasswordMiddleware und RequireMfaEnrollmentMiddleware nach UseAuthorization() greifen.",
      summaryTitle: "Middleware Zusammenfassung",
      orderWarning: "Ändern Sie diese Reihenfolge niemals leichtfertig.",
    },
    auditCompliance: {
      title: "Audit & Compliance",
      description:
        "Vollständige Audit-Pipeline, Entitätsverfolgung, SignalR-Streaming, CSV/Excel/PDF-Export und Compliance-Funktionen.",
      intro: "Ein lückenloses Protokoll jeder Datenänderung und API-Anfrage.",
      architectureTitle: "Audit-Architektur",
      architectureIntro:
        "Das Audit-System besteht aus der HTTP-Anforderungsprotokollierung und dem Abfangen von Entitätsänderungen auf Datenbankebene. Anforderungsmetadaten werden asynchron auf Host-Ebene über die RequestLoggingMiddleware protokolliert, während Änderungen auf Datenbankebene durch den AuditableEntityInterceptor vor SaveChanges erfasst werden.",
      interceptorTitle: "Entity Change Interceptor",
      interceptorIntro:
        "Der AuditableEntityInterceptor klinkt sich in die SaveChangesAsync-Pipeline von EF Core ein. Für jede hinzugefügte, geänderte oder gelöschte Entität (einschließlich Soft Deletes) erfasst er die alten und neuen Werte als JSON, den ausführenden Benutzer und den Zeitstempel. AuditLog-Entitäten werden übersprungen, um unendliche Rekursionen zu verhindern.",
      auditLogEntityTitle: "AuditLog Entitäts-Struktur",
      signalrTitle: "Echtzeit SignalR-Streaming",
      signalrIntro:
        "Audit-Logs werden in Echtzeit über den SignalR AuditHub übertragen. Verbundene Admin-Clients erhalten sofortige Benachrichtigungen bei Datenänderungen, was Live-Überwachungs-Dashboards ermöglicht.",
      exportTitle: "Exportfunktionen",
      exportIntro: "Unterstützt CSV, Excel und PDF gefiltert nach Mandant.",
      exportDetail:
        "Der AuditExportService bietet Exporte in mehreren Formaten. Der CSV-Export nutzt CsvHelper mit erzwungenen Anführungszeichen (RFC 4180) zur Vermeidung von CSV-Injektionen und fügt ein UTF-8-BOM für Excel hinzu. Der Excel-Export generiert eine ClosedXML-Arbeitsmappe mit drei Tabellenblättern: Executive Summary (KPIs und Statistiken), Audit Data (mit Auto-Filtern, fixierten Kopfzeilen und bedingter Formatierung in Grün/Rot) sowie Security Analysis. Der PDF-Export basiert auf QuestPDF und ist für große Datenmengen als veraltet (Obsolete) markiert. Zum Schutz der Systemressourcen sind alle Exporte auf 10.000 Zeilen begrenzt und werden vor der Übertragung vollständig im Arbeitsspeicher gepuffert.",
      queryApiTitle: "Abfrage- & Export-API",
      queryApiIntro:
        "Die Audit-API bietet Such-, Filter- und Exportfunktionen für Audit-Logs. Alle Endpunkte erfordern eine Admin-Authentifizierung sowie die Berechtigung audit.view oder audit.export.",
      querySearchDesc: "Audit-Logs durchsuchen.",
      queryExportCsvDesc: "Audit-Logs als CSV exportieren.",
      queryExportExcelDesc: "Als Excel-Tabelle exportieren.",
      queryExportPdfDesc: "Als PDF-Dokument exportieren.",
      scopingTitle: "Hierarchische Mandantenabgrenzung und Sicherheitsisolation",
      scopingDetail:
        "Die Datenisolation wird dynamisch bei der Abfrageausführung erzwungen. Der DataScopeService ermittelt den effektiven Bereich des Administrators basierend auf einer strikten Prioritätskette: ContextTenant (Drilldown über AES-verschlüsselte Kontext-Header), Berechtigungs-Overrides, SystemProtectedAdmin, Hierarchy (einschließlich Unterkunden) oder OwnTenant. Nachkommen werden in konstanter Zeit über materialisierte Pfade durchlaufen, wobei Starts-With-Abfragen in indexierte SQL-LIKE-Befehle übersetzt werden. Das Repository wendet AuditByTenantScopeSpec an, um die Filterung per 'WHERE TenantId IN (...)' sicherzustellen, während direkte GUID-Abfragen durch GetAuditLogDetailQueryHandler validiert werden, um horizontale Rechteausweitung zu verhindern.",
      complianceTitle: "Compliance-Funktionen",
      immutableTitle: "Unveränderliche Logs",
      immutableDesc:
        "Protokolle sind gesperrt und schreibgeschützt gespeichert, um Löschungen oder Änderungen nach dem Speichern zu verhindern.",
      fullTraceTitle: "Lückenlose Nachverfolgbarkeit",
      fullTraceDesc:
        "Erfasst HTTP-Header, Anforderungskontext und Entitätsänderungen, um eine vollständige Nachverfolgbarkeit zu gewährleisten.",
      searchableTitle: "Durchsuchbar",
      searchableDesc:
        "Optimierte Indizes auf Timestamp, UserId, EventType und CorrelationId ermöglichen eine sofortige Suche.",
      tenantScopedTitle: "Mandantenbezogen (Tenant Scoped)",
      tenantScopedDesc:
        "Protokolle werden automatisch durch TenantId- und Mandantenhierarchie-Grenzen isoliert, um Datenlecks zu verhindern.",
      realtimeTitle: "In Echtzeit",
      realtimeDesc:
        "Streamen Sie Sicherheitsereignisse und Mutationen direkt an mandantenspezifische SignalR-Dashboards.",
      retentionTitle: "Aufbewahrungsrichtlinie",
      retentionDesc:
        "Konfigurierte Aufbewahrungsfristen löschen abgelaufene Audit-Logs automatisch über Hintergrunddienste.",
    },
    login_failed: "Fehlgeschlagener Anmeldeversuch",
    account_locked: "Sicherheits-Kontosperre",
    view: "Sicherheitsansicht",
  },
};
