import CareProfileBuilder from "@/modules/commerce/components/CareProfileBuilder";
import { getProducts, safeCatalog } from "@/shared/lib/api/catalog";

export const metadata = {
  title: "আমার Care Profile | Maaniko",
  description: "আপনার journey ও budget অনুযায়ী Maaniko Care List তৈরি করুন।",
};

export default async function CareProfilePage() {
  const products = await safeCatalog(getProducts(), []);
  return <CareProfileBuilder products={products} />;
}
