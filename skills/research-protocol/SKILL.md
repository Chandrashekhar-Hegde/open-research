---
name: research-protocol
description: Frame a research question and write a study protocol or analysis plan with explicit methods, outcomes, and uncertainty.
---

# Research Protocol

Translate the supplied question into a researchable scope. Inspect existing
plans first; preserve stated constraints and distinguish clarification from
an intentional method change. Ask only for missing facts that materially
change the design; mark assumptions when proceeding provisionally.

Produce a protocol covering question, population/corpus, unit of analysis,
design, inclusion/exclusion, primary outcomes and units, sample rationale,
stopping rule, access/ethics considerations, and known limitations. For an
exploratory study, say so. For confirmatory work, separate planned tests from
later exploration. A locally written plan is not automatically preregistered.

Write an analysis plan with inputs, preprocessing, missingness handling,
comparison/estimand or qualitative method, uncertainty approach, sensitivity
checks, environment, and expected artifacts. Match detail to the discipline
and scope; do not invent sample-size calculations or ethics approvals.

Check that the proposed observations can answer the actual question and that
each primary outcome has an operational definition. Identify confounders or
measurement gaps that block stronger conclusions. Record unresolved decisions
and proposed ways to resolve them. Preserve protocol versions and deviations.

When a repository study template is available, fill its protocol and plan;
otherwise return portable Markdown. Finish with the question, method,
justification, assumptions, and decisions still needed.

## Select a study pattern

Separate research area/subsection from goal and design. Medical, engineering or
software is a setting, not a method. In an Open Research checkout, use
`python research.py designs --domain medical --goal predict` (substitute actual
IDs) or `python research.py designs --pattern cohort`. Inspect fit, prerequisites,
limitations, planning fields and analysis guidance before proposing a design.
Offer a small explained choice when the user lacks terminology; do not silently
assign a design from the domain. Preserve classification in `study.json` and
browser records; record why the design answers the question. For mixed methods,
plan both components and their integration. Templates with no results stay plans.

## Follow the subject and report paths

When working in an Open Research checkout, inspect `python research.py guides`
and the selected path with `--path medical`, `engineering`, `materials`,
`chemistry`, `physics`, `theory`, `research-papers` or `review-papers`. Match the
required records and checks to the actual claim; theoretical work crosses fields.
Chemistry includes organic, physical and experimental/analytical branches.
