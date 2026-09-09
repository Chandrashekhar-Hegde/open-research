# Research tool integration plan

The missing connection is between a saved study, a discoverable procedure, and
an executed result. Named tool support concerns usage, not project authorship.

1. Check official Claude Code, Codex and OpenCode discovery and CLI documentation.
2. Add explicit project-local installer targets without changing accounts,
   permissions or global settings; retain the custom-directory interface.
3. Connect the reproduction skill to a real-data calculation and a failure case.
   Add an offline end-to-end rehearsal that anyone can repeat without a model.
4. Attempt bounded assistant runs against public example files. Separate file
   installation, skill loading, command execution and scientific validity. Record
   failures and untested hosts; never infer success from plausible prose.
5. Publish a readable setup page, stage-to-skill recipes, troubleshooting, and
   an evidence record. Connect the editor's tool selection to these instructions.
6. Run Python/site checks, inspect the browser, review and merge the PR, and
   verify the deployed files. Keep claims limited to what those checks establish.

Acceptance: all three installer targets create the same eight procedures; repeated
installation preserves custom work; the CLI reproduces the frozen NOAA result
and rejects a damaged input; exported tasks preserve the actual study question
and selected stage; the public guide states live-host test limits.
