import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./visual-system.css";

const siteUrl = "https://ddalkak-lab-hai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DDALKAK LAB | Human–AI Interaction Research",
    template: "%s | DDALKAK LAB",
  },
  description:
    "경영학 × 미디어커뮤니케이션 × Human–AI Interaction을 연결하는 학부 연구 프로젝트",
  applicationName: "DDALKAK LAB",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "DDALKAK LAB",
    title: "DDALKAK LAB | Human–AI Interaction Research",
    description:
      "경영학 × 미디어커뮤니케이션 × Human–AI Interaction을 연결하는 학부 연구 프로젝트",
  },
  twitter: {
    card: "summary",
    title: "DDALKAK LAB | Human–AI Interaction Research",
    description:
      "Business × Media & Communication × Human–AI Interaction",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">
          본문으로 바로가기
        </a>
        {children}
      </body>
    </html>
  );
}
