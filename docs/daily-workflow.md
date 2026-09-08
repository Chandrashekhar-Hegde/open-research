# A practical research day

Use this loop whether you are a student, independent researcher, analyst, or
research software developer. The purpose is to keep decisions and evidence
visible, not to create paperwork for every thought.

## Begin with one question

Write what you want to understand, what you already know, and what would change
your mind. For example: “What changes between the two measurements in this
supplied dataset?” is answerable by description; “Did treatment cause the
change?” requires a design that can support causal inference.

```sh
python research.py init studies/measurement-study --title "Changes between measurements"
```

Fill `study.json`, `protocol.md`, and `analysis-plan.md`. State whether this is
exploration or a planned test. Record inclusion, measurement units, comparison,
uncertainty, stopping, access, and limits. A local protocol is not a formal
preregistration. [Protocol skill](../skills/research-protocol/SKILL.md).

## Understand before calculating

Inspect the data dictionary, provenance, permissions, units, identifiers,
missingness, and collection process. Start with a profile:

```sh
python research.py profile examples/paired-measurements/data/raw.csv --output build/profile.json
```

A blank-free table can still be biased or wrongly measured. If working from
papers, record exact searches, screening decisions, source locations, and
contradictions instead. Keep observations separate from interpretations.

## Do one reproducible piece of work

Use a plain script for a repeatable calculation; use a notebook for exploration
when its interactivity helps. Preserve raw inputs and record transformations.
Choose mathematics and statistics to match the question. Inspect assumptions
and verify at least one result independently.

```sh
python examples/paired-measurements/analyze.py --check
```

That command verifies a complete teaching example, not your new study. For
your own study, write the appropriate analysis and expected checks, then
record the exact reproduction command and environment.

## Interpret and write

Update `evidence.csv` and `claims.csv`. Name source locations and the limitations
of each claim. Include null results and contradictions. Scaffold writing only
after the source records are usable:

```sh
python research.py draft examples/paired-measurements --output build/manuscript.md
```

The scaffold labels recorded findings and leaves abstract, methods, discussion,
and disclosures for the author. Verify all prose and use your discipline's
reporting requirements. See [academic writing](academic-writing.md).

## End with a handoff

```sh
python research.py journal studies/measurement-study --note "Inspected units and missingness; design still exploratory" --next "Choose inclusion rules before comparing groups"
```

The command appends a UTC-dated JSON line in `journal.jsonl`. Record what changed,
what failed, which claims remain uncertain, and the next useful action. Tomorrow,
read the journal and protocol before repeating work. Keep private drafts local;
share a reviewed, licensed copy when it is ready.

## A reasonable stopping point

A day can end with a narrower question, an access limitation, a disproved
assumption, or a failed replication. Record it honestly. A publishable result
is not the required output of every research session.
