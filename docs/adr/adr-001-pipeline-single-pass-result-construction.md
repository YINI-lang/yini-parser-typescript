# ADR-001: Construct Parser Results During the Parse-Tree Visit

Status: Accepted on 2026-10-23.

## Context

The parser previously built a complete AST and then traversed it again to
create the returned JavaScript object. That added a full-document value
representation and an object-building pass. The redesign was accepted only if
it simplified the pipeline, preserved observable parser behavior, improved
median parse time by at least 20% for each representative large workload, and
increased incremental peak memory by no more than 50% for any workload.

## Decision

The handwritten `ASTBuilder` constructs the returned objects while visiting
the ANTLR parse tree. It retains only the section and member bookkeeping needed
for validation, metadata, and diagnostics. Name-collision issues are reported
after the visit so their messages and order match the former object-building
pass. The separate `astToObject` traversal was removed.

`ASTBuilder` continues to extend the generated `YiniParserVisitor`; the grammar
and generated ANTLR files are unchanged. Inputs, returned values, own-key
order, public API and options, error handling and messages, recovery, and
diagnostic output remain compatible. At adoption, the timing result retained
`phase4` named `Object Building` with `timeMs: 0`; `phase3` included result
construction.

## Consequences

The parser no longer holds a complete value AST alongside the returned object
or runs a second full-document conversion. Result assembly and validation now
share the visitor, so changes to collision handling, key order, and diagnostics
need focused regression coverage. Peak memory may be higher within the accepted
50% limit.

## Evidence

The [benchmark harness](../../scripts/benchmark-pipeline.cjs) measured three
large workloads using nine fresh Node.js v24.14.0 processes per workload,
three warmup parses, and a median of one timed parse per process. Peak RSS was
sampled above each process's idle baseline. These are the measured changes
against the [baseline](../benchmarks/pipeline-single-pass/pipeline-benchmark-baseline.json):

| Workload | Time gain, run 1 / run 2 | Memory change, run 1 / run 2 |
| --- | ---: | ---: |
| Scalar members | 30.0% / 29.2% | +43.5% / +11.6% |
| Composite values | 25.6% / 24.3% | -3.0% / -7.3% |
| Nested sections | 33.2% / 32.2% | +4.5% / +10.3% |

The first prototype missed the composite-value speed gate. Its
[raw measurements](../benchmarks/pipeline-single-pass/pipeline-benchmark-candidate.json)
are retained with the accepted candidate's [first](../benchmarks/pipeline-single-pass/pipeline-benchmark-revised-candidate.json)
and [repeat](../benchmarks/pipeline-single-pass/pipeline-benchmark-revised-repeat.json)
runs. RSS sampling is approximate; both accepted-candidate runs met the gate.

The existing tests were unchanged. The full Jest suite passed 60 suites and
1,030 tests, with 2 suites and 37 tests skipped. Integration, smoke, ESM, and
TypeScript build checks passed. Focused [regression tests](../../tests/integration/1-core-parsing/single-pass-result.test.ts)
cover collision order, partial results, throwing, special property names, key
order, timing shape, and tooling diagnostics.

## Outcome

The parser now constructs returned objects during the parse-tree visit (walking
the structure produced by the parser) and no longer runs the separate
`astToObject` pass (the former second conversion step). Across the two accepted
benchmark runs (repeated performance measurements), median parse time (the
middle measured parsing time) improved by 24.3% to 33.2% on the three large
workloads. Incremental peak RSS (resident set size: the highest observed RAM
use above the idle baseline) ranged from 7.3% lower to 43.5% higher. The
measured results met the 20% speed and 50% memory acceptance limits (agreed
thresholds for parsing speed and RAM usage), though memory use did not improve
consistently. The recorded test and build checks passed, including focused
coverage of collision diagnostics (messages about conflicting names), partial
results, key order, and tooling behavior (structured results and diagnostics
for tools).

## Subsequent timing schema change (2026-10-24)

The zero-duration `phase4` field was removed from timing metadata and the
public `ResultMetadata` type. `phase3` is named `Validation and Result
Construction` and measures the parse-tree visit, semantic validation, and
result construction. `metaSchemaVersion` is now `2.0.0` because consumers of
timing metadata must stop reading `phase4`. The `includeTiming` option and
the other timing fields remain available.
