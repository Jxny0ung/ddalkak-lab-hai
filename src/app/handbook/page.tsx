import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const description =
  "DDALKAK LAB의 연구 무결성, AI 사용, 데이터 관리, 재현성, 보안 기준을 공개하는 연구 핸드북입니다.";

export const metadata: Metadata = {
  title: "Handbook",
  description,
  alternates: { canonical: "/handbook" },
  openGraph: {
    title: "Handbook | DDALKAK LAB",
    description,
    url: "/handbook",
  },
};

const standards = [
  {
    title: "Research Integrity",
    text: "계획과 사후 해석, 파일럿과 본 연구, 탐색적 분석과 확증적 분석을 구분해서 기록합니다.",
  },
  {
    title: "Human Verification",
    text: "AI가 코딩·요약·분류·분석을 보조하더라도 연구자의 검토 절차와 최종 판단 책임을 남깁니다.",
  },
  {
    title: "Data Minimization",
    text: "연구 질문에 필요하지 않은 개인정보를 수집하지 않고, 공개 저장소에는 원자료와 식별정보를 올리지 않습니다.",
  },
  {
    title: "Reproducibility",
    text: "가능한 경우 코드, 버전, 변수 정의, 제외 기준, 변경 로그를 남겨 다른 사람이 절차를 다시 확인할 수 있게 합니다.",
  },
];

const resources = [
  {
    title: "Research Record Template",
    description:
      "질문, 가설, 표본, 변수, 분석 계획, AI 개입, 윤리·개인정보, 변경 이력을 한 문서에서 기록합니다.",
    href: "https://github.com/Jxny0ung/ddalkak-lab-hai/blob/main/docs/research-record-template.md",
  },
  {
    title: "AI Use Policy",
    description:
      "생성형 AI를 연구에 사용할 때 허용되는 역할, 검증 책임, 공개 원칙과 금지 사항을 정리합니다.",
    href: "https://github.com/Jxny0ung/ddalkak-lab-hai/blob/main/docs/ai-use-policy.md",
  },
  {
    title: "Data Management Plan",
    description:
      "공개·제한·민감 자료를 분리하고 저장, 백업, 버전, 보존, 삭제 원칙을 관리합니다.",
    href: "https://github.com/Jxny0ung/ddalkak-lab-hai/blob/main/docs/data-management-plan.md",
  },
  {
    title: "Contribution Guide",
    description:
      "코드와 연구 내용의 변경을 검토하는 Pull Request 기준과 공개 저장소 안전 원칙을 설명합니다.",
    href: "https://github.com/Jxny0ung/ddalkak-lab-hai/blob/main/CONTRIBUTING.md",
  },
];

export default function HandbookPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Handbook"
          title="빠르게 만드는 것보다, 어떻게 만들었는지 설명할 수 있는 연구를 지향합니다."
          description="연구 설계, AI 활용, 데이터 관리와 공개 기준을 문서화해 결과뿐 아니라 연구 과정의 신뢰성을 관리합니다."
          meta="Research standards · living document"
        />

        <section className="content-section">
          <div className="section-heading">
            <span>01 / Standards</span>
            <h2>모든 프로젝트에 공통으로 적용하는 기준</h2>
          </div>
          <div className="detail-grid">
            {standards.map((item, index) => (
              <article className="detail-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section tone-soft">
          <div className="section-heading">
            <span>02 / Documents</span>
            <h2>연구를 시작할 때 사용하는 운영 문서</h2>
          </div>
          <div className="method-detail-list">
            {resources.map((resource, index) => (
              <article key={resource.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <small>
                  <Link href={resource.href} target="_blank">
                    Open document ↗
                  </Link>
                </small>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section tone-dark">
          <div className="section-heading">
            <span>03 / Rule of evidence</span>
            <h2>사이트에 무엇을 ‘결과’라고 쓸 수 있는가</h2>
          </div>
          <div className="repo-callout">
            <div>
              <p className="eyebrow">Evidence before claim</p>
              <h3>계획은 계획으로, 결과는 검증 후 결과로.</h3>
              <p>
                표본 수, 효과, 통계적 유의성, 인과관계, 성과와 협력 관계는
                근거가 확인되기 전까지 공개 결과처럼 표현하지 않습니다.
              </p>
            </div>
            <Link className="text-button" href="/registry">
              Open Registry →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
