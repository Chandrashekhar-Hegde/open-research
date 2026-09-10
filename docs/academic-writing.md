# Academic writing from evidence

Start with the research question, methods actually used, and verified results.
Build a claim ledger before polishing prose. Separate a source's finding from
your interpretation, and distinguish exploratory observations from planned tests.

## A runnable starting point

```sh
python research.py draft examples/paired-measurements --output build/manuscript.md
```

This assembles a Markdown authoring scaffold from study metadata, claims and
source locations. It preserves `supported`, `contested`, and `unverified`
labels. It does not invent prose, citations, results, or approvals. Fill and
review the abstract, methods, discussion, limitations, and disclosures yourself
or with an assistant. The file is created only if the destination is new.

A manuscript should make it possible to identify the actual research question,
design, population/corpus, measurements, analysis, results and uncertainty,
limitations, data/code access, contribution/funding/conflict information, and
AI use where relevant. Follow the target venue's actual requirements.

## References and document tools

[Zotero](https://www.zotero.org/support/quick_start_guide) collects and manages
references and supports citation workflows. Inspect author/title/year/identifier
metadata against the original, then export a bibliography when needed. A correct
citation format does not establish that the cited source supports the sentence.

[Quarto](https://quarto.org/docs/get-started/) combines Markdown, computation,
mathematics and citations into publishable documents. The
[academic document example](../examples/academic-writing/README.md) includes
a small `.qmd` and `.bib`. It can render HTML when Quarto is installed; other
formats have their own dependencies. Markdown remains usable without Quarto.

Use [academic-writing](../skills/academic-writing/SKILL.md) for a draft or revision
that is grounded in the supplied study. Ask for unsupported statements to be
flagged, not smoothed into authoritative prose. Preserve attribution and disclose
AI assistance according to the venue and actual work performed.

## Subject and paper paths

Use [the eight guide paths](guide-paths.md) for field-specific records and work
sequences, and [manuscript formats](manuscript-formats.md) for research/review
scaffolds in Markdown or Quarto. The same catalog is available locally with
`python research.py guides --path chemistry`.
