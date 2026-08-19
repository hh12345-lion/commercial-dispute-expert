"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="relative border-b border-border bg-surface">
        <div
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-accent via-accent-line to-brand-accent/60"
          aria-hidden
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-brand-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>

        <div className="mx-auto flex min-w-0 max-w-6xl items-center justify-between gap-4 px-4 pb-3 pt-4 sm:px-6 lg:px-8">
          <Link href="/" className="group min-w-0 shrink">
            <span className="block truncate text-base font-bold tracking-tight text-charcoal sm:text-lg">
              Commercial Dispute
            </span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-accent sm:text-xs">
              Expert witness network
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex lg:gap-2"
          >
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative min-h-[44px] px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-charcoal after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-brand-accent"
                      : "text-foreground hover:text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/contact"
              className="hidden min-h-[44px] items-center rounded-md border-2 border-charcoal px-4 py-2 text-sm font-semibold text-charcoal transition hover:bg-charcoal hover:text-white md:inline-flex"
            >
              Enquire
            </Link>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-border bg-surface text-charcoal md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7H20M4 12H20M4 17H14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/40"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav-panel"
            className="absolute inset-y-0 left-0 flex w-[min(85vw,18rem)] flex-col bg-surface shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <span className="text-sm font-bold text-charcoal">{siteConfig.brandShort}</span>
              <button
                type="button"
                className="min-h-[44px] min-w-[44px] rounded-md text-charcoal"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Mobile">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`flex min-h-[44px] items-center rounded-md px-3 text-sm ${
                  pathname === "/" ? "bg-muted font-semibold text-charcoal" : "text-foreground"
                }`}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-[44px] items-center rounded-md px-3 text-sm ${
                    isActive(pathname, link.href)
                      ? "bg-muted font-semibold text-charcoal"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-border p-4">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-charcoal text-sm font-semibold text-white"
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
