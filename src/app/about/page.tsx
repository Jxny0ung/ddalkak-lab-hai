import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About",
  description: "모두의 딸깍 연구소가 학생과 함께 생성형 AI 사례를 구현하고 배우는 방식과 연구 원칙",
};

const principles = [
  ["직접 만들어봅니다.", "AI가 완성해준 결과만 보는 대신, 코드·인터페이스·작동 원리를 이해합니다."],
  ["과정을 기록합니다.", "실패한 시도와 수정 내역도 다음 학생이 배울 수 있는 자료로 남깁니다."],
  ["사실을 구분합니다.", "가상 데이터, 기획 예시, 작동하는 데모, 검증된 연구 결과를 혼동하지 않습니다."],
  ["안전하게 공유합니다.", "API 키, 개인정보, 참여자 데이터, 공개 전 연구자료는 사이트에 올리지 않습니다."],
] as const;

export default function AboutPage() {
  return (
    <>
      <SiteHeader/>
      <main id="main-content" className="sl-main sl-interior">
        <section className="sl-page-top"><div className="sl-container">
          <span className="sl-kicker">ABOUT / EVERYONE CAN BUILD</span>
          <h1>호기심에서 시작해<br/>작동하는 결과로.</h1>
          <p>모두의 딸깍 연구소는 사람과 AI의 상호작용을 직접 탐구하는 학생 중심 HAI 연구소입니다. 질문을 만들고, 실험하고, 검증하는 과정을 공개합니다.</p>
        </div></section>
        <section className="sl-section">
          <div className="sl-container sl-detail-columns">
            <aside><span className="sl-kicker">01 / PURPOSE</span><h2>보는 것에서 만드는 것으로</h2></aside>
            <div className="sl-detail-copy">
              <h3>어떤 곳인가요?</h3>
              <p>HAI를 중심으로 다양한 연구 질문을 탐색합니다. 필요에 따라 실험을 설계하고 인터페이스를 만들며, 판단과 근거를 검증 가능한 기록으로 남깁니다.</p>
              <h3>어떤 질문을 다루나요?</h3>
              <p>사람이 AI를 이해하고 신뢰하며 협력하는 방식, 그리고 상호작용을 바꾸는 조건을 살펴봅니다. 연구 주제와 방법은 특정 학문이나 활동 목록으로 한정하지 않습니다.</p>
              <div className="sl-actions"><Link className="sl-btn sl-btn-outline" href="/research">연구 주제 ↗</Link><Link className="sl-btn sl-btn-outline" href="/methods">연구 방법 ↗</Link><Link className="sl-btn sl-btn-outline" href="/people">지도교수·연구생 소개 ↗</Link><Link className="sl-btn sl-btn-outline" href="/work">현재 활동 보기 ↗</Link></div>
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft">
          <div className="sl-container">
            <div className="sl-section-head"><div><span className="sl-kicker">02 / OUR PRINCIPLES</span><h2>네 가지 약속</h2></div></div>
            <div className="sl-steps">
              {principles.map(([title,desc],i)=><article className="sl-step" key={title}>
                <span>0{i+1}</span><h3>{title}</h3><p>{desc}</p>
              </article>)}
            </div>
          </div>
        </section>
        <section className="sl-section" id="join">
          <div className="sl-container sl-detail-columns">
            <aside><span className="sl-kicker">03 / JOIN</span><h2>참여는 실습에서 시작합니다.</h2></aside>
            <div className="sl-detail-copy">
              <h3>어떻게 시작할 수 있나요?</h3>
              <p>Projects에서 관심 있는 예시를 고르고, Learn의 가이드를 따라 직접 만들어보세요. 결과뿐 아니라 무엇이 어려웠고 어떻게 수정했는지도 남기는 것이 연구소의 기본 활동 방식입니다.</p>
              <h3>모집 안내</h3>
              <p>현재 이 사이트에는 확정된 모집 일정이나 공식 접수 창구가 공개되어 있지 않습니다. 별도의 모집 공지가 확인되기 전에는 지원 접수가 진행된다고 안내하지 않습니다.</p>
              <div className="sl-actions"><Link className="sl-btn sl-btn-dark" href="/projects">프로젝트부터 시작하기 ↗</Link><Link className="sl-btn sl-btn-outline" href="/learn">학습 자료 보기</Link></div>
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft" id="team-contact">
          <div className="sl-container sl-detail-columns">
            <aside>
              <span className="sl-kicker">04 / TEAM & CONTACT</span>
              <h2>구성원과 연락 방법은 확인된 정보만 공개합니다.</h2>
            </aside>
            <div className="sl-detail-copy">
              <h3>연구팀</h3>
              <p>지도교수 민현구 교수와 학부 연구생 네 명을 소개합니다. 교수님의 연구 경력은 공개된 자료를, 연구생 프로필은 제공받은 소개를 바탕으로 정리했습니다. 프로젝트별 담당 업무와 연구 성과는 확인된 뒤에만 연결하며, 이 사이트가 대학의 공식 기관을 대표한다는 의미는 아닙니다.</p><Link className="sl-text-link" href="/people">지도교수·연구생 프로필 확인하기 ↗</Link>
              <h3>공개된 피드백 채널</h3>
              <p>오탈자, 접근성 문제, 작동 오류, 연구 기록 개선 제안은 GitHub Issues로 전달할 수 있습니다. 이 채널은 공개되므로 개인정보, 참여자 자료, 비공개 연구 내용은 올리지 마세요.</p>
              <div className="sl-actions">
                <a className="sl-btn sl-btn-dark" href="https://github.com/Jxny0ung/ddalkak-lab-hai/issues" target="_blank" rel="noopener noreferrer">GitHub에서 제안하기 ↗</a>
                <Link className="sl-btn sl-btn-outline" href="/registry">연구 기록 원칙 보기 ↗</Link>
                <Link className="sl-btn sl-btn-outline" href="/outputs">성과 증빙 기준 보기 ↗</Link>
              </div>
              <p>별도의 공식 모집·개인 문의 이메일은 아직 확인되지 않았습니다.</p>
            </div>
          </div>
        </section>
        <section className="sl-section sl-section-soft">
          <div className="sl-container sl-small-callout">
            <div><span className="sl-kicker">AFFILIATION & TRANSPARENCY</span><h2>학생 중심의 독립적인 실습·연구 프로젝트</h2></div>
            <p>HAI에 관심 있는 학부 연구생들이 자발적으로 탐구하는 연구·제작 프로젝트입니다. 공식 대학 기관이나 학과의 입장을 대표하는 사이트는 아니며, 교수님의 연구소 지도 관계와 구성원의 소개는 확인된 범위에서만 명시하며, 개별 연구 실적을 연구소의 성과로 혼동하지 않습니다.</p>
          </div>
        </section>
      </main>
      <SiteFooter/>
    </>
  );
}
