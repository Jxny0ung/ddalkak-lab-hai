import { validateSnapshot } from './engine.mjs';

export const SAVE_KEY = 'ddalkak-factory-3d-v1';
export const HISTORY_KEY = 'ddalkak-factory-records-v1';
const clone = value => JSON.parse(JSON.stringify(value));
const date = value => typeof value === 'string' && Number.isFinite(Date.parse(value));

export function profile(value) {
  if (!value || typeof value !== 'object') throw Error('이름과 학과를 입력해 주세요.');
  const out = {};
  for (const [key, limit, label] of [['name', 40, '이름'], ['department', 80, '학과']]) {
    if (typeof value[key] !== 'string') throw Error(`${label}을 입력해 주세요.`);
    const text = value[key].normalize('NFC').trim().replace(/\s+/g, ' ');
    if (!text || [...text].length > limit || /[\p{Cc}\p{Cf}]/u.test(text)) throw Error(`${label}은 1–${limit}자의 일반 문자로 입력해 주세요.`);
    out[key] = text;
  }
  return out;
}

export function session(value) {
  if (!value || !/^[a-zA-Z0-9-]{8,80}$/.test(value.id) || !date(value.createdAt)) throw Error('참가자 회차 정보가 올바르지 않습니다.');
  return { id: value.id, createdAt: value.createdAt, profile: profile(value.profile) };
}

export function newSession(participant) {
  return session({ id: `run-${globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}`, createdAt: new Date().toISOString(), profile: profile(participant) });
}

export function validatePayload(value) {
  if (!value || typeof value !== 'object') throw Error('진행 파일 형식이 올바르지 않습니다.');
  const state = validateSnapshot(value.engine);
  return { format: 'ddalkak-factory-3d', version: 2, engine: state, session: value.session ? session(value.session) : null,
    selected: Number.isInteger(value.selected) && value.selected >= 0 && value.selected < 4 ? value.selected : 0,
    speed: [1,5,20].includes(value.speed) ? value.speed : 1,
    revision: Number.isSafeInteger(value.revision) && value.revision >= 0 ? value.revision : 0,
    savedAt: date(value.savedAt) ? value.savedAt : new Date().toISOString() };
}

function parseHistory(raw) {
  const root = JSON.parse(raw);
  if (root.version !== 1 || !Array.isArray(root.records) || root.records.length > 500) throw Error('기록 형식 오류');
  const ids = new Set();
  return root.records.map(record => {
    const payload = validatePayload(record.payload);
    if (!payload.session || ids.has(payload.session.id) || !date(record.updatedAt)) throw Error('회차 기록 오류');
    ids.add(payload.session.id);
    return { payload, updatedAt: record.updatedAt, archived: !!record.archived };
  });
}

