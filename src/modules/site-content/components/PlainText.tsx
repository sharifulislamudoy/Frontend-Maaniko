"use client";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { TextProps } from "@/modules/site-content/types/site-text";

export default function PlainText({
  value,
  fallback = "",
  as: Component = "span",
  className,
}: TextProps) {
  const { text } = useSiteText();

  return (
    <Component className={className}>{text(value, fallback)}</Component>
  );
}
