"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Baby,
  Bath,
  BriefcaseMedical,
  HeartHandshake,
  HeartPulse,
  MoonStar,
  ShieldCheck,
  Thermometer,
  Utensils,
} from "lucide-react";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type {
  CareGuideAccent,
  CareGuideIconName,
  CareGuideItem,
} from "@/modules/care-guides/types/careGuide";

type CareGuideProps = {
  guide: CareGuideItem;
};

const GUIDE_ICONS: Record<CareGuideIconName, LucideIcon> = {
  pregnancy: HeartPulse,
  bag: BriefcaseMedical,
  baby: Baby,
  breastfeeding: HeartHandshake,
  feeding: Utensils,
  sleep: MoonStar,
  bath: Bath,
  diaper: ShieldCheck,
  fever: Thermometer,
  recovery: Activity,
};

const ACCENT_STYLES: Record<
  CareGuideAccent,
  { text: string; icon: string; hover: string }
> = {
  pink: {
    text: "text-[#f15b8a]",
    icon: "text-[#f15b8a] ring-[#f9dce6]",
    hover: "group-hover:border-[#f15b8a]/35 group-hover:shadow-[#f15b8a]/10",
  },
  blue: {
    text: "text-[#26a8e0]",
    icon: "text-[#26a8e0] ring-[#d9f1fb]",
    hover: "group-hover:border-[#26a8e0]/35 group-hover:shadow-[#26a8e0]/10",
  },
};

export default function CareGuide({ guide }: CareGuideProps) {
  const { locale, text } = useSiteText();

  const accentKey: CareGuideAccent = guide.accent === "blue" ? "blue" : "pink";

  const accent = ACCENT_STYLES[accentKey];
  const Icon = guide.icon ? GUIDE_ICONS[guide.icon] : Baby;

  const guideTitle = text(guide.title);
  const cardTitle = guide.cardTitle || guideTitle;

  const description = guide.description
    ? text(guide.description)
    : guideTitle;

  const imageAlt = guide.imageAlt ? text(guide.imageAlt) : guideTitle;

  const image = guide.images?.[0] ?? "/image.png";
  const href = guide.href || `/guide/${guide.slug}`;
  const readLabel = "পড়ুন";

  return (
    <article
      className={`group flex h-full min-h-[455px] flex-col overflow-hidden rounded-[22px] border border-[#e9edf2] bg-white shadow-[0_7px_24px_rgba(6,42,84,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(6,42,84,0.12)] ${accent.hover}`}
    >
      <Link
        href={href}
        aria-label={`${readLabel}: ${guideTitle}`}
        className="relative block aspect-square shrink-0 overflow-hidden bg-[#f8f3f1] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#f15b8a]/25"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
        />

        <span
          aria-hidden="true"
          className={`absolute left-4 top-4 flex size-[66px] items-center justify-center rounded-full bg-white/95 shadow-[0_6px_18px_rgba(6,42,84,0.09)] ring-1 backdrop-blur-sm md:size-[70px] ${accent.icon}`}
        >
          <Icon strokeWidth={1.7} className="size-8 md:size-9" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5 md:pb-6">
        <h3 className="text-xl font-extrabold leading-tight text-[#09182e] md:text-[21px]">
          <Link
            href={href}
            className="rounded-sm transition-colors hover:text-[#f15b8a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f15b8a]/30"
          >
            {cardTitle}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-2 text-[15px] font-medium leading-7 text-[#586273] md:text-base">
          {description}
        </p>

        <Link
          href={href}
          aria-label={`${readLabel}: ${guideTitle}`}
          className={`mt-auto inline-flex w-fit items-center gap-2 rounded-md pt-5 text-base font-extrabold transition-all hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current ${accent.text}`}
        >
          <span>{readLabel}</span>
          <ArrowRight aria-hidden="true" strokeWidth={2.3} className="size-5" />
        </Link>
      </div>
    </article>
  );
}
