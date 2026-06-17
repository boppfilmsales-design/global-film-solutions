import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/data/site";
import { t } from "@/data/site";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (typeof t)[Lang] };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "zh" || saved === "en") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  return <I18nCtx.Provider value={{ lang, setLang, tr: t[lang] }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
