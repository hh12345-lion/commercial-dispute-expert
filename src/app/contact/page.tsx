import { PageHero } from "@/components/page-hero";
import { photos } from "@/lib/images";
import { ContactForm } from "@/components/contact-form";
import { ContentSection } from "@/components/content-section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Contact Commercial Dispute Expert",
  description:
    "Contact Commercial Dispute Expert for confidential expert witness matching enquiries from counsel and legal teams.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        intro="Enquiries are treated confidentially. We respond to counsel and authorised representatives. Submit your details below."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        currentPath="/contact"
        photo={photos.courthouseTower}
      />
      <ContentSection>

      <div className="mt-12 grid min-w-0 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="min-w-0 order-2 lg:order-1">
          <h2 className="text-2xl font-extrabold text-navy">Direct contact</h2>
          <dl className="mt-6 space-y-4 text-foreground">
            <div>
              <dt className="text-sm font-medium text-foreground/60">Email</dt>
              <dd>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-burgundy hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-8 text-sm text-foreground/80">
            <a href="/how-to-instruct" className="font-medium text-burgundy underline">
              How to instruct
            </a>
          </p>
        </div>
        <div className="min-w-0 order-1 lg:order-2 border-t-4 border-navy bg-white p-6 shadow-[0_20px_40px_-30px_rgba(3,38,59,0.5)] sm:p-8">
          <ContactForm formType="contact" title="Send a message" />
        </div>
      </div>
      </ContentSection>
    </>
  );
}
