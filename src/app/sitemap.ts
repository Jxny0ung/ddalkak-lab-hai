import type { MetadataRoute } from "next";

const baseUrl = "https://ddalkak-lab-hai.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/research",
    "/methods",
    "/projects",
    "/system",
    "/registry",
    "/handbook",
    "/archive",
    "/about",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/system" ? 0.9 : 0.8,
  }));
}
