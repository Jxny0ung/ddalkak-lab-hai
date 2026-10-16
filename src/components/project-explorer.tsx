"use client";
import Link from "next/link";
import { useState } from "react";
import { FactoryIllustration } from "./factory-illustration";

const projects = [
  {id:"factory",title:"TOYOTA: PRIORITY",subtitle:"Factory Command · 3D 공장 운영",description:"자원을 배치하고, 생산 흐름을 관찰하고, 세 번의 라운드에서 판단을 개선합니다.",href:"/games",type:"직접 체험",status:"플레이 가능",tags:"게임 시뮬레이션 경영 생산 3D",art:"factory"},
  {id:"eth",title:"AI 기반 ETH 논문 연구",subtitle:"질문과 검증 과정의 기록",description:"AI를 활용하는 논문 프로젝트. 연구 상세와 결과는 확인된 자료가 갖춰지면 공개합니다.",href:"/work/eth",type:"연구",status:"진행 기록 준비",tags:"논문 연구 ETH",art:"research"},
  {id:"clap",title:"Clap HAI Interface",subtitle:"비언어적 신호와 사람의 의도",description:"명시적인 동의 후 마이크 입력을 분석하는 브라우저 인터페이스 실험입니다.",href:"/lab",type:"직접 체험",status:"실험용 프로토타입",tags:"박수 소리 상호작용 HAI",art:"clap"},
  {id:"notes",title:"AI 제작 과정 아카이브",subtitle:"시도와 수정의 과정",description:"제작 과정과 검증을 위한 기록 공간입니다. 현재 프롬프트 원문은 공개하지 않습니다.",href:"/prompts",type:"기록",status:"공개 기록 준비",tags:"프롬프트 제작 기록 과정",art:"notes"},
  {id:"map",title:"AI Brain Map",subtitle:"아이디어를 질문으로 펼치기",description:"고정된 질문 템플릿으로 아이디어를 구조화하는 로컬 데모입니다. 외부 AI 호출은 없습니다.",href:"/projects/idea-map",type:"직접 체험",status:"학습용 데모",tags:"브레인맵 아이디어 학습",art:"map"},
  {id:"builder",title:"Prompt Builder",subtitle:"목표·역할·검증 조건의 구성",description:"목표와 조건을 정리해 프롬프트 문장을 구성하는 학습 도구입니다. 실제 모델을 호출하지 않습니다.",href:"/projects/prompt-builder",type:"직접 체험",status:"학습용 데모",tags:"프롬프트 빌더 학습 도구",art:"notes"},
  {id:"reading",title:"AI 책 읽기와 서평",subtitle:"한 권의 책에서 시작하는 질문",description:"AI에 관한 읽기와 생각을 남길 공간입니다. 공개된 서평은 아직 없습니다.",href:"/reading",type:"기록",status:"첫 서평 준비",tags:"책 독서 리뷰 서평",art:"reading"},
  {id:"dashboard",title:"Business Dashboard",subtitle:"의사결정과 정보의 구조",description:"가상 KPI로 화면의 정보 구조를 살펴보는 기획 예시입니다. 실제 사업 데이터는 아닙니다.",href:"/projects/business-dashboard",type:"기록",status:"기획 예시",tags:"데이터 시각화 대시보드",art:"map"},
];
const filters=["전체","직접 체험","연구","기록"];
export function ProjectExplorer(){
  const [filter,setFilter]=useState("전체"),[query,setQuery]=useState("");
  const found=projects.filter(p=>(filter==="전체"||p.type===filter)&&`${p.title} ${p.subtitle} ${p.tags}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  return <div className="dx-explorer"><div className="dx-filterbar"><div className="dx-filters" role="group" aria-label="프로젝트 유형">{filters.map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}<small>{f==="전체"?projects.length:projects.filter(p=>p.type===f).length}</small></button>)}</div><label className="dx-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="프로젝트와 관심 키워드 찾기" aria-label="프로젝트 검색" /></label></div><p className="dx-result-count" role="status" aria-live="polite">{found.length}개의 프로젝트 · 공개 상태를 확인하고 탐색하세요.</p><div className="dx-directory-grid">{found.map((p,i)=><Link className={`dx-directory-card dx-directory-card--${p.art}`} href={p.href} key={p.id}><div className="dx-directory-art" aria-hidden="true"><span>{String(i+1).padStart(2,"0")} / {p.type}</span>{p.art==="factory"?<FactoryIllustration/>:p.art==="research"?<div className="dx-big-letter">Q<span>→</span></div>:p.art==="clap"?<div className="dx-wave">{[25,50,70,40,95,62,40,80,50,25].map((h,i)=><i key={i} style={{height:h}}/>)}</div>:p.art==="map"?<div className="dx-map-art"><i/><i/><i/><i/><i/></div>:<div className="dx-paper-art"><i/><i/><i/></div>}</div><div className="dx-directory-body"><span className="dx-status">{p.status}</span><h2>{p.title}<span aria-hidden="true">↗</span></h2><strong>{p.subtitle}</strong><p>{p.description}</p></div></Link>)}</div>{found.length===0?<div className="dx-empty"><h2>아직 연결되는 프로젝트가 없습니다.</h2><p>다른 키워드로 검색하거나 전체 목록을 살펴보세요.</p><button className="sl-btn sl-btn-dark" onClick={()=>{setQuery("");setFilter("전체");}}>전체 프로젝트 보기</button></div>:null}</div>;
}
