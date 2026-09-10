---
name: data-understanding
description: Inspect research data or qualitative material, assess meaning and quality, and document justified preparation or interpretation.
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

## Respect the collection design

Read the study's classification and protocol before profiling. A cohort needs
time origin and follow-up; a diagnostic study needs reference/index results and
denominators; a benchmark needs workloads and environment; prediction needs
split/leakage checks; a time series needs temporal coverage and dependence.
Use `python research.py designs --pattern PATTERN` in an Open Research checkout
for the selected pattern's requirements. The CSV profile cannot supply these
facts. Do not reinterpret simulated or synthetic fixtures as observations.

## Qualitative and mixed-methods analysis

When the selected pattern is interviews or a contextual case study, inspect the
permitted transcripts, documents or field notes using the named interpretive
method. Retain source locations, context, reflexive memos and conflicting cases;
connect interpretations to excerpts rather than treating counts as findings.
Do not invent participant quotations, saturation or coder agreement. For mixed
methods, inspect each component using its justified method, then use the planned
integration to connect findings and retain discrepancies. No source material means
an analysis plan only. Return traceable interpretations and remaining limits.

## Follow the subject and report paths

When working in an Open Research checkout, inspect `python research.py guides`
and the selected path with `--path medical`, `engineering`, `materials`,
`chemistry`, `physics`, `theory`, `research-papers` or `review-papers`. Match the
required records and checks to the actual claim; theoretical work crosses fields.
Chemistry includes organic, physical and experimental/analytical branches.
