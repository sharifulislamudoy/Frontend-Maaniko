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
        shop: "কালেকশন",
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
        popularProducts: "মায়েদের সবচেয়ে পছন্দের পণ্যগুলো",
      },

      shopByJourney: {
        title: "আপনার যাত্রা অনুযায়ী শপ করুন",
        subtitle:
          "গর্ভাবস্থার প্রস্তুতি থেকে শিশুর স্বাস্থ্য ও নিরাপত্তা—প্রতিটি প্রয়োজন অনুযায়ী পণ্য খুঁজে নিন।",
        seeMore: "আরও দেখুন",
        explore: "দেখুন",
        viewAll: "যাত্রা অনুযায়ী সব ক্যাটাগরি দেখুন",
        swipeHint: "পাশে সোয়াইপ করুন",
      },

      solutionBox: {
        eyebrow: "মা ও শিশুর যত্নে",
        title: "আপনার জন্য সাজানো Maaniko Solution Box",
        subtitle:
          "মা ও শিশুর প্রতিটি বিশেষ প্রয়োজনের জন্য প্রয়োজনীয় পণ্য নিয়ে সাজানো আমাদের সল্যুশন বক্সগুলো দেখুন।",
        seeMore: "বিস্তারিত দেখুন",
        explore: "দেখুন",
        viewAll: "সব সল্যুশন বক্স দেখুন",
        pageEyebrow: "মানিকো কিউরেটেড সল্যুশন",
        pageTitle: "সকল Maaniko Solution Box",
      },

      solutionGuide: {
        title: "কী কী লাগবে বুঝে উঠতে পারছেন না?",
        description:
          "চিন্তা নেই—প্রয়োজনীয় পণ্যগুলো আমরা যত্ন নিয়ে একসঙ্গে সাজিয়ে দিয়েছি।",
        button: "সমাধানগুলো দেখুন",
        buttonLabel: "মানিকোর সাজানো সমাধানগুলো দেখুন",
        imageAlt: "প্রয়োজনীয় পণ্য নিয়ে ভাবছেন একজন মা",
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

      productDetails: {
        breadcrumb: "পণ্যের অবস্থান",
        galleryLabel: "পণ্যের ছবিসমূহ",
        selectImage: "{{count}} নম্বর ছবি দেখুন",
        off: "ছাড়",
        reviews: "রিভিউ",
        trustedChoice: "মায়েদের বিশ্বস্ত পছন্দ",
        mrp: "এমআরপি",
        save: "সাশ্রয়",
        discountApplied: "ছাড় প্রযোজ্য",
        safe: "১০০% নিরাপদ",
        fastDelivery: "দ্রুত ডেলিভারি",
        easyReturn: "সহজ রিটার্ন",
        quantity: "পরিমাণ",
        buyNow: "এখনই অর্ডার করুন",
        boxIncluded: "বক্সে যা থাকছে",
        whyEssential: "কেন এটি প্রয়োজনীয়",
        preferredFor: "যাদের জন্য উপযুক্ত",
        deliverySupport: "ডেলিভারি ও সাপোর্ট",
        deliveryTitle: "সারাদেশে হোম ডেলিভারি",
        deliveryDescription: "দ্রুত ও যত্নসহকারে আপনার ঠিকানায় পৌঁছে দেওয়া হবে।",
        supportTitle: "সপ্তাহের ৭ দিন সাপোর্ট",
        supportDescription: "পণ্য ও অর্ডার বিষয়ে আমাদের টিম সহায়তার জন্য প্রস্তুত।",
        packagingTitle: "প্রিমিয়াম প্যাকেজিং",
        packagingDescription: "নিরাপদ, পরিষ্কার ও উপহার দেওয়ার উপযোগী প্যাকেজিং।",
        youMayAlsoLike: "আপনার আরও ভালো লাগতে পারে",
        category: "ক্যাটাগরি",
        availability: "অবস্থা",
        stockCount: "বর্তমান স্টক",
        discount: "ডিসকাউন্ট",
        detailsTabs: "পণ্যের বিস্তারিত তথ্য",
        tabDescription: "বিবরণ",
        tabIncluded: "বক্সে যা থাকছে",
        tabEssential: "কেন প্রয়োজনীয়",
        tabPreferred: "যাদের জন্য উপযুক্ত",
        tabDelivery: "ডেলিভারি ও সাপোর্ট",
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

      careGuide: {
        title: "মা ও শিশুর যত্নে প্রয়োজনীয় গাইড",
        seeMore: "আরও দেখুন",
        explore: "গাইডটি পড়ুন",
        viewAll: "মা ও শিশুর যত্নের সব গাইড দেখুন",
        sliderLabel: "মা ও শিশুর যত্নে প্রয়োজনীয় গাইডসমূহ",
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
        shop: "Collection",
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
        popularProducts: "Mothers’ Most Loved Products",
      },

      shopByJourney: {
        title: "Shop by Your Journey",
        subtitle:
          "Find the right essentials for every stage, from pregnancy preparation to your baby's health and safety.",
        seeMore: "See more",
        explore: "Explore",
        viewAll: "View all shop-by-journey categories",
        swipeHint: "Swipe sideways",
      },

      solutionBox: {
        eyebrow: "Care for mother and baby",
        title: "Maaniko Solution Box, Curated for You",
        subtitle:
          "Explore thoughtfully curated solution boxes containing the essentials for every special mother-and-baby need.",
        seeMore: "See more",
        explore: "Explore",
        viewAll: "View all solution boxes",
        pageEyebrow: "Maaniko Curated Solutions",
        pageTitle: "All Maaniko Solution Boxes",
      },

      solutionGuide: {
        title: "Not sure what you need?",
        description:
          "Don’t worry—we’ve thoughtfully brought all the essentials together for you.",
        button: "Explore the solutions",
        buttonLabel: "Explore Maaniko's curated solutions",
        imageAlt: "A mother thinking about the essentials she needs",
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

      productDetails: {
        breadcrumb: "Product breadcrumb",
        galleryLabel: "Product image gallery",
        selectImage: "View product image {{count}}",
        off: "off",
        reviews: "reviews",
        trustedChoice: "Trusted by mothers",
        mrp: "MRP",
        save: "saved",
        discountApplied: "discount applied",
        safe: "100% safe",
        fastDelivery: "Fast delivery",
        easyReturn: "Easy return",
        quantity: "Quantity",
        buyNow: "Order now",
        boxIncluded: "What is included in the box",
        whyEssential: "Why it is essential",
        preferredFor: "Preferred for",
        deliverySupport: "Delivery & support",
        deliveryTitle: "Nationwide home delivery",
        deliveryDescription: "Delivered quickly and carefully to your address.",
        supportTitle: "Support 7 days a week",
        supportDescription: "Our team is ready to help with products and orders.",
        packagingTitle: "Premium packaging",
        packagingDescription: "Safe, clean and gift-ready packaging.",
        youMayAlsoLike: "You may also like",
        category: "Category",
        availability: "Availability",
        stockCount: "Current stock",
        discount: "Discount",
        detailsTabs: "Detailed product information",
        tabDescription: "Description",
        tabIncluded: "Box included",
        tabEssential: "Why essential",
        tabPreferred: "Preferred for",
        tabDelivery: "Delivery & support",
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

      careGuide: {
        title: "Essential Guides for Mother & Baby Care",
        seeMore: "See more",
        explore: "Read guide",
        viewAll: "View all mother and baby care guides",
        sliderLabel: "Essential mother and baby care guides",
      },


    },
  },
};
