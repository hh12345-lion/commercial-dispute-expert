import { Breadcrumb } from "@/components/breadcrumb";
import { PageContainer } from "@/components/page-container";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PAGE_TITLE_CLASS } from "@/lib/ui-classes";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of use for commercialdisputeexpert.com.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageContainer>
      <Breadcrumb
        currentPath="/terms"
        items={[{ label: "Home", href: "/" }, { label: "Terms of use" }]}
      />
      <h1 className={PAGE_TITLE_CLASS}>Terms of use</h1>
      <p className="mt-4 text-sm text-foreground/70">Last updated: May 2026</p>

      <div className="prose-cde mt-8">
        <p>
          By using {siteConfig.domain}, you agree to these terms. If you do not agree, please do not
          use this website.
        </p>
        <h2>Website purpose</h2>
        <p>
          This website provides information about forensic accounting and expert witness services
          for legal professionals. It does not constitute legal advice and does not create a
          client relationship or expert appointment.
        </p>
        <h2>No reliance</h2>
        <p>
          Content is for general information only. You should obtain appropriate professional advice
          before acting on any matter described on this site.
        </p>
        <h2>Intellectual property</h2>
        <p>
          Text, design and branding are owned by {siteConfig.legalEntityName} unless otherwise
          stated. You may not reproduce content without permission.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by law, we exclude liability for loss arising from use of this
          website. Nothing in these terms excludes or limits liability for death or personal injury
          caused by negligence, fraud, or any other liability that cannot be excluded or limited
          under applicable law. Content on this site is for general information only and does not
          constitute legal or expert advice.
        </p>
        <h2>Governing law</h2>
        <p>
          These terms are governed by applicable law as agreed in writing between you and us. Disputes
          shall be resolved in the courts or forums specified in that agreement.
        </p>
      </div>
    </PageContainer>
  );
}
