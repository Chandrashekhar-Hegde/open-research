# Study format and CLI

Run commands from the repository root with Python 3.11+. The tool uses only
the standard library. `python3 scripts/research.py --help` lists commands.

```sh
python3 scripts/research.py init studies/my-study --title "Question to investigate"
python3 scripts/research.py check studies/my-study
python3 scripts/research.py check studies/my-study --release
```

`init` refuses any existing destination. It creates an intentionally incomplete
study: validation should fail until its metadata, protocol, and plan are filled.
`check` returns 0 for success and 1 for validation failures. Argument errors
return 2. It reads local files, does not fetch sources, and never executes
commands stored in metadata. It stops reading on malformed or unsafe files.

## Files

| File | Role |
| --- | --- |
| `study.json` | Metadata, reproduction instructions, artifact manifest |
| `protocol.md` | Question, design, outcomes, stopping, access, deviations |
| `analysis-plan.md` | Inputs, transformations, method, uncertainty, reproduction |
| `evidence.csv` | Identifiable sources and exact locations |
| `claims.csv` | Claims, evidence references, support status, limitations |
| `report.md` | Findings, method actually used, limitations, reuse |
| `review.md` | Who or what checked which properties; unresolved findings |
| `ai-use.md` | Actual AI use and verification, or explicit non-use |

These records may be accompanied by raw data, code, environment files,
search/screening logs, a data dictionary, and output artifacts. Required files
and local evidence paths must remain inside the study. Absolute paths, parent
traversal, Windows separators, and escaping symlinks are rejected.

## Metadata version 1

`schema_version` is integer `1`. `title`, `question`, `owner`, `created`,
`license`, and `data_access` are nonempty strings. `created` is an ISO date.
`status` is `draft`, `active`, or `complete`. Use `data_access` to describe
open, restricted, or unavailable data and the reason/access process.

`reproduce` is a list of nonempty strings containing commands or a documented
manual procedure. Specify the working directory, environment, and expected
outputs in the analysis plan. This is a human-readable record, not a shell API.

Each `artifacts` entry has `path`, `sha256`, `role`, `license`, and `provenance`.
Use a relative POSIX path and a lowercase SHA-256 digest of actual bytes.
Record the terms for each artifact separately from the repository license.
Include all raw inputs, analysis code, and reported outputs needed for reuse.
Compute a digest without changing the file:

```sh
python3 -c "import hashlib,pathlib; print(hashlib.sha256(pathlib.Path('path/to/file').read_bytes()).hexdigest())"
```

Do not hash `study.json` inside itself. Version control records its changes.
Hashes must be updated deliberately after inspecting a changed artifact.

## CSV contracts

Use UTF-8 CSV with headers in the exact order below. Quote fields containing
commas or newlines. Source and claim IDs must be nonempty and unique.

- Evidence: `source_id,title,url,accessed,locator,notes`.
  `url` is an HTTP(S) URL or a study-local file path. `accessed` is an ISO date.
  `locator` points to a page, section, rows, table, or timestamp. Record access
  limits in notes. A URL's presence does not prove that its contents were read.
- Claims: `claim_id,claim,source_ids,status,limitations`.
  Separate multiple source IDs with semicolons. `status` is `supported`,
  `contested`, or `unverified`. Supported and contested claims require evidence;
  all listed source IDs must exist. Every claim needs explicit limitations.

## What checks mean

Basic validation checks metadata types, required files, filled protocol/plan
prompts, CSV structure, source references, safe local paths, and the hashes and
provenance of every listed artifact. Empty ledgers are allowed for early work.

Release validation additionally requires `complete` status, reproduction
instructions, nonempty evidence and claim ledgers, filled document prompts,
and manifest entries for the five Markdown records and both CSV ledgers.
Unverified claims remain permitted so unknowns can be disclosed honestly.

The checker cannot establish entailment, ethics approval, completeness of a
manifest, appropriate statistical methods, accurate prose, independent review,
or whether a web source exists. A human must inspect those properties using
the [release checklist](open-release.md). Template marker checking catches
unfilled prompts, not arbitrary weak content.

