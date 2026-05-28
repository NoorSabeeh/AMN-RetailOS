import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ar } from "./ar";
import { en } from "./en";
import { safeGetItem, safeSetItem } from "../lib/safeStorage";

type Language = "en" | "ar";
type Dictionary = typeof en;

const I18nContext = createContext<{
  language: Language;
  direction: "ltr";
  t: Dictionary;
  setLanguage: (language: Language) => void;
} | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => (safeGetItem("amn.language") === "ar" ? "ar" : "en"));
  const direction: "ltr" = "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
  }, [language]);

  const setLanguage = (next: Language) => {
    safeSetItem("amn.language", next);
    setLanguageState(next);
  };

  const value = useMemo(() => ({ language, direction, t: language === "ar" ? ar : en, setLanguage }), [language, direction]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
}
