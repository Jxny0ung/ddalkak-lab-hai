import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectVisual } from "@/components/project-visual";
import { CoreMotionShowcase } from "@/components/core-motion-showcase";
import { studentProjects, projectCategories } from "@/lib/student-content";

const workflow = [
  ["01", "Explore", "전 세계의 흥미로운 AI 활용 사례를 발견하고, 무엇이 유용한지 살펴봅니다."],
  ["02", "Rebuild", "화면을 읽고 코드를 이해하며, 작은 버전부터 직접 구현합니다."],
  ["03", "Improve", "작동하지 않는 부분을 기록하고 기능과 사용성을 개선합니다."],
  ["04", "Share", "코드뿐 아니라 만드는 과정과 배운 점을 함께 공유합니다."],
] as const;

const activity = [
  { label: "플랫폼 구축 중", date: "2026.10", title: "Projects·Learn 중심의 실습 플랫폼 개편", description: "실제로 열어보고 따라할 수 있는 데모와 제작 기록 구조를 구축합니다." },
  { label: "연구 실험", date: "진행 중", title: "Clap HAI Interface", description: "동의 기반 박수 인식 실험을 HAI Lab에서 확인할 수 있습니다." },
  { label: "설계 단계", date: "다음 작업", title: "Agent Company와 연구 방법론 기록", description: "에이전트 작업을 실행 결과와 구분하고 검증 기준을 마련합니다." },
] as const;

