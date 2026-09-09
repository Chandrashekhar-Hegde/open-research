# Analysis plan

This plan is retrospective and accompanies the executed reanalysis.

1. Read the preserved CSV; ignore comment lines, retain selected years.
2. Reject duplicate or missing months, nonfinite/negative values, interpolated
   flags and nonpositive day counts. Do not silently impute or delete a month.
3. Compute each year's arithmetic mean of 12 monthly averages using Decimal.
4. Subtract the first year's mean from the second. Round reported ppm to four
   decimal places; calculate differences before rounding.
5. Repeat the annual contrast using the source's deseasonalized column and
   show the range of same-month differences. These are descriptive sensitivity
   summaries, not independent replications or uncertainty intervals.
6. Compare the reproduced result and input checksum with results/summary.json.

No regression, p-value or confidence interval is specified. Such inference
would need a defensible time-series and measurement-error model for its target.
