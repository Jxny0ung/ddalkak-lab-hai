[Reading 18 lines from start (total: 18 lines, 0 remaining)]

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DDALKAK LAB | Human–AI Interaction Research",
  description:
    "경영학 × 미디어커뮤니케이션 × Human–AI Interaction을 연결하는 학부 연구 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

[executed on device: DESKTOP-SPQVV5S (c1e4473b-97e1-4ad4-b789-92ac2f03e3a9)]