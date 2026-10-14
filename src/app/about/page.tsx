import { PageHero } from "@/components/page-hero";
import { photos } from "@/lib/images";
import { CTABanner } from "@/components/cta-banner";
import { ContentSection } from "@/components/content-section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "About - Commercial Dispute Expert Witness",
  description: siteConfig.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About us"
        intro={`${siteConfig.connectorPitch} We are not a law firm and we do not provide legal advice to members of the public.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        currentPath="/about"
        photo={photos.chicagoTowers}
      />
      <ContentSection>
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-extrabold text-navy">How we work</h2>
          <p className="mt-4 leading-relaxed text-foreground">
            Legal professionals and counsel submit case details confidentially. We assess scope, conflicts and
            suitability, then introduce a qualified forensic accountant or commercial dispute expert
            witness from our network. Experts owe their duty to the court where formally appointed.
          </p>
        </section>
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-extrabold text-navy">Independence</h2>
          <p className="mt-4 leading-relaxed text-foreground">
            Expert reports include the required statement of truth and declaration. Where analysis
            does not support the instructing party&apos;s case, a credible expert says so; we only
            work with professionals who maintain that standard.
          </p>
        </section>
      </ContentSection>
      <CTABanner />
    </>
  );
}
