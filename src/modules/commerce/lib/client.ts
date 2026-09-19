"use client";

export const GUEST_ID_KEY = "maaniko-guest-id";
export const CUSTOMER_TOKEN_KEY = "maaniko-customer-token";
export const CUSTOMER_NAME_KEY = "maaniko-customer-name";
export const CUSTOMER_PHONE_KEY = "maaniko-customer-phone";
const SESSION_ID_KEY = "maaniko-session-id";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
).replace(/\/$/, "");
const inFlightGetRequests = new Map<string, Promise<unknown>>();

export class CommerceApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly data: Record<string, unknown> | null,
  ) {
    super(message);
    this.name = "CommerceApiError";
  }
}

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
  const guestId = getGuestId();
  const sessionId = getSessionId();
  const token = getCustomerToken();
  headers.set("Accept", "application/json");
  headers.set("X-Maaniko-Guest-Id", guestId);
  headers.set("X-Maaniko-Session-Id", sessionId);
  if (token) headers.set("X-Maaniko-Customer-Token", token);

  let body: BodyInit | undefined;
  if (init.body !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(init.body);
  }

  const execute = async () => {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      body,
      headers,
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new CommerceApiError(
        (data && typeof data.message === "string" && data.message) ||
          "অনুরোধটি সম্পন্ন করা যায়নি",
        response.status,
        data && typeof data === "object"
          ? (data as Record<string, unknown>)
          : null,
      );
    }
    return data as T;
  };

  if ((init.method ?? "GET").toUpperCase() !== "GET") return execute();

  const requestKey = `${path}|${guestId}|${token}`;
  const existing = inFlightGetRequests.get(requestKey);
  if (existing) return existing as Promise<T>;

  const request = execute().finally(() => {
    inFlightGetRequests.delete(requestKey);
  });
  inFlightGetRequests.set(requestKey, request);
  return request;
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
  rewardPointsAvailable: number;
  rewardPointsUsed: number;
  rewardDiscount: number;
  total: number;
};

export type CheckoutUnavailableItem = {
  clientKey: string;
  itemType: "PRODUCT" | "COMBO";
  productId?: string;
  variantId?: string;
  comboId?: string;
  name: string;
  image?: string;
  requestedQuantity: number;
  message: string;
};

export function checkoutUnavailableItems(error: unknown) {
  if (!(error instanceof CommerceApiError)) return [];
  if (error.data?.code !== "CHECKOUT_STOCK_CHANGED") return [];
  const items = error.data.unavailableItems;
  return Array.isArray(items) ? (items as CheckoutUnavailableItem[]) : [];
}

export type EngagementDashboard = {
  wallet: {
    points: number;
    value: number;
    pointValue: number;
    earnEveryBdt: number;
    earnPoints: number;
  };
  referral: {
    code: string;
    completed: number;
    pending: number;
    rewardPoints: number;
    items: Array<{
      id: string;
      name?: string | null;
      status: string;
      joinedAt: string;
    }>;
  };
  transactions: Array<{
    id: string;
    type: string;
    points: number;
    description: string;
    createdAt: string;
  }>;
  reminders: Array<{
    id: string;
    status: string;
    dueAt: string;
    name: string;
    image?: string | null;
    href: string;
  }>;
  careProfile: Record<string, unknown>;
  recommendations: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    image?: string | null;
  }>;
};

export type AiChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AiRecommendation = {
  type: "PRODUCT" | "SOLUTION_BOX" | "CUSTOM_SOLUTION_BOX";
  name: string;
  href: string;
  image: string | null;
  price: number | null;
  compareAtPrice: number | null;
  available: boolean;
};

export type AiChatResponse = {
  conversationId: string;
  messageId: string | null;
  answer: string;
  intent: string;
  needsFollowUp: boolean;
  resolved: boolean;
  quickReplies: string[];
  recommendations: AiRecommendation[];
  responseSource: "GROQ" | "LOCAL_FALLBACK";
  supportTicketId: string | null;
  supportPending: boolean;
};

export type AiSupportStatus = {
  id: string;
  status: "PENDING" | "REPLIED" | "CLOSED";
  adminReply: string | null;
  repliedAt: string | null;
  updatedAt: string;
};

