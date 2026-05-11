import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CookieBanner from "@/components/CookieBanner";
import BackToTop from "@/components/BackToTop";
import GAPageView from "@/components/GAPageView";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://tobtonn.com"),
  title: {
    default:
      "โปรแกรมคำนวณดอกเบี้ยทบต้น พร้อมกราฟและตาราง DCA | tobtonn.com",
    template: "%s | tobtonn",
  },
  description:
    "คำนวณดอกเบี้ยทบต้นออนไลน์ฟรี พร้อมการลงทุนเพิ่มรายเดือน (DCA) แสดงผลเป็นกราฟและตารางรายปี คำนวณผลตอบแทนจากหุ้น กองทุน เงินฝาก ตราสารหนี้",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "โปรแกรมคำนวณดอกเบี้ยทบต้น พร้อมกราฟและตาราง DCA",
    description:
      "คำนวณดอกเบี้ยทบต้นออนไลน์ฟรี พร้อมการลงทุนเพิ่มรายเดือน (DCA) แสดงผลเป็นกราฟและตารางรายปี",
    url: "https://tobtonn.com",
    siteName: "tobtonn",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "tobtonn — โปรแกรมคำนวณดอกเบี้ยทบต้น",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "โปรแกรมคำนวณดอกเบี้ยทบต้น | tobtonn.com",
    description:
      "คำนวณดอกเบี้ยทบต้นออนไลน์ฟรี พร้อมกราฟและตาราง DCA",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://tobtonn.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0f4d3a",
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
  logo: "https://tobtonn.com/logo-mark.svg",
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
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });`}
            </Script>
          </>
        )}
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
        <a href="#main-content" className="skip-link">
          ข้ามไปยังเนื้อหา
        </a>
        {GA_ID && (
          <Suspense fallback={null}>
            <GAPageView />
          </Suspense>
        )}
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <BackToTop />
        <CookieBanner />
      </body>
    </html>
  );
}
