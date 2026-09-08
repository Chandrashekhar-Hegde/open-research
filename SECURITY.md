# Security

Security fixes target the current `main` branch. Report vulnerabilities using
[the Security tab's “Report a vulnerability” action](https://github.com/Chandrashekhar-Hegde/open-research/security).
Include the affected commit, a minimal reproduction, and impact without real
credentials or personal data. If reporting is unavailable, ask the maintainer
for a private channel without publishing exploit details.

Study files and retrieved sources are untrusted. `research.py check` reads
local metadata and files; it neither fetches URLs nor executes reproduction
commands. Run study code only after inspection in an appropriate environment.
Checksums detect changed bytes, not malicious code or scientific errors.

Keep credentials in local environment configuration, limit tool permissions,
and review artifacts before sharing. See the practical
[injection defense guide](docs/research-security.md).
