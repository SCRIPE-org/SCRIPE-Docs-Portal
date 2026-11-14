/**
 * SCRIPE Data Exchange Studio & DataTransfer Module Documentation Locales — RU
 * Технический модуль, справочник REST API и коммерческий обзор.
 */
export const ru = {
  modules: {
    dataTransfer: {
      overview: {
        title: "Студия обмена данными и движок DataTransfer",
        description:
          "Многоарендный корпоративный импорт и экспорт, умные шаблоны ClosedXML, 17-правильная нормализация MENA, проверка квот Dry-Run, топологическая миграция нескольких листов и защита OWASP.",
        intro:
          "SCRIPE Data Exchange Studio объединяет изолированный backend-модуль Clean Architecture (DataTransfer), общие движки Core (Core.Application.DataExchange и Core.Infrastructure.DataExchange) и полноэкранную 4-шаговую студию (@core/data-exchange). Хрупкие CSV-скрипты заменяются защищенным приемом данных по OWASP, детерминированной линейной нормализацией, атомарным бронированием квот и пакетным выполнением для SQL Server, PostgreSQL и Oracle.",
        infoTitle: "Граница контекста арендатора и общее ядро",
        infoContent:
          "Конечные точки Data Exchange и маршруты DataTransferMenuProvider требуют RequiresTenantContext = true; вызов без выбранного арендатора возвращает DataTransfer.TenantRequired (400/422) и отображает DataExchangeTenantRequiredCard для выбора арендатора суперадмином платформы. Потоковая обработка, защита от формул, проверка ZIP по OWASP, IEntityDataExchangeProvider и EfCoreEntityDataExchangeProviderBase<TEntity, TDbContext> вынесены в Core.",
        archTitle: "Трехпроектная Clean Architecture и фиксация на AstraFlow",
        archIntro:
          "В соответствии с инвариантами SCRIPE модуль DataTransfer разделяет доменные сущности, контракты CQRS с компилируемыми мапперами и инфраструктуру БД на три проекта с отдельной схемой datatransfer и поддержкой Outbox/Inbox.",
        featArchitecture: "Строгая 3-слойная модульная изоляция",
        featArchitectureDesc:
          "Проекты DataTransfer.*.csproj не имеют ссылок на CRM, Identity или PartyKernel. DataTransfer.Domain описывает DataTransferJob (публикующий DataExchangeJobCompletedEvent в datatransfer.outbox_messages), SavedMappingPreset и ExternalLegacyKeyMap; DataTransfer.Application выполняет 16 запросов AstraFlow через [AstraGenerateMapping] DataTransferMaps; DataTransfer.Infrastructure работает со схемой datatransfer на SQL Server, PostgreSQL и Oracle.",
        featSmartTemplates: "Умные шаблоны ClosedXML и справочник полей",
        featSmartTemplatesDesc:
          "Создает локализованные книги .xlsx, .csv и .tsv с текстовым форматом @ (OOXML NumberFormatId 49) для защиты ведущих нулей и телефонов, выпадающими списками Excel (до 5 000 строк), двуязычным листом Field Guide и скрытым листом _scripe_meta.",
        featNormalization: "17 правил линейной нормализации MENA",
        featNormalizationDesc:
          "SpreadsheetValueNormalizer работает за линейное время O(n) без уязвимых к ReDoS регулярных выражений: преобразует арабские/персидские цифры, убирает диакритику и BiDi-метки, канонизирует пустые значения, парсит валюты SAR/EGP/AED/USD и бухгалтерские скобки, нормализует телефоны E.164.",
        featDryRunQuota: "Предполетный Dry-Run и жесткое резервирование квот",
        featDryRunQuotaDesc:
          "Моделирует проверки схемы, домена, пользовательских полей и лицензионных лимитов без записи в БД. Перед запуском TryReserveSlotsAsync берет 2-часовую бронь, которую ReconcileReservationLeaseAsync выравнивает по завершении или отмене.",
        featTopologicalDag: "Топологический DAG листов и 2-проходный Self-FK",
        featTopologicalDagDesc:
          "ComputeRelatedMultiSheetEntityKeys динамически определяет доступные многолистовые DAG-кластеры (CRM — 5 листов, PartyKernel — 3 листа, Identity — 2 листа) и автоматически включает Multi-Sheet Migration в DataExchangeToolbarActions и EntitiesCatalogView вместе с TopologicalSortSheets и 2-проходным Self-FK.",
        featOwaspFls: "Защита загрузки OWASP и маскирование FLS",
        featOwaspFlsDesc:
          "OwaspSpreadsheetSecurityValidator ограничивает загрузку 25 МБ, 100 МБ распаковки / 1 000 файлов / коэффициентом 100x, запрещает макросы и DTD/XXE, очищает HTML и применяет CsvFormulaGuard наряду с [AstraSensitive] и IRestrictedFieldsResolver.",
        domainTitle: "Агрегаты домена и схема хранения",
        domainIntro:
          "Все сущности наследуют AuditableEntity<Guid> и реализуют ITenantAwareEntity, обеспечивая изоляцию арендатора и миграции SQL Server, PostgreSQL и Oracle в схеме datatransfer.",
        pipelineTitle: "4-шаговый конвейер полноэкранной студии",
        pipelineIntro:
          "DataExchangeStudioOverlay управляет циклом от загрузки шаблона или проверки OWASP до настройки правил очистки, Dry-Run-симуляции и пакетного выполнения.",
        stepUpload: "Шаг 1 — Загрузка шаблона и OWASP-инспекция",
        stepUploadDesc:
          "Скачайте умный шаблон или загрузите файл .xlsx, .csv или .tsv (до 25 МБ). InspectUploadAsync проверяет сигнатуры байтов, извлекает заголовки с 5 примерами и выполняет 3-уровневое сопоставление (точное, псевдонимы, Левенштейн >= 0.72).",
        stepMap: "Шаг 2 — Сопоставление колонок, пресеты и правила",
        stepMapDesc:
          "Сопоставьте колонки с полями сущности и пользовательскими полями (cf:*), задайте 17 правил DataExchangeTransformRule, назначьте пресет по умолчанию через POST /presets/{id}/default или откройте студию с initialPresetId и единым диалогом @core/ui/confirmation-dialog.",
        stepDryRun: "Шаг 3 — Предварительный Dry-Run и проверка квот",
        stepDryRunDesc:
          "DryRunAsync проверяет типы, внешние ссылки, пользовательские поля и квоты без записи в БД, выводя статистику валидности, план вставок/обновлений и возможность синхронного запуска (<= 250 строк).",
        stepExecute: "Шаг 4 — Частичная фиксация и книга отклонений",
        stepExecuteDesc:
          "До 250 строк выполняются синхронно (кроме RunInBackground или лимита <= 100 для OneTimeAutoPassword), крупные пакеты уходят в фон. Пакеты по 250 строк изолируют сбои и формируют .xlsx с колонками _RowNumber, _ErrorCode, _ErrorColumn, _ErrorMessage и _CascadeParentRef (TTL 24 ч).",
        entitiesTitle: "Зарегистрированные провайдеры и расширяемость",
        entitiesIntro:
          "Из коробки доступны десять сущностей модулей CRM, Identity и PartyKernel, а новые модули легко подключаются через EfCoreEntityDataExchangeProviderBase<TEntity, TDbContext>.",
        normalizationTitle: "Декларативный контракт 17 правил трансформации",
        normalizationIntro:
          "Каждое правило DataExchangeColumnMapping может содержать запись DataExchangeTransformRule, выполняемую за линейное время до строгой типизации.",
        securityTitle: "Ограничения OWASP, черный список полей и FLS",
        securityIntro:
          "Защитные политики идентичны для API-запросов, фоновых обработчиков (через DataExchangeAmbientContext из ActorSnapshotJson) и защищенного экспорта.",
        securityWarnTitle: "Неизменяемость учетных данных и системных полей",
        securityWarnContent:
          "DataExchangeSecurityPolicy жестко блокирует хэши паролей, метки безопасности, API-ключи, TOTP-секреты, поля аудита, RowVersion и свойства с [AstraSensitive]/[AstraRedact]. LooksLikeMaskedSentinel блокирует перезапись секретов масками при обновлении.",
        governanceTitle: "Права PBAC, флаги функций и меню администрирования",
        governanceIntro:
          "DataTransferPermissionProvider (7 стандартных ролей с CRM_SALES_REP и 6 ролей без него для migrations.execute), DataTransferFeatureProvider, DataTransferMenuProvider (RequiresTenantContext = true) и DataTransferDevDataSeeder (Order = 155) применяют [Authorize] + [PermissionRequired] без [AdminOnly] на GenericCrudView с пагинацией Showing 0-0 of 0 results.",
        tenantContextTitle: "Граница арендатора и сценарий суперадминистратора платформы",
        tenantContextContent:
          "Все сущности, задания, пресеты и ExternalLegacyKeyMap изолированы по арендатору, а системные таблицы платформы заблокированы в DataExchangeSecurityPolicy. Суперадмин платформы выбирает арендатора через верхний переключатель или по подсказке DataExchangeTenantRequiredCard.",
        recoveryTitle: "Модель надежности: Dry-Run, частичные пакеты и отмена (без глобального отката)",
        recoveryContent:
          "В DataTransfer намеренно отсутствует разрушительный глобальный откат после завершения, способный затереть параллельные правки. Вместо этого DryRunAsync проверяет данные без записи, ExecuteImport фиксирует чанки по 250 строк с выгрузкой ошибок .xlsx, а POST /jobs/{id}/cancel освобождает квоту в ReconcileReservationLeaseAsync и вызывает DetachPendingOutboxMessages().",
        outboxTitle: "Плагинная архитектура без связности и интеграция Outbox",
        outboxIntro:
          "DataTransfer обнаруживает сущности через контракты Core.Application и публикует события завершения в собственный Outbox без перекрестных ссылок на модули в backend и frontend.",
        adminSurfacesTitle: "Почему каталог сущностей только для чтения и как работают экраны",
        adminSurfacesIntro:
          "Каталог (/admin/data-exchange) динамически формируется из DI-провайдеров и прав редакции, пользовательские поля задаются в /custom-fields, а задания (/jobs) и пресеты (/presets) создаются напрямую из студии и панелей инструментов модулей.",
        dagComparisonTitle: "Одиночный импорт и топологическая миграция нескольких листов (DAG)",
        dagComparisonIntro:
          "Оба режима используют единый движок OWASP, нормализации и чанков по 250 строк; многолистовая миграция включается динамически через ComputeRelatedMultiSheetEntityKeys, когда кластер охватывает не менее двух связанных таблиц.",
        dynamicMatrixTitle: "Динамическое поведение против жестких границ безопасности",
        dynamicMatrixIntro:
          "Каталог, пользовательские поля, права, квоты и DAG-кластеры подстраиваются под арендатора и роль на лету, тогда как пороги OWASP, O(n)-нормализатор и черный список секретов остаются неизменными.",
        normalizationPipelineTitle: "Детерминированный 9-этапный конвейер O(n)-нормализации",
        normalizationPipelineIntro:
          "Включенные опции DataExchangeTransformRule выполняются строго по шагам за линейное время до парсинга типов, гарантируя идентичную очистку арабского текста, валют, телефонов и дат в предпросмотре, dry-run и фоновой задаче.",
        editionsTitle: "Матрица редакций и лицензирования (EditionSeeder)",
        editionsIntro:
          "Доступность возможностей определяется движком прав (Entitlements) согласно тарифной редакции арендатора.",
      },
    },
  },
  apiReference: {
    dataTransferApi: {
      title: "API Студии обмена данными",
      description:
        "Полный справочник REST API для SCRIPE Data Exchange Studio (/api/v1/data-transfer): дескрипторы, шаблоны, OWASP-проверка, dry-run, импорт/экспорт, пресеты и история.",
      intro:
        "Контроллер DataTransferController предоставляет 16 REST-эндпоинтов по пути /api/v1/data-transfer (API v1.0) через AstraFlow Mediator с возвратом стандартных конвертов Result<T> и описаний RFC-7807.",
      authNoteTitle: "Аутентификация, арендатор и ограничение частоты",
      authNote:
        "Все запросы требуют [Authorize], [PermissionRequired(\"datatransfer.*\")] и активного арендатора — атрибут [AdminOnly] убран, чтобы все 7 ролей включая CRM_SALES_REP работали напрямую (6 ролей без него для migrations.execute; без арендатора — DataTransfer.TenantRequired, неизвестная сущность — DataTransfer.UnknownEntity 404). Лимиты per-user (100/мин), export-heavy (5/мин) и X-Content-Type-Options: nosniff.",
      discoveryTitle: "Каталог сущностей, дескрипторы и умные шаблоны",
      discoveryIntro:
        "Просмотр доступных сущностей, получение дескрипторов с пользовательскими полями (cf:*) и ограничениями FLS, а также выгрузка шаблонов.",
      epListEntitiesDesc:
        "Возвращает список сущностей с учетом прав и тарифной редакции, включая топологически упорядоченные relatedMultiSheetEntityKeys, остаток квоты и флаги возможностей.",
      epGetDescriptorDesc:
        "Возвращает эффективный DataExchangeEntityDescriptor, кластер relatedMultiSheetEntityKeys, скрытые FLS-поля, флаги функций и счетчики квот.",
      epDownloadTemplateDesc:
        "Передает локализованный (.xlsx, .csv, .tsv) одиночный или многолистовой топологический шаблон с форматом @, списками Excel, Field Guide и _scripe_meta.",
      pipelineTitle: "4-этапный конвейер загрузки и импорта",
      pipelineIntro:
        "Проверка и размещение загруженных файлов, имитация без записи в БД и запуск синхронного (<= 250 строк) или фонового импорта.",
      epInspectDesc:
        "Принимает multipart/form-data до 25 МБ (26 214 400 байт), выполняет OWASP/XXE/макро-проверки, сохраняет файл в хранилище и возвращает заголовки, 5 строк примера и автосопоставления.",
      epDryRunDesc:
        "Проверяет схему, 17 правил очистки, пользовательские поля, внешние ключи и квоты для UploadId без изменений в БД.",
      epImportDesc:
        "Запускает одиночный или многолистовой импорт с 2-часовой бронью квоты (TryReserveSlotsAsync / ReconcileReservationLeaseAsync), чанками по 250 строк, онбордингом, отчетом об ошибках и публикацией DataExchangeJobCompletedEvent в Outbox.",
      exportTitle: "Безопасный потоковый экспорт",
      exportIntro:
        "Выгрузка данных на лету или в фоне с изоляцией арендатора, DataScope, фильтрацией FLS и защитой CsvFormulaGuard.",
      epExportSyncDesc:
        "Возвращает .xlsx, .csv или .tsv с нейтрализацией формул и фильтрацией FLS прямо в HTTP-ответе с записью аудита задания.",
      epExportAsyncDesc:
        "Ставит тяжелый экспорт в фоновую очередь (хранение 24 ч) и возвращает HTTP 202 Accepted с объектом DataTransferJobDto.",
      presetsTitle: "Сохраненные пресеты сопоставления",
      presetsIntro:
        "Управление многоразовыми профилями колонок и правил преобразования для арендатора.",
      epListPresetsDesc:
        "Возвращает пресеты арендатора с опциональной фильтрацией по entityKey и search.",
      epSavePresetDesc:
        "Создает или обновляет пресет сопоставления арендатора через скомпилированные проекции DataTransferMaps.",
      epSetDefaultPresetDesc:
        "Атомарно назначает пресет арендатора основным для данного entityKey, снимая флаг с остальных и записывая событие DATA_EXCHANGE_PRESET_DEFAULT_SET.",
      epDeletePresetDesc:
        "Логически удаляет пресет арендатора и возвращает HTTP 204 No Content.",
      jobsTitle: "История заданий, отмена и загрузка артефактов",
      jobsIntro:
        "Отслеживайте прогресс по ProcessedRows и ProgressPercent, отменяйте задания с возвратом неиспользованной квоты и скачивайте файлы.",
      epListJobsDesc:
        "Постраничный список DataTransferJobDto для арендатора (page >= 1, pageSize 1..100) с фильтрами по сущности, поиску и статусу.",
      epGetJobDesc:
        "Возвращает подробную телеметрию, счетчики строк, флаги артефактов и UTC-метки задания.",
      epCancelJobDesc:
        "Инициирует кооперативную отмену задания в очереди или работе, освобождает квоту и записывает событие аудита.",
      epDownloadArtifactDesc:
        "Скачивает книгу ошибок (rejected) или готовый фоновый экспорт (export) в течение 24-часового окна хранения.",
      rateLimitsTitle: "Ограничения нагрузки и защиты от перегрузок",
      rateLimitsIntro:
        "Сводка по размерам файлов, лимитам запросов, порогам синхронного выполнения и срокам хранения файлов.",
      errorCodesTitle: "Канонические коды ошибок и статусы HTTP",
      errorCodesIntro:
        "AstraFlow.AspNetCore преобразует ошибки Result<T> в стандартные HTTP-коды без выбрасывания бизнес-исключений.",
    },
  },
  commercial: {
    dataExchangeStudio: {
      title: "SCRIPE Data Exchange Studio",
      description:
        "Загружайте организации, контакты, сделки CRM и персонал за минуты благодаря нормализации MENA, безопасному Dry-Run и корпоративной безопасности.",
      intro:
        "Перенос таблиц в корпоративные облачные системы часто срывается из-за хрупких CSV-скриптов, сбоев кодировки арабского текста и потери ведущих нулей в телефонах. SCRIPE Data Exchange Studio превращает импорт и экспорт в управляемый, проверяемый и безопасный процесс.",
      statUploadCeiling: "Лимит загрузки с OWASP-проверкой",
      statTransformRules: "Встроенных O(n)-правил очистки",
      statChunkSize: "Изолированный размер пакета фиксации",
      statEntityProviders: "Готовых сущностей CRM, Identity и Party",
      valueTitle: "Почему операционные команды выбирают Data Exchange Studio",
      featDryRunQuota: "Безопасная симуляция Dry-Run",
      featDryRunQuotaDesc:
        "Проверьте валидность строк, баланс вставок и обновлений, внешние связи и расход квот до записи хотя бы одной строки.",
      featMenaBilingual: "Двуязычный интеллект и стандарты MENA",
      featMenaBilingualDesc:
        "Преобразует арабские и персидские цифры, очищает диакритику и скрытые маркеры направления, распознает SAR/EGP/AED/USD и сохраняет нули через текстовый формат @.",
      featMultiSheetDag: "Многолистовая миграция в одной книге",
      featMultiSheetDagDesc:
        "Загружайте организации, людей, клиентов CRM, контакты, лиды, сделки и активности из одного файла Excel с соблюдением порядка зависимостей.",
      featCustomFieldsPresets: "Пользовательские поля и быстрые пресеты",
      featCustomFieldsPresetsDesc:
        "Все настраиваемые поля арендатора подхватываются автоматически, а сохраненные профили позволяют мгновенно повторять типовые выгрузки.",
      featPartialCommit: "Частичная фиксация и отчет по ошибкам",
      featPartialCommitDesc:
        "Корректные строки сохраняются сразу, а проблемные выгружаются в отдельный Excel с указанием строки, колонки, кода ошибки и зависимости.",
      featEnterpriseSecurity: "Защита OWASP Zero-Trust и контроль полей",
      featEnterpriseSecurityDesc:
        "Пресекает макросы, XXE, ZIP-бомбы и инъекцию формул, полностью исключая утечку секретов и ограниченных FLS-полей.",
      tiersTitle: "Возможности по редакциям SCRIPE",
      tiersIntro:
        "Безопасный экспорт и умные шаблоны доступны уже в Sports Starter, полный импорт открывается в Standard и Sports Pro, а многолистовая миграция — в Sports Ultra и Enterprise.",
      ctaTitle: "Ускорьте запуск клиентов и спортивных клубов",
      ctaSubtitle:
        "Изучите тарифные редакции или перейдите к технической архитектуре DataTransfer и документации REST API.",
      ctaPrimary: "Тарифы и редакции",
      ctaSecondary: "Техническая архитектура",
    },
  },
};
