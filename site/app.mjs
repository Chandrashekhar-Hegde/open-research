export const tasks = {
  inspire: {label:'Explore a question', skill:'research-protocol', stage:'01 / UNDERSTAND', output:'A bounded question, alternative explanations, and evidence still needed.', guide:'design-and-analysis.md', command:'python research.py init studies/new-question --title "Question to investigate"', next:'Explain who needs the answer. Compare candidate questions against existing evidence and feasibility; an AI suggestion does not establish novelty.'},
  experiment: {label:'Design an experiment', skill:'research-protocol', stage:'02 / DESIGN', output:'A teaching run order: 12 planned runs, four factor combinations in each of three blocks. No observations.', guide:'design-and-analysis.md', command:'python examples/experimental-design/design.py --blocks 3 --seed 42', next:'Select Controlled experiment under Study design. Define real factors, experimental units, outcome and replication rationale before collection. Three blocks is a demonstration choice, not a power calculation.'},
  analysis: {label:'Analyze a study', skill:'reproduce-analysis', stage:'03 / ANALYZE', output:'A reproduced synthetic paired analysis with mean change 2.0 units.', guide:'design-and-analysis.md', command:'python examples/paired-measurements/analyze.py --check', next:'For your study, justify the estimand, comparison, assumptions, missingness, uncertainty and sensitivity. This example verifies arithmetic; it does not establish causation.'},
  game: {label:'Study strategic decisions', skill:'mathematical-analysis', stage:'03 / GAME THEORY', output:'Pure Nash equilibria for a two-player game; the example returns zero-based cell [1, 1].', guide:'design-and-analysis.md', command:'python examples/game-theory/analyze.py\npython examples/game-theory/analyze.py --example matching-pennies', next:'Select Game-theory model under Study design. Specify players, actions, information, timing and payoffs. The second example has no pure equilibrium; mixed equilibria are not computed. These are models, not observed behavior.'},
  plan: {label:'Plan a study', skill:'research-protocol', stage:'01 / QUESTION & PLAN', output:'A question, protocol, analysis plan, and empty evidence records.', guide:'daily-workflow.md', command:'python research.py init studies/my-study --title "My research question"', next:'Edit study.json, protocol.md, and analysis-plan.md. State what is unknown before you analyze.'},
  data: {label:'Understand data', skill:'data-understanding', stage:'02 / INSPECT', output:'A JSON profile: rows, missing cells, duplicates, numeric summaries, and limits.', guide:'data-understanding.md', command:'python research.py profile examples/paired-measurements/data/raw.csv --output build/profile.json', next:'Review units, identifiers, missing-value conventions, and collection. The profile does not choose a valid study design.'},
  evidence: {label:'Review literature', skill:'evidence-synthesis', stage:'02 / INSPECT', output:'Search and screening records, traceable sources, and a claim ledger.', guide:'literature-review.md', command:'python research.py init studies/literature-review --title "My literature question"', next:'Record exact searches and exclusion decisions. Inspect original sources, and link claims to page, table, or section locations.'},
  math: {label:'Calculate & verify', skill:'mathematical-analysis', stage:'03 / ANALYZE', output:'Exact derivatives, an integral, equation roots, and a checked linear-system solution.', guide:'mathematics.md', command:'python -m pip install -r examples/mathematics/requirements.txt\npython examples/mathematics/verify.py', next:'Use a virtual environment for optional SymPy. Expected derivative: 10; integral: 1/3; linear solution: [2, 1].'},
  write: {label:'Write from evidence', skill:'academic-writing', stage:'04 / INTERPRET & WRITE', output:'An editable manuscript scaffold assembled from existing claims and sources.', guide:'academic-writing.md', command:'python research.py draft examples/paired-measurements --output build/manuscript.md', next:'Fill the author sections, verify each claim, and disclose limitations. This creates a scaffold, not a finished paper.'},
  build: {label:'Build a research tool', skill:'research-tool-building', stage:'03 / ANALYZE', output:'A small CLI with an input/output contract and an independent known-answer check.', guide:'building-tools.md', command:'python examples/paired-measurements/analyze.py --check\npython -m unittest discover -s tests -v', next:'Inspect the paired analysis as a minimal pattern. Reuse an existing library and add only the logic your task needs.'},
  release: {label:'Review & share', skill:'research-release', stage:'05 / REVIEW & RELEASE', output:'Checked records, source references, artifact integrity, and an explicit review scope.', guide:'open-release.md', command:'python research.py check examples/paired-measurements --release', next:'Verify rights, consent, evidence, provenance, and reproduction. Structural checks do not establish scientific validity.'}
};
export const hosts = {standalone:'Python only', codex:'Codex', claude:'Claude Code', opencode:'OpenCode'};
export const checklist = [
  'The question and assumptions are written down.',
  'Evidence has a source and an exact location.',
  'Methods, inputs, and checks can be inspected.',
  'Limitations and unresolved findings are visible.',
  'The next useful action is recorded.'
];
export const methods = {
  undecided: {label:'Not decided yet', decisions:['Who needs the answer, and what decision will it inform?', 'What is the unit of study? What evidence would change the conclusion?', 'Which design is feasible, and what will it be unable to establish?']},
  experiment: {label:'Controlled experiment', decisions:['Define experimental units, factors and levels, primary outcome and comparison.', 'Justify randomization, blocking, blinding, independent replication and sample size or precision.', 'Record exclusions, stopping rule, analysis and deviations before collection; assess interference and feasibility.']},
  observational: {label:'Observational study', decisions:['Define population, sampling, measurements, time ordering and target quantity.', 'Identify confounding, selection bias, missingness and repeated measures.', 'Choose an uncertainty and sensitivity analysis; a causal claim needs an explicit identification argument.']},
  qualitative: {label:'Qualitative study', decisions:['Specify the context, sampling rationale, consent and researcher position.', 'Choose an interview or observation process and a defensible interpretive method.', 'Preserve permitted source excerpts and contradictory cases; do not substitute generated participants.']},
  synthesis: {label:'Evidence synthesis', decisions:['Record databases, exact searches, dates and inclusion rules.', 'Document screening, extraction, source locations and risk-of-bias appraisal.', 'Explain coverage gaps and heterogeneity before deciding whether pooling is appropriate.']},
  computational: {label:'Computational or mathematical study', decisions:['Define variables, domains, assumptions, inputs and a simpler baseline.', 'Record algorithms, environment, precision, convergence and known-answer checks.', 'Test sensitivity and failure cases; separate mathematical correctness from empirical validity.']},
  game: {label:'Game-theory model', decisions:['Specify players, strategies, timing, information and the provenance of payoffs.', 'Choose a solution concept; inspect unilateral deviations, ties and multiple equilibria.', 'Vary payoff assumptions and distinguish pure from mixed strategies. Behavioral predictions need separate data.']}
};
export function readChecklist(raw) {
  try {const saved=JSON.parse(raw);return checklist.map((_,i)=>Array.isArray(saved)&&saved[i]===true);}
  catch {return checklist.map(()=>false);}
}
export function buildPlan(task,host,question='',method='undecided',checked=[],notes='') {
  if (!Object.hasOwn(tasks,task) || !Object.hasOwn(hosts,host) || !Object.hasOwn(methods,method)) throw new Error('Unknown task or tool');
  const item=tasks[task];const design=methods[method];
  const setup=host==='standalone'?'python research.py doctor':'python research.py install-skills --tool '+host+'\n'+host;
  const brief='Read AGENTS.md and agents/lurch.md. Use the '+item.skill+' skill.\nResearch question: '+(question.trim()||'State the question and what would change your conclusion.')+'\nStudy design: '+design.label+'.\n'+design.decisions.join('\n')+'\nResearcher decisions: '+(notes.trim()||'Not yet recorded.')+'\nInspect evidence before acting. Record assumptions, methods, checks, limitations, and the next useful step.';
  const markdown=['# Research session','','## Question',question.trim()||'Define the question before analysis.','','## Task',item.label+' with '+hosts[host]+'.','','## Study design',design.label,...design.decisions.map(d=>'- '+d),'','## Decisions and unresolved questions',notes.trim()||'Not yet recorded.','','## Daily handoff (self-reported, not validation)',...checklist.map((label,i)=>'- ['+(checked[i]===true?'x':' ')+'] '+label),'','## Setup','```sh',setup,'```','','## Starting command','```sh',item.command,'```','','## Expected artifact',item.output,'','## Review and next step',item.next,'','## Assistant task (optional)',brief,'','## End-of-day record','What changed? What remains uncertain? What happens next?',''].join('\n');
  return {...item,setup,brief,markdown,design};
}
if(typeof document!=='undefined') {
  const $=id=>document.getElementById(id);
  function render(){
    const plan=buildPlan($('task').value,$('host').value,$('question').value,$('method').value,[...document.querySelectorAll('.checklist input')].map(box=>box.checked),$('design-notes').value);
    $('plan-preview').textContent=plan.markdown;
    $('method-title').textContent=plan.design.label;
    $('method-decisions').replaceChildren(...plan.design.decisions.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
    $('stage').textContent=plan.stage;$('result-title').textContent=plan.label;
    $('setup-code').textContent=plan.setup;$('run-code').textContent=plan.command;
    $('artifact').textContent=plan.output;$('next-step').textContent=plan.next;$('brief').textContent=plan.brief;
    $('guide').href='https://github.com/Chandrashekhar-Hegde/open-research/blob/main/docs/'+plan.guide;
    $('assistant-section').hidden=$('host').value==='standalone';
    document.querySelectorAll('[data-task]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.task===$('task').value)));
  }
  function selectTask(task){$('task').value=task;if(task==='experiment'||task==='game')$('method').value=task;render();}
  $('task').addEventListener('change',()=>selectTask($('task').value));['host','method'].forEach(id=>$(id).addEventListener('change',render));['question','design-notes'].forEach(id=>$(id).addEventListener('input',render));
  document.querySelectorAll('[data-task]').forEach(button=>button.addEventListener('click',()=>{selectTask(button.dataset.task);$('result-title').focus({preventScroll:true});$('result-title').scrollIntoView({block:'start'});}));
  document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText($(button.dataset.copy).textContent);$('status').textContent='Copied to clipboard.';}
    catch{$('status').textContent='Clipboard unavailable. Select and copy the command text.';}
  }));
  $('download').addEventListener('click',()=>{
    const plan=buildPlan($('task').value,$('host').value,$('question').value,$('method').value,[...document.querySelectorAll('.checklist input')].map(box=>box.checked),$('design-notes').value);
    const url=URL.createObjectURL(new Blob([plan.markdown],{type:'text/markdown;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='research-session.md';link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);$('status').textContent='Session prepared for download. If no file appears, use Read or copy the full plan.';
  });
  const boxes=[...document.querySelectorAll('.checklist input')];
  try{readChecklist(localStorage.getItem('open-research-checklist')).forEach((value,i)=>boxes[i].checked=value);}catch{}
  function progress(){const count=boxes.filter(b=>b.checked).length;$('progress').textContent=count+' of '+boxes.length+' recorded';try{localStorage.setItem('open-research-checklist',JSON.stringify(boxes.map(b=>b.checked)));$('storage-note').textContent='Checklist state is saved only in this browser. It stays the same across tasks, designs and tools. Checking a box does not validate a study.';}catch{$('storage-note').textContent='Browser storage is unavailable. Checklist state lasts only while this page is open; download your session before leaving.';}}
  boxes.forEach(box=>box.addEventListener('change',()=>{progress();render();}));$('reset').addEventListener('click',()=>{boxes.forEach(box=>box.checked=false);progress();render();$('status').textContent='Daily checklist reset. Question and design notes are unchanged.';});
  progress();render();
}
