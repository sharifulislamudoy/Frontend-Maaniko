"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";

export default function WishlistPage() {
  const { t } = useLanguage();
  const { wishlistItems, isHydrated } = useShop();

  return (
    <div className="flex-1 bg-white py-10 sm:py-14">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef4277]">
            {t("wishlist.eyebrow")}
          </p>
          <h1 className="text-2xl font-black tracking-tight text-[#062a54] sm:text-3xl">
            {t("wishlist.title")}
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            {t("wishlist.subtitle")}
          </p>
        </div>

        {!isHydrated ? (
          <div className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[380px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#dce3ec] bg-[#fffafb] px-6 text-center">
            <span className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-[#fff4f6] text-[#ef4277]">
              <Heart className="size-7" />
            </span>
            <h2 className="text-xl font-black text-[#062a54]">
              {t("wishlist.emptyTitle")}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {t("wishlist.emptyDescription")}
            </p>
            <Link
              href="/shop"
              className="mt-6 rounded-xl bg-[#ef4277] px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#10a9e8]"
            >
              {t("actions.continueShopping")}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
