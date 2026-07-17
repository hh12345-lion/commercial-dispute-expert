import Link from "next/link";
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { CTABanner } from "@/components/cta-banner";
import { ContentSection } from "@/components/content-section";
import { StatsTable } from "@/components/stats-table";
import { ContentClusterNav } from "@/components/content-cluster-nav";
import { siteConfig } from "@/config/site";
import { TRUST_POINTS } from "@/lib/industry-stats";

export default function HomePage() {
  return (
    <>
      <Hero
        title="Commercial Dispute Expert Witness Services for Legal Professionals"
        description={siteConfig.connectorPitch}
      />

      <ContentSection>
        <h2 className="text-xl font-bold text-balance break-words text-charcoal sm:text-2xl md:text-3xl">
          What our commercial dispute expert witnesses cover
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.navigation.services.map((s) => (
            <ServiceCard key={s.href} title={s.title} description={s.description} href={s.href} />
          ))}
        </div>
      </ContentSection>

      <ContentSection alt>
        <h2 className="text-xl font-bold text-balance break-words text-charcoal sm:text-2xl md:text-3xl">
          Commercial dispute expert witness: key industry statistics
        </h2>
        <div className="mt-6">
          <StatsTable />
        </div>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl font-bold text-balance break-words text-charcoal sm:text-2xl md:text-3xl">
          Why legal professionals trust our expert network
        </h2>
        <ul className="mt-6 list-disc space-y-2 pl-6 text-foreground">
          {TRUST_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection alt>
        <h2 className="text-xl font-bold text-balance break-words text-charcoal sm:text-2xl md:text-3xl">
          What is a commercial dispute expert witness?
        </h2>
        <div className="mt-4 space-y-4 text-foreground leading-relaxed">
          <p>
            A commercial dispute expert witness is an independent forensic accountant or financial
            expert instructed to provide a court-admissible opinion on quantum, valuation or
            financial misconduct. Unlike litigation support behind the scenes, the expert&apos;s
            primary duty is to the court under English law and CPR Part 35 — whether appointed as a single joint
            expert or by one party alone.
          </p>
          <p>
            Commercial litigation and arbitration turn on credible damages models, clear methodology
            and sector-aware analysis.{" "}
            <Link href="/how-to-instruct" className="font-medium text-brand-green underline">
              Read how to instruct
            </Link>{" "}
            or browse{" "}
            <Link href="/case-types" className="font-medium text-brand-green underline">
              case types
            </Link>{" "}
            for your matter.
          </p>
        </div>
      </ContentSection>

      <ContentSection>
        <ContentClusterNav />
      </ContentSection>

      <CTABanner />
    </>
  );
}
