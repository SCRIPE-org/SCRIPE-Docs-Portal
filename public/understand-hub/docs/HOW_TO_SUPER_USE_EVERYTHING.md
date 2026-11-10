# How to Super-Use Every Understand-Anything Hub, Port & Capability

> **Complete File Map, Port Directory, and Step-by-Step Playbook** for exploring `SCRIPE-Backend`, `SCRIPE-Frontend`, `SCRIPE/wiki`, and the Full-Stack Monorepo.

---

## Part 1: Exact File Locations on Your Disk

### A. Central Master Hub Directory (`d:\01_PROJECTS\SCRIPE\UNDERSTAND_SUPER_HUB\`)
All human-readable master guides, the standalone Command Center HTML app, and the 1-click launcher scripts live here:

| File | Exact Disk Path | What It Contains |
|---|---|---|
| **`SCRIPE_SUPER_COMMAND_CENTER.html`** | `d:\01_PROJECTS\SCRIPE\UNDERSTAND_SUPER_HUB\SCRIPE_SUPER_COMMAND_CENTER.html` | **7-Tab Standalone Web App** (also served live on `http://127.0.0.1:5177` or can be double-clicked directly in Windows Explorer!) |
| **`START_ALL_5_HUBS.ps1`** | `d:\01_PROJECTS\SCRIPE\UNDERSTAND_SUPER_HUB\START_ALL_5_HUBS.ps1` | PowerShell script to launch all 5 portals (`5173–5177`) anytime after a PC reboot |
| **`OPEN_SUPER_HUBS.bat`** | `d:\01_PROJECTS\SCRIPE\UNDERSTAND_SUPER_HUB\OPEN_SUPER_HUBS.bat` | Double-click `.bat` launcher that starts all 5 servers and opens your browser |
| **`00_MASTER_BACKEND_SUPER_ATLAS.md`** | `d:\01_PROJECTS\SCRIPE\UNDERSTAND_SUPER_HUB\00_MASTER_BACKEND_SUPER_ATLAS.md` | Master overview, quantitative census, and 18-module architecture matrix |
| **`01_ALL_18_MODULES_COMPLETE_ENCYCLOPEDIA.md`** | `d:\01_PROJECTS\SCRIPE\UNDERSTAND_SUPER_HUB\01_ALL_18_MODULES_COMPLETE_ENCYCLOPEDIA.md` | Every single Entity (`436`), Command (`596`), Query (`385`), Handler (`1,820`), Validator (`451`), Controller (`141`), Endpoint (`991`), and Table (`251`) |
| **`02_BACKEND_ONBOARDING_BIBLE.md`** | `d:\01_PROJECTS\SCRIPE\UNDERSTAND_SUPER_HUB\02_BACKEND_ONBOARDING_BIBLE.md` | `/understand-onboard` Day-1 mental model, 5 Golden Laws, and step-by-step developer playbooks |
| **`03_BACKEND_DEEP_DIVE_EXPLAIN.md`** | `d:\01_PROJECTS\SCRIPE\UNDERSTAND_SUPER_HUB\03_BACKEND_DEEP_DIVE_EXPLAIN.md` | `/understand-explain` request-to-database sequence diagrams, `Scripe.Core` kernel, AstraFlow 2.2.0 pipeline, and Dual-Mode persistence |
| **`04_BACKEND_18_DOMAINS_AND_FLOWS.md`** | `d:\01_PROJECTS\SCRIPE\UNDERSTAND_SUPER_HUB\04_BACKEND_18_DOMAINS_AND_FLOWS.md` | `/understand-domain` complete catalog of all 18 business domains, 36 write/read flows, and 144 execution steps |
| **`05_BACKEND_DIFF_AND_BLAST_RADIUS.md`** | `d:\01_PROJECTS\SCRIPE\UNDERSTAND_SUPER_HUB\05_BACKEND_DIFF_AND_BLAST_RADIUS.md` | `/understand-diff` change impact and downstream blast radius report |

---

### B. Raw Graph Databases (`.ua/` Directories Used by Ports `5173–5176`)

