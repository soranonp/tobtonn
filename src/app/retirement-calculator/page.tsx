import type { Metadata } from "next";
import RetirementCalculator from "./RetirementCalculator";
import AccordionFAQ from "@/components/AccordionFAQ";
import ToolsGrid from "@/components/ToolsGrid";

export const metadata: Metadata = {
  title: "คำนวณเงินเกษียณ — ต้องมีเท่าไหร่ถึงพอใช้หลังอายุ 60 | tobtonn",
  description:
    "วางแผนเกษียณด้วยตนเอง ใส่อายุ ค่าใช้จ่าย เงินเก็บ และเป้าหมาย รู้ทันทีว่าควรออมเดือนละเท่าไหร่ พร้อมคำนวณเงินเฟ้อ",
  keywords: [
    "คำนวณเงินเกษียณ",
    "วางแผนเกษียณ",
    "retirement calculator",
    "เก็บเงินเกษียณ",
    "FIRE Thailand",
    "กฎ 4%",
  ],
  alternates: { canonical: "https://tobtonn.com/retirement-calculator" },
  openGraph: {
    title: "คำนวณเงินเกษียณ — ต้องมีเท่าไหร่ถึงพอใช้หลังอายุ 60",
    description:
      "วางแผนเกษียณ คำนวณเงินที่ต้องเตรียมรวมเงินเฟ้อ ใช้งานฟรี",
    url: "https://tobtonn.com/retirement-calculator",
    locale: "th_TH",
    type: "website",
  },
};

