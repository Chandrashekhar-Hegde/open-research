import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from import_study import import_browser
spec = importlib.util.spec_from_file_location('noaa_analysis', ROOT / 'examples/noaa-co2/analyze.py')
noaa = importlib.util.module_from_spec(spec)
spec.loader.exec_module(noaa)


class StudyBridgeChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)

    def test_real_browser_backup_becomes_local_records_without_inventing_evidence(self):
        source = ROOT / 'site/noaa.study.json'
        original = json.loads(source.read_text(encoding='utf-8'))
        result = subprocess.run([sys.executable, str(ROOT / 'research.py'), 'import-browser', str(source), str(self.root / 'study')], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        study = self.root / 'study'
        meta = json.loads((study / 'study.json').read_text(encoding='utf-8'))
        self.assertEqual(meta['question'], original['question'])
        self.assertEqual(meta['status'], 'draft')
        self.assertEqual(meta['owner'], '')
        self.assertIn(original['answers']['analysis'], (study / 'analysis-plan.md').read_text(encoding='utf-8'))
        self.assertIn(original['answers']['sources'], (study / 'notes.md').read_text(encoding='utf-8'))
        self.assertEqual(json.loads((study / 'browser.study.json').read_text(encoding='utf-8')), original)
        self.assertEqual(len((study / 'evidence.csv').read_text().splitlines()), 1)
        with self.assertRaises(ValueError):
            import_browser(source, study)
        self.assertEqual(json.loads((study / 'study.json').read_text(encoding='utf-8')), meta)

    def test_invalid_backups_create_no_study(self):
        valid = json.loads((ROOT / 'site/noaa.study.json').read_text(encoding='utf-8'))
        for data in [None, [], {'version': 2}, {**valid, 'question': ''}, {**valid, 'method': '../escape'}, {**valid, 'answers': {'purpose': ['bad']}}, {**valid, 'checks': {'plan': [True, False, 'true']}}]:
            with self.subTest(data=str(data)[:60]):
                source = self.root / 'bad.json'
                source.write_text(json.dumps(data), encoding='utf-8')
                with self.assertRaises(ValueError):
                    import_browser(source, self.root / 'destination')
                self.assertFalse((self.root / 'destination').exists())

    def fixture(self, change=None):
        lines = ['year,month,average,deseasonalized,ndays,sdev,unc']
        lines += [f'{year},{month},{400 + (year-2024)*2},{400 + (year-2024)*2},25,0.5,0.1' for year in (2024, 2025) for month in range(1, 13)]
        if change:
            lines = change(lines)
        path = self.root / 'data.csv'
        path.write_text('\n'.join(lines) + '\n', encoding='utf-8')
        return path

    def test_known_answer_and_invalid_observation_inputs(self):
        result = noaa.analyze(self.fixture())
        self.assertEqual(result['equal_month_mean_ppm'], {'2024': 400.0, '2025': 402.0})
        self.assertEqual(result['difference_ppm'], 2.0)
        for change in [lambda x: x[:-1], lambda x: x + [x[-1]], lambda x: [x[0], x[1].replace('400,400', 'NaN,400')] + x[2:], lambda x: [x[0], x[1].replace('0.5,0.1', '-9.99,-0.99')] + x[2:]]:
            with self.assertRaises(ValueError):
                noaa.analyze(self.fixture(change))

    def test_frozen_real_data_reproduces_recorded_result(self):
        expected = json.loads((ROOT / 'examples/noaa-co2/results/summary.json').read_text())
        self.assertEqual(noaa.analyze(ROOT / 'examples/noaa-co2/data/monthly.csv'), expected)
        self.assertEqual(expected['difference_ppm'], 2.745)
