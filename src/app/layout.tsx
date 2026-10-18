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
import "./hai-identity.css";
import "./lab-upgrade.css";
import "./editorial-finish.css";

const siteUrl = "https://ddalkak-lab-hai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "모두의 딸깍 연구소 | Human–AI Interaction Lab",
    template: "%s | 모두의 딸깍 연구소",
  },
  description: "사람과 AI의 상호작용을 직접 탐구하는 모두의 딸깍 연구소 · Human–AI Interaction Lab",
  applicationName: "모두의 딸깍 연구소",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "모두의 딸깍 연구소",
    title: "모두의 딸깍 연구소",
    description: "사람과 AI의 상호작용을 직접 탐구합니다.",
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
