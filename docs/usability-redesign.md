# A study editor instead of a command chooser

Plan and investigation: 8 September 2026. Implementation and verification: 9 September 2026. This iteration responds to direct
maintainer feedback and an inspection of the live page. It is not a population
usability study.

## Observed problems

The primary stage buttons were below the working area. Their handlers focused
and scrolled to a replacement result, creating a disruptive jump. They did not
explicitly reload the document, but a real reload discarded question/design
notes because only checklist booleans were saved. An empty question could be
exported with a generic fallback. Experiment output was a synthetic teaching
command rather than a user-authored protocol. Eleven task choices, a separate
method selector, and repeated generic handoff items obscured the actual work.

## Evidence informing the design

| Guidance | Application | Limit |
| --- | --- | --- |
| [GOV.UK: complete multiple tasks](https://design-system.service.gov.uk/patterns/complete-multiple-tasks/) | Put stages before the editor; allow returning to revise earlier answers | Guidance for services, not experimental evidence for this research app |
| [GOV.UK: check answers](https://design-system.service.gov.uk/patterns/check-answers/) | Show actual answers before export and let users return to edit them | Exporting is different from submitting an official form |
| [NN/g: progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/) | Keep study authoring primary; move installation and toy examples into an optional tools area | General UX guidance; local user testing remains necessary |
| [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | Label the stage panels, expose selection, and support keyboard navigation | Correct semantics do not alone establish accessibility or usability |

## Implementation plan

1. Replace the task chooser with six stages above the editor: Research, Plan,
   Inspect, Analyze, Write, Review & export. Switching changes the active panel
   without navigating, clearing answers, moving focus to a result, or forcing
   a scroll. Keep the study question visible and shared across stages.
2. Maintain one study object. Save all entered answers, chosen method, stage,
   next actions and contextual review checks on this device. State where data
   is stored. Handle unavailable storage and invalid saved data explicitly;
   never silently replace a damaged saved draft. Starting a new study requires
   a deliberate confirmation. Offer a portable JSON backup/import.
3. Make Plan an actual protocol editor. Collect units, comparison, outcomes,
   sampling rationale, procedure and access considerations, plus fields for the
   selected design. Preserve each design's notes when switching designs. Never
   invent a sample size, procedure, citation or result from the question.
4. Replace the repeated daily handoff with stage-specific review checks and
   a next action for each stage. Progress indicates recorded work and manual
   checks, not scientific approval. A check in Plan must not mark Inspect done.
5. Build preview, copy and Markdown download from the same study object and
   serializer. Require a nonblank question for study export; label unfilled
   sections as not recorded. Export all stages, not just the active one.
   Keep examples and AI handoff clearly separate from the study document.
6. Check exact question/notes round-tripping, Unicode and multiline text,
   design switching, independent check state, blank-question handling, reload
   recovery, malformed imports/storage, keyboard navigation, and real browser
   copy/download behavior. Test both narrow and wide layouts, run repository
   checks, merge the PR, and verify the deployed artifacts.

## Acceptance scenario

Enter a specific question about irrigation and plant growth. In Plan choose a
controlled experiment and enter experimental units, treatment levels, response,
allocation, sample rationale and procedure. Record a source and data-quality
note in Inspect. Switch among stages and reload: all entered values remain.
Review and copy/download: the question and actual design decisions appear
verbatim; unprovided information stays visibly missing. Experiment examples
never appear as the user's collected data or completed study. Reopening an
exported JSON draft restores all editable content, including inactive designs.

The earlier fixed daily-checklist choice is superseded by this direct feedback.
The public purpose/evidence material stays available below the editor. The
redesign is evaluated by the checks actually performed, not claims of measured
improvement in researcher productivity.
