# Public research guide

The static site uses HTML, CSS, and a small JavaScript module. It has no build
step, external font, analytics, data uploads, model calls, or backend. Question and design notes stay in the current page; checklist booleans may
persist in local storage. The same five handoff items survive task/tool/method
changes. Full-plan copy and download include their state and method decisions.
Experiment and game workflow shortcuts select the corresponding study design;
other task changes preserve the selected method. Existing notes are not erased.

The purpose/evidence section distinguishes published feedback from untested
project usefulness. The public GitHub feedback form and downloadable worksheet
collect no information until a user chooses to submit on GitHub.

Preview from the repository root:

```sh
python -m http.server 8000 --directory site
```

Open http://localhost:8000 in a browser. Do not open the HTML directly with a
file URL because the module needs to be served. Run `node --test tests/site.test.mjs`
with Node 18+ for task/host/method combinations, stable checklists, storage parsing, input
boundaries, and document wiring.

GitHub Actions deploys this directory to GitHub Pages after the core, math,
document, and guide checks pass on main. To host your own copy, enable Pages
with GitHub Actions as its source and update project URLs in the documentation
and site. The live page helps prepare commands and a plan; it cannot execute
local tools or validate a research study in the browser.
