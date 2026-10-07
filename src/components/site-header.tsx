import Link from "next/link";

const navigation = [
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/methods", label: "Methods" },
  { href: "/system", label: "System" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand-lockup" href="/" aria-label="DDALKAK LAB home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-copy">
            <strong>DDALKAK LAB</strong>
            <small>Human × AI Research</small>
          </span>
        </Link>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-archive" href="/archive">
          Archive <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
