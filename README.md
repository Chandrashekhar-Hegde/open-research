# Open Research

**Plan the study. Do the work. Show the evidence.**

An open-source research workbench with a browser study editor, an offline Python
CLI, method guidance, reusable task procedures, and code you can inspect and run.

[**Open the study editor →**](https://chandrashekhar-hegde.github.io/open-research/)
· [Start here](https://chandrashekhar-hegde.github.io/open-research/guide.html)
· [Real-data walkthrough](examples/noaa-co2/README.md)
· [Download source](https://github.com/Chandrashekhar-Hegde/open-research/archive/refs/heads/main.zip)

## Your first study

1. Define the question and who needs the answer.
2. In Plan, choose your area and subsection, describe your goal, and compare the explained design choices.
3. Record the protocol before collecting or analyzing outcomes; date changes.
4. Inspect permitted sources/data, execute the analysis, and retain the outputs.
5. Write supported claims, limitations and implications; review before sharing.

The editor follows **Research → Plan → Inspect → Analyze → Write → Review & export**.
You can revisit stages without losing notes. Each has its own review checks.
Missing evidence stays missing. Save editable JSON to back up or move your draft;
the hosted editor stores one draft on your device and uploads nothing.

## Choose your area and design

Plan separates **research area → subsection → goal → design**. Choose among
medical/health, engineering, materials science, chemistry, experimental physics,
software/computing, social/behavioral,
environment/agriculture, mathematics and other/interdisciplinary work. The
[20-pattern guide](docs/study-designs.md) explains when each design fits, what
inputs it needs and how its analysis works. Areas provide context, not automatic
method selection. Analyze shows the selected pattern and relevant examples.

```sh
python research.py designs --domain medical --goal predict
python research.py designs --pattern diagnostic
python research.py init studies/test-study --title "My test question" --domain medical --subarea clinical --pattern diagnostic
```

[Browse 14 examples](https://chandrashekhar-hegde.github.io/open-research/examples.html):
one real-data reanalysis, six executed synthetic/mathematical demonstrations,
and seven unexecuted plans. Each is labeled; no plan is presented as a completed
study. Changing a design preserves notes and clears affected review checks.

## Follow a guide and write the report

[Eight guide paths](docs/guide-paths.md) cover medical/health, engineering,
materials, chemistry (organic, physical and experimental), experimental physics,
theory, research papers and review papers. Each links decisions, records, study
flow, analysis and formatting. Theoretical work crosses subject areas.

```sh
python research.py guides --path chemistry
python research.py draft examples/noaa-co2 --kind research --format quarto --output build/paper.qmd
```

Write also exports Markdown or Quarto scaffolds with your actual question and
notes. [Formatting and rendering](docs/manuscript-formats.md) explains citations,
figures, equations and optional HTML/Word rendering. Missing evidence is never
filled in automatically.

## Run a real reanalysis

Install Python 3.11+ and Git:

```sh
git clone https://github.com/Chandrashekhar-Hegde/open-research.git
cd open-research
python research.py doctor
python examples/noaa-co2/analyze.py --check
python research.py check examples/noaa-co2 --release
```

This reanalysis uses **real NOAA monthly CO₂ observations**, with a frozen input,
provenance, protocol, code, computed output and a bounded descriptive conclusion.
It is retrospective secondary research, not a new experiment or causal discovery.
The other [examples](docs/capabilities.md) teach calculations and are explicitly
labeled synthetic or theoretical.

## Use with your assistant

[Claude Code, Codex and OpenCode setup](docs/assistant-tools.md) covers skill
installation, invocation, real tasks, troubleshooting and execution evidence.
Choose one host from the checkout:

```sh
python research.py install-skills --tool claude
# Or: --tool codex / --tool opencode
python scripts/verify_workflow.py
```

[Observed verification](docs/integration-verification.md): offline installation
and workflow checks pass; one live Codex reproduction passed. Claude Code live
execution is blocked by missing login here; OpenCode live execution is untested.
The skills guide existing hosts; no model service is bundled.

## Bring your own question

```sh
python research.py init studies/my-study --title "My research question"
```

Or save JSON from the browser editor and continue locally:

```sh
python research.py import-browser /path/to/my-study.study.json studies/my-study
```

This creates a new local study with your exact question and notes. Fill missing
metadata and methods, add your permitted data and execute an analysis appropriate
to your design. Nothing is invented or executed during import.
[Full instructions, commands and hosting](docs/tool-setup.md).

## What is actually implemented?

| Component | Does | Does not do |
| --- | --- | --- |
| Browser editor | Saves question, design, evidence, analysis and writing; exports Markdown/JSON | Run Python, collect data or certify a study |
| Python CLI | Imports plans, checks records/hashes, profiles CSV, logs work, assembles writing scaffolds | Choose a valid method automatically |
| Reanalysis code | Executes the documented NOAA comparison offline | Establish causes or replace domain expertise |
| Skills and Lurch roles | Reusable, readable task procedures linked to tools | Execute themselves or provide a model service |
| Method guides | Explain major study families, sequence and implications | Cover every specialized method or approval requirement |

[Capability-to-code map](docs/capabilities.md) · [Eight skills](skills/README.md)
· [Task roles](agents/README.md) · [Study format](docs/study-format.md)

## Why this exists

I started Open Research because I was struggling with my own research: finding
and sourcing papers, understanding them, and deciding what I could rely on.
Reading an entire paper only to find that it did not help my question or support
its claims was deeply frustrating. I built this mainly to give myself a clearer
workflow, then made it open for others facing the same problems.
— Chandrashekhar Hegde

[Read my personal perspective](https://chandrashekhar-hegde.github.io/open-research/about.html#maintainer).

Research becomes hard to trust when conclusions outrun methods, sources cannot
be located, or nobody can reproduce the calculation. This project aims to reduce
that friction through inspectable records and useful tools.
[Research-quality frustrations and evidence](docs/research-quality.md) describe
concrete failure modes without guessing authors' or journals' motives.
[Community evidence](docs/community-needs.md) distinguishes published research
from still-unmeasured benefits of this workbench. We have not demonstrated an
improvement in scientific quality or time saved.

## Learn, extend and share

- [Handbook](docs/README.md): design, synthesis, mathematics, writing and review.
- [Use locally, on the web or with optional task tools](docs/tool-setup.md).
- [Build a research tool](docs/building-tools.md): inputs, narrow computation,
  inspectable outputs and a meaningful regression check.
- [Implementation plan](docs/research-workbench-plan.md) · [Contribute](CONTRIBUTING.md).
- [Feedback](https://github.com/Chandrashekhar-Hegde/open-research/issues/new?template=feedback.yml).

```sh
python scripts/check_repo.py
python -m unittest discover -s tests -v
node --test tests/site.test.mjs
```

The Python core has no required packages. Optional symbolic mathematics and
scholarly rendering use their documented dependencies. CI covers Linux, macOS
and Windows; checks establish only their stated mechanical properties.

## About and contact

Maintained by **Chandrashekhar Hegde**.
[LinkedIn / contact](https://www.linkedin.com/in/hegdechandrashekhar/)
· [GitHub](https://github.com/Chandrashekhar-Hegde)
· [About the project](https://chandrashekhar-hegde.github.io/open-research/about.html#maintainer).

[MIT licensed](LICENSE). Copy and adapt the code; third-party data retain their
own terms. Cite the version using [CITATION.cff](CITATION.cff). Share only material
you have rights to release. Preserve null results, deviations and truthful
contribution records. Open methods make work inspectable; publication is not
scientific approval.
