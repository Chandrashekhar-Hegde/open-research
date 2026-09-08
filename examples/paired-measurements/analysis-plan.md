# Analysis plan

Read UTF-8 `data/raw.csv`, require the declared columns and unique nonempty IDs,
and require complete integer before/after values. Do not impute or drop rows.
Compute each change as after minus before; report count, arithmetic mean,
median, minimum, maximum, and positive/zero/negative counts.

This is a descriptive fixture. No standard error, confidence interval,
significance test, causal estimate, or extrapolation is appropriate to its
invented values. There are no stochastic steps or dependencies to pin.

Runtime: Python 3.11 or newer, standard library only. From the repository root,
run `python3 examples/paired-measurements/analyze.py --check`. The script resolves
inputs relative to itself and compares its result with `results/summary.json`.
Exact numeric equality is the acceptance criterion for these small integers.
Run without `--check` to print the output without changing committed files.

Expected mean is 2.0 units from changes summing to 16 over eight pairs.
Integrity checks are separate: `python3 scripts/research.py check
examples/paired-measurements --release` (on one command line).
