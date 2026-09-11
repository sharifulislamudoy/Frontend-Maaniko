# Maaniko Frontend

Next.js storefront backed by the Maaniko NestJS API. Product, combo, journey, home-banner, and shop-banner data are fetched from the backend; the legacy fake product/banner JSON is no longer used.

## Setup

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Set:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

The storefront uses cached server-side API reads with a 60-second revalidation window. Product and combo detail pages, shop filtering, checkout lookup, featured products, and both banner sliders use database data.

