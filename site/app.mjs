import {manuscript} from './manuscript.mjs?v=designs-2';
import {catalog,designCandidates,setClassification,selectedPattern,hostSetup,stages,methods,STORAGE_KEY,MAX_FILE_SIZE,emptyStudy,decodeStudy,hasContent,fieldsFor,missingFor,studySections,studyMarkdown,fileStem,assistantBrief} from './study.mjs?v=designs-2';
const $=id=>document.getElementById(id);
let study=emptyStudy(), storageBlocked=false;
try {
  const saved=localStorage.getItem(STORAGE_KEY);
  if(saved!==null){try{study=decodeStudy(saved);}catch{storageBlocked=true;$('storage-warning').hidden=false;$('storage-warning').textContent='The saved draft could not be read. It has not been replaced. Export any new work, then use New study to explicitly replace it, or open a valid JSON backup.';}}
} catch {storageBlocked=true;$('storage-warning').hidden=false;$('storage-warning').textContent='Browser storage is unavailable. Keep this page open and save an editable JSON backup before leaving.';}
function save(){
  if(storageBlocked){$('save-status').textContent='Not saved to browser storage — use JSON backup.';return;}
  try {localStorage.setItem(STORAGE_KEY,JSON.stringify(study));$('save-status').textContent='Saved on this device. No data uploaded.';}
  catch {storageBlocked=true;$('save-status').textContent='Unable to save — use JSON backup.';$('storage-warning').hidden=false;$('storage-warning').textContent='Saving failed. Your current answers remain in this page. Save an editable JSON backup before leaving.';}
}
function node(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
function field(parent,id,label,hint,value,onInput){
  const wrap=node('div',undefined,'field'), lab=node('label',label), input=node('textarea');lab.htmlFor=id;input.id=id;input.rows=3;input.maxLength=20000;input.value=value;
  const help=node('p',hint,'hint');help.id=id+'-hint';input.setAttribute('aria-describedby',help.id);input.addEventListener('input',()=>{onInput(input.value);save();updateOutput();});wrap.append(lab,help,input);parent.append(wrap);
}
function resetReview(stage){
  if(study.checks[stage]?.some(Boolean)){study.checks[stage]=stages[stage].checks.map(()=>false);document.querySelectorAll('#panel-'+stage+' input[type="checkbox"]').forEach(box=>box.checked=false);}
}
function buildPanels(){
  $('stage-tabs').replaceChildren();$('stage-panels').replaceChildren();
  for(const [key,stage] of Object.entries(stages)){
    const tab=node('button',stage.label);tab.type='button';tab.id='tab-'+key;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','panel-'+key);tab.dataset.stage=key;
    tab.addEventListener('click',()=>selectStage(key));tab.addEventListener('keydown',event=>{
      const keys=Object.keys(stages),index=keys.indexOf(key);let target;
      if(event.key==='ArrowRight')target=keys[(index+1)%keys.length];if(event.key==='ArrowLeft')target=keys[(index+keys.length-1)%keys.length];if(event.key==='Home')target=keys[0];if(event.key==='End')target=keys.at(-1);
      if(target){event.preventDefault();selectStage(target);$('tab-'+target).focus({preventScroll:true});}
    });$('stage-tabs').append(tab);
    const panel=node('section');panel.id='panel-'+key;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);
    panel.append(node('h2',stage.title),node('p',stage.help,'panel-help'));
    const guide=node('a','Method guidance →','guide-link');guide.href='https://github.com/Chandrashekhar-Hegde/open-research/blob/main/docs/'+stage.guide;panel.append(guide);
    if(key==='plan'){
      buildClassifier(panel);
      const advanced=node('details');advanced.append(node('summary','I already know the broad method / custom design'));
      const wrap=node('div',undefined,'field'),label=node('label','Broad method'),select=node('select');label.htmlFor='method';select.id='method';
      for(const [value,{label}] of Object.entries(methods)){const option=node('option',label);option.value=value;select.append(option);}select.value=study.method;
      select.addEventListener('change',()=>{study.method=select.value;study.classification.pattern='undecided';clearDependentReviews();refreshClassifier();buildDesignFields();refreshAnalysis();save();updateOutput();});
      wrap.append(label,select,node('p','Use the guided choices above for a specific pattern. A custom method needs its own selection rationale.','hint'));advanced.append(wrap);panel.append(advanced);
      const design=node('div');design.id='design-fields';panel.append(design);
    }
    if(key==='write')buildWriter(panel);
    if(key==='analyze'){const guide=node('div');guide.id='analysis-guidance';panel.append(guide);}
    for(const [id,label,hint] of stage.fields)field(panel,'answer-'+id,label,hint,study.answers[id]||'',value=>{study.answers[id]=value;if(key==='plan')clearDependentReviews();else resetReview(key);});
    const review=node('fieldset',undefined,'stage-review');review.append(node('legend','Review for '+stage.label));
    stage.checks.forEach((text,i)=>{const label=node('label'),box=node('input');box.type='checkbox';box.checked=study.checks[key]?.[i]===true;box.addEventListener('change',()=>{study.checks[key]??=stage.checks.map(()=>false);study.checks[key][i]=box.checked;save();updateOutput();});label.append(box,node('span',text));review.append(label);});
    review.append(node('p','These are your review notes, not automatic validation. Editing this stage clears its checks; changing the question clears all stage checks.','hint'));panel.append(review);
    field(panel,'next-'+key,'Next action for '+stage.label,'Record the next concrete action, owner or unresolved decision.',study.next[key]||'',value=>study.next[key]=value);
    $('stage-panels').append(panel);
  }
  refreshClassifier();buildDesignFields();refreshAnalysis();
}
function buildDesignFields(){
  const container=$('design-fields');container.replaceChildren();
  if(study.method==='undecided'){container.append(node('p','Select a design to record the specific decisions your protocol needs.','notice'));return;}
  container.append(node('h3',methods[study.method].label+' decisions'));
  const guidance=node('a','How to conduct this study: steps, analysis and limits →','guide-link');guidance.href='guide.html#'+study.method;container.append(guidance);
  if(selectedPattern(study)){
    container.append(node('h3',selectedPattern(study).label+' — your decisions'));
    for(const [id,label,hint] of selectedPattern(study).fields)field(container,'pattern-'+id,label,hint,study.patternNotes[study.classification.pattern]?.[id]||'',value=>{study.patternNotes[study.classification.pattern]??={};study.patternNotes[study.classification.pattern][id]=value;clearDependentReviews();});
  }
  for(const [id,label,hint] of methods[study.method].fields)field(container,'design-'+id,label,hint,study.designs[study.method]?.[id]||'',value=>{study.designs[study.method]??={};study.designs[study.method][id]=value;clearDependentReviews();});
}
function selectStage(key){study.stage=key;showStage();save();updateOutput();}
function showStage(){
  for(const key of Object.keys(stages)){$('panel-'+key).hidden=key!==study.stage;$('tab-'+key).setAttribute('aria-selected',String(key===study.stage));$('tab-'+key).tabIndex=key===study.stage?0:-1;}
  document.querySelector('.editor-layout').classList.toggle('review-mode',study.stage==='share');
  if(study.stage==='share')$('preview-details').open=true;
}
function updateOutput(){
  const ready=Boolean(study.question.trim()),stage=stages[study.stage],missing=missingFor(study,study.stage),fields=fieldsFor(study,study.stage);
  updateManuscript();
  $('json-preview').textContent=JSON.stringify(study,null,2);
  $('output-title').textContent=study.title.trim()||'Untitled study';$('output-question').textContent=ready?study.question:'Enter your research question to start.';$('output-method').textContent=(selectedPattern(study)?.label||methods[study.method].label)+(study.classification.domain!=='undecided'?' · '+catalog.domains[study.classification.domain].label:'');
  $('output-status').textContent='Working draft · '+fields.filter(f=>f.value.trim()).length+' of '+fields.length+' fields recorded in '+stage.label+'.';
  $('missing-title').textContent='Next for '+stage.label;$('missing-fields').replaceChildren(...(missing.length?missing.map(label=>node('li',label)):[node('li','All fields in this stage have text. Review the evidence and assumptions before relying on it.')]));
  $('copy-study').disabled=!ready;$('download-study').disabled=!ready;$('copy-brief').disabled=!ready||study.host==='standalone';
  const openSections=new Set([...$('document-preview').querySelectorAll('details[open]')].map(el=>el.dataset.section));
  const firstPreview=$('document-preview').children.length===0;
  $('document-preview').replaceChildren(...studySections(study).map(section=>{
    const card=node('details',undefined,'document-section');card.dataset.section=section.title;card.open=openSections.has(section.title)||(firstPreview&&['Research question','Plan'].includes(section.title));card.append(node('summary',section.title));
    const list=node('dl');for(const entry of section.entries)list.append(node('dt',entry.label),node('dd',entry.value.trim()?entry.value:'Not yet recorded',entry.value.trim()?'':'missing-value'));card.append(list);
    if(section.checks){card.append(node('h4','Review checks · self-reported'));const checks=node('ul');for(const check of section.checks)checks.append(node('li',(check.checked?'Recorded: ':'Not checked: ')+check.label));card.append(checks,node('h4','Next action'),node('p',section.next||'Not yet recorded'));}
    if(section.stage){const edit=node('button','Edit '+stages[section.stage].label);edit.type='button';edit.addEventListener('click',()=>selectStage(section.stage));card.append(edit);}return card;
  }));
  $('study-preview').textContent=ready?studyMarkdown(study):'Add your research question above. Your entered decisions will appear here; missing information will be marked as not recorded.';
  $('assistant-preview').textContent=ready?assistantBrief(study):'Enter your question first.';
  $('setup-command').textContent=hostSetup(study.host);
  $('host-guide').href='tools.html#'+(['claude','codex','opencode'].includes(study.host)?study.host:'baseline');
  $('example-command').textContent='python research.py designs --pattern '+(study.classification.pattern==='undecided'?'time-series':study.classification.pattern);$('example-limit').textContent='Lists design guidance without running an analysis. Open Analyze to choose a worked example.';$('example-guide').href='designs.html';
}
function populate(){
  $('study-title').value=study.title;$('question').value=study.question;$('host').value=study.host;buildPanels();showStage();updateOutput();
}
for(const [id,key] of [['study-title','title'],['question','question']])$(id).addEventListener('input',()=>{study[key]=$(id).value;if(key==='question')Object.keys(stages).forEach(resetReview);save();updateOutput();});
$('host').addEventListener('change',()=>{study.host=$('host').value;save();updateOutput();});
async function copy(text,status){try{await navigator.clipboard.writeText(text);$(status).textContent='Copied the current '+(status==='tool-status'?'assistant task and study.':'study document.');}catch{if(status==='tool-status'){$('assistant-details').open=true;$(status).textContent='Clipboard unavailable. Select and copy the assistant task below.';}else{$('preview-details').open=true;$('markdown-details').open=true;$(status).textContent='Clipboard unavailable. Select and copy the full document below.';}}}
$('copy-backup').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(JSON.stringify(study,null,2));$('export-status').textContent='Copied the editable JSON backup.';}catch{$('json-details').open=true;$('export-status').textContent='Clipboard unavailable. Select and copy the JSON backup below.';}});
$('copy-study').addEventListener('click',()=>copy(studyMarkdown(study),'export-status'));
$('copy-brief').addEventListener('click',()=>copy(assistantBrief(study),'tool-status'));
function download(text,suffix,type){
  const url=URL.createObjectURL(new Blob([text],{type})),link=node('a');link.href=url;link.download=fileStem(study)+suffix;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
  $('export-status').textContent='Download requested: '+link.download+(suffix.endsWith('.json')?'. If blocked, open Editable JSON backup or manual copy.':'. If blocked, use Copy study.');
}
$('download-study').addEventListener('click',()=>download(studyMarkdown(study),'.md','text/markdown;charset=utf-8'));
$('backup-study').addEventListener('click',()=>download(JSON.stringify(study,null,2),'.study.json','application/json'));
$('new-study').addEventListener('click',()=>{
  if((hasContent(study)||storageBlocked)&&!confirm('Start a new study and replace this device’s saved draft? Save an editable JSON backup first if you need it.'))return;
  study=emptyStudy();storageBlocked=false;$('storage-warning').hidden=true;$('preview-details').open=false;populate();save();$('export-status').textContent='New study started.';
});
$('import-open').addEventListener('click',()=>$('import-file').click());
$('import-file').addEventListener('change',async()=>{
  const file=$('import-file').files[0];if(!file)return;
  try{
    if(file.size>MAX_FILE_SIZE)throw new Error('The study file must be smaller than 8 MiB.');
    const imported=decodeStudy(await file.text());
    if((hasContent(study)||storageBlocked)&&!confirm('Replace the current draft with this study file? Save a JSON backup of your current work first.'))return;
    study=imported;storageBlocked=false;$('storage-warning').hidden=true;populate();save();$('export-status').textContent='Opened '+file.name+'.';
  }catch(error){$('export-status').textContent='Could not open study: '+error.message;}
  finally{$('import-file').value='';}
});
window.addEventListener('storage',event=>{
  if(event.key===STORAGE_KEY){storageBlocked=true;$('storage-warning').hidden=false;$('storage-warning').textContent='This draft changed in another tab. Saving here is paused so neither version is overwritten. Save a JSON backup of this tab, then reload to open the other tab’s draft.';$('save-status').textContent='Another tab changed the saved draft — saving paused.';}
});
for(const [id,e] of Object.entries(catalog.examples||{})){const option=node('option',e.label+' — '+e.kind);option.value=id;$('example-choice').append(option);}
populate();
if(storageBlocked)$('save-status').textContent='Not saved to browser storage — use JSON backup.';
else if(hasContent(study))$('save-status').textContent='Restored your saved study from this device.';

