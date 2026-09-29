import type { MetadataRoute } from "next";
import { pillars } from "@/content/pillars";
import { serviceHref } from "@/content/services";
import { solutionPages } from "@/content/solutions";
import { getIndustries, getInsights, getServices, getVacancies } from "@/lib/data";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries, insights, vacancies] = await Promise.all([getServices(), getIndustries(), getInsights(), getVacancies()]);
  const now = new Date();
  const staticPaths = [
    "/", "/about", "/about/leadership", "/approach", "/services", "/solutions", "/products", "/products/ires", "/products/ires/report",
    "/industries", "/insights", "/innovation", "/partnerships", "/careers", "/investors", "/sustainability", "/contact",
    "/consultation", "/corporate-profile", "/privacy", "/terms",
  ];
  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...pillars.map((p) => ({ url: absoluteUrl(`/services/${p.slug}`), lastModified: now, priority: 0.8 })),
    ...services.map((s) => ({ url: absoluteUrl(serviceHref(s)), lastModified: now, priority: 0.7 })),
    ...solutionPages.map((s) => ({ url: absoluteUrl(s.href), lastModified: now, priority: 0.7 })),
    ...industries.map((i) => ({ url: absoluteUrl(`/industries/${i.slug}`), lastModified: now, priority: 0.7 })),
    ...insights.map((i) => ({ url: absoluteUrl(`/insights/${i.slug}`), lastModified: new Date(i.publishedAt), priority: 0.6 })),
    ...vacancies.map((v) => ({ url: absoluteUrl(`/careers/${v.slug}`), lastModified: now, priority: 0.5 })),
  ];
}
