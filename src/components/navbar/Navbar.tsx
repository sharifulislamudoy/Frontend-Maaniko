"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Check,
  Heart,
  House,
  Languages,
  LayoutGrid,
  Package,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

import CartDrawer from "@/components/cart/CartDrawer";
import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";
import { LANGUAGE_OPTIONS } from "@/i18n/config";
import type {
  AnimatedMenuButtonProps,
  BrandLogoProps,
  CountBadgeProps,
  NavigationItem,
} from "@/types/navigation";

const informationRoutes = [
  { key: "about", href: "/about-us" },
  { key: "contact", href: "/contact-us" },
  { key: "faq", href: "/faq" },
  { key: "returns", href: "/return-refund-policy" },
  { key: "shipping", href: "/shipping-policy" },
] as const;

const policyRoutes = [
  { key: "privacy", href: "/privacy-policy" },
  { key: "terms", href: "/terms-and-conditions" },
] as const;

const drawerVariants = {
  closed: { x: "-100%" },
  open: {
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 360,
      damping: 36,
    },
  },
  exit: {
    x: "-100%",
    transition: {
      duration: 0.22,
      ease: "easeInOut" as const,
    },
  },
};

const drawerContentVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.035,
    },
  },
};

const drawerItemVariants = {
  closed: {
    opacity: 0,
    x: -10,
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.18,
    },
  },
};

function isRouteActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Maaniko home"
      className={`relative block shrink-0 overflow-hidden ${className}`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload={priority ? "auto" : "metadata"}
        poster="/Logo.png"
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover object-center"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </Link>
  );
}

