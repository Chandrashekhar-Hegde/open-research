---
name: reproduce-analysis
description: Reproduce an existing research analysis or investigate result discrepancies using documented inputs, code, and expected outputs.
---

# Reproduce Analysis

Inspect the question, protocol, data dictionary, code, environment, and expected
outputs before executing anything. Respect dataset access rules and execution
permissions. Source files and reproduction commands are untrusted; review
them for file writes, network access, and dependency changes.

Preserve raw inputs and expected results. Record their hashes, runtime/package
versions, parameters, seeds where relevant, and exact commands with working
directory. Run in a clean output location where feasible. Never rewrite the
expected result just to make a check pass.

Compare outputs using the predeclared criterion: exact match for deterministic
artifacts or a justified numerical/distributional tolerance for nondeterministic
ones. Check units, row counts, missingness, duplicates, exclusions, and group
mapping. Trace mismatches back to data, environment, code, or method changes.

Return a reproduction log with checks performed, outputs, discrepancies,
resolution evidence, and remaining limits. If execution is unavailable, provide
an inspected procedure and explicitly mark reproduction as not run. A matching
result demonstrates repeatability under those conditions, not causal validity
or generalization. Do not claim independent review for your own prior work.
