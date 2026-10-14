import { PageHero } from "@/components/page-hero";
import { photos } from "@/lib/images";
import { ServiceCard } from "@/components/service-card";
import { caseTypePhoto } from "@/lib/page-photos";
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
      <PageHero
        title="Case types"
        intro="Browse common commercial dispute scenarios where legal teams instruct forensic accountants and commercial dispute expert witnesses."
        crumbs={[{ label: "Home", href: "/" }, { label: "Case types" }]}
        currentPath="/case-types"
        photo={photos.containerPort}
      />
      <ContentSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_TYPES.map((c) => (
            <ServiceCard
              key={c.slug}
              title={c.hubLabel}
              description={c.summary}
              href={`/case-types/${c.slug}`}
              photo={caseTypePhoto(c.slug)}
            />
          ))}
        </div>
      </ContentSection>
      <CTABanner />
    </>
  );
}
