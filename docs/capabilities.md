# From a task to code and a research artifact

The backend here is an offline Python CLI, not a remote service. The website is
static and never submits study text to a server. Markdown skills describe a
procedure; the linked Python files implement the available operations.

| Work | Procedure | Actual code / command | Record produced or required |
| --- | --- | --- | --- |
| Select a design | [Area and goal guide](study-designs.md) | [Catalog CLI](../scripts/study_catalog.py): `python research.py designs --domain engineering --goal effect` | Explained patterns; selection still needs justified prerequisites |
| Rehearse pattern calculations | [Teaching examples](../examples/study-patterns/README.md) | [Executable calculations](../examples/study-patterns/analyze.py) | Diagnostic table, prediction error, search probes and numerical convergence; synthetic/model inputs |
| Frame and plan | [research-protocol](../skills/research-protocol/SKILL.md) | [CLI](../scripts/research.py): `python research.py init studies/my-study --title "My question"` | Incomplete study folder to fill |
| Move web work locally | [Setup](tool-setup.md) | [Importer](../scripts/import_study.py): `python research.py import-browser draft.study.json studies/my-study` | Exact question, mapped notes, original backup |
| Inspect data | [data-understanding](../skills/data-understanding/SKILL.md) | [CSV profiler](../scripts/workbench.py): `python research.py profile data.csv` | Shape, missingness, duplicates, descriptive summaries |
| Reanalyze real observations | [reproduce-analysis](../skills/reproduce-analysis/SKILL.md) | [NOAA analysis](../examples/noaa-co2/analyze.py): `python examples/noaa-co2/analyze.py --check` | Frozen source → executed descriptive result |
| Plan factor combinations | [Design guidance](methodology.md#controlled-experiment) | [Factorial schedule](../examples/experimental-design/design.py) | Teaching run schedule; actual allocation and observations still required |
| Model strategic decisions | [mathematical-analysis](../skills/mathematical-analysis/SKILL.md) | [Pure-equilibrium solver](../examples/game-theory/analyze.py) | Equilibria of supplied toy matrices; payoffs need justification |
| Verify symbolic work | [Mathematics](mathematics.md) | [Symbolic checks](../examples/mathematics/verify.py) | Known-answer identities, roots and residuals; requires SymPy |
| Synthesize literature | [evidence-synthesis](../skills/evidence-synthesis/SKILL.md) | [Evidence/claim validation](../scripts/research.py): `python research.py check PATH` | Human-inspected sources and claims; no database search or automatic bias appraisal |
| Write from evidence | [academic-writing](../skills/academic-writing/SKILL.md) | [Draft assembly](../scripts/workbench.py): `python research.py draft PATH --output build/paper.md` | Scaffold from recorded claims; methods and interpretation need authors |
| Log decisions | [Daily workflow](daily-workflow.md) | `python research.py journal PATH --note "Decision" --next "Action"` | Dated JSONL; single-writer local log |
| Review and release | [research-release](../skills/research-release/SKILL.md) | `python research.py check PATH --release` | Structural/evidence-reference/hash checks; scientific review remains separate |
| Extend the tooling | [research-tool-building](../skills/research-tool-building/SKILL.md) | [Small-tool recipe](building-tools.md) | Tested CLI with declared inputs, outputs and limits |

## Connecting examples to real studies

The [NOAA folder](../examples/noaa-co2/README.md) is a complete small reanalysis
of actual public observations. It supplies the question, retrospective protocol,
input rights/provenance, code, results, claim/evidence ledgers and review scope.

The [paired measurements](../examples/paired-measurements/README.md) are synthetic
fixtures for learning file structure and testing arithmetic. The experiment
schedule contains planned runs, not collected observations. The game and symbolic
examples demonstrate mathematical statements under declared assumptions. None is
evidence for an empirical intervention effect.

For your own study, copy the structure, not the conclusion. Replace the question,
justify the design, obtain permitted observations or sources, inspect and execute
the analysis, then support new claims with the resulting evidence. Record which
parts were adapted and what was checked.

## Subject and paper paths

Use [the eight guide paths](guide-paths.md) for field-specific records and work
sequences, and [manuscript formats](manuscript-formats.md) for research/review
scaffolds in Markdown or Quarto. The same catalog is available locally with
`python research.py guides --path chemistry`.
