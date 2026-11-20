# What does the AstraFlow 2.4.7 migration cover? {#astraflow-247-migration}

SCRIPE’s backend now uses the AstraFlow 2.4.7 family on **.NET 10**, across all 16 packages where each package has an applicable role.

- Central package management pins every family package to `2.4.7`.
- Application projects use AstraFlow mediator, generated mappings, validation, security, and data projection.
- Test projects use AstraFlow assertions and test helpers; the legacy assertions package is gone.
- The local AstraFlow CLI is installed and pinned at `2.4.7`.

@answer scope="SCRIPE backend · AstraFlow 2.4.7 · .NET 10 · worktree audit 2026-11-19"
@meta locale=en style=product
@source nuget title="AstraFlow on NuGet" url=https://www.nuget.org/packages/AstraFlow
@source versions title="SCRIPE AstraFlow package versions" path=SCRIPE-Backend/Directory.Packages.props
@source ecosystem title="SCRIPE AstraFlow ecosystem tests" path=SCRIPE-Backend/tests/Core.Application.Tests/AstraFlow/AstraFlow16PackageEcosystemIntegrationTests.cs
@source permission title="Identity permission list projection" path=SCRIPE-Backend/src/Modules/Identity/Identity.Application/Queries/Permission/GetPermissionsQueryHandler.cs
@source convention-report title="AstraFlow strict source-omission enhancement report" path=.agents/memory/ASTRAFLOW_247_CONVENTION_SOURCE_OMISSION_REPORT.md
@source analyzer-report title="AstraFlow assertion analyzer context report" path=.agents/memory/ASTRAFLOW_CLI_247_ASSERTION_ANALYSIS_LIMITATION.md
@source authorization-gate title="SCRIPE authorization refusal coverage gate" path=SCRIPE-Backend/tests/AuthorizationGates.Tests/AuthorizationRefusalCoverageTests.cs
@source oracle title="DataTransfer Oracle model configuration" path=SCRIPE-Backend/src/Modules/DataTransfer/DataTransfer.Infrastructure/Persistence/ProviderDbContexts.cs
@source cli title="AstraFlow CLI tool manifest" path=.config/dotnet-tools.json

## Which capabilities are active in SCRIPE?

All 16 package entries are versioned together. Each package is used in the layer that owns its job.[](source:versions)

| AstraFlow package | Active use in SCRIPE |
| --- | --- |
| `AstraFlow` | Host-level family integration and package umbrella |
| `AstraFlow.Analyzers` | Compile-time diagnostics in 22 application and test projects |
| `AstraFlow.AspNetCore` | Host diagnostics endpoints, health summary, and problem-details helpers |
| `AstraFlow.Assertions` | Test assertions in 27 test projects; AwesomeAssertions references are removed |
| `AstraFlow.Cli` | Local `2.4.7` tool manifest and version-status command |
| `AstraFlow.Contracts` | Shared mediator and domain-event contracts in Core.Domain and test support |
| `AstraFlow.Diagnostics` | Startup validation, handler and mapping reports, and projection checks |
| `AstraFlow.FluentValidation` | Request validation in the mediator pipeline |
| `AstraFlow.Generators` | Compile-time mapping and mediator registration in 21 projects |
| `AstraFlow.Mapper` | Generated mapping and mapping rules in 20 application projects |
| `AstraFlow.Mapper.Conventions` | Convention-based mappings registered by Core.Application |
| `AstraFlow.Mapper.EntityFrameworkCore` | SQL-translatable DTO projections and provider translation validation |
| `AstraFlow.Mediator` | CQRS handlers and pipeline behaviors in 20 application projects |
| `AstraFlow.OpenTelemetry` | Mediator traces and metrics exported through the host’s OpenTelemetry setup |
| `AstraFlow.Security` | Sensitive-data redaction policy and secure identifier mapping |
| `AstraFlow.Testing` | Shared handler, pipeline, diagnostic, and secure-ID test helpers in 22 projects |

