# Study workspace

Fill `study.json`, `protocol.md`, and `analysis-plan.md` before starting work.
Maintain `evidence.csv` (sources) and `claims.csv` (interpretations) separately.
Semicolons separate multiple source IDs in a claim. Preserve exact locations
and record missing access instead of pretending to have read a source.

Store raw data separately from derived artifacts. Describe data columns,
units, origin, access terms, and transformations in a data dictionary.
Keep research decisions and protocol deviations in version history or a
study log. Complete `report.md`, `review.md`, and `ai-use.md` before release.
A review record can honestly say that independent review is still pending.

Run the repository's `scripts/research.py check PATH` during development and
add `--release` for completion checks. Commands in `study.json` are descriptive;
the validator never executes them. The repository handbook explains the full
study format and provides a completed example under `examples/`.
