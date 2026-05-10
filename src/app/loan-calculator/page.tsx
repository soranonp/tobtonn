import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "คำนวณสินเชื่อ | tobtonn.com",
  description: "คำนวณค่างวด ดอกเบี้ยสินเชื่อ และตารางผ่อนชำระ ออนไลน์ฟรี",
};

export default function LoanCalculatorPage() {
  return (
    <PlaceholderPage
      title="คำนวณสินเชื่อ"
      description="เครื่องมือคำนวณค่างวดและดอกเบี้ยสินเชื่อกำลังพัฒนา"
    />
  );
}
