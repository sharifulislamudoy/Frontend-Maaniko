import type { Resource } from "i18next";

import type {
  LanguageCode,
  LanguageOption,
} from "@/types/localization";

export const LANGUAGE_COOKIE_NAME = "maaniko-language";
export const DEFAULT_LANGUAGE: LanguageCode = "bn";

export const SUPPORTED_LANGUAGES = [
  "bn",
  "en",
] as const satisfies readonly LanguageCode[];

export const LANGUAGE_OPTIONS = [
  { code: "bn", label: "বাংলা", shortLabel: "বাংলা" },
  { code: "en", label: "English", shortLabel: "EN" },
] as const satisfies readonly LanguageOption[];

export function isLanguageCode(
  value: string | null | undefined,
): value is LanguageCode {
  return value === "bn" || value === "en";
}

export function normalizeLanguage(
  value: string | null | undefined,
): LanguageCode {
  return isLanguageCode(value) ? value : DEFAULT_LANGUAGE;
}

export const resources: Resource = {
  bn: {
    translation: {
      service: {
        delivery: "২,০০০ টাকার বেশি অর্ডারে ফ্রি ডেলিভারি",
        promise: "মায়ের পাশে, প্রতিটি ধাপে",
        help: "সাহায্য লাগবে? 01712-345678",
      },

      nav: {
        home: "হোম",
        shop: "শপ",
        wishlist: "উইশলিস্ট",
        guide: "গাইড",
        orders: "অর্ডার",
      },

      actions: {
        openMenu: "মেনু খুলুন",
        closeMenu: "মেনু বন্ধ করুন",
        search: "পণ্য খুঁজুন",
        searchPlaceholder: "পণ্য খুঁজুন",
        cart: "কার্ট",
        cartWithCount: "কার্টে {{count}}টি পণ্য আছে",
        selectLanguage: "ভাষা নির্বাচন করুন",
        viewDetails: "বিস্তারিত দেখুন",
        addToCart: "কার্টে যোগ করুন",
        addedToCart: "কার্টে যোগ হয়েছে",
        continueShopping: "কেনাকাটা চালিয়ে যান",
      },

      hero: {
        sectionLabel: "মানিকো অফার ও ব্যানার",
        bannerAlt: "মানিকো ব্যানার",
        openBanner: "ব্যানার খুলুন",
      },

      drawer: {
        language: "ভাষা",
        information: "তথ্য ও সহায়তা",
        policies: "নীতি ও শর্তাবলি",
        about: "আমাদের সম্পর্কে",
        contact: "সাহায্য ও যোগাযোগ",
        faq: "সাধারণ প্রশ্ন",
        returns: "রিটার্ন ও রিফান্ড নীতি",
        shipping: "ডেলিভারি তথ্য",
        privacy: "গোপনীয়তা নীতি",
        terms: "ব্যবহারের শর্তাবলি",
      },

      home: {
        collection: "মানিকো কালেকশন",
        popularProducts: "জনপ্রিয় পণ্যসমূহ",
      },

      comboPack: {
        homeTitle: "ফেজ ওয়ান কম্বো প্যাক",
        homeSubtitle: "মা ও শিশুর জন্য আমাদের বাছাইকৃত ৬টি সেরা সমাধান",
        sliderLabel: "মানিকো কম্বো প্যাকসমূহ",
        viewDetails: "বিস্তারিত দেখুন",
        viewAll: "সব কম্বো প্যাক দেখুন",
        pageEyebrow: "মানিকো স্পেশাল কালেকশন",
        pageTitle: "সকল কম্বো প্যাক",
        pageSubtitle:
          "গর্ভাবস্থা থেকে শুরু করে নবজাতকের যত্ন পর্যন্ত মা ও শিশুর প্রয়োজন অনুযায়ী তৈরি আমাদের বাছাইকৃত কম্বো প্যাকগুলো দেখুন।",
      },

      product: {
        price: "মূল্য",
        stock: "স্টক",
        inStock: "স্টকে আছে",
        outOfStock: "স্টক শেষ",
      },

      wishlist: {
        eyebrow: "আপনার পছন্দের তালিকা",
        title: "উইশলিস্ট",
        subtitle: "পছন্দের পণ্যগুলো এখানে সংরক্ষিত থাকবে।",
        emptyTitle: "আপনার উইশলিস্ট খালি",
        emptyDescription:
          "পছন্দের কোনো পণ্যের হার্ট আইকনে ক্লিক করলে সেটি এখানে দেখা যাবে।",
        addToWishlist: "উইশলিস্টে যোগ করুন",
        removeFromWishlist: "উইশলিস্ট থেকে সরান",
      },

      cart: {
        title: "আপনার কার্ট",
        itemCount: "মোট {{count}}টি পণ্য",
        close: "কার্ট বন্ধ করুন",
        emptyTitle: "আপনার কার্ট খালি",
        emptyDescription:
          "আপনার পছন্দের পণ্য কার্টে যোগ করলে এখানে দেখা যাবে।",
        remove: "কার্ট থেকে সরান",
        decrease: "পরিমাণ কমান",
        increase: "পরিমাণ বাড়ান",
        total: "সর্বমোট",
        checkout: "চেকআউট করুন",
      },
    },
  },

  en: {
    translation: {
      service: {
        delivery: "Free delivery on orders over BDT 2,000",
        promise: "Beside every mother, every step",
        help: "Need help? 01712-345678",
      },

      nav: {
        home: "Home",
        shop: "Shop",
        wishlist: "Wishlist",
        guide: "Guide",
        orders: "Orders",
      },

      actions: {
        openMenu: "Open menu",
        closeMenu: "Close menu",
        search: "Search products",
        searchPlaceholder: "Search products",
        cart: "Cart",
        cartWithCount: "{{count}} items in cart",
        selectLanguage: "Select language",
        viewDetails: "View details",
        addToCart: "Add to cart",
        addedToCart: "Added to cart",
        continueShopping: "Continue shopping",
      },

      hero: {
        sectionLabel: "Maaniko offers and banners",
        bannerAlt: "Maaniko banner",
        openBanner: "Open banner",
      },

      drawer: {
        language: "Language",
        information: "Information & support",
        policies: "Policies & terms",
        about: "About us",
        contact: "Help & contact",
        faq: "Frequently asked questions",
        returns: "Return & refund policy",
        shipping: "Delivery information",
        privacy: "Privacy policy",
        terms: "Terms & conditions",
      },

      home: {
        collection: "Maaniko Collection",
        popularProducts: "Popular Products",
      },

      comboPack: {
        homeTitle: "Phase One Combo Pack",
        homeSubtitle:
          "Our 6 carefully selected solutions for mother and baby",
        sliderLabel: "Maaniko combo packs",
        viewDetails: "View details",
        viewAll: "View all combo packs",
        pageEyebrow: "Maaniko Special Collection",
        pageTitle: "All Combo Packs",
        pageSubtitle:
          "Explore our carefully selected combo packs designed for every stage from pregnancy to newborn care.",
      },

      product: {
        price: "Price",
        stock: "Stock",
        inStock: "In stock",
        outOfStock: "Out of stock",
      },

      wishlist: {
        eyebrow: "Your saved collection",
        title: "Wishlist",
        subtitle: "All the products you love are saved here.",
        emptyTitle: "Your wishlist is empty",
        emptyDescription:
          "Tap the heart icon on a product to save it here.",
        addToWishlist: "Add to wishlist",
        removeFromWishlist: "Remove from wishlist",
      },

      cart: {
        title: "Your cart",
        itemCount: "{{count}} items total",
        close: "Close cart",
        emptyTitle: "Your cart is empty",
        emptyDescription:
          "Products you add to cart will appear here.",
        remove: "Remove from cart",
        decrease: "Decrease quantity",
        increase: "Increase quantity",
        total: "Total",
        checkout: "Proceed to checkout",
      },
    },
  },
};