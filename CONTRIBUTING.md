# Contributing

Contribute a reproducible example, a focused research skill, a correction with
source evidence, or a fix to the tooling. Scope new material around an actual
research task and a useful artifact. Negative results and failed replications
are welcome when their methods and limitations are documented.

For a real workflow experience, use the [feedback form](https://github.com/Chandrashekhar-Hegde/open-research/issues/new?template=feedback.yml).
Describe the task, observed friction, and what was unnecessary. Issues are public;
share only permitted, redacted examples. The [community evaluation plan](docs/community-needs.md)
distinguishes published researcher feedback from still-uncollected project-user
observations. No generated testimonials or invented user-study results.

1. Open an issue for a substantial new direction; small fixes can go straight
   to a feature branch and pull request.
2. Read [the handbook](docs/README.md) and the closest example. Keep Markdown
   concise and use relative links. General documents need no YAML front matter;
   skills require `name` and `description`.
3. Cite original sources for factual claims, with specific locations in study
   evidence ledgers. Mark extrapolation and unverified evidence explicitly.
4. For code, use Python 3.11+ and the standard library unless a demonstrated
   research need requires more. Add a runnable regression check for new logic.
5. Run `python3 scripts/check_repo.py` and
   `python3 -m unittest discover -s tests -v`.
6. Describe the question or defect, resulting behavior, evidence, checks,
   limitations, and AI assistance in the PR. Disclose changes to protocols.

Study submissions need redistribution rights, provenance, a data dictionary,
reproduction commands, supported claims, and a review record. Restricted raw
data belongs outside Git; explain the access process and provide a permissible
synthetic example when possible. Do not upload participant information, access
tokens, copyrighted paper collections, or data without distribution permission.

New skills must have a distinct trigger and explain required inputs, outputs,
uncertainty handling, and a realistic verification step. Copying a skill into
a different agent environment does not guarantee its tools or discovery rules.
Document the actual environment tested.

The maintainer reviews scope and evidence under [governance](GOVERNANCE.md).
There is no guaranteed response time, certification, or implied peer review.
By contributing your own work, you offer it under the repository's [MIT license](LICENSE);
identify third-party materials and their separate terms.
