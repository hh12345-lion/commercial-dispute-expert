/** Square brand mark for JSON-LD logo fields (not the wide OG social card). */
export const BRAND_LOGO_PATH = "/logo";

/** Default site-wide OG social card. */
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

export function insightOgImagePath(slug: string): string {
  return `/insights/${slug}/opengraph-image`;
}
