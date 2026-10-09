import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectCard } from "@/components/project-card";
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
          <p>프로젝트마다 연구 질문, 접근 방법, 구현 상태를 구분합니다. 카드 전체를 눌러 상세 기록과 실제 데모를 확인하세요.</p>
        </div></section>
        <section className="sl-section">
          <div className="sl-container">
            <nav className="sl-filter" aria-label="프로젝트 카테고리">
              <Link className={!activeCategory ? "selected":""} href="/projects">전체 ({studentProjects.length})</Link>
              {projectCategories.map((c)=><Link className={activeCategory===c?"selected":""} key={c} href={`/projects?category=${encodeURIComponent(c)}`}>{c} ({studentProjects.filter(p=>p.category===c).length})</Link>)}
            </nav>
            <p className="sl-results">{visible.length}개의 항목 · 제공 상태를 확인하고 시작하세요.</p>
            {visible.length === 0 ? (
              <div className="sl-empty-state" role="status">
                <span className="sl-kicker">NOT YET PUBLISHED</span>
                <h2>{activeCategory} 분야의 공개된 프로젝트가 아직 없습니다.</h2>
                <p>실제로 준비된 프로젝트를 확인한 뒤 공개합니다. 다른 분야의 작동하는 데모와 연구 실험을 먼저 살펴보세요.</p>
                <div className="sl-actions">
                  <Link className="sl-btn sl-btn-dark" href="/projects">전체 프로젝트 보기 ↗</Link>
                  <Link className="sl-btn sl-btn-outline" href="/learn">실습 가이드 보기</Link>
                </div>
              </div>
            ) : (
            <div className="sl-project-grid sl-all-projects">
              {visible.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
            )}
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
