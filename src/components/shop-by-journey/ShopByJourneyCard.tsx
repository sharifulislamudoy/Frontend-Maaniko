"use client";

import Link from "next/link";
import {
  Baby,
  Bath,
  BookOpen,
  Footprints,
  HeartHandshake,
  HeartPulse,
  House,
  Luggage,
  Milk,
  MoonStar,
  PackageCheck,
  ShieldPlus,
  Shirt,
  Smile,
  Sparkles,
  Stethoscope,
  Sun,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import type { ShopByJourneyItem } from "@/types/shop-by-journey";

type JourneyVisual = {
  icon: LucideIcon;
  backgroundColor: string;
  iconColor: string;
  glowColor: string;
};

type JourneyTheme = Omit<JourneyVisual, "icon">;

const themes = {
  pink: {
    backgroundColor: "#FFF0F5",
    iconColor: "#A94E70",
    glowColor: "#F8B9CE",
  },
  peach: {
    backgroundColor: "#FFF7EB",
    iconColor: "#C58B35",
    glowColor: "#F6D99F",
  },
  mint: {
    backgroundColor: "#ECFAF8",
    iconColor: "#3FA9A5",
    glowColor: "#A9E0DB",
  },
  purple: {
    backgroundColor: "#F3F0FF",
    iconColor: "#6759D1",
    glowColor: "#CEC6FA",
  },
  blue: {
    backgroundColor: "#F0F3FF",
    iconColor: "#6375C8",
    glowColor: "#C6CFF5",
  },
  rose: {
    backgroundColor: "#FFF0F6",
    iconColor: "#B65782",
    glowColor: "#F2BDD2",
  },
  green: {
    backgroundColor: "#EFF9F0",
    iconColor: "#4E9A62",
    glowColor: "#BCE4C5",
  },
  yellow: {
    backgroundColor: "#FFF9E9",
    iconColor: "#B68B25",
    glowColor: "#F3D98D",
  },
} satisfies Record<string, JourneyTheme>;

const journeyVisuals: Record<string, JourneyVisual> = {
  "pregnancy-preparation": {
    icon: HeartHandshake,
    ...themes.pink,
  },
  "maternity-care": {
    icon: HeartPulse,
    ...themes.rose,
  },
  "hospital-bag": {
    icon: PackageCheck,
    ...themes.purple,
  },
  "postpartum-recovery": {
    icon: ShieldPlus,
    ...themes.mint,
  },
  breastfeeding: {
    icon: Milk,
    ...themes.peach,
  },
  "newborn-care": {
    icon: Baby,
    ...themes.yellow,
  },
  feeding: {
    icon: Milk,
    ...themes.mint,
  },
  "baby-food": {
    icon: Utensils,
    ...themes.green,
  },
  "bath-and-hygiene": {
    icon: Bath,
    ...themes.blue,
  },
  "diapering-care": {
    icon: Sparkles,
    ...themes.pink,
  },
  "sleep-and-bedtime": {
    icon: MoonStar,
    ...themes.purple,
  },
  "health-and-safety": {
    icon: ShieldPlus,
    ...themes.blue,
  },
  "baby-skincare": {
    icon: Sun,
    ...themes.peach,
  },
  "clothing-essentials": {
    icon: Shirt,
    ...themes.rose,
  },
  "teething-and-oral-care": {
    icon: Smile,
    ...themes.mint,
  },
  "play-and-learning": {
    icon: BookOpen,
    ...themes.yellow,
  },
  "crawling-and-walking": {
    icon: Footprints,
    ...themes.green,
  },
  "travel-and-outings": {
    icon: Luggage,
    ...themes.pink,
  },
  "home-and-nursery": {
    icon: House,
    ...themes.purple,
  },
  "toddler-care": {
    icon: Stethoscope,
    ...themes.blue,
  },
};

const defaultVisual: JourneyVisual = {
  icon: Sparkles,
  backgroundColor: "#FFF4F6",
  iconColor: "#FC5689",
  glowColor: "#FFD0DE",
};

type ShopByJourneyIconCardProps = {
  item: ShopByJourneyItem;
};

export default function ShopByJourneyIconCard({
  item,
}: ShopByJourneyIconCardProps) {
  const { localize, t } = useLanguage();

  const itemName = localize(item.name);
  const visual = journeyVisuals[item.slug] ?? defaultVisual;
  const Icon = visual.icon;

  return (
    <article className="group h-[138px] w-full md:h-[168px] lg:h-[190px]">
      <Link
        href={item.href}
        aria-label={`${t("shopByJourney.explore")} ${itemName}`}
        style={{
          backgroundColor: visual.backgroundColor,
        }}
        className="
          relative isolate flex h-full w-full flex-col
          items-center justify-center overflow-hidden
          rounded-[20px] border border-white/80
          px-2 py-3 text-center
          shadow-[0_8px_24px_rgba(6,42,84,0.07)]
          transition-all duration-300
          hover:-translate-y-1.5
          hover:shadow-[0_16px_32px_rgba(6,42,84,0.13)]
          focus-visible:outline-none
          focus-visible:ring-4
          focus-visible:ring-[#FC5689]/20
          md:rounded-[24px]
          md:px-3
          md:py-4
        "
      >
        <span
          aria-hidden="true"
          style={{ backgroundColor: visual.glowColor }}
          className="
            absolute -right-6 -top-8 size-20
            rounded-full opacity-25 blur-2xl
            transition-transform duration-500
            group-hover:scale-150
            md:size-28
          "
        />

        <span
          aria-hidden="true"
          className="
            absolute -bottom-8 -left-8 size-20
            rounded-full bg-white/50 blur-2xl
            transition-transform duration-500
            group-hover:scale-150
            md:size-28
          "
        />

        <span
          className="
            relative z-10 flex size-[58px]
            items-center justify-center rounded-full
            bg-white/55
            shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]
            transition-transform duration-300
            group-hover:-translate-y-1
            group-hover:scale-105
            md:size-[72px]
            lg:size-[82px]
          "
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.65}
            style={{ color: visual.iconColor }}
            className="size-9 md:size-11 lg:size-12"
          />
        </span>

        <h3
          className="
            relative z-10 mt-2 line-clamp-2
            min-h-[34px] text-[12px] font-bold
            leading-[1.35] text-[#17263A]
            transition-colors duration-300
            group-hover:text-[#FC5689]
            md:mt-3
            md:min-h-[40px]
            md:text-[14px]
            lg:text-[15px]
          "
        >
          {itemName}
        </h3>
      </Link>
    </article>
  );
}