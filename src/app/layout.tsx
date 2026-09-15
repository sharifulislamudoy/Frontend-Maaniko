import type { Metadata } from "next";
import { Baloo_Da_2, Hind_Siliguri, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { SiteTextProvider } from "@/modules/site-content/context/SiteTextContext";

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

const homeIntroBootstrapScript = `
  (function () {
    try {
      var storageKey = "maaniko-home-intro-expires-at";
      var expiresAt = Number(
        window.localStorage.getItem(storageKey)
      );

      if (
        Number.isFinite(expiresAt) &&
        expiresAt > Date.now()
      ) {
        document.documentElement.setAttribute(
          "data-maaniko-intro",
          "skip"
        );
      } else {
        document.documentElement.removeAttribute(
          "data-maaniko-intro"
        );
      }
    } catch (error) {
      document.documentElement.removeAttribute(
        "data-maaniko-intro"
      );
    }
  })();
`;

export const metadata: Metadata = {
  title: {
    default: "Maaniko",
    template: "%s | Maaniko",
  },
  description: "মানিকো—মায়ের পাশে, প্রতিটি ধাপে।",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="bn"
      dir="ltr"
      suppressHydrationWarning
      className={`${balooDa2.variable} ${hindSiliguri.variable} ${poppins.variable}`}
    >
      <head>
        {/*
         * Cooldown active থাকলে React hydration হওয়ার আগেই
         * loader hide করে দেয়।
         */}
        <style>{`
          html[data-maaniko-intro="skip"]
          .maaniko-home-intro {
            display: none !important;
          }
        `}</style>

        <script
          dangerouslySetInnerHTML={{
            __html: homeIntroBootstrapScript,
          }}
        />
      </head>

      <body suppressHydrationWarning>
        <SiteTextProvider>
          {children}

          <Toaster
            position="top-right"
            theme="light"
            richColors
            closeButton
            expand={false}
            duration={3500}
            toastOptions={{
              style: {
                fontFamily: "var(--font-app-body)",
                borderRadius: "16px",
              },
            }}
          />
        </SiteTextProvider>
      </body>
    </html>
  );
}
