import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildPlan,tasks,hosts} from '../site/app.mjs';
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
});
