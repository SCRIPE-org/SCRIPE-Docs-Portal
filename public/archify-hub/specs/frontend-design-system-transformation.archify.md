# How does SCRIPE Relay vNext unify contrast, dark depth, and floating overlay motion? {#frontend-design-system-transformation}

SCRIPE-Frontend unifies its entire product shell and auth vault under **canonical `--scripe-*` Relay tokens**, curing dark black-crush, broken disabled-CTA contrast, and viewport-sliding floating overlays.[](source:scripe_tokens)[](source:design_spec)

- Defining `--scripe-bg: #0b0d10` and `--scripe-surface: #15181c` separates dark tiers cleanly while keeping primary Signal Lime `#C6FF00` paired exclusively with dark ink `#0B0D10` (`16.40:1`).[](source:scripe_tokens)
- Guarding disabled buttons with `:not(:disabled):not([aria-disabled="true"])` in `globals.css` lifts Dark disabled CTA label contrast from `1.09:1` to `8.20:1`.[](source:scripe_tokens)
- Replaced global wildcard `\*` transition overrides with `--nx-t-*` CSS variables and locked `[data-radix-popper-content-wrapper]` to stop coordinate drift at Frame 0.[](source:tooltip_prim)[](source:dropdown_prim)
- Prefixing `transition-none` before `duration-nx-micro` on Radix primitives prevents `transition-property: all` from interpolating `transform-origin` across the viewport.[](source:select_prim)[](source:overlay_tests)

@answer scope="SCRIPE Relay vNext · Next.js 16 · Dark/Light · RTL"
@meta locale=en style=editorial quality_profile=showcase repo_url=https://github.com/SCRIPE-org/SCRIPE-Frontend.git repo_revision=a65306410baa1d13a03b62bca7aa158b5da27e4e
@source scripe_tokens title="Canonical Relay vNext Tokens (src/app/globals.css)" path=src/app/globals.css lines=306:364
@source globals_lock title="Radix Popper Wrapper & Motion Token Rules" path=src/app/globals.css
@source design_spec title="DESIGN.md — SCRIPE Relay Design System vNext" path=DESIGN.md
@source tooltip_prim title="@core/ui/tooltip Frame-0 Origin Lock" path=src/core/ui/tooltip.tsx
@source dropdown_prim title="@core/ui/dropdown-menu Origin & RTL" path=src/core/ui/dropdown-menu.tsx
@source select_prim title="@core/ui/select Origin-Scaled Popper" path=src/core/ui/select.tsx
@source notification_bell title="NotificationBell Layout Effect Lock" path=src/core/ui/notification/NotificationBell.tsx
@source date_picker title="DatePicker Scoped Transform Transition" path=src/core/ui/date-picker.tsx
@source overlay_tests title="Floating Overlay Motion Regression Suite" path=src/core/ui/__tests__/floating-overlay-motion.test.tsx

## How do canonical tokens feed Nexus and Auth Vault surfaces? {#relay-token-architecture}

@architecture id=relay-token-flow title="SCRIPE Relay vNext Token Cascade & Overlay Surface Architecture"
| scripe | Canonical Relay Tokens | frontend | source:scripe_tokens |
| nexus | Nexus Shell Tokens | frontend | source:globals_lock |
| vault | Auth Vault Tokens | frontend | source:design_spec |
| popper | Radix Popper Primitives | frontend | source:tooltip_prim |
| wrapper | Popper Wrapper Lock | security | source:globals_lock |
| telemetry | Playwright & Vitest Gate | backend | source:overlay_tests |
| scripe > nexus | Re-base shell palette | emphasis |
| scripe > vault | Re-base auth stage | |
| nexus > popper | Supply colors & duration | |
| wrapper > popper | Pin Frame-0 coords | security |
| popper > telemetry | Assert 0px drift & AA | dashed |

