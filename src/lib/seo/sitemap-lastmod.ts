import { getAllInsights } from "@/lib/mdx";
import { STATIC_PATH_LASTMOD } from "@/lib/seo/static-lastmod";

/** ISO date (YYYY-MM-DD) for sitemap lastmod */
export type PathLastModMap = Record<string, string>;

function toDateOnly(isoOrDate: string): string {
  const d = new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function maxDate(a: string, b: string): string {
  return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
}

/** Per-path lastmod: insight articles use MDX dates; hub uses latest insight date */
export function buildPathLastModMap(fallbackDate: string): PathLastModMap {
  const map: PathLastModMap = { ...STATIC_PATH_LASTMOD };
  const insights = getAllInsights();

  let latestInsight: string | null = null;
  for (const post of insights) {
    const articleDate = toDateOnly(post.modified ?? post.date);
    map[`/insights/${post.slug}`] = articleDate;
    latestInsight = latestInsight ? maxDate(articleDate, latestInsight) : articleDate;
  }

  if (latestInsight) {
    map["/insights"] = latestInsight;
  }

  return map;
}

export function lastModForPath(
  pathname: string,
  pathLastMod: PathLastModMap,
  fallback: string,
): string {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/";
  return pathLastMod[normalized] ?? fallback;
}
