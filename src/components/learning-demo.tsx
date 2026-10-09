"use client";

import { useState, type FormEvent } from "react";
import type { LearningProject } from "@/lib/student-content";

export function LearningDemo({ visual }: { visual: LearningProject["visual"] }) {
  const [idea, setIdea] = useState("대학생을 위한 AI 학습 서비스");
  const [mapped, setMapped] = useState<string | null>(null);
  const [goal, setGoal] = useState("대학생 대상 학습 서비스의 문제와 기회를 분석한다");
  const [role, setRole] = useState("경영학 관점의 시장 조사자");
  const [format, setFormat] = useState("표");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  if (visual === "map") {
    function submitMap(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const clean = idea.trim();
      if (clean) setMapped(clean);
    }
    const nodes = [
      ["누구에게 필요한가?", "사용자와 상황 정의"],
      ["어떤 문제를 해결하나?", "핵심 불편과 대안 비교"],
      ["어떻게 실험할까?", "최소 기능과 검증 설계"],
      ["무엇을 측정할까?", "성공 기준과 한계 기록"],
    ];
    return (
      <div className="sl-demo sl-demo-map">
        <div className="sl-demo-header"><strong>Idea Map · 브라우저 실습</strong><span>AI API 사용 안 함</span></div>
        <form onSubmit={submitMap} className="sl-demo-form">
          <label htmlFor="idea-input">떠오른 아이디어를 입력하세요</label>
          <div className="sl-demo-inline">
            <input id="idea-input" maxLength={100} value={idea} onChange={(e)=>setIdea(e.target.value)} placeholder="예: 캠퍼스 중고거래 서비스" required/>
            <button className="sl-btn sl-btn-dark" type="submit">맵 만들기</button>
          </div>
        </form>
        {mapped ? (
          <div className="sl-demo-output" aria-live="polite">
            <div className="sl-demo-core">{mapped}</div>
            <div className="sl-demo-node-grid">
              {nodes.map(([title,subtitle])=><div key={title}><strong>{title}</strong><span>{subtitle}</span></div>)}
            </div>
            <p>각 질문에 답을 적어 아이디어를 구체화해보세요. 노드는 규칙 기반 템플릿이며 AI가 생성한 답변이 아닙니다.</p>
          </div>
        ) : <p className="sl-demo-placeholder">위 입력창에서 ‘맵 만들기’를 눌러 브레인맵의 기본 틀을 만들어보세요.</p>}
      </div>
    );
  }

  if (visual === "prompt") {
    function build(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setCopied(false);
      setPrompt(`당신은 ${role.trim()}입니다.\n\n목표: ${goal.trim()}\n\n출력 형식: ${format}\n\n조건:\n1. 필요한 전제와 가정을 먼저 명시하세요.\n2. 주장과 확인 가능한 사실을 구분하세요.\n3. 근거가 부족하면 추측하지 말고 추가로 확인할 사항을 적으세요.\n4. 결과 마지막에 검증 및 개선 체크리스트를 포함하세요.`);
    }
    async function copy() {
      if (!prompt) return;
      try { await navigator.clipboard.writeText(prompt); setCopied(true); }
      catch { setCopied(false); }
    }
    return (
      <div className="sl-demo">
        <div className="sl-demo-header"><strong>Prompt Builder · 브라우저 실습</strong><span>저장 및 API 호출 없음</span></div>
        <form className="sl-demo-form sl-demo-stack" onSubmit={build}>
          <label htmlFor="prompt-goal">만들고 싶은 결과</label>
          <input id="prompt-goal" maxLength={250} required value={goal} onChange={(e)=>setGoal(e.target.value)}/>
          <label htmlFor="prompt-role">AI 역할</label>
          <input id="prompt-role" maxLength={120} required value={role} onChange={(e)=>setRole(e.target.value)}/>
          <label htmlFor="prompt-format">출력 형식</label>
          <select id="prompt-format" value={format} onChange={(e)=>setFormat(e.target.value)}>
            <option value="표">표</option><option value="단계별 안내">단계별 안내</option><option value="보고서">보고서</option><option value="체크리스트">체크리스트</option>
          </select>
          <button className="sl-btn sl-btn-dark" type="submit">프롬프트 구성하기 ↗</button>
        </form>
        {prompt && <div className="sl-demo-result"><div><strong>구성된 프롬프트</strong><button onClick={copy} type="button">{copied ? "✓ 복사됨" : "복사하기"}</button></div><pre>{prompt}</pre></div>}
      </div>
    );
  }

  if (visual === "dashboard") {
    return (
      <div className="sl-demo">
        <div className="sl-demo-header"><strong>Business Dashboard · 예시</strong><span>가상 데이터</span></div>
        <p className="sl-demo-placeholder">이 프로젝트는 현재 기획 예시입니다. 미리보기의 수치는 실제 데이터가 아니며, 백엔드나 외부 서비스에 연결되지 않습니다. 핵심 지표를 무엇으로 정의할지 먼저 설계해보세요.</p>
      </div>
    );
  }

  return (
    <div className="sl-demo">
      <div className="sl-demo-header"><strong>Clap HAI Interface</strong><span>동의 기반 실험</span></div>
      <p>박수 인식 프로토타입은 전용 HAI Lab에서 실행할 수 있습니다. 마이크 사용 동의가 필요하며 수집 정보는 브라우저 내부에서 처리하도록 설계됐습니다.</p>
      <a className="sl-btn sl-btn-dark" href="/lab">HAI Lab에서 실험하기 ↗</a>
    </div>
  );
}
