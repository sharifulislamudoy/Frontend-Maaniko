"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "@/modules/products/components/ProductCard";
import ProductCardSkeleton from "@/modules/products/components/ProductCardSkeleton";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { MaanikoProduct } from "@/modules/products/types/product";

import "swiper/css";

type PopularProductsSectionProps = {
  products?: MaanikoProduct[];
  isLoading?: boolean;
};

const SKELETON_ITEMS = Array.from(
  { length: 5 },
  (_, index) => `product-skeleton-${index}`,
);

const SLIDE_CLASS_NAME = `
  !mr-3
  !h-auto
  !w-[calc(66.666667%_-_8px)]

  md:!mr-4
  md:!w-[calc(40%_-_12.8px)]

  lg:!mr-5
  lg:!w-[calc(28.571429%_-_17.142857px)]
`;

export default function PopularProductsSection({
  products = [],
  isLoading = false,
}: PopularProductsSectionProps) {
  const { locale, t } = useSiteText();

  const canLoop = !isLoading && products.length >= 5;

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="popular-products-title"
      className="overflow-hidden bg-white py-6 md:py-9 lg:py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Heading and subheading */}
        <div className="mx-auto mb-7 max-w-4xl text-center md:mb-10 lg:mb-12">
          <h2
            id="popular-products-title"
            className="text-[21px] leading-[1.3] font-black tracking-tight text-[#07183d] md:text-[35px] md:leading-[1.25] lg:text-[42px]"
          >
            {
              <>
                মায়েদের সবচেয়ে পছন্দের{" "}
                <span className="text-[#db5b8f]">পণ্যগুলো</span>
              </>
            }
          </h2>

          <p className="mt-3 text-[13px] leading-6 font-medium text-[#687086] md:mt-4 md:text-base lg:text-lg">
            {"মা ও শিশুর বিশ্বস্ত পছন্দ"}
          </p>
        </div>

        {/* Products slider */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={0}
          speed={750}
          loop={canLoop}
          loopAdditionalSlides={2}
          grabCursor={!isLoading && products.length > 1}
          watchOverflow
          observer
          observeParents
          resizeObserver
          autoplay={
            canLoop
              ? {
                  delay: 3200,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  stopOnLastSlide: false,
                }
              : false
          }
          className="popular-products-swiper [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:items-stretch"
        >
          {isLoading
            ? SKELETON_ITEMS.map((item) => (
                <SwiperSlide key={item} className={SLIDE_CLASS_NAME}>
                  <div className="h-full py-1">
                    <ProductCardSkeleton />
                  </div>
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product.id} className={SLIDE_CLASS_NAME}>
                  <div className="h-full py-1">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>

        {/* Button below slider */}
        <div className="mt-6 flex justify-center md:mt-8">
          <Link
            href="/shop"
            aria-label={t("shopByJourney.viewAll")}
            className="group flex items-center gap-2 rounded-full border border-[#efccda] bg-white px-5 py-2 text-sm font-extrabold text-[#db5b8f] shadow-sm transition-all duration-300 hover:border-[#FC5689] hover:bg-[#FC5689] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 active:scale-95 md:px-6 md:py-2.5 md:text-base"
          >
            <span>{t("shopByJourney.seeMore")}</span>

            <ArrowRight
              aria-hidden="true"
              strokeWidth={2.2}
              className="size-4 transition-transform duration-300 group-hover:translate-x-1 md:size-5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
