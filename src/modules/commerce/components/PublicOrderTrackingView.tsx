"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  LoaderCircle,
  PackageCheck,
  PackageOpen,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  commerceApi,
  type PublicOrderTracking,
} from "@/modules/commerce/lib/client";

const STATUS_COPY: Record<string, string> = {
  PENDING: "অর্ডার গ্রহণ করা হয়েছে",
  CONFIRMED: "অর্ডার নিশ্চিত",
  PROCESSING: "প্রসেসিং চলছে",
  SHIPPED: "কুরিয়ারে দেওয়া হয়েছে",
  DELIVERED: "ডেলিভারি সম্পন্ন",
  CANCELLED: "অর্ডার বাতিল",
};

const ORDER_STEPS = [
  { status: "PENDING", label: "অর্ডার গ্রহণ", icon: Clock3 },
  { status: "CONFIRMED", label: "নিশ্চিত", icon: CheckCircle2 },
  { status: "PROCESSING", label: "প্রসেসিং", icon: PackageCheck },
  { status: "SHIPPED", label: "কুরিয়ারে", icon: Truck },
  { status: "DELIVERED", label: "ডেলিভারি", icon: Check },
] as const;

function currentStep(status: string) {
  return ORDER_STEPS.findIndex((step) => step.status === status);
}

