import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ur } from "@/i18n/resources";

export const SUPPORTED_LANGUAGES = ["en", "ur"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = "ahd-e-rishta.language";
export const URDU_FONT_EVENT = "ahd-e-rishta:urdu-font-loaded";

function readStoredLanguage(): SupportedLanguage {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ur" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

export function applyDocumentLanguage(language: SupportedLanguage): void {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
}

let urduFontPromise: Promise<unknown> | null = null;

/** Loads the Nastaliq font only when Urdu is actually selected. */
export function loadUrduFont(): Promise<unknown> {
  if (!urduFontPromise) {
    urduFontPromise = import("@fontsource-variable/noto-nastaliq-urdu")
      .then((mod) => {
        document.dispatchEvent(new CustomEvent(URDU_FONT_EVENT));
        return mod;
      })
      .catch(() => undefined);
  }
  return urduFontPromise;
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ur: { translation: ur },
  },
  lng: typeof window === "undefined" ? "en" : readStoredLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnNull: false,
});

export function changeLanguage(language: SupportedLanguage): void {
  void i18n.changeLanguage(language);
  applyDocumentLanguage(language);
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    /* ignore */
  }
  if (language === "ur") void loadUrduFont();
}

if (typeof document !== "undefined") {
  const initial = (i18n.language === "ur" ? "ur" : "en") as SupportedLanguage;
  applyDocumentLanguage(initial);
  if (initial === "ur") void loadUrduFont();
}

export default i18n;
