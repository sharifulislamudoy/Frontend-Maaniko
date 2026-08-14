import type { CareGuideItem } from "@/types/care-guide";

export const careGuideItems: CareGuideItem[] = [
  {
    id: "hospital-bag-checklist",
    slug: "hospital-bag-checklist",
    title: {
      bn: "হাসপাতাল ব্যাগ চেকলিস্ট",
      en: "Hospital Bag Checklist",
    },
    images: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=900&q=85",
    ],
    href: "/guide?topic=hospital-bag-checklist",
  },
  {
    id: "newborn-essentials",
    slug: "newborn-essentials",
    title: {
      bn: "নবজাতকের প্রয়োজনীয় জিনিস",
      en: "Newborn Essentials",
    },
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=85",
    ],
    href: "/guide?topic=newborn-essentials",
  },
  {
    id: "baby-fever-warning",
    slug: "baby-fever-warning",
    title: {
      bn: "জ্বর মনিটরিং: কখন সতর্ক হবেন",
      en: "Baby Fever: When to Be Alert",
    },
    images: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1580281658628-5262fbf84c1c?auto=format&fit=crop&w=900&q=85",
    ],
    href: "/guide?topic=baby-fever-warning",
  },
  {
    id: "feeding-start-guide",
    slug: "feeding-start-guide",
    title: {
      bn: "ফিডিং শুরু করার সহজ গাইড",
      en: "An Easy Guide to Start Feeding",
    },
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=900&q=85",
    ],
    href: "/guide?topic=feeding-start-guide",
  },
];