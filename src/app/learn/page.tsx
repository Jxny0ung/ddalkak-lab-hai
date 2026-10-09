import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { learningTracks } from "@/lib/student-content";

export const metadata: Metadata = { title:"Learn", description:"AI 실습 튜토리얼, 프롬프트, API 가이드와 재현 가능한 개발 기록" };

export default function LearnPage() {
  return (
    <>
      <SiteHeader/>
      <main id="main-content" className="sl-main sl-interior">
        <section className="sl-page-top"><div className="sl-container">
          <span className="sl-kicker">LEARN / MAKE IT YOURSELF</span>
          <h1>따라 해보는 순간,<br/>아이디어는 내 것이 됩니다.</h1>
          <p>실습과 기록을 위한 출발점입니다. 비싼 도구보다 과업, 데이터, 검증을 먼저 이해합니다.</p>
        </div></section>
        <section className="sl-section">
          <div className="sl-container">
            <nav className="sl-filter" aria-label="학습 주제 바로가기">
              {learningTracks.map(t=><a key={t.id} href={`#${t.id}`}>{t.label} ↗</a>)}
            </nav>
            <div className="sl-track-grid">
              {learningTracks.map((track,i)=><article className="sl-track" id={track.id} key={track.id}>
                <div className="sl-track-number">0{i+1} <span>{track.label}</span></div>
                <h2>{track.title}</h2><p>{track.description}</p>
                <ol>{track.steps.map(step=><li key={step}>{step}</li>)}</ol>
                <Link className="sl-btn sl-btn-outline" href={track.href}>{track.link} ↗</Link>
              </article>)}
            </div>
          </div>
        </section>
        <section className="sl-join"><div className="sl-container">
          <span className="sl-kicker">REBUILD & SHARE</span><h2>만든 다음에는<br/>과정까지 남겨보세요.</h2>
          <p>무엇이 작동했는지, 무엇이 실패했는지, 어떤 AI와 도구를 사용했는지 기록할 때 학습이 축적됩니다.</p>
          <Link className="sl-btn sl-btn-dark" href="/archive">연구 기록 방식 보기 ↗</Link>
        </div></section>
      </main>
      <SiteFooter/>
    </>
  );
}
