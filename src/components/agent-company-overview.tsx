import Link from "next/link";

const roleModules = [
  { code: "01", name: "Research", korean: "질문과 가설", description: "질문을 구조화하고 조사 범위를 정의하는 설계 역할" },
  { code: "02", name: "Archive", korean: "자료와 기록", description: "출처, 문헌, 변경 이력의 관리 구조" },
  { code: "03", name: "Synthesis", korean: "비교와 종합", description: "여러 입력의 차이와 불확실성을 비교하는 분석 역할" },
  { code: "04", name: "Monitoring", korean: "진행과 점검", description: "진행 상태, 데이터 편향과 변화 가능성을 점검하는 역할" },
  { code: "05", name: "Design", korean: "시각화와 전달", description: "검증된 내용을 인터페이스와 시각 자료로 정리하는 역할" },
] as const;

export function AgentCompanyOverview() {
  return (
    <section className="sl-agent-section" id="agent-company" aria-labelledby="sl-agent-title">
      <div className="sl-container">
        <div className="sl-agent-section__head">
          <div>
            <span className="sl-kicker">AGENT COMPANY / FUTURE ARCHITECTURE</span>
            <h2 id="sl-agent-title">하나의 AI가 아니라,<br />역할을 나누고 검증하는 구조.</h2>
          </div>
          <div className="sl-agent-section__intro">
            <p>리서치부터 기록·분석·모니터링·디자인까지. 여러 역할의 에이전트가 협력하는 미래 워크플로를 모듈 형태로 설계합니다.</p>
            <span className="sl-agent-section__disclaimer">설계 시각화 · 현재 자동 실행되는 AI 회사가 아닙니다</span>
          </div>
        </div>
        <div className="sl-agent-section__board">
          <div className="sl-agent-section__hub" aria-label="향후 도구 연계 구조">
            <span>HUMAN DIRECTION</span>
            <strong>DDALKAK<br />CORE</strong>
            <small>승인 · 권한 · 검증</small>
            <span className="sl-agent-section__hub-line" aria-hidden="true" />
          </div>
          <div className="sl-agent-section__modules">
            {roleModules.map((role) => (
              <article className="sl-agent-module" key={role.code}>
                <div className="sl-agent-module__meta">
                  <span>{role.code}</span>
                  <small>PROPOSED MODULE</small>
                </div>
                <h3>{role.name}</h3>
                <strong>{role.korean}</strong>
                <p>{role.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="sl-agent-section__foot">
          <p>실행을 연결하려면 사용자 승인, 도구별 권한, 출력 검증, 감사 기록을 먼저 설계해야 합니다.</p>
          <div>
            <Link className="sl-text-link" href="/lab#ai-company">HAI Lab의 AI Company 살펴보기 ↗</Link>
            <Link className="sl-text-link" href="/methods">연구 방법론 확인 ↗</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
