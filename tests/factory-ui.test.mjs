/** DOM/geometry integration tests. WebGL rasterization and real-browser layout are not simulated. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
import * as THREE from 'three';
// Read the pinned source copied by prepare-game-assets, so tests also run before a build.
const files={campaign:await readFile('public/games/factory/campaign.mjs','utf8'),records:await readFile('public/games/factory/records.mjs','utf8'),app:await readFile('public/games/factory/app.mjs','utf8'),engine:await readFile('public/games/factory/engine.mjs','utf8'),scene:await readFile('public/games/factory/scene.mjs','utf8'),orbit:await readFile('node_modules/three/examples/jsm/controls/OrbitControls.js','utf8')};
async function boot(saved=null,{brokenWebGL=false,quota=false}={}){
  const dom=new JSDOM(await readFile('public/games/toyota-priority.html','utf8'),{url:'https://ddalkak-lab-hai.vercel.app/games/toyota-priority.html',runScripts:'outside-only',pretendToBeVisual:true});
  const {window:w}=dom,context=dom.getInternalVMContext(),raf=[],errors=[];let inspectedScene=null,inspectedCamera=null;
  if(quota)w.Storage.prototype.setItem=()=>{throw Error('quota');};
  w.URL.createObjectURL=()=> 'blob:test-download';w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){};
  if(saved)w.localStorage.setItem('ddalkak-factory-3d-v1',JSON.stringify(saved));
  w.requestAnimationFrame=fn=>{raf.push(fn);return raf.length;};w.cancelAnimationFrame=()=>{};
  w.console={...console,error:(...args)=>errors.push(args),warn:()=>{}};
  w.ResizeObserver=class{constructor(cb){this.cb=cb;}observe(){this.cb();}disconnect(){}};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  Object.defineProperty(w.HTMLElement.prototype,'clientWidth',{get(){return 800;}});Object.defineProperty(w.HTMLElement.prototype,'clientHeight',{get(){return 480;}});
  w.HTMLElement.prototype.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:800,bottom:480,width:800,height:480});
  w.HTMLCanvasElement.prototype.getContext=()=>({fillStyle:'',font:'',textAlign:'',textBaseline:'',roundRect(){},fill(){},fillText(){}});
  class Renderer {constructor(){if(brokenWebGL)throw Error('WebGL unavailable');this.domElement=w.document.createElement('canvas');this.shadowMap={};}setPixelRatio(){}setSize(){}render(scene,camera){inspectedScene=scene;inspectedCamera=camera;scene.updateMatrixWorld();camera.updateMatrixWorld();} }
  const three=new vm.SyntheticModule(Object.keys(THREE),function(){for(const k of Object.keys(THREE))this.setExport(k,k==='WebGLRenderer'?Renderer:THREE[k]);},{context});
  const modules={three};
  const make=(name)=>new vm.SourceTextModule(files[name],{context,identifier:name,importModuleDynamically:async spec=>{const mod=modules[spec==='./scene.mjs'?'scene':spec];if(mod.status==='unlinked')await mod.link(linker);if(mod.status==='linked')await mod.evaluate();return mod;}});
  for(const n of ['engine','records','campaign','scene','orbit','app'])modules[n]=make(n);
  async function linker(spec){if(spec==='three')return three;if(spec.endsWith('campaign.mjs'))return modules.campaign;if(spec.endsWith('records.mjs'))return modules.records;if(spec.endsWith('engine.mjs'))return modules.engine;if(spec.endsWith('OrbitControls.mjs'))return modules.orbit;throw Error('Unexpected module '+spec);}
  await modules.app.link(linker);await modules.app.evaluate();
  const doc=w.document;
  const register=(name='테스트 참가자',department='테스트학과')=>{doc.getElementById('participantName').value=name;doc.getElementById('participantDepartment').value=department;doc.getElementById('participantForm').dispatchEvent(new w.Event('submit',{cancelable:true}));if(doc.getElementById('campaignDialog').open)doc.getElementById('campaignDialog').close();};
  return {w,doc,errors,modules,register,click:id=>doc.getElementById(id).click(),get saved(){return JSON.parse(w.localStorage.getItem('ddalkak-factory-3d-v1'));},frame(t){const fn=raf.shift();assert.ok(fn,'animation frame registered');fn(t);},get scene(){return inspectedScene;},get camera(){return inspectedCamera;},close:()=>w.close()};
}

test('the actual UI can allocate staff, run three rounds, render reports and preserve valid saves',async()=>{
  const app=await boot();try{
    assert.ok(app.doc.getElementById('helpDialog').open);app.click('beginBtn');app.register();
    app.doc.querySelector('[data-staff="0"][data-delta="-1"]').click();assert.ok(app.doc.getElementById('startBtn').disabled);
    app.doc.querySelector('[data-staff="1"][data-delta="1"]').click();assert.equal(app.doc.getElementById('startBtn').disabled,false);
    app.doc.querySelector('[data-upgrade="1"]').click();assert.ok(app.doc.getElementById('upgradeDialog').open);app.click('confirmUpgrade');app.click('startBtn');
    const select=app.doc.getElementById('speedSelect');select.value='20';select.dispatchEvent(new app.w.Event('change'));
    let time=0;for(let round=1;round<=3;round++){
      for(let n=0;n<105;n++){time+=150;app.frame(time);}
      assert.ok(!app.doc.getElementById('report').hidden);assert.equal(app.saved.engine.results.length,round);assert.doesNotMatch(app.doc.body.textContent,/NaN|undefined/);
      assert.doesNotThrow(()=>app.modules.engine.namespace.validateSnapshot(app.saved.engine));
      if(round<3){app.click('startBtn');assert.equal(app.saved.engine.phase,'design');assert.doesNotMatch(app.doc.getElementById('profit').textContent,/NaN/);app.click('startBtn');}
    }
    assert.equal(app.saved.engine.phase,'final');const history=JSON.parse(app.w.localStorage.getItem('ddalkak-factory-records-v1'));assert.equal(history.records.length,1);assert.equal(history.records[0].payload.engine.results.length,3);assert.equal(history.records[0].payload.session.profile.department,'테스트학과');assert.ok(app.doc.getElementById('startBtn').disabled);assert.deepEqual(app.errors,[]);
    const stations=new Set();app.scene.traverse(o=>{if(o.isMesh){if(o.userData.station!==undefined)stations.add(o.userData.station);for(const v of o.matrixWorld.elements)assert.ok(Number.isFinite(v));const positions=o.geometry.attributes.position.array;for(const v of positions)assert.ok(Number.isFinite(v));}});assert.deepEqual([...stations].sort(),[0,1,2,3],'all four actual Three.js stations constructed');
  }finally{app.close();}
});
test('save restoration pauses active production; canceled reset preserves the paused state',async()=>{
  const engine=new (await import('../public/games/factory/engine.mjs')).FactoryEngine();engine.start();engine.advance(70);
  const app=await boot({engine:engine.snapshot(),speed:20,selected:2,session:{id:'test-resume-1234',createdAt:new Date().toISOString(),profile:{name:'복원 테스트',department:'테스트학과'}}});try{assert.equal(app.doc.getElementById('pauseBtn').textContent,'재개 ▶');app.frame(100);app.frame(250);app.click('saveBtn');assert.equal(app.saved.engine.time,70);app.click('resetBtn');app.click('cancelReset');assert.equal(app.doc.getElementById('pauseBtn').textContent,'재개 ▶');app.click('pauseBtn');app.frame(400);app.click('saveBtn');assert.ok(app.saved.engine.time>70);assert.deepEqual(app.errors,[]);}finally{app.close();}
});
test('corrupt report storage recovers to a new game, and WebGL failure keeps 2D controls usable',async()=>{
  const engine=new (await import('../public/games/factory/engine.mjs')).FactoryEngine();engine.start();engine.advance(300);const snap=engine.snapshot();delete snap.results[0].breakdown;
  const app=await boot({engine:snap},{brokenWebGL:true});try{assert.ok(app.doc.getElementById('scene').classList.contains('failed'));assert.equal(app.doc.querySelectorAll('#grid button').length,16);app.click('beginBtn');app.register();app.click('startBtn');app.frame(100);app.frame(250);app.click('saveBtn');assert.equal(app.saved.engine.round,1);assert.equal(app.saved.engine.phase,'running');assert.deepEqual(app.errors,[]);}finally{app.close();}
});
test('full keyboard route keeps stage-control focus after staffing changes',async()=>{
  const app=await boot();try{app.click('beginBtn');app.register();app.click('facilityBtn');const minus=app.doc.querySelector('[data-staff="0"][data-delta="-1"]');minus.focus();minus.click();assert.equal(app.doc.activeElement.dataset.select,'0');app.doc.querySelector('#stageRail [data-stage="1"]').click();const plus=app.doc.querySelector('[data-staff="1"][data-delta="1"]');plus.focus();plus.click();assert.equal(app.doc.activeElement.dataset.select,'1');}finally{app.close();}
});

 test('new participants keep independent archived records and clean input fields',async()=>{
  const app=await boot();try{app.click('beginBtn');app.register('참가자 A','기계공학과');const id=app.saved.session.id;app.click('resetBtn');app.click('confirmReset');assert.equal(app.doc.getElementById('participantName').value,'');assert.equal(app.doc.getElementById('participantDepartment').value,'');app.register('참가자 B','경영학과');assert.notEqual(app.saved.session.id,id);app.click('recordsBtn');let history=JSON.parse(app.w.localStorage.getItem('ddalkak-factory-records-v1'));assert.equal(history.records.length,2);assert.equal(history.records.find(r=>r.payload.session.id===id).archived,true);assert.match(app.doc.getElementById('recordList').textContent,/참가자 A/);const search=app.doc.getElementById('recordSearch');search.value='기계공학과';search.dispatchEvent(new app.w.Event('input'));assert.match(app.doc.getElementById('recordList').textContent,/참가자 A/);assert.doesNotMatch(app.doc.getElementById('recordList').textContent,/참가자 B/);app.doc.querySelector('[data-record-delete]').click();app.click('confirmDelete');history=JSON.parse(app.w.localStorage.getItem('ddalkak-factory-records-v1'));assert.equal(history.records.length,1);assert.equal(history.records[0].payload.session.profile.name,'참가자 B');assert.deepEqual(app.errors,[]);}finally{app.close();}
});
test('upgrade preview does not spend money until confirmed and uses actual staffing',async()=>{
  const app=await boot();try{app.click('beginBtn');app.register();app.doc.querySelector('[data-upgrade="1"]').click();assert.equal(app.doc.getElementById('upgradeBefore').textContent,'14.0');assert.equal(app.doc.getElementById('upgradeAfter').textContent,'8.4');app.click('cancelUpgrade');assert.equal(app.saved.engine.cash,3000);app.doc.querySelector('[data-upgrade="1"]').click();app.click('confirmUpgrade');assert.equal(app.saved.engine.cash,1800);assert.equal(app.saved.engine.upgrades[1],true);}finally{app.close();}
});
test('nested archive dialogs preserve a running game pause state',async()=>{
  const app=await boot();try{app.click('beginBtn');app.register('A','공학과');app.click('resetBtn');app.click('confirmReset');app.register('B','경영학과');app.click('startBtn');app.frame(100);app.click('recordsBtn');assert.equal(app.doc.getElementById('pauseBtn').textContent,'재개 ▶');app.doc.querySelector('[data-record-delete]').click();app.click('cancelDelete');assert.equal(app.doc.getElementById('pauseBtn').textContent,'재개 ▶');app.doc.getElementById('recordsDialog').close();assert.equal(app.doc.getElementById('pauseBtn').textContent,'일시정지');}finally{app.close();}
});

test('older imported design cannot overwrite an upgraded current run',async()=>{
 const app=await boot();try{app.click('beginBtn');app.register();const before=app.saved;app.doc.querySelector('[data-upgrade="1"]').click();app.click('confirmUpgrade');const input=app.doc.getElementById('importFile');Object.defineProperty(input,'files',{value:[{size:100,text:async()=>JSON.stringify(before)}]});await input.onchange({target:input});assert.equal(app.saved.engine.upgrades[1],true);assert.match(app.doc.getElementById('toast').textContent,/최신|다른 변경/);}finally{app.close();}
});
test('storage quota permits a new run after progress export is explicitly requested',async()=>{
 const app=await boot(null,{quota:true});try{app.click('beginBtn');app.register('용량 테스트','검증학과');app.click('resetBtn');app.click('confirmReset');assert.ok(app.doc.getElementById('resetDialog').open);app.click('cancelReset');app.click('exportSave');app.click('resetBtn');app.click('confirmReset');assert.equal(app.doc.getElementById('resetDialog').open,false);assert.ok(app.doc.getElementById('playerDialog').open);assert.equal(app.doc.getElementById('participantName').value,'');assert.match(app.doc.getElementById('saveStatus').textContent,/저장 공간/);}finally{app.close();}
});

test('in-world facility and placement trays stay exclusive; moving requires explicit layout mode',async()=>{
 const app=await boot();try{
  app.click('beginBtn');app.register();const original=app.saved.engine.positions[0];
  app.doc.querySelector('#grid [data-cell="0"]').click();app.click('saveBtn');assert.equal(app.saved.engine.positions[0],original,'normal factory clicks must not move a machine');
  app.doc.querySelector('#stageRail [data-stage="1"]').click();assert.equal(app.doc.getElementById('facilityPanel').hidden,false);assert.equal(app.doc.querySelector('.stage-card.selected [data-select]').dataset.select,'1');
  app.click('placeSelectedBtn');assert.equal(app.doc.getElementById('facilityPanel').hidden,true);assert.equal(app.doc.getElementById('placementPanel').hidden,false);
  app.doc.querySelector('#grid [data-cell="0"]').click();assert.equal(app.saved.engine.positions[1],0);app.click('closePlacement');assert.equal(app.doc.body.dataset.tray,undefined);
  app.click('startBtn');app.click('layoutBtn');app.doc.querySelector('#grid [data-cell="1"]').click();app.click('saveBtn');assert.equal(app.saved.engine.positions[1],0,'production locks layout changes');assert.deepEqual(app.errors,[]);
 }finally{app.close();}
});

test('menu dialogs pause production while nonmodal machine observation leaves it running',async()=>{
 const app=await boot();try{
  app.click('beginBtn');app.register();app.click('startBtn');app.frame(100);app.doc.querySelector('#stageRail [data-stage="2"]').click();app.frame(250);app.click('saveBtn');const before=app.saved.engine.time;assert.ok(before>0);assert.equal(app.doc.getElementById('pauseBtn').textContent,'일시정지');
  app.click('menuBtn');app.doc.querySelector('#menuDialog [data-open="cameraDialog"]').click();app.frame(400);app.click('saveBtn');assert.equal(app.saved.engine.time,before);app.doc.getElementById('menuDialog').close();assert.equal(app.doc.getElementById('pauseBtn').textContent,'재개 ▶','closing a lower dialog cannot resume under another dialog');app.doc.getElementById('cameraDialog').close();app.frame(550);app.click('saveBtn');assert.ok(app.saved.engine.time>before);assert.deepEqual(app.errors,[]);
 }finally{app.close();}
});

test('chapter goals follow actual shipments; round report leads to the next briefing',async()=>{
 const app=await boot();try{
  app.click('beginBtn');app.register();assert.match(app.doc.getElementById('mission').textContent,/첫 출하/);app.click('startBtn');const speed=app.doc.getElementById('speedSelect');speed.value='20';speed.dispatchEvent(new app.w.Event('change'));
  let time=100;app.frame(time);for(let i=0;i<30;i++){time+=150;app.frame(time);}assert.match(app.doc.getElementById('chapterGoals').textContent,/1 \/ 1대/);assert.equal(app.doc.getElementById('milestone').hidden,false);
  for(let i=0;i<75;i++){time+=150;app.frame(time);}assert.equal(app.doc.getElementById('reportDialog').open,true);app.click('reportNext');assert.equal(app.doc.getElementById('reportDialog').open,false);assert.equal(app.doc.getElementById('campaignDialog').open,true);assert.equal(app.saved.engine.round,2);assert.match(app.doc.getElementById('chapterGoals').textContent,/기존 전략 유지/);app.click('questAction');assert.equal(app.saved.engine.phase,'running');assert.equal(app.doc.getElementById('campaignDialog').open,false);assert.deepEqual(app.errors,[]);
 }finally{app.close();}
});

test('restoring completed shipment goals does not replay milestone notifications or alter the economy',async()=>{
 const {FactoryEngine}=await import('../public/games/factory/engine.mjs');const engine=new FactoryEngine();engine.buy(1);engine.start();engine.advance(160);const snapshot=engine.snapshot();
 const app=await boot({engine:snapshot,speed:1,selected:0,session:{id:'restore-goals-1234',createdAt:new Date().toISOString(),profile:{name:'복원 검증',department:'검증학과'}}});try{
  app.frame(100);app.frame(250);assert.equal(app.doc.getElementById('milestone').hidden,true);app.click('saveBtn');assert.equal(app.saved.engine.cash,snapshot.cash);assert.equal(app.saved.engine.data.shipped,snapshot.data.shipped);assert.equal(app.saved.engine.time,snapshot.time);assert.deepEqual(app.errors,[]);
 }finally{app.close();}
});
