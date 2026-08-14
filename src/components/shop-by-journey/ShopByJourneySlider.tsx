"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import ShopByJourneyCard from "@/components/shop-by-journey/ShopByJourneyCard";
import { shopByJourneyItems } from "@/data/shopByJourney";

export default function ShopByJourneySlider() {
  return (
    <div
      role="region"
      aria-label="Shop by journey"
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
        {shopByJourneyItems.map((item) => (
          <SwiperSlide
            key={item.id}
            className="
              !mr-2
              !h-auto
              !w-[calc((100%_-_16px)/3)]
              last:!mr-0

              md:!mr-4
              md:!w-[calc((100%_-_48px)/4)]

              lg:!mr-5
              lg:!w-[calc((100%_-_80px)/5)]
            "
          >
            <ShopByJourneyCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}