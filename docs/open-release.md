# Prepare an open research release

Openness includes methods and participation, not only public files.
[UNESCO](https://www.unesco.org/en/open-science/about) recognizes legitimate
restrictions; [FAIR](https://www.gofair.foundation/fair-principles) includes
metadata, access conditions, interoperability, and reuse. A public repository
alone does not satisfy every principle.

Before sharing a study:

1. Inspect every claim against the exact evidence location. Identify
   unsupported claims, contested findings, null results, and limits.
2. Reproduce analyses and compare expected outputs. Record who or what checked
   them, the environment, and discrepancies. Label pending independent review.
3. Confirm consent and redistribution rights. Remove personal data and secrets.
   For restricted data, publish permissible metadata and a real access process.
   Repository licensing does not relicense third-party papers or data.
4. Include the original protocol and deviations, data dictionary, code,
   environment, reproduction commands, source/claim ledgers, and limitations.
5. Record contributors, conflicts/funding where applicable, and AI assistance
   with model/run details actually known. Keep shareable prompts and outputs
   when possible; redact private information and describe omissions.
6. Review the manifest for complete coverage of inputs, code, and outputs;
   verify hashes with `research.py check PATH --release`.
7. Version the result, provide citation metadata, and publish within the
   researcher's authorization. For long-term preservation, deposit permitted
   artifacts in an appropriate archive and record the real persistent
   identifier after it is assigned. A GitHub release is not an archival DOI.

Use standard disciplinary metadata when the project needs it. RO-Crate is an
option for linked research artifact metadata; see the
[RO-Crate specification entry point](https://www.researchobject.org/ro-crate/).
This repository's lightweight study format makes no RO-Crate compliance claim.

A release note should state the research question, included artifacts,
reproduction result, review status, limitations, access conditions, and any
changed conclusions. Corrections should link the affected version and explain
the reason; retain history when it can be retained responsibly.
