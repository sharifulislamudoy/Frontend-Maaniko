"use client";

import {
  Activity,
  Baby,
  Bath,
  Check,
  ChevronRight,
  Heart,
  HeartPulse,
  RotateCcw,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import ProductCard from "@/modules/products/components/ProductCard";
import type { MaanikoProduct } from "@/modules/products/types/product";
import type { ShopJourney } from "@/shared/lib/api/catalog";

import styles from "./ShopPageContent.module.css";

type BannerCopy = string;

type BannerTone = "pink" | "blue";

type ShopBanner = {
  id: string;
  desktopImage: string;
  mobileImage: string;
  eyebrow: BannerCopy;
  title: BannerCopy;
  description: BannerCopy;
  buttonLabel: BannerCopy;
  buttonHref: string;
  tone: BannerTone;
};

type ShopPageContentProps = {
  initialJourney?: string;
  products: MaanikoProduct[];
  banners: ShopBanner[];
  journeys: ShopJourney[];
};

const JOURNEY_ICONS = {
  activity: Activity,
  baby: Baby,
  bath: Bath,
  heart: Heart,
  heartPulse: HeartPulse,
  shield: ShieldCheck,
  utensils: Utensils,
} as const;

function ShopHeroSlider({ banners }: { banners: ShopBanner[] }) {
  const { text } = useSiteText();
  const hasMultipleSlides = banners.length > 1;

  return (
    <section
      aria-label={text("শপ ব্যানার")}
      className="bg-white pb-3 pt-3 md:pb-5 md:pt-5 lg:pb-6"
    >
      <div className="mx-auto w-full max-w-7xl px-3 md:px-6 lg:px-8">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={hasMultipleSlides}
          speed={850}
          grabCursor={hasMultipleSlides}
          watchOverflow
          observer
          observeParents
          resizeObserver
          autoplay={
            hasMultipleSlides
              ? {
                  delay: 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          pagination={hasMultipleSlides ? { clickable: true } : false}
          className={styles.heroSlider}
        >
          {banners.map((banner, index) => {
            const isPink = banner.tone === "pink";

            return (
              <SwiperSlide key={banner.id}>
                <article className="relative h-[57vw] min-h-[210px] max-h-[390px] overflow-hidden bg-[#fff4f6] md:h-[43vw] md:max-h-[430px] lg:h-[390px] xl:h-[410px] xl:max-h-[410px]">
                  <picture className="absolute inset-0 block">
                    <source
                      media="(min-width: 1024px)"
                      srcSet={banner.desktopImage}
                    />
                    <img
                      src={banner.mobileImage}
                      alt=""
                      aria-hidden="true"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      className="h-full w-full object-cover object-center"
                    />
                  </picture>

                  <div
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-[58%] md:w-[55%] ${
                      isPink
                        ? "bg-gradient-to-r from-[#fff1f5]/55 via-[#fff1f5]/18 to-transparent"
                        : "bg-gradient-to-r from-[#edf8ff]/55 via-[#edf8ff]/18 to-transparent"
                    }`}
                  />

                  <div className="absolute inset-y-0 left-0 z-10 flex w-[54%] items-center px-4 pb-5 pt-3 sm:px-7 md:w-[52%] md:px-10 lg:w-[48%] lg:px-14 xl:px-16">
                    <div className="max-w-[500px]">
                      <p
                        className={`mb-1.5 text-[9px] font-extrabold uppercase tracking-[0.08em] sm:text-xs md:mb-2 md:text-sm ${
                          isPink ? "text-[#d93870]" : "text-[#0784c4]"
                        }`}
                      >
                        {text(banner.eyebrow)}
                      </p>

                      <h1 className="text-[18px] font-black leading-[1.22] tracking-tight text-[#062a54] sm:text-2xl md:text-[34px] lg:text-[40px] xl:text-[44px]">
                        {text(banner.title)}
                      </h1>

                      <p className="mt-2 hidden max-w-[430px] text-xs font-medium leading-5 text-[#51657b] sm:block md:mt-3 md:text-sm lg:text-base lg:leading-7">
                        {text(banner.description)}
                      </p>

                      <a
                        href={banner.buttonHref}
                        className={`mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-extrabold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 sm:mt-4 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-xs md:px-5 md:py-3 md:text-sm ${
                          isPink
                            ? "bg-[#ef4277] shadow-[#ef4277]/20 focus-visible:ring-[#ef4277]/25"
                            : "bg-[#079fe8] shadow-[#079fe8]/20 focus-visible:ring-[#079fe8]/25"
                        }`}
                      >
                        {text(banner.buttonLabel)}
                        <ChevronRight className="size-3.5 md:size-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

type JourneySelectorProps = {
  journeys: ShopJourney[];
  selectedJourney: string | null;
  onSelect: (journeyId: string | null) => void;
  productCounts: Record<string, number>;
};

function JourneySelector({
  journeys,
  selectedJourney,
  onSelect,
  productCounts,
}: JourneySelectorProps) {
  const { locale, text } = useSiteText();

  return (
    <section
      id="shop-journeys"
      aria-labelledby="journey-selector-title"
      className="scroll-mt-24 bg-white py-5 md:py-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-7xl px-3 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[24px] border border-[#e4eaf1] bg-[linear-gradient(145deg,#ffffff_0%,#fffafb_48%,#f8fcff_100%)] px-3 py-5 shadow-[0_14px_42px_rgba(6,42,84,0.07)] md:rounded-[30px] md:px-7 md:py-8 lg:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="journey-selector-title"
                className="text-xl font-black leading-tight text-[#062a54] md:text-[32px]"
              >
                {"আপনার Journey বেছে নিন"}
              </h2>
              <p className="mt-1 text-xs font-medium text-[#68798c] md:mt-2 md:text-sm">
                {"একটি ধাপ বেছে নিলেই প্রাসঙ্গিক পণ্যগুলো আগে দেখবেন"}
              </p>
            </div>

            {selectedJourney && (
              <button
                type="button"
                onClick={() => onSelect(null)}
                className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#dce3ec] bg-white px-3 py-1.5 text-xs font-bold text-[#53657a] transition hover:border-[#FC5689] hover:text-[#FC5689] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/15 md:px-4 md:py-2 md:text-sm"
              >
                <RotateCcw className="size-3.5" />
                {"সব পণ্য দেখুন"}
              </button>
            )}
          </div>

          <div className="mt-5 grid grid-cols-4 gap-2 md:mt-7 md:grid-cols-7 md:gap-3 lg:gap-4">
            {journeys.map((journey) => {
              const Icon = JOURNEY_ICONS[journey.icon];
              const isSelected = journey.id === selectedJourney;
              const productCount = productCounts[journey.id] ?? 0;

              return (
                <button
                  key={journey.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelect(journey.id)}
                  className="group relative flex min-w-0 flex-col items-center rounded-[18px] border bg-white px-1.5 py-3 text-center shadow-[0_7px_22px_rgba(6,42,84,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(6,42,84,0.11)] focus-visible:outline-none focus-visible:ring-4 md:rounded-[22px] md:px-2 md:py-4"
                  style={{
                    borderColor: isSelected ? journey.color : "#e2e8f0",
                    boxShadow: isSelected
                      ? `0 12px 30px ${journey.color}22`
                      : undefined,
                  }}
                >
                  {isSelected && (
                    <span
                      className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full text-white md:right-2 md:top-2 md:size-5"
                      style={{ backgroundColor: journey.color }}
                    >
                      <Check className="size-2.5 md:size-3" strokeWidth={3} />
                    </span>
                  )}

                  <span
                    className="text-[10px] font-black md:text-sm"
                    style={{ color: journey.color }}
                  >
                    {journey.number}
                  </span>

                  <span
                    className="mt-1.5 flex size-9 items-center justify-center rounded-full transition duration-300 group-hover:scale-110 md:mt-2 md:size-14"
                    style={{
                      color: journey.color,
                      backgroundColor: journey.softColor,
                    }}
                  >
                    <Icon className="size-[18px] md:size-7" strokeWidth={1.9} />
                  </span>

                  <span className="mt-2 w-full truncate text-[10px] font-black leading-tight text-[#062a54] md:text-sm lg:text-[15px]">
                    {text(journey.name)}
                  </span>

                  <span className="mt-0.5 hidden text-[10px] font-medium leading-4 text-[#718095] lg:block">
                    {text(journey.description)}
                  </span>

                  <span
                    className="mt-1 text-[9px] font-bold md:text-[10px]"
                    style={{ color: journey.color }}
                  >
                    {`${new Intl.NumberFormat("bn-BD").format(productCount)}টি পণ্য`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

type ProductSectionProps = {
  title: string;
  description?: string;
  products: MaanikoProduct[];
  accent?: string;
};

function ProductSection({
  title,
  description,
  products,
  accent = "#FC5689",
}: ProductSectionProps) {
  const { locale } = useSiteText();

  return (
    <section aria-label={title}>
      <div className="mb-4 flex items-end justify-between gap-3 md:mb-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black leading-tight text-[#062a54] md:text-[30px]">
              {title}
            </h2>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-extrabold md:px-3 md:text-xs"
              style={{ color: accent, backgroundColor: `${accent}12` }}
            >
              {`${new Intl.NumberFormat("bn-BD").format(products.length)}টি পণ্য`}
            </span>
          </div>
          {description && (
            <p className="mt-1 text-xs font-medium text-[#748296] md:text-sm">
              {description}
            </p>
          )}
        </div>
        <span
          aria-hidden="true"
          className="mb-1 hidden h-1 w-16 shrink-0 rounded-full sm:block"
          style={{ backgroundColor: accent }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function ShopPageContent({
  initialJourney,
  products,
  banners,
  journeys,
}: ShopPageContentProps) {
  const router = useRouter();
  const { locale, text } = useSiteText();

  const validInitialJourney = journeys.some(
    (journey) => journey.id === initialJourney,
  )
    ? (initialJourney ?? null)
    : null;

  const [selectedJourney, setSelectedJourney] = useState<string | null>(
    validInitialJourney,
  );

  const productCounts = useMemo(() => {
    return products.reduce<Record<string, number>>((counts, product) => {
      for (const journey of product.journeys ?? []) {
        counts[journey.slug] = (counts[journey.slug] ?? 0) + 1;
      }
      return counts;
    }, {});
  }, [products]);

  const selectedJourneyData = journeys.find(
    (journey) => journey.id === selectedJourney,
  );

  const selectedProducts = selectedJourney
    ? products.filter((product) =>
        product.journeys?.some((journey) => journey.slug === selectedJourney),
      )
    : products;

  const remainingProducts = selectedJourney
    ? products.filter(
        (product) =>
          !product.journeys?.some(
            (journey) => journey.slug === selectedJourney,
          ),
      )
    : [];

  function handleJourneySelect(journeyId: string | null) {
    setSelectedJourney(journeyId);
    router.replace(journeyId ? `/shop?journey=${journeyId}` : "/shop", {
      scroll: false,
    });

    window.setTimeout(() => {
      document
        .getElementById("shop-products")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  return (
    <main className="min-h-screen bg-white">
      <ShopHeroSlider banners={banners} />

      <JourneySelector
        journeys={journeys}
        selectedJourney={selectedJourney}
        onSelect={handleJourneySelect}
        productCounts={productCounts}
      />

      <div
        id="shop-products"
        className="scroll-mt-24 bg-[linear-gradient(180deg,#fbfdff_0%,#ffffff_100%)] py-6 md:py-9 lg:py-11"
      >
        <div className="mx-auto w-full max-w-7xl space-y-10 px-3 md:space-y-14 md:px-6 lg:px-8">
          <ProductSection
            title={
              selectedJourneyData
                ? `${text(selectedJourneyData.name)} ${"Essentials"}`
                : "সকল পণ্য"
            }
            description={
              selectedJourneyData
                ? "আপনার নির্বাচিত Journey-এর প্রাসঙ্গিক পণ্যগুলো আগে দেখানো হচ্ছে"
                : "মা ও শিশুর যত্নে প্রয়োজনীয় সব পণ্য"
            }
            products={selectedProducts}
            accent={selectedJourneyData?.color}
          />

          {selectedJourneyData && remainingProducts.length > 0 && (
            <div className="border-t border-[#e5eaf0] pt-9 md:pt-12">
              <ProductSection
                title={"অন্যান্য সকল পণ্য"}
                description={"আপনার জন্য আমাদের বাকি পণ্যগুলো"}
                products={remainingProducts}
                accent="#03A7FD"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
