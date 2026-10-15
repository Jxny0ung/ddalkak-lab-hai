import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="sl-footer">
      <div className="sl-container">
        <div className="sl-footer-top">
          <div>
            <Link href="/" className="sl-brand"><Image src="/brand/ddalkak-symbol.webp" alt="" width={36} height={30} className="sl-brand-icon" /><span className="sl-brand-name">모두의 딸깍 연구소</span></Link>
            <p>AI와 인간의 상호작용을 연구하고, 읽고, 만들고, 기록하는 학부 HAI 플랫폼</p>
          </div>
          <nav aria-label="하단 메뉴">
            <Link href="/work">Work</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/reading">Reading</Link>
            <Link href="/games">Games</Link>
            <Link href="/prompts">Prompts</Link>
            <Link href="/learn">Learn</Link>
            <Link href="/lab">HAI Lab</Link>
            <Link href="/research">Research</Link>
            <Link href="/methods">Methods</Link>
            <Link href="/people">People</Link>
            <Link href="/about">About</Link>
            <Link href="/archive">Archive</Link>
            <Link href="/outputs">Outputs</Link>
            <a href="https://github.com/Jxny0ung/ddalkak-lab-hai" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </nav>
        </div>
        <div className="sl-footer-bottom">
          <span>경영학과 미디어커뮤니케이션을 가로지르는 HAI 연구·제작 · 독립 학생 프로젝트</span>
          <span>© 2026 DDALKAK LAB · 교육용 예시는 실제 연구 성과와 구분합니다.</span>
        </div>
      </div>
    </footer>
  );
}
