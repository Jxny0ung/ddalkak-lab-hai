import type { Metadata } from "next";
import Link from "next/link";
import { AiCompanyScene } from "@/components/ai-company-scene";
import { HaiClapConsole } from "@/components/hai-clap-console";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const description =
  "박수 두 번으로 활성화하는 HAI 인터랙션과 MCP-ready AI company concept을 실험하는 DDALKAK LAB의 인터랙션 랩입니다.";

export const metadata: Metadata = {
  title: "HAI Lab",
  description,
  alternates: { canonical: "/lab" },
  openGraph: {
    title: "HAI Lab | DDALKAK LAB",
    description,
    url: "/lab",
  },
};

const principles = [
  {
    index: "01",
    title: "Discoverability",
    text: "사용자가 무엇을 해야 하는지 알 수 있어야 합니다. 박수는 숨겨진 이스터에그가 아니라 명시적 affordance와 함께 제공합니다.",
  },
  {
    index: "02",
    title: "Consent",
    text: "브라우저 마이크 권한은 사용자가 직접 활성화하고 언제든 중단할 수 있어야 합니다.",
  },
  {
    index: "03",
    title: "Feedback",
    text: "첫 박수, 두 번째 박수, 활성화 상태를 시각적으로 보여줘 시스템이 무엇을 감지했는지 알 수 있게 합니다.",
  },
  {
    index: "04",
    title: "Override",
    text: "음성·소리 인식이 실패해도 수동 버튼으로 동일한 기능에 접근할 수 있어야 합니다.",
  },
  {
    index: "05",
    title: "Calibration",
    text: "민감도와 오탐 가능성을 숨기지 않고 사용자가 조절하거나 다시 시도할 수 있게 합니다.",
  },
  {
    index: "06",
    title: "Auditability",
    text: "향후 MCP 연결 시 어떤 도구가 왜 호출되었는지 승인과 실행 로그를 남기는 구조를 전제로 합니다.",
  },
];

const references = [
  {
    title: "Web Audio API",
    type: "Browser primitive",
    text: "현재 clap detector는 별도 오디오 패키지 없이 브라우저의 AnalyserNode로 RMS, peak, 주파수 에너지를 로컬 계산합니다.",
    href: "https://github.com/WebAudio/web-audio-api",
  },
  {
    title: "Meyda",
    type: "Optional audio features",
    text: "향후 spectral centroid, MFCC 등 더 정교한 오디오 특징이 필요할 때 참고할 수 있는 실시간 JavaScript audio feature extraction 라이브러리입니다.",
    href: "https://github.com/meyda/meyda",
  },
  {
    title: "MCP TypeScript SDK",
    type: "Future tool layer",
    text: "향후 DDALKAK CORE와 외부 도구를 표준화된 client/server 구조로 연결할 때 기준으로 삼을 공식 TypeScript SDK입니다.",
    href: "https://github.com/modelcontextprotocol/typescript-sdk",
  },
  {
    title: "MCP Reference Servers",
    type: "Security reference",
    text: "파일·Git·Fetch·Memory 같은 reference server 구조와 함께, production에서는 각 서비스의 보안 요구를 별도로 평가해야 한다는 원칙을 참고합니다.",
    href: "https://github.com/modelcontextprotocol/servers",
  },
  {
    title: "MCP Inspector",
    type: "Test harness",
    text: "향후 실제 MCP server를 붙일 때 Web·CLI·TUI에서 tools, resources, auth와 응답을 점검하는 공식 검사 도구를 테스트 게이트로 사용할 수 있습니다.",
    href: "https://github.com/modelcontextprotocol/inspector",
  },
  {
    title: "Vercel AI SDK",
    type: "Optional app layer",
    text: "모델 스트리밍과 tool-facing UI가 필요해지면 참고할 수 있는 애플리케이션 계층입니다. 현재 clap prototype에는 의존성을 추가하지 않았습니다.",
    href: "https://github.com/vercel/ai",
  },
];

