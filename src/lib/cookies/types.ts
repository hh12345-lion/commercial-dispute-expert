/** Cookie preference categories (GDPR / ePrivacy). Necessary is always on and not toggleable. */
export type CookieCategoryKey = "analytics" | "marketing" | "preferences";

export type CookiePreferences = Record<CookieCategoryKey, boolean>;

export type StoredConsent = {
  version: number;
  /** Unix ms when the user saved preferences */
  savedAt: number;
  preferences: CookiePreferences;
};

export const CONSENT_STORAGE_KEY = "cde-cookie-consent-v1";
export const CONSENT_VERSION = 1;
/** Consent record validity: 12 months (GDPR common practice) */
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export const DEFAULT_DENIED_PREFERENCES: CookiePreferences = {
  analytics: false,
  marketing: false,
  preferences: false,
};

export const ACCEPT_ALL_PREFERENCES: CookiePreferences = {
  analytics: true,
  marketing: true,
  preferences: true,
};

export type ConsentUIState = "idle" | "banner" | "modal";

export type CookieCategoryMeta = {
  key: CookieCategoryKey | "necessary";
  label: string;
  description: string;
  required?: boolean;
};

export const COOKIE_CATEGORIES: CookieCategoryMeta[] = [
  {
    key: "necessary",
    label: "Necessary cookies",
    description:
      "Required for the site to function, including storing your cookie choices. These cannot be disabled.",
    required: true,
  },
  {
    key: "analytics",
    label: "Analytics",
    description:
      "Help us understand how visitors use the site (e.g. Google Analytics, Plausible, Hotjar) so we can improve content and performance.",
  },
  {
    key: "marketing",
    label: "Marketing",
    description:
      "Used to measure advertising effectiveness and deliver relevant campaigns (e.g. Meta Pixel, LinkedIn Insight Tag).",
  },
  {
    key: "preferences",
    label: "Preferences",
    description:
      "Remember choices such as language or interface settings to personalise your experience.",
  },
];
