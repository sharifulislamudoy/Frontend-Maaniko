"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Copy,
  Heart,
  LogOut,
  PackageCheck,
  PackageOpen,
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

type OrderHistory = {
  id: string;
  status: string;
  note?: string | null;
  createdAt: string;
};

type CustomConfigItem = {
  productId: string;
  name?: string;
  quantity: number;
};

type AccountOrderItem = {
  id: string;
  name: string;
  image?: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  customConfig?: CustomConfigItem[] | null;
};

type AccountOrder = {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  subtotal: number;
  deliveryCharge: number;
  createdAt: string;
  steadfastStatus?: string | null;
  steadfastTrackingCode?: string | null;
  items: AccountOrderItem[];
  history: OrderHistory[];
};

type CustomerActivity = {
  id: string;
  type: string;
  path?: string | null;
  createdAt: string;
};

type AccountData = {
  customer: { name?: string | null; phone?: string | null };
  stats: {
    orderCount: number;
    deliveredCount: number;
    totalOrdered: number;
    cartItemCount: number;
    wishlistCount: number;
  };
  orders: AccountOrder[];
  activity: CustomerActivity[];
  cart: { status: string };
};

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

function statusTone(status: string) {
  if (status === "DELIVERED") return "bg-emerald-50 text-emerald-700";
  if (status === "CANCELLED") return "bg-red-50 text-red-600";
  if (status === "SHIPPED") return "bg-sky-50 text-sky-700";
  return "bg-amber-50 text-amber-700";
}

