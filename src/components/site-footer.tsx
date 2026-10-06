import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="brand">DDALKAK LAB</div>
      <div>
        <p>Business × Media & Communication × Human–AI Interaction</p>
        <p className="footer-note">
          계획과 실증 결과를 구분하고, 공개 가능한 연구 과정만 기록합니다.
        </p>
      </div>
      <div className="footer-links">
        <Link href="/archive">Archive</Link>
        <a
          href="https://github.com/Jxny0ung/ddalkak-lab-hai"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
        <span>© 2026 DDALKAK LAB</span>
      </div>
    </footer>
  );
}
