import Link from "next/link";
import { ReactorCore } from "@/components/reactor-core";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  agenda,
  methods,
  projects,
  researchAreas,
  workflow,
} from "@/lib/content";

const systemLinks = [
  {
    index: "01",
    title: "Registry",
    label: "Pre-commit the question",
    description:
      "연구 질문, 가설, 표본, 변수와 분석 계획을 결과보다 먼저 기록합니다.",
    href: "/registry",
  },
  {
    index: "02",
    title: "Handbook",
    label: "Make the process legible",
    description:
      "AI 사용, 데이터 관리, 재현성, 공개 기준을 살아 있는 운영 문서로 관리합니다.",
    href: "/handbook",
  },
  {
    index: "03",
    title: "Archive",
    label: "Leave an audit trail",
    description:
      "공개 가능한 코드, 방법 노트, 재현 기록과 검증된 결과를 단계별로 축적합니다.",
    href: "/archive",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero hero--redesign" id="top">
          <div className="hero-grid">
            <div className="hero-copyblock">
              <div className="eyebrow-row">
                <span className="eyebrow">Business × Media × HAI</span>
                <span className="live-pill">
                  <i aria-hidden="true" />
                  CORE prototype online
                </span>
              </div>

              <h1 className="hero-title hero-title--redesign">
                <span>인간과 AI가</span>
                <span className="hero-title__accent">함께 판단하는</span>
                <span>방식을 연구합니다.</span>
              </h1>

              <div className="hero-bottom hero-bottom--redesign">
                <p className="hero-copy">
                  딸깍 연구소는 경영학과 미디어커뮤니케이션의 질문을
                  Human–AI Interaction의 관점에서 연결하고, 아이디어를
                  검증 가능한 연구 과정으로 바꾸는 학부 연구 프로젝트입니다.
                </p>

                <div className="hero-actions">
                  <Link className="button-primary" href="/research">
                    Explore research <span aria-hidden="true">↗</span>
                  </Link>
                  <Link className="button-ghost" href="/projects">
                    View projects
                  </Link>
                </div>
              </div>

              <div className="hero-facts" aria-label="DDALKAK LAB overview">
                <div>
                  <strong>{String(researchAreas.length).padStart(2, "0")}</strong>
                  <span>Research axes</span>
                </div>
                <div>
                  <strong>{String(methods.length).padStart(2, "0")}</strong>
                  <span>Method families</span>
                </div>
                <div>
                  <strong>{String(workflow.length).padStart(2, "0")}</strong>
                  <span>Workflow stages</span>
                </div>
              </div>
            </div>

            <div className="hero-orbit" aria-hidden="true">
              <div className="orbit-grid" />
              <div className="orbit-ring orbit-ring--outer" />
              <div className="orbit-ring orbit-ring--middle" />
              <div className="orbit-ring orbit-ring--inner" />
              <span className="orbit-node orbit-node--human">HUMAN</span>
              <span className="orbit-node orbit-node--ai">AI</span>
              <span className="orbit-node orbit-node--media">MEDIA</span>
              <span className="orbit-node orbit-node--org">ORG</span>
              <div className="hero-reactor-core">
                <ReactorCore
                  ariaLabel="DDALKAK LAB rotating energy core"
                  eyebrow="DDALKAK"
                  label="CORE"
                  size="panel"
                />
                <span className="hero-reactor-core__caption">
                  HUMAN × AI SIGNAL CORE
                </span>
              </div>
              <span className="orbit-caption">OBSERVE / TEST / VERIFY / SHARE</span>
            </div>
          </div>
        </section>

        <div className="signal-marquee" aria-hidden="true">
          <div className="signal-marquee__track">
            <span>HUMAN–AI INTERACTION</span>
            <i>✦</i>
            <span>MEDIA & TRUST</span>
            <i>✦</i>
            <span>PLATFORM INCENTIVES</span>
            <i>✦</i>
            <span>COMPUTATIONAL COMMUNICATION</span>
            <i>✦</i>
            <span>HUMAN–AI INTERACTION</span>
            <i>✦</i>
            <span>MEDIA & TRUST</span>
            <i>✦</i>
          </div>
        </div>

        <section className="section research-showcase" id="research">
          <div className="section-heading section-heading--display">
            <span>01 / Research field</span>
            <div>
              <p className="section-overline">QUESTION BEFORE TOOL</p>
              <h2>
                서로 다른 학문의 질문을
                <br />
                하나의 <em>interaction</em>으로 봅니다.
              </h2>
            </div>
          </div>

          <div className="research-mosaic">
            {researchAreas.map((area, index) => (
              <article
                className={index === 0 ? "research-tile research-tile--feature" : "research-tile"}
                key={area.code}
              >
                <div className="research-tile__top">
                  <span className="card-index">{area.code}</span>
                  <span className="research-tile__arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div className="research-tile__body">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
                <Link
                  className="research-tile__link"
                  href={`/research#${area.slug}`}
                  aria-label={`${area.title} 자세히 보기`}
                >
                  Open field
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section agenda-section agenda-section--redesign">
          <div className="agenda-intro">
            <span className="eyebrow">Current agenda / 2026</span>
            <h2>지금 질문을 만들고 있는 교차점.</h2>
            <p>
              연구 주제는 고정된 카테고리가 아니라 서로 부딪히는 문제의
              교차점에서 시작합니다.
            </p>
          </div>

          <div className="agenda-stack">
            {agenda.map((item, index) => (
              <div className="agenda-row" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
                <i aria-hidden="true">↗</i>
              </div>
            ))}
          </div>
        </section>

        <section className="section methods-section methods-section--redesign" id="methods">
          <div className="method-spotlight">
            <div className="method-spotlight__intro">
              <span className="eyebrow">02 / Methods</span>
              <h2>
                아이디어가 아니라
                <br />
                <em>증거의 구조</em>를 설계합니다.
              </h2>
              <p>
                실험, 내용분석, 텍스트 분석, 행동 데이터와 HAI 방법을
                연구 질문에 맞춰 조합하고, AI 사용 자체도 검증 대상으로 봅니다.
              </p>
              <Link className="button-on-dark" href="/methods">
                Methods system <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="method-rail">
              {methods.map((method, index) => (
                <article key={method.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{method.title}</h3>
                    <p>{method.output}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section workflow-section workflow-section--redesign" id="workflow">
          <div className="section-heading section-heading--display">
            <span>03 / Workflow</span>
            <div>
              <p className="section-overline">RESEARCH OPERATING LOOP</p>
              <h2>Explore → Rebuild → Improve → Share</h2>
            </div>
          </div>

          <div className="workflow-path">
            {workflow.map((item, index) => (
              <article className="workflow-step" key={item.title}>
                <div className="workflow-step__index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section project-stage" id="projects">
          <div className="section-heading section-heading--display">
            <span>04 / Project board</span>
            <div>
              <p className="section-overline">STATUS, NOT HYPE</p>
              <h2>진행 상태가 보이는 연구 프로젝트.</h2>
            </div>
          </div>

          <div className="project-stage__grid">
            {projects.map((project, index) => (
              <article className="project-stage__card" key={project.title}>
                <div className="project-stage__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className={`status-chip status-chip--${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <small>{project.note}</small>
              </article>
            ))}
          </div>

          <div className="section-link">
            <Link className="button-ghost" href="/projects">
              Open full project board <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="section core-lab-section" id="hai-lab">
          <div className="core-lab">
            <div className="core-lab__visual" aria-hidden="true">
              <div className="core-lab__halo core-lab__halo--outer" />
              <div className="core-lab__halo core-lab__halo--inner" />
              <div className="core-lab__reactor">
                <ReactorCore
                  active
                  ariaLabel="DDALKAK CORE active research interface"
                  eyebrow="DDALKAK"
                  label="CORE"
                  size="hq"
                />
              </div>

              <span className="core-lab__node core-lab__node--trust">TRUST</span>
              <span className="core-lab__node core-lab__node--reason">REASONING</span>
              <span className="core-lab__node core-lab__node--decision">DECISION</span>
              <span className="core-lab__node core-lab__node--collab">COLLAB</span>

              <div className="core-lab__telemetry">
                <span>SIGNAL / HUMAN × AI</span>
                <strong>CORE ONLINE</strong>
                <small>visual research interface · local prototype</small>
              </div>
            </div>

            <div className="core-lab__copy">
              <p className="eyebrow">05 / DDALKAK CORE · HAI Lab</p>
              <h2>
                사람의 의도를
                <br />
                <em>AI와 도구 사이의 신호</em>로 바꿉니다.
              </h2>
              <p className="core-lab__lead">
                DDALKAK CORE는 인간–AI 상호작용, 연구 방법론, 실험 설계와
                에이전트 협업을 하나의 인터페이스로 연결하는 연구소의 상징이자
                프로토타입입니다.
              </p>

              <div className="core-lab__modules">
                <article>
                  <span>01 / HAI LAB</span>
                  <h3>Clap → Intent</h3>
                  <p>
                    사용자가 직접 마이크를 허용한 뒤 두 번의 박수를 의도 신호로
                    감지합니다. 오디오는 서버로 전송하지 않고 브라우저에서 로컬 분석합니다.
                  </p>
                </article>
                <article>
                  <span>02 / AGENT COMPANY</span>
                  <h3>Intent → Agent → Tool</h3>
                  <p>
                    Research, Analysis, Build, Ops 역할을 분리하고, 향후 MCP gateway에서
                    승인·라우팅·감사 로그를 거쳐 도구를 호출하는 구조를 설계합니다.
                  </p>
                </article>
              </div>

              <div className="core-lab__architecture" aria-label="DDALKAK CORE future workflow">
                <span>Human signal</span>
                <i aria-hidden="true">→</i>
                <span>DDALKAK CORE</span>
                <i aria-hidden="true">→</i>
                <span>Agent router</span>
                <i aria-hidden="true">→</i>
                <span>MCP tools</span>
              </div>

              <div className="core-lab__actions">
                <Link className="button-primary" href="/lab">
                  Enter HAI Lab <span aria-hidden="true">↗</span>
                </Link>
                <Link className="button-ghost" href="/lab#ai-company">
                  View Agent Company
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section system-section">
          <div className="system-section__intro">
            <span className="eyebrow">06 / Research OS</span>
            <h2>
              질문부터 공개까지,
              <br />
              연구의 <em>운영체계</em>를 만듭니다.
            </h2>
            <p>
              DDALKAK LAB은 결과 페이지가 아니라 연구가 어떻게 만들어졌는지
              추적할 수 있는 구조를 목표로 합니다.
            </p>
          </div>

          <div className="system-links">
            {systemLinks.map((item) => (
              <Link className="system-card" href={item.href} key={item.title}>
                <div className="system-card__top">
                  <span>{item.index}</span>
                  <i aria-hidden="true">↗</i>
                </div>
                <p>{item.label}</p>
                <h3>{item.title}</h3>
                <small>{item.description}</small>
              </Link>
            ))}
          </div>
        </section>

        <section className="section manifesto-section">
          <div className="manifesto-line">
            <span>QUESTION</span>
            <i>→</i>
            <span>METHOD</span>
            <i>→</i>
            <span>EVIDENCE</span>
            <i>→</i>
            <span>RECORD</span>
          </div>

          <div className="manifesto-copy">
            <p>
              AI를 보여주는 사이트보다,
              <br />
              <strong>AI를 연구하는 과정을 보여주는 사이트.</strong>
            </p>
            <Link className="button-primary" href="/about">
              About the lab <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
