import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  agenda,
  methods,
  projects,
  researchAreas,
  workflow,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero" id="top">
          <div className="eyebrow">Business × Media & Communication × HAI</div>
          <h1 className="hero-title">
            <span>인간과 AI가 함께</span>
            <span>생각하는 방식을</span>
            <span>연구합니다.</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-copy">
              딸깍 연구소는 경영학과 미디어커뮤니케이션의 질문을
              Human–AI Interaction의 관점에서 연결하는 학부 연구 프로젝트입니다.
            </p>
            <p className="hero-meta">
              Undergraduate Research Project
              <br />
              Korea · 2026 —
            </p>
          </div>
          <div className="hero-actions" aria-label="Quick links">
            <Link className="text-button" href="/research">
              Research →
            </Link>
            <Link className="text-button" href="/methods">
              Methods →
            </Link>
          </div>
        </section>

        <section className="status-strip" aria-label="Research status">
          <span>STATUS</span>
          <strong>BUILDING</strong>
          <p>
            현재 공개된 내용은 연구 방향·방법·프로젝트 구조입니다. 검증되지 않은
            실증 결과는 게시하지 않습니다.
          </p>
        </section>

        <section className="section" id="research">
          <div className="section-heading">
            <span>01 / Research</span>
            <h2>AI를 도구가 아니라, 인간의 판단을 바꾸는 상호작용 환경으로 봅니다.</h2>
          </div>
          <div className="card-grid research-grid">
            {researchAreas.map((area) => (
              <article className="card" key={area.code}>
                <div className="card-index">{area.code}</div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
          <div className="section-link">
            <Link className="text-button" href="/research">
              연구 질문과 프레이밍 자세히 보기 →
            </Link>
          </div>
        </section>

        <section className="section agenda-section" aria-labelledby="agenda-title">
          <div className="section-heading compact-heading">
            <span>Current Agenda</span>
            <h2 id="agenda-title">지금 질문을 만들고 있는 네 개의 교차점</h2>
          </div>
          <div className="agenda-list">
            {agenda.map((item, index) => (
              <div className="agenda-item" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section methods-section" id="methods">
          <div className="section-heading">
            <span>02 / Methods</span>
            <h2>아이디어를 검증 가능한 연구로 바꾸는 방법을 배웁니다.</h2>
          </div>
          <div className="method-list">
            {methods.slice(0, 4).map((method, index) => (
              <article className="method-item" key={method.title}>
                <span className="method-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{method.title}</h3>
                <p>{method.description}</p>
              </article>
            ))}
          </div>
          <div className="section-link section-link--light">
            <Link className="text-button" href="/methods">
              전체 방법론과 체크리스트 보기 →
            </Link>
          </div>
        </section>

        <section className="section workflow-section" id="workflow">
          <div className="section-heading">
            <span>03 / Workflow</span>
            <h2>Explore → Rebuild → Improve → Share</h2>
          </div>
          <div className="workflow-grid">
            {workflow.map((item, index) => (
              <article className="workflow-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading">
            <span>04 / Projects</span>
            <h2>완료 여부를 숨기지 않는 프로젝트 보드</h2>
          </div>
          <div className="roadmap">
            {projects.map((project) => (
              <article key={project.title}>
                <span className="status">{project.status}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
          <div className="section-link">
            <Link className="text-button" href="/projects">
              프로젝트 상태와 공개 원칙 보기 →
            </Link>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading">
            <span>05 / About</span>
            <h2>AI를 보여주는 사이트보다, 연구하는 과정을 보여주는 사이트.</h2>
          </div>
          <div className="about-grid">
            <p className="wide-copy">
              서로 다른 전공의 언어를 연결해 AI 시대의 인간 행동, 정보와
              커뮤니케이션, 조직과 플랫폼을 함께 설명할 수 있는 연구를 지향합니다.
            </p>
            <div className="principles">
              <div>
                <span>01</span>
                <p>질문을 먼저 정하고 도구는 그다음에 선택합니다.</p>
              </div>
              <div>
                <span>02</span>
                <p>재현 가능한 기록과 명확한 근거를 남깁니다.</p>
              </div>
              <div>
                <span>03</span>
                <p>AI가 만든 결과를 연구 결과와 혼동하지 않습니다.</p>
              </div>
            </div>
          </div>
          <div className="section-link">
            <Link className="text-button" href="/about">
              프로젝트 원칙 자세히 보기 →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