function CountBadge({ count }: CountBadgeProps) {
  if (count <= 0) return null;

  return (
    <span className="absolute -right-0.5 -top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-maaniko-pink px-1 text-[9px] font-bold leading-none text-white sm:min-h-[18px] sm:min-w-[18px] sm:text-[10px]">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function AnimatedMenuButton({
  open,
  label,
  controls,
  onClick,
}: AnimatedMenuButtonProps) {
  const commonClass =
    "absolute left-1/2 h-0.5 w-[22px] -translate-x-1/2 rounded-full bg-current";

  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full text-maaniko-navy transition-colors hover:bg-maaniko-blush focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maaniko-pink"
    >
      <motion.span
        className={commonClass}
        animate={open ? { y: 0, rotate: 45 } : { y: -7, rotate: 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.span
        className={commonClass}
        animate={
          open
            ? { opacity: 0, scaleX: 0 }
            : { opacity: 1, scaleX: 1 }
        }
        transition={{ duration: 0.15 }}
      />

      <motion.span
        className={commonClass}
        animate={open ? { y: 0, rotate: -45 } : { y: 7, rotate: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}

function DrawerLanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.section
      variants={drawerItemVariants}
      aria-label={t("actions.selectLanguage")}
      className="mb-5 rounded-xl border border-maaniko-line bg-slate-50 p-2"
    >
      <div className="mb-2 flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-[0.08em] text-slate-400">
        <Languages className="size-4" strokeWidth={1.9} />
        <span>{t("drawer.language")}</span>
      </div>

      <div className="relative grid grid-cols-2 rounded-lg bg-white p-1 shadow-sm">
        {LANGUAGE_OPTIONS.map((option) => {
          const selected = option.code === language;

          return (
            <button
              key={option.code}
              type="button"
              aria-pressed={selected}
              onClick={() => setLanguage(option.code)}
              className={`relative z-10 flex h-10 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-semibold transition-colors ${selected
                  ? "text-maaniko-pink"
                  : "text-maaniko-navy hover:text-maaniko-pink"
                }`}
            >
              {selected && (
                <motion.span
                  layoutId="drawer-language-indicator"
                  className="absolute inset-0 -z-10 rounded-md bg-maaniko-blush"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 34,
                  }}
                />
              )}

              <span>{option.label}</span>

              {selected && (
                <Check className="size-4" strokeWidth={2.2} />
              )}
            </button>
          );
        })}
      </div>
    </motion.section>
  );
}

function ServiceBar() {
  const { t } = useLanguage();

  const serviceItems = [
    {
      label: t("service.delivery"),
      icon: Truck,
    },
    {
      label: t("service.promise"),
      icon: Heart,
    },
    {
      label: t("service.help"),
      icon: Phone,
      href: "tel:+8801712345678",
    },
  ];

  return (
    <div className="border-b border-[#f7dce5] bg-maaniko-blush">
      <div className="mx-auto grid min-h-[52px] w-full max-w-7xl grid-cols-3 items-center gap-1 px-2.5 sm:min-h-12 sm:gap-5 sm:px-6 xl:min-h-11 xl:px-8">
        {serviceItems.map((item, index) => {
          const Icon = item.icon;

          const alignment =
            index === 0
              ? "justify-self-start text-start"
              : index === 1
                ? "justify-self-center text-center"
                : "justify-self-end text-end";

          const className = `flex min-w-0 max-w-[112px] items-center gap-1 text-[9px] font-medium leading-[1.15] text-maaniko-navy sm:max-w-none sm:gap-2 sm:text-[11px] xl:gap-2.5 xl:text-[13px] ${alignment}`;

          const content = (
            <>
              <Icon
                aria-hidden="true"
                className="size-3.5 shrink-0 text-maaniko-pink sm:size-4 xl:size-[18px]"
                strokeWidth={1.9}
              />

              <span className="min-w-0 text-balance">
                {item.label}
              </span>
            </>
          );

          return item.href ? (
            <a
              key={item.label}
              href={item.href}
              className={`${className} transition-colors hover:text-maaniko-pink`}
            >
              {content}
            </a>
          ) : (
            <div key={item.label} className={className}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { cartCount, wishlistCount, openCart } = useShop();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const desktopNavigation = [
    {
      label: t("nav.home"),
      href: "/",
    },
    {
      label: t("nav.shop"),
      href: "/maaniko-collection",
    },
    {
      label: t("nav.guide"),
      href: "/guide",
    },
  ];

  const bottomNavigation: NavigationItem[] = [
    {
      label: t("nav.home"),
      href: "/",
      icon: House,
    },
    {
      label: t("nav.shop"),
      href: "/maaniko-collection",
      icon: LayoutGrid,
    },
    {
      label: t("nav.wishlist"),
      href: "/wishlist",
      icon: Heart,
      badgeCount: wishlistCount,
    },
    {
      label: t("nav.guide"),
      href: "/guide",
      icon: BookOpen,
    },
    {
      label: t("nav.orders"),
      href: "/orders",
      icon: Package,
    },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [isMenuOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <header className="sticky top-0 z-50 border-b border-maaniko-line bg-white shadow-[0_3px_14px_rgba(6,42,84,0.035)]">
        <ServiceBar />

        {/* Desktop navbar */}
        <div className="mx-auto hidden h-20 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-5 px-6 xl:grid">
          <div className="flex items-center gap-3">
            <AnimatedMenuButton
              open={isMenuOpen}
              label={t("actions.openMenu")}
              controls="maaniko-side-menu"
              onClick={() => setIsMenuOpen(true)}
            />

            <BrandLogo
              className="h-10 w-[132px]"
              priority
            />
          </div>

          <nav
            aria-label="Primary navigation"
            className="flex h-full items-center justify-center gap-8 2xl:gap-10"
          >
            {desktopNavigation.map((item) => {
              const active = isRouteActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex h-full items-center px-1 text-[15px] font-semibold transition-colors ${active
                      ? "text-maaniko-pink"
                      : "text-maaniko-navy hover:text-maaniko-pink"
                    }`}
                >
                  {item.label}

                  {active && (
                    <motion.span
                      layoutId="desktop-navigation-indicator"
                      className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-maaniko-pink"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/wishlist"
              aria-label={t("nav.wishlist")}
              title={t("nav.wishlist")}
              className={`relative inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-maaniko-blush ${isRouteActive(pathname, "/wishlist")
                  ? "text-maaniko-pink"
                  : "text-maaniko-navy"
                }`}
            >
              <Heart
                className="size-[23px]"
                strokeWidth={1.8}
              />

              <CountBadge count={wishlistCount} />
            </Link>

            <Link
              href="/orders"
              aria-label={t("nav.orders")}
              title={t("nav.orders")}
              className={`inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-maaniko-blush ${isRouteActive(pathname, "/orders")
                  ? "text-maaniko-pink"
                  : "text-maaniko-navy"
                }`}
            >
              <Package
                className="size-[23px]"
                strokeWidth={1.8}
              />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={t("actions.cartWithCount", {
                count: cartCount,
              })}
              title={t("actions.cart")}
              className="relative inline-flex size-10 items-center justify-center rounded-full text-maaniko-navy transition-colors hover:bg-maaniko-blush hover:text-maaniko-pink"
            >
              <ShoppingBag
                className="size-[23px]"
                strokeWidth={1.8}
              />

              <CountBadge count={cartCount} />
            </button>
          </div>
        </div>

        {/* Tablet and mobile navbar */}
        <div className="xl:hidden">
          <div className="mx-auto grid h-[50px] w-full max-w-5xl grid-cols-[40px_1fr_40px] items-center gap-2 px-3.5 sm:h-[72px] sm:px-6">
            <AnimatedMenuButton
              open={isMenuOpen}
              label={t("actions.openMenu")}
              controls="maaniko-side-menu"
              onClick={() => setIsMenuOpen(true)}
            />

            <BrandLogo
              className="h-9 w-[108px] justify-self-center sm:h-10 sm:w-32"
              priority
            />

            <button
              type="button"
              onClick={openCart}
              aria-label={t("actions.cartWithCount", {
                count: cartCount,
              })}
              className="relative inline-flex size-10 items-center justify-center justify-self-end rounded-full text-maaniko-navy transition-colors hover:bg-maaniko-blush hover:text-maaniko-pink"
            >
              <ShoppingBag
                className="size-6"
                strokeWidth={1.8}
              />

              <CountBadge count={cartCount} />
            </button>
          </div>
        </div>
      </header>

      {/* Tablet and mobile bottom navigation */}
      <nav
        aria-label="Bottom navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-maaniko-line bg-white/95 shadow-[0_-5px_18px_rgba(6,42,84,0.045)] backdrop-blur-xl xl:hidden"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="mx-auto grid h-[72px] max-w-5xl grid-cols-5 sm:h-[76px]">
          {bottomNavigation.map((item) => {
            const Icon = item.icon;
            const active = isRouteActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-w-0 flex-col items-center justify-center gap-1 px-0.5 font-medium transition-colors ${active
                    ? "text-maaniko-pink"
                    : "text-maaniko-navy hover:text-maaniko-pink"
                  }`}
              >
                {active && (
                  <motion.span
                    layoutId="bottom-navigation-indicator"
                    className="absolute bottom-1 h-[3px] w-9 rounded-full bg-maaniko-pink"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                  />
                )}

                <motion.span
                  whileTap={{ scale: 0.82 }}
                  className="relative flex flex-col items-center gap-1"
                >
                  <span className="relative">
                    <Icon
                      className="size-[23px] sm:size-6"
                      strokeWidth={1.8}
                    />

                    <CountBadge
                      count={item.badgeCount ?? 0}
                    />
                  </span>

                  <span className="max-w-full truncate text-[11px] leading-none sm:text-xs">
                    {item.label}
                  </span>
                </motion.span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Side drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[80]"
            initial="closed"
            animate="open"
            exit="exit"
          >
            <motion.button
              type="button"
              aria-label={t("actions.closeMenu")}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 h-full w-full bg-maaniko-navy/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            />

            <motion.aside
              id="maaniko-side-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Maaniko menu"
              variants={drawerVariants}
              className="relative z-10 flex h-full w-[min(86vw,360px)] flex-col overflow-y-auto bg-white shadow-[12px_0_40px_rgba(6,42,84,0.18)]"
            >
              <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-maaniko-line px-4">
                <BrandLogo className="h-9 w-32" />

                <AnimatedMenuButton
                  open
                  label={t("actions.closeMenu")}
                  controls="maaniko-side-menu"
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>

              <motion.div
                variants={drawerContentVariants}
                initial="closed"
                animate="open"
                className="flex-1 px-3 py-5"
              >
                <DrawerLanguageToggle />

                <motion.p
                  variants={drawerItemVariants}
                  className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400"
                >
                  {t("drawer.information")}
                </motion.p>

                <div className="space-y-0.5">
                  {informationRoutes.map((item) => (
                    <motion.div
                      key={item.href}
                      variants={drawerItemVariants}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isRouteActive(pathname, item.href)
                            ? "bg-maaniko-blush text-maaniko-pink"
                            : "text-maaniko-navy hover:bg-maaniko-blush hover:text-maaniko-pink"
                          }`}
                      >
                        {t(`drawer.${item.key}`)}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={drawerItemVariants}
                  className="my-4 border-t border-maaniko-line"
                />

                <motion.p
                  variants={drawerItemVariants}
                  className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400"
                >
                  {t("drawer.policies")}
                </motion.p>

                <div className="space-y-0.5">
                  {policyRoutes.map((item) => (
                    <motion.div
                      key={item.href}
                      variants={drawerItemVariants}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isRouteActive(pathname, item.href)
                            ? "bg-maaniko-blush text-maaniko-pink"
                            : "text-maaniko-navy hover:bg-maaniko-blush hover:text-maaniko-pink"
                          }`}
                      >
                        {t(`drawer.${item.key}`)}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </MotionConfig>
  );
}