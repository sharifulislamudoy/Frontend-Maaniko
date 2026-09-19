"use client";

import { BellRing, LoaderCircle, Tag, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import {
  commerceApi,
  getSavedContact,
  saveCustomerIdentity,
} from "@/modules/commerce/lib/client";

type AlertType = "PRICE_DROP" | "BACK_IN_STOCK";

export default function ProductAlertActions({
  productId,
  comboId,
  variantId,
  productName,
  outOfStock,
}: {
  productId?: string;
  comboId?: string;
  variantId?: string;
  productName: string;
  outOfStock: boolean;
}) {
  const [type, setType] = useState<AlertType | null>(null);
  const saved = getSavedContact();
  const [name, setName] = useState(saved.name);
  const [phone, setPhone] = useState(saved.phone);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<AlertType | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!type) return;
    setSaving(true);
    setError("");
    try {
      const result = await commerceApi.createLead({
        type,
        name,
        phone,
        productId,
        variantId,
        comboId,
      });
      saveCustomerIdentity(result);
      setDone(type);
      setType(null);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Reminder সেট করা যায়নি",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="mt-3 flex flex-wrap gap-2">
        {outOfStock ? (
          <button
            type="button"
            onClick={() => setType("BACK_IN_STOCK")}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#FC5689]/30 bg-[#fff4f6] px-3 text-xs font-black text-[#d9366f]"
          >
            <BellRing className="size-4" /> স্টকে এলে জানাবেন
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => setType("PRICE_DROP")}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-[#062a54]"
        >
          <Tag className="size-4" /> দাম কমলে জানাবেন
        </button>
        {done ? (
          <span className="self-center text-xs font-bold text-emerald-600">
            Reminder সেট হয়েছে
          </span>
        ) : null}
      </div>

      {type ? (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <form
            onSubmit={submit}
            className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black text-[#FC5689]">PRODUCT ALERT</p>
                <h2 className="mt-1 text-xl font-black text-[#062a54]">
                  {type === "BACK_IN_STOCK"
                    ? "স্টকে এলে জানাবেন"
                    : "দাম কমলে জানাবেন"}
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {productName}-এর আপডেট হলে আপনার notification inbox ও চালু
                  থাকা push notification-এ জানানো হবে।
                </p>
              </div>
              <button
                type="button"
                onClick={() => setType(null)}
                aria-label="বন্ধ করুন"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600"
              >
                <X className="size-4" />
              </button>
            </div>
            <label className="mt-5 block text-sm font-bold text-[#062a54]">
              নাম
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#FC5689]"
              />
            </label>
            <label className="mt-4 block text-sm font-bold text-[#062a54]">
              ফোন নম্বর
              <input
                required
                inputMode="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#FC5689]"
              />
            </label>
            {error ? (
              <p className="mt-3 rounded-xl bg-rose-50 p-3 text-xs font-bold text-rose-600">
                {error}
              </p>
            ) : null}
            <button
              disabled={saving}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FC5689] text-sm font-black text-white disabled:opacity-60"
            >
              {saving ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {saving ? "সেভ হচ্ছে..." : "Reminder সেট করুন"}
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
