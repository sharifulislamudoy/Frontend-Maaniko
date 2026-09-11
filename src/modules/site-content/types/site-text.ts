import type { ElementType, ReactNode } from "react";

export type SiteText = string;
export type TextInput = string | null | undefined;

export type SiteTextContextValue = {
  locale: "bn-BD";
  t: (key: string, options?: Record<string, unknown>) => string;
  text: (value: TextInput, fallback?: string) => string;
};

export type SiteTextProviderProps = {
  children: ReactNode;
};

export type TextProps = {
  value: TextInput;
  fallback?: string;
  as?: ElementType;
  className?: string;
};

export function resolveText(
  value: TextInput,
  _locale: "bn-BD",
  fallback = "",
): string {
  return value?.trim() || fallback;
}
