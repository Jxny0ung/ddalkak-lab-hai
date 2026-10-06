import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "DDALKAK LAB에서 구축 중이거나 계획 중인 연구 프로젝트와 공개 상태를 확인합니다.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Projects"
          title="완성된 결과보다 현재 어디까지 왔는지를 정확하게 표시합니다."
          description="각 프로젝트는 BUILDING, PLANNED 등 현재 상태를 함께 공개합니다. 완료되지 않은 작업을 연구 성과처럼 표현하지 않습니다."
          meta="Status-aware research"
        />

        <section className="content-section">
          <div className="section-heading">
            <span>01 / Current</span>
            <h2>Project board</h2>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article key={project.title}>
                <div className="project-list__top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="status">{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <small>{project.note}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section tone-soft">
          <div className="section-heading">
            <span>02 / Publication rule</span>
            <h2>무엇을 공개하고, 무엇을 공개하지 않는가</h2>
          </div>
          <div className="two-column-copy">
            <div>
              <h3>Public</h3>
              <p>
                연구 질문, 공개 가능한 방법 노트, 재현 코드, 데이터 사전,
                실패·수정 기록, 공개가 허용된 결과물을 단계에 맞게 정리합니다.
              </p>
            </div>
            <div>
              <h3>Private</h3>
              <p>
                참여자 개인정보, 원자료 중 민감 정보, 비공개 이메일, 접근키,
                공개 전 연구 데이터와 동의 없이 공개할 수 없는 자료는 저장소와
                공개 사이트에서 제외합니다.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
