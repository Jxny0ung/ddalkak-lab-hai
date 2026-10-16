/** Deterministic, DOM-free factory simulation. Money is in 만 원; time is in seconds. */
export const VERSION = 1;
export const STAGES = [
  { name: '절단', base: 12, price: 700, multiplier: .75, upgrade: '정밀 절단기', color: '#64a6ec', product: '강판 → 차체 부품' },
  { name: '용접', base: 20, price: 1200, multiplier: .60, upgrade: '용접 로봇', color: '#efb65e', product: '부품 → 차체 골격' },
  { name: '도장', base: 18, price: 1000, multiplier: .70, upgrade: '자동 도장기', color: '#ad93de', product: '골격 → 도색 차체' },
  { name: '조립', base: 16, price: 800, multiplier: .75, upgrade: '조립 도구', color: '#74c5a8', product: '차체 → 완성차' },
];
export const RULES = Object.freeze({ duration: 300, sale: 300, material: 120, wage: 25, hire: 300, storage: 20, inputInterval: 3, wipLimit: 10, travel: 2 });
const STAFF = [0, 1, .70, .55, .48];
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const copy = value => JSON.parse(JSON.stringify(value));
export function createState() {
  return { version: VERSION, phase: 'design', round: 1, time: 0, cash: 3000, storageDue: 0, hired: 8,
    workers: [2,2,2,2], positions: [4,5,6,11], upgrades: [false,false,false,false], inventory: 0,
    totalCompleted: 0, nextId: 1, eventId: 0, pendingCapital: 0, pendingHire: 0, orders: 20,
    jobs: [], events: [], queues: [[],[],[],[]], processing: [null,null,null,null], busy: [0,0,0,0],
    results: [], data: null, logs: [], ledger: { sales: 0, raw: 0, capital: 0, hire: 0, wages: 0, storage: 0 } };
}
export class FactoryEngine {
  constructor(snapshot) { this.s = snapshot ? validateSnapshot(snapshot) : createState(); }
  snapshot() { return copy(this.s); }
  get editable() { return this.s.phase === 'design'; }
  get wageReserve() { return this.s.hired * RULES.wage; }
  get available() { return Math.max(0, this.s.cash - this.wageReserve - this.s.storageDue); }
  get investable() { return Math.max(0, this.available - RULES.material * 5); }
  get freeWorkers() { return this.s.hired - this.s.workers.reduce((a,b) => a+b,0); }
  get canStart() { return this.editable && this.freeWorkers===0 && this.s.cash+Math.min(this.s.inventory,this.s.orders)*RULES.sale-this.s.storageDue>=this.wageReserve; }
  cycle(i) { return Math.round(STAGES[i].base * STAFF[this.s.workers[i]] * (this.s.upgrades[i] ? STAGES[i].multiplier : 1) * 10000) / 10000; }
  get slowest() { return [0,1,2,3].reduce((a,b) => this.cycle(a) >= this.cycle(b) ? a : b); }
  log(text) { this.s.logs.unshift({ time: this.s.time, round: this.s.round, text }); this.s.logs.length = Math.min(40, this.s.logs.length); }
  point(stage) { if (stage === -1) return {x:-1, z:0}; if (stage === 4) return {x:4,z:3}; const p=this.s.positions[stage]; return {x:p%4,z:Math.floor(p/4)}; }
  route(from,to) { const a=this.point(from), b=this.point(to); return [a,{x:b.x,z:a.z},b]; }
  travel(from,to) { const a=this.point(from),b=this.point(to); return (Math.abs(a.x-b.x)+Math.abs(a.z-b.z))*RULES.travel; }
  get totalTravel() { return [0,1,2,3,4].reduce((a,i)=>a+this.travel(i-1,i),0); }
  move(i,cell) {
    if (!this.editable || !Number.isInteger(i) || i<0 || i>3 || !Number.isInteger(cell) || cell<0 || cell>15 || this.s.positions.includes(cell)) return false;
    this.s.positions[i]=cell; this.log(`${STAGES[i].name} 위치 변경 · 전체 운반 ${this.totalTravel}초/대`); return true;
  }
  assign(i,delta) {
    if (!this.editable || !STAGES[i] || ![-1,1].includes(delta)) return false;
    const n=this.s.workers[i]+delta;
    if (n<1 || n>4 || (delta>0 && this.freeWorkers===0)) return false;
    this.s.workers[i]=n; return true;
  }
  buy(i) {
    if (!this.editable || !STAGES[i] || this.s.upgrades[i] || this.investable<STAGES[i].price) return false;
    const cost=STAGES[i].price; this.s.cash-=cost; this.s.pendingCapital+=cost; this.s.ledger.capital+=cost; this.s.upgrades[i]=true;
    this.log(`${STAGES[i].upgrade} 투자 · ${cost}만 원`); return true;
  }
  hire() {
    if (!this.editable || this.s.hired>=16 || this.s.cash-RULES.hire<(this.s.hired+1)*RULES.wage+600+this.s.storageDue) return false;
    this.s.hired++; this.s.cash-=RULES.hire; this.s.pendingHire+=RULES.hire; this.s.ledger.hire+=RULES.hire; this.log('작업자 1명 고용 · 공정에 배치해 주세요.'); return true;
  }
  schedule(time,type,jobId=null,stage=null) { this.s.events.push({time,type,jobId,stage,order:this.s.eventId++}); }
  collect(amount) {
    this.s.cash+=amount; const pay=Math.min(this.s.cash,this.s.storageDue); this.s.cash-=pay; this.s.storageDue-=pay;
  }
  start() {
    if (!this.canStart) return false;
    const s=this.s; s.phase='running'; s.time=0; s.jobs=[]; s.events=[]; s.queues=[[],[],[],[]]; s.processing=[null,null,null,null]; s.busy=[0,0,0,0];
    s.data={ round:s.round, orders:s.orders, started:0, completed:0, good:0, bad:0, shipped:0, revenue:0, raw:0, capital:s.pendingCapital, hire:s.pendingHire, wages:0, storage:0, unfinished:0, carriedSales:0, inventoryStart:s.inventory, stock:0, profit:0, score:0, samples:[], config:{workers:[...s.workers],upgrades:[...s.upgrades],positions:[...s.positions],travel:this.totalTravel,cycles:STAGES.map((_,i)=>this.cycle(i))}, stageCompleted:[0,0,0,0], maxQueues:[0,0,0,0] };
    const sell=Math.min(s.inventory,s.orders); s.inventory-=sell; s.data.carriedSales=sell; s.data.shipped=sell; s.data.revenue=sell*RULES.sale; s.ledger.sales+=sell*RULES.sale; this.collect(sell*RULES.sale);
    this.log(`${s.round}라운드 시작${sell ? ` · 이월 재고 ${sell}대 우선 출하` : ''}`); this.schedule(0,'launch'); return true;
  }
  next() {
    if(this.s.phase!=='review' || this.s.round>=3) return false;
    const score=this.s.results.at(-1).score, bonus=score>=90?.3:score>=80?.2:score>=60?.1:0;
    this.s.round++; const base=[20,25,30][this.s.round-1]; this.s.orders=base+Math.round(base*bonus);
    this.s.phase='design'; this.s.data=null; this.s.time=0; this.log(`${this.s.round}라운드 준비 · 주문 ${this.s.orders}대 (학습 지수 보너스 적용)`); return true;
  }
  launch(t) {
    const s=this.s; if(t>=RULES.duration) return;
    const wip=s.jobs.filter(j=>j.status!=='done').length;
    if(wip<RULES.wipLimit && this.available>=RULES.material) {
      const j={id:s.nextId++,stage:0,status:'moving',from:-1,to:0,start:t,end:t+this.travel(-1,0),quality:0,paint:(s.nextId%4)};
      s.jobs.push(j); s.cash-=RULES.material; s.data.raw+=RULES.material; s.ledger.raw+=RULES.material; s.data.started++; this.schedule(j.end,'arrive',j.id);
    }
    this.schedule(t+RULES.inputInterval,'launch');
  }
  process(i,t) {
    const s=this.s; if(s.processing[i]!==null || !s.queues[i].length) return;
    const id=s.queues[i].shift(),j=s.jobs.find(x=>x.id===id); s.processing[i]=id;
    j.status='processing'; j.start=t; j.end=t+this.cycle(i); this.schedule(j.end,'finish',id,i);
  }
  arrive(j,t) {
    if(!j || j.status!=='moving') return; const s=this.s;
    if(j.stage===4) {
      j.status='done'; if(j.quality===1) {
        if(s.data.shipped<s.orders) {s.data.shipped++;s.data.revenue+=RULES.sale;s.ledger.sales+=RULES.sale;this.collect(RULES.sale);}
        else s.inventory++;
      } return;
    }
    j.status='queued'; s.queues[j.stage].push(j.id); s.data.maxQueues[j.stage]=Math.max(s.data.maxQueues[j.stage],s.queues[j.stage].length); this.process(j.stage,t);
  }
  finish(j,i,t) {
    const s=this.s; if(!j || j.status!=='processing' || s.processing[i]!==j.id) return;
    s.busy[i]+=j.end-j.start; s.data.stageCompleted[i]++; s.processing[i]=null; this.process(i,t);
    if(i===3) { s.totalCompleted++;s.data.completed++;j.quality=s.totalCompleted%20===0?-1:1;
      if(j.quality===-1) {s.data.bad++;this.log(`${s.totalCompleted}번째 완성차 불량 · 공통 불량 순서 적용`);} else s.data.good++;
    }
    j.from=i;j.to=i+1;j.stage=i+1;j.status='moving';j.start=t;j.end=t+this.travel(i,i+1);this.schedule(j.end,'arrive',j.id);
  }
  utilization(i) {
    const s=this.s,job=s.jobs.find(j=>j.id===s.processing[i]);
    return clamp((s.busy[i]+(job ? Math.max(0,s.time-job.start):0))/Math.max(1,s.time),0,1);
  }
  advance(seconds) {
    if(this.s.phase!=='running' || !Number.isFinite(seconds) || seconds<0) return;
    const s=this.s,target=Math.min(RULES.duration,s.time+seconds);
    while(s.events.length) {
      s.events.sort((a,b)=>a.time-b.time || a.order-b.order); const e=s.events[0]; if(e.time>target)break;
      s.events.shift();s.time=e.time; const j=s.jobs.find(x=>x.id===e.jobId);
      if(e.type==='launch')this.launch(e.time);else if(e.type==='arrive')this.arrive(j,e.time);else if(e.type==='finish')this.finish(j,e.stage,e.time);
    }
    s.time=target;
    if(s.data.samples.length===0 || target-s.data.samples.at(-1).time>=10) s.data.samples.push({time:target,shipped:s.data.shipped,wip:s.jobs.filter(j=>j.status!=='done').length});
    if(target>=RULES.duration)this.settle();
  }
  settle() {
    const s=this.s;if(s.phase!=='running')return false;const d=s.data;
    // Assembly-complete cars in transit are stock, never unfinished scrap.
    for(const j of s.jobs) if(j.status!=='done' && j.stage===4 && j.quality===1)s.inventory++;
    d.unfinished=s.jobs.filter(j=>j.status!=='done' && j.stage<4).length;
    d.wages=this.wageReserve;s.cash-=d.wages;s.ledger.wages+=d.wages;d.storage=s.inventory*RULES.storage;
    s.ledger.storage+=d.storage;const paid=Math.min(s.cash,d.storage);s.cash-=paid;s.storageDue+=d.storage-paid;
    d.stock=s.inventory;d.profit=d.revenue-d.raw-d.capital-d.hire-d.wages-d.storage;
    d.utilization=STAGES.map((_,i)=>this.utilization(i));d.slowest=this.slowest;
    d.breakdown=[30*clamp(d.completed/Math.max(1,d.orders),0,1),25*clamp((d.profit+650)/3000,0,1),15*(d.completed?d.good/d.completed:0),15*clamp(d.shipped/Math.max(1,d.orders),0,1),15*(1-clamp(d.stock/Math.max(5,d.orders*.4),0,1))];
    d.score=Math.round(d.breakdown.reduce((a,b)=>a+b,0)*100)/100;d.cashEnd=s.cash;d.storageDue=s.storageDue;
    s.results.push(copy(d));s.pendingCapital=0;s.pendingHire=0;s.jobs=[];s.events=[];s.queues=[[],[],[],[]];s.processing=[null,null,null,null];s.phase=s.round===3?'final':'review';this.log(`${s.round}라운드 마감 · 출하 ${d.shipped}/${d.orders}대 · 손익 ${d.profit}만 원`);return true;
  }
  get liveProfit() { const d=this.s.data; if(!d)return -this.s.pendingCapital-this.s.pendingHire;return this.s.phase==='running'?d.revenue-d.raw-d.capital-d.hire-this.wageReserve-this.s.inventory*RULES.storage:d.profit; }
  get netProfit() { const l=this.s.ledger;return l.sales-l.raw-l.capital-l.hire-l.wages-l.storage; }
  position(job) {
    if(job.status!=='moving') {const p=this.point(job.stage);if(job.status==='queued'){const n=this.s.queues[job.stage].indexOf(job.id);return {x:p.x-.32+(n%3)*.25,z:p.z+.42+Math.floor(n/3)*.24};}return p;}
    const points=this.route(job.from,job.to),a=points[0],m=points[1],b=points[2],dx=Math.abs(a.x-m.x),dz=Math.abs(m.z-b.z),r=clamp((this.s.time-job.start)/Math.max(.001,job.end-job.start),0,1)*(dx+dz);
    if(r<=dx && dx)return {x:a.x+(m.x-a.x)*r/dx,z:a.z};return {x:m.x,z:m.z+(b.z-m.z)*clamp((r-dx)/Math.max(.001,dz),0,1)};
  }
}

