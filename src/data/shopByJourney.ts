import type { ShopByJourneyItem } from "@/types/shop-by-journey";

const pregnancyImages: [string, string] = [
  "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=900&q=85",
];

const newbornImages: [string, string] = [
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=85",
];

const feedingImages: [string, string] = [
  "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=900&q=85",
];

const bathImages: [string, string] = [
  "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
];

const healthImages: [string, string] = [
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1580281658628-5262fbf84c1c?auto=format&fit=crop&w=900&q=85",
];

export const shopByJourneyItems: ShopByJourneyItem[] = [
  {
    id: "journey-pregnancy-preparation",
    slug: "pregnancy-preparation",
    name: {
      bn: "গর্ভাবস্থার প্রস্তুতি",
      en: "Pregnancy Preparation",
    },
    images: pregnancyImages,
    href: "/shop?journey=pregnancy-preparation",
  },
  {
    id: "journey-maternity-care",
    slug: "maternity-care",
    name: {
      bn: "মাতৃত্বকালীন যত্ন",
      en: "Maternity Care",
    },
    images: pregnancyImages,
    href: "/shop?journey=maternity-care",
  },
  {
    id: "journey-hospital-bag",
    slug: "hospital-bag",
    name: {
      bn: "হাসপাতাল ব্যাগ",
      en: "Hospital Bag",
    },
    images: pregnancyImages,
    href: "/shop?journey=hospital-bag",
  },
  {
    id: "journey-postpartum-recovery",
    slug: "postpartum-recovery",
    name: {
      bn: "প্রসব-পরবর্তী যত্ন",
      en: "Postpartum Recovery",
    },
    images: healthImages,
    href: "/shop?journey=postpartum-recovery",
  },
  {
    id: "journey-breastfeeding",
    slug: "breastfeeding",
    name: {
      bn: "ব্রেস্টফিডিং",
      en: "Breastfeeding",
    },
    images: feedingImages,
    href: "/shop?journey=breastfeeding",
  },
  {
    id: "journey-newborn-care",
    slug: "newborn-care",
    name: {
      bn: "নবজাতকের যত্ন (০-৬ মাস)",
      en: "Newborn Care (0–6 Months)",
    },
    images: newbornImages,
    href: "/shop?journey=newborn-care",
  },
  {
    id: "journey-feeding",
    slug: "feeding",
    name: {
      bn: "ফিডিং (৬-১২ মাস)",
      en: "Feeding (6–12 Months)",
    },
    images: feedingImages,
    href: "/shop?journey=feeding",
  },
  {
    id: "journey-baby-food",
    slug: "baby-food",
    name: {
      bn: "বেবি ফুড",
      en: "Baby Food",
    },
    images: feedingImages,
    href: "/shop?journey=baby-food",
  },
  {
    id: "journey-bath-and-hygiene",
    slug: "bath-and-hygiene",
    name: {
      bn: "গোসল ও পরিচ্ছন্নতা",
      en: "Bath & Hygiene",
    },
    images: bathImages,
    href: "/shop?journey=bath-and-hygiene",
  },
  {
    id: "journey-diapering-care",
    slug: "diapering-care",
    name: {
      bn: "ডায়াপারিং কেয়ার",
      en: "Diapering Care",
    },
    images: newbornImages,
    href: "/shop?journey=diapering-care",
  },
  {
    id: "journey-sleep-and-bedtime",
    slug: "sleep-and-bedtime",
    name: {
      bn: "ঘুম ও বেডটাইম",
      en: "Sleep & Bedtime",
    },
    images: newbornImages,
    href: "/shop?journey=sleep-and-bedtime",
  },
  {
    id: "journey-health-and-safety",
    slug: "health-and-safety",
    name: {
      bn: "স্বাস্থ্য ও নিরাপত্তা",
      en: "Health & Safety",
    },
    images: healthImages,
    href: "/shop?journey=health-and-safety",
  },
  {
    id: "journey-baby-skincare",
    slug: "baby-skincare",
    name: {
      bn: "শিশুর ত্বকের যত্ন",
      en: "Baby Skincare",
    },
    images: bathImages,
    href: "/shop?journey=baby-skincare",
  },
  {
    id: "journey-clothing-essentials",
    slug: "clothing-essentials",
    name: {
      bn: "পোশাকের প্রয়োজনীয়তা",
      en: "Clothing Essentials",
    },
    images: newbornImages,
    href: "/shop?journey=clothing-essentials",
  },
  {
    id: "journey-teething-and-oral-care",
    slug: "teething-and-oral-care",
    name: {
      bn: "দাঁত ওঠা ও মুখের যত্ন",
      en: "Teething & Oral Care",
    },
    images: healthImages,
    href: "/shop?journey=teething-and-oral-care",
  },
  {
    id: "journey-play-and-learning",
    slug: "play-and-learning",
    name: {
      bn: "খেলা ও শেখা",
      en: "Play & Learning",
    },
    images: newbornImages,
    href: "/shop?journey=play-and-learning",
  },
  {
    id: "journey-crawling-and-walking",
    slug: "crawling-and-walking",
    name: {
      bn: "হামাগুড়ি ও হাঁটা",
      en: "Crawling & Walking",
    },
    images: newbornImages,
    href: "/shop?journey=crawling-and-walking",
  },
  {
    id: "journey-travel-and-outings",
    slug: "travel-and-outings",
    name: {
      bn: "ভ্রমণ ও বাইরে যাওয়া",
      en: "Travel & Outings",
    },
    images: pregnancyImages,
    href: "/shop?journey=travel-and-outings",
  },
  {
    id: "journey-home-and-nursery",
    slug: "home-and-nursery",
    name: {
      bn: "বেবি রুম ও নার্সারি",
      en: "Home & Nursery",
    },
    images: newbornImages,
    href: "/shop?journey=home-and-nursery",
  },
  {
    id: "journey-toddler-care",
    slug: "toddler-care",
    name: {
      bn: "টডলার কেয়ার (১-৩ বছর)",
      en: "Toddler Care (1–3 Years)",
    },
    images: healthImages,
    href: "/shop?journey=toddler-care",
  },
];