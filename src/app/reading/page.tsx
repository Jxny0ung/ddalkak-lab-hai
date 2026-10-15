import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Reading Notes | AI 독서와 서평",
  description: "AI와 사회, 기술과 인간의 관계에 관한 책을 읽고 서평을 쌓아가는 독서 아카이브",
  alternates: { canonical: "/reading" },
};

export default function ReadingPage() {
  return (
    <>
      <SiteHeader />
      <main className="sl-main sl-interior" id="main-content">
        <section className="sl-page-top pg-heading pg-heading--compact">
          <div className="sl-container">
            <span className="sl-kicker">02 / READ / QUESTION / REVIEW</span>
            <h1>AI 책을 읽고,<br />우리의 질문으로 남깁니다.</h1>
            <p>AI와 사회, 인간, 미디어, 경영을 다룬 책을 읽고 서평을 축적하는 공간입니다. 단순 요약보다 무엇을 이해했고 어떤 주장에 동의하거나 의문을 갖게 됐는지 기록하려 합니다.</p>
          </div>
        </section>
        <section className="sl-section">
          <div className="sl-container">
            <div className="sl-section-head"><div><span className="sl-kicker">BOOK REVIEWS</span><h2>아직 공개된 서평은 없습니다.</h2><p>읽지 않았거나 검토하지 않은 책의 서평을 AI로 만들어 실적처럼 게시하지 않습니다.</p></div></div>
            <div className="pg-empty" role="status">
              <div className="pg-empty__icon" aria-hidden="true">02</div>
              <div><h3>독서 기록을 준비하고 있습니다.</h3><p>첫 서평이 완성되면 저자·출판 정보, 핵심 논점, 개인 의견, AI 활용 여부와 검증 범위를 함께 공개하겠습니다.</p></div>
              <span>0 PUBLISHED REVIEWS</span>
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft">
          <div className="sl-container">
            <div className="sl-section-head"><div><span className="sl-kicker">EDITORIAL STANDARD</span><h2>책을 읽고 기록하는 방식</h2></div></div>
            <div className="pg-record-grid">
              <article className="pg-record"><span>01 / CONTEXT</span><h3>책과 문제의식</h3><p>서지 정보와 집필 배경, 논의가 필요한 핵심 문제를 확인합니다.</p></article>
              <article className="pg-record"><span>02 / ARGUMENT</span><h3>주장과 근거</h3><p>저자의 핵심 주장과 이를 지지하는 근거를 구분해 정리합니다.</p></article>
              <article className="pg-record"><span>03 / REFLECTION</span><h3>질문과 비평</h3><p>읽으면서 생긴 의문과 우리 연구·프로젝트에 적용 가능한 쟁점을 기록합니다.</p></article>
              <article className="pg-record"><span>04 / AI DISCLOSURE</span><h3>AI 사용 과정</h3><p>AI가 초안, 자료 탐색, 교정 중 어떤 부분을 보조했는지 공개 가능한 범위에서 표시합니다.</p></article>
            </div>
            <div className="sl-actions pg-actions-bottom"><Link className="sl-btn sl-btn-dark" href="/work">연구소 활동 보기 ↗</Link><Link className="sl-btn sl-btn-outline" href="/prompts">프롬프트 공개 원칙 확인</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
