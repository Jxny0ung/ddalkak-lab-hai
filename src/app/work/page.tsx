import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { labPrograms } from "@/lib/lab-programs";

export const metadata: Metadata = {
  title: "연구와 제작 | HAI Lab Programs",
  description: "모두의 딸깍 연구소에서 현재 공개 중인 HAI 연구와 프로젝트",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="sl-main sl-interior" id="main-content">
        <section className="sl-page-top pg-heading">
          <div className="sl-container pg-heading__layout">
            <div>
              <span className="sl-kicker">WHAT WE BUILD / HUMAN–AI INTERACTION</span>
              <h1>연구하고, 읽고,<br />직접 만들어봅니다.</h1>
              <p>모두의 딸깍 연구소는 인공지능을 활용하는 과정과 그 안에서 사람이 판단하고 협업하는 방식을 함께 탐색하는 학부 연구·제작 플랫폼입니다.</p>
              <div className="sl-actions">
                <Link className="sl-btn sl-btn-dark" href="/games">실행 가능한 게임 보기 ↗</Link>
                <Link className="sl-btn sl-btn-outline" href="/research">연구 방향 살펴보기</Link>
              </div>
            </div>
            <div className="pg-heading__mark">
              <Image src="/brand/ddalkak-wordmark.webp" alt="마우스 클릭과 AI 회로 형태를 결합한 모두의 딸깍 연구소 로고" width={900} height={662} sizes="(max-width: 800px) 90vw, 330px" />
              <p>모두의 딸깍 연구소 · Human–AI Interaction</p>
            </div>
          </div>
        </section>

        <section className="sl-section" aria-labelledby="pg-programs-heading">
          <div className="sl-container">
            <div className="sl-section-head">
              <div>
                <span className="sl-kicker">CURRENT WORK</span>
                <h2 id="pg-programs-heading">지금 기록하고 있는 프로젝트</h2>
                <p>현재 공개된 활동 목록입니다. 연구소의 범위는 여기에 한정되지 않습니다.</p>
              </div>
            </div>
            <div className="pg-programs">
              {labPrograms.map((program) => (
                <Link className="pg-program-card" href={program.href} key={program.id}>
                  <div className="pg-program-card__meta"><span>{program.index} / {program.eyebrow}</span><span className={program.id === "games" ? "pg-pill pg-pill--active" : "pg-pill"}>{program.status}</span></div>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <strong>{program.action} <span aria-hidden="true">↗</span></strong>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="pg-principle" aria-labelledby="pg-principle-heading">
          <div className="sl-container pg-principle__layout">
            <div><span className="sl-kicker">OUR RESEARCH FRAME</span><h2 id="pg-principle-heading">HAI 연구는<br />질문에서 시작됩니다.</h2></div>
            <div>
              <p>우리는 사람과 AI가 함께 판단하고 배우며 만들어가는 과정을 연구합니다. 새로운 질문이 생기면 그에 맞는 방법을 선택하고 탐구 범위를 넓힙니다.</p>
              <p>HAI는 AI를 활용해 무언가를 만드는 데 그치지 않고, 사람이 AI의 정보와 판단을 어떻게 이해·신뢰·수정하는지도 살펴보는 연구 관점입니다.</p>
              <Link className="sl-text-link" href="/methods">연구 방법과 검증 원칙 보기 ↗</Link>
            </div>
          </div>
        </section>
        <section className="sl-section">
          <div className="sl-container pg-next">
            <div><span className="sl-kicker">OPEN BUILD LOG</span><h2>과정은 기록하고, 근거는 확인합니다.</h2><p>게임처럼 실행 가능한 결과물은 직접 체험할 수 있도록 공개하고, 실증 연구나 독서 기록은 확인된 자료가 갖춰지는 순서대로 추가합니다.</p></div>
            <div className="sl-actions"><Link className="sl-btn sl-btn-dark" href="/outputs">공개 산출물 확인하기 ↗</Link><Link className="sl-btn sl-btn-outline" href="/people">함께하는 연구생 만나기</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
