# SCRIPE-Docs-Portal

> High-fidelity, dedicated documentation portal for the **SCRIPE Sports Operations OS** (Venue, Academy, Football Intelligence). Hosted standalone at `docs.scripe.org` (Local development port: `3002`).

---

## 1. Architectural Role

`SCRIPE-Docs-Portal` is the 6th official repository pillar in the SCRIPE monorepo umbrella, isolated from the SaaS enterprise web application (`SCRIPE-Frontend`).

- **Architecture:** Next.js 16 (App Router), React 19, Tailwind CSS.
- **Port Allocation:** Port `3002` (HTTP local dev).
- **Internationalization:** 7-language support (`EN`, `AR` with native RTL, `FR`, `RU`, `ZH`, `ES`, `DE`).
- **Clean Architecture Engine:** Decoupled `DocsRepository`, `DocsService`, `DocPage`, `DocCategory`.
- **Search & Navigation:** Real-time Command Palette (`⌘K` / `Ctrl+K`), sticky TOC scroll-spy, deep link anchors, interactive architecture radar.

---

## 2. Directory Layout

```
SCRIPE-Docs-Portal/
├── README.md                      # Architecture, setup, contributing guide
├── package.json                   # Scripts: dev (port 3002), build, start, test
├── tsconfig.json                  # Path aliases: @/*, @engine/*, @content/*, @locales/*
├── next.config.ts                 # Turbopack, redirects, optimization
├── tailwind.config.ts             # SCRIPE Signal Lime design tokens
├── public/
│   ├── brand/                     # Official brand logos and favicons
│   └── docs/                      # Screenshots, media, and diagrams
└── src/
    ├── app/
    │   ├── globals.css            # Atmospheric glows, tokens, prose styles
    │   ├── layout.tsx             # ThemeProvider + DocsI18nProvider
    │   ├── page.tsx               # Cinematic Developer Landing Hub
    │   ├── technical/             # Technical docs routing (/technical/[...slug])
    │   └── commercial/            # Commercial ops routing (/commercial/[...slug])
    ├── engine/                    # Clean Architecture engine & presentation components
    ├── content/                   # 260+ modular TypeScript documentation pages
    └── locales/                   # 7-language registry trees with strict parity
```

---

## 3. Development Commands

```powershell
# Install dependencies
pnpm install

# Start local development server (http://localhost:3002)
pnpm run dev
# OR from repo root via CLI:
node SCRIPE-Dev-Tools/scripe.js dev docs

# Compile production build
pnpm run build
# OR from repo root via CLI:
node SCRIPE-Dev-Tools/scripe.js build docs

# Run validation tests
pnpm run test
```

---

## 4. Documentation Synchronization Pipeline

`SCRIPE-Dev-Tools` continuously reads TypeScript source definitions from `SCRIPE-Docs-Portal/src/content` and generates markdown files into root `/docs/`:

```powershell
node SCRIPE-Dev-Tools/scripe.js docs sync
```
