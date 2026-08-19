import Link from "next/link";

type HeroProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const highlights = [
  "Forensic accounting and quantum analysis",
  "Court-ready expert reports and testimony",
  "Litigation and arbitration experience",
] as const;

export function Hero({
  title,
  description,
  ctaLabel = "Submit an enquiry",
  ctaHref = "/contact",
}: HeroProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid min-w-0 max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:px-8 lg:py-20">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
            For counsel and legal teams
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance break-words text-charcoal sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={ctaHref}
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-charcoal px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal/90 sm:w-auto"
            >
              {ctaLabel}
            </Link>
            <Link
              href="/how-to-instruct"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold text-charcoal transition hover:bg-muted sm:w-auto"
            >
              How to instruct
            </Link>
          </div>
        </div>

        <aside className="min-w-0 rounded-xl border border-border bg-muted/60 p-6 sm:p-8">
          <p className="text-sm font-semibold text-charcoal">What we connect you with</p>
          <ul className="mt-5 space-y-4">
            {highlights.map((item, index) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-xs font-bold text-brand-accent"
                  aria-hidden
                >
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
