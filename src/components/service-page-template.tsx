import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { FAQAccordion } from "@/components/faq-accordion";
import { CTABanner } from "@/components/cta-banner";
import { FAQPageJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { servicesContent, type ServiceContent } from "@/lib/services-content";
import { CheckCircle2 } from "lucide-react";

export function ServicePageTemplate({ service }: { service: ServiceContent }) {
  const related = service.relatedSlugs
    .map((slug) => servicesContent[slug])
    .filter(Boolean);

  return (
    <>
      <FAQPageJsonLd faqs={service.faqs} />
      <ServiceJsonLd service={service} />
      <Breadcrumb
        currentPath={service.path}
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <article>
      <h1 className="text-2xl font-bold tracking-tight text-balance break-words text-charcoal sm:text-3xl md:text-4xl">
        {service.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-foreground sm:mt-6 sm:text-lg">
        {service.intro}
      </p>

        <section className="mt-12">
          <h2 className="text-xl font-bold break-words text-charcoal sm:text-2xl">
            When legal teams instruct us
          </h2>
          <ul className="mt-6 space-y-3">
            {service.whenToInstruct.map((item) => (
              <li key={item} className="flex gap-3 text-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold break-words text-charcoal sm:text-2xl">Deliverables</h2>
          <ul className="mt-6 list-disc space-y-2 pl-6 text-foreground">
            {service.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold break-words text-charcoal sm:text-2xl">Our process</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2">
            {service.processSteps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-lg border border-border bg-muted p-6"
              >
                <span className="text-sm font-bold text-brand-green">Step {i + 1}</span>
                <h3 className="mt-2 font-semibold text-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-bold break-words text-charcoal sm:text-2xl">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold break-words text-charcoal sm:text-2xl">
              Related services
            </h2>
            <ul className="mt-6 flex flex-wrap gap-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={r.path}
                    className="rounded-full border border-border px-4 py-2 text-sm font-medium text-charcoal hover:border-brand-green/40"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <div className="mt-16">
        <CTABanner />
      </div>
    </>
  );
}
