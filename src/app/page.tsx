[Reading 210 lines from start (total: 210 lines, 0 remaining)]

const researchAreas = [
  {
    code: "01",
    title: "Human–AI Interaction",
    description:
      "사람이 생성형 AI와 함께 탐색하고 판단하고 창작하는 과정에서 상호작용 방식이 신뢰, 태도, 성과에 어떤 차이를 만드는지 살펴봅니다.",
  },
  {
    code: "02",
    title: "Media, Information & Trust",
    description:
      "AI가 정보 노출, 뉴스 소비, 허위정보와 팩트체킹, 메시지 처리와 표현을 어떻게 바꾸는지 커뮤니케이션 관점에서 분석합니다.",
  },
  {
    code: "03",
    title: "Platforms, Incentives & Management",
    description:
      "플랫폼의 인센티브 구조, AI 협업, 조직 의사결정과 시장 반응을 경영학의 질문과 연결해 연구합니다.",
  },
  {
    code: "04",
    title: "Computational Communication",
    description:
      "텍스트·플랫폼 데이터를 수집하고 분석해 인간–AI–미디어의 상호작용을 관찰 가능한 데이터로 바꿉니다.",
  },
];

const methods = [
  ["Experiment & Survey", "온라인 실험과 설문을 통해 인과관계와 태도·행동 변화를 검증합니다."],
  ["Content Analysis", "명확한 코드북과 표본 설계를 바탕으로 메시지와 콘텐츠를 체계적으로 분석합니다."],
  ["Text & Computational Analysis", "텍스트 마이닝, NLP, LLM 보조 분석을 연구 질문에 맞게 적용합니다."],
  ["Behavioral Data", "클릭, 선택, 로그와 같은 행동 데이터를 통해 실제 상호작용 패턴을 살펴봅니다."],
  ["HAI / Usability", "과업 수행, 인터뷰, 사용성 관찰을 결합해 AI와의 상호작용 경험을 분석합니다."],
  ["Mixed Methods", "정량·정성 자료를 교차 검증해 하나의 방법으로 놓치기 쉬운 맥락을 보완합니다."],
];

const workflow = [
  ["Explore", "논문과 사례에서 질문을 찾고, 재현할 가치가 있는 메커니즘을 선별합니다."],
  ["Rebuild", "연구 설계와 AI 워크플로를 작은 단위로 다시 구현합니다."],
  ["Improve", "실패 지점과 한계를 기록하고 설계·측정·인터랙션을 개선합니다."],
  ["Share", "코드, 방법, 판단 근거와 배운 점을 재현 가능한 형태로 남깁니다."],
];

const agenda = [
  "Misinformation & Fact-checking",
  "Algorithmic Curation",
  "Human–AI Collaboration",
  "Platform Governance & Incentives",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="DDALKAK LAB home">
          DDALKAK LAB
        </a>
        <nav aria-label="Primary navigation">
          <a href="#research">Research</a>
          <a href="#methods">Methods</a>
          <a href="#workflow">Workflow</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#about">About</a>
        </nav>
      </header>

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
            Undergraduate Research Collective
            <br />
            Seoul, Korea · 2026 —
          </p>
        </div>
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
      </section>

      <section className="section agenda-section" aria-labelledby="agenda-title">
        <div className="section-heading compact-heading">
          <span>Current Agenda</span>
          <h2 id="agenda-title">
            지금 우리가 질문을 만들고 있는 네 개의 교차점
          </h2>
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
          {methods.map(([title, description], index) => (
            <article className="method-item" key={title}>
              <span className="method-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section workflow-section" id="workflow">
        <div className="section-heading">
          <span>03 / Workflow</span>
          <h2>Explore → Rebuild → Improve → Share</h2>
        </div>
        <div className="workflow-grid">
          {workflow.map(([title, description], index) => (
            <article className="workflow-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="roadmap">
        <div className="section-heading">
          <span>04 / Roadmap</span>
          <h2>연구소 사이트를 살아 있는 연구 기록으로 발전시킵니다.</h2>
        </div>
        <div className="roadmap">
          <article>
            <span className="status">NOW · BUILDING</span>
            <h3>Research Platform v0.1</h3>
            <p>
              연구 질문, 방법론, 선행연구, 실험 설계와 연구 로그를 한곳에서
              축적할 수 있는 기본 플랫폼을 구축합니다.
            </p>
          </article>
          <article>
            <span className="status">NEXT · REPLICATION</span>
            <h3>HAI Method Sprint</h3>
            <p>
              선행연구의 핵심 설계를 재구성하고 작은 파일럿으로 실행해
              측정과 재현의 문제를 직접 확인합니다.
            </p>
          </article>
          <article>
            <span className="status">THEN · ARCHIVE</span>
            <h3>Open Research Archive</h3>
            <p>
              성공 결과뿐 아니라 실패, 수정, 판단 근거까지 남겨 다음 연구자가
              다시 사용할 수 있는 기록을 만듭니다.
            </p>
          </article>
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
            <div><span>01</span><p>질문을 먼저 정하고 도구는 그다음에 선택합니다.</p></div>
            <div><span>02</span><p>재현 가능한 기록과 명확한 근거를 남깁니다.</p></div>
            <div><span>03</span><p>AI가 만든 결과를 연구 결과와 혼동하지 않습니다.</p></div>
          </div>
        </div>
      </section>

      <footer>
        <div className="brand">DDALKAK LAB</div>
        <p>Business × Media & Communication × Human–AI Interaction</p>
        <p>© 2026 DDALKAK LAB</p>
      </footer>
    </main>
  );
}

[executed on device: DESKTOP-SPQVV5S (c1e4473b-97e1-4ad4-b789-92ac2f03e3a9)]