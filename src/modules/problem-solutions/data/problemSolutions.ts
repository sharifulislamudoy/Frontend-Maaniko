import type { SiteText } from "@/modules/site-content/types/site-text";

export type ProblemSolutionItem = {
  id: string;
  problemTitle: SiteText;
  problemDescription: SiteText;
  solutionTitle: SiteText;
  solutionDescription: SiteText;
  problemImage: string;
  productId: string;
};

export const problemSolutions: ProblemSolutionItem[] = [
  {
    id: "belly-back-support",
    problemTitle: "পেট ও কোমরে অস্বস্তি?",
    problemDescription:
      "হাঁটা, দাঁড়ানো বা দৈনন্দিন কাজে পেটের নিচে বাড়তি সাপোর্ট প্রয়োজন?",
    solutionTitle: "প্রেগন্যান্সি সাপোর্ট বেল্ট",
    solutionDescription:
      "অ্যাডজাস্টেবল ৩-ইন-১ ডিজাইন পেটের নিচের অংশে আরামদায়ক সাপোর্ট দেয়।",
    problemImage:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    productId: "product-support-belt",
  },
  {
    id: "baby-heartbeat",
    problemTitle: "বেবির হার্টবিট শুনতে চান?",
    problemDescription:
      "ঘরে সহজভাবে বেবির হার্টবিট শোনার জন্য একটি পোর্টেবল ডিভাইস খুঁজছেন?",
    solutionTitle: "পোর্টেবল ফিটাল ডপলার",
    solutionDescription:
      "ডিজিটাল ডিসপ্লে, বিল্ট-ইন স্পিকার এবং ৩.০ MHz আলাদা প্রোবসহ পোর্টেবল ডিভাইস।",
    problemImage:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=900&q=85",
    productId: "product-fetal-doppler",
  },
  {
    id: "stretch-mark-care",
    problemTitle: "ত্বক শুষ্ক ও টানটান লাগছে?",
    problemDescription:
      "প্রেগন্যান্সির সময় ত্বক নরম ও ময়েশ্চারাইজড রাখার নিয়মিত কেয়ার প্রয়োজন?",
    solutionTitle: "Palmer’s Stretch Mark Cream",
    solutionDescription:
      "Cocoa butter, shea butter, collagen ও argan oil সমৃদ্ধ ময়েশ্চারাইজিং ক্রিম।",
    problemImage:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    productId: "product-palmers-stretch-mark-cream",
  },
  {
    id: "hydration-reminder",
    problemTitle: "পানি খেতে ভুলে যান?",
    problemDescription:
      "ব্যস্ততার মধ্যে নিয়মিত পানি খাওয়ার সময় মনে রাখা কঠিন হয়ে যাচ্ছে?",
    solutionTitle: "টাইম-মার্কার ওয়াটার বোতল",
    solutionDescription:
      "সময় ও motivational reminder print করা বোতল নিয়মিত hydration routine সহজ করে।",
    problemImage:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    productId: "product-time-marker-water-bottle",
  },
  {
    id: "better-sleep",
    problemTitle: "শান্তিতে ঘুমাতে পারছেন না?",
    problemDescription: "ঘুম বা বিশ্রামের সময় আশপাশের আলো বিরক্ত করছে?",
    solutionTitle: "সফট সাটিন স্লিপ মাস্ক",
    solutionDescription:
      "Padded satin surface ও contoured eye space বিশ্রামের সময় আলো কমাতে সহায়তা করে।",
    problemImage:
      "https://images.unsplash.com/photo-1616627451515-cbc80e5ece35?auto=format&fit=crop&w=900&q=85",
    productId: "product-soft-sleep-eye-mask",
  },
  {
    id: "document-organization",
    problemTitle: "রিপোর্ট খুঁজে পাচ্ছেন না?",
    problemDescription:
      "প্রেসক্রিপশন, টেস্ট রিপোর্ট ও appointment slip আলাদা জায়গায় হারিয়ে যাচ্ছে?",
    solutionTitle: "প্রেগন্যান্সি ডকুমেন্ট অর্গানাইজার",
    solutionDescription:
      "Expandable pocket design প্রয়োজনীয় maternity records এক জায়গায় গুছিয়ে রাখে।",
    problemImage:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85",
    productId: "product-pregnancy-document-organizer",
  },
  {
    id: "leg-support",
    problemTitle: "পা ভারী বা ক্লান্ত লাগে?",
    problemDescription:
      "দীর্ঘ সময় দাঁড়িয়ে থাকা, বসা বা ভ্রমণের সময় পায়ে বাড়তি সাপোর্ট প্রয়োজন?",
    solutionTitle: "ম্যাটারনিটি কম্প্রেশন সকস",
    solutionDescription:
      "Knee-high graduated compression design দৈনন্দিন চলাফেরায় supportive compression দেয়।",
    problemImage:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=85",
    productId: "product-compression-socks",
  },
];
