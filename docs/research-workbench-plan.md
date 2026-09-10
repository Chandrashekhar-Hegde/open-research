# Research workbench implementation plan

Updated 9 September 2026. Scope: usable guidance and executable research records.

## Why

A form, a teaching calculation and a publication are different artifacts. Readers
need to see how a defensible question becomes a protocol, collected or reused
evidence, executed analysis, interpretation and an inspectable release. The
workbench should make missing work visible and make completed work reproducible.

## Ordered work

1. **Methodology and evidence.** Add a guided start page and method routes for
   experiments, observational research, qualitative research, evidence synthesis,
   computation, mathematics and game theory. Explain when to use each, inputs,
   sequence, analysis, limitations and deliverables. Link original guidance;
   distinguish reporting checklists from design or risk-of-bias assessment.
2. **Connect planning to execution.** Import the browser JSON into a new local
   study directory, preserving the exact question and all notes. Generate actual
   protocol and analysis documents; leave missing ownership/permissions/results
   explicitly incomplete. Validate input before writing and refuse overwrites.
3. **Run a real reanalysis.** Include a dated snapshot of public NOAA observations,
   documented provenance and rights, a bounded descriptive question, transparent
   retrospective protocol, analysis code, results and limitations. Do not claim
   original data collection, preregistration, causal inference or independent review.
   Link the record from the website and make an editable browser version available.
4. **Explain capabilities.** Map skills to input, concrete command and output.
   Separate executable Python from optional Markdown task instructions. Explain
   hosted use, local use, GitHub forks, static hosting and research-tool extension.
5. **Improve the interface.** Add Start here, Methods, Worked study and About links.
   Keep the six-stage editor prominent. Place short method guidance beside the
   design choice and link deeper instructions. Keep exports and local storage clear.
6. **Remove provider branding.** Replace named assistant integrations with optional
   generic task instructions and a configurable project-relative skill directory.
   Preserve truthful generic assistance records and old browser drafts.
7. **Purpose and contact.** Explain documented research-quality frustrations and
   concrete responses, with evidence limits. Add the maintainer's supplied LinkedIn
   contact and GitHub profile; do not invent a biography, email or credentials.
8. **Verify and publish.** Run repository checks, unit tests, site tests, reanalysis,
   import round trips and browser navigation/export checks. Merge through a concise
   PR, deploy GitHub Pages and compare deployed assets with the merged files.

## Acceptance checks

- A newcomer can choose a method, understand what must be done, and find the
  corresponding record, code and output without reading the whole repository.
- A saved browser study becomes a local protocol without losing exact text or
  inventing evidence. Invalid imports cannot replace existing work.
- A real-data example runs offline from its frozen input; a missing month,
  duplicate month, nonfinite value or changed input is detected.
- Published results agree with the executed code; conclusions stay descriptive.
- No named coding-assistant branding remains in tracked content.
- Documentation states the real scope: broad starting guidance, not a universal
  substitute for discipline-specific methods, consent, expertise or review.

## Evidence and limits

[NIST design guidance](https://www.itl.nist.gov/div898/handbook/pri/section3/pri3.htm)
organizes experimental choices around objectives, variables and designs.
[STROBE](https://www.strobe-statement.org/) distinguishes reporting from study
conduct and quality assessment. [Cochrane's handbook](https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-01)
supports planned, question-led reviews. [PRISMA](https://www.prisma-statement.org/prisma-2020)
provides reporting and flow-diagram resources.
[Preregistration guidance](https://www.cos.io/initiatives/prereg) explains planned
versus exploratory analyses and transparent changes. These sources guide the
workflow; they do not establish that this particular product improves research.

## Completed implementation and verification

- Added the methodology guide, research-quality evidence, capability/code map,
  browser/local/hosting instructions, real-data walkthrough and maintainer contact.
- Implemented browser-to-local import, configurable skill installation and loading
  the real NOAA study into the editor. Existing draft content survives retired
  tool preferences. Named provider branding was removed from tracked content.
- The frozen NOAA reanalysis reports a 2.745 ppm difference in equal-month means;
  its complete records, source terms, input hash, code and output are included.
- 26 Python tests cover core behavior, import preservation/refusal, known-answer
  arithmetic and malformed observations. 10 site tests cover document fidelity,
  draft validation, real-study output consistency and page/anchor wiring.
- Local browser checks confirmed stage switching, NOAA record loading, the exact
  displayed question/protocol, restoration after visiting the guide, and a correct
  method anchor. Guide layouts were visually inspected at 390 and 1280 pixels.
- The browser displayed copy success and download initiation, but automation could
  not retrieve clipboard contents or confirm download delivery. Plain Markdown
  and JSON remain available for manual copying. This limitation is not counted as
  successful file-delivery verification.

These are implementation checks, not a participant usability study or evidence
that the project improves research quality. The community pilot remains unrun.

## Tool integration follow-up

The [integration plan](integration-plan.md) adds named host setup, installation
targets, executable workflow checks and a public tools guide. The
[verification record](integration-verification.md) reports actual execution and
untested hosts separately. Tool names describe supported usage, not authorship.

## Classification and example follow-up

The [study design plan](study-design-plan.md) adds area, subsection, goal and
specific-pattern guidance, versioned backups, a shared CLI catalog and a
classified library with distinct evidence labels.
