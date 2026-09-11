"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import SolutionBoxCard from "@/modules/solution-boxes/components/SolutionBoxCard";
import type { SolutionBox } from "@/modules/solution-boxes/types/solutionBox";

export default function SolutionBoxSlider({ boxes }: { boxes: SolutionBox[] }) {
  return (
    <div
      role="region"
      aria-label="Maaniko সল্যুশন বক্সসমূহ"
      className="w-full overflow-hidden"
    >
      <Swiper
        slidesPerView="auto"
        slidesPerGroup={1}
        spaceBetween={0}
        grabCursor
        watchOverflow
        threshold={5}
        className="solution-box-swiper pb-1 [&_.swiper-wrapper]:items-stretch"
      >
        {boxes.map((box) => (
          <SwiperSlide
            key={box.id}
            className="
              !mr-3
              !h-auto
              !w-[calc(66.666667%_-_8px)]
              last:!mr-0

              md:!mr-4
              md:!w-[calc(40%_-_12.8px)]
              md:last:!mr-0

              lg:!mr-5
              lg:!w-[calc(28.571429%_-_17.142857px)]
              lg:last:!mr-0
            "
          >
            <SolutionBoxCard box={box} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
