# AstraFlow 2.4.2 fixes one assertion gap, but SCRIPE's migration remains blocked {#astraflow-242-assertions}

`AstraFlow.Assertions 2.4.2` adds the formatted `BeTrue` and `BeFalse` overloads shown in the screenshot. SCRIPE can retain that failure message, but other common assertions still do not compile against the published API, so the backend migration is paused until a compatible 2.4.x patch is available.

- The 2.4.2 publish workflow succeeded and all 16 AstraFlow packages were confirmed at 2.4.2.
- SCRIPE restored successfully, but the Release build reports 277 compiler errors.
- At least 26 errors come from missing formatted reason overloads; another 43 come from missing `BooleanAssertions.Be(bool)`.

@answer scope="SCRIPE backend · .NET 10 · AstraFlow 2.4.2 assertion migration"
@meta locale=en style=clean quality_profile=showcase
@source nuget title="AstraFlow.Assertions 2.4.2 on NuGet" url=https://www.nuget.org/packages/AstraFlow.Assertions/2.4.2
@source publish title="AstraFlow NuGet publish workflow 43866549591" url=https://github.com/seifmoustafa/AstraFlow/actions/runs/43866549591

## Which screenshot change is fixed? {#fixed}

The published 2.4.2 API has `BeTrue(string, object[])` and `BeFalse(string, object[])`. This call can keep its context:

```csharp
result.IsFailure.Should().BeTrue("Expected Failure but got Success");
```

That overload was missing in 2.4.1. Removing the message was a temporary compatibility change for the old package and is no longer required for this call.

## What still fails to compile? {#gaps}

| Assertion API | Compiler errors | Effect |
| --- | ---: | --- |
| `BooleanAssertions.Be(bool expected)` | 43 | Existing boolean equality checks have no direct equivalent. |
| `BeNull(reason, args)` | 8 | Failure context is unavailable. |
| `NotBeNull(reason, args)` | 7 | Failure context is unavailable. |
| `NotBeNullOrWhiteSpace(reason, args)` | 2 | Failure context is unavailable. |
| `NotContain(value, reason, args)` | 6 | Failure context is unavailable. |
| `ContainKey(key, reason, args)` | 3 | Failure context is unavailable. |
| Unambiguous assertion exception type | 2 | Imports from Assertions and Testing produce `CS0104`. |

The 26 missing-reason diagnostics are existing test explanations that should not be discarded to satisfy compilation. Typed type-check results have documented migration methods and are tracked separately from these public API gaps.

## Why is SCRIPE paused? {#pause}

The Release build against the restored 2.4.2 packages failed with **277 compiler errors and 104 warnings**. The user requested a stop when the package surface still prevents a faithful migration. SCRIPE remains on .NET 10 and must not resume this migration until the assertion compatibility patch is published.

## What opens the resume gate? {#resume}

@steps id=resume-steps
| release | Publish the 2.4.x patch | Include the missing assertion overloads and resolve the exception-name collision. | |
| actions | Pass the publish workflow | Confirm package publication and signature verification succeed. | |
| build | Restore and compile SCRIPE | Keep all AstraFlow packages on one patched 2.4.x version and preserve test reasons. | |
| continue-migration | Resume the migration | Continue the wider backend capability audit on .NET 10. | |

The current SCRIPE worktree is not merge-ready. No public issue was opened; the full findings are recorded in the internal AstraFlow stop report.
