import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { photos } from "@/lib/images";
import { BlogJsonLd } from "@/components/json-ld";
import { ContentSection } from "@/components/content-section";
import { buildMetadata } from "@/lib/seo";
import { getAllInsights } from "@/lib/mdx";
import { fallbackPhoto } from "@/lib/page-photos";

export const metadata = buildMetadata({
  title: "Insights - Commercial Dispute & Expert Witness",
  description:
    "Articles for legal professionals on expert determination, loss of profits quantum, expert witness appointments and commercial dispute forensic accounting.",
  path: "/insights",
});

export default function InsightsIndexPage() {
  const posts = getAllInsights();

  return (
    <>
      <BlogJsonLd />
      <PageHero
        title="Insights"
        intro="Practical guidance for legal professionals on forensic accounting, quantum and expert witness procedure in commercial disputes."
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        currentPath="/insights"
        photo={photos.stockExchange}
      />
      <ContentSection>
      <ul className="grid gap-10 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="flex flex-col gap-5">
                <Link
                  href={`/insights/${post.slug}`}
                  className="chevron-r relative block aspect-[16/9] w-full shrink-0 overflow-hidden bg-cream"
                >
                  <Image
                    src={post.image ?? fallbackPhoto(post.slug).src}
                    alt={post.image ? (post.imageAlt ?? post.title) : fallbackPhoto(post.slug).alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 540px"
                  />
                </Link>
              <div className="min-w-0 flex-1">
                <time dateTime={post.date} className="text-sm text-foreground/60">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2 className="mt-2 text-xl font-extrabold break-words text-navy sm:text-2xl">
                  <Link href={`/insights/${post.slug}`} className="hover:text-burgundy">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-2xl text-foreground">{post.description}</p>
                <Link
                  href={`/insights/${post.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-brand-green hover:underline"
                >
                  Read article
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
      </ContentSection>
    </>
  );
}
