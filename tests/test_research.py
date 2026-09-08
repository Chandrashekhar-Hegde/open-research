import csv
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from research import check_study, init_study
from check_repo import check_links

EXAMPLE = ROOT / 'examples' / 'paired-measurements'
spec = importlib.util.spec_from_file_location('example_analysis', EXAMPLE / 'analyze.py')
analysis = importlib.util.module_from_spec(spec)
spec.loader.exec_module(analysis)


class ResearchChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.study = self.root / 'study'
        shutil.copytree(EXAMPLE, self.study)

    def update_metadata(self, **updates):
        path = self.study / 'study.json'
        data = json.loads(path.read_text(encoding='utf-8'))
        data.update(updates)
        path.write_text(json.dumps(data), encoding='utf-8')

    def test_complete_example_and_independent_arithmetic(self):
        self.assertEqual(check_study(self.study, release=True), [])
        self.assertEqual(analysis.analyze(self.study / 'data/raw.csv'), {
            'synthetic': True, 'n_pairs': 8, 'mean_change': 2,
            'median_change': 2, 'min_change': 0, 'max_change': 4,
            'positive_pairs': 7, 'zero_pairs': 1, 'negative_pairs': 0,
        })

    def test_new_study_is_incomplete_and_never_overwrites(self):
        new = self.root / 'new'
        init_study(new, 'A real question')
        self.assertTrue(check_study(new))
        original = (new / 'study.json').read_bytes()
        with self.assertRaises(FileExistsError):
            init_study(new, 'Overwrite')
        self.assertEqual((new / 'study.json').read_bytes(), original)

    def test_draft_can_pass_but_release_cannot(self):
        new = self.root / 'draft'
        init_study(new, 'A scoped question')
        metadata = json.loads((new / 'study.json').read_text())
        metadata.update(question='What changes?', owner='Example author', license='MIT', data_access='Synthetic')
        (new / 'study.json').write_text(json.dumps(metadata))
        for name in ('protocol.md', 'analysis-plan.md'):
            (new / name).write_text('A filled draft record.')
        self.assertEqual(check_study(new), [])
        self.assertTrue(check_study(new, release=True))

    def test_changed_data_fails_hash_and_reproduction_without_rewriting(self):
        path = self.study / 'data/raw.csv'
        path.write_text(path.read_text().replace('A,10,12', 'A,10,99'))
        self.assertTrue(any('SHA-256 mismatch' in e for e in check_study(self.study)))
        expected = self.study / 'results/summary.json'
        before = expected.read_bytes()
        run = subprocess.run([sys.executable, str(self.study / 'analyze.py'), '--check'], capture_output=True)
        self.assertEqual(run.returncode, 1)
        self.assertEqual(expected.read_bytes(), before)

    def test_unknown_evidence_and_unsupported_claim(self):
        path = self.study / 'claims.csv'
        path.write_text(path.read_text().replace('S1;S2', 'MISSING'))
        self.assertTrue(any('unknown sources' in e for e in check_study(self.study)))
        path.write_text(path.read_text().replace('MISSING', ''))
        self.assertTrue(any('evidence required' in e for e in check_study(self.study)))

    def test_manifest_path_escapes_and_symlink(self):
        outside = self.root / 'outside.txt'
        outside.write_text('private canary')
        for path in ('../outside.txt', str(outside), r'..\outside.txt', 'C:/outside.txt'):
            with self.subTest(path=path):
                self.update_metadata(artifacts=[{'path': path}])
                self.assertTrue(check_study(self.study))
        link = self.study / 'escape.txt'
        try:
            link.symlink_to(outside)
        except OSError:
            return  # Windows hosts without symlink privilege still test lexical escapes.
        self.update_metadata(artifacts=[{'path': 'escape.txt'}])
        self.assertTrue(any('escapes study' in e for e in check_study(self.study)))

    def test_invalid_metadata_fails_cleanly(self):
        path = self.study / 'study.json'
        for value in ([], None, '{broken', {'schema_version': True}, {'schema_version': 1, 'artifacts': [None]}):
            with self.subTest(value=value):
                path.write_text(value if isinstance(value, str) else json.dumps(value))
                self.assertTrue(check_study(self.study))

    def test_release_requires_covered_records_and_commands(self):
        self.update_metadata(artifacts=[], reproduce=[])
        errors = check_study(self.study, release=True)
        self.assertTrue(any('manifest missing' in e for e in errors))
        self.assertTrue(any('reproduction commands' in e for e in errors))

    def test_duplicate_evidence_and_malformed_csv(self):
        path = self.study / 'evidence.csv'
        original = path.read_text()
        path.write_text(original + original.splitlines()[1] + '\n')
        self.assertTrue(any('duplicate source_id' in e for e in check_study(self.study)))
        path.write_text('source_id,title\nS1,Invalid\n')
        self.assertTrue(any('expected columns' in e for e in check_study(self.study)))

    def test_analysis_rejects_bad_records(self):
        path = self.root / 'invalid.csv'
        for body in ('item,before,after\n', 'item,before,after\nA,1,2\nA,2,3\n',
                     'item,before,after\nA,,2\n', 'item,before,after\nA,NaN,2\n',
                     'item,before,after\nA,1,2,extra\n', 'item,before,after\nA,1\n'):
            with self.subTest(body=body):
                path.write_text(body)
                with self.assertRaises(ValueError):
                    analysis.analyze(path)

    def test_internal_links_detect_missing_file_and_heading(self):
        (self.root / 'readme.md').write_text('[bad](missing.md)\n[bad heading](target.md#absent)')
        (self.root / 'target.md').write_text('# Present\n')
        errors, _ = check_links(self.root)
        self.assertTrue(any('missing link target' in e for e in errors))
        self.assertTrue(any('missing heading' in e for e in errors))


if __name__ == '__main__':
    unittest.main()
