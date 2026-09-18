"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Loader2, Star, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

import {
  commerceApi,
  getCustomerToken,
  type PendingReviewPrompt,
} from "@/modules/commerce/lib/client";

const BLOCKED_PATHS = ["/checkout", "/cart", "/track-order"];

export default function ExperienceReviewPrompt() {
  const pathname = usePathname();
  const [prompt, setPrompt] = useState<PendingReviewPrompt | null>(null);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState<string | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (BLOCKED_PATHS.some((path) => pathname.startsWith(path))) {
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (!getCustomerToken()) return;
      void commerceApi
        .getPendingReview()
        .then(({ prompt: nextPrompt }) => {
          if (cancelled || !nextPrompt) return;
          setPrompt(nextPrompt);
          setOpen(true);
        })
        .catch(() => undefined);
    }, 1800);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname]);

  const dismiss = useCallback(
    async (neverAskAgain: boolean) => {
      if (!prompt || busy) return;
      setOpen(false);
      try {
        await commerceApi.dismissReviewPrompt({
          orderId: prompt.orderId,
          neverAskAgain,
        });
        if (neverAskAgain) toast.success("এই অর্ডারের জন্য আর মনে করানো হবে না");
      } catch {
        // Closing the prompt must always remain instant for the customer.
      }
    },
    [busy, prompt],
  );

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") void dismiss(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dismiss, open]);

  async function submit() {
    if (!prompt || rating < 1 || busy) return;
    setBusy(true);
    try {
      await commerceApi.submitOrderReview({
        orderId: prompt.orderId,
        rating,
        comment: comment.trim() || undefined,
        selectedOrderItemId,
      });
      setSubmitted(true);
      window.setTimeout(() => setOpen(false), 1400);
    } catch (reason) {
      toast.error(
        reason instanceof Error ? reason.message : "Review সেভ করা যায়নি",
      );
    } finally {
      setBusy(false);
    }
  }

  if (typeof document === "undefined" || !prompt) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[180] grid place-items-end bg-[#062a54]/35 p-0 backdrop-blur-[2px] sm:place-items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) void dismiss(false);
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-review-title"
            initial={{ y: 36, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 330, damping: 30 }}
            className="w-full overflow-hidden rounded-t-[28px] bg-white shadow-[0_-20px_60px_rgba(6,42,84,.18)] sm:max-w-lg sm:rounded-[28px] sm:shadow-[0_24px_80px_rgba(6,42,84,.2)]"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid min-h-72 place-items-center px-6 text-center"
              >
                <div>
                  <CheckCircle2 className="mx-auto size-14 text-emerald-500" />
                  <h2 className="mt-4 font-baloo text-2xl font-bold text-[#062a54]">
                    অনেক ধন্যবাদ
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    আপনার মতামত আমাদের আরও ভালো হতে সাহায্য করবে।
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                <header className="relative border-b border-slate-100 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
                  <button
                    type="button"
                    aria-label="পরে review দিন"
                    onClick={() => void dismiss(false)}
                    className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                  >
                    <X className="size-4" />
                  </button>
                  <span className="inline-flex rounded-full bg-[#fff1f5] px-3 py-1 text-[11px] font-bold text-[#FC5689]">
                    অর্ডার #{prompt.orderNumber}
                  </span>
                  <h2
                    id="experience-review-title"
                    className="mt-3 pr-8 font-baloo text-xl font-bold leading-tight text-[#062a54] sm:text-2xl"
                  >
                    আপনার অভিজ্ঞতা কেমন ছিল?
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    একটি rating দিলেই হবে—বাকি সব optional।
                  </p>
                </header>

                <div className="max-h-[65vh] overflow-y-auto px-5 py-4 sm:px-6">
                  <div
                    className="flex justify-center gap-2"
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    {Array.from({ length: 5 }, (_, index) => {
                      const value = index + 1;
                      const active = value <= (hoveredRating || rating);
                      return (
                        <button
                          key={value}
                          type="button"
                          aria-label={`${value} star`}
                          onMouseEnter={() => setHoveredRating(value)}
                          onFocus={() => setHoveredRating(value)}
                          onBlur={() => setHoveredRating(0)}
                          onClick={() => setRating(value)}
                          className="grid size-11 place-items-center rounded-xl transition hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-amber-400"
                        >
                          <Star
                            className={`size-8 transition-all ${
                              active
                                ? "scale-110 fill-amber-400 text-amber-400"
                                : "fill-slate-100 text-slate-300"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1 h-5 text-center text-xs font-semibold text-[#FC5689]">
                    {rating === 1
                      ? "ভালো হয়নি"
                      : rating === 2
                        ? "আরও ভালো হতে পারত"
                        : rating === 3
                          ? "মোটামুটি ভালো"
                          : rating === 4
                            ? "খুব ভালো"
                            : rating === 5
                              ? "দারুণ অভিজ্ঞতা"
                              : ""}
                  </p>

                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value.slice(0, 1200))}
                    placeholder="ইচ্ছা হলে ছোট করে আপনার মতামত লিখুন"
                    rows={3}
                    className="mt-3 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-[#062a54] outline-none transition placeholder:text-slate-400 focus:border-[#FC5689] focus:bg-white focus:ring-4 focus:ring-[#FC5689]/10"
                  />

                  {prompt.items.length ? (
                    <div className="mt-3 rounded-2xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setShowProducts((value) => !value)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                      >
                        <span>
                          <span className="block text-sm font-bold text-[#062a54]">
                            কোনো নির্দিষ্ট পণ্য সম্পর্কে?
                          </span>
                          <span className="mt-0.5 block text-[11px] text-slate-400">
                            Optional—সর্বোচ্চ একটি পণ্য নির্বাচন করুন
                          </span>
                        </span>
                        <ChevronDown
                          className={`size-4 shrink-0 text-slate-400 transition ${showProducts ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {showProducts ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 border-t border-slate-100 p-3">
                              <button
                                type="button"
                                onClick={() => setSelectedOrderItemId(null)}
                                className={`w-full rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition ${
                                  selectedOrderItemId === null
                                    ? "border-[#FC5689] bg-[#fff4f7] text-[#FC5689]"
                                    : "border-slate-200 text-slate-600 hover:border-pink-200"
                                }`}
                              >
                                পুরো অর্ডারের অভিজ্ঞতা
                              </button>
                              {prompt.items.map((item) => (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => setSelectedOrderItemId(item.id)}
                                  className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition ${
                                    selectedOrderItemId === item.id
                                      ? "border-[#FC5689] bg-[#fff4f7]"
                                      : "border-slate-200 hover:border-pink-200"
                                  }`}
                                >
                                  <span className="size-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                    {item.image ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        src={item.image}
                                        alt=""
                                        className="size-full object-cover"
                                      />
                                    ) : null}
                                  </span>
                                  <span className="line-clamp-2 text-xs font-bold text-[#062a54]">
                                    {item.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  ) : null}
                </div>

                <footer className="border-t border-slate-100 px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-5">
                  <button
                    type="button"
                    disabled={rating < 1 || busy}
                    onClick={() => void submit()}
                    className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#FC5689] px-5 text-sm font-bold text-white shadow-[0_10px_26px_rgba(252,86,137,.25)] transition hover:bg-[#ef4277] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                  >
                    {busy ? <Loader2 className="size-5 animate-spin" /> : "Review জমা দিন"}
                  </button>
                  <div className="mt-2 flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-400">
                    <button type="button" onClick={() => void dismiss(false)}>
                      পরে দেব
                    </button>
                    <button type="button" onClick={() => void dismiss(true)}>
                      আর মনে করাবেন না
                    </button>
                  </div>
                </footer>
              </>
            )}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
