"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { Banner } from "@/modules/home/types/banner";

import styles from "./HeroSlider.module.css";

function normalizeHref(link?: string | null) {
  const value = link?.trim();

  if (!value) return "";
  if (
    value.startsWith("/") ||
    value.startsWith("#") ||
    /^https?:\/\//i.test(value)
  ) {
    return value;
  }

  // পুরোনো banner-এ শুধু product slug থাকলে সেটিও কাজ করবে।
  return `/products/${encodeURIComponent(value)}`;
}

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function isValidBanner(banner: Banner) {
  return (
    banner.isPublished !== false &&
    typeof banner.imageUrl === "string" &&
    banner.imageUrl.trim().length > 0
  );
}

export default function HeroSlider({
  banners,
  ariaLabel = "হোম ব্যানার",
  headingTag = "h1",
}: {
  banners: Banner[];
  ariaLabel?: string;
  headingTag?: "h1" | "h2";
}) {
  const Heading = headingTag;
  const { text } = useSiteText();
  const validBanners = banners.filter(isValidBanner);
  const hasMultipleBanners = validBanners.length > 1;

  if (validBanners.length === 0) return null;

  return (
    <section
      aria-label={ariaLabel}
      className="bg-white pb-3 pt-3 md:pb-5 md:pt-5 lg:pb-6"
    >
      <div className="mx-auto w-full max-w-7xl px-3 md:px-6 lg:px-8">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          loop={hasMultipleBanners}
          speed={850}
          grabCursor={hasMultipleBanners}
          watchOverflow
          observer
          observeParents
          resizeObserver
          autoplay={
            hasMultipleBanners
              ? {
                  delay: 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          pagination={hasMultipleBanners ? { clickable: true } : false}
          className={styles.heroSlider}
        >
          {validBanners.map((banner, index) => {
            const desktopImage = banner.imageUrl.trim();
            const mobileImage = banner.mobileImageUrl?.trim() || desktopImage;
            const eyebrow = banner.eyebrow ? text(banner.eyebrow) : "";
            const title = banner.title ? text(banner.title) : "";
            const description = banner.description
              ? text(banner.description)
              : "";
            const buttonLabel = banner.buttonLabel
              ? text(banner.buttonLabel)
              : "";
            const href = normalizeHref(banner.buttonHref ?? banner.productLink);
            const hasContent = Boolean(
              eyebrow || title || description || (buttonLabel && href),
            );
            const isBlue = banner.tone === "blue";

            const buttonClassName = `mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-extrabold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 sm:mt-4 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-xs md:px-5 md:py-3 md:text-sm ${
              isBlue
                ? "bg-[#079fe8] shadow-[#079fe8]/20 focus-visible:ring-[#079fe8]/25"
                : "bg-[#ef4277] shadow-[#ef4277]/20 focus-visible:ring-[#ef4277]/25"
            }`;

            const cta =
              buttonLabel && href ? (
                isExternalUrl(href) ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClassName}
                  >
                    {buttonLabel}
                    <ChevronRight className="size-3.5 md:size-4" />
                  </a>
                ) : (
                  <Link href={href} className={buttonClassName}>
                    {buttonLabel}
                    <ChevronRight className="size-3.5 md:size-4" />
                  </Link>
                )
              ) : null;

            return (
              <SwiperSlide key={`${banner.id}-${index}`}>
                <article className="relative h-[57vw] min-h-[210px] max-h-[390px] overflow-hidden bg-[#fff4f6] md:h-[43vw] md:max-h-[430px] lg:h-[390px] xl:h-[410px] xl:max-h-[410px]">
                  <picture className="absolute inset-0 block">
                    <source media="(min-width: 1024px)" srcSet={desktopImage} />
                    <Image
                      src={mobileImage}
                      alt={title || `Maaniko banner ${index + 1}`}
                      fill
                      unoptimized
                      sizes="(min-width: 1280px) 1216px, (min-width: 768px) calc(100vw - 48px), calc(100vw - 24px)"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      className="object-cover object-center"
                    />
                  </picture>

                  {hasContent && (
                    <>
                      <div
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-[58%] md:w-[55%] ${
                          isBlue
                            ? "bg-gradient-to-r from-[#edf8ff]/55 via-[#edf8ff]/18 to-transparent"
                            : "bg-gradient-to-r from-[#fff1f5]/55 via-[#fff1f5]/18 to-transparent"
                        }`}
                      />

                      <div className="absolute inset-y-0 left-0 z-10 flex w-[54%] items-center px-4 pb-5 pt-3 sm:px-7 md:w-[52%] md:px-10 lg:w-[48%] lg:px-14 xl:px-16">
                        <div className="max-w-[500px]">
                          {eyebrow && (
                            <p
                              className={`mb-1.5 text-[9px] font-extrabold uppercase tracking-[0.08em] sm:text-xs md:mb-2 md:text-sm ${
                                isBlue ? "text-[#0784c4]" : "text-[#d93870]"
                              }`}
                            >
                              {eyebrow}
                            </p>
                          )}

                          {title && (
                            <Heading className="text-[18px] font-black leading-[1.22] tracking-tight text-[#062a54] sm:text-2xl md:text-[34px] lg:text-[40px] xl:text-[44px]">
                              {title}
                            </Heading>
                          )}

                          {description && (
                            <p className="mt-2 hidden max-w-[430px] text-xs font-medium leading-5 text-[#51657b] sm:block md:mt-3 md:text-sm lg:text-base lg:leading-7">
                              {description}
                            </p>
                          )}

                          {cta}
                        </div>
                      </div>
                    </>
                  )}
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
