import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTABanner } from "@/components/cta-banner";
import { ContentSection } from "@/components/content-section";
import { buildMetadata } from "@/lib/seo";
import { CASE_TYPES } from "@/lib/case-types";

export const metadata = buildMetadata({
  title: "Case Types - Commercial Dispute Expert Witness",
  description:
    "Commercial litigation and dispute case types where forensic accounting and expert witness evidence is commonly required.",
  path: "/case-types",
});

export default function CaseTypesHubPage() {
  return (
    <>
      <ContentSection className="!py-10">
        <Breadcrumb
          currentPath="/case-types"
          items={[{ label: "Home", href: "/" }, { label: "Case types" }]}
        />
        <h1 className="text-3xl font-bold text-charcoal md:text-4xl">Case types</h1>
        <p className="mt-4 max-w-3xl text-lg text-foreground">
          Browse common commercial dispute scenarios where legal teams instruct forensic accountants
          and commercial dispute expert witnesses.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {CASE_TYPES.map((c) => (
            <Link
              key={c.slug}
              href={`/case-types/${c.slug}`}
              className="rounded-lg border border-border bg-white p-6 shadow-sm transition hover:border-brand-green/30"
            >
              <h2 className="font-semibold text-charcoal">{c.hubLabel}</h2>
              <p className="mt-2 text-sm text-foreground">{c.summary}</p>
            </Link>
          ))}
        </div>
      </ContentSection>
      <CTABanner />
    </>
  );
}
