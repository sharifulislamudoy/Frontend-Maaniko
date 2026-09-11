"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { getCustomerToken } from "@/modules/commerce/lib/client";
import { useEffect, useState } from "react";

export default function CustomerAccountShortcut() {
  const [identified, setIdentified] = useState(false);

  useEffect(() => {
    setIdentified(Boolean(getCustomerToken()));
  }, []);

  return (
    <Link
      href="/my-account"
      className="fixed bottom-[88px] left-3 z-40 inline-flex items-center gap-2 rounded-full border border-[#FC5689]/20 bg-white/95 px-3.5 py-2.5 text-xs font-black text-[#062a54] shadow-[0_10px_30px_rgba(6,42,84,.14)] backdrop-blur md:bottom-[92px] xl:bottom-5"
      aria-label="আমার অর্ডার ও তথ্য"
    >
      <ClipboardList className="size-4 text-[#FC5689]" />
      {identified ? "আমার অর্ডার" : "অর্ডার খুঁজুন"}
    </Link>
  );
}
