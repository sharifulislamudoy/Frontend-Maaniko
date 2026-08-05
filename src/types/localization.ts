import type { ElementType, ReactNode } from "react";
import type { TOptions } from "i18next";

export type LanguageCode = "bn" | "en";

export type LocalizedValue = Partial<Record<LanguageCode, string | null>>;

export type LocalizedInput = LocalizedValue | string | null | undefined;

export type LanguageOption = Readonly<{
  code: LanguageCode;
  label: string;
  shortLabel: string;
}>;

export type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string, options?: TOptions) => string;
  localize: (value: LocalizedInput, fallback?: string) => string;
};

export type LanguageProviderProps = {
  children: ReactNode;
  initialLanguage: LanguageCode;
};

export type LocalizedTextProps = {
  value: LocalizedInput;
  fallback?: string;
  as?: ElementType;
  className?: string;
};

export function resolveLocalized(
  value: LocalizedInput,
  language: LanguageCode,
  fallback = "",
): string {
  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  if (!value) {
    return fallback;
  }

  return (
    value[language]?.trim() || value.bn?.trim() || value.en?.trim() || fallback
  );
}
