"use client";

export const GUEST_ID_KEY = "maaniko-guest-id";
export const CUSTOMER_TOKEN_KEY = "maaniko-customer-token";
export const CUSTOMER_NAME_KEY = "maaniko-customer-name";
export const CUSTOMER_PHONE_KEY = "maaniko-customer-phone";
const SESSION_ID_KEY = "maaniko-session-id";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
).replace(/\/$/, "");

function randomId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function getGuestId() {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id = randomId("gst");
    window.localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
}

export function getSessionId() {
  if (typeof window === "undefined") return "";
  let id = window.sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = randomId("ses");
    window.sessionStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

export function getCustomerToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(CUSTOMER_TOKEN_KEY) ?? "";
}

export function getSavedContact() {
  if (typeof window === "undefined") return { name: "", phone: "" };
  return {
    name: window.localStorage.getItem(CUSTOMER_NAME_KEY) ?? "",
    phone: window.localStorage.getItem(CUSTOMER_PHONE_KEY) ?? "",
  };
}

export function saveCustomerIdentity(input: {
  customerToken?: string;
  customer?: { name?: string | null; phone?: string | null };
}) {
  if (typeof window === "undefined") return;
  if (input.customerToken) {
    window.localStorage.setItem(CUSTOMER_TOKEN_KEY, input.customerToken);
  }
  if (input.customer?.name) {
    window.localStorage.setItem(CUSTOMER_NAME_KEY, input.customer.name);
  }
  if (input.customer?.phone) {
    window.localStorage.setItem(CUSTOMER_PHONE_KEY, input.customer.phone);
  }
}

export function clearCustomerIdentity() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CUSTOMER_TOKEN_KEY);
  window.localStorage.removeItem(CUSTOMER_NAME_KEY);
  window.localStorage.removeItem(CUSTOMER_PHONE_KEY);
}

async function apiRequest<T>(
  path: string,
  init: Omit<RequestInit, "body"> & { body?: unknown } = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("X-Maaniko-Guest-Id", getGuestId());
  headers.set("X-Maaniko-Session-Id", getSessionId());
  const token = getCustomerToken();
  if (token) headers.set("X-Maaniko-Customer-Token", token);

  let body: BodyInit | undefined;
  if (init.body !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(init.body);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    body,
    headers,
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      (data && typeof data.message === "string" && data.message) ||
        "অনুরোধটি সম্পন্ন করা যায়নি",
    );
  }
  return data as T;
}

export type CommerceCartItem = {
  id: string;
  clientKey: string;
  quantity: number;
  unitPrice: number;
  isCustomized?: boolean;
  customConfig?: { productId: string; quantity: number }[] | null;
  product: any;
};

export type CommerceCart = {
  id: string | null;
  status: "ACTIVE" | "ABANDONED" | "CONVERTED" | "EXPIRED";
  subtotal: number;
  lastActivityAt?: string;
  items: CommerceCartItem[];
};

export type OrderQuote = {
  items: {
    clientKey: string;
    itemType: "PRODUCT" | "COMBO";
    productId?: string;
    variantId?: string;
    comboId?: string;
    quantity: number;
    name: string;
    image?: string;
    unitPrice: number;
    lineTotal: number;
    customConfig?: {
      productId: string;
      quantity: number;
      name: string;
      image?: string;
      unitPrice: number;
      lineTotal: number;
    }[];
  }[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
};

export const commerceApi = {
  getCart: () => apiRequest<CommerceCart>("/commerce/cart"),

  putCartItem: (clientKey: string, body: unknown) =>
    apiRequest<CommerceCart>(
      `/commerce/cart/items/${encodeURIComponent(clientKey)}`,
      { method: "PUT", body },
    ),

  deleteCartItem: (clientKey: string) =>
    apiRequest<CommerceCart>(
      `/commerce/cart/items/${encodeURIComponent(clientKey)}`,
      { method: "DELETE" },
    ),

  saveCheckoutDraft: (body: unknown) =>
    apiRequest<any>("/commerce/cart/contact", { method: "PATCH", body }),

  saveCart: (body: unknown) =>
    apiRequest<any>("/commerce/cart/save", { method: "POST", body }),

  recoverCart: (token: string) =>
    apiRequest<any>(`/commerce/cart/recover/${encodeURIComponent(token)}`, {
      method: "POST",
    }),

  getWishlist: () => apiRequest<{ items: any[] }>("/commerce/wishlist"),

  putWishlist: (itemType: "PRODUCT" | "COMBO", entityId: string) =>
    apiRequest<{ items: any[] }>(
      `/commerce/wishlist/${itemType}/${encodeURIComponent(entityId)}`,
      { method: "PUT" },
    ),

  deleteWishlist: (itemType: "PRODUCT" | "COMBO", entityId: string) =>
    apiRequest<{ items: any[] }>(
      `/commerce/wishlist/${itemType}/${encodeURIComponent(entityId)}`,
      { method: "DELETE" },
    ),

  saveWishlist: (body: unknown) =>
    apiRequest<any>("/commerce/wishlist/save", { method: "POST", body }),

  captureContact: (body: unknown) =>
    apiRequest<any>("/commerce/contact", { method: "POST", body }),

  restoreProfile: (body: { name: string; phone: string }) =>
    apiRequest<any>("/commerce/restore", { method: "POST", body }),

  me: () => apiRequest<any>("/commerce/me"),

  track: (body: unknown) =>
    apiRequest<any>("/commerce/events", { method: "POST", body }),

  quoteCombo: (
    comboId: string,
    body: {
      customConfig?: { productId: string; quantity: number }[];
      quantity?: number;
    },
  ) =>
    apiRequest<any>(`/commerce/combos/${encodeURIComponent(comboId)}/quote`, {
      method: "POST",
      body,
    }),

  quoteOrder: (body: unknown) =>
    apiRequest<OrderQuote>("/commerce/orders/quote", {
      method: "POST",
      body,
    }),

  createOrder: (body: unknown) =>
    apiRequest<any>("/commerce/orders", {
      method: "POST",
      body,
    }),

  createLead: (body: unknown) =>
    apiRequest<any>("/commerce/leads", {
      method: "POST",
      body,
    }),

  updateCareProfile: (body: unknown) =>
    apiRequest<any>("/commerce/care-profile", {
      method: "PATCH",
      body,
    }),
};
