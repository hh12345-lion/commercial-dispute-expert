import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { BlogJsonLd } from "@/components/json-ld";
import { ContentSection } from "@/components/content-section";
import { buildMetadata } from "@/lib/seo";
import { getAllInsights } from "@/lib/mdx";

export const metadata = buildMetadata({
  title: "Insights - Commercial Dispute & Expert Witness",
  description:
    "Articles for legal professionals on expert determination, loss of profits quantum, expert witness appointments and commercial dispute forensic accounting.",
  path: "/insights",
});

export default function InsightsIndexPage() {
  const posts = getAllInsights();

  return (
    <ContentSection className="!py-10">
      <BlogJsonLd />
      <Breadcrumb
        currentPath="/insights"
        items={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />
      <h1 className="text-3xl font-bold text-charcoal md:text-4xl">Insights</h1>
      <p className="mt-6 max-w-3xl text-lg text-foreground">
        Practical guidance for legal professionals on forensic accounting, quantum and expert witness
        procedure in commercial disputes.
      </p>

      <ul className="mt-12 divide-y divide-border">
        {posts.map((post) => (
          <li key={post.slug} className="py-8">
            <article className="flex flex-col gap-5 sm:flex-row sm:items-start">
              {post.image ? (
                <Link
                  href={`/insights/${post.slug}`}
                  className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden rounded-md bg-muted sm:aspect-[4/3] sm:w-56"
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 224px"
                  />
                </Link>
              ) : null}
              <div className="min-w-0 flex-1">
                <time dateTime={post.date} className="text-sm text-foreground/60">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2 className="mt-2 text-xl font-bold break-words text-charcoal sm:text-2xl">
                  <Link href={`/insights/${post.slug}`} className="hover:text-brand-green">
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
  );
}
