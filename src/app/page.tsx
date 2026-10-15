import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CoreHeroVisual } from "@/components/core-hero-visual";
import { AgentCompanyOverview } from "@/components/agent-company-overview";
import { featuredWork } from "@/lib/featured-work";
import { studentResearchers } from "@/lib/researchers";
import { labPrograms } from "@/lib/lab-programs";

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
  return (
    <>
      <SiteHeader />
      <main className="sl-main" id="main-content">
        <section className="sl-hero">
          <div className="sl-container sl-hero-layout">
            <div className="sl-hero-copy">
              <span className="sl-eyebrow">모두의 딸깍 연구소 · HUMAN–AI INTERACTION LAB</span>
              <h1>AI를 연구하고, 읽고,<br /><em>직접 만들어봅니다.</em></h1>
              <p>사람과 AI의 상호작용을 직접 탐구합니다.</p>
              <div className="sl-actions">
                <Link className="sl-btn sl-btn-dark" href="/work">연구소 활동 살펴보기 <span aria-hidden="true">↗</span></Link>
                <Link className="sl-btn sl-btn-outline" href="/about">연구소 소개</Link>
              </div>
            </div>
            <CoreHeroVisual />
          </div>
        </section>

        <section className="sl-section sl-section-soft" id="what-we-do">
          <div className="sl-container sl-intro-grid">
            <div><span className="sl-kicker">WHAT WE DO</span><h2>보고 끝내지 않고,<br/>직접 만들어봅니다.</h2></div>
            <p>우리는 인간과 AI가 만나고 협력하는 방식을 관찰하고, 질문을 만들고, 직접 실험합니다. 연구 주제와 방법은 질문에 따라 계속 확장됩니다.</p>
          </div>
        </section>

        <section className="sl-section pg-home-programs" id="programs" aria-labelledby="pg-home-programs-title">
          <div className="sl-container">
            <div className="sl-section-head">
              <div>
                <span className="sl-kicker">CURRENT LAB ACTIVITIES</span>
                <h2 id="pg-home-programs-title">지금 진행 중인 탐구와 실험</h2>
                <p>현재 기록 중인 활동을 소개합니다. 이 목록은 연구소의 범위를 제한하지 않으며, 새로운 질문과 프로젝트를 계속 추가합니다.</p>
              </div>
              <Link className="sl-text-link" href="/work">전체 활동 보기 <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="pg-home-grid">
              {labPrograms.map((program) => (
                <Link className="pg-home-track" href={program.href} key={program.id}>
                  <span className="pg-home-track__top"><span>{program.index} / {program.eyebrow}</span><span aria-hidden="true">↗</span></span>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <span className={program.id === "games" ? "pg-pill pg-pill--active" : "pg-pill"}>{program.status}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="sl-section hai-feature-section" id="featured">
          <div className="sl-container">
            <div className="sl-section-head">
              <div>
                <span className="sl-kicker">FEATURED PROJECTS</span>
                <h2>우리가 지금 탐구하고 만드는 것들</h2>
                <p>실제로 공개된 결과물과 진행 중인 연구를 구분합니다. 새로운 프로젝트도 계속 추가됩니다.</p>
              </div>
              <Link className="sl-text-link" href="/projects">모든 프로젝트 보기 <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="hai-feature-grid">
              {featuredWork.map((project) => (
                <Link className={`hai-feature-card hai-feature-card--${project.art}`} href={project.href} key={project.index}>
                  <div className="hai-feature-card__graphic" aria-hidden="true">
                    <span className="hai-feature-card__number">{project.index} / HAI</span>
                    <span className="hai-feature-card__shape" />
                    <span className="hai-feature-card__artlabel">{project.eyebrow}</span>
                  </div>
                  <div className="hai-feature-card__body">
                    <div className="hai-feature-card__meta"><span>{project.status}</span><span aria-hidden="true">↗</span></div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <strong>프로젝트 살펴보기 <span aria-hidden="true">↗</span></strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="sl-section sl-section-soft sl-team-home" aria-labelledby="sl-team-home-title">
          <div className="sl-container sl-team-home__layout">
            <div>
              <span className="sl-kicker">PEOPLE / OUR RESEARCHERS</span>
              <h2 id="sl-team-home-title">관심은 다르지만,<br />질문은 함께 만듭니다.</h2>
              <p>정보와 사회, 인간과 AI의 상호작용, 금융과 사용자 경험. 서로 다른 시선으로 질문을 나누는 학부 연구생들을 소개합니다.</p>
              <Link className="sl-text-link" href="/people">학부 연구생 만나기 <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="sl-team-home__names">
              {studentResearchers.map((person, i) => (
                <Link key={person.id} href={`/people#${person.id}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{person.name}</strong>
                  <span>{person.focus.join(" · ")}</span>
                  <span aria-hidden="true">↗</span>
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

        <section className="sl-research-bridge" aria-labelledby="sl-research-bridge-title">
          <div className="sl-container">
            <div className="sl-research-bridge__top">
              <div>
                <span className="sl-kicker">RESEARCH BEHIND THE BUILD</span>
                <h2 id="sl-research-bridge-title">무엇을 만들지보다,<br/>무엇을 검증할지 먼저 묻습니다.</h2>
              </div>
              <p>모든 프로젝트는 사람과 AI의 상호작용이라는 연구 질문에서 출발합니다. 확인된 결과와 실험·설계 단계의 기록은 구분해 공개합니다.</p>
            </div>
            <div className="sl-research-bridge__grid">
              <Link href="/research">
                <span>01 / RESEARCH</span>
                <h3>연구 질문 찾기 <span aria-hidden="true">↗</span></h3>
                <p>인간–AI 협업, 정보 신뢰, 플랫폼과 의사결정의 연결을 탐색합니다.</p>
              </Link>
              <Link href="/methods">
                <span>02 / METHODS</span>
                <h3>검증 방법 설계하기 <span aria-hidden="true">↗</span></h3>
                <p>실험, 설문, 콘텐츠 분석, 계산적 분석과 사용성 평가를 다룹니다.</p>
              </Link>
              <Link href="/registry">
                <span>03 / REGISTRY</span>
                <h3>계획과 결과 구분하기 <span aria-hidden="true">↗</span></h3>
                <p>질문·변수·AI 사용·변경 이력과 공개 상태를 기록하는 원칙입니다.</p>
              </Link>
              <Link href="/outputs">
                <span>04 / OUTPUTS</span>
                <h3>근거와 산출물 확인하기 <span aria-hidden="true">↗</span></h3>
                <p>공개된 코드와 연구 문서를 연결하고, 아직 없는 성과는 구분합니다.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="sl-section sl-section-soft">
          <div className="sl-container sl-split">
            <div><span className="sl-kicker">START LEARNING</span><h2>HAI 연구를 시작할 때,<br/>질문에서 실험까지.</h2><p>연구 질문, 검증 방법, 실제 인터랙션을 차례로 살펴보세요.</p><Link className="sl-btn sl-btn-dark" href="/learn">학습 자료 살펴보기 ↗</Link></div>
            <div className="sl-learning-list">
              <Link href="/research"><span>01</span><strong>HAI 연구 질문 살펴보기</strong><span>Research ↗</span></Link>
              <Link href="/methods"><span>02</span><strong>실험과 검증 방법 익히기</strong><span>Methods ↗</span></Link>
              <Link href="/lab"><span>03</span><strong>상호작용 프로토타입 체험</strong><span>HAI Lab ↗</span></Link>
            </div>
          </div>
        </section>

        <AgentCompanyOverview />

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
