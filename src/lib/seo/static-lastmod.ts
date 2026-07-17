import { APP_STATIC_PATHS } from "@/lib/seo/publicUrlInventory";
import { CASE_TYPES } from "@/lib/case-types";
import { allServiceSlugs } from "@/lib/services-content";

/** Baseline content publication date for static routes (update when page content materially changes). */
const BASELINE = "2026-06-17";

function buildStaticLastModMap(): Record<string, string> {
  const map: Record<string, string> = {};

  for (const path of APP_STATIC_PATHS) {
    map[path] = BASELINE;
  }

  for (const slug of allServiceSlugs) {
    map[`/services/${slug}`] = BASELINE;
  }

  for (const caseType of CASE_TYPES) {
    map[`/case-types/${caseType.slug}`] = BASELINE;
  }

  return map;
}

export const STATIC_PATH_LASTMOD = buildStaticLastModMap();
