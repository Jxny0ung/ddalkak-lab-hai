import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DDALKAK LAB",
    short_name: "DDALKAK",
    description:
      "전공의 경계를 넘어 AI와 인간의 상호작용을 연구하는 학부 연구·제작 플랫폼",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
  };
}
