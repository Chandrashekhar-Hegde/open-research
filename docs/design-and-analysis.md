# Design a study that can answer the question

Start with who needs the answer, what decision it informs, the unit being
studied, and what evidence would change your mind. Describe what is known,
unknown, and merely plausible. Inspiration produces candidate questions;
it does not establish novelty or evidence. Compare at least one simpler
explanation and one way the question could fail to be answerable.

## One study, distinct stages

The website saves one study with separate Research, Plan, Inspect, Analyze,
Write, and Review & export sections. Review checks and next actions belong to
each stage: a Plan check never marks Inspect complete. The earlier fixed daily
checklist was replaced after direct usability feedback. These checks are
self-reported review notes, not scientific approval. Record absent evidence
explicitly rather than inventing it to complete a field.

Select a method in Plan to record its specific decisions. Copy and Markdown
export contain your actual answers; an editable JSON backup also preserves
notes for inactive designs. See the [usability redesign](usability-redesign.md)
and [community evaluation plan](community-needs.md).

| Kind of question | Decisions before analysis | Appropriate scope of the answer |
| --- | --- | --- |
| Controlled experiment | Experimental unit, intervention levels, comparison, randomization, blocks, independent replication, blinding, outcome, sample rationale | Treatment contrast under the design's assumptions; generalization still needs justification |
| Observational study | Population and sampling, time ordering, measurements, confounding, selection, missingness, estimand | Description or association unless an explicit causal identification argument is defensible |
| Qualitative study | Question and context, sampling rationale, researcher position, consent, interview/observation process, interpretive method, contradictory cases | Contextual interpretation supported by permitted source material; no invented participants |
| Evidence synthesis | Search coverage and dates, inclusion rules, screening, extraction, bias appraisal, heterogeneity | A bounded account of the evidence actually inspected |
| Computational or mathematical study | Definitions, domains, inputs, algorithm, baseline, precision, convergence, benchmark, sensitivity | A result conditional on the mathematical/model assumptions |
| Game-theory study | Players, strategies, timing, information, payoffs, solution concept, possible multiplicity | Strategic implications of assumptions; behavioral claims require empirical evidence |

These are starting decisions, not exhaustive disciplinary protocols. For
observational reporting, consult the relevant [STROBE checklist](https://www.strobe-statement.org/checklists/);
for systematic-review reporting, consult [PRISMA](https://www.prisma-statement.org/prisma-2020).
Reporting completeness does not repair flawed design.

## A workable study flow

1. **Understand:** read primary evidence and inspect the data-generating process.
   Write the research question in one sentence and explain why the answer matters.
2. **Choose:** decide what kind of study can answer it. State feasibility,
   resources, access, and what conclusions the design will not support.
3. **Plan:** record outcomes, units, comparisons, sample rationale, analysis,
   exclusions, stopping rule and deviations policy before examining outcomes
   for confirmatory claims. Explicitly label exploratory work.
4. **Pilot:** test instructions, measurements, data handling and calculations
   on permitted practice material. Preserve failures and revise the protocol
   with a dated reason. A pilot is not automatically an efficacy study.
5. **Run:** preserve raw inputs; record collection, transformations, versions,
   assignment and departures from plan. Avoid treating repeat measurements,
   cells or messages as independent participants.
6. **Analyze:** estimate the planned quantity; report uncertainty appropriate
   to the design, missingness and sensitivity to defensible alternatives.
   Inspect both contradictory and null findings. Separate estimation from
   hypothesis tests and exploratory follow-up.
7. **Explain:** describe what the result means, what assumptions it needs and
   why an alternative explanation remains possible. Ask another person to
   reproduce a key calculation where feasible; name the review actually done.
8. **Handoff:** share allowable artifacts and the next action. A useful output
   may be a revised question or a decision not to proceed.

## Design of experiments

Use [NIST's design-selection guidance](https://www.itl.nist.gov/div898/handbook/pri/section3/pri33.htm)
to match the objective and factors to a design. The
[runnable example](../examples/experimental-design/README.md) produces a
randomized run order for two factors and complete blocks, then demonstrates
main and interaction contrasts on explicitly synthetic outcomes.

For real work, document factors and physical levels, a primary response and
measurement protocol, experimental unit, allocation procedure and a sample-size
or precision justification. A random seed does not establish adequate power.
Retain the actual allocation. If there is carryover, interference, clustering,
restricted randomization or failed runs, reconsider both design and analysis.
Do not apply the example's balanced contrasts blindly to incomplete data.

## Game theory research

Use a strategic model when outcomes depend on other actors' choices. Explain
why the actors and actions are appropriate, where payoffs come from, and which
information and timing assumptions matter. Check best responses and sensitivity
to alternative payoffs before interpreting equilibrium. Multiple equilibria
require a selection argument; no pure equilibrium does not mean no equilibrium.

The [2×2 example](../examples/game-theory/README.md) checks pure equilibria and
includes cases with one, multiple, and no pure equilibria. Use
[Gambit](https://www.gambit-project.org/) for its established finite-game tools.
If the question is about actual people, keep empirical measurement and model
calculation separate. Simulated agents cannot substitute for recruited participants.

## Analysis and working understanding

Run `python research.py profile your-data.csv` to inspect a CSV, then reconcile
its summaries with the data dictionary and collection method. Missing-value
tokens, identifier columns and repeated measures need human interpretation.
Specify the target quantity before choosing a test or model. Check assumptions,
units, denominators, leakage, missingness and outliers without opportunistic
exclusions. Use a simpler baseline and investigate differences from it.

Before writing a conclusion, explain in your own words: what was varied or
observed, what comparison was made, which uncertainty was quantified, what
could create the same pattern, and what evidence would overturn the conclusion.
If you cannot, return to the study or calculation. AI may help inspect code,
organize evidence and challenge assumptions; it cannot supply missing observations
or turn a polished draft into proof.

## Minimal artifacts

Use the existing protocol, analysis plan, evidence and claim ledgers where they
help someone resume or inspect the work. A short study needs a short record.
Do not add forms solely to complete a process. Keep the original question,
important decisions, actual inputs/outputs, checks, limitations and next step.
See [the daily workflow](daily-workflow.md) for local commands.

See [research areas and 20 design patterns](study-designs.md) for selection criteria,
subsections, work sequences and the connected example library.
