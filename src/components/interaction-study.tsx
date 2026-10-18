"use client";

import { useEffect, useRef, useState } from "react";

const studies = [
  { label: "관찰", title: "서로 다른 두 관점", description: "사람의 질문과 AI의 표현. 상호작용은 차이를 관찰하는 데서 시작됩니다." },
  { label: "연결", title: "질문이 연결되는 순간", description: "입력과 응답이 오갈 때, 이해와 해석은 어떻게 달라질까요?" },
  { label: "협업", title: "판단의 중심에는 사람", description: "같이 만드는 과정에서도, 확인하고 수정하는 판단은 계속됩니다." },
];

type Surface = {points:number[][];normal:number[];side:number};
const sculpture:Surface[]=[];
const spherePoint=(lat:number,lon:number)=>[Math.sin(lat)*Math.cos(lon),-Math.cos(lat),Math.sin(lat)*Math.sin(lon)];
for(let v=0;v<16;v++)for(let u=0;u<28;u++){
  const a=v/16*Math.PI,b=(v+1)/16*Math.PI,c=u/28*Math.PI*2,d=(u+1)/28*Math.PI*2;
  sculpture.push({points:[spherePoint(a,c),spherePoint(a,d),spherePoint(b,d),spherePoint(b,c)],normal:spherePoint((a+b)/2,(c+d)/2),side:-1});
}
for(let axis=0;axis<3;axis++)for(const sign of [-1,1])for(let u=0;u<7;u++)for(let v=0;v<7;v++){
  const lowU=(u/7-.5)*1.58+.008,highU=((u+1)/7-.5)*1.58-.008,lowV=(v/7-.5)*1.58+.008,highV=((v+1)/7-.5)*1.58-.008;
  const surface=(a:number,b:number)=>axis===0?[sign*.79,a,b]:axis===1?[a,sign*.79,b]:[a,b,sign*.79];
  const normal=[0,0,0];normal[axis]=sign;
  sculpture.push({points:[surface(lowU,lowV),surface(highU,lowV),surface(highU,highV),surface(lowU,highV)],normal,side:1});
}

/** A small, original projected sculpture. Visual exploration only; no model inference. */
export function InteractionStudy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [study, setStudy] = useState(1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let request = 0, visible = true, angle = .35, previous = 0, signature = "";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const draw = (timestamp: number) => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) { request = requestAnimationFrame(draw); return; }
      const nextSignature = `${w},${h},${pointer.current.x},${pointer.current.y}`;
      if ((!visible || !playing || reduced.matches) && signature === nextSignature) { request = requestAnimationFrame(draw); previous = timestamp; return; }
      signature = nextSignature;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w*dpr) || canvas.height !== Math.round(h*dpr)) { canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr); }
      ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h);
      if (playing && visible && !reduced.matches && previous) angle += Math.min(40,timestamp-previous)*.00012;
      previous=timestamp;
      const size=Math.min(w*.25,h*.34), cx=w*.5, cy=h*.49, separation=study===0?size*1.13:study===1?size*.86:size*.58;
      // Ground shadows give the sculpture volume without a distracting animation loop.
      for (const sign of [-1,1]) {ctx.save();ctx.translate(cx+sign*separation,h*.82);ctx.scale(1,.14);const grad=ctx.createRadialGradient(0,0,0,0,0,size*1.1);grad.addColorStop(0,'rgba(52,79,120,.16)');grad.addColorStop(1,'rgba(52,79,120,0)');ctx.fillStyle=grad;ctx.beginPath();ctx.arc(0,0,size*1.1,0,Math.PI*2);ctx.fill();ctx.restore();}
      const a=angle+pointer.current.x*.18, b=-.23+pointer.current.y*.1;
      const rotate=(p:number[])=>{const [x,y,z]=p,xx=x*Math.cos(a)-z*Math.sin(a),zz=x*Math.sin(a)+z*Math.cos(a);return [xx,y*Math.cos(b)-zz*Math.sin(b),y*Math.sin(b)+zz*Math.cos(b)];};
      const project=(p:number[],side:number)=>{const [x,y,z]=rotate(p),perspective=4/(4+z*.27);return {x:cx+side*separation+x*size*perspective,y:cy+y*size*perspective,z};};
      if(study>0){for(let n=0;n<4;n++){const y=cy+(n-1.5)*size*.25;ctx.beginPath();ctx.moveTo(cx-separation*.7,y);ctx.bezierCurveTo(cx-size*.1,y-size*.18,cx+size*.1,y+size*.18,cx+separation*.7,y);ctx.strokeStyle='rgba(71,109,162,.20)';ctx.lineWidth=.65;ctx.stroke();}}
      const faces=sculpture.map(face=>{const points=face.points.map(p=>project(p,face.side));return {...face,points,z:points.reduce((sum,p)=>sum+p.z,0)/points.length,normal:rotate(face.normal)};}).sort((p,q)=>q.z-p.z);
      for(const face of faces){const n=face.normal;if(n[2]>.12)continue;const light=Math.max(0,-n[0]*.45-n[1]*.6-n[2]*.65),shine=Math.pow(Math.max(0,light),15)*36;
        const base=face.side<0?[224,229,228]:[69,118,183],illum=.55+light*.46;
        ctx.fillStyle='rgb('+base.map(v=>Math.min(255,Math.round(v*illum+shine))).join(',')+')';
        ctx.beginPath();face.points.forEach((p,i)=>{if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);});ctx.closePath();ctx.fill();
        if(face.side<0){ctx.strokeStyle='rgba(166,180,191,.13)';ctx.lineWidth=.35;ctx.stroke();}
      }
      ctx.font='10px monospace';ctx.textAlign='center';ctx.fillStyle='#738397';ctx.fillText('HUMAN',cx-separation,h*.91);ctx.fillText('AI',cx+separation,h*.91);
      request=requestAnimationFrame(draw);
    };
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(canvas);
    request=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(request);observer.disconnect();};
  },[study,playing]);

  return <div className="dx-study">
    <div className="dx-study-top"><span>INTERACTION STUDY / 01</span><button aria-pressed={playing} onClick={()=>setPlaying(v=>!v)}>{playing?"Ⅱ 움직임 멈춤":"▷ 움직임 재생"}</button></div>
    <canvas ref={canvasRef} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();pointer.current={x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5};}} onPointerLeave={()=>{pointer.current={x:0,y:0};}} role="img" aria-label="사람을 나타내는 밝은 입체 구와 AI를 나타내는 푸른 모듈 조형물이 연결되는 시각화" />
    <div className="dx-study-bottom"><div className="dx-study-tabs" role="group" aria-label="상호작용 관점 선택">{studies.map((item,i)=><button key={item.label} aria-pressed={study===i} onClick={()=>setStudy(i)}>{item.label}</button>)}</div><div className="dx-study-caption" aria-live="polite"><strong>{studies[study].title}</strong><p>{studies[study].description}</p></div><small>인터랙티브 시각화 · 실제 AI 추론이 아닙니다.</small></div>
  </div>;
}
