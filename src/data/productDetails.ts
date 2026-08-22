import type { LocalizedValue } from "@/types/localization";
import type { ProductDetails } from "@/types/product";

function value(bn: string, en: string): LocalizedValue {
  return { bn, en };
}

function details(
  included: [string, string][],
  essential: [string, string][],
  preferred: [string, string][],
): ProductDetails {
  return {
    includedItems: included.map(([bn, en], index) => ({
      id: `included-${index + 1}`,
      name: value(bn, en),
    })),
    whyEssential: essential.map(([bn, en]) => value(bn, en)),
    preferredFor: preferred.map(([bn, en]) => value(bn, en)),
  };
}

export const productDetailsBySlug: Record<string, ProductDetails> = {
  "premium-maternity-dress": details(
    [["প্রিমিয়াম কটন ড্রেস", "Premium cotton dress"], ["দুটি হিডেন ফিডিং জিপ", "Two hidden feeding zips"], ["অ্যাডজাস্টেবল কোমর বেল্ট", "Adjustable waist belt"], ["ফ্যাব্রিক কেয়ার কার্ড", "Fabric care card"]],
    [["গর্ভাবস্থা ও প্রসবের পর শরীরের পরিবর্তনের সঙ্গে সহজে মানিয়ে যায়।", "Adapts comfortably to body changes during and after pregnancy."], ["নরম ও বাতাস চলাচলযোগ্য কটন দীর্ঘ সময় আরাম দেয়।", "Soft, breathable cotton stays comfortable for long hours."], ["গোপন জিপ নার্সিংকে আরও সহজ করে।", "Discreet zips make nursing easier."]],
    [["গর্ভবতী মা", "Expecting mothers"], ["নতুন মা", "New mothers"], ["নার্সিং করান এমন মা", "Nursing mothers"], ["দৈনন্দিন ব্যবহার", "Daily use"]],
  ),
  "feeding-friendly-maxi-dress": details(
    [["ফিডিং ফ্রেন্ডলি ম্যাক্সি", "Feeding-friendly maxi"], ["দুটি গোপন জিপ", "Two discreet zips"], ["অ্যাডজাস্টেবল ওয়েস্ট টাই", "Adjustable waist tie"], ["কেয়ার নির্দেশিকা", "Care guide"]],
    [["বাসা বা বাইরে শিশুকে সহজে ফিডিং করানো যায়।", "Makes feeding convenient at home or outside."], ["হালকা কাপড় ও ঢিলেঢালা কাট চলাফেরায় আরাম দেয়।", "Light fabric and a relaxed cut make movement comfortable."], ["মাতৃত্বের পরেও নিয়মিত পরা যায়।", "Remains wearable beyond maternity."]],
    [["নতুন মা", "New mothers"], ["নার্সিং মা", "Nursing mothers"], ["হাসপাতাল ভিজিট", "Hospital visits"], ["দৈনন্দিন ব্যবহার", "Daily use"]],
  ),
  "mother-baby-diaper-bag": details(
    [["মাল্টি-পকেট ডায়াপার ব্যাগ", "Multi-pocket diaper bag"], ["ইনসুলেটেড বোতল হোল্ডার", "Insulated bottle holder"], ["পোর্টেবল চেঞ্জিং ম্যাট", "Portable changing mat"], ["ওয়াটারপ্রুফ ওয়েট পাউচ", "Waterproof wet pouch"]],
    [["শিশুর প্রয়োজনীয় জিনিস আলাদা করে রাখা যায়।", "Keeps baby's essentials organized."], ["ইনসুলেটেড পকেট বোতলের তাপমাত্রা ধরে রাখতে সাহায্য করে।", "Insulated pockets help maintain bottle temperature."], ["হাত, কাঁধ বা স্ট্রলারে বহন করা যায়।", "Can be carried by hand, shoulder or stroller."]],
    [["নবজাতকের মা-বাবা", "Newborn parents"], ["ভ্রমণ", "Travel"], ["হাসপাতাল ভিজিট", "Hospital visits"], ["দৈনন্দিন বাইরে যাওয়া", "Daily outings"]],
  ),
  "premium-nursing-pillow": details(
    [["সাপোর্টিভ নার্সিং পিলো", "Supportive nursing pillow"], ["রিমুভেবল কটন কভার", "Removable cotton cover"], ["প্রটেকটিভ ইনার লাইনার", "Protective inner liner"], ["স্টোরেজ ব্যাগ", "Storage bag"]],
    [["ফিডিংয়ের সময় আরামদায়ক ভঙ্গি ধরে রাখতে সহায়তা করে।", "Helps maintain a comfortable feeding posture."], ["হাত, কাঁধ ও পিঠের চাপ কমাতে সহায়তা করে।", "Helps reduce strain on arms, shoulders and back."], ["খোলা যায় এমন কভার সহজে পরিষ্কার করা যায়।", "The removable cover is easy to clean."]],
    [["নবজাতক", "Newborns"], ["০–১২ মাসের শিশু", "Babies aged 0–12 months"], ["নতুন মা", "New mothers"], ["ব্রেস্ট ও বোতল ফিডিং", "Breast and bottle feeding"]],
  ),
  "maternity-support-belt": details(
    [["অ্যাডজাস্টেবল সাপোর্ট বেল্ট", "Adjustable support belt"], ["ব্রিদেবল সাপোর্ট প্যানেল", "Breathable support panel"], ["ব্যবহার নির্দেশিকা", "Usage guide"]],
    [["দৈনন্দিন চলাফেরায় পেটের নিচে সাপোর্ট দেয়।", "Supports the lower belly during daily movement."], ["অ্যাডজাস্টেবল ফিট শরীরের পরিবর্তনের সঙ্গে মানিয়ে নেয়।", "The adjustable fit adapts to body changes."], ["পোশাকের নিচে সহজে ব্যবহার করা যায়।", "Can be worn easily under clothing."]],
    [["দ্বিতীয় ট্রাইমেস্টার", "Second trimester"], ["তৃতীয় ট্রাইমেস্টার", "Third trimester"], ["দৈনন্দিন হাঁটাচলা", "Daily movement"], ["অ্যাডজাস্টেবল সাপোর্ট প্রয়োজন", "Adjustable support needs"]],
  ),
  "reusable-nursing-pads": details(
    [["রিইউজেবল নার্সিং প্যাড সেট", "Reusable nursing pad set"], ["ওয়াশ ব্যাগ", "Wash bag"], ["স্টোরেজ পাউচ", "Storage pouch"]],
    [["লিকেজ সামলাতে শোষণক্ষম লেয়ার সহায়তা করে।", "Absorbent layers help manage leakage."], ["ধুয়ে পুনরায় ব্যবহার করা যায়।", "Washable and reusable."], ["নরম পৃষ্ঠ দীর্ঘ সময় আরাম দেয়।", "The soft surface stays comfortable for longer."]],
    [["নতুন মা", "New mothers"], ["নার্সিং মা", "Nursing mothers"], ["দৈনন্দিন ব্যবহার", "Daily use"], ["রিইউজেবল কেয়ার", "Reusable care"]],
  ),
  "baby-hooded-cotton-towel": details(
    [["হুডেড কটন টাওয়েল", "Hooded cotton towel"], ["কেয়ার কার্ড", "Care card"]],
    [["হুড শিশুর মাথা ঢেকে উষ্ণ রাখতে সহায়তা করে।", "The hood helps keep baby's head covered and warm."], ["নরম কটন ভেজা ত্বকে আরামদায়ক।", "Soft cotton feels comfortable on wet skin."], ["প্রতিদিনের গোসলের রুটিনে সহজে ব্যবহার করা যায়।", "Easy to use in the daily bath routine."]],
    [["নবজাতক", "Newborns"], ["০–২৪ মাস", "0–24 months"], ["প্রতিদিনের গোসল", "Daily bath"], ["উপহার", "Gifting"]],
  ),
  "gentle-baby-hair-body-wash": details(
    [["হেয়ার অ্যান্ড বডি ওয়াশ", "Hair & body wash"], ["পাম্প বোতল", "Pump bottle"]],
    [["একটি পণ্যেই চুল ও শরীর পরিষ্কার করা যায়।", "Cleans hair and body with one product."], ["মাইল্ড ফর্মুলা দৈনন্দিন রুটিনের জন্য তৈরি।", "The mild formula is made for a daily routine."], ["পাম্প প্যাক ব্যবহার সহজ করে।", "The pump pack makes use easier."]],
    [["শিশুর দৈনন্দিন গোসল", "Baby's daily bath"], ["মাথা ও শরীর", "Hair and body"], ["বাসায় ব্যবহার", "Home use"], ["ভ্রমণ", "Travel"]],
  ),
  "daily-baby-moisturizer": details(
    [["বেবি ময়েশ্চারাইজার", "Baby moisturizer"], ["ফ্লিপ-টপ বোতল", "Flip-top bottle"]],
    [["গোসলের পর ত্বকের আর্দ্রতা ধরে রাখতে সহায়তা করে।", "Helps maintain skin hydration after bath."], ["হালকা টেক্সচার সহজে ছড়িয়ে যায়।", "The light texture spreads easily."], ["দৈনন্দিন স্কিন-কেয়ার রুটিনকে সহজ করে।", "Simplifies the daily skin-care routine."]],
    [["গোসলের পর", "After bath"], ["দৈনন্দিন ব্যবহার", "Daily use"], ["শুষ্ক আবহাওয়া", "Dry weather"], ["বেবি স্কিন কেয়ার", "Baby skin care"]],
  ),
  "silicone-baby-feeding-bowl": details(
    [["সাকশন ফিডিং বোল", "Suction feeding bowl"], ["ঢাকনা", "Lid"], ["কেয়ার গাইড", "Care guide"]],
    [["সাকশন বেস টেবিলে বোল স্থির রাখতে সাহায্য করে।", "The suction base helps keep the bowl steady."], ["গভীর বোল খাবার তোলা সহজ করে।", "The deep bowl makes scooping food easier."], ["ধুয়ে পরিষ্কার করা সহজ।", "Easy to wash and clean."]],
    [["সলিড ফুড শুরু", "Starting solids"], ["৬ মাসের বেশি শিশু", "Babies 6+ months"], ["সেলফ ফিডিং", "Self-feeding"], ["বাসা ও ভ্রমণ", "Home and travel"]],
  ),
  "soft-tip-baby-spoon-set": details(
    [["সফট-টিপ স্পুন ২টি", "Two soft-tip spoons"], ["স্টোরেজ কেস", "Storage case"]],
    [["ছোট মুখের উপযোগী টিপ ফিডিং সহজ করে।", "The small-mouth tip makes feeding easier."], ["নরম টিপ শিশুর মাড়িতে আরামদায়ক।", "The soft tip feels comfortable on baby's gums."], ["স্টোরেজ কেস বাইরে বহনে সুবিধা দেয়।", "The storage case is convenient for outings."]],
    [["৬ মাসের বেশি শিশু", "Babies 6+ months"], ["পিউরি ও নরম খাবার", "Purees and soft foods"], ["ভ্রমণ", "Travel"], ["দৈনন্দিন ফিডিং", "Daily feeding"]],
  ),
  "adjustable-silicone-bib": details(
    [["অ্যাডজাস্টেবল সিলিকন বিব", "Adjustable silicone bib"], ["ফুড-ক্যাচিং পকেট", "Food-catching pocket"]],
    [["প্রশস্ত পকেট পড়ে যাওয়া খাবার ধরে।", "The wide pocket catches dropped food."], ["অ্যাডজাস্টেবল নেক ফিট শিশুর সঙ্গে মানিয়ে নেয়।", "The adjustable neck fit grows with baby."], ["পানি দিয়ে দ্রুত পরিষ্কার করা যায়।", "Can be rinsed clean quickly."]],
    [["সলিড ফুড", "Solid food"], ["সেলফ ফিডিং", "Self-feeding"], ["৬–৩৬ মাস", "6–36 months"], ["সহজ পরিষ্কার", "Easy cleaning"]],
  ),
  "digital-baby-thermometer": details(
    [["ডিজিটাল থার্মোমিটার", "Digital thermometer"], ["প্রটেকটিভ কেস", "Protective case"], ["ব্যবহার নির্দেশিকা", "Usage guide"]],
    [["ঘরে তাপমাত্রা পর্যবেক্ষণের একটি প্রয়োজনীয় টুল।", "An essential tool for monitoring temperature at home."], ["কমপ্যাক্ট ডিজাইন সংরক্ষণ সহজ করে।", "The compact design is easy to store."], ["ডিজিটাল ডিসপ্লে রিডিং পড়া সহজ করে।", "The digital display is easy to read."]],
    [["নবজাতক ও শিশু", "Newborns and babies"], ["ফার্স্ট-এইড কিট", "First-aid kit"], ["বাসা ও ভ্রমণ", "Home and travel"], ["অভিভাবক", "Parents"]],
  ),
  "manual-baby-nasal-aspirator": details(
    [["ম্যানুয়াল ন্যাসাল অ্যাসপিরেটর", "Manual nasal aspirator"], ["অতিরিক্ত সফট টিপ", "Extra soft tip"], ["স্টোরেজ কেস", "Storage case"]],
    [["অভিভাবক নিয়ন্ত্রিত suction ব্যবহার সহজ করে।", "Parent-controlled suction makes use manageable."], ["সফট টিপ নাকের কাছে আরামদায়কভাবে বসে।", "The soft tip sits comfortably near the nostril."], ["খুলে ধুয়ে পরিষ্কার করা যায়।", "Can be disassembled and washed."]],
    [["নবজাতক ও শিশু", "Newborns and babies"], ["ঘরের বেবি কেয়ার কিট", "Home baby-care kit"], ["ভ্রমণ", "Travel"], ["অভিভাবকের তত্ত্বাবধান", "Parent supervision"]],
  ),
  "baby-nail-care-set": details(
    [["বেবি নেইল ক্লিপার", "Baby nail clipper"], ["সফট ফাইল", "Soft file"], ["কাঁচি", "Scissors"], ["স্টোরেজ কেস", "Storage case"]],
    [["শিশুর ছোট নখের জন্য প্রয়োজনীয় টুল একসাথে থাকে।", "Keeps the essential tools for baby's tiny nails together."], ["কমপ্যাক্ট কেস টুলগুলো গোছানো রাখে।", "The compact case keeps tools organized."], ["নিয়মিত গ্রুমিং রুটিন সহজ করে।", "Makes regular grooming easier."]],
    [["নবজাতক", "Newborns"], ["শিশু", "Babies"], ["বাসায় গ্রুমিং", "Home grooming"], ["ভ্রমণ", "Travel"]],
  ),
  "postpartum-recovery-belt": details(
    [["অ্যাডজাস্টেবল রিকভারি বেল্ট", "Adjustable recovery belt"], ["সাপোর্ট প্যানেল", "Support panel"], ["ব্যবহার নির্দেশিকা", "Usage guide"]],
    [["দৈনন্দিন চলাফেরায় অ্যাবডোমিনাল সাপোর্ট দেয়।", "Provides abdominal support during daily movement."], ["অ্যাডজাস্টেবল ফিট প্রয়োজনমতো সেট করা যায়।", "The adjustable fit can be set as needed."], ["পোশাকের নিচে ব্যবহার করা যায়।", "Can be worn under clothing."]],
    [["প্রসব-পরবর্তী মা", "Postpartum mothers"], ["রিকভারি সময়", "Recovery period"], ["দৈনন্দিন চলাফেরা", "Daily movement"], ["অ্যাডজাস্টেবল সাপোর্ট", "Adjustable support"]],
  ),
  "maternity-sanitary-pad-pack": details(
    [["হাই-অ্যাবজরবেন্স ম্যাটারনিটি প্যাড", "High-absorbency maternity pads"], ["হাইজিন পাউচ", "Hygiene pouch"]],
    [["হাসপাতাল ব্যাগে আগে থেকে প্রস্তুত রাখা যায়।", "Can be prepared in advance in the hospital bag."], ["পোস্টপার্টাম সময়ের প্রয়োজন অনুযায়ী বেশি শোষণক্ষম।", "Higher absorbency for postpartum needs."], ["আলাদা প্যাক সংরক্ষণ সহজ করে।", "The separate pack is easy to store."]],
    [["হাসপাতাল ব্যাগ", "Hospital bag"], ["প্রসব-পরবর্তী সময়", "Postpartum period"], ["নতুন মা", "New mothers"], ["ম্যাটারনিটি কেয়ার", "Maternity care"]],
  ),
  "breathable-cotton-baby-swaddle": details(
    [["কটন সোয়াডল", "Cotton swaddle"], ["ওয়াশ ও কেয়ার কার্ড", "Wash and care card"]],
    [["নবজাতককে আরামদায়কভাবে জড়িয়ে রাখতে সাহায্য করে।", "Helps wrap a newborn comfortably."], ["ব্রিদেবল কটন দৈনন্দিন ব্যবহারের উপযোগী।", "Breathable cotton suits everyday use."], ["হালকা কাপড় সহজে ভাঁজ ও বহন করা যায়।", "The lightweight fabric folds and travels easily."]],
    [["নবজাতক", "Newborns"], ["হাসপাতাল থেকে বাসায় আসা", "Coming home from hospital"], ["ঘুম ও বিশ্রাম", "Sleep and rest"], ["উপহার", "Gifting"]],
  ),
};
