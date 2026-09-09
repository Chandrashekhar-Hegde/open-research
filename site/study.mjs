// Portable study data and document generation. No browser or AI dependency.
export const hosts={standalone:'Self-guided',claude:'Claude Code',codex:'Codex',opencode:'OpenCode',assistant:'Other assistant'};
export function hostSetup(host){return ['claude','codex','opencode'].includes(host)?'python research.py install-skills --tool '+host+'\n'+host:'python research.py doctor\npython scripts/verify_workflow.py';}
export const stages={
  research:{label:'Research',title:'Understand the question',help:'Explain what is known, why this matters, and what you still need to learn.',skill:'research-protocol',guide:'research-lifecycle.md',fields:[
    ['purpose','Why does this question matter?','Who needs the answer, and what decision would it change?'],
    ['background','What is already known?','Record inspected evidence and source locations. Separate observations from ideas.'],
    ['hypothesis','What might explain it?','State a hypothesis, an alternative explanation, and evidence that would change your mind.']
  ],checks:['I have bounded the question and explained who needs the answer.','I have distinguished inspected evidence from assumptions.','I have considered an alternative explanation.']},
  plan:{label:'Plan',title:'Design your study',help:'Write the protocol you will use. Choosing a design reveals its specific decisions; it does not invent them.',skill:'research-protocol',guide:'design-and-analysis.md',fields:[
    ['units','Population and unit of study','What or whom will you study? Distinguish independent units from repeated measurements.'],
    ['comparison','Comparison or research approach','What will you compare, vary, observe, or interpret?'],
    ['outcome','Outcome or object of inquiry','Define the response and units, or the phenomenon/text you intend to understand.'],
    ['sample','Sampling and sample rationale','State recruitment or sampling, inclusion rules, and a precision, power or qualitative sampling rationale. Do not invent a number.'],
    ['procedure','Study procedure','Write the actual sequence: preparation, allocation or selection, measurement, recording, and stopping.'],
    ['safeguards','Access, consent and constraints','Record permissions, participant safeguards, feasibility and unresolved approvals.']
  ],checks:['I have justified why this design can answer the question.','I have specified units, sampling and measurement decisions.','I have recorded unresolved risks and a feasible procedure.']},
  inspect:{label:'Inspect',title:'Inspect evidence and inputs',help:'Check what your data and sources can support before interpreting them.',skill:'data-understanding',guide:'data-understanding.md',fields:[
    ['sources','Sources and exact locations','Include DOI/URL or local path, page/table/section, access date and relevant observation.'],
    ['data','Data and provenance','Where did the inputs come from? Record variables, units, collection and reuse conditions.'],
    ['quality','Quality problems and decisions','Missingness, duplicates, selection, measurement errors or contradictory sources; record what you actually checked.']
  ],checks:['I can locate the source for each input or important claim.','I have checked data definitions, missingness and collection.','I have recorded contradictions and unresolved quality problems.']},
  analyze:{label:'Analyze',title:'Analyze and check',help:'Separate the planned analysis from results actually obtained. Missing results remain missing.',skill:'reproduce-analysis',guide:'design-and-analysis.md',fields:[
    ['analysis','Analysis approach','Specify the estimand or interpretive method, comparison, assumptions, uncertainty and exclusions.'],
    ['results','Observed or computed results','Record the result, exact input/code/output paths and command used. Leave blank if not run.'],
    ['validation','Checks and sensitivity','Record known-answer tests, alternative specifications, uncertainty, failures and reproducibility checks.']
  ],checks:['I have matched the analysis to the design and assumptions.','I have checked the key calculation or interpretation.','I have separated planned work, executed results and sensitivity findings.']},
  write:{label:'Write',title:'Explain what the evidence supports',help:'Connect claims to inspected evidence and disclose uncertainty. This editor does not generate a paper.',skill:'academic-writing',guide:'academic-writing.md',fields:[
    ['interpretation','Interpretation and supported claims','Explain what the results mean and attach the evidence or output supporting each claim.'],
    ['limitations','Limitations and alternative explanations','What cannot be concluded? Include uncertainty, deviations and null or contradictory findings.'],
    ['disclosure','Contributions and AI assistance','Name actual contributions, tools used and verification performed. Do not invent review.']
  ],checks:['I have linked each substantive claim to evidence.','I have made limitations and contradictory findings visible.','I have disclosed AI assistance and the review actually performed.']},
  share:{label:'Review & export',title:'Review your study document',help:'Read the full document, return to any stage to edit it, then copy or download your work.',skill:'research-release',guide:'open-release.md',fields:[
    ['release','Sharing and reuse conditions','Identify what may be shared, licenses/access restrictions and what must remain private.'],
    ['review','Review record','Who checked what, when, and with what outcome? Self-review is not independent review.']
  ],checks:['I have read the exported question, design and conclusions.','I have checked permissions and removed material I cannot share.','I have identified unresolved work and the scope of review.']}
};
export const methods={
  undecided:{label:'Not decided yet',fields:[]},
  experiment:{label:'Controlled experiment',fields:[
    ['factors','Factors and treatment levels','Name the interventions or factors and their actual levels, including the control.'],
    ['allocation','Randomization, blocking and blinding','Specify the allocation unit and method, nuisance blocks, and who can be blinded.'],
    ['replication','Independent replication and stopping','Distinguish repeat measurements from independent units; record stopping/exclusion rules.']
  ]},
  observational:{label:'Observational study',fields:[
    ['selection','Selection and time ordering','Define the sampling frame, observation window and how exposure precedes outcome if relevant.'],
    ['confounding','Confounding and identification','Record plausible confounders, selection mechanisms and the argument needed for any causal claim.']
  ]},
  qualitative:{label:'Qualitative study',fields:[
    ['context','Context and researcher position','Record setting, participant perspective and your relationship to the material.'],
    ['interpretive','Collection and interpretive method','Specify interviews/observations, sampling rationale, coding or interpretive approach and contradictory cases.']
  ]},
  synthesis:{label:'Evidence synthesis',fields:[
    ['search','Search strategy','Databases, exact queries, dates, inclusion/exclusion rules and coverage limits.'],
    ['appraisal','Screening, appraisal and synthesis','Record screening decisions, extraction, bias appraisal and whether pooling is defensible.']
  ]},
  computational:{label:'Computational or mathematical study',fields:[
    ['definitions','Definitions and assumptions','Specify variables, domains, units, constraints and equations.'],
    ['algorithm','Algorithm and baseline','Record numerical/symbolic methods, precision, convergence and a simpler baseline.']
  ]},
  game:{label:'Game-theory model',fields:[
    ['players','Players and strategies','Who chooses what? Define feasible actions and the reason for this model.'],
    ['information','Timing and information','Simultaneous/sequential decisions, information available, repetition and uncertainty.'],
    ['payoffs','Payoffs and their basis','Write the actual payoff matrix or functions; distinguish measured values from assumptions.'],
    ['solution','Solution and sensitivity','Specify the equilibrium concept, deviations to check and payoff assumptions to vary.']
  ]}
};
export const STORAGE_KEY='open-research-study-v1';
export const MAX_FILE_SIZE=8*1024*1024;
export function emptyStudy(){return {version:1,title:'',question:'',method:'undecided',stage:'research',host:'standalone',answers:{},designs:{},checks:{},next:{}};}
export function hasContent(study){return Boolean(study.title||study.question||Object.values(study.answers).some(Boolean)||Object.values(study.designs).some(d=>Object.values(d).some(Boolean))||Object.values(study.next).some(Boolean)||Object.values(study.checks).some(a=>a.some(Boolean)));}
export function decodeStudy(raw){
  if(typeof raw!=='string'||raw.length>MAX_FILE_SIZE)throw new Error('The study file must be smaller than 8 MiB.');
  const data=JSON.parse(raw);
  const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
  if(!object(data)||data.version!==1)throw new Error('Unsupported study format. Choose an Open Research study JSON backup.');
  const study=emptyStudy();
  if(Object.keys(data).some(k=>!Object.hasOwn(study,k)))throw new Error('Unexpected fields in the study file.');
  for(const key of ['title','question']){
    if(typeof data[key]!=='string'||data[key].length>(key==='title'?200:8000))throw new Error('Invalid '+key+'.');
    study[key]=data[key];
  }
  for(const [key,options] of [['method',methods],['stage',stages]]){
    if(!Object.hasOwn(options,data[key]))throw new Error('Unknown '+key+'.');study[key]=data[key];
  }
  if(typeof data.host!=='string'||data.host.length>80)throw new Error('Invalid tool preference.');
  study.host=Object.hasOwn(hosts,data.host)?data.host:'standalone'; // Preserve older drafts while retiring provider-specific preferences.
  const allFields=Object.values(stages).flatMap(s=>s.fields.map(f=>f[0]));
  function strings(input,keys){
    if(!object(input)||Object.keys(input).some(k=>!keys.includes(k)))throw new Error('Invalid study answers.');
    const result={};for(const [k,v] of Object.entries(input)){if(typeof v!=='string'||v.length>20000)throw new Error('Invalid answer length or type.');result[k]=v;}return result;
  }
  study.answers=strings(data.answers,allFields);
  study.next=strings(data.next,Object.keys(stages));
  if(!object(data.designs)||Object.keys(data.designs).some(k=>!Object.hasOwn(methods,k)))throw new Error('Invalid study designs.');
  for(const [k,v] of Object.entries(data.designs))study.designs[k]=strings(v,methods[k].fields.map(f=>f[0]));
  if(!object(data.checks)||Object.keys(data.checks).some(k=>!Object.hasOwn(stages,k)))throw new Error('Invalid review checks.');
  for(const [k,v] of Object.entries(data.checks)){
    if(!Array.isArray(v)||v.length!==stages[k].checks.length||v.some(x=>typeof x!=='boolean'))throw new Error('Invalid review checks.');study.checks[k]=[...v];
  }
  return study;
}
export function fieldsFor(study,stage){
  const entries=stages[stage].fields.map(([id,label,hint])=>({id,label,hint,value:study.answers[id]||'',design:false}));
  if(stage==='plan')entries.push(...methods[study.method].fields.map(([id,label,hint])=>({id,label,hint,value:study.designs[study.method]?.[id]||'',design:true})));
  return entries;
}
export function missingFor(study,stage){
  const missing=fieldsFor(study,stage).filter(f=>!f.value.trim()).map(f=>f.label);
  if(stage==='research'&&!study.question.trim())missing.unshift('Research question');
  if(stage==='plan'&&study.method==='undecided')missing.unshift('Study design');
  return missing;
}
export function studySections(study){
  const sections=[{title:'Research question',entries:[{label:'Question',value:study.question},{label:'Study design',value:methods[study.method].label}]}];
  for(const [stage,definition] of Object.entries(stages))sections.push({title:definition.label,stage,entries:fieldsFor(study,stage).map(f=>({label:f.label,value:f.value})),checks:definition.checks.map((label,i)=>({label,checked:study.checks[stage]?.[i]===true})),next:study.next[stage]||''});
  return sections;
}
export function studyMarkdown(study){
  if(!study.question.trim())throw new Error('Enter your research question before exporting the study.');
  const lines=['# '+(study.title.trim()||'Research study'),'','Status: working draft. Recorded answers and self-review are not scientific validation.',''];
  for(const section of studySections(study)){
    lines.push('## '+section.title,'');
    for(const {label,value} of section.entries)lines.push('### '+label,'',value.trim()?value:'[Not yet recorded]','');
    if(section.checks){lines.push('### Review checks (self-reported)','',...section.checks.map(c=>'- ['+(c.checked?'x':' ')+'] '+c.label),'','### Next action','',section.next.trim()?section.next:'[Not yet recorded]','');}
  }
  const inactive=Object.entries(study.designs).filter(([key,values])=>key!==study.method&&Object.values(values).some(v=>v.trim()));
  if(inactive.length)lines.push('## Other design notes','','Notes for '+inactive.map(([key])=>methods[key].label).join(', ')+' are retained in the editable JSON backup. They are not part of the selected protocol.','');
  return lines.join('\n');
}
export function fileStem(study){return (study.title||study.question).normalize('NFKD').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60).toLowerCase()||'research-study';}
export function assistantBrief(study){return 'Environment: '+hosts[study.host]+'. Launch in the Open Research checkout; name the local study folder before making changes.\nRead AGENTS.md and agents/lurch.md. Use the '+stages[study.stage].skill+' skill.\nHelp with the '+stages[study.stage].label+' stage of the study below. Inspect recorded evidence, identify missing decisions, and preserve my actual question. Do not invent data, sources, approvals, or results. For computations, inspect code first, run permitted commands and report actual outputs, exit statuses and limitations. If you cannot execute or verify a source, mark it unverified.\n\n'+studyMarkdown(study);}