| Scope | Port | Graph Files on Disk |
|---|---:|---|
| **`SCRIPE-Backend`** | `5173` | `d:\01_PROJECTS\SCRIPE\SCRIPE-Backend\.ua\knowledge-graph.json` (`16,242` nodes, `53,541` edges)<br>`d:\01_PROJECTS\SCRIPE\SCRIPE-Backend\.ua\domain-graph.json` (`198` nodes, `209` edges)<br>`d:\01_PROJECTS\SCRIPE\SCRIPE-Backend\.ua\diff-overlay.json`<br>`d:\01_PROJECTS\SCRIPE\SCRIPE-Backend\.ua\intermediate\module-encyclopedia-stats.json` |
| **`SCRIPE/wiki` (Karpathy LLM Wiki)** | `5174` | `d:\01_PROJECTS\SCRIPE\wiki\.ua\knowledge-graph.json` (`129` nodes, `430` edges)<br>`d:\01_PROJECTS\SCRIPE\wiki\articles\*.md` (`36` Markdown articles)<br>`d:\01_PROJECTS\SCRIPE\wiki\index.md` |
| **Full-Stack Monorepo (`SCRIPE`)** | `5175` | `d:\01_PROJECTS\SCRIPE\.ua\knowledge-graph.json` (`25,504` nodes, `71,683` edges)<br>`d:\01_PROJECTS\SCRIPE\.ua\domain-graph.json` (`198` nodes, `209` edges)<br>`d:\01_PROJECTS\SCRIPE\.ua\diff-overlay.json` |
| **`SCRIPE-Frontend`** | `5176` | `d:\01_PROJECTS\SCRIPE\SCRIPE-Frontend\.ua\knowledge-graph.json` (`9,269` nodes, `18,142` edges)<br>`d:\01_PROJECTS\SCRIPE\SCRIPE-Frontend\.ua\domain-graph.json` (`84` nodes, `94` edges)<br>`d:\01_PROJECTS\SCRIPE\SCRIPE-Frontend\.ua\diff-overlay.json` |

---

## Part 2: How to Use Each Live Portal (`5177`, `5173`, `5174`, `5175`, `5176`)

### 1. Port `5177` — Unified Super Command Center (`http://127.0.0.1:5177`)
**Best for:** Instant symbol lookup across all 18 Backend modules, browsing all 36 business flows, reading the 36 Wiki articles, or switching between all 4 graph dashboards inside a single window.

- **Tab 1 (`1. 18-Module Backend Explorer`)**:
  - Click any of the **18 Modules** (or `Core` / `Host.API`) in the left sidebar (`Identity`, `Venue`, `CRM`, `Finance`, `CatalogPricing`, `Hrms`, etc.).
  - Use the **top-left instant search box** (`Filter symbols...`) to filter Entities, Commands, Queries, Handlers, Validators, `DbSet<T>` Tables, and HTTP Endpoints in real time.
- **Tab 2 (`2. 18 Business Domains & 36 Flows`)**:
  - Displays every module's Write (Command/Outbox) and Read (Query/Projection) flows with all 4 code-anchored steps side by side.
- **Tabs 3, 4, 5, 6 (`Live Graphs :5173, :5174, :5175, :5176`)**:
  - Embeds each interactive Vite graph dashboard directly inside the Command Center, with an **"Open Full Screen in New Tab ↗"** button at the top right.
- **Tab 7 (`7. 36 Karpathy Wiki Articles`)**:
  - Click any of the 36 articles in the left sidebar to read its full Markdown specification and `[[wikilinks]]`.

---

### 2. Port `5173` — `SCRIPE-Backend` Super Dashboard (`http://127.0.0.1:5173/?token=scripe`)
**Best for:** Deep visual exploration of the .NET 10 Backend (`16,242` nodes, `53,541` edges, `22` module layers, `18` business domains).

1. **Switch Persona Depth (`Overview` | `Learn` | `Deep Dive`)** *(Top Header Left)*:
   - **`Overview`**: High-level module and layer architecture without clutter.
   - **`Learn`**: Turns on the **Guided Tour** (`22 steps` covering `Host.API`, `Core`, all `18 Modules`, and `Tests`) and shows **Language Concepts** (`languageNotes` + `languageLesson`) explaining C# 13, AstraFlow 2.2.0, `Result<T>`, and EF Core patterns.
   - **`Deep Dive`**: Unlocks full file, class, method, endpoint, table, and blast-radius details plus the integrated **CodeViewer**.
2. **Switch Between `Structural` and `Domain` Views (`Domain | Structural`)** *(Top Header Center)*:
   - **`Structural` Mode**:
     - Shows the **22 Architectural & Module Layers** as interactive clusters.
     - **Double-click any module cluster** (e.g., `Module: Venue`, `Module: CRM`, `Module: Identity`) to drill inside its files, controllers, entities, and tables. Press `Esc` or click the top-left breadcrumb to zoom back out.
   - **`Domain` Mode (`/understand-domain`)**:
     - Shows all **18 Business Domains** and their **29 animated cross-domain interaction edges**.
     - **Click any Domain node** (e.g., `Venue`, `CRM`, `Finance`) to see its **Entities**, **Business Rules**, **Cross-Domain Interactions**, and **Flows** in the right panel, and watch the canvas drill into its Write & Read Flow pipelines (`Step 1 -> Step 2 -> Step 3 -> Step 4`).
     - **Click any Step node** (e.g., `3. AstraFlow CommandHandler & Domain Logic`) and click **`OPEN CODE`** in the right panel to open the exact C# source file and line range at the bottom of the screen!
