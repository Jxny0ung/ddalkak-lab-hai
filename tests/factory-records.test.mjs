import test from 'node:test';
import assert from 'node:assert/strict';
import {FactoryEngine} from '../public/games/factory/engine.mjs';
import {RecordStore,newSession,profile,validatePayload,recordsCsv,SAVE_KEY,HISTORY_KEY} from '../public/games/factory/records.mjs';
const memory=()=>{const map=new Map();return {map,getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)};};
const payload=(name='참가자')=>({engine:new FactoryEngine().snapshot(),session:newSession({name,department:'경영학과'}),revision:1});
test('registration validates and normalizes both identity fields',()=>{
 assert.deepEqual(profile({name:'  홍 길동  ',department:'  컴퓨터  공학과 '}),{name:'홍 길동',department:'컴퓨터 공학과'});
 for(const value of [{name:'',department:'공학'},{name:'홍길동',department:' '},{name:'a'.repeat(41),department:'공학'},{name:'홍\u200b길동',department:'공학'}]) assert.throws(()=>profile(value));
});
test('progress and participant survive restoration; a legacy engine remains supported',()=>{
 const storage=memory(),a=new RecordStore(storage),p=payload();a.active();a.save(p);a.upsert(p);const b=new RecordStore(storage);assert.deepEqual(b.active().session,p.session);assert.equal(b.records.length,1);assert.equal(validatePayload({engine:p.engine}).session,null);
});
test('three completed rounds update one record without changing identity',()=>{
 const s=new RecordStore(memory()),p=payload(),e=new FactoryEngine();for(let i=0;i<3;i++){e.start();e.advance(300);p.engine=e.snapshot();p.revision++;s.upsert(p);if(i<2)e.next();}s.upsert(p);assert.equal(s.records.length,1);assert.equal(s.records[0].payload.engine.results.length,3);assert.equal(s.records[0].payload.engine.phase,'final');
});
test('identity changes and older design files cannot replace a current run',()=>{
 const s=new RecordStore(memory()),p=payload(),old=structuredClone(p);s.upsert(p);const e=new FactoryEngine(p.engine);e.buy(0);p.engine=e.snapshot();p.revision++;s.upsert(p);assert.throws(()=>s.upsert(old),/최신/);const altered=structuredClone(p);altered.session.profile.name='다른 사람';assert.throws(()=>s.upsert(altered),/참가자/);altered.session.profile.name=p.session.profile.name;altered.engine=old.engine;assert.throws(()=>s.upsert(altered),/다른 변경/);
});
test('independent record writers retain prior participants',()=>{
 const storage=memory(),a=new RecordStore(storage),b=new RecordStore(storage);a.upsert(payload('A'));b.upsert(payload('B'));assert.equal(new RecordStore(storage).records.length,2);
});
test('a stale active tab refuses to overwrite another tab',()=>{
 const storage=memory(),a=new RecordStore(storage),b=new RecordStore(storage);a.active();b.active();a.save(payload('A'));assert.throws(()=>b.save(payload('B')),/다른 탭/);assert.equal(new RecordStore(storage).active().session.profile.name,'A');
});
test('corrupt primary is retained while valid backup restores progress',()=>{
 const storage=memory(),p=payload();storage.setItem(SAVE_KEY,'broken raw');storage.setItem(SAVE_KEY+'-backup',JSON.stringify(p));const s=new RecordStore(storage);assert.equal(s.active().session.id,p.session.id);assert.equal(storage.getItem(SAVE_KEY+'-recovery'),'broken raw');s.save(p);assert.equal(storage.getItem(SAVE_KEY+'-recovery'),'broken raw');
});
test('quota failure leaves an exportable in-memory result and preserves corrupt raw',()=>{
 const storage=memory(),p=payload();storage.setItem(SAVE_KEY,'broken');storage.setItem=()=>{throw Error('quota');};const s=new RecordStore(storage);s.active();assert.throws(()=>s.save(p));assert.equal(storage.getItem(SAVE_KEY),'broken');assert.throws(()=>s.upsert(p));assert.equal(s.records[0].payload.session.id,p.session.id);assert.match(recordsCsv(s.records),/참가자/);
});
test('explicit deletion purges identity from primary, backups and recovery',()=>{
 const storage=memory(),s=new RecordStore(storage),p=payload('삭제 참가자'),other=payload('보관 참가자');s.active();s.save(p);s.upsert(p);s.upsert(other);storage.setItem(HISTORY_KEY+'-recovery','private');s.save(other);s.remove(p.session.id);assert.equal(s.records.length,1);for(const value of storage.map.values())assert.doesNotMatch(value,/삭제 참가자|private/);
});
test('CSV includes identity and round results with formula-safe escaping',()=>{
 const p=payload('=HYPERLINK("bad")'),e=new FactoryEngine();e.start();e.advance(300);p.engine=e.snapshot();const csv=recordsCsv([{payload:p,archived:false}]);assert.ok(csv.startsWith('\ufeff'));assert.match(csv,/學|학과/);assert.match(csv,/"'=HYPERLINK\(""bad""\)"/);assert.match(csv,/경영학과/);assert.match(csv,/학습지수/);
});
