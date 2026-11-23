// FILE-EXCEPTION: file length
/**
 * Docs page locale — AR
 * Auto-generated from monolithic doc locale. Do not edit the generation source.
 */
export const ar = {
  security: {
    overview: {
      title: "نظرة عامة على الأمان",
      description: "استراتيجية دفاعية من 5 طبقات، ميزات الأمان، إعدادات CORS، وتقييد معدل الطلبات.",
      intro:
        "تنفذ SCRIPE استراتيجية دفاعية عميقة بخمس طبقات: حماية الشبكة، المصادقة، التفويض، عزل البيانات، وسجلات التدقيق.",
      layersTitle: "طبقات الدفاع الأمني",
      featuresTitle: "ميزات الأمان",
      featureJwt: "مصادقة JWT",
      featureJwtDesc: "رموز وصول قصيرة العمر مع تحديث تلقائي وتوقيع HMAC-SHA256.",
      feature2fa: "المصادقة الثنائية (2FA)",
      feature2faDesc: "مصادقة باستخدام تطبيق مصادق TOTP. اختيارية للمستخدم أو إلزامية.",
      featureRbac: "صلاحيات RBAC",
      featureRbacDesc: "محرك لتنفيذ قواعد الوصول يعتمد على الأدوار والمجموعات والخصائص.",
      featureRateLimit: "تقييد معدل الطلبات",
      featureRateLimitDesc:
        "4 مستويات: حماية DDoS العالمية، لكل IP، لكل نقطة نهاية، والمصادقة المحددة.",
      featureAudit: "سجلات التدقيق",
      featureAuditDesc: "يسجل كل إجراء (من، ماذا، متى، أين) مع البث اللحظي عبر SignalR.",
      featureCors: "تكوين CORS",
      featureCorsDesc: "سياسة CORS صارمة ومقيدة للإنتاج ومفتوحة للتطوير المحلي.",
      corsTitle: "تكوين CORS",
      corsIntro: "تختلف السياسات بناءً على البيئة.",
      rateLimitTitle: "سياسات تقييد معدل الطلبات",
      passwordTitle: "سياسات كلمات المرور",
      securityWarning: "راجع دائماً الإعدادات الأمنية قبل النشر للإنتاج.",
    },
    authDeep: {
      title: "التعمق في المصادقة",
      description:
        "توجيه تسجيل الدخول متعدد مساحات العمل، دورة حياة JWT، تشفير BCrypt، فرض انتهاء كلمة المرور، أقفال الحسابات، 2FA، تعليق SSO، وجلسات المستخدمين.",
      intro:
        "تستكشف هذه الصفحة آليات المصادقة في SCRIPE بعمق — من توجيه تسجيل الدخول متعدد مساحات العمل وإصدار رموز JWT، مروراً بتشفير BCrypt وفرض انتهاء كلمة المرور وأقفال الحسابات، إلى المصادقة الثنائية TOTP والمصادقة الخارجية وبوابة تعليق SSO وإدارة الجلسات.",
      workspaceRoutingTitle: "توجيه تسجيل الدخول متعدد مساحات العمل",
      workspaceRoutingIntro:
        "عند تسجيل الدخول من نطاق المنصة بدون وحدة محدد مسبقاً، ينفذ معالج تسجيل الدخول خوارزمية توجيه من 3 حالات: الحالة A (تسجيل دخول مُقيَّد بمعرّف الوحدة)، الحالة A' (اختيار صريح لإدارة المنصة عبر علامة isPlatformAdmin — يتجاوز اكتشاف مساحات العمل تماماً)، والحالة B (اكتشاف مساحات العمل — البحث في جميع الوحدات بالبريد الإلكتروني وعرض مُنتقي مساحات العمل عند تعدد النتائج). تم إدخال علامة isPlatformAdmin لمنع حلقة لا نهائية عند اختيار 'إدارة المنصة' من المُنتقي.",
      workspaceRoutingTip:
        "يتم تعيين علامة isPlatformAdmin من الواجهة الأمامية عندما يختار المستخدم 'إدارة المنصة' صراحةً. تُشير هذه العلامة للخادم للبحث عن المستخدم بمعرّف وحدة فارغ (TenantId = null) بدلاً من إعادة تشغيل الاكتشاف.",
      jwtLifecycleTitle: "دورة حياة رمز JWT",
      jwtLifecycleIntro: "رموز وصول قصيرة العمر مع رموز تحديث تُدار لمنع الهجمات.",
      tokenStructureTitle: "هيكل رمز JWT",
      bcryptTitle: "تشفير $s2$ SHA-256 + BCrypt لكلمة المرور",
      bcryptIntro:
        "تُجزَّأ كلمات المرور بتمريرها عبر SHA-256 Base64 ببادئة $s2$ ثم BCrypt بعامل 12 لمنع الاقتطاع عند 72 بايت مع التوافق العكسي، بالتوازي مع PasswordHistory (5 كلمات سابقة) وقائمة كلمات المرور المخترقة (8,616 مدخلاً).",
      lockoutTitle: "قفل الحساب",
      lockoutIntro:
        "بعد 5 محاولات دخول أو تحقق ثنائي فاشلة متتالية (TenantSettings.LoginLockoutThreshold)، يُقفَل الحساب لمدة 15 دقيقة (TenantSettings.LoginLockoutMinutes)، ويُعاد ضبط العداد عند النجاح.",
      tfaTitle: "المصادقة الثنائية (TOTP)",
      tfaIntro:
        "يدعم SCRIPE تطبيقات TOTP، ومع تفعيلها يُرجع تسجيل الدخول رمز twoFactorPendingToken أحادي الاستخدام، بينما تتلقى حسابات Require2FA غير المُسجّلة mfa_enroll=true.",
      passwordExpiryTitle: "فرض انتهاء صلاحية كلمة المرور",
      passwordExpiryIntro:
        "بعد التحقق من بيانات الاعتماد وفحص قفل الحساب، يستدعي معالج تسجيل الدخول ITenantPasswordValidator.IsPasswordExpiredAsync للتحقق مما إذا كانت كلمة مرور المستخدم قد تجاوزت أيام انتهاء الصلاحية المُعَدَّة للوحدة (PasswordExpiryDays). إذا انتهت الصلاحية، يتضمن الاستجابة MustChangePassword = true، مما يُجبر الواجهة الأمامية على إعادة التوجيه إلى صفحة تغيير كلمة المرور.",
      passwordExpiryNote:
        "انتهاء صلاحية كلمة المرور هو إعداد لكل وحدة عبر TenantSettings.PasswordExpiryDays. القيمة 0 تُعطّل الميزة. لا يتم قفل حساب المستخدم — يحصل على رمز JWT صالح لكن مع علامة MustChangePassword التي تفرضها الواجهة الأمامية كإعادة توجيه.",
      externalAuthTitle: "المصادقة الخارجية (OAuth)",
      externalAuthIntro: "تكامل مع Google, Facebook, Apple, Microsoft.",
      otpTitle: "نظام OTP وبيانات الاستعادة",
      otpIntro:
        "رموز OTP المكونة من 6 أرقام تُخزَّن كمُتحققات HMAC-SHA256 عبر Verification:VerifierKey (لا نص صريح أو BCrypt) بمدة 10 دقائق (30 دقيقة لاستعادة الإنتاج) و5 محاولات، مع منح PasswordResetToken أحادية الاستخدام.",
      impersonationTitle: "انتحال شخصية المستخدم",
      impersonationIntro:
        "المستخدم العام (SuperAdmin) يمكنه الانتحال للمساعدة الفنية مع ربط التدقيق الصارم.",
      impersonationWarning: "عملية خطيرة ومقيدة جداً.",
      sessionTitle: "إدارة الجلسة",
      sessionIntro:
        "تعتمد SCRIPE نموذج جلسة JWT عديم الحالة مقترناً برموز تحديث أحادية الاستخدام قابلة للتدوير في قاعدة البيانات. تُحفظ رموز الوصول في ذاكرة العميل فقط، بينما تنتقل رموز التحديث في ملفات تعريف ارتباط HttpOnly Secure SameSite=Lax ({CookiePrefix}_refresh_token أو __Host-scripe_refresh_token عبر مرحّل النطاق المخصص)، ويُبطل RevokeAllSessions معرفات JTI للجلسات الشقيقة مع الإبقاء على الجلسة الحالية للمتصل.",
      cookieAuthTip:
        "تستخدم جلسات مساحات العمل والنطاقات المخصصة ملفات تعريف ارتباط HttpOnly Secure SameSite=Lax (__Host-scripe_refresh_token عبر مرحّل HMAC) لدعم إعادة توجيه SSO الآمنة مع منع الطلبات الفرعية العابرة للمواقع.",
      federationControlsTitle: "حوكمة مفاتيح المرور ثنائية النطاق (Dual-RP) والتحقق التصعيدي Sudo",
      federationControlsContent:
        "تحت نظام الاتحاد المركزي، تبقى مصادقة المسؤولين الأصلية ومفاتيح المرور محصورة في admin.scripe.org و *.admin.scripe.org (EnableCentralNativeAndPasskeyMigration = false). يتحقق Fido2PasskeyService من AdminPasskey.RpId و AllowedRpIds، بينما تفرض الأوامر الحساسة ISovereignSudoProtectedCommand رمز X-Sudo-Token لـ 15 دقيقة مع نافذة <SudoVerificationModal /> التلقائية لأكواد السماح والتراجع.",
      ssoSuspensionTitle: "بوابة تعليق SSO للوحدة",
      ssoSuspensionIntro:
        "يتضمن معالج المصادقة الخارجية (ExternalLoginCommandHandler) الآن بوابة أمان لتعليق الوحدة. قبل إصدار رمز JWT بعد مصادقة SSO/OIDC، يتحقق المعالج من حالة وحدة المستخدم. إذا كان الوحدة مُعلَّقاً أو مُلغى، يُرفض تسجيل الدخول برسالة خطأ مُترجمة — مما يمنع المستخدمين المُعطَّلين من تجاوز فحوصات تسجيل الدخول القياسية عبر SSO.",
      ssoSuspensionWarning:
        "بدون هذه البوابة، كان بإمكان مستخدمي SSO المصادقة عبر موفر هوية خارجي والحصول على رمز JWT صالح من SCRIPE حتى لو كان وحدةهم مُعلَّقاً أو مُلغى. تم معالجة هذه الثغرة الأمنية الحرجة.",
    },
    dataProtection: {
      title: "حماية البيانات",
      description: "عزل الوحدات، التشفير، الحقول المقيدة، وامتثال GDPR.",
      intro: "SCRIPE تحمي البيانات في التخزين، النقل، ومن خلال عزل الوحدات وتقييد الحقول.",
      tenantIsolationTitle: "عزل بيانات الوحدة",
      tenantIsolationIntro: "يتم تحديد كل استعلام تلقائياً بناءً على فلاتر EF Core.",
      tenantScopingTitle: "نطاق فلتر الاستعلام",
      tenantServicesTitle: "الخدمات الواعية بالوحدة (Tenant-Aware Services)",
      tenantServicesIntro: "يتم حقن IDataScopeService للوصول إلى الوحدة في مسار الطلب.",
      dataAtRestTitle: "تشفير البيانات في التخزين",
      dataAtRestIntro: "تشفير عبر مستوى قواعد البيانات واستخدام Data Protection API.",
      dataInTransitTitle: "تشفير البيانات أثناء النقل",
      dataInTransitIntro: "كافة الاتصالات تستخدم TLS 1.2+ مع تفعيل HSTS.",
      restrictedFieldsTitle: "تقييد الحقول (Field-Level Security)",
      restrictedFieldsIntro: "إزالة الحقول الحساسة ديناميكيًا من ردود API بناءً على دور المستخدم.",
      idEncryptionTitle: "تشفير المُعرّفات (IDs)",
      idEncryptionIntro: "تشفير المعرفات لعدم تعريض الـ IDs الداخلية لهجمات التخمين.",
      gdprTitle: "التوافق مع GDPR",
      gdprIntro: "يتوافق النظام تماماً مع طلبات سحب وحذف البيانات.",
      rightToDeleteTitle: "الحق في الحذف",
      dataPortabilityTitle: "قابلية نقل البيانات",
      consentTitle: "إدارة الموافقة",
      retentionTitle: "سياسات الاحتفاظ بالبيانات",
      auditTrailTitle: "سجل التدقيق للامتثال",
      bypassWarning: "استخدام تجاوز الفلاتر خطير ويجب تضمينه بفلاتر الوحدة لمنع التسرب.",
      rightToDeleteDesc:
        "تنفيذ المحو الدائم لسجلات المستخدمين والبيانات الشخصية عبر كافة قواعد بيانات المستأجرين بناءً على الطلب.",
      dataPortabilityDesc:
        "تصدير أرشيفات شاملة قابلة للقراءة آليًا لكافة البيانات المرتبطة بالمستخدم بتنسيق JSON قياسي.",
      consentDesc:
        "تتبع غير قابل للتغيير لطوابع الموافقة الزمنية وإصدارات السياسات ووكلاء المستخدمين في سجلات إلحاقية فقط.",
      auditTrailDesc:
        "تسجيل تدقيق مضاد للتلاعب لكل عملية قراءة أو كتابة أو تصدير أو حذف للبيانات الشخصية الحساسة.",
      tenantScopingDesc:
        "عزل صارم متعدد المستأجرين يضمن عدم تسرب البيانات الشخصية مطلقًا خارج حدود مساحة العمل.",
      retentionDesc:
        "تنظيف وأرشفة تلقائية في الخلفية وفقًا للقواعد التنظيمية وسياسات الاحتفاظ المؤسسية.",
    },
    apiSecurity: {
      title: "أمان الـ API",
      description: "تقييد المعدل، التحقق من المدخلات، حماية CSRF، ورؤوس الأمان.",
      intro: "تطبيقات أمنية متعددة لضمان أمان الـ API.",
      rateLimitTitle: "تقييد المعدل (Rate Limiting)",
      rateLimitIntro: "4 مستويات متقدمة لتقييد المعدلات.",
      corsTitle: "تكوين CORS",
      corsIntro: "التكوين يختلف بناءً على البيئة لضمان التشغيل الآمن للواجهات.",
      inputValidationTitle: "التحقق من المدخلات",
      inputValidationIntro: "يُعالج من خلال FluentValidation المدمج في مسار SCRIPE mediator.",
      csrfTitle: "حماية CSRF",
      csrfIntro: "الـ API آمن بطبيعته بفضل الرموز (Bearer) وقواعد (SameSite).",
      headersTitle: "رؤوس الأمان (Security Headers)",
      headersIntro: "إعدادات صارمة للرؤوس لمنع XSS والـ Clickjacking.",
      headersTip: "تصل دائمًا لتقييم +A بفضل تكوينات SCRIPE.",
      replayTitle: "منع هجمات إعادة الإرسال (Replay Attacks)",
      replayIntro: "محمي بالرموز قصيرة الأمد وصلاحية الاستخدام الواحد.",
    },
    middlewarePipeline: {
      title: "مسار البرمجيات الوسيطة (Middleware)",
      description:
        "33 مرحلة مرتبة في MiddlewarePipeline.cs — بدءًا من الترويسات والمصادقة وتقييد المعدل بعد التحقق وصولاً إلى قيود CIDR وبوابات mcp=true وmfa_enroll=true.",
      intro:
        "ينفّذ خط معالجة طلبات HTTP في SCRIPE ٣٣ مرحلة صارمة الترتيب في MiddlewarePipeline.cs، مع إيقاف فوري عند أي مخالفة أمان.",
      overviewTitle: "نظرة عامة على المسار",
      overviewIntro: "يتدفق الطلب من الأعلى إلى الأسفل، تغيير الترتيب يُدمر العمليات.",
      globalExceptionTitle: "1. معالج الأخطاء العام",
      globalExceptionIntro: "يُعيد رسائل مهيكلة تخفي تفاصيل الأخطاء في الإنتاج.",
      correlationIdTitle: "2. معرف الارتباط (Correlation ID)",
      correlationIdIntro: "لتتبع الطلب بكامله في اللوجات.",
      requestLoggingTitle: "3. تسجيل الطلبات",
      requestLoggingIntro: "يتم إخفاء البيانات الحساسة من اللوجات تلقائياً.",
      cookieAuthTitle: "4. تحويل الـ Cookie لـ Bearer",
      cookieAuthIntro: "للسماح بالواجهة الأمامية باستخدام HttpOnly بفعالية وأمان.",
      tenantContextTitle: "5. سياق الوحدة",
      tenantContextIntro: "لاستخراج المعرف وإعداده لقواعد البيانات.",
      tenantContextNote: "يجب أن يعمل بعد المصادقة وقبل أي اتصال بقاعدة البيانات.",
      cacheHeadersTitle: "6. رؤوس التخزين المؤقت",
      cacheHeadersIntro: "ضبط صحيح لعمليات التخزين لمنع عرض البيانات القديمة.",
      fieldProjectionTitle: "7. إسقاط الحقول (Field Projection)",
      fieldProjectionIntro: "إزالة البيانات المحجوبة عن المستخدم بناءً على الأذونات.",
      observabilityTitle: "برمجية المراقبة",
      observabilityIntro: "تتبع الوقت المستغرق والمقاييس الأخرى لـ Prometheus.",
      registrationTitle: "ترتيب تسجيل Middleware",
      registrationIntro:
        "ترتيب التسجيل في MiddlewarePipeline.cs حاسم: تعمل ApiKeyUsageMiddleware وتقييد المعدل بعد UseAuthentication()، وتنفّذ TrustedCidrEnforcementMiddleware وMustChangePasswordMiddleware وRequireMfaEnrollmentMiddleware بعد UseAuthorization().",
      summaryTitle: "ملخص الـ Middleware",
      orderWarning: "تغيير الترتيب سيؤدي لأعطال. اختبر دائمًا بعد التعديل.",
    },
    auditCompliance: {
      title: "التدقيق والامتثال",
      description:
        "قناة تدقيق كاملة، وتتبع الكيانات، وبث SignalR، وتصدير CSV/Excel/PDF، وميزات الامتثال.",
      intro: "يضمن النظام أن كل تعديل محفوظ في السجلات ليوافق متطلبات الامتثال القانونية.",
      architectureTitle: "بنية التدقيق",
      architectureIntro:
        "يتكون نظام التدقيق من تسجيل طلبات HTTP واعتراض تعديل كيان قاعدة البيانات. يتم تسجيل بيانات الطلب بشكل غير متزامن على مستوى المضيف عبر RequestLoggingMiddleware، بينما يتم التقاط الطفرات على مستوى قاعدة البيانات بواسطة AuditableEntityInterceptor قبل SaveChanges.",
      interceptorTitle: "معترض تغييرات الكيان",
      interceptorIntro:
        "يقوم معترض AuditableEntityInterceptor بالارتباط بقناة SaveChangesAsync في EF Core. لكل كيان مضاف أو معدل أو محذوف (بما في ذلك الحذف الناعم)، يلتقط القيم القديمة والجديدة بتنسيق JSON والمستخدم الذي أجرى التغيير والطابع الزمني. يتخطى كيانات AuditLog لتجنب التكرار اللانهائي.",
      auditLogEntityTitle: "هيكل كيان سجل التدقيق",
      signalrTitle: "البث عبر SignalR",
      signalrIntro:
        "يتم بث سجلات التدقيق في الوقت الفعلي عبر SignalR AuditHub. يتلقى مشرفو النظام المتصلون إشعارات فورية عند حدوث أي تغيير في البيانات، مما يتيح لوحات مراقبة حية.",
      exportTitle: "قدرات التصدير",
      exportIntro: "تصدير بصيغ CSV أو PDF أو Excel.",
      exportDetail:
        "يوفر AuditExportService عمليات تصدير متعددة التنسيقات. يستخدم تصدير CSV مكتبة CsvHelper مع فرض علامات الاقتباس حول جميع الحقول لمنع حقن CSV (RFC 4180) وبادئة UTF-8 BOM لـ Excel. يولد تصدير Excel دفتر عمل ClosedXML بثلاث أوراق عمل مفصلة: الملخص التنفيذي (إحصائيات/مؤشرات أداء رئيسية)، بيانات التدقيق (مع التصفية التلقائية، تجميد الصفوف العليا، وتنسيق شرطي باللون الأخضر/الأحمر)، وتحليل الأمان. يستخدم تصدير PDF محرك QuestPDF، والذي تم وضع علامة Obsolete عليه لمجموعات البيانات الكبيرة بسبب استهلاك الذاكرة. لحماية الموارد، يتم تحديد حد أقصى لجميع عمليات التصدير يبلغ 10,000 صف ويتم تحميلها في الذاكرة قبل الإرسال.",
      queryApiTitle: "واجهة برمجة تطبيقات الاستعلام والتصدير",
      queryApiIntro:
        "توفر واجهة برمجة تطبيقات التدقيق إمكانيات البحث والتصفية والتصدير لسجلات التدقيق. تتطلب جميع نقاط النهاية مصادقة المسؤول وصلاحية audit.view أو audit.export.",
      querySearchDesc: "البحث في السجلات مع ترحيل الصفحات.",
      queryExportCsvDesc: "تصدير السجلات كملف CSV.",
      queryExportExcelDesc: "تصدير كملف إكسل.",
      queryExportPdfDesc: "تصدير كملف PDF.",
      scopingTitle: "عزل أمان الوحدات ونطاق التدرج الهرمي",
      scopingDetail:
        "يتم فرض عزل البيانات ديناميكيًا عند الاستعلام. تحدد خدمة DataScopeService النطاق الفعلي للمشرف بناءً على سلسلة أولوية صارمة: ContextTenant (عبر ترويسة AES مشفرة)، وتجاوز الصلاحيات، و SystemProtectedAdmin، ونطاق الهرم (يشمل الفروع)، أو OwnTenant. يتم تتبع الفروع في وقت ثابت عبر المسارات المادية، حيث تترجم مقارنات StartsWith إلى استعلامات SQL LIKE المدعومة بالفهارس. يطبق المستودع مواصفة AuditByTenantScopeSpec لضمان العزل عبر 'WHERE TenantId IN (...)'، بينما يتم التحقق من الطلبات المباشرة بناءً على المعرف بواسطة GetAuditLogDetailQueryHandler لمنع تصعيد الامتيازات الأفقي.",
      complianceTitle: "ميزات الامتثال",
      immutableTitle: "سجلات غير قابلة للتغيير",
      immutableDesc: "يتم قفل السجلات وتخزينها للقراءة فقط، مما يمنع الحذف أو التعديل بعد حفظها.",
      fullTraceTitle: "تتبع كامل",
      fullTraceDesc: "يلتقط ترويسات HTTP، وسياق الطلب، وتعديلات الكيان لضمان رؤية تتبع كاملة.",
      searchableTitle: "قابل للبحث",
      searchableDesc:
        "الفهارس المحسنة على الطابع الزمني، ومعرف المستخدم، ونوع الحدث، ومعرف الارتباط تتيح البحث الفوري.",
      tenantScopedTitle: "نطاق الوحدات",
      tenantScopedDesc:
        "يتم عزل السجلات تلقائيًا بواسطة حدود TenantId وشجرة الفروع لمنع التسريبات.",
      realtimeTitle: "في الوقت الفعلي",
      realtimeDesc: "بث أحداث الأمان والتعديلات مباشرة إلى لوحات التحكم عبر SignalR بنطاق الوحدة.",
      retentionTitle: "سياسة الاحتفاظ",
      retentionDesc:
        "فترات الاحتفاظ المحددة تقوم تلقائيًا بتطهير السجلات منتهية الصلاحية عبر عمال الخلفية.",
    },
    sso: {
      samlTitle: "تكامل SAML 2.0 والتحقق التشفيري",
      samlContent:
        "تدعم المنصة تسجيل الدخول الموحد SAML 2.0 باستخدام مكتبة ITfoxtec.Identity.Saml2. عند العمل كموفر خدمة (SP)، يتم إنشاء طلبات AuthnRequest وإرسالها عبر ربط إعادة التوجيه. بالنسبة لاستدعاءات ACS، يتم التحقق من توقيعات XML باستخدام شهادات X.509 العامة المخزنة بصيغة base64 (بواسطة X509CertificateLoader). يتم تجاوز التحقق من سلسلة الشهادات وفحوصات الإلغاء (None/NoCheck) لتسهيل استخدام شهادات المؤسسات الموقعة ذاتياً. عند العمل كموفر هوية (IdP)، يتم إصدار تأكيدات SAML XML الموقعة للتطبيقات الخارجية.",
      oidcCallbackTitle: "استدعاء OIDC/SAML المركزي وتذكرة التسليم أحادية الاستخدام",
      oidcCallbackContent:
        "تستقبل نقاط الاستدعاء المركزية في https://api.scripe.org (GET /api/v1/auth/oidc/callback و POST /api/v1/auth/saml/acs/{providerId}) استجابات موفري الهوية، وتتحقق من تذكرة الحالة الخادمية ExternalAuthStateTicket (مع code_verifier و nonce و returnOrigin)، وتفحص تعليق المستأجر و HybridMfaPolicy، ثم تصدر تذكرة ExternalAuthHandoffTicket قصيرة الأمد (120 ثانية بمفتاح SHA-256 في auth:ext-handoff:{sha256} وقفل auth:ext-handoff-used:{sha256}) وتعيد التوجيه إلى https://auth.scripe.org/sso/continue أو النطاق الموثق {ReturnOrigin}/sso/callback لاستردادها مرة واحدة عبر POST /api/v1/auth/sso/handoff.",
      oauthMirroringTitle: "محاكاة عملاء OAuth والتحقق من الحصص",
      oauthMirroringContent:
        "تتحقق تسجيلات تطبيقات OAuth الصادرة من حصص الاشتراك المحددة للوحدة عبر QuotaService. يتم إلحاق معرفات العملاء ببادئة إعدادات الهوية الخاصة بالوحدة، ويتم إنشاء أسرار عملاء سرية آمنة (256 بت عشوائي تشفيرياً) وتُعرض مرة واحدة فقط. تتم مزامنة تسجيلات التطبيقات بالكامل مع متجر تطبيقات OpenIddict، ومحاكاتها في جدول قاعدة بيانات OAuthApplication المحلي مع إخفاء الأسرار لضمان الأداء وعزل الاستعلامات.",
      title: "تسجيل الدخول الموحد (SSO)",
      description: "مصادقة OIDC، ربط هوية خارجي، وتطبيقات OAuth.",
      intro:
        "يدعم نظام SCRIPE المصادقة عبر موفرين خارجيين مبنيين على بروتوكول OIDC وتوفير بيانات اعتماد عبر تطبيقات OAuth. يتم تصميم النظام لتعدد الوحدات مع تركيز عالٍ على أمان PKCE.",
      architectureTitle: "بنية مصادقة OIDC/OAuth",
      endpointsTitle: "نقاط النهاية والتدفق (Endpoints & Flow)",
      flowIntro: "عملية مصادقة SSO تتكون من تدفق مكون من عدة خطوات لتحقيق أقصى قدر من الأمان:",
      authEndpointTitle: "1. نقطة مسار التفويض (Authorization Endpoint)",
      authEndpointDesc:
        "تبدأ العملية عبر توجيه المستخدم إلى صفحة تسجيل دخول موفر الهوية الخارجي، وتتضمن التحقق من الـ PKCE وتوليد رمز (State).",
      callbackEndpointTitle: "2. نقطة مسار العودة (Callback Endpoint)",
      callbackEndpointDesc:
        "يتم استقبال المستخدم بعد المصادقة بنجاح واستبدال كود التفويض (Authorization Code) بالرموز المؤمنة على الخادم، دون تدخل المتصفح.",
      linkingTitle: "ربط ومعالجة الهويات",
      linkingIntro:
        "عندما يكمل المستخدم تسجيل الدخول، يتم مطابقة البريد الإلكتروني مع قاعدة بيانات المستخدمين الموجودة. إذا كان هذا أول دخول، يتم ربط حساب OIDC الخارجي مع الحساب الداخلي في SCRIPE لمنع ازدواجية الحسابات.",
      pkceWarning:
        "لا يتوفر دعم لتدفقات OAuth الضمنية (Implicit Flow) المنتهية الصلاحية؛ بدلاً من ذلك يُفرض تدفق PKCE في جميع الأشكال (التطبيقات العامة والسرية).",
      howItWorksTitle: "How SSO Works",
      howItWorksContent:
        "SCRIPE uses the Authorization Code Flow with PKCE (Proof Key for Code Exchange) for SSO. This is the most secure OAuth2 flow, recommended by the OAuth 2.1 specification for all client types.",
      step1Title: "1. اكتشاف الموفر",
      step1Content:
        "تجلب صفحة الدخول في https://auth.scripe.org الموفرين المتاحين عبر GET /api/v1/auth/oidc/providers/admin وفق Tenancy:AuthBaseUrl و OriginRouting.",
      step2Title: "2. تذكرة الحالة و PKCE على الخادم",
      step2Content:
        "عند اختيار موفر SSO، يستدعي العميل POST /api/v1/auth/oidc/challenge ليُنشئ الخادم code_verifier و nonce و state و returnOrigin الموثق داخل ExternalAuthStateTicket على الخادم (دون sessionStorage في المتصفح).",
      step3Title: "3. التوجيه إلى موفر الهوية باستدعاء مركزي",
      step3Content:
        "يُعاد توجيه المتصفح إلى موفر الهوية الخارجي مع تثبيت redirect_uri على https://api.scripe.org/api/v1/auth/oidc/callback (أو /api/v1/auth/saml/acs/{providerId}).",
      step4Title: "4. الاستدعاء المركزي وإصدار تذكرة التسليم",
      step4Content:
        "بعد مصادقة المستخدم يعود إلى api.scripe.org؛ يستهلك الخادم ExternalAuthStateTicket، ويستبدل الكود بالـ code_verifier الخادمي، ويُصدر تذكرة ExternalAuthHandoffTicket بمهلة 120 ثانية ثم يوجه إلى auth.scripe.org/sso/continue أو {ReturnOrigin}/sso/callback.",
      step5Title: "5. الاسترداد أحادي الاستخدام وتأسيس الجلسة",
      step5Content:
        "تستدعي صفحة العودة POST /api/v1/auth/sso/handoff (أو /api/auth/session/establish على النطاق المخصص) لاستهلاك تذكرة التسليم مرة واحدة وتهيئة JWT في الذاكرة وملف تعريف التحديث HttpOnly Lax.",
      pkceTitle: "نموذج أمان PKCE والتسليم المركزي",
      pkceContent:
        "يمنع تخزين ExternalAuthStateTicket على الخادم انكشاف PKCE في sessionStorage، بينما يضمن الاسترداد الذري لـ ExternalAuthHandoffTicket عبر SHA-256 (auth:ext-handoff-used:{sha256}) وفحص IVerifiedOriginEvaluator منع اختطاف الأكواد وإعادة التوجيه المفتوحة.",
      entityModelTitle: "Identity Provider Entity",
      entityModelContent:
        "The IdentityProvider entity stores all OIDC configuration for an external IdP. Each provider is optionally scoped to a tenant (TenantId = null means system-wide).",
      linkingContent:
        "يتطلب ربط الحساب المصادق عليه تصعيد Sudo (X-Sudo-Token) عبر POST /api/v1/auth/admin/external-logins/initiate-link (تم إيقاف المسار المباشر /external-logins/link برمز 410 Gone)، ويكتمل الربط عبر الاستدعاء المركزي وتذكرة التسليم.",
      centralRelayTitle: "مرحل جلسات النطاقات المخصصة (HMAC Micro-Relay) و CORS الديناميكي",
      centralRelayContent:
        "لأن النطاقات المخصصة لا تشارك ملفات تعريف الارتباط مع api.scripe.org، يوفر Next.js BFF مسارات /api/auth/session/establish و /refresh و /logout المحمية بفحص Sec-Fetch-Site/Origin وتوقيع HMAC-SHA256 (رؤوس X-Scripe-Session-Relay-* بمهلة 30ث وقفل Nonce 60ث في SessionRelayAuthenticator) لإصدار ملف تعريف ارتباط __Host-scripe_refresh_token محلي، مع تحقق IVerifiedOriginEvaluator و DynamicVerifiedCorsPolicyProvider المخبأ لـ 60 ثانية.",
      splitLogoutTitle: "فصل تسجيل الخروج التطبيقي عن المركزي (scr.oidc.session)",
      splitLogoutContent:
        "يدعم تسجيل الخروج معامل logoutScope ('app' افتراضياً أو 'central'). يحافظ AuthLogoutScopeHelper و CookieAuthMiddleware على ملف تعريف الخادم المركزي scr.oidc.session أثناء /refresh و /sso/handoff وخروج التطبيق، بينما يمحوه فقط عند طلب logoutScope: 'central'.",
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
    login_failed: "محاولة تسجيل دخول فاشلة",
    account_locked: "قفل أمان الحساب",
    view: "عرض الأمان",
  },
};
