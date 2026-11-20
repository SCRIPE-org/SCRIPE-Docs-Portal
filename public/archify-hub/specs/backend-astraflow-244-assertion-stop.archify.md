# Why is the SCRIPE AstraFlow 2.4.4 assertion migration paused? {#astraflow-244-assertion-stop}

AstraFlow 2.4.4 supports the screenshot's `BeTrue(reason)` call, but several other SCRIPE assertion reason overloads and nullable equality shapes remain unavailable.[](source:migration)

- All 16 AstraFlow package pins and the local CLI are on 2.4.4.
- The backend remains on .NET 10.
- 109 typed-result calls were migrated to documented AstraFlow APIs.
- The isolated solution build still reports 66 unique compiler errors, including confirmed context API gaps.[](source:release)

@answer scope="SCRIPE backend · AstraFlow 2.4.4 · .NET 10"
@meta locale=en quality_profile=showcase
@source migration title="AstraFlow.Assertions 2.4.4 migration guide" url=https://github.com/seifmoustafa/AstraFlow/blob/v2.4.4/src/AstraFlow.Assertions/docs/assertion-migration.md
@source release title="AstraFlow 2.4.4 package-family README" url=https://github.com/seifmoustafa/AstraFlow/blob/v2.4.4/README.md

## What does 2.4.4 resolve? {#fixed-shape}

The screenshot's boolean reason overload compiles in 2.4.4. SCRIPE keeps the message in all four `ResultAssertions` helper sites. Type checks that need the asserted value now use `BeOfTypeAndWhich<T>()` or `BeAssignableToAndWhich<T>()`, as the migration guide directs.

## Which public signatures still block full context parity? {#api-gaps}

| Assertion | Current package shape | SCRIPE context that cannot be kept |
| --- | --- | --- |
| String prefix | `StartWith(prefix)` | The custom failure reason |
| Regex | `MatchRegex(pattern, timeout)` | A custom reason alongside the required finite timeout |
| Nullable equality | `Be(T expected)` | Equality when the expected value is `T?` and may be null |
| Inclusive comparison | `BeGreaterThanOrEqualTo(value)` | The explanation for the invariant |
| Reference/GUID inequality | `BeSameAs(value)`, `NotBe(guid)` | The test's diagnostic context |

The compiler confirms these call shapes against the restored 2.4.4 package. The migration guide says the package is not a drop-in replacement for every AwesomeAssertions API, so this report requests explicit compatibility coverage.

## What is the safe resume gate? {#resume-gate}

Keep the .NET 10 migration paused until AstraFlow publishes a 2.4.x patch that covers the listed APIs or the maintainer explicitly resolves each compatibility case. Then verify the NuGet package and publish workflow, rebuild the backend, and continue the full package-family audit.

@workflow id=astraflow-migration-gate title="AstraFlow assertion migration gate"
| gap | Confirm package gap | security |
| report | Send evidence to AstraFlow | backend |
| patch | Publish 2.4.x fix | external |
| verify | Check APIs and backend build | backend |
| resume | Continue ecosystem migration | backend |
| gap > report | compiler + XML |
| report > patch | maintainers respond |
| patch > verify | published package |
| verify > resume | all required calls compile | emphasis |
