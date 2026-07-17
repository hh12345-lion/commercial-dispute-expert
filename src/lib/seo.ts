import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  BRAND_LOGO_PATH,
  DEFAULT_OG_IMAGE_PATH,
  insightOgImagePath,
} from "@/lib/seo/brand-assets";

const siteUrl = siteConfig.domain.replace(/\/$/, "");

/** Canonical URL — homepage has no trailing slash (matches sitemap) */
export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return siteUrl;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized.replace(/\/+$/, "")}`;
}

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImagePath?: string;
};

function defaultOgImagePath(path: string): string {
  const insightMatch = path.match(/^\/insights\/([^/]+)$/);
  if (insightMatch) {
    return insightOgImagePath(insightMatch[1]);
  }
  return DEFAULT_OG_IMAGE_PATH;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noIndex,
  ogImagePath,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${siteConfig.businessName}`;
  const resolvedKeywords = keywords?.length ? keywords : defaultKeywords;
  const ogImage = absoluteUrl(ogImagePath ?? defaultOgImagePath(path));

  return {
    title: fullTitle,
    description,
    keywords: resolvedKeywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      type: path.startsWith("/insights/") ? "article" : "website",
      locale: "en",
      url,
      siteName: siteConfig.businessName,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.businessName }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function buildNotFoundMetadata(): Metadata {
  const fullTitle = `Page not found | ${siteConfig.businessName}`;

  return {
    title: fullTitle,
    description: "The page you requested could not be found on Commercial Dispute Expert.",
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
  };
}

export const defaultKeywords = [
  "commercial dispute expert witness",
  "forensic accounting expert witness",
  "loss of profits expert witness",
  "CPR Part 35 expert report",
];

export { BRAND_LOGO_PATH, DEFAULT_OG_IMAGE_PATH, insightOgImagePath };
