import type {Metadata} from "next";
import {SiteHeader} from "@/components/site-header";
import {SiteFooter} from "@/components/site-footer";
import {ProjectExplorer} from "@/components/project-explorer";
export const metadata:Metadata={title:"Projects | 질문에서 실험으로",description:"연구, 인터페이스, 게임과 기록. 모두의 딸깍 연구소의 현재 프로젝트를 탐색하세요.",alternates:{canonical:"/projects"}};
export default function ProjectsPage(){return <><SiteHeader/><main className="sl-main sl-interior dx-directory" id="main-content"><section className="dx-page-heading sl-container"><span className="dx-eyebrow">THE OPEN LAB / PROJECT DIRECTORY</span><h1>질문은 다양하게.<br/><em>탐구는 직접.</em></h1><p>지금 공개된 연구와 실험, 직접 실행하는 도구를 만나보세요.<br/>각 프로젝트의 진행 상태와 확인 가능한 근거를 함께 담았습니다.</p></section><section className="sl-container dx-section"><ProjectExplorer/></section></main><SiteFooter/></>;}
