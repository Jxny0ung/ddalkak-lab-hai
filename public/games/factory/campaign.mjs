/** Narrative and goals are derived from the existing simulation; no extra rewards or economy. */
export const CHAPTERS = [
  {title:'첫 출하를 만들다',story:'첫 교대가 시작됩니다. 작업자 8명과 3,000만 원, 네 개의 생산설비가 준비됐습니다. 절단부터 조립까지 흐름을 연결하고 첫 납품을 만들어 보세요.'},
  {title:'병목을 넘어, 다음 주문으로',story:'첫 운영 기록이 도착했습니다. 어느 공정 앞에 차량이 쌓였나요? 인력과 설비, 운반 동선을 다시 판단하고 늘어난 주문을 맞이하세요.'},
  {title:'마지막 교대, 선택의 증명',story:'마지막 운영입니다. 지난 두 번의 판단으로 만든 공장을 검증하세요. 많이 만드는 것과 이익을 남기는 것은 같은 일이 아닙니다. 납기와 재고까지 살펴보세요.'},
];
export function campaign(engine){
  const s=engine.s,chapter=CHAPTERS[s.round-1],d=s.data,shipped=d?.shipped??0,prior=s.results.find(r=>r.round===s.round-1),finished=s.phase==='review'||s.phase==='final';
  const assigned=s.workers.reduce((a,b)=>a+b,0),ready=assigned===s.hired&&s.workers.every(n=>n>=1);
  const config=d?.config??{workers:s.workers,upgrades:s.upgrades,positions:s.positions};
  const changed=!!prior&&['workers','upgrades','positions'].some(key=>JSON.stringify(config[key])!==JSON.stringify(prior.config[key]));
  const goals=[
    {label:s.round===1?'모든 작업자 배치':'운영 방식 다시 결정',detail:s.round===1?'네 공정에 인력을 나누세요.':'인력·설비·동선 변경은 선택입니다.',value:s.round===1?`${assigned} / ${s.hired}명`:changed?'변경 반영':'기존 전략 유지',done:s.round===1?ready:changed,optional:s.round!==1},
    {label:s.round===1?'첫 정상 차량 출하':'주문 절반 출하',detail:s.round===1?'완성차가 출하 지점에 도착하면 달성됩니다.':'이월 재고 출하도 포함됩니다.',value:s.round===1?`${Math.min(shipped,1)} / 1대`:`${Math.min(shipped,Math.ceil(s.orders/2))} / ${Math.ceil(s.orders/2)}대`,done:shipped>=(s.round===1?1:Math.ceil(s.orders/2))},
    {label:'이번 주문 납품',detail:'목표 달성 뒤에도 마감까지 생산이 계속됩니다.',value:`${shipped} / ${s.orders}대`,done:shipped>=s.orders},
  ];
  let next,action;
  if(finished){next=s.phase==='final'?'세 번의 운영 기록을 확인하세요.':'결과를 확인하고 다음 공장을 설계하세요.';action='report';}
  else if(!ready){next=`미배치 ${s.hired-assigned}명 · 작업자를 배치하세요.`;action='facility';}
  else if(s.phase==='design'){next=s.round===1?'준비 완료 · 첫 생산을 시작하세요.':`주문 ${s.orders}대 · 공장을 점검하고 가동하세요.`;action='start';}
  else {const target=s.round===1&&shipped===0?1:shipped<Math.ceil(s.orders/2)?Math.ceil(s.orders/2):s.orders;next=shipped>=s.orders?'주문 달성 · 남는 재고와 비용을 관찰하세요.':`다음 출하 목표 ${shipped} / ${target}대`;action='observe';}
  let outcome=prior?`직전 교대: 출하 ${prior.shipped}/${prior.orders}대 · 손익 ${Math.round(prior.profit).toLocaleString('ko-KR')}만 원. 이번 주문은 ${s.orders}대입니다.`:'첫 운영은 다음 판단의 기준이 됩니다. 설비 구매 없이도 시작할 수 있습니다.';
  if(finished){const latest=s.results.at(-1);outcome=`${s.round}장 마감 · 출하 ${latest.shipped}/${latest.orders}대 · 손익 ${Math.round(latest.profit).toLocaleString('ko-KR')}만 원 · 정상 재고 ${latest.stock}대.`;}
  return {...chapter,number:s.round,goals,next,action,finished,outcome,progress:Math.min(1,shipped/s.orders),shipped,orders:s.orders};
}
