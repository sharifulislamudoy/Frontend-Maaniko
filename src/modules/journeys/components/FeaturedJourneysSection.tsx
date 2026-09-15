"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import { shopByJourneyItems } from "@/modules/journeys/data/journeys";
import type { SiteText } from "@/modules/site-content/types/site-text";

type FeaturedJourneyCard = {
  id: string;
  href: string;
  title: SiteText;
  subtitle: SiteText;
  image?: string;
  type?: "image" | "solution";
};

function findJourney(slug: string) {
  return shopByJourneyItems.find((item) => item.slug === slug);
}

const pregnancyJourney = findJourney("pregnancy-preparation");
const newbornJourney = findJourney("newborn-care");
const feedingJourney = findJourney("feeding");

const featuredJourneyCards: FeaturedJourneyCard[] = [
  {
    id: "featured-pregnancy",
    href: pregnancyJourney?.href ?? "/shop?journey=pregnancy-preparation",
    title: "Pregnancy",
    subtitle: "গর্ভাবস্থার প্রস্তুতি",
    image:
      pregnancyJourney?.images[0] ??
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    type: "image",
  },
  {
    id: "featured-newborn",
    href: newbornJourney?.href ?? "/shop?journey=newborn-care",
    title: "Newborn",
    subtitle: "নবজাতকের যত্ন",
    image:
      newbornJourney?.images[0] ??
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85",
    type: "image",
  },
  {
    id: "featured-feeding",
    href: feedingJourney?.href ?? "/shop?journey=feeding",
    title: "Feeding",
    subtitle: "খাওয়ানো ও পুষ্টি",
    image:
      feedingJourney?.images[0] ??
      "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=900&q=85",
    type: "image",
  },
  {
    id: "featured-all-solutions",
    href: "/solution-box",
    title: "সব Solution দেখুন",
    subtitle: "সব পণ্য ও বক্স",
    type: "solution",
  },
];

function SolutionBagVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#fff7f9_0%,#fff0f4_55%,#ffe8ef_100%)]"
    >
      <span className="absolute left-[16%] top-[15%] size-10 rounded-full bg-white/60 blur-xl" />
      <span className="absolute bottom-[14%] right-[12%] size-14 rounded-full bg-[#ffc7d7]/40 blur-xl" />

      <div className="relative mt-3 flex h-[94px] w-[112px] items-center justify-center rounded-[9px_9px_16px_16px] bg-[linear-gradient(145deg,#ff9fba_0%,#f77da2_50%,#ef5f8d_100%)] shadow-[0_14px_28px_rgba(239,66,119,0.24)] md:h-[118px] md:w-[142px]">
        {/* Bag handle */}
        <span className="absolute -top-7 left-1/2 h-9 w-[58px] -translate-x-1/2 rounded-t-[30px] border-[7px] border-[#f77da2] border-b-0 md:-top-8 md:h-11 md:w-[72px]" />

        {/* Bag top fold */}
        <span className="absolute left-0 top-0 h-5 w-full rounded-t-[9px] bg-white/16" />

        {/* Logo area */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="flex size-9 items-center justify-center rounded-full bg-white text-[#ef4277] shadow-sm md:size-11">
            <Heart
              fill="currentColor"
              strokeWidth={1.7}
              className="size-5 md:size-6"
            />
          </span>

          <span className="mt-1 text-[10px] font-bold tracking-tight text-white md:text-xs">
            Maaniko
          </span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedJourneysSection() {
  const { text } = useSiteText();

  const heading = text("আপনার journey কোথা থেকে শুরু?");

  const description = text(
    "আপনার বর্তমান ধাপ নির্বাচন করুন এবং খুঁজে পান আপনার জন্য সেরা সমাধান",
  );

  return (
    <section
      aria-labelledby="shop-by-journey-title"
      className="overflow-hidden bg-white py-3 md:py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[26px] border border-[#ffe4ec] bg-[linear-gradient(135deg,#fff7f9_0%,#fff2f5_48%,#fff7f9_100%)] px-3 py-6 shadow-[0_14px_42px_rgba(252,86,137,0.08)] md:rounded-[34px] md:px-7 md:py-9 lg:px-10 lg:py-11">
          {/* Soft decorative background */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-20 size-52 rounded-full bg-white/65 blur-2xl"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-10 size-64 rounded-full bg-[#ffdbe6]/30 blur-3xl"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-80 rounded-full bg-white/45 blur-3xl"
          />

          {/* Section heading */}
          <div className="relative z-10 mx-auto mb-6 max-w-3xl text-center md:mb-8 lg:mb-9">
            <h2
              id="shop-by-journey-title"
              className="text-[20px] font-black leading-[1.35] tracking-tight text-[#062a54] md:text-[32px] lg:text-[38px]"
            >
              {heading}
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-xs font-medium leading-5 text-[#66768a] md:mt-3 md:text-[15px] md:leading-6 lg:text-base">
              {description}
            </p>

            <div className="mx-auto mt-3 h-[3px] w-12 rounded-full bg-[#ef4277] md:mt-4 md:w-14" />
          </div>

          {/* Journey cards */}
          <div className="relative z-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
            {featuredJourneyCards.map((card) => {
              const title = text(card.title);
              const subtitle = text(card.subtitle);

              return (
                <article key={card.id} className="h-full">
                  <Link
                    href={card.href}
                    aria-label={`${title} — ${subtitle}`}
                    className="group flex h-full min-h-[245px] flex-col overflow-hidden rounded-[20px] border border-[#f7dfe6] bg-white shadow-[0_8px_24px_rgba(82,23,43,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f7c7d5] hover:shadow-[0_16px_35px_rgba(239,66,119,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 active:scale-[0.98] md:min-h-[310px] md:rounded-[24px] lg:min-h-[350px]"
                  >
                    {/* Card image */}
                    <div className="relative h-[135px] w-full overflow-hidden bg-[#fff7f9] md:h-[185px] lg:h-[215px]">
                      {card.type === "solution" ? (
                        <SolutionBagVisual />
                      ) : (
                        <>
                          <Image
                            src={card.image!}
                            alt=""
                            fill
                            quality={90}
                            sizes="(max-width: 767px) 50vw, 25vw"
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />

                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent"
                          />
                        </>
                      )}
                    </div>

                    {/* Card content */}
                    <div className="flex flex-1 flex-col items-center px-2.5 pb-3 pt-2 text-center md:px-4 md:pb-4 md:pt-3">
                      <h3 className="line-clamp-2 text-[15px] font-black leading-[1.3] text-[#062a54] transition-colors duration-300 group-hover:text-[#ef4277] md:text-lg lg:text-xl">
                        {title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-[1.45] text-[#5f6e81] md:text-[13px] lg:text-sm">
                        {subtitle}
                      </p>

                      <span className="mt-auto flex size-8 items-center justify-center rounded-full bg-[#ef4277] text-white shadow-[0_7px_16px_rgba(239,66,119,0.28)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#dc3268] md:size-9 lg:size-10">
                        <ArrowRight
                          aria-hidden="true"
                          strokeWidth={2.4}
                          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 md:size-[18px]"
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
