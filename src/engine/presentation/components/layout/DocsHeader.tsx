"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  Menu,
  Building,
  Globe,
  Check,
  Moon,
  Sun,
  Code2,
  Github,
} from "lucide-react";
import { useDocsI18n } from "../../providers/DocsI18nProvider";
import { BRAND } from "@/lib/branding";

interface DocsHeaderProps {
  onSearchOpen: () => void;
  onMobileMenuOpen: () => void;
}

export function DocsHeader({
  onSearchOpen,
  onMobileMenuOpen,
}: DocsHeaderProps) {
  const { t } = useDocsI18n();
  const pathname = usePathname();
  const isCommercial = pathname?.startsWith("/commercial");

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/85 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Mobile hamburger */}
        <button
          className="flex sm:hidden items-center justify-center p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={onMobileMenuOpen}
          aria-label={t("common.menu")}
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        {/* Logo */}
        <Link
          href="/"
          prefetch={false}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 border border-border transition-transform group-hover:scale-105">
            <Image
              src="/brand/app-logo-1024.png"
              alt={BRAND.namePascal}
              width={22}
              height={22}
              priority
              className="object-contain"
            />
          </div>
          <span className="font-bold text-foreground tracking-tight text-base group-hover:text-primary transition-colors">
            {BRAND.nameUpper}
            <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-primary/15 text-primary font-mono font-medium">
              DOCS
            </span>
          </span>
        </Link>

        {/* Section Navigation Switcher */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border text-xs font-medium">
          <Link
            href="/technical"
            prefetch={false}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              !isCommercial
                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <Code2 size={13} />
            <span>Technical</span>
          </Link>
          <Link
            href="/commercial"
            prefetch={false}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              isCommercial
                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <Building size={13} />
            <span>Commercial Ops</span>
          </Link>
        </nav>
      </div>

      {/* Search Trigger */}
      <button
        className="flex items-center gap-3 px-3.5 py-1.5 rounded-lg border border-border bg-muted/30 hover:border-primary/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all text-sm w-44 sm:w-64 max-w-full justify-between"
        onClick={onSearchOpen}
        aria-label={t("common.search")}
      >
        <div className="flex items-center gap-2">
          <Search size={14} className="text-muted-foreground" />
          <span className="text-xs">{t("common.search")}</span>
        </div>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted border border-border text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="https://github.com/SCRIPE-org"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="GitHub Repository"
        >
          <Github size={16} />
        </a>

        <DocsLangSwitcher />
        <DocsThemeToggle />
      </div>
    </header>
  );
}

export function DocsLangSwitcher() {
  const { language, setLanguage, languages, currentLanguageInfo, t } =
    useDocsI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-border bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
        onClick={() => setOpen(!open)}
        aria-label={t("common.language")}
        aria-expanded={open}
      >
        <Globe size={14} className="text-primary" />
        <span>{currentLanguageInfo.code.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl border border-border bg-popover text-popover-foreground p-1.5 shadow-2xl z-50 animate-fade-in text-xs">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                lang.code === language
                  ? "bg-primary/15 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
            >
              <span>{lang.nativeLabel}</span>
              {lang.code === language && <Check size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsThemeToggle() {
  const { t } = useDocsI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-lg border border-border bg-muted/20" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      className="flex items-center justify-center h-8 w-8 rounded-lg border border-border bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t("common.toggleTheme")}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
