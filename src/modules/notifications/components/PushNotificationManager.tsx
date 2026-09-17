"use client";

import { onMessage } from "firebase/messaging";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BellRing,
  ChevronRight,
  Loader2,
  PackageCheck,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

import { commerceApi, type PushInboxItem } from "@/modules/commerce/lib/client";
import {
  createFcmToken,
  getFirebaseMessaging,
} from "@/modules/notifications/lib/firebase";

const TOKEN_KEY = "maaniko-fcm-token";
const OFFERS_KEY = "maaniko-push-offers";
const LAST_READ_KEY = "maaniko-notifications-last-read-at";

function dateLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function NotificationTrigger({
  subscribed,
  unreadCount,
  onClick,
}: {
  subscribed: boolean;
  unreadCount: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`নোটিফিকেশন${unreadCount ? `, ${unreadCount}টি নতুন` : ""}`}
      title="নোটিফিকেশন"
      className="relative inline-flex size-10 items-center justify-center rounded-full text-maaniko-navy transition-colors hover:bg-maaniko-blush hover:text-maaniko-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maaniko-pink"
    >
      {subscribed ? (
        <BellRing className="size-[22px]" strokeWidth={1.8} />
      ) : (
        <Bell className="size-[22px]" strokeWidth={1.8} />
      )}
      {unreadCount > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex min-h-[17px] min-w-[17px] items-center justify-center rounded-full bg-maaniko-pink px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      ) : subscribed ? (
        <span className="absolute right-1 top-1 size-2 rounded-full bg-emerald-500 ring-2 ring-white" />
      ) : null}
    </button>
  );
}

