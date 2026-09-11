import type { ShopByJourneyItem } from "@/modules/journeys/types/journey";

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
    name: "গর্ভাবস্থার প্রস্তুতি",
    images: pregnancyImages,
    href: "/shop?journey=pregnancy-preparation",
  },
  {
    id: "journey-maternity-care",
    slug: "maternity-care",
    name: "মাতৃত্বকালীন যত্ন",
    images: pregnancyImages,
    href: "/shop?journey=maternity-care",
  },
  {
    id: "journey-hospital-bag",
    slug: "hospital-bag",
    name: "হাসপাতাল ব্যাগ",
    images: pregnancyImages,
    href: "/shop?journey=hospital-bag",
  },
  {
    id: "journey-postpartum-recovery",
    slug: "postpartum-recovery",
    name: "প্রসব-পরবর্তী যত্ন",
    images: healthImages,
    href: "/shop?journey=postpartum-recovery",
  },
  {
    id: "journey-breastfeeding",
    slug: "breastfeeding",
    name: "ব্রেস্টফিডিং",
    images: feedingImages,
    href: "/shop?journey=breastfeeding",
  },
  {
    id: "journey-newborn-care",
    slug: "newborn-care",
    name: "নবজাতকের যত্ন (০-৬ মাস)",
    images: newbornImages,
    href: "/shop?journey=newborn-care",
  },
  {
    id: "journey-feeding",
    slug: "feeding",
    name: "ফিডিং (৬-১২ মাস)",
    images: feedingImages,
    href: "/shop?journey=feeding",
  },
  {
    id: "journey-baby-food",
    slug: "baby-food",
    name: "বেবি ফুড",
    images: feedingImages,
    href: "/shop?journey=baby-food",
  },
  {
    id: "journey-bath-and-hygiene",
    slug: "bath-and-hygiene",
    name: "গোসল ও পরিচ্ছন্নতা",
    images: bathImages,
    href: "/shop?journey=bath-and-hygiene",
  },
  {
    id: "journey-diapering-care",
    slug: "diapering-care",
    name: "ডায়াপারিং কেয়ার",
    images: newbornImages,
    href: "/shop?journey=diapering-care",
  },
  {
    id: "journey-sleep-and-bedtime",
    slug: "sleep-and-bedtime",
    name: "ঘুম ও বেডটাইম",
    images: newbornImages,
    href: "/shop?journey=sleep-and-bedtime",
  },
  {
    id: "journey-health-and-safety",
    slug: "health-and-safety",
    name: "স্বাস্থ্য ও নিরাপত্তা",
    images: healthImages,
    href: "/shop?journey=health-and-safety",
  },
  {
    id: "journey-baby-skincare",
    slug: "baby-skincare",
    name: "শিশুর ত্বকের যত্ন",
    images: bathImages,
    href: "/shop?journey=baby-skincare",
  },
  {
    id: "journey-clothing-essentials",
    slug: "clothing-essentials",
    name: "পোশাকের প্রয়োজনীয়তা",
    images: newbornImages,
    href: "/shop?journey=clothing-essentials",
  },
  {
    id: "journey-teething-and-oral-care",
    slug: "teething-and-oral-care",
    name: "দাঁত ওঠা ও মুখের যত্ন",
    images: healthImages,
    href: "/shop?journey=teething-and-oral-care",
  },
  {
    id: "journey-play-and-learning",
    slug: "play-and-learning",
    name: "খেলা ও শেখা",
    images: newbornImages,
    href: "/shop?journey=play-and-learning",
  },
  {
    id: "journey-crawling-and-walking",
    slug: "crawling-and-walking",
    name: "হামাগুড়ি ও হাঁটা",
    images: newbornImages,
    href: "/shop?journey=crawling-and-walking",
  },
  {
    id: "journey-travel-and-outings",
    slug: "travel-and-outings",
    name: "ভ্রমণ ও বাইরে যাওয়া",
    images: pregnancyImages,
    href: "/shop?journey=travel-and-outings",
  },
  {
    id: "journey-home-and-nursery",
    slug: "home-and-nursery",
    name: "বেবি রুম ও নার্সারি",
    images: newbornImages,
    href: "/shop?journey=home-and-nursery",
  },
  {
    id: "journey-toddler-care",
    slug: "toddler-care",
    name: "টডলার কেয়ার (১-৩ বছর)",
    images: healthImages,
    href: "/shop?journey=toddler-care",
  },
];
