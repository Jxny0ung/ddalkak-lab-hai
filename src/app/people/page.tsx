import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { studentResearchers } from "@/lib/researchers";

export const metadata: Metadata = {
  title: "People | 학부 연구생",
  description: "모두의 딸깍 연구소 학부 연구생 세 명의 소개, 관심 분야, 취미와 개인 활동 링크를 살펴보세요.",
  alternates: { canonical: "/people" },
  openGraph: {
    title: "학부 연구생 | 모두의 딸깍 연구소",
    description: "각자의 질문과 관심에서 출발하는 학부 연구생들의 소개",
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
              <span className="sl-kicker">PEOPLE / UNDERGRADUATE RESEARCHERS</span>
              <h1>서로 다른 관심에서<br />함께 질문을 만듭니다.</h1>
            </div>
            <div className="sl-people-intro__lead">
              <p>경영, 금융, 회계, 음악, AI 서비스와 사용자 경험까지. 배경도 관심도 다르지만, 궁금한 것을 스스로 탐색하고 더 나은 결과를 고민한다는 점에서 만납니다.</p>
              <p className="sl-people-intro__notice">아래 내용은 연구생들이 제공한 개인 소개를 바탕으로 정리했습니다. 관심 분야는 실제 프로젝트 담당 업무나 발표·논문 실적을 뜻하지 않습니다.</p>
            </div>
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
              <span className="sl-people-count" aria-label="공개 프로필 세 명">03 / PROFILES</span>
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