export default function MyAccountClient() {
  const { refreshCommerceState } = useShop();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [copyingOrderId, setCopyingOrderId] = useState("");

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
      const result = (await commerceApi.me()) as AccountData;
      setData(result);
      void refreshCommerceState();
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : "তথ্য পাওয়া যায়নি");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = getSavedContact();
      setName(saved.name);
      setPhone(saved.phone);
      if (getCustomerToken()) void loadAccount();
      else setLoading(false);
    }, 0);
    return () => window.clearTimeout(timer);
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

  async function copyTrackingLink(orderId: string) {
    setCopyingOrderId(orderId);
    try {
      const result = await commerceApi.createOrderShareLink(orderId);
      const url = `${window.location.origin}/track-order/${encodeURIComponent(result.token)}`;
      await navigator.clipboard.writeText(url);
      toast.success("Tracking link কপি হয়েছে");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Tracking link তৈরি করা যায়নি",
      );
    } finally {
      setCopyingOrderId("");
    }
  }

  if (loading) return <AccountSkeleton />;

  if (!data) {
    return (
      <section className="min-h-[70vh] bg-[#f8fafc] px-4 py-8 md:py-12">
        <div className="mx-auto w-full max-w-md border border-[#e4e9ef] bg-white p-5 shadow-[0_16px_45px_rgba(6,42,84,.07)] md:p-7">
          <span className="grid size-11 place-items-center bg-[#fff0f5] text-[#e74879]">
            <UserRound className="size-5" />
          </span>
          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.08em] text-[#e74879]">
            Customer access
          </p>
          <h1 className="mt-1 text-2xl font-black text-[#062a54]">
            আমার অর্ডার দেখুন
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            আগের অর্ডার, tracking ও saved তথ্য দেখতে অর্ডারের সময় ব্যবহার করা
            একই নাম এবং ফোন নম্বর দিন।
          </p>
          <form onSubmit={restore} className="mt-6 space-y-4">
            <label className="block text-sm font-bold text-[#183b60]">
              নাম
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                className="mt-1.5 h-11 w-full border border-[#dfe5eb] bg-white px-3 text-sm outline-none transition focus:border-[#9aabba] focus:ring-4 focus:ring-[#062a54]/5"
              />
            </label>
            <label className="block text-sm font-bold text-[#183b60]">
              ফোন নম্বর
              <input
                required
                inputMode="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="01XXXXXXXXX"
                autoComplete="tel"
                className="mt-1.5 h-11 w-full border border-[#dfe5eb] bg-white px-3 text-sm outline-none transition focus:border-[#9aabba] focus:ring-4 focus:ring-[#062a54]/5"
              />
            </label>
            {error ? (
              <p className="border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-bold leading-5 text-red-600">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={restoring}
              className="flex h-11 w-full items-center justify-center gap-2 bg-[#062a54] text-sm font-black text-white transition hover:bg-[#0a3a6c] disabled:opacity-60"
            >
              {restoring ? "খোঁজা হচ্ছে..." : "আমার অর্ডার দেখুন"}
              {!restoring ? <ArrowRight className="size-4" /> : null}
            </button>
          </form>
          <p className="mt-4 text-[11px] leading-5 text-slate-400">
            নিরাপত্তার জন্য নাম ও ফোন নম্বর exact match হতে হবে।
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] py-6 md:py-9">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-5 lg:px-8">
        <header className="border border-[#e3e8ee] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(6,42,84,.04)] md:flex md:items-center md:justify-between md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center bg-[#fff0f5] text-[#e74879]">
              <UserRound className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-400">আমার Maaniko account</p>
              <h1 className="truncate text-xl font-black text-[#062a54] md:text-2xl">
                {data.customer.name ?? "Customer"}
              </h1>
              <p className="mt-0.5 text-xs text-slate-500">{data.customer.phone}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 md:mt-0">
            <Link
              href="/care-profile"
              className="inline-flex h-9 items-center justify-center border border-[#dfe5eb] bg-white px-3 text-xs font-black text-[#183b60] transition hover:bg-[#f7f9fb]"
            >
              Care Profile
            </Link>
            <button
              type="button"
              onClick={() => {
                clearCustomerIdentity();
                setData(null);
                toast.success("এই ডিভাইস থেকে profile access সরানো হয়েছে");
              }}
              className="inline-flex size-9 items-center justify-center border border-[#dfe5eb] bg-white text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              aria-label="এই ডিভাইস থেকে বের হন"
              title="এই ডিভাইস থেকে বের হন"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </header>

        <section className="mt-3 grid grid-cols-2 border border-[#e3e8ee] bg-white md:grid-cols-5">
          <Stat icon={PackageCheck} label="মোট অর্ডার" value={data.stats.orderCount} />
          <Stat icon={CheckCircle2} label="ডেলিভারি হয়েছে" value={data.stats.deliveredCount} />
          <Stat icon={ShoppingBag} label="Cart items" value={data.stats.cartItemCount} />
          <Stat icon={Heart} label="Wishlist" value={data.stats.wishlistCount} />
          <Stat
            icon={Activity}
            label="মোট অর্ডার মূল্য"
            value={money.format(data.stats.totalOrdered)}
            wide
          />
        </section>

        <section className="mt-5 border border-[#e3e8ee] bg-white shadow-[0_8px_24px_rgba(6,42,84,.035)]">
          <div className="flex items-end justify-between border-b border-[#e8edf2] px-4 py-4 md:px-5">
            <div>
              <p className="text-[11px] font-bold text-[#e74879]">Order history</p>
              <h2 className="mt-0.5 text-lg font-black text-[#062a54] md:text-xl">
                আমার অর্ডারসমূহ
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {data.orders.length}টি অর্ডার
            </span>
          </div>

          {data.orders.length === 0 ? (
            <div className="px-4 py-14 text-center">
              <PackageOpen className="mx-auto size-9 text-slate-300" />
              <p className="mt-3 text-sm font-bold text-slate-500">এখনো কোনো অর্ডার নেই</p>
              <Link
                href="/shop"
                className="mt-4 inline-flex h-9 items-center bg-[#062a54] px-4 text-xs font-black text-white"
              >
                পণ্য দেখুন
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#e8edf2]">
              {data.orders.map((order) => {
                const expanded = expandedOrderId === order.id;
                const itemCount = order.items.reduce(
                  (total, item) => total + item.quantity,
                  0,
                );
                return (
                  <article key={order.id} className="relative bg-white">
                    <div className="grid gap-3 px-4 py-4 pr-14 md:grid-cols-[minmax(155px,1fr)_minmax(190px,1.35fr)_minmax(150px,.8fr)_110px_36px] md:items-center md:px-5 md:pr-5">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-slate-400">Order ID</p>
                        <p className="mt-0.5 truncate text-sm font-black text-[#062a54]">{order.orderNumber}</p>
                        <p className="mt-1 text-[11px] text-slate-400">
                          {new Date(order.createdAt).toLocaleString("bn-BD")}
                        </p>
                      </div>

                      <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex shrink-0 -space-x-2">
                          {order.items.slice(0, 3).map((item) => (
                            <span
                              key={item.id}
                              className="grid size-9 place-items-center overflow-hidden border-2 border-white bg-[#f2f5f8] text-slate-400"
                            >
                              {item.image ? (
                                <img src={item.image} alt="" className="size-full object-cover" />
                              ) : (
                                <PackageOpen className="size-4" />
                              )}
                            </span>
                          ))}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-[#183b60]">
                            {order.items[0]?.name ?? "অর্ডারের পণ্য"}
                            {order.items.length > 1 ? ` +${order.items.length - 1}টি` : ""}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-400">মোট {itemCount}টি item</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 md:block">
                        <span className={`inline-flex px-2.5 py-1 text-[11px] font-black ${statusTone(order.status)}`}>
                          {STATUS_COPY[order.status] ?? order.status}
                        </span>
                        <p className="text-base font-black text-[#062a54] md:mt-1.5">{money.format(order.total)}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => void copyTrackingLink(order.id)}
                        disabled={copyingOrderId === order.id}
                        className="inline-flex h-9 items-center justify-center gap-1.5 border border-[#dfe5eb] bg-white px-2.5 text-[11px] font-black text-[#183b60] transition hover:bg-[#f7f9fb] disabled:opacity-60"
                      >
                        <Copy className="size-3.5" />
                        {copyingOrderId === order.id ? "তৈরি হচ্ছে" : "Link কপি"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setExpandedOrderId(expanded ? null : order.id)}
                        className="absolute right-4 top-4 grid size-9 place-items-center text-slate-500 transition hover:bg-[#f3f6f8] md:static"
                        aria-label={expanded ? "বিস্তারিত বন্ধ করুন" : "বিস্তারিত দেখুন"}
                        aria-expanded={expanded}
                      >
                        <ChevronDown className={`size-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>

                    {expanded ? (
                      <div className="border-t border-[#e8edf2] bg-[#f8fafc] px-4 py-4 md:px-5">
                        <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
                          <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.05em] text-[#183b60]">অর্ডারের পণ্য</h3>
                            <div className="mt-3 divide-y divide-[#e3e8ed] border border-[#e3e8ed] bg-white">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-start gap-3 p-3">
                                  <span className="grid size-12 shrink-0 place-items-center overflow-hidden bg-[#f2f5f8] text-slate-400">
                                    {item.image ? (
                                      <img src={item.image} alt="" className="size-full object-cover" />
                                    ) : (
                                      <PackageOpen className="size-4" />
                                    )}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-black leading-5 text-[#062a54]">{item.name}</p>
                                    <p className="mt-0.5 text-[11px] text-slate-500">
                                      {item.quantity} × {money.format(item.unitPrice)}
                                    </p>
                                    {item.customConfig?.length ? (
                                      <div className="mt-2 space-y-0.5 border-l-2 border-[#f5c8d6] pl-2">
                                        {item.customConfig.map((component) => (
                                          <p key={component.productId} className="text-[10px] text-slate-500">
                                            {component.name ?? "Box item"} × {component.quantity}
                                          </p>
                                        ))}
                                      </div>
                                    ) : null}
                                  </div>
                                  <p className="shrink-0 text-xs font-black text-[#062a54]">{money.format(item.lineTotal)}</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-2 flex justify-end gap-5 text-xs">
                              <span className="text-slate-500">Delivery: {money.format(order.deliveryCharge)}</span>
                              <span className="font-black text-[#062a54]">Total: {money.format(order.total)}</span>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.05em] text-[#183b60]">Order timeline</h3>
                            <div className="mt-3 border border-[#e3e8ed] bg-white p-3">
                              {order.history.map((history, index) => (
                                <div key={history.id} className="relative flex gap-3 pb-4 last:pb-0">
                                  {index < order.history.length - 1 ? (
                                    <span className="absolute left-[5px] top-3 h-full w-px bg-[#dce3e9]" />
                                  ) : null}
                                  <span className="relative mt-1.5 size-[11px] shrink-0 rounded-full bg-[#e74879] ring-4 ring-[#fff0f5]" />
                                  <div>
                                    <p className="text-xs font-black text-[#062a54]">{STATUS_COPY[history.status] ?? history.status}</p>
                                    {history.note ? <p className="mt-0.5 text-[11px] text-slate-500">{history.note}</p> : null}
                                    <p className="mt-0.5 text-[10px] text-slate-400">{new Date(history.createdAt).toLocaleString("bn-BD")}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {order.steadfastTrackingCode ? (
                              <div className="mt-2 border border-[#e3e8ed] bg-white px-3 py-2.5 text-[11px] leading-5 text-slate-500">
                                <strong className="text-[#183b60]">Courier:</strong> {order.steadfastStatus ?? "processing"}
                                <br />
                                <strong className="text-[#183b60]">Tracking:</strong> {order.steadfastTrackingCode}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[.75fr_1.25fr]">
          <div className="border border-[#e3e8ee] bg-white p-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-4 text-[#e74879]" />
              <h2 className="text-sm font-black text-[#062a54]">বর্তমান Cart</h2>
            </div>
            <p className="mt-2 text-xs text-slate-500">{data.stats.cartItemCount}টি item • Status: {data.cart.status}</p>
            <Link href="/shop" className="mt-4 inline-flex h-9 items-center gap-1.5 bg-[#062a54] px-3 text-xs font-black text-white">
              Shopping চালিয়ে যান
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="border border-[#e3e8ee] bg-white p-4">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-[#e74879]" />
              <h2 className="text-sm font-black text-[#062a54]">Recent activity</h2>
            </div>
            {data.activity.length ? (
              <div className="mt-3 grid max-h-48 gap-x-5 overflow-y-auto sm:grid-cols-2">
                {data.activity.map((activity) => (
                  <div key={activity.id} className="border-b border-[#edf0f3] py-2.5">
                    <p className="text-xs font-bold text-[#183b60]">{EVENT_COPY[activity.type] ?? activity.type}</p>
                    <p className="mt-0.5 truncate text-[10px] text-slate-400">
                      {new Date(activity.createdAt).toLocaleString("bn-BD")}
                      {activity.path ? ` • ${activity.path}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-xs text-slate-400">কোনো activity নেই।</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function AccountSkeleton() {
  return (
    <main className="min-h-screen bg-[#f8fafc] py-6 md:py-9">
      <div className="mx-auto max-w-7xl animate-pulse px-3.5 sm:px-5 lg:px-8">
        <div className="h-24 border border-[#e3e8ee] bg-white" />
        <div className="mt-3 grid grid-cols-2 border border-[#e3e8ee] bg-white md:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-24 border-r border-[#edf0f3] p-4">
              <div className="h-4 w-20 bg-slate-100" />
              <div className="mt-3 h-6 w-14 bg-slate-200" />
            </div>
          ))}
        </div>
        <div className="mt-5 border border-[#e3e8ee] bg-white">
          <div className="h-16 border-b border-[#e8edf2]" />
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-24 border-b border-[#e8edf2] p-4">
              <div className="h-4 w-36 bg-slate-200" />
              <div className="mt-3 h-3 w-52 bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function Stat({ icon: Icon, label, value, wide }: {
  icon: typeof PackageCheck;
  label: string;
  value: string | number;
  wide?: boolean;
}) {
  return (
    <div className={`border-b border-r border-[#edf0f3] p-3.5 last:border-r-0 md:border-b-0 md:p-4 ${wide ? "col-span-2 md:col-span-1" : ""}`}>
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="size-4 text-[#e74879]" />
        <p className="text-[10px] font-bold">{label}</p>
      </div>
      <p className="mt-2 text-lg font-black text-[#062a54] md:text-xl">{value}</p>
    </div>
  );
}
