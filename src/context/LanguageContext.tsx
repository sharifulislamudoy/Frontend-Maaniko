"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createInstance, type i18n } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE_NAME,
  resources,
  SUPPORTED_LANGUAGES,
} from "@/i18n/config";
import {
  resolveLocalized,
  type LanguageContextValue,
  type LanguageProviderProps,
} from "@/types/localization";

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function createI18nInstance(language: LanguageContextValue["language"]): i18n {
  const instance = createInstance();

  void instance.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    load: "languageOnly",
    initAsync: false,
    returnNull: false,
    interpolation: { escapeValue: false },
  });

  return instance;
}

function persistLanguage(language: LanguageContextValue["language"]) {
  document.cookie = [
    `${LANGUAGE_COOKIE_NAME}=${language}`,
    "Path=/",
    `Max-Age=${LANGUAGE_COOKIE_MAX_AGE}`,
    "SameSite=Lax",
    ...(window.location.protocol === "https:" ? ["Secure"] : []),
  ].join("; ");

  document.documentElement.lang = language;
  document.documentElement.dir = "ltr";
}

export function LanguageProvider({
  children,
  initialLanguage,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState(initialLanguage);
  const [i18nInstance] = useState(() => createI18nInstance(initialLanguage));

  const setLanguage = useCallback(
    (nextLanguage: LanguageContextValue["language"]) => {
      persistLanguage(nextLanguage);
      if (nextLanguage === language) return;

      void i18nInstance.changeLanguage(nextLanguage);
      setLanguageState(nextLanguage);
    },
    [i18nInstance, language],
  );

  const t = useCallback(
    (key: string, options?: Parameters<LanguageContextValue["t"]>[1]) =>
      String(i18nInstance.t(key, options)),
    [i18nInstance, language],
  );

  const localize = useCallback(
    (value: Parameters<LanguageContextValue["localize"]>[0], fallback = "") =>
      resolveLocalized(value, language, fallback),
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t, localize }),
    [language, localize, setLanguage, t],
  );

  return (
    <I18nextProvider i18n={i18nInstance}>
      <LanguageContext.Provider value={value}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
