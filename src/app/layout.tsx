import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./visual-system.css";
import "./student-platform.css";
import "./core-showcase.css";
import "./recommendation-a.css";
import "./site-refinement.css";
import "./interview-polish.css";

const siteUrl = "https://ddalkak-lab-hai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "모두의 딸깍 연구소 | 직접 만들며 배우는 AI",
    template: "%s | 모두의 딸깍 연구소",
  },
  description: "생성형 AI 사례를 탐색하고, 직접 구현하고, 나만의 경영·미디어 프로젝트로 발전시키는 학생 중심 실습·연구 플랫폼",
  applicationName: "모두의 딸깍 연구소",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "모두의 딸깍 연구소",
    title: "모두의 딸깍 연구소",
    description: "AI를 배우는 가장 좋은 방법은 직접 만들어보는 것입니다.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">본문으로 바로가기</a>
        {children}
      </body>
    </html>
  );
}
