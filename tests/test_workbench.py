import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from workbench import profile_csv, install_skills, journal, draft, write_new

class WorkbenchChecks(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.root=Path(self.temp.name)
    def csv(self, text):
        path=self.root/'input.csv';path.write_text(text,encoding='utf-8');return path
    def test_profile_missing_duplicates_mixed_and_nonfinite(self):
        result=profile_csv(self.csv('id,value\na,1\nb,\nc,NaN\nd,word\na,1\n'))
        self.assertEqual(result['rows'],5);self.assertEqual(result['duplicate_rows'],1)
        value=result['columns'][1]
        self.assertEqual(value['missing'],1);self.assertEqual(value['kind'],'mixed')
        self.assertEqual(value['nonfinite_numeric'],1)
        self.assertEqual(value['numeric_summary']['mean'],1)
        json.dumps(result,allow_nan=False)
    def test_large_finite_numbers_do_not_overflow_summary(self):
        value=profile_csv(self.csv('value\n1e308\n1e308\n'))['columns'][0]
        self.assertEqual(value['numeric_summary']['median'],1e308)
        json.dumps(value,allow_nan=False)
    def test_bad_csv_rejected(self):
        for text in ('','a,a\n1,2\n','a,\n1,2\n','a,b\n1\n'):
            with self.subTest(text=text),self.assertRaises(ValueError):profile_csv(self.csv(text))
    def test_host_install_is_idempotent_and_preserves_custom_work(self):
        for tool,location in [('default','.agents/skills'), ('custom','instructions/skills')]:
            with self.subTest(tool=tool):
                project=self.root/tool
                result=install_skills(location,project);self.assertEqual(result['installed'],8)
                self.assertEqual(install_skills(location,project)['installed'],0)
                path=project/location/'research-protocol/SKILL.md'
                path.write_text('custom work',encoding='utf-8')
                with self.assertRaises(ValueError):install_skills(location,project)
                self.assertEqual(path.read_text(),'custom work')
    def test_installer_rejects_escaping_host_directory(self):
        outside=self.root/'outside';outside.mkdir()
        project=self.root/'project';project.mkdir()
        try:(project/'.agents').symlink_to(outside,target_is_directory=True)
        except OSError:return
        with self.assertRaises(ValueError):install_skills('.agents/skills',project)
        self.assertEqual(list(outside.iterdir()),[])
    def test_new_outputs_refuse_overwrite(self):
        path=self.root/'output.md';write_new(path,'first')
        with self.assertRaises(FileExistsError):write_new(path,'second')
        self.assertEqual(path.read_text(),'first')
    def test_journal_records_structured_notes_and_next_action(self):
        (self.root/'study.json').write_text('{}')
        journal(self.root,'A note\nwith a newline','Check units')
        journal(self.root,'A second note','Inspect exclusions')
        records=[json.loads(s) for s in (self.root/'journal.jsonl').read_text().splitlines()]
        self.assertEqual(len(records),2);self.assertEqual(records[0]['next'],'Check units')
        self.assertIn('\n',records[0]['note']);self.assertTrue(records[0]['at'].endswith('+00:00'))
    def test_draft_preserves_claim_status_and_source_locations(self):
        study=self.root/'study';shutil.copytree(ROOT/'examples/paired-measurements',study)
        text=draft(study)
        self.assertIn('C1 — supported',text);self.assertIn('Rows A through H',text)
        self.assertIn('[Author:',text);self.assertNotIn('statistically significant',text)
