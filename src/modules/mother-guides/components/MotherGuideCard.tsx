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
  MotherGuideIcon,
  MotherGuideRecord,
} from "@/modules/mother-guides/data/motherGuides";

type MotherGuideCardProps = {
  guide: MotherGuideRecord;
  index: number;
};

const MOTHER_GUIDE_ICONS: Record<MotherGuideIcon, LucideIcon> = {
  pregnancy: HeartPulse,
  hospital: BriefcaseMedical,
  newborn: Baby,
  breastfeeding: HeartHandshake,
  feeding: Utensils,
  sleep: MoonStar,
  bath: Bath,
  hygiene: ShieldCheck,
  fever: Thermometer,
  recovery: Activity,
};

export default function MotherGuideCard({
  guide,
  index,
}: MotherGuideCardProps) {
  const { locale, text } = useSiteText();

  const Icon = MOTHER_GUIDE_ICONS[guide.icon];
  const isPink = index % 2 === 0;
  const readText = "পড়ুন";
  const href = `/mother-guides/${guide.slug}`;

  const accent = isPink
    ? {
        text: "text-[#f15b8a]",
        icon: "text-[#f15b8a] ring-[#f9dce6]",
        hover:
          "group-hover:border-[#f15b8a]/35 group-hover:shadow-[#f15b8a]/10",
      }
    : {
        text: "text-[#26a8e0]",
        icon: "text-[#26a8e0] ring-[#d9f1fb]",
        hover:
          "group-hover:border-[#26a8e0]/35 group-hover:shadow-[#26a8e0]/10",
      };

  return (
    <article
      className={`group flex h-full min-h-[455px] flex-col overflow-hidden rounded-[22px] border border-[#e9edf2] bg-white shadow-[0_7px_24px_rgba(6,42,84,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(6,42,84,0.12)] ${accent.hover}`}
    >
      <Link
        href={href}
        aria-label={`${readText}: ${text(guide.title)}`}
        className="relative block aspect-square shrink-0 overflow-hidden bg-[#f8f3f1] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#f15b8a]/25"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={guide.image}
          alt={text(guide.imageAlt)}
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
            {guide.cardTitle}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-2 text-[15px] font-medium leading-7 text-[#586273] md:text-base">
          {text(guide.description)}
        </p>

        <Link
          href={href}
          className={`mt-auto inline-flex w-fit items-center gap-2 rounded-md pt-5 text-base font-extrabold transition-all hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current ${accent.text}`}
        >
          <span>{readText}</span>

          <ArrowRight aria-hidden="true" strokeWidth={2.3} className="size-5" />
        </Link>
      </div>
    </article>
  );
}
