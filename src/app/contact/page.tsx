import { Breadcrumb } from "@/components/breadcrumb";
import { ContactForm } from "@/components/contact-form";
import { ContentSection } from "@/components/content-section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Contact Commercial Dispute Expert",
  description:
    "Contact Commercial Dispute Expert for confidential expert witness matching enquiries from legal professionals and counsel.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <ContentSection className="!py-10">
      <Breadcrumb
        currentPath="/contact"
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <h1 className="text-3xl font-bold text-charcoal md:text-4xl">Contact us</h1>
      <p className="mt-6 max-w-3xl text-lg text-foreground">
        Enquiries are treated confidentially. We respond to legal professionals, counsel and authorised
        representatives. Submit case details for expert matching - we do not publish fee quotes on
        this site; indicative industry benchmarks are shown on the home page for reference only.
      </p>

      <div className="mt-12 grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0 order-2 lg:order-1">
          <h2 className="text-xl font-bold text-charcoal">Get in touch</h2>
          <dl className="mt-6 space-y-4 text-foreground">
            <div>
              <dt className="text-sm font-medium text-foreground/60">Email</dt>
              <dd>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-green hover:underline">
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-8 text-sm text-foreground/80">
            <a href="/how-to-instruct" className="font-medium text-brand-green underline">
              How to instruct
            </a>
          </p>
        </div>
        <div className="min-w-0 order-1 lg:order-2">
          <ContactForm formType="contact" />
        </div>
      </div>
    </ContentSection>
  );
}
