import type { Metadata } from "next";
import { Baloo_Da_2, Hind_Siliguri, Poppins } from "next/font/google";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

import { LanguageProvider } from "@/context/LanguageContext";
import {
  LANGUAGE_COOKIE_NAME,
  normalizeLanguage,
} from "@/i18n/config";

import "./globals.css";

const balooDa2 = Baloo_Da_2({
  variable: "--font-baloo-da-2",
  subsets: ["bengali", "latin"],
  weight: ["600", "700"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maaniko",
    template: "%s | Maaniko",
  },
  description: "Maaniko — beside every mother, every step.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();

  const initialLanguage = normalizeLanguage(
    cookieStore.get(LANGUAGE_COOKIE_NAME)?.value,
  );

  return (
    <html
      lang={initialLanguage}
      dir="ltr"
      className={`${balooDa2.variable} ${hindSiliguri.variable} ${poppins.variable}`}
    >
      <body>
        <LanguageProvider initialLanguage={initialLanguage}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}