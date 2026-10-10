import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="sl-footer">
      <div className="sl-container">
        <div className="sl-footer-top">
          <div>
            <Link href="/" className="sl-brand">모두의 딸깍 연구소</Link>
            <p>보고, 만들고, 개선하고, 공유하는 학생 중심의 AI 실습·연구 플랫폼</p>
          </div>
          <nav aria-label="하단 메뉴">
            <Link href="/projects">Projects</Link>
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
          <span>경영학 × 미디어커뮤니케이션 × HAI · 독립 학생 실습·연구 프로젝트</span>
          <span>© 2026 DDALKAK LAB · 교육용 예시는 실제 연구 성과와 구분합니다.</span>
        </div>
      </div>
    </footer>
  );
}
