# Choose your tools

The core needs Python 3.11+. Git is convenient, but the GitHub ZIP also works.
Commands below run from the extracted/cloned repository root. Use `python3`
instead of `python` if necessary. Start with `python research.py doctor`.

## Standalone

```sh
python research.py init studies/my-study --title "My research question"
python research.py profile examples/paired-measurements/data/raw.csv
python examples/paired-measurements/analyze.py --check
python research.py draft examples/paired-measurements --output build/draft.md
```

Edit study files in any text editor. There is no model or network call in these
commands. A draft study needs metadata, a protocol, and an analysis plan before
validation passes. [Full command reference](study-format.md).

## Codex

Install and authenticate Codex using its [official CLI guide](https://developers.openai.com/codex/cli/).
Open this folder in the Codex app, or use the CLI:

```sh
python research.py install-skills --tool codex
codex
```

Codex reads project instructions from `AGENTS.md`; local skills are discovered
under `.agents/skills`. See the official
[skills guide](https://learn.chatgpt.com/docs/build-skills) and
[AGENTS.md guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
Ask it to use `research-protocol` for your question, or point to the skill file.
For a batch task, with your account and usual host permissions configured:

```sh
codex exec "Read AGENTS.md. Use the reproduce-analysis skill to inspect the paired-measurements example and run its checks. Report limitations."
```

## Claude Code

Install and authenticate using [Claude Code's setup guide](https://code.claude.com/docs/en/setup).

```sh
python research.py install-skills --tool claude
claude
```

The repository's `CLAUDE.md` points to shared research instructions. The installer
copies skills to `.claude/skills`. Invoke `/research-protocol` in an interactive
session or ask for a skill by name. Batch use:

```sh
claude -p "Read AGENTS.md. Use the evidence-synthesis skill on the supplied sources. Return claims with exact source locations and missing evidence."
```

This follows [Claude Code's skill conventions](https://code.claude.com/docs/en/skills).
Keep normal permission checks; this project installs no automatic command hooks.

## OpenCode

Install and configure a provider through [OpenCode](https://opencode.ai/docs/).

```sh
python research.py install-skills --tool opencode
opencode
```

Skills go to `.opencode/skills`. Ask OpenCode to load `data-understanding` or
another skill appropriate to the task. For a batch run:

```sh
opencode run "Read AGENTS.md. Use the reproduce-analysis skill to inspect the paired-measurements example and run its checks. Explain uncertainty."
```

See the official [skills](https://opencode.ai/docs/skills/) and
[CLI](https://opencode.ai/docs/cli/) documentation. Provider/model availability
is controlled by your OpenCode setup. No provider credentials are bundled.

## Chat-only and other assistants

Give the assistant the relevant `skills/<name>/SKILL.md`, your question, and
only the data/sources you can share. Ask it to return editable artifacts.
Run proposed commands yourself after inspection if the chat cannot execute them.
Do not claim execution, source access, or skill auto-discovery where unavailable.
Claude's chat application and Claude Code are different environments; the
project-local installer targets the CLI, not a chat account's settings.

## Use skills in another project

```sh
python research.py install-skills --tool codex --project /path/to/research-project
```

Choose exactly the host you use. The eight skill files are self-contained.
The installer does not copy this repository's scripts or study examples; copy
the repository or supply its path if your task needs them. It never edits global
configuration, credentials, or host permissions. Identical installed skills
are left alone; differing files produce an error so custom work is preserved.
To update, review/move your existing skill and rerun. Do not install all host
copies into one project unnecessarily: some hosts discover multiple directories.

## What was actually tested

The installer is tested in isolated folders for all three host layouts,
including repeated installs, conflicts, and path escapes. The documented
interactive/batch syntax was checked against official docs; local Codex
0.153.4 and Claude Code 2.1.252 help output was inspected during development.
No paid model session or live OpenCode model workflow is claimed as validated.
The offline CLI, mathematics example, and CI are tested separately.
