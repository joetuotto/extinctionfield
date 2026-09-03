import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { ARTICLES } from "@/lib/articles";
import { referenceRegistry } from "@/lib/referenceRegistry.server";
import { referenceUrl } from "@/lib/references";

// The route list is derived from the filesystem, so the sitemap must be
// generated at build time (where app/[locale] exists), never at request time.
export const dynamic = "force-static";

const BASE_URL = "https://extinctionfield.com";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

interface RouteMeta {
  changeFrequency: ChangeFrequency;
  priority: number;
}

/**
 * Explicit tuning for routes whose weight should not follow the depth default
 * (see routeMeta): the home page, the section hubs, and frequently updated
 * registries. Everything else is weighted by depth so section index pages
 * always outrank their children.
 */
const ROUTE_META: Record<string, RouteMeta> = {
  "/": { changeFrequency: "weekly", priority: 1.0 },
  "/model": { changeFrequency: "monthly", priority: 0.9 },
  "/measurement/fieldstate": { changeFrequency: "monthly", priority: 0.8 },
  "/evidence": { changeFrequency: "weekly", priority: 0.9 },
  "/evidence/pharmacology": { changeFrequency: "monthly", priority: 0.8 },
  "/evidence/technology": { changeFrequency: "monthly", priority: 0.8 },
  "/evidence/eyes": { changeFrequency: "monthly", priority: 0.6 },
  "/evidence/nutrition": { changeFrequency: "monthly", priority: 0.6 },
  "/civilization": { changeFrequency: "monthly", priority: 0.9 },
  "/predictions": { changeFrequency: "weekly", priority: 0.8 },
  "/articles": { changeFrequency: "weekly", priority: 0.8 },
  "/references": { changeFrequency: "weekly", priority: 0.6 },
  "/data": { changeFrequency: "weekly", priority: 0.6 },
  "/about": { changeFrequency: "monthly", priority: 0.5 },
};

function routeMeta(route: string): RouteMeta {
  const tuned = ROUTE_META[route];
  if (tuned) return tuned;
  const depth = route.split("/").length - 1;
  const priority = route.startsWith("/about/") ? 0.4 : depth <= 1 ? 0.8 : depth === 2 ? 0.7 : 0.6;
  return { changeFrequency: "monthly", priority };
}

const APP_LOCALE_DIR = join(process.cwd(), "app", "[locale]");
const PAGE_FILES = new Set(["page.tsx", "page.ts", "page.jsx", "page.js", "page.mdx", "page.md"]);

/**
 * Walks app/[locale] and collects every static route that has a page file.
 * Dynamic segments ([slug], [referenceId], [...rest]) are skipped here and
 * enumerated explicitly in sitemap(); route groups "(name)" add no URL
 * segment; private "_dir" and parallel "@slot" directories are ignored.
 */
function collectStaticRoutes(dir: string, route: string, out: Set<string>): void {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  if (entries.some((entry) => entry.isFile() && PAGE_FILES.has(entry.name))) {
    out.add(route || "/");
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith("[") || name.startsWith("_") || name.startsWith("@")) continue;
    const isRouteGroup = name.startsWith("(") && name.endsWith(")");
    collectStaticRoutes(join(dir, name), isRouteGroup ? route : `${route}/${name}`, out);
  }
}

function staticRoutes(): string[] {
  const out = new Set<string>();
  collectStaticRoutes(APP_LOCALE_DIR, "", out);
  // Historical URLs are handled by redirects and never emitted as canonical
  // sitemap entries if a compatibility file is reintroduced later.
  out.delete("/model/fieldstate");
  out.delete("/model/fieldstate/math");
  return [...out].sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();
  const routes = staticRoutes();
  const registry = referenceRegistry();
  const referencesGenerated = new Date(registry.metadata.generated);

  for (const locale of locales) {
    for (const route of routes) {
      const meta = routeMeta(route);
      entries.push({
        url: `${BASE_URL}/${locale}${route === "/" ? "" : route}`,
        lastModified: now,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
      });
    }

    // Dynamic segment: /articles/[slug]
    for (const article of ARTICLES) {
      entries.push({
        url: `${BASE_URL}/${locale}/articles/${article.slug}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }

    // Dynamic segment: /references/[referenceId]
    for (const reference of registry.references) {
      if (!reference.authors || !reference.title || reference.year <= 0 || !referenceUrl(reference)) continue;
      entries.push({
        url: `${BASE_URL}/${locale}/references/${reference.id}`,
        lastModified: referencesGenerated,
        changeFrequency: "yearly",
        priority: 0.4,
      });
    }
  }

  return entries;
}
