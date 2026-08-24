import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookies/cookie-settings-button";
import { siteConfig } from "@/config/site";

const browseLinks = [
  { href: "/services", label: "services" },
  { href: "/case-types", label: "case types" },
  { href: "/insights", label: "insights" },
  { href: "/how-to-instruct", label: "how to instruct" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto bg-charcoal text-white/75">
      {/* Prose-style browse line — not columns, not chips, not numbered index */}
      <div className="border-b border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/40">
            Browse
          </p>
          <p className="mt-4 text-base leading-loose text-white/85 sm:text-lg">
            Explore our{" "}
            {browseLinks.map((link, index) => (
              <span key={link.href}>
                {index > 0 && index < browseLinks.length - 1 ? ", " : null}
                {index === browseLinks.length - 1 && index > 0 ? ", and " : null}
                <Link
                  href={link.href}
                  className="font-medium text-white underline decoration-brand-accent decoration-2 underline-offset-[6px] transition hover:text-brand-accent"
                >
                  {link.label}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      </div>

      {/* Contact as footer focal point — not a sidebar card or brand blurb column */}
      <div className="border-b border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/40">
            Direct line
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="mt-4 block break-all text-xl font-semibold text-white transition hover:text-brand-accent sm:text-2xl"
          >
            {siteConfig.contact.email}
          </a>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/55">
            {siteConfig.description}
          </p>
        </div>
      </div>

      {/* Legal ledger — single compact row */}
      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.businessName}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/privacy-policy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/cookie-policy" className="transition hover:text-white">
              Cookies
            </Link>
            <CookieSettingsButton className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent" />
          </div>
        </div>
      </div>
    </footer>
  );
}
