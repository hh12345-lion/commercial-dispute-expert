import Link from "next/link";
import { ContentSection } from "@/components/content-section";
import { buildNotFoundMetadata } from "@/lib/seo";

export const metadata = buildNotFoundMetadata();

export default function NotFound() {
  return (
    <ContentSection className="!py-20">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-burgundy">404</p>
        <h1 className="mt-4 text-3xl font-bold text-navy md:text-4xl">Page not found</h1>
        <p className="mt-4 text-lg text-foreground">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy"
          >
            Return home
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center border-2 border-navy px-6 py-3 text-sm font-semibold text-navy hover:bg-muted"
          >
            Contact us
          </Link>
        </div>
        <p className="mt-8 text-sm text-foreground/80">
          <Link href="/services" className="font-medium text-burgundy hover:underline">
            Browse services
          </Link>
          {" · "}
          <Link href="/case-types" className="font-medium text-burgundy hover:underline">
            Case types
          </Link>
        </p>
      </div>
    </ContentSection>
  );
}
