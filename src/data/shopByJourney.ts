import type { ShopByJourneyItem } from "@/types/shop-by-journey";

export const shopByJourneyItems: ShopByJourneyItem[] = [
  {
    id: "journey-pregnancy",
    slug: "pregnancy-preparation",
    name: {
      bn: "গর্ভাবস্থার প্রস্তুতি",
      en: "Pregnancy Preparation",
    },
    images: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=900&q=85",
    ],
    href: "/shop?journey=pregnancy-preparation",
  },
  {
    id: "journey-newborn",
    slug: "newborn-care",
    name: {
      bn: "নবজাতকের যত্ন",
      en: "Newborn Care",
    },
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=85",
    ],
    href: "/shop?journey=newborn-care",
  },
  {
    id: "journey-feeding",
    slug: "feeding",
    name: {
      bn: "ফিডিং",
      en: "Feeding",
    },
    images: [
      "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=900&q=85",
    ],
    href: "/shop?journey=feeding",
  },
  {
    id: "journey-bath-hygiene",
    slug: "bath-and-hygiene",
    name: {
      bn: "বাথ ও হাইজিন",
      en: "Bath & Hygiene",
    },
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    ],
    href: "/shop?journey=bath-and-hygiene",
  },
  {
    id: "journey-health-safety",
    slug: "health-and-safety",
    name: {
      bn: "হেলথ ও সেফটি",
      en: "Health & Safety",
    },
    images: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1580281658628-5262fbf84c1c?auto=format&fit=crop&w=900&q=85",
    ],
    href: "/shop?journey=health-and-safety",
  },
];
