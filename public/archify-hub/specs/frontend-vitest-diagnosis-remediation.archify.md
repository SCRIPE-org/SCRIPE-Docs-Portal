# Why did 5 Vitest suites fail in SCRIPE-Frontend, and which bugs lived in Main App vs Tests? {#frontend-vitest-diagnosis-remediation}

Five Vitest suites (`7` of `3301` tests) failed under `scripe test frontend`. One suite surfaced three Main App UI bugs alongside missing test mocks.[](source:vitest_cfg)[](source:option_set_test)

- `optionSet.wiring.test.ts` failed purely because its text-slice end marker broke when commit `a65306410` appended valid `useMemo` dependencies (`vm.error`, `vm.items`, `vm.refresh`) in `CustomFieldListView.tsx`.[](source:option_set_test)
- `VenueOverviewComponents.test.tsx` and `VenueOverviewView.test.tsx` lacked `@core/providers/i18n-provider` mocks after unmounted `useI18n()` began returning `defaultValue`, which simultaneously exposed hardcoded English buttons, raw camelCase KPI fallbacks, and a mismatched dashboard label in the Main App.[](source:venue_header)[](source:venue_kpi)[](source:venue_nav)
- Under 12-worker parallel CPU load, redundant monorepo file walks in `use-restricted-fields.backendContract.test.ts` (`13275ms–14263ms` per test) and heavy DOM tests in `PipelineManagementView.test.tsx` (`18513ms`) exceeded Vitest's default `15000ms` limit.[](source:contract_test)[](source:pipeline_test)

@answer scope="SCRIPE-Frontend · 384 Suites / 3301 Tests · 12-Worker Windows Run · 5 Quality Gates Passed"
@meta locale=en style=editorial quality_profile=showcase repo_url=https://github.com/SCRIPE-org/SCRIPE-Frontend.git repo_revision=a65306410baa1d13a03b62bca7aa158b5da27e4e
@source option_set_test title="Option Set Gate Wiring Test" path=src/modules/custom-fields/custom-fields/option-set/optionSet.wiring.test.ts
@source venue_header title="Venue Overview Header Component" path=src/modules/venue/venue-overview/src/presentation/components/VenueOverviewHeader.tsx
@source venue_kpi title="Venue Overview KPI Strip Component" path=src/modules/venue/venue-overview/src/presentation/components/VenueOverviewKpiStrip.tsx
@source venue_nav title="Venue Navigation Tab Bar" path=src/modules/venue/shared/src/presentation/components/VenueNav.tsx
@source venue_en title="Venue Overview English Locales" path=src/modules/venue/venue-overview/locales/venue-overview.en.ts
@source venue_ar title="Venue Overview Arabic Locales" path=src/modules/venue/venue-overview/locales/venue-overview.ar.ts
@source venue_comp_test title="Venue Overview Component Tests" path=src/modules/venue/venue-overview/src/presentation/components/VenueOverviewComponents.test.tsx
@source venue_view_test title="Venue Overview View Tests" path=src/modules/venue/venue-overview/src/presentation/views/VenueOverviewView.test.tsx
@source contract_test title="Restricted Fields Backend Contract Test" path=src/core/hooks/use-restricted-fields.backendContract.test.ts
@source pipeline_test title="CRM Pipeline Management View Test" path=src/modules/crm/opportunities/src/presentation/views/PipelineManagementView.test.tsx
@source vitest_cfg title="Vitest Configuration" path=vitest.config.ts

## How did triage separate deterministic bugs from parallel load timeouts? {#triage-workflow}

