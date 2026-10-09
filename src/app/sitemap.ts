import type { MetadataRoute } from "next";
import { studentProjects } from "@/lib/student-content";
const baseUrl = "https://ddalkak-lab-hai.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/projects", "/learn", "/lab", "/about", "/research",
    "/methods", "/archive", "/handbook", "/registry", "/system", "/outputs"];
  const routes = [...paths, ...studentProjects.map(p => `/projects/${p.slug}`)];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : ["/projects", "/learn"].includes(route) ? .9 : .7,
  }));
}