/** Read/write failures never delete the original. Backups and recovery copies are local only. */
export class RecordStore {
  constructor(storage) { this.storage = storage; this.records = []; this.warning = ''; this.blocked = new Set(); this.activeRaw = undefined; this.load(); }
  read(key, parse) {
    let raw;
    try { raw = this.storage.getItem(key); } catch { this.warning = '브라우저 저장을 사용할 수 없습니다. 파일로 기록을 내려받으세요.'; return null; }
    if (!raw) return null;
    try { return parse(raw); } catch {
      try { this.storage.setItem(`${key}-recovery`, raw); } catch { this.blocked.add(key); }
      this.warning = '손상된 저장 원본을 보존했습니다. 정상 백업이 있으면 복원합니다.';
      try { const backup = this.storage.getItem(`${key}-backup`); return backup ? parse(backup) : null; } catch { return null; }
    }
  }
  load() { this.records = this.read(HISTORY_KEY, parseHistory) ?? []; }
  active() { const value = this.read(SAVE_KEY, raw => validatePayload(JSON.parse(raw))); try { this.activeRaw = this.storage.getItem(SAVE_KEY); } catch {} return value; }
  write(key, raw) {
    if (this.blocked.has(key)) throw Error('손상된 기록 원본을 보호하기 위해 저장을 멈췄습니다. 진행 파일을 내보내세요.');
    const before = this.storage.getItem(key);
    if (before) {
      try { if (key === SAVE_KEY) validatePayload(JSON.parse(before)); else parseHistory(before); this.storage.setItem(`${key}-backup`, before); } catch { /* The recovery copy is retained; do not replace a good backup with corrupt data. */ }
    }
    this.storage.setItem(key, raw);
  }
  assertWritable() { const raw = this.storage.getItem(SAVE_KEY); if (this.activeRaw !== undefined && raw !== this.activeRaw) throw Error('다른 탭에서 진행이 바뀌었습니다. 현재 진행을 파일로 내보내고 이 페이지를 새로고침하세요.'); }
  save(payload) { this.assertWritable(); const next = JSON.stringify(validatePayload(payload)); this.write(SAVE_KEY, next); this.activeRaw = next; }
  assertIdentity(payload) {
    if (!payload.session) return;
    const existing = this.records.find(r => r.payload.session.id === payload.session.id);
    if (existing && JSON.stringify(existing.payload.session.profile) !== JSON.stringify(payload.session.profile)) throw Error('같은 회차의 참가자 정보가 기존 기록과 다릅니다.');
    if (existing && (existing.payload.revision > payload.revision || (existing.payload.revision === payload.revision && JSON.stringify(existing.payload.engine) !== JSON.stringify(payload.engine)))) throw Error('이 회차의 더 최신 기록 또는 다른 변경이 있습니다. 이전 파일로 덮어쓸 수 없습니다.');
    if (existing && (existing.payload.engine.round > payload.engine.round || existing.payload.engine.results.length > payload.engine.results.length || (existing.payload.engine.round === payload.engine.round && existing.payload.engine.time > payload.engine.time))) throw Error('이 회차의 더 최신 기록이 있습니다. 이전 파일로 덮어쓸 수 없습니다.');
  }
  refresh() {
    const latest = this.read(HISTORY_KEY, parseHistory) ?? [];
    const merged = new Map(latest.map(r => [r.payload.session.id, r]));
    for (const r of this.records) { const prior = merged.get(r.payload.session.id); if (!prior || r.payload.revision > prior.payload.revision) merged.set(r.payload.session.id, r); }
    this.records = [...merged.values()];
  }
  upsert(value, archived = false) {
    this.assertWritable();
    this.refresh();
    const payload = validatePayload(value);
    if (!payload.session) return;
    this.assertIdentity(payload);
    const index = this.records.findIndex(r => r.payload.session.id === payload.session.id);
    if (index < 0 && this.records.length >= 500) throw Error('기록 500개가 보관되어 있습니다. 내보낸 뒤 불필요한 기록을 삭제해 주세요.');
    const updated = { payload: clone(payload), updatedAt: new Date().toISOString(), archived };
    const next = [...this.records];
    if (index < 0) next.unshift(updated); else next[index] = updated;
    // Keep the result in memory even if storage is full, so export still works.
    this.records = next;
    this.write(HISTORY_KEY, JSON.stringify({ version: 1, records: next }));
  }
  remove(id) {
    this.assertWritable();
    this.refresh();
    const next = this.records.filter(r => r.payload.session.id !== id);
    // Explicit deletion also removes recovery copies that could retain this identity.
    this.storage.removeItem(`${HISTORY_KEY}-backup`);
    this.storage.removeItem(`${HISTORY_KEY}-recovery`);
    this.storage.setItem(HISTORY_KEY, JSON.stringify({ version: 1, records: next }));
    for (const key of [SAVE_KEY, `${SAVE_KEY}-backup`, `${SAVE_KEY}-recovery`]) {
      const raw = this.storage.getItem(key);
      if (raw) { try { if (JSON.parse(raw).session?.id === id) this.storage.removeItem(key); } catch { this.storage.removeItem(key); } }
    }
    this.records = next;
  }
}

export function csvCell(value) {
  const text = String(value ?? '');
  const safe = /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function recordsCsv(records) {
  const rows = [['회차ID','시작일시','학과','이름','진행상태','라운드','주문','투입','완성','출하','이월출하','불량','미완성정리','정상재고','매출_만원','재료비_만원','설비비_만원','고용비_만원','인건비_만원','보관비_만원','운영손익_만원','학습지수']];
  for (const record of records) {
    const { session: run, engine } = record.payload;
    if (!run) continue;
    const status = engine.phase === 'final' ? '완료' : record.archived ? '중단' : '진행';
    const prefix = [run.id, run.createdAt, run.profile.department, run.profile.name, status];
    if (!engine.results.length) rows.push([...prefix, '아직 완료된 라운드 없음']);
    for (const r of engine.results) rows.push([...prefix,r.round,r.orders,r.started,r.completed,r.shipped,r.carriedSales,r.bad,r.unfinished,r.stock,r.revenue,r.raw,r.capital,r.hire,r.wages,r.storage,r.profit,r.score]);
  }
  return '\ufeff' + rows.map(row => row.map(csvCell).join(',')).join('\r\n');
}
