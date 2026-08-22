import { productsById } from "@/data/fakeProducts";
import type { LocalizedValue } from "@/types/localization";
import type { MaanikoProduct } from "@/types/product";
import type {
  SolutionBox,
  SolutionBoxFaq,
  SolutionBoxItem,
  SolutionBoxReview,
} from "@/types/solution-box";

const commonFaqs: SolutionBoxFaq[] = [
  {
    id: "same-products",
    question: { bn: "ছবিতে দেখানো পণ্যগুলোই কি পাব?", en: "Will I receive the products shown in the photos?" },
    answer: { bn: "হ্যাঁ, Box-এ উল্লেখ করা product ও quantity-ই দেওয়া হবে। কোনো item পরিবর্তনের প্রয়োজন হলে অর্ডার confirm করার আগে আপনার অনুমতি নেওয়া হবে।", en: "Yes. You will receive the listed products and quantities. If any item ever needs to change, we will ask for your approval before confirming the order." },
  },
  {
    id: "remove-item",
    question: { bn: "Combo থেকে কোনো পণ্য বাদ দেওয়া যাবে?", en: "Can I remove a product from the combo?" },
    answer: { bn: "এই Box-টি একটি fixed curated solution, তাই item বাদ দিলে combo price প্রযোজ্য হবে না। প্রয়োজনীয় size বা color option থাকলে অর্ডারের সময় নির্বাচন করা যাবে।", en: "This is a fixed curated solution, so the combo price does not apply after removing an item. Required size or color options can be selected during order confirmation." },
  },
  {
    id: "damaged-item",
    question: { bn: "কোনো পণ্য missing বা damaged হলে কী হবে?", en: "What if an item is missing or damaged?" },
    answer: { bn: "Delivery-এর পর দ্রুত আমাদের support team-কে ছবি বা unboxing videoসহ জানালে সংশ্লিষ্ট item যাচাই করে replacement support দেওয়া হবে।", en: "Contact our support team promptly after delivery with a photo or unboxing video. We will verify the issue and support replacement of the affected item." },
  },
  {
    id: "gift-ready",
    question: { bn: "Box-টি gift হিসেবে পাঠানো যাবে?", en: "Can the box be sent as a gift?" },
    answer: { bn: "হ্যাঁ। Box-টি gift-ready packaging-এ আসে এবং checkout note-এ ছোট personalized message লিখতে পারবেন।", en: "Yes. The box arrives in gift-ready packaging, and you can add a short personalized message in the checkout note." },
  },
];

const commonReviews: SolutionBoxReview[] = [
  {
    id: "review-sadia",
    customerName: "Sadia Rahman",
    rating: 5,
    review: { bn: "সবকিছু একসাথে সুন্দরভাবে প্যাক করা ছিল। কী কিনব সেই confusion অনেক কমেছে।", en: "Everything arrived neatly packed together. It removed so much of the confusion about what to buy." },
  },
  {
    id: "review-nusrat",
    customerName: "Nusrat Jahan",
    rating: 5,
    review: { bn: "প্রতিটি product-এর quantity ও ব্যবহার পরিষ্কারভাবে দেওয়া ছিল, তাই gift হিসেবে পাঠাতেও confidence পেয়েছি।", en: "Every product and quantity was clearly explained, which made me confident sending it as a gift." },
  },
];

