import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookies/cookie-settings-button";
import { Chevron, Logo, Mark } from "@/components/brand";
import { siteConfig } from "@/config/site";

const columns = [
  {
    title: "Services",
    links: siteConfig.navigation.services.slice(0, 5).map((s) => ({ href: s.href, label: s.title })),
  },
  {
    title: "More services",
    links: siteConfig.navigation.services.slice(5).map((s) => ({ href: s.href, label: s.title })),
  },
  {
    title: "Resources",
    links: [
      { href: "/case-types", label: "Case types" },
      { href: "/insights", label: "Insights" },
      { href: "/how-to-instruct", label: "How to instruct" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-cream">
      <div className="relative overflow-hidden">
        {/* The mark, oversized and cropped at the footer's edge. */}
        <Mark
          className="pointer-events-none absolute -right-24 top-10 h-[30rem] w-auto opacity-[0.07]"
          bracket="#F4EFE8"
          chevron="#F4EFE8"
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
            <div>
              <Link href="/" aria-label={`${siteConfig.businessName} home`} className="inline-block">
                <Logo light className="h-12 w-auto" />
              </Link>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/75">
                {siteConfig.description}
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-6 inline-block break-all text-base font-semibold text-white underline decoration-burgundy decoration-2 underline-offset-[6px] hover:decoration-cream"
              >
                {siteConfig.contact.email}
              </a>
            </div>

            <div className="grid gap-10 sm:grid-cols-3">
              {columns.map((col) => (
                <div key={col.title}>
                  <p className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.14em] text-white">
                    <Chevron className="h-2.5 w-auto text-burgundy" />
                    {col.title}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm text-cream/75 transition hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-ink">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.businessName}. Not a law firm.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/cookie-policy" className="transition hover:text-white">
              Cookies
            </Link>
            <Link href="/image-credits" className="transition hover:text-white">
              Image credits
            </Link>
            <CookieSettingsButton className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy" />
          </div>
        </div>
      </div>
    </footer>
  );
}
