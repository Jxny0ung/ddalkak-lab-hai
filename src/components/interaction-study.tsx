"use client";

import { useEffect, useRef, useState } from "react";

const studies = [
  { label: "관찰", title: "서로 다른 두 관점", description: "사람의 질문과 AI의 표현. 상호작용은 차이를 관찰하는 데서 시작됩니다." },
  { label: "연결", title: "질문이 연결되는 순간", description: "입력과 응답이 오갈 때, 이해와 해석은 어떻게 달라질까요?" },
  { label: "협업", title: "판단의 중심에는 사람", description: "같이 만드는 과정에서도, 확인하고 수정하는 판단은 계속됩니다." },
];

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
      type Point = { x:number; y:number; z:number; side:number; raw:number[] };
      const points:Point[]=[];
      const a=angle+pointer.current.x*.18, b=-.23+pointer.current.y*.1;
      const project=(x:number,y:number,z:number,side:number):Point=>{const xx=x*Math.cos(a)-z*Math.sin(a),zz=x*Math.sin(a)+z*Math.cos(a),yy=y*Math.cos(b)-zz*Math.sin(b),depth=y*Math.sin(b)+zz*Math.cos(b),perspective=3.5/(3.5+depth*.2);return{x:cx+side*separation+xx*size*perspective,y:cy+yy*size*perspective,z:depth,side,raw:[x,y,z]};};
      for(let i=0;i<210;i++){const y=1-i/209*2,r=Math.sqrt(1-y*y),theta=i*2.399963;points.push(project(Math.cos(theta)*r,y,Math.sin(theta)*r,-1));}
      for(let face=0;face<3;face++)for(const sign of [-1,1])for(let u=0;u<8;u++)for(let v=0;v<8;v++){const p=[(u/7-.5)*1.5,(v/7-.5)*1.5,sign*.75];if(face===1)[p[0],p[2]]=[p[2],p[0]];if(face===2)[p[1],p[2]]=[p[2],p[1]];points.push(project(p[0],p[1],p[2],1));}
      // Two translucent volumes, then their visible network surfaces.
      for(const side of [-1,1]){const grad=ctx.createRadialGradient(cx+side*separation-size*.3,cy-size*.35,size*.1,cx+side*separation,cy,size*1.15);grad.addColorStop(0,side<0?'rgba(249,250,249,.95)':'rgba(196,217,253,.7)');grad.addColorStop(.6,side<0?'rgba(177,192,211,.34)':'rgba(83,134,226,.25)');grad.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=grad;ctx.beginPath();ctx.ellipse(cx+side*separation,cy,size*1.1,size*1.1,0,0,Math.PI*2);ctx.fill();}
      if(study>0){for(let n=0;n<7;n++){const y=cy+(n-3)*size*.16;ctx.beginPath();ctx.moveTo(cx-separation*.56,y);ctx.bezierCurveTo(cx-size*.15,y-size*.18,cx+size*.15,y+size*.18,cx+separation*.55,y);ctx.strokeStyle=`rgba(58,114,207,${.08+n*.014})`;ctx.lineWidth=1;ctx.stroke();}}
      const sorted=[...points].sort((p,q)=>q.z-p.z);
      for(const p of sorted){const alpha=.2+(1-p.z/1.5)*.3;ctx.fillStyle=p.side<0?`rgba(72,94,124,${alpha})`:`rgba(36,92,183,${alpha})`;ctx.beginPath();ctx.arc(p.x,p.y,p.side<0?1.2:1.4,0,Math.PI*2);ctx.fill();}
      for(let i=0;i<points.length;i++){const p=points[i];if(p.z>.3)continue;for(let j=i+1;j<Math.min(points.length,i+22);j++){const q=points[j];if(p.side!==q.side)continue;const dist=Math.hypot(...p.raw.map((v,k)=>v-q.raw[k]));if(dist>.29||dist<.03)continue;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=p.side<0?'rgba(102,124,148,.17)':'rgba(56,106,191,.2)';ctx.lineWidth=.65;ctx.stroke();}}
      ctx.font='10px monospace';ctx.textAlign='center';ctx.fillStyle='#738397';ctx.fillText('HUMAN',cx-separation,h*.91);ctx.fillText('AI',cx+separation,h*.91);
      request=requestAnimationFrame(draw);
    };
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(canvas);
    request=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(request);observer.disconnect();};
  },[study,playing]);

  return <div className="dx-study">
    <div className="dx-study-top"><span>INTERACTION STUDY / 01</span><button aria-pressed={playing} onClick={()=>setPlaying(v=>!v)}>{playing?"Ⅱ 움직임 멈춤":"▷ 움직임 재생"}</button></div>
    <canvas ref={canvasRef} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();pointer.current={x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5};}} onPointerLeave={()=>{pointer.current={x:0,y:0};}} role="img" aria-label="사람을 나타내는 유기적인 구와 AI를 나타내는 격자 구조가 연결되는 입체 시각화" />
    <div className="dx-study-bottom"><div className="dx-study-tabs" role="group" aria-label="상호작용 관점 선택">{studies.map((item,i)=><button key={item.label} aria-pressed={study===i} onClick={()=>setStudy(i)}>{item.label}</button>)}</div><div className="dx-study-caption" aria-live="polite"><strong>{studies[study].title}</strong><p>{studies[study].description}</p></div><small>인터랙티브 시각화 · 실제 AI 추론이 아닙니다.</small></div>
  </div>;
}
