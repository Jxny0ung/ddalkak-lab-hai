import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const description =
  "DDALKAK LAB의 연구 질문, 방법, 검증, 공개를 연결하는 Research Operating System을 소개합니다.";

export const metadata: Metadata = {
  title: "System",
  description,
  alternates: { canonical: "/system" },
  openGraph: {
    title: "System | DDALKAK LAB",
    description,
    url: "/system",
  },
};

const layers = [
  {
    index: "01",
    title: "Question",
    subtitle: "Frame before building",
    text: "무엇을 알고 싶은지, 어떤 메커니즘을 검증하는지, 무엇을 결과로 간주할지 먼저 정의합니다.",
  },
  {
    index: "02",
    title: "Protocol",
    subtitle: "Freeze before observing",
    text: "표본, 변수, 조작, 코드북, AI 사용과 분석 계획을 결과를 보기 전에 기록합니다.",
  },
  {
    index: "03",
    title: "Evidence",
    subtitle: "Validate before claiming",
    text: "사람 기준셋, 신뢰도, 오류 분석, 재현 코드와 변경 로그를 통해 관찰을 검증 가능한 증거로 바꿉니다.",
  },
  {
    index: "04",
    title: "Release",
    subtitle: "Publish with context",
    text: "완료 상태, 한계, 공개 가능 범위와 재현 자료를 함께 남겨 결과가 만들어진 과정을 추적할 수 있게 합니다.",
  },
];

const modules = [
  {
    title: "Registry",
    label: "Study state",
    text: "연구 질문, 가설, 표본, 변수, 분석 계획과 상태를 버전으로 기록합니다.",
    href: "/registry",
  },
  {
    title: "Methods",
    label: "Validation",
    text: "실험·설문·내용분석·AI 코딩 검증과 분석 절차를 연구 질문에 맞게 연결합니다.",
    href: "/methods",
  },
  {
    title: "Handbook",
    label: "Governance",
    text: "연구 무결성, AI 사용, 데이터 관리, 공개와 보안의 공통 기준을 관리합니다.",
    href: "/handbook",
  },
  {
    title: "Archive",
    label: "Public record",
    text: "공개 가능한 코드, 방법 노트, 재현 기록과 검증된 결과를 단계별로 보존합니다.",
    href: "/archive",
  },
];

const gates = [
  "Research question defined",
  "Sampling & exclusion rule recorded",
  "AI role and human verification separated",
  "Analysis plan documented",
  "Privacy / public-release boundary checked",
  "Lint + production build passed",
  "Status and limitations visible",
];

export default function SystemPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Research System"
          title="연구의 질문, 방법, 증거와 공개를 하나의 시스템으로 연결합니다."
          description="DDALKAK LAB은 단순한 프로젝트 목록이 아니라 연구가 어떤 판단을 거쳐 만들어졌는지 추적할 수 있는 Research Operating System을 구축합니다."
          meta="Question → Protocol → Evidence → Release"
        />

        <section className="content-section system-map-section">
          <div className="section-heading section-heading--display">
            <span>01 / Architecture</span>
            <div>
              <p className="section-overline">RESEARCH OPERATING SYSTEM</p>
              <h2>네 개의 레이어가 하나의 연구를 완성합니다.</h2>
            </div>
          </div>

          <div className="system-layer-grid">
            {layers.map((layer) => (
              <article className="system-layer-card" key={layer.title}>
                <div className="system-layer-card__top">
                  <span>{layer.index}</span>
                  <i aria-hidden="true" />
                </div>
                <p>{layer.subtitle}</p>
                <h3>{layer.title}</h3>
                <small>{layer.text}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section tone-dark">
          <div className="section-heading">
            <span>02 / Modules</span>
            <h2>연구가 실제로 움직이는 네 개의 모듈</h2>
          </div>

          <div className="system-module-grid">
            {modules.map((module, index) => (
              <Link className="system-module-card" href={module.href} key={module.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{module.label}</p>
                <h3>{module.title}</h3>
                <small>{module.text}</small>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section system-gates-section">
          <div className="section-heading">
            <span>03 / Quality gates</span>
            <h2>공개 전에 통과해야 하는 최소 기준</h2>
          </div>

          <ol className="gate-list">
            {gates.map((gate, index) => (
              <li key={gate}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{gate}</p>
                <i aria-hidden="true">CHECK</i>
              </li>
            ))}
          </ol>
        </section>

        <section className="content-section system-cta-section">
          <div>
            <p className="eyebrow">From structure to study</p>
            <h2>시스템의 다음 입력은 실제 연구입니다.</h2>
            <p>
              인프라와 운영 원칙은 준비되었습니다. 다음 단계에서는 하나의 HAI 연구를
              Registry에 등록하고 Protocol → Evidence → Release 흐름을 실제로 사용합니다.
            </p>
          </div>
          <Link className="button-primary" href="/registry">
            Open Registry <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
