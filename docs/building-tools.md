# Build a small research tool

Start with a repeated task and a concrete input/output example. Reuse a command
or library before inventing a framework. A research tool is useful when another
person can run it, inspect its assumptions, and tell when it failed.

## Minimal recipe

1. Write the question and contract: input format, required fields, units, output,
   invalid cases, and what the tool does not infer.
2. Implement one calculation as an ordinary function. Use the standard library
   or a domain library such as SymPy/SciPy where it already solves the problem.
3. Add a small `argparse` CLI. Keep files explicit, preserve raw inputs, and
   reject malformed input. Pass subprocess arguments as a list; avoid shell
   interpolation and arbitrary expression evaluation.
4. Leave an independent known-answer check and at least one realistic invalid
   input. Test scientific assumptions separately from parser behavior.
5. Document a command, expected result, dependencies, provenance, limitations,
   and reuse terms. Return a nonzero exit code for failure.
6. Add a focused `SKILL.md` only if an assistant needs to select the tool and
   interpret its outputs. Instructions are not an execution service.

The [paired analysis](../examples/paired-measurements/analyze.py),
[workbench operations](../scripts/workbench.py), and
[math example](../examples/mathematics/verify.py) show three small patterns.
Start from the closest real example and adapt it to the actual question.

## Academic and research applications

A source extraction tool should preserve exact locations and access status.
A manuscript tool should preserve evidence labels and never fabricate citations.
An analysis tool should record transformations, missingness, units, and uncertainty.
A mathematics tool should make domains and verification explicit.

Expose a CLI first. An assistant can invoke it through its existing shell tool.
Add an MCP server or UI only when you have a real integration need the CLI cannot
meet. Keep model choice, access controls, and execution permissions in the host.
Use [research-tool-building](../skills/research-tool-building/SKILL.md) when
asking an assistant to implement this bounded workflow.
