#!/usr/bin/env python3
"""Exercise the public CLI offline in temporary folders; no assistant required."""
import json
from pathlib import Path
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def run(*args, success=True):
    result = subprocess.run([sys.executable, *map(str, args)], cwd=ROOT,
                            capture_output=True, text=True, encoding='utf-8')
    if (result.returncode == 0) != success:
        raise RuntimeError(f'{args}: unexpected exit {result.returncode}\n{result.stdout}{result.stderr}')
    return result


def verify():
    with tempfile.TemporaryDirectory(prefix='open-research-check-') as folder:
        temp = Path(folder)
        for tool, directory in [('codex', '.agents'), ('claude', '.claude'), ('opencode', '.opencode')]:
            args = ('research.py', 'install-skills', '--tool', tool, '--project', temp / tool)
            installed = json.loads(run(*args).stdout)
            if installed['installed'] != 8 or json.loads(run(*args).stdout)['installed'] != 0:
                raise RuntimeError(f'{tool}: installation is incomplete or not idempotent')
            for source in (ROOT / 'skills').glob('*/SKILL.md'):
                copied = temp / tool / directory / 'skills' / source.parent.name / 'SKILL.md'
                if copied.read_bytes() != source.read_bytes():
                    raise RuntimeError(f'{tool}: copied skill differs')
        study = temp / 'study'
        run('research.py', 'import-browser', 'site/noaa.study.json', study)
        original = json.loads((ROOT / 'site/noaa.study.json').read_text(encoding='utf-8'))
        imported = json.loads((study / 'study.json').read_text(encoding='utf-8'))
        if imported['question'] != original['question']:
            raise RuntimeError('Import changed the question')
        # A browser draft must not become a completed release by importing it.
        run('research.py', 'check', study, '--release', success=False)
        run('research.py', 'journal', study, '--note', 'Offline rehearsal', '--next', 'Complete metadata')
        result = temp / 'result.json'
        run('examples/noaa-co2/analyze.py', '--output', result)
        computed = json.loads(result.read_text(encoding='utf-8'))
        expected = json.loads((ROOT / 'examples/noaa-co2/results/summary.json').read_text(encoding='utf-8'))
        if computed != expected or computed['difference_ppm'] != 2.745:
            raise RuntimeError('Computed NOAA result changed')
        run('examples/noaa-co2/analyze.py', '--check')
        run('research.py', 'check', 'examples/noaa-co2', '--release')
        bad = temp / 'missing-month.csv'
        lines = (ROOT / 'examples/noaa-co2/data/monthly.csv').read_text(encoding='utf-8').splitlines()
        bad.write_text('\n'.join(lines[:-1]) + '\n', encoding='utf-8')
        rejected = run('examples/noaa-co2/analyze.py', '--input', bad, success=False)
        if '12 months' not in rejected.stderr + rejected.stdout:
            raise RuntimeError('Incomplete data failed for an unexpected reason')
        run('research.py', 'draft', 'examples/noaa-co2', '--output', temp / 'draft.md')
        print('PASS: 3 skill destinations (8 files each), idempotent installation, browser import,')
        print('incomplete-release rejection, journal, NOAA recomputation (2.745 ppm),')
        print('missing-month rejection, artifact hashes, and evidence-linked writing scaffold.')
        print('Offline mechanical checks only. No model, scientific-validity or user-outcome claim.')


if __name__ == '__main__':
    try:
        verify()
    except (OSError, ValueError, RuntimeError) as exc:
        sys.exit(f'FAIL: {exc}')
