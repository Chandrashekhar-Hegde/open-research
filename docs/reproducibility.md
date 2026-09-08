# Reproducible analysis

A reproduction record lets a reader trace inputs, code, environment, and
outputs. This project's minimal package is a practical convention, informed
by [FAIR](https://www.gofair.foundation/fair-principles) and the artifact-linking
approach of [RO-Crate](https://www.researchobject.org/ro-crate/).
Our `study.json` is a local format, not an RO-Crate implementation.

Keep raw data unchanged. Store derived files separately, with a data dictionary
covering units, identifiers, missing-value conventions, collection method,
license, and access. Hash actual bytes with SHA-256. Hashes establish identity
against a recorded value; a regenerated manifest alone cannot establish
independent provenance or correctness.

Record the operating system, runtime and package versions, commands, working
directory, parameters, and random seeds when used. Pin external dependencies
for analyses that require them. For nondeterministic methods, define a justified
comparison tolerance or distributional criterion before checking results.
A model name and seed do not promise deterministic hosted-model outputs;
preserve the actual response and available run metadata when rights allow.

Reproduce in a clean directory after inspecting code and inputs. Compare with
committed expected outputs. Investigate discrepancies before replacing expected
results. Keep failed runs and explain changes to data, code, and conclusions.

The [paired measurements example](../examples/paired-measurements/README.md)
uses integer inputs and deterministic standard-library arithmetic. Its
`analyze.py --check` command compares an in-memory result with the committed
JSON without rewriting it. Its integrity check is separate from its numerical
check. This makes both altered data and altered expectations detectable by
the tests, within the explicitly limited synthetic example.

AI-generated code receives the same checks as other code. Inspect assumptions,
units, missingness, selection logic, and use of identifiers. A successful exit
code does not justify causal inference or establish that a dataset is suitable.
