# Review record

Prepared 2026-09-08 with Codex assistance. This is an author/tool review record,
not independent human review.

Mechanical review scope: verify file hashes, CSV structure, claim references,
required records, input validation, and reproduction against committed JSON.
The repository test suite also checks the expected values independently of
that JSON and exercises altered input, duplicate IDs, and missing values.
The repository's CI logs record actual runs and platform results.

Manual arithmetic available for inspection: 2 + 3 + 1 + 2 + 0 + 4 + 3 + 1 = 16;
16 / 8 = 2. No exclusions or empirical claims occur in the report.

Remaining limits: this tiny deterministic fixture does not test real-world
sampling, missing-data methods, dependency-heavy environments, live model
behavior, source entailment, or independent scientific validation.
