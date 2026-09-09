# A real-data reanalysis: NOAA monthly CO₂

This is a small completed **retrospective descriptive study using public
observations**. It is not a new experiment or a novel climate discovery.
The synthetic examples elsewhere are teaching fixtures; this folder demonstrates
an actual question → source → protocol → code → result → limited conclusion.

```sh
python examples/noaa-co2/analyze.py --check
python research.py check examples/noaa-co2 --release
```

No download or package installation is needed to reproduce the frozen input.
To inspect the values, omit `--check`. To use another compatible NOAA CSV:

```sh
python examples/noaa-co2/analyze.py --input your-monthly.csv --years 2020 2021 --output build/your-summary.json
```

The output path must be new. `--check` compares against this study's fixed result;
use a separate protocol and expected result for a new question or period.

1. Read [protocol](protocol.md) and [analysis plan](analysis-plan.md).
2. Inspect [source and dictionary](data/README.md) and [raw rows](data/monthly.csv).
3. Read and execute [analysis code](analyze.py).
4. Compare [computed JSON](results/summary.json) with [report](report.md).
5. Inspect [evidence](evidence.csv), [claims](claims.csv), [review](review.md)
   and the hashes in [study.json](study.json).

[Open the public walkthrough](https://chandrashekhar-hegde.github.io/open-research/example.html).
From that page, load its editable record into the study editor. Save your own
JSON backup, then use `python research.py import-browser your.study.json studies/my-study`
to continue locally. Import creates an incomplete new study, never a certified result.
