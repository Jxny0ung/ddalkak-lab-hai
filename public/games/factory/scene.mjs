import * as T from 'three';
import { OrbitControls } from './OrbitControls.mjs';
import { STAGES } from './engine.mjs';

const SPACE=2.8;
const mat=(color,metalness=.12,roughness=.55)=>new T.MeshStandardMaterial({color,metalness,roughness});
const palette={ floor:mat('#d5dadb'), steel:mat('#586878',.65,.35), light:mat('#e4e9e8'), dark:mat('#253646'), orange:mat('#edaa43',.3), blue:mat('#597d9f'), rubber:mat('#172432'), window:mat('#244a60',.5,.2) };
function box(parent,w,h,d,x,y,z,material){const m=new T.Mesh(new T.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function cylinder(parent,r,h,x,y,z,material,r2=r){const m=new T.Mesh(new T.CylinderGeometry(r,r2,h,10),material);m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
function label(text,color='#dbe6ed',size=1.5){const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;const c=canvas.getContext('2d');c.fillStyle='#172b3b';c.roundRect(5,5,502,118,18);c.fill();c.fillStyle=color;c.font='600 42px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(text,256,64);const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;const sprite=new T.Sprite(new T.SpriteMaterial({map:tex,depthTest:false}));sprite.scale.set(size,size/4,1);return sprite;}
function dispose(group){const materials=new Set(),shared=new Set(Object.values(palette));group.traverse(n=>{n.geometry?.dispose();if(n.material&&!shared.has(n.material))materials.add(n.material);});materials.forEach(m=>{m.map?.dispose();m.dispose();});group.removeFromParent();}

export class FactoryScene {
  constructor(container,engine,onSelect,onMove,onError){
    this.container=container;this.engine=engine;this.selected=0;this.machines=[];this.cars=new Map();this.onError=onError;
    this.scene=new T.Scene();this.scene.background=new T.Color('#152536');this.scene.fog=new T.Fog('#152536',30,65);
    this.renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.6));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=T.PCFSoftShadowMap;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.25;container.prepend(this.renderer.domElement);
    this.renderer.domElement.setAttribute('aria-label','마우스로 회전하고 확대할 수 있는 3D 공장. 기계 선택과 이동은 옆의 배치 편집기로도 가능합니다.');
    this.camera=new T.PerspectiveCamera(36,1,.1,100);this.camera.position.set(17,18,21);
    this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.target.set(0,.2,0);this.controls.enableDamping=true;this.controls.dampingFactor=.09;this.controls.minDistance=10;this.controls.maxDistance=38;this.controls.maxPolarAngle=Math.PI*.46;this.controls.minPolarAngle=.05;this.controls.maxTargetRadius=6;
    this.scene.add(new T.HemisphereLight('#deefff','#5f7283',2.1));const sun=new T.DirectionalLight('#fff1d9',3.5);sun.position.set(-9,18,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-13;sun.shadow.camera.right=13;sun.shadow.camera.top=13;sun.shadow.camera.bottom=-13;sun.shadow.normalBias=.035;sun.shadow.bias=-.0001;this.scene.add(sun);
    const fill=new T.DirectionalLight('#9fcfff',1.8);fill.position.set(9,9,-10);this.scene.add(fill);
    this.world=new T.Group();this.scene.add(this.world);box(this.world,17,.35,15,0,-.26,0,palette.dark);box(this.world,16.7,.12,14.7,0,-.025,0,palette.floor);
    this.tiles=[];for(let i=0;i<16;i++){const x=(i%4-1.5)*SPACE,z=(Math.floor(i/4)-1.5)*SPACE,m=box(this.world,2.74,.025,2.74,x,.052,z,mat((i+Math.floor(i/4))%2?'#c8d1d4':'#d4dcdd'));m.userData.cell=i;this.tiles.push(m);}
    // Cutaway architecture leaves the production floor visible from every angle.
    for(const x of [-7.9,7.9])for(const z of [-6.9,0,6.9]){box(this.world,.14,2.5,.14,x,1.25,z,palette.steel);box(this.world,.25,.08,.25,x,2.52,z,palette.orange);}
    for(let n=0;n<6;n++){box(this.world,.6,.34,.7,-7,.17,1.4+n*.75,palette.blue);box(this.world,.58,.05,.68,-7,.36,1.4+n*.75,palette.light);}
    for(let n=0;n<7;n++){box(this.world,.4,.025,.08,-6.9+n*.55,.06,-6.2,palette.orange);box(this.world,.4,.025,.08,3.4+n*.55,.06,6.3,palette.orange);}
    const incoming=label('IN / 입고','#9fcfff',1.5);incoming.position.set(-7.1,.8,-4.2);this.world.add(incoming);
    const dispatch=label('OUT / 출하','#a7dfc7',1.6);dispatch.position.set(7.1,.9,4.2);this.world.add(dispatch);
    this.ray=new T.Raycaster();this.pointer=new T.Vector2();this.dragStart=null;
    this.activePointers=new Set();
    this.onPointerDown=e=>{this.activePointers.add(e.pointerId);if(e.button!==0||this.activePointers.size>1||!e.isPrimary){this.dragStart=null;return;}this.dragStart={x:e.clientX,y:e.clientY,id:e.pointerId};};
    this.onPointerUp=e=>{this.activePointers.delete(e.pointerId);const start=this.dragStart;this.dragStart=null;if(!start||e.button!==0||e.pointerId!==start.id||Math.hypot(e.clientX-start.x,e.clientY-start.y)>7)return;const r=this.renderer.domElement.getBoundingClientRect();this.pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);this.ray.setFromCamera(this.pointer,this.camera);const machineHits=this.ray.intersectObjects(this.machines.map(m=>m.g),true).filter(hit=>hit.object.isMesh&&hit.object.userData.station!==undefined);if(machineHits.length){onSelect(machineHits[0].object.userData.station);return;}const hits=this.ray.intersectObjects(this.tiles,false);if(!hits.length)return;const cell=hits[0].object.userData.cell,stage=this.engine.s.positions.indexOf(cell);if(stage>=0)onSelect(stage);else if(this.engine.editable)onMove(cell);};
    this.renderer.domElement.addEventListener('pointerdown',this.onPointerDown);this.renderer.domElement.addEventListener('pointerup',this.onPointerUp);
    this.renderer.domElement.addEventListener('pointercancel',e=>{this.activePointers.delete(e.pointerId);this.dragStart=null;});
    this.renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();onError('3D 화면 연결이 중단되었습니다. 저장 후 새로고침하거나 2D 배치를 이용하세요.');});
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(container);this.sync();this.resize();
  }
  resize(){const w=this.container.clientWidth,h=this.container.clientHeight;if(!w||!h)return;this.renderer.setSize(w,h);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();}
  at(p){return new T.Vector3((p.x-1.5)*SPACE,.38,(p.z-1.5)*SPACE);}
  robot(parent,x,z,side=1){const g=new T.Group();g.position.set(x,.25,z);parent.add(g);cylinder(g,.18,.16,0,.08,0,palette.dark);cylinder(g,.10,.5,0,.35,0,palette.orange);const shoulder=new T.Group();shoulder.position.y=.55;g.add(shoulder);box(shoulder,.15,.6,.16,0,.25,0,palette.orange);cylinder(shoulder,.13,.20,0,.5,0,palette.steel).rotation.z=Math.PI/2;const elbow=new T.Group();elbow.position.y=.5;shoulder.add(elbow);box(elbow,.12,.52,.12,0,.22,0,palette.orange);box(elbow,.12,.12,.24,0,.5,.04,palette.dark);shoulder.rotation.z=side*.6;elbow.rotation.z=side*.9;return {g,shoulder,elbow,side};}
  machine(i){const g=new T.Group(), color=mat(STAGES[i].color,.3);box(g,2.1,.16,2.1,0,.15,0,palette.dark);box(g,1.95,.04,1.95,0,.25,0,color);
    const robots=[];let press=null,spark=null;
    if(i===0){for(const x of [-.66,.66])box(g,.16,1.3,.25,x,.9,-.15,palette.steel);box(g,1.65,.3,.7,0,1.55,-.15,palette.orange);box(g,1.35,.12,.7,0,.45,-.15,palette.steel);press=box(g,1.15,.18,.62,0,1,-.15,palette.light);cylinder(g,.1,.4,0,1.25,-.15,palette.steel);}
    if(i===1){robots.push(this.robot(g,-.7,-.5,1),this.robot(g,.7,.5,-1));spark=new T.Mesh(new T.SphereGeometry(.07,8,6),new T.MeshBasicMaterial({color:'#e2f9ff'}));spark.position.set(0,.85,0);g.add(spark);spark.visible=false;}
    if(i===2){for(const x of [-.8,.8])box(g,.13,1.4,1.55,x,.95,0,palette.blue);box(g,1.8,.18,1.55,0,1.7,0,palette.light);const panel=new T.MeshStandardMaterial({color:'#a2d3e8',transparent:true,opacity:.18,depthWrite:false});box(g,1.5,1.2,.05,0,1.05,-.7,panel);robots.push(this.robot(g,-.65,-.35,1));spark=new T.Mesh(new T.ConeGeometry(.25,.45,12),new T.MeshBasicMaterial({color:'#a4d8f3',transparent:true,opacity:.32,depthWrite:false}));spark.position.set(0,1.08,0);g.add(spark);}
    if(i===3){for(const x of [-.8,.8])box(g,.15,1.15,.17,x,.8,-.5,color);box(g,1.9,.15,.22,0,1.4,-.5,color);box(g,.2,.7,.2,.55,.95,-.5,palette.steel);robots.push(this.robot(g,.7,.55,-1));}
    const sign=label(`${String(i+1).padStart(2,'0')}  ${STAGES[i].name}`,STAGES[i].color,1.55);sign.position.set(0,2.05,0);g.add(sign);
    const bar=box(g,1.3,.055,.06,0,1.8,.1,palette.dark);const progress=box(g,1.28,.06,.07,0,1.8,.105,mat(STAGES[i].color));progress.scale.x=.001;
    const marker=new T.Mesh(new T.RingGeometry(1.13,1.2,40),new T.MeshBasicMaterial({color:'#77bbff',side:T.DoubleSide}));marker.rotation.x=-Math.PI/2;marker.position.y=.27;g.add(marker);
    const crew=new T.Group();g.add(crew);return {g,robots,press,spark,sign,bar,progress,marker,crew};
  }
  worker(parent,x,z,n){const g=new T.Group();g.position.set(x,.25,z);parent.add(g);const uniform=n%2?palette.blue:palette.orange;cylinder(g,.085,.23,0,.29,0,uniform);cylinder(g,.075,.12,0,.48,0,mat('#e2bc99'));cylinder(g,.09,.055,0,.555,0,palette.orange);for(const side of [-1,1]){box(g,.055,.18,.07,side*.045,.1,0,palette.dark);box(g,.04,.18,.05,side*.11,.27,0,uniform);}return g;}
  sync(){const s=this.engine.s,sig=JSON.stringify([s.positions,s.workers,s.upgrades]);if(this.sig===sig)return;this.sig=sig;
    if(this.belts)dispose(this.belts);this.belts=new T.Group();this.world.add(this.belts);
    for(let leg=0;leg<5;leg++){const pts=this.engine.route(leg-1,leg).map(p=>this.at(p));for(let n=1;n<pts.length;n++){const a=pts[n-1],b=pts[n],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz);if(len<.01)continue;const belt=new T.Group();belt.position.copy(a).add(b).multiplyScalar(.5);belt.position.y=.2;belt.rotation.y=Math.atan2(dx,dz);this.belts.add(belt);box(belt,.6,.12,len,0,0,0,palette.dark);for(const side of [-1,1])box(belt,.05,.06,len,side*.33,.1,0,palette.steel);for(let d=-len/2+.15;d<len/2;d+=.36){const roller=cylinder(belt,.052,.55,0,.085,d,palette.steel);roller.rotation.z=Math.PI/2;}for(let d=-len/2+.25;d<len/2;d+=1.25)box(belt,.10,.014,.18,0,.15,d,palette.orange);}}
    this.machines.forEach(m=>dispose(m.g));this.machines=STAGES.map((_,i)=>{const m=this.machine(i),p=this.engine.point(i);m.g.position.set((p.x-1.5)*SPACE,0,(p.z-1.5)*SPACE);this.world.add(m.g);m.g.traverse(node=>{if(node.isMesh)node.userData.station=i;});for(let n=0;n<s.workers[i];n++)this.worker(m.crew,-.85+n*.48,.85,n);if(s.upgrades[i]){const sign=label('UPGRADED','#b6e6cc',1);sign.position.set(0,.32,1.05);m.g.add(sign);}return m;});
  }
  car(stage,paint,quality){const g=new T.Group(),paints=['#477dac','#db6655','#e5e8df','#cda557'],body=stage<3?palette.steel:mat(quality===-1?'#9c615d':paints[paint%4],.45,.3);
    if(stage===0){for(let n=0;n<3;n++)box(g,.42,.03,.65,0,.06+n*.04,0,palette.steel);return g;}
    box(g,.49,.09,.87,0,.10,0,body);if(stage>=2){box(g,.50,.15,.80,0,.2,0,body);if(stage===2){for(const x of [-.21,.21])for(const z of [-.22,.22])box(g,.04,.23,.045,x,.37,z,body);box(g,.44,.04,.48,0,.50,0,body);}else{box(g,.41,.22,.46,0,.37,-.03,body);box(g,.37,.14,.035,0,.39,.215,palette.window);box(g,.37,.13,.025,0,.39,-.267,palette.window);for(const x of [-.209,.209])box(g,.013,.13,.35,x,.39,-.02,palette.window);}}
    if(stage===4){for(const x of [-.265,.265])for(const z of [-.27,.27]){const wheel=cylinder(g,.12,.08,x,.13,z,palette.rubber);wheel.rotation.z=Math.PI/2;const hub=cylinder(g,.055,.09,x,.13,z,palette.light);hub.rotation.z=Math.PI/2;}for(const x of [-.17,.17])box(g,.09,.04,.022,x,.22,.414,palette.light);}return g;
  }
  setView(view){if(view==='top')this.camera.position.set(.01,27,.1);else if(view==='floor')this.camera.position.set(16,7,16);else this.camera.position.set(17,18,21);this.controls.target.set(0,.2,0);this.controls.update();}
  rotate(direction){const offset=this.camera.position.clone().sub(this.controls.target);offset.applyAxisAngle(new T.Vector3(0,1,0),direction*Math.PI/8);this.camera.position.copy(this.controls.target).add(offset);this.controls.update();}
  zoom(direction){const offset=this.camera.position.clone().sub(this.controls.target);offset.multiplyScalar(direction>0?.85:1.18);offset.clampLength(10,38);this.camera.position.copy(this.controls.target).add(offset);this.controls.update();}
  render(selected){this.selected=selected;this.sync();const s=this.engine.s;
    this.machines.forEach((m,i)=>{const job=s.jobs.find(j=>j.id===s.processing[i]),p=job?Math.max(0,Math.min(1,(s.time-job.start)/(job.end-job.start))):0,t=job?s.time:0;m.marker.visible=i===selected;m.progress.scale.x=Math.max(.001,p);m.progress.position.x=-(1-p)*.64;
      if(m.press)m.press.position.y=job?1-Math.abs(Math.sin(t*4))*.34:1;
      m.robots.forEach(r=>{r.shoulder.rotation.z=r.side*(.6+(job?Math.sin(t*2+i)*.22:0));r.elbow.rotation.z=r.side*(.9+(job?Math.cos(t*2.3)*.35:0));});
      if(m.spark){m.spark.visible=!!job&&(i===2||Math.sin(t*34)>.1);m.spark.scale.setScalar(i===2?1+Math.sin(t*13)*.12:1+Math.sin(t*42)*.5);}
      for(let n=0;n<m.crew.children.length;n++){const w=m.crew.children[n];w.rotation.y=job?Math.sin(t+n)*.2:0;}
    });
    const jobs=s.jobs.filter(j=>j.status!=='done'),ids=new Set(jobs.map(j=>j.id));for(const [id,obj]of this.cars)if(!ids.has(id)){dispose(obj.g);this.cars.delete(id);}
    for(const j of jobs){const stage=j.stage,signature=`${stage}-${j.quality}`;let obj=this.cars.get(j.id);if(!obj||obj.signature!==signature){if(obj)dispose(obj.g);const g=this.car(stage,j.paint,j.quality);this.world.add(g);obj={g,signature};this.cars.set(j.id,obj);}const pos=this.engine.position(j),v=this.at(pos);obj.g.position.copy(v);if(j.status==='moving'){const pts=this.engine.route(j.from,j.to),r=(s.time-j.start)/Math.max(.001,j.end-j.start),dx=Math.abs(pts[1].x-pts[0].x),dz=Math.abs(pts[2].z-pts[1].z);obj.g.rotation.y=r*(dx+dz)<dx?(pts[1].x>pts[0].x?Math.PI/2:-Math.PI/2):(pts[2].z>pts[1].z?0:Math.PI);}else obj.g.rotation.y=0;}
    this.controls.update();this.renderer.render(this.scene,this.camera);
  }
}
