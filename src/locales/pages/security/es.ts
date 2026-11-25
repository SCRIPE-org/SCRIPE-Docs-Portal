// FILE-EXCEPTION: file length
/**
 * Docs page locale — ES
 * Auto-generated from monolithic doc locale. Do not edit the generation source.
 */
export const es = {
  security: {
    overview: {
      title: "Visión General de la Seguridad",
      description:
        "Estrategia de defensa en 5 capas, características de seguridad, configuración CORS, limitación de tasa y políticas de contraseñas.",
      intro:
        "SCRIPE implementa una defensa en profundidad con cinco capas: protección de red, autenticación, autorización, aislamiento de datos y registros de auditoría.",
      layersTitle: "Capas de Defensa de Seguridad",
      featuresTitle: "Características de Seguridad",
      featureJwt: "Autenticación JWT",
      featureJwtDesc: "Tokens de corta duración con rotación automática, firmados por HMAC-SHA256.",
      feature2fa: "Autenticación 2FA",
      feature2faDesc:
        "Doble factor obligatorio por inquilino basado en aplicaciones TOTP (Google Authenticator).",
      featureRbac: "Permisos RBAC",
      featureRbacDesc:
        "Motor de control (PBAC/ABAC/RBAC) almacenado dinámicamente en el servidor en cada token refresh.",
      featureRateLimit: "Limitación de Tasa (Rate Limiting)",
      featureRateLimitDesc:
        "4 niveles: DDoS, IP individual, Endpoint individual, y rutas de inicio de sesión.",
      featureAudit: "Auditoría Continua",
      featureAuditDesc: "Broadcasting asíncrono en tiempo real del 'quién, qué y dónde'.",
      featureCors: "Configuración CORS",
      featureCorsDesc:
        "Reglas estrictas de validación de orígenes controladas por los archivos appsettings.",
      corsTitle: "Configuración CORS",
      corsIntro:
        "Desarrollo permite todo origen Localhost. Producción usa la política estricta de orígenes declarados.",
      rateLimitTitle: "Políticas de Limitación de Tasa",
      passwordTitle: "Políticas de Contraseñas",
      securityWarning:
        "Antes del pase a producción, configura tus cadenas de orígenes, cambia las contraseñas base e impulsa la obligación del 2FA.",
    },
    authDeep: {
      title: "Autenticación a Fondo",
      description:
        "Ciclo de vida del JWT, hash BCrypt, bloqueo de cuentas, 2FA, OAuth, OTP, suplantación y gestión de sesiones.",
      intro: "Exploración exhaustiva de los mecanismos de identidad de SCRIPE.",
      jwtLifecycleTitle: "Ciclo de Vida del Token JWT",
      jwtLifecycleIntro:
        "Tokens de acceso de 30 minutos por defecto (Jwt:ExpiryMinutes / SessionPolicy) con firma HMAC-SHA256, revocación jti + scripe_iat_ms (+5ms) y refresh rotativo en cookie HttpOnly bajo techo AbsoluteExpiresAt (24h, >=30d StaySignedIn, 8h impersonation).",
      tokenStructureTitle: "Estructura del JWT",
      bcryptTitle: "Hash de Contraseña $s2$ SHA-256 + BCrypt",
      bcryptIntro:
        "Las contraseñas usan pre-hash SHA-256 Base64 ($s2$) + BCrypt (factor 12) evitando el truncamiento de 72 bytes, junto con PasswordHistory (5 contraseñas) y una lista de 8,616 contraseñas filtradas.",
      lockoutTitle: "Bloqueo de Cuentas",
      lockoutIntro:
        "5 intentos fallidos de acceso o 2FA (LoginLockoutThreshold) generan 15 minutos de bloqueo (LoginLockoutMinutes) o hasta desbloqueo administrativo.",
      tfaTitle: "Autenticación de Dos Factores (TOTP)",
      tfaIntro:
        "Compatible con Google Authenticator y Authy; devuelve un twoFactorPendingToken de un solo uso y mfa_enroll=true cuando Require2FA exige registro.",
      externalAuthTitle: "Autenticación Externa (OAuth)",
      externalAuthIntro:
        "Soporte oficial y validación en servidor para tokens recibidos de Google, Facebook, Microsoft y Apple.",
      otpTitle: "Sistema OTP y Credenciales de Recuperación",
      otpIntro:
        "Códigos de 6 dígitos verificados con HMAC-SHA256 (Verification:VerifierKey, 10 min / 30 min en Producción, máximo 5 intentos) y tokens PasswordResetToken SHA-256 de un solo uso.",
      impersonationTitle: "Suplantación de Administrador (Impersonation)",
      impersonationIntro:
        "Tokens especiales emitidos a un SuperAdmin para visualizar y depurar el panel como otro usuario, con rastreo en auditoría adjunto.",
      impersonationWarning:
        "Una función altamente privilegiada de uso temporal (máximo 1 hora). No puede usarse sobre usuarios protegidos ni SuperAdmins homólogos.",
      sessionTitle: "Gestión de Sesiones",
      sessionIntro:
        "Modelo sin estado (Stateless) con rotación de Refresh Tokens de un solo uso en base de datos. El JWT de acceso vive solo en memoria, el refresh circula en cookies HttpOnly Secure SameSite=Lax ({CookiePrefix}_refresh_token o __Host-scripe_refresh_token en dominios personalizados), y RevokeAllSessions revoca las sesiones hermanas por JTI preservando la sesión activa actual.",
      cookieAuthTip:
        "Las sesiones de espacios de trabajo y dominios personalizados emplean cookies HttpOnly Secure SameSite=Lax (__Host-scripe_refresh_token vía micro-relay HMAC) para permitir redirecciones SSO de primer nivel y bloquear subpeticiones entre sitios.",
      federationControlsTitle: "Gobernanza WebAuthn Dual-RP y Elevación Sudo",
      federationControlsContent:
        "Bajo la Federación Central, el inicio nativo de administradores y passkeys WebAuthn permanecen fijados en admin.scripe.org y *.admin.scripe.org (EnableCentralNativeAndPasskeyMigration = false) con WebAuthn:UserVerification = 'required', PasskeyAuthLimit = 12 (15 min) y paridad de migraciones --idempotent sin errores en PostgreSQL 18, SQL Server 2025 y Oracle 21c XE en vivo (esquema IDENTITY). AdminPasskey.RpId (varchar(253)) y AllowedRpIds se validan en Fido2PasskeyService, mientras ISovereignSudoProtectedCommand exige X-Sudo-Token de 15 minutos con reintento automático en <SudoVerificationModal />.",
      workspaceRoutingTitle: "Enrutamiento de Acceso Multi-Espacio",
      workspaceRoutingIntro:
        "Al iniciar sesión en el dominio global sin inquilino predeterminado, el gestor aplica un algoritmo de 3 casos: acceso acotado por tenantId, acceso directo para administrador de plataforma (isPlatformAdmin) y descubrimiento de espacios por correo electrónico.",
      workspaceRoutingTip:
        "La bandera isPlatformAdmin indica al backend que busque al administrador con TenantId = null directamente, evitando reiniciar la búsqueda de espacios.",
      passwordExpiryTitle: "Expiración Obligatoria de Contraseñas",
      passwordExpiryIntro:
        "Tras validar credenciales, ITenantPasswordValidator comprueba si la contraseña superó los PasswordExpiryDays del inquilino. De ser así, se devuelve MustChangePassword = true para forzar el cambio.",
      passwordExpiryNote:
        "Un valor de 0 desactiva la expiración. Con la función activa, el sistema compara (PasswordLastChanged + ExpiryDays) con la hora UTC actual sin bloquear al usuario de inmediato.",
      ssoSuspensionTitle: "Bloqueo de Inquilinos Suspendidos en SSO",
      ssoSuspensionIntro:
        "ExternalLoginCommandHandler evalúa el estado de la organización antes de emitir el token. Si está suspendida o cancelada, se rechaza la autenticación.",
      ssoSuspensionWarning:
        "Sin esta verificación, los usuarios de inquilinos suspendidos podrían obtener credenciales legítimas mediante proveedores externos como Google o Azure AD.",
    },
    sso: {
      title: "Single Sign-On (SSO)",
      description: "Autenticación OIDC, vinculación de identidad externa y aplicaciones OAuth.",
      intro:
        "El sistema SCRIPE soporta autenticación mediante proveedores externos basándose en el protocolo OIDC, y el suministro de credenciales a través de Aplicaciones OAuth. El sistema es consciente del inquilino, con un enfoque contundente en la seguridad PKCE.",
      architectureTitle: "Arquitectura de Autenticación OIDC / OAuth",
      endpointsTitle: "Endpoints y Flujo Operacional",
      flowIntro:
        "El proceso de autenticación SSO requiere un flujo de múltiples pasos para garantizar una seguridad extrema:",
      authEndpointTitle: "1. Endpoint de Autorización",
      authEndpointDesc:
        "Redirige a la página de inicio de sesión del IdP externo. Incluye verificación PKCE y paso de token de estado.",
      callbackEndpointTitle: "2. Endpoint de Retorno (Callback)",
      callbackEndpointDesc:
        "Recibe al usuario después de una autenticación exitosa e intercambia el código de autorización por tokens de seguridad, ejecutado enteramente del lado del servidor sin intervención del navegador.",
      linkingTitle: "Vinculación y Manejo de Identidades",
      linkingIntro:
        "Cuando el usuario completa el inicio de sesión, el correo electrónico se verifica con la base de datos de usuarios existentes. Si es su primer inicio de sesión, el registro OIDC se vincula de manera opaca al registro interno de SCRIPE, evitando conflictos de duplicidad.",
      pkceWarning:
        "Soporte para flujos implícitos (Implicit flow) obsoleto de OAuth eliminado. Se exige PKCE obligatorio en todas las variantes.",
      howItWorksTitle: "How SSO Works",
      howItWorksContent:
        "SCRIPE uses the Authorization Code Flow with PKCE (Proof Key for Code Exchange) for SSO. This is the most secure OAuth2 flow, recommended by the OAuth 2.1 specification for all client types.",
      step1Title: "1. Descubrimiento de Proveedores",
      step1Content:
        "La interfaz de acceso en https://auth.scripe.org obtiene los proveedores activos mediante GET /api/v1/auth/oidc/providers/admin según Tenancy:AuthBaseUrl y OriginRouting.",
      step2Title: "2. Reto PKCE y Ticket de Estado en Servidor",
      step2Content:
        "Al pulsar un proveedor SSO, el frontend invoca POST /api/v1/auth/oidc/challenge. El backend guarda code_verifier, nonce, state y returnOrigin validado dentro de ExternalAuthStateTicket en servidor (nunca en sessionStorage del navegador).",
      step3Title: "3. Redirección al IdP con Callback Central",
      step3Content:
        "El navegador redirige al IdP externo con redirect_uri fijado en el punto central https://api.scripe.org/api/v1/auth/oidc/callback (o /api/v1/auth/saml/acs/{providerId}).",
      step4Title: "4. Callback Central y Ticket Handoff",
      step4Content:
        "El IdP devuelve al usuario a api.scripe.org; el servidor consume ExternalAuthStateTicket, evalúa suspensión de inquilino y HybridMfaPolicy, emite un ExternalAuthHandoffTicket SHA-256 de 120s (auth:ext-handoff:{sha256}, bloqueo atómico auth:ext-handoff-used:{sha256}) y redirige a auth.scripe.org/sso/continue o {ReturnOrigin}/sso/callback.",
      step5Title: "5. Canje Único Handoff e Inicio de Sesión",
      step5Content:
        "La página /sso/callback o /sso/continue canjea una sola vez el ticket vía POST /api/v1/auth/sso/handoff (o mediante el micro-relay HMAC /api/auth/session/establish en dominios propios) e hidrata el JWT en memoria y la cookie HttpOnly Lax.",
      pkceTitle: "Modelo de Seguridad PKCE y Handoff Central",
      pkceContent:
        "Persistir ExternalAuthStateTicket en el servidor elimina la exposición PKCE en sessionStorage. Los tickets ExternalAuthHandoffTicket de 120s (SHA-256 atómico) validan returnOrigin contra IVerifiedOriginEvaluator para evitar redirecciones abiertas e interceptación de códigos.",
      entityModelTitle: "Identity Provider Entity",
      entityModelContent:
        "The IdentityProvider entity stores all OIDC configuration for an external IdP. Each provider is optionally scoped to a tenant (TenantId = null means system-wide).",
      linkingContent:
        "Vincular una cuenta autenticada exige elevación Sudo (X-Sudo-Token) vía POST /api/v1/auth/admin/external-logins/initiate-link (la ruta directa /external-logins/link devuelve 410 Gone) y concluye mediante el callback central y handoff.",
      centralRelayTitle: "Micro-Relay HMAC de Sesión en Dominio Personalizado y CORS Dinámico",
      centralRelayContent:
        "Los dominios propios verificados no comparten cookies entre sitios con api.scripe.org; por ello Next.js BFF expone /api/auth/session/establish, /refresh y /logout protegidos con Sec-Fetch-Site/Origin y firma HMAC-SHA256 (X-Scripe-Session-Relay-*, ventana 30s, nonce 60s, partición de límite de tasa por X-Scripe-Session-Relay-Client-Ip y X-Scripe-Relay-Refresh-MaxAge: 0 para staySignedIn=false) emitiendo __Host-scripe_refresh_token local. Cuando SSO en auth.scripe.org/sso/continue requiere 2FA, PostMfaHandoffHelper, TenantOriginOwnershipValidator y ssoTwoFactorBridge.ts emiten un ticket post-MFA hacia {ReturnOrigin}/sso/callback, respaldado en producción por Cloudflare X-Scripe-Origin-Verify, ForwardedHeaders ForwardLimit=2, claims email+xms_edov en Entra, scopes user:email read:user en GitHub y configuración SAML ACS en 2 pasos.",
      splitLogoutTitle: "Cierre de Sesión Dividido: App vs. Central (scr.oidc.session)",
      splitLogoutContent:
        "El cierre de sesión admite logoutScope ('app' por defecto o 'central'). AuthLogoutScopeHelper y CookieAuthMiddleware conservan scr.oidc.session durante /refresh, /sso/handoff, /complete-workspace-selection y cierres 'app', borrándola solo cuando logoutScope es 'central'.",
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
      title: "Protección de Datos",
      description:
        "Aislamiento de inquilinos, encriptación en reposo y tránsito, campos restringidos y cumplimiento GDPR.",
      intro:
        "Toda la infraestructura de protección detrás de la manipulación interna de la información en SCRIPE.",
      tenantIsolationTitle: "Aislamiento de Datos de Inquilinos",
      tenantIsolationIntro:
        "El middleware contextual del JWT impone el aislamiento desde el nivel más bajo (EF Core Global Filters).",
      tenantScopingTitle: "Alcance de Filtros de Consulta",
      tenantServicesTitle: "Servicios Conscientes del Inquilino (Tenant-Aware)",
      tenantServicesIntro:
        "Uso de la inyección de la interfaz IDataScopeService para extraer el inquilino sin acoplarse al Request HTTP general.",
      dataAtRestTitle: "Encriptación de Datos en Reposo (Data at Rest)",
      dataAtRestIntro:
        "Las bases utilizan TDE (Transparent Data Encryption), mientras que secretos específicos se encriptan bajo la API Data Protection de ASP.NET Core.",
      dataInTransitTitle: "Encriptación de Datos en Tránsito (Data in Transit)",
      dataInTransitIntro:
        "Comunicación obligatoria sobre túneles TLS 1.2+ y encabezados HSTS en despliegue productivo.",
      restrictedFieldsTitle: "Restricción de Campos Sensibles",
      restrictedFieldsIntro:
        "Saneamiento dinámico en el middleware antes de lanzar el JSON de respuesta si el rol carece de los privilegios exactos de visibilidad del campo.",
      idEncryptionTitle: "Cifrado de IDs",
      idEncryptionIntro:
        "Las IDs base pueden empaquetarse con AES-256 en salida hacia las APIs públicas para frustrar el rasgueo o adivinación de recursos.",
      gdprTitle: "Cumplimiento de la Normativa GDPR",
      gdprIntro:
        "Soporta nativamente las leyes de Portabilidad y Derecho al Olvido (Right to delete).",
      rightToDeleteTitle: "Derecho a ser Borrado",
      dataPortabilityTitle: "Portabilidad de Datos",
      consentTitle: "Gestión del Consentimiento",
      retentionTitle: "Políticas de Retención de Datos",
      auditTrailTitle: "Trazabilidad para la Auditoría Normativa",
      bypassWarning:
        "Al llamar a IgnoreQueryFilters(), anulas la defensa básica del ORM contra el aislamiento del inquilino, asegurate de acotarlo a mano en el LINQ.",
      rightToDeleteDesc:
        "Borrado permanente y garantizado de registros y datos personales en todas las bases de datos ante solicitudes formales.",
      dataPortabilityDesc:
        "Exportación completa en formato legible por máquina (JSON) de todos los datos vinculados al usuario.",
      consentDesc:
        "Registro inmutable de marcas de tiempo de consentimiento, versiones de términos y agentes de usuario.",
      auditTrailDesc:
        "Auditoría protegida contra manipulación de cada lectura, edición, exportación o supresión de datos sensibles.",
      tenantScopingDesc:
        "Aislamiento estricto entre organizaciones que garantiza que los datos personales nunca trasciendan el entorno del inquilino.",
      retentionDesc:
        "Depuración y anonimización automática en segundo plano conforme a normativas y políticas de custodia.",
    },
    apiSecurity: {
      title: "Seguridad de la API",
      description:
        "Limitación de tasa, CORS, validación de entrada, protección CSRF y prevención contra ataques de repetición.",
      intro: "El escudo defensivo del canal de comunicación del Backend SCRIPE.",
      rateLimitTitle: "Limitación de Tasa (Rate Limiting)",
      rateLimitIntro:
        "La limitación del servidor protege por IP e incluso ajusta las ráfagas sobre operaciones criptográficas densas (logins).",
      corsTitle: "Configuración CORS",
      corsIntro: "Solo dominios conocidos y encabezados controlados.",
      inputValidationTitle: "Validación de Entradas (Input Validation)",
      inputValidationIntro:
        "Se realiza a través del marco de validación FluentValidation en un paso que intercepta (Behavior) SCRIPE mediator.",
      csrfTitle: "Protección CSRF",
      csrfIntro: "Manejo inteligente del Token Bearer y las directivas SameSite Strict.",
      headersTitle: "Encabezados de Seguridad (Security Headers)",
      headersIntro:
        "Emisión automática de reglas como X-Content-Type-Options: nosniff, y CSP (Content Security Policy) restrictivo.",
      headersTip:
        "Obtén siempre calificación A+ verificando tu dominio en portales estandarizados de prueba de seguridad.",
      replayTitle: "Prevención de Ataques de Repetición (Replay Attacks)",
      replayIntro:
        "Imposible de replicar gracias a la vigencia minúscula del JWT y los usos únicos transaccionales en las ventanas temporales del 2FA.",
    },
    middlewarePipeline: {
      title: "Pipeline de Middleware",
      description:
        "33 etapas ordenadas en MiddlewarePipeline.cs: cabeceras, autenticación JWT/API Key, Rate Limiting post-auth, Trusted CIDR, mcp=true, mfa_enroll=true y proyección de campos.",
      intro: "La canalización HTTP de SCRIPE ejecuta 33 etapas en orden estricto dentro de MiddlewarePipeline.cs.",
      overviewTitle: "Visión General del Pipeline",
      overviewIntro:
        "El proceso es de caída libre: un error superior cancelará la ejecución de las capas subyacentes.",
      globalExceptionTitle: "1. Manejador de Excepciones Global",
      globalExceptionIntro:
        "Atrapa cualquier crash 500 y retorna JSON seguro que no detalla la infraestructura si estás en producción.",
      correlationIdTitle: "2. ID de Correlación (Correlation ID)",
      correlationIdIntro:
        "Firma única asignada al instante 0 del request y traspasada al log, a la base de datos y a las integraciones.",
      requestLoggingTitle: "3. Registro de Solicitud (Request Logging)",
      requestLoggingIntro:
        "Registros estructurados que oscurecen automáticamente campos prohibidos (como contraseñas) dentro de la carga útil del request.",
      cookieAuthTitle: "4. Conversión de Cookie a Bearer",
      cookieAuthIntro:
        "Traduce una Cookie de autenticación a un JWT nativo sobre el encabezado HTTP para su posterior consumo limpio en el Backend.",
      tenantContextTitle: "5. Contexto de Inquilino (Tenant Context)",
      tenantContextIntro:
        "Busca y planta el ID de Inquilino extraído del Request en la variable IDataScopeService de alcance general.",
      tenantContextNote:
        "Se destruye el sistema si este middleware se registra antes de la Autenticación o después de iniciar transacciones de DB.",
      cacheHeadersTitle: "6. Encabezados de Caché",
      cacheHeadersIntro:
        "Impone cabeceras 'no-store, no-cache' en rutas API y otorga ETags para rutas estáticas.",
      fieldProjectionTitle: "7. Proyección de Campos",
      fieldProjectionIntro:
        "Destruye (hace nulas) propiedades enteras del JSON de retorno antes de llegar al usuario, protegiendo datos con control ABAC.",
      observabilityTitle: "Middleware de Observabilidad",
      observabilityIntro: "Levanta métricas con OpenTelemetry y Prometheus.",
      registrationTitle: "Orden de Registro de Middleware",
      registrationIntro:
        "Definido en MiddlewarePipeline.cs: ApiKeyUsageMiddleware y Rate Limiting dependen de UseAuthentication(), mientras que TrustedCidrEnforcementMiddleware, MustChangePasswordMiddleware y RequireMfaEnrollmentMiddleware se ejecutan tras UseAuthorization().",
      summaryTitle: "Resumen del Middleware",
      orderWarning:
        "Mueve el registro bajo tu propio riesgo: esto causará fallas en cascada y comportamientos impredecibles.",
    },
    auditCompliance: {
      title: "Auditoría y Cumplimiento",
      description:
        "Pipeline de auditoría completo, seguimiento de entidades, transmisión SignalR, exportación CSV/Excel/PDF y características de cumplimiento.",
      intro: "Un registro completo de cada modificación de datos y cada solicitud de API.",
      architectureTitle: "Arquitectura de Auditoría",
      architectureIntro:
        "El sistema de auditoría consta del registro de solicitudes HTTP y la interceptación de mutaciones de entidades a nivel de base de datos. Los metadatos de la solicitud se registran de forma asíncrona en el nivel del host a través de RequestLoggingMiddleware, mientras que los cambios en la base de datos son capturados por AuditableEntityInterceptor antes de SaveChanges.",
      interceptorTitle: "Interceptor de Cambios de Entidad",
      interceptorIntro:
        "El AuditableEntityInterceptor se conecta al pipeline SaveChangesAsync de EF Core. Para cada entidad agregada, modificada o eliminada (incluidas las eliminaciones lógicas), captura los valores antiguos y nuevos como JSON, el usuario que realiza el cambio y la marca de tiempo. Omite las entidades AuditLog para evitar recursividad infinita.",
      auditLogEntityTitle: "Estructura de la Entidad AuditLog",
      signalrTitle: "Transmisión (Streaming) en Tiempo Real",
      signalrIntro:
        "Los registros de auditoría se transmiten en tiempo real a través del hub SignalR AuditHub. Los clientes administradores conectados reciben notificaciones instantáneas de cualquier cambio en los datos, lo que permite dashboards de monitoreo en vivo.",
      exportTitle: "Capacidades de Exportación",
      exportIntro:
        "Saca los datos fuera del sistema mediante formatos corporativos CSV y Excel, listos para la autoridad correspondiente.",
      exportDetail:
        "El AuditExportService proporciona exportaciones multiformato. La exportación CSV utiliza CsvHelper con comillas forzadas alrededor de todos los campos para evitar la inyección de CSV (RFC 4180) y un prefijo UTF-8 BOM para Excel. La exportación a Excel genera un libro de ClosedXML con tres hojas detalladas: Executive Summary (KPI y estadísticas), Audit Data (con filtros automáticos, cabeceras congeladas y formato condicional verde/rojo) y Security Analysis. La exportación PDF utiliza el motor de QuestPDF, el cual está marcado como Obsoleto para grandes conjuntos de datos debido al consumo de memoria. Para proteger los recursos, todas las exportaciones están limitadas a un máximo de 10,000 filas y se cargan en memoria antes de la transmisión.",
      queryApiTitle: "API de Consultas y Exportaciones",
      queryApiIntro:
        "La API de auditoría ofrece funciones de búsqueda, filtrado y exportación para registros de auditoría. Todos los endpoints requieren autenticación de administrador y el permiso audit.view o audit.export.",
      querySearchDesc: "Busca con indexación profunda y paginación rápida.",
      queryExportCsvDesc: "Generación asincrónica en formato CSV.",
      queryExportExcelDesc: "Exportación empaquetada XLSX.",
      queryExportPdfDesc: "Exportación legal sellada en PDF.",
      scopingTitle: "Delimitación jerárquica de inquilinos e aislamiento de seguridad",
      scopingDetail:
        "El aislamiento de datos se aplica dinámicamente durante la ejecución de consultas. El DataScopeService determina el alcance efectivo del administrador basándose en una cadena de prioridad estricta: ContextTenant (impersonación a través de encabezados cifrados con AES), anulaciones de permisos, SystemProtectedAdmin, Hierarchy (incluyendo inquilinos secundarios) o OwnTenant. Los descendientes se recorren en tiempo constante a través de rutas materializadas, que se traducen en consultas SQL LIKE indexadas. El repositorio aplica AuditByTenantScopeSpec para asegurar el filtro 'WHERE TenantId IN (...)', mientras que las consultas directas por ID de registro son validadas por GetAuditLogDetailQueryHandler para evitar la escalación de privilegios horizontal.",
      complianceTitle: "Características de Cumplimiento",
      immutableTitle: "Registros Inmutables",
      immutableDesc:
        "Los registros están bloqueados y se almacenan en modo de solo lectura, lo que evita eliminaciones o modificaciones después de guardarlos.",
      fullTraceTitle: "Trazabilidad Completa",
      fullTraceDesc:
        "Captura los encabezados HTTP, el contexto de la solicitud y las mutaciones de entidades para garantizar una trazabilidad completa.",
      searchableTitle: "Altamente Consultable",
      searchableDesc:
        "Los índices optimizados en Timestamp, UserId, EventType y CorrelationId permiten búsquedas instantáneas.",
      tenantScopedTitle: "Alcance Separado por Inquilino",
      tenantScopedDesc:
        "Los registros se aíslan automáticamente mediante TenantId y límites jerárquicos de inquilinos para evitar fugas de datos.",
      realtimeTitle: "Vigilancia en Tiempo Real",
      realtimeDesc:
        "Transmita eventos de seguridad y mutaciones directamente a dashboards de SignalR aislados por inquilino.",
      retentionTitle: "Políticas Configurables de Retención",
      retentionDesc:
        "Los períodos de retención configurados eliminan automáticamente los registros de auditoría caducados a través de servicios en segundo plano.",
    },
    login_failed: "Intento fallido de inicio de sesión",
    account_locked: "Bloqueo de seguridad de cuenta",
    view: "Vista de seguridad",
  },
};
