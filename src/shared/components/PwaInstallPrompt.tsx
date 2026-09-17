"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, MoreVertical, Share, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISSED_AT_KEY = "maaniko-pwa-prompt-dismissed-at";
const INSTALLED_KEY = "maaniko-pwa-installed";
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  const iosStandalone = Boolean(
    (window.navigator as Navigator & { standalone?: boolean }).standalone,
  );
  return window.matchMedia("(display-mode: standalone)").matches || iosStandalone;
}

function getIosBrowser() {
  if (typeof window === "undefined") return null;
  const agent = window.navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(agent);
  if (!isIos) return null;
  if (/CriOS/.test(agent)) return "chrome" as const;
  if (/FxiOS/.test(agent)) return "firefox" as const;
  if (/EdgiOS/.test(agent)) return "edge" as const;
  return "safari" as const;
}

function canShowPrompt() {
  try {
    const dismissedAt = Number(window.localStorage.getItem(DISMISSED_AT_KEY));
    return !Number.isFinite(dismissedAt) || Date.now() - dismissedAt >= ONE_WEEK;
  } catch {
    return true;
  }
}

export default function PwaInstallPrompt() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [iosBrowser, setIosBrowser] = useState<
    "chrome" | "safari" | "firefox" | "edge" | null
  >(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js");
    }

    if (isStandalone()) {
      window.localStorage.setItem(INSTALLED_KEY, "true");
      return;
    }

    window.localStorage.removeItem(INSTALLED_KEY);
    const detectedIosBrowser = getIosBrowser();

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      const deferredEvent = event as BeforeInstallPromptEvent;
      setInstallEvent(deferredEvent);
      if (canShowPrompt()) setOpen(true);
    };

    const handleInstalled = () => {
      window.localStorage.setItem(INSTALLED_KEY, "true");
      window.localStorage.removeItem(DISMISSED_AT_KEY);
      setInstallEvent(null);
      setOpen(false);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    let iosTimer: number | undefined;
    if (detectedIosBrowser) {
      iosTimer = window.setTimeout(() => {
        setIosBrowser(detectedIosBrowser);
        if (canShowPrompt()) setOpen(true);
      }, 1200);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
      if (iosTimer) window.clearTimeout(iosTimer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function dismiss() {
    try {
      window.localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
    } catch {
      // The prompt can still close when storage is unavailable.
    }
    setOpen(false);
  }

  async function install() {
    if (iosBrowser || !installEvent) return;
    setInstalling(true);
    try {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      if (choice.outcome === "accepted") {
        window.localStorage.setItem(INSTALLED_KEY, "true");
        window.localStorage.removeItem(DISMISSED_AT_KEY);
      } else {
        window.localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
      }
      setInstallEvent(null);
      setOpen(false);
    } finally {
      setInstalling(false);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center bg-[#03182e]/55 p-0 backdrop-blur-[3px] sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) dismiss();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-install-title"
            initial={{ y: 50, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 330, damping: 30 }}
            className="relative w-full overflow-hidden rounded-t-[28px] bg-white shadow-[0_24px_70px_rgba(3,24,46,.25)] sm:max-w-md sm:rounded-3xl"
          >
            <div className="h-1.5 bg-gradient-to-r from-[#FC5689] to-[#03A7FD]" />
            <button
              type="button"
              onClick={dismiss}
              aria-label="Install message বন্ধ করুন"
              className="absolute right-4 top-5 grid size-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-[#062a54]"
            >
              <X className="size-4" />
            </button>

            <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 sm:p-7">
              <div className="flex items-center gap-4 pr-10">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#fff0f5] to-[#eaf8ff] text-[#FC5689] ring-1 ring-[#f4dce5]">
                  <Smartphone className="size-7" />
                </span>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.08em] text-[#FC5689]">
                    Maaniko App
                  </p>
                  <h2 id="pwa-install-title" className="mt-0.5 text-xl font-black text-[#062a54]">
                    Maaniko ডিভাইসে রাখুন
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                হোম স্ক্রিন থেকে এক ট্যাপে Maaniko খুলুন। ব্রাউজার খোঁজার ঝামেলা ছাড়াই দ্রুত পণ্য, অর্ডার ও প্রয়োজনীয় গাইড দেখুন।
              </p>

              {iosBrowser ? (
                <div className="mt-5 space-y-3 rounded-2xl bg-[#f7f9fc] p-4 ring-1 ring-[#e7edf3]">
                  <p className="text-xs font-black text-[#062a54]">
                    {iosBrowser === "chrome"
                      ? "iPhone Chrome থেকে ইনস্টল করুন"
                      : "iPhone বা iPad-এ ইনস্টল করুন"}
                  </p>
                  <div className="flex items-center gap-3 text-xs leading-5 text-slate-600">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white text-[#03A7FD] shadow-sm"><Share className="size-4" /></span>
                    <span>
                      {iosBrowser === "chrome" ? (
                        <>Chrome address bar-এর পাশের <strong>Share</strong> বাটনে চাপুন</>
                      ) : (
                        <>Browser-এর <strong>Share</strong> বাটনে চাপুন</>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs leading-5 text-slate-600">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white text-[#FC5689] shadow-sm"><MoreVertical className="size-4" /></span>
                    <span><strong>Add to Home Screen</strong> নির্বাচন করে Add চাপুন</span>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 grid grid-cols-[.82fr_1.18fr] gap-3">
                <button
                  type="button"
                  onClick={dismiss}
                  className="h-11 rounded-xl border border-[#dfe6ed] bg-white text-sm font-black text-slate-500 transition hover:bg-slate-50"
                >
                  এখন নয়
                </button>
                {iosBrowser ? (
                  <button
                    type="button"
                    onClick={dismiss}
                    className="h-11 rounded-xl bg-[#062a54] text-sm font-black text-white transition hover:bg-[#0a3a6c]"
                  >
                    বুঝেছি
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void install()}
                    disabled={installing || !installEvent}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#FC5689] text-sm font-black text-white shadow-[0_8px_22px_rgba(252,86,137,.24)] transition hover:bg-[#e9487b] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Download className="size-4" />
                    {installing ? "ইনস্টল হচ্ছে..." : "Install করুন"}
                  </button>
                )}
              </div>
              <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
                এখন না বললে ইনস্টল না থাকা অবস্থায় ৭ দিন পর আবার মনে করিয়ে দেব।
              </p>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