export default function LabPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="HAI Lab"
          title="박수, 움직임, 도구 호출까지—사람과 AI 사이의 인터랙션을 직접 실험합니다."
          description="영화 속 음성 비서의 즉각적인 반응에서 영감을 얻되, 실제 구현은 사용자의 동의·피드백·오류 복구·검증 가능성을 중심으로 다시 설계합니다."
          meta="Clap → Intent → Agent → Tool"
        />

        <nav className="lab-index" aria-label="HAI Lab sections">
          <a href="#clap-interface"><span>01</span> Clap Interface</a>
          <a href="#hai-principles"><span>02</span> HAI Principles</a>
          <a href="#ai-company"><span>03</span> AI Company</a>
          <a href="#lab-references"><span>04</span> References</a>
          <a href="#lab-roadmap"><span>05</span> Roadmap</a>
        </nav>

        <section className="content-section lab-intro-section">
          <div className="lab-intro-grid">
            <div>
              <p className="eyebrow">Prototype 01</p>
              <h2>
                Clap-to-Activate
                <br />
                Human–AI Interface
              </h2>
            </div>
            <div>
              <p>
                브라우저 보안 정책상 페이지가 열리자마자 몰래 마이크를 켤 수는 없습니다.
                먼저 사용자가 마이크를 허용하면, 이후에는 <strong>박수 두 번</strong>을
                하나의 의도 신호로 감지해 DDALKAK CORE를 활성화합니다.
              </p>
              <p>
                지금 버전은 오디오를 서버에 보내지 않는 로컬 프로토타입입니다.
                향후에는 이 활성화 이벤트를 MCP agent router에 넘겨 실제 도구 호출
                워크플로의 시작점으로 사용할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="content-section tone-soft lab-console-section" id="clap-interface">
          <HaiClapConsole />
        </section>

        <section className="content-section lab-principles-section" id="hai-principles">
          <div className="section-heading section-heading--display">
            <span>02 / HAI principles</span>
            <div>
              <p className="section-overline">NOT JUST A GIMMICK</p>
              <h2>멋있는 상호작용을 연구 가능한 상호작용으로 바꿉니다.</h2>
            </div>
          </div>

          <div className="lab-principle-grid">
            {principles.map((item) => (
              <article key={item.index}>
                <span>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section tone-dark lab-company-section" id="ai-company">
          <AiCompanyScene />
        </section>

        <section className="content-section lab-reference-section" id="lab-references">
          <div className="section-heading section-heading--display">
            <span>04 / References</span>
            <div>
              <p className="section-overline">PRACTICAL OPEN SOURCE</p>
              <h2>작게 구현하고, 검증된 공개 자료를 기준점으로 삼습니다.</h2>
            </div>
          </div>

          <div className="lab-reference-grid">
            {references.map((reference, index) => (
              <a
                href={reference.href}
                key={reference.title}
                rel="noreferrer"
                target="_blank"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{reference.type}</p>
                <h3>{reference.title}</h3>
                <small>{reference.text}</small>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className="content-section lab-roadmap-section" id="lab-roadmap">
          <div className="section-heading">
            <span>05 / Roadmap</span>
            <h2>Clap demo에서 실제 AI company orchestration까지</h2>
          </div>

          <div className="lab-roadmap">
            <div>
              <span>NOW</span>
              <strong>Local HAI signal</strong>
              <p>박수 두 번 → 의도 감지 → UI activation</p>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>NEXT</span>
              <strong>Agent router</strong>
              <p>사용자 의도 → 계획 → 승인 가능한 agent task</p>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>LATER</span>
              <strong>MCP tools</strong>
              <p>GitHub · Drive · Browser · Calendar · deployment</p>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>GOAL</span>
              <strong>Auditable AI company</strong>
              <p>권한, 실행, 결과와 책임 경계가 보이는 자동화 조직</p>
            </div>
          </div>

          <div className="lab-roadmap__actions">
            <Link className="button-primary" href="/system">
              View Research OS <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button-ghost" href="/projects">
              Project board
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
