# NOAA CO₂ reanalysis

## Question and method

How much did the equal-weight mean of NOAA Mauna Loa monthly CO₂ concentrations change from 2024 to 2025?

A retrospective descriptive reanalysis of the preserved 24 station-month
observations. The arithmetic mean gives each month equal weight. Data were
retrieved 9 September 2026; see data/README.md for provenance and rights.

## Executed results

| Quantity | ppm |
| --- | ---: |
| 2024 equal-month mean | 424.6042 |
| 2025 equal-month mean | 427.3492 |
| 2025 minus 2024 | 2.745 |
| Deseasonalized contrast | 2.7433 |

Same-month differences range from 2.09 to 3.85 ppm. The deseasonalized contrast
is close to the primary contrast in this window. Neither calculation identifies
what caused the difference. Evidence IDs N1 and R1 support the descriptive claim.

## Implication

The documented station series increased over these selected years. This small
study demonstrates how to connect a public observation to code and a bounded
claim. It does not establish a novel climate result or validate this workbench.

## Limitations

This is a retrospective descriptive reanalysis of one station series, not new data collection, preregistered confirmation, a global mean or a causal attribution. Months are serially dependent. No confidence interval or significance test is claimed. Equal weighting of monthly means differs from day weighting. NOAA may revise its series; the frozen snapshot defines this result.

## Reproduce

From the repository root: `python examples/noaa-co2/analyze.py --check`.
Inspect [the calculation](analyze.py), [input](data/monthly.csv),
[output](results/summary.json) and [review scope](review.md).
