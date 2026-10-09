import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Outputs | 공개된 결과물",
  description: "실제로 확인할 수 있는 딸깍 연구소 코드·프로토타입·설계 기록과 아직 공개되지 않은 연구 성과를 명확히 구분합니다.",
  alternates: { canonical: "/outputs" },
};

const actualOutputs = [
  {
    number: "01",
    category: "오픈소스 웹 플랫폼",
    title: "모두의 딸깍 연구소 웹사이트",
    status: "공개된 소스",
    description: "Next.js·TypeScript 기반 연구·실습 플랫폼의 코드와 개선 이력을 확인할 수 있습니다. 연구실의 논문이나 실증 결과로 간주하지 않습니다.",
    href: "https://github.com/Jxny0ung/ddalkak-lab-hai",
    link: "GitHub 저장소 확인",
  },
  {
    number: "02",
    category: "HAI 인터랙션 프로토타입",
    title: "박수 인식 인터페이스",
    status: "브라우저 실험",
    description: "명시적인 마이크 동의 후 두 번의 박수를 감지하는 실험용 화면입니다. 사람을 대상으로 한 정확도·사용성 연구 성과는 아직 등록되지 않았습니다.",
    href: "/lab",
    link: "HAI Lab에서 살펴보기",
  },
  {
    number: "03",
    category: "AI 실습 도구",
    title: "Idea Map · Prompt Builder",
    status: "로컬 데모",
    description: "학생이 직접 조작할 수 있는 질문 템플릿·프롬프트 구성 도구입니다. 별도의 AI 모델을 호출하지 않습니다.",
    href: "/projects",
    link: "프로젝트와 구현 상태 확인",
  },
  {
    number: "04",
    category: "설계와 변경 기록",
    title: "연구·개발 문서",
    status: "공개 문서",
    description: "HAI 아키텍처, 프로젝트 명세, 보안 원칙과 사이트 개선 이력을 공개된 문서에서 확인할 수 있습니다.",
    href: "https://github.com/Jxny0ung/ddalkak-lab-hai/tree/main/docs",
    link: "개발 기록 확인",
  },
] as const;

const publicationRules = [
  {
    title: "논문 · 발표 · 보고서",
    detail: "제목·저자·발표처·일자·DOI 또는 원문을 확인한 자료만 해당 분류로 공개합니다. 현재 이 페이지에 등록된 검증된 학술 실적은 없습니다.",
  },
  {
    title: "연구원과 참여 역할",
    detail: "본인의 공개 동의와 실제 참여 내역을 확인한 뒤 프로젝트·연구원 프로필을 연결합니다. 현재 공개된 개인별 연구원 포트폴리오는 없습니다.",
  },
  {
    title: "자격증 · 수료증 · 수상",
    detail: "증빙 자료의 공개 허락을 받은 뒤 발급기관, 취득일, 증빙 링크와 유형을 함께 기록합니다. 수료·자격·수상을 서로 다른 유형으로 표기합니다.",
  },
] as const;

export default function OutputsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="sl-main sl-interior">
        <section className="sl-page-top">
          <div className="sl-container">
            <span className="sl-kicker">OUTPUTS / VERIFIABLE WORK</span>
            <h1>보여주는 결과보다,<br/>확인할 수 있는 기록.</h1>
            <p>실제 코드·시연·설계 문서를 연구 결과와 구분해 모았습니다. 학술 실적이나 연구원 활동은 증빙과 공개 동의가 확인된 뒤에만 추가합니다.</p>
          </div>
        </section>

        <section className="sl-section" aria-labelledby="actual-outputs-title">
          <div className="sl-container">
            <div className="sl-section-head">
              <div>
                <span className="sl-kicker">01 / CURRENT PUBLIC OUTPUTS</span>
                <h2 id="actual-outputs-title">지금 확인할 수 있는 결과물</h2>
                <p>각 항목은 실제 열어볼 수 있는 자료로 연결됩니다. 링크가 없는 카드를 클릭 가능한 것처럼 표시하지 않습니다.</p>
              </div>
            </div>
            <div className="sl-output-grid">
              {actualOutputs.map((output) => {
                const external = output.href.startsWith("https://");
                const contents = (
                  <>
                    <div className="sl-output-card__meta"><span>{output.number} / {output.category}</span><small>{output.status}</small></div>
                    <h3>{output.title}</h3>
                    <p>{output.description}</p>
                    <span className="sl-output-card__link">{output.link} ↗</span>
                  </>
                );
                return external ? (
                  <a className="sl-output-card" key={output.number} href={output.href} target="_blank" rel="noopener noreferrer">{contents}</a>
                ) : (
                  <Link className="sl-output-card" key={output.number} href={output.href}>{contents}</Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="sl-section sl-section-soft" aria-labelledby="publication-rules-title">
          <div className="sl-container">
            <div className="sl-section-head">
              <div>
                <span className="sl-kicker">02 / EVIDENCE BEFORE PUBLICATION</span>
                <h2 id="publication-rules-title">새로운 실적은 증빙과 함께 공개합니다.</h2>
                <p>아래는 향후 등록 기준입니다. 해당 실적이나 연구원이 이미 존재한다는 뜻은 아닙니다.</p>
              </div>
            </div>
            <div className="sl-output-standards">
              {publicationRules.map((rule, index) => (
                <article key={rule.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{rule.title}</h3><p>{rule.detail}</p></div>
                </article>
              ))}
            </div>
            <div className="sl-actions sl-output-actions">
              <Link className="sl-btn sl-btn-dark" href="/registry">연구 기록 원칙 보기 ↗</Link>
              <Link className="sl-btn sl-btn-outline" href="/archive">아카이브 살펴보기</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
