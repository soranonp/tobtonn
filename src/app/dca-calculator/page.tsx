import type { Metadata } from "next";
import DCACalculator from "./DCACalculator";
import AccordionFAQ from "@/components/AccordionFAQ";
import ToolsGrid from "@/components/ToolsGrid";
import AdSlot from "@/components/AdSlot";
import FinancialDisclaimer from "@/components/FinancialDisclaimer";

export const metadata: Metadata = {
  title: "คำนวณ DCA — ลงทุนกองทุนรายเดือน เห็นผลตอบแทนระยะยาว | tobtonn",
  description:
    "เครื่องมือคำนวณ DCA ลงทุนรายเดือนในกองทุน เปรียบเทียบกับ Lump Sum แสดงกราฟและตารางรายปี ใช้ฟรี",
  keywords: [
    "คำนวณ DCA",
    "DCA กองทุน",
    "dollar cost averaging",
    "ลงทุนรายเดือน",
    "DCA SET50",
    "DCA S&P 500",
  ],
  alternates: {
    canonical: "https://tobtonn.com/dca-calculator",
  },
  openGraph: {
    title: "คำนวณ DCA — ลงทุนรายเดือนเห็นผลตอบแทนระยะยาว",
    description:
      "คำนวณ DCA เปรียบเทียบกับ Lump Sum แสดงกราฟและตารางรายปี ใช้ฟรี ไม่ต้องสมัคร",
    url: "https://tobtonn.com/dca-calculator",
    locale: "th_TH",
    type: "website",
  },
};

const faqs = [
  {
    q: "DCA ดีกว่า Lump Sum จริงไหม?",
    a: "งานวิจัยส่วนใหญ่ชี้ว่า Lump Sum (ลงเงินก้อนเดียวทันที) ให้ผลตอบแทนสูงกว่า DCA ประมาณ 65-75% ของช่วงเวลา เพราะตลาดเติบโตในระยะยาว แต่ DCA ชนะที่ \"จิตวิทยา\" — คนส่วนใหญ่ไม่กล้าโยนเงินก้อนใหญ่เข้าตลาดทันที DCA จึงเหมาะกับมือใหม่และคนที่มีรายได้ประจำ ทำให้สามารถลงทุนได้ต่อเนื่องโดยไม่ต้องจับจังหวะตลาด",
  },
  {
    q: "DCA หุ้นไทย หรือต่างประเทศดีกว่า?",
    a: "หุ้นไทย (SET50) ผันผวนน้อยกว่าและคุ้นเคย แต่ผลตอบแทน 10 ปีย้อนหลังโดยเฉลี่ยอยู่ประมาณ 5-7% ต่อปี ส่วนหุ้นต่างประเทศ เช่น S&P 500 หรือ NASDAQ-100 ให้ผลตอบแทนเฉลี่ย 9-11% ต่อปีในระยะยาว แต่มีความเสี่ยงเรื่องอัตราแลกเปลี่ยนเพิ่มเข้ามา คำแนะนำคือกระจายการลงทุน — DCA หุ้นไทย 30-40% และต่างประเทศ 60-70% เพื่อสมดุลความเสี่ยงและผลตอบแทน",
  },
  {
    q: "DCA ใน RMF / SSF / ThaiESG ได้ไหม?",
    a: "ได้และเป็นวิธีที่นิยมที่สุด เพราะนอกจากผลตอบแทนทบต้นแล้ว ยังได้สิทธิประโยชน์ทางภาษี:\n• RMF: ลดหย่อนได้สูงสุด 30% ของรายได้ (ไม่เกิน 500,000 บาท รวม PVD/กบช./ประกันบำนาญ)\n• SSF: ลดหย่อนได้ 30% ของรายได้ ไม่เกิน 200,000 บาท ถือ 10 ปี\n• ThaiESG: ลดหย่อนเพิ่ม 30% ไม่เกิน 300,000 บาท ถือ 8 ปี\nการ DCA เข้ากองทุนเหล่านี้ทุกเดือนช่วยให้ออมไปลงทุนไปแบบไม่รู้สึกตัว",
  },
  {
    q: "ควรหยุด DCA เมื่อไหร่?",
    a: "ไม่มีคำตอบตายตัว แต่หลักทั่วไปคือ\n1) เมื่อเป้าหมายการเงินบรรลุ (เช่น มีเงินเกษียณครบจำนวนที่ต้องการ)\n2) เมื่อใกล้วันใช้เงิน (3-5 ปีก่อนใช้ ควรค่อยๆ ทยอยขายเข้าสินทรัพย์ปลอดภัย เช่น เงินฝากหรือตราสารหนี้)\n3) เมื่อสถานการณ์ส่วนตัวเปลี่ยน (เช่น ตกงาน หรือมีค่าใช้จ่ายฉุกเฉิน)\nสิ่งที่ \"ไม่ควร\" ทำคือหยุด DCA เพราะตลาดตก เพราะนั่นคือช่วงที่ราคาถูกลง การ DCA ต่อจะช่วยถัวเฉลี่ยต้นทุนให้ต่ำลง",
  },
  {
    q: "DCA แล้วต้องดูพอร์ตทุกวันไหม?",
    a: "ไม่ต้อง — และไม่ควรดูบ่อยด้วย DCA ออกแบบมาเพื่อให้คุณ \"ตั้งและลืม\" (Set and Forget) การดูพอร์ตทุกวันเสี่ยงต่อการตัดสินใจตามอารมณ์ เช่น ขายตอนตลาดตก หรือเพิ่มเงินตอนตลาดบูม แนะนำให้รีวิวพอร์ตปีละ 1-2 ครั้ง เพื่อปรับสัดส่วน (rebalance) และตรวจสอบว่ายังตรงกับเป้าหมายอยู่",
  },
  {
    q: "ค่าธรรมเนียมกองทุนกินผลตอบแทนแค่ไหน?",
    a: "ค่าธรรมเนียมรวม (Total Expense Ratio) ของกองทุนไทยอยู่ที่ 0.5-2% ต่อปี ดูเหมือนน้อยแต่สะสมระยะยาวมีนัยสำคัญ — กองทุน Index Fund (เช่น SCBSET50, K-USA) มักคิด 0.5-1% ขณะที่กองทุน Active บางตัวคิดสูงถึง 2-2.5% ลองคำนวณดูเลย: ถ้าผลตอบแทน 8% ต่อปี ค่าธรรมเนียม 1% เทียบกับ 2% ต่างกัน 30 ปีให้ผลลัพธ์ที่แตกต่างกันถึง 25-30%",
  },
];

