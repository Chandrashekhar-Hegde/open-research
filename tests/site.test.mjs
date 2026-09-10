import {manuscript} from '../site/manuscript.mjs';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {skillFor,catalog,designCandidates,setClassification,selectedPattern,hostSetup,hosts,emptyStudy,decodeStudy,stages,methods,fieldsFor,missingFor,studyMarkdown,assistantBrief,fileStem,hasContent,MAX_FILE_SIZE} from '../site/study.mjs';
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
 for(const raw of ['bad JSON','null','[]',JSON.stringify({...emptyStudy(),version:3}),JSON.stringify({...emptyStudy(),method:'__proto__'}),JSON.stringify({...emptyStudy(),answers:{unexpected:'x'}}),JSON.stringify({...emptyStudy(),question:123}),JSON.stringify({...emptyStudy(),checks:{plan:['true',false,false]}}),JSON.stringify({...emptyStudy(),answers:{purpose:'a'.repeat(20001)}}),' '.repeat(MAX_FILE_SIZE+1)])assert.throws(()=>decodeStudy(raw));
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
 const dynamic=['area-guide','paper-kind','paper-format','paper-guide','paper-structure','download-manuscript','manuscript-preview','design-fields','method','analysis-guidance','research-area','research-subarea','research-goal','domain-context','goal-help','design-candidates','design-selection-status'];for(const m of app.matchAll(/\$\('([^']+)'\)/g))assert.ok(ids.includes(m[1])||dynamic.includes(m[1]),m[1]);
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
 for(const file of ['index.html','guide.html','example.html','about.html','tools.html','examples.html','designs.html','paths.html','formats.html','quality.html',...Object.keys(catalog.guides).map(k=>k+'.html')]){
  const html=readFileSync(new URL('../site/'+file,import.meta.url),'utf8');
  for(const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   if(/^(https?:|#|\.\/\?)/.test(href)||href==='./')continue;
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

test('legacy drafts migrate without losing question, notes or method',()=>{
 const old=JSON.parse(readFileSync(new URL('../site/noaa.study.json',import.meta.url),'utf8'));
 const migrated=decodeStudy(JSON.stringify(old));assert.equal(migrated.version,2);
 assert.equal(migrated.classification.domain,'undecided');assert.deepEqual(migrated.answers,old.answers);assert.equal(migrated.method,old.method);
 assert.deepEqual(decodeStudy(JSON.stringify(migrated)),migrated);
});
test('guided choices preserve notes, clear dependent review, and export context',()=>{
 const s=irrigation();s.checks.analyze=[true,true,true];s.checks.share=[true,true,true];
 setClassification(s,'domain','medical');setClassification(s,'subarea','clinical');setClassification(s,'goal','predict');
 assert.equal(s.method,'undecided');assert.equal(s.answers.outcome,'Change in stem height (cm), day 0 to day 21.');
 setClassification(s,'pattern','diagnostic');s.patternNotes.diagnostic={reference:'Masked reference assessment',spectrum:'Consecutive eligible sample'};
 assert.equal(s.method,'observational');assert.equal(selectedPattern(s).label,'Diagnostic accuracy study');
 const report=studyMarkdown(s);for(const value of ['Medical & health','Clinical / patient care','Diagnostic accuracy study','Masked reference assessment'])assert.ok(report.includes(value));
 assert.ok(s.checks.analyze.every(v=>!v));assert.ok(s.checks.share.every(v=>!v));
 setClassification(s,'pattern','prediction');assert.equal(s.patternNotes.diagnostic.reference,'Masked reference assessment');assert.ok(!studyMarkdown(s).includes('Masked reference assessment'));
 setClassification(s,'pattern','diagnostic');assert.ok(studyMarkdown(s).includes('Masked reference assessment'));
 setClassification(s,'domain','engineering');assert.equal(s.classification.subarea,'undecided');assert.equal(s.classification.pattern,'diagnostic');
 assert.deepEqual(decodeStudy(JSON.stringify(s)),s);
});
test('catalog candidates explain selection and reject inconsistent imported choices',()=>{
 assert.equal(Object.keys(catalog.patterns).length,20);
 assert.deepEqual(new Set(designCandidates('medical','predict').map(([id])=>id)),new Set(['diagnostic','prediction']));
 assert.equal(designCandidates('engineering','observe').length,5);
 const s=emptyStudy();setClassification(s,'pattern','cohort');
 for(const bad of [{...s.classification,goal:'effect'},{...s.classification,domain:'__proto__'},{...s.classification,subarea:'clinical'}])assert.throws(()=>decodeStudy(JSON.stringify({...s,classification:bad})));
 assert.throws(()=>decodeStudy(JSON.stringify({...s,patternNotes:{cohort:{unexpected:'value'}}})));
 for(const [id,p] of Object.entries(catalog.patterns)){
  assert.ok(p.fit&&p.needs&&p.avoid&&p.analysis&&p.steps.length>=4);
  const study=emptyStudy();setClassification(study,'pattern',id);
  assert.equal(new Set(fieldsFor(study,'plan').map(f=>f.id)).size,fieldsFor(study,'plan').length);
 }
});
test('every library example opens with classification and honest results',()=>{
 for(const [id,e] of Object.entries(catalog.examples)){
  const s=decodeStudy(readFileSync(new URL('../site/'+e.file,import.meta.url),'utf8'));
  assert.ok(e.patterns.includes(s.classification.pattern));assert.equal(s.classification.domain,e.domain);assert.ok(studyMarkdown(s).includes(s.question));
  if(e.kind==='Unexecuted plan')assert.ok(!s.answers.results);
  else assert.doesNotThrow(()=>JSON.parse(s.answers.results));
  if(['diagnostic','prediction','benchmark','simulation'].includes(id))assert.deepEqual(JSON.parse(s.answers.results),JSON.parse(readFileSync(new URL('../examples/study-patterns/results/'+id+'.json',import.meta.url),'utf8')));
 }
});

test('assistant tasks use the procedure appropriate to the selected analysis',()=>{
 const s=emptyStudy();s.question='My actual study question';s.stage='analyze';
 for(const [pattern,skill] of [['proof','mathematical-analysis'],['systematic','evidence-synthesis'],['interviews','data-understanding'],['benchmark','reproduce-analysis']]){
  setClassification(s,'pattern',pattern);assert.equal(skillFor(s),skill);assert.ok(assistantBrief(s).includes('Use the '+skill+' skill.'));
 }
});

test('paper scaffolds retain the exact question and distinguish review work from research',()=>{
 const s=emptyStudy();s.title='An actual title: "quoted"';s.question='What changed in the measured response?';s.answers.analysis='Plan: compare independent runs';s.answers.results='Observed response: 12.3 units';
 for(const kind of ['research','review'])for(const format of ['markdown','quarto']){
  const text=manuscript(s,kind,format);assert.ok(text.includes(s.question));assert.ok(text.includes(s.answers.results));assert.ok(text.includes(s.answers.analysis));assert.ok(text.includes('Not a finished or verified manuscript'));assert.ok(text.includes('[Not yet recorded]'));
  for(const [heading] of catalog.papers[kind].sections)assert.ok(text.includes('## '+heading));
  if(format==='quarto'){assert.ok(text.startsWith('---\ntitle: '+JSON.stringify(s.title)));assert.ok(text.includes('execute:\n  enabled: false'));}
 }
 delete s.answers.results;assert.ok(!manuscript(s).includes('Observed response: 12.3'));
 assert.throws(()=>manuscript(emptyStudy()));assert.throws(()=>manuscript(s,'unknown'));assert.throws(()=>manuscript(s,'research','pdf'));
});
test('requested subject paths and chemistry subsections share valid designs and examples',()=>{
 assert.deepEqual(Object.keys(catalog.guides).sort(),['medical','engineering','materials','chemistry','physics','theory','research-papers','review-papers'].sort());
 for(const [id,g] of Object.entries(catalog.guides)){
  assert.ok(catalog.domains[g.domain]);for(const p of g.patterns)assert.ok(catalog.patterns[p]);for(const e of g.examples)assert.ok(catalog.examples[e]);for(const s of g.sources)assert.ok(catalog.sources[s]);
  for(const field of ['choose','records','flow','analysis','formatting'])assert.ok(g[field].length>=2,id+field);
 }
 for(const subarea of ['organic','physical','experimental']){
  const s=emptyStudy();setClassification(s,'domain','chemistry');setClassification(s,'subarea',subarea);setClassification(s,'pattern','factorial');s.question='My chemical question';assert.equal(decodeStudy(JSON.stringify(s)).classification.subarea,subarea);assert.ok(studyMarkdown(s).includes(catalog.domains.chemistry.subareas[subarea]));
 }
});
