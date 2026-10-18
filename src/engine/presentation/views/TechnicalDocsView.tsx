"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@core/ui/button";
import { FileQuestion } from "lucide-react";
import { useDocsViewModel } from "../viewmodels/useDocsViewModel";
import { useSidebarViewModel } from "../viewmodels/useSidebarViewModel";
import { useSearchViewModel } from "../viewmodels/useSearchViewModel";
import { useTocViewModel } from "../viewmodels/useTocViewModel";
import { useDocsI18n } from "../providers/DocsI18nProvider";

// Layout components
import { DocsHeader } from "../components/layout/DocsHeader";
import { DocsSidebar } from "../components/layout/DocsSidebar";
import { DocsBreadcrumb } from "../components/layout/DocsBreadcrumb";
import { DocsToc } from "../components/layout/DocsToc";
import { DocsPrevNext } from "../components/layout/DocsPrevNext";
import { DocsMobileNav } from "../components/layout/DocsMobileNav";

// Content
import { DocContent } from "../components/content/DocContent";

// UI
import { ReadingProgress } from "../components/ui/ReadingProgress";
import { DocsSearch } from "../components/ui/DocsSearch";
import { EmptyState } from "@core/ui/empty-state";

// ─── Props ────────────────────────────────────────────────────────
interface TechnicalDocsViewProps {
  slug: string;
}

// ─── View ─────────────────────────────────────────────────────────
/**
 * Presentation UI component rendering the technical docs view.
 * Arranges layout boundaries and accessibility targets (WCAG, tab index) using the core design library (@core/ui/*).
 */
export function TechnicalDocsView({ slug }: TechnicalDocsViewProps) {
  const { t, direction, loadSection } = useDocsI18n();
  const vm = useDocsViewModel(slug, "technical");
  const sidebar = useSidebarViewModel();
  const search = useSearchViewModel(vm.search);
  const toc = useTocViewModel(vm.headingIds);

  // Reader states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [fontSize, setFontSize] = useState<14 | 16 | 18>(16);
  const [wideLayout, setWideLayout] = useState(false);

  // Lazy-load the section locale for the current page
  useEffect(() => {
    loadSection(slug);
  }, [slug, loadSection]);

  if (vm.isNotFound) {
    return (
      <div className="docs-root" dir={direction}>
        <DocsHeader
          onSearchOpen={search.openSearch}
          onMobileMenuOpen={sidebar.openMobileMenu}
        />
        <div className="docs-wrapper">
          <DocsSidebar categories={vm.categories} activeSlug={slug} />
          <div className="docs-content-wrapper">
            <div className="docs-content flex min-h-[50vh] items-center justify-center">
              <EmptyState
                size="lg"
                icon={FileQuestion}
                title={t("common.notFoundTitle")}
                description={t("common.notFoundDescription", { slug })}
                action={
                  <Button asChild>
                    <Link href="/technical" prefetch={false}>
                      {t("common.home")}
                    </Link>
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const page = vm.page!;

  return (
    <div className="docs-root" dir={direction}>
      <ReadingProgress />
      <DocsHeader
        onSearchOpen={search.openSearch}
        onMobileMenuOpen={sidebar.openMobileMenu}
      />

      <div
        className={`docs-wrapper ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
      >
        <DocsSidebar categories={vm.categories} activeSlug={slug} />

        <div className="docs-content-wrapper">
          <main
            className="docs-content transition-[font-size,max-width] duration-nx-standard ease-nx-enter motion-reduce:transition-none"
            style={{
              fontSize: `${fontSize}px`,
              maxWidth: wideLayout ? "1200px" : "800px",
            }}
          >
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <DocsBreadcrumb
                slug={slug}
                categoryTitleKey={vm.categoryInfo.titleKey}
                pageTitleKey={page.titleKey}
              />

              {/* Reader Toolbar */}
              <div className="reader-toolbar flex select-none items-center gap-1.5 rounded-lg border border-border bg-muted/40 backdrop-blur-sm px-2.5 py-1.5 text-sm shadow-xs">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className={`reader-toolbar-btn h-7 w-7 rounded-md p-1 transition-colors ${
                    sidebarCollapsed
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={
                    sidebarCollapsed
                      ? t("common.expandSidebar")
                      : t("common.collapseSidebar")
                  }
                  aria-label={
                    sidebarCollapsed
                      ? t("common.expandSidebar")
                      : t("common.collapseSidebar")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 3v18" />
                  </svg>
                </Button>

                <div className="reader-toolbar-divider mx-1 h-3.5 w-px bg-border" />

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setFontSize(14)}
                  className={`reader-toolbar-btn h-7 rounded-md px-2 py-0.5 text-xs transition-colors ${
                    fontSize === 14
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={t("common.fontSizeSmall")}
                  aria-label={t("common.fontSizeSmall")}
                >
                  A-
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setFontSize(16)}
                  className={`reader-toolbar-btn h-7 rounded-md px-2 py-0.5 text-xs transition-colors ${
                    fontSize === 16
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={t("common.fontSizeMedium")}
                  aria-label={t("common.fontSizeMedium")}
                >
                  A
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setFontSize(18)}
                  className={`reader-toolbar-btn h-7 rounded-md px-2 py-0.5 text-xs transition-colors ${
                    fontSize === 18
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={t("common.fontSizeLarge")}
                  aria-label={t("common.fontSizeLarge")}
                >
                  A+
                </Button>

                <div className="reader-toolbar-divider mx-1 h-3.5 w-px bg-border" />

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setWideLayout(!wideLayout)}
                  className={`reader-toolbar-btn h-7 rounded-md px-2.5 py-0.5 text-xs transition-colors ${
                    wideLayout
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={
                    wideLayout
                      ? t("common.switchToCompactLayout")
                      : t("common.switchToWideLayout")
                  }
                  aria-label={
                    wideLayout
                      ? t("common.switchToCompactLayout")
                      : t("common.switchToWideLayout")
                  }
                >
                  {wideLayout
                    ? t("common.layoutCompact")
                    : t("common.layoutWide")}
                </Button>
              </div>
            </div>

            <h1 className="docs-page-title">{t(page.titleKey)}</h1>
            {page.descriptionKey && (
              <p className="docs-page-description">{t(page.descriptionKey)}</p>
            )}

            <DocContent sections={page.sections} />

            <DocsPrevNext
              prevSlug={vm.prevSlug}
              prevTitleKey={vm.prevTitleKey}
              nextSlug={vm.nextSlug}
              nextTitleKey={vm.nextTitleKey}
              basePath="/technical"
            />
          </main>

          <DocsToc headings={vm.headings} activeId={toc.activeId} />
        </div>
      </div>

      {/* Overlays */}
      <DocsSearch
        isOpen={search.isSearchOpen}
        onClose={search.closeSearch}
        onSearch={search.searchFn}
        basePath="/technical"
      />

      <DocsMobileNav
        categories={vm.categories}
        activeSlug={slug}
        isOpen={sidebar.isMobileMenuOpen}
        onClose={sidebar.closeMobileMenu}
        basePath="/technical"
      />
    </div>
  );
}
