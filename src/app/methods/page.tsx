import type { Metadata } from "next";
import Link from "next/link";
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

const validationSteps = [
  {
    title: "Human reference",
    text: "AI 출력과 독립적으로 사람이 코딩한 검증 표본을 만들고 코드북·훈련·판정 절차를 기록합니다.",
    output: "reference set · coder protocol",
  },
  {
    title: "Configuration lock",
    text: "모델명, 버전, 프롬프트, 예시, 출력 스키마와 노출된 샘플링 설정을 평가 전에 고정합니다.",
    output: "model card · prompt version",
  },
  {
    title: "Blind AI coding",
    text: "검증용 정답을 보여주지 않은 상태에서 AI 코딩을 수행하고 원시 출력과 파싱된 라벨을 분리해 보존합니다.",
    output: "raw output · parsed labels",
  },
  {
    title: "Agreement & error",
    text: "과업에 맞는 정확도·F1·일치도와 혼동 패턴을 확인하고 오류 유형을 분류합니다.",
    output: "metrics · confusion · error taxonomy",
  },
  {
    title: "Adjudication & drift",
    text: "사람 검토가 필요한 사례를 미리 정하고 모델·프롬프트·데이터 분포가 바뀌면 검증을 반복합니다.",
    output: "override log · drift check",
  },
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

        <section className="content-section tone-soft">
          <div className="section-heading">
            <span>04 / AI Validation</span>
            <h2>LLM 코딩은 사람이 만든 기준으로 먼저 검증합니다.</h2>
          </div>
          <div className="method-detail-list">
            {validationSteps.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <small>{step.output}</small>
              </article>
            ))}
          </div>
          <div className="research-note">
            <strong>Validation protocol</strong>
            <p>
              모든 과업에 하나의 임계값을 기계적으로 적용하지 않습니다. 구성개념,
              오류 비용, 라벨 구조와 연구 설계에 맞춰 검증 지표와 사람 판정
              기준을 사전에 정하고 변경 이력을 남깁니다.{" "}
              <Link
                href="https://github.com/Jxny0ung/ddalkak-lab-hai/blob/main/docs/ai-assisted-coding-validation.md"
                target="_blank"
              >
                전체 프로토콜 보기 ↗
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
