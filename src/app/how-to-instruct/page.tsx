import { PageHero } from "@/components/page-hero";
import { photos } from "@/lib/images";
import { ContactForm } from "@/components/contact-form";
import { ContentSection } from "@/components/content-section";
import { CTABanner } from "@/components/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { FileText, Mail, Phone } from "lucide-react";

export const metadata = buildMetadata({
  title: "How to Instruct a Forensic Expert Witness",
  description:
    "How to instruct Commercial Dispute Expert: engagement process, documents required and expert witness appointments for counsel.",
  path: "/how-to-instruct",
});

export default function HowToInstructPage() {
  return (
    <>
      <PageHero
        title="How to instruct us"
        intro="Confidential initial discussions for counsel and legal teams. We assess suitability and introduce a matched expert from our network. No named expert profiles are published before instruction."
        crumbs={[{ label: "Home", href: "/" }, { label: "How to instruct" }]}
        currentPath="/how-to-instruct"
        photo={photos.contractPen}
      />
      <ContentSection>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-extrabold text-navy">Initial enquiry</h2>
          <p className="mt-4 text-foreground">
            Contact us with a brief overview: dispute type, forum, party-appointed or jointly
            retained expert, quantum issues and deadlines. We confirm conflicts and availability
            before introduction.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold text-navy">Letter of instruction checklist</h2>
          <ol className="mt-6 list-decimal space-y-3 pl-6 text-foreground">
            <li>Parties, claim value and forum</li>
            <li>Specific financial questions for the expert</li>
            <li>Pleadings, orders and key financial disclosure</li>
            <li>Opposing expert reports if replying</li>
            <li>Timetable for exchange and hearing</li>
          </ol>
        </section>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: FileText, title: "1. Scope", text: "Written terms and deliverables agreed." },
            { icon: Mail, title: "2. Documents", text: "Secure transfer and review." },
            { icon: Phone, title: "3. Expert intro", text: "Matched specialist appointed." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="border-l-4 border-navy bg-cream p-6">
              <Icon className="h-6 w-6 text-burgundy" aria-hidden />
              <h3 className="mt-4 font-semibold text-charcoal">{title}</h3>
              <p className="mt-2 text-sm text-foreground">{text}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-foreground">
          Email:{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-brand-accent">
            {siteConfig.contact.email}
          </a>
        </p>

        <section className="mt-16 max-w-2xl border-t-4 border-navy bg-white p-6 shadow-[0_20px_40px_-30px_rgba(3,38,59,0.5)] sm:p-8">
          <ContactForm formType="instruct" title="Submit an instruction enquiry" />
        </section>
      </ContentSection>
      <CTABanner />
    </>
  );
}