export function validateSnapshot(value) {
  const s=copy(value),finite=(x,min=0,max=1e9)=>typeof x==='number'&&Number.isFinite(x)&&x>=min&&x<=max;
  if(!s || s.version!==VERSION || !['design','running','review','final'].includes(s.phase))throw Error('지원하지 않는 저장 형식입니다.');
  for(const k of ['cash','storageDue','time','totalCompleted','nextId','eventId','pendingCapital','pendingHire','orders','inventory'])if(!finite(s[k]))throw Error('저장 값이 손상되었습니다.');
  if(!Number.isInteger(s.round)||s.round<1||s.round>3||!Number.isInteger(s.hired)||s.hired<8||s.hired>16||s.time>300)throw Error('라운드 정보가 손상되었습니다.');
  if(!Array.isArray(s.positions)||s.positions.length!==4||new Set(s.positions).size!==4||s.positions.some(x=>!Number.isInteger(x)||x<0||x>15))throw Error('공장 배치가 손상되었습니다.');
  if(!Array.isArray(s.workers)||s.workers.length!==4||s.workers.some(x=>!Number.isInteger(x)||x<1||x>4)||s.workers.reduce((a,b)=>a+b,0)>s.hired)throw Error('인력 배치가 손상되었습니다.');
  if(!Array.isArray(s.upgrades)||s.upgrades.length!==4||s.upgrades.some(x=>typeof x!=='boolean'))throw Error('설비 정보가 손상되었습니다.');
  for(const k of ['jobs','events','results','logs','queues','processing','busy'])if(!Array.isArray(s[k]))throw Error('저장 구조가 손상되었습니다.');
  if(s.jobs.length>500||s.events.length>1000||s.results.length>3||s.logs.length>40||s.queues.length!==4||s.processing.length!==4||s.busy.length!==4)throw Error('저장 크기가 올바르지 않습니다.');
  const ids=new Set(); for(const j of s.jobs){if(!Number.isInteger(j.id)||j.id<1||j.id>=s.nextId||ids.has(j.id)||!['moving','queued','processing','done'].includes(j.status)||!Number.isInteger(j.stage)||j.stage<0||j.stage>4||!finite(j.start)||!finite(j.end)||j.end<j.start||![-1,0,1].includes(j.quality)||!Number.isInteger(j.from)||j.from!==j.stage-1||j.to!==j.stage||!Number.isInteger(j.paint)||j.paint<0||j.paint>3||j.stage===4&&j.quality===0||j.stage<4&&j.quality!==0)throw Error('차량 정보가 손상되었습니다.');ids.add(j.id);}
  if(s.queues.some(q=>!Array.isArray(q)||q.some(id=>!ids.has(id)))||s.processing.some(id=>id!==null&&!ids.has(id))||s.busy.some(x=>!finite(x,0,300)))throw Error('공정 정보가 손상되었습니다.');
  for(const e of s.events)if(!finite(e.time,s.time)||!['launch','arrive','finish'].includes(e.type)||!finite(e.order)||e.type!=='launch'&&!ids.has(e.jobId)||e.type==='finish'&&(!Number.isInteger(e.stage)||e.stage<0||e.stage>3))throw Error('생산 일정이 손상되었습니다.');
  const queued=s.queues.flat(),processing=s.processing.filter(id=>id!==null);
  if(new Set(queued).size!==queued.length||new Set(processing).size!==processing.length)throw Error('공정에서 차량이 중복되었습니다.');
  for(const j of s.jobs){
    const q=s.queues[j.stage]??[],events=s.events.filter(e=>e.jobId===j.id);
    if(j.status==='queued'&&(!q.includes(j.id)||events.length)||j.status!=='queued'&&queued.includes(j.id)||j.status==='processing'&&(s.processing[j.stage]!==j.id||events.length!==1||events[0].type!=='finish'||events[0].stage!==j.stage||events[0].time!==j.end)||j.status!=='processing'&&processing.includes(j.id)||j.status==='moving'&&(events.length!==1||events[0].type!=='arrive'||events[0].time!==j.end)||j.status==='done'&&events.length)throw Error('생산 일정과 차량 상태가 일치하지 않습니다.');
  }
  if(s.phase==='running'&&(!s.data||s.workers.reduce((a,b)=>a+b,0)!==s.hired||s.events.filter(e=>e.type==='launch').length!==1))throw Error('진행 상태가 손상되었습니다.');
  if(s.phase!=='running'&&(s.jobs.length||s.events.length||queued.length||processing.length)||s.phase==='design'&&s.data!==null)throw Error('정지 상태가 손상되었습니다.');
  const metrics=['orders','started','completed','good','bad','shipped','revenue','raw','capital','hire','wages','storage','unfinished','carriedSales','stock','profit','score'];
  const numbers=(a,length,min=0,max=1e9)=>Array.isArray(a)&&a.length===length&&a.every(x=>finite(x,min,max));
  for(const d of [...s.results,...(s.data?[s.data]:[])]){
    if(metrics.some(k=>!finite(d[k],k==='profit'?-1e9:0))||!Number.isInteger(d.round)||d.round<1||d.round>3||!finite(d.inventoryStart)||!Array.isArray(d.samples)||d.samples.length>1000||d.samples.some(x=>!finite(x.time,0,300)||!finite(x.shipped)||!finite(x.wip))||!numbers(d.stageCompleted,4)||!numbers(d.maxQueues,4)||!d.config||!numbers(d.config.workers,4,1,4)||!numbers(d.config.cycles,4,.01,100)||!numbers(d.config.positions,4,0,15)||d.config.positions.some(x=>!Number.isInteger(x))||new Set(d.config.positions).size!==4||!finite(d.config.travel,0,100)||!Array.isArray(d.config.upgrades)||d.config.upgrades.length!==4||d.config.upgrades.some(x=>typeof x!=='boolean'))throw Error('성과 정보가 손상되었습니다.');
  }
  for(const d of [...s.results,...(['review','final'].includes(s.phase)&&s.data?[s.data]:[])])if(!numbers(d.breakdown,5,0,30)||!numbers(d.utilization,4,0,1)||!Number.isInteger(d.slowest)||d.slowest<0||d.slowest>3||!finite(d.cashEnd)||!finite(d.storageDue))throw Error('리포트 정보가 손상되었습니다.');
  if(s.results.some((d,i)=>d.round!==i+1)||(s.data&&s.data.round!==s.round))throw Error('성과 라운드가 올바르지 않습니다.');
  for(const k of ['sales','raw','capital','hire','wages','storage'])if(!finite(s.ledger?.[k]))throw Error('회계 정보가 손상되었습니다.');
  if(s.logs.some(l=>typeof l.text!=='string'||l.text.length>1000||!finite(l.time)))throw Error('기록이 손상되었습니다.');
  if(s.results.length!==(s.phase==='design'||s.phase==='running'?s.round-1:s.round)||s.phase==='review'&&s.round===3||s.phase==='final'&&s.round!==3)throw Error('라운드 순서가 손상되었습니다.');
  return s;
}
