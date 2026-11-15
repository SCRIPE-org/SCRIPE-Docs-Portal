# How does SCRIPE harden Sileo gooey toasts across Light, Dark, HC, and RTL? {#sileo-toast-hardening-guide}

SCRIPE integrates the SVG gooey physics **Sileo** toast engine (`0.1.5`) with reactive Nexus CSS custom properties (`var(--nx-surface)`), CSS transition isolation, `tailwind-merge` style composition, and DOM class-priority theme resolution.[](source:sileo_toast)[](source:sileo_toaster)

- Removing `max-width: 100%` from `[data-sileo-header-stack]` and `[data-sileo-header-inner]` restores accurate pill width measurement (`223px–246px`) instead of truncating titles inside `40px`.[](source:globals_css)
- Excluding `[data-sileo-svg]` and `<motion.rect data-sileo-body>` from SCRIPE's global `[data-animation="moderate"]` `0.3s` CSS transition prevents action buttons from overflowing the expanding SVG card.[](source:globals_css)
- Defaulting auto fills to `"var(--nx-surface)"` and omitting the `theme` prop on `SileoBaseToaster` eliminates OS-dark/app-light inversion and updates open toasts instantaneously on live theme switches.[](source:sileo_toaster)
- Extracting `sileo-config.ts`, deduplicating RTL position normalization, and merging classes via `twMerge` eliminates circular imports, timer leaks, variant loss on `toast.update`, and semantic button border clashes.[](source:sileo_config)[](source:sileo_toast)

@answer scope="Sileo 0.1.5 · Next.js 16 · Nexus CSS Tokens · Light / Dark / High-Contrast · RTL & Reduced Motion"
@meta locale=en style=editorial quality_profile=showcase repo_url=https://github.com/SCRIPE-org/SCRIPE-Frontend.git repo_revision=2915891e53ecad7ae0a624e8f4688034210aa0d4
@source sileo_docs title="Official Sileo Documentation" url=https://sileo.aaryan.design/docs
@source sileo_config title="Shared Nexus Styles & Active Toaster Registry" path=src/core/ui/sileo-toast/sileo-config.ts
@source sileo_toast title="Theme Resolution, Style Merging & Timer Cleanup" path=src/core/ui/sileo-toast/sileo-toast.ts
@source sileo_toaster title="Reactive Fill Provider & Contrast Locks" path=src/core/ui/sileo-toast/sileo-toaster.tsx
@source globals_css title="Gooey SVG Isolation, Pill Layout & Semantic Borders" path=src/app/globals.css
@source playground title="Native Sileo Physics Playground" path=src/app/(auth)/sileo-playground/page.tsx

## How do Toaster defaults, theme tokens, and gooey SVG layers connect? {#sileo-pipeline-architecture}

@architecture id=sileo-arch title="SCRIPE Sileo Toast Architecture & Reactive Theme Flow"
| toaster | SileoToaster Provider | frontend |
| config | sileo-config Registry | frontend |
| facade | sileo-toast Facade | frontend |
| engine | Sileo SVG Engine | external |
| nexus | Nexus CSS Variables | frontend |
| gate | globals.css Isolation | security |
| toaster > config | Sync defaults & fill | |
| facade > config | Read defaults & lock styles | dashed |
| config > facade | twMerge styles & button | |
| facade > engine | Single-pass options | emphasis |
| nexus > engine | var(--nx-surface) fill | dashed |
| gate > engine | Isolate Framer rects | security |

@steps id=arch-tour
| step_toaster | SileoToaster Provider | Omits `theme` on `SileoBaseToaster`, defaults auto fill to `"var(--nx-surface)"`, and syncs active defaults in `useEffect`. | sileo-arch | toaster |
| step_config | Shared Config Registry | Holds `NEXUS_SILEO_STYLES`, contrast-locked Light/Dark presets, active defaults, and `resolveRtlPosition` cleanly with zero cycles. | sileo-arch | config |
| step_facade | sileo-toast Facade | Checks `.dark`/`.light` class priority before OS `prefers-color-scheme`, merges styles via `twMerge`, manages timers, and normalizes RTL once. | sileo-arch | facade |
| step_nexus | Nexus Token Painting | Browser paints `<rect data-sileo-body>` and header pills with `--nx-surface`, switching seamlessly across Light, Dark, and High-Contrast themes. | sileo-arch | nexus |
| step_gate | CSS Animation Gate | Excludes 7 `[data-sileo-*]` geometric nodes from `moderate` CSS transition overrides and styles translucent OKLCH semantic button borders. | sileo-arch | gate |
| step_engine | Sileo SVG Gooey Engine | Springs compact pills to exact measured title widths and drops SVG bodies without premature text floating or exit bleed. | sileo-arch | engine |

## What caused content clipping, theme inversion, and timing lag? {#root-cause-matrix}

