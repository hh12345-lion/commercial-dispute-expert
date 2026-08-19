import Link from "next/link";
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { CTABanner } from "@/components/cta-banner";
import { ContentSection } from "@/components/content-section";
import { TrustBar } from "@/components/trust-bar";
import { ContentClusterNav } from "@/components/content-cluster-nav";
import { siteConfig } from "@/config/site";
import { TRUST_POINTS, PROCESS_STEPS } from "@/lib/industry-stats";

export default function HomePage() {
  return (
    <>
      <Hero
        title="Commercial dispute expert witnesses for counsel"
        description={siteConfig.connectorPitch}
      />

      <TrustBar />

      <ContentSection>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-xl font-bold text-balance break-words text-charcoal sm:text-2xl md:text-3xl">
            Expert witness services
          </h2>
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-accent hover:underline"
          >
            View all services →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {siteConfig.navigation.services.slice(0, 6).map((s) => (
            <ServiceCard key={s.href} title={s.title} description={s.description} href={s.href} />
          ))}
        </div>
      </ContentSection>

      <ContentSection alt>
        <h2 className="text-xl font-bold text-balance break-words text-charcoal sm:text-2xl md:text-3xl">
          How we work with legal teams
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-lg border border-border bg-surface p-6 shadow-sm"
            >
              <span className="text-3xl font-bold text-brand-accent/30" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold text-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl font-bold text-balance break-words text-charcoal sm:text-2xl md:text-3xl">
          Why counsel work with our network
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {TRUST_POINTS.map((point) => (
            <li
              key={point}
              className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection alt>
        <h2 className="text-xl font-bold text-balance break-words text-charcoal sm:text-2xl md:text-3xl">
          What is a commercial dispute expert witness?
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-foreground leading-relaxed">
          <p>
            A commercial dispute expert witness is an independent forensic accountant or financial
            expert instructed to provide a court-admissible opinion on quantum, valuation or
            financial misconduct. Unlike litigation support behind the scenes, the expert&apos;s
            primary duty is to the tribunal — whether appointed jointly or by one party alone.
          </p>
          <p>
            Commercial litigation and arbitration turn on credible damages models, clear methodology
            and sector-aware analysis.{" "}
            <Link href="/how-to-instruct" className="font-medium text-brand-accent underline">
              Read how to instruct
            </Link>{" "}
            or browse{" "}
            <Link href="/case-types" className="font-medium text-brand-accent underline">
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
