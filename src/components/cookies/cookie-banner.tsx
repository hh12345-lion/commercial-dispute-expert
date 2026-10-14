"use client";

import Link from "next/link";

type CookieBannerProps = {
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onCustomize: () => void;
};

export function CookieBanner({
  onAcceptAll,
  onRejectNonEssential,
  onCustomize,
}: CookieBannerProps) {
  return (
    <div
      className="cde-cookie-banner-enter pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6"
      aria-hidden={false}
    >
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby="cde-cookie-banner-title"
        aria-describedby="cde-cookie-banner-desc"
        className="cde-cookie-banner-panel pointer-events-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-charcoal text-white shadow-2xl"
      >
        <div className="h-1 bg-brand-green" aria-hidden />
        <div className="p-5 sm:p-6">
          <h2 id="cde-cookie-banner-title" className="text-lg font-bold tracking-tight sm:text-xl">
            Your privacy matters
          </h2>
          <p id="cde-cookie-banner-desc" className="mt-2 text-sm leading-relaxed text-white/85">
            We use cookies to keep this site secure and working, and, only with your permission,
            to understand how the site is used and to support relevant marketing. You can accept all,
            reject non-essential cookies, or customise your choices. See our{" "}
            <Link
              href="/cookie-policy"
              className="font-medium text-white underline decoration-brand-green/80 underline-offset-2 hover:decoration-white"
            >
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-white underline decoration-brand-green/80 underline-offset-2 hover:decoration-white"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={onAcceptAll}
              className="rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={onRejectNonEssential}
              className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={onCustomize}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white/90 underline-offset-2 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:ml-auto"
            >
              Customise preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