@steps id=relay-token-steps
| step_scripe | Canonical Relay Tokens | Defines neutral dark obsidian (`#0B0D10`, `#15181C`), mineral light paper (`#F7F8F5`, `#FFFFFF`), Signal Lime (`#C6FF00`), and semantic status hues in `src/app/globals.css`. | relay-token-flow | scripe |
| step_nexus | Nexus Shell Tokens | Consumed across ~580 shell and module files with distinct hover tints, accessible focus rings (`shadow-nx-focus`), and dynamic motion duration tokens (`--nx-t-micro/standard/panel`). | relay-token-flow | nexus |
| step_vault | Auth Vault Tokens | Powers standalone login, signup, and recovery screens with restrained `.scripe-auth-stage` depth and V3 Relay Grid branding without ambient orbs. | relay-token-flow | vault |
| step_wrapper | Popper Wrapper Lock | Freezes `[data-radix-popper-content-wrapper]` and `.recharts-tooltip-wrapper` via `transition: none !important` so Floating UI coordinates never animate. | relay-token-flow | wrapper |
| step_popper | Radix Popper Primitives | Applies `transition-none` before `duration-nx-micro`, symmetric `zoom-in-95`/`fade-in-0` scales from transform-origin tokens, and direct `dir` RTL propagation. | relay-token-flow | popper |
| step_gate | Playwright & Vitest Gate | Validates Frame-0 coordinate stability (`coordDriftPx: 0`), `92/92` WCAG CSS color pairs, disabled CTA ratios, and unit assertions cleanly. | relay-token-flow | telemetry |

## How did dark surface depth and WCAG contrast change across modes? {#contrast-calibration}

Every theme surface, border, status pill, and disabled button pair now satisfies WCAG 2.2 AA contrast bounds across Light and Dark modes.[](source:scripe_tokens)[](source:design_spec)

```mermaid title="Measured WCAG 2.2 Contrast Ratios Before vs After Relay Evolution"
xychart-beta
  x-axis ["Light Ink3 Ground", "Dark LineHi Surface", "Light Primary CTA", "Light Success Pill", "Light Warning Pill", "Dark Disabled CTA"]
  y-axis "Contrast Ratio (:1)" 0 --> 9
  bar "Before" [4.43, 1.95, 1.19, 2.46, 1.72, 1.09]
  bar "After" [5.76, 3.88, 7.00, 4.63, 5.02, 8.20]
```