export default function PublicOrderTrackingView({ token }: { token: string }) {
  const [data, setData] = useState<PublicOrderTracking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    let cancelled = false;
    commerceApi
      .getPublicOrderTracking(token)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Tracking তথ্য পাওয়া যায়নি",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) {
    return (
      <div className="grid min-h-[65vh] place-items-center bg-[#f8fafc] px-4">
        <div className="text-center">
          <LoaderCircle className="mx-auto size-8 animate-spin text-[#e74879]" />
          <p className="mt-3 text-sm font-bold text-slate-500">
            অর্ডারের বর্তমান অবস্থা দেখা হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <section className="grid min-h-[68vh] place-items-center bg-[#f8fafc] px-4 py-10">
        <div className="w-full max-w-md border border-[#e3e8ee] bg-white p-6 text-center shadow-[0_16px_45px_rgba(6,42,84,.07)]">
          <span className="mx-auto grid size-12 place-items-center bg-[#fff0f5] text-[#e74879]">
            <Clock3 className="size-6" />
          </span>
          <h1 className="mt-5 text-xl font-black text-[#062a54]">
            Tracking linkটি কাজ করছে না
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>
          <Link
            href="/"
            className="mt-5 inline-flex h-10 items-center gap-2 bg-[#062a54] px-4 text-sm font-black text-white"
          >
            <ArrowLeft className="size-4" />
            Maaniko হোমে যান
          </Link>
        </div>
      </section>
    );
  }

  const activeStep = currentStep(data.status);
  const isCancelled = data.status === "CANCELLED";

  return (
    <main className="min-h-screen bg-[#f8fafc] py-6 md:py-10">
      <div className="mx-auto max-w-5xl px-3.5 sm:px-5 lg:px-8">
        <Link
          href="/"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-[#062a54]"
        >
          <ArrowLeft className="size-4" />
          Maaniko-তে ফিরে যান
        </Link>

        <section className="border border-[#e3e8ee] bg-white shadow-[0_12px_36px_rgba(6,42,84,.05)]">
          <header className="border-b border-[#e7ecf1] px-4 py-5 md:flex md:items-start md:justify-between md:px-6">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.07em] text-emerald-600">
                <ShieldCheck className="size-4" />
                Secure order tracking
              </div>
              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#062a54] md:text-3xl">
                অর্ডার {data.orderNumber}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  {new Date(data.createdAt).toLocaleString("bn-BD")}
                </span>
                <span>
                  সর্বশেষ আপডেট: {new Date(data.updatedAt).toLocaleString("bn-BD")}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-slate-400">
                বর্তমান অবস্থা
              </p>
              <span
                className={`mt-1.5 inline-flex px-3 py-1.5 text-xs font-black ${
                  isCancelled
                    ? "bg-red-50 text-red-600"
                    : data.status === "DELIVERED"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-[#fff0f5] text-[#d83e6e]"
                }`}
              >
                {STATUS_COPY[data.status] ?? data.status}
              </span>
            </div>
          </header>

          <div className="px-4 py-5 md:px-6 md:py-6">
            {isCancelled ? (
              <div className="border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                এই অর্ডারটি বাতিল করা হয়েছে। সহায়তার প্রয়োজন হলে Maaniko-এর সঙ্গে
                যোগাযোগ করুন।
              </div>
            ) : (
              <div className="overflow-x-auto pb-2">
                <div className="grid min-w-[620px] grid-cols-5">
                  {ORDER_STEPS.map((step, index) => {
                    const StepIcon = step.icon;
                    const completed = index <= activeStep;
                    return (
                      <div key={step.status} className="relative text-center">
                        {index > 0 ? (
                          <span
                            className={`absolute right-1/2 top-4 h-0.5 w-full ${
                              index <= activeStep ? "bg-[#e74879]" : "bg-[#e1e6eb]"
                            }`}
                          />
                        ) : null}
                        <span
                          className={`relative mx-auto grid size-8 place-items-center rounded-full border-2 ${
                            completed
                              ? "border-[#e74879] bg-[#e74879] text-white"
                              : "border-[#dce3e9] bg-white text-slate-400"
                          }`}
                        >
                          <StepIcon className="size-3.5" strokeWidth={2.2} />
                        </span>
                        <p
                          className={`mt-2 text-[11px] font-bold ${
                            completed ? "text-[#183b60]" : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-5 grid gap-5 border-t border-[#e7ecf1] pt-5 lg:grid-cols-[1.25fr_.75fr]">
              <section>
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-sm font-black text-[#062a54]">
                    <PackageOpen className="size-4 text-[#e74879]" />
                    অর্ডারের পণ্য
                  </h2>
                  <span className="text-[11px] font-bold text-slate-400">
                    {data.items.reduce((total, item) => total + item.quantity, 0)}টি item
                  </span>
                </div>
                <div className="mt-3 divide-y divide-[#e7ecf1] border border-[#e3e8ee]">
                  {data.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 md:p-4">
                      <span className="grid size-14 shrink-0 place-items-center overflow-hidden bg-[#f2f5f8] text-slate-400 md:size-16">
                        {item.image ? (
                          <img src={item.image} alt="" className="size-full object-cover" />
                        ) : (
                          <PackageOpen className="size-5" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black leading-5 text-[#062a54]">{item.name}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.quantity} × {money.format(item.unitPrice)}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-black text-[#062a54]">{money.format(item.lineTotal)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <h2 className="text-sm font-black text-[#062a54]">Order timeline</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {data.history.map((history) => (
                      <div key={history.id} className="border-l-2 border-[#e74879] bg-[#f8fafc] px-3 py-2.5">
                        <p className="text-xs font-black text-[#183b60]">{STATUS_COPY[history.status] ?? history.status}</p>
                        {history.note ? <p className="mt-1 text-[11px] leading-4 text-slate-500">{history.note}</p> : null}
                        <p className="mt-1 text-[10px] text-slate-400">{new Date(history.createdAt).toLocaleString("bn-BD")}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <aside className="lg:border-l lg:border-[#e7ecf1] lg:pl-5">
                <div className="bg-[#062a54] p-4 text-white">
                  <h2 className="flex items-center gap-2 text-sm font-black">
                    <CircleDollarSign className="size-4 text-[#ffbfd3]" />
                    Payment summary
                  </h2>
                  <div className="mt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between text-white/70">
                      <span>পণ্যের মূল্য</span>
                      <span>{money.format(data.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>ডেলিভারি চার্জ</span>
                      <span>{money.format(data.deliveryCharge)}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/15 pt-3 text-base font-black">
                      <span>মোট</span>
                      <span>{money.format(data.total)}</span>
                    </div>
                  </div>
                </div>

                {data.steadfastTrackingCode ? (
                  <div className="mt-3 border border-[#e3e8ee] bg-white p-4">
                    <h2 className="flex items-center gap-2 text-sm font-black text-[#062a54]">
                      <Truck className="size-4 text-[#e74879]" />
                      Courier details
                    </h2>
                    <dl className="mt-3 space-y-2 text-xs">
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate-400">Status</dt>
                        <dd className="font-bold text-[#183b60]">{data.steadfastStatus ?? "processing"}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate-400">Tracking code</dt>
                        <dd className="break-all text-right font-bold text-[#183b60]">{data.steadfastTrackingCode}</dd>
                      </div>
                    </dl>
                  </div>
                ) : (
                  <div className="mt-3 border border-[#e3e8ee] bg-[#f8fafc] p-4 text-xs leading-5 text-slate-500">
                    Courier tracking code তৈরি হলে এখানেই দেখা যাবে।
                  </div>
                )}

                <div className="mt-3 flex items-start gap-2 border border-emerald-100 bg-emerald-50 p-3 text-[11px] leading-5 text-emerald-800">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                  <p>
                    এই public page-এ customer-এর phone, email বা delivery address
                    দেখানো হয় না। Link-এর মেয়াদ{" "}
                    {new Date(data.expiresAt).toLocaleDateString("bn-BD")} পর্যন্ত।
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
