# Use the workbench

## In the browser

Open the [study editor](https://chandrashekhar-hegde.github.io/open-research/).
Read Start here, enter a question, choose a design in Plan, and work through the
stages. The page saves one draft in this browser. Nothing is uploaded. Copy the
Markdown document or save editable JSON before clearing browser data or changing
devices. Open study JSON restores that backup. A browser draft is not a registered
protocol, completed study or cloud backup.

Use the [real-data walkthrough](../examples/noaa-co2/README.md) to see filled
records connected to executed code. The editor cannot run Python, search academic
databases or collect observations. Those actions happen in your research environment.

## Standalone

Install Python 3.11+ and Git. No package or account is required for the core.

```sh
git clone https://github.com/Chandrashekhar-Hegde/open-research.git
cd open-research
python research.py doctor
python examples/noaa-co2/analyze.py --check
python research.py init studies/my-study --title "My research question"
```

Use `python3` if required by your system. Fill the new study's `study.json`,
protocol and analysis plan; the default template is deliberately incomplete.
Keep originals in `data/`, record sources in `evidence.csv`, and add a small
analysis script appropriate to the design. Then:

```sh
python research.py profile studies/my-study/data/input.csv --output build/profile.json
python research.py journal studies/my-study --note "Checked units and missingness" --next "Resolve exclusions"
python research.py check studies/my-study
python research.py draft studies/my-study --output build/manuscript.md
```

The profile describes a CSV; it does not select a statistical test. Drafting needs
valid study records and produces an authoring scaffold, not a finished paper.
Output paths must be new; rename outputs when retaining an earlier version.

## Continue a browser study locally

Save editable JSON from the editor and run, using its actual file path:

```sh
python research.py import-browser /path/to/my-study.study.json studies/my-study
```

The destination must not exist. This preserves the exact question, imports notes
into protocol/analysis/report documents, and retains all original data in
`browser.study.json`. Source notes remain notes until you extract verified entries
into `evidence.csv` and `claims.csv`. Fill owner, license and access conditions in
`study.json`. Missing information stays incomplete. The importer never executes
commands in the file, invents citations or marks a study complete.

The browser's version-2 backup (with version-1 reads) and the CLI's schema-version-1 manifest serve
different purposes; use this command to connect them. The editor can reopen the
browser backup, but it does not import arbitrary local folders or CLI manifests.

## Named tool integrations

Follow the [Claude Code, Codex and OpenCode guide](assistant-tools.md) for
project-local installation, invoking skills, terminal runs and actual task
recipes. [Verification](integration-verification.md) separates checked file
installation from observed live execution. The [public tools page](https://chandrashekhar-hegde.github.io/open-research/tools.html)
is the browser-friendly version.

## Optional task instructions

Read the relevant [skill](../skills/README.md) yourself or provide it to a tool
that can follow Markdown instructions. [Lurch](../agents/lurch.md) coordinates the
stages; specialist roles help inspect evidence, reproduce analysis and review.
These files do not execute themselves and are not a hosted model service.

```sh
python research.py install-skills --directory .agents/skills
```

Choose a project-relative directory supported by your own tool, using
`--project /path/to/project` for another project. The installer preserves existing
identical files and rejects conflicts or escaping paths. Configure discovery,
accounts and permissions in the chosen tool separately. Supply only permitted
material and require source locations and executed outputs. Tool behavior still
needs evaluation; copying an instruction file is not evidence that it is followed.

## Hosting and teams

For a local site, run from the repository root:

```sh
python -m http.server 8765 --bind 127.0.0.1 --directory site
```

Open `http://127.0.0.1:8765/`. Stop with Ctrl+C. A static host serves HTML, CSS,
JavaScript and example JSON; it cannot run the Python CLI. No backend, database,
API key or server-side upload is configured. Local browser storage is per origin,
so the local and hosted editors have separate drafts.

To publish your copy, fork the repository, enable Actions, and select GitHub
Actions under Settings → Pages. The existing workflow runs checks and publishes
`site/` from main. Update hard-coded upstream links if you want your own fork's
handbook, issues and contact details. Review the diff before pushing: public
repository files and issue content are visible to everyone. For another static
host, upload `site/` unchanged, preserving relative file paths and module types.

For collaboration, exchange permitted JSON/Markdown files or use Git branches and
reviewed merges for local studies. The browser is a single-draft editor, not a
multi-user synchronization service. The repository ignores `studies/` by default;
make a separate appropriately private research repository for real project records.

## Guided study selection

Use Plan's area/subsection and plain-language goal controls before choosing a
specific pattern. [Selection guidance](study-designs.md) is also available through
`python research.py designs`. The same catalog supplies the Python and browser
choices. Analyze shows relevant guidance and examples; browse the complete
[library](https://chandrashekhar-hegde.github.io/open-research/examples.html) for
real-data, synthetic/model and unexecuted-plan examples. Example replacement asks
before discarding the current draft. Save JSON first if you need both versions.
