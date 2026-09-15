"use client";

import Link from "next/link";
import {
  Activity,
  Heart,
  PackageCheck,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";

import {
  clearCustomerIdentity,
  commerceApi,
  getCustomerToken,
  getSavedContact,
  saveCustomerIdentity,
} from "@/modules/commerce/lib/client";
import { useShop } from "@/modules/shop/context/ShopContext";

const STATUS_COPY: Record<string, string> = {
  PENDING: "অর্ডার গ্রহণ করা হয়েছে",
  CONFIRMED: "অর্ডার নিশ্চিত",
  PROCESSING: "প্রসেসিং চলছে",
  SHIPPED: "কুরিয়ারে দেওয়া হয়েছে",
  DELIVERED: "ডেলিভারি সম্পন্ন",
  CANCELLED: "বাতিল",
};

const EVENT_COPY: Record<string, string> = {
  PAGE_VIEW: "পেজ দেখেছেন",
  PRODUCT_VIEW: "পণ্য দেখেছেন",
  COMBO_VIEW: "Solution Box দেখেছেন",
  CART_ADD: "কার্টে যোগ করেছেন",
  CART_UPDATE: "কার্ট আপডেট করেছেন",
  CART_REMOVE: "কার্ট থেকে সরিয়েছেন",
  CART_SAVED: "কার্ট সেভ করেছেন",
  WISHLIST_ADD: "Wishlist-এ যোগ করেছেন",
  WISHLIST_REMOVE: "Wishlist থেকে সরিয়েছেন",
  WISHLIST_SAVED: "Wishlist সেভ করেছেন",
  CHECKOUT_STARTED: "Checkout শুরু করেছেন",
  CHECKOUT_FIELD_COMPLETED: "Checkout তথ্য পূরণ করেছেন",
  ORDER_CREATED: "অর্ডার করেছেন",
  PROFILE_IDENTIFIED: "Customer profile সংযুক্ত হয়েছে",
  PROFILE_RESTORED: "নতুন ডিভাইসে profile restore করেছেন",
  CARE_PROFILE_UPDATED: "Care Profile আপডেট করেছেন",
  PRICE_ALERT_CREATED: "Price alert চালু করেছেন",
  STOCK_ALERT_CREATED: "Stock alert চালু করেছেন",
  CARE_TEAM_REQUESTED: "Care Team-এর সাহায্য চেয়েছেন",
  DELIVERY_ESTIMATE_REQUESTED: "Delivery estimate দেখেছেন",
};

export default function MyAccountClient() {
  const { refreshCommerceState } = useShop();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState(false);
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

  async function loadAccount() {
    setLoading(true);
    setError("");

    try {
      const result = await commerceApi.me();
      setData(result);
      setLoading(false);
      void refreshCommerceState();
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : "তথ্য পাওয়া যায়নি");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const saved = getSavedContact();
    setName(saved.name);
    setPhone(saved.phone);

    if (getCustomerToken()) {
      void loadAccount();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function restore(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRestoring(true);
    setError("");

    try {
      const result = await commerceApi.restoreProfile({ name, phone });
      saveCustomerIdentity(result);
      toast.success("আগের Maaniko তথ্য এই ডিভাইসে ফিরিয়ে আনা হয়েছে");
      await loadAccount();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "নাম ও ফোন নম্বর মিলছে না। তথ্য ঠিকভাবে লিখে আবার চেষ্টা করুন।";
      setError(message);
      toast.error(message);
    } finally {
      setRestoring(false);
    }
  }

  if (loading) {
    return <AccountSkeleton />;
  }

  if (!data) {
    return (
      <section className="min-h-[70vh] bg-[#fff9fb] px-4 py-10">
        <div className="mx-auto max-w-lg rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(6,42,84,.08)] md:p-8">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#FC5689]/10 text-[#FC5689]">
            <UserRound className="size-6" />
          </span>

          <h1 className="mt-4 text-2xl font-black text-[#062a54]">
            আমার অর্ডার ও আগের তথ্য
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            এই ডিভাইসে কোনো saved customer পাওয়া যায়নি। অন্য ডিভাইসের আগের তথ্য
            আনতে আগেরবার ব্যবহার করা একই নাম ও ফোন নম্বর দিন।
          </p>

          <form onSubmit={restore} className="mt-6">
            <label className="block text-sm font-bold text-[#062a54]">
              আগেরবার দেওয়া নাম
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl bg-slate-50 px-3 outline-none ring-1 ring-[#e8edf3] transition focus:bg-white focus:ring-2 focus:ring-[#FC5689]/30"
                autoComplete="name"
              />
            </label>

            <label className="mt-4 block text-sm font-bold text-[#062a54]">
              আগেরবার দেওয়া ফোন নম্বর
              <input
                required
                inputMode="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl bg-slate-50 px-3 outline-none ring-1 ring-[#e8edf3] transition focus:bg-white focus:ring-2 focus:ring-[#FC5689]/30"
                placeholder="01XXXXXXXXX"
                autoComplete="tel"
              />
            </label>

            {error ? (
              <p className="mt-3 rounded-xl bg-red-50 p-3 text-xs font-bold leading-5 text-red-600">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={restoring}
              className="mt-5 h-12 w-full rounded-xl bg-[#FC5689] text-sm font-black text-white shadow-[0_8px_20px_rgba(252,86,137,.2)] transition hover:bg-[#e94778] disabled:opacity-60"
            >
              {restoring ? "খোঁজা হচ্ছে..." : "আমার আগের তথ্য ফিরিয়ে আনুন"}
            </button>
          </form>

          <p className="mt-4 text-[11px] leading-5 text-slate-400">
            নাম ও ফোন নম্বর exact match না করলে আগের তথ্য দেখানো হবে না।
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff9fb] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-[26px] bg-[#062a54] p-5 text-white shadow-[0_16px_40px_rgba(6,42,84,.16)] md:flex-row md:items-center md:justify-between md:p-7">
          <div>
            <p className="text-xs font-bold text-white/60">
              Maaniko Care Profile
            </p>
            <h1 className="mt-1 text-2xl font-black">
              {data.customer.name ?? "Customer"}
            </h1>
            <p className="mt-1 text-sm text-white/70">{data.customer.phone}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/care-profile"
              className="rounded-xl bg-white px-4 py-2.5 text-xs font-black text-[#062a54]"
            >
              Care Profile আপডেট
            </Link>

            <button
              type="button"
              onClick={() => {
                clearCustomerIdentity();
                setData(null);
                toast.success("এই ডিভাইস থেকে profile access সরানো হয়েছে");
              }}
              className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/15"
            >
              এই ডিভাইস থেকে বের হন
            </button>
          </div>
        </div>

        <section className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Stat
            icon={PackageCheck}
            label="মোট অর্ডার"
            value={data.stats.orderCount}
          />
          <Stat
            icon={PackageCheck}
            label="ডেলিভারি হয়েছে"
            value={data.stats.deliveredCount}
          />
          <Stat
            icon={ShoppingBag}
            label="Cart items"
            value={data.stats.cartItemCount}
          />
          <Stat
            icon={Heart}
            label="Wishlist"
            value={data.stats.wishlistCount}
          />
          <Stat
            icon={Activity}
            label="মোট অর্ডার মূল্য"
            value={money.format(data.stats.totalOrdered)}
            wide
          />
        </section>

        <section className="mt-6 rounded-[24px] bg-white p-4 shadow-[0_10px_30px_rgba(6,42,84,.055)] md:p-6">
          <h2 className="text-xl font-black text-[#062a54]">আমার অর্ডারসমূহ</h2>

          {data.orders.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              এখনো কোনো অর্ডার নেই।
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {data.orders.map((order: any) => (
                <article
                  key={order.id}
                  className="rounded-2xl bg-[#fbfcfe] p-4 ring-1 ring-[#edf1f5]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-400">Order ID</p>
                      <h3 className="font-black text-[#062a54]">
                        {order.orderNumber}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleString("bn-BD")}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex rounded-full bg-[#03A7FD]/10 px-3 py-1 text-xs font-black text-[#0278ad]">
                        {STATUS_COPY[order.status] ?? order.status}
                      </span>
                      <p className="mt-2 text-lg font-black text-[#FC5689]">
                        {money.format(order.total)}
                      </p>
                      {order.steadfastTrackingCode ? (
                        <p className="mt-1 text-[10px] font-bold text-slate-500">
                          Steadfast: {order.steadfastStatus ?? "processing"}
                          <br />
                          Tracking: {order.steadfastTrackingCode}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="rounded-xl bg-white p-3">
                        <div className="flex gap-2">
                          <img
                            src={item.image ?? ""}
                            alt=""
                            className="size-12 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <p className="line-clamp-2 text-xs font-black text-[#062a54]">
                              {item.name}
                            </p>
                            <p className="mt-1 text-[11px] text-slate-500">
                              {item.quantity} × {money.format(item.unitPrice)}
                            </p>
                          </div>
                        </div>

                        {Array.isArray(item.customConfig) &&
                        item.customConfig.length ? (
                          <div className="mt-2 border-t border-[#eef1f5] pt-2">
                            {item.customConfig.map((component: any) => (
                              <p
                                key={component.productId}
                                className="text-[10px] text-slate-500"
                              >
                                {component.name} × {component.quantity}
                              </p>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex overflow-x-auto pb-1">
                    {order.history.map((history: any, index: number) => (
                      <div
                        key={history.id}
                        className="flex min-w-[140px] items-start"
                      >
                        <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#FC5689]" />
                        <div className="ml-2">
                          <p className="text-[11px] font-black text-[#062a54]">
                            {STATUS_COPY[history.status] ?? history.status}
                          </p>
                          <p className="mt-0.5 text-[9px] text-slate-400">
                            {new Date(history.createdAt).toLocaleString(
                              "bn-BD",
                            )}
                          </p>
                        </div>
                        {index < order.history.length - 1 ? (
                          <span className="mx-2 mt-2 h-px min-w-5 flex-1 bg-slate-200" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[24px] bg-white p-4 shadow-[0_10px_30px_rgba(6,42,84,.055)] md:p-6">
            <h2 className="font-black text-[#062a54]">বর্তমান Cart</h2>
            <p className="mt-1 text-xs text-slate-500">
              Status: {data.cart.status} • {data.stats.cartItemCount} items
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-flex rounded-xl bg-[#FC5689] px-4 py-2.5 text-xs font-black text-white"
            >
              Shopping চালিয়ে যান
            </Link>
          </div>

          <div className="rounded-[24px] bg-white p-4 shadow-[0_10px_30px_rgba(6,42,84,.055)] md:p-6">
            <h2 className="font-black text-[#062a54]">Recent activity</h2>
            <div className="mt-3 max-h-72 space-y-2 overflow-y-auto">
              {data.activity.map((activity: any) => (
                <div
                  key={activity.id}
                  className="rounded-xl bg-slate-50 px-3 py-2"
                >
                  <p className="text-xs font-bold text-[#062a54]">
                    {EVENT_COPY[activity.type] ?? activity.type}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {new Date(activity.createdAt).toLocaleString("bn-BD")}
                    {activity.path ? ` • ${activity.path}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AccountSkeleton() {
  return (
    <main className="min-h-screen bg-[#fff9fb] py-8 md:py-12">
      <div className="mx-auto max-w-7xl animate-pulse px-4 md:px-6 lg:px-8">
        <div className="rounded-[26px] bg-white p-5 shadow-[0_10px_30px_rgba(6,42,84,.05)] md:p-7">
          <div className="h-3 w-32 rounded-full bg-slate-200" />
          <div className="mt-3 h-7 w-56 rounded-lg bg-slate-200" />
          <div className="mt-2 h-4 w-36 rounded-full bg-slate-100" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="h-28 rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(6,42,84,.04)]"
            >
              <div className="size-5 rounded-md bg-slate-200" />
              <div className="mt-4 h-6 w-16 rounded-md bg-slate-200" />
              <div className="mt-2 h-3 w-24 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] bg-white p-4 shadow-[0_10px_30px_rgba(6,42,84,.04)] md:p-6">
          <div className="h-6 w-40 rounded-md bg-slate-200" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex justify-between gap-4">
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded-full bg-slate-200" />
                    <div className="h-3 w-24 rounded-full bg-slate-100" />
                  </div>
                  <div className="h-7 w-24 rounded-full bg-slate-200" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="h-16 rounded-xl bg-white" />
                  <div className="h-16 rounded-xl bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  wide,
}: {
  icon: typeof PackageCheck;
  label: string;
  value: string | number;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(6,42,84,.045)] ${
        wide ? "col-span-2 md:col-span-1" : ""
      }`}
    >
      <Icon className="size-5 text-[#FC5689]" />
      <p className="mt-3 text-xl font-black text-[#062a54]">{value}</p>
      <p className="mt-1 text-[11px] font-bold text-slate-400">{label}</p>
    </div>
  );
}
