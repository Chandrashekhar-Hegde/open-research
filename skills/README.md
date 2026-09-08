# Research skills

A skill is a reusable procedure an assistant can load for a specific research
task. These eight are self-contained Markdown files with standard discovery
metadata. They do not include credentials or execute themselves.

| Skill | Use it to |
| --- | --- |
| [research-protocol](research-protocol/SKILL.md) | Frame a question and plan a study |
| [evidence-synthesis](evidence-synthesis/SKILL.md) | Search, inspect and synthesize sources |
| [data-understanding](data-understanding/SKILL.md) | Assess a dataset before analysis |
| [mathematical-analysis](mathematical-analysis/SKILL.md) | Formulate, compute and verify mathematics |
| [reproduce-analysis](reproduce-analysis/SKILL.md) | Rerun analysis and investigate discrepancies |
| [academic-writing](academic-writing/SKILL.md) | Write from actual methods, results and evidence |
| [research-tool-building](research-tool-building/SKILL.md) | Build a small, tested research CLI |
| [research-release](research-release/SKILL.md) | Prepare reusable, transparent artifacts |

## Install or read directly

Run `python research.py install-skills --tool codex`, replacing `codex` with
`claude` or `opencode` for your host. Choose one host; the project-local copies
are ignored by Git. No global settings or permissions change. Follow the
[setup guide](../docs/tool-setup.md) for invocation, another project, chat-only
use, and limitations. You can also read any skill and follow it manually.

[Lurch](../agents/lurch.md) coordinates the work. Load only the relevant skill.
When adapting one, preserve evidence/provenance conventions and add the actual
discipline's measurement and reporting needs. Test a realistic known answer,
a missing source, and a contradictory or invalid input as applicable.

Metadata and installer tests do not prove a live model follows the procedure.
Record the host, model, actual task, observed output and limitations when doing
behavioral evaluation. Do not describe AI self-review as independent peer review.
