import * as T from 'three';
import { OrbitControls } from './OrbitControls.mjs';
import { STAGES } from './engine.mjs';

const SPACE = 2.8;
const material = (color, metalness=.15, roughness=.6) => new T.MeshStandardMaterial({color,metalness,roughness});
const palette = {
  floor:material('#26333f',.18,.82), steel:material('#6c7c89',.82,.28), white:material('#a9b7bd',.4,.4),
  dark:material('#111b24',.48,.46), orange:material('#c98432',.55,.36), blue:material('#3e667d',.6,.34),
  rubber:material('#0d1218',.02,.88), window:material('#1e4154',.75,.12), skin:material('#b58d6d'),
  cyan:new T.MeshStandardMaterial({color:'#98d4ed',emissive:'#61bada',emissiveIntensity:1.3}),
  warm:new T.MeshStandardMaterial({color:'#f9d393',emissive:'#ffb255',emissiveIntensity:1.4}),
};
const geometries = { box:new T.BoxGeometry(1,1,1), cylinder:new T.CylinderGeometry(1,1,1,16) };
const sharedGeometry = new Set(Object.values(geometries));
const sharedMaterial = new Set(Object.values(palette));
const axis = new T.Vector3(0,1,0);
function box(parent,w,h,d,x,y,z,mat=palette.steel,shadow=true) {
  const mesh=new T.Mesh(geometries.box,mat);mesh.scale.set(w,h,d);mesh.position.set(x,y,z);
  mesh.castShadow=shadow;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
function cylinder(parent,r,h,x,y,z,mat=palette.steel,shadow=true) {
  const mesh=new T.Mesh(geometries.cylinder,mat);mesh.scale.set(r,h,r);mesh.position.set(x,y,z);
  mesh.castShadow=shadow;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
function label(text,color='#b5c8d4',size=1.5) {
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;const c=canvas.getContext('2d');
  c.fillStyle='#0b151eee';c.roundRect(4,4,504,120,10);c.fill();c.fillStyle=color;c.font='500 40px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(text,256,66);
  const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;
  const sprite=new T.Sprite(new T.SpriteMaterial({map:tex,depthTest:false,transparent:true}));sprite.scale.set(size,size/4,1);return sprite;
}
function dispose(group) {
  const mats=new Set(),geo=new Set();group.traverse(n=>{if(n.geometry&&!sharedGeometry.has(n.geometry))geo.add(n.geometry);if(n.material&&!sharedMaterial.has(n.material))mats.add(n.material);});
  geo.forEach(g=>g.dispose());mats.forEach(m=>{m.map?.dispose();m.dispose();});group.removeFromParent();
}
function profileBody(parent,outline,width,mat) {
  const coords=[],indices=[],n=outline.length;
  for(const x of [-width/2,width/2])for(const [z,y]of outline)coords.push(x,y,z);
  for(const [a,b,c]of T.ShapeUtils.triangulateShape(outline.map(([z,y])=>new T.Vector2(z,y)),[])){indices.push(a,b,c,c+n,b+n,a+n);}
  for(let i=0;i<n;i++){const j=(i+1)%n;indices.push(i,j+n,j,i,i+n,j+n);}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(coords,3));geo.setIndex(indices);geo.computeVertexNormals();
  const mesh=new T.Mesh(geo,mat);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}

export class FactoryScene {
  constructor(container,engine,onSelect,onMove,onError) {
    this.placementMode=false;this.container=container;this.engine=engine;this.selected=0;this.machines=[];this.cars=new Map();this.onError=onError;
    this.scene=new T.Scene();this.scene.background=new T.Color('#0c141d');this.scene.fog=new T.Fog('#0c141d',32,68);
    this.renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
    this.renderer.shadowMap.type=T.PCFSoftShadowMap;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.18;
    container.prepend(this.renderer.domElement);this.renderer.domElement.setAttribute('aria-label','산업용 3D 공장. 드래그 회전, 우클릭 이동, 휠 확대. 기계 선택과 배치는 별도 편집기로도 가능합니다.');
    this.camera=new T.PerspectiveCamera(36,1,.1,100);this.camera.position.set(16,16,20);
    this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.target.set(0,.3,0);this.controls.enableDamping=true;this.controls.dampingFactor=.08;this.controls.minDistance=5;this.controls.maxDistance=38;this.controls.maxPolarAngle=Math.PI*.47;this.controls.minPolarAngle=.03;this.controls.maxTargetRadius=7;
    this.scene.add(new T.HemisphereLight('#b3cce1','#18202a',1.05));
    this.keyLight=new T.DirectionalLight('#c9e4ff',3.6);this.keyLight.position.set(-7,16,7);this.keyLight.castShadow=true;
    Object.assign(this.keyLight.shadow.camera,{left:-13,right:13,top:13,bottom:-13});this.keyLight.shadow.normalBias=.035;this.keyLight.shadow.bias=-.0001;this.scene.add(this.keyLight);
    const fill=new T.DirectionalLight('#6ca8d4',1.1);fill.position.set(10,7,-9);this.scene.add(fill);
    const rim=new T.DirectionalLight('#e7ae65',.8);rim.position.set(-12,4,-10);this.scene.add(rim);
    this.world=new T.Group();this.scene.add(this.world);this.buildHall();this.setQuality('balanced');
    this.ray=new T.Raycaster();this.pointer=new T.Vector2();this.activePointers=new Set();this.dragStart=null;
    this.renderer.domElement.addEventListener('pointerdown',e=>{this.activePointers.add(e.pointerId);if(e.button!==0||this.activePointers.size>1||!e.isPrimary){this.dragStart=null;return;}this.dragStart={x:e.clientX,y:e.clientY,id:e.pointerId};});
    this.renderer.domElement.addEventListener('pointerup',e=>{
      this.activePointers.delete(e.pointerId);const start=this.dragStart;this.dragStart=null;
      if(!start||e.button!==0||e.pointerId!==start.id||Math.hypot(e.clientX-start.x,e.clientY-start.y)>7)return;
      const r=this.renderer.domElement.getBoundingClientRect();this.pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);this.ray.setFromCamera(this.pointer,this.camera);
      const machines=this.ray.intersectObjects(this.machines.map(m=>m.g),true).filter(h=>h.object.isMesh&&h.object.userData.station!==undefined);
      if(machines.length){onSelect(machines[0].object.userData.station);return;}
      const hits=this.ray.intersectObjects(this.tiles,false);if(!hits.length)return;const cell=hits[0].object.userData.cell,i=this.engine.s.positions.indexOf(cell);if(i>=0)onSelect(i);else if(this.placementMode&&this.engine.editable)onMove(cell);
    });
    this.renderer.domElement.addEventListener('pointercancel',e=>{this.activePointers.delete(e.pointerId);this.dragStart=null;});
    this.renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();onError('3D 화면 연결이 중단되었습니다. 저장 후 새로고침하거나 배치 편집기를 이용하세요.');});
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(container);this.sync();this.resize();
  }
  buildHall() {
    box(this.world,19,.55,17,0,-.45,0,palette.dark);box(this.world,18.8,.12,16.8,0,-.1,0,palette.floor);
    // Concrete expansion seams, a service walkway and low cutaway walls.
    for(let i=-4;i<=4;i++){box(this.world,.015,.005,16.7,i*2,.0,0,palette.dark,false);box(this.world,18.7,.005,.015,0,.0,i*2,palette.dark,false);}
    for(const x of [-8,8]){box(this.world,.03,.008,15,x,.01,0,palette.white,false);box(this.world,.03,.008,15,x+.23,.01,0,palette.white,false);}
    box(this.world,18.7,.52,.18,0,.17,-8.3,palette.dark);box(this.world,.18,.52,16.7,-9.3,.17,0,palette.dark);
    for(const x of [-8.85,8.85])for(const z of [-7.85,0,7.85]){
      box(this.world,.22,3.1,.22,x,1.5,z,palette.steel);box(this.world,.38,.07,.38,x,.03,z,palette.dark);
      box(this.world,.28,.6,.28,x,.33,z,palette.orange);
      box(this.world,.65,.07,.24,x,3.08,z,palette.cyan,false);
    }
    for(const z of [-7.8,7.8]){box(this.world,17.7,.2,.14,0,3.0,z,palette.dark);for(let i=-3;i<=3;i++)box(this.world,1.45,.035,.07,i*2.35,2.88,z,palette.cyan,false);}
    // Cable trays, ducts and equipment racks stay around the perimeter.
    for(const x of [-8.6,8.6]){box(this.world,.35,.16,15.5,x,2.8,0,palette.steel);for(let z=-7;z<=7;z+=.7)box(this.world,.46,.04,.045,x,2.92,z,palette.dark,false);}
    for(let x=-4;x<5;x+=2.3){box(this.world,1.95,1.4,.55,x,.7,-7.5,palette.blue);box(this.world,1.83,1.24,.035,x,.72,-7.18,palette.dark);for(let y=.3;y<1.4;y+=.28)box(this.world,1.55,.035,.05,x,y,-7.13,palette.steel,false);box(this.world,.12,.05,.06,x+.7,1.24,-7.1,palette.cyan,false);}
    for(let n=0;n<4;n++){box(this.world,.9,.15,.78,-7.3,.12,-2+n*1.1,palette.dark);for(let k=0;k<4;k++)box(this.world,.85,.065,.7,-7.3,.24+k*.08,-2+n*1.1,palette.steel);}
    for(let n=0;n<3;n++){cylinder(this.world,.3,.95,7.15,.47,-4.8+n*.78,palette.blue);cylinder(this.world,.31,.05,7.15,.96,-4.8+n*.78,palette.steel);}
    for(const [x,z]of [[-7,-4.2],[7,4.2]]){box(this.world,1.8,.08,2.3,x,.03,z,palette.dark);for(let n=0;n<6;n++){const stripe=box(this.world,.26,.01,.14,x-.7+n*.28,.08,z+1,palette.orange,false);stripe.rotation.y=-.5;}}
    const incoming=label('IN / MATERIAL','#9dcbe7',1.55);incoming.position.set(-7.05,1.15,-4.2);this.world.add(incoming);
    const outgoing=label('OUT / DISPATCH','#d1c29b',1.65);outgoing.position.set(7.05,1.15,4.2);this.world.add(outgoing);
    const sign=label('DDALKAK  /  FACTORY 01','#829cb0',3.3);sign.position.set(.0,2.0,-7.5);this.world.add(sign);
    this.tiles=[];this.tileMaterial=material('#2b3d4b',.22,.75);this.tileEdges=new T.Group();this.world.add(this.tileEdges);
    for(let i=0;i<16;i++){
      const x=(i%4-1.5)*SPACE,z=(Math.floor(i/4)-1.5)*SPACE;
      const tile=box(this.world,2.73,.014,2.73,x,.015,z,this.tileMaterial,false);tile.userData.cell=i;this.tiles.push(tile);
      for(const dx of [-1.26,1.26])for(const dz of [-1.26,1.26]){box(this.tileEdges,.18,.012,.018,x+dx,.032,z+dz,palette.blue,false);box(this.tileEdges,.018,.012,.18,x+dx,.032,z+dz,palette.blue,false);}
    }
  }
  setQuality(quality) {
    this.quality=quality;this.renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,quality==='low'?1:quality==='high'?2:1.5));
    this.renderer.shadowMap.enabled=quality!=='low';this.keyLight.shadow.mapSize.set(quality==='high'?2048:1024,quality==='high'?2048:1024);
    this.keyLight.shadow.map?.dispose();this.keyLight.shadow.map=null;this.resize();
  }
  resize(){const w=this.container.clientWidth,h=this.container.clientHeight;if(!w||!h)return;this.renderer.setSize(w,h);this.camera.aspect=w/h;this.camera.fov=w/h<.75?60:36;this.camera.updateProjectionMatrix();}
  at(p){return new T.Vector3((p.x-1.5)*SPACE,.39,(p.z-1.5)*SPACE);}
  robot(parent,x,z,side=1) {
    const g=new T.Group();g.position.set(x,.28,z);parent.add(g);
    cylinder(g,.22,.12,0,.06,0,palette.dark);cylinder(g,.13,.44,0,.30,0,palette.orange);
    const shoulder=new T.Group();shoulder.position.y=.52;g.add(shoulder);
    box(shoulder,.19,.53,.19,0,.23,0,palette.orange);const joint=cylinder(shoulder,.14,.24,0,.47,0,palette.steel);joint.rotation.z=Math.PI/2;
    const elbow=new T.Group();elbow.position.y=.47;shoulder.add(elbow);
    box(elbow,.14,.48,.15,0,.20,0,palette.orange);box(elbow,.19,.13,.18,0,.46,0,palette.dark);box(elbow,.045,.10,.07,0,.55,0,palette.steel);
    box(shoulder,.035,.43,.035,.12,.2,.08,palette.rubber,false);
    return {g,shoulder,elbow,side};
  }
  machine(i) {
    const g=new T.Group(),color=material(STAGES[i].color,.6,.4);
    box(g,2.08,.16,2.06,0,.13,0,palette.dark);box(g,1.96,.04,1.92,0,.23,0,palette.steel);
    for(const x of [-.97,.97])box(g,.045,.015,1.95,x,.26,0,palette.orange,false);
    for(const z of [-.97,.97])for(let n=0;n<6;n++)box(g,.13,.014,.07,-.82+n*.32,.26,z,palette.orange,false);
    const robots=[];let press=null,effect=null;
    if(i===0){
      for(const x of [-.72,.72]){box(g,.22,1.42,.5,x,.97,-.1,palette.blue);cylinder(g,.07,1.2,x,.94,.21,palette.steel);}
      box(g,1.8,.35,.84,0,1.67,-.1,palette.blue);box(g,1.55,.08,.48,0,1.87,-.1,palette.dark);
      box(g,1.4,.14,.8,0,.44,-.1,palette.steel);press=box(g,1.28,.20,.7,0,1.08,-.1,palette.steel);
      cylinder(g,.12,.5,0,1.32,-.1,palette.steel);box(g,.35,.44,.23,.94,.7,.3,palette.dark);box(g,.25,.16,.025,.94,.80,.425,palette.cyan,false);
    } else if(i===1){
      box(g,.78,.13,1.18,0,.37,0,palette.dark);for(const x of [-.48,.48])box(g,.055,.13,1.12,x,.47,0,palette.steel);
      robots.push(this.robot(g,-.76,-.42,1),this.robot(g,.76,.42,-1));
      const positions=[];for(let n=0;n<24;n++){const a=n*2.399;positions.push(Math.cos(a)*(.08+n*.008),.2+(n%5)*.045,Math.sin(a)*(.08+n*.008));}
      const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));
      effect=new T.Points(geo,new T.PointsMaterial({color:'#ffdb9b',size:.042,transparent:true,opacity:.9,depthWrite:false}));effect.position.y=.54;g.add(effect);
    } else if(i===2){
      for(const x of [-.82,.82]){box(g,.17,1.35,1.7,x,.95,0,palette.blue);box(g,.025,.85,1.27,x-Math.sign(x)*.1,1.04,0,palette.white);box(g,.035,.025,1.38,x-Math.sign(x)*.115,1.47,0,palette.cyan,false);}
      box(g,1.82,.18,1.75,0,1.69,0,palette.blue);box(g,1.3,.16,.8,0,1.86,0,palette.dark);
      const glass=new T.MeshStandardMaterial({color:'#9acadd',transparent:true,opacity:.13,metalness:.25,roughness:.12,depthWrite:false});
      box(g,1.46,1.18,.035,0,.99,-.81,glass,false);robots.push(this.robot(g,-.61,-.3,1));
      effect=new T.Mesh(new T.ConeGeometry(.32,.55,18),new T.MeshBasicMaterial({color:'#b9dce9',transparent:true,opacity:.16,depthWrite:false}));effect.position.set(0,1.05,0);g.add(effect);
    } else {
      for(const x of [-.82,.82]){box(g,.17,1.38,.25,x,.96,-.47,palette.blue);box(g,.32,.1,.68,x,.32,-.16,palette.steel);}
      box(g,1.94,.18,.29,0,1.65,-.47,palette.blue);box(g,.04,.62,.04,.38,1.25,-.47,palette.orange);
      box(g,.8,.08,1.1,0,.40,0,palette.dark);robots.push(this.robot(g,.75,.52,-1));
    }
    const control=box(g,.20,.38,.25,-.88,.47,.67,palette.dark);control.rotation.x=-.15;box(g,.12,.09,.02,-.88,.57,.81,palette.cyan,false);
    const sign=label('0'+(i+1)+' / '+STAGES[i].name,STAGES[i].color,1.42);sign.position.set(0,2.16,0);g.add(sign);
    box(g,1.3,.045,.045,0,1.96,.1,palette.dark,false);const progress=box(g,1.28,.05,.05,0,1.96,.105,color,false);
    const marker=new T.Mesh(new T.RingGeometry(1.18,1.215,48),new T.MeshBasicMaterial({color:'#8ac5e8',side:T.DoubleSide,transparent:true,opacity:.8}));marker.rotation.x=-Math.PI/2;marker.position.y=.28;g.add(marker);
    const warning=label('QUEUE / 대기','#e4b75e',1.2);warning.position.set(0,2.55,0);warning.visible=false;g.add(warning);
    const crew=new T.Group();g.add(crew);const upgrade=label('UPGRADED','#a2c9b7',.95);upgrade.position.set(0,.43,1.05);g.add(upgrade);
    return {g,robots,press,effect,progress,marker,warning,crew,upgrade,workerCount:-1};
  }
  worker(parent,x,z,n) {
    const g=new T.Group();g.position.set(x,.25,z);parent.add(g);const uniform=n%2?palette.blue:palette.orange;
    box(g,.14,.24,.09,0,.31,0,uniform);box(g,.145,.04,.10,0,.36,0,palette.white,false);
    cylinder(g,.063,.12,0,.50,0,palette.skin,false);cylinder(g,.078,.055,0,.57,0,palette.orange,false);
    const arms=[];for(const side of [-1,1]){box(g,.055,.18,.07,side*.045,.1,0,palette.dark,false);box(g,.06,.035,.10,side*.045,.02,.02,palette.rubber,false);const arm=new T.Group();arm.position.set(side*.1,.39,0);g.add(arm);box(arm,.045,.17,.055,0,-.065,0,uniform,false);arms.push(arm);}
    g.userData.arms=arms;return g;
  }
  beltsBuild() {
    if(this.belts)dispose(this.belts);this.belts=new T.Group();this.world.add(this.belts);
    const rollerGeo=new T.CylinderGeometry(.045,.045,.54,10);rollerGeo.rotateZ(Math.PI/2);
    for(let leg=0;leg<5;leg++){
      const points=this.engine.route(leg-1,leg).map(p=>this.at(p));
      for(let k=1;k<points.length;k++){
        const a=points[k-1],b=points[k],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz);if(len<.01)continue;
        const group=new T.Group();group.position.copy(a).add(b).multiplyScalar(.5);group.position.y=.21;group.rotation.y=Math.atan2(dx,dz);this.belts.add(group);
        box(group,.66,.11,len,0,0,0,palette.dark);for(const side of [-1,1]){box(group,.045,.09,len,side*.34,.08,0,palette.steel);for(let d=-len/2+.25;d<len/2;d+=1.15)box(group,.06,.2,.07,side*.27,-.13,d,palette.dark);}
        const count=Math.max(1,Math.floor(len/.23)),rollers=new T.InstancedMesh(rollerGeo,palette.steel,count),dummy=new T.Object3D();
        for(let n=0;n<count;n++){dummy.position.set(0,.08,-len/2+.13+n*(len-.26)/count);dummy.updateMatrix();rollers.setMatrixAt(n,dummy.matrix);}rollers.receiveShadow=true;group.add(rollers);
        // Moving chevrons express the actual conveyor direction without rebuilding rollers.
        const markers=new T.Group();group.add(markers);markers.userData.length=len;markers.userData.leg=leg;
        for(let n=0;n<Math.floor(len/.9);n++)box(markers,.1,.009,.13,0,.133,-len/2+.3+n*.9,palette.orange,false);
        group.userData.markers=markers;
      }
    }
  }
  sync() {
    const s=this.engine.s,positionSig=s.positions.join(',');
    if(this.positionSig!==positionSig){this.positionSig=positionSig;this.beltsBuild();}
    if(!this.machines.length)this.machines=STAGES.map((_,i)=>{const m=this.machine(i);this.world.add(m.g);return m;});
    this.machines.forEach((m,i)=>{
      const p=this.engine.point(i);m.g.position.set((p.x-1.5)*SPACE,0,(p.z-1.5)*SPACE);m.upgrade.visible=s.upgrades[i];
      if(m.workerCount!==s.workers[i]){for(const child of [...m.crew.children])dispose(child);m.workerCount=s.workers[i];for(let n=0;n<s.workers[i];n++)this.worker(m.crew,-.82+n*.49,.87,n);}
      m.g.traverse(node=>{if(node.isMesh)node.userData.station=i;});
    });
  }
  car(stage,paint,quality) {
    const g=new T.Group(),paints=['#447b9e','#a6503f','#d3d7d5','#b49c6c'],body=stage<3?palette.steel:material(quality===-1?'#815a51':paints[paint%4],.68,.24);
    if(stage===0){for(let n=0;n<4;n++)box(g,.48,.025,.83,0,.05+n*.032,0,palette.steel);return g;}
    if(stage===1){box(g,.48,.07,.84,0,.09,0,palette.steel);for(const x of [-.19,.19]){box(g,.10,.04,.6,x,.15,0,palette.steel);box(g,.06,.09,.20,x,.20,-.20,palette.steel);}return g;}
    const outline=[[-.52,.12],[.53,.12],[.53,.24],[.36,.28],[.19,.31],[.06,.48],[-.24,.49],[-.4,.30],[-.52,.28]];
    if(stage===2){
      box(g,.52,.08,1.03,0,.10,0,body);
      for(const x of [-.245,.245]){box(g,.035,.15,.90,x,.20,0,body);for(const z of [-.28,.12]){const post=box(g,.035,.28,.035,x*.85,.35,z,body);post.rotation.x=z>0?-.55:.36;}}
      box(g,.43,.035,.35,0,.50,-.08,body);
      for(const z of [-.4,.37])box(g,.48,.055,.1,0,.23,z,body);
    } else {
      profileBody(g,outline,.55,body);
      // Sloped windows and side-glazing have a legible sedan silhouette.
      const front=box(g,.42,.19,.02,0,.385,.115,palette.window);front.rotation.x=-.64;
      const back=box(g,.40,.19,.018,0,.394,-.31,palette.window);back.rotation.x=.55;
      for(const x of [-.278,.278]){box(g,.012,.145,.29,x,.385,-.10,palette.window);box(g,.014,.15,.025,x,.385,-.085,body);box(g,.016,.015,.065,x,.28,.05,palette.steel,false);}
      box(g,.47,.065,.035,0,.15,.54,palette.dark);box(g,.47,.06,.035,0,.15,-.53,palette.dark);
      for(const x of [-.18,.18]){box(g,.11,.038,.02,x,.25,.535,palette.white,false);box(g,.12,.03,.02,x,.25,-.53,material('#9a3b34'),false);}
    }
    if(stage===4)for(const x of [-.282,.282])for(const z of [-.31,.32]){
      const wheel=cylinder(g,.123,.075,x,.12,z,palette.rubber);wheel.rotation.z=Math.PI/2;
      const rim=cylinder(g,.076,.082,x,.12,z,palette.steel);rim.rotation.z=Math.PI/2;
      const hub=cylinder(g,.028,.085,x,.12,z,palette.dark,false);hub.rotation.z=Math.PI/2;
    }
    return g;
  }
  setView(view) {
    const target=view==='detail'?this.machines[this.selected].g.position.clone():new T.Vector3(0,.3,0);target.y=.5;
    if(view==='top')this.camera.position.copy(target).add(new T.Vector3(.01,25,.1));
    else if(view==='floor')this.camera.position.copy(target).add(new T.Vector3(15,7,17));
    else if(view==='detail')this.camera.position.copy(target).add(new T.Vector3(4.8,4,5.4));
    else this.camera.position.copy(target).add(new T.Vector3(16,16,20));
    this.controls.target.copy(target);this.controls.update();
  }
  rotate(direction){const p=this.camera.position.clone().sub(this.controls.target);p.applyAxisAngle(axis,direction*Math.PI/8);this.camera.position.copy(this.controls.target).add(p);this.controls.update();}
  zoom(direction){const p=this.camera.position.clone().sub(this.controls.target);p.multiplyScalar(direction>0?.85:1.18).clampLength(5,38);this.camera.position.copy(this.controls.target).add(p);this.controls.update();}
  render(selected) {
    this.selected=selected;this.sync();const s=this.engine.s;this.tileEdges.visible=this.placementMode&&this.engine.editable;
    this.machines.forEach((m,i)=>{
      const job=s.jobs.find(j=>j.id===s.processing[i]),p=job?T.MathUtils.clamp((s.time-job.start)/(job.end-job.start),0,1):0;
      const approach=Math.sin(Math.PI*p),work=job&&p>.22&&p<.82;
      m.marker.visible=i===selected;m.progress.scale.x=Math.max(.001,p)*1.28;m.progress.position.x=-(1-p)*.64;
      m.warning.visible=s.queues[i].length>=2;m.warning.material.opacity=.75;
      if(m.press)m.press.position.y=job?1.08-Math.pow(approach,4)*.45:1.08;
      for(const r of m.robots){r.shoulder.rotation.z=r.side*(.45+approach*.46);r.elbow.rotation.z=r.side*(.75+approach*.50);r.g.rotation.y=work?Math.sin(p*22)*.08:0;}
      if(m.effect){m.effect.visible=!!work&&(i===2||Math.sin(s.time*37)>.15);m.effect.rotation.y=p*15;m.effect.scale.setScalar(i===2?.8+approach*.4:.7+Math.abs(Math.sin(s.time*31))*.5);}
      m.crew.children.forEach((worker,n)=>{worker.rotation.y=job?Math.sin(p*Math.PI*2+n)*.18:0;worker.userData.arms?.forEach((arm,k)=>{arm.rotation.x=work?-.6+Math.sin(p*16+n+k)*.25:0;});});
    });
    for(const belt of this.belts.children){const markers=belt.userData.markers;if(markers)markers.position.z=s.phase==='running'?(s.time*.25)%.12:0;}
    const jobs=s.jobs.filter(j=>j.status!=='done'),ids=new Set(jobs.map(j=>j.id));
    for(const [id,obj]of this.cars)if(!ids.has(id)){dispose(obj.g);this.cars.delete(id);}
    for(const j of jobs){
      let stage=j.stage;if(j.status==='processing'&&(s.time-j.start)/(j.end-j.start)>.86)stage=Math.min(4,stage+1);
      const signature=stage+'-'+j.quality;let obj=this.cars.get(j.id);
      if(!obj||obj.signature!==signature){if(obj)dispose(obj.g);const g=this.car(stage,j.paint,j.quality);this.world.add(g);obj={g,signature};this.cars.set(j.id,obj);}
      obj.g.position.copy(this.at(this.engine.position(j)));
      if(j.status==='moving'){const pts=this.engine.route(j.from,j.to),r=(s.time-j.start)/Math.max(.001,j.end-j.start),dx=Math.abs(pts[1].x-pts[0].x),dz=Math.abs(pts[2].z-pts[1].z);obj.g.rotation.y=r*(dx+dz)<dx?(pts[1].x>pts[0].x?Math.PI/2:-Math.PI/2):(pts[2].z>pts[1].z?0:Math.PI);}else obj.g.rotation.y=0;
    }
    this.controls.update();this.renderer.render(this.scene,this.camera);
  }
}
