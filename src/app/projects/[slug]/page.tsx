import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectVisual } from "@/components/project-visual";
import { LearningDemo } from "@/components/learning-demo";
import { studentProjects } from "@/lib/student-content";

export function generateStaticParams() {
  return studentProjects.map(({ slug })=>({slug}));
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
  const {slug}=await params;
  const project=studentProjects.find((item)=>item.slug===slug);
  return { title: project?.title ?? "Project", description: project?.summary ?? "Project detail" };
}

export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const p=studentProjects.find((item)=>item.slug===slug);
  if(!p) notFound();
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="sl-main sl-interior">
        <section className="sl-page-top sl-detail-head"><div className="sl-container">
          <Link className="sl-breadcrumb" href="/projects">← 모든 프로젝트</Link>
          <div className="sl-detail-meta"><span>{p.category}</span><span>{p.status}</span><span>{p.level} · 약 {p.minutes}분</span></div>
          <h1>{p.title}</h1><p>{p.subtitle}</p>
          <div className="sl-actions">
            <a href="#try" className="sl-btn sl-btn-dark">{p.status === "사용 가능한 데모" ? "실습 열기" : p.status === "연구 실험" ? "프로토타입 보기" : "기획 예시 보기"} ↘</a>
            <a href={`https://github.com/Jxny0ung/ddalkak-lab-hai/blob/main/${p.sourcePath}`} className="sl-btn sl-btn-outline" target="_blank" rel="noopener noreferrer">관련 소스 확인 ↗</a>
          </div>
        </div></section>
        <section className="sl-section sl-detail-visual"><div className="sl-container">
          <ProjectVisual visual={p.visual} />
          <p className="sl-caption">화면은 실습용 UI입니다. AI API 연동 여부와 실제 구현 상태는 아래 설명을 확인하세요.</p>
        </div></section>
        <section className="sl-section">
          <div className="sl-container sl-detail-columns">
            <aside><span className="sl-kicker">01 / OVERVIEW</span><h2>무엇을, 왜 만들까?</h2></aside>
            <div className="sl-detail-copy"><h3>무엇을 만들었나</h3><p>{p.summary}</p><h3>왜 만들었나</h3><p>{p.motivation}</p><h3>사용한 기술</h3><p>{p.technology}</p></div>
          </div>
        </section>
        <section className="sl-section sl-research-evidence" id="research-record">
          <div className="sl-container sl-detail-columns">
            <aside>
              <span className="sl-kicker">RESEARCH & EVIDENCE</span>
              <h2>연구 질문과 공개 근거</h2>
              <p>구현 시연과 사람을 대상으로 검증한 연구 결과는 다른 종류의 자료입니다.</p>
            </aside>
            <div className="sl-evidence-grid">
              <article><span>01 / 연구 질문</span><h3>{p.researchQuestion}</h3></article>
              <article><span>02 / 접근 방법</span><h3>{p.researchMethod}</h3></article>
              <article><span>03 / 현재 검증 상태</span><h3>{p.verification}</h3></article>
              <article><span>04 / 공개 가능한 결과물</span><h3>{p.outputEvidence}</h3>
                <a className="sl-text-link" href={`https://github.com/Jxny0ung/ddalkak-lab-hai/blob/main/${p.sourcePath}`} target="_blank" rel="noopener noreferrer">관련 구현 코드 보기 ↗</a>
              </article>
              <p className="sl-evidence-grid__note">연구 참여자·결과 수치·논문이나 수료증은 확인된 자료가 있을 때만 연결합니다. <Link href="/archive">공개 기록 원칙 살펴보기 ↗</Link></p>
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft">
          <div className="sl-container sl-detail-columns">
            <aside><span className="sl-kicker">02 / BUILD PROCESS</span><h2>어떻게 만들까?</h2></aside>
            <ol className="sl-build-steps">{p.process.map((step,i)=><li key={step}><span>{String(i+1).padStart(2,"0")}</span><p>{step}</p></li>)}</ol>
          </div>
        </section>
        <section className="sl-section">
          <div className="sl-container sl-detail-columns">
            <aside><span className="sl-kicker">03 / TROUBLESHOOTING</span><h2>이런 시행착오가 생길 수 있습니다.</h2><p>아래는 학습용 오류 시나리오이며, 모두가 실제로 겪은 작업 로그는 아닙니다.</p></aside>
            <div className="sl-issues">{p.pitfalls.map((item,i)=><article key={i}><h3>예상 문제 {String(i+1).padStart(2,"0")}: {item.symptom}</h3><p><strong>원인</strong> {item.cause}</p><p><strong>해결 방향</strong> {item.solution}</p></article>)}</div>
          </div>
        </section>
        <section className="sl-section sl-section-soft" id="try">
          <div className="sl-container">
            <div className="sl-section-head"><div><span className="sl-kicker">04 / TRY IT YOURSELF</span><h2>이제 직접 실행해보세요.</h2><p>브라우저 데모, 연구용 프로토타입, 기획 예시를 구분해 안내합니다. 민감정보·API 키는 입력하지 마세요.</p></div></div>
            <LearningDemo visual={p.visual} />
          </div>
        </section>
        <section className="sl-section">
          <div className="sl-container sl-detail-columns">
            <aside><span className="sl-kicker">05 / REFLECT & IMPROVE</span><h2>무엇을 배울 수 있을까?</h2></aside>
            <div className="sl-detail-copy"><ul className="sl-learnings">{p.learning.map(x=><li key={x}>{x}</li>)}</ul><h3>현재 한계</h3><p>{p.limitations}</p><Link className="sl-text-link" href="/learn">관련 학습 자료 보기 ↗</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter/>
    </>
  );
}
