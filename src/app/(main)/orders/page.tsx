import MyAccountClient from "@/modules/commerce/components/MyAccountClient";

export const metadata = {
  title: "আমার অর্ডার ",
  description: "আপনার Maaniko order status, cart, wishlist ও activity দেখুন।",
};

export default function MyAccountPage() {
  return <MyAccountClient />;
}
