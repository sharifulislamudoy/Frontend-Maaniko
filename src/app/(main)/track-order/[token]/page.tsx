import PublicOrderTrackingView from "@/modules/commerce/components/PublicOrderTrackingView";

export const metadata = {
  title: "অর্ডার ট্র্যাকিং",
  description: "Maaniko অর্ডারের বর্তমান অবস্থা দেখুন।",
};

export default async function PublicOrderTrackingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <PublicOrderTrackingView token={token} />;
}
