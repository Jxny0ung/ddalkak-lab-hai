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

        <section className="content-section" id="hai-distinction">
          <div className="section-heading">
            <span>03 / Research orientation</span>
            <h2>AI를 연구에 쓰는 것과 AI 상호작용을 연구하는 것은 다릅니다.</h2>
          </div>
          <div className="three-column">
            <article>
              <span>01</span>
              <h3>AI as a research tool</h3>
              <p>자료 수집, 뉴스 텍스트 분석, 분류와 요약에 AI를 활용하는 접근입니다. 연구자는 수집 기준과 모델 출력의 타당성을 별도로 검증합니다.</p>
            </article>
            <article>
              <span>02</span>
              <h3>HAI as a research topic</h3>
              <p>사람이 AI의 설명과 추천을 어떻게 이해하고 신뢰하며 판단을 바꾸는지 관찰하는 접근입니다. 참여자의 행동과 선택이 연구의 중심입니다.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Putting them together</h3>
              <p>AI가 서로 다른 뉴스 보도를 비교해 제시하고, 이용자가 편향과 근거를 어떻게 인식하는지 실험하도록 설계할 수 있습니다. 아직 검증된 효과를 의미하지 않습니다.</p>
            </article>
          </div>
          <div className="research-note">
            <strong>HCI와 HAI의 관계</strong>
            <p>HAI는 HCI를 대체한다기보다, 인공지능의 설명, 불확실성, 의사결정 지원과 인간의 상호작용을 집중적으로 다루는 연구 방향입니다. 아래 의제는 연구 가능성이지 완료된 실험 결과가 아닙니다.</p>
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
