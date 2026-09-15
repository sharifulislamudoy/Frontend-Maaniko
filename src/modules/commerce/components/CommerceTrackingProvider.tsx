"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import {
  commerceApi,
  getGuestId,
  getSessionId,
} from "@/modules/commerce/lib/client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    clarity?: (...args: unknown[]) => void;
    posthog?: {
      capture?: (event: string, properties?: Record<string, unknown>) => void;
    };
    fbq?: (...args: unknown[]) => void;
  }
}

function forwardToInstalledAnalytics(
  event: string,
  properties: Record<string, unknown>,
) {
  try {
    window.dataLayer?.push({ event, ...properties });
    window.clarity?.("event", event);
    window.posthog?.capture?.(event, properties);
    window.fbq?.("trackCustom", event, properties);
  } catch {
    // Analytics SDK failures must never affect the shopping experience.
  }
}

export default function CommerceTrackingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    getGuestId();
    getSessionId();
  }, []);

  useEffect(() => {
    const started = Date.now();
    const params = new URLSearchParams(window.location.search);
    const properties = {
      path: `${pathname}${window.location.search}`,
      utm_source: params.get("utm_source") ?? undefined,
      utm_medium: params.get("utm_medium") ?? undefined,
      utm_campaign: params.get("utm_campaign") ?? undefined,
    };

    forwardToInstalledAnalytics("maaniko_page_view", properties);

    void commerceApi
      .track({
        type: "PAGE_VIEW",
        path: properties.path,
        referrer: document.referrer || undefined,
        utmSource: properties.utm_source,
        utmMedium: properties.utm_medium,
        utmCampaign: properties.utm_campaign,
      })
      .catch(() => undefined);

    return () => {
      const activeSeconds = Math.max(
        0,
        Math.round((Date.now() - started) / 1000),
      );
      forwardToInstalledAnalytics("maaniko_page_leave", {
        path: pathname,
        active_seconds: activeSeconds,
      });
      void commerceApi
        .track({
          type: "PAGE_LEAVE",
          path: pathname,
          metadata: { activeSeconds },
        })
        .catch(() => undefined);
    };
  }, [pathname]);

  return children;
}
