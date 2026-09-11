import type { Metadata } from "next";

import MotherGuideDirectory from "@/modules/mother-guides/components/MotherGuideDirectory";

export const metadata: Metadata = {
  title: "মা ও শিশুর যত্নের গাইড | Maaniko",
  description:
    "গর্ভাবস্থা, নবজাতক, ফিডিং, নিরাপদ ঘুম, পরিচ্ছন্নতা ও প্রসব-পরবর্তী যত্নের প্রয়োজনীয় গাইড।",
};

export default function MotherGuidesPage() {
  return <MotherGuideDirectory />;
}
