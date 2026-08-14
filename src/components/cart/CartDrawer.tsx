"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";

export default function CartDrawer() {
  const { language, localize, t } = useLanguage();
  const {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateCartQuantity,
  } = useShop();

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

  useEffect(() => {
    if (!isCartOpen) return;

    const previousOverflow = document.body.style.overflow;
    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [closeCart, isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label={t("cart.close")}
            onClick={closeCart}
            className="absolute inset-0 h-full w-full bg-[#062a54]/35 backdrop-blur-[2px]"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={t("cart.title")}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 38 }}
            className="absolute right-0 top-0 flex h-full w-[min(92vw,440px)] flex-col bg-white shadow-[-18px_0_55px_rgba(6,42,84,0.2)]"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#dce3ec] px-5">
              <div>
                <h2 className="text-lg font-black text-[#062a54]">
                  {t("cart.title")}
                </h2>
                <p className="text-xs text-slate-500">
                  {t("cart.itemCount", { count: cartCount })}
                </p>
              </div>

              <button
                type="button"
                aria-label={t("cart.close")}
                onClick={closeCart}
                className="inline-flex size-10 items-center justify-center rounded-full text-[#062a54] transition-colors hover:bg-[#fff4f6] hover:text-[#FF7897]"
              >
                <X className="size-5" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-7 text-center">
                <span className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-[#fff4f6] text-[#FF7897]">
                  <ShoppingBag className="size-7" />
                </span>
                <h3 className="text-lg font-black text-[#062a54]">
                  {t("cart.emptyTitle")}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  {t("cart.emptyDescription")}
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-6 rounded-xl bg-[#FF7897] px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#10a9e8]"
                >
                  {t("actions.continueShopping")}
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
                  {cartItems.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-3 rounded-2xl border border-[#dce3ec] p-3"
                    >
                      <Link
                        href={product.href ?? `/products/${product.slug}`}
                        onClick={closeCart}
                        className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#fff4f6]"
                      >
                        <img
                          src={product.images[0] ?? ""}
                          alt={localize(product.name)}
                          className="h-full w-full object-cover"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-2">
                          <Link
                            href={product.href ?? `/products/${product.slug}`}
                            onClick={closeCart}
                            className="line-clamp-2 flex-1 text-sm font-bold leading-5 text-[#062a54] hover:text-[#FF7897]"
                          >
                            {localize(product.name)}
                          </Link>
                          <button
                            type="button"
                            aria-label={t("cart.remove")}
                            onClick={() => removeFromCart(product.id)}
                            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-[#fff4f6] hover:text-[#FF7897]"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        <p className="mt-1 text-sm font-black text-[#FF7897]">
                          {priceFormatter.format(product.price * quantity)}
                        </p>

                        <div className="mt-2 inline-flex h-9 items-center rounded-lg border border-[#dce3ec]">
                          <button
                            type="button"
                            aria-label={t("cart.decrease")}
                            onClick={() =>
                              updateCartQuantity(product.id, quantity - 1)
                            }
                            className="inline-flex h-full w-9 items-center justify-center text-[#062a54] hover:text-[#FF7897]"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-xs font-extrabold text-[#062a54]">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={t("cart.increase")}
                            disabled={quantity >= product.stock}
                            onClick={() =>
                              updateCartQuantity(product.id, quantity + 1)
                            }
                            className="inline-flex h-full w-9 items-center justify-center text-[#062a54] hover:text-[#FF7897] disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="shrink-0 border-t border-[#dce3ec] bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500">
                      {t("cart.total")}
                    </span>
                    <span className="text-xl font-black text-[#062a54]">
                      {priceFormatter.format(cartTotal)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-[#FF7897] text-sm font-extrabold text-white transition-colors hover:bg-[#10a9e8]"
                  >
                    {t("cart.checkout")}
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
