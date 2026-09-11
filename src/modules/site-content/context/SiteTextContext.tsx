"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { DEFAULT_LOCALE, siteText } from "@/modules/site-content/config/text";
import {
  resolveText,
  type SiteTextContextValue,
  type SiteTextProviderProps,
} from "@/modules/site-content/types/site-text";

const SiteTextContext = createContext<SiteTextContextValue | null>(null);

function readText(key: string) {
  let current: unknown = siteText;
  for (const part of key.split(".")) {
    if (!current || typeof current !== "object" || !(part in current)) return key;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : key;
}

function interpolate(template: string, options?: Record<string, unknown>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key: string) =>
    options?.[key] == null ? "" : String(options[key]),
  );
}

export function SiteTextProvider({ children }: SiteTextProviderProps) {
  const t = useCallback(
    (key: string, options?: Record<string, unknown>) =>
      interpolate(readText(key), options),
    [],
  );
  const text = useCallback(
    (value: Parameters<SiteTextContextValue["text"]>[0], fallback = "") =>
      resolveText(value, DEFAULT_LOCALE, fallback),
    [],
  );
  const contextValue = useMemo<SiteTextContextValue>(
    () => ({ locale: DEFAULT_LOCALE, t, text }),
    [t, text],
  );
  return (
    <SiteTextContext.Provider value={contextValue}>
      {children}
    </SiteTextContext.Provider>
  );
}

export function useSiteText() {
  const context = useContext(SiteTextContext);
  if (!context) throw new Error("useSiteText must be used inside SiteTextProvider");
  return context;
}
