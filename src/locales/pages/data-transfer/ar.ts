/**
 * SCRIPE Data Exchange Studio & DataTransfer Module Documentation Locales — AR
 * توثيق استوديو تبادل البيانات وواجهة برمجة التطبيقات والقدرات التجارية.
 */
export const ar = {
  modules: {
    dataTransfer: {
      overview: {
        title: "استوديو تبادل البيانات ومحرك DataTransfer",
        description:
          "محرك مؤسسي متعدد المستأجرين للاستيراد والتصدير الجماعي، توليد قوالب ClosedXML الذكية، تطبيع البيانات في الشرق الأوسط وشمال أفريقيا بـ 17 قاعدة، محاكاة الحصص المسبقة، الترحيل متعدد الأوراق، وأمان OWASP.",
        intro:
          "يوحّد استوديو تبادل البيانات في SCRIPE وحدة خلفية معزولة (DataTransfer) مع محركات أساسية مشتركة (Core.Application.DataExchange و Core.Infrastructure.DataExchange) وواجهة استوديو بملء الشاشة من 4 خطوات (@core/data-exchange). يستبدل الاستوديو سكربتات CSV الهشة باستيعاب محصّن بمعايير OWASP، وتطبيع حتمي بزمن خطي، وحجز ذري للحصص، وتنفيذ معزول للأعطال عبر SQL Server و PostgreSQL و Oracle.",
        infoTitle: "حدود سياق المستأجر والهيكلة الأساسية المشتركة",
        infoContent:
          "تفرض نقاط نهاية تبادل البيانات ومسارات DataTransferMenuProvider خاصية RequiresTenantContext = true؛ استدعاء المنسق دون مستأجر مُحدَّد يُعيد DataTransfer.TenantRequired (400/422) ويعرض بطاقة DataExchangeTenantRequiredCard لإرشاد المشرف العام لاختيار مستأجر. وتُحفظ محركات البث والحماية من الصيغ وفحص OWASP وعقد IEntityDataExchangeProvider داخل Core لدمج الوحدات دون أي تبعية مباشرة.",
        archTitle: "الهيكلية النظيفة ثلاثية المشاريع والالتزام الكامل بـ AstraFlow",
        archIntro:
          "وفقاً لثوابت SCRIPE المعمارية، تفصل وحدة DataTransfer كيانات النطاق وعقود CQRS والمحولات المُولَّدة وقت الترجمة والبنية التحتية عبر ثلاثة مشاريع معزولة بمخطط datatransfer مستقل وجداول Outbox/Inbox.",
        featArchitecture: "عزل معماري صارم من 3 طبقات",
        featArchitectureDesc:
          "لا تحوي مشاريع DataTransfer.*.csproj أي إشارة لمشاريع CRM أو Identity أو PartyKernel. تمثّل DataTransfer.Domain كيانات DataTransferJob (مُطلقةً حدث DataExchangeJobCompletedEvent إلى datatransfer.outbox_messages) و SavedMappingPreset و ExternalLegacyKeyMap؛ وتنفّذ DataTransfer.Application 16 طلباً عبر AstraFlow و [AstraGenerateMapping] DataTransferMaps؛ وتدير DataTransfer.Infrastructure مخطط datatransfer عبر SQL Server و PostgreSQL و Oracle.",
        featSmartTemplates: "قوالب ClosedXML الذكية ودليل الحقول ثنائي اللغة",
        featSmartTemplatesDesc:
          "ينتج ملفات .xlsx و .csv و .tsv مُوطَّنة بتنسيق نصي @ (OOXML NumberFormatId 49) لحماية الأصفار البادئة وأرقام الهواتف، وقوائم تحقق منسدلة أصلية في Excel (حتى الصف 5,000)، وورقة Field Guide ثنائية اللغة، وورقة _scripe_meta المخفية جداً لتخزين بصمة SHA-256 للمخطط والتحقق من انحرافها عند الرفع.",
        featNormalization: "17 قاعدة تطبيع خطية لبيانات الشرق الأوسط وشمال أفريقيا",
        featNormalizationDesc:
          "يعمل SpreadsheetValueNormalizer بزمن خطي حتمي O(n) دون تعبيرات نمطية قابلة لـ ReDoS: تحويل الأرقام العربية والفارسية، إزالة التشكيل وأحرف اتجاه النص، توحيد قيم الفراغ، تحليل عملات SAR و EGP و AED و USD والأرقام السالبة بين أقواس، وتنسيق هواتف E.164.",
        featDryRunQuota: "التجربة الصفرية المسبقة وحجز الحصص الإلزامي",
        featDryRunQuotaDesc:
          "تحاكي قواعد المخطط والكيانات والحقول المخصصة وحدود الترخيص دون أي كتابة في قاعدة البيانات. وقبل التنفيذ، يحجز TryReserveSlotsAsync حصة علائقية ذرية لمدة ساعتين (مع إغلاق آمن في EnsureCounterAsync عبر الكيانات الستة المقيدة بحصة) وتتم تسويتها عبر ReconcileReservationLeaseAsync عند الاكتمال أو الفشل أو الإلغاء.",
        featTopologicalDag: "الترتيب الطوبولوجي متعدد الأوراق والربط الذاتي بمرحلتين",
        featTopologicalDagDesc:
          "يكتشف ComputeRelatedMultiSheetEntityKeys مجموعات الأوراق المتعددة المصرح بها تلقائياً (5 أوراق لـ CRM، و3 لـ PartyKernel؛ مع بقاء كيانات Identity مستقلة) ويفعّل الترحيل متعدد الأوراق تلقائياً في شريط الأدوات وكتالوج الكيانات مع ترتيب TopologicalSortSheets وربط Pass 2 الذاتي.",
        featOwaspFls: "دفاعات OWASP وتنقيح أمان الحقول (FLS) وتشفير BYOK",
        featOwaspFlsDesc:
          "يفرض OwaspSpreadsheetSecurityValidator حد 25 ميجابايت للرفع، وسقف 100 ميجابايت فك الضغط / 1,000 عنصر / نسبة ضغط 100x، وحظر الماكرو و DTD/XXE وتطهير HTML وحماية CsvFormulaGuard بالتكامل مع [AstraSensitive] و IRestrictedFieldsResolver وتشفير/فك تشفير الحقول السرية المخصصة BYOK.",
        domainTitle: "جذور النطاق ومخطط الاستمرارية",
        domainIntro:
          "ترث جميع كيانات DataTransfer من AuditableEntity<Guid> وتطبّق ITenantAwareEntity لفرض عزل المستأجر وتهجير قواعد البيانات الثلاث داخل مخطط datatransfer.",
        pipelineTitle: "مسار الاستوديو بملء الشاشة من 4 خطوات",
        pipelineIntro:
          "يدير DataExchangeStudioOverlay دورة الاستيعاب الكاملة من تنزيل القوالب أو فحص OWASP وصولاً إلى قواعد التطبيع والمحاكاة والتنفيذ المتزامن أو في الخلفية.",
        stepUpload: "الخطوة 1 — تنزيل القالب وفحص OWASP للملفات",
        stepUploadDesc:
          "نزّل قالباً ذكياً لكيان واحد أو متعدد الأوراق أو ارفع ملف .xlsx أو .csv أو .tsv (بحد أقصى 25 ميجابايت). يتحقق InspectUploadAsync من التوقيعات الثنائية ويستخرج العناوين و5 صفوف عينة ويطابق الأعمدة بثلاث مراحل (تطابق تام، مرادفات، Levenshtein >= 0.72).",
        stepMap: "الخطوة 2 — مطابقة الأعمدة والقوالب المحفوظة وقواعد التطبيع",
        stepMapDesc:
          "اربط أعمدة الملف بحقول الكيان والحقول المخصصة (cf:*)، واضبط قواعد DataExchangeTransformRule الـ 17، وعيّن القالب الافتراضي عبر POST /presets/{id}/default أو افتح الاستوديو مسبقاً بـ initialPresetId مع حماية @core/ui/confirmation-dialog الموحدة.",
        stepDryRun: "الخطوة 3 — المحاكاة المسبقة وفحص الحصص",
        stepDryRunDesc:
          "يفحص DryRunAsync جميع الصفوف والروابط المرجعية والحقول المخصصة وحدود الترخيص قبل أي تعديل في القاعدة، عارضاً الصفوف الصالحة والمرفوضة وتقدير الإدخال/التحديث وأهلية التنفيذ المتزامن (<= 250 صفاً).",
        stepExecute: "الخطوة 4 — التنفيذ بالالتزام الجزئي ودفتر الأخطاء",
        stepExecuteDesc:
          "ينفّذ <= 250 صفاً فورياً (ما لم يُطلب التشغيل بالخلفية أو تتجاوز كلمات المرور المؤقتة حد 100 صف) ويجدول الدفعات الأكبر مع استرداد المهام العالقة. تعزل كل حزمة من 250 صفاً أخطاءها وتحفظ خرائط ExternalLegacyKeyMaps (بفهرس مركب فريد وحارس EXTERNAL_KEY_CONFLICT المسبق) وتصدر ملف .xlsx للمرفوضات بأعمدة _RowNumber و _ErrorCode و _ErrorColumn و _ErrorMessage و _CascadeParentRef (صلاحية 24 ساعة).",
        entitiesTitle: "موفرّو الكيانات المسجلون وقابلية التوسع",
        entitiesIntro:
          "تتوفر عشرة كيانات مدمجة عبر CRM والهوية ونواة الأطراف، ويمكن لأي وحدة جديدة الانضمام عبر تطبيق واجهة IEntityDataExchangeProvider مباشرة (فئة EfCoreEntityDataExchangeProviderBase قديمة وغير مستخدمة في الموفّرين الفعليين).",
        normalizationTitle: "عقد قواعد التحويل التقريرية السبعة عشر",
        normalizationIntro:
          "يحمل كل DataExchangeColumnMapping قاعدة DataExchangeTransformRule تُنفّذ بزمن خطي قبل التحليل الصارم للأنواع.",
        securityTitle: "سقوف OWASP وقائمة الحقول المحظورة و FLS",
        securityIntro:
          "تعمل الضوابط الأمنية بتطابق تام في طلبات API ومهام الخلفية (عبر DataExchangeAmbientContext المستعاد من ActorSnapshotJson) والتصديرات المحمية من الصيغ.",
        securityWarnTitle: "عدم قابلية تعديل بيانات الاعتماد والحقول النظامية",
        securityWarnContent:
          "يحظر DataExchangeSecurityPolicy تماماً كلمات المرور ومفاتيح API ورموز TOTP والأعمدة التدقيقية و RowVersion وأي حقل يحمل [AstraSensitive] أو [AstraRedact]. كما يلتقط LooksLikeMaskedSentinel رموز الإخفاء لمنع استبدال الأسرار الحية أثناء التحديث.",
        governanceTitle: "صلاحيات PBAC ومفاتيح الميزات وقائمة الإدارة",
        governanceIntro:
          "يسجل DataTransferPermissionProvider (7 أدوار قياسية شاملة CRM_SALES_REP و6 أدوار تستثنيه لـ migrations.execute) و DataTransferFeatureProvider و DataTransferMenuProvider (RequiresTenantContext = true) و DataTransferDevDataSeeder (Order = 155) بوابات الوصول وفق [Authorize] و [PermissionRequired] دون [AdminOnly] على GenericCrudView مع تحصين Showing 0-0 of 0 results.",
        tenantContextTitle: "التنفيذ على مستوى المستأجر وسير عمل مشرف المنصة العام",
        tenantContextContent:
          "جميع الكيانات والمهام والقوالب و ExternalLegacyKeyMap مقيدة بسياق المستأجر، وتمنع DataExchangeSecurityPolicy جداول المنصة السيادية. يختار مشرف المنصة العام المستأجر المستهدف من مبدّل المستأجر في الشريط العلوي (أو يتبع بطاقة DataExchangeTenantRequiredCard) لتفعيل صفحات تبادل البيانات بأمان.",
        recoveryTitle: "نموذج الأمان والتعافي: التجربة الصفرية والحزم الجزئية والإلغاء التعاوني (دون تراجع شامل)",
        recoveryContent:
          "لا يوفر DataTransfer مهمة تراجع شاملة بعد الاكتمال قد تمسح تعديلات متزامنة؛ بل يتحقق DryRunAsync مسبقاً دون كتابة، وتلتزم ExecuteImport بحزم معزولة من 250 صفاً وتصدر ملف المرفوضات (.xlsx) بأعمدة التشخيص الخمسة، ويعيد POST /jobs/{id}/cancel الحصص غير المستهلكة عبر ReconcileReservationLeaseAsync مع DetachPendingOutboxMessages().",
        outboxTitle: "هيكلة الإضافات عديمة الاقتران وتكامل Outbox",
        outboxIntro:
          "يكتشف DataTransfer الكيانات عبر عقود Core.Application ويرسل نتائج الإكمال عبر جدول Outbox المعزول دون أي تبعيات مباشرة مع وحدات الخلفية أو الواجهة.",
        adminSurfacesTitle: "لماذا كتالوج الكيانات للقراءة فقط وكيف تعمل كل شاشة",
        adminSurfacesIntro:
          "يُكتشف كتالوج الكيانات (/admin/data-exchange) تلقائياً من موفّري DI والباقات بينما تُضاف الأعمدة المخصصة من /custom-fields، وتُنشأ المهام (/jobs) والقوالب المحفوظة (/presets) مباشرة عبر استوديو تبادل البيانات.",
        dagComparisonTitle: "الاستيراد المفرد مقابل الترحيل الطوبولوجي متعدد الأوراق (DAG)",
        dagComparisonIntro:
          "يتشارك النمطان محرك OWASP والتطبيع وحزم 250 صفاً، بينما ينشط الترحيل متعدد الأوراق تلقائياً عبر ComputeRelatedMultiSheetEntityKeys عند وجود ورقتين مرتبطتين فأكثر ضمن صلاحيات المتصل.",
        dynamicMatrixTitle: "القدرات الديناميكية مقابل الثوابت الأمنية الصلبة",
        dynamicMatrixIntro:
          "تتكيّف الأوصاف والحقول المخصصة والصلاحيات والباقات والحصص ديناميكياً لكل مستأجر، في حين تبقى سقوف OWASP ومحرك التطبيع O(n) وقائمة الحقول المحظورة ثابتة وصلبة.",
        normalizationPipelineTitle: "ترتيب التنفيذ التسلسلي الحتمي من 9 مراحل O(n)",
        normalizationPipelineIntro:
          "تعمل قواعد DataExchangeTransformRule المفعّلة بتتابع زمني خطي O(n) قبل التحليل الصارم للأنواع لتنظيف النصوص العربية والعملات والأرقام الهاتفية والتواريخ بتطابق تام بين المعاينة والتجربة الصفرية والعامل الخلفي.",
        editionsTitle: "مصفوفة الباقات والتراخيص (EditionSeeder)",
        editionsIntro:
          "تُحسم الصلاحيات ديناميكياً عبر محرك الاستحقاقات وفق باقة اشتراك المستأجر.",
      },
    },
  },
  apiReference: {
    dataTransferApi: {
      title: "واجهة برمجة استوديو تبادل البيانات",
      description:
        "مرجع REST API الكامل لاستوديو تبادل البيانات (/api/v1/data-transfer): الأوصاف والقوالب الذكية وفحص OWASP والمحاكاة والاستيراد والتصدير والقوالب المحفوظة وسجل المهام.",
      intro:
        "يوفر DataTransferController 16 نقطة نهاية REST تحت المسار /api/v1/data-transfer (الإصدار 1.0) عبر AstraFlow Mediator، مع إرجاع أغلفة Result<T> القياسية وتفاصيل RFC-7807 عند الفشل.",
      authNoteTitle: "المصادقة وسياق المستأجر وحدود المعدل",
      authNote:
        "تتطلب جميع النقاط [Authorize] و [PermissionRequired(\"datatransfer.*\")] وسياق مستأجر نشطاً — أُزيل قيد [AdminOnly] عمداً لتعمل الأدوار الـ 7 المصرح لها بسلاسة شاملةً CRM_SALES_REP (و6 أدوار بدونه لـ migrations.execute؛ وغياب المستأجر يرجع DataTransfer.TenantRequired والكيان المجهول DataTransfer.UnknownEntity 404). تُطبَّق حدود per-user (100/دقيقة) و export-heavy (5/دقيقة) مع X-Content-Type-Options: nosniff.",
      discoveryTitle: "اكتشاف الكيانات والأوصاف والقوالب الذكية",
      discoveryIntro:
        "استعلام الكيانات المتاحة لصلاحيات المستدعي، واسترداد الأوصاف المدمجة مع الحقول المخصصة (cf:*) وحجب FLS، وتنزيل القوالب المنسقة.",
      epListEntitiesDesc:
        "يعرض الكيانات المسجلة المصفاة حسب صلاحيات العرض وميزات باقة المستأجر مع مصفوفة relatedMultiSheetEntityKeys المرتبة طوبولوجياً والحصة المتبقية.",
      epGetDescriptorDesc:
        "يعيد DataExchangeEntityDescriptor الفعّال للكيان ومجموعة relatedMultiSheetEntityKeys والحقول المحجوبة بـ FLS ولقطة الحصة الحية.",
      epDownloadTemplateDesc:
        "يبث قالباً موطّناً (.xlsx أو .csv أو .tsv) لكيان واحد أو متعدد الأوراق بترتيب طوبولوجي مع تنسيق @، قوائم التحقق، Field Guide، وورقة _scripe_meta.",
      pipelineTitle: "مسار الاستيعاب المكون من 4 مراحل",
      pipelineIntro:
        "فحص الملفات وتخزينها مؤقتاً، وإجراء المحاكاة الصفرية، ثم تنفيذ الاستيراد متزامناً (<= 250 صفاً) أو عبر عامل الخلفية.",
      epInspectDesc:
        "يستقبل multipart/form-data (حتى 25 ميجابايت / 26,214,400 بايت)، ويطبق فحوصات OWASP للمحتوى و XXE والماكرو، ويعيد العناوين و5 صفوف عينة واقتراحات المطابقة.",
      epDryRunDesc:
        "يحاكي التحقق من المخطط و17 قاعدة تطبيع والحقول المخصصة والروابط المرجعية والحصص لـ UploadId دون أي حفظ فعلي.",
      epImportDesc:
        "ينفذ الاستيراد المفرد أو متعدد الأوراق مع حجز الحصص لساعتين (TryReserveSlotsAsync / ReconcileReservationLeaseAsync) وحزم من 250 صفاً وتهيئة الهوية وملف المرفوضات ونشر حدث DataExchangeJobCompletedEvent عبر Outbox.",
      exportTitle: "التصدير المتدفق المحمي من الصيغ",
      exportIntro:
        "توليد تصدير فوري أو في الخلفية خاضع لعزل المستأجر و FLS وتحويل CsvFormulaGuard.",
      epExportSyncDesc:
        "يبث ملف تصدير (.xlsx أو .csv أو .tsv) محمياً من الصيغ ومُنقّحاً حسب FLS مباشرة في الاستجابة مع تسجيل مهمة مكتملة.",
      epExportAsyncDesc:
        "يجدول مهمة تصدير ثقيلة للعمل في الخلفية بحفظ 24 ساعة ويعيد 202 Accepted مع كائن DataTransferJobDto.",
      presetsTitle: "قوالب مطابقة الأعمدة المحفوظة",
      presetsIntro:
        "إدارة قوالب مطابقة الأعمدة وقواعد التحويل المعاد استخدامها على مستوى المستأجر.",
      epListPresetsDesc:
        "يعرض قوالب المطابقة المحفوظة للمستأجر مع إمكانية التصفية حسب entityKey أو search.",
      epSavePresetDesc:
        "ينشئ قالباً جديداً للمطابقة أو يحدّث قالباً قائماً ضمن المستأجر الحالي عبر DataTransferMaps.",
      epSetDefaultPresetDesc:
        "يرقّي قالباً محفوظاً ليصبح الافتراضي لنفس الكيان داخل المستأجر، مع إلغاء تفعيل الافتراضيات السابقة وتسجيل حدث التدقيق DATA_EXCHANGE_PRESET_DEFAULT_SET.",
      epDeletePresetDesc:
        "يحذف قالباً محفوظاً منطقياً للمستأجر ويعيد 204 No Content.",
      jobsTitle: "سجل المهام والإلغاء وتنزيل المخرجات",
      jobsIntro:
        "متابعة المهام بالخلفية عبر ProcessedRows و ProgressPercent، وإلغاء التنفيذ مع تسوية الحصص تلقائياً، وتنزيل ملفات التصدير والمرفوضات.",
      epListJobsDesc:
        "يعرض سجل مهام DataTransferJobDto مُرقّماً للمستأجر (page >= 1 و pageSize بين 1 و 100) مع التصفية بالحالة والكيان.",
      epGetJobDesc:
        "يسترد عدادات الصفوف وحالة التقدم وروابط المخرجات والتوقيتات UTC لمهمة محددة.",
      epCancelJobDesc:
        "يرسل إشارة إلغاء تعاونية لمهمة منتظرة أو قيد التشغيل ويسوّي الحصة غير المستخدمة ويسجل حدثاً تدقيقياً غير قابل للتعديل.",
      epDownloadArtifactDesc:
        "يبث إما ملف المرفوضات التوضيحي (rejected) أو ملف التصدير المكتمل بالخلفية (export) خلال نافذة الاحتفاظ البالغة 24 ساعة.",
      rateLimitsTitle: "حدود الأحجام ومحددات المعدل",
      rateLimitsIntro:
        "ملخص سقوف التحميل، سياسات معدل الطلبات، حدود التنفيذ المتزامن، وفترات الاحتفاظ بالمخرجات.",
      errorCodesTitle: "رموز الأخطاء المعيارية وتعيين HTTP",
      errorCodesIntro:
        "تترجم AstraFlow.AspNetCore إخفاقات Result<T> إلى استجابات HTTP معيارية دون رمي استثناءات أعمال.",
    },
  },
  commercial: {
    dataExchangeStudio: {
      title: "استوديو تبادل البيانات SCRIPE",
      description:
        "تأهيل المؤسسات وجهات الاتصال ومسارات CRM وطواقم العمل خلال دقائق مع تطبيع ذكي لبيانات الشرق الأوسط وشمال أفريقيا ومحاكاة صفرية المخاطر.",
      intro:
        "غالباً ما يتعثر ترحيل جداول البيانات بسبب سكربتات CSV هشة أو تشوّه الترميز العربي أو ضياع الأصفار البادئة من أرقام الهواتف. يحوّل استوديو تبادل البيانات في SCRIPE عمليات الاستيراد والتصدير والترحيل المعقدة إلى تجربة إرشادية آمنة وقابلة للتدقيق والتحقق المسبق.",
      statUploadCeiling: "سقف فحص الملفات بمعايير OWASP",
      statTransformRules: "قواعد تطبيع خطية مدمجة",
      statChunkSize: "حجم حزمة الالتزام المعزول",
      statEntityProviders: "كيانات جاهزة لـ CRM والهوية والأطراف",
      valueTitle: "لماذا تختار فرق العمليات والتشغيل استوديو تبادل البيانات",
      featDryRunQuota: "محاكاة مسبقة دون أي مخاطرة",
      featDryRunQuotaDesc:
        "تحقق من الصفوف السليمة وعدد الإضافات والتحديثات واستهلاك حصص الباقة قبل لمس أي سجل فعلي في قاعدة البيانات.",
      featMenaBilingual: "ذكاء ثنائي اللغة ومواءمة الشرق الأوسط",
      featMenaBilingualDesc:
        "تحويل تلقائي للأرقام العربية والفارسية، تنظيف التشكيل، دعم SAR و EGP و AED و USD، وحماية الأصفار البادئة بتنسيق @ في قوالب Excel.",
      featMultiSheetDag: "ترحيل متعدد الأوراق في ملف واحد",
      featMultiSheetDagDesc:
        "استورد المؤسسات والأشخاص والحسابات وجهات الاتصال والفرص والأنشطة في دفتر Excel واحد مع ضمان الترتيب الهيكلي للعلاقات.",
      featCustomFieldsPresets: "الحقول المخصصة وقوالب المطابقة الجاهزة",
      featCustomFieldsPresetsDesc:
        "يكتشف النظام حقولك المخصصة تلقائياً للربط والتحقق، ويتيح حفظ قوالب التعيين لإعادة استخدام ملفات الشركاء بضغطة واحدة.",
      featPartialCommit: "التزام جزئي ودفتر أخطاء فوري",
      featPartialCommitDesc:
        "تُحفظ الصفوف الصحيحة فوراً دون إيقاف الملف بالكامل بسبب أخطاء هامشية، مع تنزيل ورقة مرفوضات جاهزة للتصحيح وإعادة الرفع.",
      featEnterpriseSecurity: "أمان مؤسسي وحماية الحقول الحساسة",
      featEnterpriseSecurityDesc:
        "منع وحدات الماكرو وهجمات الصيغ في Excel مع عزل صارم للمستأجرين وحجب كلمات المرور والمفاتيح والحقول المقيدة بـ FLS.",
      tiersTitle: "القدرات حسب باقات SCRIPE",
      tiersIntro:
        "تنطلق القوالب الذكية والتصدير الآمن في Sports Starter، ويتاح الاستيراد الكامل في Standard و Sports Pro، بينما يُفتح الترحيل الهيكلي متعدد الأوراق في باقات Sports Ultra و Enterprise.",
      ctaTitle: "سرّع تأهيل عملائك وأنديتك بأمان تام",
      ctaSubtitle:
        "استعرض باقات الترخيص أو انتقل مباشرة إلى المرجع التقني ومواصفات واجهة REST API.",
      ctaPrimary: "عرض الباقات والأسعار",
      ctaSecondary: "استكشاف البنية التقنية",
    },
  },
};
