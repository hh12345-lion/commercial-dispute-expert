import { ServiceCard } from "@/components/service-card";
import { CTABanner } from "@/components/cta-banner";
import { ContentSection } from "@/components/content-section";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { photos } from "@/lib/images";
import { servicePhoto } from "@/lib/page-photos";

export const metadata = buildMetadata({
  title: "Commercial Dispute Expert Services",
  description:
    "Expert witness and forensic accounting services for commercial disputes: quantum, valuations, litigation support and expert reports.",
  path: "/services",
});

export default function ServicesHubPage() {
  return (
    <>
      <PageHero
        title="Our services"
        intro={`${siteConfig.brandShort} matches legal professionals with forensic accountants and commercial dispute expert witnesses. Each area below has a dedicated page for scope and instruction.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        currentPath="/services"
        photo={photos.courtroom}
      />
      <ContentSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.navigation.services.map((s) => (
            <ServiceCard
              key={s.href}
              title={s.title}
              description={s.description}
              href={s.href}
              photo={servicePhoto(s.href)}
            />
          ))}
        </div>
      </ContentSection>
      <CTABanner />
    </>
  );
}
