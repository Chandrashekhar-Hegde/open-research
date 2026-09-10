# Worked study-pattern calculations

These are small, auditable teaching calculations, not empirical studies. All
inputs in `inputs/` were deliberately constructed for this repository. No patients,
users or experimental specimens were measured. The browser examples link these
inputs to actual code and output, while leaving broader research claims unverified.

Run from the repository root with Python 3.11+ (`python3` on some systems):

```sh
python examples/study-patterns/analyze.py --example diagnostic --check
python examples/study-patterns/analyze.py --example prediction --check
python examples/study-patterns/analyze.py --example benchmark --check
python examples/study-patterns/analyze.py --example simulation --check
```

Omit `--check` to print computed JSON. Each output includes its input SHA-256.
Use `--input /path/to/input.json` for a permitted file with the same structure;
its `kind` selects the calculation. Simulation float comparisons use relative and
absolute tolerance 1e-12 for platform math-library differences; other values and
input hashes must match exactly. This command does not determine whether the
calculation is appropriate for your study. Files are capped at 1 MiB. No input or
expected result is overwritten. `--check` compares bundled examples only.

## diagnostic

Input: [constructed counts](inputs/diagnostic.json). `tp` and `fn` are positive
and negative index-test results among reference-positive cases; `fp` and `tn`
are the corresponding results among reference-negative cases. All are nonnegative
integers. There are 100 constructed cases: TP=18, FN=2, FP=8, TN=72.

Sensitivity = 18/20 = 0.9; specificity = 72/80 = 0.9. Positive predictive value
= 18/26 and negative predictive value = 72/74. The [computed output](results/diagnostic.json)
retains the table. A zero denominator returns JSON null rather than a fabricated
zero. Intervals, participant sampling, test failures, reference-standard validity
and clinical utility are outside this arithmetic example.
[Methodological context: FDA diagnostic-test reporting](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/statistical-guidance-reporting-results-studies-evaluating-diagnostic-tests-guidance-industry-and-fda).

## prediction

Input: [four prediction rows](inputs/prediction.json), each with a unique `id`,
finite `actual`, `predicted` and `baseline` values in arbitrary target units.
Mean absolute error is the mean of the absolute prediction–target differences.
The supplied prediction MAE is 1; baseline MAE is 2, a reduction of 1 unit.
[Computed output](results/prediction.json).

No model was fitted or tested on real held-out observations. A real prediction
study must independently justify data splitting, preprocessing, leakage control,
metrics, uncertainty and population relevance. This fixture checks arithmetic.

## benchmark

Input: [sorted values and queries](inputs/benchmark.json). Values must be unique,
sorted, finite numbers; queries must be a nonempty list. Both algorithms search
exactly the same values. Correctness is compared with Python's `bisect_left`.

On this declared workload, linear search inspects 41 array elements and binary
search 15 across four queries. Binary search is not better on every query: for
the first element, linear search uses one probe and binary search uses four.
[Per-query results](results/benchmark.json) keep this tradeoff visible.
A probe counts an inspected element, not machine instructions or elapsed time.
Sorting costs and representativeness are excluded. There is no general speed claim.
[Evaluation context: ACM SIGSOFT](https://www2.sigsoft.org/EmpiricalStandards/).

## simulation

Input: [decay parameters](inputs/simulation.json). The model is
`dy/dt = -rate*y`, with positive initial value, rate and duration. `steps` is an
integer between 1 and 100000. For this positive-decay demonstration,
`rate*duration/steps` must be below one. Euler updates use
`y_next = y - rate*y*duration/steps`.

For y(0)=1, rate=0.5 and duration=2, the exact final value is exp(-1).
[Computed output](results/simulation.json) compares 20 and 40 steps; halving the
step reduces absolute error from about 0.009394 to 0.004647. No physical data were
collected and no physical-system validity is inferred. Numerical verification
and empirical validation answer different questions.
[Teaching context: MIT numerical methods](https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/pages/unit-i-first-order-differential-equations/numerical-methods/).

## Adapt to a real study

Use [design guidance](../../docs/study-designs.md) before adapting a calculation.
Create a study folder; define the question, units, design, data access, estimation
and uncertainty plan; retain raw observations and document deviations. Record
actual commands and outputs in the claim/evidence ledgers. These fixtures are MIT
licensed original teaching data. Linked methodological sources retain their own
terms. Tests include known answers, incorrect input types, zero denominators,
unsorted arrays, duplicate IDs and unstable simulation steps.
