/** DOM/geometry integration tests. WebGL rasterization and real-browser layout are not simulated. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
import * as THREE from 'three';
const files={app:await readFile('public/games/factory/app.mjs','utf8'),engine:await readFile('public/games/factory/engine.mjs','utf8'),scene:await readFile('public/games/factory/scene.mjs','utf8'),orbit:await readFile('public/games/factory/OrbitControls.mjs','utf8')};
async function boot(saved=null,{brokenWebGL=false}={}){
  const dom=new JSDOM(await readFile('public/games/toyota-priority.html','utf8'),{url:'https://ddalkak-lab-hai.vercel.app/games/toyota-priority.html',runScripts:'outside-only',pretendToBeVisual:true});
  const {window:w}=dom,context=dom.getInternalVMContext(),raf=[],errors=[];let inspectedScene=null,inspectedCamera=null;
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
  for(const n of ['engine','scene','orbit','app'])modules[n]=make(n);
  async function linker(spec){if(spec==='three')return three;if(spec.endsWith('engine.mjs'))return modules.engine;if(spec.endsWith('OrbitControls.mjs'))return modules.orbit;throw Error('Unexpected module '+spec);}
  await modules.app.link(linker);await modules.app.evaluate();
  const doc=w.document;
  return {w,doc,errors,modules,click:id=>doc.getElementById(id).click(),get saved(){return JSON.parse(w.localStorage.getItem('ddalkak-factory-3d-v1'));},frame(t){const fn=raf.shift();assert.ok(fn,'animation frame registered');fn(t);},get scene(){return inspectedScene;},get camera(){return inspectedCamera;},close:()=>w.close()};
}

test('the actual UI can allocate staff, run three rounds, render reports and preserve valid saves',async()=>{
  const app=await boot();try{
    assert.ok(app.doc.getElementById('helpDialog').open);app.click('beginBtn');
    app.doc.querySelector('[data-staff="0"][data-delta="-1"]').click();assert.ok(app.doc.getElementById('startBtn').disabled);
    app.doc.querySelector('[data-staff="1"][data-delta="1"]').click();assert.equal(app.doc.getElementById('startBtn').disabled,false);
    app.doc.querySelector('[data-upgrade="1"]').click();app.click('startBtn');
    const select=app.doc.getElementById('speedSelect');select.value='20';select.dispatchEvent(new app.w.Event('change'));
    let time=0;for(let round=1;round<=3;round++){
      for(let n=0;n<105;n++){time+=150;app.frame(time);}
      assert.ok(!app.doc.getElementById('report').hidden);assert.equal(app.saved.engine.results.length,round);assert.doesNotMatch(app.doc.body.textContent,/NaN|undefined/);
      assert.doesNotThrow(()=>app.modules.engine.namespace.validateSnapshot(app.saved.engine));
      if(round<3){app.click('startBtn');assert.equal(app.saved.engine.phase,'design');assert.doesNotMatch(app.doc.getElementById('profit').textContent,/NaN/);app.click('startBtn');}
    }
    assert.equal(app.saved.engine.phase,'final');assert.ok(app.doc.getElementById('startBtn').disabled);assert.deepEqual(app.errors,[]);
    const stations=new Set();app.scene.traverse(o=>{if(o.isMesh){if(o.userData.station!==undefined)stations.add(o.userData.station);for(const v of o.matrixWorld.elements)assert.ok(Number.isFinite(v));const positions=o.geometry.attributes.position.array;for(const v of positions)assert.ok(Number.isFinite(v));}});assert.deepEqual([...stations].sort(),[0,1,2,3],'all four actual Three.js stations constructed');
  }finally{app.close();}
});
test('save restoration pauses active production; canceled reset preserves the paused state',async()=>{
  const engine=new (await import('../public/games/factory/engine.mjs')).FactoryEngine();engine.start();engine.advance(70);
  const app=await boot({engine:engine.snapshot(),speed:20,selected:2});try{assert.equal(app.doc.getElementById('pauseBtn').textContent,'재개 ▶');app.frame(100);app.frame(250);app.click('saveBtn');assert.equal(app.saved.engine.time,70);app.click('resetBtn');app.click('cancelReset');assert.equal(app.doc.getElementById('pauseBtn').textContent,'재개 ▶');app.click('pauseBtn');app.frame(400);app.click('saveBtn');assert.ok(app.saved.engine.time>70);assert.deepEqual(app.errors,[]);}finally{app.close();}
});
test('corrupt report storage recovers to a new game, and WebGL failure keeps 2D controls usable',async()=>{
  const engine=new (await import('../public/games/factory/engine.mjs')).FactoryEngine();engine.start();engine.advance(300);const snap=engine.snapshot();delete snap.results[0].breakdown;
  const app=await boot({engine:snap},{brokenWebGL:true});try{assert.ok(app.doc.getElementById('scene').classList.contains('failed'));assert.equal(app.doc.querySelectorAll('#grid button').length,16);app.click('beginBtn');app.click('startBtn');app.frame(100);app.frame(250);app.click('saveBtn');assert.equal(app.saved.engine.round,1);assert.equal(app.saved.engine.phase,'running');assert.deepEqual(app.errors,[]);}finally{app.close();}
});
test('full keyboard route keeps stage-control focus after staffing changes',async()=>{
  const app=await boot();try{app.click('beginBtn');const minus=app.doc.querySelector('[data-staff="0"][data-delta="-1"]');minus.focus();minus.click();assert.equal(app.doc.activeElement.dataset.select,'0');const plus=app.doc.querySelector('[data-staff="1"][data-delta="1"]');plus.focus();plus.click();assert.equal(app.doc.activeElement.dataset.select,'1');}finally{app.close();}
});
