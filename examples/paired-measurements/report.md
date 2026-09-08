# Findings

The eight synthetic pairs have mean change **2.0 arbitrary units** (C1).
Seven pairs increase and one is unchanged (C2). Changes are 2, 3, 1, 2, 0, 4,
3, and 1; their sum is 16. Median change is 2.0 and the range is 0 to 4.

Evidence: [raw rows A–H](data/raw.csv) and the
[computed summary](results/summary.json), linked through [claims](claims.csv).
The [analysis](analyze.py) subtracts before from after for every row. It applies
no exclusions or transformations beyond subtraction. See the
[analysis plan](analysis-plan.md) and [protocol](protocol.md).

These data are invented to demonstrate an auditable calculation. The result
says nothing about an actual population, causal intervention, or AI research
quality. There are no inferential statistics or independent scientific review.

Code and data use the repository MIT license. Run the commands in
[the study README](README.md) to reproduce; see [AI use](ai-use.md) and
[review scope](review.md). No archival identifier is assigned to this study.
