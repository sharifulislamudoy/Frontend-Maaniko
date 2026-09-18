"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  BellRing,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Copy,
  Gift,
  LoaderCircle,
  RefreshCcw,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  commerceApi,
  type EngagementDashboard,
} from "@/modules/commerce/lib/client";

export default function LoyaltyHubClient() {
  const [data, setData] = useState<EngagementDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [applying, setApplying] = useState(false);

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

  async function load() {
    setLoading(true);
    setError("");
    try {
      setData(await commerceApi.getEngagement());
    } catch (err) {
      setError(err instanceof Error ? err.message : "তথ্য পাওয়া যায়নি");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const sharedCode = new URLSearchParams(window.location.search)
        .get("ref")
        ?.trim()
        .toUpperCase();
      const pendingCode =
        window.localStorage.getItem("maaniko-pending-referral") ?? "";
      const nextCode = sharedCode || pendingCode;
      if (nextCode) {
        setReferralCode(nextCode);
        window.localStorage.setItem("maaniko-pending-referral", nextCode);
      }
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function copyReferral() {
    if (!data) return;
    const text = `Maaniko-তে আমার referral code ${data.referral.code} ব্যবহার করুন: ${window.location.origin}/rewards?ref=${data.referral.code}`;
    await navigator.clipboard.writeText(text);
    toast.success("Referral message কপি হয়েছে");
  }

  async function applyReferral(event: FormEvent) {
    event.preventDefault();
    setApplying(true);
    try {
      const result = await commerceApi.applyReferral(referralCode);
      toast.success(
        `${result.referrerName ?? "বন্ধু"}-এর referral যুক্ত হয়েছে`,
      );
      window.localStorage.removeItem("maaniko-pending-referral");
      setReferralCode("");
      await load();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Code ব্যবহার করা যায়নি",
      );
    } finally {
      setApplying(false);
    }
  }

  async function toggleReminder(id: string, enabled: boolean) {
    try {
      await commerceApi.updateReorderReminder({ reminderId: id, enabled });
      toast.success(enabled ? "Reminder চালু হয়েছে" : "Reminder বন্ধ হয়েছে");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Reminder update হয়নি");
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-[65vh] place-items-center bg-[#fff9fb]">
        <LoaderCircle className="size-8 animate-spin text-[#FC5689]" />
      </div>
    );
  }

  if (!data) {
    return (
      <section className="grid min-h-[65vh] place-items-center bg-[#fff9fb] px-4">
        <div className="max-w-md rounded-3xl bg-white p-6 text-center shadow-sm">
          <Gift className="mx-auto size-10 text-[#FC5689]" />
          <h1 className="mt-4 text-xl font-black text-[#062a54]">
            Rewards দেখতে profile যুক্ত করুন
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>
          <Link
            href="/orders"
            className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#FC5689] px-5 text-sm font-black text-white"
          >
            নাম ও ফোন দিয়ে profile খুলুন
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff9fb] py-5 pb-24 sm:py-8 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-[#FC5689] to-[#f27da1] p-4 text-white shadow-[0_18px_45px_rgba(239,66,119,.18)] sm:rounded-[28px] sm:p-6 md:flex-row md:items-center md:justify-between lg:p-8">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-wider text-white/75">
              Maaniko Rewards
            </p>
            <h1 className="mt-2 break-words text-2xl font-black sm:text-3xl">
              {data.wallet.points} points
            </h1>
            <p className="mt-1 text-sm text-white/85">
              বর্তমান মূল্য প্রায় {money.format(data.wallet.value)}
            </p>
          </div>
          <div className="w-full rounded-2xl bg-white/15 p-4 text-xs leading-6 backdrop-blur sm:text-sm md:max-w-md">
            প্রতি ৳{data.wallet.earnEveryBdt} delivered order value-এ{" "}
            {data.wallet.earnPoints} point। Checkout-এ points ব্যবহার করা যায়।
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
          <section className="min-w-0 rounded-2xl bg-white p-4 shadow-[0_8px_28px_rgba(6,42,84,.05)] sm:rounded-3xl sm:p-5 md:p-6">
            <div className="flex min-w-0 items-start gap-3 sm:items-center">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#fff0f5] text-[#FC5689]">
                <UsersRound className="size-5" />
              </span>
              <div className="min-w-0">
                <h2 className="font-black text-[#062a54]">
                  বন্ধুকে invite করুন
                </h2>
                <p className="text-xs text-slate-500">
                  বন্ধুর প্রথম delivery-এর পর দুজনই {data.referral.rewardPoints}{" "}
                  points পাবেন
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <div className="flex h-12 min-w-0 flex-1 items-center overflow-hidden rounded-xl bg-slate-50 px-4 font-black tracking-wider text-[#062a54]">
                {data.referral.code}
              </div>
              <button
                type="button"
                onClick={() => void copyReferral()}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#062a54] px-4 text-sm font-black text-white transition hover:bg-[#0a376c] sm:w-auto"
              >
                <Copy className="size-4" />
                <span className="sm:hidden">Code ও link কপি করুন</span>
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700">
                <CheckCircle2 className="size-3.5 shrink-0" />
                {data.referral.completed} successful
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-amber-700">
                <Clock3 className="size-3.5 shrink-0" />
                {data.referral.pending} pending
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-pink-100 bg-[#fff8fb] p-3 sm:p-4">
              <p className="text-xs font-black text-[#062a54]">
                Pending কখন successful হবে?
              </p>
              <div className="mt-3 grid gap-2 text-[11px] leading-5 text-slate-600 sm:grid-cols-3">
                <p className="rounded-xl bg-white p-2.5">
                  <strong className="block text-[#FC5689]">
                    ১. Code apply
                  </strong>
                  নতুন customer প্রথম delivery-এর আগে code ব্যবহার করবেন।
                </p>
                <p className="rounded-xl bg-white p-2.5">
                  <strong className="block text-[#FC5689]">
                    ২. প্রথম order
                  </strong>
                  সেই customer-এর প্রথম order delivery সম্পন্ন হবে।
                </p>
                <p className="rounded-xl bg-white p-2.5">
                  <strong className="block text-[#FC5689]">৩. Delivered</strong>
                  Admin status Delivered করলে দুজনই {
                    data.referral.rewardPoints
                  }{" "}
                  points পাবেন।
                </p>
              </div>
            </div>

            {data.referral.items.length ? (
              <div className="mt-4 space-y-2">
                {data.referral.items.map((item) => {
                  const successful = item.status === "REWARDED";
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black text-[#062a54]">
                          {item.name || "নতুন customer"}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {new Date(item.joinedAt).toLocaleDateString("bn-BD")}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black ${successful ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                      >
                        {successful ? "Successful" : "Pending delivery"}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <form
              onSubmit={applyReferral}
              className="mt-5 border-t border-slate-100 pt-5"
            >
              <label className="text-xs font-black text-[#062a54]">
                আপনি কারও code পেয়ে থাকলে
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  value={referralCode}
                  onChange={(e) =>
                    setReferralCode(e.target.value.toUpperCase())
                  }
                  placeholder="Referral code"
                  className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-3 text-sm uppercase outline-none focus:border-[#FC5689]"
                />
                <button
                  disabled={applying || !referralCode.trim()}
                  className="h-11 rounded-xl bg-[#FC5689] px-5 text-xs font-black text-white disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
            </form>
          </section>

          <section className="min-w-0 rounded-2xl bg-white p-4 shadow-[0_8px_28px_rgba(6,42,84,.05)] sm:rounded-3xl sm:p-5 md:p-6">
            <div className="flex items-start justify-between gap-3 sm:items-center">
              <div className="flex min-w-0 items-start gap-3 sm:items-center">
                <span className="grid size-11 place-items-center rounded-2xl bg-sky-50 text-sky-500">
                  <CalendarClock className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-black text-[#062a54]">
                    Reorder reminder
                  </h2>
                  <p className="text-xs text-slate-500">
                    Delivered পণ্য আবার লাগার সময়ে মনে করিয়ে দেবে
                  </p>
                </div>
              </div>
              <button
                onClick={() => void load()}
                className="grid size-9 place-items-center rounded-full bg-slate-50"
              >
                <RefreshCcw className="size-4" />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {data.reminders.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-[48px_minmax(0,1fr)_auto]"
                >
                  <img
                    src={item.image ?? ""}
                    alt=""
                    className="size-12 rounded-xl bg-white object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={item.href}
                      className="line-clamp-1 text-xs font-black text-[#062a54]"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {new Date(item.dueAt).toLocaleDateString("bn-BD")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      void toggleReminder(item.id, item.status === "CANCELLED")
                    }
                    className={`col-span-2 w-full rounded-lg px-3 py-2 text-[11px] font-black sm:col-span-1 sm:w-auto ${item.status === "CANCELLED" ? "bg-slate-200 text-slate-600" : "bg-emerald-50 text-emerald-700"}`}
                  >
                    {item.status === "CANCELLED" ? "চালু" : "বন্ধ"}
                  </button>
                </div>
              ))}
              {!data.reminders.length ? (
                <p className="py-8 text-center text-sm text-slate-400">
                  Delivered order হলে এখানে reminder তৈরি হবে।
                </p>
              ) : null}
            </div>
          </section>
        </div>

        <section className="mt-4 rounded-2xl bg-white p-4 shadow-[0_8px_28px_rgba(6,42,84,.05)] sm:mt-6 sm:rounded-3xl sm:p-5 md:p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-[#FC5689]" />
            <h2 className="text-lg font-black text-[#062a54]">
              আপনার profile অনুযায়ী
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 xl:grid-cols-6">
            {data.recommendations.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <img
                  src={product.image ?? ""}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-3">
                  <p className="line-clamp-2 text-xs font-black text-[#062a54]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-sm font-black text-[#FC5689]">
                    {money.format(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl bg-white p-4 shadow-[0_8px_28px_rgba(6,42,84,.05)] sm:mt-6 sm:rounded-3xl sm:p-5 md:p-6">
          <div className="flex items-center gap-2">
            <BellRing className="size-5 text-sky-500" />
            <h2 className="text-lg font-black text-[#062a54]">
              Points history
            </h2>
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {data.transactions.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 py-3 sm:items-center sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#062a54]">
                    {item.description}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {new Date(item.createdAt).toLocaleString("bn-BD")}
                  </p>
                </div>
                <strong
                  className={
                    item.points >= 0 ? "text-emerald-600" : "text-red-500"
                  }
                >
                  {item.points >= 0 ? "+" : ""}
                  {item.points}
                </strong>
              </div>
            ))}
            {!data.transactions.length ? (
              <p className="py-8 text-center text-sm text-slate-400">
                এখনও কোনো point transaction নেই।
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
