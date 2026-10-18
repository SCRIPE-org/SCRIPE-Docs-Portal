"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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
  Cpu,
  Lock,
  Globe2,
} from "lucide-react";
import { DocsHeader } from "@/engine/presentation/components/layout/DocsHeader";
import { DocsSearch } from "@/engine/presentation/components/ui/DocsSearch";
import { ArchitectureRadar } from "@/components/landing/ArchitectureRadar";
import { InteractiveCliPreview } from "@/components/landing/InteractiveCliPreview";
import { docsContainer } from "@/di";

export default function DocsLandingHub() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCli, setCopiedCli] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Search handler using repository
  const handleSearch = (query: string) => {
    return docsContainer.docsRepository.search(query);
  };

  const copyQuickCommand = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCli(cmd);
      setTimeout(() => setCopiedCli(null), 2000);
    } catch {
      // fallback
    }
  };

  // Easing curve (Emil Kowalski style spring physics)
  const SPRING_TRANSITION = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 350, damping: 28 };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.08,
            delayChildren: 0.05,
          },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            type: "spring",
            stiffness: 320,
            damping: 24,
          },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-primary/20 selection:text-foreground overflow-x-hidden transition-colors duration-200">
      {/* Top Header */}
      <DocsHeader
        onSearchOpen={() => setSearchOpen(true)}
        onMobileMenuOpen={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Atmospheric Ambient Mesh Glows (Layered for Depth) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[640px] pointer-events-none -z-0 opacity-40 dark:opacity-60 transition-opacity"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 12%, rgba(198, 255, 0, 0.14), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-96 left-1/4 w-[600px] h-[400px] pointer-events-none -z-0 opacity-20 dark:opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(14, 165, 233, 0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-24 z-10 w-full">
        {/* ── Cinematic Hero ────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Eyebrow Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/70 border border-border text-xs font-mono mb-6 backdrop-blur-md shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-foreground/90 font-medium tracking-wide">
              SCRIPE PLATFORM BLUEPRINT
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-primary font-semibold font-mono">
              v2.4 ENTERPRISE LTS
            </span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.08] text-balance"
          >
            The Architecture Behind <br />
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Sports Operations Intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed text-pretty"
          >
            Universal engineering reference, invariant catalogs, and commercial
            operational runbooks powering Venue, Academy, and Football
            Intelligence across 3 physical database engines and 7 languages.
          </motion.p>

          {/* Quick Search Launch Bar */}
          <motion.div variants={itemVariants} className="w-full max-w-2xl mb-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl border border-border bg-card/95 hover:border-primary/60 hover:bg-card shadow-lg hover:shadow-xl text-muted-foreground hover:text-foreground transition-all duration-200 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Search documentation"
            >
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-normal text-start">
                  Search across 261+ guides, APIs, schemas, and invariants...
                </span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-muted border border-border text-muted-foreground">
                <span className="text-[10px]">⌘</span>K
              </kbd>
            </button>
          </motion.div>

          {/* Quickstart Action Command Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono"
          >
            <span className="text-muted-foreground font-medium">
              Quickstart:
            </span>
            {[
              { cmd: "scripe dev docs", label: "dev docs" },
              { cmd: "scripe build docs", label: "build docs" },
              { cmd: "scripe check", label: "check gate" },
            ].map(({ cmd, label }) => {
              const isCopied = copiedCli === cmd;
              return (
                <button
                  key={cmd}
                  onClick={() => copyQuickCommand(cmd)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-foreground transition-all hover:border-primary/40 group cursor-pointer shadow-2xs"
                  title={`Copy "${cmd}" to clipboard`}
                >
                  <span className="text-primary font-bold">$</span>
                  <span>{cmd}</span>
                  {isCopied ? (
                    <Check size={12} className="text-emerald-500" />
                  ) : (
                    <Copy
                      size={12}
                      className="text-muted-foreground group-hover:text-foreground transition-colors"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── Signature Dual Portal Gateway Bento ───────────────────── */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          {/* Card 1: Technical Documentation */}
          <motion.div variants={itemVariants}>
            <Link
              href="/technical/get-started/overview"
              className="group relative rounded-2xl border border-border bg-card/90 hover:border-primary/60 p-8 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(198,255,0,0.12)] flex flex-col justify-between overflow-hidden h-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none group-hover:from-primary/20 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200">
                    <Code2 size={24} />
                  </div>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 font-semibold tracking-wide">
                    DEVELOPER / ARCHITECT
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                  Technical Documentation
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Deep dive into Clean Architecture 3-project modular monoliths,
                  AstraFlow CQRS pipelines, Result&lt;T&gt; return invariants,
                  EF Core multi-DB persistence, and Next.js frontend
                  sub-modules.
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
                      className="px-2.5 py-1 rounded-md bg-muted/60 border border-border text-xs text-foreground/90 font-mono"
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
                  className="group-hover:translate-x-2 transition-transform duration-200"
                />
              </div>
            </Link>
          </motion.div>

          {/* Card 2: Commercial & Operational Documentation */}
          <motion.div variants={itemVariants}>
            <Link
              href="/commercial/why-scripe-overview"
              className="group relative rounded-2xl border border-border bg-card/90 hover:border-sky-500/60 p-8 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(14,165,233,0.12)] flex flex-col justify-between overflow-hidden h-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-sky-500/10 via-sky-500/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none group-hover:from-sky-500/20 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform duration-200">
                    <Building2 size={24} />
                  </div>
                  <span className="text-xs font-mono text-sky-500 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 font-semibold tracking-wide">
                    OPERATIONS / EXECUTIVE
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:text-sky-500 transition-colors duration-200">
                  Commercial Operations
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Operational blueprints for venue directors, academy coaches,
                  and club leadership. Covers court slot booking lifecycles,
                  player registrations, fee settlement, and workforce CRM.
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
                      className="px-2.5 py-1 rounded-md bg-muted/60 border border-border text-xs text-foreground/90 font-mono"
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
                  className="group-hover:translate-x-2 transition-transform duration-200"
                />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Interactive CLI & Architecture Sandbox ───────────────── */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary uppercase tracking-wider mb-1.5">
                <Terminal size={14} />
                <span>Live Architecture Sandbox</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Executable Invariants & Tooling
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
              Inspect verified patterns for multi-database schemas, CQRS
              handlers, Result returns, and CLI orchestration.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <InteractiveCliPreview />
          </motion.div>
        </motion.div>

        {/* ── Architecture Radar (Ecosystem Topography) ───────────── */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary uppercase tracking-wider mb-1.5">
              <Globe2 size={14} />
              <span>Full Monorepo Topology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">
              Integrated System Topography
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Real-time architectural orchestration connecting the core API
              monolith with edge frontends, mobile devices, isolated docs, and
              developer CLI tooling.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <ArchitectureRadar />
          </motion.div>
        </motion.div>

        {/* ── Architectural Invariants Bento Grid ─────────────────── */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary uppercase tracking-wider mb-1.5">
              <ShieldCheck size={14} />
              <span>Core Invariants</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Guaranteed Architecture Principles
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: CheckCircle2,
                title: "Result Pattern Only",
                desc: "Zero exceptions thrown for business logic or validation. All handlers explicitly return Result<T> with structured error codes.",
                rule: "api-conventions.md",
              },
              {
                icon: Database,
                title: "Isolated Schemas",
                desc: "Dual-mode persistence enables single-DB schema isolation (venue.*) or multi-DB microservices with zero cross-module foreign keys.",
                rule: "backend-architecture.md",
              },
              {
                icon: Repeat,
                title: "Transactional Outbox",
                desc: "Per-module isolated outbox tables ensure guaranteed at-least-once message delivery and idempotent cross-module event dispatching.",
                rule: "domain-modeling.md",
              },
              {
                icon: Boxes,
                title: "Auto-Registered Jobs",
                desc: "All background workers implement IAutoRegisteredJob with zero manual registration across Native, Hangfire, and Quartz.",
                rule: "backend-architecture.md",
              },
            ].map((inv) => {
              const Icon = inv.icon;
              return (
                <motion.div
                  key={inv.title}
                  variants={itemVariants}
                  whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                  transition={SPRING_TRANSITION}
                  className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-xs hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                      {inv.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {inv.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                    <span>Rule: {inv.rule}</span>
                    <span className="text-primary font-bold">✓ Active</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Quick Topic Matrix ───────────────────────────────────── */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-6 flex items-center gap-2"
          >
            <Compass className="text-primary" size={24} />
            <span>Essential Architectural Pillars</span>
          </motion.h2>

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
                <motion.div
                  key={topic.title}
                  variants={itemVariants}
                  whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
                  transition={SPRING_TRANSITION}
                >
                  <Link
                    href={topic.href}
                    className="rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-muted/30 p-5 transition-all flex flex-col justify-between group shadow-xs h-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-9 w-9 rounded-lg bg-muted border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Icon size={18} />
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
                        className="group-hover:translate-x-1.5 transition-transform"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Platform Stat Strip ──────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="rounded-2xl border border-border bg-card p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-xs"
        >
          <motion.div variants={itemVariants}>
            <div className="text-3xl sm:text-4xl font-extrabold text-primary font-mono mb-1">
              261+
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
              Verified Guides & Specs
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono mb-1">
              7
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
              Languages (Native RTL)
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="text-3xl sm:text-4xl font-extrabold text-primary font-mono mb-1">
              100%
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
              Result Pattern Invariant
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono mb-1">
              99.99%
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
              Architecture SLA
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-card/60 py-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/app-logo-1024.png"
              alt="SCRIPE Logo"
              width={20}
              height={20}
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
              href="https://github.com/SCRIPE-org/SCRIPE-Docs-Portal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub Portal
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
