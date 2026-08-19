import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookies/cookie-settings-button";
import { siteConfig } from "@/config/site";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/case-types", label: "Case types" },
  { href: "/insights", label: "Insights" },
  { href: "/how-to-instruct", label: "How to instruct" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="text-base font-bold text-charcoal">{siteConfig.businessName}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-sm">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium text-brand-accent hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground lg:max-w-md lg:justify-end"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-[44px] py-2 hover:text-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/privacy-policy" className="hover:text-charcoal">
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms" className="hover:text-charcoal">
              Terms
            </Link>
            <span aria-hidden>·</span>
            <Link href="/cookie-policy" className="hover:text-charcoal">
              Cookies
            </Link>
            <span aria-hidden>·</span>
            <CookieSettingsButton className="hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent" />
          </p>
        </div>
      </div>
    </footer>
  );
}
