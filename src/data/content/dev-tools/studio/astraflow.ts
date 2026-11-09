import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

/**
 * SCRIPE Studio — AstraFlow page tour (Workbench, Graph, Baselines, Doctor) and engine API.
 * All prose lives in locales/pages/dev-tools/*.ts under devTools.studio.astraflow.*
 */
const sections: DocSection[] = [
  {
    "type": "paragraph",
    "contentKey": "devTools.studio.astraflow.intro"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.studio.astraflow.introVersions"
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.studio.astraflow.flowTitle",
    "id": "page-structure"
  },
  {
    "type": "flowchart",
    "direction": "horizontal",
    "nodes": [
      {
        "id": "page",
        "labelKey": "devTools.studio.astraflow.nPage",
        "type": "primary"
      },
      {
        "id": "wb",
        "labelKey": "devTools.studio.astraflow.nWorkbench",
        "type": "info"
      },
      {
        "id": "gr",
        "labelKey": "devTools.studio.astraflow.nGraph",
        "type": "info"
      },
      {
        "id": "bl",
        "labelKey": "devTools.studio.astraflow.nBaselines",
        "type": "info"
      },
      {
        "id": "dr",
        "labelKey": "devTools.studio.astraflow.nDoctor",
        "type": "success"
      }
    ],
    "connections": [
      {
        "from": "page",
        "to": "wb",
        "labelKey": "devTools.studio.astraflow.eTab"
      },
      {
        "from": "wb",
        "to": "gr",
        "labelKey": "devTools.studio.astraflow.eTab"
      },
      {
        "from": "gr",
        "to": "bl",
        "labelKey": "devTools.studio.astraflow.eTab"
      },
      {
        "from": "bl",
        "to": "dr",
        "labelKey": "devTools.studio.astraflow.eTab"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.studio.astraflow.hWorkbench",
    "id": "workbench"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.studio.astraflow.wIntro"
  },
  {
    "type": "table",
    "headers": [
      "devTools.studio.astraflow.thControl",
      "devTools.studio.astraflow.thBehavior"
    ],
    "rows": [
      [
        "devTools.studio.astraflow.wForm",
        "devTools.studio.astraflow.wFormD"
      ],
      [
        "devTools.studio.astraflow.wLive",
        "devTools.studio.astraflow.wLiveD"
      ],
      [
        "devTools.studio.astraflow.wRun",
        "devTools.studio.astraflow.wRunD"
      ],
      [
        "devTools.studio.astraflow.wTerm",
        "devTools.studio.astraflow.wTermD"
      ],
      [
        "devTools.studio.astraflow.wExport",
        "devTools.studio.astraflow.wExportD"
      ],
      [
        "devTools.studio.astraflow.wPinned",
        "devTools.studio.astraflow.wPinnedD"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "titleKey": "devTools.studio.astraflow.hResult",
    "id": "result-view"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.studio.astraflow.rIntro"
  },
  {
    "type": "table",
    "headers": [
      "devTools.studio.astraflow.thControl",
      "devTools.studio.astraflow.thBehavior"
    ],
    "rows": [
      [
        "devTools.studio.astraflow.rCards",
        "devTools.studio.astraflow.rCardsD"
      ],
      [
        "devTools.studio.astraflow.rSearch",
        "devTools.studio.astraflow.rSearchD"
      ],
      [
        "devTools.studio.astraflow.rFilters",
        "devTools.studio.astraflow.rFiltersD"
      ],
      [
        "devTools.studio.astraflow.rPaging",
        "devTools.studio.astraflow.rPagingD"
      ],
      [
        "devTools.studio.astraflow.rCsv",
        "devTools.studio.astraflow.rCsvD"
      ],
      [
        "devTools.studio.astraflow.rFindings",
        "devTools.studio.astraflow.rFindingsD"
      ],
      [
        "devTools.studio.astraflow.rRaw",
        "devTools.studio.astraflow.rRawD"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.studio.astraflow.hGraph",
    "id": "graph"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.studio.astraflow.gIntro"
  },
  {
    "type": "table",
    "headers": [
      "devTools.studio.astraflow.thControl",
      "devTools.studio.astraflow.thBehavior"
    ],
    "rows": [
      [
        "devTools.studio.astraflow.gGen",
        "devTools.studio.astraflow.gGenD"
      ],
      [
        "devTools.studio.astraflow.gTheme",
        "devTools.studio.astraflow.gThemeD"
      ],
      [
        "devTools.studio.astraflow.gToggles",
        "devTools.studio.astraflow.gTogglesD"
      ],
      [
        "devTools.studio.astraflow.gCap",
        "devTools.studio.astraflow.gCapD"
      ],
      [
        "devTools.studio.astraflow.gNav",
        "devTools.studio.astraflow.gNavD"
      ],
      [
        "devTools.studio.astraflow.gDownloads",
        "devTools.studio.astraflow.gDownloadsD"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.studio.astraflow.hBaselines",
    "id": "baselines"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.studio.astraflow.bIntro"
  },
  {
    "type": "table",
    "headers": [
      "devTools.studio.astraflow.thControl",
      "devTools.studio.astraflow.thBehavior"
    ],
    "rows": [
      [
        "devTools.studio.astraflow.bSave",
        "devTools.studio.astraflow.bSaveD"
      ],
      [
        "devTools.studio.astraflow.bList",
        "devTools.studio.astraflow.bListD"
      ],
      [
        "devTools.studio.astraflow.bDownload",
        "devTools.studio.astraflow.bDownloadD"
      ],
      [
        "devTools.studio.astraflow.bCompare",
        "devTools.studio.astraflow.bCompareD"
      ]
    ]
  },
  {
    "type": "info",
    "variant": "note",
    "titleKey": "devTools.studio.astraflow.bSave",
    "contentKey": "devTools.studio.astraflow.bNote"
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.studio.astraflow.hDoctor",
    "id": "doctor"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.studio.astraflow.dIntro"
  },
  {
    "type": "table",
    "headers": [
      "devTools.studio.astraflow.thControl",
      "devTools.studio.astraflow.thBehavior"
    ],
    "rows": [
      [
        "devTools.studio.astraflow.dChecks",
        "devTools.studio.astraflow.dChecksD"
      ]
    ]
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.studio.astraflow.dReal"
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.studio.astraflow.hApi",
    "id": "engine-api"
  },
  {
    "type": "paragraph",
    "contentKey": "devTools.studio.astraflow.apiIntro"
  },
  {
    "type": "table",
    "headers": [
      "devTools.studio.astraflow.thMethod",
      "devTools.studio.astraflow.thPath",
      "devTools.studio.astraflow.thPurpose"
    ],
    "rows": [
      [
        "GET",
        "/api/astraflow/status",
        "devTools.studio.astraflow.aStatus"
      ],
      [
        "GET",
        "/api/astraflow/commands",
        "devTools.studio.astraflow.aCommands"
      ],
      [
        "POST",
        "/api/astraflow/install",
        "devTools.studio.astraflow.aInstall"
      ],
      [
        "POST",
        "/api/astraflow/update",
        "devTools.studio.astraflow.aUpdate"
      ],
      [
        "POST",
        "/api/astraflow/uninstall",
        "devTools.studio.astraflow.aUninstall"
      ],
      [
        "POST",
        "/api/astraflow/run",
        "devTools.studio.astraflow.aRun"
      ],
      [
        "POST",
        "/api/astraflow/preview",
        "devTools.studio.astraflow.aPreview"
      ],
      [
        "GET",
        "/api/astraflow/doctor",
        "devTools.studio.astraflow.aDoctor"
      ],
      [
        "GET",
        "/api/astraflow/baselines",
        "devTools.studio.astraflow.aBaselines"
      ],
      [
        "POST",
        "/api/astraflow/baseline",
        "devTools.studio.astraflow.aBaseline"
      ],
      [
        "GET",
        "/api/astraflow/baselines/:name",
        "devTools.studio.astraflow.aBaselineGet"
      ],
      [
        "POST",
        "/api/astraflow/compare",
        "devTools.studio.astraflow.aCompare"
      ],
      [
        "POST",
        "/api/astraflow/export",
        "devTools.studio.astraflow.aExport"
      ]
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "titleKey": "devTools.studio.astraflow.hSteps",
    "id": "quick-tour"
  },
  {
    "type": "step-guide",
    "steps": [
      {
        "titleKey": "devTools.studio.astraflow.s1t",
        "contentKey": "devTools.studio.astraflow.s1c"
      },
      {
        "titleKey": "devTools.studio.astraflow.s2t",
        "contentKey": "devTools.studio.astraflow.s2c"
      },
      {
        "titleKey": "devTools.studio.astraflow.s3t",
        "contentKey": "devTools.studio.astraflow.s3c"
      },
      {
        "titleKey": "devTools.studio.astraflow.s4t",
        "contentKey": "devTools.studio.astraflow.s4c"
      }
    ]
  },
  {
    "type": "info",
    "variant": "note",
    "titleKey": "devTools.studio.astraflow.nWarnTitle",
    "contentKey": "devTools.studio.astraflow.nWarn"
  }
];

registerPage({
  slug: "dev-tools/studio/astraflow",
  titleKey: "devTools.studio.astraflow.title",
  descriptionKey: "devTools.studio.astraflow.description",
  category: "dev-tools",
  order: 21,
  sections,
  relatedSlugs: ["dev-tools/cli/astraflow", "dev-tools/studio/overview", "dev-tools/studio/engine-api"],
  lastUpdated: "2026-11-09",
});
