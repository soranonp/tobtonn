import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "คำนวณเกษียณ | tobtonn.com",
  description: "วางแผนเกษียณอายุ คำนวณเงินที่ต้องเตรียมสำหรับวัยเกษียณ ออนไลน์ฟรี",
};

export default function RetirementCalculatorPage() {
  return (
    <PlaceholderPage
      title="คำนวณเกษียณ"
      description="เครื่องมือวางแผนเกษียณอายุ คำนวณเงินที่ต้องเตรียมกำลังพัฒนา"
    />
  );
}
