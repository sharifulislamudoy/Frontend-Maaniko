"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  BookOpenText,
  ChevronRight,
  Gift,
  Heart,
  HeartPulse,
  Lightbulb,
  Package,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useShop } from "@/modules/shop/context/ShopContext";

type ProfileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const profileRoutes = [
  { label: "আমার অর্ডার", description: "অর্ডার ও ডেলিভারি দেখুন", href: "/orders", icon: Package },
  { label: "Rewards ও Referral", description: "পয়েন্ট ও রেফারেল সুবিধা", href: "/rewards", icon: Gift },
  { label: "আমার Care Profile", description: "আপনার প্রয়োজন সংরক্ষণ করুন", href: "/care-profile", icon: HeartPulse },
  { label: "প্রয়োজনীয় গাইড", description: "মা ও শিশুর যত্নের গাইড", href: "/guide", icon: BookOpenText },
  { label: "সমস্যা ও সমাধান", description: "সমস্যা অনুযায়ী সমাধান খুঁজুন", href: "/problem-solution", icon: Lightbulb },
  { label: "পছন্দের তালিকা", description: "সেভ করা পণ্যগুলো দেখুন", href: "/wishlist", icon: Heart },
] as const;

function isRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function ProfileDrawer({ open, onClose }: ProfileDrawerProps) {
  const pathname = usePathname();
  const { wishlistCount } = useShop();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 size-full bg-maaniko-navy/35 backdrop-blur-[2px]"
            onClick={onClose}
            aria-label="প্রোফাইল মেনু বন্ধ করুন"
          />

          <motion.aside
            id="maaniko-profile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="আমার Maaniko"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 38 }}
            className="absolute right-0 top-0 flex h-full w-[min(92vw,400px)] flex-col bg-white shadow-[-18px_0_55px_rgba(6,42,84,.2)]"
          >
            <div className="flex min-h-[76px] items-center justify-between border-b border-maaniko-line px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-maaniko-blush text-maaniko-pink">
                  <UserRound className="size-5" strokeWidth={1.9} />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-black text-maaniko-navy">আমার Maaniko</h2>
                  <p className="truncate text-xs text-slate-500">আপনার প্রয়োজনীয় সবকিছু এক জায়গায়</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-maaniko-navy transition hover:bg-slate-200"
                aria-label="প্রোফাইল মেনু বন্ধ করুন"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav aria-label="প্রোফাইল সম্পর্কিত পেজ" className="flex-1 overflow-y-auto p-3 sm:p-4">
              <div className="space-y-1.5">
                {profileRoutes.map((item, index) => {
                  const Icon = item.icon;
                  const active = isRouteActive(pathname, item.href);
                  const badge = item.href === "/wishlist" ? wishlistCount : 0;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.035 * index, duration: 0.18 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={`group flex min-h-[64px] items-center gap-3 rounded-2xl border px-3.5 py-3 transition-colors ${
                          active
                            ? "border-maaniko-pink/20 bg-maaniko-blush text-maaniko-pink"
                            : "border-transparent text-maaniko-navy hover:border-maaniko-line hover:bg-slate-50"
                        }`}
                      >
                        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${active ? "bg-white" : "bg-slate-100 group-hover:bg-white"}`}>
                          <Icon className="size-[19px]" strokeWidth={1.8} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2 text-sm font-extrabold">
                            <span className="truncate">{item.label}</span>
                            {badge > 0 ? (
                              <span className="flex min-h-5 min-w-5 items-center justify-center rounded-full bg-maaniko-pink px-1.5 text-[10px] font-black text-white">
                                {badge > 99 ? "99+" : badge}
                              </span>
                            ) : null}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] font-medium text-slate-500">{item.description}</span>
                        </span>
                        <ChevronRight className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-maaniko-pink" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
