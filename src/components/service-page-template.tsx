import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Chevron } from "@/components/brand";
import { servicePhoto } from "@/lib/page-photos";
import { FAQAccordion } from "@/components/faq-accordion";
import { CTABanner } from "@/components/cta-banner";
import { FAQPageJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { servicesContent, type ServiceContent } from "@/lib/services-content";

export function ServicePageTemplate({ service }: { service: ServiceContent }) {
  const related = service.relatedSlugs
    .map((slug) => servicesContent[slug])
    .filter(Boolean);

  return (
    <>
      <FAQPageJsonLd faqs={service.faqs} />
      <ServiceJsonLd service={service} />
      <PageHero
        title={service.title}
        intro={service.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        currentPath={service.path}
        photo={servicePhoto(service.slug)}
      />
      <article className="mx-auto w-full min-w-0 max-w-5xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold break-words text-navy sm:text-3xl">
            When legal teams instruct us
          </h2>
          <ul className="mt-6 space-y-3">
            {service.whenToInstruct.map((item) => (
              <li key={item} className="flex gap-3 text-foreground">
                <Chevron className="mt-1.5 h-3 w-auto shrink-0 text-burgundy" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold break-words text-navy sm:text-3xl">Deliverables</h2>
          <ul className="mt-6 list-disc space-y-2 pl-6 text-foreground marker:text-burgundy">
            {service.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold break-words text-navy sm:text-3xl">Our process</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2">
            {service.processSteps.map((step, i) => (
              <li
                key={step.title}
                className="border-l-4 border-navy bg-cream p-6"
              >
                <span className="font-heading text-2xl font-extrabold text-burgundy">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold text-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-extrabold break-words text-navy sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-extrabold break-words text-navy sm:text-3xl">
              Related services
            </h2>
            <ul className="mt-6 flex flex-wrap gap-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={r.path}
                    className="inline-flex items-center gap-2 border-2 border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-white"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <CTABanner />
    </>
  );
}
