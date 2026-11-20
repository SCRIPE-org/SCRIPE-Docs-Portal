"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ARCHIFY_CATALOG,
  ARCHIFY_PILLAR_META,
  ARCHIFY_MODE_META,
  type ArchifyArtifactItem,
  type ArchifyPillar,
  type ArchifyMode,
} from "@/data/archify-catalog";
import {
  Layers,
  Server,
  Monitor,
  Search,
  ExternalLink,
  Columns,
  Maximize2,
  Minimize2,
  Sparkles,
  FileCode2,
  CheckCircle2,
  LayoutGrid,
  Compass,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  HelpCircle,
  Download,
  Palette,
  ArrowLeftRight,
  Info,
  RotateCcw,
} from "lucide-react";
import { DocsHeader } from "@/engine/presentation/components/layout/DocsHeader";
import { DocsSearch } from "@/engine/presentation/components/ui/DocsSearch";
import { docsContainer } from "@/di";

export interface ArchifyHubViewProps {
  initialArtifactId?: string;
  initialPillar?: ArchifyPillar | "all";
  initialViewMode?: "studio" | "split" | "atlas";
}

type ExplainerStyle = "editorial" | "clean" | "product" | "swiss";

const SPLIT_PRESETS: Array<{
  id: string;
  label: string;
  leftId: string;
  rightId: string;
}> = [
  {
    id: "arch",
    label: "Backend vs Frontend Architecture",
    leftId: "backend-architecture",
    rightId: "frontend-architecture",
  },
  {
    id: "seq",
    label: "3-TX CQRS vs 5-Layer MVVM Sequence",
    leftId: "backend-cqrs-sequence",
    rightId: "frontend-mvvm-sequence",
  },
  {
    id: "wf",
    label: "29-Stage Security vs Edge Routing Workflow",
    leftId: "backend-security-workflow",
    rightId: "frontend-routing-workflow",
  },
  {
    id: "exp",
    label: "Backend vs Frontend Master Explainers",
    leftId: "backend-master-explainer",
    rightId: "frontend-master-explainer",
  },
  {
    id: "cls",
    label: "AstraFlow Contracts vs CRUD Engine Classes",
    leftId: "backend-class",
    rightId: "frontend-class",
  },
  {
    id: "life",
    label: "Idempotency/Outbox vs Booking/Auth Lifecycle",
    leftId: "backend-lifecycle",
    rightId: "frontend-lifecycle",
  },
];

