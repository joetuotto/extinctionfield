import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://extinctionfield.com";

const ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/model", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/model/fieldstate", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/model/math", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/model/fieldstate/math", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/evidence", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/evidence/pharmacology", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/evidence/devices", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/lighting", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/cascades", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/bbb", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/circadian", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/epidemiology", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/magnetoreception", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/ecology", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/eyes", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/evidence/nutrition", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/evidence/evolution", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/populations", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/replication", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/evidence/technology", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/civilization", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/predictions", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/sentinel", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/objections", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/references", changeFrequency: "weekly" as const, priority: 0.6 },
  { path: "/map", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/explore", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/explorer", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/data", changeFrequency: "weekly" as const, priority: 0.6 },
  { path: "/modulome", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/mathematics", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/about/history", changeFrequency: "monthly" as const, priority: 0.4 },
  { path: "/about/measurement", changeFrequency: "monthly" as const, priority: 0.4 },
  { path: "/articles/bees", changeFrequency: "yearly" as const, priority: 0.5 },
  { path: "/articles/spectrum", changeFrequency: "yearly" as const, priority: 0.5 },
  { path: "/articles/implausibility", changeFrequency: "yearly" as const, priority: 0.5 },
  { path: "/articles/dual-lock", changeFrequency: "yearly" as const, priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of ROUTES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path === "/" ? "" : route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return entries;
}