@workflow id=triage-flow title="Vitest Failure Triage, Root-Cause Split & 5-Gate Verification"
| lane triage | Triage Runs |
| lane fix | Targeted Fixes |
| lane verify | Post-Edit Gates |
| baseline | 5 Failed Suites (539.04s) | external | triage |
| split | Deterministic vs Contention? | backend | triage |
| test_bug | Fix OptionSet & Contract Cache | frontend | fix | source:contract_test
| app_bug | Fix Venue Header, KPI & Nav + Mocks | frontend | fix | source:venue_header
| timeout_cfg | Raise Vitest Timeout to 30000ms | backend | fix | source:vitest_cfg
| suite_pass | 100% Suites Passed (349.59s) | security | verify |
| baseline > split | | |
| split > test_bug | test only | |
| split > app_bug | app + i18n mock | emphasis |
| split > timeout_cfg | over 15s | |
| test_bug > suite_pass | | |
| app_bug > suite_pass | | |
| timeout_cfg > suite_pass | | emphasis |

@steps id=triage-steps
| step_baseline | 5 Failed Suites (539.04s) | Initial `scripe test frontend` run failed `5` files (`7` of `3301` tests); isolating runs exposed deterministic failures vs load timeouts. | triage-flow | baseline |
| step_split | Deterministic vs Contention? | Comparing standalone timings (`515.95s` load vs `38830ms` uncontended pipeline) separated test timeouts from i18n and wiring breaks. | triage-flow | split |
| step_test | Fix OptionSet & Contract Cache | Updated block extraction in `optionSet.wiring.test.ts` and cached monorepo walks in `use-restricted-fields.backendContract.test.ts`. | triage-flow | test_bug |
| step_app | Fix Venue Header, KPI & Nav + Mocks | Localized quick actions in EN/AR, mapped human KPI `defaultValue` fallbacks, aligned `VenueNav`, and added key-echo mocks. | triage-flow | app_bug |
| step_timeout | Raise Vitest Timeout to 30000ms | Increased `testTimeout` from `15000` to `30000` in `vitest.config.ts` for heavy 2D workflow suites under 12-worker load. | triage-flow | timeout_cfg |
| step_verify | 100% Suites Passed (349.59s) | Re-ran `scripe test frontend --show-errors`, `scripe validate-locales`, `scripe arch-check`, `npx oxlint`, and `scripe build frontend` cleanly. | triage-flow | suite_pass |

## Which failures belonged to the Main App vs the Tests? {#main-app-vs-test-matrix}

