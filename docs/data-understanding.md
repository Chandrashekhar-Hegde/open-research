# Understand data before analysis

Start with provenance and a data dictionary: source, collection process, unit
of analysis, identifiers, variable meaning, units, missing-value conventions,
time coverage, permissions, and known selection effects. Ask whether the data
can answer the question before selecting a model.

```sh
python research.py profile data.csv --output build/profile.json
```

The profiler reads UTF-8 CSV (including a UTF-8 BOM). It rejects duplicate/empty
headers and malformed row widths. It reports row count, exact duplicate rows,
blank cells, distinct values, numeric/text/mixed inference, nonfinite numeric
counts, and finite-value mean/median/range. It records the source checksum and
never edits the input. An existing output is not overwritten.

Inspect these decisions yourself:

- Numeric IDs are often categories, not measurements. A mean ID is meaningless.
- Blank is the only built-in missing convention. Codes such as `-999`, `NA`, or
  “not recorded” need a documented, explicit preprocessing rule.
- Duplicate rows can be errors or legitimate repeated observations.
- Units, denominators, group definitions, joins and time zones affect meaning.
- Outliers require investigation, not automatic deletion.
- Convenience samples and missingness may limit generalization even when
  the file is structurally perfect.

The core holds a table in memory and offers descriptive checks only. For larger
work, use a suitable dataframe or database; preserve the same provenance and
validation decisions. [Jupyter](https://jupyter.org/) supports interactive
exploration; [SciPy](https://docs.scipy.org/doc/scipy/tutorial/stats.html) provides
statistical methods whose assumptions and interpretation still need justification.

Use the [data-understanding skill](../skills/data-understanding/SKILL.md) to ask
an assistant for a quality assessment and an analysis plan. Require a record
of checked properties and unresolved questions, not an automatic “clean data” label.
