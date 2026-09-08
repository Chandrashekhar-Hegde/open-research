# Agentic research workflows

[Lurch](../agents/lurch.md) coordinates a study through bounded tasks with
visible artifacts. Start with one assistant and a research record. Delegate
only when the user or environment permits it and a genuinely independent task
benefits from another worker. These are role instructions, not executable
framework configuration.

## Patterns and tradeoffs

| Pattern | Research use | Boundary |
| --- | --- | --- |
| Plan and execute | Protocol → retrieval → extraction → analysis → review | Replan after new evidence; retain deviations |
| ReAct-style tool loop | Search, inspect a source, extract a cited observation | Enforce tool and iteration budgets |
| Reflection | Critique a draft against evidence | Self-critique is not independent validation |
| Multiple agents | Separate extraction or code reproduction tasks | Shared model assumptions can create correlated errors |

[ReAct](https://arxiv.org/abs/2210.03629) studies interleaved reasoning and
acting; [Reflexion](https://arxiv.org/abs/2303.11366) studies agents using verbal
feedback. Their task results do not establish scientific validity for this
workflow. The boundaries and handoff format below are this project's design.

## Task contract

Give each task a question, permitted tools/data, expected artifact, success
check, resource budget, and stop condition. A retriever can read sources;
it does not need publication access. Validate tool arguments and constrain
paths and destinations in the execution layer. Summarize results with source
locations and errors, not just a confident narrative.

Use a handoff record with `task`, `inputs`, `outputs`, `source_ids`, `checks`,
`unresolved`, and `next_action`. Store durable state in the study, including
query logs and protocol deviations. After a context reset, inspect those
artifacts and pending work before repeating searches or edits.

## Failure recovery

- Missing or blocked source: preserve its URL and access failure; narrow the
  claim or obtain another source. Never invent the contents.
- Repeated tool failure: retry transient reads at most twice, then record the
  blocker. Do not repeat writes when their outcome is uncertain.
- Looping plan: stop after the agreed budget, report what evidence is missing,
  and propose a narrower question. Do not equate activity with progress.
- Broken handoff: reject missing source IDs or incompatible units and return
  the specific discrepancy. Validate artifacts before downstream synthesis.
- Conflicting agents: resolve against sources or measurements, not majority
  vote. Preserve unresolved disagreement in the report.
- Suspicious source instruction: apply [injection defenses](research-security.md).

## Model adaptation

Choose the available model and tools based on the task, cost, privacy, and a
small representative evaluation. For reasoning-oriented models, specify the
outcome, constraints, and verification artifacts; do not demand hidden internal
reasoning. For instruction-oriented models, explicit stages and small examples
can clarify the output contract. These are starting hypotheses to test, not
benchmarked superiority claims. Record the actual model/version and settings,
and inspect outputs regardless of model category.

## Verification and human decisions

Test an agent workflow on at least an inaccessible source, a contradictory
source, an injected instruction, and a computation with a known answer.
Record observed behavior. Decisions about ethics, interpretation, authorship,
and sharing remain with the responsible researcher. Respect authorization
already given; the profile itself cannot grant new permissions.
