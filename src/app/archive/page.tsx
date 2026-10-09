import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const description =
  "DDALKAK LAB의 공개 가능한 연구 방법, 코드, 로그, 결과물을 단계별로 정리하는 아카이브입니다.";

export const metadata: Metadata = {
  title: "Archive",
  description,
  alternates: { canonical: "/archive" },
  openGraph: {
    title: "Archive | DDALKAK LAB",
    description,
    url: "/archive",
  },
};

const archiveTypes = [
  {
    title: "Research Notes",
    status: "PREPARING",
    text: "선행연구를 읽고 연구 질문으로 전환하는 과정에서 남긴 공개 가능한 개념·방법 노트를 정리합니다.",
  },
  {
    title: "Methods & Protocols",
    status: "PREPARING",
    text: "실험 절차, 코드북, 데이터 사전, 분석 규칙처럼 재사용 가능한 연구 절차를 정리합니다.",
  },
  {
    title: "Code & Reproduction",
    status: "OPEN",
    text: "사이트 코드부터 시작해 공개 가능한 재현 코드와 도구를 GitHub에서 버전 관리합니다.",
  },
  {
    title: "Findings",
    status: "NOT PUBLISHED",
    text: "검증이 끝난 실증 결과가 생기기 전까지 결과를 임의로 채우지 않습니다.",
  },
];

export default function ArchivePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="Archive"
          title="연구의 결과뿐 아니라 과정과 판단 근거를 남깁니다."
          description="아카이브는 빈칸을 억지로 채우지 않습니다. 공개할 수 있는 자료가 실제로 준비된 시점에 상태와 버전을 함께 기록합니다."
          meta="Public archive · staged release"
        />

        <section className="content-section">
          <div className="section-heading">
            <span>01 / Index</span>
            <h2>Archive status</h2>
          </div>
          <div className="archive-grid">
            {archiveTypes.map((item, index) => (
              <article key={item.title}>
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="status">{item.status}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <span>02 / Public outputs</span>
            <h2>증빙으로 연결되는 실제 작업물</h2>
          </div>
          <div className="research-note">
            <strong>Code, prototypes & documentation</strong>
            <p>현재 공개된 작업물은 사이트 코드, 브라우저 프로토타입과 설계 기록입니다. 논문·자격증·수상이나 개인별 포트폴리오는 확인과 공개 동의를 거치기 전까지 임의로 게시하지 않습니다.</p>
            <Link className="text-button" href="/outputs">공개 결과물과 등록 기준 보기 ↗</Link>
          </div>
        </section>

        <section className="content-section tone-dark">
          <div className="section-heading">
            <span>03 / Repository</span>
            <h2>현재 공개된 소스</h2>
          </div>
          <div className="repo-callout">
            <div>
              <p className="eyebrow">GitHub</p>
              <h3>ddalkak-lab-hai</h3>
              <p>
                이 웹사이트의 Next.js 소스와 프로젝트 지침을 공개 저장소에서
                확인할 수 있습니다.
              </p>
            </div>
            <Link
              className="text-button"
              href="https://github.com/Jxny0ung/ddalkak-lab-hai"
              target="_blank"
            >
              Open repository ↗
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
