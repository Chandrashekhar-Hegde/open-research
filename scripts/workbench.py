"""Small offline operations shared by the research CLI."""
import csv
from datetime import datetime, timezone
import hashlib
import json
import math
from pathlib import Path
import shutil
import statistics
import sys

ROOT = Path(__file__).resolve().parents[1]
HOSTS = {'codex': '.agents/skills', 'claude': '.claude/skills', 'opencode': '.opencode/skills'}


def write_new(path, content):
    """Refuse accidental overwrite, including symlinks."""
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('x', encoding='utf-8', newline='\n') as stream:
        stream.write(content)


def doctor():
    return {'python': sys.version.split()[0], 'core_ready': sys.version_info >= (3, 11),
            'tools': {name: shutil.which(name) for name in ('git', 'codex', 'claude', 'opencode', 'quarto', 'jupyter')},
            'note': 'Optional tools are not required for the offline core. Presence does not establish authentication or model access.'}


def install_skills(tool, project):
    project = Path(project).resolve()
    destination = project / HOSTS[tool]
    if not destination.resolve().is_relative_to(project):
        raise ValueError('host skill directory escapes the selected project')
    planned = []
    for source in sorted((ROOT / 'skills').glob('*/SKILL.md')):
        target = destination / source.parent.name / 'SKILL.md'
        if not target.resolve().is_relative_to(project):
            raise ValueError(f'skill path escapes project: {target}')
        if target.exists() or target.is_symlink():
            if target.is_symlink() or not target.is_file() or target.read_bytes() != source.read_bytes():
                raise ValueError(f'Existing skill differs; preserve or move it before installing: {target}')
        else:
            planned.append((source, target))
    for source, target in planned:
        write_new(target, source.read_text(encoding='utf-8'))
    return {'tool': tool, 'directory': str(destination), 'installed': len(planned),
            'note': 'Existing identical skills left intact. Launch the host in this project. No global settings or permissions changed.'}


def profile_csv(path):
    path = Path(path)
    with path.open(encoding='utf-8-sig', newline='') as stream:
        reader = csv.reader(stream, strict=True)
        try:
            headers = next(reader)
        except StopIteration:
            raise ValueError('CSV is empty')
        if not headers or any(not h.strip() for h in headers) or len(set(headers)) != len(headers):
            raise ValueError('CSV needs unique, nonempty column names')
        rows = list(reader)
    if any(len(row) != len(headers) for row in rows):
        raise ValueError('CSV contains a row with the wrong number of fields')
    columns = []
    for index, name in enumerate(headers):
        values = [row[index].strip() for row in rows]
        present = [v for v in values if v]
        finite, nonfinite, text = [], 0, 0
        for value in present:
            try:
                number = float(value)
            except ValueError:
                text += 1
                continue
            if math.isfinite(number):
                finite.append(number)
            else:
                nonfinite += 1
        column = {'name': name, 'missing': len(values)-len(present), 'distinct': len(set(present)),
                  'kind': 'empty' if not present else 'text' if text == len(present) else 'mixed' if text else 'numeric',
                  'finite_numeric': len(finite), 'nonfinite_numeric': nonfinite}
        if finite:
            ordered = sorted(finite)
            middle = len(ordered)//2
            median = ordered[middle] if len(ordered)%2 else statistics.mean(ordered[middle-1:middle+1])
            column['numeric_summary'] = {'count': len(finite), 'min': min(finite), 'max': max(finite),
                                         'mean': statistics.mean(finite), 'median': median}
        columns.append(column)
    return {'file': path.name, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
            'rows': len(rows), 'columns': columns, 'duplicate_rows': len(rows)-len({tuple(r) for r in rows}),
            'limitations': ['Descriptive inspection, not a study design or inference.',
                           'Only blank/whitespace cells count as missing; declare other sentinels in your data dictionary.',
                           'Numeric parsing can mistake identifiers for quantities. Review types and units.',
                           'Numeric summaries use finite parseable values only; inspect mixed/nonfinite counts.',
                           'All rows are held in memory; use a dataframe or database for large data.']}


def journal(study, note, next_action):
    study = Path(study).resolve()
    if not (study / 'study.json').is_file():
        raise ValueError('journal requires a study directory with study.json')
    if not note.strip() or not next_action.strip():
        raise ValueError('note and next action must be nonempty')
    path = study / 'journal.jsonl'
    if path.is_symlink():
        raise ValueError('journal path must not be a symlink')
    record = {'at': datetime.now(timezone.utc).isoformat(), 'note': note.strip(), 'next': next_action.strip()}
    # ponytail: single-writer journal; use a database for concurrent collaborative logging.
    with path.open('a', encoding='utf-8', newline='\n') as stream:
        stream.write(json.dumps(record, ensure_ascii=False) + '\n')
    return record


def draft(study):
    from research import check_study, load_table, local_file
    study = Path(study).resolve()
    errors = check_study(study)
    if errors:
        raise ValueError('Fix study checks before drafting: ' + '; '.join(errors))
    meta = json.loads(local_file(study, 'study.json').read_text(encoding='utf-8'))
    claims = load_table(local_file(study, 'claims.csv'), ['claim_id', 'claim', 'source_ids', 'status', 'limitations'])
    sources = load_table(local_file(study, 'evidence.csv'), ['source_id', 'title', 'url', 'accessed', 'locator', 'notes'])
    lines = ['# '+meta['title'], '', '> Authoring scaffold from recorded evidence. Not a finished manuscript.', '',
             '## Research question', '', meta['question'], '', '## Abstract', '',
             '[Author: summarize the actual design, results, uncertainty, and limitations after verification.]', '',
             '## Methods', '', '[Author: describe the method actually used from protocol.md and analysis-plan.md; disclose deviations.]', '',
             '## Recorded findings', '']
    if not claims:
        lines += ['No claims recorded. Gather and verify evidence before writing conclusions.', '']
    for row in claims:
        lines += [f"- **{row['claim_id']} — {row['status']}**: {row['claim']}",
                  f"  Evidence IDs: {row['source_ids'] or 'none'}. Limitations: {row['limitations']}"]
    lines += ['', '## Discussion', '', '[Author: compare findings with verified literature; separate interpretation from observation.]', '',
              '## Limitations', '', '[Author: explain bias, uncertainty, missing evidence, and generalization limits.]', '',
              '## Evidence inventory', '']
    for row in sources:
        lines += [f"- {row['source_id']}: {row['title']}. Location: {row['locator']}. Source: {row['url']}. Accessed: {row['accessed']}. {row['notes']}"]
    lines += ['', '## Availability and disclosure', '', f"Recorded license: {meta['license']}. Data access: {meta['data_access']}",
              '', '[Author: verify redistribution rights, funding/conflicts, authorship, and ai-use.md before sharing.]', '']
    return '\n'.join(lines)
