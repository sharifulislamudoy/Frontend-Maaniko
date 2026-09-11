"use client";

import { useEffect } from "react";
import { commerceApi } from "@/modules/commerce/lib/client";

export default function EntityViewTracker({
  entityType,
  entityId,
}: {
  entityType: "PRODUCT" | "COMBO";
  entityId: string;
}) {
  useEffect(() => {
    void commerceApi
      .track({
        type: entityType === "PRODUCT" ? "PRODUCT_VIEW" : "COMBO_VIEW",
        entityType,
        entityId,
        path: window.location.pathname,
      })
      .catch(() => undefined);
  }, [entityId, entityType]);

  return null;
}
