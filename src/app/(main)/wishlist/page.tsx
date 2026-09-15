"use client";

import Link from "next/link";
import { Heart, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import ProductCard from "@/modules/products/components/ProductCard";
import ProductCardSkeleton from "@/modules/products/components/ProductCardSkeleton";
import { useShop } from "@/modules/shop/context/ShopContext";
import ContactCaptureModal from "@/modules/commerce/components/ContactCaptureModal";

export default function WishlistPage() {
  const { wishlistItems, isHydrated } = useShop();
  const [saveOpen, setSaveOpen] = useState(false);

  return (
    <>
      <div className="flex-1 bg-white py-10 sm:py-14">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#FC5689]">
                Saved for later
              </p>
              <h1 className="text-[22px] font-black tracking-tight text-[#062a54] sm:text-3xl">
                আপনার Wishlist
              </h1>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                পছন্দের পণ্যগুলো এক জায়গায় রাখুন।
              </p>
            </div>

            {wishlistItems.length ? (
              <button
                type="button"
                onClick={() => setSaveOpen(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#03A7FD] bg-[#03A7FD]/5 px-4 text-xs font-black text-[#0278ad]"
              >
                <Save className="size-4" />
                অন্য device-এর জন্য Wishlist সেভ করুন
              </button>
            ) : null}
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
              <span className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-[#fff4f6] text-[#FC5689]">
                <Heart className="size-7" />
              </span>
              <h2 className="text-lg font-black text-[#062a54]">
                Wishlist এখনো খালি
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                পছন্দের পণ্যের heart icon-এ চাপ দিলে এখানে পাওয়া যাবে।
              </p>
              <Link
                href="/shop"
                className="mt-6 rounded-xl bg-[#FC5689] px-6 py-3 text-sm font-extrabold text-white"
              >
                পণ্য দেখুন
              </Link>
            </div>
          )}
        </section>
      </div>

      <ContactCaptureModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        mode="wishlist"
        title="Wishlist সেভ করুন"
        description="নাম ও ফোন নম্বর দিলে একই তথ্য ব্যবহার করে অন্য device-এ আপনার Wishlist, cart ও order history ফিরিয়ে আনতে পারবেন।"
        onSuccess={(result) => {
          if (result.accountUrl) {
            void navigator.clipboard?.writeText(result.accountUrl);
          }
          toast.success("Wishlist আপনার Maaniko profile-এ সেভ হয়েছে");
        }}
      />
    </>
  );
}
