import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./visual-system.css";
import "./student-platform.css";
import "./core-showcase.css";
import "./recommendation-a.css";
import "./site-refinement.css";
import "./interview-polish.css";
import "./people.css";
import "./programs.css";

const siteUrl = "https://ddalkak-lab-hai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "모두의 딸깍 연구소 | HAI 연구·제작 플랫폼",
    template: "%s | 모두의 딸깍 연구소",
  },
  description: "전공의 경계를 넘어 HAI 관점에서 AI 연구, 책과 서평, 웹 게임, 제작 과정을 공유하는 학부 연구·제작 플랫폼",
  applicationName: "모두의 딸깍 연구소",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "모두의 딸깍 연구소",
    title: "모두의 딸깍 연구소",
    description: "AI를 연구하고, 읽고, 만들고, 그 과정을 기록합니다.",
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
