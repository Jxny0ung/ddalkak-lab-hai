import Link from "next/link";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/learn", label: "Learn" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sl-header">
      <div className="sl-container sl-header-inner">
        <Link href="/" className="sl-brand" aria-label="모두의 딸깍 연구소 홈">
          <span className="sl-brand-symbol" aria-hidden="true">◦</span>
          <span>모두의 딸깍 연구소</span>
        </Link>
        <nav className="sl-desktop-nav" aria-label="주 메뉴">
          {links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="sl-btn sl-btn-dark sl-header-cta" href="/projects">
          프로젝트 보기 <span aria-hidden="true">↗</span>
        </Link>
        <details className="sl-mobile-menu">
          <summary aria-label="메뉴 열기">메뉴 <span aria-hidden="true">☰</span></summary>
          <nav aria-label="모바일 메뉴">
            {links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link href="/projects">프로젝트 보기 ↗</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
