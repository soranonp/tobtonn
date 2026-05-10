import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "ติดต่อเรา | tobtonn.com",
  description: "ติดต่อทีมงาน tobtonn.com",
};

export default function ContactPage() {
  return (
    <PlaceholderPage
      title="ติดต่อเรา"
      description="ช่องทางการติดต่อกำลังจะมาเร็วๆ นี้"
    />
  );
}
