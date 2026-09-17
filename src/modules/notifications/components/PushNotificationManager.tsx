"use client";

import { Bell, BellRing, Loader2, X } from "lucide-react";
import { onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { commerceApi } from "@/modules/commerce/lib/client";
import {
  createFcmToken,
  getFirebaseMessaging,
} from "@/modules/notifications/lib/firebase";

const TOKEN_KEY = "maaniko-fcm-token";
const DISMISSED_KEY = "maaniko-push-prompt-dismissed";
const OFFERS_KEY = "maaniko-push-offers";

export default function PushNotificationManager() {
  const [supported, setSupported] = useState(false);
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [allowOffers, setAllowOffers] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    void (async () => {
      if (!("Notification" in window) || !("serviceWorker" in navigator)) return;
      const messaging = await getFirebaseMessaging();
      if (!messaging) return;

      setSupported(true);
      const savedToken = window.localStorage.getItem(TOKEN_KEY);
      const savedOffers = window.localStorage.getItem(OFFERS_KEY) !== "false";
      setAllowOffers(savedOffers);
      setSubscribed(Notification.permission === "granted" && Boolean(savedToken));

      if (
        Notification.permission === "default" &&
        window.localStorage.getItem(DISMISSED_KEY) !== "true"
      ) {
        const timer = window.setTimeout(() => setOpen(true), 2500);
        return () => window.clearTimeout(timer);
      }

      if (Notification.permission === "granted") {
        try {
          const token = await createFcmToken();
          window.localStorage.setItem(TOKEN_KEY, token);
          await commerceApi.registerPushDevice({
            token,
            allowOffers: savedOffers,
            platform: "web",
            userAgent: navigator.userAgent,
          });
          setSubscribed(true);
        } catch {
          // A temporary token refresh failure must not interrupt the storefront.
        }
      }

      unsubscribe = onMessage(messaging, (payload) => {
        const title = payload.notification?.title ?? "Maaniko update";
        const description = payload.notification?.body ?? "নতুন একটি আপডেট এসেছে।";
        const link = payload.data?.link;
        toast(title, {
          description,
          action: link
            ? {
                label: "দেখুন",
                onClick: () => window.location.assign(link),
              }
            : undefined,
        });
      });
    })();

    return () => unsubscribe?.();
  }, []);

  async function enableNotifications() {
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
        platform: "web",
        userAgent: navigator.userAgent,
      });
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(OFFERS_KEY, String(allowOffers));
      window.localStorage.removeItem(DISMISSED_KEY);
      setSubscribed(true);
      setOpen(false);
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
      setOpen(false);
      toast.success("Maaniko notification বন্ধ করা হয়েছে");
    } catch {
      toast.error("নোটিফিকেশন বন্ধ করা যায়নি");
    } finally {
      setBusy(false);
    }
  }

  function dismiss() {
    window.localStorage.setItem(DISMISSED_KEY, "true");
    setOpen(false);
  }

  if (!supported) return null;

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-[84px] left-3 z-[70] grid size-11 place-items-center rounded-2xl border border-pink-100 bg-white text-[#ef4277] shadow-[0_10px_35px_rgba(6,42,84,.16)] transition hover:-translate-y-0.5 md:bottom-5 md:left-5"
          aria-label="নোটিফিকেশন সেটিংস"
        >
          {subscribed ? <BellRing className="size-5" /> : <Bell className="size-5" />}
          {subscribed ? (
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          ) : null}
        </button>
      ) : (
        <section className="fixed bottom-[84px] left-3 right-3 z-[80] max-w-sm rounded-3xl border border-pink-100 bg-white p-4 shadow-[0_22px_60px_rgba(6,42,84,.2)] md:bottom-5 md:left-5 md:right-auto">
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-3 top-3 grid size-8 place-items-center rounded-xl bg-slate-100 text-slate-500"
            aria-label="বন্ধ করুন"
          >
            <X className="size-4" />
          </button>

          <div className="flex gap-3 pr-8">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-pink-50 text-[#ef4277]">
              <BellRing className="size-5" />
            </span>
            <div>
              <h2 className="font-baloo text-lg font-bold text-[#062a54]">
                {subscribed ? "নোটিফিকেশন চালু আছে" : "গুরুত্বপূর্ণ আপডেট পান"}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                অর্ডারের অবস্থা ও Maaniko-এর প্রয়োজনীয় অফার জানতে পারবেন।
              </p>
            </div>
          </div>

          {!subscribed ? (
            <label className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-600">
              <input
                type="checkbox"
                checked={allowOffers}
                onChange={(event) => setAllowOffers(event.target.checked)}
                className="size-4 accent-[#ef4277]"
              />
              অফার ও ছাড়ের খবরও পেতে চাই
            </label>
          ) : null}

          <div className="mt-4 flex gap-2">
            {subscribed ? (
              <button
                type="button"
                disabled={busy}
                onClick={() => void disableNotifications()}
                className="h-11 flex-1 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-600 disabled:opacity-50"
              >
                বন্ধ করুন
              </button>
            ) : (
              <button
                type="button"
                disabled={busy}
                onClick={() => void enableNotifications()}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#ef4277] px-4 text-sm font-bold text-white disabled:opacity-50"
              >
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Bell className="size-4" />}
                নোটিফিকেশন চালু করুন
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
}
