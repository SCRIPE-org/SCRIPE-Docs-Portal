# How does SCRIPE-Frontend enforce the Nexus Design System and 100% bilingual EN/AR parity? {#frontend-design-i18n}

SCRIPE-Frontend mandates **100% `@core/ui` primitives**, the **3-tier Nexus surface hierarchy**, **flat matte hairline cards**, and **co-located EN/AR locale dictionaries**.[](source:ui_card)

- Every page canvas, card, and nested header maps to `--nx-ground`, `--nx-surface`, and `--nx-raised` so Light and Dark themes switch with zero hardcoded hexes.[](source:ui_card)
- Primary Signal Lime action fills (`--nx-accent-fill`) always pair with high-contrast dark ink text (`text-nx-on-fill`), never white text.[](source:ui_button)
- Native HTML form elements (`<button>`, `<input>`, `<select>`, `<textarea>`) are strictly prohibited across all 65+ feature sub-modules.[](source:ui_dialog)
- Static UI copy lives exclusively in `locales/en.ts` and `locales/ar.ts` and is validated for 100% key parity by `scripe validate-locales`.[](source:locale_en)

@answer scope="Nexus CSS Tokens · 100% @core/ui Primitives · Flat Matte Cards · 100% EN/AR RTL Parity"
@meta locale=en style=editorial quality_profile=showcase repo_url=https://github.com/SCRIPE-org/SCRIPE-Frontend.git repo_revision=f7d148d6630baadee15b5b41b1933cc4fdd9a75f
@source ui_card title="Nexus Flat Matte Card Primitive" path=src/core/ui/card.tsx lines=28:90
@source ui_button title="Signal Lime & Semantic Button Primitive" path=src/core/ui/button.tsx lines=1:90
@source ui_dialog title="Accessible Modal Dialog Primitive" path=src/core/ui/dialog.tsx lines=1:90
@source i18n_prov title="I18nProvider & Document Direction Sync" path=src/core/providers/i18n-provider.tsx lines=1:95
@source locale_en title="Co-Located English Dictionary (booking.en.ts)" path=src/modules/venue/booking/locales/booking.en.ts lines=1:60
@source locale_ar title="Co-Located Arabic Dictionary (booking.ar.ts)" path=src/modules/venue/booking/locales/booking.ar.ts lines=1:60

## How do @core/ui primitives, I18nProvider, and Nexus tokens power every feature view? {#design-topology}

@diagram architecture id=design-arch source=frontend-architecture.architecture.json title="SCRIPE-Frontend UI Primitives & Localization Architecture"

@facts id=nexus-token-facts
| Surface Hierarchy | --nx-ground (page canvas) -> --nx-surface (cards) -> --nx-raised (nested headers/wells) |
| Ink Hierarchy | --nx-ink (primary headings) -> --nx-ink-2 (body copy) -> --nx-ink-3 (muted metadata) |
| Flat Matte Card Law | Bounded by 1px border-nx-line, brightening on hover (hover:border-nx-line-hi); zero resting box-shadow |
| Signal Lime Contrast Law | --nx-accent and --nx-accent-fill MUST use text-nx-on-fill (dark ink), never text-white |
| Semantic Status Tokens | success, warning, destructive, info, primary — raw Tailwind palette scales are prohibited |
| Bilingual Locale Ownership | Co-located locales/en.ts and ar.ts dictionaries rendered via t("..."); inline ternaries are forbidden |

## Which UI and localization patterns are mandatory vs blocked by the quality gate? {#design-matrix}

| Engineering Rule | Mandatory SCRIPE Pattern (`PASS`) | Prohibited Anti-Pattern (`BLOCKED`) |
| --- | --- | --- |
| Form & Action Controls {#row-ctrl} | `@core/ui/button`, `@core/ui/input`, `@core/ui/select`, `@core/ui/dialog` {good:100% Accessible} | Raw HTML `<button>`, `<input>`, `<select>`, `<textarea>` {caution:Fails arch-check} |
| Card Anatomy {#row-card} | Flat matte `bg-nx-surface border border-nx-line hover:border-nx-line-hi` {good:Light & Dark safe} | Hardcoded `bg-[#0c101a] shadow-md border-t-4` {caution:Breaks Light Theme} |
| Static UI Labels {#row-i18n} | `t("actions.confirmBooking")` from co-located `locales` dictionaries {good:Verified parity} | `isAr ? "تأكيد" : "Confirm"` inline in JSX or hooks {caution:Fails validate-locales} |
| Dynamic Entity Fields {#row-dyn} | `isAr && item.nameAr ? item.nameAr : item.nameEn` {good:Server data selection} | Rendering English-only server fields in Arabic RTL mode |

@callout level=warning title="Why are inline language ternaries strictly banned for static UI copy?"
Inline ternaries bypass `scripe validate-locales` and scatter strings across ViewModels. Only server-persisted fields (`labelAr` / `labelEn`) or `dir` may inspect `isAr`.[](source:i18n_prov)

## What do the Nexus Card primitive and co-located EN/AR dictionaries look like in code? {#design-code}

@code source=ui_card language=typescript

@code source=locale_en language=typescript