export type PublicOrderTracking = {
  orderNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  steadfastStatus?: string | null;
  steadfastTrackingCode?: string | null;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  items: Array<{
    id: string;
    name: string;
    image?: string | null;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
  history: Array<{
    id: string;
    status: string;
    note?: string | null;
    createdAt: string;
  }>;
};

export type PushInboxItem = {
  id: string;
  type: "OFFER" | "ORDER_STATUS" | "TEST";
  title: string;
  body: string;
  imageUrl?: string | null;
  link?: string | null;
  createdAt: string;
};

export type PendingReviewPrompt = {
  orderId: string;
  orderNumber: string;
  deliveredAt: string;
  items: Array<{
    id: string;
    productId?: string | null;
    comboId?: string | null;
    name: string;
    image?: string | null;
  }>;
};

export type VerifiedProductReview = {
  id: string;
  rating: number;
  comment?: string | null;
  customerName: string;
  verified: true;
  createdAt: string;
};

export const commerceApi = {
  askMaanikoAi: (body: {
    message: string;
    history: AiChatMessage[];
    pagePath?: string;
    customerName?: string;
    customerPhone?: string;
    conversationId?: string;
  }) =>
    apiRequest<AiChatResponse>("/ai-assistant/chat", {
      method: "POST",
      body,
    }),

  rateMaanikoAi: (
    messageId: string,
    body: { helpful: boolean; feedback?: string },
  ) =>
    apiRequest<{ saved: boolean }>(
      `/ai-assistant/messages/${encodeURIComponent(messageId)}/feedback`,
      { method: "POST", body },
    ),

  getMaanikoAiSupport: (ticketId: string) =>
    apiRequest<AiSupportStatus>(
      `/ai-assistant/support/${encodeURIComponent(ticketId)}`,
    ),

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

  registerPushDevice: (body: {
    token: string;
    allowOffers: boolean;
    platform?: string;
    userAgent?: string;
  }) =>
    apiRequest<{ subscribed: boolean }>("/commerce/push/devices", {
      method: "POST",
      body,
    }),

  unregisterPushDevice: (token: string) =>
    apiRequest<{ subscribed: boolean }>("/commerce/push/devices", {
      method: "DELETE",
      body: { token },
    }),

  getPushInbox: () =>
    apiRequest<{ notifications: PushInboxItem[] }>("/commerce/push/inbox"),

  getPendingReview: () =>
    apiRequest<{ prompt: PendingReviewPrompt | null }>(
      "/commerce/reviews/pending",
    ),

  submitOrderReview: (body: {
    orderId: string;
    rating: number;
    comment?: string;
    selectedOrderItemId?: string | null;
  }) =>
    apiRequest<{
      submitted: boolean;
      reviewId: string;
      attachedToProduct: boolean;
      attachedToCombo: boolean;
    }>("/commerce/reviews", { method: "POST", body }),

  dismissReviewPrompt: (body: { orderId: string; neverAskAgain?: boolean }) =>
    apiRequest<{ dismissed: boolean; completed: boolean }>(
      "/commerce/reviews/dismiss",
      { method: "POST", body },
    ),

  getProductReviews: (productId: string) =>
    apiRequest<{ reviews: VerifiedProductReview[] }>(
      `/commerce/reviews/products/${encodeURIComponent(productId)}`,
    ),

  getComboReviews: (comboId: string) =>
    apiRequest<{ reviews: VerifiedProductReview[] }>(
      `/commerce/reviews/combos/${encodeURIComponent(comboId)}`,
    ),

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

  quoteCustomCombo: (body: {
    customConfig: { productId: string; quantity: number }[];
    quantity?: number;
  }) =>
    apiRequest<any>("/commerce/custom-combo/quote", {
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

  createOrderShareLink: (orderId: string) =>
    apiRequest<{ token: string; expiresAt: string }>(
      `/commerce/orders/${encodeURIComponent(orderId)}/share-link`,
      { method: "POST" },
    ),

  getPublicOrderTracking: (token: string) =>
    apiRequest<PublicOrderTracking>(
      `/commerce/orders/track/${encodeURIComponent(token)}`,
    ),

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

  getEngagement: () => apiRequest<EngagementDashboard>("/commerce/engagement"),

  applyReferral: (code: string) =>
    apiRequest<{ applied: boolean; referrerName?: string | null }>(
      "/commerce/engagement/referral",
      { method: "POST", body: { code } },
    ),

  updateReorderReminder: (body: {
    reminderId: string;
    enabled: boolean;
    dueAt?: string;
  }) =>
    apiRequest<any>("/commerce/engagement/reorder-reminder", {
      method: "PATCH",
      body,
    }),
};
