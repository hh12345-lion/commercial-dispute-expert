import { CASE_TYPES } from "@/lib/case-types";
import { getInsightSlugs } from "@/lib/mdx";
import { allServiceSlugs } from "@/lib/services-content";

/** Canonical production host (no trailing slash). Update when the primary domain changes. */
export const CANONICAL_HOST = "https://commercialdisputeexpert.com";

/**
 * First-class marketing and legal pages. Add new static routes here before release,
 * then run `npm run seo:generate` and `npm run seo:verify`.
 */
export const APP_STATIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/case-types",
  "/how-to-instruct",
  "/contact",
  "/insights",
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
  "/image-credits",
] as const;

/** Paths that exist in the app but must not appear in the XML sitemap. */
export const SITEMAP_EXCLUDED_PATHS = ["/thank-you"] as const;

export type PublicUrlInventory = {
  canonicalHost: string;
  allPaths: string[];
  allUrls: string[];
};

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const withLeading = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeading.replace(/\/+$/, "") || "/";
}

function pathToUrl(host: string, pathname: string): string {
  const path = normalizePath(pathname);
  return path === "/" ? host : `${host}${path}`;
}

function dedupeSorted(paths: string[]): string[] {
  return [...new Set(paths.map(normalizePath))].sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });
}

export function buildPublicUrlInventory(
  host: string = CANONICAL_HOST,
): PublicUrlInventory {
  const canonicalHost = host.replace(/\/$/, "");

  const servicePaths = allServiceSlugs.map((slug) => `/services/${slug}`);
  const caseTypePaths = CASE_TYPES.map((c) => `/case-types/${c.slug}`);
  const insightPaths = getInsightSlugs().map((slug) => `/insights/${slug}`);

  const excluded = new Set<string>(SITEMAP_EXCLUDED_PATHS);

  const allPaths = dedupeSorted([
    ...APP_STATIC_PATHS,
    ...servicePaths,
    ...caseTypePaths,
    ...insightPaths,
  ]).filter((p) => !excluded.has(p));

  const allUrls = allPaths.map((p) => pathToUrl(canonicalHost, p));

  return { canonicalHost, allPaths, allUrls };
}
