# Does the community need Open Research?

Evidence review and implementation plan: 8 September 2026.

## Why this exists

The purpose is to reduce avoidable friction when using modern AI tools in
research: losing context between tools, accepting plausible answers without
checking them, and producing text before deciding what a study can establish.
The intended public benefit is work that other people can understand, challenge,
and reuse, including work with no positive result. More papers, more agents,
and more checked boxes are not our success measures.

This is a small workbench for researchers, students, and small teams willing to
work with local files and a terminal. That audience is a design choice, not a
validated market. People who already have an effective workflow may need only
one example or nothing here. Researchers needing a hosted data platform,
clinical study management, or specialist analysis should use established tools.

## Evidence and feedback collected

This is a targeted review, not a systematic review. Searches covered researcher
experiences with AI, study design guidance, scientific incentives, and existing
research software. Primary studies and first-party guidance were preferred;
marketing testimonials, generated participants, and unverified social posts
were excluded. Access date for the sources below: 8 September 2026.

| Source and exact location | What was observed | Limits and resulting decision |
| --- | --- | --- |
| [Chakravorti et al., AIES 2025](https://ojs.aaai.org/index.php/AIES/article/download/36568/38706/40643), §§3.2, 6, 7.3 | 284 complete surveys from 8,000 invitations and 15 interviews; respondents describe concerns about automation bias and a continuing role for human verification | US university social scientists; low response and self-selection limit generalization. Keep decisions editable and attach checks to outputs. This is published community feedback, not evaluation of our tool. |
| [Nature's 2023 researcher survey](https://www.nature.com/articles/d41586-023-02980-0), opening summary and supplementary-methodology links | More than 1,600 respondents; both interest in AI and concern about its use | Publisher survey, not a test of this project. Only the accessible summary was used; no prevalence estimates inferred. |
| [NIST/SEMATEK handbook §5.3.3](https://www.itl.nist.gov/div898/handbook/pri/section3/pri33.htm) | Experimental design depends on objectives, factors, resources, and acceptable error | Method guidance, not product-demand evidence. A single daily checklist cannot select a design. |
| [Smaldino and McElreath, 2016](https://arxiv.org/abs/1605.09511), abstract and model/results sections in the [author manuscript](https://arxiv.org/html/1605.09511) | A model explores how rewarding output can favor poorer methods | Model assumptions are not a diagnosis of every researcher or evidence that AI caused research-quality problems. Avoid output-volume rewards and automated quality badges. |
| [TOP Guidelines](https://www.cos.io/initiatives/top-guidelines), Research Practices | Describes practices for transparency and verification | A framework, not a certification. Preserve methods, data/code provenance, and honest review scope. |

Repository feedback check on this date found no user issues or comments. The
maintainer's request identifies frustration and checklist consistency as needs;
it is one stakeholder's feedback. We have not interviewed project users or
measured time saved, adoption, or research quality. A working program is not
evidence of community benefit. The current conclusion is **a plausible use case
worth testing, with effectiveness still unknown**.

## What to keep, change, and leave out

| Need or hypothesis | Concrete response | Evidence still required |
| --- | --- | --- |
| Transfer work between tools without losing decisions | Portable session plan with method notes, stable daily checklist, and local commands | Observe a user resume the same task with another tool |
| Understand a study before analyzing it | Separate experiment, observational, qualitative, synthesis, computational, and strategic-model decisions | Domain researchers inspect whether the decisions fit their actual studies |
| Learn through inspectable calculations | Runnable blocked factorial and game-theory examples with known-answer tests | Users explain the limits without mistaking demonstration data for observations |
| Reduce unnecessary process | Keep one daily checklist across all tasks and tools; put method questions in a separate panel | Test whether this reduces confusion and omission compared with current practice |
| Trust evidence rather than polished output | Source locations, uncertainty, negative results, and explicit verification | Audit resulting artifacts; self-reported confidence alone is insufficient |

Do not add an autonomous scientist, paper factory, automated journal submission,
universal statistical test selector, synthetic interview respondents, or a
scientific-validity score. Do not replace peer review with repeated model
agreement. Research logs record decisions; they are optional aids, not a demand
to spend the day writing about work. Reuse Jupyter, Zotero, Quarto, SymPy and
[Gambit](https://www.gambit-project.org/) when they already solve the task.

## Implementation sequence and acceptance

1. **Ground the purpose.** Publish this evidence/limitations record and a short
   explanation on the hosted page. Separate evidence, design decisions, and
   untested hypotheses; do not claim that the research community is universally
   broken or that a checklist repairs its incentives.
2. **Repair the handoff.** Keep the existing five checklist statements and their
   state across task/tool changes. Export them with the session. Reset only by
   the user's explicit action; explain device-local storage and failure to save.
3. **Make methods usable.** Add a study-design selector and decisions in the
   session export. Supply bounded experiments and strategic-game commands,
   expected outputs, assumption checks, and method-specific workflow guidance.
4. **Make feedback actionable.** Publish a GitHub feedback form and downloadable
   evaluation protocol. Ask about observed friction, the actual task, expected
   versus obtained output, unnecessary steps, and a reproducible example.
   Submitting an issue is public and requires a GitHub account. No background
   collection of questions, research data, or analytics.
5. **Verify and publish.** Run regression tests, known-answer calculations,
   local-link checks, and browser interaction checks for task switching, state
   persistence, exports, reset, and the new method panel. Merge after CI passes
   and verify the hosted deployment. Record actual checks in the PR.
6. **Evaluate with people.** Use the protocol below before claiming usefulness.
   Recruitment and real observations remain future work; they cannot be
   replaced by agent role-play or invented responses.

## A practical evaluation protocol

Status: **planned, not conducted**. Proposed target: 6–8 voluntary participants
across experimental, observational/qualitative, and computational work, including
people with limited CLI experience. This is a small formative usability sample,
not a representative survey or powered effectiveness study. Follow applicable
institutional consent/ethics processes before participant research; do not claim
approval or preregistration that has not occurred.

Run 30-minute sessions using two comparable, non-sensitive practice tasks. Ask
participants to create a study plan and inspect an intentionally imperfect
artifact, once using their usual workflow and once with Open Research. Alternate
task versions and counterbalance workflow order. Record familiarity and assistance;
novelty, learning and task differences are limitations. Keep the shared checklist
identical throughout. Explain that the tool, not the person, is being evaluated.

Before observing sessions, define completion as: question and unit identified,
design justified, one important defect detected, and a plan another person can
resume. Record completion/abandonment, minutes including setup, assistance events,
unsupported claims left uncorrected, and 1–5 frustration ratings (1 low, 5 high).
Ask participants to explain why the method could or could not answer the question.
If feasible, have an uninvolved domain reviewer assess anonymized artifacts
without knowing the workflow; otherwise disclose that review was not independent.

Report individual paired outcomes, counts with denominators, medians and range;
do not infer population effects from this sample. Include failures and quotations
only with permission. Keep raw personal notes private. Publish a redacted issue
or aggregate findings when permitted. Use the [session worksheet](../site/feedback-study.md).

Provisional product decisions, chosen for triage rather than statistical proof:
fix any reproducible data-loss or misleading-output defect; simplify a step when
at least two observed sessions stall there; keep a feature when it helps produce
an inspectable artifact without adding unsupported claims. If most participants
prefer their existing workflow or gain no useful artifact, reduce the workbench
to the examples they do use. Reassess these rules after the formative pilot;
a later claim of effectiveness needs a separately planned, adequately sized study.

AI assisted the source review, implementation, and documentation. No generated
text is counted as participant feedback or independent scientific review.
