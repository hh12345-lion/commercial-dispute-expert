import type { CookiePreferences } from "./types";

/** Minimal gtag typing for Consent Mode v2 */
type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

function ensureGtag(): GtagFn {
  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
  return window.gtag;
}

/** Maps our categories to Google Consent Mode v2 flags */
export function preferencesToConsentMode(prefs: CookiePreferences) {
  const analytics = prefs.analytics ? "granted" : "denied";
  const marketing = prefs.marketing ? "granted" : "denied";
  const preferences = prefs.preferences ? "granted" : "denied";

  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    functionality_storage: preferences,
    personalization_storage: preferences,
    security_storage: "granted" as const,
  };
}

/** Inline script body for beforeInteractive: must run before any Google tag */
export const CONSENT_DEFAULTS_INLINE_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});
`.trim();

export function applyGoogleConsentMode(prefs: CookiePreferences): void {
  if (typeof window === "undefined") return;
  const gtag = ensureGtag();
  gtag("consent", "update", preferencesToConsentMode(prefs));
}