export const solutionBoxes: SolutionBox[] = [
  {
    id: "solution-box-pregnancy",
    slug: "pregnancy-essential-box",
    name: { bn: "প্রেগন্যান্সি এসেনশিয়াল বক্স", en: "Pregnancy Essential Box" },
    subtitle: { bn: "গর্ভাবস্থা ও হাসপাতাল প্রস্তুতির প্রয়োজনীয় পণ্য একসাথে", en: "Pregnancy and hospital-preparation essentials in one box" },
    description: { bn: "গর্ভাবস্থার শেষ সময় ও হাসপাতাল ব্যাগ প্রস্তুতিকে সহজ করতে মায়ের প্রয়োজন বুঝে সাজানো একটি complete solution।", en: "A complete solution curated around an expecting mother's needs during late pregnancy and hospital preparation." },
    images: [
      "https://images.unsplash.com/photo-1554342872-034a06541bad?auto=format&fit=crop&w=1100&q=88",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1100&q=88",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1100&q=88",
    ],
    items: [
      { productId: "product-maternity-dress", quantity: 1, variant: { bn: "Size অর্ডারের সময় নিশ্চিত হবে", en: "Size confirmed during order" } },
      { productId: "product-support-belt", quantity: 1, variant: { bn: "অ্যাডজাস্টেবল", en: "Adjustable" } },
      { productId: "product-diaper-bag", quantity: 1 },
      { productId: "product-maternity-pads", quantity: 1 },
    ],
    price: 4890,
    compareAtPrice: 6100,
    stock: 12,
    rating: 4.9,
    reviewCount: 74,
    journeyStage: { bn: "প্রেগন্যান্সি • দ্বিতীয় ও তৃতীয় ট্রাইমেস্টার", en: "Pregnancy • Second and third trimester" },
    whyThisBox: [
      { bn: "হাসপাতাল ব্যাগের বড় প্রয়োজনগুলো এক জায়গায় প্রস্তুত হয়।", en: "Brings the major hospital-bag needs together in one place." },
      { bn: "মা-কেন্দ্রিক আরাম, পোশাক ও hygiene care একসাথে পাওয়া যায়।", en: "Combines mother-focused comfort, clothing and hygiene care." },
      { bn: "আলাদাভাবে কেনার তুলনায় সময় ও অর্থ—দুটিই সাশ্রয় করে।", en: "Saves both time and money compared with buying separately." },
    ],
    preferredFor: [{ bn: "প্রথমবার মা হতে যাচ্ছেন", en: "First-time mothers" }, { bn: "হাসপাতাল ব্যাগ প্রস্তুত করছেন", en: "Preparing a hospital bag" }, { bn: "দ্বিতীয় বা তৃতীয় ট্রাইমেস্টার", en: "Second or third trimester" }, { bn: "উপহার দিতে চান", en: "Gift buyers" }],
    usageGuide: [
      { id: "prepare", title: { bn: "আগে থেকে প্রস্তুত করুন", en: "Prepare early" }, description: { bn: "Dress, support belt ও diaper bag গর্ভাবস্থায় ব্যবহার ও গোছানো শুরু করুন।", en: "Start using and organizing the dress, support belt and diaper bag during pregnancy." } },
      { id: "hospital", title: { bn: "হাসপাতাল ব্যাগে রাখুন", en: "Pack for hospital" }, description: { bn: "Maternity pad pack ও প্রয়োজনীয় পোশাক delivery-এর সম্ভাব্য তারিখের আগেই ব্যাগে রাখুন।", en: "Pack the maternity pads and clothing before the expected delivery date." } },
      { id: "after", title: { bn: "Delivery-এর পরও ব্যবহার", en: "Use after delivery" }, description: { bn: "Feeding-friendly dress ও spacious bag postpartum সময়েও কাজে লাগবে।", en: "The feeding-friendly dress and spacious bag remain useful postpartum." } },
    ],
    selectionReasons: [{ bn: "মায়ের comfort ও mobility-কে priority দেওয়া হয়েছে।", en: "Mother's comfort and mobility are prioritized." }, { bn: "Hospital preparation-এ বাস্তবে কাজে লাগে এমন items রাখা হয়েছে।", en: "Includes items that are genuinely useful for hospital preparation." }, { bn: "একই কাজে অপ্রয়োজনীয় duplicate products রাখা হয়নি।", en: "Avoids unnecessary products that serve the same purpose." }],
    packaging: [{ bn: "Maaniko branded protective box", en: "Maaniko branded protective box" }, { bn: "Pastel tissue wrapping", en: "Pastel tissue wrapping" }, { bn: "Bangla usage guide ও checklist", en: "Bangla usage guide and checklist" }, { bn: "Personalized gift-note option", en: "Personalized gift-note option" }],
    reviews: commonReviews,
    faqs: commonFaqs,
    href: "/solution-box/pregnancy-essential-box",
  },
  {
    id: "solution-box-newborn",
    slug: "newborn-welcome-box",
    name: { bn: "নিউবর্ন ওয়েলকাম বক্স", en: "Newborn Welcome Box" },
    subtitle: { bn: "নবজাতকের প্রথম দিনের যত্ন ও ঘরে আসার প্রস্তুতি", en: "First-day care and homecoming essentials for a newborn" },
    description: { bn: "নবজাতককে স্বাগত জানাতে daily comfort, grooming এবং basic health monitoring-এর প্রয়োজনীয় জিনিস নিয়ে সাজানো box।", en: "A curated box for welcoming a newborn with everyday comfort, grooming and basic health-monitoring essentials." },
    images: ["https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1100&q=88", "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1100&q=88", "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1100&q=88"],
    items: [{ productId: "product-swaddle", quantity: 1 }, { productId: "product-diaper-bag", quantity: 1 }, { productId: "product-hooded-towel", quantity: 1 }, { productId: "product-thermometer", quantity: 1 }, { productId: "product-nail-care", quantity: 1 }],
    price: 3690,
    compareAtPrice: 4590,
    stock: 9,
    rating: 4.9,
    reviewCount: 91,
    journeyStage: { bn: "নিউবর্ন • জন্ম থেকে ৩ মাস", en: "Newborn • Birth to 3 months" },
    whyThisBox: [{ bn: "নবজাতকের ঘুম, গোসল ও grooming-এর basic needs কভার করে।", en: "Covers the newborn basics for sleep, bath and grooming." }, { bn: "বাড়ি ও বাইরে প্রয়োজনীয় জিনিস organised রাখা যায়।", en: "Keeps essentials organized at home and outside." }, { bn: "নতুন মা-বাবার shopping confusion কমায়।", en: "Reduces shopping confusion for new parents." }],
    preferredFor: [{ bn: "নতুন মা-বাবা", en: "New parents" }, { bn: "নবজাতকের homecoming", en: "Newborn homecoming" }, { bn: "Baby shower gift", en: "Baby shower gift" }, { bn: "জন্ম থেকে ৩ মাস", en: "Birth to 3 months" }],
    usageGuide: [{ id: "homecoming", title: { bn: "Homecoming preparation", en: "Homecoming preparation" }, description: { bn: "Swaddle ও diaper bag আগে থেকে পরিষ্কার ও organised করে রাখুন।", en: "Wash and organize the swaddle and diaper bag in advance." } }, { id: "daily", title: { bn: "Daily care", en: "Daily care" }, description: { bn: "Bath-এর পর hooded towel এবং নিয়মিত grooming-এ nail set ব্যবহার করুন।", en: "Use the hooded towel after bath and the nail set for regular grooming." } }, { id: "health", title: { bn: "Basic monitoring", en: "Basic monitoring" }, description: { bn: "Thermometer-এর নির্দেশিকা পড়ে health kit-এ নিরাপদে রাখুন।", en: "Read the thermometer guide and store it safely in the health kit." } }],
    selectionReasons: [{ bn: "Newborn-এর প্রথম দিকের practical routine অনুযায়ী বাছাই।", en: "Selected around a newborn's practical early routine." }, { bn: "সহজে পরিষ্কার ও organised রাখা যায় এমন products।", en: "Products that are easy to clean and organize." }, { bn: "Comfort, grooming ও monitoring-এর balance রাখা হয়েছে।", en: "Balances comfort, grooming and monitoring." }],
    packaging: [{ bn: "Gift-ready Maaniko box", en: "Gift-ready Maaniko box" }, { bn: "Newborn checklist", en: "Newborn checklist" }, { bn: "Pastel tissue ও protective wrapping", en: "Pastel tissue and protective wrapping" }, { bn: "Personalized welcome card", en: "Personalized welcome card" }],
    reviews: commonReviews,
    faqs: commonFaqs,
    href: "/solution-box/newborn-welcome-box",
  },
  {
    id: "solution-box-feeding",
    slug: "first-feeding-journey-kit",
    name: { bn: "ফার্স্ট ফিডিং জার্নি কিট", en: "First Feeding Journey Kit" },
    subtitle: { bn: "মা ও শিশুর feeding journey শুরু করার complete solution", en: "A complete start to the mother-and-baby feeding journey" },
    description: { bn: "নার্সিং থেকে শিশুর first solid food—feeding journey-এর দুই ধাপের প্রয়োজন মাথায় রেখে সাজানো practical kit।", en: "A practical kit curated for two feeding stages: nursing and baby's first solid foods." },
    images: ["https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1100&q=88", "https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=1100&q=88", "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1100&q=88"],
    items: [{ productId: "product-nursing-pillow", quantity: 1 }, { productId: "product-feeding-maxi", quantity: 1, variant: { bn: "Size অর্ডারের সময় নিশ্চিত হবে", en: "Size confirmed during order" } }, { productId: "product-nursing-pads", quantity: 1 }, { productId: "product-feeding-bowl", quantity: 1 }, { productId: "product-spoon-set", quantity: 1 }, { productId: "product-silicone-bib", quantity: 1 }],
    price: 4590,
    compareAtPrice: 5890,
    stock: 11,
    rating: 4.8,
    reviewCount: 63,
    journeyStage: { bn: "নার্সিং থেকে First Solid Food", en: "Nursing to first solid food" },
    whyThisBox: [{ bn: "মায়ের nursing comfort ও শিশুর feeding tools একসাথে পাওয়া যায়।", en: "Brings together nursing comfort and baby's feeding tools." }, { bn: "Stage বদলালেও kit-এর products কাজে লাগতে থাকে।", en: "The products remain useful as the feeding stage changes." }, { bn: "Compatible feeding essentials খোঁজার ঝামেলা কমায়।", en: "Reduces the work of finding compatible feeding essentials." }],
    preferredFor: [{ bn: "নার্সিং মা", en: "Nursing mothers" }, { bn: "৬ মাসে solid food শুরু", en: "Starting solids at 6 months" }, { bn: "প্রথমবারের মা-বাবা", en: "First-time parents" }, { bn: "Feeding essentials gift", en: "Feeding essentials gift" }],
    usageGuide: [{ id: "nursing", title: { bn: "Nursing stage", en: "Nursing stage" }, description: { bn: "Pillow, feeding dress ও nursing pad দিয়ে comfortable routine তৈরি করুন।", en: "Build a comfortable routine with the pillow, feeding dress and nursing pads." } }, { id: "solid", title: { bn: "Solid food শুরু", en: "Starting solids" }, description: { bn: "শিশু developmentally ready হলে bowl ও soft-tip spoon ব্যবহার শুরু করুন।", en: "When baby is developmentally ready, introduce the bowl and soft-tip spoon." } }, { id: "independent", title: { bn: "Self-feeding practice", en: "Self-feeding practice" }, description: { bn: "Suction bowl ও pocket bib দিয়ে supervised self-feeding সহজ করুন।", en: "Use the suction bowl and pocket bib for supervised self-feeding practice." } }],
    selectionReasons: [{ bn: "Mother এবং baby—দুজনের feeding comfort বিবেচনা করা হয়েছে।", en: "Considers feeding comfort for both mother and baby." }, { bn: "Food-contact items সহজে পরিষ্কার করা যায়।", en: "Food-contact items are easy to clean." }, { bn: "একাধিক feeding stage-এ ব্যবহারযোগ্য products রাখা হয়েছে।", en: "Includes products useful across multiple feeding stages." }],
    packaging: [{ bn: "Sectioned protective packaging", en: "Sectioned protective packaging" }, { bn: "Feeding journey mini guide", en: "Feeding journey mini guide" }, { bn: "Care ও cleaning card", en: "Care and cleaning card" }, { bn: "Gift-note option", en: "Gift-note option" }],
    reviews: commonReviews,
    faqs: commonFaqs,
    href: "/solution-box/first-feeding-journey-kit",
  },
  {
    id: "solution-box-bathing",
    slug: "baby-bathing-solution",
    name: { bn: "বেবি বাথিং সল্যুশন", en: "Baby Bathing Solution" },
    subtitle: { bn: "Before, during এবং after-bath care একসাথে", en: "Before, during and after-bath care in one solution" },
    description: { bn: "শিশুর গোসল ও গোসলের পরের care routine সহজ ও organised করতে চারটি প্রয়োজনীয় product।", en: "Four essentials that make baby's bath and after-bath care routine simple and organized." },
    images: ["https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1100&q=88", "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1100&q=88", "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1100&q=88"],
    items: [{ productId: "product-hooded-towel", quantity: 1 }, { productId: "product-baby-wash", quantity: 1 }, { productId: "product-baby-moisturizer", quantity: 1 }, { productId: "product-nail-care", quantity: 1 }],
    price: 2190,
    compareAtPrice: 2760,
    stock: 16,
    rating: 4.8,
    reviewCount: 58,
    journeyStage: { bn: "নিউবর্ন থেকে Toddler Bath Care", en: "Newborn to toddler bath care" },
    whyThisBox: [{ bn: "Bath ও after-bath care-এর প্রয়োজনীয় items একসাথে থাকে।", en: "Keeps bath and after-bath essentials together." }, { bn: "Routine organised থাকায় নতুন মা-বাবার কাজ সহজ হয়।", en: "An organized routine makes care easier for new parents." }, { bn: "আলাদা product খোঁজার সময় কমে।", en: "Reduces time spent finding separate products." }],
    preferredFor: [{ bn: "নবজাতক ও শিশু", en: "Newborns and babies" }, { bn: "প্রথম bath-care setup", en: "First bath-care setup" }, { bn: "নতুন মা-বাবা", en: "New parents" }, { bn: "Useful baby gift", en: "Useful baby gift" }],
    usageGuide: [{ id: "before", title: { bn: "Before bath", en: "Before bath" }, description: { bn: "Towel, clean clothes ও care products হাতের কাছে রাখুন।", en: "Keep the towel, clean clothes and care products within reach." } }, { id: "during", title: { bn: "During bath", en: "During bath" }, description: { bn: "Baby wash-এর label ও age guidance অনুসরণ করে ব্যবহার করুন।", en: "Use the baby wash according to its label and age guidance." } }, { id: "after", title: { bn: "After bath", en: "After bath" }, description: { bn: "Hooded towel দিয়ে শুকিয়ে প্রয়োজন অনুযায়ী moisturizer ব্যবহার করুন।", en: "Dry with the hooded towel and apply moisturizer as needed." } }],
    selectionReasons: [{ bn: "Simple everyday bath routine অনুযায়ী বাছাই।", en: "Selected around a simple everyday bath routine." }, { bn: "ব্যবহার ও পরিষ্কার করা সহজ products।", en: "Products that are easy to use and clean." }, { bn: "Before, during ও after-bath needs-এর balance।", en: "Balances before, during and after-bath needs." }],
    packaging: [{ bn: "Leak-protected product packing", en: "Leak-protected product packing" }, { bn: "Bath routine mini guide", en: "Bath routine mini guide" }, { bn: "Maaniko branded box", en: "Maaniko branded box" }, { bn: "Gift-ready presentation", en: "Gift-ready presentation" }],
    reviews: commonReviews,
    faqs: commonFaqs,
    href: "/solution-box/baby-bathing-solution",
  },
  {
    id: "solution-box-health",
    slug: "baby-health-safety-box",
    name: { bn: "বেবি হেলথ অ্যান্ড সেফটি বক্স", en: "Baby Health & Safety Box" },
    subtitle: { bn: "ঘরের basic baby-care kit-এর প্রয়োজনীয় উপকরণ", en: "Essential tools for a basic at-home baby-care kit" },
    description: { bn: "Daily monitoring, nasal care, grooming এবং organised storage-এর জন্য বাছাই করা practical tools।", en: "Practical tools selected for everyday monitoring, nasal care, grooming and organized storage." },
    images: ["https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1100&q=88", "https://images.unsplash.com/photo-1580281658628-5262fbf84c1c?auto=format&fit=crop&w=1100&q=88", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1100&q=88"],
    items: [{ productId: "product-thermometer", quantity: 1 }, { productId: "product-nasal-aspirator", quantity: 1 }, { productId: "product-nail-care", quantity: 1 }, { productId: "product-diaper-bag", quantity: 1 }],
    price: 2990,
    compareAtPrice: 3690,
    stock: 13,
    rating: 4.8,
    reviewCount: 47,
    journeyStage: { bn: "নিউবর্ন ও Baby Daily Care", en: "Newborn and baby daily care" },
    whyThisBox: [{ bn: "Basic care tools এক জায়গায় organised রাখা যায়।", en: "Keeps basic care tools organized in one place." }, { bn: "ঘর ও ভ্রমণ—দুই জায়গাতেই carry করা সহজ।", en: "Easy to carry at home or while travelling." }, { bn: "প্রয়োজনের সময় essential tool খুঁজে পাওয়া সহজ হয়।", en: "Makes it easier to find an essential tool when needed." }],
    preferredFor: [{ bn: "নবজাতকের মা-বাবা", en: "Newborn parents" }, { bn: "Home baby-care kit", en: "Home baby-care kit" }, { bn: "ভ্রমণ", en: "Travel" }, { bn: "Practical gift", en: "Practical gift" }],
    usageGuide: [{ id: "organize", title: { bn: "Organize", en: "Organize" }, description: { bn: "সব tools পরিষ্কার ও শুকনো অবস্থায় dedicated compartment-এ রাখুন।", en: "Store all tools clean and dry in dedicated compartments." } }, { id: "read", title: { bn: "Instructions পড়ুন", en: "Read instructions" }, description: { bn: "প্রতিটি health tool ব্যবহারের আগে তার manufacturer guide অনুসরণ করুন।", en: "Follow each manufacturer's guide before using any health tool." } }, { id: "support", title: { bn: "প্রয়োজনে professional care", en: "Seek professional care" }, description: { bn: "এগুলো basic monitoring tools; শিশুর অসুস্থতায় চিকিৎসকের পরামর্শ নিন।", en: "These are basic monitoring tools; seek medical advice when baby is unwell." } }],
    selectionReasons: [{ bn: "শুধু practical basic-care tools রাখা হয়েছে।", en: "Includes only practical basic-care tools." }, { bn: "পরিষ্কার ও সংরক্ষণ সহজ এমন products।", en: "Products that are easy to clean and store." }, { bn: "Medical claim নয়—responsible daily monitoring-এ focus।", en: "Focuses on responsible daily monitoring, not medical claims." }],
    packaging: [{ bn: "Protective individual wrapping", en: "Protective individual wrapping" }, { bn: "Tool storage checklist", en: "Tool storage checklist" }, { bn: "Usage reminder card", en: "Usage reminder card" }, { bn: "Maaniko branded box", en: "Maaniko branded box" }],
    reviews: commonReviews,
    faqs: commonFaqs,
    href: "/solution-box/baby-health-safety-box",
  },
  {
    id: "solution-box-postpartum",
    slug: "postpartum-comfort-box",
    name: { bn: "পোস্টপার্টাম কমফোর্ট বক্স", en: "Postpartum Comfort Box" },
    subtitle: { bn: "নতুন মায়ের comfort, nursing ও recovery care", en: "Comfort, nursing and recovery care for a new mother" },
    description: { bn: "Delivery-এর পর মায়ের আরাম, hygiene ও feeding routine সহজ করতে thoughtfully curated postpartum essentials।", en: "Thoughtfully curated postpartum essentials that support a new mother's comfort, hygiene and feeding routine." },
    images: ["https://images.unsplash.com/photo-1616627451515-cbc80e5ece35?auto=format&fit=crop&w=1100&q=88", "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1100&q=88", "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1100&q=88"],
    items: [{ productId: "product-feeding-maxi", quantity: 1, variant: { bn: "Size অর্ডারের সময় নিশ্চিত হবে", en: "Size confirmed during order" } }, { productId: "product-nursing-pillow", quantity: 1 }, { productId: "product-nursing-pads", quantity: 1 }, { productId: "product-recovery-belt", quantity: 1, variant: { bn: "অ্যাডজাস্টেবল", en: "Adjustable" } }, { productId: "product-maternity-pads", quantity: 1 }],
    price: 4690,
    compareAtPrice: 5990,
    stock: 10,
    rating: 4.9,
    reviewCount: 82,
    journeyStage: { bn: "Delivery-এর পর প্রথম ১২ সপ্তাহ", en: "First 12 weeks after delivery" },
    whyThisBox: [{ bn: "Comfort, feeding ও hygiene care একসাথে কভার করে।", en: "Combines comfort, feeding and hygiene care." }, { bn: "নতুন মায়ের জন্য আলাদা shopping-এর চাপ কমায়।", en: "Reduces separate shopping pressure for a new mother." }, { bn: "নিজের জন্য বা thoughtful gift—দুইভাবেই উপযোগী।", en: "Suitable for self-care or as a thoughtful gift." }],
    preferredFor: [{ bn: "নতুন মা", en: "New mothers" }, { bn: "নার্সিং মা", en: "Nursing mothers" }, { bn: "Delivery-এর পর recovery", en: "Post-delivery recovery" }, { bn: "New-mother gift", en: "New-mother gift" }],
    usageGuide: [{ id: "first-days", title: { bn: "প্রথম কয়েক দিন", en: "First few days" }, description: { bn: "Maternity pad ও comfortable feeding dress আগে থেকেই হাতের কাছে রাখুন।", en: "Keep maternity pads and a comfortable feeding dress within reach." } }, { id: "feeding", title: { bn: "Feeding comfort", en: "Feeding comfort" }, description: { bn: "Pillow ও nursing pads দিয়ে comfortable feeding setup তৈরি করুন।", en: "Create a comfortable feeding setup with the pillow and nursing pads." } }, { id: "recovery", title: { bn: "Recovery support", en: "Recovery support" }, description: { bn: "Recovery belt ব্যবহারের আগে নিজের care provider-এর guidance অনুসরণ করুন।", en: "Follow your care provider's guidance before using the recovery belt." } }],
    selectionReasons: [{ bn: "Mother-first comfort ও dignity বিবেচনা করা হয়েছে।", en: "Prioritizes mother-first comfort and dignity." }, { bn: "Postpartum daily routine-এ বাস্তবে কাজে লাগে এমন items।", en: "Items with practical value in a postpartum routine." }, { bn: "Care-provider guidance প্রয়োজন এমন item-এ responsible note রাখা হয়েছে।", en: "Includes responsible guidance for items that may need care-provider input." }],
    packaging: [{ bn: "Discreet protective packaging", en: "Discreet protective packaging" }, { bn: "Postpartum care checklist", en: "Postpartum care checklist" }, { bn: "Personalized support card", en: "Personalized support card" }, { bn: "Gift-ready Maaniko box", en: "Gift-ready Maaniko box" }],
    reviews: commonReviews,
    faqs: commonFaqs,
    href: "/solution-box/postpartum-comfort-box",
  },
];

export type ResolvedSolutionBoxItem = {
  relation: SolutionBoxItem;
  product: MaanikoProduct;
};

export function getSolutionBoxItems(box: SolutionBox): ResolvedSolutionBoxItem[] {
  return box.items.map((relation) => {
    const product = productsById.get(relation.productId);

    if (!product) {
      throw new Error(`Missing product relation: ${relation.productId} in ${box.slug}`);
    }

    return { relation, product };
  });
}

export function getSolutionBoxBySlug(slug: string) {
  return solutionBoxes.find((box) => box.slug === slug);
}

export function solutionBoxToProduct(box: SolutionBox): MaanikoProduct {
  return {
    id: box.id,
    slug: box.slug,
    href: box.href,
    name: box.name,
    description: box.description,
    category: { bn: "মানিকো সল্যুশন বক্স", en: "Maaniko Solution Box" },
    badge: { bn: "কিউরেটেড কম্বো", en: "Curated combo" },
    images: [...box.images],
    price: box.price,
    compareAtPrice: box.compareAtPrice,
    stock: box.stock,
    rating: box.rating,
    reviewCount: box.reviewCount,
    productType: "combo",
    comboItems: getSolutionBoxItems(box).map(({ relation, product }) => ({
      productId: product.id,
      slug: product.slug,
      href: `/products/${product.slug}`,
      name: product.name,
      image: product.images[0] ?? "",
      quantity: relation.quantity,
      variant: relation.variant,
    })),
  };
}

export const solutionBoxProducts = solutionBoxes.map(solutionBoxToProduct);

export function calculateSolutionBoxRetailTotal(box: SolutionBox) {
  return getSolutionBoxItems(box).reduce(
    (total, { relation, product }) => total + product.price * relation.quantity,
    0,
  );
}

export function localizeValue(value: LocalizedValue, language: "bn" | "en") {
  return value[language] ?? value.bn ?? value.en ?? "";
}