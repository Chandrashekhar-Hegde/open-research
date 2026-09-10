import {catalog,classificationEntries,fieldsFor} from './study.mjs?v=designs-2';

// An authoring scaffold from entered records. It does not infer missing findings.
export function manuscript(study,kind='research',format='markdown'){
 if(!study.question.trim())throw new Error('Enter your research question before creating a manuscript scaffold.');
 if(!Object.hasOwn(catalog.papers,kind)||!['markdown','quarto'].includes(format))throw new Error('Unknown manuscript kind or format.');
 const paper=catalog.papers[kind],title=study.title.trim()||'Research study';
 const lines=['# '+title,'','> Authoring scaffold from entered records. Not a finished or verified manuscript.','','Paper type: '+paper.label,'','## Research question','',study.question,'','## Abstract','','[Author: summarize actual work only after the evidence is verified.]',''];
 for(const [heading,guidance] of paper.sections)lines.push('## '+heading,'','[Author: '+guidance+']','');
 lines.push('## Working records — verify before incorporating','','These notes retain their original role. Planned analysis is not an observed result.','');
 for(const {label,value} of classificationEntries(study))lines.push('### '+label,'',value,'');
 for(const stage of ['research','plan','inspect','analyze','write','share']){
  for(const {label,value} of fieldsFor(study,stage))lines.push('### '+label,'',value.trim()||'[Not yet recorded]','');
 }
 lines.push('## References','','[Author: add only inspected references, check every claim-to-source link and apply the venue citation style. No bibliography is generated from guessed metadata.]','');
 if(format==='quarto')return '---\ntitle: '+JSON.stringify(title)+'\nformat:\n  html:\n    toc: true\n  docx: default\nexecute:\n  enabled: false\n---\n\n'+lines.slice(2).join('\n');
 return lines.join('\n');
}
