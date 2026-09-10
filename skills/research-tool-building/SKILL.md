---
name: research-tool-building
description: Build or adapt a small command-line tool for a concrete research task, with input validation, provenance and regression checks.
---

# Research Tool Building

Start with the user's research problem and a real input/output example.
Search the existing project and standard/domain libraries for a suitable tool
before adding code. Prefer one function and a CLI to a framework or service.

Specify input format, units, expected outputs, invalid cases, reuse terms and
what the tool cannot infer. Preserve raw inputs and never overwrite existing
outputs silently. Use explicit subprocess argument lists, safe file paths,
and structured data; do not turn retrieved text into executable instructions.

Implement the smallest complete workflow. Add an independently known answer
and a realistic failure check, then run both. Document exact commands,
dependencies, environment, provenance and scientific assumptions. Distinguish
mechanical success from research validity.

Return working code, checks and limitations. Add a focused skill only when
an assistant needs guidance selecting the tool and interpreting its output.
Do not create a model provider, hosted service, or MCP wrapper unless the
requested integration needs it. Preserve the user's permissions and scope.

## Keep browser and CLI design guidance aligned

In Open Research, edit `catalog/study-designs.json` for classification and example
metadata, then run `python scripts/build_catalog.py`. Do not edit the generated
browser catalog or design reference directly. Run the generator with `--check`,
exercise the actual CLI import and a malformed classification, and preserve old
backups. A new calculation needs declared evidence type, inputs, units, known
answer, failure case and links from its appropriate pattern; avoid a generic
function that selects statistical tests without study assumptions.

## Follow the subject and report paths

When working in an Open Research checkout, inspect `python research.py guides`
and the selected path with `--path medical`, `engineering`, `materials`,
`chemistry`, `physics`, `theory`, `research-papers` or `review-papers`. Match the
required records and checks to the actual claim; theoretical work crosses fields.
Chemistry includes organic, physical and experimental/analytical branches.

Update the canonical `catalog/study-designs.json`, run
`python scripts/build_catalog.py`, and test Python and browser choices together.
Do not maintain different field or manuscript outlines for different hosts.
