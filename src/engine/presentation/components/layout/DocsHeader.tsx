"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Search, Menu, Building, Globe, Check, Moon, Sun, Code2, Github } from "lucide-react";
import { useDocsI18n } from "../../providers/DocsI18nProvider";
import { BRAND } from "@/lib/branding";

interface DocsHeaderProps {
  onSearchOpen: () => void;
  onMobileMenuOpen: () => void;
}

export function DocsHeader({ onSearchOpen, onMobileMenuOpen }: DocsHeaderProps) {
  const { t } = useDocsI18n();
  const pathname = usePathname();
  const isCommercial = pathname?.startsWith("/commercial");

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#050506]/90 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Mobile hamburger */}
        <button
          className="flex sm:hidden items-center justify-center p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10"
          onClick={onMobileMenuOpen}
          aria-label={t("common.menu")}
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        {/* Logo */}
        <Link href="/" prefetch={false} className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 transition-transform group-hover:scale-105">
            <Image
              src="/brand/app-logo-1024.png"
              alt={BRAND.namePascal}
              width={22}
              height={22}
              priority
              className="object-contain"
            />
          </div>
          <span className="font-bold text-white tracking-tight text-base group-hover:text-scripe-signal transition-colors">
            {BRAND.nameUpper}
            <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-scripe-signal/15 text-scripe-signal font-mono font-medium">DOCS</span>
          </span>
        </Link>

        {/* Section Navigation Switcher */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-xs font-medium">
          <Link
            href="/technical"
            prefetch={false}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              !isCommercial
                ? "bg-scripe-signal text-[#0d0d0e] font-semibold shadow-sm"
                : "text-white/70 hover:text-white hover:bg-white/5"
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
                ? "bg-scripe-signal text-[#0d0d0e] font-semibold shadow-sm"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Building size={13} />
            <span>Commercial Ops</span>
          </Link>
        </nav>
      </div>

      {/* Search Trigger */}
      <button
        className="flex items-center gap-3 px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:border-scripe-signal/50 hover:bg-white/10 text-white/60 hover:text-white transition-all text-sm w-44 sm:w-64 max-w-full justify-between"
        onClick={onSearchOpen}
        aria-label={t("common.search")}
      >
        <div className="flex items-center gap-2">
          <Search size={14} className="text-white/50" />
          <span className="text-xs">{t("common.search")}</span>
        </div>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/10 border border-white/10 text-white/50">
          ⌘K
        </kbd>
      </button>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="https://github.com/SCRIPE-org"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center justify-center h-8 w-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
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

function DocsLangSwitcher() {
  const { language, setLanguage, languages, currentLanguageInfo, t } = useDocsI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors"
        onClick={() => setOpen(!open)}
        aria-label={t("common.language")}
        aria-expanded={open}
      >
        <Globe size={14} className="text-scripe-signal" />
        <span>{currentLanguageInfo.code.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-[#0d0d0e] p-1.5 shadow-2xl z-50 animate-fade-in text-xs">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                lang.code === language
                  ? "bg-scripe-signal/15 text-scripe-signal font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
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

function DocsThemeToggle() {
  const { t } = useDocsI18n();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t("common.toggleTheme")}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
