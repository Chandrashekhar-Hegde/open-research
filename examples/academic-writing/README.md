# Academic document example

The local `draft` command creates a manuscript scaffold from study evidence:

```sh
python research.py draft examples/paired-measurements --output build/manuscript.md
```

For a typeset example with a bibliography, install
[Quarto](https://quarto.org/docs/get-started/) separately, then run from the
repository root:

```sh
quarto render examples/academic-writing/paper.qmd --to html
```

Open the resulting `paper.html` next to the source. This example has no embedded
code execution; its reported calculation is independently reproduced by the
paired-measurements script. The bibliography cites a verified UNESCO reference
for open science, not as evidence for invented measurements. Inspect
[paper.qmd](paper.qmd) and [references.bib](references.bib).

Other Quarto outputs, including PDF, may require additional software. This
repository does not install a TeX distribution or promise venue-specific formatting.
Follow [the writing guide](../../docs/academic-writing.md) for real work.
