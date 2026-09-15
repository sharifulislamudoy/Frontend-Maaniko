"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import ShopByJourneyIconCard from "@/modules/journeys/components/ShopByJourneyCard";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import { shopByJourneyItems } from "@/modules/journeys/data/journeys";
import ViewAllCard from "@/shared/components/ViewAllCard";

export default function ShopByJourneySlider() {
  const { t } = useSiteText();
  const visibleItems = shopByJourneyItems.slice(0, 8);

  return (
    <div
      role="region"
      aria-label={t("shopByJourney.title")}
      className="relative w-full"
    >
      <div>
        <Swiper
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={10}
          grabCursor
          watchOverflow
          centerInsufficientSlides
          resistance
          resistanceRatio={0.65}
          threshold={5}
          breakpoints={{
            768: {
              spaceBetween: 14,
            },
            1024: {
              spaceBetween: 16,
            },
          }}
          className="
            shop-by-journey-card-swiper w-full pb-2
            [&_.swiper-wrapper]:items-stretch
          "
        >
          {visibleItems.map((item) => (
            <SwiperSlide
              key={item.id}
              className="
                !h-auto !w-[106px]
                md:!w-[138px]
                lg:!w-[165px]
              "
            >
              <ShopByJourneyIconCard item={item} />
            </SwiperSlide>
          ))}
          <SwiperSlide className="!h-auto !w-[106px] md:!w-[138px] lg:!w-[165px]">
            <ViewAllCard
              href="/shop-by-journey"
              ariaLabel="সব যাত্রা দেখুন"
              className="rounded-[20px] px-2 md:rounded-[24px]"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
