import Link from "next/link";

export function CTABanner({
  title = "Need a commercial dispute expert witness?",
  description = "Submit a confidential enquiry and we will respond within one business day.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-t border-border bg-charcoal text-white">
      <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-14 lg:px-8">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-balance break-words sm:text-2xl md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {description}
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md border-2 border-white/30 bg-white px-6 py-3 text-sm font-semibold text-charcoal transition hover:bg-white/90 sm:w-auto"
        >
          Submit enquiry
        </Link>
      </div>
    </section>
  );
}