const faqs = [
  {
    q: "ควรเกษียณตอนอายุเท่าไหร่ดี?",
    a: "อายุเกษียณตามกฎหมายไทยคือ 60 ปี (สำหรับข้าราชการ) แต่จริงๆ แล้ว \"อายุเกษียณ\" ที่เหมาะสมขึ้นกับ:\n• สุขภาพการเงิน — มีเงินเก็บพอใช้หลังเกษียณหรือยัง (กฎ 25 เท่าของรายจ่าย/ปี)\n• งานที่ทำอยู่ — งานที่ต้องใช้แรงกายควรเกษียณเร็วกว่างาน knowledge\n• ความฝัน — บางคนรักงานไม่อยากเกษียณ บางคนอยาก FIRE ตอน 45\nแนวคิด FIRE (Financial Independence, Retire Early) แนะนำให้เก็บเงินจนถึง 25 เท่าของรายจ่ายปีก่อน เลือกได้ว่าจะทำงานต่อหรือหยุด — \"ไม่ใช่หยุดทำงาน แต่ทำงานเพราะอยาก ไม่ใช่เพราะต้อง\"",
  },
  {
    q: "เงินเดือนน้อย เก็บเงินเกษียณได้ไหม?",
    a: "ได้ — แต่ต้องเริ่มเร็วและใช้พลังของเวลา ตัวอย่าง:\n• เริ่มอายุ 22 เก็บเดือนละ 2,000 บาท ที่ผลตอบแทน 8% ต่อปี → ตอนอายุ 60 มีเงินประมาณ 6.5 ล้านบาท\n• เริ่มอายุ 35 ต้องเก็บเดือนละ 7,000 บาท เพื่อให้ได้เงินเท่ากัน\nกุญแจสำคัญ:\n1) ใช้สิทธิประกันสังคมและกองทุนสำรองเลี้ยงชีพให้เต็ม\n2) RMF/SSF ลดหย่อนภาษีได้สูงสุด 30% ของรายได้\n3) เริ่มแม้เดือนละ 500 ดีกว่าไม่เริ่ม\n4) ทุก 1 ปีที่รออาจต้องเก็บเพิ่ม 8-12% ต่อเดือน",
  },
  {
    q: "ลงทุนในอะไรดีเพื่อเกษียณ?",
    a: "พอร์ตเกษียณควรปรับตามช่วงอายุ (Glide Path):\n• อายุน้อย (20-40 ปี) เน้นหุ้น 70-90%, ตราสารหนี้ 10-30% — เน้นเติบโตระยะยาว\n• อายุกลาง (40-55 ปี) หุ้น 50-70%, ตราสารหนี้ 30-50%\n• ใกล้เกษียณ (55-60 ปี) หุ้น 30-50%, ตราสารหนี้ + เงินฝาก 50-70%\n• หลังเกษียณ หุ้น 20-40%, ตราสารหนี้/เงินฝาก 60-80%\nกองทุนแนะนำสำหรับคนทั่วไป: Global Index Fund (เช่น MSCI World) + Thai Bond Fund + ทอง 5-10% ผสมตามสัดส่วนข้างต้น",
  },
  {
    q: "ประกันสังคมจะได้เงินเกษียณกี่บาท?",
    a: "ประกันสังคม (มาตรา 33) คำนวณบำนาญชราภาพดังนี้:\n• ส่งครบ 180 เดือน (15 ปี) → ได้ 20% ของเงินเดือนเฉลี่ย 60 เดือนสุดท้าย\n• เพิ่มอีก 1.5% ต่อทุกปีที่ส่งเพิ่ม\n• สูงสุด 50% (ส่ง 35 ปีขึ้นไป)\nเงินเดือนสูงสุดที่นำมาคำนวณคือ 15,000 บาท ดังนั้นบำนาญสูงสุดประมาณ 7,500 บาท/เดือน — น้อยมากเทียบค่าครองชีพ การพึ่งประกันสังคมอย่างเดียว ไม่พอใช้หลังเกษียณ ต้องมีเงินออมส่วนตัวเสริม",
  },
  {
    q: "RMF กับ SSF ใช้แบบไหนดี?",
    a: "ทั้งคู่เป็นกองทุนลดหย่อนภาษี แต่ต่างกันที่:\nRMF (Retirement Mutual Fund):\n• ต้องถือจนอายุ 55 (และครบ 5 ปี)\n• ลดหย่อนได้สูงสุด 30% ของรายได้ (รวมกับ PVD/กบช.) ไม่เกิน 500,000 บาท\n• ห้ามขายระหว่างทาง — ผิดเงื่อนไขโดนเสียภาษีย้อนหลัง\n\nSSF (Super Savings Fund):\n• ต้องถือ 10 ปีปฏิทิน (สั้นกว่า RMF)\n• ลดหย่อนได้สูงสุด 30% ของรายได้ ไม่เกิน 200,000 บาท\n• ขายได้หลังครบ 10 ปี ไม่ต้องรอ 55\n\nใช้ RMF ถ้ายังไกลเกษียณ (อายุ 30-40) — เก็บยาวได้\nใช้ SSF ถ้าใกล้ใช้เงิน (อายุ 45+) หรือต้องการความยืดหยุ่น\nถ้าเงินถึงเพดาน RMF แล้ว ค่อยใส่ SSF ต่อเพื่อลดหย่อนเพิ่ม",
  },
  {
    q: "คนทำงานอิสระวางแผนเกษียณยังไง?",
    a: "ฟรีแลนซ์ไม่มีกองทุนสำรองเลี้ยงชีพ ไม่มีเงินสมทบนายจ้าง ต้องวางแผนเองล้วน:\n1) สมัครประกันสังคม มาตรา 40 (ทางเลือก 3) — ส่ง 300 บาท/เดือน รับบำนาญ 1,000-3,500 บาท/เดือน\n2) ลงทุน RMF/SSF เต็มเพดาน 30% ของรายได้ ใช้ลดภาษี\n3) ทำประกันบำนาญแบบ Annuity (เพดานลดหย่อน 200,000 บาท)\n4) เก็บเงินเพิ่มเติมในกองทุนรวมและหุ้น เพราะรายได้ผันผวน ต้องมีเงินสำรองมากกว่ามนุษย์เงินเดือน\n5) เป้าหมาย: 30 เท่าของรายจ่ายปี (ไม่ใช่ 25 เท่า) เพราะไม่มีรายได้สม่ำเสมอช่วยเสริม",
  },
];

