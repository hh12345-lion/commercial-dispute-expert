import fs from "fs";
import path from "path";
import matter from "gray-matter";

const insightsDirectory = path.join(process.cwd(), "content/insights");

export type InsightFrontmatter = {
  title: string;
  description: string;
  date: string;
  /** Optional content update date (ISO) for sitemap lastmod and Article schema */
  modified?: string;
  author: string;
  tags: string[];
  slug: string;
  /** Optional featured image path under /public */
  image?: string;
  imageAlt?: string;
};

export type InsightPost = InsightFrontmatter & {
  content: string;
};

export function getInsightSlugs(): string[] {
  if (!fs.existsSync(insightsDirectory)) return [];
  return fs
    .readdirSync(insightsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getInsightBySlug(slug: string): InsightPost | null {
  const fullPath = path.join(insightsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    modified: data.modified as string | undefined,
    author: data.author as string,
    tags: (data.tags as string[]) ?? [],
    image: data.image as string | undefined,
    imageAlt: data.imageAlt as string | undefined,
    content,
  };
}

/** Related posts sharing at least one tag (excludes current slug) */
export function getRelatedInsights(slug: string, limit = 3): InsightPost[] {
  const current = getInsightBySlug(slug);
  if (!current) return [];

  const tagSet = new Set(current.tags);
  return getAllInsights()
    .filter((p) => p.slug !== slug && p.tags.some((t) => tagSet.has(t)))
    .slice(0, limit);
}

export function getAllInsights(): InsightPost[] {
  return getInsightSlugs()
    .map((slug) => getInsightBySlug(slug))
    .filter((post): post is InsightPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
