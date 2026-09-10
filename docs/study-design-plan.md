# Study design updates

## Problem and decision

The flat design selector mixes broad methods and models and gives no domain or
selection criteria. Users must already know research terminology. The analysis
panel also lacks a visible library linked to the selected design.

Keep three distinct decisions: research area and subsection; the question's goal;
and the design that can answer it with available evidence. Offer plain-language
choices and explained candidate designs. The catalog is practical guidance, not
an exhaustive disciplinary taxonomy, statistical decision engine or approval.

## Implementation sequence

1. Add a shared, cited catalog of seven areas, subsections, eight goals and twenty
   study patterns. Each pattern has selection criteria, prerequisites, a limitation,
   planning fields, analysis guidance, steps and an illustrative question.
2. Put area → subsection → goal → explained design choices at the top of Plan.
   Keep an advanced broad-method selector and an undecided state. Context changes
   never silently choose a design or discard notes; clear affected review checks.
3. Show the selected design's analysis guidance and relevant example choices in
   Analyze. Make the full example library available from the editor and guide.
   Distinguish real data, synthetic calculations, mathematical demonstrations and
   plans with no results. Confirm before replacing a nonempty draft.
4. Extend browser backups to version 2, retaining version-1 reads. Preserve
   classification and pattern notes in Markdown, assistant tasks and CLI imports.
   Validate IDs and relationships. Add `research.py designs` for the same guidance
   without a browser, and an optional classification in the local study manifest.
5. Add runnable, bounded medical-test, software and data-analysis examples; reuse
   factorial and game code. Preserve input data, expected outputs and limitations.
6. Update coordination and skills, methodology, study format, README and public
   navigation. Generate browser catalog data and a readable design reference from
   the canonical JSON; check freshness in CI to prevent separate classifications.
7. Validate old backups, cross-language choices, note preservation, invalid
   selections, exported questions, example outputs and negative cases. Inspect the
   interface and publish through a short-titled reviewed PR.

## Acceptance criteria

A beginner can choose an area and describe their intent without knowing a method
name; each candidate explains the evidence and decisions it needs. Domain does
not imply design. Switching choices preserves earlier notes; Plan and Analyze
show the selected context. Old drafts remain readable. Python and browser use the
same catalog. Examples report only outputs actually computed from their stated
inputs. No sample size, ethical clearance or causal conclusion is manufactured.

## Evidence informing the design

- [NIST design selection](https://www.itl.nist.gov/div898/handbook/pri/section3/pri3.htm)
  organizes experimental work around objectives, variables and design choices.
- [NIH clinical research basics](https://www.nih.gov/health-information/nih-clinical-research-trials-you/basics)
  illustrates why medical research is broader than clinical trials.
- [EQUATOR](https://www.equator-network.org/reporting-guidelines/) separates study
  type from clinical area; reporting guidance does not determine methodological validity.
- [ACM SIGSOFT empirical standards](https://www2.sigsoft.org/EmpiricalStandards/)
  provide method-specific expectations for software research.
- [PRISMA 2020](https://www.prisma-statement.org/prisma-2020) informs the distinction
  between a documented review process and a collection of citations.

Sources inspected 10 September 2026. The selector is our implementation informed
by these sources; no source has validated this interface or its recommendations.

## Guide and manuscript expansion

Before publication, extend the shared catalog with dedicated medical/health,
engineering, materials, chemistry (organic, physical, experimental), experimental
physics and theoretical paths. Research and review papers are output types that
cross these areas, not competing disciplines. Preserve old area IDs in backups.

1. Give each path an entry decision, work sequence, required records, analysis
   checks, reporting structure, formatting notes and inspected primary guidance.
2. Generate the website and Markdown paths from the catalog. Expose the same
   records through `research.py guides` and link the selected area from Plan.
3. Add explicit research/review manuscript scaffolds in Write and in `draft`,
   with Markdown and Quarto output. Retain the actual question and recorded
   evidence; empty results remain empty. Rendering must not execute study code.
4. Add labeled materials, chemistry and physics plans tied to executable teaching
   examples. Do not imply that a calculation is an executed laboratory study.
5. Explain day-to-day frustrations and measured publication growth with sources;
   distinguish evidence of particular failures from a universal quality trend.
6. Test all guide paths, imports, outputs, formats and calculations; inspect the
   browser, run required CI, then merge and verify the published Pages files.

## Verification record — 10 September 2026

The final catalog has ten research areas, eight goals, twenty patterns and eight
subject/report paths. All fourteen editor examples import into local draft studies;
one uses real observations, six are executed teaching calculations, seven are
unexecuted plans. Legacy browser drafts remain readable.

Local verification: 34 Python tests, 18 JavaScript tests, repository link/generated
file/hash checks, all eight skill validators, the offline three-host workflow and
symbolic examples passed. Quarto 1.10.18 rendered the new research scaffold to HTML
and Word. Browser inspection confirmed the chemistry guide, its Plan link, preserved
question/notes and the Write controls at a narrow viewport. These are mechanical
and interface checks, not a user study or independent scientific review. CI also
renders the manuscript and runs core checks on Linux, macOS and Windows.