$('load-example').addEventListener('click',()=>loadExample($('example-choice').value));

function clearDependentReviews(){for(const key of ['plan','analyze','write','share'])resetReview(key);}
function selectControl(parent,id,label,options,value,onChange){
 const wrap=node('div',undefined,'field'),lab=node('label',label),select=node('select');lab.htmlFor=id;select.id=id;
 for(const [key,text] of options){const opt=node('option',text);opt.value=key;select.append(opt);}select.value=value;
 select.addEventListener('change',()=>onChange(select.value));wrap.append(lab,select);parent.append(wrap);return select;
}
function changeClassification(key,value){
 setClassification(study,key,value);clearDependentReviews();
 // State checks have been reset; update rendered boxes too.
 for(const stage of ['plan','analyze','write','share'])document.querySelectorAll('#panel-'+stage+' input[type="checkbox"]').forEach(b=>b.checked=false);
 refreshClassifier();$('method').value=study.method;buildDesignFields();refreshAnalysis();save();updateOutput();
}
function buildClassifier(panel){
 const box=node('section',undefined,'design-picker');box.setAttribute('aria-label','Choose a study design');
 box.append(node('h3','Start with your research area'),node('p','Area tells us the setting. Your goal helps identify a design. You can change either without deleting your notes.','hint'));
 const row=node('div',undefined,'classification-row');
 selectControl(row,'research-area','1. What area are you working in?',Object.entries(catalog.domains).map(([k,v])=>[k,v.label]),study.classification.domain,v=>changeClassification('domain',v));
 selectControl(row,'research-subarea','Subsection',[['undecided','Choose a subsection (optional)']],study.classification.subarea,v=>changeClassification('subarea',v));box.append(row);
 const context=node('p',undefined,'domain-context');context.id='domain-context';box.append(context);const path=node('a');path.id='area-guide';path.className='guide-link';box.append(path);
 selectControl(box,'research-goal','2. What do you want to find out?',Object.entries(catalog.goals).map(([k,v])=>[k,v.label]),study.classification.goal,v=>changeClassification('goal',v));
 const goalHelp=node('p',undefined,'hint');goalHelp.id='goal-help';box.append(goalHelp);
 const heading=node('h3','3. Choose the situation that matches your study');box.append(heading);
 const choices=node('div',undefined,'design-candidates');choices.id='design-candidates';box.append(choices);
 const status=node('p',undefined,'hint');status.id='design-selection-status';status.setAttribute('role','status');box.append(status);
 const guide=node('a','Compare all areas and designs →');guide.href='designs.html';box.append(guide);panel.append(box);
 // The classifier has been attached, so named controls can now be updated.
 refreshClassifier();
}
function refreshClassifier(){
 if(!$('research-area'))return;
 const c=study.classification,area=catalog.domains[c.domain];$('research-area').value=c.domain;$('research-goal').value=c.goal;
 $('research-subarea').replaceChildren(...[['undecided','Choose a subsection (optional)'],...Object.entries(area.subareas)].map(([key,label])=>{const opt=node('option',label);opt.value=key;return opt;}));$('research-subarea').value=c.subarea;$('research-subarea').disabled=c.domain==='undecided';
 $('area-guide').href=area.guide?area.guide+'.html':'paths.html';$('area-guide').textContent=area.guide?'Follow the '+catalog.guides[area.guide].title+' guide →':'Browse the research guide paths →';
 $('domain-context').textContent=area.context;$('goal-help').textContent=catalog.goals[c.goal].help;
 const choices=$('design-candidates');choices.replaceChildren();
 if(c.goal==='undecided')choices.append(node('p','Choose your goal above. You do not need to know a study-design name.','notice'));
 else for(const [id,p] of designCandidates(c.domain,c.goal)){
  const card=node('article',undefined,'design-option');card.classList.toggle('chosen',c.pattern===id);
  card.append(node('h4',p.label),node('p',p.fit));
  const details=node('details');details.append(node('summary','What this needs and when to reconsider'),node('p','Requires: '+p.needs),node('p','Reconsider when: '+p.avoid));card.append(details);
  const choose=node('button',c.pattern===id?'Selected':'Use this design');choose.type='button';choose.id='choose-'+id;choose.setAttribute('aria-pressed',String(c.pattern===id));choose.setAttribute('aria-label',(c.pattern===id?'Selected: ':'Use ')+p.label);
  choose.addEventListener('click',()=>{changeClassification('pattern',id);$('choose-'+id).focus({preventScroll:true});});card.append(choose);choices.append(card);
 }
 $('design-selection-status').textContent=selectedPattern(study)?'Selected: '+selectedPattern(study).label+'. Notes from other designs remain in your JSON backup. Recheck existing analysis and results after changing design.':'No specific design selected yet. Choose a situation above or describe a custom design below.';
}
function relevantExamples(){return Object.entries(catalog.examples||{}).filter(([,e])=>study.classification.pattern==='undecided'||e.patterns.includes(study.classification.pattern));}
function refreshAnalysis(){
 const box=$('analysis-guidance');if(!box)return;box.replaceChildren();const p=selectedPattern(study);
 box.append(node('h3',p?'Analysis for '+p.label:'Choose a design to get analysis guidance'));
 if(p){box.append(node('p',p.analysis,'analysis-direction'));const steps=node('ol');for(const step of p.steps)steps.append(node('li',step));box.append(steps);
  const plan=node('button','Open an example plan for '+p.label);plan.type='button';plan.addEventListener('click',()=>loadPatternPlan(study.classification.pattern));box.append(plan,node('p','This is an illustrative plan with no results. It opens only after you confirm replacing your draft.','hint'));
 }else box.append(node('p','Use Plan to select a research area, goal and design. No statistical test is selected automatically.'));
 box.append(node('h3','Worked examples for this design'));
 const entries=relevantExamples();
 if(!entries.length)box.append(node('p','No executed example is supplied for this specific pattern yet. Use the example plan above; collect and analyze actual evidence before claiming results.','notice'));
 for(const [id,e] of entries){const card=node('article',undefined,'analysis-example');card.append(node('h4',e.label),node('p',e.kind,'example-kind'),node('p',e.description));
  const cmd=node('pre',e.command);cmd.tabIndex=0;card.append(cmd);const open=node('button','Open '+e.label);open.type='button';open.addEventListener('click',()=>loadExample(id));card.append(open);
  const link=node('a','Data, code and limits →');link.href=e.guide;card.append(link);box.append(card);
 }
 const library=node('a','Browse all study examples →');library.href='examples.html';box.append(library);
}
function replaceStudy(imported,message){
 if((hasContent(study)||storageBlocked)&&!confirm('Replace your current draft with this example? Save editable JSON first to keep your work.'))return;
 study=imported;storageBlocked=false;$('storage-warning').hidden=true;populate();save();$('export-status').textContent=message;
}
async function loadExample(id){
 try{const e=catalog.examples[id];if(!e)throw new Error('Choose an example first.');const response=await fetch(e.file);if(!response.ok)throw new Error('Could not load example.');replaceStudy(decodeStudy(await response.text()),'Opened '+e.label+' — '+e.kind+'. Read its code and limits.');}
 catch(error){$('export-status').textContent=error.message;}
}
function loadPatternPlan(id){
 const p=catalog.patterns[id],example=emptyStudy();example.title='Example plan: '+p.label;example.question=p.question;example.stage='plan';
 setClassification(example,'domain',study.classification.domain==='undecided'?p.domains[0]:study.classification.domain);setClassification(example,'pattern',id);
 example.answers={purpose:'Illustrative study plan for learning this design. Adapt the question and justify it for your setting; no study has been conducted.',procedure:'Planned sequence:\n'+p.steps.map((s,i)=>(i+1)+'. '+s).join('\n'),analysis:'Planned approach (not executed): '+p.analysis,limitations:'No observations or results have been collected for this example plan. '+p.avoid};
 replaceStudy(example,'Opened an unexecuted '+p.label+' plan. Supply your actual setting, decisions and evidence.');
}

