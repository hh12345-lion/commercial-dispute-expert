import Link from "next/link";
import { getRelatedInsights } from "@/lib/mdx";

export function RelatedInsights({ slug }: { slug: string }) {
  const related = getRelatedInsights(slug, 3);
  if (related.length === 0) return null;

  return (
    <aside className="mt-12 border-t-2 border-navy pt-8">
      <h2 className="text-lg font-bold text-navy">Related insights</h2>
      <ul className="mt-4 space-y-3">
        {related.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/insights/${post.slug}`}
              className="font-medium text-navy hover:underline"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-foreground/80 line-clamp-2">{post.description}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
