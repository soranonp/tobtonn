import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CookieBanner from "@/components/CookieBanner";

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

const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});
try {
  var raw = localStorage.getItem('cookie_consent_v1');
  if (raw) {
    var c = JSON.parse(raw);
    if (c && c.version === 'v1') {
      gtag('consent', 'update', {
        'ad_storage': c.ads ? 'granted' : 'denied',
        'analytics_storage': c.analytics ? 'granted' : 'denied',
        'ad_user_data': c.ads ? 'granted' : 'denied',
        'ad_personalization': c.ads ? 'granted' : 'denied'
      });
    }
  }
} catch (e) {}
`.trim();

const webAppLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "โปรแกรมคำนวณดอกเบี้ยทบต้น",
  url: "https://tobtonn.com",
  description:
    "คำนวณดอกเบี้ยทบต้นออนไลน์ฟรี พร้อมการลงทุนเพิ่มรายเดือน (DCA) แสดงผลเป็นกราฟและตารางรายปี",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "THB" },
  inLanguage: "th",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "tobtonn",
  alternateName: "คำนวณดอกเบี้ยทบต้น",
  url: "https://tobtonn.com",
  logo: "https://tobtonn.com/logo.png",
  description: "เครื่องมือคำนวณการเงินภาษาไทย ฟรี",
  foundingDate: "2026",
  email: "hello@tobtonn.com",
  sameAs: [
    "https://facebook.com/tobtonn",
    "https://twitter.com/tobtonn",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: consentDefaultScript }}
        />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