export default function PushNotificationManager() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [supported, setSupported] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [allowOffers, setAllowOffers] = useState(true);
  const [busy, setBusy] = useState(false);
  const [loadingInbox, setLoadingInbox] = useState(true);
  const [notifications, setNotifications] = useState<PushInboxItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadInbox = useCallback(async () => {
    try {
      const result = await commerceApi.getPushInbox();
      setNotifications(result.notifications);
      const lastRead = Number(window.localStorage.getItem(LAST_READ_KEY) ?? 0);
      setUnreadCount(
        result.notifications.filter(
          (item) => new Date(item.createdAt).getTime() > lastRead,
        ).length,
      );
    } catch {
      setNotifications([]);
    } finally {
      setLoadingInbox(false);
    }
  }, []);

  useEffect(() => {
    const readyId = window.setTimeout(() => {
      setMounted(true);
      setAllowOffers(window.localStorage.getItem(OFFERS_KEY) !== "false");
      void loadInbox();
    }, 0);
    return () => window.clearTimeout(readyId);
  }, [loadInbox]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      if (!("Notification" in window) || !("serviceWorker" in navigator)) return;
      const messaging = await getFirebaseMessaging();
      if (!messaging || cancelled) return;

      setSupported(true);
      const savedToken = window.localStorage.getItem(TOKEN_KEY);
      const savedOffers = window.localStorage.getItem(OFFERS_KEY) !== "false";
      setSubscribed(Notification.permission === "granted" && Boolean(savedToken));

      if (Notification.permission === "granted") {
        try {
          const token = await createFcmToken();
          if (cancelled) return;
          window.localStorage.setItem(TOKEN_KEY, token);
          await commerceApi.registerPushDevice({
            token,
            allowOffers: savedOffers,
            platform: /iPad|iPhone|iPod/.test(navigator.userAgent) ? "ios-web" : "web",
            userAgent: navigator.userAgent,
          });
          if (!cancelled) setSubscribed(true);
        } catch {
          // Inbox remains usable when a temporary FCM refresh fails.
        }
      }

      unsubscribe = onMessage(messaging, (payload) => {
        const title = payload.notification?.title ?? "Maaniko update";
        const description = payload.notification?.body ?? "নতুন একটি আপডেট এসেছে।";
        const link = payload.data?.link;
        void loadInbox();
        toast(title, {
          description,
          action: link
            ? { label: "দেখুন", onClick: () => window.location.assign(link) }
            : undefined,
        });
      });
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [loadInbox]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const portals = useMemo(() => {
    if (!mounted) return [];
    return ["desktop-notification-slot", "mobile-notification-slot"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
  }, [mounted]);

  function openDrawer() {
    setOpen(true);
    setUnreadCount(0);
    window.localStorage.setItem(LAST_READ_KEY, String(Date.now()));
    void loadInbox();
  }

  async function enableNotifications() {
    if (!supported) {
      toast.error(
        /iPad|iPhone|iPod/.test(navigator.userAgent)
          ? "আগে Maaniko Home Screen-এ যোগ করে app থেকে notification চালু করুন"
          : "এই browser-এ push notification supported নয়",
      );
      return;
    }
    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Browser settings থেকে notification permission চালু করুন");
      }
      const token = await createFcmToken();
      await commerceApi.registerPushDevice({
        token,
        allowOffers,
        platform: /iPad|iPhone|iPod/.test(navigator.userAgent) ? "ios-web" : "web",
        userAgent: navigator.userAgent,
      });
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(OFFERS_KEY, String(allowOffers));
      setSubscribed(true);
      toast.success("নোটিফিকেশন চালু হয়েছে");
    } catch (reason) {
      toast.error(reason instanceof Error ? reason.message : "নোটিফিকেশন চালু হয়নি");
    } finally {
      setBusy(false);
    }
  }

  async function disableNotifications() {
    setBusy(true);
    try {
      const token = window.localStorage.getItem(TOKEN_KEY);
      if (token) await commerceApi.unregisterPushDevice(token);
      window.localStorage.removeItem(TOKEN_KEY);
      setSubscribed(false);
      toast.success("Push notification বন্ধ করা হয়েছে");
    } catch {
      toast.error("নোটিফিকেশন বন্ধ করা যায়নি");
    } finally {
      setBusy(false);
    }
  }

  async function changeOffers(nextValue: boolean) {
    setAllowOffers(nextValue);
    window.localStorage.setItem(OFFERS_KEY, String(nextValue));
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!subscribed || !token) return;

    try {
      await commerceApi.registerPushDevice({
        token,
        allowOffers: nextValue,
        platform: /iPad|iPhone|iPod/.test(navigator.userAgent) ? "ios-web" : "web",
        userAgent: navigator.userAgent,
      });
      toast.success(nextValue ? "অফারের notification চালু হয়েছে" : "অফারের notification বন্ধ হয়েছে");
    } catch {
      setAllowOffers(!nextValue);
      window.localStorage.setItem(OFFERS_KEY, String(!nextValue));
      toast.error("পছন্দটি সেভ করা যায়নি");
    }
  }

  if (!mounted) return null;

  return (
    <>
      {portals.map((target) =>
        createPortal(
          <NotificationTrigger
            subscribed={subscribed}
            unreadCount={unreadCount}
            onClick={openDrawer}
          />,
          target,
        ),
      )}

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[160] bg-maaniko-navy/35 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="notification-drawer-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 38 }}
              className="ml-auto flex h-full w-[min(92vw,420px)] flex-col bg-white shadow-[-18px_0_55px_rgba(6,42,84,.2)]"
            >
              <header className="flex min-h-[68px] items-center justify-between border-b border-maaniko-line px-4 sm:px-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-maaniko-blush text-maaniko-pink">
                    <BellRing className="size-5" />
                  </span>
                  <div>
                    <h2 id="notification-drawer-title" className="font-baloo text-lg font-bold leading-tight text-maaniko-navy">
                      নোটিফিকেশন
                    </h2>
                    <p className="text-[11px] text-slate-400">অর্ডার আপডেট ও প্রয়োজনীয় খবর</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="নোটিফিকেশন বন্ধ করুন"
                  className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                >
                  <X className="size-4" />
                </button>
              </header>

              <div className="border-b border-maaniko-line bg-[#fbfcfe] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-slate-200">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eef8f3] text-emerald-600">
                      <Settings2 className="size-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-maaniko-navy">Push notification</p>
                      <p className="truncate text-[11px] text-slate-400">
                        {subscribed ? "এই ডিভাইসে চালু আছে" : "এই ডিভাইসে বন্ধ আছে"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={subscribed}
                    disabled={busy}
                    onClick={() => void (subscribed ? disableNotifications() : enableNotifications())}
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-50 ${subscribed ? "bg-emerald-500" : "bg-slate-300"}`}
                  >
                    {busy ? (
                      <Loader2 className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 animate-spin text-white" />
                    ) : (
                      <span className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition-transform ${subscribed ? "translate-x-6" : "translate-x-1"}`} />
                    )}
                  </button>
                </div>

                <label className="mt-2.5 flex cursor-pointer items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-slate-600">
                  <span>অফার ও ছাড়ের খবর পেতে চাই</span>
                  <input
                    type="checkbox"
                    checked={allowOffers}
                    onChange={(event) => void changeOffers(event.target.checked)}
                    className="size-4 accent-maaniko-pink"
                  />
                </label>

                {!supported ? (
                  <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-[11px] leading-5 text-amber-700">
                    iPhone/iPad-এ push পেতে আগে Maaniko Home Screen-এ যোগ করে সেখান থেকে app খুলুন। Notification history এখানে সবসময় দেখা যাবে।
                  </p>
                ) : null}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-[0.06em] text-slate-400">আগের নোটিফিকেশন</h3>
                  <span className="text-[11px] text-slate-400">সর্বশেষ {notifications.length}টি</span>
                </div>

                {loadingInbox ? (
                  <div className="grid min-h-40 place-items-center text-slate-400">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                ) : notifications.length ? (
                  <div className="space-y-2.5">
                    {notifications.map((item) => {
                      const isOrder = item.type === "ORDER_STATUS";
                      const content = (
                        <>
                          <span className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl ${isOrder ? "bg-blue-50 text-[#03A7FD]" : "bg-pink-50 text-maaniko-pink"}`}>
                            {isOrder ? <PackageCheck className="size-[18px]" /> : <Sparkles className="size-[18px]" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-bold leading-5 text-maaniko-navy">{item.title}</span>
                            <span className="mt-1 block text-xs leading-5 text-slate-500">{item.body}</span>
                            <span className="mt-1.5 block text-[10px] text-slate-400">{dateLabel(item.createdAt)}</span>
                          </span>
                          {item.link ? <ChevronRight className="mt-2 size-4 shrink-0 text-slate-300" /> : null}
                        </>
                      );

                      return item.link ? (
                        <a
                          key={item.id}
                          href={item.link}
                          onClick={() => setOpen(false)}
                          className="flex gap-3 rounded-2xl border border-slate-100 p-3.5 transition hover:border-pink-100 hover:bg-pink-50/30"
                        >
                          {content}
                        </a>
                      ) : (
                        <div key={item.id} className="flex gap-3 rounded-2xl border border-slate-100 p-3.5">
                          {content}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid min-h-48 place-items-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center">
                    <div>
                      <Bell className="mx-auto size-8 text-slate-300" />
                      <p className="mt-3 text-sm font-bold text-slate-500">এখনো কোনো নোটিফিকেশন নেই</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">নতুন অর্ডার আপডেট বা প্রয়োজনীয় খবর এখানে দেখা যাবে।</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
