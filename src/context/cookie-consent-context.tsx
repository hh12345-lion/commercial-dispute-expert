"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useSyncExternalStore } from "react";
import { readStoredConsent, writeStoredConsent } from "@/lib/cookies/consent-storage";
import { applyGoogleConsentMode } from "@/lib/cookies/google-consent-mode";
import { loadConsentedScripts, unloadNonEssentialScripts } from "@/lib/cookies/script-loader";
import {
  ACCEPT_ALL_PREFERENCES,
  DEFAULT_DENIED_PREFERENCES,
  type CookiePreferences,
  type StoredConsent,
} from "@/lib/cookies/types";

const CONSENT_CHANGE_EVENT = "cde-consent-change";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** Serializable snapshot for useSyncExternalStore: avoids hydration mismatch */
function getConsentSnapshot(): string {
  const stored = readStoredConsent();
  return stored ? JSON.stringify(stored) : "";
}

function getServerConsentSnapshot(): string {
  return "";
}

function parseSnapshot(snapshot: string): StoredConsent | null {
  if (!snapshot) return null;
  try {
    return JSON.parse(snapshot) as StoredConsent;
  } catch {
    return null;
  }
}

function notifyConsentChange(): void {
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

type CookieConsentContextValue = {
  isReady: boolean;
  hasAnswered: boolean;
  preferences: CookiePreferences;
  isPreferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function applyConsentSideEffects(prefs: CookiePreferences): void {
  applyGoogleConsentMode(prefs);
  const anyNonEssential = prefs.analytics || prefs.marketing || prefs.preferences;
  if (anyNonEssential) {
    loadConsentedScripts(prefs);
  } else {
    unloadNonEssentialScripts();
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const stored = parseSnapshot(snapshot);
  const hasAnswered = stored !== null;

  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState<CookiePreferences>(
    stored?.preferences ?? { ...DEFAULT_DENIED_PREFERENCES },
  );

  const isReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const preferences = useMemo(
    () => stored?.preferences ?? { ...DEFAULT_DENIED_PREFERENCES },
    [stored],
  );

  // Re-apply consent mode + scripts when returning visitors load the page
  useEffect(() => {
    if (!isReady || !snapshot) return;
    const parsed = parseSnapshot(snapshot);
    if (!parsed) return;
    applyConsentSideEffects(parsed.preferences);
  }, [isReady, snapshot]);

  const persist = useCallback((prefs: CookiePreferences) => {
    writeStoredConsent(prefs);
    applyConsentSideEffects(prefs);
    notifyConsentChange();
    setIsPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ ...ACCEPT_ALL_PREFERENCES });
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({ ...DEFAULT_DENIED_PREFERENCES });
  }, [persist]);

  const savePreferences = useCallback(
    (prefs: CookiePreferences) => {
      persist(prefs);
    },
    [persist],
  );

  const openPreferences = useCallback(() => {
    setDraft(stored?.preferences ?? { ...DEFAULT_DENIED_PREFERENCES });
    setIsPreferencesOpen(true);
  }, [stored]);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      hasAnswered,
      preferences,
      isPreferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectNonEssential,
      savePreferences,
    }),
    [
      isReady,
      hasAnswered,
      preferences,
      isPreferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectNonEssential,
      savePreferences,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      <CookieConsentUI draft={draft} setDraft={setDraft} />
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

/** Optional hook for footer: no throw if provider missing */
export function useCookieConsentOptional(): CookieConsentContextValue | null {
  return useContext(CookieConsentContext);
}

// UI split to keep provider file manageable: imported below
import { CookieBanner } from "@/components/cookies/cookie-banner";
import { CookiePreferencesModal } from "@/components/cookies/cookie-preferences-modal";

function CookieConsentUI({
  draft,
  setDraft,
}: {
  draft: CookiePreferences;
  setDraft: React.Dispatch<React.SetStateAction<CookiePreferences>>;
}) {
  const {
    isReady,
    hasAnswered,
    isPreferencesOpen,
    openPreferences,
    closePreferences,
    acceptAll,
    rejectNonEssential,
    savePreferences,
  } = useCookieConsent();

  if (!isReady) return null;

  const showBanner = !hasAnswered && !isPreferencesOpen;

  return (
    <>
      {showBanner && (
        <CookieBanner
          onAcceptAll={acceptAll}
          onRejectNonEssential={rejectNonEssential}
          onCustomize={openPreferences}
        />
      )}
      {isPreferencesOpen && (
        <CookiePreferencesModal
          draft={draft}
          setDraft={setDraft}
          onSave={() => savePreferences(draft)}
          onAcceptAll={acceptAll}
          onRejectNonEssential={rejectNonEssential}
          onClose={closePreferences}
          showClose={hasAnswered}
        />
      )}
    </>
  );
}
