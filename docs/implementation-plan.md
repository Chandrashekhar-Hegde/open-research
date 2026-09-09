# Open Research implementation plan

Research and planning date: 2026-09-08.

The first workbench is implemented. The next evidence-led iteration is recorded
in [community needs and evaluation](community-needs.md). Direct feedback then
led to the [study-editor redesign](usability-redesign.md): one saved draft,
stage-specific review, actual protocol fields and faithful exports. The initial
command chooser described below is superseded on the hosted site.

## Problem and audience

A researcher needs a repeatable daily path from an uncertain question to an
inspectable result: understand a source or dataset, define a study, inspect
quality, calculate, interpret, write, and share. A library of instructions
alone leaves too much setup and too few executable examples. The project must
work without an AI subscription while allowing existing assistants to use the
same files and commands.

## Research findings and decisions

| Existing project | What to reuse | Decision |
| --- | --- | --- |
| [Cookiecutter Data Science](https://cookiecutter-data-science.drivendata.org/) | Reproducible project organization | Separate raw inputs, code, outputs and reports; avoid a second template framework |
| [Jupyter](https://jupyter.org/) | Interactive computational exploration | Document the notebook-to-script workflow; do not require Jupyter for basic commands |
| [Quarto](https://quarto.org/docs/get-started/) | Computation, citations, scholarly output | Provide an optional academic document example; keep Markdown usable alone |
| [Zotero](https://www.zotero.org/support/quick_start_guide) | Source collection and citation management | Explain verified metadata and BibTeX export; do not build a citation database |
| [SymPy](https://docs.sympy.org/latest/tutorials/intro-tutorial/calculus.html) | Symbolic mathematics | Use a pinned optional dependency and executable exact-result checks |
| [SciPy](https://docs.scipy.org/doc/scipy/tutorial/stats.html) | Statistical methods | Recommend method-specific use; no automatic significance testing |
| [Codex](https://learn.chatgpt.com/docs/build-skills), [Claude Code](https://code.claude.com/docs/en/skills), [OpenCode](https://opencode.ai/docs/skills/) | Native skill discovery and local CLI execution | Install project-local copies into the chosen host directory; keep one canonical skill library |
| [UNESCO open science](https://www.unesco.org/en/open-science/about) | Transparent, inclusive and reusable research | Expose evidence, methods, limitations and responsible access |

These sources establish available capabilities, not that an AI workflow is
scientifically validated. Host integration paths are checked against official
docs; model behavior is reported separately from deterministic tool tests.

## Planned implementation

1. **Public identity:** present Open Research as a standalone MIT project.
   Remove unrelated historical branding, migration prose and old commit links.
   Keep useful research security guidance under research-oriented navigation.
2. **One entry point:** add `python research.py` with existing `init` and `check`
   plus `doctor`, `install-skills`, `profile`, `journal`, and `draft`.
   Keep the core Python 3.11+ standard-library only. Never silently overwrite
   user work, execute arbitrary study commands, or install model providers.
3. **Daily workflow:** document morning question/scope, evidence/data inspection,
   protocol, analysis, interpretation, writing and end-of-day handoff. Provide
   realistic commands and expected artifacts, including failed/inconclusive work.
4. **Host integration:** project-local skill copying for Codex, Claude Code and
   OpenCode; a CLAUDE.md entry point and AGENTS.md conventions; interactive and
   batch CLI examples; chat-only and no-AI alternatives. Expose installed and
   missing executables via `doctor`, without reading credentials.
5. **Data understanding:** inspect CSV shape, missing values, duplicate rows,
   inferred numeric columns, nonfinite values and descriptive statistics.
   Report inference limitations. Produce JSON for reuse without changing input.
6. **Academic writing:** scaffold a manuscript from the existing claim/evidence
   ledgers, marking sections requiring author work. Never generate fake studies,
   references or abstract conclusions. Provide a Quarto example with verified
   bibliography and an optional rendering path.
7. **Mathematics:** a runnable SymPy example for differentiation, integration,
   equations and linear algebra with exact expected answers and assumptions.
   Document numerical versus symbolic methods, units and verification.
8. **Extensibility:** show how to add a small research CLI, independent checks,
   provenance and a narrowly triggered skill; avoid an agent framework or server.
9. **Public guide:** a static GitHub Pages workbench with tool/task selectors,
   copyable commands, a local daily checklist and downloadable plan. No account,
   uploads, analytics, model calls or backend. Keep substantive handbook pages
   in Markdown and link readers directly to their editable source.
10. **Validation:** regression checks for data quality, safe non-overwrite skill
    installation, malformed data, manuscript evidence links and journal records;
    exact math checks; clean-clone runs; link checks; CI on three operating
    systems; verify the published Pages endpoint and downloadable sources.
11. **Publication:** prepare and test the complete tree before replacing public
    history. Publish a single initial commit on main, remove legacy branches,
    PRs/issues/actions through repository recreation if account access permits,
    configure public GitHub Pages and re-enable security reporting. No old Git
    history is merged into the fresh project. Third-party forks and caches are
    outside the owner's control and cannot be claimed erased.

## Acceptance criteria

- A new reader can choose standalone, Codex, Claude Code or OpenCode and get
  exact setup/usage instructions with prerequisites and honest test status.
- CSV profiling, daily logging, draft scaffolding, the paired study and symbolic
  math actually run. Expected results are checked independently.
- The public guide exposes actionable controls immediately and works on mobile,
  with keyboard controls, readable text, and no dependence on a model service.
- Documentation clearly separates calculations, evidence, interpretation,
  exploratory versus confirmatory work, and human review.
- The public repository is open source and presents only Open Research content.
  Remote main has a new root, with history/record removal verified to the extent
  GitHub access allows. The public Pages site is deployed and reachable.

## Deliberate limits

No universal automated scientist, arbitrary-expression evaluator, literature
search backend, model benchmark, real participant study, or automatic journal
submission is built. Use domain tools where they are strong; Open Research
connects their artifacts and makes the method inspectable.
