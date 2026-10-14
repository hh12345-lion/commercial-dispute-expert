/** Square brand mark for JSON-LD logo fields (not the wide OG social card). */
export const BRAND_LOGO_PATH = "/brand/icon-512.png";

/** Default site-wide OG social card. */
export const DEFAULT_OG_IMAGE_PATH = "/brand/og.png";

export function insightOgImagePath(slug: string): string {
  return `/insights/${slug}/opengraph-image`;
}
