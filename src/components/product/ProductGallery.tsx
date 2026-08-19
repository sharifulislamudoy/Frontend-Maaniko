"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";
import type { MaanikoProduct } from "@/types/product";

type ProductGalleryProps = {
  product: MaanikoProduct;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const { language, localize, t } = useLanguage();
  const { isInWishlist, toggleWishlist } = useShop();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const productName = localize(product.name);
  const wished = isInWishlist(product.id);
  const hasMultipleImages = product.images.length > 1;

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD"),
    [language],
  );

  const discountPercentage = useMemo(() => {
    if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
      return 0;
    }

    return Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
    );
  }, [product.compareAtPrice, product.price]);

  function selectImage(index: number) {
    setActiveIndex(index);
    if (!swiper) return;

    if (hasMultipleImages) swiper.slideToLoop(index);
    else swiper.slideTo(index);
  }

  return (
    <div className="h-fit min-w-0 rounded-2xl border border-[#dce3ec] bg-white p-3 shadow-[0_12px_36px_rgba(6,42,84,0.06)] sm:p-4">
      <div className="relative grid aspect-square place-items-center overflow-hidden rounded-2xl bg-[#fff4f6]">
        <Swiper
          modules={[Autoplay]}
          onSwiper={setSwiper}
          onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
          loop={hasMultipleImages}
          speed={550}
          grabCursor={hasMultipleImages}
          watchOverflow
          autoplay={
            hasMultipleImages
              ? {
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          aria-label={t("productDetails.galleryLabel")}
          className="size-full"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={`${product.id}-image-${index}`}>
              <div className="grid size-full place-items-center">
                <img
                  src={image}
                  alt={`${productName} ${numberFormatter.format(index + 1)}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="size-full object-contain p-3 sm:p-5"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {discountPercentage > 0 && (
          <span className="absolute left-3 top-3 z-20 rounded-full bg-[#FC5689] px-3 py-1.5 text-[11px] font-black text-white shadow-[0_10px_25px_rgba(239,66,119,0.28)] sm:left-4 sm:top-4 sm:text-xs">
            {numberFormatter.format(discountPercentage)}% {t("productDetails.off")}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            wished
              ? t("wishlist.removeFromWishlist")
              : t("wishlist.addToWishlist")
          }
          aria-pressed={wished}
          className={`absolute right-3 top-3 z-20 grid size-11 place-items-center rounded-full border shadow-lg backdrop-blur-md transition duration-300 sm:right-4 sm:top-4 ${
            wished
              ? "border-[#FC5689] bg-[#FC5689] text-white"
              : "border-white/80 bg-white/90 text-[#062a54] hover:border-[#FC5689] hover:bg-[#FC5689] hover:text-white"
          }`}
        >
          <Heart
            aria-hidden="true"
            className={`size-5 ${wished ? "fill-current" : ""}`}
            strokeWidth={1.9}
          />
        </button>
      </div>

      {hasMultipleImages && (
        <div className="mt-4 min-w-0">
          <div className="flex max-w-full cursor-grab snap-x snap-mandatory gap-2 overflow-x-auto pb-2 active:cursor-grabbing">
            {product.images.map((image, index) => (
              <button
                key={`${product.id}-thumbnail-${index}`}
                type="button"
                onClick={() => selectImage(index)}
                aria-label={t("productDetails.selectImage", { count: index + 1 })}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`aspect-square shrink-0 basis-[4.25rem] snap-start overflow-hidden rounded-xl border-2 bg-[#fff4f6] transition hover:border-[#FC5689] sm:basis-[calc((100%_-_2rem)/5)] ${
                  activeIndex === index
                    ? "border-[#FC5689]"
                    : "border-[#dce3ec]"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="size-full object-contain p-1.5"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
