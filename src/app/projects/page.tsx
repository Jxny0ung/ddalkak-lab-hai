import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectVisual } from "@/components/project-visual";
import { projectCategories, studentProjects } from "@/lib/student-content";

export const metadata: Metadata = {
  title: "Projects",
  description: "직접 따라할 수 있는 AI 실습 예시, 제작 과정, 시행착오와 연구 실험 목록",
};

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const activeCategory = projectCategories.find((c)=>c === category);
  const visible = activeCategory ? studentProjects.filter((p)=>p.category===activeCategory) : studentProjects;
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="sl-main sl-interior">
        <section className="sl-page-top"><div className="sl-container">
          <span className="sl-kicker">PROJECTS / BUILD & LEARN</span>
          <h1>우리가 만들고,<br/>다시 만들어볼 것들.</h1>
          <p>작동하는 데모와 기획 예시를 구분하고, 각 프로젝트의 만들기 과정과 흔한 문제를 함께 기록합니다.</p>
        </div></section>
        <section className="sl-section">
          <div className="sl-container">
            <nav className="sl-filter" aria-label="프로젝트 카테고리">
              <Link className={!activeCategory ? "selected":""} href="/projects">전체 ({studentProjects.length})</Link>
              {projectCategories.map((c)=><Link className={activeCategory===c?"selected":""} key={c} href={`/projects?category=${encodeURIComponent(c)}`}>{c} ({studentProjects.filter(p=>p.category===c).length})</Link>)}
            </nav>
            <p className="sl-results">{visible.length}개의 항목 · 제공 상태를 확인하고 시작하세요.</p>
            <div className="sl-project-grid sl-all-projects">
              {visible.map((p)=><Link className="sl-project-card" href={`/projects/${p.slug}`} key={p.slug}>
                <ProjectVisual visual={p.visual} />
                <div className="sl-project-card-body">
                  <div className="sl-project-tags"><span>{p.category}</span><span>{p.status}</span></div>
                  <h2>{p.title}</h2><p>{p.subtitle}</p>
                  <div className="sl-project-tech">{p.technology}<span aria-hidden="true">↗</span></div>
                </div>
              </Link>)}
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft">
          <div className="sl-container sl-small-callout"><div><span className="sl-kicker">BUILD NOTES</span><h2>프로젝트는 완성 화면보다 과정이 중요합니다.</h2></div><p>학습용 실패 사례는 실제로 겪은 문제와 혼동하지 않도록 예시로 표시합니다. 새로운 결과물을 등록할 때는 구현 상태, 소스, 검증 조건을 함께 남깁니다.</p></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
