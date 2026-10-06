import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const description =
  "DDALKAK LAB의 연구 질문, 가설, 표본, 변수, 분석 계획, AI 사용, 공개 상태를 연구 전후로 구분해 기록하는 연구 레지스트리입니다.";

export const metadata: Metadata = {
  title: "Registry",
  description,
  alternates: { canonical: "/registry" },
  openGraph: {
    title: "Registry | DDALKAK LAB",
    description,
    url: "/registry",
  },
};

const requiredFields = [
  "Research question — 무엇을 설명하거나 검증하려는가",
  "Hypothesis / expectation — 사전 기대와 방향성은 무엇인가",
  "Sample & exclusions — 표본과 제외 기준을 어떻게 정하는가",
  "Measures & variables — 핵심 변수와 측정은 무엇인가",
  "Analysis plan — 어떤 분석을 언제 결정했는가",
  "AI involvement — AI가 수집·코딩·분석·해석 중 어디에 개입하는가",
  "Ethics & privacy — 개인정보와 연구참여자 보호를 어떻게 처리하는가",
  "Version & status — Draft, Ready, Running, Closed, Published 중 어디에 있는가",
];

const lifecycle = [
  ["Draft", "아이디어와 설계를 수정하는 단계. 결과를 주장하지 않습니다."],
  ["Ready", "수집·분석 전에 핵심 계획을 잠그고 변경 가능 항목을 표시합니다."],
  ["Running", "데이터 수집 또는 분석 중. 변경이 생기면 이유와 시점을 기록합니다."],
  ["Closed", "주요 분석이 끝난 상태. 계획 대비 변경과 한계를 정리합니다."],
  ["Published", "검증된 공개 결과와 재현 가능한 자료를 아카이브에 연결합니다."],
];

export default function RegistryPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Registry"
          title="연구를 시작하기 전에, 무엇을 검증할지 먼저 기록합니다."
          description="레지스트리는 계획과 사후 해석을 구분하기 위한 연구 기록 장치입니다. 아직 공개된 완료 연구가 없다면 그 상태 자체를 그대로 표시합니다."
          meta="Study registry · versioned records"
        />

        <section className="content-section tone-soft">
          <div className="section-heading">
            <span>01 / Current status</span>
            <h2>공개된 완료 연구 레코드: 아직 없음</h2>
          </div>
          <div className="research-note">
            <strong>Why empty is valid</strong>
            <p>
              연구가 완료되지 않았는데 성과처럼 보이도록 빈칸을 채우지 않습니다.
              첫 공개 레코드는 연구 질문, 사전 계획, 변경 로그, 결과 상태를
              함께 설명할 수 있을 때 게시합니다.
            </p>
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <span>02 / Required fields</span>
            <h2>한 연구 레코드에 반드시 남길 항목</h2>
          </div>
          <ol className="check-list">
            {requiredFields.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <span>03 / Lifecycle</span>
            <h2>상태를 바꾸면서 연구 이력을 남깁니다.</h2>
          </div>
          <div className="method-detail-list">
            {lifecycle.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <small>상태 변경 시 버전과 변경 이유 기록</small>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section tone-dark">
          <div className="section-heading">
            <span>04 / Template</span>
            <h2>같은 형식으로 기록하기</h2>
          </div>
          <div className="repo-callout">
            <div>
              <p className="eyebrow">Research record template</p>
              <h3>docs/research-record-template.md</h3>
              <p>
                질문, 가설, 표본, 측정, 분석 계획, AI 개입, 윤리·개인정보,
                변경 로그를 한 문서에서 관리하는 기본 템플릿입니다.
              </p>
            </div>
            <Link
              className="text-button"
              href="https://github.com/Jxny0ung/ddalkak-lab-hai/blob/main/docs/research-record-template.md"
              target="_blank"
            >
              Open template ↗
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
