---
name: mathematical-analysis
description: Formulate and compute a bounded mathematical research problem with explicit assumptions and independently checked results.
---

# Mathematical Analysis

Translate the question into variables, domains, assumptions, units, equations,
constraints and required precision. Distinguish an exact symbolic question
from a numerical approximation or empirical statistical inference.

Use existing mathematical software: SymPy for suitable symbolic work and
appropriate numerical libraries for approximation. Build explicit expressions
in code; do not evaluate arbitrary strings or install a new tool unnecessarily.
Record actual versions, inputs, algorithms and tolerances. If code cannot run,
label the calculation unexecuted and provide a checkable procedure.

Verify the answer by substitution, an independent identity, an exact known
case, dimensional analysis, or a justified error/convergence check. Inspect
singularities, branches and constraints. Do not treat a symbolic equality as
validation of an empirical model or its measurement assumptions.

Return code, computed result, verification, interpretation for the research
question and limits. The Open Research mathematics example is a pattern for
known-answer checks, not a general-purpose calculator or proof assistant.

## Distinguish proof, simulation and strategic models

Read the selected pattern and domain. A proof needs a valid argument over its
stated domain; a simulation needs numerical verification and separate empirical
validation when claimed; a game model needs payoff justification and equilibrium
checks. In an Open Research checkout, inspect `python research.py designs
--pattern simulation` (or `proof` / `game`). A runnable convergence rehearsal is
`python examples/study-patterns/analyze.py --example simulation --check`.
Retain its declared tolerance; do not infer physical truth from convergence.

## Follow the subject and report paths

When working in an Open Research checkout, inspect `python research.py guides`
and the selected path with `--path medical`, `engineering`, `materials`,
`chemistry`, `physics`, `theory`, `research-papers` or `review-papers`. Match the
required records and checks to the actual claim; theoretical work crosses fields.
Chemistry includes organic, physical and experimental/analytical branches.
