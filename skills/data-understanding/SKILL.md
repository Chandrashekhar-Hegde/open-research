---
name: data-understanding
description: Inspect a research dataset, assess its meaning and quality, and propose justified preprocessing before analysis.
---

# Data Understanding

Start from the research question, collection process, data dictionary and reuse
terms. Inspect identifiers, units, denominators, time coverage and selection.
Use a descriptive profile to check rows, missingness, duplicates and types;
never infer scientific suitability from a clean parser result.

If Open Research is available, run `python research.py profile PATH` from its
root or invoke it by its supplied path. It treats only blanks as missing and
summarizes finite parseable values; inspect its limitations. Preserve raw data.

Return a quality record with checks actually run, problems, unresolved meanings,
proposed transformations and likely limits to inference. Separate descriptive
exploration from confirmatory tests. Verify joins and exclusions against the
unit of analysis. Do not silently impute, remove outliers, or choose outcomes
based on attractive results. Leave an explicit next research decision.
