"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Building2,
  Search,
  ArrowRight,
  ShieldCheck,
  Layers,
  Database,
  Terminal,
  Compass,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Boxes,
  Repeat,
  Copy,
  Check,
} from "lucide-react";
import { DocsHeader } from "@/engine/presentation/components/layout/DocsHeader";
import { DocsSearch } from "@/engine/presentation/components/ui/DocsSearch";
import { ArchitectureRadar } from "@/components/landing/ArchitectureRadar";
import { InteractiveCliPreview } from "@/components/landing/InteractiveCliPreview";
import { docsContainer } from "@/di";

export default function DocsLandingHub() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  // Search handler using repository
  const handleSearch = (query: string) => {
    return docsContainer.docsRepository.search(query);
  };

  const copyQuickCommand = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-primary/20 selection:text-foreground overflow-x-hidden transition-colors duration-200">
      {/* Header */}
      <DocsHeader
        onSearchOpen={() => setSearchOpen(true)}
        onMobileMenuOpen={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Atmospheric Ambient Mesh Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] pointer-events-none -z-0 opacity-40 dark:opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 12%, rgba(198, 255, 0, 0.16), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-24 z-10 w-full">
        {/* ── Cinematic Hero ────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/60 border border-border text-xs font-mono mb-6 backdrop-blur-md shadow-xs">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-foreground/80 font-medium">
              SCRIPE PLATFORM BLUEPRINT
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-primary font-semibold">
              v2.4 LTS SPECIFICATION
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.08]">
            The Blueprint Behind <br />
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Sports Operations Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            Universal engineering reference, architecture invariants, and
            commercial operational runbooks for the SCRIPE ecosystem across
            Venue, Academy, and Football Intelligence.
          </p>

          {/* Quick Search Launch Bar */}
          <div className="w-full max-w-2xl mb-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl border border-border bg-card/90 hover:border-primary/60 hover:bg-card shadow-lg hover:shadow-xl text-muted-foreground hover:text-foreground transition-all group"
              aria-label="Search documentation"
            >
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-normal text-start">
                  Search across 260+ guides, APIs, schemas, and invariants...
                </span>
              </div>
              <kbd className="hidden sm:inline-block px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-muted border border-border text-muted-foreground">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Quick CLI snippet copy */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="text-muted-foreground">Quickstart:</span>
            <button
              onClick={() => copyQuickCommand("scripe dev all")}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors group cursor-pointer"
              title="Copy to clipboard"
            >
              <span className="text-primary">$</span>
              <span>scripe dev all</span>
              {copiedCli ? (
                <Check size={12} className="text-emerald-500" />
              ) : (
                <Copy
                  size={12}
                  className="text-muted-foreground group-hover:text-foreground"
                />
              )}
            </button>
          </div>
        </div>

        {/* ── Interactive CLI & Architecture Sandbox ───────────────── */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary uppercase tracking-wider mb-1">
                <Terminal size={14} />
                <span>Live Architecture Sandbox</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Executable Invariants & Tooling
              </h2>
            </div>
            <p className="text-xs text-muted-foreground max-w-md">
              Inspect verified patterns for multi-database schemas, CQRS
              handlers, Result returns, and CLI orchestration.
            </p>
          </div>
          <InteractiveCliPreview />
        </div>

        {/* ── Signature Dual Portal Gateway Cards ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Card 1: Technical Documentation */}
          <Link
            href="/technical/get-started/overview"
            className="group relative rounded-2xl border border-border bg-card/90 hover:border-primary/60 p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(198,255,0,0.12)] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none group-hover:from-primary/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Code2 size={24} />
                </div>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                  DEVELOPER / ARCHITECT
                </span>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                Technical Documentation
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Deep dive into Clean Architecture 3-project modular monoliths,
                AstraFlow CQRS pipelines, Result pattern invariants, EF Core
                multi-DB persistence, and Next.js frontend sub-modules.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "AstraFlow CQRS",
                  ".NET 9 Host",
                  "Multi-DB (SQL/PG/Oracle)",
                  "Result<T>",
                  "PBAC Security",
                  "React 19 MVVM",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-muted/60 border border-border text-xs text-foreground/80 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-primary pt-4 border-t border-border">
              <span>Explore Technical Architecture</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </div>
          </Link>

          {/* Card 2: Commercial & Operational Documentation */}
          <Link
            href="/commercial/why-scripe-overview"
            className="group relative rounded-2xl border border-border bg-card/90 hover:border-sky-500/60 p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sky-500/10 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none group-hover:from-sky-500/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <span className="text-xs font-mono text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                  OPERATIONS / EXECUTIVE
                </span>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-sky-500 transition-colors">
                Commercial Operations
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Operational blueprints for venue directors, academy coaches, and
                club leadership. Covers court slot booking lifecycles, player
                registrations, fee settlement, and workforce CRM.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "SCRIPE Venue",
                  "Academy Operations",
                  "Tournament Scheduling",
                  "Billing & Settlement",
                  "Multi-Tenancy",
                  "Audit & Compliance",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-muted/60 border border-border text-xs text-foreground/80 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-sky-500 pt-4 border-t border-border">
              <span>Explore Operational Blueprints</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </div>
          </Link>
        </div>

        {/* ── Architecture Radar (Ecosystem Topography) ───────────── */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">
              Integrated Monorepo Topography
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Real-time architectural orchestration connecting the core API
              monolith with edge frontends, mobile devices, and automated dev
              tools.
            </p>
          </div>
          <ArchitectureRadar />
        </div>

        {/* ── Architectural Invariants Bento Grid ─────────────────── */}
        <div className="mb-20">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary uppercase tracking-wider mb-1">
              <ShieldCheck size={14} />
              <span>Core Invariants</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Guaranteed Architecture Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">
                  Result Pattern Only
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Zero exceptions thrown for business logic or expected
                  validations. All handlers explicitly return{" "}
                  <code className="text-primary font-mono font-semibold">
                    Result&lt;T&gt;
                  </code>
                  .
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-muted-foreground">
                Rule: api-conventions.md
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-4">
                  <Database size={20} />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">
                  Isolated Schemas
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Dual-mode persistence allows single-DB schema isolation (
                  <code className="text-primary font-mono">venue.*</code>) or
                  multi-DB distributed microservices with zero cross-module FKs.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-muted-foreground">
                Rule: backend-architecture.md
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-4">
                  <Repeat size={20} />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">
                  Transactional Outbox
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Per-module isolated outbox tables ensure guaranteed
                  at-least-once message delivery and idempotent cross-module
                  event dispatching.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-muted-foreground">
                Rule: domain-modeling-and-performance.md
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-4">
                  <Boxes size={20} />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">
                  Auto-Registered Jobs
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  All background workers implement{" "}
                  <code className="text-primary font-mono">
                    IAutoRegisteredJob
                  </code>{" "}
                  with zero manual registration across Native, Hangfire, and
                  Quartz.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-muted-foreground">
                Rule: backend-architecture.md
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Topic Matrix ───────────────────────────────────── */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground tracking-tight mb-6 flex items-center gap-2">
            <Compass className="text-primary" size={22} />
            <span>Essential Architectural Pillars</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Getting Started Guide",
                desc: "Prerequisites, environment setup, database bootstrap, and running your first dev server.",
                href: "/technical/get-started/quick-start",
                icon: Sparkles,
              },
              {
                title: "Clean Architecture & CQRS",
                desc: "Strict 3-project modular monolith structure, AstraFlow command pipeline, and Outbox event handlers.",
                href: "/technical/architecture/cqrs",
                icon: Layers,
              },
              {
                title: "Multi-Database Persistence",
                desc: "Zero-refactor database swapping across PostgreSQL, SQL Server, and Oracle with idempotent migrations.",
                href: "/technical/infrastructure/multi-database-strategy",
                icon: Database,
              },
              {
                title: "5-Layer Security & PBAC",
                desc: "Permission-based access control, tenant query filters, token encryption, and audit trail ledger.",
                href: "/technical/security/overview",
                icon: ShieldCheck,
              },
              {
                title: "Developer CLI Suite",
                desc: "Scaffolding modules, synchronizing markdown docs, running multi-DB migrations via scripe CLI.",
                href: "/technical/frontend/cli-tools",
                icon: Terminal,
              },
              {
                title: "Commercial Onboarding",
                desc: "Operational value propositions, competitive advantages, and enterprise deployment models.",
                href: "/commercial/why-scripe-overview",
                icon: BookOpen,
              },
            ].map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.title}
                  href={topic.href}
                  className="rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-muted/30 p-5 transition-all flex flex-col justify-between group shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-lg bg-muted border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Icon size={16} />
                      </div>
                      <h3 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-primary font-medium">
                    <span>Read guide</span>
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Platform Stat Strip ──────────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-xs">
          <div>
            <div className="text-3xl font-extrabold text-primary font-mono mb-1">
              260+
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
              Verified Guides & Specs
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-foreground font-mono mb-1">
              7
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
              Languages (Native RTL)
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-primary font-mono mb-1">
              100%
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
              Result Pattern Invariant
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-foreground font-mono mb-1">
              99.99%
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
              Architecture SLA
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-card/60 py-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/app-logo-1024.png"
              alt="SCRIPE Logo"
              width={18}
              height={18}
            />
            <span className="font-semibold text-foreground">
              SCRIPE Docs Portal
            </span>
            <span>—</span>
            <span>Sports Operations OS</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/technical"
              className="hover:text-foreground transition-colors"
            >
              Technical Docs
            </Link>
            <Link
              href="/commercial"
              className="hover:text-foreground transition-colors"
            >
              Commercial Ops
            </Link>
            <a
              href="https://github.com/SCRIPE-org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} SCRIPE Platform. Engineered under
            AGENTS.md Constitution.
          </div>
        </div>
      </footer>

      {/* Global Command Palette Search Modal */}
      <DocsSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
        basePath="/technical"
      />
    </div>
  );
}