export function ArchifyHubView({
  initialArtifactId = "fullstack-master-explainer",
  initialPillar = "all",
  initialViewMode = "studio",
}: ArchifyHubViewProps) {
  const { resolvedTheme } = useTheme();

  const [selectedPillar, setSelectedPillar] = useState<ArchifyPillar | "all">(initialPillar);
  const [selectedMode, setSelectedMode] = useState<ArchifyMode | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(initialArtifactId);
  const [compareId, setCompareId] = useState<string>("backend-master-explainer");
  const [viewMode, setViewMode] = useState<"studio" | "split" | "atlas">(initialViewMode);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [explainerStyle, setExplainerStyle] = useState<ExplainerStyle>("editorial");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Slide-over Inspector drawer state (Details, GitHub Sources, Spec Source, Deep Links)
  const [inspectorTab, setInspectorTab] = useState<"overview" | "spec" | null>(null);
  const [specContent, setSpecContent] = useState<string>("");
  const [specLoading, setSpecLoading] = useState<boolean>(false);
  const [copiedSpec, setCopiedSpec] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [hashFocus, setHashFocus] = useState<string>("");

  const primaryIframeRef = useRef<HTMLIFrameElement | null>(null);
  const compareIframeRef = useRef<HTMLIFrameElement | null>(null);

  // Sync URL query parameters (?pillar=, ?artifact=, ?view=, ?mode=, ?compare=) & responsive sidebar on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }

    const applySearchParams = () => {
      const params = new URLSearchParams(window.location.search);
      const pillarParam = params.get("pillar");
      if (
        pillarParam === "all" ||
        pillarParam === "fullstack" ||
        pillarParam === "backend" ||
        pillarParam === "frontend"
      ) {
        setSelectedPillar(pillarParam);
      }

      const modeParam = params.get("mode");
      if (modeParam === "all" || (modeParam && modeParam in ARCHIFY_MODE_META)) {
        setSelectedMode(modeParam as ArchifyMode | "all");
      }

      const artifactParam = params.get("artifact");
      if (artifactParam && ARCHIFY_CATALOG.some((item) => item.id === artifactParam)) {
        setActiveId(artifactParam);
      } else if (
        pillarParam &&
        pillarParam !== "all" &&
        !artifactParam
      ) {
        const firstForPillar = ARCHIFY_CATALOG.find((item) => item.pillar === pillarParam);
        if (firstForPillar) {
          setActiveId(firstForPillar.id);
        }
      }

      const compareParam = params.get("compare");
      if (compareParam && ARCHIFY_CATALOG.some((item) => item.id === compareParam)) {
        setCompareId(compareParam);
      }

      const viewParam = params.get("view");
      if (viewParam === "studio" || viewParam === "split" || viewParam === "atlas") {
        setViewMode(viewParam);
      }
    };

    applySearchParams();
    window.addEventListener("popstate", applySearchParams);
    return () => window.removeEventListener("popstate", applySearchParams);
  }, []);

  const filteredItems = useMemo(() => {
    return ARCHIFY_CATALOG.filter((item) => {
      if (selectedPillar !== "all" && item.pillar !== selectedPillar) return false;
      if (selectedMode !== "all" && item.mode !== selectedMode) return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inSub = item.subtitle.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inMode = item.mode.toLowerCase().includes(q);
        const inSources = item.keySources.some((s) => s.toLowerCase().includes(q));
        if (!inTitle && !inSub && !inDesc && !inMode && !inSources) return false;
      }
      return true;
    });
  }, [selectedPillar, selectedMode, searchQuery]);

  const activeItem: ArchifyArtifactItem = useMemo(() => {
    return (
      ARCHIFY_CATALOG.find((item) => item.id === activeId) ||
      filteredItems[0] ||
      ARCHIFY_CATALOG[0]
    );
  }, [activeId, filteredItems]);

  const compareItem: ArchifyArtifactItem = useMemo(() => {
    return (
      ARCHIFY_CATALOG.find((item) => item.id === compareId) ||
      ARCHIFY_CATALOG.find((item) => item.id !== activeItem.id) ||
      ARCHIFY_CATALOG[1]
    );
  }, [compareId, activeItem]);

  const activeIndex = useMemo(() => {
    const idx = filteredItems.findIndex((i) => i.id === activeItem.id);
    return idx >= 0 ? idx : 0;
  }, [filteredItems, activeItem]);

  const navigatePrevNext = useCallback(
    (delta: number) => {
      if (filteredItems.length === 0) return;
      const nextIdx = (activeIndex + delta + filteredItems.length) % filteredItems.length;
      setActiveId(filteredItems[nextIdx].id);
    },
    [filteredItems, activeIndex]
  );

  // Sync Docs Portal theme & Explainer style into embedded Archify iframes
  const syncIframeEnvironment = useCallback(
    (iframe: HTMLIFrameElement | null) => {
      if (!iframe) return;
      try {
        const doc = iframe.contentDocument;
        const win = iframe.contentWindow;
        if (!doc || !doc.documentElement) return;
        const targetTheme = resolvedTheme === "light" ? "light" : "dark";
        const isExplainer =
          doc.documentElement.dataset.archifyArtifact === "explainer" ||
          Boolean(doc.querySelector("[data-style-choice]"));

        if (win) {
          try {
            win.localStorage.setItem("archify-theme", targetTheme);
            if (isExplainer) {
              win.localStorage.setItem("archify-explainer-style", explainerStyle);
            }
          } catch {
            // ignore storage errors
          }
        }

        if (isExplainer) {
          const themeBtn = doc.querySelector(
            `[data-theme-choice="${targetTheme}"]`
          ) as HTMLButtonElement | null;
          if (themeBtn && themeBtn.getAttribute("aria-pressed") !== "true") {
            themeBtn.click();
          } else {
            doc.documentElement.dataset.theme = targetTheme;
            doc.documentElement.style.colorScheme = targetTheme;
            doc.querySelectorAll<HTMLElement>(".diagram-preview").forEach((preview) => {
              preview.dataset.theme = targetTheme;
            });
          }

          const styleBtn = doc.querySelector(
            `[data-style-choice="${explainerStyle}"]`
          ) as HTMLButtonElement | null;
          if (styleBtn && styleBtn.getAttribute("aria-checked") !== "true") {
            styleBtn.click();
          } else {
            doc.documentElement.dataset.style = explainerStyle;
          }
        } else {
          // Native diagram runtime
          if (doc.documentElement.dataset.theme !== targetTheme) {
            const nativeThemeBtn = doc.getElementById("btn-theme") as HTMLButtonElement | null;
            if (nativeThemeBtn) {
              nativeThemeBtn.click();
            }
          }
          doc.documentElement.dataset.theme = targetTheme;
          doc.documentElement.style.colorScheme = targetTheme;
        }
      } catch {
        // Cross-origin or not yet mounted
      }
    },
    [resolvedTheme, explainerStyle]
  );

  useEffect(() => {
    syncIframeEnvironment(primaryIframeRef.current);
    syncIframeEnvironment(compareIframeRef.current);
  }, [resolvedTheme, explainerStyle, activeId, compareId, viewMode, syncIframeEnvironment]);

  // Trigger native controls inside the embedded Archify diagram runtime
  const triggerDiagramAction = useCallback((buttonId: string) => {
    const iframe = primaryIframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument;
      if (!doc) return;
      const btn = doc.getElementById(buttonId) as HTMLButtonElement | null;
      if (btn) {
        btn.click();
      }
    } catch {
      // ignore
    }
  }, []);

  // Load raw spec file when Spec tab is opened
  useEffect(() => {
    if (inspectorTab !== "spec") return;
    let cancelled = false;
    setSpecLoading(true);
    fetch(activeItem.specUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) {
          setSpecContent(text);
          setSpecLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSpecContent(`// Unable to load spec source from ${activeItem.specUrl}`);
          setSpecLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [inspectorTab, activeItem.specUrl]);

  const handleCopySpec = () => {
    if (!specContent) return;
    navigator.clipboard.writeText(specContent);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  const handleCopyDeepLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const hash = hashFocus.trim() ? `#${hashFocus.trim().replace(/^#/, "")}` : "";
    const url = `${origin}${activeItem.htmlUrl}${hash}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getGithubUrl = (pillar: ArchifyPillar, sourcePath: string, commit: string) => {
    const cleanPath = sourcePath
      .replace(/^SCRIPE-Backend\//, "")
      .replace(/^SCRIPE-Frontend\//, "");
    if (pillar === "backend" || sourcePath.startsWith("SCRIPE-Backend/")) {
      return `https://github.com/SCRIPE-org/SCRIPE-Backend/blob/${commit}/${cleanPath}`;
    }
    if (pillar === "frontend" || sourcePath.startsWith("SCRIPE-Frontend/")) {
      return `https://github.com/SCRIPE-org/SCRIPE-Frontend/blob/${commit}/${cleanPath}`;
    }
    return `https://github.com/SCRIPE-org/SCRIPE/blob/${commit}/${sourcePath}`;
  };

  const getPillarIcon = (pillar: ArchifyPillar) => {
    switch (pillar) {
      case "fullstack":
        return <Layers className="w-3.5 h-3.5 text-primary" />;
      case "backend":
        return <Server className="w-3.5 h-3.5 text-sky-400" />;
      case "frontend":
        return <Monitor className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  const getPillarDot = (pillar: ArchifyPillar) => {
    switch (pillar) {
      case "fullstack":
        return "bg-primary";
      case "backend":
        return "bg-sky-400";
      case "frontend":
        return "bg-amber-400";
    }
  };

  const getPillarBadgeClass = (pillar: ArchifyPillar) => {
    switch (pillar) {
      case "fullstack":
        return "bg-primary/15 text-primary border-primary/30";
      case "backend":
        return "bg-sky-500/15 text-sky-400 border-sky-500/30";
      case "frontend":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    }
  };

  const groupedSidebarItems = useMemo(() => {
    const groups: Array<{ pillar: ArchifyPillar; label: string; items: ArchifyArtifactItem[] }> = [
      {
        pillar: "fullstack",
        label: "Super Full-Stack",
        items: filteredItems.filter((i) => i.pillar === "fullstack"),
      },
      {
        pillar: "backend",
        label: "Backend (.NET 10 + AstraFlow)",
        items: filteredItems.filter((i) => i.pillar === "backend"),
      },
      {
        pillar: "frontend",
        label: "Frontend (Next.js 16 MVVM)",
        items: filteredItems.filter((i) => i.pillar === "frontend"),
      },
    ];
    return groups.filter((g) => g.items.length > 0);
  }, [filteredItems]);

  const activeIframeSrc = useMemo(() => {
    const hash = hashFocus.trim() ? `#${hashFocus.trim().replace(/^#/, "")}` : "";
    return `${activeItem.htmlUrl}${hash}`;
  }, [activeItem.htmlUrl, hashFocus]);

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 flex flex-col bg-background text-foreground overflow-hidden"
          : "flex flex-col h-screen w-full bg-background text-foreground overflow-hidden"
      }
    >
      {!isFullscreen && (
        <DocsHeader
          onSearchOpen={() => setSearchOpen(true)}
          onMobileMenuOpen={() => setSidebarOpen((v) => !v)}
        />
      )}
      {/* =====================================================================
          1. SINGLE ULTRA-CLEAN 48PX TOP COMMAND BAR (Zero visual noise)
         ===================================================================== */}
      <header className="h-12 shrink-0 border-b border-border bg-card/90 backdrop-blur-md px-3 lg:px-4 flex items-center justify-between gap-2 z-20">
        {/* Left: Sidebar Toggle + Pillar Switcher + Mode Dropdown */}
        <div className="flex items-center gap-2 min-w-0">
          {viewMode === "studio" && (
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              title={sidebarOpen ? "Collapse Artifact Navigator" : "Expand Artifact Navigator"}
              className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-border bg-background/70 hover:bg-muted text-xs font-medium text-foreground transition-colors shrink-0"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <PanelLeftOpen className="w-3.5 h-3.5 text-primary" />
              )}
              <span className="hidden sm:inline">Catalog</span>
              <span className="px-1.5 py-0.2 rounded bg-muted text-[10px] font-mono text-muted-foreground">
                {filteredItems.length}
              </span>
            </button>
          )}

          {/* Segmented Pillar Switcher */}
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedPillar("all")}
              className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                selectedPillar === "all"
                  ? "bg-background text-foreground shadow-xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>All Pillars</span>
              <span className="text-[10px] font-mono opacity-75">23</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedPillar("fullstack")}
              className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                selectedPillar === "fullstack"
                  ? "bg-background text-primary shadow-xs border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Full-Stack</span>
              <span className="text-[10px] font-mono opacity-75">7</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedPillar("backend")}
              className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                selectedPillar === "backend"
                  ? "bg-background text-sky-400 shadow-xs border border-sky-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Backend</span>
              <span className="text-[10px] font-mono opacity-75">8</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedPillar("frontend")}
              className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                selectedPillar === "frontend"
                  ? "bg-background text-amber-400 shadow-xs border border-amber-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Frontend</span>
              <span className="text-[10px] font-mono opacity-75">8</span>
            </button>
          </div>

          {/* Clean Mode Select Dropdown (Replaces noisy 11-tab horizontal scroll strip) */}
          <div className="hidden md:flex items-center">
            <select
              aria-label="Filter by Archify Diagram Mode"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value as ArchifyMode | "all")}
              className="h-8 px-2.5 rounded-md border border-border bg-background text-xs font-medium text-foreground focus:outline-hidden focus:border-primary transition-colors cursor-pointer"
            >
              <option value="all">All 11 Modes (23)</option>
              {(Object.keys(ARCHIFY_MODE_META) as ArchifyMode[]).map((mode) => {
                const count = ARCHIFY_CATALOG.filter(
                  (i) =>
                    i.mode === mode &&
                    (selectedPillar === "all" || i.pillar === selectedPillar)
                ).length;
                return (
                  <option key={mode} value={mode}>
                    {ARCHIFY_MODE_META[mode].shortBadge} — {ARCHIFY_MODE_META[mode].label} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {(selectedPillar !== "all" || selectedMode !== "all" || searchQuery !== "") && (
            <button
              type="button"
              onClick={() => {
                setSelectedPillar("all");
                setSelectedMode("all");
                setSearchQuery("");
              }}
              title="Reset Filters"
              className="inline-flex items-center gap-1 h-7 px-2 rounded-md text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden lg:inline">Reset</span>
            </button>
          )}
        </div>

        {/* Right: Workspace View Switcher (Studio | Split Compare | 23-Page Atlas) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setViewMode("studio")}
              className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === "studio"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Studio</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === "split"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Split Compare</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("atlas")}
              className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === "atlas"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">23-Page Atlas</span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. MAIN WORKSPACE STAGE (Full remaining height, zero double scroll)
         ===================================================================== */}
      {viewMode === "studio" && (
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          {/* Collapsible Left Artifact Catalog Sidebar (Overlay on mobile, static flex child on md+) */}
          {sidebarOpen && (
            <>
              <div
                className="fixed inset-0 z-20 bg-black/40 backdrop-blur-[1px] md:hidden"
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
              />
              <aside className="absolute inset-y-0 left-0 z-30 w-72 xl:w-80 shrink-0 h-full flex flex-col border-r border-border bg-card shadow-2xl md:static md:z-auto md:shadow-none md:bg-card/50 select-none">
                {/* Search Box */}
                <div className="p-2.5 border-b border-border bg-card/80">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter 23 diagrams or source files..."
                      className="w-full h-8 pl-8 pr-7 rounded-md bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary transition-colors"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Grouped Scrollable Artifact List */}
                <div className="flex-1 overflow-y-auto divide-y divide-border/50">
                  {groupedSidebarItems.map((group) => (
                    <div key={group.pillar} className="py-2">
                      <div className="px-3 pb-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        <span className="flex items-center gap-1.5 font-semibold">
                          <span className={`w-1.5 h-1.5 rounded-full ${getPillarDot(group.pillar)}`} />
                          {group.label}
                        </span>
                        <span>{group.items.length}</span>
                      </div>
                      <div className="space-y-0.5 px-1.5">
                        {group.items.map((item) => {
                          const isSelected = item.id === activeItem.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setActiveId(item.id);
                                if (typeof window !== "undefined" && window.innerWidth < 768) {
                                  setSidebarOpen(false);
                                }
                              }}
                              className={`w-full text-left px-2.5 py-2 rounded-md transition-all flex items-start gap-2.5 group ${
                                isSelected
                                  ? "bg-primary/12 text-foreground border-l-2 border-primary shadow-2xs"
                                  : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <span
                                className={`mt-0.5 shrink-0 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${
                                  item.mode === "explainer"
                                    ? "bg-primary/15 text-primary border-primary/30"
                                    : "bg-muted text-muted-foreground border-border"
                                }`}
                              >
                                {ARCHIFY_MODE_META[item.mode].shortBadge.slice(0, 4)}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div
                                  className={`text-xs font-medium leading-snug truncate ${
                                    isSelected ? "text-foreground font-semibold" : "text-foreground/90"
                                  }`}
                                >
                                  {item.title}
                                </div>
                                <div className="text-[10px] text-muted-foreground truncate mt-0.5">
                                  {item.subtitle}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {groupedSidebarItems.length === 0 && (
                    <div className="p-6 text-center text-xs text-muted-foreground">
                      No Archify artifacts match &ldquo;{searchQuery}&rdquo;.
                    </div>
                  )}
                </div>

                {/* Compact Footer Status */}
                <div className="px-3 py-2 border-t border-border bg-card/80 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    23/23 Verified (0 Errors)
                  </span>
                  <span>Theme: {resolvedTheme === "light" ? "Light" : "Dark"}</span>
                </div>
              </aside>
            </>
          )}

          {/* Right Full-Height Canvas Stage */}
          <div className="flex-1 flex flex-col h-full min-w-0 bg-background relative">
            {/* Compact 40px Studio Toolbar */}
            <div className="h-10 shrink-0 border-b border-border bg-muted/25 px-3 flex items-center justify-between gap-2">
              {/* Left: Prev/Next + Pillar/Mode Badge + Active Title */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="inline-flex items-center rounded-md border border-border bg-background/80 p-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigatePrevNext(-1)}
                    title="Previous Artifact"
                    className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1.5 text-[10px] font-mono text-muted-foreground">
                    {activeIndex + 1}/{filteredItems.length || 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigatePrevNext(1)}
                    title="Next Artifact"
                    className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span
                  className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold border shrink-0 ${getPillarBadgeClass(
                    activeItem.pillar
                  )}`}
                >
                  {getPillarIcon(activeItem.pillar)}
                  {ARCHIFY_MODE_META[activeItem.mode].shortBadge}
                </span>

                <h1 className="text-xs sm:text-sm font-semibold text-foreground truncate">
                  {activeItem.title}
                </h1>
              </div>

              {/* Right: Archify Runtime Actions + Inspector Drawer Trigger + Standalone */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Explainer Live Style Switcher OR Native Diagram Quick Actions */}
                {activeItem.mode === "explainer" ? (
                  <div className="hidden lg:flex items-center gap-1 bg-background/80 border border-border rounded-md px-1.5 py-0.5">
                    <Palette className="w-3 h-3 text-muted-foreground mr-0.5" />
                    {(["editorial", "clean", "product", "swiss"] as ExplainerStyle[]).map(
                      (st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setExplainerStyle(st)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono capitalize transition-colors ${
                            explainerStyle === st
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {st}
                        </button>
                      )
                    )}
                  </div>
                ) : (
                  <div className="hidden lg:flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => triggerDiagramAction("btn-motion")}
                      title="Toggle Live Flow Animation / Still Mode"
                      className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-border bg-background/80 hover:bg-muted text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Play className="w-3 h-3 text-primary" />
                      <span>Motion</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerDiagramAction("btn-diagram-guide")}
                      title="Toggle Interactive Guided Views & Shortcuts"
                      className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-border bg-background/80 hover:bg-muted text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <HelpCircle className="w-3 h-3 text-sky-400" />
                      <span>Guide</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerDiagramAction("btn-export")}
                      title="Export SVG / PNG / WebM / Share Card"
                      className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-border bg-background/80 hover:bg-muted text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Download className="w-3 h-3 text-emerald-400" />
                      <span>Export</span>
                    </button>
                  </div>
                )}

                {/* Slide-over Inspector Drawer Trigger (Zero vertical space wasted!) */}
                <button
                  type="button"
                  onClick={() =>
                    setInspectorTab((prev) => (prev === "overview" ? null : "overview"))
                  }
                  className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border text-[11px] font-medium transition-colors ${
                    inspectorTab !== null
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-background/80 hover:bg-muted text-foreground"
                  }`}
                >
                  <Info className="w-3 h-3" />
                  <span>Sources & Spec</span>
                  <span className="hidden sm:inline px-1 rounded bg-muted/60 text-[10px] font-mono">
                    {activeItem.keySources.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (compareId === activeItem.id) {
                      const alt = ARCHIFY_CATALOG.find((i) => i.id !== activeItem.id);
                      if (alt) setCompareId(alt.id);
                    }
                    setViewMode("split");
                  }}
                  title="Compare Side-by-Side"
                  className="hidden sm:inline-flex items-center gap-1 h-7 px-2 rounded-md border border-border bg-background/80 hover:bg-muted text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Columns className="w-3 h-3" />
                  <span>Compare</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFullscreen((v) => !v)}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Canvas"}
                  className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-border bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>

                <a
                  href={activeIframeSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Standalone Self-Contained HTML"
                  className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md bg-primary text-primary-foreground text-[11px] font-semibold hover:opacity-90 transition-opacity"
                >
                  <span className="hidden sm:inline">Standalone</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Full-Height Canvas + Optional Slide-Over Inspector Drawer */}
            <div className="flex-1 w-full h-full min-h-0 relative overflow-hidden">
              <iframe
                ref={primaryIframeRef}
                key={activeIframeSrc}
                src={activeIframeSrc}
                title={activeItem.title}
                onLoad={() => syncIframeEnvironment(primaryIframeRef.current)}
                className="w-full h-full border-0 bg-background"
              />

              {/* Slide-Over Sources, Highlights & Spec Inspector Drawer */}
              {inspectorTab !== null && (
                <div className="absolute top-0 right-0 bottom-0 w-full max-w-lg bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl flex flex-col z-30 animate-in slide-in-from-right duration-150">
                  <div className="h-11 px-4 border-b border-border flex items-center justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-1 bg-muted p-0.5 rounded-md border border-border">
                      <button
                        type="button"
                        onClick={() => setInspectorTab("overview")}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                          inspectorTab === "overview"
                            ? "bg-background text-foreground shadow-2xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Architecture & Git Sources
                      </button>
                      <button
                        type="button"
                        onClick={() => setInspectorTab("spec")}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                          inspectorTab === "spec"
                            ? "bg-background text-foreground shadow-2xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Source Spec ({activeItem.mode === "explainer" ? ".archify.md" : ".json"})
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInspectorTab(null)}
                      className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {inspectorTab === "overview" ? (
                    <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                          Executive Summary
                        </div>
                        <p className="text-foreground/90 leading-relaxed">{activeItem.description}</p>
                      </div>

                      {/* 3 Key Highlights */}
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                          Key Architectural Guarantees
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {activeItem.highlights.map((hl) => (
                            <div
                              key={hl}
                              className="flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="font-mono font-medium text-foreground">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Verified GitHub Source Links */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                            Pinned Repository Evidence ({activeItem.repoName})
                          </span>
                          <span className="text-[10px] font-mono text-primary">
                            @{activeItem.repoCommit}
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {activeItem.keySources.map((src) => (
                            <a
                              key={src}
                              href={getGithubUrl(activeItem.pillar, src, activeItem.repoCommit)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-background border border-border hover:border-primary/50 text-foreground transition-colors group"
                            >
                              <span className="flex items-center gap-2 font-mono text-[11px] truncate">
                                <FileCode2 className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span className="truncate">{src}</span>
                              </span>
                              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Deep-Link & Route Hash Builder */}
                      <div className="pt-2 border-t border-border">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                          Deep-Link Hash Targeting (#focus= / #route= / #section)
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={hashFocus}
                            onChange={(e) => setHashFocus(e.target.value)}
                            placeholder={
                              activeItem.mode === "explainer"
                                ? "e.g. fullstack-sequence or uat-checklist"
                                : "e.g. focus=astraflow_bus or route=edge_guard,base_db"
                            }
                            className="flex-1 h-8 px-2.5 rounded-md bg-background border border-border text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary"
                          />
                          <button
                            type="button"
                            onClick={handleCopyDeepLink}
                            className="inline-flex items-center gap-1 h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 shrink-0"
                          >
                            {copiedLink ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy URL</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Direct Route Link */}
                      <div className="pt-2 border-t border-border flex items-center justify-between">
                        <Link
                          href={`/archify/${activeItem.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                        >
                          <span>Dedicated Permalink (/archify/{activeItem.id})</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                        <a
                          href={activeItem.specUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-mono"
                        >
                          <span>Raw Spec</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col min-h-0">
                      <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                        <span className="truncate">{activeItem.specUrl}</span>
                        <button
                          type="button"
                          onClick={handleCopySpec}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border bg-background hover:bg-muted text-foreground"
                        >
                          {copiedSpec ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Spec</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="flex-1 overflow-auto p-4 text-[11px] font-mono leading-relaxed text-foreground/90 bg-background select-all">
                        {specLoading ? "Loading specification source..." : specContent}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          3. SPLIT-SCREEN ARCHITECTURAL COMPARISON WORKSPACE
         ===================================================================== */}
      {viewMode === "split" && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Curated 1-Click Architectural Comparison Presets Bar */}
          <div className="h-10 shrink-0 border-b border-border bg-muted/20 px-4 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mr-1 shrink-0">
                Compare Presets:
              </span>
              {SPLIT_PRESETS.map((preset) => {
                const isCurrent =
                  activeItem.id === preset.leftId && compareItem.id === preset.rightId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setActiveId(preset.leftId);
                      setCompareId(preset.rightId);
                    }}
                    className={`h-7 px-2.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors border ${
                      isCurrent
                        ? "bg-primary/15 text-primary border-primary/40 font-semibold"
                        : "bg-background/70 text-muted-foreground border-border hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                const left = activeItem.id;
                setActiveId(compareItem.id);
                setCompareId(left);
              }}
              className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md border border-border bg-background hover:bg-muted text-xs font-medium text-foreground shrink-0"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-primary" />
              <span>Swap Panes</span>
            </button>
          </div>

          {/* 2 Equal Full-Height Comparison Panes */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border min-h-0">
            {/* Left Pane */}
            <div className="flex flex-col h-full min-h-0 bg-background">
              <div className="h-10 shrink-0 px-3 border-b border-border bg-card/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/30 text-[10px] font-mono font-bold shrink-0">
                    LEFT
                  </span>
                  <select
                    aria-label="Left Comparison Artifact"
                    value={activeItem.id}
                    onChange={(e) => setActiveId(e.target.value)}
                    className="h-7 px-2 rounded border border-border bg-background text-xs font-semibold text-foreground truncate max-w-full focus:outline-hidden focus:border-primary"
                  >
                    {ARCHIFY_CATALOG.map((item) => (
                      <option key={item.id} value={item.id}>
                        [{item.pillar.toUpperCase()} · {ARCHIFY_MODE_META[item.mode].shortBadge}]{" "}
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <a
                  href={activeItem.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-primary shrink-0"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <iframe
                ref={primaryIframeRef}
                key={`split-left-${activeItem.id}`}
                src={activeItem.htmlUrl}
                title={activeItem.title}
                onLoad={() => syncIframeEnvironment(primaryIframeRef.current)}
                className="flex-1 w-full h-full border-0 bg-background"
              />
            </div>

            {/* Right Pane */}
            <div className="flex flex-col h-full min-h-0 bg-background">
              <div className="h-10 shrink-0 px-3 border-b border-border bg-card/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30 text-[10px] font-mono font-bold shrink-0">
                    RIGHT
                  </span>
                  <select
                    aria-label="Right Comparison Artifact"
                    value={compareItem.id}
                    onChange={(e) => setCompareId(e.target.value)}
                    className="h-7 px-2 rounded border border-border bg-background text-xs font-semibold text-foreground truncate max-w-full focus:outline-hidden focus:border-primary"
                  >
                    {ARCHIFY_CATALOG.map((item) => (
                      <option key={item.id} value={item.id}>
                        [{item.pillar.toUpperCase()} · {ARCHIFY_MODE_META[item.mode].shortBadge}]{" "}
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <a
                  href={compareItem.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-primary shrink-0"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <iframe
                ref={compareIframeRef}
                key={`split-right-${compareItem.id}`}
                src={compareItem.htmlUrl}
                title={compareItem.title}
                onLoad={() => syncIframeEnvironment(compareIframeRef.current)}
                className="flex-1 w-full h-full border-0 bg-background"
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          4. 23-PAGE BENTO ATLAS GALLERY VIEW
         ===================================================================== */}
      {viewMode === "atlas" && (
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
          {/* Search & Pillar Summary Banner */}
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SCRIPE v6.0 Single Source of Truth Atlas</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                23 Verified Archify Explainers & Native Diagrams
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Every artifact is compiled to self-contained static HTML with zero external runtime
                dependencies, verified with 0 layout/schema errors, and pinned to Git commits.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 23 artifacts, C# or TS files..."
                className="w-full h-9 pl-9 pr-4 rounded-lg bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-card border border-border hover:border-primary/50 transition-all p-5 flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${getPillarBadgeClass(
                        item.pillar
                      )}`}
                    >
                      {getPillarIcon(item.pillar)}
                      {ARCHIFY_PILLAR_META[item.pillar].shortLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-muted border border-border text-[10px] font-mono font-bold uppercase text-foreground">
                      {ARCHIFY_MODE_META[item.mode].shortBadge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.highlights.map((hl) => (
                      <span
                        key={hl}
                        className="px-2 py-0.5 rounded bg-background border border-border text-[10px] font-mono text-foreground/90"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(item.id);
                      setViewMode("studio");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open in Studio</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setCompareId(item.id);
                        setViewMode("split");
                      }}
                      className="px-2.5 py-1.5 rounded-md border border-border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Compare
                    </button>
                    <a
                      href={item.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Standalone HTML"
                      className="p-1.5 rounded-md border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <DocsSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={(q) => docsContainer.docsRepository.search(q)}
        basePath="/technical"
      />
    </div>
  );
}
