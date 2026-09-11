import CartRecoveryClient from "@/modules/commerce/components/CartRecoveryClient";

export default async function CartRecoveryPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <CartRecoveryClient token={token} />;
}
