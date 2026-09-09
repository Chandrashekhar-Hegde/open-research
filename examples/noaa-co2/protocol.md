# Protocol

## Question

How much did the equal-weight mean of NOAA Mauna Loa monthly CO₂ concentrations change from 2024 to 2025?

## Design and timing

Retrospective descriptive reanalysis, prepared 9 September 2026 with access to
existing observations. No preregistration or original measurement is claimed.
We chose two recent complete calendar years, 2024 and 2025. This choice is
visible and is not a randomly sampled period.

## Units and procedure

The unit is a station-month summary. Retain exactly 12 months in each year from
the dated NOAA source. Use the published average column in ppm, with equal
weight for each month. Keep raw rows unchanged. Compare 2025 minus 2024.
Check month coverage, duplicates, finite values, positive measurement-day
counts and nonnegative uncertainty/deviation fields before calculating.

## Access and source context

Data provided by NOAA Global Monitoring Laboratory, Boulder, Colorado, USA.
The source header explains month-centering and interpolated-value flags.
It also records a temporary station substitution during December 2022–July 2023;
our selected window starts in 2024. No participant data or recruitment is used.
Public-domain use follows NOAA's terms; there is no NOAA endorsement.

## Limits

This is a retrospective descriptive reanalysis of one station series, not new data collection, preregistered confirmation, a global mean or a causal attribution. Months are serially dependent. No confidence interval or significance test is claimed. Equal weighting of monthly means differs from day weighting. NOAA may revise its series; the frozen snapshot defines this result.
