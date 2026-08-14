"use client";

import type { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import CareGuideCard from "@/components/care-guide/CareGuideCard";
import { careGuideItems } from "@/data/careGuides";
import { useLanguage } from "@/context/LanguageContext";

export default function CareGuideSlider() {
  const { t } = useLanguage();

  // Empty array হলেও invalid division এড়াবে
  const itemCount = Math.max(1, careGuideItems.length);

  const mobileSlides = Math.min(3, itemCount);
  const tabletSlides = Math.min(4, itemCount);
  const desktopSlides = Math.min(5, itemCount);

  const sliderStyles = {
    "--care-mobile-width": `calc(
      (100% - ${(mobileSlides - 1) * 8}px) / ${mobileSlides}
    )`,
    "--care-tablet-width": `calc(
      (100% - ${(tabletSlides - 1) * 16}px) / ${tabletSlides}
    )`,
    "--care-desktop-width": `calc(
      (100% - ${(desktopSlides - 1) * 20}px) / ${desktopSlides}
    )`,
  } as CSSProperties;

  return (
    <div
      role="region"
      aria-label={t("careGuide.sliderLabel")}
      style={sliderStyles}
      className="w-full overflow-hidden"
    >
      <Swiper
        slidesPerView="auto"
        slidesPerGroup={1}
        spaceBetween={0}
        grabCursor
        watchOverflow
        threshold={5}
        className="pb-1 [&_.swiper-wrapper]:items-stretch"
      >
        {careGuideItems.map((guide) => (
          <SwiperSlide
            key={guide.id}
            className="
              !mr-2
              !h-auto
              !w-[var(--care-mobile-width)]
              last:!mr-0

              md:!mr-4
              md:!w-[var(--care-tablet-width)]
              md:last:!mr-0

              lg:!mr-5
              lg:!w-[var(--care-desktop-width)]
              lg:last:!mr-0
            "
          >
            <CareGuideCard guide={guide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}