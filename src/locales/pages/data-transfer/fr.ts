/**
 * SCRIPE Data Exchange Studio & DataTransfer Module Documentation Locales — FR
 * Couvre le Module Technique, la Référence API REST et la Vitrine Commerciale.
 */
export const fr = {
  modules: {
    dataTransfer: {
      overview: {
        title: "Studio d'Échange de Données & Moteur DataTransfer",
        description:
          "Importation et exportation en masse multi-locataires, modèles intelligents ClosedXML, normalisation MENA en 17 règles, simulation Dry-Run, migration topologique multi-feuilles et sécurité OWASP.",
        intro:
          "SCRIPE Data Exchange Studio associe un module backend Clean Architecture (DataTransfer) aux moteurs partagés Core (Core.Application.DataExchange et Core.Infrastructure.DataExchange) et à un studio frontend plein écran en 4 étapes (@core/data-exchange). Il remplace les scripts CSV fragiles par une ingestion durcie OWASP, une normalisation linéaire déterministe, une réservation atomique de quotas et une exécution par lots isolés sur SQL Server, PostgreSQL et Oracle.",
        infoTitle: "Frontière de Contexte Locataire & Noyau Partagé",
        infoContent:
          "Les points de terminaison et routes DataTransferMenuProvider imposent RequiresTenantContext = true ; tout appel sans locataire résolu renvoie DataTransfer.TenantRequired (400/422) et affiche DataExchangeTenantRequiredCard guidant les Super Admins Plateforme vers le sélecteur de locataire. Streaming, neutralisation de formules, contrôle ZIP OWASP et IEntityDataExchangeProvider résident de manière découplée dans Core.",
        archTitle: "Clean Architecture en 3 Projets & Verrouillage AstraFlow",
        archIntro:
          "Conformément aux invariants SCRIPE, DataTransfer isole entités du domaine, contrats CQRS avec mappeurs compilés et infrastructure multi-BDD sur trois projets distincts avec schéma datatransfer et Outbox/Inbox transactionnel.",
        featArchitecture: "Isolation Modulaire Stricte en 3 Couches",
        featArchitectureDesc:
          "Les projets DataTransfer.*.csproj n'ont aucune référence vers CRM, Identity ou PartyKernel. DataTransfer.Domain définit DataTransferJob (émettant DataExchangeJobCompletedEvent dans datatransfer.outbox_messages), SavedMappingPreset et ExternalLegacyKeyMap ; DataTransfer.Application exécute 16 requêtes AstraFlow via [AstraGenerateMapping] DataTransferMaps ; DataTransfer.Infrastructure persiste dans datatransfer pour SQL Server, PostgreSQL et Oracle.",
        featSmartTemplates: "Modèles Intelligents ClosedXML & Guide des Champs",
        featSmartTemplatesDesc:
          "Génère des classeurs localisés .xlsx, .csv et .tsv avec format texte @ (OOXML NumberFormatId 49) préservant zéros initiaux et numéros de téléphone, listes déroulantes Excel natives (jusqu'à la ligne 5 000), onglet bilingue Field Guide et feuille très masquée _scripe_meta stockant une empreinte SHA-256 SchemaFingerprint vérifiée à l'import.",
        featNormalization: "Normalisation MENA Linéaire en 17 Règles",
        featNormalizationDesc:
          "SpreadsheetValueNormalizer s'exécute en temps linéaire O(n) sans regex vulnérable aux attaques ReDoS : conversion des chiffres arabes/persans, suppression des diacritiques et contrôles BiDi, canonisation des valeurs nulles, analyse des devises SAR/EGP/AED/USD et normalisation téléphonique E.164.",
        featDryRunQuota: "Simulation Dry-Run & Allocation Stricte de Quotas",
        featDryRunQuotaDesc:
          "Simule schéma, règles métier, champs personnalisés et plafonds de licence sans aucune écriture. Avant exécution, TryReserveSlotsAsync acquiert un bail relationnel atomique de 2 heures (provisionnement fail-closed EnsureCounterAsync sur les 6 entités sous quota) ajusté par ReconcileReservationLeaseAsync.",
        featTopologicalDag: "DAG Topologique Multi-Feuilles & Auto-FK en 2 Passes",
        featTopologicalDagDesc:
          "ComputeRelatedMultiSheetEntityKeys découvre dynamiquement les grappes DAG multi-feuilles autorisées (CRM 5 feuilles, PartyKernel 3 feuilles ; entités Identity autonomes) et active automatiquement la migration multi-feuilles dans DataExchangeToolbarActions et EntitiesCatalogView avec TopologicalSortSheets et auto-FK en 2 passes.",
        featOwaspFls: "Défense OWASP, Rédaction FLS & Chiffrement BYOK",
        featOwaspFlsDesc:
          "OwaspSpreadsheetSecurityValidator impose 25 Mo max, 100 Mo décompressés / 1 000 entrées / ratio 100x, blocage des macros et XXE/DTD, nettoyage HTML, CsvFormulaGuard, [AstraSensitive], IRestrictedFieldsResolver et chiffrement/déchiffrement BYOK des champs cf:* confidentiels.",
        domainTitle: "Racines d'Agrégats & Schéma de Persistance",
        domainIntro:
          "Toutes les entités héritent de AuditableEntity<Guid> et implémentent ITenantAwareEntity pour appliquer le filtrage locataire et les migrations SQL Server, PostgreSQL et Oracle dans le schéma datatransfer.",
        pipelineTitle: "Pipeline du Studio en 4 Étapes",
        pipelineIntro:
          "DataExchangeStudioOverlay orchestre le flux complet, du téléchargement de modèle ou inspection OWASP jusqu'aux règles de transformation, au Dry-Run et au traitement par lots.",
        stepUpload: "Étape 1 — Téléchargement de Modèle & Inspection OWASP",
        stepUploadDesc:
          "Téléchargez un modèle simple ou multi-feuilles ou importez .xlsx, .csv ou .tsv (max 25 Mo). InspectUploadAsync valide les octets magiques, extrait en-têtes et 5 lignes d'exemple et effectue un appariement à 3 niveaux (exact, alias, Levenshtein >= 0.72).",
        stepMap: "Étape 2 — Correspondance de Colonnes, Préréglages & Règles",
        stepMapDesc:
          "Reliez les colonnes du fichier au descripteur et aux champs personnalisés (cf:*), attachez les 17 règles DataExchangeTransformRule, définissez un préréglage par défaut via POST /presets/{id}/default ou ouvrez le Studio avec initialPresetId et le composant @core/ui/confirmation-dialog unifié.",
        stepDryRun: "Étape 3 — Simulation Dry-Run & Contrôle des Quotas",
        stepDryRunDesc:
          "DryRunAsync vérifie types, références, champs personnalisés et quotas avant toute écriture en base, en détaillant lignes valides/invalides, créations vs mises à jour et éligibilité synchrone (<= 250 lignes).",
        stepExecute: "Étape 4 — Exécution par Validation Partielle & Rejets",
        stepExecuteDesc:
          "Exécute <= 250 lignes en synchrone (sauf RunInBackground ou limite <= 100 pour OneTimeAutoPassword) et met en file les gros volumes avec reprise des tâches orphelines. Chaque lot de 250 lignes isole les échecs, persiste ExternalLegacyKeyMaps (index composite unique + contrôle préalable EXTERNAL_KEY_CONFLICT) et génère un .xlsx avec _RowNumber, _ErrorCode, _ErrorColumn, _ErrorMessage et _CascadeParentRef (TTL 24h).",
        entitiesTitle: "Fournisseurs d'Entités Enregistrés & Extensibilité",
        entitiesIntro:
          "Dix entités CRM, Identity et PartyKernel sont prêtes à l'emploi ; tout nouveau module implémente directement IEntityDataExchangeProvider (l'ancien assistant EfCoreEntityDataExchangeProviderBase est déprécié et inutilisé en production).",
        normalizationTitle: "Contrat Déclaratif des 17 Règles de Transformation",
        normalizationIntro:
          "Chaque DataExchangeColumnMapping porte optionnellement un DataExchangeTransformRule exécuté en temps linéaire avant la validation stricte des types.",
        securityTitle: "Plafonds OWASP, Liste Noire de Champs & FLS",
        securityIntro:
          "Les garde-fous s'appliquent uniformément aux appels API, aux tâches de fond (via DataExchangeAmbientContext restauré depuis ActorSnapshotJson) et aux exports sécurisés.",
        securityWarnTitle: "Immutabilité des Secrets & Champs Système",
        securityWarnContent:
          "DataExchangeSecurityPolicy bloque hachages de mots de passe, jetons de sécurité, clés API, secrets TOTP, audit, RowVersion et tout membre [AstraSensitive] ou [AstraRedact]. LooksLikeMaskedSentinel empêche d'écraser les secrets existants.",
        governanceTitle: "Permissions PBAC, Fonctionnalités & Menu d'Administration",
        governanceIntro:
          "DataTransferPermissionProvider (7 rôles standard dont CRM_SALES_REP ; 6 rôles l'excluant pour migrations.execute), DataTransferFeatureProvider, DataTransferMenuProvider (RequiresTenantContext = true) et DataTransferDevDataSeeder (Order = 155) appliquent [Authorize] + [PermissionRequired] sans [AdminOnly] sur GenericCrudView avec pagination sécurisée (Showing 0-0 of 0 results).",
        tenantContextTitle: "Périmètre Locataire & Parcours Super Admin Plateforme",
        tenantContextContent:
          "Chaque entité, tâche, préréglage et ExternalLegacyKeyMap est cloisonné par locataire ; les tables souveraines restent bloquées par DataExchangeSecurityPolicy. En contexte plateforme global, le Super Admin sélectionne d'abord un locataire dans l'en-tête ou suit DataExchangeTenantRequiredCard.",
        recoveryTitle: "Modèle de Sûreté : Dry-Run, Lots Partiels & Annulation (Sans Rollback Global Post-Exécution)",
        recoveryContent:
          "DataTransfer exclut délibérément un rollback destructif après achèvement qui écraserait des modifications concurrentes. DryRunAsync vérifie avant toute écriture, ExecuteImport valide par lots isolés de 250 lignes avec fichier .xlsx des rejets, et POST /jobs/{id}/cancel réconcilie le quota via ReconcileReservationLeaseAsync tout en appelant DetachPendingOutboxMessages().",
        outboxTitle: "Architecture Plugin Zéro-Couplage & Intégration Outbox",
        outboxIntro:
          "DataTransfer découvre les entités métier via les contrats Core.Application et publie les événements d'achèvement via son Outbox sans dépendance croisée backend ni frontend.",
        adminSurfacesTitle: "Pourquoi le Catalogue est en Lecture Seule & Rôle de Chaque Écran",
        adminSurfacesIntro:
          "Le Catalogue (/data-exchange) est auto-découvert depuis les fournisseurs DI et droits d'édition, les colonnes personnalisées proviennent de /custom-fields, tandis que Tâches (/jobs) et Préréglages (/presets) naissent depuis le Studio et les barres d'outils.",
        dagComparisonTitle: "Import Simple vs Migration Topologique Multi-Feuilles (DAG)",
        dagComparisonIntro:
          "Les deux modes partagent OWASP, normalisation et lots de 250 lignes ; la migration multi-feuilles s'active dynamiquement via ComputeRelatedMultiSheetEntityKeys lorsqu'une grappe autorisée couvre au moins deux entités liées.",
        dynamicMatrixTitle: "Comportement Dynamique à l'Exécution vs Invariants de Sécurité Figés",
        dynamicMatrixIntro:
          "Catalogue, champs personnalisés, permissions, quotas et grappes DAG s'adaptent dynamiquement par locataire et rôle, tandis que les plafonds OWASP, le moteur O(n) et les listes noires restent verrouillés.",
        normalizationPipelineTitle: "Ordre Séquentiel Déterministe en 9 Étapes O(n)",
        normalizationPipelineIntro:
          "Les règles DataExchangeTransformRule activées s'exécutent séquentiellement en temps linéaire avant le typage strict afin que textes MENA, devises, téléphones et dates restent identiques entre aperçu, dry-run et exécution.",
        editionsTitle: "Matrice d'Éditions (EditionSeeder)",
        editionsIntro:
          "Les droits sont évalués dynamiquement par le moteur d'entitlements selon l'édition souscrite par le locataire.",
      },
    },
  },
  apiReference: {
    dataTransferApi: {
      title: "API Data Exchange Studio",
      description:
        "Référence complète de l'API REST SCRIPE Data Exchange Studio (/api/v1/data-transfer) : descripteurs, modèles intelligents, inspection OWASP, dry-run, import/export, préréglages et suivi.",
      intro:
        "DataTransferController expose 16 points de terminaison REST sous /api/v1/data-transfer (API v1.0) acheminés via AstraFlow Mediator avec réponses Result<T> et erreurs RFC-7807.",
      authNoteTitle: "Authentification, Résolution Locataire & Limitation de Débit",
      authNote:
        "Chaque route impose [Authorize], [PermissionRequired(\"datatransfer.*\")] et un locataire actif — [AdminOnly] a été retiré afin que les 7 rôles autorisés dont CRM_SALES_REP opèrent librement (6 rôles hors CRM_SALES_REP pour migrations.execute ; absence de locataire : DataTransfer.TenantRequired ; entité inconnue : DataTransfer.UnknownEntity 404). Limites per-user (100/min), export-heavy (5/min) et X-Content-Type-Options: nosniff.",
      discoveryTitle: "Découverte d'Entités, Descripteurs & Modèles Intelligents",
      discoveryIntro:
        "Listez les entités autorisées, récupérez les descripteurs fusionnés avec Custom Fields (cf:*) et FLS, et téléchargez des modèles formatés.",
      epListEntitiesDesc:
        "Liste les entités accessibles selon permissions et édition, avec relatedMultiSheetEntityKeys triées topologiquement, quotas restants et capacités import/export.",
      epGetDescriptorDesc:
        "Retourne DataExchangeEntityDescriptor, grappe relatedMultiSheetEntityKeys, clés masquées FLS, drapeaux d'activation et compteurs de quota.",
      epDownloadTemplateDesc:
        "Diffuse un modèle localisé (.xlsx, .csv, .tsv) simple ou multi-feuilles ordonné topologiquement avec format @, listes Excel, Field Guide et _scripe_meta.",
      pipelineTitle: "Pipeline d'Ingestion en 4 Étapes",
      pipelineIntro:
        "Validez les fichiers en stockage temporaire, simulez sans écriture et lancez l'import synchrone (<= 250 lignes) ou asynchrone.",
      epInspectDesc:
        "Reçoit multipart/form-data jusqu'à 25 Mo (26 214 400 octets), applique les contrôles OWASP/XXE/macros et renvoie feuilles, en-têtes, 5 aperçus et suggestions.",
      epDryRunDesc:
        "Simule validation de schéma, 17 règles, champs personnalisés, résolutions et quotas sur un UploadId sans écriture.",
      epImportDesc:
        "Lance l'import simple ou multi-feuilles avec bail de quota de 2h (TryReserveSlotsAsync / ReconcileReservationLeaseAsync), lots de 250 lignes, onboarding d'identité optionnel, classeur d'erreurs et émission Outbox de DataExchangeJobCompletedEvent.",
      exportTitle: "Exportations Streaming Protégées",
      exportIntro:
        "Générez des exports immédiats ou en arrière-plan filtrés par locataire, DataScope, FLS et CsvFormulaGuard.",
      epExportSyncDesc:
        "Streame un export .xlsx, .csv ou .tsv neutralisé et expurgé selon FLS directement dans la réponse HTTP en créant un journal d'audit.",
      epExportAsyncDesc:
        "Met en file un export lourd en tâche de fond (rétention 24h) et retourne immédiatement HTTP 202 Accepted avec DataTransferJobDto.",
      presetsTitle: "Préréglages de Correspondance Sauvegardés",
      presetsIntro:
        "Gérez les profils réutilisables de mappage et de transformation au niveau du locataire.",
      epListPresetsDesc:
        "Liste les préréglages du locataire, filtrables par entityKey ou search.",
      epSavePresetDesc:
        "Crée ou met à jour un préréglage locataire projeté à la compilation par DataTransferMaps.",
      epSetDefaultPresetDesc:
        "Définit atomiquement un préréglage du locataire comme valeur par défaut pour son entityKey, rétrograde les précédents et journalise DATA_EXCHANGE_PRESET_DEFAULT_SET.",
      epDeletePresetDesc:
        "Supprime logiquement un préréglage locataire et renvoie HTTP 204 No Content.",
      jobsTitle: "Historique des Tâches, Annulation & Téléchargements",
      jobsIntro:
        "Suivez l'avancement via ProcessedRows et ProgressPercent, annulez avec libération des quotas et récupérez les classeurs produits.",
      epListJobsDesc:
        "Liste paginée de DataTransferJobDto du locataire (page >= 1, pageSize 1..100) filtrable par entité, recherche et statut.",
      epGetJobDesc:
        "Récupère les compteurs de lignes, le pourcentage d'avancement, la présence d'artefacts et les dates UTC d'une tâche.",
      epCancelJobDesc:
        "Déclenche l'annulation coopérative d'une tâche en file ou en cours, libère les quotas inutilisés et audite l'événement.",
      epDownloadArtifactDesc:
        "Télécharge le classeur d'erreurs (rejected) ou l'export terminé (export) durant sa fenêtre de rétention de 24 heures.",
      rateLimitsTitle: "Garde-Fous de Volume & Débit",
      rateLimitsIntro:
        "Synthèse des tailles maximales de requête, politiques de limitation de débit, seuils synchrones et durée de rétention.",
      errorCodesTitle: "Codes d'Erreur Canoniques & Correspondance HTTP",
      errorCodesIntro:
        "AstraFlow.AspNetCore convertit chaque échec Result<T> en réponse HTTP normalisée sans exception métier.",
    },
  },
  commercial: {
    dataExchangeStudio: {
      title: "SCRIPE Data Exchange Studio",
      description:
        "Intégrez organisations, contacts, pipelines CRM et effectifs en quelques minutes grâce à la normalisation MENA, au Dry-Run sans risque et à la sécurité entreprise.",
      intro:
        "Migrer des tableurs vers un logiciel multi-locataires échoue souvent à cause de scripts CSV fragiles, d'encodages arabes corrompus et de zéros perdus dans les numéros de téléphone. SCRIPE Data Exchange Studio transforme l'import et l'export en un atelier guidé, auditable et sécurisé au cœur de votre portail.",
      statUploadCeiling: "Plafond de Contrôle OWASP à l'Import",
      statTransformRules: "Règles Linéaires de Nettoyage Intégrées",
      statChunkSize: "Taille de Lot Isolé Contre les Pannes",
      statEntityProviders: "Entités CRM, Identité & Tiers Prêtes",
      valueTitle: "Pourquoi les Équipes Opérations Choisissent Data Exchange Studio",
      featDryRunQuota: "Simulation Dry-Run Sans Risque",
      featDryRunQuotaDesc:
        "Visualisez les lignes valides, les créations ou mises à jour attendues et l'impact sur vos quotas avant la moindre modification en base.",
      featMenaBilingual: "Intelligence Bilingue & Formats MENA",
      featMenaBilingualDesc:
        "Convertit les chiffres arabes/persans, nettoie les diacritiques et marqueurs invisibles, normalise les montants SAR/EGP/AED/USD et protège les numéros via le format texte @.",
      featMultiSheetDag: "Migration Multi-Feuilles en un Seul Classeur",
      featMultiSheetDagDesc:
        "Importez organisations, personnes, comptes CRM, contacts, prospects, opportunités et activités depuis un unique classeur Excel avec ordre topologique garanti.",
      featCustomFieldsPresets: "Champs Personnalisés & Préréglages en Un Clic",
      featCustomFieldsPresetsDesc:
        "Tous les champs personnalisés du locataire sont détectés et validés automatiquement, avec sauvegarde de profils pour vos exports ERP récurrents.",
      featPartialCommit: "Validation Partielle & Classeur d'Erreurs Immédiat",
      featPartialCommitDesc:
        "Les lignes valides sont enregistrées sans tout bloquer et les rejets reviennent prêts à corriger avec ligne, colonne, code d'erreur et dépendance parente.",
      featEnterpriseSecurity: "Sécurité OWASP Zero-Trust & Protection des Champs",
      featEnterpriseSecurityDesc:
        "Bloque macros, XXE, bombes ZIP et injections de formules tout en empêchant l'exposition de secrets ou champs restreints FLS.",
      tiersTitle: "Capacités par Édition SCRIPE",
      tiersIntro:
        "Les exports protégés et modèles intelligents démarrent dès Sports Starter, l'import complet s'active dans Standard et Sports Pro, et la migration topologique multi-feuilles accompagne Sports Ultra et Enterprise.",
      ctaTitle: "Accélérez l'Intégration de Vos Clubs et Clients",
      ctaSubtitle:
        "Comparez nos éditions commerciales ou explorez l'architecture DataTransfer et la spécification API REST.",
      ctaPrimary: "Voir Tarifs & Éditions",
      ctaSecondary: "Explorer l'Architecture Technique",
    },
  },
};
