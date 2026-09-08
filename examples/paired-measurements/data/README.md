# Data dictionary and provenance

`raw.csv` contains eight manually specified synthetic records, authored for
this repository on 2026-09-08. No external dataset, participant, consent record,
or random generator is involved. These are example values, not empirical data.

| Column | Type | Meaning |
| --- | --- | --- |
| item | string | Unique fictional pair identifier A–H |
| before | integer | First illustrative measurement, arbitrary units |
| after | integer | Second illustrative measurement, same arbitrary units |

Each item is one paired unit of analysis. There are no missing values and no
excluded rows. The analysis rejects missing/noninteger measurements and
duplicate identifiers. `after - before` is the derived change.
All data and accompanying code are distributed under the repository MIT license.
The study manifest records the exact raw file hash. Do not edit the raw fixture
to obtain a different conclusion; create a separate example instead.
