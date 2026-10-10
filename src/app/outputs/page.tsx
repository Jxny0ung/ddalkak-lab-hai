import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Outputs & Evidence",
  description: "딸깍 연구소의 확인 가능한 코드와 연구 문서, 성과 및 자격 증빙 공개 기준",
  alternates: { canonical: "/outputs" },
};

const evidence = [
  {
    code: "01",
    type: "WORKING SOURCE",
    title: "공개 웹사이트 소스코드",
    description: "현재 운영 중인 사이트의 컴포넌트, 프로젝트별 미리보기, HAI 실험 및 변경 이력을 GitHub에서 확인할 수 있습니다.",
    href: "https://github.com/Jxny0ung/ddalkak-lab-hai",
    link: "GitHub 저장소 확인하기",
  },
  {
    code: "02",
    type: "METHOD PROTOCOL",
    title: "HAI 박수 실험 설계 문서",
    description: "마이크 동의, 박수 신호 탐지, 수동 조작, 오류 가능성 및 향후 MCP 연결 시 승인 원칙을 설명한 설계 문서입니다. 실증 연구 성과를 뜻하지 않습니다.",
    href: "https://github.com/Jxny0ung/ddalkak-lab-hai/blob/main/docs/hai-clap-mcp-architecture.md",
    link: "실험 구조 확인하기",
  },
  {
    code: "03",
    type: "REPRODUCIBILITY",
    title: "연구 기록과 코딩 검증 지침",
    description: "연구 질문, 사전 계획, 분석 기록, AI 보조 코딩 검증 등에 필요한 템플릿과 기준을 공개합니다.",
    href: "https://github.com/Jxny0ung/ddalkak-lab-hai/blob/main/docs/ai-assisted-coding-validation.md",
    link: "검증 지침 확인하기",
  },
] as const;

const futureTypes = [
  { title: "논문·학술 발표", status: "공개 확인 자료 없음", description: "저널 논문, 학술대회 발표, 포스터는 종류와 심사·발표 상태를 구분하고 공식 링크가 확인될 때 등록합니다." },
  { title: "연구원 포트폴리오", status: "기초 소개 공개", description: "학부 연구생 세 명의 관심 분야와 취미, 개인 프로필을 소개합니다. 프로젝트별 역할과 연구 성과는 확인 후 별도로 연결합니다." },
  { title: "자격증·수료증·수상", status: "공개 확인 자료 없음", description: "자격증, 교육 수료, 수상은 서로 다른 항목입니다. 발급기관, 취득일, 증빙 원본과 공개 동의가 확인된 뒤 등록합니다." },
] as const;

export default function OutputsPage() {
  return (
    <>
      <SiteHeader />
      <main className="sl-main sl-interior" id="main-content">
        <section className="sl-page-top">
          <div className="sl-container">
            <span className="sl-kicker">OUTPUTS / EVIDENCE FIRST</span>
            <h1>말보다 근거를<br />먼저 보여줍니다.</h1>
            <p>작동하는 코드와 연구 설계 문서, 실제 검증된 성과를 구분합니다. 공개 자료가 확인되지 않은 항목은 임의로 채우지 않습니다.</p>
          </div>
        </section>
        <section className="sl-section" aria-labelledby="sl-evidence-title">
          <div className="sl-container">
            <div className="sl-section-head">
              <div>
                <span className="sl-kicker">PUBLIC & VERIFIABLE</span>
                <h2 id="sl-evidence-title">지금 확인할 수 있는 기록</h2>
                <p>아래 링크는 실제 공개된 소스와 설계 문서로 연결됩니다.</p>
              </div>
            </div>
            <div className="sl-evidence-grid">
              {evidence.map((item) => (
                <a className="sl-evidence-card" href={item.href} target="_blank" rel="noopener noreferrer" key={item.code}>
                  <div className="sl-evidence-meta"><span>{item.code}</span><span>{item.type}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="sl-evidence-action">{item.link} <span aria-hidden="true">↗</span></span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft" aria-labelledby="sl-future-output-title">
          <div className="sl-container">
            <div className="sl-section-head">
              <div>
                <span className="sl-kicker">EVIDENCE POLICY</span>
                <h2 id="sl-future-output-title">연구 성과와 이력의 공개 기준</h2>
                <p>연구실 홈페이지 면담 피드백을 참고한 구조입니다. 다른 학부 연구실의 실적을 딸깍 연구소 실적으로 이전하지 않습니다.</p>
              </div>
            </div>
            <div className="sl-evidence-index">
              {futureTypes.map((item) => (
                <article key={item.title}>
                  <div><h3>{item.title}</h3><span>{item.status}</span></div>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
            <div className="sl-evidence-note">
              <strong>추가 자료를 공개할 때</strong>
              <p>프로젝트명, 참여자와 역할(동의 시), 연구 질문, 방법, 수행 기간, 산출물 유형, 검증 상태, 출처 링크를 함께 기록합니다. 개인정보가 포함된 증빙은 공개 전에 가리거나 공개 범위를 별도로 확인합니다.</p>
            </div>
            <div className="sl-actions">
              <Link className="sl-btn sl-btn-dark" href="/projects">프로젝트 보드 보기 ↗</Link>
              <Link className="sl-btn sl-btn-outline" href="/registry">연구 기록 기준 살펴보기</Link>
              <Link className="sl-btn sl-btn-outline" href="/people">학부 연구생 소개 보기</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
