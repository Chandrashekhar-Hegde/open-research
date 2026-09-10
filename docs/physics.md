# Experimental physics

Turn the physical hypothesis into a measurable quantity and a traceable measurement model.

This is a practical starting path. Confirm the methods, local requirements and
current venue instructions for your actual study; this is not an exhaustive standard.

## Choose your route

- Measure a physical parameter: plan calibration, background and uncertainty propagation.
- Test an apparatus change: compare controlled configurations while accounting for drift.
- Compare a model with observations: define the prediction, fitting range and a check using evidence not used to tune the model.

## Records you need

- Measurand, units, apparatus diagram, instrument settings, calibration chain and acquisition timing.
- Raw runs, backgrounds/blanks, environmental variables, exclusions and analysis code version.
- Uncertainty budget including relevant correlations, independent runs and systematic contributions.

## Study flow

1. Derive the observable from the hypothesis and identify approximations.
2. Plan controls, instrument checks, independent runs and required resolution.
3. Acquire observations and calibration/background records.
4. Apply documented corrections and propagate uncertainty; inspect residuals and stability.
5. Compare the measured result with prediction and report the tested regime.

## Analysis checks

- Report uncertainty meaning, coverage assumptions and correlated terms; repeated readings do not remove systematic error.
- Check model limits and numerical convergence. A small residual is not proof that all systematic effects are absent.

## Reporting and formatting

- Use defined symbols and consistent units; number equations referenced in prose.
- Include apparatus schematic, calibration/uncertainty table, complete figure captions and a data/code availability statement. Check APS or the target venue for its actual template and figure requirements.

## What counts as done

The physics example is a measurement plan. Its linked exponential-decay calculation verifies a solver, not a physical apparatus.

## Use the tools

`python research.py guides --path physics` returns this path as JSON.

[Manuscript commands and formats](manuscript-formats.md) · [All paths](guide-paths.md)

## Primary guidance

- [BIPM / JCGM — measurement uncertainty and modelling](https://www.bipm.org/en/committees/jc/jcgm/publications)
- [APS — author guidance and journal requirements](https://journals.aps.org/authors)
