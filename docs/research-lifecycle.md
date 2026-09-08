# From question to inspectable finding

This is Open Research's working procedure. Its openness goals draw on
[UNESCO](https://www.unesco.org/en/open-science/about); method choices still
need justification for the discipline and question.

## 1. Frame

State the research question, why it matters, the population or corpus, and the
unit of analysis. Separate a descriptive question from a causal one. Identify
what evidence would change the conclusion and what is out of scope. Include
stakeholder or community perspectives where the research concerns them.

## 2. Plan before seeing results

Record design, inclusion/exclusion rules, primary outcome, comparisons, sample
rationale, stopping rules, and analysis approach in the protocol. Label
exploration explicitly. A Git commit preserves a version; it is not by itself
a formal preregistration. Record an actual registry identifier only when one
exists. Preserve and explain deviations instead of rewriting the original plan.

## 3. Gather evidence

Record where evidence came from, when it was accessed, its reuse terms, and
where each relevant observation appears. Keep a search/screening log for
literature work and a data dictionary for measurements. Missing full text
is a limitation. Search snippets and generated summaries are discovery aids,
not proof of what a paper reports.

## 4. Analyze

Run the specified analysis. Record missingness, exclusions, transformations,
and failed runs. Tie outputs to exact inputs and code. Report uncertainty
appropriate to the design; do not manufacture precision from tiny or biased
samples. Separate planned tests from exploratory follow-ups.

## 5. Challenge

For each finding, inspect the cited location, alternative explanations,
contradictions, measurement limitations, and the leap from sample to population.
Reproduce numerical outputs where possible. Author self-review and model
agreement do not become independent evidence through repetition.

## 6. Share responsibly

Publish methods, permissible data/code, limitations, and provenance in reusable
formats. When access is restricted, explain why, who controls access, and how
others can request it. Name actual contributors and disclose AI assistance.
See [release practice](open-release.md) for the handoff.