export default function RetirementCalculatorPage() {
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "โปรแกรมคำนวณเงินเกษียณ",
    url: "https://tobtonn.com/retirement-calculator",
    description: "วางแผนเกษียณด้วยตนเอง คำนวณเงินที่ต้องเตรียมรวมเงินเฟ้อ",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "THB" },
    inLanguage: "th",
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="px-4 pb-8 pt-12 text-center md:pt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Retirement Planner
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-5xl">
          คำนวณ <em className="text-accent">เงินเกษียณ</em>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          ใส่อายุ ค่าใช้จ่าย และเงินเก็บปัจจุบัน รู้ทันทีว่าหลังเกษียณ
          จะมีเงินใช้พอไหม พร้อมคำนวณเงินเฟ้อตามจริง
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 pb-16">
        <RetirementCalculator />
      </section>

      <ToolsGrid exclude="/retirement-calculator" />

      <div className="mx-auto max-w-[820px] space-y-16 px-4 pb-20">
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            วางแผนเกษียณยังไงในยุคเงินเฟ้อ 3% ต่อปี
          </h2>
          <p className="mb-4 leading-relaxed text-ink-soft">
            เงินเฟ้อคือศัตรูเงียบของแผนเกษียณ — ที่อัตรา 3% ต่อปี อำนาจซื้อ
            ของเงินจะลดลงครึ่งหนึ่งภายใน 24 ปี หมายความว่าค่าใช้จ่าย 30,000
            บาทต่อเดือนวันนี้ จะเทียบเท่ากับ 60,000 บาทต่อเดือนตอนเกษียณ
            (ถ้าเกษียณอีก 24 ปี)
          </p>
          <div className="rounded-xl border border-line bg-white/60 p-6">
            <p className="mb-3 text-sm font-medium text-ink">
              ตัวอย่าง: ค่าครองชีพหลังปรับเงินเฟ้อ 3%/ปี
            </p>
            <ul className="space-y-1.5 text-sm text-ink-soft">
              <li>
                • วันนี้: <span className="font-mono">30,000</span> บาท/เดือน
              </li>
              <li>
                • อีก 10 ปี:{" "}
                <span className="font-mono text-gold">~40,300</span> บาท/เดือน
              </li>
              <li>
                • อีก 20 ปี:{" "}
                <span className="font-mono text-gold">~54,200</span> บาท/เดือน
              </li>
              <li>
                • อีก 30 ปี:{" "}
                <span className="font-mono text-gold">~72,800</span> บาท/เดือน
              </li>
            </ul>
            <p className="mt-3 text-xs text-ink-soft">
              ดังนั้นการลงทุนเพื่อเกษียณต้องได้ผลตอบแทน &quot;สูงกว่าเงินเฟ้อ&quot;
              อย่างน้อย 3-4% ต่อปี การฝากออมทรัพย์ 0.5% จึงไม่เพียงพอ
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            RMF, SSF, ThaiESG ตัวไหนเหมาะกับใคร
          </h2>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-accent/5">
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">

                  </th>
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">
                    RMF
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">
                    SSF
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">
                    ThaiESG
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">ระยะเวลาถือ</td>
                  <td className="px-4 py-3">ถึงอายุ 55 + 5 ปี</td>
                  <td className="px-4 py-3">10 ปี</td>
                  <td className="px-4 py-3">8 ปี</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">เพดานลดหย่อน</td>
                  <td className="px-4 py-3">30% / 500,000*</td>
                  <td className="px-4 py-3">30% / 200,000</td>
                  <td className="px-4 py-3">30% / 300,000</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">เหมาะกับ</td>
                  <td className="px-4 py-3">อายุน้อย-กลาง</td>
                  <td className="px-4 py-3">อายุกลาง-สูง</td>
                  <td className="px-4 py-3">ทุกวัย, สนใจ ESG</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">ลงทุนใน</td>
                  <td className="px-4 py-3">หลากหลาย</td>
                  <td className="px-4 py-3">หลากหลาย</td>
                  <td className="px-4 py-3">หุ้นไทย ESG</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            *RMF เพดานรวมกับ PVD, กบข., ประกันบำนาญ
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            กฎ 4% (4% Rule) ใช้ในไทยได้ไหม?
          </h2>
          <p className="mb-4 leading-relaxed text-ink-soft">
            กฎ 4% มาจากงานวิจัย Trinity Study (1998) ซึ่งศึกษาตลาดสหรัฐฯ
            สรุปว่าหลังเกษียณ ถ้าถอนเงิน 4% ของเงินต้นในปีแรก แล้วปรับ
            ตามเงินเฟ้อทุกปี เงินจะใช้ได้นาน 30 ปีโดยไม่หมด นั่นแปลว่า
            ต้องมีเงินเก็บ &quot;25 เท่าของรายจ่ายต่อปี&quot;
          </p>
          <p className="mb-4 leading-relaxed text-ink-soft">
            ในไทยควรปรับเป็น <strong>กฎ 3.5%</strong> หรือ{" "}
            <strong>30 เท่า</strong> เพราะ:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-1.5 leading-relaxed text-ink-soft">
            <li>ตลาดหุ้นไทยมีผลตอบแทนต่ำกว่าสหรัฐในระยะยาว (~6-7% vs 10%)</li>
            <li>เงินเฟ้อไทยผันผวน บางช่วงสูงถึง 4-5%</li>
            <li>คนไทยอายุยืนขึ้น — ต้องวางแผน 30-40 ปีหลังเกษียณ ไม่ใช่ 25-30</li>
            <li>ระบบสาธารณสุข/ประกันสังคมสนับสนุนน้อยกว่าประเทศพัฒนาแล้ว</li>
          </ul>
          <p className="leading-relaxed text-ink-soft">
            ตัวอย่าง: ถ้าใช้เดือนละ 30,000 บาท = 360,000 บาท/ปี → ต้องมีเงิน
            เก็บ <span className="font-mono">9 ล้านบาท</span> (กฎ 25) หรือ{" "}
            <span className="font-mono">10.8 ล้านบาท</span> (กฎ 30) ตอนเกษียณ
            (ค่านี้เป็นค่าวันนี้ ยังไม่รวมเงินเฟ้อจนถึงวันเกษียณ)
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            FIRE Movement ในไทย
          </h2>
          <p className="mb-4 leading-relaxed text-ink-soft">
            FIRE = Financial Independence, Retire Early คือกระแสการเงินที่
            มุ่งเน้นการเก็บเงินอย่างจริงจัง (50-70% ของรายได้) เพื่อบรรลุ
            อิสรภาพทางการเงินและเกษียณก่อนวัย แตกออกเป็นหลายรูปแบบ:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-white/60 p-5">
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink">
                Lean FIRE
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                เกษียณด้วยรายจ่ายต่ำ เน้นใช้ชีวิตเรียบง่าย เงินเก็บประมาณ
                15-20 ล้านบาท เกษียณตอน 35-45
              </p>
            </div>
            <div className="rounded-xl border border-line bg-white/60 p-5">
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink">
                Fat FIRE
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                เกษียณด้วยไลฟ์สไตล์เต็มที่ ใช้เงินไม่อั้น เงินเก็บ 50-100
                ล้านบาท เกษียณตอน 40-50
              </p>
            </div>
            <div className="rounded-xl border border-line bg-white/60 p-5">
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink">
                Coast FIRE
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                เก็บเงินช่วงต้นให้พอ แล้วปล่อยทบต้น โดยทำงานหารายได้
                เลี้ยงตัวเองเฉยๆ ไม่ต้องเก็บเพิ่มอีก
              </p>
            </div>
            <div className="rounded-xl border border-line bg-white/60 p-5">
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink">
                Barista FIRE
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                เกษียณบางส่วน — มีเงินเก็บ 50-70% ของเป้า ทำงาน Part-time
                เสริมเพื่อสวัสดิการสุขภาพ
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            คำถามที่พบบ่อย
          </h2>
          <AccordionFAQ items={faqs} />
        </section>
      </div>
    </>
  );
}
