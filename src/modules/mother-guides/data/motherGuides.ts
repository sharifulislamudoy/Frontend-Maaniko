import type { SiteText } from "@/modules/site-content/types/site-text";

export type MotherGuideIcon =
  | "pregnancy"
  | "hospital"
  | "newborn"
  | "breastfeeding"
  | "feeding"
  | "sleep"
  | "bath"
  | "hygiene"
  | "fever"
  | "recovery";

export type MotherGuideContentBlock = {
  title: SiteText;
  points: SiteText[];
};

export type MotherGuideRecord = {
  id: string;
  slug: string;
  cardTitle: string;
  title: SiteText;
  description: SiteText;
  summary: SiteText;
  image: string;
  imageAlt: SiteText;
  icon: MotherGuideIcon;
  content: MotherGuideContentBlock[];
  importantNote: SiteText;
  source: {
    label: string;
    url: string;
  };
};

export const motherGuideRecords: MotherGuideRecord[] = [
  {
    id: "mother-guide-pregnancy",
    slug: "pregnancy-essentials",
    cardTitle: "Pregnancy Guide",
    title: "গর্ভাবস্থার প্রয়োজনীয় গাইড",
    description: "গর্ভাবস্থার প্রতিটি ধাপের যত্ন ও সতর্কতার সংক্ষিপ্ত গাইড",
    summary:
      "নিয়মিত checkup, সুষম খাবার, পর্যাপ্ত বিশ্রাম এবং বিপদের লক্ষণ দ্রুত চিনতে পারা নিরাপদ গর্ভাবস্থার মূল ভিত্তি।",
    image:
      "https://images.pexels.com/photos/4620784/pexels-photo-4620784.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "বই পড়ছেন একজন গর্ভবতী মা",
    icon: "pregnancy",
    content: [
      {
        title: "নিয়মিত যত্ন",
        points: [
          "চিকিৎসকের schedule অনুযায়ী antenatal checkup করুন।",
          "সুষম খাবার, পানি ও prescribed supplement গ্রহণ করুন।",
          "অনুমোদিত হালকা ব্যায়াম ও পর্যাপ্ত ঘুম বজায় রাখুন।",
        ],
      },
      {
        title: "জরুরি সতর্কতা",
        points: [
          "রক্তপাত, তীব্র পেটব্যথা বা পানি ভাঙলে দ্রুত চিকিৎসা নিন।",
          "তীব্র মাথাব্যথা, ঝাপসা দেখা বা শ্বাসকষ্ট অবহেলা করবেন না।",
          "শিশুর নড়াচড়া কমে গেলে দ্রুত চিকিৎসকের সঙ্গে যোগাযোগ করুন।",
        ],
      },
    ],
    importantNote:
      "ওষুধ, supplement বা ব্যায়াম শুরু করার আগে চিকিৎসকের পরামর্শ নিন।",
    source: {
      label: "WHO pregnancy guidance",
      url: "https://www.who.int/tools/your-life-your-health/life-phase/pregnancy--birth-and-after-childbirth/keeping-well-during-pregnancy-and-after-childbirth",
    },
  },
  {
    id: "mother-guide-hospital-bag",
    slug: "hospital-bag-checklist",
    cardTitle: "Hospital Bag Checklist",
    title: "হাসপাতাল ব্যাগ চেকলিস্ট",
    description: "মা, শিশু ও প্রয়োজনীয় কাগজপত্রের সহজ packing list",
    summary:
      "প্রসবের কয়েক সপ্তাহ আগেই মা, শিশু ও কাগজপত্র আলাদা ভাগে গুছিয়ে রাখলে শেষ মুহূর্তের চাপ কমে।",
    image:
      "https://images.pexels.com/photos/5427313/pexels-photo-5427313.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "শিশুর পোশাক গুছিয়ে রাখছেন একজন মা",
    icon: "hospital",
    content: [
      {
        title: "মায়ের জন্য",
        points: [
          "Hospital notes, পরিচয়পত্র ও চিকিৎসার report রাখুন।",
          "ঢিলেঢালা পোশাক, nursing bra, maternity pad ও toiletries নিন।",
          "ফোন, charger, payment essentials ও নিয়মিত ওষুধ রাখুন।",
        ],
      },
      {
        title: "শিশুর জন্য",
        points: [
          "২–৩ সেট cotton পোশাক, cap, socks ও going-home outfit।",
          "Newborn diaper, muslin cloth ও আবহাওয়া উপযোগী blanket।",
          "ব্যবহার করলে baby car seat আগে থেকেই প্রস্তুত রাখুন।",
        ],
      },
    ],
    importantNote:
      "আপনার hospital-এর নিজস্ব তালিকা থাকলে সেটিকেই অগ্রাধিকার দিন।",
    source: {
      label: "NHS hospital bag checklist",
      url: "https://www.nhs.uk/best-start-in-life/pregnancy/preparing-for-labour-and-birth/hospital-bag-checklist/",
    },
  },
  {
    id: "mother-guide-newborn",
    slug: "newborn-essentials",
    cardTitle: "Newborn Checklist",
    title: "নবজাতকের প্রয়োজনীয় চেকলিস্ট",
    description: "নবজাতকের দৈনন্দিন যত্নে যা সত্যিই প্রয়োজন",
    summary:
      "অল্প কিন্তু নিরাপদ ও সহজে পরিষ্কার করা যায় এমন জিনিস বেছে নিন; নিরাপদ ঘুম ও পরিচ্ছন্নতা সবচেয়ে গুরুত্বপূর্ণ।",
    image:
      "https://images.pexels.com/photos/11369390/pexels-photo-11369390.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "বিছানায় শুয়ে থাকা নবজাতক",
    icon: "newborn",
    content: [
      {
        title: "দৈনন্দিন প্রয়োজন",
        points: [
          "Soft cotton পোশাক, diaper, muslin cloth ও পরিষ্কার towel।",
          "Digital thermometer ও চিকিৎসকের জরুরি contact number রাখুন।",
          "Feeding অনুযায়ী পরিষ্কার ও sterilized সরঞ্জাম ব্যবহার করুন।",
        ],
      },
      {
        title: "নিরাপত্তা",
        points: [
          "শিশুকে ধরার আগে সাবান দিয়ে হাত ধুয়ে নিন।",
          "চিত করে শক্ত ও সমতল sleep surface-এ শোয়ান।",
          "খাবার না খাওয়া, দ্রুত শ্বাস বা জ্বরে দ্রুত চিকিৎসা নিন।",
        ],
      },
    ],
    importantNote:
      "দামি gadget-এর চেয়ে নিরাপদ ব্যবহার ও পরিচ্ছন্ন routine বেশি গুরুত্বপূর্ণ।",
    source: {
      label: "WHO newborn care",
      url: "https://www.who.int/tools/your-life-your-health/life-phase/newborns-and-children-under-5-years/caring-for-newborns",
    },
  },
  {
    id: "mother-guide-breastfeeding",
    slug: "breastfeeding-basics",
    cardTitle: "Breastfeeding Basics",
    title: "Breastfeeding-এর প্রাথমিক গাইড",
    description: "শুরু, latch এবং feeding ভালো হচ্ছে কি না বোঝার সহজ উপায়",
    summary:
      "জন্মের পর দ্রুত skin-to-skin contact ও breastfeeding শুরু করা এবং শিশুর চাহিদা অনুযায়ী feed করানো উপকারী।",
    image:
      "https://images.pexels.com/photos/23174623/pexels-photo-23174623.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "নবজাতককে বুকের দুধ খাওয়াচ্ছেন একজন মা",
    icon: "breastfeeding",
    content: [
      {
        title: "ভালো শুরু",
        points: [
          "সম্ভব হলে জন্মের প্রথম ঘণ্টায় breastfeeding শুরু করুন।",
          "মুখ বড় করে খোলা ও areola-এর অংশ মুখে থাকা deep latch-এর লক্ষণ।",
          "শিশুর hunger cue অনুযায়ী দিন-রাতে feed করান।",
        ],
      },
      {
        title: "সহায়তা নিন যখন",
        points: [
          "প্রতিবার feed-এ তীব্র ব্যথা, ক্ষত বা bleeding হয়।",
          "শিশু latch করতে পারে না বা feeding কমে যায়।",
          "Wet diaper কমে যায় বা ওজন নিয়ে উদ্বেগ থাকে।",
        ],
      },
    ],
    importantNote:
      "সমস্যা হলে lactation consultant, midwife বা শিশুর চিকিৎসকের সহায়তা নিন।",
    source: {
      label: "WHO breastfeeding guidance",
      url: "https://www.who.int/health-topics/breastfeeding",
    },
  },
  {
    id: "mother-guide-feeding",
    slug: "complementary-feeding",
    cardTitle: "Feeding Tips",
    title: "শিশুর complementary feeding গাইড",
    description: "কখন ও কীভাবে নরম খাবার শুরু করবেন",
    summary:
      "সাধারণত প্রায় ৬ মাস বয়সে breast milk-এর পাশাপাশি বয়স উপযোগী, পুষ্টিকর ও নিরাপদ খাবার অল্প করে শুরু করা হয়।",
    image:
      "https://images.pexels.com/photos/4409276/pexels-photo-4409276.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "চামচ দিয়ে খাবার খাচ্ছে শিশু",
    icon: "feeding",
    content: [
      {
        title: "শুরু করার নিয়ম",
        points: [
          "সোজা হয়ে বসতে ও খাবার গিলতে পারার readiness লক্ষ্য করুন।",
          "একবারে অল্প একটি নরম খাবার দিন ও প্রতিক্রিয়া লক্ষ্য করুন।",
          "বয়সের সঙ্গে texture ও খাবারের বৈচিত্র্য বাড়ান।",
        ],
      },
      {
        title: "যা এড়িয়ে চলবেন",
        points: [
          "১ বছরের আগে honey নয়; whole nuts এড়িয়ে চলুন।",
          "অতিরিক্ত লবণ, চিনি ও ultra-processed খাবার সীমিত রাখুন।",
          "খাওয়ার সময় একা রাখবেন না বা জোর করে খাওয়াবেন না।",
        ],
      },
    ],
    importantNote:
      "Premature baby বা allergy risk থাকলে চিকিৎসকের পরামর্শ নিন।",
    source: {
      label: "WHO complementary feeding",
      url: "https://www.who.int/health-topics/complementary-feeding",
    },
  },
  {
    id: "mother-guide-sleep",
    slug: "safe-baby-sleep",
    cardTitle: "Baby Sleep Guide",
    title: "শিশুর নিরাপদ ঘুমের গাইড",
    description: "নিরাপদ sleep setup ও সহজ bedtime routine",
    summary:
      "প্রতিবার ঘুমে শিশুকে চিত করে শক্ত, সমতল ও আলাদা sleep surface-এ শোয়ানো নিরাপদ ঘুমের প্রধান নিয়ম।",
    image:
      "https://images.pexels.com/photos/20646526/pexels-photo-20646526.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "নিরাপদভাবে ঘুমিয়ে থাকা নবজাতক",
    icon: "sleep",
    content: [
      {
        title: "নিরাপদ setup",
        points: [
          "Nap ও রাত—প্রতিবার শিশুকে চিত করে শোয়ান।",
          "শক্ত, সমতল mattress-এ শুধু fitted sheet ব্যবহার করুন।",
          "Pillow, loose blanket, bumper ও soft toy সরান।",
        ],
      },
      {
        title: "সহজ routine",
        points: [
          "রাতে আলো ও শব্দ কমিয়ে শান্ত পরিবেশ তৈরি করুন।",
          "Feed, burp ও diaper change-এর পর একই routine রাখুন।",
          "একই room-এ থাকুন, কিন্তু একই bed বা sofa-তে নয়।",
        ],
      },
    ],
    importantNote:
      "Nursing pillow, inclined sleeper বা car seat-কে routine sleep surface হিসেবে ব্যবহার করবেন না।",
    source: {
      label: "CDC safe sleep guidance",
      url: "https://www.cdc.gov/sudden-infant-death/sleep-safely/index.html",
    },
  },
  {
    id: "mother-guide-bath",
    slug: "baby-bath-skin-care",
    cardTitle: "Bath & Skin Care",
    title: "শিশুর গোসল ও ত্বকের যত্ন",
    description: "নিরাপদ গোসল ও skin irritation কমানোর নিয়ম",
    summary:
      "কুসুম গরম পানি, অল্প সময়ের গোসল এবং fragrance-free যত্ন শিশুর সংবেদনশীল ত্বক রক্ষায় সহায়ক।",
    image:
      "https://images.pexels.com/photos/6849412/pexels-photo-6849412.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "শিশুকে গোসল করাচ্ছেন একজন মা",
    icon: "bath",
    content: [
      {
        title: "গোসলের সময়",
        points: [
          "সব প্রয়োজনীয় জিনিস আগে হাতের কাছে রাখুন।",
          "কুসুম গরম পানি ব্যবহার করে সবসময় শিশুকে support দিন।",
          "পানির কাছে শিশুকে এক মুহূর্তও একা রাখবেন না।",
        ],
      },
      {
        title: "ত্বকের যত্ন",
        points: [
          "গোসলের পর skin fold আলতোভাবে শুকিয়ে নিন।",
          "Mild fragrance-free product ব্যবহার করুন।",
          "ছড়িয়ে পড়া rash, blister বা infection-এ চিকিৎসা নিন।",
        ],
      },
    ],
    importantNote: "নবজাতকের প্রথম দিকে plain water-ই যথেষ্ট হতে পারে।",
    source: {
      label: "NHS newborn skin guidance",
      url: "https://www.nhs.uk/pregnancy/labour-and-birth/getting-to-know-your-newborn/",
    },
  },
  {
    id: "mother-guide-hygiene",
    slug: "diapering-hygiene",
    cardTitle: "Diapering & Hygiene",
    title: "Diapering ও hygiene গাইড",
    description: "সঠিক diaper change ও rash কমানোর সহজ উপায়",
    summary:
      "ভেজা বা নোংরা diaper দ্রুত পরিবর্তন, কোমলভাবে পরিষ্কার এবং ত্বক শুকনো রাখা rash কমাতে সাহায্য করে।",
    image:
      "https://images.pexels.com/photos/7491332/pexels-photo-7491332.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "শিশুর diaper পরিবর্তন করছেন একজন মা",
    icon: "hygiene",
    content: [
      {
        title: "প্রতিবার change",
        points: [
          "ভেজা বা নোংরা diaper দ্রুত পরিবর্তন করুন।",
          "পানি বা fragrance-free wipe দিয়ে সামনে থেকে পেছনে পরিষ্কার করুন।",
          "নতুন diaper-এর আগে ত্বক আলতোভাবে শুকিয়ে নিন।",
        ],
      },
      {
        title: "Rash হলে",
        points: [
          "কিছু সময় diaper-free রেখে বাতাস লাগতে দিন।",
          "পরামর্শ অনুযায়ী simple barrier cream ব্যবহার করুন।",
          "Rash ছড়ালে, ক্ষত বা জ্বর হলে চিকিৎসা নিন।",
        ],
      },
    ],
    importantNote: "Alcohol বা fragrance থাকা wipe irritation বাড়াতে পারে।",
    source: {
      label: "NHS nappy rash guidance",
      url: "https://www.nhs.uk/baby/caring-for-a-newborn/nappy-rash/",
    },
  },
  {
    id: "mother-guide-fever",
    slug: "baby-fever-warning-signs",
    cardTitle: "Fever Warning Signs",
    title: "শিশুর জ্বর: কখন জরুরি",
    description: "তাপমাত্রা মাপা, প্রাথমিক যত্ন ও danger sign",
    summary:
      "৩ মাসের কম বয়সী শিশুর তাপমাত্রা ৩৮°C বা বেশি হলে দ্রুত জরুরি medical assessment প্রয়োজন।",
    image:
      "https://images.pexels.com/photos/3993239/pexels-photo-3993239.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "শিশুকে পরীক্ষা করছেন চিকিৎসক",
    icon: "fever",
    content: [
      {
        title: "প্রথমে যা করবেন",
        points: [
          "Digital thermometer দিয়ে তাপমাত্রা মাপুন।",
          "Breast milk বা age-appropriate fluid বারবার দিন।",
          "ভারী কাপড় খুলুন; ঠান্ডা পানিতে গোসল করাবেন না।",
        ],
      },
      {
        title: "জরুরি লক্ষণ",
        points: [
          "৩ মাসের কম বয়সে ৩৮°C বা বেশি তাপমাত্রা।",
          "শ্বাসকষ্ট, খিঁচুনি বা জাগানো কঠিন।",
          "খাবার না খাওয়া, প্রস্রাব কমা বা না মিলিয়ে যাওয়া rash।",
        ],
      },
    ],
    importantNote:
      "Aspirin দেবেন না; medicine ও dose চিকিৎসকের কাছ থেকে নিশ্চিত করুন।",
    source: {
      label: "NHS baby fever guidance",
      url: "https://www.nhs.uk/baby/health/when-to-get-urgent-medical-help-for-babies-and-children-under-5/",
    },
  },
  {
    id: "mother-guide-recovery",
    slug: "postpartum-recovery",
    cardTitle: "Postpartum Recovery",
    title: "Postpartum recovery গাইড",
    description: "প্রসবের পর শরীর, বিশ্রাম ও মানসিক স্বাস্থ্যের যত্ন",
    summary:
      "Recovery ধীরে হয়। বিশ্রাম, পুষ্টি, wound care ও মানসিক পরিবর্তনের পাশাপাশি warning sign জানা জরুরি।",
    image:
      "https://images.pexels.com/photos/3259628/pexels-photo-3259628.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "নবজাতককে কোলে নিয়ে আছেন একজন মা",
    icon: "recovery",
    content: [
      {
        title: "দৈনন্দিন recovery",
        points: [
          "বিশ্রাম নিন ও পরিবার থেকে practical support গ্রহণ করুন।",
          "পানি, protein, iron-rich খাবার ও balanced meal নিন।",
          "Perineal বা C-section wound নির্দেশনা অনুযায়ী পরিষ্কার রাখুন।",
        ],
      },
      {
        title: "জরুরি warning sign",
        points: [
          "অতিরিক্ত রক্তপাত, তীব্র পেটব্যথা বা দুর্গন্ধযুক্ত discharge।",
          "শ্বাসকষ্ট, বুকব্যথা, অজ্ঞান লাগা বা তীব্র মাথাব্যথা।",
          "নিজেকে বা শিশুকে ক্ষতির চিন্তায় জরুরি সহায়তা নিন।",
        ],
      },
    ],
    importantNote:
      "Postpartum checkup বাদ দেবেন না; শারীরিক ও মানসিক উদ্বেগ জানান।",
    source: {
      label: "CDC maternal warning signs",
      url: "https://www.cdc.gov/hearher/maternal-warning-signs/index.html",
    },
  },
];

export function findMotherGuide(slug: string) {
  return motherGuideRecords.find((guide) => guide.slug === slug);
}
