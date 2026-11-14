/**
 * SCRIPE Data Exchange Studio & DataTransfer Module Documentation Locales — ES
 * Cubre Módulo Técnico, Referencia API REST y Escaparate Comercial.
 */
export const es = {
  modules: {
    dataTransfer: {
      overview: {
        title: "Estudio de Intercambio de Datos y Motor DataTransfer",
        description:
          "Importación y exportación masiva multiinquilino, plantillas inteligentes ClosedXML, normalización MENA de 17 reglas, simulación Dry-Run, migración topológica multihoja y seguridad OWASP.",
        intro:
          "SCRIPE Data Exchange Studio une un módulo backend Clean Architecture (DataTransfer) con motores compartidos en Core (Core.Application.DataExchange y Core.Infrastructure.DataExchange) y un estudio frontend a pantalla completa de 4 pasos (@core/data-exchange). Sustituye scripts CSV frágiles por ingesta endurecida según OWASP, normalización lineal determinista, reserva atómica de cuotas y ejecución por lotes aislados en SQL Server, PostgreSQL y Oracle.",
        infoTitle: "Frontera de Contexto de Inquilino y Núcleo Compartido",
        infoContent:
          "Los endpoints y rutas de DataTransferMenuProvider exigen RequiresTenantContext = true; las llamadas sin inquilino devuelven DataTransfer.TenantRequired (400/422) y muestran DataExchangeTenantRequiredCard guiando al Super Admin de Plataforma para elegir un inquilino. La transmisión, neutralización de fórmulas, validación ZIP OWASP, IEntityDataExchangeProvider y EfCoreEntityDataExchangeProviderBase<TEntity, TDbContext> viven desacoplados en Core.",
        archTitle: "Clean Architecture de 3 Proyectos y Bloqueo AstraFlow",
        archIntro:
          "Conforme a las invariantes de SCRIPE, DataTransfer separa entidades de dominio, contratos CQRS con mapeadores en tiempo de compilación e infraestructura multi-BD en tres proyectos aislados bajo el esquema datatransfer con Outbox/Inbox transaccional.",
        featArchitecture: "Aislamiento Modular Estricto en 3 Capas",
        featArchitectureDesc:
          "DataTransfer.*.csproj no referencian los proyectos de CRM, Identity ni PartyKernel. DataTransfer.Domain modela DataTransferJob (emite DataExchangeJobCompletedEvent a datatransfer.outbox_messages), SavedMappingPreset y ExternalLegacyKeyMap; DataTransfer.Application ejecuta 16 solicitudes AstraFlow con [AstraGenerateMapping] DataTransferMaps; DataTransfer.Infrastructure persiste en datatransfer sobre SQL Server, PostgreSQL y Oracle.",
        featSmartTemplates: "Plantillas Inteligentes ClosedXML y Guía de Campos",
        featSmartTemplatesDesc:
          "Genera libros localizados .xlsx, .csv y .tsv con formato de texto @ (OOXML NumberFormatId 49) para proteger ceros iniciales y teléfonos, listas desplegables nativas en Excel (hasta la fila 5.000), hoja bilingüe Field Guide y hoja muy oculta _scripe_meta.",
        featNormalization: "Normalización MENA Lineal de 17 Reglas",
        featNormalizationDesc:
          "SpreadsheetValueNormalizer opera en tiempo lineal O(n) sin expresiones regulares vulnerables a ReDoS: convierte dígitos árabes/persas, limpia diacríticos y controles BiDi, canoniza nulos, interpreta divisas SAR/EGP/AED/USD y negativos contables, y normaliza teléfonos E.164.",
        featDryRunQuota: "Simulación Dry-Run y Arrendamiento Estricto de Cuotas",
        featDryRunQuotaDesc:
          "Simula esquema, dominio, campos personalizados y límites de licencia sin escribir filas. Antes de ejecutar, TryReserveSlotsAsync reserva una cuota de 2 horas reconciliada dinámicamente por ReconcileReservationLeaseAsync.",
        featTopologicalDag: "DAG Topológico Multihoja y Auto-FK en 2 Pasadas",
        featTopologicalDagDesc:
          "ComputeRelatedMultiSheetEntityKeys descubre automáticamente clústeres DAG multihoja autorizados (CRM 5 hojas, PartyKernel 3 hojas, Identity 2 hojas) y activa la migración multihoja automáticamente en DataExchangeToolbarActions y EntitiesCatalogView con TopologicalSortSheets y Auto-FK en 2 pasadas.",
        featOwaspFls: "Defensa OWASP de Carga y Censura FLS",
        featOwaspFlsDesc:
          "OwaspSpreadsheetSecurityValidator exige máx. 25 MB, 100 MB descomprimidos / 1.000 entradas / ratio 100x, bloqueo de macros y DTD/XXE, saneamiento HTML y neutralización CsvFormulaGuard junto con [AstraSensitive] e IRestrictedFieldsResolver.",
        domainTitle: "Raíces de Agregado y Esquema de Persistencia",
        domainIntro:
          "Todas las entidades heredan AuditableEntity<Guid> e implementan ITenantAwareEntity, aplicando filtros de inquilino y migraciones en SQL Server, PostgreSQL y Oracle dentro del esquema datatransfer.",
        pipelineTitle: "Pipeline del Estudio en 4 Pasos",
        pipelineIntro:
          "DataExchangeStudioOverlay dirige la ingesta completa desde la descarga de plantillas o inspección OWASP hasta las reglas de transformación, simulación sin escritura y ejecución por lotes.",
        stepUpload: "Paso 1 — Descarga de Plantilla e Inspección OWASP",
        stepUploadDesc:
          "Descargue plantillas inteligentes o suba archivos .xlsx, .csv o .tsv (máx. 25 MB). InspectUploadAsync verifica firmas binarias, extrae cabeceras y 5 filas de muestra y ejecuta emparejamiento en 3 niveles (exacto, alias, Levenshtein >= 0.72).",
        stepMap: "Paso 2 — Mapeo de Columnas, Presets y Transformaciones",
        stepMapDesc:
          "Asocie encabezados con columnas del descriptor y campos personalizados (cf:*), configure las 17 reglas DataExchangeTransformRule, fije presets predeterminados vía POST /presets/{id}/default o inicie el estudio con initialPresetId y confirmación unificada @core/ui/confirmation-dialog.",
        stepDryRun: "Paso 3 — Simulación Dry-Run y Control de Cuotas",
        stepDryRunDesc:
          "DryRunAsync valida tipos, búsquedas referenciales, campos personalizados y cuotas antes de tocar la base de datos, informando filas válidas/inválidas, altas vs. actualizaciones y elegibilidad síncrona (<= 250 filas).",
        stepExecute: "Paso 4 — Ejecución con Commit Parcial y Libro de Rechazados",
        stepExecuteDesc:
          "Importa <= 250 filas síncronamente (salvo RunInBackground o límite <= 100 para OneTimeAutoPassword) y encola lotes mayores. Cada lote de 250 filas aísla errores y genera un .xlsx con _RowNumber, _ErrorCode, _ErrorColumn, _ErrorMessage y _CascadeParentRef (TTL 24h).",
        entitiesTitle: "Proveedores Registrados y Extensibilidad",
        entitiesIntro:
          "Diez entidades de dominio integradas en CRM, Identity y PartyKernel; nuevos módulos solo heredan de EfCoreEntityDataExchangeProviderBase<TEntity, TDbContext>.",
        normalizationTitle: "Contrato Declarativo de 17 Reglas de Transformación",
        normalizationIntro:
          "Cada DataExchangeColumnMapping admite un registro DataExchangeTransformRule ejecutado en tiempo lineal antes del análisis estricto de tipos.",
        securityTitle: "Límites OWASP, Lista de Exclusión y FLS",
        securityIntro:
          "Los controles operan por igual en subidas API, trabajadores en segundo plano (mediante DataExchangeAmbientContext restaurado desde ActorSnapshotJson) y exportaciones protegidas.",
        securityWarnTitle: "Inmutabilidad de Credenciales y Campos del Sistema",
        securityWarnContent:
          "DataExchangeSecurityPolicy bloquea hashes de contraseñas, stamps de seguridad, claves API, secretos TOTP, auditoría, RowVersion y miembros marcados con [AstraSensitive] o [AstraRedact]. LooksLikeMaskedSentinel impide sobrescribir secretos durante actualizaciones.",
        governanceTitle: "Permisos PBAC, Banderas de Función y Menú de Administración",
        governanceIntro:
          "DataTransferPermissionProvider (7 roles estándar incl. CRM_SALES_REP; 6 roles excluyendo CRM_SALES_REP para migrations.execute), DataTransferFeatureProvider, DataTransferMenuProvider (RequiresTenantContext = true) y DataTransferDevDataSeeder (Order = 155) aplican [Authorize] + [PermissionRequired] sin [AdminOnly] sobre GenericCrudView con paginación segura (Showing 0-0 of 0 results).",
        tenantContextTitle: "Alcance por Inquilino y Flujo del Super Admin de Plataforma",
        tenantContextContent:
          "Cada entidad, trabajo, preset y ExternalLegacyKeyMap pertenece a un inquilino; las tablas soberanas están bloqueadas por DataExchangeSecurityPolicy. En contexto global de plataforma, el Super Admin selecciona primero el inquilino en el Tenant Switcher superior o sigue DataExchangeTenantRequiredCard.",
        recoveryTitle: "Modelo de Seguridad: Dry-Run, Lotes Parciales y Cancelación (Sin Rollback Global Posterior)",
        recoveryContent:
          "DataTransfer evita intencionalmente un rollback destructivo tras completar la carga que pudiera revertir cambios concurrentes. DryRunAsync valida antes de escribir, ExecuteImport confirma lotes aislados de 250 filas con libro .xlsx de rechazados y POST /jobs/{id}/cancel reconcilia la cuota con ReconcileReservationLeaseAsync junto a DetachPendingOutboxMessages().",
        outboxTitle: "Arquitectura de Plugins sin Acoplamiento e Integración Outbox",
        outboxIntro:
          "DataTransfer descubre entidades mediante contratos de Core.Application y publica eventos de cierre por su Outbox sin referencias entre módulos en backend ni frontend.",
        adminSurfacesTitle: "Por Qué el Catálogo es de Solo Lectura y Cómo Funciona Cada Pantalla",
        adminSurfacesIntro:
          "El Catálogo (/admin/data-exchange) se autogenera desde proveedores DI y derechos de edición, las columnas personalizadas vienen de /custom-fields y Trabajos (/jobs) y Presets (/presets) nacen directamente del Estudio y las barras de módulos.",
        dagComparisonTitle: "Importación Individual vs Migración Topológica Multihoja (DAG)",
        dagComparisonIntro:
          "Ambos flujos comparten OWASP, normalización y lotes de 250 filas; la migración multihoja se activa dinámicamente vía ComputeRelatedMultiSheetEntityKeys cuando el clúster autorizado abarca dos o más entidades relacionadas.",
        dynamicMatrixTitle: "Comportamiento Dinámico en Ejecución vs Límites de Seguridad Fijos",
        dynamicMatrixIntro:
          "Catálogo, campos personalizados, permisos, cuotas y clústeres DAG se adaptan dinámicamente al inquilino, mientras que topes OWASP, normalizador O(n) y listas negras permanecen inmutables.",
        normalizationPipelineTitle: "Orden Secuencial Determinista en 9 Etapas O(n)",
        normalizationPipelineIntro:
          "Las opciones activas de DataExchangeTransformRule se ejecutan en orden lineal antes del tipado estricto para limpiar escritura MENA, divisas, teléfonos y fechas de forma idéntica en vista previa, dry-run y worker.",
        editionsTitle: "Matriz de Capacidades por Edición (EditionSeeder)",
        editionsIntro:
          "Las capacidades se evalúan dinámicamente en el motor de derechos según el plan contratado por el inquilino.",
      },
    },
  },
  apiReference: {
    dataTransferApi: {
      title: "API de Data Exchange Studio",
      description:
        "Referencia completa de API REST para SCRIPE Data Exchange Studio (/api/v1/data-transfer): descriptores, plantillas, inspección OWASP, dry-run, importación/exportación, presets e historial.",
      intro:
        "DataTransferController expone 16 endpoints REST bajo /api/v1/data-transfer (API v1.0) despachados exclusivamente por AstraFlow Mediator devolviendo sobres Result<T> y errores RFC-7807.",
      authNoteTitle: "Autenticación, Contexto de Inquilino y Límites de Tasa",
      authNote:
        "Todos los endpoints exigen [Authorize], [PermissionRequired(\"datatransfer.*\")] y contexto de inquilino activo — se eliminó [AdminOnly] para admitir los 7 roles autorizados incl. CRM_SALES_REP (6 roles excluyéndolo en migrations.execute; sin inquilino devuelve DataTransfer.TenantRequired y entidad desconocida DataTransfer.UnknownEntity 404). Se aplican per-user (100 req/min), export-heavy (5 req/min) y X-Content-Type-Options: nosniff.",
      discoveryTitle: "Descubrimiento de Entidades, Descriptores y Plantillas",
      discoveryIntro:
        "Consulte entidades autorizadas, obtenga descriptores combinados con Custom Fields (cf:*) y restricciones FLS, y descargue plantillas.",
      epListEntitiesDesc:
        "Lista las entidades disponibles filtradas por permisos y edición del inquilino, incluyendo relatedMultiSheetEntityKeys ordenadas topológicamente, cuotas restantes y banderas.",
      epGetDescriptorDesc:
        "Devuelve DataExchangeEntityDescriptor efectivo, clúster relatedMultiSheetEntityKeys, claves restringidas FLS, banderas de función y contadores de cuota.",
      epDownloadTemplateDesc:
        "Transmite una plantilla localizada (.xlsx, .csv o .tsv) simple o multihoja ordenada topológicamente con formato @, desplegables Excel, Field Guide y _scripe_meta.",
      pipelineTitle: "Pipeline de Ingesta de 4 Pasos",
      pipelineIntro:
        "Valide cargas en almacenamiento temporal, simule sin escrituras y ejecute importaciones síncronas (<= 250 filas) o en segundo plano.",
      epInspectDesc:
        "Acepta multipart/form-data hasta 25 MB (26.214.400 bytes), ejecuta validaciones OWASP contra XXE/macros y devuelve hojas, cabeceras, 5 muestras y mapeos sugeridos.",
      epDryRunDesc:
        "Simula validación de esquema, 17 reglas de limpieza, Custom Fields, búsquedas y cuotas sobre un UploadId sin persistir cambios.",
      epImportDesc:
        "Ejecuta importaciones simples o multihoja con reserva de cuota de 2 horas (TryReserveSlotsAsync / ReconcileReservationLeaseAsync), lotes de 250 filas, onboarding opcional, libro de rechazados y emisión Outbox de DataExchangeJobCompletedEvent.",
      exportTitle: "Exportaciones en Streaming Protegidas",
      exportIntro:
        "Genere exportaciones síncronas o en segundo plano filtradas automáticamente por inquilino, DataScope, FLS y CsvFormulaGuard.",
      epExportSyncDesc:
        "Transmite un archivo .xlsx, .csv o .tsv protegido contra inyección de fórmulas y redactado por FLS directamente en HTTP y registra el trabajo.",
      epExportAsyncDesc:
        "Encola una exportación pesada para procesamiento en segundo plano (retención 24h) devolviendo HTTP 202 Accepted con DataTransferJobDto.",
      presetsTitle: "Presets de Mapeo de Columnas Guardados",
      presetsIntro:
        "Administre perfiles reutilizables de mapeo y transformación dentro del alcance del inquilino.",
      epListPresetsDesc:
        "Lista los presets de mapeo guardados del inquilino, filtrables por entityKey o search.",
      epSavePresetDesc:
        "Crea o actualiza un preset del inquilino usando proyecciones compiladas de DataTransferMaps.",
      epSetDefaultPresetDesc:
        "Marca de forma atómica un preset del inquilino como predeterminado para su entityKey, desmarcando los anteriores y auditando DATA_EXCHANGE_PRESET_DEFAULT_SET.",
      epDeletePresetDesc:
        "Elimina lógicamente un preset del inquilino y devuelve HTTP 204 No Content.",
      jobsTitle: "Historial de Trabajos, Cancelación y Descarga de Artefactos",
      jobsIntro:
        "Supervise el progreso en segundo plano mediante ProcessedRows y ProgressPercent, cancele trabajos liberando cuota y descargue libros generados.",
      epListJobsDesc:
        "Lista paginada de DataTransferJobDto del inquilino (page >= 1, pageSize 1..100) filtrable por entidad, búsqueda y estado.",
      epGetJobDesc:
        "Obtiene métricas detalladas, contadores de filas, indicadores de artefactos y marcas UTC de un trabajo.",
      epCancelJobDesc:
        "Solicita cancelación cooperativa de un trabajo en cola o ejecución, reconcilia la cuota reservada y registra auditoría.",
      epDownloadArtifactDesc:
        "Descarga el libro de errores (rejected) o la exportación en segundo plano (export) dentro de las 24 horas de retención.",
      rateLimitsTitle: "Límites de Carga y Protección de Tasa",
      rateLimitsIntro:
        "Resumen de límites de archivo, políticas de limitación de peticiones, umbrales síncronos y vigencia de artefactos.",
      errorCodesTitle: "Códigos de Error Canónicos y Mapeo HTTP",
      errorCodesIntro:
        "AstraFlow.AspNetCore traduce fallos de Result<T> en respuestas HTTP uniformes sin lanzar excepciones de negocio.",
    },
  },
  commercial: {
    dataExchangeStudio: {
      title: "SCRIPE Data Exchange Studio",
      description:
        "Incorpore organizaciones, contactos, embudos CRM y plantillas en minutos con normalización MENA, simulación Dry-Run sin riesgos y seguridad empresarial.",
      intro:
        "Migrar hojas de cálculo hacia software empresarial multiinquilino suele implicar scripts frágiles, codificación árabe rota y ceros perdidos en teléfonos. SCRIPE Data Exchange Studio convierte la carga y exportación masiva en una experiencia guiada, auditable y segura integrada en su portal.",
      statUploadCeiling: "Límite de Carga Analizado por OWASP",
      statTransformRules: "Reglas Lineales de Limpieza Integradas",
      statChunkSize: "Tamaño de Lote Aislado por Fallos",
      statEntityProviders: "Entidades CRM, Identidad y Directorio Listas",
      valueTitle: "Por Qué los Equipos de Operaciones Eligen Data Exchange Studio",
      featDryRunQuota: "Simulación Dry-Run Sin Riesgos",
      featDryRunQuotaDesc:
        "Previsualice filas válidas, altas frente a actualizaciones, resolución de relaciones y consumo de cuota antes de modificar la base de datos.",
      featMenaBilingual: "Inteligencia Bilingüe y Formato MENA",
      featMenaBilingualDesc:
        "Convierte dígitos árabes/persas, limpia diacríticos y controles direccionales ocultos, normaliza importes SAR/EGP/AED/USD y protege teléfonos con formato de texto @.",
      featMultiSheetDag: "Migración Multihoja en un Solo Libro",
      featMultiSheetDagDesc:
        "Importe organizaciones, personas, cuentas CRM, contactos, leads, oportunidades y actividades en un único Excel con orden topológico garantizado.",
      featCustomFieldsPresets: "Campos Personalizados y Presets Reutilizables",
      featCustomFieldsPresetsDesc:
        "Cada campo personalizado del inquilino se detecta automáticamente para mapearlo y validarlo, guardando plantillas reutilizables en un clic.",
      featPartialCommit: "Commit Parcial y Libro Instantáneo de Errores",
      featPartialCommitDesc:
        "Las filas válidas se confirman sin bloquear todo el archivo y las rechazadas se descargan marcadas por fila, columna, código de error y dependencia padre.",
      featEnterpriseSecurity: "Protección OWASP Zero-Trust y Seguridad por Campo",
      featEnterpriseSecurityDesc:
        "Bloquea macros, ataques XXE, bombas ZIP e inyección de fórmulas evitando además que secretos o columnas FLS protegidas entren o salgan en un archivo.",
      tiersTitle: "Capacidades por Edición de SCRIPE",
      tiersIntro:
        "Las exportaciones seguras y plantillas inteligentes comienzan desde Sports Starter, la importación completa se desbloquea en Standard y Sports Pro, y la migración topológica multihoja escala en Sports Ultra y Enterprise.",
      ctaTitle: "Acelere el Onboarding de Clubes y Clientes",
      ctaSubtitle:
        "Explore las ediciones de licencia o profundice en la arquitectura limpia de DataTransfer y la especificación API REST.",
      ctaPrimary: "Ver Planes y Ediciones",
      ctaSecondary: "Explorar Arquitectura Técnica",
    },
  },
};
