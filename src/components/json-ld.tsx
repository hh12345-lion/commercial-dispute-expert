import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { BRAND_LOGO_PATH, insightOgImagePath } from "@/lib/seo/brand-assets";
import { isPlaceholder } from "@/lib/seo/placeholders";
import type { ServiceFaq } from "@/lib/services-content";
import type { ServiceContent } from "@/lib/services-content";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const { contact } = siteConfig;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl("/")}#organization`,
    name: siteConfig.businessName,
    description: siteConfig.connectorPitch,
    url: absoluteUrl("/"),
    email: contact.email,
    inLanguage: "en",
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(BRAND_LOGO_PATH),
      width: 512,
      height: 512,
    },
    knowsAbout: [
      "Commercial dispute expert witness",
      "Forensic accounting",
      "Loss of profits quantum",
      "CPR Part 35 expert reports",
      "Business valuation disputes",
    ],
    serviceType: [
      "Expert witness services",
      "Forensic accounting",
      "Litigation support",
      "Quantum of damages",
    ],
  };

  if (!isPlaceholder(contact.phone)) {
    data.telephone = contact.phone;
  }

  const { line1, line2, country } = contact.address;
  if (!isPlaceholder(line1) && !isPlaceholder(line2)) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: line1,
      addressLocality: line2,
      addressCountry: country,
    };
  }

  const linkedIn = siteConfig.socialLinks.linkedin;
  if (!isPlaceholder(linkedIn)) {
    data.sameAs = [linkedIn];
  }

  return <JsonLdScript data={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: siteConfig.businessName,
    url: absoluteUrl("/"),
    description: siteConfig.connectorPitch,
    inLanguage: "en",
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
  };

  return <JsonLdScript data={data} />;
}

type BreadcrumbItem = { label: string; href?: string };

export function BreadcrumbListJsonLd({
  items,
  currentPath,
}: {
  items: BreadcrumbItem[];
  currentPath: string;
}) {
  const elements = items.map((item, index) => {
    const isLast = index === items.length - 1;
    const itemUrl = item.href
      ? absoluteUrl(item.href)
      : isLast
        ? absoluteUrl(currentPath)
        : undefined;

    const entry: Record<string, unknown> = {
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
    };
    if (itemUrl) entry.item = itemUrl;
    return entry;
  });

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: elements,
      }}
    />
  );
}

export function FAQPageJsonLd({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}

export function ServiceJsonLd({ service }: { service: ServiceContent }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${absoluteUrl(service.path)}#service`,
        name: service.title,
        description: service.metaDescription,
        url: absoluteUrl(service.path),
        provider: { "@id": `${absoluteUrl("/")}#organization` },
        serviceType: service.title,
        audience: {
          "@type": "Audience",
          audienceType: "Legal professionals",
        },
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  date,
  modified,
  slug,
  author,
}: {
  title: string;
  description: string;
  date: string;
  modified?: string;
  slug: string;
  author: string;
}) {
  const url = absoluteUrl(`/insights/${slug}`);
  const published = new Date(date).toISOString();
  const modifiedIso = new Date(modified ?? date).toISOString();
  const authorName = isPlaceholder(author) ? siteConfig.businessName : author;
  const imageUrl = absoluteUrl(insightOgImagePath(slug));

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished: published,
        dateModified: modifiedIso,
        author: { "@type": "Organization", name: authorName },
        publisher: {
          "@type": "Organization",
          name: siteConfig.businessName,
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl(BRAND_LOGO_PATH),
            width: 512,
            height: 512,
          },
        },
        image: [imageUrl],
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        inLanguage: "en",
      }}
    />
  );
}

export function BlogJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${absoluteUrl("/insights")}#blog`,
        name: `${siteConfig.businessName} Insights`,
        description:
          "Articles for legal professionals on commercial dispute expert witnesses, forensic accounting and expert evidence.",
        url: absoluteUrl("/insights"),
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en",
      }}
    />
  );
}