function buildWriter(panel){
 const box=node('section',undefined,'manuscript-tools');box.append(node('h3','Create a manuscript scaffold'),node('p','Choose a paper type and file format. Your question and entered records are included; you must write and verify the manuscript. Export choices affect this file only.','hint'));
 selectControl(box,'paper-kind','Paper type',Object.entries(catalog.papers).map(([id,p])=>[id,p.label]),study.method==='synthesis'?'review':'research',()=>updateManuscript());
 selectControl(box,'paper-format','File format',[['markdown','Markdown (.md)'],['quarto','Quarto (.qmd) — render HTML or Word locally']],'markdown',()=>updateManuscript());
 const link=node('a');link.id='paper-guide';box.append(link);
 const structure=node('ul');structure.id='paper-structure';box.append(structure);
 const button=node('button','Download manuscript scaffold');button.type='button';button.id='download-manuscript';button.addEventListener('click',()=>download(manuscript(study,$('paper-kind').value,$('paper-format').value),'.'+$('paper-kind').value+($('paper-format').value==='quarto'?'.qmd':'.md'),'text/plain;charset=utf-8'));box.append(button);
 const details=node('details');details.append(node('summary','Preview / manually copy manuscript scaffold'));const preview=node('pre');preview.id='manuscript-preview';preview.tabIndex=0;details.append(preview);box.append(details);
 const formats=node('a','Formatting, citations and rendering instructions →');formats.href='formats.html';box.append(formats);panel.append(box);
}
function updateManuscript(){
 if(!$('paper-kind'))return;
 const kind=$('paper-kind').value,p=catalog.papers[kind];$('paper-guide').href=p.guide+'.html';$('paper-guide').textContent='Read the '+p.label.toLowerCase()+' guide →';
 $('paper-structure').replaceChildren(...p.sections.map(([heading,guidance])=>node('li',heading+': '+guidance)));
 $('download-manuscript').disabled=!study.question.trim();$('manuscript-preview').textContent=study.question.trim()?manuscript(study,kind,$('paper-format').value):'Enter your research question first. Missing results will remain marked as not recorded.';
}

const route=new URLSearchParams(window.location.search);
if(route.has('example')){const id=route.get('example');if(Object.hasOwn(catalog.examples,id))loadExample(id);else $('export-status').textContent='Unknown example. Choose one from the library.';}
else if(route.has('design')){const id=route.get('design');if(Object.hasOwn(catalog.patterns,id)){changeClassification('pattern',id);selectStage('plan');}else $('export-status').textContent='Unknown design. Use the guided selector in Plan.';}
else if(route.has('area')){const area=route.get('area');if(Object.hasOwn(catalog.domains,area)){changeClassification('domain',area);selectStage('plan');}}
else if(route.has('paper')){const kind=route.get('paper');if(Object.hasOwn(catalog.papers,kind)){$('paper-kind').value=kind;selectStage('write');}}
else if(route.get('stage')==='plan')selectStage('plan');
if(route.has('example')||route.has('design')||route.has('stage')||route.has('area')||route.has('paper'))history.replaceState(null,'',window.location.pathname+window.location.hash);
