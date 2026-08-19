"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Baby,
  Check,
  CheckCircle2,
  ChevronLeft,
  Headphones,
  Minus,
  PackageCheck,
  Plus,
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

type CartStatus = "idle" | "added";

const includedIcons = [PackageCheck, Sparkles, ShieldCheck, Baby];

export default function ProductDetailsView({
  product,
  relatedProducts,
}: ProductDetailsViewProps) {
  const router = useRouter();
  const { language, localize, t } = useLanguage();
  const { addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [cartStatus, setCartStatus] = useState<CartStatus>("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productName = localize(product.name);
  const productDescription = localize(product.description);
  const productCategory = localize(product.category);
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

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  function handleAddToCart() {
    if (!isAvailable) return;

    addToCart(product, quantity);
    setCartStatus("added");

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setCartStatus("idle"), 1600);
  }

  function handleBuyNow() {
    if (!isAvailable) return;

    router.push(
      `/checkout?mode=buy-now&productId=${encodeURIComponent(product.id)}&quantity=${quantity}`,
    );
  }

  const actionButtonLabel = isAvailable
    ? cartStatus === "added"
      ? t("actions.addedToCart")
      : t("actions.addToCart")
    : t("product.outOfStock");

  return (
    <div className="bg-white pb-24 xl:pb-0">
      <section className="bg-gradient-to-b from-[#fff9fb] to-white py-4 sm:py-7 lg:py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label={t("productDetails.breadcrumb")}
            className="mb-4 flex min-w-0 items-center gap-2 text-xs font-semibold text-slate-500 sm:mb-6 sm:text-sm"
          >
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-1 transition-colors hover:text-[#FC5689]"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              {t("nav.home")}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="truncate text-[#062a54]">{productName}</span>
          </nav>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)] xl:gap-12">
            <ProductGallery product={product} />

            <div className="min-w-0 xl:sticky xl:top-[132px]">
              <div className="flex items-center justify-between gap-4">
                <p
                  className={`text-[11px] font-extrabold uppercase text-[#03A7FD] ${
                    language === "en"
                      ? "tracking-[0.16em]"
                      : "tracking-normal"
                  }`}
                >
                  {productCategory}
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                    isAvailable
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {isAvailable ? t("product.inStock") : t("product.outOfStock")}
                </span>
              </div>

              <h1 className="mt-3 text-[26px] font-black leading-tight tracking-tight text-[#062a54] sm:text-3xl lg:text-4xl">
                {productName}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
                {productDescription}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-b border-[#dce3ec] pb-5">
                {product.rating !== undefined && (
                  <span className="inline-flex items-center gap-1.5 font-black text-[#062a54]">
                    <Star className="size-5 fill-amber-400 text-amber-400" />
                    {product.rating.toFixed(1)}
                  </span>
                )}

                <span className="h-4 w-px bg-[#dce3ec]" aria-hidden="true" />

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("product-recommendations")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="font-bold text-[#03A7FD] transition-colors hover:text-[#FC5689]"
                >
                  {numberFormatter.format(product.reviewCount ?? 0)} {t("productDetails.reviews")}
                </button>

                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#fff4f6] px-3 py-1.5 text-[11px] font-extrabold text-[#FC5689]">
                  <ShieldCheck className="size-4" />
                  {t("productDetails.trustedChoice")}
                </span>
              </div>

              <div className="py-5">
                <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
                  <span className="text-3xl font-black leading-none text-[#FC5689] sm:text-4xl">
                    {priceFormatter.format(product.price)}
                  </span>

                  {product.compareAtPrice &&
                    product.compareAtPrice > product.price && (
                      <span className="text-sm font-semibold text-slate-400 line-through sm:text-base">
                        {t("productDetails.mrp")} {priceFormatter.format(product.compareAtPrice)}
                      </span>
                    )}

                  {discountAmount > 0 && (
                    <span className="rounded-full bg-[#FC5689]/10 px-3 py-1.5 text-xs font-extrabold text-[#FC5689]">
                      {priceFormatter.format(discountAmount)} {t("productDetails.save")}
                    </span>
                  )}
                </div>

                {discountPercentage > 0 && (
                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    {numberFormatter.format(discountPercentage)}% {t("productDetails.discountApplied")}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 divide-x divide-[#dce3ec] rounded-2xl border border-[#dce3ec] bg-white py-3 shadow-sm">
                <div className="flex flex-col items-center gap-1 px-2 text-center text-[10px] font-bold text-[#062a54] sm:flex-row sm:justify-center sm:text-xs">
                  <ShieldCheck className="size-5 shrink-0 text-[#03A7FD]" />
                  {t("productDetails.safe")}
                </div>
                <div className="flex flex-col items-center gap-1 px-2 text-center text-[10px] font-bold text-[#062a54] sm:flex-row sm:justify-center sm:text-xs">
                  <Truck className="size-5 shrink-0 text-emerald-500" />
                  {t("productDetails.fastDelivery")}
                </div>
                <div className="flex flex-col items-center gap-1 px-2 text-center text-[10px] font-bold text-[#062a54] sm:flex-row sm:justify-center sm:text-xs">
                  <RefreshCcw className="size-5 shrink-0 text-[#FC5689]" />
                  {t("productDetails.easyReturn")}
                </div>
              </div>

              <div className="mt-5 hidden items-center gap-3 xl:flex">
                <span className="text-sm font-extrabold text-[#062a54]">
                  {t("productDetails.quantity")}
                </span>
                <div className="flex h-12 items-center rounded-xl border border-[#dce3ec] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    disabled={quantity <= 1}
                    aria-label={t("cart.decrease")}
                    className="grid size-11 place-items-center text-[#062a54] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-black text-[#062a54]">
                    {numberFormatter.format(quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => Math.min(product.stock, current + 1))
                    }
                    disabled={!isAvailable || quantity >= product.stock}
                    aria-label={t("cart.increase")}
                    className="grid size-11 place-items-center text-[#062a54] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 hidden grid-cols-2 gap-3 xl:grid">
                <button
                  type="button"
                  disabled={!isAvailable}
                  onClick={handleAddToCart}
                  className={`flex h-14 items-center justify-center gap-2 rounded-2xl border-2 text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 ${
                    isAvailable
                      ? "border-[#FC5689] bg-white text-[#FC5689] hover:bg-[#fff4f6]"
                      : "cursor-not-allowed border-slate-300 bg-slate-100 text-slate-400"
                  }`}
                >
                  {cartStatus === "added" ? (
                    <Check className="size-5" />
                  ) : (
                    <ShoppingCart className="size-5" />
                  )}
                  {actionButtonLabel}
                </button>

                <button
                  type="button"
                  disabled={!isAvailable}
                  onClick={handleBuyNow}
                  className={`flex h-14 items-center justify-center gap-2 rounded-2xl text-sm font-black text-white shadow-[0_14px_34px_rgba(239,66,119,0.24)] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 ${
                    isAvailable
                      ? "bg-[#FC5689] hover:-translate-y-0.5 hover:bg-[#03A7FD]"
                      : "cursor-not-allowed bg-slate-400"
                  }`}
                >
                  <Zap className="size-5 fill-current" />
                  {isAvailable ? t("productDetails.buyNow") : t("product.outOfStock")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {details && details.includedItems.length > 0 && (
        <section className="py-5 sm:py-8" aria-labelledby="box-included-title">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[26px] border border-[#f1dfe5] bg-[#fff9fb] p-4 shadow-[0_14px_45px_rgba(6,42,84,0.06)] sm:p-6 lg:p-8">
              <h2 id="box-included-title" className="text-xl font-black text-[#062a54] sm:text-2xl">
                {t("productDetails.boxIncluded")}
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
                {details.includedItems.map((item, index) => {
                  const Icon = includedIcons[index % includedIcons.length];

                  return (
                    <article
                      key={item.id}
                      className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-[#f3e2e8] bg-white p-3 text-center shadow-[0_8px_26px_rgba(6,42,84,0.05)] sm:min-h-36"
                    >
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt=""
                          className="mb-3 size-14 rounded-xl object-cover"
                        />
                      ) : (
                        <span className="mb-3 grid size-12 place-items-center rounded-2xl bg-[#fff4f6] text-[#FC5689]">
                          <Icon className="size-6" aria-hidden="true" />
                        </span>
                      )}
                      <h3 className="text-xs font-bold leading-5 text-[#062a54] sm:text-sm">
                        {localize(item.name)}
                      </h3>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {details && (
        <section className="py-5 sm:py-8">
          <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:gap-7 lg:px-8">
            <article className="rounded-[26px] border border-[#f0dfe5] bg-gradient-to-br from-[#fff4f6] to-white p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-[#FC5689] text-white">
                  <Sparkles className="size-5" />
                </span>
                <h2 className="text-xl font-black text-[#062a54] sm:text-2xl">
                  {t("productDetails.whyEssential")}
                </h2>
              </div>

              <ul className="mt-5 space-y-3">
                {details.whyEssential.map((reason, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#FC5689]" />
                    <span>{localize(reason)}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[26px] border border-[#dcebf2] bg-gradient-to-br from-[#f4fbff] to-white p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-[#03A7FD] text-white">
                  <UsersRound className="size-5" />
                </span>
                <h2 className="text-xl font-black text-[#062a54] sm:text-2xl">
                  {t("productDetails.preferredFor")}
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {details.preferredFor.map((audience, index) => (
                  <div
                    key={index}
                    className="flex min-h-20 flex-col items-center justify-center rounded-2xl border border-[#dcebf2] bg-white p-3 text-center text-xs font-bold leading-5 text-[#062a54] sm:text-sm"
                  >
                    <Baby className="mb-2 size-5 text-[#03A7FD]" />
                    {localize(audience)}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="py-5 sm:py-8" aria-labelledby="delivery-support-title">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[26px] border border-[#dce3ec] bg-white p-5 shadow-[0_14px_45px_rgba(6,42,84,0.06)] sm:p-7">
            <h2 id="delivery-support-title" className="text-xl font-black text-[#062a54] sm:text-2xl">
              {t("productDetails.deliverySupport")}
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <SupportCard
                icon={Truck}
                iconClass="bg-rose-50 text-[#FC5689]"
                title={t("productDetails.deliveryTitle")}
                description={t("productDetails.deliveryDescription")}
              />
              <SupportCard
                icon={Headphones}
                iconClass="bg-sky-50 text-[#03A7FD]"
                title={t("productDetails.supportTitle")}
                description={t("productDetails.supportDescription")}
              />
              <SupportCard
                icon={PackageCheck}
                iconClass="bg-violet-50 text-violet-600"
                title={t("productDetails.packagingTitle")}
                description={t("productDetails.packagingDescription")}
              />
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section
          id="product-recommendations"
          className="scroll-mt-36 bg-[#fff9fb] py-8 sm:py-11"
          aria-labelledby="recommendations-title"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-40 border-t border-[#f0d9e1] bg-white/97 px-3 py-2 shadow-[0_-10px_30px_rgba(6,42,84,0.1)] backdrop-blur-xl sm:bottom-[calc(76px+env(safe-area-inset-bottom))] xl:hidden">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 sm:gap-3">
          <button
            type="button"
            disabled={!isAvailable}
            onClick={handleAddToCart}
            className={`flex h-12 items-center justify-center gap-2 rounded-xl border-2 text-xs font-black transition-colors sm:h-[52px] sm:text-sm ${
              isAvailable
                ? "border-[#FC5689] bg-white text-[#FC5689]"
                : "cursor-not-allowed border-slate-300 bg-slate-100 text-slate-400"
            }`}
          >
            {cartStatus === "added" ? (
              <Check className="size-4" />
            ) : (
              <ShoppingCart className="size-4" />
            )}
            <span className="truncate">{actionButtonLabel}</span>
          </button>

          <button
            type="button"
            disabled={!isAvailable}
            onClick={handleBuyNow}
            className={`flex h-12 items-center justify-center gap-2 rounded-xl text-xs font-black text-white shadow-[0_10px_24px_rgba(239,66,119,0.22)] sm:h-[52px] sm:text-sm ${
              isAvailable ? "bg-[#FC5689]" : "cursor-not-allowed bg-slate-400"
            }`}
          >
            <Zap className="size-4 fill-current" />
            <span className="truncate">
              {isAvailable ? t("productDetails.buyNow") : t("product.outOfStock")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

type SupportCardProps = {
  icon: typeof Truck;
  iconClass: string;
  title: string;
  description: string;
};

function SupportCard({
  icon: Icon,
  iconClass,
  title,
  description,
}: SupportCardProps) {
  return (
    <article className="flex items-start gap-4 rounded-2xl border border-[#dce3ec] bg-white p-4">
      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${iconClass}`}>
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-sm font-black text-[#062a54] sm:text-base">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">{description}</p>
      </div>
    </article>
  );
}
