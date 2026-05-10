import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "คำนวณเงินออม | tobtonn.com",
  description: "วางแผนการออมเงินเพื่อเป้าหมายทางการเงิน คำนวณออนไลน์ฟรี",
};

export default function SavingsCalculatorPage() {
  return (
    <PlaceholderPage
      title="คำนวณเงินออม"
      description="เครื่องมือวางแผนการออมเงินเพื่อเป้าหมายทางการเงินกำลังพัฒนา"
    />
  );
}
