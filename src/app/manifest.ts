import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DDALKAK LAB",
    short_name: "DDALKAK",
    description:
      "경영학 × 미디어커뮤니케이션 × HAI 학부 연구·실습 프로젝트",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
  };
}
