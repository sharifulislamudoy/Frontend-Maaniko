"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Baby,
  Check,
  CheckCircle2,
  ChevronRight,
  Headphones,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  UsersRound,
  Zap,
} from "lucide-react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "@/components/product/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";
import type { MaanikoProduct } from "@/types/product";

type ProductDetailsViewProps = {
  product: MaanikoProduct;
  relatedProducts: MaanikoProduct[];
};

type ProductDetailsTab = "essential" | "preferred" | "delivery";

type CartStatus = "idle" | "added";

function getInitialTab(details: MaanikoProduct["details"]): ProductDetailsTab {
  if (details?.whyEssential.length) return "essential";
  if (details?.preferredFor.length) return "preferred";
  return "delivery";
}

export default function ProductDetailsView({
  product,
  relatedProducts,
}: ProductDetailsViewProps) {
  const router = useRouter();
  const { language, localize, t } = useLanguage();
  const { addToCart } = useShop();
  const [activeTab, setActiveTab] = useState<ProductDetailsTab>(() =>
    getInitialTab(product.details),
  );
  const [cartStatus, setCartStatus] = useState<CartStatus>("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productName = localize(product.name);
  const productDescription = localize(product.description);
  const productCategory = localize(product.category);
  const productBadge = product.badge ? localize(product.badge) : "";
  const isAvailable = product.stock > 0;
  const details = product.details;

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [language],
  );

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD"),
    [language],
  );

  const discountAmount = Math.max(
    0,
    (product.compareAtPrice ?? product.price) - product.price,
  );

  const tabs = useMemo(
    () =>
      [
        ...(details?.whyEssential.length
          ? [
              {
                id: "essential" as const,
                label: t("productDetails.tabEssential"),
              },
            ]
          : []),
        ...(details?.preferredFor.length
          ? [
              {
                id: "preferred" as const,
                label: t("productDetails.tabPreferred"),
              },
            ]
          : []),
        { id: "delivery" as const, label: t("productDetails.tabDelivery") },
      ],
    [details, t],
  );

  const resolvedActiveTab = tabs.some((tab) => tab.id === activeTab)
    ? activeTab
    : tabs[0].id;

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  function handleAddToCart() {
    if (!isAvailable) return;

    addToCart(product);
    setCartStatus("added");

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setCartStatus("idle"), 1600);
  }

  function handleBuyNow() {
    if (!isAvailable) return;

    router.push(
      `/checkout?mode=buy-now&productId=${encodeURIComponent(product.id)}&quantity=1`,
    );
  }

  const cartButtonLabel = isAvailable
    ? cartStatus === "added"
      ? t("actions.addedToCart")
      : t("actions.addToCart")
    : t("product.outOfStock");

  return (
    <main className="min-h-screen bg-[#fff9fb] pb-24 pt-2 text-[#062a54] md:pt-5 lg:pb-0">
      <div className="mx-auto w-full max-w-7xl space-y-3 overflow-x-hidden px-2 md:space-y-5 md:px-4 lg:px-6">
        <nav
          aria-label={t("productDetails.breadcrumb")}
          className="rounded-xl border border-[#dce3ec] bg-white px-3 py-2 text-[11px] text-slate-500 shadow-sm md:rounded-2xl md:px-4 md:py-3 md:text-sm"
        >
          <div className="flex min-w-0 items-center gap-1.5 overflow-hidden md:gap-2">
            <Link href="/" className="shrink-0 transition hover:text-[#FC5689]">
              {t("nav.home")}
            </Link>
            <ChevronRight className="size-3 shrink-0 text-slate-300 md:size-3.5" />
            <Link
              href="/maaniko-collection"
              className="shrink-0 transition hover:text-[#FC5689]"
            >
              {t("nav.shop")}
            </Link>
            <ChevronRight className="size-3 shrink-0 text-slate-300 md:size-3.5" />
            <span className="truncate font-semibold text-[#FC5689]">
              {productName}
            </span>
          </div>
        </nav>

        <section className="grid min-w-0 items-start gap-3 md:gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <ProductGallery product={product} />

          <div className="h-fit min-w-0 rounded-2xl border border-[#dce3ec] bg-white p-3 shadow-[0_12px_36px_rgba(6,42,84,0.06)] md:p-5 lg:flex lg:h-full lg:flex-col">
            {productBadge && (
              <span className="inline-flex rounded-full bg-[#FC5689]/10 px-2.5 py-1 text-[10px] font-bold text-[#FC5689] md:px-3 md:text-xs">
                {productBadge}
              </span>
            )}

            <h1 className="mt-3 break-words text-xl font-black leading-tight tracking-tight text-[#062a54] md:mt-4 md:text-3xl">
              {productName}
            </h1>

            <p className="mt-2 text-xs leading-5 text-slate-500 md:mt-3 md:text-[15px] md:leading-7">
              {productDescription}
            </p>

            <div className="mt-3 flex min-w-0 flex-wrap items-end gap-2 md:mt-5 md:gap-3">
              <span className="break-words text-xl font-black text-[#FC5689] md:text-3xl">
                {priceFormatter.format(product.price)}
              </span>

              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm font-semibold text-slate-400 line-through md:text-lg">
                  {priceFormatter.format(product.compareAtPrice)}
                </span>
              )}

              {discountAmount > 0 && (
                <span className="mb-0.5 rounded-full bg-[#fff4f6] px-2.5 py-1 text-[10px] font-bold text-[#FC5689] md:px-3 md:text-xs">
                  {priceFormatter.format(discountAmount)}{" "}
                  {t("productDetails.save")}
                </span>
              )}
            </div>

            {product.rating !== undefined && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 md:mt-3 md:gap-2 md:text-sm">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`size-3.5 md:size-4 ${
                        index < Math.round(product.rating ?? 0)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-100 text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">
                  {product.rating.toFixed(1)} ({
                    numberFormatter.format(product.reviewCount ?? 0)
                  }{" "}
                  {t("productDetails.reviews")})
                </span>
              </div>
            )}

            <div className="mt-3 grid grid-cols-2 gap-2 md:mt-5 md:gap-3">
              <InfoField
                label={t("productDetails.category")}
                value={productCategory}
              />
              <InfoField
                label={t("productDetails.availability")}
                value={
                  isAvailable
                    ? t("product.inStock")
                    : t("product.outOfStock")
                }
                positive={isAvailable}
              />
            </div>

            {details?.includedItems.length ? (
              <section
                aria-labelledby="included-items-title"
                className="mt-3 border-t border-[#dce3ec] pt-3 md:mt-4 md:pt-4"
              >
                <div className="flex items-center gap-1.5">
                  <PackageCheck className="size-4 shrink-0 text-[#FC5689]" />
                  <h2
                    id="included-items-title"
                    className="text-[11px] font-bold text-[#062a54] md:text-xs"
                  >
                    {t("productDetails.boxIncluded")}
                  </h2>
                </div>

                <ul className="mt-2 grid gap-x-4 gap-y-1.5 ">
                  {details.includedItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex min-w-0 items-start gap-1.5 text-[11px] leading-4 text-slate-600 md:text-xs md:leading-5"
                    >
                      <Check className="mt-0.5 size-3.5 shrink-0 text-[#FC5689]" />
                      <span className="min-w-0 break-words">
                        {localize(item.name)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="mt-3 grid grid-cols-3 divide-x divide-[#dce3ec] rounded-xl border border-[#dce3ec] bg-[#fff9fb] py-2 md:mt-5 md:rounded-2xl md:py-3 lg:mt-auto">
              <TrustItem icon={ShieldCheck} label={t("productDetails.safe")} />
              <TrustItem
                icon={Truck}
                label={t("productDetails.fastDelivery")}
              />
              <TrustItem
                icon={RefreshCcw}
                label={t("productDetails.easyReturn")}
              />
            </div>

            <div className="mt-5 hidden grid-cols-2 gap-3 lg:grid">
              <ActionButtons
                isAvailable={isAvailable}
                cartStatus={cartStatus}
                cartLabel={cartButtonLabel}
                buyLabel={t("productDetails.buyNow")}
                outOfStockLabel={t("product.outOfStock")}
                onAdd={handleAddToCart}
                onBuy={handleBuyNow}
              />
            </div>
          </div>
        </section>

        <section aria-label={t("productDetails.detailsTabs")}>
          <div className="max-w-full overflow-hidden rounded-xl border border-[#dce3ec] bg-white p-1.5 shadow-sm md:rounded-2xl md:p-2">
            <div className="flex min-w-0 gap-1.5 overflow-x-auto md:gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-bold transition md:rounded-xl md:px-4 md:py-3 md:text-sm lg:flex-1 lg:text-center ${
                    resolvedActiveTab === tab.id
                      ? "bg-[#FC5689] text-white shadow-[0_8px_22px_rgba(239,66,119,0.2)]"
                      : "text-slate-500 hover:bg-[#fff4f6] hover:text-[#FC5689]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-[#dce3ec] bg-white p-4 shadow-[0_12px_36px_rgba(6,42,84,0.06)] md:mt-5 md:p-7">
            <TabContent
              activeTab={resolvedActiveTab}
              product={product}
              localize={localize}
              t={t}
            />
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section
            className="py-2 md:py-6"
            aria-labelledby="recommendations-title"
          >
            <h2
              id="recommendations-title"
              className="text-lg font-black text-[#062a54] md:text-3xl"
            >
              {t("productDetails.youMayAlsoLike")}
            </h2>

            <Swiper
              modules={[Autoplay]}
              slidesPerView={1.5}
              slidesPerGroup={1}
              spaceBetween={10}
              speed={700}
              loop={relatedProducts.length >= 5}
              grabCursor
              watchOverflow
              autoplay={
                relatedProducts.length > 1
                  ? {
                      delay: 3200,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              breakpoints={{
                768: { slidesPerView: 2.5, spaceBetween: 16 },
                1024: { slidesPerView: 3.5, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="popular-products-swiper mt-3 md:mt-5 [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:items-stretch"
            >
              {relatedProducts.map((relatedProduct) => (
                <SwiperSlide key={relatedProduct.id} className="!h-auto">
                  <div className="h-full py-1">
                    <ProductCard product={relatedProduct} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-40 border-t border-[#f0d9e1] bg-white/95 px-2 py-2 shadow-[0_-10px_30px_rgba(6,42,84,0.1)] backdrop-blur-xl md:bottom-[calc(76px+env(safe-area-inset-bottom))] md:px-3 lg:hidden">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 md:gap-3">
          <ActionButtons
            isAvailable={isAvailable}
            cartStatus={cartStatus}
            cartLabel={cartButtonLabel}
            buyLabel={t("productDetails.buyNow")}
            outOfStockLabel={t("product.outOfStock")}
            onAdd={handleAddToCart}
            onBuy={handleBuyNow}
          />
        </div>
      </div>
    </main>
  );
}

type InfoFieldProps = {
  label: string;
  value: string;
  positive?: boolean;
};

function InfoField({ label, value, positive }: InfoFieldProps) {
  return (
    <div className="min-w-0 rounded-lg border border-[#dce3ec] bg-[#fff9fb] p-2 md:rounded-xl md:p-3">
      <p className="text-[9px] font-bold uppercase tracking-[0.06em] text-slate-400 md:text-[10px] md:tracking-[0.08em]">
        {label}
      </p>
      <p
        className={`mt-0.5 break-words text-xs font-bold md:mt-1 md:text-sm ${
          positive ? "text-emerald-600" : "text-[#062a54]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

type TrustItemProps = {
  icon: typeof Truck;
  label: string;
};

function TrustItem({ icon: Icon, label }: TrustItemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-1 text-center text-[9px] font-bold leading-3 text-[#062a54] md:flex-row md:px-2 md:text-xs md:leading-4">
      <Icon className="size-4 shrink-0 text-[#FC5689] md:size-5" />
      <span>{label}</span>
    </div>
  );
}

type ActionButtonsProps = {
  isAvailable: boolean;
  cartStatus: CartStatus;
  cartLabel: string;
  buyLabel: string;
  outOfStockLabel: string;
  onAdd: () => void;
  onBuy: () => void;
};

function ActionButtons({
  isAvailable,
  cartStatus,
  cartLabel,
  buyLabel,
  outOfStockLabel,
  onAdd,
  onBuy,
}: ActionButtonsProps) {
  return (
    <>
      <button
        type="button"
        disabled={!isAvailable}
        onClick={onAdd}
        className={`inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl px-2 text-[11px] font-black transition md:h-[52px] md:gap-2 md:px-5 md:text-sm ${
          isAvailable
            ? "bg-[#FC5689] text-white hover:bg-[#e93f75]"
            : "cursor-not-allowed bg-slate-300 text-slate-500"
        }`}
      >
        {cartStatus === "added" ? (
          <Check className="size-4" />
        ) : (
          <ShoppingCart className="size-4" />
        )}
        <span className="truncate">{cartLabel}</span>
      </button>

      <button
        type="button"
        disabled={!isAvailable}
        onClick={onBuy}
        className={`inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border px-2 text-[11px] font-black transition md:h-[52px] md:gap-2 md:px-5 md:text-sm ${
          isAvailable
            ? "border-[#FC5689] bg-[#FC5689]/10 text-[#FC5689] hover:bg-[#FC5689] hover:text-white"
            : "cursor-not-allowed border-slate-300 bg-slate-100 text-slate-400"
        }`}
      >
        <Zap className="size-4 fill-current" />
        <span className="truncate">
          {isAvailable ? buyLabel : outOfStockLabel}
        </span>
      </button>
    </>
  );
}

type TabContentProps = {
  activeTab: ProductDetailsTab;
  product: MaanikoProduct;
  localize: ReturnType<typeof useLanguage>["localize"];
  t: ReturnType<typeof useLanguage>["t"];
};

function TabContent({ activeTab, product, localize, t }: TabContentProps) {
  const details = product.details;

  if (activeTab === "essential" && details) {
    return (
      <div>
        <TabHeading
          icon={Sparkles}
          title={t("productDetails.whyEssential")}
        />
        <ul className="mt-3 grid gap-2 md:mt-5 md:grid-cols-2 md:gap-3">
          {details.whyEssential.map((reason, index) => (
            <li
              key={index}
              className="flex gap-2 rounded-xl border border-[#f1dfe5] bg-[#fff9fb] p-3 text-xs leading-5 text-slate-600 md:gap-3 md:rounded-2xl md:p-4 md:text-sm md:leading-6"
            >
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FC5689] md:mt-1" />
              <span>{localize(reason)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (activeTab === "preferred" && details) {
    return (
      <div>
        <TabHeading
          icon={UsersRound}
          title={t("productDetails.preferredFor")}
        />
        <div className="mt-3 grid grid-cols-2 gap-2 md:mt-5 md:grid-cols-4 md:gap-3">
          {details.preferredFor.map((audience, index) => (
            <article
              key={index}
              className="flex min-h-24 flex-col items-center justify-center rounded-xl border border-[#dcebf2] bg-[#f4fbff] p-3 text-center text-[11px] font-bold leading-4 text-[#062a54] md:min-h-28 md:rounded-2xl md:p-4 md:text-sm md:leading-5"
            >
              <Baby className="mb-2 size-5 text-[#03A7FD] md:mb-3 md:size-6" />
              {localize(audience)}
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <TabHeading
        icon={Truck}
        title={t("productDetails.deliverySupport")}
      />
      <div className="mt-3 grid gap-2 md:mt-5 md:grid-cols-3 md:gap-4">
        <SupportCard
          icon={Truck}
          title={t("productDetails.deliveryTitle")}
          description={t("productDetails.deliveryDescription")}
        />
        <SupportCard
          icon={Headphones}
          title={t("productDetails.supportTitle")}
          description={t("productDetails.supportDescription")}
        />
        <SupportCard
          icon={PackageCheck}
          title={t("productDetails.packagingTitle")}
          description={t("productDetails.packagingDescription")}
        />
      </div>
    </div>
  );
}

type TabHeadingProps = {
  icon: typeof Truck;
  title: string;
};

function TabHeading({ icon: Icon, title }: TabHeadingProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <span className="grid size-9 place-items-center rounded-lg bg-[#FC5689]/10 text-[#FC5689] md:size-11 md:rounded-xl">
        <Icon className="size-4 md:size-5" />
      </span>
      <h2 className="text-base font-black text-[#062a54] md:text-2xl">
        {title}
      </h2>
    </div>
  );
}

type SupportCardProps = {
  icon: typeof Truck;
  title: string;
  description: string;
};

function SupportCard({ icon: Icon, title, description }: SupportCardProps) {
  return (
    <article className="flex items-start gap-3 rounded-xl border border-[#dce3ec] bg-[#fff9fb] p-3 md:gap-4 md:rounded-2xl md:p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-[#FC5689] shadow-sm md:size-11 md:rounded-xl">
        <Icon className="size-4 md:size-5" />
      </span>
      <div>
        <h3 className="text-xs font-black text-[#062a54] md:text-base">
          {title}
        </h3>
        <p className="mt-1 text-[11px] leading-4 text-slate-500 md:text-sm md:leading-5">
          {description}
        </p>
      </div>
    </article>
  );
}