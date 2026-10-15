"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/games", label: "Games" },
  { href: "/reading", label: "Reading" },
  { href: "/lab", label: "HAI Lab" },
  { href: "/people", label: "People" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sl-header">
      <div className="sl-container sl-header-inner">
        <Link href="/" className="sl-brand" aria-label="모두의 딸깍 연구소 홈">
          <Image src="/brand/ddalkak-symbol.webp" alt="" width={36} height={30} className="sl-brand-icon" priority />
          <span className="sl-brand-name">모두의 <strong className="sl-brand-highlight">딸깍</strong> 연구소</span>
        </Link>
        <nav className="sl-desktop-nav" aria-label="주 메뉴">
          {links.map((item) => (
            <Link
              aria-current={pathname === item.href || pathname.startsWith(item.href + "/") ? "page" : undefined}
              key={item.href}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="sl-btn sl-btn-dark sl-header-cta" href="/work">
          연구소 활동 <span aria-hidden="true">↗</span>
        </Link>
        <details className="sl-mobile-menu">
          <summary>메뉴 <span aria-hidden="true">☰</span></summary>
          <nav aria-label="모바일 메뉴">
            {links.map((item) => (
              <Link
                aria-current={pathname === item.href || pathname.startsWith(item.href + "/") ? "page" : undefined}
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/learn">Learn ↗</Link>
            <Link href="/research">Research ↗</Link>
            <Link href="/methods">Methods ↗</Link>
            <Link href="/prompts">Prompt Archive ↗</Link>
            <Link href="/archive">Archive ↗</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
