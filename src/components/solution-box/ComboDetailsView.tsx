"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Baby,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Gift,
  HeartHandshake,
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

import ProductGallery from "@/components/product/ProductGallery";
import ComboIncludedProducts from "@/components/solution-box/ComboIncludedProducts";
import SolutionBoxCard from "@/components/solution-box/SolutionBoxCard";
import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";
import {
  getSolutionBoxItems,
  solutionBoxToProduct,
} from "@/data/solutionBoxes";
import type { SolutionBox } from "@/types/solution-box";

type ComboDetailsViewProps = {
  box: SolutionBox;
  relatedBoxes: SolutionBox[];
};

type CartStatus = "idle" | "added";
type ComboDetailsTab =
  | "overview"
  | "guide"
  | "selection"
  | "reviews"
  | "support";

export default function ComboDetailsView({
  box,
  relatedBoxes,
}: ComboDetailsViewProps) {
  const router = useRouter();
  const { language, localize } = useLanguage();
  const { addToCart } = useShop();
  const [cartStatus, setCartStatus] = useState<CartStatus>("idle");
  const [activeTab, setActiveTab] = useState<ComboDetailsTab>("overview");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const product = useMemo(() => solutionBoxToProduct(box), [box]);
  const includedItems = useMemo(() => getSolutionBoxItems(box), [box]);
  const isAvailable = box.stock > 0;
  const savings = Math.max(0, box.compareAtPrice - box.price);
  const discountPercentage = Math.round((savings / box.compareAtPrice) * 100);

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

  const copy = language === "bn"
    ? {
        home: "হোম",
        solutions: "সল্যুশন বক্স",
        curated: "Maaniko Curated Solution",
        individualPrice: "আলাদা কিনলে",
        comboPrice: "Combo মূল্য",
        save: "আপনার সাশ্রয়",
        available: "অর্ডারের জন্য প্রস্তুত",
        unavailable: "স্টক শেষ",
        products: "টি product একসাথে",
        checked: "Quality checked products",
        delivery: "সারাদেশে ডেলিভারি",
        replacement: "Missing/damaged item support",
        addToCart: "কার্টে যোগ করুন",
        added: "কার্টে যোগ হয়েছে",
        orderNow: "এখনই অর্ডার করুন",
        whyTitle: "কেন এই Boxটি প্রয়োজন",
        preferredTitle: "কার জন্য উপযুক্ত",
        guideTitle: "ব্যবহার ও Journey Guide",
        selectedTitle: "কেন এই Productsগুলো বেছে নিয়েছি",
        packagingTitle: "Maaniko Packaging Experience",
        packagingDescription: "পরিষ্কার, protective এবং gift-ready presentation—যাতে box খোলার মুহূর্তটিও বিশেষ হয়।",
        reviewTitle: "এই Combo নিয়ে মায়েদের অভিজ্ঞতা",
        verified: "Verified purchase",
        deliveryTitle: "Delivery, Support ও Replacement",
        deliveryDescription: "ঢাকার ভিতরে ও বাইরে যত্নসহ delivery। কোনো item missing বা damaged হলে দ্রুত support team-কে জানান। Customer-এর অনুমতি ছাড়া কোনো item substitute করা হবে না।",
        support: "সপ্তাহের ৭ দিন order support",
        noSubstitution: "অনুমতি ছাড়া product substitution নয়",
        damagedSupport: "Missing/damaged item replacement support",
        faqTitle: "সাধারণ প্রশ্ন",
        tabOverview: "কেন এই Box",
        tabGuide: "ব্যবহার গাইড",
        tabSelection: "বাছাই ও প্যাকেজিং",
        tabReviews: "রিভিউ",
        tabSupport: "ডেলিভারি ও FAQ",
        detailsTabs: "Combo-এর বিস্তারিত তথ্য",
        relatedTitle: "এই Journey-এর অন্য Solution",
        itemCount: includedItems.reduce((sum, item) => sum + item.relation.quantity, 0),
      }
    : {
        home: "Home",
        solutions: "Solution boxes",
        curated: "Maaniko Curated Solution",
        individualPrice: "Bought separately",
        comboPrice: "Combo price",
        save: "You save",
        available: "Ready to order",
        unavailable: "Out of stock",
        products: " products together",
        checked: "Quality checked products",
        delivery: "Nationwide delivery",
        replacement: "Missing/damaged item support",
        addToCart: "Add to cart",
        added: "Added to cart",
        orderNow: "Order now",
        whyTitle: "Why this box is useful",
        preferredTitle: "Who it is for",
        guideTitle: "Usage and journey guide",
        selectedTitle: "Why we selected these products",
        packagingTitle: "Maaniko Packaging Experience",
        packagingDescription: "A clean, protective and gift-ready presentation that makes the unboxing moment special.",
        reviewTitle: "Mothers' experience with this combo",
        verified: "Verified purchase",
        deliveryTitle: "Delivery, support and replacement",
        deliveryDescription: "Careful delivery inside and outside Dhaka. Contact support promptly for a missing or damaged item. No item is substituted without the customer's approval.",
        support: "Order support 7 days a week",
        noSubstitution: "No substitution without approval",
        damagedSupport: "Missing/damaged item replacement support",
        faqTitle: "Frequently asked questions",
        tabOverview: "Why this box",
        tabGuide: "Usage guide",
        tabSelection: "Selection & packaging",
        tabReviews: "Reviews",
        tabSupport: "Delivery & FAQ",
        detailsTabs: "Detailed combo information",
        relatedTitle: "Other solutions for this journey",
        itemCount: includedItems.reduce((sum, item) => sum + item.relation.quantity, 0),
      };

  const tabs: { id: ComboDetailsTab; label: string }[] = [
    { id: "overview", label: copy.tabOverview },
    { id: "guide", label: copy.tabGuide },
    { id: "selection", label: copy.tabSelection },
    { id: "reviews", label: copy.tabReviews },
    { id: "support", label: copy.tabSupport },
  ];

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

  return (
    <main className="min-h-screen bg-[#fff9fb] pb-36 pt-2 text-[#062a54] md:pb-40 md:pt-5 xl:pb-12">
      <div className="mx-auto w-full max-w-7xl space-y-3 overflow-x-hidden px-4 md:space-y-5 lg:px-8">
        <nav className="rounded-xl border border-[#dce3ec] bg-white px-3 py-2 text-[11px] text-slate-500 shadow-sm md:rounded-2xl md:px-4 md:py-3 md:text-sm">
          <div className="flex min-w-0 items-center gap-1.5 overflow-hidden md:gap-2">
            <Link href="/" className="shrink-0 transition hover:text-[#FC5689]">
              {copy.home}
            </Link>
            <ChevronRight className="size-3 shrink-0 text-slate-300" />
            <Link href="/solution-box" className="shrink-0 transition hover:text-[#FC5689]">
              {copy.solutions}
            </Link>
            <ChevronRight className="size-3 shrink-0 text-slate-300" />
            <span className="truncate font-bold text-[#FC5689]">
              {localize(box.name)}
            </span>
          </div>
        </nav>

        <section className="grid min-w-0 items-start gap-3 md:gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <ProductGallery product={product} />

          <div className="flex h-full min-w-0 flex-col rounded-2xl border border-[#dce3ec] bg-white p-3 shadow-[0_12px_36px_rgba(6,42,84,0.06)] md:p-5 lg:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#FC5689]/10 px-3 py-1 text-[10px] font-black text-[#FC5689] md:text-xs">
                {copy.curated}
              </span>
              <span className="rounded-full bg-[#03A7FD]/10 px-3 py-1 text-[10px] font-black text-[#037fbe] md:text-xs">
                {localize(box.journeyStage)}
              </span>
            </div>

            <h1 className="mt-3 text-xl font-black leading-tight tracking-tight md:mt-4 md:text-3xl lg:text-[34px]">
              {localize(box.name)}
            </h1>
            <p className="mt-2 text-xs font-bold leading-5 text-[#FC5689] md:text-sm">
              {localize(box.subtitle)}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500 md:text-[15px] md:leading-7">
              {localize(box.description)}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 md:mt-4 md:text-sm">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`size-3.5 md:size-4 ${index < Math.round(box.rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                  />
                ))}
              </div>
              <strong className="text-[#062a54]">{box.rating.toFixed(1)}</strong>
              <span>({numberFormatter.format(box.reviewCount)})</span>
              <span className="text-slate-300">•</span>
              <span className="font-bold text-[#03A7FD]">
                {numberFormatter.format(copy.itemCount)}{copy.products}
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-[#f3d9e2] bg-[#fff9fb] p-3 md:mt-5 md:p-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 md:text-xs">
                    {copy.comboPrice}
                  </p>
                  <p className="mt-0.5 text-2xl font-black text-[#FC5689] md:text-3xl">
                    {priceFormatter.format(box.price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 md:text-xs">
                    {copy.individualPrice}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-slate-400 line-through md:text-base">
                    {priceFormatter.format(box.compareAtPrice)}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#f0d9e1] pt-3">
                <span className="text-xs font-black text-[#062a54] md:text-sm">
                  {copy.save}: {priceFormatter.format(savings)}
                </span>
                <span className="rounded-full bg-[#FC5689] px-2.5 py-1 text-[10px] font-black text-white md:text-xs">
                  {numberFormatter.format(discountPercentage)}% OFF
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs font-bold md:mt-4 md:text-sm">
              <CheckCircle2 className={`size-4 ${isAvailable ? "text-emerald-500" : "text-slate-400"}`} />
              <span className={isAvailable ? "text-emerald-600" : "text-slate-400"}>
                {isAvailable ? copy.available : copy.unavailable}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 divide-x divide-[#dce3ec] rounded-xl border border-[#dce3ec] bg-[#fff9fb] py-2 md:mt-4 md:py-3 lg:mt-auto">
              <TrustItem icon={ShieldCheck} label={copy.checked} />
              <TrustItem icon={Truck} label={copy.delivery} />
              <TrustItem icon={RefreshCcw} label={copy.replacement} />
            </div>

            <button
              type="button"
              disabled={!isAvailable}
              onClick={handleAddToCart}
              className={`mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border text-sm font-black transition xl:hidden ${isAvailable ? cartStatus === "added" ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-[#FC5689] bg-[#fff4f6] text-[#FC5689]" : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"}`}
            >
              {cartStatus === "added" ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
              {cartStatus === "added" ? copy.added : copy.addToCart}
            </button>

            <div className="mt-5 hidden grid-cols-2 gap-3 xl:grid">
              <button
                type="button"
                disabled={!isAvailable}
                onClick={handleAddToCart}
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-[#FC5689] px-5 text-sm font-black text-white transition hover:bg-[#e93f75] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {cartStatus === "added" ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
                {cartStatus === "added" ? copy.added : copy.addToCart}
              </button>
              <button
                type="button"
                disabled={!isAvailable}
                onClick={handleBuyNow}
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-[#FC5689] bg-[#FC5689]/10 px-5 text-sm font-black text-[#FC5689] transition hover:bg-[#FC5689] hover:text-white disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-400"
              >
                <Zap className="size-4 fill-current" />
                {copy.orderNow}
              </button>
            </div>
          </div>
        </section>

        <ComboIncludedProducts items={includedItems} />

        <section aria-label={copy.detailsTabs}>
          <div className="max-w-full overflow-hidden rounded-xl border border-[#dce3ec] bg-white p-1.5 shadow-sm md:rounded-2xl md:p-2">
            <div
              role="tablist"
              aria-label={copy.detailsTabs}
              className="flex min-w-0 gap-1.5 overflow-x-auto md:gap-2"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  id={`combo-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`combo-panel-${tab.id}`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition md:rounded-xl md:px-4 md:py-3 md:text-sm lg:flex-1 lg:text-center ${
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

          <div
            id={`combo-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`combo-tab-${activeTab}`}
            className="mt-3 rounded-[22px] border border-[#dce3ec] bg-white p-3 shadow-[0_12px_36px_rgba(6,42,84,0.055)] md:mt-5 md:rounded-[26px] md:p-5 lg:p-6"
          >
            {activeTab === "overview" && (
              <div className="grid gap-3 md:gap-5 lg:grid-cols-2">
                <InfoSection
                  icon={Sparkles}
                  title={copy.whyTitle}
                  items={box.whyThisBox}
                  nested
                />
                <AudienceSection
                  title={copy.preferredTitle}
                  items={box.preferredFor}
                  nested
                />
              </div>
            )}

            {activeTab === "guide" && (
              <div>
                <SectionTitle icon={BookOpenCheck} title={copy.guideTitle} />
                <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-3">
                  {box.usageGuide.map((step, index) => (
                    <article
                      key={step.id}
                      className="relative rounded-2xl border border-[#dce3ec] bg-[#fff9fb] p-4 md:p-5"
                    >
                      <span className="grid size-8 place-items-center rounded-full bg-[#FC5689] text-xs font-black text-white">
                        {numberFormatter.format(index + 1)}
                      </span>
                      <h3 className="mt-3 text-sm font-black md:text-base">
                        {localize(step.title)}
                      </h3>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500 md:text-sm md:leading-6">
                        {localize(step.description)}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "selection" && (
              <div className="grid gap-3 md:gap-5 lg:grid-cols-[1.05fr_.95fr]">
                <InfoSection
                  icon={HeartHandshake}
                  title={copy.selectedTitle}
                  items={box.selectionReasons}
                  nested
                />
                <section className="rounded-2xl border border-[#f1d9e1] bg-gradient-to-br from-[#fff4f6] to-[#f7fbff] p-4 md:p-6">
                  <SectionTitle icon={Gift} title={copy.packagingTitle} />
                  <p className="mt-3 text-xs leading-5 text-slate-500 md:text-sm md:leading-6">
                    {copy.packagingDescription}
                  </p>
                  <ul className="mt-4 grid gap-2">
                    {box.packaging.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-xs font-semibold text-[#062a54] md:text-sm"
                      >
                        <PackageCheck className="mt-0.5 size-4 shrink-0 text-[#FC5689]" />
                        {localize(item)}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <SectionTitle icon={UsersRound} title={copy.reviewTitle} />
                <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-2">
                  {box.reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-2xl border border-[#dce3ec] bg-[#fff9fb] p-4 md:p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-black">
                            {review.customerName}
                          </h3>
                          <p className="mt-0.5 text-[10px] font-bold text-emerald-600 md:text-xs">
                            {copy.verified}
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from(
                            { length: review.rating },
                            (_, index) => (
                              <Star
                                key={index}
                                className="size-3.5 fill-amber-400 text-amber-400"
                              />
                            ),
                          )}
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-5 text-slate-600 md:text-sm md:leading-6">
                        {localize(review.review)}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "support" && (
              <div className="grid gap-3 md:gap-5 lg:grid-cols-2">
                <section className="rounded-2xl border border-[#dce3ec] bg-[#fff9fb] p-4 md:p-6">
                  <SectionTitle icon={Truck} title={copy.deliveryTitle} />
                  <p className="mt-3 text-xs leading-5 text-slate-500 md:text-sm md:leading-6">
                    {copy.deliveryDescription}
                  </p>
                  <ul className="mt-4 grid gap-2.5">
                    {[
                      copy.support,
                      copy.noSubstitution,
                      copy.damagedSupport,
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-bold md:text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-[#dce3ec] bg-[#fff9fb] p-4 md:p-6">
                  <SectionTitle icon={Headphones} title={copy.faqTitle} />
                  <div className="mt-4 space-y-2">
                    {box.faqs.map((faq) => (
                      <details
                        key={faq.id}
                        className="group rounded-xl border border-[#dce3ec] bg-white open:border-[#FC5689]/30"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 text-xs font-black md:px-4 md:text-sm">
                          {localize(faq.question)}
                          <ChevronDown className="size-4 shrink-0 text-[#FC5689] transition group-open:rotate-180" />
                        </summary>
                        <p className="border-t border-[#dce3ec] px-3 py-3 text-xs leading-5 text-slate-500 md:px-4 md:text-sm md:leading-6">
                          {localize(faq.answer)}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </section>

        {relatedBoxes.length > 0 && (
          <section className="py-2 md:py-5" aria-labelledby="related-combos-title">
            <h2 id="related-combos-title" className="text-lg font-black md:text-3xl">{copy.relatedTitle}</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 md:mt-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
              {relatedBoxes.slice(0, 4).map((relatedBox) => (
                <SolutionBoxCard key={relatedBox.id} box={relatedBox} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-40 border-t border-[#f0d9e1] bg-white/95 px-2 py-1.5 shadow-[0_-8px_24px_rgba(6,42,84,0.09)] backdrop-blur-xl md:bottom-[calc(76px+env(safe-area-inset-bottom))] md:px-3 xl:hidden">
        <button
          type="button"
          disabled={!isAvailable}
          onClick={handleBuyNow}
          className="mx-auto inline-flex h-10 w-full max-w-5xl items-center justify-center gap-1.5 rounded-lg bg-[#FC5689] px-3 text-xs font-black text-white shadow-[0_6px_16px_rgba(252,86,137,0.22)] transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          <Zap className="size-3.5 fill-current" />
          {isAvailable ? `${copy.orderNow} • ${priceFormatter.format(box.price)}` : copy.unavailable}
        </button>
      </div>
    </main>
  );
}

function TrustItem({ icon: Icon, label }: { icon: typeof Truck; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-1 text-center text-[9px] font-bold leading-3 md:flex-row md:px-2 md:text-xs md:leading-4">
      <Icon className="size-4 shrink-0 text-[#FC5689] md:size-5" />
      <span>{label}</span>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: typeof Sparkles; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#FC5689]/10 text-[#FC5689] md:size-11">
        <Icon className="size-4 md:size-5" />
      </span>
      <h2 className="text-base font-black md:text-2xl">{title}</h2>
    </div>
  );
}

function InfoSection({
  icon,
  title,
  items,
  nested = false,
}: {
  icon: typeof Sparkles;
  title: string;
  items: SolutionBox["whyThisBox"];
  nested?: boolean;
}) {
  const { localize } = useLanguage();
  return (
    <section
      className={
        nested
          ? "rounded-2xl border border-[#dce3ec] bg-[#fff9fb] p-4 md:p-6"
          : "rounded-[22px] border border-[#dce3ec] bg-white p-4 shadow-[0_12px_36px_rgba(6,42,84,0.055)] md:rounded-[26px] md:p-7"
      }
    >
      <SectionTitle icon={icon} title={title} />
      <ul className="mt-4 grid gap-2.5 md:mt-5">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2.5 rounded-xl border border-[#f1dfe5] bg-[#fff9fb] p-3 text-xs leading-5 text-slate-600 md:text-sm md:leading-6">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FC5689]" />
            {localize(item)}
          </li>
        ))}
      </ul>
    </section>
  );
}

function AudienceSection({
  title,
  items,
  nested = false,
}: {
  title: string;
  items: SolutionBox["preferredFor"];
  nested?: boolean;
}) {
  const { localize } = useLanguage();
  return (
    <section
      className={
        nested
          ? "rounded-2xl border border-[#dce3ec] bg-[#fff9fb] p-4 md:p-6"
          : "rounded-[22px] border border-[#dce3ec] bg-white p-4 shadow-[0_12px_36px_rgba(6,42,84,0.055)] md:rounded-[26px] md:p-7"
      }
    >
      <SectionTitle icon={UsersRound} title={title} />
      <div className="mt-4 grid grid-cols-2 gap-2.5 md:mt-5">
        {items.map((item, index) => (
          <article key={index} className="flex min-h-24 flex-col items-center justify-center rounded-xl border border-[#dcebf2] bg-[#f4fbff] p-3 text-center text-[11px] font-bold leading-4 md:min-h-28 md:text-sm md:leading-5">
            <Baby className="mb-2 size-5 text-[#03A7FD]" />
            {localize(item)}
          </article>
        ))}
      </div>
    </section>
  );
}
