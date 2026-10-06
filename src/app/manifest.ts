import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DDALKAK LAB",
    short_name: "DDALKAK",
    description:
      "Business × Media & Communication × Human–AI Interaction undergraduate research project",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2ea",
    theme_color: "#111111",
  };
}
