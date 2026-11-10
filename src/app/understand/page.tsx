// FILE-EXCEPTION: file length
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Database,
  Code2,
  BookOpen,
  FileText,
  Search,
  ExternalLink,
  Maximize2,
  Minimize2,
  Workflow,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Boxes,
  ArrowRight,
  Globe2,
  Compass,
  RefreshCw,
} from "lucide-react";
import { DocsHeader } from "@/engine/presentation/components/layout/DocsHeader";
import { DocsSearch } from "@/engine/presentation/components/ui/DocsSearch";
import { docsContainer } from "@/di";

type MainWorkspaceTab =
  | "command-overview"
  | "graph-backend"
  | "graph-wiki"
  | "graph-fullstack"
  | "graph-frontend"
  | "module-explorer"
  | "domain-flows"
  | "wiki-reader"
  | "master-guides";

interface PortalDefinition {
  id: MainWorkspaceTab;
  shortLabel: string;
  title: string;
  port: number;
  staticUrl: string;
  liveUrl: string;
  badge: string;
  stats: string;
  description: string;
  capabilities: string[];
}

const LIVE_GRAPH_PORTALS: PortalDefinition[] = [
  {
    id: "graph-backend",
    shortLabel: "1. Backend Graph",
    title: "SCRIPE-Backend Super Graph & 18-Module Domain Architecture",
    port: 5173,
    staticUrl: "/understand-hub/viewer/index.html?graph=/understand-hub/backend-knowledge-graph.json&domain=/understand-hub/backend-domain-graph.json",
    liveUrl: "http://127.0.0.1:5173/?token=scripe",
    badge: "PRIMARY BACKEND FOCUS",
    stats: "16,242 Nodes · 53,541 Edges · 22 Layers · 22-Step Tour · 18 Domains",
    description:
      "Complete structural and domain knowledge graph of the .NET 10 Modular Monolith across all 18 modules, 991 HTTP endpoints, 981 AstraFlow CQRS commands/queries, 436 entities, and 251 database tables.",
    capabilities: [
      "Switch Overview / Learn / Deep Dive modes",
      "Toggle Structural (22 Layers) vs Domain (18 Business Domains & 36 Flows)",
      "Toggle Files / +Classes / Classes + FN (1,741 C# methods)",
      "Click any Flow Step -> Open Code in live C# CodeViewer",
      "Toggle Diff ON/OFF blast-radius impact overlay",
    ],
  },
  {
    id: "graph-wiki",
    shortLabel: "2. Wiki Graph",
    title: "Karpathy LLM Wiki Conceptual Knowledge Graph",
    port: 5174,
    staticUrl: "/understand-hub/viewer/index.html?graph=/understand-hub/wiki-knowledge-graph.json",
    liveUrl: "http://127.0.0.1:5174/?token=scripe",
    badge: "KNOWLEDGE GRAPH",
    stats: "129 Nodes (36 Articles, 62 Entities, 22 Claims) · 430 Edges · 25-Step Tour",
    description:
      "Conceptual knowledge graph uniting 36 deep-dive architecture articles, all 18 Backend Module encyclopedias, [[wikilinks]], backlinks, and verifiable architectural claims.",
    capabilities: [
      "Click any Article, Claim, Entity, or Topic node to read full Markdown inside the inspector",
      "Traverse explicit [[wikilink]] and backlink edges",
      "Run the 25-Step Guided Knowledge Tour across all 18 modules",
      "Filter by 8 conceptual knowledge layers",
    ],
  },
  {
    id: "graph-fullstack",
    shortLabel: "3. Full-Stack Graph",
    title: "Unified Full-Stack Monorepo Graph (Backend .NET 10 + Frontend Next.js 16)",
    port: 5175,
    staticUrl: "/understand-hub/viewer/index.html?graph=/understand-hub/fullstack-knowledge-graph.json&domain=/understand-hub/fullstack-domain-graph.json",
    liveUrl: "http://127.0.0.1:5175/?token=scripe",
    badge: "FULL-STACK MONOREPO",
    stats: "25,504 Nodes · 71,683 Edges · 38 Layers · 38-Step Master Tour",
    description:
      "Merged cross-stack knowledge graph uniting SCRIPE-Backend (22 module layers) and SCRIPE-Frontend (16 MVVM layers) into a single interactive topology.",
    capabilities: [
      "38 Architectural Layers (22 Backend + 16 Frontend)",
      "38-Step Master Tour walking through Backend then Frontend",
      "Cross-stack Path Finder & Fuzzy/Semantic Search",
      "Full 18-Domain Business Flow View included",
    ],
  },
  {
    id: "graph-frontend",
    shortLabel: "4. Frontend Graph",
    title: "SCRIPE-Frontend Next.js 16 + React 19 MVVM & Nexus Design Graph",
    port: 5176,
    staticUrl: "/understand-hub/viewer/index.html?graph=/understand-hub/frontend-knowledge-graph.json&domain=/understand-hub/frontend-domain-graph.json",
    liveUrl: "http://127.0.0.1:5176/?token=scripe",
    badge: "NEXT.JS 16 MVVM",
    stats: "9,269 Nodes · 18,142 Edges · 16 MVVM Layers · 16-Step Tour · 14 Domains",
    description:
      "Complete frontend structural and domain graph mapping 4,156 files and 5,113 exported Views, ViewModels, Hooks, Repositories, Services, and bilingual EN/AR locales.",
    capabilities: [
      "16 Clean Feature Module & @core/ui/* Layers",
      "14 Frontend Business Domains & 4-Step MVVM Flows (View -> ViewModel -> Repository -> Service)",
      "Classes + FN granularity showing all 5,113 exported hooks & components",
      "Live TSX/TS CodeViewer on every node and flow step",
    ],
  },
];

