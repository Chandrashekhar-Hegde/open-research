# Engineering

Separate a proposed artifact, a controlled performance test and evidence that it works in its intended setting.

This is a practical starting path. Confirm the methods, local requirements and
current venue instructions for your actual study; this is not an exhaustive standard.

## Choose your route

- Build or improve a device/process: use an artifact evaluation with explicit requirements.
- Compare controllable factors: use a factorial design with independent experimental units and blocked nuisance variation.
- Compare software or algorithms: use a benchmark with representative workloads and declared baselines.

## Records you need

- Requirement and acceptance criteria, units, load/environment envelope and failure definition.
- Versioned drawings, configuration, bill of materials or software dependencies, calibration and operating conditions.
- Independent specimens/runs, allocation, nuisance factors and exclusions; safety review where applicable.

## Study flow

1. Translate the problem into measurable requirements.
2. Choose a baseline and test envelope; plan replication and analysis before testing.
3. Build/version the artifact and validate the measurement chain.
4. Execute the test matrix and retain failed runs with reasons.
5. Compare performance and uncertainty against the requirement; report operating limits.

## Analysis checks

- Estimate main effects and interactions where the design supports them.
- Separate within-device repeats from independent devices; check robustness across operating conditions.

## Reporting and formatting

- Include system schematic, test matrix, apparatus/configuration and requirements-to-results table.
- Label units and tolerances; supply code/data versions and figure captions that explain independent sample counts. Use the relevant venue template after the evidence is stable.

## What counts as done

A prototype or simulated improvement alone does not establish field reliability. State which conditions were actually tested.

## Use the tools

`python research.py guides --path engineering` returns this path as JSON.

[Manuscript commands and formats](manuscript-formats.md) · [All paths](guide-paths.md)

## Primary guidance

- [NIST: choosing experimental designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri3.htm)
- [ACM SIGSOFT: empirical standards](https://www2.sigsoft.org/EmpiricalStandards/)
