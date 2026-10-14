import Image from "next/image";
import { ContentSection } from "@/components/content-section";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";
import { photos } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Image Credits",
  description: "Sources, authors and licences for the photographs used on this website.",
  path: "/image-credits",
});

export default function ImageCreditsPage() {
  return (
    <>
      <PageHero
        title="Image credits"
        intro="The photographs on this site come from Wikimedia Commons. Each has been resized or cropped to fit its frame and is otherwise unaltered."
        crumbs={[{ label: "Home", href: "/" }, { label: "Image credits" }]}
        currentPath="/image-credits"
      />
      <ContentSection>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(photos).map((photo) => (
            <li key={photo.src} className="border-l-4 border-navy pl-4">
              <div className="chevron-r relative aspect-[16/10] overflow-hidden bg-cream">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, 360px"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-navy">{photo.credit.title}</p>
              <p className="mt-1 text-sm text-ink/75">
                {photo.credit.creator}
                {" · "}
                {photo.credit.licenseUrl ? (
                  <a href={photo.credit.licenseUrl} rel="noopener noreferrer" className="text-burgundy underline">
                    {photo.credit.license}
                  </a>
                ) : (
                  photo.credit.license
                )}
                {" · "}
                <a href={photo.credit.source} rel="noopener noreferrer" className="text-burgundy underline">
                  Source
                </a>
              </p>
            </li>
          ))}
        </ul>
      </ContentSection>
    </>
  );
}
