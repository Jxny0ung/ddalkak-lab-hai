import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InteractionStudy } from "@/components/interaction-study";
import { FactoryIllustration } from "@/components/factory-illustration";
import { studentResearchers } from "@/lib/researchers";

export default function Home() {
  return <>
    <SiteHeader />
    <main className="sl-main dx-home" id="main-content">
      <section className="dx-hero sl-container">
        <div className="dx-hero-copy">
          <span className="dx-eyebrow"><i /> HUMAN–AI INTERACTION LAB</span>
          <h1>사람과 AI가<br />만나는 <em>모든 순간.</em></h1>
          <p>사람과 AI의 상호작용을 직접 탐구합니다.</p>
          <div className="dx-actions"><Link className="sl-btn sl-btn-dark" href="/projects">프로젝트 탐색 <span aria-hidden="true">↗</span></Link><Link className="dx-simple-link" href="/about">연구소 소개 <span aria-hidden="true">→</span></Link></div>
          <div className="dx-hero-note"><span>모두의 <b>딸깍</b> 연구소</span><span>관찰에서 질문으로, 질문에서 실험으로.</span></div>
        </div>
        <InteractionStudy />
      </section>
      <div className="dx-index-band"><div className="sl-container"><span>OPEN LAB / ONGOING EXPLORATION</span><p>질문이 생기면, 탐구의 범위도 넓어집니다.</p><Link href="/work">현재의 활동 <span aria-hidden="true">↗</span></Link></div></div>
      <section className="dx-section sl-container" id="featured">
        <div className="dx-section-heading"><div><span className="dx-eyebrow">01 / SELECTED WORK</span><h2>지금, 직접 만나볼 수 있는 것.</h2></div><Link className="dx-simple-link" href="/projects">모든 프로젝트 <span aria-hidden="true">↗</span></Link></div>
        <div className="dx-selected-grid">
          <article className="dx-game-feature" aria-label="TOYOTA: PRIORITY — Factory Command 3D">
            <div className="dx-game-feature-top"><span className="dx-live-badge"><i /> PLAYABLE</span><span>FACTORY COMMAND / 3D</span></div>
            <div className="dx-game-feature-content"><div><span className="dx-game-kicker">SAME RESOURCES.<br />DIFFERENT PRIORITIES.</span><h3>TOYOTA:<br /><em>PRIORITY</em></h3><p>같은 자원으로 시작하는 공장.<br />무엇을 먼저 바꾸시겠습니까?</p></div><FactoryIllustration /></div>
            <div className="dx-game-feature-bottom"><span>설계 → 생산 → 관찰 → 개선</span><Link href="/games/toyota-priority.html">공장 경영 시작 <span aria-hidden="true">↗</span></Link></div>
          </article>
          <div className="dx-side-projects">
            <Link className="dx-side-project" href="/work/eth"><div><span className="dx-eyebrow">RESEARCH / 01</span><span className="dx-status">진행 기록 준비</span></div><div className="dx-research-lines" aria-hidden="true"><span>Q.</span><i /><i /><i /></div><h3>AI 기반 ETH 논문 연구 <span aria-hidden="true">↗</span></h3><p>질문을 구체화하고, 검증 과정을 기록합니다. 연구 상세 자료는 확인 후 공개합니다.</p></Link>
            <Link className="dx-side-project dx-side-project--interaction" href="/lab"><div><span className="dx-eyebrow">INTERACTION / 02</span><span className="dx-status">프로토타입</span></div><div className="dx-wave" aria-hidden="true">{[16,28,45,25,60,34,72,45,25,52,28,18].map((h,i)=><i key={i} style={{height:h/2}} />)}</div><h3>Clap HAI Interface <span aria-hidden="true">↗</span></h3><p>두 번의 박수가 하나의 의도가 될 수 있을까요? 동의 기반 인터페이스를 체험합니다.</p></Link>
          </div>
        </div>
        <div className="dx-explore-row"><Link href="/reading"><span>READING</span><strong>AI 책 읽기와 서평</strong><small>첫 기록 준비 중</small><b aria-hidden="true">↗</b></Link><Link href="/prompts"><span>BUILD NOTES</span><strong>AI 제작 과정 아카이브</strong><small>기록 공간 구축 중</small><b aria-hidden="true">↗</b></Link></div>
      </section>
      <section className="dx-research-section" aria-labelledby="research-heading">
        <div className="sl-container dx-research-layout"><div><span className="dx-eyebrow">02 / RESEARCH BEHIND THE BUILD</span><h2 id="research-heading">만드는 것에서 멈추지 않고,<br /><em>왜 그런지 묻습니다.</em></h2><p>사람은 AI의 정보를 어떻게 이해하고, 신뢰하고, 수정할까요? 실제 경험에서 출발한 질문을 검증 가능한 탐구로 이어갑니다.</p><Link className="dx-simple-link" href="/research">연구 방향 살펴보기 <span aria-hidden="true">↗</span></Link></div><div className="dx-research-links">{[["01 / RESEARCH","질문을 세우다","사람과 AI 사이의 연구 문제","/research"],["02 / METHODS","방법을 설계하다","질문에 맞는 실험과 검증","/methods"],["03 / REGISTRY","과정을 기록하다","계획·변경·결과를 구분하는 원칙","/registry"],["04 / OUTPUTS","근거를 확인하다","공개 산출물과 실제 소스","/outputs"]].map(([code,title,desc,url])=><Link href={url} key={code}><span>{code}</span><div><strong>{title}</strong><small>{desc}</small></div><b aria-hidden="true">↗</b></Link>)}</div></div>
      </section>
      <section className="dx-section sl-container dx-people-section">
        <div>
          <span className="dx-eyebrow">03 / PEOPLE</span>
          <h2>각자의 호기심이<br />함께하는 탐구가 되도록.</h2>
          <p>지도교수 민현구 교수와 학부 연구생들이<br />질문을 나누고, 서로 다른 관점으로 검토합니다.</p>
          <Link className="dx-simple-link" href="/people">지도교수·연구생 만나기 <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="dx-people-list">
          <Link className="dx-people-faculty" href="/people#min-hyunku"><span>교수</span><strong>민현구</strong><small>지도교수 · 경영전략 · 기술경영 · 데이터 분석</small><b aria-hidden="true">↗</b></Link>
          {studentResearchers.map((person,i)=><Link href={`/people#${person.id}`} key={person.id}><span>{String(i+1).padStart(2,"0")}</span><strong>{person.name}</strong><small>{person.focus.join(" · ")}</small><b aria-hidden="true">↗</b></Link>)}
        </div>
      </section>
      <section className="dx-closing"><div className="sl-container"><div><Image src="/brand/ddalkak-symbol.webp" alt="" width={55} height={45}/><h2>다음 질문은,<br />어디에서 시작될까요?</h2></div><Link className="sl-btn sl-btn-dark" href="/learn">작은 실험 시작하기 <span aria-hidden="true">↗</span></Link></div></section>
    </main>
    <SiteFooter />
  </>;
}
