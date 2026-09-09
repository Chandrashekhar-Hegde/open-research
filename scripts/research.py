#!/usr/bin/env python3
"""Open Research CLI. Python 3.11+, no required external dependencies."""
import argparse
import csv
from datetime import date
import hashlib
import json
from pathlib import Path
import re
import shutil
import sys
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
DOCUMENTS = ('protocol.md', 'analysis-plan.md', 'report.md', 'review.md', 'ai-use.md')


def local_file(root, name):
    """Accept only portable relative file paths contained within the study."""
    if not isinstance(name, str) or not name or '\\' in name:
        raise ValueError('expected a nonempty relative POSIX path')
    path = Path(name)
    if path.is_absolute() or '..' in path.parts or ':' in name:
        raise ValueError(f'unsafe study path: {name}')
    resolved = (root / path).resolve()
    if not resolved.is_relative_to(root.resolve()) or not resolved.is_file():
        raise ValueError(f'missing file or path escapes study: {name}')
    return resolved


def load_table(path, columns):
    with path.open(encoding='utf-8', newline='') as stream:
        reader = csv.DictReader(stream)
        if reader.fieldnames != columns:
            raise ValueError(f'{path.name}: expected columns {columns}')
        rows = list(reader)
    for row in rows:
        if None in row or any(v is None for v in row.values()):
            raise ValueError(f'{path.name}: malformed CSV row')
    return rows


def check_study(root, release=False):
    root = Path(root).resolve()
    errors = []
    try:
        metadata = json.loads(local_file(root, 'study.json').read_text(encoding='utf-8'))
        if not isinstance(metadata, dict):
            raise ValueError('study.json must be an object')
        if type(metadata.get('schema_version')) is not int or metadata['schema_version'] != 1:
            errors.append('schema_version must be integer 1')
        for key in ('title', 'question', 'owner', 'license', 'data_access', 'created'):
            if not isinstance(metadata.get(key), str) or not metadata[key].strip():
                errors.append(f'study.json: fill {key}')
        try:
            date.fromisoformat(metadata.get('created', ''))
        except (TypeError, ValueError):
            errors.append('created must be an ISO date (YYYY-MM-DD)')
        if metadata.get('status') not in ('draft', 'active', 'complete'):
            errors.append('status must be draft, active, or complete')
        commands = metadata.get('reproduce')
        if not isinstance(commands, list) or any(not isinstance(c, str) or not c.strip() for c in commands):
            errors.append('reproduce must be a list of nonempty command strings')
        elif release and not commands:
            errors.append('release needs reproduction commands or a documented manual procedure')
        for name in DOCUMENTS:
            body = local_file(root, name).read_text(encoding='utf-8')
            if not body.strip():
                errors.append(f'{name} is empty')
            if (release or name in ('protocol.md', 'analysis-plan.md')) and '[fill:' in body:
                errors.append(f'{name}: complete the template prompts')
        evidence = load_table(local_file(root, 'evidence.csv'),
                              ['source_id', 'title', 'url', 'accessed', 'locator', 'notes'])
        sources = set()
        for row in evidence:
            sid = row['source_id'].strip()
            if not sid or sid in sources:
                errors.append(f'evidence.csv: empty or duplicate source_id {sid!r}')
            sources.add(sid)
            for key in ('title', 'url', 'locator'):
                if not row[key].strip():
                    errors.append(f'evidence {sid}: missing {key}')
            try:
                date.fromisoformat(row['accessed'])
            except ValueError:
                errors.append(f'evidence {sid}: accessed must be YYYY-MM-DD')
            url = row['url']
            if urlsplit(url).scheme in ('http', 'https'):
                if not urlsplit(url).netloc:
                    errors.append(f'evidence {sid}: malformed URL')
            else:
                local_file(root, url)
        claims = load_table(local_file(root, 'claims.csv'),
                            ['claim_id', 'claim', 'source_ids', 'status', 'limitations'])
        ids = set()
        for row in claims:
            cid = row['claim_id'].strip()
            if not cid or cid in ids or not row['claim'].strip():
                errors.append(f'claims.csv: empty/duplicate ID or empty claim {cid!r}')
            ids.add(cid)
            refs = [r.strip() for r in row['source_ids'].split(';') if r.strip()]
            if set(refs) - sources:
                errors.append(f'claim {cid}: unknown sources {sorted(set(refs) - sources)}')
            if row['status'] not in ('supported', 'contested', 'unverified'):
                errors.append(f'claim {cid}: invalid status')
            if row['status'] in ('supported', 'contested') and not refs:
                errors.append(f'claim {cid}: evidence required')
            if not row['limitations'].strip():
                errors.append(f'claim {cid}: limitations required')
        artifacts = metadata.get('artifacts')
        paths = set()
        if not isinstance(artifacts, list):
            errors.append('artifacts must be a list')
            artifacts = []
        for item in artifacts:
            if not isinstance(item, dict):
                errors.append('artifact must be an object')
                continue
            path = local_file(root, item.get('path'))
            name = item['path']
            if name in paths:
                errors.append(f'duplicate artifact: {name}')
            paths.add(name)
            expected = item.get('sha256', '')
            if not isinstance(expected, str) or not re.fullmatch(r'[0-9a-f]{64}', expected):
                errors.append(f'{name}: sha256 must be 64 lowercase hex digits')
            elif hashlib.sha256(path.read_bytes()).hexdigest() != expected:
                errors.append(f'{name}: SHA-256 mismatch')
            for key in ('role', 'license', 'provenance'):
                if not isinstance(item.get(key), str) or not item[key].strip():
                    errors.append(f'{name}: missing {key}')
        if release:
            if metadata.get('status') != 'complete':
                errors.append('release requires status complete')
            if not claims or not evidence:
                errors.append('release requires nonempty evidence and claim ledgers')
            for name in (*DOCUMENTS, 'evidence.csv', 'claims.csv'):
                if name not in paths:
                    errors.append(f'release manifest missing {name}')
    except (OSError, ValueError, csv.Error, UnicodeError) as exc:
        errors.append(str(exc))
    return errors


