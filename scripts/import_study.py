"""Convert a browser backup to local research records without executing its contents."""
import json
from pathlib import Path
import re
import tempfile

from research import init_study

STAGES = ('research', 'plan', 'inspect', 'analyze', 'write', 'share')
DESIGNS = ('undecided', 'experiment', 'observational', 'qualitative', 'synthesis', 'computational', 'game')
GROUPS = {
    'protocol.md': ('purpose', 'background', 'hypothesis', 'units', 'comparison', 'outcome', 'sample', 'procedure', 'safeguards'),
    'analysis-plan.md': ('analysis', 'validation'),
    'report.md': ('results', 'interpretation', 'limitations'),
    'review.md': ('review', 'release'),
    'ai-use.md': ('disclosure',),
}


def load_browser(path):
    path = Path(path)
    if path.stat().st_size > 8 * 1024 * 1024:
        raise ValueError('Browser backup must be at most 8 MiB')
    data = json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(data, dict) or type(data.get('version')) is not int or data['version'] != 1:
        raise ValueError('Expected version 1 browser backup, not CLI study.json')
    for key, limit in [('title', 200), ('question', 8000)]:
        if not isinstance(data.get(key), str) or len(data[key]) > limit:
            raise ValueError(f'Invalid {key}')
    if not data['question'].strip():
        raise ValueError('A research question is required')
    if data.get('method') not in DESIGNS or data.get('stage') not in STAGES:
        raise ValueError('Unknown study design or stage')

    def notes(value):
        if not isinstance(value, dict) or any(not re.fullmatch(r'[a-z][a-z0-9_-]{0,79}', k) or not isinstance(v, str) or len(v) > 20000 for k, v in value.items()):
            raise ValueError('Invalid study notes')
    notes(data.get('answers'))
    notes(data.get('next'))
    if set(data['next']) - set(STAGES):
        raise ValueError('Unknown next-action stage')
    if not isinstance(data.get('designs'), dict) or set(data['designs']) - set(DESIGNS):
        raise ValueError('Invalid design notes')
    for values in data['designs'].values():
        notes(values)
    checks = data.get('checks')
    if not isinstance(checks, dict) or set(checks) - set(STAGES):
        raise ValueError('Invalid review stages')
    for values in checks.values():
        if not isinstance(values, list) or len(values) != 3 or any(type(v) is not bool for v in values):
            raise ValueError('Invalid review checks')
    return data


def import_browser(source, destination):
    data = load_browser(source)
    destination = Path(destination)
    if destination.exists() or destination.is_symlink():
        raise ValueError('Destination already exists; choose a new directory')
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=destination.parent) as temporary:
        root = Path(temporary) / 'study'
        init_study(root, data['title'].strip() or 'Research study')
        metadata = json.loads((root / 'study.json').read_text(encoding='utf-8'))
        metadata['question'] = data['question']
        (root / 'study.json').write_text(json.dumps(metadata, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
        (root / 'browser.study.json').write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
        answers = data['answers']
        for filename, fields in GROUPS.items():
            lines = ['# ' + filename[:-3].replace('-', ' ').title(), '', 'Imported working draft. Verify each decision; no study execution or review is implied.', '', '## Research question', '', data['question'], '']
            for key in fields:
                lines += ['## ' + key.replace('_', ' ').title(), '', answers.get(key, '').strip() and answers[key] or '[fill: not recorded in browser draft]', '']
            if filename == 'protocol.md':
                lines += ['## Selected design', '', data['method'], '']
                for key, value in data['designs'].get(data['method'], {}).items():
                    lines += ['### ' + key.title(), '', value or '[fill: design decision]', '']
            if filename == 'review.md':
                lines += ['## Imported self-review state', '', 'See browser.study.json for the stage checks and all next actions. Checked boxes are not independent review.', '']
            (root / filename).write_text('\n'.join(lines), encoding='utf-8')
        notes = ['# Evidence and retained notes', '', 'These notes are preserved verbatim. Extract inspected sources into evidence.csv and claims into claims.csv; no citations are invented.', '']
        grouped = {key for keys in GROUPS.values() for key in keys}
        for key, value in answers.items():
            if key not in grouped:
                notes += ['## ' + key.title(), '', value, '']
        notes += ['## Next actions', '']
        for key, value in data['next'].items():
            notes += ['### ' + key.title(), '', value, '']
        notes += ['Other design notes and review check states remain in browser.study.json.', '']
        (root / 'notes.md').write_text('\n'.join(notes), encoding='utf-8')
        if destination.exists() or destination.is_symlink():
            raise ValueError('Destination appeared during import; nothing replaced')
        root.rename(destination)
    return {'directory': str(destination), 'question': data['question'], 'status': 'draft',
            'next': 'Fill owner, license and data_access in study.json; verify protocol, record evidence, run your analysis, then check the study.'}
