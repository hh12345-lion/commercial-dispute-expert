import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageContainer } from "@/components/page-container";
import { ArticleJsonLd } from "@/components/json-ld";
import { RelatedInsights } from "@/components/related-insights";
import { CTABanner } from "@/components/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { getInsightBySlug } from "@/lib/mdx";
import { fallbackPhoto } from "@/lib/page-photos";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return {};
  const meta = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${slug}`,
    keywords: post.tags,
    ogImagePath: post.image,
  });

  const modified = post.modified ?? post.date;
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: modified,
    },
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 text-2xl font-extrabold break-words text-navy sm:text-[1.75rem]"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 text-lg font-bold break-words text-navy sm:text-xl"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[280px] text-left text-sm" {...props} />
    </div>
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-relaxed text-foreground" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-medium text-burgundy underline hover:text-burgundy/80" {...props} />
  ),
};

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();
  // Posts without their own picture borrow a topical site photograph.
  const heroImage = post.image
    ? { src: post.image, alt: post.imageAlt ?? post.title }
    : fallbackPhoto(post.slug);

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        modified={post.modified}
        slug={post.slug}
        author={post.author}
        image={post.image}
      />
      <section className="border-b border-border bg-cream">
        <div className="mx-auto grid min-w-0 max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
          <header className="min-w-0">
            <h1 className="text-3xl font-extrabold leading-[1.12] text-navy break-words sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/85">{post.description}</p>
            <time dateTime={post.date} className="mt-5 block text-sm text-ink/70">
              {new Date(post.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <div className="mt-6">
              <Breadcrumb
                currentPath={`/insights/${slug}`}
                items={[
                  { label: "Home", href: "/" },
                  { label: "Insights", href: "/insights" },
                  { label: post.title },
                ]}
              />
            </div>
          </header>
          {heroImage ? (
            <div className="relative ml-3">
              <div className="absolute -bottom-3 -left-3 -top-3 w-2/5 border-y-[10px] border-l-[10px] border-navy" aria-hidden />
              <div className="chevron-r relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <PageContainer>
      <div className="prose-cde mt-2">
        <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      <aside className="mt-12 border-l-4 border-navy bg-cream p-6">
        <p className="text-sm font-medium text-foreground/60">Author</p>
        <p className="mt-1 font-semibold text-charcoal">{post.author}</p>
        <Link href="/contact" className="mt-2 inline-block text-sm text-burgundy hover:underline">
          Instruct an expert
        </Link>
      </aside>

      <RelatedInsights slug={slug} />

      <aside className="mt-8">
        <p className="text-sm font-medium text-foreground/60">Related services</p>
        <ul className="mt-2 flex flex-wrap gap-3">
          <li>
            <Link href="/services/commercial-dispute-expert-witness" className="text-sm text-burgundy underline">
              Commercial dispute expert witness
            </Link>
          </li>
          <li>
            <Link href="/services/loss-of-profits-quantum" className="text-sm text-burgundy underline">
              Loss of profits & quantum
            </Link>
          </li>
          <li>
            <Link href="/services/expert-reports-testimony" className="text-sm text-burgundy underline">
              Expert reports & testimony
            </Link>
          </li>
        </ul>
      </aside>

      </PageContainer>
      <CTABanner />
    </>
  );
}
