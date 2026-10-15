import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Prompt Archive | 준비 중",
  description: "AI 연구·게임·독서 활동에서 사용한 프롬프트를 향후 검증과 함께 공유하기 위한 아카이브. 프롬프트 원문은 현재 공개하지 않습니다.",
  alternates: { canonical: "/prompts" },
};

const fields = [
  { id: "01", title: "프로젝트와 목적", description: "어떤 문제를 해결하려고 사용했는지와 적용 범위를 기록합니다." },
  { id: "02", title: "프롬프트와 버전", description: "공개 승인을 받은 프롬프트 원문과 수정 버전만 별도 게시합니다." },
  { id: "03", title: "검증과 한계", description: "모델과 조건, 사람의 검토 절차, 실패한 부분을 구분합니다." },
  { id: "04", title: "민감정보 점검", description: "API 키, 개인정보, 비공개 연구 데이터가 포함되지 않았는지 확인합니다." },
] as const;

export default function PromptsPage() {
  return (
    <>
      <SiteHeader />
      <main className="sl-main sl-interior" id="main-content">
        <section className="sl-page-top pg-heading pg-heading--compact">
          <div className="sl-container">
            <span className="sl-kicker">04 / PROMPT ARCHIVE</span>
            <h1>답뿐 아니라,<br />어떤 질문을 했는지도 기록합니다.</h1>
            <p>AI를 이용해 연구와 게임, 콘텐츠를 만드는 과정에서 사용한 프롬프트를 추후 공유할 공간입니다. 현재는 아카이브 구조만 구현했으며 프롬프트 본문은 게시하지 않습니다.</p>
            <span className="pg-inline-status">현재 상태 · 공개된 프롬프트 0건</span>
          </div>
        </section>
        <section className="sl-section">
          <div className="sl-container">
            <div className="pg-empty" role="status">
              <div className="pg-empty__icon" aria-hidden="true">04</div>
              <div><h2>프롬프트 아카이브를 준비하고 있습니다.</h2><p>요청하신 대로 이 페이지에는 예시 프롬프트, 실제 대화 원문 또는 검증되지 않은 제작 기록을 올리지 않았습니다.</p></div>
              <span>0 PUBLIC PROMPTS</span>
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft">
          <div className="sl-container">
            <div className="sl-section-head">
              <div><span className="sl-kicker">PUBLICATION SCHEMA</span><h2>추후 프롬프트를 공개할 때의 기준</h2><p>아래는 게시물의 메타데이터 구조이지, 아직 게시된 프롬프트 목록이 아닙니다.</p></div>
            </div>
            <div className="pg-record-grid">
              {fields.map((item) => (
                <article className="pg-record" key={item.id}><span>{item.id} / ARCHIVE FIELD</span><h3>{item.title}</h3><p>{item.description}</p></article>
              ))}
            </div>
            <div className="sl-actions pg-actions-bottom"><Link className="sl-btn sl-btn-dark" href="/work">연구소의 네 가지 활동 ↗</Link><Link className="sl-btn sl-btn-outline" href="/projects/prompt-builder">프롬프트 구성 실습</Link></div>
            <p className="pg-footnote">프롬프트 구성 실습은 별도의 로컬 교육용 도구입니다. 이 아카이브에 실제 기록이 공개됐다는 뜻은 아닙니다.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