export default function DCACalculatorPage() {
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "โปรแกรมคำนวณ DCA",
    url: "https://tobtonn.com/dca-calculator",
    description:
      "เครื่องมือคำนวณ DCA ลงทุนรายเดือน เปรียบเทียบกับ Lump Sum",
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

      {/* Hero */}
      <section className="px-4 pb-8 pt-12 text-center md:pt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          DCA Calculator
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-5xl">
          คำนวณ <em className="text-accent">DCA</em> ลงทุนรายเดือน
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          ลงทุนกองทุนแบบ Dollar-Cost Averaging เปรียบเทียบกับการลงทุนเงินก้อน
          (Lump Sum) แสดงกราฟและตารางการเติบโตรายปี
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 pb-8">
        <DCACalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8">
        <FinancialDisclaimer />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <AdSlot id="dca-calc-below-result" size="horizontal" />
      </section>

      <ToolsGrid exclude="/dca-calculator" />

      {/* SEO Content */}
      <div className="mx-auto max-w-[820px] space-y-16 px-4 pb-20">
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            DCA คืออะไร? ทำไมนักลงทุนมือใหม่ควรเริ่มที่ DCA
          </h2>
          <p className="mb-4 leading-relaxed text-ink-soft">
            DCA หรือ Dollar-Cost Averaging คือวิธีการลงทุนด้วยจำนวนเงิน
            เท่าๆ กันเป็นประจำตามรอบเวลา เช่น ลงทุน 5,000 บาททุกวันที่ 1
            ของเดือน ในกองทุนหรือหุ้นเดิมๆ โดยไม่สนใจว่าราคาขณะนั้นจะสูงหรือต่ำ
            หัวใจของ DCA อยู่ที่ &quot;วินัย&quot; และ &quot;เวลา&quot;
            ไม่ใช่การจับจังหวะตลาด
          </p>
          <p className="mb-4 leading-relaxed text-ink-soft">
            สำหรับนักลงทุนมือใหม่ DCA เหมาะที่สุดเพราะ:
          </p>
          <ul className="mb-4 list-inside list-disc space-y-1.5 leading-relaxed text-ink-soft">
            <li>
              <strong className="text-ink">ไม่ต้องอ่านงบการเงิน</strong> —
              เลือกกองทุน Index Fund เช่น SET50 หรือ S&P 500 แล้วลงต่อเนื่อง
            </li>
            <li>
              <strong className="text-ink">ลดความผันผวน</strong> —
              เมื่อราคาสูงคุณซื้อได้น้อยหน่วย เมื่อราคาต่ำซื้อได้มากหน่วย
              ทำให้ต้นทุนเฉลี่ยลดลง
            </li>
            <li>
              <strong className="text-ink">เริ่มต้นด้วยเงินน้อยได้</strong> —
              กองทุนหลายตัวเริ่มต้นที่ 500-1,000 บาท
            </li>
            <li>
              <strong className="text-ink">ใช้พลังเวลาให้เป็นประโยชน์</strong> —
              ลงทุน 25 ปีกับ 30 ปี ผลลัพธ์ต่างกัน 1.5-2 เท่าจากดอกเบี้ยทบต้น
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            ข้อดีและข้อเสียของ DCA
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <h3 className="mb-3 font-display text-base font-semibold text-accent">
                ข้อดี
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed text-ink-soft">
                <li>• ลดความเสี่ยงจากการจับจังหวะผิด</li>
                <li>• เริ่มต้นง่าย ไม่ต้องมีความรู้ลึก</li>
                <li>• สร้างวินัยการออม-ลงทุนอัตโนมัติ</li>
                <li>• ลดความเครียดจากความผันผวนของตลาด</li>
                <li>• ใช้กับ RMF/SSF เพื่อลดหย่อนภาษีได้</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gold-soft bg-gold-soft/20 p-5">
              <h3 className="mb-3 font-display text-base font-semibold text-gold">
                ข้อเสีย
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed text-ink-soft">
                <li>• ผลตอบแทนรวมมักน้อยกว่า Lump Sum (เมื่อตลาดขาขึ้น)</li>
                <li>• ไม่เหมาะกับเงินก้อนใหญ่ที่มีอยู่แล้ว</li>
                <li>• ต้องอดทน 5-10 ปีขึ้นไปจึงเห็นผล</li>
                <li>• ค่าธรรมเนียมซื้อขายอาจสูงถ้าซื้อปริมาณน้อยบ่อยๆ</li>
                <li>• ต้องเลือกกองทุนที่ดี ถ้าเลือกผิดเสียเวลาฟรี</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            DCA ในกองทุนไทยที่นิยม
          </h2>
          <p className="mb-4 leading-relaxed text-ink-soft">
            กองทุนยอดนิยมสำหรับ DCA ในประเทศไทย แบ่งตามดัชนีอ้างอิง:
          </p>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-accent/5">
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">
                    ดัชนี / กลุ่ม
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">
                    ตัวอย่างกองทุน
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-ink-soft">
                    ผลตอบแทน 10 ปี*
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-ink-soft">
                    ค่าธรรมเนียม
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="px-4 py-3">SET50 (หุ้นไทย)</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    SCBSET50, KFSET50
                  </td>
                  <td className="px-4 py-3 text-center font-mono">~5–7%</td>
                  <td className="px-4 py-3 text-center font-mono">0.5–0.8%</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3">S&P 500 (สหรัฐ)</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    SCBS&P500, K-USA
                  </td>
                  <td className="px-4 py-3 text-center font-mono">~10–12%</td>
                  <td className="px-4 py-3 text-center font-mono">0.7–1.2%</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3">NASDAQ-100 (เทคโนโลยี)</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    SCBNDQ, KKP NDQ100
                  </td>
                  <td className="px-4 py-3 text-center font-mono">~14–17%</td>
                  <td className="px-4 py-3 text-center font-mono">0.9–1.5%</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3">ดัชนีหุ้นโลก (MSCI World)</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    SCBWORLD, K-GLOBE
                  </td>
                  <td className="px-4 py-3 text-center font-mono">~8–10%</td>
                  <td className="px-4 py-3 text-center font-mono">0.8–1.3%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">ตราสารหนี้</td>
                  <td className="px-4 py-3 font-mono text-xs">K-FIXED, KFAFIX</td>
                  <td className="px-4 py-3 text-center font-mono">~2–3%</td>
                  <td className="px-4 py-3 text-center font-mono">0.3–0.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            *ตัวเลขประมาณการเฉลี่ย 10 ปีย้อนหลังถึงปี 2025 ผลตอบแทนในอดีต
            ไม่ใช่สิ่งรับประกันผลตอบแทนในอนาคต
          </p>
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
