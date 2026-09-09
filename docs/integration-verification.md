# Integration verification — 9 September 2026

These observations test bounded operations. They do not establish general model
reliability, scientific validity, time saved or improved research quality.
[Implementation plan](integration-plan.md) · [Usage guide](assistant-tools.md).

| Layer | Observed result | Limit |
| --- | --- | --- |
| Python workflow | `python scripts/verify_workflow.py` passed | Deterministic example and temporary study only |
| Three host installation paths | Eight byte-identical skills each; second install writes zero | File installation does not prove native discovery or model access |
| Codex CLI 0.153.4 | Live read-only run read the installed skill and executed the NOAA analysis; exit 0 | One task, default model not pinned; not a reliability benchmark |
| Claude Code 2.1.252 | Installed CLI; `claude auth status` reported `loggedIn: false` | No live skill invocation or analysis run through this host |
| OpenCode | Executable absent from PATH | No live skill discovery or model execution tested |

## Repeat the offline check

From a checkout with Python 3.11+:

```sh
python scripts/verify_workflow.py
```

The script invokes the actual public CLI in temporary directories. It checks all
three skill destinations and repeated installation, imports the browser NOAA
study with its exact question, rejects that incomplete import as a release,
appends a journal entry, computes the frozen result into a new file, compares it
with the tracked JSON, rejects a CSV with a missing month, checks artifact hashes,
and creates a writing scaffold from existing evidence. Temporary outputs are
removed after the check. CI also runs this on Linux, macOS and Windows.

## Live execution evidence

A temporary copy of public repository files was initialized as a Git repository.
The eight skills were installed under `.agents/skills`. A `codex exec` call used
`--ignore-user-config --sandbox read-only --ephemeral --json` and the existing
login. The task requested the `reproduce-analysis` skill, inspection of code and
protocol, execution of the two checks, and values with limitations. No network
access was requested for the analysis; the host itself used its model service.

The completed command events show a read of
`.agents/skills/reproduce-analysis/SKILL.md`, Python 3.14.7, and:

| Executed command (bytecode writes disabled) | Exit | Observation |
| --- | --- | --- |
| `python3 examples/noaa-co2/analyze.py --check` | 0 | Frozen result and source checksum match |
| `python3 examples/noaa-co2/analyze.py` | 0 | Computed JSON: 424.6042, 427.3492 and difference 2.745 ppm |
| `python3 research.py check examples/noaa-co2 --release` | 0 | Structural and artifact-hash checks pass |

[Selected command events](integration-run.json) preserve actual computation and
check output. Session identifiers, machine paths and unrelated file-read output
are omitted. This is an excerpt, not a complete independent audit. The final
response described station scope, serial dependence and no causal inference.
No study or expected-result files were changed for this test.

## What remains unverified

Claude Code and OpenCode need authenticated model runs in their own environments.
Their instructions follow linked official documentation; installer tests alone
cannot establish that either host follows the skill. Other models, custom hosts,
private datasets and other study designs require their own evaluation. Model
calls are not part of CI and can vary with model/version, settings and permissions.

For any host, repeat the task from the usage guide and retain version, loaded
skill path, commands, statuses, computed values and mismatches. A response that
only quotes expected results fails the execution criterion. Never fix a failure
by replacing the expected result or inventing evidence. Report a redacted,
reproducible issue through the public feedback form.
