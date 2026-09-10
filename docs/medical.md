# Medical and health

Start with the patient, population or biological question, then determine the claim that your design can support.

This is a practical starting path. Confirm the methods, local requirements and
current venue instructions for your actual study; this is not an exhaustive standard.

## Choose your route

- Treatment effect: consider a randomized comparison when feasible and ethically justified; otherwise justify the identification strategy.
- Exposure and outcome: distinguish follow-up cohorts, case-control sampling and a cross-sectional snapshot.
- Test accuracy: define an appropriate reference standard and target population; prediction needs separate validation and calibration.
- Evidence synthesis: choose a systematic review for a focused question or a scoping review to map evidence.

## Records you need

- Population, setting, eligibility, recruitment, time origin, exposure/intervention and comparator.
- Primary estimand and outcome definition, measurement schedule, missing-data approach and precision/sample-size rationale.
- Approval or exemption decision from the responsible body, consent process, privacy/access plan and applicable registration. Never invent these.

## Study flow

1. Frame the question and inspect prior evidence.
2. Write protocol and analysis plan; obtain the applicable approvals before recruitment or access.
3. Pilot measurement and records; collect according to the approved protocol.
4. Audit missingness and deviations, run the planned analysis, then sensitivity checks.
5. Report participant flow, findings, harms where relevant and limits; share only permitted data.

## Analysis checks

- Report effect estimates and uncertainty, not only significance.
- For diagnostic work, inspect spectrum, reference misclassification and precision. A toy confusion matrix does not validate a clinical test.

## Reporting and formatting

- Use the design-specific reporting guideline from EQUATOR (for example CONSORT, STROBE or STARD); follow its current applicable extension.
- Organize a research report around question, methods, results and interpretation. Include denominators, units and data-access details. Check the target journal for abstract structure and word limits.

## What counts as done

A traceable protocol, authorized study records and supported results are needed before a completed research claim. The workbench provides no clinical authorization.

## Use the tools

`python research.py guides --path medical` returns this path as JSON.

[Manuscript commands and formats](manuscript-formats.md) · [All paths](guide-paths.md)

## Primary guidance

- [EQUATOR: reporting by study type](https://www.equator-network.org/reporting-guidelines/)
- [ICMJE — manuscript preparation](https://icmje.org/recommendations/browse/manuscript-preparation/preparing-for-submission.html)
