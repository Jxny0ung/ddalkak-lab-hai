import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "ETH 연구 논문 프로젝트",
  description: "AI를 활용하는 ETH 연구 프로젝트의 계획, 방법, 검증 상태를 투명하게 기록하기 위한 공간",
  alternates: { canonical: "/work/eth" },
};

const sections = [
  { num: "01", label: "Research Question", title: "연구 질문", body: "ETH 연구의 공식 제목, 연구 질문과 핵심 개념을 이전 연구계획서 또는 연구팀 확인 후 게시합니다. ETH의 의미를 추측해 기재하지 않습니다." },
  { num: "02", label: "Research Design", title: "방법과 자료", body: "AI를 어떤 단계에서 사용하는지, 자료의 수집 범위와 검증 기준은 무엇인지 연구 설계가 확인되면 기술합니다. AI를 사용했다는 사실만으로 HAI 연구가 되지는 않습니다." },
  { num: "03", label: "Reproducibility", title: "절차와 검증", body: "프롬프트 버전, 데이터 출처, 사람의 검토 방식, 오류 및 한계를 재현 가능한 형태로 기록합니다. 비공개 자료와 원문 프롬프트는 승인 전에 공개하지 않습니다." },
  { num: "04", label: "Research Output", title: "결과와 산출물", body: "논문 초고, 포스터, 분석 코드와 발표 자료는 실제 결과물이 확정되고 공개 허락을 받은 뒤 링크합니다. 현재 게시된 논문 또는 검증된 연구결과는 없습니다." },
] as const;

export default function EthResearchPage() {
  return (
    <>
      <SiteHeader />
      <main className="sl-main sl-interior" id="main-content">
        <section className="sl-page-top pg-heading pg-heading--compact">
          <div className="sl-container">
            <span className="sl-kicker">01 / RESEARCH / AI-ASSISTED ETH PROJECT</span>
            <h1>ETH 연구,<br />과정부터 기록합니다.</h1>
            <p>AI를 활용해 진행하는 ETH 논문 프로젝트를 위한 기록 공간입니다. 기존 채팅에서 언급된 프로젝트는 확인했지만, 연구 제목·ETH 정의·방법·진행 현황을 뒷받침할 상세 원문은 아직 확보하지 못했습니다.</p>
            <span className="pg-inline-status">현재 상태 · 연구 상세 자료 확인 대기</span>
          </div>
        </section>
        <section className="sl-section">
          <div className="sl-container">
            <div className="sl-section-head">
              <div><span className="sl-kicker">DOCUMENTATION STRUCTURE</span><h2>논문 프로젝트 기록 항목</h2><p>자료가 확인되면 실제 근거를 기준으로 업데이트할 항목입니다. 아래 설명은 연구 결과나 확정된 실험 계획이 아닙니다.</p></div>
            </div>
            <div className="pg-record-grid">
              {sections.map((item) => (
                <article className="pg-record" key={item.num}>
                  <span>{item.num} / {item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft">
          <div className="sl-container pg-next">
            <div><span className="sl-kicker">RESEARCH INTEGRITY</span><h2>AI를 쓰는 연구와 HAI 연구를 구분합니다.</h2><p>AI가 분석 도구인지, 사람의 AI 신뢰와 행동이 연구 대상인지에 따라 연구 질문과 평가 방법이 달라집니다. 연구 목적이 확정되기 전에는 연구 유형을 임의로 단정하지 않습니다.</p></div>
            <div className="sl-actions"><Link className="sl-btn sl-btn-dark" href="/methods">방법론 보기 ↗</Link><Link className="sl-btn sl-btn-outline" href="/work">전체 활동으로 돌아가기</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
