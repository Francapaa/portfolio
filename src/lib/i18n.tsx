"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { content, type Lang } from "@/data/content";

type I18nContextType = {
  lang: Lang;
  t: (typeof content)[Lang];
  toggleLang: () => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t: content[lang], toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