| Audit Surface Pair | Before Migration | After Relay vNext & Fixes | Target Standard |
| --- | --- | --- | --- |
| Dark `--nx-ground` -> `--nx-surface` -> `--nx-raised` {#row-dark-step} | `#050506 -> #0D0D0E -> #151719` (`1.05:1` step) {caution:Black crush} | `#0B0D10 -> #15181C -> #1F242B` (`1.09:1` / `1.14:1`) {good:Clear separation} | Distinct obsidian ladder |
| Dark `--nx-line-hi` vs Surface {#row-dark-line} | `#3F4347` on `#0D0D0E` (`1.95:1`) {bad:Below 3.0:1} | `#6E7681` on `#15181C` (`3.88:1`) {good:WCAG 1.4.11 PASS} | UI border >= `3.0:1` |
| Light `--nx-ink-3` on Canvas / Raised {#row-light-ink3} | `#6F756F` (`4.43:1` / `4.11:1`) {bad:Below 4.5:1} | `#5E635E` (`5.76:1` / `5.35:1`) {good:WCAG AA PASS} | Body text >= `4.5:1` |
| Dark `/login` Disabled CTA (`DEF-03`) {#row-def03-cta} | Black text at ~40% opacity on dark slab (`1.09:1`) {bad:Unreadable} | Excluded `:disabled` from descendant fill force (`8.20:1` label / `6.33:1` arrow) {good:WCAG AA PASS} | Control text >= `4.5:1` |
| Light Primary CTA & Status Pills {#row-light-pills} | `--primary` `#C3FF00` / light green & amber (`1.19:1`–`2.46:1`) {bad:Fails AA} | Dark lime ink `#4C6200` + semantic pills (`4.63:1`–`7.00:1`) {good:All 92 pairs PASS} | Semantic AA >= `4.5:1` |

## Why did dropdowns and tooltips slide, and how does Frame-0 snap work? {#floating-overlay-motion}

@sequence id=overlay-snap-seq title="Floating Overlay Opening: Root Cause Fix & Frame-0 Origin Snap"
| actor user | Trigger Control | frontend | source:dropdown_prim |
| actor popper | Radix Popper Wrapper | external | source:globals_lock |
| actor panel | Overlay Content Node | frontend | source:tooltip_prim |
| actor css | Globals Motion Tokens | security | source:scripe_tokens |
| phase | 1. Pre-Fix Viewport Slide (Eliminated) |
| user | popper | Click trigger or hover rail icon | |
| css | popper | Wildcard rule forces transition-duration: 0.3s | dashed |
| popper | panel | Slides transform: translate3d and eases transform-origin | |
| phase | 2. Fixed Frame-0 Origin Snap |
| css | popper | transition: none !important on popper wrapper | security |
| user | popper | Trigger open -> Floating UI commits final (x, y) on Frame 0 | emphasis |
| panel | css | Read --nx-t-micro (.14s / .22s / 0s) with transition-none | |
| popper | user | Scale 0.95 -> 1.00 directly from trigger origin | return |

@callout level=warning title="Why transition-none before duration-nx-micro is essential"
Tailwind animation utilities only behave predictably when `transition-property` stays `none` on Radix Content containers. Without explicit `transition-none`, CSS `transition-property: all` interpolates `transform-origin` from the default center (`50% 50%`) toward `--radix-*-content-transform-origin` over `140ms`, making stationary menus appear to drift from afar.[](source:tooltip_prim)[](source:overlay_tests)

## Which verification gates and boundaries govern the rollout? {#verification-matrix}

@facts id=rollout-facts
| Pre-Drift Clean Build (`#219`) | `385/385` Vitest files (`3,311/3,311` tests), `0` `tsc`/`oxlint`/locale/`arch-check` errors, `202/202` Next.js routes built cleanly |
| Round 3 Live Overlay Telemetry (`#225`) | `25/25` Radix Popper traces and `4/4` `DatePicker` traces hit `coordDriftPx: 0` with `originConstantFromFrame0: true` across Dark/Light, EN/AR, and `moderate`/`high`/`none` motion |
| Disabled CTA Contrast (`DEF-03`) | Dark LTR/RTL disabled button reads `8.20:1` (`6.33:1` arrow); Light reads `7.17:1` (`4.95:1` arrow); enabled lime CTA reads `16.40:1` Dark |
| Non-Implemented Audit Log (`DESIGN.md §24`) | Recorded cleanly in `UI_UX_AUDIT_REPORT.md` (standalone `AccountLayout` `useAdminSettingsSync` absence, minor `DatePicker`/`NotificationBell` first-frame width/height settle, offline `_vercel/*` 404s, parallel image uploaders) |
| Protected & External Boundaries | `SCRIPE-Backend/**`, `venue/money/**`, `venue/operations-calendar/**`, and `public/*.png` remain `0`-diff; external concurrent edits in `shared/profile/**` are tracked separately outside this swarm |

- [ ] Confirm all modified `@core/ui/*` overlay primitives retain `transition-none` ahead of `duration-nx-micro` in code reviews.
- [ ] Re-run global static and Vitest gates over `src/modules/shared/profile/**` once external concurrent edits finish settling.
- [ ] Approve or defer standalone `AccountLayout` `useAdminSettingsSync` onboarding tracked under `AUD-01` in `UI_UX_AUDIT_REPORT.md`.

## What do the canonical Relay Light and Dark tokens define? {#scripe-token-source}

@code source=scripe_tokens language=css
