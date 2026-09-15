"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import SolutionBoxCard from "@/modules/solution-boxes/components/SolutionBoxCard";
import type { SolutionBox } from "@/modules/solution-boxes/types/solutionBox";
import ViewAllCard from "@/shared/components/ViewAllCard";

export default function SolutionBoxSlider({ boxes }: { boxes: SolutionBox[] }) {
  const visibleBoxes = boxes.slice(0, 6);

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
        resistance
        resistanceRatio={0.65}
        threshold={5}
        className="solution-box-swiper pb-1 [&_.swiper-wrapper]:items-stretch"
      >
        {visibleBoxes.map((box) => (
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
        <SwiperSlide className="!mr-3 !h-auto !w-[calc(66.666667%_-_8px)] last:!mr-0 md:!mr-4 md:!w-[calc(40%_-_12.8px)] md:last:!mr-0 lg:!mr-5 lg:!w-[calc(28.571429%_-_17.142857px)] lg:last:!mr-0">
          <ViewAllCard href="/solution-box" ariaLabel="সব সল্যুশন বক্স দেখুন" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
