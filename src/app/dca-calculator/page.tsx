import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "คำนวณ DCA — Dollar-Cost Averaging | tobtonn.com",
  description: "คำนวณผลตอบแทนจากการลงทุนแบบ DCA (Dollar-Cost Averaging) ออนไลน์ฟรี",
};

export default function DCACalculatorPage() {
  return (
    <PlaceholderPage
      title="คำนวณ DCA"
      description="เครื่องมือคำนวณผลตอบแทนจากการลงทุนแบบ Dollar-Cost Averaging กำลังพัฒนา"
    />
  );
}
