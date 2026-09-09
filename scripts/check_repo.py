#!/usr/bin/env python3
"""Offline repository checks. Optional external link checks are informational."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import os
from pathlib import Path
import re
import subprocess
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urlsplit
from urllib.request import Request, urlopen

from research import ROOT, check_study


def markdown_files(root):
    for directory, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in {'.git', '.venv', '__pycache__', 'studies', 'build', '.agents', '.quarto'}]
        for name in files:
            if name.endswith('.md'):
                yield Path(directory) / name


def check_links(root):
    errors, urls = [], set()
    for path in markdown_files(root):
        body = path.read_text(encoding='utf-8')
        body = re.sub(r'^```.*?^```\s*$', '', body, flags=re.M | re.S)
        for target in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)', body):
            target = target.strip('<>')
            parsed = urlsplit(target)
            if parsed.scheme in ('http', 'https'):
                urls.add(target)
            elif not parsed.scheme:
                destination = path.parent / unquote(parsed.path) if parsed.path else path
                if not destination.exists():
                    errors.append(f'{path.relative_to(root)}: missing link target {target}')
                elif parsed.fragment and destination.suffix == '.md':
                    headings = re.findall(r'^#{1,6}\s+(.+)$', destination.read_text(encoding='utf-8'), re.M)
                    anchors = {re.sub(r'[^\w\- ]', '', h.lower()).replace(' ', '-') for h in headings}
                    if unquote(parsed.fragment) not in anchors:
                        errors.append(f'{path.relative_to(root)}: missing heading {target}')
    return errors, urls


def check_external(url):
    try:
        request = Request(url, headers={'User-Agent': 'OpenResearch-LinkCheck/1.0'})
        with urlopen(request, timeout=15) as response:
            return url, str(response.status)
    except HTTPError as exc:
        return url, f'HTTP {exc.code}'
    except (URLError, OSError, ValueError) as exc:
        return url, f'access error: {exc}'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--external', action='store_true', help='also report network link status; not a CI gate')
    args = parser.parse_args()
    errors, urls = check_links(ROOT)
    skills = list((ROOT / 'skills').glob('*/SKILL.md'))
    if not skills:
        errors.append('no research skills found')
    for path in skills:
        body = path.read_text(encoding='utf-8')
        header = re.match(r'\A---\n(.*?)\n---\n', body, re.S)
        if not header:
            errors.append(f'{path}: missing skill front matter')
            continue
        fields = dict(re.findall(r'^(name|description): (.+)$', header[1], re.M))
        if fields.get('name') != path.parent.name or not fields.get('description', '').strip():
            errors.append(f'{path}: invalid name or description')
    example = ROOT / 'examples' / 'paired-measurements'
    errors.extend(check_study(example, release=True))
    result = subprocess.run([sys.executable, str(example / 'analyze.py'), '--check'], capture_output=True, text=True)
    if result.returncode:
        errors.append(result.stderr or result.stdout)
    else:
        print(result.stdout.strip())
    errors.extend(check_study(ROOT / 'examples' / 'noaa-co2', release=True))
    if args.external:
        with ThreadPoolExecutor(max_workers=8) as pool:
            for url, status in pool.map(check_external, sorted(urls)):
                print(f'{status}: {url}')
        print('External statuses are observations, not evidence of source quality; inspect failures manually.')
    if errors:
        print('\n'.join(f'ERROR: {error}' for error in errors), file=sys.stderr)
        return 1
    print(f'PASS: local links, {len(skills)} skill headers, study structure, hashes, and reproduction.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
