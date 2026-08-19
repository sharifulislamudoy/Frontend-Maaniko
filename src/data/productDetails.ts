import type { ProductDetails } from "@/types/product";

export const productDetailsBySlug: Record<string, ProductDetails> = {
  "premium-maternity-dress": {
    includedItems: [
      {
        id: "dress",
        name: { bn: "প্রিমিয়াম কটন ড্রেস", en: "Premium cotton dress" },
      },
      {
        id: "feeding-zips",
        name: { bn: "দুটি হিডেন ফিডিং জিপ", en: "Two hidden feeding zips" },
      },
      {
        id: "waist-belt",
        name: { bn: "অ্যাডজাস্টেবল কোমর বেল্ট", en: "Adjustable waist belt" },
      },
      {
        id: "side-pockets",
        name: { bn: "দুটি সাইড পকেট", en: "Two side pockets" },
      },
      {
        id: "care-card",
        name: { bn: "ফ্যাব্রিক কেয়ার কার্ড", en: "Fabric care card" },
      },
      {
        id: "storage-bag",
        name: { bn: "পুনর্ব্যবহারযোগ্য ব্যাগ", en: "Reusable storage bag" },
      },
    ],
    whyEssential: [
      {
        bn: "গর্ভাবস্থা ও প্রসবের পর শরীরের পরিবর্তনের সঙ্গে সহজে মানিয়ে যায়।",
        en: "Adapts comfortably to body changes during and after pregnancy.",
      },
      {
        bn: "গোপন জিপ দৈনন্দিন বাইরে যাওয়া ও ফিডিংকে আরও সহজ করে।",
        en: "Discreet zips make everyday outings and nursing easier.",
      },
      {
        bn: "নরম ও বাতাস চলাচলযোগ্য কটন দীর্ঘ সময় আরাম দেয়।",
        en: "Soft, breathable cotton stays comfortable for long hours.",
      },
    ],
    preferredFor: [
      { bn: "গর্ভবতী মা", en: "Expecting mothers" },
      { bn: "নতুন মা", en: "New mothers" },
      { bn: "ফিডিং করান এমন মা", en: "Nursing mothers" },
      { bn: "আরামদায়ক দৈনন্দিন পোশাক", en: "Comfortable everyday wear" },
    ],
  },

  "feeding-friendly-maxi-dress": {
    includedItems: [
      {
        id: "maxi-dress",
        name: { bn: "ফিডিং ফ্রেন্ডলি ম্যাক্সি", en: "Feeding-friendly maxi" },
      },
      {
        id: "hidden-zips",
        name: { bn: "দুটি গোপন জিপ", en: "Two discreet zips" },
      },
      {
        id: "waist-tie",
        name: { bn: "অ্যাডজাস্টেবল ওয়েস্ট টাই", en: "Adjustable waist tie" },
      },
      {
        id: "care-card",
        name: { bn: "ওয়াশ ও কেয়ার নির্দেশিকা", en: "Wash and care guide" },
      },
    ],
    whyEssential: [
      {
        bn: "বাইরে বা বাসায় শিশুকে সহজে ও স্বাচ্ছন্দ্যে ফিডিং করানো যায়।",
        en: "Makes feeding comfortable and convenient at home or outside.",
      },
      {
        bn: "হালকা কাপড় এবং ঢিলেঢালা কাট চলাফেরায় আরাম দেয়।",
        en: "Light fabric and a relaxed cut make movement comfortable.",
      },
      {
        bn: "আধুনিক ডিজাইনটি মাতৃত্বের পরেও নিয়মিত পরা যায়।",
        en: "The modern design remains wearable well beyond maternity.",
      },
    ],
    preferredFor: [
      { bn: "নতুন মা", en: "New mothers" },
      { bn: "নার্সিং করান এমন মা", en: "Nursing mothers" },
      { bn: "হাসপাতাল ও বাইরে যাওয়া", en: "Hospital visits and outings" },
      { bn: "দৈনন্দিন ব্যবহার", en: "Daily use" },
    ],
  },

  "mother-baby-diaper-bag": {
    includedItems: [
      {
        id: "diaper-bag",
        name: { bn: "মাল্টি-পকেট ডায়াপার ব্যাগ", en: "Multi-pocket diaper bag" },
      },
      {
        id: "bottle-holder",
        name: { bn: "ইনসুলেটেড বোতল হোল্ডার", en: "Insulated bottle holder" },
      },
      {
        id: "changing-mat",
        name: { bn: "পোর্টেবল চেঞ্জিং ম্যাট", en: "Portable changing mat" },
      },
      {
        id: "wet-pouch",
        name: { bn: "ওয়াটারপ্রুফ ওয়েট পাউচ", en: "Waterproof wet pouch" },
      },
      {
        id: "stroller-straps",
        name: { bn: "স্ট্রলার স্ট্র্যাপ সেট", en: "Stroller strap set" },
      },
      {
        id: "dust-bag",
        name: { bn: "প্রটেকটিভ ডাস্ট ব্যাগ", en: "Protective dust bag" },
      },
    ],
    whyEssential: [
      {
        bn: "শিশুর ডায়াপার, পোশাক, খাবার ও প্রয়োজনীয় জিনিস আলাদা করে রাখা যায়।",
        en: "Keeps diapers, clothes, feeding items and essentials organized.",
      },
      {
        bn: "ইনসুলেটেড পকেট বোতলের তাপমাত্রা বেশি সময় ধরে রাখতে সাহায্য করে।",
        en: "Insulated pockets help maintain bottle temperature for longer.",
      },
      {
        bn: "হাত, কাঁধ বা স্ট্রলারে বহনের একাধিক সুবিধা আছে।",
        en: "Offers flexible hand, shoulder and stroller carrying options.",
      },
    ],
    preferredFor: [
      { bn: "নবজাতকের মা-বাবা", en: "Newborn parents" },
      { bn: "ভ্রমণ", en: "Travel" },
      { bn: "হাসপাতাল ভিজিট", en: "Hospital visits" },
      { bn: "শিশুকে নিয়ে দৈনন্দিন বাইরে যাওয়া", en: "Everyday outings with baby" },
    ],
  },

  "premium-nursing-pillow": {
    includedItems: [
      {
        id: "pillow",
        name: { bn: "সাপোর্টিভ নার্সিং পিলো", en: "Supportive nursing pillow" },
      },
      {
        id: "cover",
        name: { bn: "রিমুভেবল কটন কভার", en: "Removable cotton cover" },
      },
      {
        id: "inner-liner",
        name: { bn: "প্রটেকটিভ ইনার লাইনার", en: "Protective inner liner" },
      },
      {
        id: "storage-bag",
        name: { bn: "স্টোরেজ ব্যাগ", en: "Storage bag" },
      },
    ],
    whyEssential: [
      {
        bn: "ফিডিংয়ের সময় মা ও শিশুর সঠিক ভঙ্গি ধরে রাখতে সহায়তা করে।",
        en: "Helps maintain a comfortable feeding posture for mother and baby.",
      },
      {
        bn: "হাত, কাঁধ ও পিঠের ওপর অতিরিক্ত চাপ কমাতে সাহায্য করে।",
        en: "Helps reduce unnecessary strain on the arms, shoulders and back.",
      },
      {
        bn: "খোলা যায় এমন কভার সহজে ধুয়ে পরিষ্কার রাখা যায়।",
        en: "The removable cover is easy to wash and keep clean.",
      },
    ],
    preferredFor: [
      { bn: "নবজাতক", en: "Newborns" },
      { bn: "০–১২ মাসের শিশু", en: "Babies aged 0–12 months" },
      { bn: "নতুন মা", en: "New mothers" },
      { bn: "ব্রেস্ট ও বোতল ফিডিং", en: "Breast and bottle feeding" },
    ],
  },
};
