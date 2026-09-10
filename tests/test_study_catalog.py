import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from study_catalog import CATALOG, classify, candidates
from import_study import import_browser, load_browser
from research import check_study
spec = importlib.util.spec_from_file_location('pattern_analysis', ROOT / 'examples/study-patterns/analyze.py')
analysis = importlib.util.module_from_spec(spec)
spec.loader.exec_module(analysis)


class DesignWorkflow(unittest.TestCase):
    def test_catalog_generation_and_candidates(self):
        result = subprocess.run([sys.executable, str(ROOT / 'scripts/build_catalog.py'), '--check'], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual({p['id'] for p in candidates('medical', 'predict')}, {'diagnostic', 'prediction'})
        for name, pattern in CATALOG['patterns'].items():
            self.assertTrue((ROOT / 'skills' / pattern['analysisSkill'] / 'SKILL.md').is_file())
            self.assertIn(pattern['goal'], CATALOG['goals'])
            self.assertTrue(set(pattern['domains']) <= set(CATALOG['domains']))
            self.assertTrue(set(pattern['sources']) <= set(CATALOG['sources']))
            self.assertEqual(len(pattern['fields']), len({f[0] for f in pattern['fields']}))
        with self.assertRaises(ValueError):
            classify({'domain': 'medical', 'subarea': 'materials', 'goal': 'predict', 'pattern': 'diagnostic'})

    def test_classified_cli_init_and_invalid_area_subsection(self):
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / 'study'
            args = [sys.executable, str(ROOT / 'research.py'), 'init', str(path), '--title', 'Test question', '--domain', 'medical', '--subarea', 'materials', '--pattern', 'diagnostic']
            result = subprocess.run(args, capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertFalse(path.exists())
            args[args.index('materials')] = 'clinical'
            result = subprocess.run(args, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            meta = json.loads((path / 'study.json').read_text())
            self.assertEqual(meta['classification']['pattern'], 'diagnostic')
            self.assertTrue(check_study(path, release=True))

    def test_all_examples_import_without_inventing_a_completed_study(self):
        with tempfile.TemporaryDirectory() as temp:
            for id, example in CATALOG['examples'].items():
                with self.subTest(example=id):
                    source = ROOT / 'site' / example['file']
                    data = load_browser(source)
                    target = Path(temp) / id
                    import_browser(source, target)
                    meta = json.loads((target / 'study.json').read_text(encoding='utf-8'))
                    self.assertEqual(meta['classification'], data['classification'])
                    self.assertEqual(meta['question'], data['question'])
                    self.assertEqual(meta['status'], 'draft')
                    self.assertIn(CATALOG['patterns'][data['classification']['pattern']]['label'], (target / 'protocol.md').read_text(encoding='utf-8'))
                    self.assertTrue(check_study(target, release=True))

    def test_invalid_classification_does_not_create_import(self):
        original = json.loads((ROOT / 'site/examples/diagnostic.study.json').read_text())
        with tempfile.TemporaryDirectory() as temp:
            source = Path(temp) / 'input.json'
            for data in [
                {**original, 'classification': {**original['classification'], 'goal': 'model'}},
                {**original, 'method': 'experiment'},
                {**original, 'patternNotes': {'diagnostic': {'reference': ['not text']}}},
                {**original, 'patternNotes': {'diagnostic': {'unknown': 'text'}}},
            ]:
                source.write_text(json.dumps(data))
                with self.assertRaises(ValueError):
                    import_browser(source, Path(temp) / 'study')
                self.assertFalse((Path(temp) / 'study').exists())

    def test_teaching_answers_and_boundary_cases(self):
        d = analysis.calculate({'kind': 'diagnostic', 'counts': {'tp': 18, 'fn': 2, 'fp': 8, 'tn': 72}})
        self.assertEqual(d['sensitivity'], .9)
        self.assertEqual(d['specificity'], .9)
        self.assertAlmostEqual(d['positive_predictive_value'], 18/26)
        empty = analysis.calculate({'kind': 'diagnostic', 'counts': dict.fromkeys(['tp', 'fn', 'fp', 'tn'], 0)})
        self.assertIsNone(empty['sensitivity'])
        pred = analysis.calculate(json.loads((ROOT / 'examples/study-patterns/inputs/prediction.json').read_text()))
        self.assertEqual((pred['model_mae'], pred['baseline_mae']), (1, 2))
        bench = analysis.calculate({'kind': 'benchmark', 'values': [1, 3, 5], 'queries': [1, 3, 5, 7]})
        self.assertEqual([r['found'] for r in bench['queries']], [True, True, True, False])
        self.assertEqual(bench['total_linear_probes'], 9)
        sim = analysis.calculate({'kind': 'simulation', 'initial': 1, 'rate': .5, 'duration': 2, 'steps': 20})
        self.assertLess(sim['half_step_error'], sim['absolute_error'])
        for data in [
            {'kind': 'diagnostic', 'counts': {'tp': True, 'fn': 0, 'fp': 0, 'tn': 2}},
            {'kind': 'diagnostic', 'counts': {'tp': -1, 'fn': 0, 'fp': 0, 'tn': 2}},
            {'kind': 'prediction', 'rows': [{'id': 'x', 'actual': 1, 'predicted': float('nan'), 'baseline': 1}]},
            {'kind': 'prediction', 'rows': []},
            {'kind': 'prediction', 'rows': [{'id': 'x', 'actual': 1, 'predicted': 1, 'baseline': 1}]*2},
            {'kind': 'benchmark', 'values': [2, 1], 'queries': [1]},
            {'kind': 'simulation', 'initial': 1, 'rate': 1, 'duration': 2, 'steps': 1},
        ]:
            with self.subTest(data=data), self.assertRaises(ValueError):
                analysis.calculate(data)

    def test_teaching_clis_reproduce_frozen_inputs(self):
        for kind in analysis.KINDS:
            result = subprocess.run([sys.executable, str(ROOT / 'examples/study-patterns/analyze.py'), '--example', kind, '--check'], capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)

    def test_guide_cli_and_classified_local_records(self):
        for key, guide in CATALOG['guides'].items():
            result = subprocess.run([sys.executable, str(ROOT/'research.py'), 'guides', '--path', key], capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(json.loads(result.stdout), guide)
        with tempfile.TemporaryDirectory() as temp:
            from research import init_study
            for subarea in ('organic', 'physical', 'experimental'):
                path = Path(temp)/subarea
                init_study(path, 'Chemical question', {'domain':'chemistry','subarea':subarea,'goal':'effect','pattern':'factorial'})
                self.assertIn('Organic chemistry', (path/'guide.md').read_text())
                self.assertIn('https://chandrashekhar-hegde.github.io/open-research/formats.html', (path/'guide.md').read_text())

    def test_manuscript_cli_formats_preserve_question_and_claims(self):
        from workbench import draft
        source = ROOT/'examples/noaa-co2'
        question = json.loads((source/'study.json').read_text())['question']
        for kind in ('research', 'review'):
            for format in ('markdown', 'quarto'):
                text = draft(source, kind=kind, output_format=format)
                self.assertIn(question, text)
                for heading, _ in CATALOG['papers'][kind]['sections']:
                    self.assertIn('## '+heading, text)
                self.assertIn('Not a finished manuscript', text)
                if format == 'quarto':
                    self.assertTrue(text.startswith('---\ntitle: '))
                    self.assertIn('execute:\n  enabled: false', text)
        with self.assertRaises(ValueError):
            draft(source, kind='invented')
        with tempfile.TemporaryDirectory() as temp:
            output = Path(temp)/'review.qmd'
            args = [sys.executable, str(ROOT/'research.py'), 'draft', str(source), '--kind', 'review', '--format', 'quarto', '--output', str(output)]
            first = subprocess.run(args, capture_output=True, text=True)
            self.assertEqual(first.returncode, 0, first.stderr)
            original = output.read_bytes()
            again = subprocess.run(args, capture_output=True, text=True)
            self.assertNotEqual(again.returncode, 0)
            self.assertEqual(output.read_bytes(), original)
