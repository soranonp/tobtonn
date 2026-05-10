import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | tobtonn.com",
  description: "เกี่ยวกับ tobtonn.com เว็บไซต์เครื่องมือคำนวณการเงินออนไลน์",
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="เกี่ยวกับเรา"
      description="เรื่องราวเบื้องหลัง tobtonn.com กำลังจะมาเร็วๆ นี้"
    />
  );
}
