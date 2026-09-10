# Materials science

Explain how processing and structure relate to the property you intend to measure.

This is a practical starting path. Confirm the methods, local requirements and
current venue instructions for your actual study; this is not an exhaustive standard.

## Choose your route

- Compare processing factors: consider a factorial experiment blocked by batch.
- Characterize a material: specify which structural, compositional or property claim each instrument can support.
- Predict properties: separate specimens or batches across validation splits to avoid leakage.

## Records you need

- Composition, supplier/lot, synthesis or processing history, storage, geometry and preparation.
- Independent batches and specimens, allocation and characterization settings.
- Raw spectra/images/curves, preprocessing, calibration, units and uncertainty components.

## Study flow

1. Define the property, application and smallest meaningful difference.
2. Plan independent batches, specimen allocation and a baseline material.
3. Prepare and characterize samples using documented procedures.
4. Measure the property; retain raw and processed data with specimen IDs.
5. Connect evidence across processing, structure and performance; test alternate explanations.

## Analysis checks

- Distinguish repeat readings from independent batches.
- Avoid inferring bulk purity or uniformity from a single local measurement; examine heterogeneity and instrument limitations.

## Reporting and formatting

- Use a specimen table linking processing conditions, characterization and property tests.
- Provide scale bars, axes/units, image-processing disclosure and uncertainty definitions; put reproducible preparation details and raw characterization in accessible supporting information.

## What counts as done

A result needs specimen-linked observations. The materials example here is a plan; its linked factorial calculation uses synthetic responses.

## Use the tools

`python research.py guides --path materials` returns this path as JSON.

[Manuscript commands and formats](manuscript-formats.md) · [All paths](guide-paths.md)

## Primary guidance

- [Royal Society of Chemistry — experimental reporting](https://www.rsc.org/publishing/publish-with-us/publish-a-journal-article/experimental-reporting)
- [BIPM / JCGM — measurement uncertainty and modelling](https://www.bipm.org/en/committees/jc/jcgm/publications)
- [NIST: choosing experimental designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri3.htm)
