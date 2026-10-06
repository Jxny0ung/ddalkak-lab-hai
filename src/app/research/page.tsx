import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { agenda, researchAreas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "DDALKAK LAB의 Human–AI Interaction, 미디어커뮤니케이션, 플랫폼·경영 연구 질문을 소개합니다.",
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
      <main>
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

        <section className="content-section">
          <div className="section-heading">
            <span>03 / Agenda</span>
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
