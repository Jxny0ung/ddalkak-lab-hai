import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { principles } from "@/lib/content";

const description =
  "경영학 × 미디어커뮤니케이션 × Human–AI Interaction 학부 연구 프로젝트 DDALKAK LAB을 소개합니다.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | DDALKAK LAB",
    description,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHero
          eyebrow="About"
          title="AI를 보여주기보다, AI를 연구하는 과정을 보여주는 프로젝트."
          description="딸깍 연구소는 경영학과 미디어커뮤니케이션의 질문을 Human–AI Interaction 관점에서 연결하고, 실제로 검증 가능한 연구 방법으로 바꾸는 학부 연구 프로젝트입니다."
          meta="Undergraduate research project · Korea · 2026 —"
        />

        <section className="content-section tone-soft">
          <div className="section-heading">
            <span>01 / Mission</span>
            <h2>학문 사이의 언어를 연결합니다.</h2>
          </div>
          <p className="mission-copy">
            AI 시대의 인간 행동을 이해하려면 모델만 보거나, 콘텐츠만 보거나,
            시장만 보는 것으로는 부족합니다. 사람과 AI의 상호작용, 정보가
            전달되는 미디어 환경, 조직과 플랫폼의 인센티브를 하나의 연구 질문
            안에서 연결하는 것을 목표로 합니다.
          </p>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <span>02 / Principles</span>
            <h2>연구 원칙</h2>
          </div>
          <ol className="principle-list">
            {principles.map((principle, index) => (
              <li key={principle}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{principle}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="content-section">
          <div className="research-note">
            <strong>Affiliation note</strong>
            <p>
              이 사이트는 연구 프로젝트의 공개 인터페이스입니다. 기관 소속,
              지도 관계, 공동연구자, 수상·논문 실적 등은 확인된 정보와 공개
              동의가 있는 경우에만 별도로 명시합니다.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