| Failure Mode | Root Cause Diagnosed | Hardened SCRIPE Resolution | Live Verification Result |
| --- | --- | --- | --- |
| Pill Title Truncation {#row-pill-width} | `[data-sileo-header-stack/inner]` set `max-width: 100%`, clamping `scrollWidth` to initial `40px` width | Removed `max-width: 100%`; kept header padding `0.5rem 0.75rem` for natural content sizing | `Court Booking Confirmed` (`223px`), `Payment Authorization Failed` (`246px`) {good:Zero Truncation} |
| Action Button Overflow {#row-motion-lag} | Global `* { transition-duration: 0.3s !important }` under `data-animation="moderate"` slowed Framer `<motion.rect data-sileo-body>` to `76px` at `800ms` | Added `transition-property: none !important; transition-duration: 0ms !important` override on `[data-sileo-svg/pill/body/canvas/header/description]` | Error body settles to `108px` (`bottom: 180`); `Retry Payment` sits at `bottom: 164.25` {good:15.75px Safe Margin} |
| OS-Dark / App-Light Inversion {#row-theme-fill} | `SileoToaster` read uninitialized `useTheme` (`isDark=true` fallback) and passed `theme` to upstream `THEME_FILLS` | Never pass `theme` to `SileoBaseToaster`; use `"var(--nx-surface)"` auto fill and `.dark`/`.light` class priority | Dark `rgb(21, 24, 28)` switches live on open toast to Light `rgb(255, 255, 255)` {good:Live Parity & HC} |
| Button Gray Outline Clash {#row-button-border} | `NEXUS_SILEO_STYLES.button` injected `border-nx-line-hi` over OKLCH state button pills (`__insertCSS`) | Removed surface/border classes from `button` default; added `:where([data-sileo-button][data-state])` `color-mix` borders (`28%` / `45%` hover) | Semantic rose/amber/olive pill button borders blend with `--_c` tint {good:Cohesive OKLCH Border} |
| RTL Mirror & Update Leaks {#row-rtl-timers} | `case "action"` ran `normalizeOptions()` twice (double-mirroring RTL); `toast.update()` dropped `variant` and active timeouts | Normalized once after merging toaster defaults; added `activeToastTimers` Map + `clearToastTimer()` and preserved `variant` on update | `dir="rtl"` places `Action` at `toastLeft: 32`, `btnLeft: 48` with Arabic text inside body {good:Single-Mirror RTL} |

## How does SVG gooey expansion synchronize with clip-path reveals? {#expansion-collapse-sequence}

@sequence id=sileo-reveal-seq title="Sileo Pill Expansion, Live Theme Flip & Clean Collapse"
| actor app | Caller / Playground | frontend | source:playground |
| actor facade | sileo-toast Facade | frontend | source:sileo_toast |
| actor svg | Sileo SVG Rects | external | source:globals_css |
| actor dom | Content Reveal Layer | frontend | source:globals_css |
| phase | 1. Compact Pill Arrival (t = 0..120ms) |
| app | facade | Trigger error toast with Retry button | emphasis |
| facade | svg | Mount var(--nx-surface) pill (bodyH = 0px) | |
| svg | dom | expanded=false -> opacity 0, clipPath inset(0 0 100%) | dashed |
| phase | 2. Spring Drop-Down & Delayed Reveal (t = 150..800ms) |
| facade | svg | Framer animates body rect 0 -> 108px (0ms CSS lag) | emphasis |
| svg | dom | Wait 0.25s delay -> clipPath inset(0px), opacity 1 | |
| dom | app | Retry Payment settled 15.75px inside SVG body | return |
| phase | 3. Live Theme Switch & Clean Collapse |
| app | facade | Toggle .dark / .light or cursor leaves toast | dashed |
| facade | svg | Reactive --nx-surface repaints open SVG live | |
| dom | svg | clipPath closes to 100% before bodyH shrinks to 0px | return |

@callout level=warning title="Why does [data-sileo-content] stay clipped until 250ms while SVG rects get 0ms CSS duration?"
In Sileo, Framer Motion drives `<motion.rect data-sileo-body>` height per animation frame via inline styles, whereas CSS transitions reveal `[data-sileo-content]` via `clip-path` after `0.25s` and hide it immediately (`0s` delay) on exit. Keeping `0ms` CSS duration on SVG geometry prevents global `moderate` rules from lagging the backdrop behind the unclipped text or action button.[](source:globals_css)

## Which Nexus tokens and reduced-motion rules govern every state? {#tokens-and-accessibility}

@facts id=sileo-invariants
| Auto Theme Surface Fill | Uses `"var(--nx-surface)"` on `SileoToaster` so SVG cards mirror Light (`#fff`), Dark (`#15181c`), HC Light (`#fff`), and HC Dark (`#0d0f12`) without remounting |
| Explicit Theme Locks | Setting `theme="light"` or `theme="dark"` on `SileoToaster` pairs locked Light/Dark fill with `LOCKED_LIGHT_SILEO_STYLES` or `LOCKED_DARK_SILEO_STYLES` |
| High-Contrast Semantic Ink | Verified Light tokens use `--success` `#126e43` (`4.62:1` pill), `--warning` `#765700` (`4.95:1`), and `--info` `#0b5d85` (`5.24:1`); Dark uses `#61d49a`, `#f2c94c`, `#7dd3fc` |
| Motion Level & Reduced Motion | Both `[data-animation="none"]` and `@media (prefers-reduced-motion: reduce)` snap `bodyH: 68`, `opacity: 1` with `delay: 0s` regardless of `data-animation="moderate"` |
| Official Docs Alignment | Tested and aligned against `https://sileo.aaryan.design/docs` for `top-*`/`bottom-*`, `autopilot`, `fill`, `roundness`, `styles`, `button`, `update`, and `promise` APIs [](source:sileo_docs) |