def init_study(destination, title):
    destination = Path(destination)
    if not title.strip():
        raise ValueError('title cannot be blank')
    # copytree refuses existing destinations, including empty directories.
    shutil.copytree(ROOT / 'templates' / 'study', destination)
    path = destination / 'study.json'
    metadata = json.loads(path.read_text(encoding='utf-8'))
    metadata.update(title=title, created=date.today().isoformat())
    path.write_text(json.dumps(metadata, indent=2) + '\n', encoding='utf-8')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    init = sub.add_parser('init', help='copy an incomplete study template into a new directory')
    init.add_argument('path', type=Path)
    init.add_argument('--title', required=True)
    check = sub.add_parser('check', help='check metadata, evidence links, and artifact hashes')
    check.add_argument('path', type=Path)
    check.add_argument('--release', action='store_true', help='require completed release records')
    sub.add_parser('doctor', help='show runtime and optional CLI availability')
    install = sub.add_parser('install-skills', help='install project-local skills for a chosen host')
    install.add_argument('--directory', default='.agents/skills', help='project-relative destination, default .agents/skills')
    install.add_argument('--project', type=Path, default=Path.cwd())
    imported = sub.add_parser('import-browser', help='turn a browser JSON backup into a new local study')
    imported.add_argument('source', type=Path)
    imported.add_argument('path', type=Path)
    profile = sub.add_parser('profile', help='inspect CSV shape, missingness, duplicates, and numeric values')
    profile.add_argument('path', type=Path)
    profile.add_argument('--output', type=Path)
    log = sub.add_parser('journal', help='append a dated note and next action to a study')
    log.add_argument('path', type=Path)
    log.add_argument('--note', required=True)
    log.add_argument('--next', dest='next_action', required=True)
    paper = sub.add_parser('draft', help='create an evidence-based academic manuscript scaffold')
    paper.add_argument('path', type=Path)
    paper.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    if args.command not in ('init', 'check'):
        from workbench import doctor, install_skills, profile_csv, journal, draft, write_new
        try:
            if args.command == 'doctor':
                result = doctor()
            elif args.command == 'install-skills':
                result = install_skills(args.directory, args.project)
            elif args.command == 'import-browser':
                from import_study import import_browser
                result = import_browser(args.source, args.path)
            elif args.command == 'profile':
                result = profile_csv(args.path)
                if args.output:
                    write_new(args.output, json.dumps(result, indent=2, allow_nan=False) + '\n')
                    print(f'Wrote {args.output}')
                    return 0
            elif args.command == 'journal':
                result = journal(args.path, args.note, args.next_action)
            else:
                write_new(args.output, draft(args.path))
                print(f'Wrote authoring scaffold: {args.output}')
                return 0
            print(json.dumps(result, indent=2, allow_nan=False))
            return 0
        except (OSError, ValueError, csv.Error, UnicodeError) as exc:
            parser.exit(1, f'Cannot complete {args.command}: {exc}\n')
    if args.command == 'init':
        try:
            init_study(args.path, args.title)
        except (OSError, ValueError) as exc:
            parser.exit(1, f'Cannot initialize: {exc}\n')
        print(f'Created {args.path}. Fill metadata, protocol, and analysis plan before checking.')
        return 0
    errors = check_study(args.path, args.release)
    if errors:
        print('\n'.join(f'ERROR: {error}' for error in errors), file=sys.stderr)
        return 1
    print(f'PASS: {args.path} — structural checks only; scientific review remains necessary.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
