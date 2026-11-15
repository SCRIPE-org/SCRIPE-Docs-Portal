/**
 * SCRIPE Data Exchange Studio & DataTransfer Module Documentation Locales — DE
 * Umfasst Technisches Modul, REST-API-Referenz und Kommerzielle Übersicht.
 */
export const de = {
  modules: {
    dataTransfer: {
      overview: {
        title: "Data Exchange Studio & DataTransfer Engine",
        description:
          "Mandantenfähiger Enterprise-Massenimport und -export, intelligente ClosedXML-Vorlagen, 17-Regel-MENA-Normalisierung, Pre-Flight-Kontingentprüfung, topologische Multi-Sheet-Migration und OWASP-Sicherheit.",
        intro:
          "SCRIPE Data Exchange Studio verbindet ein souveränes Clean-Architecture-Backendmodul (DataTransfer) mit gemeinsamen Core-Engines (Core.Application.DataExchange und Core.Infrastructure.DataExchange) und einem 4-stufigen Vollbild-Studio (@core/data-exchange). Fragile CSV-Skripte werden durch OWASP-gehärtete Verarbeitung, deterministische Normalisierung in linearer Zeit, atomares Kontingent-Leasing und fehlertolerante Chunk-Ausführung über SQL Server, PostgreSQL und Oracle ersetzt.",
        infoTitle: "Mandantenkontext-Grenze & Gemeinsame Core-Architektur",
        infoContent:
          "Endpunkte von Data Exchange und DataTransferMenuProvider-Routen erzwingen RequiresTenantContext = true; Aufrufe ohne aufgelösten Mandanten liefern DataTransfer.TenantRequired (400/422) und zeigen DataExchangeTenantRequiredCard für den Mandantenwechsel durch Platform Super Admins. Streaming, Formel-Neutralisierung, OWASP-ZIP-Prüfung und IEntityDataExchangeProvider liegen entkoppelt in Core.",
        archTitle: "3-Projekte Clean Architecture & AstraFlow-Bindung",
        archIntro:
          "Gemäß den SCRIPE-Backend-Invarianten trennt DataTransfer Domänenentitäten, CQRS-Verträge mit Compile-Time-Mappern und Multi-DB-Infrastruktur strikt auf drei Projekte mit eigenem Schema datatransfer und transaktionalem Outbox/Inbox.",
        featArchitecture: "Strikte 3-Schichten-Modultrennung",
        featArchitectureDesc:
          "DataTransfer.*.csproj halten null Projektreferenzen auf CRM, Identity oder PartyKernel. DataTransfer.Domain modelliert DataTransferJob (emittiert DataExchangeJobCompletedEvent an datatransfer.outbox_messages), SavedMappingPreset und ExternalLegacyKeyMap; DataTransfer.Application verarbeitet 16 AstraFlow-Anfragen per [AstraGenerateMapping] DataTransferMaps; DataTransfer.Infrastructure persistiert in datatransfer auf SQL Server, PostgreSQL und Oracle.",
        featSmartTemplates: "ClosedXML Smart Templates & Field Guide",
        featSmartTemplatesDesc:
          "Erzeugt lokalisierte .xlsx-, .csv- und .tsv-Arbeitsmappen mit Textformat @ (OOXML NumberFormatId 49) zum Schutz führender Nullen und Rufnummern, nativen Excel-Dropdown-Listen (bis Zeile 5.000), zweisprachigem Field Guide und dem versteckten Arbeitsblatt _scripe_meta mit SHA-256 SchemaFingerprint gegen Schema-Drift.",
        featNormalization: "17-Regel-MENA-Normalisierung in linearer Zeit",
        featNormalizationDesc:
          "SpreadsheetValueNormalizer arbeitet deterministisch in O(n) ohne ReDoS-anfällige Regexes: Konvertierung arabischer/persischer Ziffern, Entfernung von Diakritika und BiDi-Steuerzeichen, Null-Kanonisierung, Währungs- und Buchhaltungsklammer-Parsing (SAR/EGP/AED/USD) sowie E.164-Telefonformatierung.",
        featDryRunQuota: "Pre-Flight Dry-Run & Harte Kontingentreservierung",
        featDryRunQuotaDesc:
          "Simuliert Schema, Domänenregeln, Custom Fields und Lizenzlimits ohne Schreibvorgang. Vor der Ausführung reserviert TryReserveSlotsAsync ein atomares 2-Stunden-Lease (Fail-Closed-Erstellung in EnsureCounterAsync für alle 6 kontingentierten Entitäten), das ReconcileReservationLeaseAsync dynamisch abgleicht.",
        featTopologicalDag: "Topologischer Multi-Sheet-DAG & 2-Pass-Self-FK",
        featTopologicalDagDesc:
          "ComputeRelatedMultiSheetEntityKeys erkennt automatisch berechtigte Multi-Sheet-DAG-Cluster (CRM 5 Blätter, PartyKernel 3 Blätter; Identity-Entitäten eigenständig) und aktiviert die Multi-Sheet-Migration automatisch in DataExchangeToolbarActions und EntitiesCatalogView samt TopologicalSortSheets und 2-Pass-Self-FK.",
        featOwaspFls: "OWASP-Upload-Schutz, FLS-Schwärzung & BYOK",
        featOwaspFlsDesc:
          "OwaspSpreadsheetSecurityValidator erzwingt max. 25 MB Upload, 100 MB entpackt / 1.000 Einträge / 100x Kompressionsfaktor, Makro-Blockade, DTD-Verbot, HTML-Bereinigung, CsvFormulaGuard, [AstraSensitive], IRestrictedFieldsResolver sowie mandantenbasierte BYOK-Verschlüsselung vertraulicher cf:*-Felder.",
        domainTitle: "Domänenaggregate & Persistenzschema",
        domainIntro:
          "Alle Entitäten erben von AuditableEntity<Guid> und implementieren ITenantAwareEntity für automatische Mandantenfilter und datenbankübergreifende Migrationen im Schema datatransfer.",
        pipelineTitle: "4-Schritte-Pipeline im Vollbild-Studio",
        pipelineIntro:
          "DataExchangeStudioOverlay steuert den gesamten Prozess von Vorlagendownload und OWASP-Uploadprüfung über Transformationsregeln bis zur Dry-Run-Simulation und Chunk-Ausführung.",
        stepUpload: "Schritt 1 — Vorlage & OWASP-Uploadprüfung",
        stepUploadDesc:
          "Laden Sie eine Einzel- oder Multi-Sheet-Vorlage herunter oder laden Sie .xlsx, .csv oder .tsv (max. 25 MB) hoch. InspectUploadAsync prüft Magic Bytes, extrahiert Spaltenköpfe plus 5 Beispielzeilen und führt ein dreistufiges Matching durch (exakt, Alias, Levenshtein >= 0.72).",
        stepMap: "Schritt 2 — Spaltenzuordnung, Presets & Transformationen",
        stepMapDesc:
          "Ordnen Sie Datei-Header den Deskriptorspalten und Custom Fields (cf:*) zu, definieren Sie 17 DataExchangeTransformRule-Optionen, setzen Sie Standard-Presets über POST /presets/{id}/default oder starten Sie das Studio mit initialPresetId sowie einheitlichem @core/ui/confirmation-dialog.",
        stepDryRun: "Schritt 3 — Pre-Flight Dry-Run & Kontingentprüfung",
        stepDryRunDesc:
          "DryRunAsync validiert jeden Datensatz, Referenzen, Custom Fields und Lizenzkontingente schreibfrei und meldet gültige/ungültige Zeilen, geschätzte Inserts vs. Updates sowie Synchronfähigkeit (<= 250 Zeilen).",
        stepExecute: "Schritt 4 — Teil-Commit-Ausführung & Fehler-Arbeitsmappe",
        stepExecuteDesc:
          "Importiert <= 250 Zeilen synchron (sofern nicht RunInBackground aktiv oder OneTimeAutoPassword > 100) und reiht größere Batches samt Orphan-Recovery in den Worker ein. Jede 250er-Chunk-Einheit isoliert Fehler, persistiert ExternalLegacyKeyMaps (gesichert durch eindeutigen Index und EXTERNAL_KEY_CONFLICT-Vorprüfung) und exportiert _RowNumber, _ErrorCode, _ErrorColumn, _ErrorMessage und _CascadeParentRef (24h TTL).",
        entitiesTitle: "Registrierte Entitäts-Provider & Erweiterbarkeit",
        entitiesIntro:
          "Zehn Domänen-Provider sind für CRM, Identity und PartyKernel integriert; weitere Module implementieren direkt IEntityDataExchangeProvider (der ältere EfCoreEntityDataExchangeProviderBase-Helper ist in Produktion ungenutzt).",
        normalizationTitle: "Deklarativer 17-Regel-Transformationsvertrag",
        normalizationIntro:
          "Jede DataExchangeColumnMapping kann eine DataExchangeTransformRule enthalten, die vor der strikten Typvalidierung in linearer Zeit ausgeführt wird.",
        securityTitle: "OWASP-Grenzwerte, Sperrliste & FLS",
        securityIntro:
          "Sicherheitsrichtlinien gelten identisch für API-Uploads, Hintergrund-Worker (über DataExchangeAmbientContext aus ActorSnapshotJson) und formelsichere Exporte.",
        securityWarnTitle: "Unveränderlichkeit von Zugangsdaten & Systemfeldern",
        securityWarnContent:
          "DataExchangeSecurityPolicy blockiert Passwort-Hashes, Security Stamps, API-Keys, TOTP-Secrets, Audit-Spalten, RowVersion und alle [AstraSensitive]/[AstraRedact]-Felder. LooksLikeMaskedSentinel verhindert das Überschreiben realer Geheimnisse bei Updates.",
        governanceTitle: "PBAC-Berechtigungen, Feature-Flags & Admin-Menü",
        governanceIntro:
          "DataTransferPermissionProvider (7 Standardrollen inkl. CRM_SALES_REP; 6 Rollen ohne CRM_SALES_REP für migrations.execute), DataTransferFeatureProvider, DataTransferMenuProvider (RequiresTenantContext = true) und DataTransferDevDataSeeder (Order = 155) erzwingen [Authorize] + [PermissionRequired] ohne [AdminOnly] auf GenericCrudView samt gehärteter Paginierung (Showing 0-0 of 0 results).",
        tenantContextTitle: "Mandantenspezifische Ausführung & Platform-Super-Admin-Workflow",
        tenantContextContent:
          "Alle Entitäten, Jobs, Presets und ExternalLegacyKeyMap-Einträge sind mandantengebunden; souveräne Plattformtabellen sperrt DataExchangeSecurityPolicy. Im globalen Plattformkontext wählen Platform Super Admins zuerst über den Tenant Switcher einen Zielmandanten (oder folgen dem Hinweis in DataExchangeTenantRequiredCard).",
        recoveryTitle: "Sicherheitsmodell: Dry-Run, Teil-Commit-Chunks & Abbruch (Kein globaler Post-Rollback)",
        recoveryContent:
          "DataTransfer verzichtet bewusst auf einen destruktiven Post-Completion-Rollback-Job, der parallele Änderungen überschreiben könnte. Stattdessen prüft DryRunAsync schreibfrei vorab, ExecuteImport bucht isolierte 250er-Chunks samt herunterladbarer Fehler-Arbeitsmappe (.xlsx), und POST /jobs/{id}/cancel gibt per ReconcileReservationLeaseAsync ungenutztes Kontingent frei sowie ruft DetachPendingOutboxMessages() auf.",
        outboxTitle: "Zero-Coupling Plugin-Architektur & Outbox-Integration",
        outboxIntro:
          "DataTransfer erkennt Domänenentitäten über Core.Application-Verträge und publiziert Job-Abschlüsse asynchron über das eigene Outbox-Schema — komplett ohne Querverweise im Backend oder Frontend.",
        adminSurfacesTitle: "Warum der Entity-Katalog schreibgeschützt ist & wie die Ansichten arbeiten",
        adminSurfacesIntro:
          "Der Entity-Katalog (/admin/data-exchange) wird dynamisch aus DI-Providern und Edition-Rechten aufgebaut, benutzerdefinierte Spalten stammen aus /custom-fields, und Jobs (/jobs) sowie Mapping-Presets (/presets) entstehen direkt aus Studio- und Toolbar-Aktionen.",
        dagComparisonTitle: "Einzelentitäts-Import vs. Topologische Multi-Sheet-Migration (DAG)",
        dagComparisonIntro:
          "Beide Modi teilen OWASP-Prüfung, Normalisierung und 250er-Chunks; die Multi-Sheet-Migration schaltet sich über ComputeRelatedMultiSheetEntityKeys dynamisch frei, sobald ein Modul-Cluster mindestens zwei berechtigte Tabellen umfasst.",
        dynamicMatrixTitle: "Dynamisches Laufzeitverhalten vs. hartkodierte Sicherheitsgrenzen",
        dynamicMatrixIntro:
          "Katalog, Custom Fields, Rechte, Kontingente und DAG-Cluster passen sich dynamisch an Mandant und Rolle an, während OWASP-Schwellen, O(n)-Normalisierung und Secret-Sperrlisten unveränderlich geschützt bleiben.",
        normalizationPipelineTitle: "Deterministische 9-Stufen-O(n)-Ausführungsreihenfolge",
        normalizationPipelineIntro:
          "Aktivierte DataExchangeTransformRule-Regeln laufen sequenziell in linearer Zeit vor dem strikten Typ-Parsing, sodass MENA-Schriften, Währungen, Telefonnummern und Zeitzonen in Vorschau, Dry-Run und Worker identisch normalisiert werden.",
        editionsTitle: "Editions-Berechtigungsmatrix (EditionSeeder)",
        editionsIntro:
          "Verfügbare Studio-Funktionen werden dynamisch über das Entitlements-System je Mandanten-Edition freigeschaltet.",
      },
    },
  },
  apiReference: {
    dataTransferApi: {
      title: "Data Exchange Studio API",
      description:
        "Vollständige REST-API-Referenz für SCRIPE Data Exchange Studio (/api/v1/data-transfer): Deskriptoren, Vorlagen, OWASP-Inspektion, Dry-Run, Import/Export, Presets und Job-Telemetrie.",
      intro:
        "Der DataTransferController stellt 16 REST-Endpunkte unter /api/v1/data-transfer (API v1.0) über AstraFlow Mediator bereit und liefert konsistente Result<T>-Antworten mit RFC-7807-Fehlerdetails.",
      authNoteTitle: "Authentifizierung, Mandantenauflösung & Rate-Limits",
      authNote:
        "Alle Endpunkte verlangen [Authorize], [PermissionRequired(\"datatransfer.*\")] und einen aktiven Mandantenkontext — [AdminOnly] wurde entfernt, sodass alle 7 autorisierten Rollen inkl. CRM_SALES_REP arbeiten (6 Rollen ohne CRM_SALES_REP für migrations.execute; fehlender Mandant liefert DataTransfer.TenantRequired, unbekannte Entität DataTransfer.UnknownEntity 404). Es gelten per-user (100 Req/Min), export-heavy (5 Req/Min) und X-Content-Type-Options: nosniff.",
      discoveryTitle: "Entitätenerkennung, Deskriptoren & Smart Templates",
      discoveryIntro:
        "Berechtigte Entitäten abfragen, effektive Deskriptoren inklusive Custom Fields (cf:*) und FLS-Maskierung laden und formatierte Vorlagen exportieren.",
      epListEntitiesDesc:
        "Listet alle für Berechtigungen und Edition des Aufrufers freigeschalteten Data-Exchange-Entitäten samt topologisch sortiertem relatedMultiSheetEntityKeys-Cluster und Restkontingent auf.",
      epGetDescriptorDesc:
        "Liefert DataExchangeEntityDescriptor, relatedMultiSheetEntityKeys, gesperrte FLS-Felder, Feature-Flags und aktuelle Kontingentzähler.",
      epDownloadTemplateDesc:
        "Streamt lokalisierte Einzel- oder Multi-Sheet-Vorlagen (.xlsx, .csv, .tsv) mit Textformat @, Excel-Dropdowns, Field Guide und _scripe_meta.",
      pipelineTitle: "4-stufige Import-Aufnahmepipeline",
      pipelineIntro:
        "Dateien sicher prüfen und zwischenspeichern, schreibfreie Simulationen ausführen und Teil-Commit-Importe synchron (<= 250 Zeilen) oder asynchron starten.",
      epInspectDesc:
        "Prüft multipart/form-data bis 25 MB (26.214.400 Bytes) nach OWASP-Regeln, speichert im Blob Storage und liefert Spalten, 5 Beispielzeilen und Mapping-Vorschläge.",
      epDryRunDesc:
        "Simuliert Schemaprüfung, 17-Regel-Transformation, Custom-Field-Checks, Lookup-Auflösung und Kontingentprüfung ohne DB-Schreibzugriff.",
      epImportDesc:
        "Startet Einzel- oder Multi-Sheet-Importe mit 2h-Lease via TryReserveSlotsAsync / ReconcileReservationLeaseAsync, 250er-Chunks, optionalem Identity-Onboarding, Fehler-Arbeitsmappe und Outbox-Event DataExchangeJobCompletedEvent.",
      exportTitle: "Formelsichere Streaming-Exporte",
      exportIntro:
        "On-Demand- oder Hintergrundexporte mit automatischer Mandanten-, DataScope-, FLS-Filterung und CsvFormulaGuard.",
      epExportSyncDesc:
        "Streamt formelneutralisierte, FLS-gefilterte .xlsx-, .csv- oder .tsv-Exporte direkt zurück und protokolliert einen abgeschlossenen Audit-Job.",
      epExportAsyncDesc:
        "Stellt umfangreiche Exporte in die Hintergrundwarteschlange (24h Blob-TTL) und antwortet mit HTTP 202 Accepted.",
      presetsTitle: "Gespeicherte Spalten-Mapping-Presets",
      presetsIntro:
        "Verwalten Sie mandantenspezifische Mapping-Profile und Spalten-Transformationsregeln zur Wiederverwendung.",
      epListPresetsDesc:
        "Listet mandanteneigene Mapping-Presets auf, optional gefiltert nach entityKey oder search.",
      epSavePresetDesc:
        "Erstellt oder aktualisiert ein mandantenspezifisches Mapping-Preset via Compile-Time DataTransferMaps.",
      epSetDefaultPresetDesc:
        "Erhebt ein mandanteneigenes Mapping-Preset atomar zum Standard für denselben entityKey, deaktiviert bisherige Standards und protokolliert DATA_EXCHANGE_PRESET_DEFAULT_SET.",
      epDeletePresetDesc:
        "Löscht ein gespeichertes Mapping-Preset per Soft-Delete und liefert HTTP 204 No Content.",
      jobsTitle: "Job-Historie, Abbruch & Artefakt-Downloads",
      jobsIntro:
        "Überwachen Sie aktive Hintergrundjobs über ProcessedRows und ProgressPercent, brechen Sie Jobs inklusive Kontingentfreigabe ab und laden Sie Ergebnisdateien herunter.",
      epListJobsDesc:
        "Paginierte Liste von DataTransferJobDto für den Mandanten (page >= 1, pageSize 1..100), filterbar nach Entität, Suche und Status.",
      epGetJobDesc:
        "Ruft Zeilenzähler, Fortschritt, Artefakt-Flags und UTC-Zeitstempel eines einzelnen Jobs ab.",
      epCancelJobDesc:
        "Fordert kooperativen Abbruch eines wartenden oder laufenden Jobs an, gibt ungenutzte Kontingente frei und schreibt ein Sicherheits-Audit-Event.",
      epDownloadArtifactDesc:
        "Lädt innerhalb des 24h-Aufbewahrungsfensters entweder die Fehler-Arbeitsmappe (rejected) oder die fertige Exportdatei (export) herunter.",
      rateLimitsTitle: "Nutzlast- & Rate-Limit-Schutzgrenzen",
      rateLimitsIntro:
        "Übersicht aller erzwungenen Upload-Grenzen, Rate-Limit-Richtlinien, Synchron-Schwellwerte und Aufbewahrungsfristen.",
      errorCodesTitle: "Kanonische Fehlercodes & HTTP-Status",
      errorCodesIntro:
        "AstraFlow.AspNetCore übersetzt Result<T>-Fehler konsistent in standardisierte HTTP-Statuscodes ohne Geschäfts-Exceptions.",
    },
  },
  commercial: {
    dataExchangeStudio: {
      title: "SCRIPE Data Exchange Studio",
      description:
        "Übernehmen Sie Organisationen, Kontakte, CRM-Pipelines und Teams in Minuten – mit MENA-Normalisierung, risikofreiem Dry-Run und Enterprise-Sicherheit.",
      intro:
        "Tabellenmigrationen in Mandantensoftware scheitern oft an fehlerhaften CSV-Skripten, defektem Arabisch-Encoding und verlorenen führenden Nullen bei Rufnummern. SCRIPE Data Exchange Studio macht Import, Bereinigung und Export zu einem geführten, revisionssicheren Studio direkt im Portal.",
      statUploadCeiling: "OWASP-geprüftes Upload-Limit",
      statTransformRules: "Integrierte O(n)-Bereinigungsregeln",
      statChunkSize: "Fehlertolerante Chunk-Größe",
      statEntityProviders: "Sofort nutzbare CRM-, Identity- & Party-Entitäten",
      valueTitle: "Warum Betriebsteams auf Data Exchange Studio setzen",
      featDryRunQuota: "Risikofreier Pre-Flight Dry-Run",
      featDryRunQuotaDesc:
        "Prüfen Sie gültige Zeilen, erwartete Neuanlagen vs. Updates, Lookup-Treffer und Kontingente, bevor ein einziger Datensatz geschrieben wird.",
      featMenaBilingual: "Zweisprachige MENA-Tabellenintelligenz",
      featMenaBilingualDesc:
        "Konvertiert arabische/persische Ziffern, entfernt Diakritika und versteckte Steuerzeichen, bereinigt SAR/EGP/AED/USD-Beträge und schützt führende Nullen per @-Textformat.",
      featMultiSheetDag: "Multi-Sheet-Migration in einer Arbeitsmappe",
      featMultiSheetDagDesc:
        "Importieren Sie Organisationen, Personen, CRM-Accounts, Kontakte, Leads, Chancen und Aktivitäten in einer einzigen Excel-Datei mit topologischer Reihenfolge.",
      featCustomFieldsPresets: "Custom Fields & Mapping-Presets auf Klick",
      featCustomFieldsPresetsDesc:
        "Alle Mandanten-Custom-Fields werden automatisch erkannt und validiert. Einmal eingerichtete Presets lassen sich für wiederkehrende ERP-Exporte sofort wiederverwenden.",
      featPartialCommit: "Teil-Commits & sofortige Fehler-Arbeitsmappen",
      featPartialCommitDesc:
        "Korrekte Datensätze werden direkt übernommen, während fehlerhafte Zeilen markiert samt Fehlercode, Spalte und Elternabhängigkeit heruntergeladen werden können.",
      featEnterpriseSecurity: "Zero-Trust OWASP & Feldsicherheit",
      featEnterpriseSecurityDesc:
        "Blockiert Makros, XXE-Payloads, ZIP-Bomben und Formel-Injection und hält Passwort-Hashes, Tokens und FLS-gesperrte Felder strikt aus Dateien fern.",
      tiersTitle: "Leistungsumfang nach SCRIPE-Edition",
      tiersIntro:
        "Formelsichere Exporte und Smart Templates starten bereits in Sports Starter; vollständige Importautomatisierung folgt in Standard und Sports Pro, Multi-Sheet-Migration in Sports Ultra und Enterprise.",
      ctaTitle: "Kunden- und Vereins-Onboarding drastisch beschleunigen",
      ctaSubtitle:
        "Vergleichen Sie unsere Lizenzstufen oder erkunden Sie die DataTransfer-Architektur und REST-API-Dokumentation.",
      ctaPrimary: "Preise & Editionen ansehen",
      ctaSecondary: "Technische Architektur öffnen",
    },
  },
};
