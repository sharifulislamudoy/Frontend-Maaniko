import type { MaanikoProduct } from "@/modules/products/types/product";
import type {
  SolutionBox,
  SolutionBoxItem,
} from "@/modules/solution-boxes/types/solutionBox";

export type ResolvedSolutionBoxItem = {
  relation: SolutionBoxItem;
  product: MaanikoProduct;
};

export function getSolutionBoxItems(
  box: SolutionBox,
): ResolvedSolutionBoxItem[] {
  return box.items
    .filter((relation) => Boolean(relation.product))
    .map((relation) => ({ relation, product: relation.product! }));
}

export function solutionBoxToProduct(box: SolutionBox): MaanikoProduct {
  return {
    id: box.id,
    slug: box.slug,
    href: box.href,
    name: box.name,
    description: box.description,
    category: "মানিকো সল্যুশন বক্স",
    badge: "কিউরেটেড কম্বো",
    images: box.images,
    price: box.price,
    compareAtPrice: box.compareAtPrice,
    stock: box.stock,
    rating: box.rating,
    reviewCount: box.reviewCount,
    productType: "combo",
    comboItems: getSolutionBoxItems(box).map(({ relation, product }) => ({
      productId: product.id,
      slug: product.slug,
      href: `/products/${product.slug}`,
      name: product.name,
      image: product.images[0] ?? "",
      quantity: relation.quantity,
      variant: relation.variant,
    })),
  };
}

export function calculateSolutionBoxRetailTotal(box: SolutionBox) {
  return getSolutionBoxItems(box).reduce(
    (total, { relation, product }) => total + product.price * relation.quantity,
    0,
  );
}
