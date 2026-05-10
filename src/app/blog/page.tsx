import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "บทความ | tobtonn.com",
  description: "บทความเกี่ยวกับการเงิน การลงทุน ดอกเบี้ยทบต้น และการวางแผนการเงิน",
};

export default function BlogPage() {
  return (
    <PlaceholderPage
      title="บทความ"
      description="บทความเกี่ยวกับการเงิน การลงทุน และการวางแผนการเงินกำลังจะมาเร็วๆ นี้"
    />
  );
}
