import Image from "next/image";
import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { CTABanner } from "@/components/cta-banner";
import { ContentSection } from "@/components/content-section";
import { ContentClusterNav } from "@/components/content-cluster-nav";
import { Chevron, ChevronPhoto, Mark } from "@/components/brand";
import { siteConfig } from "@/config/site";
import { TRUST_POINTS, PROCESS_STEPS } from "@/lib/industry-stats";
import { CASE_TYPES } from "@/lib/case-types";
import { photos } from "@/lib/images";
import { caseTypePhoto, servicePhoto } from "@/lib/page-photos";

const sectors = [
  { label: "Manufacturing & industry", photo: photos.steelWorks },
  { label: "Construction & real estate", photo: photos.construction },
  { label: "Retail", photo: photos.shoppingCentre },
  { label: "Hospitality", photo: photos.hotelLobby },
];

export default function HomePage() {
  return (
    <>
      {/* Hero: the title leads; the photographs point forward like the mark */}
      <section className="relative overflow-hidden bg-navy text-cream">
        <Mark
          className="pointer-events-none absolute -left-24 -top-16 h-[34rem] w-auto opacity-[0.06]"
          bracket="#F4EFE8"
          chevron="#F4EFE8"
        />
        <div className="relative mx-auto grid min-w-0 max-w-6xl gap-14 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div className="min-w-0">
            <h1 className="text-4xl font-extrabold leading-[1.05] text-white break-words sm:text-5xl lg:text-[3.6rem]">
              Commercial dispute expert witnesses for counsel
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
              {siteConfig.connectorPitch}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-burgundy hover:!bg-white hover:!text-navy">
                Submit an enquiry
                <Chevron className="h-3 w-auto text-white" />
              </Link>
              <Link href="/how-to-instruct" className="btn-cream">
                How to instruct
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-cream/15 pt-6 text-sm text-cream/85">
              {siteConfig.expert.jurisdictions.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Chevron className="h-2.5 w-auto text-burgundy" />
                  {item}
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Chevron className="h-2.5 w-auto text-burgundy" />
                Mediation and expert determination
              </li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-lg pb-16 lg:max-w-none">
            <ChevronPhoto
              photo={photos.courtroomMural}
              priority
              bracket="border-cream"
              className="ml-3"
              sizes="(max-width: 1024px) 90vw, 520px"
            />
            <div className="absolute -bottom-2 right-0 w-1/2">
              <ChevronPhoto
                photo={photos.contractPen}
                bracket="border-burgundy"
                aspect="aspect-[4/3]"
                sizes="(max-width: 1024px) 45vw, 260px"
              />
            </div>
          </div>
        </div>
      </section>

      <ContentSection>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-extrabold text-navy break-words md:text-4xl">
            Expert witness services
          </h2>
          <Link href="/services" className="btn-line text-sm">
            View all services
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.navigation.services.slice(0, 6).map((s) => (
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

      <section className="bg-cream">
        <div className="mx-auto grid min-w-0 max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-20">
          <ChevronPhoto
            photo={photos.counselTables}
            className="ml-3 hidden lg:block"
            sizes="460px"
          />
          <div>
            <h2 className="text-3xl font-extrabold text-navy break-words md:text-4xl">
              How we work with legal teams
            </h2>
            <ol className="mt-8 space-y-0 border-t-2 border-navy">
              {PROCESS_STEPS.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-stone/50 py-6">
                  <span className="font-heading text-3xl font-extrabold text-burgundy" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/85">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ContentSection>
        <h2 className="text-3xl font-extrabold text-navy break-words md:text-4xl">
          Common commercial disputes
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_TYPES.map((c) => (
            <li key={c.slug}>
              <Link href={`/case-types/${c.slug}`} className="group block">
                <div className="chevron-r relative aspect-[16/10] overflow-hidden" style={{ ["--tip" as string]: "10%" }}>
                  <Image
                    src={caseTypePhoto(c.slug).src}
                    alt={caseTypePhoto(c.slug).alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 360px"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-4 flex items-center gap-2 text-lg font-bold text-navy group-hover:text-burgundy">
                  {c.hubLabel}
                  <Chevron className="h-2.5 w-auto text-burgundy" />
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{c.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </ContentSection>

      <section className="bg-navy text-cream">
        <div className="mx-auto min-w-0 max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-3xl font-extrabold text-white break-words md:text-4xl">
                Why counsel work with our network
              </h2>
              <ul className="mt-8 space-y-4">
                {TRUST_POINTS.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed text-cream/85">
                    <Chevron className="mt-1.5 h-3 w-auto shrink-0 text-burgundy" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="grid grid-cols-2 gap-4 self-start">
              {sectors.map((s) => (
                <li key={s.label}>
                  <div className="chevron-r relative aspect-[4/3] overflow-hidden" style={{ ["--tip" as string]: "12%" }}>
                    <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(max-width: 1024px) 45vw, 270px" className="object-cover" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-white">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContentSection>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-extrabold text-navy break-words md:text-4xl">
              What is a commercial dispute expert witness?
            </h2>
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-ink/85">
              <p>
                A commercial dispute expert witness is an independent forensic accountant or
                financial expert instructed to provide a court-admissible opinion on quantum,
                valuation or financial misconduct. Unlike litigation support behind the scenes, the
                expert&apos;s primary duty is to the tribunal, whether appointed jointly or by one
                party alone.
              </p>
              <p>
                Commercial litigation and arbitration turn on credible damages models, clear
                methodology and sector-aware analysis.{" "}
                <Link href="/how-to-instruct" className="font-semibold text-burgundy underline underline-offset-4">
                  Read how to instruct
                </Link>{" "}
                or browse{" "}
                <Link href="/case-types" className="font-semibold text-burgundy underline underline-offset-4">
                  case types
                </Link>{" "}
                for your matter.
              </p>
            </div>
          </div>
          <ContentClusterNav />
        </div>
      </ContentSection>

      <CTABanner />
    </>
  );
}
