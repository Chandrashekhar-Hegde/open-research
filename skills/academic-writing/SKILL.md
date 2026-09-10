---
name: academic-writing
description: Draft or revise academic research writing from supplied methods, results, and verified sources without inventing evidence.
---

# Academic Writing

Inspect the question, protocol, results, evidence and claim ledgers before
writing. Clarify the document type and venue when it changes the structure.
If evidence is missing, label the gap instead of completing a plausible claim.

Draft from the method actually used. Preserve uncertainty, contradictions,
negative results, limitations and deviations. Verify every material citation
against its exact source location and check bibliographic metadata. Generated
citation formatting is not source verification.

When available, Open Research's `draft` command assembles an authoring scaffold
from study files; Quarto can render a scholarly document and Zotero can manage
verified references. Use these tools only when useful and available; portable
Markdown is an acceptable output. Never claim a render that was not run.

Return an editable document, unresolved evidence gaps, and checks performed.
Record actual AI assistance, authorship, funding/conflicts and access terms
where applicable. Preserve the researcher's meaning and do not invent ethics
approval, peer review, measurements, citations or journal acceptance.

## Write for the design actually conducted

Retain research area, subsection and selected pattern in the methods. Check the
protocol against what was done, including changes from the original selection.
A benchmark reports workloads and correctness; a diagnostic report needs the
reference, threshold and table; qualitative work needs contextual evidence;
mixed methods needs integrated findings and contradictions. Inspect
`python research.py designs --pattern PATTERN` when available. Do not turn a
catalog suggestion or unexecuted example plan into a methods/results claim.

## Follow the subject and report paths

When working in an Open Research checkout, inspect `python research.py guides`
and the selected path with `--path medical`, `engineering`, `materials`,
`chemistry`, `physics`, `theory`, `research-papers` or `review-papers`. Match the
required records and checks to the actual claim; theoretical work crosses fields.
Chemistry includes organic, physical and experimental/analytical branches.

Use `python research.py draft STUDY --kind research --format quarto --output build/paper.qmd`
(or `--kind review`, `--format markdown`) for an evidence-led authoring scaffold.
Check the actual question, claim statuses and source locators. Missing observations
stay missing. Quarto rendering is optional and does not run study code in the
generated scaffold. Apply the current venue format only after checking evidence.
