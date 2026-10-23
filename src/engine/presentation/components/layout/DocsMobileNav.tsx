// UI-EXCEPTION: compact studio layout
"use client";

import Link from "next/link";
import { useDocsI18n } from "../../providers/DocsI18nProvider";
import type {
  DocCategory,
  DocNavItem,
} from "../../../domain/entities/DocCategory";
import { useState, useCallback } from "react";
import { X, ChevronRight } from "lucide-react";
import { docsIcons } from "./DocsSidebar";

interface DocsMobileNavProps {
  categories: DocCategory[];
  activeSlug: string;
  isOpen: boolean;
  onClose: () => void;
  basePath?: string;
}

/**
 * Presentation UI component rendering the docs mobile nav.
 * Arranges layout boundaries and accessibility targets (WCAG, tab index) using the core design library (@core/ui/*).
 */
export function DocsMobileNav({
  categories,
  activeSlug,
  isOpen,
  onClose,
  basePath = "/technical",
}: DocsMobileNavProps) {
  const { t } = useDocsI18n();

  function getAllItemSlugs(item: DocNavItem): string[] {
    const slugs: string[] = [];
    if (item.slug) slugs.push(item.slug);
    if (item.children) {
      for (const c of item.children) {
        slugs.push(...getAllItemSlugs(c));
      }
    }
    return slugs;
  }

  function collectSubGroupStates(
    items: DocNavItem[],
    active: string,
    out: Record<string, boolean>
  ) {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        const childSlugs = getAllItemSlugs(item);
        out[item.id] = childSlugs.includes(active);
        collectSubGroupStates(item.children, active, out);
      }
    }
  }

  // Track which sub-groups are expanded
  const [subExpanded, setSubExpanded] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      for (const cat of categories) {
        collectSubGroupStates(cat.items, activeSlug, initial);
      }
      return initial;
    },
  );

  // Auto-expand sub-groups on navigation
  const [prevActiveSlug, setPrevActiveSlug] = useState(activeSlug);
  if (activeSlug !== prevActiveSlug) {
    setPrevActiveSlug(activeSlug);
    setSubExpanded((prev) => {
      const next = { ...prev };
      for (const cat of categories) {
        collectSubGroupStates(cat.items, activeSlug, next);
      }
      return next;
    });
  }

  const toggleSubGroup = useCallback((subId: string) => {
    setSubExpanded((prev) => ({ ...prev, [subId]: !prev[subId] }));
  }, []);

  if (!isOpen) return null;

  const resolveHref = (slug: string) => {
    const cleanSlug = slug.replace(/^commercial\//, "");
    return `${basePath}/${cleanSlug}`;
  };

  const renderItem = (item: DocNavItem, depth = 1) => {
    // ─── Sub-group with children ─────────────────────────────
    if (item.children && item.children.length > 0) {
      const isSubOpen = subExpanded[item.id] ?? false;
      const padStart = depth === 1 ? "2rem" : `${1.75 + (depth - 1) * 0.75}rem`;

      return (
        <div key={item.id} className="docs-sidebar-subgroup">
          <button
            className="docs-sidebar-subgroup-btn"
            style={{ paddingInlineStart: padStart }}
            onClick={() => toggleSubGroup(item.id)}
            data-expanded={isSubOpen}
          >
            {item.icon ? (docsIcons[item.icon]?.({ size: Math.max(13, 16 - (depth - 1) * 2) }) ?? null) : null}
            <span style={{ flex: 1, fontWeight: depth === 1 ? 600 : 500 }}>{t(item.titleKey)}</span>
            <ChevronRight size={14} aria-hidden="true" />
          </button>
          <div
            className="docs-sidebar-subgroup-items"
            style={{ maxHeight: isSubOpen ? "3000px" : "0px", overflow: "hidden" }}
          >
            {item.children.map((child) => renderItem(child, depth + 1))}
          </div>
        </div>
      );
    }

    // ─── Regular leaf item ────────────────────────────────────
    if (!item.slug) return null;
    const isActive = item.slug === activeSlug;
    return (
      <Link
        key={item.id}
        href={resolveHref(item.slug)}
        prefetch={false}
        className={`docs-sidebar-item ${depth > 1 ? "docs-sidebar-item--nested" : ""}`}
        style={depth > 1 ? { paddingInlineStart: `${2.25 + (depth - 1) * 0.85}rem` } : undefined}
        data-active={isActive}
        onClick={onClose}
      >
        {item.icon
          ? (docsIcons[item.icon]?.({
              size: 15,
              className: "docs-sidebar-item-icon",
            }) ?? null)
          : null}
        <span>{t(item.titleKey)}</span>
      </Link>
    );
  };

  return (
    <>
      <div className="docs-mobile-overlay" onClick={onClose} />
      <nav className="docs-mobile-nav">
        <button
          className="docs-mobile-close"
          onClick={onClose}
          aria-label={t("common.closeMenu")}
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div className="pt-8">
          {categories.map((cat) => (
            <div key={cat.id} className="docs-sidebar-category">
              <div className="docs-sidebar-category-btn cursor-default">
                <span>{t(cat.titleKey)}</span>
              </div>
              <div
                className="docs-sidebar-items"
                style={{ maxHeight: "9999px" }}
              >
                {cat.items.map(renderItem)}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
