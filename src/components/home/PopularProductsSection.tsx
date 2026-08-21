"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import { useLanguage } from "@/context/LanguageContext";
import { fakeProducts } from "@/data/fakeProducts";
import type { MaanikoProduct } from "@/types/product";

import "swiper/css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type PopularProductsSectionProps = {
  products?: MaanikoProduct[];
  isLoading?: boolean;
};

const SKELETON_ITEMS = Array.from(
  { length: 5 },
  (_, index) => `product-skeleton-${index}`,
);

export default function PopularProductsSection({
  products = fakeProducts,
  isLoading = false,
}: PopularProductsSectionProps) {
  const { t } = useLanguage();

  const canLoop = !isLoading && products.length >= 5;

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="popular-products-title"
      className="bg-white py-3 md:py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
          <div>
            <h2
              id="popular-products-title"
              className="text-md lg:text-3xl font-black tracking-tight text-[#062a54] md:text-3xl"
            >
              {t("home.popularProducts")}
            </h2>
            <div className="mt-2 h-1 w-14 rounded-full bg-[#FC5689] md:w-16 lg:w-20" />
          </div>



          <div className="flex shrink-0 flex-col items-end gap-2">
            <Link
              href="shop"
              aria-label={t("shopByJourney.viewAll")}
              className="group flex items-center gap-1.5 rounded-full border border-[#dce3ec] bg-white px-3 py-1 text-xs font-extrabold text-[#062a54] shadow-sm transition-all duration-300 hover:border-[#FC5689] hover:bg-[#FC5689] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 active:scale-95 sm:gap-2 sm:px-4 sm:text-sm"
            >
              <span>{t("shopByJourney.seeMore")}</span>

              <ArrowRight
                aria-hidden="true"
                strokeWidth={2.2}
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1.5}
          slidesPerGroup={1}
          spaceBetween={14}
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
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 14,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
          }}
          className="popular-products-swiper [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:items-stretch"
        >
          {isLoading
            ? SKELETON_ITEMS.map((item) => (
              <SwiperSlide key={item} className="!h-auto">
                <div className="h-full py-1">
                  <ProductCardSkeleton />
                </div>
              </SwiperSlide>
            ))
            : products.map((product) => (
              <SwiperSlide key={product.id} className="!h-auto">
                <div className="h-full py-1">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}