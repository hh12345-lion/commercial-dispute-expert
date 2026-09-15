import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageContainer } from "@/components/page-container";
import { PAGE_TITLE_CLASS } from "@/lib/ui-classes";
import { ArticleJsonLd } from "@/components/json-ld";
import { RelatedInsights } from "@/components/related-insights";
import { CTABanner } from "@/components/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { getInsightBySlug, getInsightSlugs } from "@/lib/mdx";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

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
      className="mt-10 text-xl font-bold break-words text-charcoal sm:text-2xl"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 text-lg font-semibold break-words text-charcoal sm:text-xl"
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
    <a className="font-medium text-brand-green underline hover:text-brand-green/80" {...props} />
  ),
};

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();

  return (
    <PageContainer>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        modified={post.modified}
        slug={post.slug}
        author={post.author}
        image={post.image}
      />
      <Breadcrumb
        currentPath={`/insights/${slug}`}
        items={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title },
        ]}
      />
      <header>
        <time dateTime={post.date} className="text-sm text-foreground/60">
          {new Date(post.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <h1 className={`mt-2 ${PAGE_TITLE_CLASS}`}>{post.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-foreground sm:text-lg">
          {post.description}
        </p>
      </header>

      {post.image ? (
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </div>
      ) : null}

      <div className="prose-cde mt-10">
        <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      <aside className="mt-12 rounded-lg border border-border bg-muted p-6">
        <p className="text-sm font-medium text-foreground/60">Author</p>
        <p className="mt-1 font-semibold text-charcoal">{post.author}</p>
        <Link href="/contact" className="mt-2 inline-block text-sm text-brand-green hover:underline">
          Instruct an expert
        </Link>
      </aside>

      <RelatedInsights slug={slug} />

      <aside className="mt-8">
        <p className="text-sm font-medium text-foreground/60">Related services</p>
        <ul className="mt-2 flex flex-wrap gap-3">
          <li>
            <Link href="/services/commercial-dispute-expert-witness" className="text-sm text-brand-green underline">
              Commercial dispute expert witness
            </Link>
          </li>
          <li>
            <Link href="/services/loss-of-profits-quantum" className="text-sm text-brand-green underline">
              Loss of profits & quantum
            </Link>
          </li>
          <li>
            <Link href="/services/expert-reports-testimony" className="text-sm text-brand-green underline">
              Expert reports & testimony
            </Link>
          </li>
        </ul>
      </aside>

      <div className="mt-12 sm:mt-16">
        <CTABanner />
      </div>
    </PageContainer>
  );
}
