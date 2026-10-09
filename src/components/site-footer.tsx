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
            <Link href="/lab">Lab</Link>
            <Link href="/about">About</Link>
            <Link href="/archive">Archive</Link>
            <a href="https://github.com/Jxny0ung/ddalkak-lab-hai" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </nav>
        </div>
        <div className="sl-footer-bottom">
          <span>Joongbu University · Business Administration × Media & Communication × HAI</span>
          <span>© 2026 DDALKAK LAB · 교육용 예시는 실제 연구 성과와 구분합니다.</span>
        </div>
      </div>
    </footer>
  );
}
