"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import {
  commerceApi,
  getSavedContact,
  saveCustomerIdentity,
} from "@/modules/commerce/lib/client";

type Mode = "cart" | "wishlist" | "contact";

export default function ContactCaptureModal({
  open,
  onClose,
  mode,
  title,
  description,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  mode: Mode;
  title: string;
  description: string;
  onSuccess?: (result: any) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const saved = getSavedContact();
    setName(saved.name);
    setPhone(saved.phone);
    setError("");
  }, [open]);

  if (!open) return null;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name,
        phone,
        marketingConsent: marketing,
      };
      const result =
        mode === "cart"
          ? await commerceApi.saveCart(payload)
          : mode === "wishlist"
            ? await commerceApi.saveWishlist(payload)
            : await commerceApi.captureContact({
                ...payload,
                source: "value_capture",
              });

      saveCustomerIdentity(result);
      onSuccess?.(result);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "তথ্য সেভ করা যায়নি");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[130] grid place-items-end bg-[#062a54]/40 p-0 backdrop-blur-[2px] sm:place-items-center sm:p-4">
      <button
        aria-label="বন্ধ করুন"
        onClick={onClose}
        className="absolute inset-0"
        type="button"
      />
      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-md rounded-t-[26px] bg-white p-5 shadow-2xl sm:rounded-[26px] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-[#062a54]">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500"
          >
            <X className="size-4" />
          </button>
        </div>

        <label className="mt-5 block text-sm font-bold text-[#062a54]">
          আপনার নাম
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#FC5689]"
            placeholder="যেমন: Rahima Akter"
          />
        </label>

        <label className="mt-3 block text-sm font-bold text-[#062a54]">
          WhatsApp / ফোন নম্বর
          <input
            required
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#FC5689]"
            placeholder="01XXXXXXXXX"
          />
          <span className="mt-1 block text-[11px] font-medium text-slate-400">
            এই নম্বরটি আপনার cart/order/profile আবার খুঁজে পেতে ব্যবহার হবে।
          </span>
        </label>

        <label className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(event) => setMarketing(event.target.checked)}
            className="mt-1"
          />
          Maaniko-এর প্রয়োজনীয় অফার ও নতুন পণ্যের খবর WhatsApp-এ পেতে চাই।
        </label>

        {error ? (
          <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
            {error}
          </p>
        ) : null}

        <button
          disabled={loading}
          className="mt-5 h-12 w-full rounded-xl bg-[#FC5689] text-sm font-black text-white disabled:opacity-60"
        >
          {loading ? "সেভ হচ্ছে..." : "সেভ করুন"}
        </button>
      </form>
    </div>
  );
}
