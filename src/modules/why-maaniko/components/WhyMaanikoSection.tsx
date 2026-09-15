"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Headphones, HeartHandshake, ShieldCheck, Truck } from "lucide-react";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import {
  whyMaanikoFeatures,
  type WhyMaanikoIconName,
} from "@/modules/why-maaniko/data/whyMaaniko";

const ICONS: Record<WhyMaanikoIconName, LucideIcon> = {
  journey: HeartHandshake,
  shield: ShieldCheck,
  support: Headphones,
  delivery: Truck,
};

export default function WhyMaanikoSection() {
  const { locale, text } = useSiteText();

  const subtitle = text(
    "শুধু পণ্য নয়, প্রতিটি মায়ের journey অনুযায়ী complete solution",
  );

  return (
    <section
      id="why-maaniko-different"
      aria-labelledby="why-maaniko-different-title"
      className="bg-[#fffdfd] py-9 md:py-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="why-maaniko-different-title"
            className="text-[22px] font-black leading-tight tracking-tight text-[#062a54] md:text-[30px] lg:text-[34px]"
          >
            {
              <>
                কেন <span className="text-[#FC5689]">Maaniko</span> আলাদা?
              </>
            }
          </h2>

          <p className="mt-2 text-[13px] font-medium leading-6 text-[#6f7784] md:text-sm lg:text-[15px]">
            {subtitle}
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-7 grid grid-cols-2 gap-4 md:mt-8 md:gap-5 lg:grid-cols-4 lg:gap-4">
          {whyMaanikoFeatures.map((feature) => {
            const Icon = ICONS[feature.icon];

            return (
              <Link
                key={feature.slug}
                href={`/why-maaniko/${feature.slug}`}
                className="group block h-full rounded-[20px] outline-none focus-visible:ring-2 focus-visible:ring-[#FC5689] focus-visible:ring-offset-2"
                aria-label={text(feature.title)}
              >
                <article
                  className="
                    relative flex h-full  flex-col items-center
                    overflow-hidden rounded-[20px]
                    border border-[#f7e8ed]
                    bg-white px-2 py-4 text-center
                    shadow-[0_6px_24px_rgba(6,42,84,0.055)]
                    transition-all duration-300
                    group-hover:-translate-y-1
                    group-hover:border-[#f5d0dc]
                    group-hover:shadow-[0_12px_32px_rgba(6,42,84,0.09)]
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      flex size-[66px] shrink-0 items-center justify-center
                      rounded-full bg-[#fff3f7]
                      md:size-[70px]
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.65}
                      className="size-8 text-[#F06A91] md:size-9"
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      mt-5 max-w-[220px]
                      text-[17px] font-black leading-[1.55]
                      text-[#13283f]
                      md:text-[18px]
                      lg:text-[17px]
                    "
                  >
                    {text(feature.title)}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-3 max-w-[245px]
                      text-[13px] font-medium leading-[1.8]
                      text-[#727985]
                      md:text-sm
                      lg:text-[13px]
                    "
                  >
                    {text(feature.shortDescription)}
                  </p>

                  {/* Small pink line exactly like reference */}
                  <div className="mt-auto pt-6">
                    <span
                      className="
                        block h-[2px] w-8 rounded-full
                        bg-[#F06A91]
                        transition-all duration-300
                        group-hover:w-12
                      "
                    />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
