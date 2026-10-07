import Link from "next/link";

const footerNavigation = [
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/methods", label: "Methods" },
  { href: "/system", label: "System" },
  { href: "/registry", label: "Registry" },
  { href: "/handbook", label: "Handbook" },
  { href: "/archive", label: "Archive" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-topline">
        <div>
          <p className="footer-kicker">DDALKAK LAB / 2026 —</p>
          <h2>
            질문을 만들고,
            <br />
            검증 가능한 과정으로 남깁니다.
          </h2>
        </div>
        <p className="footer-summary">
          Business × Media & Communication × Human–AI Interaction
          <br />
          계획과 실증 결과를 구분하고, 공개 가능한 연구 과정만 기록합니다.
        </p>
      </div>

      <div className="footer-nav" aria-label="Footer navigation">
        {footerNavigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <a
          href="https://github.com/Jxny0ung/ddalkak-lab-hai"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </div>

      <div className="footer-wordmark" aria-hidden="true">
        DDALKAK
      </div>

      <div className="footer-bottom">
        <span>Undergraduate Research Project · Korea</span>
        <span>© 2026 DDALKAK LAB</span>
      </div>
    </footer>
  );
}
