import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { methods, workflow } from "@/lib/content";

const description =
  "DDALKAK LAB의 실험, 설문, 내용분석, 텍스트 분석, 행동 데이터, HAI 연구 방법을 정리합니다.";

export const metadata: Metadata = {
  title: "Methods",
  description,
  alternates: { canonical: "/methods" },
  openGraph: {
    title: "Methods | DDALKAK LAB",
    description,
    url: "/methods",
  },
};

const checks = [
  "연구 질문과 분석 단위를 먼저 정의합니다.",
  "데이터 수집 기준과 제외 기준을 기록합니다.",
  "LLM을 사용할 경우 모델의 역할과 사람의 검증 절차를 분리해 적습니다.",
  "분석 전에 변수 정의와 가능한 실패 지점을 문서화합니다.",
  "결과뿐 아니라 수정 과정과 한계를 함께 남깁니다.",
];

export default function MethodsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Methods"
          title="좋은 도구보다 검증 가능한 연구 절차를 먼저 설계합니다."
          description="실험, 설문, 내용분석, 계산사회과학, 사용성 연구를 연구 질문에 맞게 조합합니다. AI는 분석을 보조할 수 있지만 연구 설계와 검증 책임을 대신하지 않습니다."
          meta="Method-first · Reproducibility"
        />

        <section className="content-section methods-page">
          <div className="section-heading">
            <span>01 / Toolkit</span>
            <h2>Research methods</h2>
          </div>
          <div className="method-detail-list">
            {methods.map((method, index) => (
              <article key={method.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{method.title}</h3>
                <p>{method.description}</p>
                <small>{method.output}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section workflow-section">
          <div className="section-heading">
            <span>02 / Workflow</span>
            <h2>Explore → Rebuild → Improve → Share</h2>
          </div>
          <div className="workflow-grid">
            {workflow.map((item, index) => (
              <article className="workflow-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <span>03 / Checklist</span>
            <h2>연구 시작 전 확인하는 기준</h2>
          </div>
          <ol className="check-list">
            {checks.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
