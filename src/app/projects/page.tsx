import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { featuredWork } from "@/lib/featured-work";

export const metadata: Metadata = {
  title: "Projects",
  description: "모두의 딸깍 연구소가 현재 탐구하고 제작하는 HAI 프로젝트의 공개 상태와 기록",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="sl-main sl-interior">
        <section className="sl-page-top">
          <div className="sl-container">
            <span className="sl-kicker">PROJECTS / HUMAN–AI INTERACTION</span>
            <h1>질문을 만들고,<br />직접 실험합니다.</h1>
            <p>HAI 연구소에서 현재 공개할 수 있는 프로젝트입니다. 목록은 활동 범위를 한정하지 않으며, 실제 성과·프로토타입·계획을 구분합니다.</p>
          </div>
        </section>
        <section className="sl-section hai-feature-section">
          <div className="sl-container">
            <div className="sl-section-head">
              <div>
                <span className="sl-kicker">CURRENT PROJECTS</span>
                <h2>현재의 연구와 제작 기록</h2>
                <p>진행 상태를 확인한 뒤 각 프로젝트의 기록과 구현 화면을 살펴보세요.</p>
              </div>
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
                    <strong>기록 확인하기 <span aria-hidden="true">↗</span></strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft">
          <div className="sl-container sl-small-callout">
            <div><span className="sl-kicker">OPEN RESEARCH</span><h2>연구 프로젝트는 계속 확장됩니다.</h2></div>
            <div>
              <p>진행 중인 연구 질문, 새로운 인터페이스와 제작 결과를 검증 가능한 정보가 갖춰지는 순서대로 공개합니다. 학습용 데모를 실제 연구 성과로 소개하지 않습니다.</p>
              <Link className="sl-text-link" href="/research">연구 방향 살펴보기 ↗</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