export default function Home() {
  const featured = studentProjects.slice(0, 3);
  return (
    <>
      <SiteHeader />
      <main className="sl-main" id="main-content">
        <section className="sl-hero">
          <div className="sl-container sl-hero-layout">
            <div className="sl-hero-copy">
              <span className="sl-eyebrow">모두의 딸깍 연구소 · STUDENT LAB</span>
              <h1>AI를 배우는 가장 좋은 방법은 <em>직접 만들어보는 것</em>입니다.</h1>
              <p>생성형 AI 사례를 탐색하고, 직접 구현하고, 나만의 경영·미디어 프로젝트로 발전시킵니다.</p>
              <div className="sl-actions">
                <Link className="sl-btn sl-btn-dark" href="/projects">프로젝트 살펴보기 <span aria-hidden="true">↗</span></Link>
                <Link className="sl-btn sl-btn-outline" href="/about">연구소 소개</Link>
              </div>
              <span className="sl-hero-annotation">작은 실습에서 시작하는 연구와 제작의 기록</span>
            </div>
            <div className="sl-hero-visual">
              <div className="sl-browser-chrome"><span className="sl-window-lights"><i/><i/><i/></span><span>lab / project-preview</span><span className="sl-window-tag">PRACTICE 01</span></div>
              <div className="sl-hero-screen">
                <div className="sl-hero-screen-heading"><span>IDEA WORKSPACE</span><strong>아이디어에서 첫 프로토타입까지</strong></div>
                <div className="sl-hero-screen-grid">
                  <div className="sl-hero-screen-node">문제 발견</div>
                  <div className="sl-hero-screen-node active">핵심 아이디어</div>
                  <div className="sl-hero-screen-node">대상 사용자</div>
                  <div className="sl-hero-screen-node">실행 방법</div>
                  <div className="sl-hero-screen-node">검증 기준</div>
                </div>
                <div className="sl-hero-screen-bottom"><span>Explore → Rebuild → Improve → Share</span><span>↗</span></div>
              </div>
              <p className="sl-visual-caption">프로젝트 인터페이스 예시 · 실제 AI API 연결 화면이 아닙니다.</p>
            </div>
          </div>
        </section>

        <section className="sl-section sl-section-soft" id="what-we-do">
          <div className="sl-container sl-intro-grid">
            <div><span className="sl-kicker">WHAT WE DO</span><h2>보고 끝내지 않고,<br/>직접 만들어봅니다.</h2></div>
            <p>좋은 아이디어를 발견하는 것에서 그치지 않습니다. 작동 원리를 이해하고, 화면과 기능을 재구성하고, 학생의 문제의식에 맞게 다시 설계합니다. 경영학의 문제 해결과 미디어커뮤니케이션의 질문을 함께 가져갑니다.</p>
          </div>
        </section>

        <section className="sl-section" id="featured">
          <div className="sl-container">
            <div className="sl-section-head">
              <div><span className="sl-kicker">FEATURED PROJECTS</span><h2>직접 열어보고 배우는 프로젝트</h2><p>과장된 성공 사례 대신 현재 작동하는 데모와 기획 중인 예시를 정확히 구분합니다.</p></div>
              <Link className="sl-text-link" href="/projects">모든 프로젝트 보기 <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="sl-project-grid">
              {featured.map((project) => (
                <Link className="sl-project-card" key={project.slug} href={`/projects/${project.slug}`}>
                  <ProjectVisual visual={project.visual} />
                  <div className="sl-project-card-body">
                    <div className="sl-project-tags"><span>{project.category}</span><span>{project.status}</span></div>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                    <div className="sl-project-tech">{project.technology}<span aria-hidden="true">↗</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="sl-section sl-section-soft">
          <div className="sl-container">
            <div className="sl-section-head"><div><span className="sl-kicker">HOW WE WORK</span><h2>네 단계로 배우고, 기록합니다.</h2></div></div>
            <div className="sl-steps">
              {workflow.map(([n,title,desc]) => <article className="sl-step" key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}
            </div>
          </div>
        </section>

        <section className="sl-section">
          <div className="sl-container">
            <div className="sl-section-head"><div><span className="sl-kicker">EXPLORE BY CATEGORY</span><h2>관심 분야에서 시작하세요.</h2></div></div>
            <div className="sl-category-list">
              {projectCategories.map((category) => (
                <Link href={`/projects?category=${encodeURIComponent(category)}`} key={category}>
                  <strong>{category}</strong><span>{studentProjects.filter(x=>x.category===category).length}개 항목</span><span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="sl-section sl-section-soft">
          <div className="sl-container sl-split">
            <div><span className="sl-kicker">START LEARNING</span><h2>첫 프로젝트,<br/>혼자서도 시작할 수 있게.</h2><p>실습 목표, 구성 순서, 흔한 오류와 개선 방법을 한 화면에 정리합니다.</p><Link className="sl-btn sl-btn-dark" href="/learn">학습 자료 살펴보기 ↗</Link></div>
            <div className="sl-learning-list">
              <Link href="/projects/idea-map"><span>01</span><strong>아이디어 맵 만들기</strong><span>15분 ↗</span></Link>
              <Link href="/projects/prompt-builder"><span>02</span><strong>프롬프트 구조화하기</strong><span>10분 ↗</span></Link>
              <Link href="/learn#api"><span>03</span><strong>API 키 안전하게 다루기</strong><span>가이드 ↗</span></Link>
            </div>
          </div>
        </section>

        <CoreMotionShowcase />

        <section className="sl-section">
          <div className="sl-container">
            <div className="sl-section-head"><div><span className="sl-kicker">LATEST LAB ACTIVITY</span><h2>연구소의 현재 기록</h2><p>확인할 수 있는 개발·연구 진행 상태만 공개합니다.</p></div><Link className="sl-text-link" href="/lab">HAI Lab 보기 ↗</Link></div>
            <div className="sl-activity-list">
              {activity.map((item)=><article key={item.title}><span>{item.date}</span><div><small>{item.label}</small><h3>{item.title}</h3><p>{item.description}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="sl-join">
          <div className="sl-container"><span className="sl-kicker">JOIN THE LAB</span><h2>보고 끝내지 않고<br/>직접 만들어보고 싶다면.</h2><p>개발 경험보다 중요한 것은 궁금한 것을 직접 실험하고 기록하려는 태도입니다.</p><Link className="sl-btn sl-btn-dark" href="/about">연구소와 참여 방식 알아보기 ↗</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
