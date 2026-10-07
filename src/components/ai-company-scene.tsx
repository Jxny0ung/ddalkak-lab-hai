import Link from "next/link";

const departments = [
  {
    code: "R01",
    title: "Research",
    subtitle: "Question desk",
    character: "Scout",
    className: "company-dept company-dept--research",
  },
  {
    code: "A02",
    title: "Analysis",
    subtitle: "Evidence desk",
    character: "Analyst",
    className: "company-dept company-dept--analysis",
  },
  {
    code: "B03",
    title: "Build",
    subtitle: "Prototype desk",
    character: "Builder",
    className: "company-dept company-dept--build",
  },
  {
    code: "O04",
    title: "Ops",
    subtitle: "Release desk",
    character: "Operator",
    className: "company-dept company-dept--ops",
  },
];

const tools = ["GitHub", "Drive", "Browser", "Calendar", "Vercel"];

export function AiCompanyScene() {
  return (
    <section className="ai-company">
      <div className="ai-company__intro">
        <div>
          <p className="eyebrow">Future Company / MCP-ready concept</p>
          <h2>
            귀여운 작은 AI 회사가
            <br />
            <em>도구를 오가며 일하는 모습.</em>
          </h2>
        </div>
        <p>
          지금은 시각화된 프로토타입입니다. 실제 자율 실행, 외부 계정 접근,
          MCP tool call은 아직 연결하지 않았고, 향후 권한·감사 로그·승인 게이트를
          갖춘 구조로 확장합니다.
        </p>
      </div>

      <div className="company-stage" aria-label="DDALKAK AI company concept diagram">
        <div className="company-stage__grid" aria-hidden="true" />

        <div className="company-hq">
          <div className="company-hq__halo" aria-hidden="true" />
          <span>MCP</span>
          <strong>GATEWAY</strong>
          <small>permission · routing · logs</small>
        </div>

        <div className="company-conduit company-conduit--h" aria-hidden="true" />
        <div className="company-conduit company-conduit--v" aria-hidden="true" />

        {departments.map((dept, index) => (
          <article className={dept.className} key={dept.code}>
            <div className="company-dept__head">
              <span>{dept.code}</span>
              <i aria-hidden="true" />
            </div>

            <div className={`tiny-agent tiny-agent--${index + 1}`} aria-hidden="true">
              <div className="tiny-agent__antenna" />
              <div className="tiny-agent__head">
                <span className="tiny-agent__eye" />
                <span className="tiny-agent__eye" />
                <i />
              </div>
              <div className="tiny-agent__body">
                <span />
              </div>
              <div className="tiny-agent__shadow" />
            </div>

            <div className="company-dept__copy">
              <p>{dept.subtitle}</p>
              <h3>{dept.title}</h3>
              <small>{dept.character}</small>
            </div>
          </article>
        ))}

        <div className="tool-dock">
          <span className="tool-dock__label">TOOLS / FUTURE MCP</span>
          <div className="tool-dock__items">
            {tools.map((tool, index) => (
              <span key={tool}>
                <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="company-packet company-packet--1" aria-hidden="true">
          ●
        </div>
        <div className="company-packet company-packet--2" aria-hidden="true">
          ●
        </div>
        <div className="company-packet company-packet--3" aria-hidden="true">
          ●
        </div>
      </div>

      <div className="ai-company__architecture">
        <div>
          <span>01</span>
          <strong>User intent</strong>
          <small>clap · click · text</small>
        </div>
        <i aria-hidden="true">→</i>
        <div>
          <span>02</span>
          <strong>DDALKAK CORE</strong>
          <small>interpret · plan</small>
        </div>
        <i aria-hidden="true">→</i>
        <div>
          <span>03</span>
          <strong>MCP Gateway</strong>
          <small>approve · route · log</small>
        </div>
        <i aria-hidden="true">→</i>
        <div>
          <span>04</span>
          <strong>Tools</strong>
          <small>act · return evidence</small>
        </div>
      </div>

      <div className="ai-company__links">
        <Link className="button-ghost" href="/system">
          Research system ↗
        </Link>
        <a
          className="button-ghost"
          href="https://github.com/modelcontextprotocol/typescript-sdk"
          rel="noreferrer"
          target="_blank"
        >
          MCP TypeScript SDK ↗
        </a>
      </div>
    </section>
  );
}
