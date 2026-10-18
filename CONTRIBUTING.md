# Contributing to SCRIPE Docs Portal

Thank you for your interest in contributing to the **SCRIPE Docs Portal**! This repository hosts the universal technical architecture and commercial operational runbooks for the SCRIPE sports operations platform.

Please review this guide before submitting issues or pull requests.

---

## 1. Repository Architecture & Submodule Workflow

`SCRIPE-Docs-Portal` operates as both:
1. **A Standalone Repository:** Self-contained Next.js application deployable anywhere (Vercel, Cloudflare, Docker).
2. **A Monorepo Submodule:** Tracked at `SCRIPE-Docs-Portal/` inside the primary `SCRIPE` monorepo.

### Submodule Commit Workflow
When modifying the documentation portal from within the parent monorepo:
1. Always commit and push your changes inside the `SCRIPE-Docs-Portal/` directory first:
   ```bash
   cd SCRIPE-Docs-Portal
   git add .
   git commit -m "feat(docs): add comprehensive onboarding guide"
   git push origin main
   ```
2. Then update the submodule pointer in the monorepo root:
   ```bash
   cd ..
   git add SCRIPE-Docs-Portal
   git commit -m "chore: update SCRIPE-Docs-Portal submodule pointer"
   ```

---

## 2. Local Development Setup

### Prerequisites
- **Node.js:** `v20.x` or `v22.x` (LTS recommended)
- **pnpm:** `9.15.4` or higher (`corepack enable && corepack prepare pnpm@9.15.4 --activate`)
- **Git:** 2.40+

### Setup Steps
```bash
# Clone the repository (if standalone)
git clone https://github.com/SCRIPE-org/SCRIPE-Docs-Portal.git
cd SCRIPE-Docs-Portal

# Install dependencies with locked versions
pnpm install --frozen-lockfile

# Launch the development server on http://localhost:3002
pnpm run dev
```

Alternatively, from the parent monorepo root, run:
```bash
node SCRIPE-Dev-Tools/scripe.js dev docs
```

---

## 3. Branching & Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Commit Types
- `feat(docs):` A new documentation page, interactive section, or major visual enhancement.
- `fix(docs):` Correction of architectural information, broken link, typos, or rendering bugs.
- `style(docs):` CSS/Tailwind formatting, spacing adjustments, or theme token alignment.
- `refactor(docs):` Code reorganization or internal engine improvements without user-facing changes.
- `test(docs):` Adding or updating unit tests, parity tests, or audit assertions.
- `chore(docs):` Tooling updates, dependency bumps, or CI workflow changes.

### Branch Naming
- `feature/docs-<topic>`
- `fix/docs-<issue>`
- `docs/locale-<language>`

---

## 4. Internationalization & 7-Language Parity

All technical and commercial pages support 7 languages:
- `en` — English (Source of Truth)
- `ar` — Arabic (Native RTL support)
- `fr` — French
- `ru` — Russian
- `zh` — Simplified Chinese
- `es` — Spanish
- `de` — German

### Locale Parity Rules
When adding or updating page content in `src/data/content/`:
1. Every new key introduced in `src/locales/pages/<section>/en.ts` MUST be mirrored across all 6 target locales.
2. Verify parity before opening a PR:
   ```bash
   pnpm run test
   ```
   The `docsDeepAudit.test.ts` suite asserts that all registered pages have identical section parity across all 7 language registries.

---

## 5. Pre-Submission Quality Gate

Before submitting a Pull Request, verify that all quality gates pass locally:

```bash
# 1. Check code formatting
pnpm exec prettier --check src/

# 2. Run ESLint
pnpm run lint

# 3. Run Vitest test suite
pnpm run test

# 4. Compile Next.js production build with Turbopack
pnpm run build
```

The GitHub Actions CI pipeline enforces these 4 checks automatically across both Node 20 and Node 22.

---

## 6. Pull Request Process

1. Fork the repo or create your branch from `main`.
2. Implement your changes adhering to our Clean Architecture patterns.
3. Ensure all tests and builds succeed with zero warnings and zero errors.
4. Open a Pull Request referencing the related issue or feature specification.
5. Code reviews are conducted by maintainers prior to merging into `main`.

Thank you for helping keep SCRIPE documentation world-class!
