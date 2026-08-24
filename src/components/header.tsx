"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  return (
    <header className="border-b border-border bg-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-brand-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      {/* Band 1 — identity row (brand left, contact right; no utility strip, no centered masthead) */}
      <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-6">
          <Link href="/" className="group min-w-0 border-l-4 border-brand-accent pl-4">
            <span className="block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-brand-accent">
              CDE
            </span>
            <span className="mt-1 block text-lg font-bold leading-tight text-charcoal sm:text-xl">
              {siteConfig.businessName}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-foreground/70 sm:text-sm">
              counsel · litigation · quantum
            </span>
          </Link>

          <Link
            href="/contact"
            className="group hidden shrink-0 flex-col items-end text-right sm:flex"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground/50">
              Confidential enquiry
            </span>
            <span className="mt-1 text-sm font-semibold text-charcoal underline decoration-brand-accent decoration-2 underline-offset-4 transition group-hover:text-brand-accent">
              Open contact →
            </span>
          </Link>
        </div>
      </div>

      {/* Band 2 — full-width nav rail (separate from brand row; not inline sticky bar) */}
      <div className="mt-5 border-y border-border bg-muted/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 py-2.5">
            <nav
              aria-label="Primary"
              className="hidden flex-1 items-center justify-center gap-6 md:flex lg:gap-8"
            >
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`min-h-[44px] py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-charcoal"
                        : "text-foreground/75 hover:text-charcoal"
                    }`}
                  >
                    <span
                      className={
                        active
                          ? "border-b-2 border-brand-accent pb-0.5"
                          : "border-b-2 border-transparent pb-0.5"
                      }
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              className="flex min-h-[44px] flex-1 items-center justify-between gap-2 font-mono text-xs uppercase tracking-[0.14em] text-charcoal md:hidden"
              aria-expanded={expanded}
              aria-controls="cde-nav-panel"
              onClick={() => setExpanded((open) => !open)}
            >
              <span>{expanded ? "Close index" : "Site index"}</span>
              <span aria-hidden className="text-brand-accent">
                {expanded ? "−" : "+"}
              </span>
            </button>

            <Link
              href="/contact"
              className="inline-flex min-h-[44px] shrink-0 items-center text-sm font-semibold text-brand-accent md:hidden"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile — inline accordion panel (not drawer, not full-screen overlay) */}
      {expanded ? (
        <div
          id="cde-nav-panel"
          className="border-b border-border bg-surface md:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-6xl divide-y divide-border px-4 sm:px-6">
            <Link
              href="/"
              onClick={() => setExpanded(false)}
              className={`flex min-h-[48px] items-center justify-between py-3 text-sm ${
                pathname === "/"
                  ? "font-semibold text-charcoal"
                  : "text-foreground"
              }`}
            >
              <span>Home</span>
              {pathname === "/" ? (
                <span className="font-mono text-[0.65rem] text-brand-accent">●</span>
              ) : null}
            </Link>
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setExpanded(false)}
                  className={`flex min-h-[48px] items-center justify-between py-3 text-sm ${
                    active ? "font-semibold text-charcoal" : "text-foreground"
                  }`}
                >
                  <span>{link.label}</span>
                  {active ? (
                    <span className="font-mono text-[0.65rem] text-brand-accent">●</span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
