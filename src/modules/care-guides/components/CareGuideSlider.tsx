"use client";

import type { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import CareGuideCard from "@/modules/care-guides/components/CareGuideCard";
import { careGuideItems } from "@/modules/care-guides/data/careGuides";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import ViewAllCard from "@/shared/components/ViewAllCard";

export default function CareGuideSlider() {
  const { t } = useSiteText();

  const visibleGuides = careGuideItems.slice(0, 6);
  const itemCount = Math.max(1, visibleGuides.length + 1);

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
        resistance
        resistanceRatio={0.65}
        threshold={5}
        className="care-guide-swiper pb-1 [&_.swiper-wrapper]:items-stretch"
      >
        {visibleGuides.map((guide) => (
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
        <SwiperSlide className="!mr-2 !h-auto !w-[var(--care-mobile-width)] last:!mr-0 md:!mr-4 md:!w-[var(--care-tablet-width)] md:last:!mr-0 lg:!mr-5 lg:!w-[var(--care-desktop-width)] lg:last:!mr-0">
          <ViewAllCard href="/guide" ariaLabel="সব যত্নের গাইড দেখুন" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
