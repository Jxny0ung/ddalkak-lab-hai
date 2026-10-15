import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { studentResearchers } from "@/lib/researchers";

export const metadata: Metadata = {
  title: "People | 지도교수와 학부 연구생",
  description: "모두의 딸깍 연구소 지도교수 민현구 교수와 학부 연구생들의 연구 관심과 소개를 살펴보세요.",
  alternates: { canonical: "/people" },
  openGraph: {
    title: "지도교수와 학부 연구생 | 모두의 딸깍 연구소",
    description: "지도교수와 학부 연구생들이 함께 질문을 만드는 HAI 연구소",
    url: "/people",
  },
};

export default function PeoplePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="sl-main sl-interior sl-people-page">
        <section className="sl-page-top sl-people-intro">
          <div className="sl-container sl-people-intro__layout">
            <div>
              <span className="sl-kicker">PEOPLE / FACULTY & RESEARCHERS</span>
              <h1>서로 다른 관심에서<br />함께 질문을 만듭니다.</h1>
            </div>
            <div className="sl-people-intro__lead">
              <p>지도교수의 연구 경험과 학부 연구생들의 서로 다른 관심이 만납니다. 각자의 관점에서 출발해 사람과 AI의 상호작용을 함께 탐구합니다.</p>
              <p className="sl-people-intro__notice">지도교수의 학술 경력은 공개된 자료를 바탕으로, 학부 연구생 프로필은 각자가 제공한 소개를 바탕으로 구성했습니다. 관심 분야는 실제 프로젝트 담당 업무나 연구 실적을 뜻하지 않습니다.</p>
            </div>
          </div>
        </section>

        <section className="sl-section sl-faculty-section" id="faculty" aria-labelledby="sl-faculty-title">
          <div className="sl-container">
            <div className="sl-section-head sl-faculty-heading">
              <div>
                <span className="sl-kicker">FACULTY ADVISOR / 지도교수</span>
                <h2 id="sl-faculty-title">함께 질문을 깊게 만드는 안내자</h2>
                <p>연구의 방향을 함께 고민하고, 경험과 방법론을 나누는 지도교수님을 소개합니다.</p>
              </div>
              <span className="sl-faculty-index">01 / FACULTY</span>
            </div>
            <article className="sl-faculty-card" id="min-hyunku">
              <div className="sl-faculty-hero">
                <div className="sl-faculty-portrait">
                <Image src="/researchers/min-hyunku-hq.webp" alt="카스파르 다비트 프리드리히의 낭만주의 풍경에서 영감을 받아 표현한 민현구 교수의 AI 회화풍 초상" width={860} height={860} sizes="(max-width: 820px) calc(100vw - 84px), 360px" priority />
                <span>ARTISTIC PORTRAIT · AI-ASSISTED</span>
                <p>사진이 아닌 AI 기반 회화풍 이미지입니다.</p>
              </div>
              <div className="sl-faculty-content">
                <span className="sl-faculty-role">SUPERVISING PROFESSOR · JOONGBU UNIVERSITY</span>
                <h3>민현구 <span>Hyun-Ku Min</span></h3>
                <p className="sl-faculty-position">중부대학교 경영학전공 교수 · 경영학 박사</p>
                <p className="sl-faculty-tagline">사람과 조직의 변화를, 데이터와 연구의 언어로 살핍니다.</p>
                <p className="sl-faculty-bio">민현구 교수는 경영전략, 생산·서비스운영, 데이터마이닝과 기술경영을 바탕으로 조직과 연구개발의 성과를 분석해 온 경영학 연구자입니다. 기업과 공공 R&amp;D의 효율성, 연구과제 평가체계, 대학 교육성과와 학생의 진로개발 등 서로 다른 현장을 실증적 연구로 연결해 왔습니다.</p>
                <p className="sl-faculty-bio">학술연구와 더불어 학생지원 및 지역협력 활동에 참여해 왔으며, 모두의 딸깍 연구소에서는 학생들이 인간–AI 상호작용에 관한 질문을 구체적인 연구와 실험으로 발전시키는 과정을 지도하는 역할로 소개합니다.</p>
                </div>
              </div>
              <div className="sl-faculty-extra">
                <div className="sl-faculty-detail-grid">
                  <div>
                    <h4>RESEARCH INTERESTS / 연구 분야</h4>
                    <div className="sl-faculty-chips">
                      {["경영전략", "기술경영", "데이터 분석", "R&D 성과평가", "경영정보시스템", "교육성과"].map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                  <div>
                    <h4>RESEARCH APPROACH / 연구 접근</h4>
                    <p>연구문제를 정의하고, 평가 기준을 설계하며, 정량적 분석을 통해 결과를 검증합니다. 효율성 분석과 평가도구 개발 등의 연구 이력이 있습니다.</p>
                  </div>
                </div>
                <div className="sl-faculty-publications">
                  <h4>SELECTED RESEARCH / 주요 연구</h4>
                  <ul>
                    <li><span>2023</span><div>R&amp;D 과제기획 선정평가 도구 개발 연구 <small>CIPP 모형을 활용한 평가체계 연구</small></div></li>
                    <li><span>2024</span><div>대학생의 전공몰입과 진로준비행동 연구 <small>전공만족도·진로장벽의 관계 분석</small></div></li>
                    <li><span>2021</span><div>지역사회 문제해결형 R&amp;D 효율성 연구 <small>공공 연구개발의 효율성과 영향요인 분석</small></div></li>
                  </ul>
                  <p>대표 연구는 공개된 학술논문 주제를 요약한 것으로, 연구소의 자체 성과를 의미하지 않습니다.</p>
                </div>
                <div className="sl-faculty-links">
                  <a href="https://www.joongbu.ac.kr/professorList.es?mid=e50201000000&amp;dept_seq=26" target="_blank" rel="noopener noreferrer">대학교 공식 교수진 안내 <span aria-hidden="true">↗</span></a>
                  <a href="https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART002791003" target="_blank" rel="noopener noreferrer">연구논문 확인 <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="sl-section sl-people-section" aria-labelledby="sl-people-title">
          <div className="sl-container">
            <div className="sl-section-head">
              <div>
                <span className="sl-kicker">MEET THE RESEARCHERS</span>
                <h2 id="sl-people-title">학부 연구생 소개</h2>
                <p>사람마다 다른 시선이 연구소의 가능성을 넓힙니다.</p>
              </div>
              <span className="sl-people-count" aria-label={`공개 프로필 ${studentResearchers.length}명`}>{String(studentResearchers.length).padStart(2, "0")} / PROFILES</span>
            </div>

            <div className="sl-people-grid">
              {studentResearchers.map((person, index) => (
                <article className="sl-person-card" id={person.id} key={person.id}>
                  <div className="sl-person-card__image">
                    <Image
                      src={person.illustration}
                      alt={person.illustrationAlt}
                      width={320}
                      height={400}
                      sizes="(max-width: 660px) calc(100vw - 40px), (max-width: 1050px) 45vw, 30vw"
                      priority={index === 0}
                    />
                    <span>PORTRAIT {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="sl-person-card__body">
                    <div className="sl-person-card__name-row">
                      <div>
                        <h3>{person.name}</h3>
                        <p>{person.englishName}</p>
                      </div>
                      <span className="sl-person-card__mbti">{person.mbti}</span>
                    </div>
                    <p className="sl-person-card__heading">{person.heading}</p>
                    <p className="sl-person-card__intro">{person.introduction}</p>

                    <div className="sl-person-card__group">
                      <h4>관심 분야</h4>
                      <div className="sl-person-card__chips">
                        {person.focus.map((interest) => <span key={interest}>{interest}</span>)}
                      </div>
                    </div>
                    <div className="sl-person-card__group">
                      <h4>관심사와 취미</h4>
                      <p>{[...person.interests, ...person.hobbies].filter((item, index, array) => array.indexOf(item) === index).join(" · ")}</p>
                    </div>

                    <div className="sl-person-card__links" aria-label={`${person.name}의 외부 프로필`}>
                      {person.links.map((link) => (
                        <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} ${link.label} 새 창에서 열기`}>
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="sl-people-caption">일러스트는 각 연구생이 제공한 회화풍 이미지입니다. 공식 증명사진이 아니며, 개인별 활동·성과 기록은 확인 후 별도로 공개합니다.</p>
          </div>
        </section>

        <section className="sl-section sl-section-soft">
          <div className="sl-container sl-people-outro">
            <div>
              <span className="sl-kicker">OUR WAY OF LEARNING</span>
              <h2>관심에서 시작해,<br />만들고 검증하고 공유합니다.</h2>
            </div>
            <div>
              <p>연구소는 각자의 관심을 프로젝트로 연결하고 구현 과정을 기록합니다. 앞으로 실제 공개할 수 있는 연구 결과와 역할이 확인되면 프로젝트 페이지와 산출물 기록에 연결하겠습니다.</p>
              <div className="sl-actions">
                <Link className="sl-btn sl-btn-dark" href="/projects">프로젝트 살펴보기 ↗</Link>
                <Link className="sl-btn sl-btn-outline" href="/about">연구소 소개 보기</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