export default function DocsUnderstandHubPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MainWorkspaceTab>("command-overview");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [useLivePort, setUseLivePort] = useState(false);

  // Loaded JSON datasets from /understand-hub/*
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [moduleStats, setModuleStats] = useState<Record<string, any>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [domainGraph, setDomainGraph] = useState<{ nodes: any[]; edges: any[] }>({
    nodes: [],
    edges: [],
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wikiArticles, setWikiArticles] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [masterDocs, setMasterDocs] = useState<any[]>([]);

  const [selectedModule, setSelectedModule] = useState<string>("Identity");
  const [symbolFilter, setSymbolFilter] = useState<string>("");
  const [selectedWikiSlug, setSelectedWikiSlug] = useState<string>("scripe-platform-overview");
  const [selectedDocId, setSelectedDocId] = useState<string>("00_MASTER_BACKEND_SUPER_ATLAS");

  useEffect(() => {
    fetch("/understand-hub/module-stats.json")
      .then((r) => r.json())
      .then((d) => setModuleStats(d.modules || d))
      .catch(() => {});
    fetch("/understand-hub/backend-domain-graph.json")
      .then((r) => r.json())
      .then((d) => setDomainGraph(d))
      .catch(() => {});
    fetch("/understand-hub/wiki-articles.json")
      .then((r) => r.json())
      .then((d) => {
        setWikiArticles(d);
        if (d.length > 0) setSelectedWikiSlug(d[0].slug);
      })
      .catch(() => {});
    fetch("/understand-hub/master-docs.json")
      .then((r) => r.json())
      .then((d) => {
        setMasterDocs(d);
        if (d.length > 0) setSelectedDocId(d[0].id);
      })
      .catch(() => {});
  }, []);

  const handleSearch = (query: string) => {
    return docsContainer.docsRepository.search(query);
  };

  const sortedModuleKeys = useMemo(() => {
    return Object.keys(moduleStats).sort((a, b) => {
      const sa = moduleStats[a] || {};
      const sb = moduleStats[b] || {};
      const countA = (sa.commands?.length || 0) + (sa.endpoints?.length || 0) + (sa.entities?.length || 0);
      const countB = (sb.commands?.length || 0) + (sb.endpoints?.length || 0) + (sb.entities?.length || 0);
      return countB - countA;
    });
  }, [moduleStats]);

  const activePortal = LIVE_GRAPH_PORTALS.find((p) => p.id === activeTab);
  const currentModData = moduleStats[selectedModule] || {};
  const currentWikiArticle =
    wikiArticles.find((a) => a.slug === selectedWikiSlug) || wikiArticles[0];
  const currentMasterDoc =
    masterDocs.find((d) => d.id === selectedDocId) || masterDocs[0];

  const domainNodes = useMemo(
    () => (domainGraph.nodes || []).filter((n) => n.type === "domain"),
    [domainGraph],
  );
  const flowNodes = useMemo(
    () => (domainGraph.nodes || []).filter((n) => n.type === "flow"),
    [domainGraph],
  );
  const stepNodes = useMemo(
    () => (domainGraph.nodes || []).filter((n) => n.type === "step"),
    [domainGraph],
  );

  // Helper to filter symbol arrays
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterSymbols = (items: any[] | undefined) => {
    const list = items || [];
    const q = symbolFilter.trim().toLowerCase();
    if (!q) return list;
    return list.filter((it) =>
      JSON.stringify(it).toLowerCase().includes(q),
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-foreground">
      {!isFullscreen && (
        <DocsHeader
          onSearchOpen={() => setSearchOpen(true)}
          onMobileMenuOpen={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      )}

      {/* Sub-Navigation Command Bar */}
      <div className="sticky top-[57px] z-30 border-b border-border bg-card/95 backdrop-blur-md px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="font-bold text-sm tracking-tight text-foreground">
            UNDERSTAND-ANYTHING{" "}
            <span className="text-primary font-mono">SUPER COMMAND HUB</span>
          </span>
          <span className="hidden xl:inline-flex text-[11px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
            Static CDN + Live Graph Ready
          </span>
        </div>

        {/* 9-Tab Workspace Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-muted/50 p-1 rounded-xl border border-border">
          {[
            { id: "command-overview", label: "All Portals Hub", icon: Compass },
            { id: "graph-backend", label: "1. Backend Graph", icon: Cpu },
            { id: "graph-wiki", label: "2. Wiki Graph", icon: BookOpen },
            { id: "graph-fullstack", label: "3. Full-Stack Graph", icon: Globe2 },
            { id: "graph-frontend", label: "4. Frontend Graph", icon: Layers },
            { id: "module-explorer", label: "5. 18-Module Explorer", icon: Database },
            { id: "domain-flows", label: "6. 18 Domains & 36 Flows", icon: Workflow },
            { id: "wiki-reader", label: "7. 36 Wiki Articles", icon: Sparkles },
            { id: "master-guides", label: "8. Master Hub Guides", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as MainWorkspaceTab)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* ── TAB 0: ALL PORTALS COMMAND OVERVIEW ─────────────────── */}
        {activeTab === "command-overview" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 w-full">
            {/* Hero Banner */}
            <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-card via-card to-primary/10 p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-mono font-semibold">
                    <Sparkles size={13} />
                    <span>INTEGRATED IN SCRIPE DOCS PORTAL · STATIC CDN & LIVE GRAPH</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    Understand-Anything Super Architecture Command Center
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every capability of{" "}
                    <code className="text-primary font-mono">/understand</code>,{" "}
                    <code className="text-primary font-mono">/understand-domain</code>,{" "}
                    <code className="text-primary font-mono">/understand-knowledge</code>,{" "}
                    <code className="text-primary font-mono">/understand-onboard</code>,{" "}
                    <code className="text-primary font-mono">/understand-explain</code>,{" "}
                    <code className="text-primary font-mono">/understand-diff</code>, and{" "}
                    <code className="text-primary font-mono">/understand-dashboard</code>{" "}
                    embedded natively inside the SCRIPE Documentation Portal with static CDN bundle
                    delivery for Vercel production and optional local dev server toggle.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab("graph-backend")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:opacity-95 transition cursor-pointer"
                  >
                    <Cpu size={15} />
                    <span>Open Backend Super Graph</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("module-explorer")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:border-primary/50 text-foreground font-semibold text-xs transition cursor-pointer"
                  >
                    <Database size={15} className="text-primary" />
                    <span>Explore All 18 Modules</span>
                  </button>
                </div>
              </div>

              {/* 6-Metric Summary Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-border/80">
                {[
                  { label: "Backend Nodes", value: "16,242", sub: "53,541 Edges · 22 Layers" },
                  { label: "Full-Stack Nodes", value: "25,504", sub: "71,683 Edges · 38 Layers" },
                  { label: "Backend Modules", value: "18 + 2", sub: "436 Domain Entities" },
                  { label: "HTTP Endpoints", value: "991", sub: "141 Controllers Mapped" },
                  { label: "AstraFlow CQRS", value: "981", sub: "596 Cmds · 385 Queries" },
                  { label: "Isolated DB Tables", value: "251", sub: "19 EF Core DbContexts" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-border bg-background/60 p-3"
                  >
                    <div className="text-[11px] font-mono uppercase text-muted-foreground">
                      {m.label}
                    </div>
                    <div className="text-xl font-extrabold font-mono text-primary mt-0.5">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {m.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Live Graph Portals Bento Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    1. Interactive Knowledge Graph Portals (Static CDN + Live Mode)
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Click &ldquo;Launch Embedded inside Docs Portal&rdquo; to inspect the interactive graph right here via the self-contained Vercel CDN bundle.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {LIVE_GRAPH_PORTALS.map((portal) => (
                  <div
                    key={portal.id}
                    className="rounded-2xl border border-border bg-card hover:border-primary/60 p-6 flex flex-col justify-between transition-all shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
                          {portal.badge}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          Static CDN · Dev :{portal.port}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-1.5">
                        {portal.title}
                      </h3>
                      <div className="text-xs font-mono text-primary mb-3">
                        {portal.stats}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {portal.description}
                      </p>

                      <ul className="space-y-1.5 mb-6">
                        {portal.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-2 text-xs text-foreground/90"
                          >
                            <CheckCircle2
                              size={14}
                              className="text-primary shrink-0 mt-0.5"
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-border">
                      <button
                        onClick={() => setActiveTab(portal.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-95 transition cursor-pointer"
                      >
                        <Maximize2 size={13} />
                        <span>Launch Embedded in Docs Portal</span>
                      </button>
                      <a
                        href={portal.staticUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground text-xs font-semibold transition"
                      >
                        <span>Direct Tab (Static CDN)</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Built-in Native Explorers Grid */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                2. Built-in Native Architecture Explorers & Encyclopedias
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    id: "module-explorer" as MainWorkspaceTab,
                    icon: Database,
                    title: "18-Module Backend Symbol Explorer",
                    desc: "Browse and filter all 436 Entities, 596 Commands, 385 Queries, 1,820 Handlers, 451 Validators, 251 Tables, and 991 Endpoints per module.",
                    cta: "Open Symbol Explorer",
                  },
                  {
                    id: "domain-flows" as MainWorkspaceTab,
                    icon: Workflow,
                    title: "18 Business Domains & 36 Flows",
                    desc: "Inspect every module's DDD Bounded Context rules, Cross-Domain contracts, and 4-step Write & Read execution pipelines.",
                    cta: "Open Domain Flows",
                  },
                  {
                    id: "wiki-reader" as MainWorkspaceTab,
                    icon: BookOpen,
                    title: "36 Karpathy LLM Wiki Articles",
                    desc: "Read all 36 interconnected Markdown knowledge articles covering every backend module, AstraFlow 2.3.0, PBAC, and Outbox.",
                    cta: "Read Wiki Articles",
                  },
                  {
                    id: "master-guides" as MainWorkspaceTab,
                    icon: FileText,
                    title: "7 Master Engineering Guides",
                    desc: "Read the Super Atlas, 18-Module Encyclopedia, Onboarding Bible, Deep-Dive Explain, Domain Flows, Blast Radius, and User Manual.",
                    cta: "Read Master Guides",
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.id}
                      onClick={() => setActiveTab(card.id)}
                      className="text-left rounded-2xl border border-border bg-card hover:border-primary/60 p-5 flex flex-col justify-between transition-all group cursor-pointer"
                    >
                      <div>
                        <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                          <Icon size={20} />
                        </div>
                        <h3 className="font-bold text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs font-semibold text-primary">
                        <span>{card.cta}</span>
                        <ArrowRight size={13} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── TABS 1–4: EMBEDDED GRAPH PORTALS (STATIC CDN + LOCAL DEV DUAL-MODE) ── */}
        {activePortal && (
          <div
            className={`flex-1 flex flex-col ${
              isFullscreen ? "fixed inset-0 z-50 bg-background" : "h-[calc(100vh-115px)]"
            }`}
          >
            {/* Portal Control Bar */}
            <div className="bg-card border-b border-border px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/30">
                  {useLivePort ? `PORT :${activePortal.port}` : "STATIC CDN"}
                </span>
                <span className="text-xs font-bold text-foreground">
                  {activePortal.title}
                </span>
                <span className="hidden lg:inline text-xs font-mono text-muted-foreground">
                  — {activePortal.stats}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Dual-Mode Toggle: Static CDN (Vercel) vs Local Port */}
                <button
                  onClick={() => setUseLivePort(!useLivePort)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                    !useLivePort
                      ? "bg-primary/15 border-primary text-primary"
                      : "bg-muted/40 border-border text-foreground hover:bg-muted"
                  }`}
                  title={
                    useLivePort
                      ? "Switch to Production/Vercel Static CDN Viewer"
                      : "Switch to Local Dev Port (:5173..:5176)"
                  }
                >
                  <span>{!useLivePort ? "⚡ Static CDN (Vercel Ready)" : `🖥️ Live Port :${activePortal.port}`}</span>
                </button>
                <button
                  onClick={() => setIframeKey((k) => k + 1)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-muted/40 hover:bg-muted text-xs text-foreground transition cursor-pointer"
                  title="Reload embedded graph"
                >
                  <RefreshCw size={12} />
                  <span>Reload Graph</span>
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-muted/40 hover:bg-muted text-xs text-foreground transition cursor-pointer"
                >
                  {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                  <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen Canvas"}</span>
                </button>
                <a
                  href={useLivePort ? activePortal.liveUrl : activePortal.staticUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-95 transition"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Embedded Live Graph Iframe */}
            <iframe
              key={`${activePortal.id}-${iframeKey}-${useLivePort ? "live" : "static"}`}
              src={useLivePort ? activePortal.liveUrl : activePortal.staticUrl}
              className="flex-1 w-full border-0 bg-[#090d16]"
              title={activePortal.title}
              allow="clipboard-read; clipboard-write; fullscreen"
            />
          </div>
        )}

        {/* ── TAB 5: 18-MODULE BACKEND SYMBOL EXPLORER ────────────── */}
        {activeTab === "module-explorer" && (
          <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-115px)] overflow-hidden">
            {/* Left Sidebar: 18 Modules + Core + Host.API */}
            <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-card/50 flex flex-col min-h-0 shrink-0">
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    value={symbolFilter}
                    onChange={(e) => setSymbolFilter(e.target.value)}
                    placeholder="Filter symbols (e.g. Booking, Lead, POST)..."
                    className="w-full pl-8 pr-3 py-2 rounded-lg bg-background border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {sortedModuleKeys.map((mod) => {
                  const s = moduleStats[mod] || {};
                  const isSelected = mod === selectedModule;
                  return (
                    <button
                      key={mod}
                      onClick={() => setSelectedModule(mod)}
                      className={`w-full text-left p-2.5 rounded-lg border transition flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-primary/15 border-primary text-primary"
                          : "bg-background/50 border-border text-foreground hover:bg-muted/60"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs">{mod}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          {(s.entities || []).length} Ent · {(s.endpoints || []).length} Ep ·{" "}
                          {(s.commands || []).length + (s.queries || []).length} CQRS ·{" "}
                          {(s.tables || []).length} Tbl
                        </div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-foreground font-mono">
                        {(s.files || []).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Detail Workspace */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 p-3 border-b border-border bg-card/30 shrink-0">
                {[
                  ["Module / Scope", selectedModule],
                  ["Domain Entities", (currentModData.entities || []).length],
                  ["CQRS Commands", (currentModData.commands || []).length],
                  ["CQRS Queries", (currentModData.queries || []).length],
                  ["Validators", (currentModData.validators || []).length],
                  ["DB Tables (DbSets)", (currentModData.tables || []).length],
                  ["HTTP Endpoints", (currentModData.endpoints || []).length],
                  [
                    "Seeders & Jobs",
                    (currentModData.seeders || []).length +
                      (currentModData.jobs || []).length +
                      (currentModData.providers || []).length,
                  ],
                ].map(([label, val]) => (
                  <div
                    key={String(label)}
                    className="p-2.5 rounded-lg bg-card border border-border"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {label}
                    </div>
                    <div className="text-sm font-bold text-foreground font-mono mt-0.5">
                      {val}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {[
                  {
                    title: "Domain Entities (AuditableEntity / Aggregate Roots)",
                    items: filterSymbols(currentModData.entities),
                    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
                  },
                  {
                    title: "REST API Controllers & HTTP Endpoints",
                    items: filterSymbols(currentModData.endpoints),
                    badge: "bg-primary/15 text-primary border-primary/30",
                  },
                  {
                    title: "AstraFlow CQRS Commands (ICommand<T>)",
                    items: filterSymbols(currentModData.commands),
                    badge: "bg-sky-500/15 text-sky-400 border-sky-500/30",
                  },
                  {
                    title: "AstraFlow CQRS Queries (IQuery<T>)",
                    items: filterSymbols(currentModData.queries),
                    badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
                  },
                  {
                    title: "Command & Query Handlers (Returning Result<T>)",
                    items: filterSymbols([
                      ...(currentModData.commandHandlers || []),
                      ...(currentModData.queryHandlers || []),
                    ]),
                    badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
                  },
                  {
                    title: "FluentValidation Validators (AbstractValidator<T>)",
                    items: filterSymbols(currentModData.validators),
                    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
                  },
                  {
                    title: "EF Core Database Tables (DbSet<T>) & DbContexts",
                    items: filterSymbols([
                      ...(currentModData.dbContexts || []),
                      ...(currentModData.tables || []),
                    ]),
                    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
                  },
                  {
                    title: "UAT Seeders, Permission/Feature/Menu Providers & Background Jobs",
                    items: filterSymbols([
                      ...(currentModData.providers || []),
                      ...(currentModData.seeders || []),
                      ...(currentModData.jobs || []),
                    ]),
                    badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
                  },
                ].map((group) => (
                  <div
                    key={group.title}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-foreground">
                        {group.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded border font-mono ${group.badge}`}
                      >
                        {group.items.length}
                      </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {group.items.slice(0, 300).map((item, idx) => {
                        const title =
                          typeof item === "string"
                            ? item
                            : item.route
                              ? `${item.verb || item.httpMethod || "HTTP"} ${item.route}`
                              : item.table
                                ? `${item.schema}.${item.table} (${item.entity})`
                                : item.name || JSON.stringify(item);
                        const sub =
                          typeof item === "object"
                            ? item.filePath ||
                              item.file ||
                              item.controller ||
                              ""
                            : "";
                        return (
                          <div
                            key={`${title}-${idx}`}
                            className="p-2.5 rounded-lg bg-background border border-border/80 hover:border-primary/40 transition"
                          >
                            <div
                              className="text-xs font-mono font-semibold text-primary truncate"
                              title={title}
                            >
                              {title}
                            </div>
                            {sub && (
                              <div
                                className="text-[10px] text-muted-foreground truncate font-mono mt-0.5"
                                title={sub}
                              >
                                {sub}
                                {item.line ? `:${item.line}` : ""}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {group.items.length === 0 && (
                        <div className="text-xs text-muted-foreground italic">
                          No matching symbols in this module.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 6: 18 BUSINESS DOMAINS & 36 FLOWS ───────────────── */}
        {activeTab === "domain-flows" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  All 18 Backend Business Domains, 36 Operational Flows & 144 Code-Anchored Steps
                </h2>
                <p className="text-xs text-muted-foreground">
                  Generated by <code className="text-primary font-mono">/understand-domain</code> — want to explore this visually as a force-directed flow graph? Click{" "}
                  <button
                    onClick={() => setActiveTab("graph-backend")}
                    className="text-primary underline font-semibold cursor-pointer"
                  >
                    1. Backend Graph (:5173)
                  </button>{" "}
                  and toggle <code className="text-primary font-mono">Domain</code> in the top bar.
                </p>
              </div>
            </div>

            {domainNodes.map((dom) => {
              const dm = dom.domainMeta || {};
              const domFlows = flowNodes.filter((f) =>
                (domainGraph.edges || []).some(
                  (e) => e.source === dom.id && e.target === f.id,
                ),
              );
              return (
                <div
                  key={dom.id}
                  className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3">
                    <div>
                      <h3 className="text-base font-bold text-primary">
                        {dom.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {dom.summary}
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-muted font-mono text-muted-foreground">
                      {dom.id}
                    </span>
                  </div>

                  {/* Entities & Rules */}
                  {dm.entities && dm.entities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {dm.entities.map((ent: string) => (
                        <span
                          key={ent}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted/70 border border-border text-foreground"
                        >
                          {ent}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Write & Read Flows */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {domFlows.map((fl) => {
                      const fm = fl.domainMeta || {};
                      const flSteps = stepNodes.filter((s) =>
                        (domainGraph.edges || []).some(
                          (e) => e.source === fl.id && e.target === s.id,
                        ),
                      );
                      return (
                        <div
                          key={fl.id}
                          className="p-4 rounded-xl bg-background border border-border space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="font-bold text-xs text-foreground">
                              {fl.name}
                            </div>
                            {fm.entryPoint && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/15 text-primary">
                                {fm.entryPoint}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            {fl.summary}
                          </p>
                          <div className="space-y-1.5 pt-1">
                            {flSteps.map((st) => (
                              <div
                                key={st.id}
                                className="p-2.5 rounded-lg bg-card border border-border/80 text-[11px]"
                              >
                                <div className="font-semibold text-primary">
                                  {st.name}
                                </div>
                                <div className="text-muted-foreground mt-0.5">
                                  {st.summary}
                                </div>
                                {st.filePath && (
                                  <div className="text-[10px] font-mono text-muted-foreground/80 mt-1">
                                    📄 {st.filePath}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── TAB 7: 36 KARPATHY WIKI ARTICLES READER ─────────────── */}
        {activeTab === "wiki-reader" && (
          <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-115px)] overflow-hidden">
            <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-card/50 overflow-y-auto p-2 space-y-1 shrink-0">
              {wikiArticles.map((art) => {
                const isSelected = art.slug === selectedWikiSlug;
                return (
                  <button
                    key={art.slug}
                    onClick={() => setSelectedWikiSlug(art.slug)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 border-primary text-primary font-bold"
                        : "bg-background/50 border-border text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <div>{art.title}</div>
                    <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      {art.category}
                    </div>
                  </button>
                );
              })}
            </aside>
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {currentWikiArticle && (
                <div className="max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <span className="text-xs font-mono text-primary uppercase">
                        {currentWikiArticle.category}
                      </span>
                      <h1 className="text-2xl font-bold text-foreground mt-1">
                        {currentWikiArticle.title}
                      </h1>
                    </div>
                    <button
                      onClick={() => setActiveTab("graph-wiki")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold cursor-pointer"
                    >
                      <BookOpen size={13} />
                      <span>View in Live Wiki Graph (:5174)</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground/90 bg-card border border-border rounded-xl p-5 overflow-x-auto">
                    {currentWikiArticle.content}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 8: 7 MASTER HUB ENGINEERING GUIDES ──────────────── */}
        {activeTab === "master-guides" && (
          <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-115px)] overflow-hidden">
            <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-card/50 overflow-y-auto p-2 space-y-1 shrink-0">
              {masterDocs.map((doc) => {
                const isSelected = doc.id === selectedDocId;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 border-primary text-primary font-bold"
                        : "bg-background/50 border-border text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <div>{doc.title}</div>
                    <div className="text-[10px] text-muted-foreground mt-1 leading-snug">
                      {doc.description}
                    </div>
                  </button>
                );
              })}
            </aside>
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {currentMasterDoc && (
                <div className="max-w-5xl mx-auto space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <span className="text-xs font-mono text-primary">
                        UNDERSTAND_SUPER_HUB / {currentMasterDoc.fileName}
                      </span>
                      <h1 className="text-2xl font-bold text-foreground mt-1">
                        {currentMasterDoc.title}
                      </h1>
                    </div>
                    <a
                      href={`/understand-hub/docs/${currentMasterDoc.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground"
                    >
                      <span>Raw Markdown</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground/90 bg-card border border-border rounded-xl p-5 overflow-x-auto">
                    {currentMasterDoc.content}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <DocsSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
        basePath="/technical"
      />
    </div>
  );
}
