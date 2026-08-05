"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { LocalizedTextProps } from "@/types/localization";

export default function LocalizedText({
  value,
  fallback = "",
  as: Component = "span",
  className,
}: LocalizedTextProps) {
  const { localize } = useLanguage();

  return (
    <Component className={className}>{localize(value, fallback)}</Component>
  );
}
