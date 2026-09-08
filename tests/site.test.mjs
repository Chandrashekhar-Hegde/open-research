import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildPlan,tasks,hosts,methods,checklist,readChecklist} from '../site/app.mjs';
test('every task and host generates commands and a plan',()=>{
 for(const task of Object.keys(tasks))for(const host of Object.keys(hosts)){
  const plan=buildPlan(task,host,'A research question');
  assert.match(plan.command,/python /);assert.match(plan.markdown,/A research question/);
  assert.ok(plan.output);assert.ok(plan.guide.endsWith('.md'));
  if(host!=='standalone')assert.ok(plan.setup.includes('--tool '+host));
 }
});
test('question text cannot change shell commands',()=>{
 const normal=buildPlan('plan','codex','hello');
 const input='"; delete files; $(run something)';
 const unusual=buildPlan('plan','codex',input);
 assert.equal(unusual.command,normal.command);assert.equal(unusual.setup,normal.setup);
 assert.ok(unusual.brief.includes(input));
});
test('unknown task and host rejected',()=>{
 assert.throws(()=>buildPlan('__proto__','codex'));assert.throws(()=>buildPlan('plan','unknown'));
 assert.throws(()=>buildPlan('plan','codex','','__proto__'));
});
test('daily checklist is invariant across every task, host and study design',()=>{
 const checked=[true,false,true,false,true];
 const expected=checklist.map((label,i)=>'- ['+(checked[i]?'x':' ')+'] '+label).join('\n');
 for(const task of Object.keys(tasks))for(const host of Object.keys(hosts))for(const method of Object.keys(methods)){
  const plan=buildPlan(task,host,'Question',method,checked,'Units and uncertainty still need a decision.');
  assert.ok(plan.markdown.includes(expected));
  assert.ok(plan.markdown.includes('Units and uncertainty still need a decision.'));
  for(const decision of methods[method].decisions)assert.ok(plan.markdown.includes(decision));
 }
 assert.deepEqual(checked,[true,false,true,false,true]);
});
test('saved checklist tolerates missing, malformed and outdated storage',()=>{
 assert.deepEqual(readChecklist(null),[false,false,false,false,false]);
 assert.deepEqual(readChecklist('broken JSON'),[false,false,false,false,false]);
 assert.deepEqual(readChecklist('{"0":true}'),[false,false,false,false,false]);
 assert.deepEqual(readChecklist('[true,1,"true",false,true,true]'),[true,false,false,false,true]);
});
import {readFileSync} from 'node:fs';
test('interactive controls are wired to real document elements',()=>{
 const html=readFileSync(new URL('../site/index.html',import.meta.url),'utf8');
 const script=readFileSync(new URL('../site/app.mjs',import.meta.url),'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
 assert.equal(new Set(ids).size,ids.length);
 for(const match of script.matchAll(/\$\('([^']+)'\)/g))assert.ok(ids.includes(match[1]),match[1]);
 for(const match of html.matchAll(/data-copy="([^"]+)"/g))assert.ok(ids.includes(match[1]),match[1]);
 for(const match of html.matchAll(/data-task="([^"]+)"/g))assert.ok(Object.hasOwn(tasks,match[1]));
 for(const label of checklist)assert.ok(html.includes(label));
 for(const [id,items] of Object.entries({task:tasks,host:hosts,method:methods})){
  const select=html.match(new RegExp('<select id="'+id+'">(.*?)</select>','s'))[1];
  const values=[...select.matchAll(/value="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(values.sort(),Object.keys(items).sort());
 }
 for(const task of Object.values(tasks))assert.ok(readFileSync(new URL('../docs/'+task.guide,import.meta.url),'utf8'));
 assert.ok(html.includes('feedback-study.md'));
});
