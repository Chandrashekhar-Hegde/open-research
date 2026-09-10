"""Render the shared guide catalog without a documentation framework."""
from html import escape
from study_catalog import CATALOG, ROOT


def guide_markdown(key):
    g = CATALOG['guides'][key]
    lines = ['# ' + g['title'], '', g['intro'], '',
             'This is a practical starting path. Confirm the methods, local requirements and',
             'current venue instructions for your actual study; this is not an exhaustive standard.', '']
    for title, field in [('Choose your route', 'choose'), ('Records you need', 'records'),
                         ('Study flow', 'flow'), ('Analysis checks', 'analysis'),
                         ('Reporting and formatting', 'formatting')]:
        lines += ['## ' + title, '']
        lines += [(f'{i}. ' if field == 'flow' else '- ') + text for i, text in enumerate(g[field], 1)]
        lines += ['']
    for section in g['sections']:
        lines += ['## ' + section['title'], '', section['text'], '']
    lines += ['## What counts as done', '', g['completion'], '', '## Use the tools', '',
              f'`python research.py guides --path {key}` returns this path as JSON.', '',
              '[Manuscript commands and formats](manuscript-formats.md) · [All paths](guide-paths.md)', '',
              '## Primary guidance', '']
    for source in g['sources']:
        s = CATALOG['sources'][source]
        lines += [f"- [{s['label']}]({s['url']})"]
    return '\n'.join(lines) + '\n'


def guide_outputs(page):
    result = {}
    cards = ''
    index = ['# Research guide paths', '',
             'Choose a subject path and then a paper path. A paper type is not a discipline.', '']
    for key, g in CATALOG['guides'].items():
        cards += '<article><h2><a href="'+key+'.html">'+escape(g['title'])+'</a></h2><p>'+escape(g['intro'])+'</p></article>'
        index += [f"- [{g['title']}]({key}.md): {g['intro']}"]
        content = '<p class="notice">Practical starting guidance. Confirm methods, local requirements and current venue instructions for your actual study.</p>'
        content += '<nav class="path-contents" aria-label="On this page"><a href="#choose">Choose</a><a href="#records">Records</a><a href="#flow">Study flow</a><a href="#analysis">Analysis</a><a href="#formatting">Formatting</a><a href="#tools">Use it</a></nav>'
        if key not in ('research-papers', 'review-papers'):
            content += '<p><a class="guide-link" href="./?area='+g['domain']+'">Set this area in Plan →</a></p>'
        else:
            content += '<p><a class="guide-link" href="./?paper='+('review' if key=='review-papers' else 'research')+'">Use this outline in Write →</a></p>'
        for title, field in [('Choose your route','choose'),('Records you need','records'),('Study flow','flow'),('Analysis checks','analysis'),('Reporting and formatting','formatting')]:
            tag = 'ol' if field == 'flow' else 'ul'
            content += '<section id="'+field+'"><h2>'+title+'</h2><'+tag+'>'+''.join('<li>'+escape(x)+'</li>' for x in g[field])+'</'+tag+'></section>'
        for section in g['sections']:
            content += '<section><h2>'+escape(section['title'])+'</h2><p>'+escape(section['text'])+'</p></section>'
        content += '<section><h2>What counts as done?</h2><p>'+escape(g['completion'])+'</p></section>'
        content += '<section id="tools"><h2>Use this path</h2><pre tabindex="0">python research.py guides --path '+key+'</pre><p>Read this guide locally or in the browser. Plan records your decisions; Analyze links the relevant code. Write exports an authoring scaffold containing your current question and notes. Run computation locally and bring back actual outputs.</p><p><a href="formats.html">Markdown, Quarto, citations and journal formatting →</a></p><h3>Designs to compare</h3><ul>'
        for pattern in g['patterns']:
            content += '<li><a href="designs.html#'+pattern+'">'+escape(CATALOG['patterns'][pattern]['label'])+'</a></li>'
        content += '</ul><h3>Examples and their evidence status</h3><ul>'
        for example in g['examples']:
            e = CATALOG['examples'][example]
            content += '<li><a href="examples.html#'+example+'">'+escape(e['label'])+'</a> — '+escape(e['kind'])+'</li>'
        content += '</ul><p><a href="tools.html">Use the CLI and assistant skills →</a> · <a href="paths.html">All eight guide paths →</a></p></section><section><h2>Primary guidance</h2><p>Sources inform these practices; they have not evaluated this workbench. Consult their current scope and applicable extensions.</p><ul>'
        for source in g['sources']:
            s=CATALOG['sources'][source]
            content += '<li><a href="'+escape(s['url'],quote=True)+'">'+escape(s['label'])+'</a></li>'
        content += '</ul></section>'
        result[ROOT/'site'/f'{key}.html'] = page(g['title'],g['intro'],content)
        result[ROOT/'docs'/f'{key}.md'] = guide_markdown(key)
    result[ROOT/'docs/guide-paths.md']='\n'.join(index)+'\n'
    result[ROOT/'site/paths.html']=page('Find your research path.','Choose your subject first. Then use the research-paper or review-paper path for the report you intend to write.','<aside class="guide-callout" aria-label="Why I built this"><strong>Why I built this — Chandrashekhar Hegde</strong><p>I built this for my own difficulties finding, sourcing and understanding papers, and the frustration of reading a whole paper that did not help my research. I made the workflow open so others could use and improve it.</p><a href="about.html#maintainer">Read my perspective →</a></aside><div class="skill-recipes">'+cards+'</div><p>Theoretical research crosses disciplines. The Plan selector keeps area, goal and design separate. Existing software, social and environmental paths remain available in <a href="designs.html">the design reference</a>.</p><p><a href="formats.html">Formatting and manuscript exports →</a> · <a href="quality.html">Why this work matters →</a></p>')
    return result


def portable_guide(key):
    return guide_markdown(key).replace('(manuscript-formats.md)', '(https://chandrashekhar-hegde.github.io/open-research/formats.html)').replace('(guide-paths.md)', '(https://chandrashekhar-hegde.github.io/open-research/paths.html)')
