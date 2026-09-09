# Data provenance and dictionary

Data provided by NOAA Global Monitoring Laboratory, Boulder, Colorado, USA.
Source: [NOAA monthly Mauna Loa CO₂](https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.csv), retrieved 2026-09-09.
Source file creation header: Sat Sep 5 03:55:38 2026.
[Product description](https://gml.noaa.gov/ccgg/trends/).
[NOAA data terms](https://gml.noaa.gov/about/disclaimer.html): these government
observations are public-domain material; acknowledge NOAA, do not claim ownership
or imply endorsement. Repository code/text are MIT; NOAA data keep their terms.

`monthly.csv` retains the source comment header, CSV header, and unmodified rows
whose year is 2024 or 2025, in source order. Other years are omitted. This is a
clearly identified excerpt, not a substitute official NOAA product.

Original full download SHA-256: `dcf0198658c87ebb5e3b2ce807fe3a52e1d5f000aa0479fb1bf334afb7adde4d`.
Excerpt SHA-256: `5d90c5c3152fd4bc0303ba9d271b9f84b8be40c2880e775aa1b6cf8b3571f43a`. The original full series includes
third-party historical observations; those data rows are not redistributed here.

| Column | Meaning / treatment |
| --- | --- |
| year, month | Calendar year and month; one row per month required |
| decimal date | NOAA decimal-year coordinate; retained, not used in calculation |
| average | Published monthly mean CO₂, ppm; primary calculation |
| deseasonalized | NOAA seasonally adjusted series, ppm; sensitivity calculation |
| ndays | Contributing measurement-day count; nonpositive values rejected |
| sdev, unc | NOAA spread/uncertainty columns; negative values flag missing/interpolated data and are rejected |

The source notes month-centering, interpolation flags and the 2022–2023 station
substitution. Consult NOAA documentation for measurement and uncertainty methods.
The uncertainty columns are retained and screened, not converted into an invented
confidence interval. A future source refresh must get a new provenance record,
recomputed output and an explained change; do not silently replace this snapshot.
