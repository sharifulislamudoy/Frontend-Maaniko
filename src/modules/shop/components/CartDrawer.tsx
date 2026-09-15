"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Copy,
  Minus,
  Plus,
  Save,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

import ContactCaptureModal from "@/modules/commerce/components/ContactCaptureModal";
import { useShop } from "@/modules/shop/context/ShopContext";

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export default function CartDrawer() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateCartQuantity,
  } = useShop();

  const [saveOpen, setSaveOpen] = useState(false);
  const [recoveryUrl, setRecoveryUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const money = useMemo(
    () =>
      new Intl.NumberFormat("bn-BD", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [],
  );

  useEffect(() => {
    if (!isCartOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [closeCart, isCartOpen]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopyRecoveryLink() {
    if (!recoveryUrl) return;

    try {
      await copyText(recoveryUrl);
      setCopied(true);
      toast.success("Recovery link কপি হয়েছে");
    } catch {
      toast.error("Link কপি করা যায়নি");
    }
  }

  return (
    <>
      <AnimatePresence>
        {isCartOpen ? (
          <motion.div
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-[#062a54]/35 backdrop-blur-[2px]"
              onClick={closeCart}
              aria-label="কার্ট বন্ধ করুন"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 38 }}
              className="absolute right-0 top-0 flex h-full w-[min(92vw,440px)] flex-col bg-white shadow-[-18px_0_55px_rgba(6,42,84,.2)]"
            >
              <div className="flex h-[70px] items-center justify-between border-b border-[#eef1f5] px-5">
                <div>
                  <h2 className="text-lg font-black text-[#062a54]">
                    আপনার কার্ট
                  </h2>
                  <p className="text-xs text-slate-500">{cartCount} টি পণ্য</p>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
                  className="grid size-9 place-items-center rounded-full bg-slate-100 text-[#062a54] transition hover:bg-slate-200"
                  aria-label="কার্ট বন্ধ করুন"
                >
                  <X className="size-4" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                  <ShoppingBag className="size-10 text-[#FC5689]" />
                  <h3 className="mt-4 font-black text-[#062a54]">
                    আপনার কার্ট খালি
                  </h3>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-5 rounded-xl bg-[#FC5689] px-5 py-3 text-sm font-black text-white"
                  >
                    পণ্য দেখুন
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.clientKey}
                        className="rounded-2xl bg-[#fbfcfe] p-3 ring-1 ring-[#edf1f5]"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.product.images?.[0] ?? ""}
                            alt=""
                            className="h-20 w-16 rounded-xl object-cover"
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="line-clamp-2 text-sm font-black text-[#062a54]">
                                  {item.product.name}
                                </p>

                                {item.isCustomized ? (
                                  <span className="mt-1 inline-flex rounded-full bg-[#03A7FD]/10 px-2 py-0.5 text-[10px] font-bold text-[#0278ad]">
                                    Customized Box
                                  </span>
                                ) : null}
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.product.id)}
                                className="grid size-8 place-items-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                aria-label="কার্ট থেকে সরান"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>

                            <p className="mt-1 text-sm font-black text-[#FC5689]">
                              {money.format(item.product.price * item.quantity)}
                            </p>

                            <div className="mt-2 inline-flex h-9 items-center rounded-lg bg-white shadow-[inset_0_0_0_1px_#e8edf3]">
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                  )
                                }
                                className="grid h-full w-9 place-items-center rounded-l-lg transition hover:bg-slate-50"
                                aria-label="Quantity কমান"
                              >
                                <Minus className="size-3.5" />
                              </button>

                              <span className="min-w-8 text-center text-xs font-black">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                  )
                                }
                                className="grid h-full w-9 place-items-center rounded-r-lg transition hover:bg-slate-50"
                                aria-label="Quantity বাড়ান"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {item.isCustomized &&
                        item.product.comboItems?.length ? (
                          <div className="mt-3 border-t border-[#eef1f5] pt-2">
                            {item.product.comboItems.map((component) => (
                              <div
                                key={component.productId}
                                className="flex justify-between gap-3 py-1 text-[11px] text-slate-500"
                              >
                                <span>{component.name}</span>
                                <strong>× {component.quantity}</strong>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#eef1f5] bg-white p-5">
                    {recoveryUrl ? (
                      <div className="mb-3 rounded-2xl bg-emerald-50 p-3 text-xs font-bold leading-5 text-emerald-700">
                        <p>
                          কার্ট সেভ হয়েছে। নিচের button-এ click করলে পুরো
                          recovery link clipboard-এ কপি হবে।
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <div className="min-w-0 flex-1 rounded-xl bg-white px-3 py-2.5 text-[11px] font-semibold text-[#062a54] shadow-[inset_0_0_0_1px_#e8edf3]">
                            <p className="truncate" title={recoveryUrl}>
                              {recoveryUrl}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => void handleCopyRecoveryLink()}
                            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 text-[11px] font-black text-white transition hover:bg-emerald-700"
                          >
                            {copied ? (
                              <Check className="size-4" />
                            ) : (
                              <Copy className="size-4" />
                            )}
                            {copied ? "কপি হয়েছে" : "লিংক কপি"}
                          </button>
                        </div>
                      </div>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => setSaveOpen(true)}
                      className="mb-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#03A7FD]/10 text-xs font-black text-[#0278ad] transition hover:bg-[#03A7FD]/15"
                    >
                      <Save className="size-4" />
                      WhatsApp-এর জন্য কার্ট সেভ করুন
                    </button>

                    <div className="mb-4 flex justify-between">
                      <span className="text-sm font-bold text-slate-500">
                        মোট
                      </span>
                      <span className="text-xl font-black text-[#062a54]">
                        {money.format(cartTotal)}
                      </span>
                    </div>

                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="flex h-12 items-center justify-center rounded-xl bg-[#FC5689] text-sm font-black text-white shadow-[0_8px_20px_rgba(252,86,137,.2)]"
                    >
                      চেকআউট করুন
                    </Link>
                  </div>
                </>
              )}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ContactCaptureModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        mode="cart"
        title="কার্ট সেভ করুন"
        description="নাম ও WhatsApp নম্বর দিলে এই কার্টটি পরে অন্য ডিভাইস থেকেও ফিরে পাবেন।"
        onSuccess={(result) => {
          setRecoveryUrl(result.recoveryUrl ?? "");
          setCopied(false);
        }}
      />
    </>
  );
}
