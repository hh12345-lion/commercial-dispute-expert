"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chevron, Logo } from "@/components/brand";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/case-types", label: "Case types" },
  { href: "/insights", label: "Insights" },
  { href: "/how-to-instruct", label: "How to instruct" },
  { href: "/about", label: "About" },
] as const;

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() || "/";
  const onContact = pathname === "/contact";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${siteConfig.businessName} home`} className="shrink-0">
          <Logo className="h-11 w-auto sm:h-12" />
        </Link>

        <nav aria-label="Primary" className="hidden h-full items-stretch lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-2 px-4 text-[0.95rem] font-medium transition-colors ${
                  active ? "text-navy" : "text-ink/75 hover:text-navy"
                }`}
              >
                {active && <Chevron className="h-3 w-auto text-burgundy" />}
                {link.label}
                {active && <span className="absolute inset-x-4 bottom-0 h-[3px] bg-navy" aria-hidden />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            aria-current={onContact ? "page" : undefined}
            className={`chevron-r hidden min-h-[44px] items-center pl-5 pr-8 text-sm font-semibold text-white transition-colors sm:inline-flex ${
              onContact ? "bg-burgundy" : "bg-navy hover:bg-burgundy"
            }`}
            style={{ ["--tip" as string]: "14px" }}
          >
            Enquire
          </Link>

          {/* Mobile menu: a native disclosure, reset on each navigation. */}
          <details key={pathname} className="group/menu lg:hidden">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border-2 border-navy text-navy [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 group-open/menu:hidden" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <svg viewBox="0 0 24 24" className="hidden h-5 w-5 group-open/menu:block" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute inset-x-0 top-full border-b border-border bg-white shadow-[0_24px_40px_-28px_rgba(3,38,59,0.5)]"
            >
              <ul className="mx-auto max-w-6xl divide-y divide-border px-4 sm:px-6">
                {[{ href: "/", label: "Home" }, ...navLinks, { href: "/contact", label: "Contact" }].map((link) => {
                  const active = link.href === "/" ? pathname === "/" : isActive(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-[52px] items-center gap-3 text-base ${
                          active ? "font-semibold text-navy" : "text-ink"
                        }`}
                      >
                        {active ? <Chevron className="h-3 w-auto text-burgundy" /> : <span className="w-[0.45rem]" />}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
