import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { agenda, researchAreas } from "@/lib/content";

const description =
  "DDALKAK LAB의 Human–AI Interaction, 미디어커뮤니케이션, 플랫폼·경영 연구 질문을 소개합니다.";

export const metadata: Metadata = {
  title: "Research",
  description,
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research | DDALKAK LAB",
    description,
    url: "/research",
  },
};

const framing = [
  {
    title: "Human",
    text: "AI 사용자의 판단, 신뢰, 선택, 학습과 창작을 결과변수로만 보지 않고 상호작용 과정 안에서 관찰합니다.",
  },
  {
    title: "AI",
    text: "모델 성능 자체보다 프롬프트, 피드백, 인터페이스, 설명 방식처럼 사용자가 실제로 접하는 AI 경험에 주목합니다.",
  },
  {
    title: "Context",
    text: "뉴스, 플랫폼, 조직, 시장처럼 의사결정이 일어나는 미디어·경영 맥락을 연구 설계 안에 포함합니다.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Research"
          title="사람, AI, 미디어와 조직이 만나는 지점에서 질문을 만듭니다."
          description="딸깍 연구소는 HAI를 중심에 두고 미디어커뮤니케이션과 경영학의 질문을 연결합니다. 아래 내용은 현재의 연구 방향이며, 완료된 실증 결과를 의미하지 않습니다."
          meta="Research framing · 2026 —"
        />

        <section className="content-section">
          <div className="section-heading">
            <span>01 / Areas</span>
            <h2>네 개의 연구 축</h2>
          </div>
          <div className="detail-grid">
            {researchAreas.map((area) => (
              <article className="detail-card" id={area.slug} key={area.code}>
                <span>{area.code}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section tone-soft">
          <div className="section-heading">
            <span>02 / Framing</span>
            <h2>무엇을 관찰할 것인가</h2>
          </div>
          <div className="three-column">
            {framing.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="hai-framing">
          <div className="section-heading">
            <span>03 / HAI research framing</span>
            <h2>AI를 사용하는 연구와 AI를 연구하는 일은 다릅니다.</h2>
          </div>
          <div className="three-column">
            <article>
              <span>01</span>
              <h3>AI as a Tool</h3>
              <p>뉴스 수집, 자료 분류, 텍스트 분석에 AI를 이용합니다. 이때 검증해야 할 것은 모델 출력의 재현성, 편향과 분석 품질입니다.</p>
            </article>
            <article>
              <span>02</span>
              <h3>AI as a Research Subject</h3>
              <p>사람들이 AI의 요약이나 설명을 얼마나 믿고, 어떤 판단과 행동을 하는지 관찰합니다. 이때 사람의 반응이 연구의 중심입니다.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Combining Both</h3>
              <p>AI로 정보 제시 방식을 만들고, 실험·설문·인터랙션 기록으로 사용자의 신뢰·판단·선택을 평가할 수 있습니다.</p>
            </article>
          </div>
          <div className="research-note">
            <strong>연구 설계 아이디어 · 아직 수행된 실험이 아닙니다</strong>
            <p>예를 들어 같은 정치 이슈를 다룬 서로 다른 뉴스 보도와 AI 요약을 조건별로 제시한 뒤, 이용자의 편향 인식·근거 검토·신뢰 변화를 조사할 수 있습니다. 실제 참여자 대상 실험을 진행하려면 윤리 심의 필요성, 동의 절차, 표본·무작위 배정·측정 문항을 먼저 검토해야 합니다.</p>
          </div>
          <div className="research-note">
            <strong>HCI와 HAI의 관계</strong>
            <p>HAI는 인간이 AI와 상호작용하는 상황을 집중적으로 연구하는 영역입니다. 기존 HCI가 대체되었다는 의미가 아니며, 사용성·접근성·피드백·사용자 통제 같은 HCI 원칙은 HAI에도 중요합니다.</p>
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <span>04 / Agenda</span>
            <h2>현재 질문을 만들고 있는 교차점</h2>
          </div>
          <div className="agenda-list">
            {agenda.map((item, index) => (
              <div className="agenda-item" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
          <div className="research-note">
            <strong>Research status note</strong>
            <p>
              이 페이지의 의제는 탐색·설계 단계의 연구 방향입니다. 표본, 효과크기,
              통계적 유의성, 인과효과 등 실증 결과는 실제 분석이 완료되고 검증된
              경우에만 별도로 공개합니다.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
