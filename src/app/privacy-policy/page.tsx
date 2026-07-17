import { Breadcrumb } from "@/components/breadcrumb";
import { PageContainer } from "@/components/page-container";
import { buildMetadata } from "@/lib/seo";
import { isPlaceholder } from "@/lib/seo/placeholders";
import { siteConfig } from "@/config/site";
import { PAGE_TITLE_CLASS } from "@/lib/ui-classes";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for commercialdisputeexpert.com.",
  path: "/privacy-policy",
  noIndex: false,
});

function formatAddress(): string | null {
  const { line1, line2, country } = siteConfig.contact.address;
  if (isPlaceholder(line1) || isPlaceholder(line2)) return null;
  const parts = [line1, line2, isPlaceholder(country) ? null : country].filter(Boolean);
  return parts.join(", ");
}

export default function PrivacyPolicyPage() {
  const registeredAddress = formatAddress();

  return (
    <PageContainer>
      <Breadcrumb
        currentPath="/privacy-policy"
        items={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
      />
      <h1 className={PAGE_TITLE_CLASS}>Privacy policy</h1>
      <p className="mt-4 text-sm text-foreground/70">Last updated: May 2026</p>

      <div className="prose-cde mt-8">
        <p>
          {siteConfig.legalEntityName} ({siteConfig.businessName}) is committed to protecting your
          privacy. This policy explains how we collect and use personal data when you visit{" "}
          {siteConfig.domain} or contact us.
        </p>
        <h2>Data we collect</h2>
        <p>
          When you submit a contact or instruction form, we collect your name, firm, email, phone,
          case type and message. We may collect technical data such as IP address and browser type
          through analytics if you consent to cookies.
        </p>
        <h2>How we use your data</h2>
        <p>
          We use enquiry data to respond to your request, assess conflicts and manage expert witness
          engagements. We do not sell personal data to third parties.
        </p>
        <h2>Legal basis</h2>
        <p>
          Processing is based on legitimate interests in responding to professional enquiries and,
          where applicable, performance of a contract.
        </p>
        <h2>Retention</h2>
        <p>
          Enquiry data is retained only as long as necessary for the purposes above and in accordance
          with professional obligations.
        </p>
        <h2>Your rights</h2>
        <p>
          You may request access, correction or deletion of your personal data by contacting{" "}
          {siteConfig.contact.email}. You may complain to the ICO.
        </p>
        <h2>Data controller</h2>
        <p>
          The data controller is {siteConfig.legalEntityName} ({siteConfig.businessName}).
          {registeredAddress ? (
            <> Registered address: {registeredAddress}.</>
          ) : null}{" "}
          Contact:{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-green underline">
            {siteConfig.contact.email}
          </a>
          {!isPlaceholder(siteConfig.contact.phone) ? (
            <> · Phone: {siteConfig.contact.phone}</>
          ) : null}
          .
          {!isPlaceholder(siteConfig.companyNumber) ? (
            <> Company number: {siteConfig.companyNumber}.</>
          ) : null}
        </p>
      </div>
    </PageContainer>
  );
}
