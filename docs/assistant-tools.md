# Use Claude Code, Codex or OpenCode

Use the same study records and eight research skills across hosts. The host reads
instructions and can execute permitted commands; Python performs the calculation.
The website is a local editor and does not run an assistant or Python service.
[Public setup guide](https://chandrashekhar-hegde.github.io/open-research/tools.html)
· [Verification record](integration-verification.md).

## 1. Establish the working baseline

Install Git and Python 3.11+; use `python3` if your system requires that name.

```sh
git clone https://github.com/Chandrashekhar-Hegde/open-research.git
cd open-research
python research.py doctor
python scripts/verify_workflow.py
```

The second command exercises installation, browser import, calculation, invalid
input rejection and writing without a model or account. A PASS establishes the
listed mechanical checks, not sound scientific inference.

## 2. Choose a host

Install and sign in using your chosen tool's official instructions. A host may
require a subscription or provider account; this repository supplies neither.
Run the following from the checkout. Installing skills copies eight local files;
it does not install a CLI, log you in, select a model or grant tool permissions.

### Claude Code

Follow [Claude Code setup](https://code.claude.com/docs/en/setup), then:

```sh
claude --version
python research.py install-skills --tool claude
claude
```

The files go in `.claude/skills/<name>/SKILL.md`. In the interactive session, enter:

```text
/reproduce-analysis Reproduce examples/noaa-co2. Read its protocol and code,
run the checks, and report actual exit statuses, computed values and limitations.
```

`CLAUDE.md` points to this project's shared rules. If the skill is absent, check
the launch directory, project skill settings and same-name overrides; restart
the session after installation. Confirm the session loads the intended local
file. See [Claude skill discovery](https://code.claude.com/docs/en/skills).

For terminal automation after reviewing the project and its settings:

```sh
claude -p 'Use the reproduce-analysis skill for examples/noaa-co2; run its reviewed checks and report outputs and limits.' --output-format json
```

Review permissions in your environment; noninteractive runs may be unable to
approve execution. Do not interpret a prose answer as proof that it ran. Do not
use bare mode for this project-discovery recipe: it changes skill and account
loading. [Programmatic usage](https://code.claude.com/docs/en/headless).

### Codex

Follow [Codex CLI setup](https://developers.openai.com/codex/cli), then:

```sh
codex --version
python research.py install-skills --tool codex
codex
```

The files go in `.agents/skills/<name>/SKILL.md`. In the session, enter:

```text
$reproduce-analysis Reproduce examples/noaa-co2. Read its protocol and code,
run the checks, and report actual exit statuses, computed values and limitations.
```

Launch in the checkout so its `AGENTS.md` and project skills are discoverable.
Restart if newly installed skills do not appear. [Skill discovery](https://developers.openai.com/codex/skills/).

For a recorded read-only terminal run (POSIX shell; single quotes preserve `$`):

```sh
codex exec --sandbox read-only --ephemeral --json '$reproduce-analysis Reproduce examples/noaa-co2; execute the reviewed checks and report computed outputs and limits.'
```

Inspect the command-execution events, exit statuses and final result. Read-only
mode suits this rehearsal; writing a new study needs separately appropriate
workspace permissions. [Noninteractive usage](https://developers.openai.com/codex/noninteractive/).

### OpenCode

Follow [OpenCode installation and provider setup](https://opencode.ai/docs/), then:

```sh
opencode --version
python research.py install-skills --tool opencode
opencode
```

The files go in `.opencode/skills/<name>/SKILL.md`. Ask:

```text
Load the reproduce-analysis skill with your skill tool. Reproduce
examples/noaa-co2 after reading its protocol and code. Execute the checks
and report actual exit statuses, computed values and limitations.
```

OpenCode loads skills through its `skill` tool. If unavailable, inspect skill
permissions and the current project directory. This is a skill request, not a
custom slash command. [Skill discovery](https://opencode.ai/docs/skills/).
A terminal alternative is:

```sh
opencode run 'Load reproduce-analysis with the skill tool; reproduce examples/noaa-co2 and report executed outputs and limits.'
```

Select a configured provider/model in OpenCode first. [CLI reference](https://opencode.ai/docs/cli/).
This host's live model execution has not been tested here.

### Other tools and existing research projects

A tool that accepts Markdown can read `agents/lurch.md` and the relevant
`skills/<name>/SKILL.md` explicitly. Native discovery is host-specific; no claim
is made that arbitrary tools support the same syntax or permissions.

```sh
python research.py install-skills --directory instructions/skills --project /path/to/project
```

For a supported host, use `--tool claude`, `--tool codex` or `--tool opencode`
instead of `--directory`. These options are mutually exclusive. Installing into
another project copies instructions only; it does not copy the CLI, examples or
Lurch profile. Provide the absolute path to your Open Research checkout and run
its CLI there, passing the actual study path. Follow that project's own rules.
Choose one native skill location per host to avoid confusing duplicate entries.

Identical files are left intact. Differing files cause an error before copying;
review and move your customized copy before intentionally installing an update.
No global configuration or API credentials are written. Generated project skill
directories are ignored by this repository; canonical skills remain in `skills/`.

## 3. Carry your actual question into the tool

1. In the browser, complete the current stage and save editable JSON.
2. Import it locally: `python research.py import-browser /path/to/study.study.json studies/my-study`.
3. In the editor's local-tools panel, choose your host and copy the task. It
   includes your question, current stage and recorded decisions. Paste it into
   the host running in this checkout, naming `studies/my-study` as the workspace.
4. Ask the host to read `AGENTS.md`, `agents/lurch.md` and the indicated skill.
   Resolve missing study metadata and methods before collecting or analyzing.
5. Review executed commands and generated artifacts. Record changes in the
   journal and evidence ledger. Summarize verified findings back in Analyze.

The browser and filesystem do not synchronize automatically. Copying a brief
transfers context only; it does not execute anything. A host may send supplied
context to its model provider. Use only material permitted in that environment.

## 4. Choose the procedure by the work needed

| Work and skill | Supply | Require before moving on |
| --- | --- | --- |
| Plan — `research-protocol` | Question, prior evidence, resources, design constraints | Protocol with units, outcomes, sampling/precision rationale, analysis and stopping rules; missing choices explicitly unresolved |
| Review literature — `evidence-synthesis` | Search scope, dates, eligibility and accessible sources | Search/screening record, exact source locations, extraction and bias assessment; no review claims based on abstracts alone |
| Inspect — `data-understanding` | Permitted data and dictionary | `python research.py profile path/to/input.csv`, units, missingness and exclusions; original data preserved |
| Math — `mathematical-analysis` | Definitions, assumptions and domain | Derivation plus boundary/counterexample checks; distinguish symbolic identities, numerical approximations and empirical claims |
| Reproduce — `reproduce-analysis` | Protocol, frozen input, code, expected output | Actual execution log and comparison; mismatches investigated without changing the expected answer |
| Write — `academic-writing` | Verified findings, sources and limits | Claim-linked draft; `python research.py draft studies/my-study --output build/draft.md` creates a scaffold only |
| Build — `research-tool-building` | Narrow task, input/output contract and known answer | Runnable code, dependency record and a test that catches wrong results or invalid inputs |
| Review — `research-release` | Complete permitted artifacts | `python research.py check studies/my-study --release`, unresolved issues and truthful review/disclosure records |

The mathematical, factorial-design and game-theory examples are teaching code,
not evidence about the world. Use the [methodology guide](methodology.md) to justify
your actual study design. These procedures cannot conduct recruitment, obtain
permissions, verify unavailable papers or turn invented observations into evidence.

## 5. Decide whether a run worked

For the NOAA rehearsal, require a loaded local skill, actual commands, exit 0,
24 input months, means 424.6042 and 427.3492 ppm, difference 2.745 ppm, and explicit
station/time-series limitations. Run `python scripts/verify_workflow.py` yourself
as the independent executable check; do not accept a quoted expected answer.

If execution is denied, authenticate/configure the tool through its normal UI,
review the requested operation, or run the Python command yourself and provide
its output. Do not disable safeguards to obtain a green status. A missing package
or model response is an environment failure, not a finding. Keep claims unverified
when sources or computations cannot be checked.

[Observed integration results and limits](integration-verification.md).

## Design-aware task handoffs

The editor now includes area, subsection, goal and selected pattern. Analyze
routes proofs/simulations/games to mathematical analysis, reviews to evidence
synthesis, qualitative/mixed interpretation to data understanding, and executable
comparisons to reproduction. Inspect routes review evidence to evidence synthesis.
These routes choose an instruction procedure, not a statistical test or approval.
Use `python research.py designs --pattern PATTERN` for the same guidance locally.

## Subject and paper paths

Use [the eight guide paths](guide-paths.md) for field-specific records and work
sequences, and [manuscript formats](manuscript-formats.md) for research/review
scaffolds in Markdown or Quarto. The same catalog is available locally with
`python research.py guides --path chemistry`.
