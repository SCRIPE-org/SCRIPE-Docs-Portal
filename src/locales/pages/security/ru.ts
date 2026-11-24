// FILE-EXCEPTION: file length
/**
 * Docs page locale — RU
 * Auto-generated from monolithic doc locale. Do not edit the generation source.
 */
export const ru = {
  security: {
    overview: {
      title: "Обзор безопасности",
      description:
        "5-уровневая стратегия защиты, настройки CORS, ограничение скорости (rate limiting) и политики паролей.",
      intro:
        "SCRIPE реализует стратегию глубокой защиты (defense-in-depth) на пяти уровнях: сеть, аутентификация, авторизация, изоляция данных и аудит.",
      layersTitle: "Слои безопасности (Defense Layers)",
      featuresTitle: "Функции безопасности",
      featureJwt: "Аутентификация JWT",
      featureJwtDesc:
        "Короткоживущие access-токены с автоматическим обновлением и подписью HMAC-SHA256.",
      feature2fa: "Двухфакторная аутентификация (2FA)",
      feature2faDesc: "TOTP-аутентификатор (Google Authenticator) и резервные коды.",
      featureRbac: "Права доступа (RBAC)",
      featureRbacDesc: "Полный движок PBAC/ABAC/RBAC, кэшируемый на стороне сервера.",
      featureRateLimit: "Rate Limiting",
      featureRateLimitDesc:
        "4 уровня: глобальная DDoS-защита, по IP, по эндпоинтам и лимиты авторизации.",
      featureAudit: "Журналирование (Аудит)",
      featureAuditDesc: "Broadcasting всех изменений в реальном времени.",
      featureCors: "Настройка CORS",
      featureCorsDesc:
        "Строгие политики происхождения для production, открытый CORS для localhost.",
      corsTitle: "Конфигурация CORS",
      corsIntro: "Политики различаются в зависимости от среды.",
      rateLimitTitle: "Политики Rate Limiting",
      passwordTitle: "Политики паролей",
      securityWarning: "Всегда проверяйте настройки безопасности перед развертыванием в продакшен.",
    },
    authDeep: {
      title: "Углубленная аутентификация",
      description:
        "Жизненный цикл JWT, хэширование BCrypt, блокировка (Lockout), 2FA, OAuth, OTP и управление сессиями.",
      intro: "Подробный обзор всех механизмов аутентификации SCRIPE.",
      jwtLifecycleTitle: "Жизненный цикл токенов JWT",
      jwtLifecycleIntro:
        "Refresh-токены одноразовые и ротируются (обновляются) при каждом использовании для предотвращения кражи.",
      tokenStructureTitle: "Структура токена JWT",
      bcryptTitle: "Хэширование паролей ($s2$ SHA-256 + BCrypt)",
      bcryptIntro:
        "Предварительное хэширование SHA-256 Base64 + BCrypt (work factor = 12, префикс $s2$) с проверкой по базе из 8 616 скомпрометированных паролей и историей из 5 паролей (PasswordHistory).",
      lockoutTitle: "Блокировка аккаунта (Account Lockout)",
      lockoutIntro: "5 последовательных неудачных попыток входа блокируют аккаунт на 15 минут.",
      tfaTitle: "Гибридная MFA (TOTP / Passkeys / Email / SMS)",
      tfaIntro:
        "При включённой MFA вход возвращает временный twoFactorPendingToken; при mfa_enroll=true доступ к API блокируется RequireMfaEnrollmentMiddleware до завершения настройки.",
      externalAuthTitle: "Внешняя аутентификация (OAuth)",
      externalAuthIntro:
        "Интеграция с Google, Facebook, Apple и Microsoft с серверной валидацией токенов.",
      otpTitle: "Система OTP и сброса пароля (HMAC-SHA256)",
      otpIntro:
        "6-значные коды хранятся как HMAC-SHA256 верификаторы (Verification:VerifierKey), ограничены 5 попытками и действуют 10 мин (30 мин в Prod); для сброса также используются PasswordResetToken и лимит password-reset (5 запр./15 мин).",
      impersonationTitle: "Имперсонация (Impersonation)",
      impersonationIntro:
        "SuperAdmin может временно переключиться в профиль другого администратора для техподдержки.",
      impersonationWarning:
        "Все действия при имперсонации логируются с двойной идентичностью (Оригинал + Имитатор). Нельзя имитировать аккаунты с равными или высшими правами.",
      sessionTitle: "Управление сессиями",
      sessionIntro:
        "Stateless-архитектура JWT в сочетании с одноразовой ротацией Refresh-токенов в БД. Токены доступа хранятся только в памяти клиента, Refresh-токены передаются в cookies HttpOnly Secure SameSite=Lax ({CookiePrefix}_refresh_token или __Host-scripe_refresh_token через micro-relay кастомного домена), а RevokeAllSessions отзывает JTI соседних сессий, сохраняя текущую активную сессию.",
      cookieAuthTip:
        "Рабочие и кастомные домены используют cookies HttpOnly Secure SameSite=Lax (__Host-scripe_refresh_token через HMAC micro-relay), обеспечивая SSO-редиректы верхнего уровня и блокируя межсайтовые подзапросы.",
      federationControlsTitle: "Управление Dual-RP WebAuthn и Sudo Step-Up",
      federationControlsContent:
        "В режиме Central Federation нативный вход администраторов и passkeys WebAuthn закреплены на admin.scripe.org и *.admin.scripe.org (EnableCentralNativeAndPasskeyMigration = false) с WebAuthn:UserVerification = 'required', PasskeyAuthLimit = 12 (15 мин) и паритетом --idempotent миграций без ошибок на PostgreSQL 18, SQL Server 2025 и live Oracle 21c XE (схема IDENTITY). AdminPasskey.RpId (varchar(253)) и AllowedRpIds проверяются в Fido2PasskeyService, а команды ISovereignSudoProtectedCommand требуют 15-минутный HMAC X-Sudo-Token с автоповтором через <SudoVerificationModal />.",
      workspaceRoutingTitle: "Маршрутизация Входа в Несколько Рабочих Пространств",
      workspaceRoutingIntro:
        "При авторизации на платформенном домене без предзаданного тенанта алгоритм проверяет 3 сценария: вход по ID тенанта, прямой вход платформенного администратора (флаг isPlatformAdmin) и поиск организаций по почте с отображением селектора.",
      workspaceRoutingTip:
        "Флаг isPlatformAdmin указывает бэкенду искать запись администратора уровня платформы (TenantId = null), предотвращая повторный поиск воркспейсов.",
      passwordExpiryTitle: "Контроль Сроков Жизни Паролей",
      passwordExpiryIntro:
        "Обработчик проверяет параметр PasswordExpiryDays организации. Если срок истек, токен содержит MustChangePassword = true, что принудительно направляет пользователя на смену пароля.",
      passwordExpiryNote:
        "Значение 0 отключает проверку. При активном правиле сервис вычисляет (PasswordLastChanged + ExpiryDays) и сопоставляет его с текущим временем UTC.",
      ssoSuspensionTitle: "Блокировка Входа по SSO для Приостановленных Организаций",
      ssoSuspensionIntro:
        "ExternalLoginCommandHandler проверяет статус организации до выдачи JWT-токена. Если организация заблокирована или аннулирована, вход блокируется.",
      ssoSuspensionWarning:
        "Без этого фильтра пользователи деактивированных организаций могли бы получать валидные JWT-токены через Google или Azure AD.",
    },
    sso: {
      samlTitle: "Интеграция SAML 2.0 и криптографическая валидация",
      samlContent:
        "Платформа поддерживает SAML 2.0 Single Sign-On с использованием библиотеки ITfoxtec.Identity.Saml2. В режиме сервис-провайдера (SP) запросы AuthnRequest генерируются и отправляются через редирект. Для ACS-колбеков XML-подписи проверяются с помощью публичных сертификатов X.509, сохраненных в формате base64 (через X509CertificateLoader). Проверка цепочки сертификатов и отзывов пропускается (None/NoCheck) для поддержки самоподписанных корпоративных сертификатов. В режиме провайдера удостоверений (IdP) третьим приложениям выдаются подписанные XML-утверждения SAML.",
      oidcCallbackTitle: "Центральный Callback OIDC/SAML и одноразовый тикет Handoff",
      oidcCallbackContent:
        "Центральные колбеки на https://api.scripe.org (GET /api/v1/auth/oidc/callback и POST /api/v1/auth/saml/acs/{providerId}) проверяют серверный ExternalAuthStateTicket (включая code_verifier, nonce и returnOrigin), статус тенанта и HybridMfaPolicy, создают 120s SHA-256 ExternalAuthHandoffTicket (auth:ext-handoff:{sha256}, атомарная защита от повтора auth:ext-handoff-used:{sha256}) и выполняют 302-редирект на https://auth.scripe.org/sso/continue или {ReturnOrigin}/sso/callback для однократного погашения через POST /api/v1/auth/sso/handoff.",
      oauthMirroringTitle: "Зеркалирование клиентов OAuth и проверка квот",
      oauthMirroringContent:
        "Регистрация исходящих приложений OAuth проверяет квоты подписки клиента через QuotaService. Идентификаторы клиентов начинаются с префикса настроек брендинга клиента, а секреты конфиденциальных приложений генерируются безопасным образом (256-битные случайные числа) и показываются только один раз. Регистрации приложений синхронизируются с хранилищем OpenIddict и зеркалируются в локальной таблице базы данных OAuthApplication с маскированием секретов для производительности.",
      title: "Единый вход (SSO)",
      description: "Аутентификация OIDC, привязка внешней идентичности и приложения OAuth.",
      intro:
        "Система SCRIPE поддерживает аутентификацию через внешних провайдеров на базе протокола OIDC и предоставление учетных данных через приложения OAuth. Система учитывает разделение тенантов со строгой защитой PKCE.",
      architectureTitle: "Архитектура аутентификации OIDC / OAuth",
      endpointsTitle: "Эндпоинты и потоки (Flows)",
      flowIntro:
        "Процесс входа SSO включает многоступенчатый поток для обеспечения максимальной безопасности:",
      authEndpointTitle: "1. Эндпоинт авторизации (Authorize)",
      authEndpointDesc:
        "Перенаправляет пользователя на страницу входа внешнего IdP. Включает верификацию PKCE и передачу токена состояния (state).",
      callbackEndpointTitle: "2. Эндпоинт обратного вызова (Callback)",
      callbackEndpointDesc:
        "Принимает пользователя после успешной аутентификации и обменивает код авторизации на токены на стороне сервера — без участия браузера.",
      linkingTitle: "Привязка и обработка идентичности",
      linkingIntro:
        "После успешного входа email проверяется по базе данных. Если это первый вход пользователя, запись OIDC привязывается к внутреннему аккаунту SCRIPE для предотвращения дублирования данных.",
      pkceWarning:
        "Поддержка устаревших потоков Implicit OAuth удалена. Протокол PKCE обязателен для всех вариантов авторизации.",
      howItWorksTitle: "How SSO Works",
      howItWorksContent:
        "SCRIPE uses the Authorization Code Flow with PKCE (Proof Key for Code Exchange) for SSO. This is the most secure OAuth2 flow, recommended by the OAuth 2.1 specification for all client types.",
      step1Title: "1. Обнаружение провайдеров",
      step1Content:
        "Страница входа на https://auth.scripe.org загружает активных провайдеров через GET /api/v1/auth/oidc/providers/admin согласно Tenancy:AuthBaseUrl и OriginRouting.",
      step2Title: "2. Серверный PKCE и State Ticket",
      step2Content:
        "При выборе SSO-провайдера фронтенд вызывает POST /api/v1/auth/oidc/challenge. Бэкенд сохраняет code_verifier, nonce, state и проверенный returnOrigin в серверном ExternalAuthStateTicket (без browser sessionStorage).",
      step3Title: "3. Редирект на IdP с центральным Callback",
      step3Content:
        "Браузер перенаправляется на внешний IdP с redirect_uri, зафиксированным на https://api.scripe.org/api/v1/auth/oidc/callback (или /api/v1/auth/saml/acs/{providerId}).",
      step4Title: "4. Центральный Callback и Handoff-тикет",
      step4Content:
        "После входа во внешнем IdP запрос возвращается на api.scripe.org; сервер погашает ExternalAuthStateTicket, проверяет политику MFA, выпускает 120s SHA-256 ExternalAuthHandoffTicket и перенаправляет на auth.scripe.org/sso/continue или {ReturnOrigin}/sso/callback.",
      step5Title: "5. Однократный Handoff и инициализация сессии",
      step5Content:
        "Целевая страница однократно гасит тикет через POST /api/v1/auth/sso/handoff (на кастомных доменах — через HMAC micro-relay /api/auth/session/establish) и сохраняет JWT в памяти + cookie HttpOnly Lax.",
      pkceTitle: "Модель безопасности PKCE и Central Handoff",
      pkceContent:
        "Хранение ExternalAuthStateTicket на сервере исключает утечку PKCE через sessionStorage. Одноразовые 120s SHA-256 тикеты ExternalAuthHandoffTicket проверяют returnOrigin через IVerifiedOriginEvaluator против открытых редиректов.",
      entityModelTitle: "Identity Provider Entity",
      entityModelContent:
        "The IdentityProvider entity stores all OIDC configuration for an external IdP. Each provider is optionally scoped to a tenant (TenantId = null means system-wide).",
      linkingContent:
        "Привязка внешней учетной записи требует Sudo-подтверждения (X-Sudo-Token) через POST /api/v1/auth/admin/external-logins/initiate-link (прямой /external-logins/link возвращает 410 Gone) и завершается через центральный callback и handoff.",
      centralRelayTitle: "First-Party HMAC Session Micro-Relay и динамический CORS",
      centralRelayContent:
        "Проверенные кастомные домены не разделяют cookies с api.scripe.org, поэтому Next.js BFF предоставляет маршруты /api/auth/session/establish, /refresh и /logout с проверкой Sec-Fetch-Site/Origin и HMAC-SHA256 (X-Scripe-Session-Relay-*, окно 30с, nonce 60с, разделение rate-limit по X-Scripe-Session-Relay-Client-Ip и X-Scripe-Relay-Refresh-MaxAge: 0 для staySignedIn=false), выдавая локальный __Host-scripe_refresh_token. При Hybrid-2FA на auth.scripe.org/sso/continue PostMfaHandoffHelper, TenantOriginOwnershipValidator и ssoTwoFactorBridge.ts выпускают post-MFA тикет обратно на {ReturnOrigin}/sso/callback, а продакшен использует Cloudflare X-Scripe-Origin-Verify, ForwardedHeaders ForwardLimit=2, клеймы Entra email+xms_edov, скоупы GitHub user:email read:user и 2-шаговую настройку SAML ACS.",
      splitLogoutTitle: "Раздельный выход App vs. Central SSO (scr.oidc.session)",
      splitLogoutContent:
        "Выход принимает logoutScope ('app' по умолчанию или 'central'). AuthLogoutScopeHelper и CookieAuthMiddleware сохраняют scr.oidc.session при /refresh, /sso/handoff, /complete-workspace-selection и выходе 'app'; параметр 'central' очищает её полностью.",
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
      title: "Защита данных",
      description:
        "Изоляция тенантов, шифрование в покое и при передаче, скрытие полей и соблюдение GDPR.",
      intro:
        "SCRIPE защищает данные на всех уровнях: от сети (TLS) до конкретных строк и ячеек базы данных.",
      tenantIsolationTitle: "Изоляция данных тенантов",
      tenantIsolationIntro:
        "Глобальные фильтры запросов EF Core обеспечивают изоляцию на самом низком уровне ORM.",
      tenantScopingTitle: "Скоупинг фильтров запросов",
      tenantServicesTitle: "Сервисы с учетом тенантов (Tenant-Aware Services)",
      tenantServicesIntro:
        "Службы, которым нужен доступ к данным тенанта, внедряют IDataScopeService.",
      dataAtRestTitle: "Шифрование данных в покое",
      dataAtRestIntro:
        "Используется TDE (Transparent Data Encryption) на уровне БД и Data Protection API ASP.NET Core для чувствительных ключей.",
      dataInTransitTitle: "Шифрование данных при передаче",
      dataInTransitIntro: "Все коммуникации используют TLS 1.2+; HSTS включен для production.",
      restrictedFieldsTitle: "Скрытые поля (Field-Level Security)",
      restrictedFieldsIntro:
        "FieldProjectionMiddleware автоматически удаляет (зануляет) свойства в ответах API, если роль не имеет прав на их просмотр.",
      idEncryptionTitle: "Шифрование ID",
      idEncryptionIntro:
        "Скрывает внутренние Guid-идентификаторы от внешних клиентов с помощью алгоритма AES-256.",
      gdprTitle: "Соблюдение GDPR (Защита персональных данных)",
      gdprIntro:
        "Механизмы для портативности данных, управления согласием и права быть забытым (удаление данных).",
      rightToDeleteTitle: "Право на удаление",
      dataPortabilityTitle: "Переносимость данных",
      consentTitle: "Управление согласием",
      retentionTitle: "Политики хранения данных",
      auditTrailTitle: "Журналы аудита для комплаенса",
      bypassWarning:
        "Использование IgnoreQueryFilters() снимает ВСЕ барьеры изоляции ORM. Будьте крайне осторожны.",
      rightToDeleteDesc:
        "Гарантированное безвозвратное удаление персональных записей во всех базах данных тенантов по запросу.",
      dataPortabilityDesc:
        "Полный машиночитаемый экспорт всех данных пользователя в стандартизированном формате JSON.",
      consentDesc:
        "Неизменяемая хроника согласий с фиксацией меток времени, версий политик и User-Agent клиентов.",
      auditTrailDesc:
        "Защищенный от модификаций аудит любых операций чтения, изменения, выгрузки и удаления персональных сведений.",
      tenantScopingDesc:
        "Строгая межклиентская изоляция, исключающая утечку персональных данных за пределы контура организации.",
      retentionDesc:
        "Автоматизированная фоновая очистка и деперсонализация данных в соответствии с регламентами хранения.",
    },
    apiSecurity: {
      title: "Безопасность API",
      description:
        "Rate Limiting, CORS, валидация входных данных, защита от CSRF и атак повторного воспроизведения (Replay Attacks).",
      intro: "Многоуровневая защита API SCRIPE от распространенных веб-уязвимостей.",
      rateLimitTitle: "Ограничение скорости (Rate Limiting)",
      rateLimitIntro: "4 уровня защиты от DDoS и брутфорса, встроенные в ASP.NET Core.",
      corsTitle: "Настройка CORS",
      corsIntro: "Ограничивает возможность выполнения кросс-доменных запросов в браузере.",
      inputValidationTitle: "Валидация входных данных",
      inputValidationIntro:
        "FluentValidation в пайплайне SCRIPE mediator отклоняет вредоносные или некорректные payload-ы до выполнения логики.",
      csrfTitle: "Защита от CSRF",
      csrfIntro:
        "Bear-токены в сочетании с директивой SameSite делают API невосприимчивым к подделке межсайтовых запросов (CSRF).",
      headersTitle: "Заголовки безопасности (Security Headers)",
      headersIntro:
        "Платформа выдает заголовки, предотвращающие XSS, MIME-sniffing и Clickjacking.",
      headersTip: "Оценка конфигурации по умолчанию на securityheaders.com — A+.",
      replayTitle: "Предотвращение атак повторного воспроизведения",
      replayIntro:
        "Одноразовые токены обновления, короткоживущие токены доступа и временные окна TOTP сводят на нет replay-атаки.",
    },
    middlewarePipeline: {
      title: "Конвейер промежуточного ПО (Middleware Pipeline)",
      description:
        "33 этапа в строгом порядке в MiddlewarePipeline.cs — от JWT/API-Key аутентификации и пост-авторизационного rate limiting до проверок Trusted CIDR, mcp=true и mfa_enroll=true.",
      intro:
        "HTTP-конвейер SCRIPE выполняет 33 строго упорядоченных этапа в MiddlewarePipeline.cs и немедленно прерывает запрос при нарушении политики.",
      overviewTitle: "Обзор пайплайна",
      overviewIntro:
        "Каждый компонент выполняет единственную ответственность и может «замкнуть» (Short-circuit) запрос.",
      globalExceptionTitle: "1. Глобальный обработчик исключений",
      globalExceptionIntro:
        "Перехватывает ошибки 500 и возвращает чистый JSON без деталей стека вызовов (stack trace) в production.",
      correlationIdTitle: "2. Идентификатор корреляции (Correlation ID)",
      correlationIdIntro:
        "Генерирует X-Correlation-ID для распределенной трассировки и логирования.",
      requestLoggingTitle: "3. Логирование запросов",
      requestLoggingIntro: "Скрывает пароли из лог-файлов Serilog для чувствительных маршрутов.",
      cookieAuthTitle: "4. Конвертация Cookie-to-Bearer",
      cookieAuthIntro:
        "Позволяет фронтенду использовать HttpOnly cookies, прозрачно преобразуя их в Bearer-токен для авторизации API.",
      tenantContextTitle: "5. Контекст тенанта (Tenant Context)",
      tenantContextIntro:
        "Извлекает ID тенанта из JWT-токена и инициализирует глобальные фильтры ORM.",
      tenantContextNote:
        "Middleware контекста тенанта ДОЛЖЕН запускаться ПОСЛЕ аутентификации, но ДО любых операций с БД.",
      cacheHeadersTitle: "6. Заголовки кэширования",
      cacheHeadersIntro: "Расставляет no-cache для API и max-age для статических файлов.",
      fieldProjectionTitle: "7. Проекция полей (Field Projection)",
      fieldProjectionIntro:
        "Очищает (nullifies) запрещенные поля JSON-ответа на основе роли пользователя.",
      observabilityTitle: "Middleware наблюдаемости (Observability)",
      observabilityIntro: "Сбор метрик OpenTelemetry и экспорт в Prometheus (/metrics).",
      registrationTitle: "Порядок регистрации",
      registrationIntro:
        "Порядок задаётся в MiddlewarePipeline.cs: ApiKeyUsageMiddleware и Rate Limiting зависят от UseAuthentication(), а TrustedCidrEnforcementMiddleware, MustChangePasswordMiddleware и RequireMfaEnrollmentMiddleware выполняются после UseAuthorization().",
      summaryTitle: "Резюме Middleware",
      orderWarning: "Не меняйте порядок Middleware, это приведет к каскадным сбоям и уязвимостям.",
    },
    auditCompliance: {
      title: "Аудит и комплаенс (Compliance)",
      description:
        "Полный конвейер аудита, отслеживание сущностей, вещание SignalR, экспорт CSV/Excel/PDF и функции соответствия требованиям.",
      intro: "Полный журнал каждого изменения данных и каждого запроса API.",
      architectureTitle: "Архитектура аудита",
      architectureIntro:
        "Система аудита состоит из логирования HTTP-запросов и перехвата изменений сущностей на уровне базы данных. Метаданные запроса записываются асинхронно на уровне хоста через RequestLoggingMiddleware, а изменения базы данных фиксируются AuditableEntityInterceptor перед SaveChanges.",
      interceptorTitle: "Перехватчик изменений сущностей",
      interceptorIntro:
        "AuditableEntityInterceptor подключается к конвейеру SaveChangesAsync в EF Core. Для каждой добавленной, измененной или удаленной сущности (включая логическое удаление) он фиксирует старые и новые значения в формате JSON, пользователя и метку времени. Сущности AuditLog игнорируются для предотвращения бесконечной рекурсии.",
      auditLogEntityTitle: "Структура сущности AuditLog",
      signalrTitle: "Вещание через SignalR в реальном времени",
      signalrIntro:
        "Журналы аудита транслируются в реальном времени через SignalR-хаб AuditHub. Подключенные администраторы мгновенно получают уведомления об изменениях данных для интерактивных дашбордов.",
      exportTitle: "Возможности экспорта",
      exportIntro: "Экспорт записей аудита в форматы CSV, Excel, PDF.",
      exportDetail:
        "AuditExportService обеспечивает экспорт логов в различных форматах. Экспорт CSV использует библиотеку CsvHelper с принудительным квотированием полей для предотвращения CSV-инъекций (RFC 4180) и префиксом UTF-8 BOM для корректного открытия в Excel. Экспорт Excel создает рабочую книгу ClosedXML с тремя вкладками: Executive Summary (сводка/KPI), Audit Data (с автофильтрами, закрепленной шапкой и условным форматированием зеленый/красный) и Security Analysis. Экспорт PDF основан на движке QuestPDF и помечен как устаревший (Obsolete) для больших объемов данных из-за высокого потребления памяти. Для защиты ресурсов все виды экспорта ограничены лимитом в 10 000 строк и буферизуются полностью в памяти перед отправкой.",
      queryApiTitle: "API запросов и экспорта",
      queryApiIntro: "Мощная система поиска и фильтрации журналов аудита, ограниченная тенантом.",
      scopingTitle: "Иерархическое разграничение тенантов и изоляция безопасности",
      scopingDetail:
        "Изоляция данных принудительно применяется динамически при выполнении запросов. DataScopeService разрешает эффективную область видимости администратора на основе строгой цепочки приоритетов: ContextTenant (детализация с шифрованием заголовков по AES), переопределения прав доступа, SystemProtectedAdmin, Hierarchy (включая дочерние тенанты) или OwnTenant. Обход дочерних элементов выполняется за константное время с помощью материализованных путей, транслируемых в индексированные SQL-запросы LIKE. Репозиторий применяет спецификацию AuditByTenantScopeSpec для обеспечения фильтра 'WHERE TenantId IN (...)', а прямые запросы по GUID записи проверяются с помощью GetAuditLogDetailQueryHandler для предотвращения горизонтального повышения привилегий.",
      querySearchDesc: "Поиск с пагинацией.",
      queryExportCsvDesc: "Экспорт в файл CSV.",
      queryExportExcelDesc: "Экспорт в Excel-таблицу.",
      queryExportPdfDesc: "Экспорт в PDF-документ.",
      complianceTitle: "Возможности для комплаенса",
      immutableTitle: "Неизменяемые логи",
      immutableDesc:
        "Журналы заблокированы и хранятся в режиме только для чтения, что исключает удаление или изменение после фиксации.",
      fullTraceTitle: "Полная трассировка",
      fullTraceDesc:
        "Сбор HTTP-заголовков, контекста запросов и изменений сущностей для обеспечения сквозной трассируемости.",
      searchableTitle: "Удобный поиск",
      searchableDesc:
        "Оптимизированные индексы по меткам времени, пользователям, типам событий и Correlation ID для мгновенного поиска.",
      tenantScopedTitle: "Изоляция по тенантам",
      tenantScopedDesc:
        "Автоматическое разграничение доступа по границам TenantId и иерархии дочерних организаций для предотвращения утечек данных.",
      realtimeTitle: "Реальное время",
      realtimeDesc:
        "Прямая трансляция событий безопасности и мутаций данных в изолированные SignalR-панели тенантов.",
      retentionTitle: "Политика хранения (Retention Policy)",
      retentionDesc:
        "Настроенные сроки хранения автоматически очищают устаревшие логи с помощью фоновых служб.",
    },
    login_failed: "Неудачная попытка входа",
    account_locked: "Блокировка безопасности учетной записи",
    view: "Просмотр настроек безопасности",
  },
};
