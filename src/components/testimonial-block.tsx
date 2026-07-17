import { siteConfig } from "@/config/site";

export function TestimonialBlock() {
  if (siteConfig.testimonials.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Trusted by legal professionals</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {siteConfig.testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="rounded-lg border border-slate-200 bg-slate-50 p-8"
            >
              <p className="text-lg leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6 border-t border-slate-200 pt-4">
                <cite className="not-italic">
                  <span className="font-semibold text-slate-900">{t.author}</span>
                  <span className="block text-sm text-slate-600">
                    {t.role}, {t.firm}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