3. **Toggle Granularity (`Files` | `+Classes` | `Classes + FN`)**:
   - **`Files`**: Shows file-level, endpoint, and table nodes.
   - **`+Classes`**: Adds all C# classes, interfaces, records, structs, and enums (`8,213` nodes) inside each file.
   - **`Classes + FN`**: Adds all **`1,741` C# Method/Function nodes** (`Handle`, `Validate`, `Configure`, `SeedAsync`, `ToDto`, controller actions).
   - You can also click any file node and look under **`Defined in this file (N)`** in the right sidebar to jump directly to any class or method inside that file.
4. **Toggle Change Impact (`Diff ON` / `Diff OFF`)**:
   - Highlights modified files in coral red and downstream affected neighbors in amber (`diff-overlay.json`).
5. **Path Finder (`Path` Button in Top Bar)**:
   - Click `Path`, select any two nodes (e.g., a Controller and a Database Table), and the graph highlights the exact dependency chain connecting them.

---

### 3. Port `5174` — Karpathy LLM Wiki Knowledge Graph (`http://127.0.0.1:5174/?token=scripe`)
**Best for:** Exploring the conceptual knowledge graph (`kind: "knowledge"`) of SCRIPE (`36` Markdown articles, `62` entities, `22` architectural claims, `8` topic clusters, `430` semantic edges).

- **Click Any Article, Claim, or Entity Node**:
  - The right sidebar displays its **Wikilinks (`[[...]]`)**, **Backlinks**, **Category**, and renders the **Full Markdown Article Content** right inside the inspector.
- **Run the 25-Step Knowledge Tour**:
  - Click **`Start Tour`** in the right panel to walk through the 7 core platform architecture pillars followed by all 18 backend module knowledge hubs (`Steps 8–25`).
- **Filter by Topic Layer**:
  - Use the top layer bar (`Architecture & Vision`, `Core Framework`, `Data & Persistence`, `Security & Governance`, `Platform Modules`, `Business Modules`, `18 Backend Modules Encyclopedia`) to isolate specific knowledge domains.

---

### 4. Port `5175` — Full-Stack Monorepo Merged Dashboard (`http://127.0.0.1:5175/?token=scripe`)
**Best for:** Seeing the entire **25,504-node / 71,683-edge** SCRIPE platform (`SCRIPE-Backend` + `SCRIPE-Frontend`) in one unified canvas.

- **38 Layers**: Contains all `22` Backend module layers (`[SCRIPE-Backend] ...`) and all `16` Frontend MVVM layers (`[SCRIPE-Frontend] ...`).
- **38-Step Full-Stack Master Tour**: Steps `1–22` walk through the .NET 10 Backend; Steps `23–38` walk through the Next.js 16 + React 19 Frontend.

---

### 5. Port `5176` — `SCRIPE-Frontend` Next.js 16 MVVM Dashboard (`http://127.0.0.1:5176/?token=scripe`)
**Best for:** Auditing and exploring the Next.js 16 + React 19 Frontend (`9,269` nodes: `4,156` files + `5,113` exported Views, ViewModels, Hooks, Repositories, Services, and Locales).

- **16 Clean Architectural & Feature Module Layers**:
  - Drill into `Next.js 16 App Router`, `Core Design System (@core/ui/* & Nexus Tokens)`, `Core Kernel, DI Container, IApiService & Hooks`, or any of the 13 feature modules (`CRM`, `Venue`, `Admin`, `Billing`, `CustomFields`, `PartyKernel`, `HRMS`, `Marketplace`, `WorkManagement`, `Media`, `Plugins`, `Analytics`).
- **Frontend `Domain` Mode (`Domain | Structural`)**:
  - Switch to **`Domain`** in the top bar to inspect all **14 Frontend Modules** and trace their **4-step unidirectional MVVM flows** (`1. Presentation View (@core/ui/*) -> 2. ViewModel Hook -> 3. Repository -> 4. Service & DI Container (IApiService)`), with **`OPEN CODE`** on every step!

---

## Part 3: Keyboard Shortcuts Inside Any Graph Dashboard (`5173–5176`)

| Shortcut | Action |
|---|---|
| **`/`** or **`Ctrl+K`** | Focus the fuzzy/semantic search bar |
| **`Double-Click Cluster`** | Drill into a Module / Layer container |
| **`Esc`** | Close active node / Return from Layer drill-down to Project Overview |
| **`←` / `→`** | Previous / Next step during an active Project Tour |
| **`?`** | Open the interactive Keyboard Shortcuts modal |
