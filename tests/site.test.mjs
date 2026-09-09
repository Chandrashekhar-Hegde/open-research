import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {hostSetup,hosts,emptyStudy,decodeStudy,stages,methods,fieldsFor,missingFor,studyMarkdown,assistantBrief,fileStem,hasContent,MAX_FILE_SIZE} from '../site/study.mjs';
function irrigation(){
 const study=emptyStudy();study.title='Irrigation study';study.question='Does 100 mL versus 200 mL daily irrigation change basil height after 21 days?\nMeasure height in cm — not leaf count.';study.method='experiment';
 study.answers={purpose:'Choose an irrigation level without assuming more water is better.',units:'Individual basil pots; repeated daily measurements belong to the same pot.',comparison:'100 mL versus 200 mL per day.',outcome:'Change in stem height (cm), day 0 to day 21.',sample:'Use pilot variability to justify precision; no sample size has been selected.',procedure:'Measure baseline; randomize pots within bench blocks; water daily; record day 21 height.',sources:'Local pilot protocol, methods section; observations not yet collected.'};
 study.designs={experiment:{factors:'Water per day: 100 mL or 200 mL.',allocation:'Randomize pots within bench location; blind the final height assessor.',replication:'Independent pots; do not count 21 measurements as 21 independent units.'},game:{players:'Retained alternative model notes.'}};
 study.checks={plan:[true,false,true],inspect:[false,true,false]};study.next={plan:'Estimate variability from the pilot before selecting replication.'};return study;
}
test('copy/download document contains the actual question and experimental protocol across every stage',()=>{
 const study=irrigation(),baseline=studyMarkdown(study);
 for(const key of Object.keys(stages)){study.stage=key;assert.equal(studyMarkdown(study),baseline);}
 for(const text of [study.question,...Object.values(study.answers),...Object.values(study.designs.experiment),study.next.plan])assert.ok(baseline.includes(text),text);
 assert.ok(baseline.includes('[Not yet recorded]'));assert.ok(baseline.includes('- [x] I have justified why this design'));
 assert.ok(!baseline.includes('Define the question before analysis'));assert.ok(!baseline.includes('python examples/'));
 assert.ok(!baseline.includes('Retained alternative model notes.'));assert.ok(baseline.includes('editable JSON backup'));
});
test('blank questions cannot become generic exported studies',()=>{
 const study=emptyStudy();for(const text of ['', '   ', '\n\t']){study.question=text;assert.throws(()=>studyMarkdown(study),/research question/);assert.throws(()=>assistantBrief(study));}
});
test('JSON round-trip preserves all stages, designs, exact text and independent review checks',()=>{
 const study=irrigation();study.host='assistant';study.stage='inspect';
 const loaded=decodeStudy(JSON.stringify(study));assert.deepEqual(loaded,study);assert.equal(studyMarkdown(loaded),studyMarkdown(study));
 loaded.checks.plan[1]=true;assert.equal(study.checks.plan[1],false);assert.equal(loaded.checks.inspect[0],false);
 loaded.method='game';assert.ok(fieldsFor(loaded,'plan').some(f=>f.value==='Retained alternative model notes.'));
 loaded.method='experiment';assert.ok(fieldsFor(loaded,'plan').some(f=>f.value===study.designs.experiment.factors));
});
test('each stage has its own review and missing-decision context',()=>{
 const study=emptyStudy(),signatures=new Set(Object.values(stages).map(stage=>stage.checks.join('|')));assert.equal(signatures.size,6);
 assert.ok(missingFor(study,'research').includes('Research question'));assert.ok(missingFor(study,'plan').includes('Study design'));
 for(const method of Object.keys(methods)){study.method=method;for(const stage of Object.keys(stages)){const fields=fieldsFor(study,stage);assert.equal(new Set(fields.map(f=>f.id)).size,fields.length);}}
 study.method='experiment';assert.ok(missingFor(study,'plan').includes('Factors and treatment levels'));
 study.designs.experiment={factors:'Entered levels'};assert.ok(!missingFor(study,'plan').includes('Factors and treatment levels'));
});
test('invalid imports and saved drafts are rejected without silently becoming empty studies',()=>{
 for(const raw of ['bad JSON','null','[]',JSON.stringify({...emptyStudy(),version:2}),JSON.stringify({...emptyStudy(),method:'__proto__'}),JSON.stringify({...emptyStudy(),answers:{unexpected:'x'}}),JSON.stringify({...emptyStudy(),question:123}),JSON.stringify({...emptyStudy(),checks:{plan:['true',false,false]}}),JSON.stringify({...emptyStudy(),answers:{purpose:'a'.repeat(20001)}}),' '.repeat(MAX_FILE_SIZE+1)])assert.throws(()=>decodeStudy(raw));
 assert.throws(()=>decodeStudy('{"version":1,"__proto__":{}}'));
 assert.equal(hasContent(emptyStudy()),false);assert.equal(hasContent(irrigation()),true);
});
test('user text is preserved as text, filenames are bounded, and assistant handoff carries the study',()=>{
 const study=irrigation();study.question='$(touch /tmp/x) <script>unsafe()</script> "quoted"';study.title='../\\ unsafe title';
 assert.ok(studyMarkdown(study).includes(study.question));assert.match(fileStem(study),/^[a-z0-9-]+$/);assert.ok(fileStem(study).length<=60);
 const brief=assistantBrief(study);assert.ok(brief.includes(study.question));assert.ok(brief.includes(study.answers.procedure));
});
test('site wiring and linked local assets are present; stage switches do not navigate or force scrolling',()=>{
 const html=readFileSync(new URL('../site/index.html',import.meta.url),'utf8'), app=readFileSync(new URL('../site/app.mjs',import.meta.url),'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 const dynamic=['design-fields'];for(const m of app.matchAll(/\$\('([^']+)'\)/g))assert.ok(ids.includes(m[1])||dynamic.includes(m[1]),m[1]);
 assert.ok(html.indexOf('id="stage-tabs"')<html.indexOf('id="stage-panels"'));
 assert.ok(!app.includes('scrollIntoView'));assert.ok(!app.includes('location.reload'));assert.ok(!app.includes('innerHTML'));
 assert.ok(html.includes('Copy study'));assert.ok(html.includes('Save editable JSON'));
 for(const file of ['about.html','feedback-study.md','study.mjs','style.css'])assert.ok(readFileSync(new URL('../site/'+file,import.meta.url),'utf8'));
 for(const stage of Object.values(stages))assert.ok(readFileSync(new URL('../docs/'+stage.guide,import.meta.url),'utf8'));
});
test('real observation study loads into the editor and exports its executed evidence',()=>{
 const study=decodeStudy(readFileSync(new URL('../site/noaa.study.json',import.meta.url),'utf8'));
 const report=studyMarkdown(study);assert.ok(report.includes('2.745'));assert.ok(report.includes('gml.noaa.gov'));assert.ok(report.includes('Retrospective'));
 assert.ok(report.includes(study.question));assert.equal(study.method,'observational');
 const expected=JSON.parse(readFileSync(new URL('../examples/noaa-co2/results/summary.json',import.meta.url),'utf8'));
 assert.deepEqual(JSON.parse(study.answers.results),expected);
 const page=readFileSync(new URL('../site/example.html',import.meta.url),'utf8');
 for(const value of [expected.difference_ppm,...Object.values(expected.equal_month_mean_ppm)])assert.ok(page.includes(String(value)));
});
test('retired tool preferences preserve existing draft content',()=>{
 const old=irrigation();old.host='retired-provider';const loaded=decodeStudy(JSON.stringify(old));
 assert.equal(loaded.host,'standalone');assert.equal(loaded.question,old.question);assert.deepEqual(loaded.designs,old.designs);
});
test('method links and the public guide have matching destinations',()=>{
 const guide=readFileSync(new URL('../site/guide.html',import.meta.url),'utf8');
 for(const key of Object.keys(methods).filter(k=>k!=='undecided'))assert.ok(guide.includes('id="'+key+'"'),key);
 for(const file of ['index.html','guide.html','example.html','about.html']){
  const html=readFileSync(new URL('../site/'+file,import.meta.url),'utf8');
  for(const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   if(/^(https?:|#)/.test(href)||href==='./')continue;
   const [path,fragment]=href.split(/[?#]/);const target=readFileSync(new URL('../site/'+path,import.meta.url),'utf8');
   if(href.includes('#'))assert.ok(target.includes('id="'+fragment+'"'),href);
  }
 }
});

test('named host setup and stage handoffs preserve the study through every tool',()=>{
 const source=irrigation();
 for(const host of Object.keys(hosts)){
  source.host=host;
  const restored=decodeStudy(JSON.stringify(source));
  assert.equal(restored.host,host);
  const setup=hostSetup(host);
  assert.ok(setup.includes(['claude','codex','opencode'].includes(host)?'--tool '+host:'verify_workflow.py'));
  for(const stage of Object.keys(stages)){
   restored.stage=stage;
   const brief=assistantBrief(restored);
   assert.ok(brief.includes(restored.question));
   assert.ok(brief.includes(stages[stage].skill));
   assert.ok(brief.includes(hosts[host]));
   assert.ok(brief.includes('actual outputs, exit statuses'));
  }
 }
 const page=readFileSync(new URL('../site/tools.html',import.meta.url),'utf8');
 for(const host of ['claude','codex','opencode'])assert.ok(page.includes('id="'+host+'"'));
});
