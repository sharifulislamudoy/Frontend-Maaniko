"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Check } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import type {
  ComboPackCardProps,
  ComboPackTheme,
} from "@/types/combo-pack";

const themeStyles: Record<
  ComboPackTheme,
  {
    card: string;
    badge: string;
    check: string;
    button: string;
    imageBackground: string;
  }
> = {
  pink: {
    card: "border-[#f7dce6] bg-gradient-to-b from-[#fff4f7] to-white",
    badge: "bg-[#dc5d8b] shadow-[0_8px_20px_rgba(220,93,139,0.28)]",
    check: "bg-[#fce4ed] text-[#d94e82]",
    button:
      "bg-[#dc5d8b] shadow-[0_10px_25px_rgba(220,93,139,0.25)] hover:bg-[#c94b78]",
    imageBackground: "bg-[#fcebf1]",
  },
  blue: {
    card: "border-[#d8e8fa] bg-gradient-to-b from-[#f2f8ff] to-white",
    badge: "bg-[#5694df] shadow-[0_8px_20px_rgba(86,148,223,0.28)]",
    check: "bg-[#e3f0ff] text-[#4387d5]",
    button:
      "bg-[#5694df] shadow-[0_10px_25px_rgba(86,148,223,0.25)] hover:bg-[#4384d0]",
    imageBackground: "bg-[#eaf4ff]",
  },
  amber: {
    card: "border-[#f4e4ba] bg-gradient-to-b from-[#fffaf0] to-white",
    badge: "bg-[#e6ac3f] shadow-[0_8px_20px_rgba(230,172,63,0.28)]",
    check: "bg-[#fff0c9] text-[#cc9021]",
    button:
      "bg-[#e6ac3f] shadow-[0_10px_25px_rgba(230,172,63,0.25)] hover:bg-[#d79b2d]",
    imageBackground: "bg-[#fff6dc]",
  },
};

export default function ComboPackCard({
  pack,
  position,
}: ComboPackCardProps) {
  const { localize, t } = useLanguage();
  const styles = themeStyles[pack.theme];
  const packNumber = position.toString().padStart(2, "0");

  return (
    <article
      className={`flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border p-3.5 shadow-[0_12px_35px_rgba(6,42,84,0.07)] sm:p-4 ${styles.card}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ${styles.badge}`}
        >
          {packNumber}
        </span>

        <div className="min-w-0 pt-0.5">
          <h3 className="line-clamp-2 text-base font-black leading-6 text-[#252a35] sm:text-lg">
            {localize(pack.name)}
          </h3>

          <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-500">
            {localize(pack.subtitle)}
          </p>
        </div>
      </div>

      <div
        className={`relative mt-4 aspect-[16/10] overflow-hidden rounded-2xl ${styles.imageBackground}`}
      >
        <img
          src={pack.imageUrl}
          alt={localize(pack.name)}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#062a54]/10 via-transparent to-white/10" />
      </div>

      <ul className="my-4 flex flex-1 flex-col gap-2.5">
        {pack.benefits.map((benefit, benefitIndex) => (
          <li
            key={`${pack.id}-benefit-${benefitIndex}`}
            className="flex items-start gap-2.5 text-xs font-medium leading-5 text-slate-600 sm:text-[13px]"
          >
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${styles.check}`}
            >
              <Check className="size-3" strokeWidth={3} />
            </span>

            <span>{localize(benefit)}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/combo-pack#${pack.slug}`}
        className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-extrabold text-white transition-all duration-300 active:scale-[0.98] ${styles.button}`}
      >
        <span>{t("comboPack.viewDetails")}</span>

        <span className="flex size-4 items-center justify-center rounded-full bg-white/25 text-xs">
          ›
        </span>
      </Link>
    </article>
  );
}