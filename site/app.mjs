import {hosts,stages,methods,STORAGE_KEY,MAX_FILE_SIZE,emptyStudy,decodeStudy,hasContent,fieldsFor,missingFor,studySections,studyMarkdown,fileStem,assistantBrief} from './study.mjs?v=editor-4';
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
      const wrap=node('div',undefined,'field'),label=node('label','Study design'),select=node('select');label.htmlFor='method';select.id='method';
      for(const [value,{label}] of Object.entries(methods)){const option=node('option',label);option.value=value;select.append(option);}select.value=study.method;
      select.addEventListener('change',()=>{study.method=select.value;resetReview('plan');buildDesignFields();save();updateOutput();});wrap.append(label,select,node('p','Changing design keeps the notes you entered for other designs.','hint'));panel.append(wrap);
      const design=node('div');design.id='design-fields';panel.append(design);
    }
    for(const [id,label,hint] of stage.fields)field(panel,'answer-'+id,label,hint,study.answers[id]||'',value=>{study.answers[id]=value;resetReview(key);});
    const review=node('fieldset',undefined,'stage-review');review.append(node('legend','Review for '+stage.label));
    stage.checks.forEach((text,i)=>{const label=node('label'),box=node('input');box.type='checkbox';box.checked=study.checks[key]?.[i]===true;box.addEventListener('change',()=>{study.checks[key]??=stage.checks.map(()=>false);study.checks[key][i]=box.checked;save();updateOutput();});label.append(box,node('span',text));review.append(label);});
    review.append(node('p','These are your review notes, not automatic validation. Editing this stage clears its checks; changing the question clears all stage checks.','hint'));panel.append(review);
    field(panel,'next-'+key,'Next action for '+stage.label,'Record the next concrete action, owner or unresolved decision.',study.next[key]||'',value=>study.next[key]=value);
    $('stage-panels').append(panel);
  }
  buildDesignFields();
}
function buildDesignFields(){
  const container=$('design-fields');container.replaceChildren();
  if(study.method==='undecided'){container.append(node('p','Select a design to record the specific decisions your protocol needs.','notice'));return;}
  container.append(node('h3',methods[study.method].label+' decisions'));
  for(const [id,label,hint] of methods[study.method].fields)field(container,'design-'+id,label,hint,study.designs[study.method]?.[id]||'',value=>{study.designs[study.method]??={};study.designs[study.method][id]=value;resetReview('plan');});
}
function selectStage(key){study.stage=key;showStage();save();updateOutput();}
function showStage(){
  for(const key of Object.keys(stages)){$('panel-'+key).hidden=key!==study.stage;$('tab-'+key).setAttribute('aria-selected',String(key===study.stage));$('tab-'+key).tabIndex=key===study.stage?0:-1;}
  document.querySelector('.editor-layout').classList.toggle('review-mode',study.stage==='share');
  if(study.stage==='share')$('preview-details').open=true;
}
const examples={
  experiment:['python examples/experimental-design/design.py --blocks 3 --seed 42','A teaching schedule only: 12 planned runs. It does not choose the sample size or generate observations for your study.','experimental-design'],
  game:['python examples/game-theory/analyze.py','Checks pure equilibria for toy payoffs. It does not estimate payoffs or predict real behavior.','game-theory'],
  computational:['python -m pip install -r examples/mathematics/requirements.txt\npython examples/mathematics/verify.py','Optional SymPy demonstration. Use a virtual environment; these are known-answer examples.','mathematics'],
  default:['python examples/paired-measurements/analyze.py --check','Reproduces eight synthetic pairs. This is separate from the observations in your study.','paired-measurements']
};
function updateOutput(){
  const ready=Boolean(study.question.trim()),stage=stages[study.stage],missing=missingFor(study,study.stage),fields=fieldsFor(study,study.stage);
  $('json-preview').textContent=JSON.stringify(study,null,2);
  $('output-title').textContent=study.title.trim()||'Untitled study';$('output-question').textContent=ready?study.question:'Enter your research question to start.';$('output-method').textContent=methods[study.method].label;
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
  $('setup-command').textContent=study.host==='standalone'?'python research.py doctor':'python research.py install-skills --tool '+study.host+'\n'+study.host;
  const [command,limit,guide]=examples[study.method]||examples.default;$('example-command').textContent=command;$('example-limit').textContent=limit;$('example-guide').href='https://github.com/Chandrashekhar-Hegde/open-research/blob/main/examples/'+guide+'/README.md';
}
function populate(){
  $('study-title').value=study.title;$('question').value=study.question;$('host').value=study.host;buildPanels();showStage();updateOutput();
}
for(const [id,key] of [['study-title','title'],['question','question']])$(id).addEventListener('input',()=>{study[key]=$(id).value;if(key==='question')Object.keys(stages).forEach(resetReview);save();updateOutput();});
$('host').addEventListener('change',()=>{study.host=$('host').value;save();updateOutput();});
async function copy(text,status){try{await navigator.clipboard.writeText(text);$(status).textContent='Copied the current '+(status==='tool-status'?'assistant task and study.':'study document.');}catch{$('preview-details').open=true;$('markdown-details').open=true;$(status).textContent='Clipboard unavailable. Select and copy the full document below.';}}
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
populate();
if(storageBlocked)$('save-status').textContent='Not saved to browser storage — use JSON backup.';
else if(hasContent(study))$('save-status').textContent='Restored your saved study from this device.';