The package families and their integration are checked in the backend’s ecosystem suite.[](source:ecosystem)

## How does an Identity permission list use generated projection?

The handler filters the read-only query before projection, then encrypts identifiers after the database projection.[](source:permission)

@sequence id=permission-projection title="Permission list query"
| actor handler | Query handler | backend |
| actor store | Permission repository | database |
| actor mapping | Projection registry | backend |
| actor codec | Secure ID encryption | security |
| handler | store | AsNoTracking query with filters |
| store | mapping | ProjectWith PermissionResponse |
| mapping | codec | Projected response rows |
| codec | handler | Encrypted permission identifiers | return |

This keeps filtering and column selection in the provider query. The response retains SCRIPE’s encrypted-ID contract.[](source:permission)

## How does DataTransfer keep its Oracle model aligned?

Oracle’s EF Core provider does not support filtered indexes. SCRIPE clears EF’s nullable unique-index filter only in the Oracle DataTransfer context. Oracle’s native unique index permits multiple tenantless keys, so this keeps the model portable without a schema change.[](source:oracle)

## What verification supports this migration?

The Release backend build is clean. AstraFlow’s package checks pass. The full backend run has one SCRIPE authorization-coverage gate failure; it is not an AstraFlow failure.

| Check | Result |
| --- | --- |
| AstraFlow doctor | All 16 packages are `2.4.7`; 88 backend projects use central package management; generators are isolated {good:Passed} |
| AstraFlow CLI | Installed and pinned versions match at `2.4.7` {good:Aligned} |
| AstraFlow scan and validate | Both return zero findings {good:Passed} |
| Target framework | SDK `10.0.400`; backend targets `.NET 10` {good:Kept} |
| Backend build | `scripe build backend`: 0 errors; full backend pre-compilation covers all 90 projects {good:Passed} |
| Architecture check | 0 errors, about 141 warnings, score 96/100 {caution:Warnings} |
| Identity test suite | 728 passed, 4 skipped, 0 failed {good:Passed} |
| AstraFlow ecosystem tests | 14 of 14 passed, including provider projection translation {good:Passed} |
| CRM test suite | 355 passed, including direct missing-permission refusals for 18 handlers {good:Passed} |
| Authorization gate | 186 passed; all 26 CRM refusal handlers are linked to real tests {good:Passed} |
| Full backend test run | All 25 suites passed; Docker-dependent API integration tests were skipped because Docker was unavailable {good:Passed} |
| Universal `scripe check --quick` | Lint and locale parity passed; repository-wide CSharpier check reports existing formatting drift, and docs build hits a Turbopack endpoint-write failure {caution:Repo gate} |
| Assertion CLI analysis | Returns partial metadata-only results when project references are needed; AstraFlow triage confirmed this is expected and needs no hotfix {caution:Known limitation} |
| Legacy integrations | No MediatR, AutoMapper, AwesomeAssertions, or FluentAssertions usage remains {good:Removed} |

The CLI doctor and version commands confirm package and tool alignment. The assertion analyzer limitation and its triage are recorded here.[](source:analyzer-report)

## What remains for the AstraFlow team?

The source-omission enhancement is recorded in the AstraFlow standby thread. The 2.4.7 convention API has no source-member omission allowlist.[](source:convention-report)

SCRIPE keeps convention `StrictMode=false` so intentional DTO omissions do not block startup. Findings remain visible and sensitive-member denial stays enabled. AstraFlow triage classified this as a non-blocking enhancement; SCRIPE can continue on `2.4.7` without waiting for a patch.

The CRM refusal coverage gap is closed with real no-permission handler assertions and an inventory mapping for all 26 CRM handlers. It did not identify an AstraFlow package defect.[](source:authorization-gate)

@callout id=package-reports level=note title="Non-blocking framework reports"
| No AstraFlow hotfix is required to continue this migration on `2.4.7`. |
