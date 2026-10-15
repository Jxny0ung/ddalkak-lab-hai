import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "AI Games | 직접 플레이하는 실험",
  description: "학부 연구생이 AI와 협업해 만든 TOYOTA: PRIORITY Factory Command v0.6 웹 게임을 플레이하세요.",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  return (
    <>
      <SiteHeader />
      <main className="sl-main sl-interior" id="main-content">
        <section className="sl-page-top pg-heading pg-heading--compact">
          <div className="sl-container">
            <span className="sl-kicker">03 / BUILD / PLAY / IMPROVE</span>
            <h1>AI와 함께 만들고,<br />브라우저에서 직접 플레이합니다.</h1>
            <p>아이디어를 게임의 규칙과 화면으로 구현하고 실제로 동작하는지 확인합니다. 공개 게임은 누구나 실행해볼 수 있도록 별도 브라우저 화면으로 제공합니다.</p>
          </div>
        </section>
        <section className="sl-section">
          <div className="sl-container pg-game-layout">
            <div className="pg-game-poster" aria-label="TOYOTA PRIORITY 공장 운영 시뮬레이션 미리보기 그래픽">
              <span className="pg-game-poster__code">INTERACTIVE / FACTORY COMMAND</span>
              <div className="pg-game-poster__visual" aria-hidden="true">
                <span>01 · 자원 배치</span><span>02 · 공정 관리</span><span>03 · 성과 점검</span>
              </div>
              <strong>TOYOTA:<br /><em>PRIORITY</em></strong>
              <small>FACTORY COMMAND · v0.6 · BROWSER GAME</small>
            </div>
            <div className="pg-game-info">
              <div className="pg-game-info__status"><span className="pg-pill pg-pill--active">실행 가능한 브라우저 게임</span><span>v0.6</span></div>
              <h2>TOYOTA: PRIORITY</h2>
              <p className="pg-game-info__subtitle">한정된 작업자와 설비, 투자 선택이 공장 생산 흐름에 어떤 영향을 주는지 게임으로 실험하는 시뮬레이션입니다.</p>
              <div className="pg-game-spec"><div><span>형태</span><strong>2.5D 브라우저 전략 시뮬레이션</strong></div><div><span>핵심 요소</span><strong>공정 · 작업자 · 설비 · 투자</strong></div><div><span>제공 버전</span><strong>Factory Command v0.6</strong></div></div>
              <p>확대·이동, 진행 속도 조절, 일시정지와 라운드별 의사결정 기능을 제공합니다. 완전한 자유 회전 3D 게임은 아닙니다.</p>
              <a className="sl-btn sl-btn-dark pg-play-link" href="/games/toyota-priority-v06.html" target="_blank" rel="noopener noreferrer">게임 새 창에서 플레이하기 <span aria-hidden="true">↗</span></a>
              <p className="pg-game-info__disclaimer">비공식 교육·연구용 창작 게임입니다. Toyota 자동차 기업과 제휴하거나 공식 승인을 받은 게임이 아닙니다. 게임 지표와 결과는 현실 생산성과 무관합니다.</p>
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft">
          <div className="sl-container pg-next">
            <div><span className="sl-kicker">BEHIND THE GAME</span><h2>플레이 이후엔 제작 과정을 검토합니다.</h2><p>게임에 사용한 프롬프트와 반복 수정 과정은 정리하되 현재 원문은 공개하지 않습니다. 인터랙션과 의사결정 과정을 연구 문제로 연결하는 것이 다음 단계입니다.</p></div>
            <div className="sl-actions"><Link className="sl-btn sl-btn-outline" href="/prompts">프롬프트 아카이브 준비 상태 ↗</Link><Link className="sl-btn sl-btn-outline" href="/work">다른 활동 둘러보기</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