## Daily workbench commands

The root entry point is `python research.py`; the script under `scripts/` still
accepts the same arguments. The core is Python 3.11+, standard library only.

| Command | Purpose | File effects |
| --- | --- | --- |
| `doctor` | Report runtime and optional CLI availability | None; does not inspect credentials |
| `install-skills --directory .agents/skills --project PATH` | Copy skills into one host's project directory | Creates new skill files; identical files remain, conflicting files cause an error |
| `profile data.csv --output build/profile.json` | Describe CSV shape, blanks, duplicates and finite numeric values | Creates a new JSON file; without output prints JSON |
| `journal STUDY --note TEXT --next TEXT` | Record a research decision and next action | Appends a UTC-dated JSON record to `journal.jsonl` |
| `draft STUDY --output build/manuscript.md` | Assemble claims and source locations into an authoring scaffold | Requires passing basic study checks and a new output file |

For `install-skills`, choose a project-relative directory supported by your tool.
Installed copies do not include this repository's scripts; use the full clone
when you need executable tools. Output commands refuse to overwrite existing
files. The local journal is designed for a single writer. Include a journal
in the release manifest when it contains research decisions needed for reuse.

Profiling is descriptive and keeps all rows in memory. Type inference is a
starting observation, not a data dictionary. See [data understanding](data-understanding.md).
The draft preserves claim statuses and intentionally leaves author sections
incomplete; see [academic writing](academic-writing.md).

## Browser import

`python research.py import-browser draft.study.json studies/new-study` converts
a version-1 or version-2 browser backup into a new local study. See [setup](tool-setup.md).
It preserves the exact question, imports protocol and analysis notes, and retains
the full original backup. Evidence notes must be turned into verified ledgers by
the researcher. The destination must be new; missing metadata stays incomplete.

## Classification and browser version 2

New browser backups have `version: 2`. The existing version-1 format still loads;
the browser adds an undecided classification and empty pattern notes while
preserving the question, method, stage, answers, designs, checks and next actions.
New backups preserve:

```json
{
  "classification": {
    "domain": "medical",
    "subarea": "clinical",
    "goal": "predict",
    "pattern": "diagnostic"
  },
  "patternNotes": {
    "diagnostic": {"reference": "Actual reference procedure", "spectrum": "Sampling decisions"}
  }
}
```

This is a field excerpt, not a complete backup. IDs come from the
[canonical catalog](../catalog/study-designs.json). `undecided` is permitted.
A subsection must belong to its area; a selected pattern must match its goal
and broad method. Domains order candidates, never prohibit cross-disciplinary
methods. Unknown IDs, mismatched selections and malformed notes are rejected.
Changing goals clears the selected pattern/method but retains prior notes;
changing area clears its subsection. Changing classification clears Plan,
Analyze, Write and Review checks. Nothing silently reruns or reinterprets results.

Pattern decisions live under `patternNotes[pattern]`, separate from the existing
broad `designs[method]` notes. Markdown exports the selected pattern's decisions;
JSON retains inactive notes. Copy and download use the same study serializer.

The CLI's local manifest remains `schema_version: 1`, with an optional validated
`classification` object. Old manifests without it remain valid. Import copies
classification into the manifest and protocol and retains the full browser
backup, including inactive notes. It creates an incomplete draft, not a release.
Use the current CLI to import version 2; older versions do not understand it.

`python research.py designs` lists areas, goals and explained candidates;
`--domain`, `--goal` and `--pattern` narrow the guidance. `init` accepts `--domain`,
`--subarea` and `--pattern`; it derives the goal from the chosen pattern and still
requires the actual protocol, data and evidence. No observations are fabricated.

Classified local initialization/import also writes `guide.md` when a matching
subject path exists. It is guidance, not evidence or a completed protocol.
Paper kind and file format in Write are export preferences and are not stored
in browser JSON. Re-select them after reloading or opening another study.
