# Public study editor

The static site uses HTML, CSS, and JavaScript modules. It has no build step,
external fonts, analytics, data uploads, model calls, or backend.

The main page edits one study through six stages. Fields stay mounted while
switching stages; there is no navigation, forced scrolling, or document reload.
Each stage has distinct review checks and a next action. Editing a stage or
its method clears that stage’s checks; changing the question clears all checks
so previous review is not silently reused for changed work. Plan includes common
protocol fields plus fields for the selected study design. Alternative design
notes are preserved separately.

`study.mjs` defines the data format, validation and document serializer.
`app.mjs` binds it to the interface. The same serializer supplies full Markdown
preview, clipboard copy, and download. Export requires a nonblank question and
marks absent information explicitly; it never substitutes a generic question
or inserts teaching results into a user's study. The review screen presents
readable answers before export; plain Markdown remains available for manual copy.

Drafts save to `open-research-study-v1` in local storage. This includes entered
research text, so use care on shared devices. No research data is uploaded.
A blocked/quota-limited store is reported; current answers remain in memory.
Invalid stored data is preserved, with saving paused instead of silently
replacing it. Updates from another tab pause saving to prevent accidental
replacement. New study and import ask before replacing nonempty work. The old
checklist storage key is untouched and is not interpreted as scientific review.

JSON backups restore all editable content and are validated before replacing
the current draft. This is the **browser editor format**, not the CLI's
`study.json` schema. Save Markdown as a protocol or use it directly with an
assistant; use the repository templates for CLI release validation. Browser
copy/download support varies; readable Markdown is always available for manual
copy, and the site never claims that initiating a download proves file delivery.

Purpose, evidence, feedback, and the evaluation worksheet are linked from
`about.html`. Models and teaching examples sit in a secondary tools section.

```sh
python -m http.server 8000 --directory site
node --test tests/site.test.mjs
```

Open http://localhost:8000 in a browser. Do not use a file URL for ES modules.
Tests cover exact question/protocol exports, independent stage checks, design
preservation, JSON round-trips, malformed data and navigation wiring.

GitHub Actions publishes this directory after the core, math, writing and site
checks pass on main. For a fork, enable Pages with GitHub Actions and update
project URLs. See the [usability investigation](../docs/usability-redesign.md).

## Guided research and real code

`guide.html` explains sequence and method families; `example.html` walks through
an executed real NOAA reanalysis. `noaa.study.json` is its editable browser record,
validated by the same decoder as user backups. The load button confirms before
replacing nonempty work. `about.html` contains evidence, frustrations and contact.

The browser backup now connects to the offline CLI through
`python research.py import-browser FILE NEW_DIRECTORY`. This is explicit file
transfer, not a backend upload or automatic synchronization. See
[setup](../docs/tool-setup.md) and [capabilities](../docs/capabilities.md).
