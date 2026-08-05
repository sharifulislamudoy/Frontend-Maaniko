import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

import { LanguageProvider } from "@/context/LanguageContext";
import {
  LANGUAGE_COOKIE_NAME,
  normalizeLanguage,
} from "@/i18n/config";

import "./globals.css";

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
    <html lang={initialLanguage} dir="ltr">
      <body>
        <LanguageProvider initialLanguage={initialLanguage}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
