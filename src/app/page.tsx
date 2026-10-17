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
  Cpu,
  Compass,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { DocsHeader } from "@/engine/presentation/components/layout/DocsHeader";
import { DocsSearch } from "@/engine/presentation/components/ui/DocsSearch";
import { ArchitectureRadar } from "@/components/landing/ArchitectureRadar";
import { docsContainer } from "@/di";

export default function DocsLandingHub() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search handler using repository
  const handleSearch = (query: string) => {
    return docsContainer.docsRepository.search(query);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#f7f8f5] flex flex-col relative selection:bg-[#c6ff00]/30 selection:text-white overflow-x-hidden">
      {/* Header */}
      <DocsHeader
        onSearchOpen={() => setSearchOpen(true)}
        onMobileMenuOpen={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Hero Atmosphere */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] pointer-events-none -z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 10%, rgba(198, 255, 0, 0.09), transparent 70%)",
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 z-10 w-full">
        {/* Cinematic Hero */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-6 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-scripe-signal animate-pulse" />
            <span className="text-white/80 font-medium">SCRIPE PLATFORM BLUEPRINT</span>
            <span className="text-white/30">•</span>
            <span className="text-scripe-signal font-semibold">v2.4 LTS SPECIFICATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            The Engine Behind <br />
            <span className="bg-gradient-to-r from-white via-white to-scripe-signal bg-clip-text text-transparent">
              Sports Operations Intelligence
            </span>
          </h1>

          <p className="text-lg text-white/70 max-w-2xl mb-8 leading-relaxed">
            Universal engineering reference, architecture invariants, and commercial operational runbooks for the SCRIPE ecosystem across Venue, Academy, and Football Intelligence.
          </p>

          {/* Quick Search Launch Bar */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center justify-between w-full max-w-xl px-5 py-3.5 rounded-xl border border-white/15 bg-[#151719]/90 hover:border-scripe-signal/60 hover:bg-[#1a1d20] shadow-[0_0_30px_rgba(0,0,0,0.6)] text-white/50 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-scripe-signal group-hover:scale-110 transition-transform" />
              <span className="text-sm font-normal">Search across 260+ guides, APIs, schemas, and invariants...</span>
            </div>
            <kbd className="hidden sm:inline-block px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-white/10 border border-white/10 text-white/60">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Signature Interactive Dual Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Card 1: Technical Documentation */}
          <Link
            href="/technical/get-started/overview"
            className="group relative rounded-2xl border border-white/10 bg-[#0d0d0e]/90 hover:border-scripe-signal/60 p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(198,255,0,0.12)] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-scripe-signal/10 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none group-hover:from-scripe-signal/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-xl bg-scripe-signal/15 border border-scripe-signal/30 flex items-center justify-center text-scripe-signal group-hover:scale-110 transition-transform">
                  <Code2 size={24} />
                </div>
                <span className="text-xs font-mono text-scripe-signal bg-scripe-signal/10 px-2.5 py-1 rounded-full border border-scripe-signal/20">
                  DEVELOPER / ARCHITECT
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-scripe-signal transition-colors">
                Technical Documentation
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Deep dive into Clean Architecture 3-project setup, AstraFlow CQRS pipelines, Result pattern invariants, EF Core multi-DB persistence, and Next.js frontend patterns.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["AstraFlow CQRS", ".NET 9", "Multi-DB (SQL/PG/Oracle)", "Result<T>", "PBAC Security", "React 19"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/70 font-mono"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-scripe-signal pt-4 border-t border-white/10">
              <span>Explore Technical Architecture</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Commercial & Operational Documentation */}
          <Link
            href="/commercial/why-scripe-overview"
            className="group relative rounded-2xl border border-white/10 bg-[#0d0d0e]/90 hover:border-sky-400/60 p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(56,189,248,0.12)] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sky-400/10 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none group-hover:from-sky-400/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-xl bg-sky-400/15 border border-sky-400/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <span className="text-xs font-mono text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded-full border border-sky-400/20">
                  OPERATIONS / EXECUTIVE
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                Commercial Operations
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Operational guides for facility administrators, academy directors, and sports managers. Covers booking lifecycle, athlete registration, fee schedules, and workforce management.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["SCRIPE Venue", "Academy Operations", "Tournament Scheduling", "Billing & Settlement", "Multi-Tenancy", "Audit & Compliance"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/70 font-mono"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-sky-400 pt-4 border-t border-white/10">
              <span>Explore Operational Blueprints</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Section: Architecture Radar */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
              Integrated Monorepo Topography
            </h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto">
              Real-time architectural orchestration connecting the core API monolith with edge frontends, mobile devices, and automated dev tools.
            </p>
          </div>
          <ArchitectureRadar />
        </div>

        {/* Quick Topic Matrix */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
            <Compass className="text-scripe-signal" size={22} />
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
                  className="rounded-xl border border-white/10 bg-[#0d0d0e]/60 hover:border-scripe-signal/50 hover:bg-white/[0.04] p-5 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-scripe-signal group-hover:scale-110 transition-transform">
                        <Icon size={16} />
                      </div>
                      <h3 className="font-semibold text-white text-base group-hover:text-scripe-signal transition-colors">
                        {topic.title}
                      </h3>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-scripe-signal font-medium">
                    <span>Read guide</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Platform Stat Strip */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-scripe-signal font-mono mb-1">260+</div>
            <div className="text-xs text-white/50 uppercase tracking-wider font-mono">Verified Guides</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono mb-1">7</div>
            <div className="text-xs text-white/50 uppercase tracking-wider font-mono">Languages (Native RTL)</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-scripe-signal font-mono mb-1">100%</div>
            <div className="text-xs text-white/50 uppercase tracking-wider font-mono">Result Pattern</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono mb-1">99.99%</div>
            <div className="text-xs text-white/50 uppercase tracking-wider font-mono">Architecture SLA</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050506] py-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/app-logo-1024.png"
              alt="SCRIPE Logo"
              width={18}
              height={18}
            />
            <span className="font-semibold text-white/80">SCRIPE Docs Portal</span>
            <span>—</span>
            <span>Sports Operations OS</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/technical" className="hover:text-white transition-colors">
              Technical Docs
            </Link>
            <Link href="/commercial" className="hover:text-white transition-colors">
              Commercial Ops
            </Link>
            <a
              href="https://github.com/SCRIPE-org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} SCRIPE Platform. Engineered under AGENTS.md Constitution.
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
