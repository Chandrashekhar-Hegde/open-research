export const tasks = {
  plan: {label:'Plan a study', skill:'research-protocol', stage:'01 / QUESTION & PLAN', output:'A question, protocol, analysis plan, and empty evidence records.', guide:'daily-workflow.md', command:'python research.py init studies/my-study --title "My research question"', next:'Edit study.json, protocol.md, and analysis-plan.md. State what is unknown before you analyze.'},
  data: {label:'Understand data', skill:'data-understanding', stage:'02 / INSPECT', output:'A JSON profile: rows, missing cells, duplicates, numeric summaries, and limits.', guide:'data-understanding.md', command:'python research.py profile examples/paired-measurements/data/raw.csv --output build/profile.json', next:'Review units, identifiers, missing-value conventions, and collection. The profile does not choose a valid study design.'},
  evidence: {label:'Review literature', skill:'evidence-synthesis', stage:'02 / INSPECT', output:'Search and screening records, traceable sources, and a claim ledger.', guide:'literature-review.md', command:'python research.py init studies/literature-review --title "My literature question"', next:'Record exact searches and exclusion decisions. Inspect original sources, and link claims to page, table, or section locations.'},
  math: {label:'Calculate & verify', skill:'mathematical-analysis', stage:'03 / ANALYZE', output:'Exact derivatives, an integral, equation roots, and a checked linear-system solution.', guide:'mathematics.md', command:'python -m pip install -r examples/mathematics/requirements.txt\npython examples/mathematics/verify.py', next:'Use a virtual environment for optional SymPy. Expected derivative: 10; integral: 1/3; linear solution: [2, 1].'},
  write: {label:'Write from evidence', skill:'academic-writing', stage:'04 / INTERPRET & WRITE', output:'An editable manuscript scaffold assembled from existing claims and sources.', guide:'academic-writing.md', command:'python research.py draft examples/paired-measurements --output build/manuscript.md', next:'Fill the author sections, verify each claim, and disclose limitations. This creates a scaffold, not a finished paper.'},
  build: {label:'Build a research tool', skill:'research-tool-building', stage:'03 / ANALYZE', output:'A small CLI with an input/output contract and an independent known-answer check.', guide:'building-tools.md', command:'python examples/paired-measurements/analyze.py --check\npython -m unittest discover -s tests -v', next:'Inspect the paired analysis as a minimal pattern. Reuse an existing library and add only the logic your task needs.'},
  release: {label:'Review & share', skill:'research-release', stage:'05 / REVIEW & RELEASE', output:'Checked records, source references, artifact integrity, and an explicit review scope.', guide:'open-release.md', command:'python research.py check examples/paired-measurements --release', next:'Verify rights, consent, evidence, provenance, and reproduction. Structural checks do not establish scientific validity.'}
};
export const hosts = {standalone:'Python only', codex:'Codex', claude:'Claude Code', opencode:'OpenCode'};
export function buildPlan(task,host,question='') {
  if (!Object.hasOwn(tasks,task) || !Object.hasOwn(hosts,host)) throw new Error('Unknown task or tool');
  const item=tasks[task];
  const setup=host==='standalone'?'python research.py doctor':'python research.py install-skills --tool '+host+'\n'+host;
  const brief='Read AGENTS.md and agents/lurch.md. Use the '+item.skill+' skill.\nResearch question: '+(question.trim()||'State the question and what would change your conclusion.')+'\nInspect evidence before acting. Record assumptions, methods, checks, limitations, and the next useful step.';
  const markdown=['# Research session','','## Question',question.trim()||'Define the question before analysis.','','## Task',item.label+' with '+hosts[host]+'.','','## Setup','```sh',setup,'```','','## Starting command','```sh',item.command,'```','','## Expected artifact',item.output,'','## Review and next step',item.next,'','## Assistant task (optional)',brief,'','## End-of-day record','What changed? What remains uncertain? What happens next?',''].join('\n');
  return {...item,setup,brief,markdown};
}
if(typeof document!=='undefined') {
  const $=id=>document.getElementById(id);
  function render(){
    const plan=buildPlan($('task').value,$('host').value,$('question').value);
    $('stage').textContent=plan.stage;$('result-title').textContent=plan.label;
    $('setup-code').textContent=plan.setup;$('run-code').textContent=plan.command;
    $('artifact').textContent=plan.output;$('next-step').textContent=plan.next;$('brief').textContent=plan.brief;
    $('guide').href='https://github.com/Chandrashekhar-Hegde/open-research/blob/main/docs/'+plan.guide;
    $('assistant-section').hidden=$('host').value==='standalone';
    document.querySelectorAll('[data-task]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.task===$('task').value)));
  }
  ['task','host'].forEach(id=>$(id).addEventListener('change',render));$('question').addEventListener('input',render);
  document.querySelectorAll('[data-task]').forEach(button=>button.addEventListener('click',()=>{$('task').value=button.dataset.task;render();}));
  document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText($(button.dataset.copy).textContent);$('status').textContent='Copied to clipboard.';}
    catch{$('status').textContent='Clipboard unavailable. Select and copy the command text.';}
  }));
  $('download').addEventListener('click',()=>{
    const plan=buildPlan($('task').value,$('host').value,$('question').value);
    const url=URL.createObjectURL(new Blob([plan.markdown],{type:'text/markdown;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='research-session.md';link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);$('status').textContent='Session downloaded. Your question stays in this browser.';
  });
  const boxes=[...document.querySelectorAll('.checklist input')];
  try{const saved=JSON.parse(localStorage.getItem('open-research-checklist')||'[]');if(Array.isArray(saved))boxes.forEach((box,i)=>box.checked=saved[i]===true);}catch{}
  function progress(){const count=boxes.filter(b=>b.checked).length;$('progress').textContent=count+' of '+boxes.length+' recorded';try{localStorage.setItem('open-research-checklist',JSON.stringify(boxes.map(b=>b.checked)));}catch{}}
  boxes.forEach(box=>box.addEventListener('change',progress));$('reset').addEventListener('click',()=>{boxes.forEach(box=>box.checked=false);progress();});
  progress();render();
}
