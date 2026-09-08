# Paired measurements: a synthetic reproducibility example

**Question:** What is the mean within-item change in these eight synthetic pairs?

This is a teaching fixture authored for Open Research. The rows are invented,
not observations of people, treatments, or an experiment. The calculation is
real; its result has no empirical generalization beyond the supplied numbers.

From the repository root:

```sh
python3 examples/paired-measurements/analyze.py
python3 examples/paired-measurements/analyze.py --check
python3 scripts/research.py check examples/paired-measurements --release
```

The first command prints JSON; the second compares the calculation to
[expected results](results/summary.json) without modifying them. The third
checks the [manifest](study.json), required records, and evidence references.
All commands run offline using Python 3.11+ and the standard library.

Inspect the [protocol](protocol.md), [analysis plan](analysis-plan.md),
[raw data](data/raw.csv), [dictionary](data/README.md), [code](analyze.py),
[evidence ledger](evidence.csv), [claims](claims.csv), [report](report.md),
[review record](review.md), and [AI disclosure](ai-use.md).

Expected result: changes 2, 3, 1, 2, 0, 4, 3, 1; their sum is 16, so the mean
is 16/8 = 2.0 units. Seven pairs increase, one is unchanged, and none decreases.
The tests independently assert the expected values and reject corrupt input.
