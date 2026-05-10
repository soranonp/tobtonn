import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title:
    "โปรแกรมคำนวณดอกเบี้ยทบต้น พร้อมกราฟและตาราง DCA | tobtonn.com",
  description:
    "คำนวณดอกเบี้ยทบต้นออนไลน์ฟรี พร้อมการลงทุนเพิ่มรายเดือน (DCA) แสดงผลเป็นกราฟและตารางรายปี คำนวณผลตอบแทนจากหุ้น กองทุน เงินฝาก ตราสารหนี้",
  metadataBase: new URL("https://tobtonn.com"),
  openGraph: {
    title: "โปรแกรมคำนวณดอกเบี้ยทบต้น พร้อมกราฟและตาราง DCA",
    description:
      "คำนวณดอกเบี้ยทบต้นออนไลน์ฟรี พร้อมการลงทุนเพิ่มรายเดือน (DCA) แสดงผลเป็นกราฟและตารางรายปี",
    url: "https://tobtonn.com",
    siteName: "tobtonn.com",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "โปรแกรมคำนวณดอกเบี้ยทบต้น | tobtonn.com",
    description:
      "คำนวณดอกเบี้ยทบต้นออนไลน์ฟรี พร้อมกราฟและตาราง DCA",
  },
  alternates: {
    canonical: "https://tobtonn.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "โปรแกรมคำนวณดอกเบี้ยทบต้น",
              url: "https://tobtonn.com",
              description:
                "คำนวณดอกเบี้ยทบต้นออนไลน์ฟรี พร้อมการลงทุนเพิ่มรายเดือน (DCA) แสดงผลเป็นกราฟและตารางรายปี",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "THB",
              },
              inLanguage: "th",
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
