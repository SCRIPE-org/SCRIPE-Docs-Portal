# SCRIPE — Ultimate Understand-Anything Super Atlas (All-in-One Master Hub)

> **Single-Place Master Reference** uniting every capability of `/understand`, `/understand-domain`, `/understand-knowledge`, `/understand-onboard`, `/understand-explain`, `/understand-diff`, `/understand-chat`, and `/understand-dashboard` across **100% of `SCRIPE-Backend`**, **`SCRIPE-Frontend`**, **`SCRIPE/wiki`**, and the **Full-Stack Monorepo**.

---

## 1. All 5 Live Interactive Web Portals (`/understand-dashboard`)

| Port | Portal Name | Direct URL | Nodes & Edges | Layers & Guided Tour | Domain & Flow Graph |
|---:|---|---|---|---|---|
| **5177** | **Unified Super Command Center (All-in-One Hub)** | **[http://127.0.0.1:5177](http://127.0.0.1:5177)** | All 18 Modules + All 4 Live Graphs + 36 Wiki Articles | 7 Interactive Tabs + Instant Symbol Search | Full 18-Domain & 36-Flow Explorer |
| **5173** | **`SCRIPE-Backend` Super Dashboard** | **[http://127.0.0.1:5173/?token=scripe](http://127.0.0.1:5173/?token=scripe)** | **`16,242` nodes** · **`53,541` edges** | **`22` Layers** · **`22`-Step Tour** | **`18` Domains · `36` Flows · `144` Steps (`198` nodes, `209` edges)** |
| **5174** | **`SCRIPE` Karpathy LLM Wiki Knowledge Graph** | **[http://127.0.0.1:5174/?token=scripe](http://127.0.0.1:5174/?token=scripe)** | **`129` nodes** · **`430` edges** | **`8` Knowledge Layers** · **`25`-Step Tour** | `36` Articles · `62` Entities · `22` Claims · `8` Topics |
| **5175** | **Full-Stack Monorepo Merged Dashboard** | **[http://127.0.0.1:5175/?token=scripe](http://127.0.0.1:5175/?token=scripe)** | **`25,504` nodes** · **`71,683` edges** | **`38` Layers** · **`38`-Step Tour** | **`18` Domains · `36` Flows · `144` Steps** |
| **5176** | **`SCRIPE-Frontend` Next.js 16 MVVM Dashboard** | **[http://127.0.0.1:5176/?token=scripe](http://127.0.0.1:5176/?token=scripe)** | **`9,269` nodes** · **`18,142` edges** | **`16` MVVM Layers** · **`16`-Step Tour** | **`14` Frontend Domains · `14` MVVM Flows · `56` Steps (`84` nodes, `94` edges)** |

---

## 2. Executive Quantitative Census of `SCRIPE-Backend`

| Architectural Dimension | Total Count | Breakdown across `Host.API`, `Core`, and 18 Business Modules |
|---|---:|---|
| **Total Scanned Backend Files** | **6,287** | `6,077` C# (`.cs`), `73` JSON, `62` XML/`.csproj`/`.props`, `55` Markdown, `20` Docker/SQL/Scripts |
| **Backend Knowledge Graph Nodes** | **16,242** | Files, Classes, Interfaces, Records, Enums, C# Methods/Functions (`1,741`), REST Endpoints (`991`), Database Tables (`251`), Modules, and Concepts |
| **Backend Knowledge Graph Edges** | **53,541** | `contains`, `imports`, `implements`, `inherits`, `serves`, `defines_schema`, `validates`, `tested_by`, `configures`, `documents` |
| **Business Modules** | **18 + 2** | `Host.API`, `Core` (`Domain`, `Application`, `Infrastructure`), plus **18 3-Project Modules** (`54` module `.csproj` projects) |
| **Domain Entities & Aggregate Roots** | **308** | Inheriting from `AuditableEntity` with UTC timestamps, soft-delete `IsDeleted`, and `RowVersion` concurrency tokens |
| **CQRS Commands (`ICommand`)** | **602** | State-mutating write contracts mediated by `AstraFlow.Mediator` |
| **CQRS Queries (`IQuery`)** | **399** | Read-optimized query contracts with `AsNoTracking()` and pagination guards |
| **CQRS & Event Handlers** | **1,001** | CommandHandlers, QueryHandlers, and EventHandlers returning `Result<T>` |
| **FluentValidation Validators** | **618** | Automatically executed in pipeline stage 2 (`ValidationBehavior<,>`) |
| **REST API Controllers & Endpoints** | **157 / 991** | Mapped across all 18 modules (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) |
| **Isolated Database Tables (`DbSet<T>`)** | **249** | Across **19** EF Core `DbContext`s supporting SQL Server, PostgreSQL, and Oracle |
| **Background Jobs & Seeders** | **68 / 133** | Hangfire `IAutoRegisteredJob` recurring workers & UAT Permission/Feature/Menu/Data seeders |

---

## 3. Master Matrix of All 18 Backend Modules + `Core` + `Host.API` (With Mapped Controllers & Endpoints)

| # | Module | Schema | Files | Entities | Commands | Queries | Handlers | Validators | Controllers | HTTP Endpoints | DB Tables (`DbSet`) | Jobs | Seeders / Providers | Tests |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | **`Host.API`** | `host.api` | 225 | 0 | 2 | 0 | 2 | 3 | 156 | **991** | 0 | 0 | 1 | 0 |
| 2 | **`Core`** | `core` | 699 | 0 | 54 | 22 | 47 | 32 | 1 | **0** | 3 | 10 | 5 | 145 |
| 3 | **`Analytics`** | `analytics` | 62 | 2 | 1 | 2 | 3 | 1 | 0 | **0** | 2 | 0 | 5 | 11 |
| 4 | **`CatalogPricing`** | `catalog_pricing` | 191 | 27 | 4 | 2 | 6 | 4 | 0 | **0** | 15 | 2 | 5 | 38 |
| 5 | **`Communication`** | `communication` | 96 | 4 | 2 | 0 | 4 | 2 | 0 | **0** | 6 | 2 | 6 | 10 |
| 6 | **`Compliance`** | `compliance` | 202 | 11 | 19 | 14 | 32 | 32 | 0 | **0** | 11 | 6 | 9 | 24 |
| 7 | **`CRM`** | `crm` | 399 | 18 | 30 | 16 | 64 | 30 | 0 | **0** | 16 | 1 | 13 | 26 |
| 8 | **`CustomFields`** | `custom_fields` | 524 | 17 | 39 | 30 | 75 | 45 | 0 | **0** | 17 | 5 | 8 | 141 |
| 9 | **`Entitlements`** | `entitlements` | 928 | 80 | 109 | 75 | 185 | 113 | 0 | **0** | 49 | 16 | 13 | 63 |
| 10 | **`Finance`** | `finance` | 94 | 11 | 5 | 10 | 15 | 5 | 0 | **0** | 7 | 1 | 5 | 9 |
| 11 | **`Hrms`** | `hrms` | 223 | 7 | 21 | 14 | 35 | 22 | 0 | **0** | 7 | 1 | 6 | 44 |
| 12 | **`Identity`** | `identity` | 1101 | 49 | 175 | 117 | 292 | 170 | 0 | **0** | 46 | 5 | 14 | 108 |
| 13 | **`Integrations`** | `integrations` | 103 | 5 | 8 | 7 | 15 | 8 | 0 | **0** | 7 | 5 | 5 | 12 |
| 14 | **`Marketplace`** | `marketplace` | 172 | 14 | 23 | 14 | 44 | 37 | 0 | **0** | 14 | 4 | 7 | 22 |
| 15 | **`Media`** | `media` | 98 | 4 | 6 | 6 | 13 | 6 | 0 | **0** | 4 | 1 | 5 | 23 |
| 16 | **`OrganizationCore`** | `organization_core` | 209 | 6 | 19 | 13 | 31 | 18 | 0 | **0** | 7 | 1 | 5 | 45 |
| 17 | **`PartyKernel`** | `party_kernel` | 306 | 11 | 26 | 17 | 43 | 24 | 0 | **0** | 12 | 1 | 6 | 65 |
| 18 | **`Plugins`** | `plugins` | 148 | 8 | 19 | 6 | 30 | 28 | 0 | **0** | 8 | 3 | 5 | 15 |
| 19 | **`Venue`** | `venue` | 439 | 33 | 37 | 32 | 60 | 35 | 0 | **0** | 17 | 3 | 5 | 99 |
| 20 | **`WorkManagement`** | `work_management` | 68 | 1 | 3 | 2 | 5 | 3 | 0 | **0** | 1 | 1 | 5 | 9 |
