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

type ProductDetailsTab =
  | "description"
  | "included"
  | "essential"
  | "preferred"
  | "delivery";

type CartStatus = "idle" | "added";

const includedIcons = [PackageCheck, Sparkles, ShieldCheck, Baby];

export default function ProductDetailsView({
  product,
  relatedProducts,
}: ProductDetailsViewProps) {
  const router = useRouter();
  const { language, localize, t } = useLanguage();
  const { addToCart } = useShop();
  const [activeTab, setActiveTab] = useState<ProductDetailsTab>("description");
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

  const discountPercentage = product.compareAtPrice
    ? Math.max(
        0,
        Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100,
        ),
      )
    : 0;

  const tabs = useMemo(
    () =>
      [
        { id: "description" as const, label: t("productDetails.tabDescription") },
        ...(details?.includedItems.length
          ? [{ id: "included" as const, label: t("productDetails.tabIncluded") }]
          : []),
        ...(details?.whyEssential.length
          ? [{ id: "essential" as const, label: t("productDetails.tabEssential") }]
          : []),
        ...(details?.preferredFor.length
          ? [{ id: "preferred" as const, label: t("productDetails.tabPreferred") }]
          : []),
        { id: "delivery" as const, label: t("productDetails.tabDelivery") },
      ],
    [details, t],
  );

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
    <main className="min-h-screen bg-[#fff9fb] pb-24 pt-4 text-[#062a54] sm:pt-6 xl:pb-0">
      <div className="mx-auto w-full max-w-7xl space-y-5 overflow-x-hidden px-3 sm:px-4 lg:px-6">
        <nav
          aria-label={t("productDetails.breadcrumb")}
          className="rounded-2xl border border-[#dce3ec] bg-white px-4 py-3 text-xs text-slate-500 shadow-sm sm:text-sm"
        >
          <div className="flex min-w-0 items-center gap-2 overflow-hidden">
            <Link href="/" className="shrink-0 transition hover:text-[#FC5689]">
              {t("nav.home")}
            </Link>
            <ChevronRight className="size-3.5 shrink-0 text-slate-300" />
            <Link
              href="/maaniko-collection"
              className="shrink-0 transition hover:text-[#FC5689]"
            >
              {t("nav.shop")}
            </Link>
            <ChevronRight className="size-3.5 shrink-0 text-slate-300" />
            <span className="truncate font-semibold text-[#FC5689]">
              {productName}
            </span>
          </div>
        </nav>

        <section className="grid min-w-0 items-start gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <ProductGallery product={product} />

          <div className="h-fit min-w-0 rounded-2xl border border-[#dce3ec] bg-white p-4 shadow-[0_12px_36px_rgba(6,42,84,0.06)] sm:p-5 lg:mt-6">
            {(productBadge || discountPercentage > 0) && (
              <div className="flex flex-wrap gap-2">
                {productBadge && (
                  <span className="rounded-full bg-[#FC5689]/10 px-3 py-1 text-xs font-bold text-[#FC5689]">
                    {productBadge}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {numberFormatter.format(discountPercentage)}% {t("productDetails.off")}
                  </span>
                )}
              </div>
            )}

            <h1 className="mt-4 break-words text-2xl font-black leading-tight tracking-tight text-[#062a54] sm:text-3xl">
              {productName}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-[15px] sm:leading-7">
              {productDescription}
            </p>

            <div className="mt-5 flex min-w-0 flex-wrap items-end gap-3">
              <span className="break-words text-2xl font-black text-[#FC5689] sm:text-3xl">
                {priceFormatter.format(product.price)}
              </span>

              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-base font-semibold text-slate-400 line-through sm:text-lg">
                  {priceFormatter.format(product.compareAtPrice)}
                </span>
              )}

              {discountAmount > 0 && (
                <span className="mb-0.5 rounded-full bg-[#fff4f6] px-3 py-1 text-xs font-bold text-[#FC5689]">
                  {priceFormatter.format(discountAmount)} {t("productDetails.save")}
                </span>
              )}
            </div>

            {product.rating !== undefined && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`size-4 ${
                        index < Math.round(product.rating ?? 0)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-100 text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">
                  {product.rating.toFixed(1)} ({numberFormatter.format(product.reviewCount ?? 0)} {t("productDetails.reviews")})
                </span>
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3">
              <InfoField label={t("productDetails.category")} value={productCategory} />
              <InfoField
                label={t("productDetails.availability")}
                value={isAvailable ? t("product.inStock") : t("product.outOfStock")}
                positive={isAvailable}
              />
              <InfoField
                label={t("productDetails.stockCount")}
                value={numberFormatter.format(product.stock)}
              />
              <InfoField
                label={t("productDetails.discount")}
                value={`${numberFormatter.format(discountPercentage)}%`}
              />
            </div>

            <div className="mt-5 grid grid-cols-3 divide-x divide-[#dce3ec] rounded-2xl border border-[#dce3ec] bg-[#fff9fb] py-3">
              <TrustItem icon={ShieldCheck} label={t("productDetails.safe")} />
              <TrustItem icon={Truck} label={t("productDetails.fastDelivery")} />
              <TrustItem icon={RefreshCcw} label={t("productDetails.easyReturn")} />
            </div>

            <div className="mt-5 hidden grid-cols-2 gap-3 xl:grid">
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
          <div className="max-w-full overflow-hidden rounded-2xl border border-[#dce3ec] bg-white p-2 shadow-sm">
            <div className="flex min-w-0 gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap rounded-xl px-3 py-2.5 text-xs font-bold transition sm:px-4 sm:py-3 sm:text-sm ${
                    activeTab === tab.id
                      ? "bg-[#FC5689] text-white shadow-[0_8px_22px_rgba(239,66,119,0.2)]"
                      : "text-slate-500 hover:bg-[#fff4f6] hover:text-[#FC5689]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#dce3ec] bg-white p-5 shadow-[0_12px_36px_rgba(6,42,84,0.06)] sm:p-7">
            <TabContent
              activeTab={activeTab}
              product={product}
              localize={localize}
              t={t}
            />
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="py-3 sm:py-6" aria-labelledby="recommendations-title">
            <h2 id="recommendations-title" className="text-xl font-black text-[#062a54] sm:text-3xl">
              {t("productDetails.youMayAlsoLike")}
            </h2>

            <Swiper
              modules={[Autoplay]}
              slidesPerView={1.5}
              slidesPerGroup={1}
              spaceBetween={14}
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
                640: { slidesPerView: 2.5, spaceBetween: 16 },
                1024: { slidesPerView: 3.5, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="popular-products-swiper mt-5 [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:items-stretch"
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

      <div className="fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-40 border-t border-[#f0d9e1] bg-white/95 px-3 py-2 shadow-[0_-10px_30px_rgba(6,42,84,0.1)] backdrop-blur-xl sm:bottom-[calc(76px+env(safe-area-inset-bottom))] xl:hidden">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 sm:gap-3">
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
    <div className="min-w-0 rounded-xl border border-[#dce3ec] bg-[#fff9fb] p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>
      <p className={`mt-1 break-words text-sm font-bold ${positive ? "text-emerald-600" : "text-[#062a54]"}`}>
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
    <div className="flex flex-col items-center justify-center gap-1 px-2 text-center text-[10px] font-bold text-[#062a54] sm:flex-row sm:text-xs">
      <Icon className="size-5 shrink-0 text-[#FC5689]" />
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
        className={`inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl px-3 text-xs font-black transition sm:h-[52px] sm:gap-2 sm:px-5 sm:text-sm ${
          isAvailable
            ? "bg-[#FC5689] text-white hover:bg-[#e93f75]"
            : "cursor-not-allowed bg-slate-300 text-slate-500"
        }`}
      >
        {cartStatus === "added" ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
        <span className="truncate">{cartLabel}</span>
      </button>

      <button
        type="button"
        disabled={!isAvailable}
        onClick={onBuy}
        className={`inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl border px-3 text-xs font-black transition sm:h-[52px] sm:gap-2 sm:px-5 sm:text-sm ${
          isAvailable
            ? "border-[#FC5689] bg-[#FC5689]/10 text-[#FC5689] hover:bg-[#FC5689] hover:text-white"
            : "cursor-not-allowed border-slate-300 bg-slate-100 text-slate-400"
        }`}
      >
        <Zap className="size-4 fill-current" />
        <span className="truncate">{isAvailable ? buyLabel : outOfStockLabel}</span>
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

  if (activeTab === "included" && details) {
    return (
      <div>
        <TabHeading icon={PackageCheck} title={t("productDetails.boxIncluded")} />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {details.includedItems.map((item, index) => {
            const Icon = includedIcons[index % includedIcons.length];

            return (
              <article
                key={item.id}
                className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-[#f1dfe5] bg-[#fff9fb] p-3 text-center"
              >
                <span className="mb-3 grid size-11 place-items-center rounded-xl bg-white text-[#FC5689] shadow-sm">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-xs font-bold leading-5 text-[#062a54] sm:text-sm">
                  {localize(item.name)}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  if (activeTab === "essential" && details) {
    return (
      <div>
        <TabHeading icon={Sparkles} title={t("productDetails.whyEssential")} />
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {details.whyEssential.map((reason, index) => (
            <li key={index} className="flex gap-3 rounded-2xl border border-[#f1dfe5] bg-[#fff9fb] p-4 text-sm leading-6 text-slate-600">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#FC5689]" />
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
        <TabHeading icon={UsersRound} title={t("productDetails.preferredFor")} />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {details.preferredFor.map((audience, index) => (
            <article key={index} className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-[#dcebf2] bg-[#f4fbff] p-4 text-center text-xs font-bold leading-5 text-[#062a54] sm:text-sm">
              <Baby className="mb-3 size-6 text-[#03A7FD]" />
              {localize(audience)}
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "delivery") {
    return (
      <div>
        <TabHeading icon={Truck} title={t("productDetails.deliverySupport")} />
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
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

  return (
    <div>
      <TabHeading icon={Sparkles} title={t("productDetails.tabDescription")} />
      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-[15px]">
        {localize(product.description)}
      </p>
    </div>
  );
}

type TabHeadingProps = {
  icon: typeof Truck;
  title: string;
};

function TabHeading({ icon: Icon, title }: TabHeadingProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-11 place-items-center rounded-xl bg-[#FC5689]/10 text-[#FC5689]">
        <Icon className="size-5" />
      </span>
      <h2 className="text-xl font-black text-[#062a54] sm:text-2xl">{title}</h2>
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
    <article className="flex items-start gap-4 rounded-2xl border border-[#dce3ec] bg-[#fff9fb] p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-[#FC5689] shadow-sm">
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="text-sm font-black text-[#062a54] sm:text-base">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">{description}</p>
      </div>
    </article>
  );
}