| Failing Suite | Failure Mechanism | Verdict | Applied Remediation | Post-Edit Outcome |
| --- | --- | --- | --- | --- |
| `optionSet.wiring.test.ts` {#row-optionset} | `source.indexOf("      isPlatformContext,\n    ]\n  );")` missed because commit `a65306410` appended `vm.error`, `vm.items`, `vm.refresh` | {good:Test Bug} End-marker string assertion assumed static `useMemo` dependencies | Replaced brittle end marker with CRLF-normalized `useMemo(` to `\n    ]\n  );` block scan checking `canViewOptionSets,` without `customHeaderContent:` | `24` passed in targeted run & full suite [](source:option_set_test) |
| `VenueOverviewComponents.test.tsx` & `VenueOverviewView.test.tsx` {#row-venue} | Unmounted `useI18n()` fix (`8f2895b19`) switched return strings to `defaultValue`; component tests lacked key-echo mocks and app used raw defaults | {caution:Both App + Test} 3 Main App i18n/dead-code bugs plus 2 unmocked test suites | Added EN/AR keys, replaced hardcoded JSX & camelCase KPI defaults, fixed `VenueNav` `"Dashboard"`, added mocks & KPI regression test | `7` component + `6` view tests passed [](source:venue_comp_test)[](source:venue_view_test) |
| `use-restricted-fields.backendContract.test.ts` {#row-contract} | `scanFrontendScreens()` and `parseBackendResources()` walked `SCRIPE-Frontend/src` and `SCRIPE-Backend/src` three times each (`13275ms–14263ms` per test under load) | {good:Test Perf Bug} Uncached recursive filesystem scans crossed `15000ms` under 12 workers | Cached `cachedFrontendScan` and `cachedBackendResources` at module scope in the test helper | `5` tests finished in `595ms` total [](source:contract_test) |
| `PipelineManagementView.test.tsx` {#row-pipeline} | 2D Workflow Studio suite runs `38830ms` uncontended (`~7.3s` max test) but test 10 stretched to `18513ms` (`95618ms` suite) under 12-worker CPU contention | {good:Test Config} Default `15000ms` timeout had no headroom for Windows parallel load spikes | Increased `testTimeout` from `15000` to `30000` in `vitest.config.ts` with explanatory comment | Passed both solo and in full suite [](source:pipeline_test)[](source:vitest_cfg) |

## What three Main App defects did Venue Overview expose? {#main-app-venue-defects}

Inspecting the strings returned by `defaultValue` revealed three real bugs in production components that were previously hidden while unmounted `useI18n()` echoed translation keys.[](source:venue_header)[](source:venue_kpi)[](source:venue_nav)

@facts id=venue-defects
| VenueOverviewHeader.tsx (Dead Store + Hardcoded English) | Removed unused `useAppStore` import (`user`, `userName`), added `venueOverview.quickActions.blockTime` (`"Block Time"` / `"حظر وقت"`) and `recordPayment` (`"Record Payment"` / `"تسجيل دفعة"`), and replaced three hardcoded button labels with `t(...)`. [](source:venue_header)[](source:venue_en)[](source:venue_ar) |
| VenueOverviewKpiStrip.tsx (Raw camelCase Leakage) | Replaced `{ defaultValue: label }` (which surfaced `"todayReservations"` and `"needsAttention"`) with `KPI_DEFAULT_LABELS`: `Bookings Today`, `Checked In Now`, `Active Holds`, `Needs Attention`, and `Active Resources Today`. When `attentionCount` is `undefined` it renders `Active Resources Today`; any defined number (`>= 0`) renders `Needs Attention`. [](source:venue_kpi) |
| VenueNav.tsx (Mismatched Fallback Label) | Updated `venueNav.dashboard` fallback `defaultValue` from `"Overview"` to `"Dashboard"` to match `venue-overview.en.ts`, aligning unmounted SSR/fallback rendering with the active English dictionary. [](source:venue_nav)[](source:venue_en) |

@callout level=note title="Minor React Compiler observation kept intact in CustomFieldListView.tsx"
Commit `a65306410` listed `vm`, `vm.error`, `vm.items`, and `vm.refresh` together inside the `CrudConfig` `useMemo` dependency array. We preserved that code because changing dependency structure mid-bugfix could alter hook memoization behavior, and `oxlint` passes with zero errors across `4243` files.[](source:option_set_test)

## Verification Results Across All 5 Post-Edit Gates {#verification-gates}

Every check below ran after the final edit to `SCRIPE-Frontend`, returning zero errors and zero warnings across the Vitest runner and Next.js production build.

- [x] `scripe test frontend --show-errors`: `Overall Result: 100% SUITES PASSED` in `349.59s` (`0` errors, `0` warnings).
- [x] Targeted regression suites: `VenueOverviewComponents.test.tsx` (`7/7`, `42.64s`), `use-restricted-fields.backendContract.test.ts` (`5/5`, `595ms`), and `6`-file Venue/OptionSet/i18n batch (`66/66`).
- [x] `scripe validate-locales`: `108` module locale pairs (`18677` keys), `0` missing EN/AR keys, `0` undefined code keys (`1.23s`).
- [x] `scripe arch-check --target frontend`: `93/100` (`Overall Compliance Score: 93/100`, `0` errors).
- [x] `npx oxlint`: `0` errors across `4243` files (`533` pre-existing repo warnings in `2.6s`; `1` pre-existing warning on `VenueNav.tsx:348:11` in `18ms`).
- [x] `scripe build frontend`: `100% HEALTHY • SUCCESS` in `152.12s` (`0` errors, `0` warnings, `202` compiled routes).
