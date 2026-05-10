import type { Metadata } from "next";
import SavingsCalculator from "./SavingsCalculator";
import AccordionFAQ from "@/components/AccordionFAQ";
import ToolsGrid from "@/components/ToolsGrid";
import AdSlot from "@/components/AdSlot";
import FinancialDisclaimer from "@/components/FinancialDisclaimer";

export const metadata: Metadata = {
  title:
    "คำนวณเงินออม — ตั้งเป้าหมายแล้วรู้ว่าต้องเก็บเดือนละเท่าไหร่ | tobtonn",
  description:
    "โปรแกรมคำนวณเงินออมย้อนกลับ ใส่เป้าหมายและระยะเวลา รู้ทันทีว่าต้องออมเดือนละเท่าไหร่ พร้อมเปรียบเทียบดอกเบี้ยหลายอัตรา",
  keywords: [
    "คำนวณเงินออม",
    "วางแผนเก็บเงิน",
    "savings calculator",
    "เก็บเงินให้ถึงเป้า",
    "ออมเงิน 1 ล้าน",
  ],
  alternates: { canonical: "https://tobtonn.com/savings-calculator" },
  openGraph: {
    title: "คำนวณเงินออม — ตั้งเป้าหมายแล้วรู้ว่าต้องเก็บเดือนละเท่าไหร่",
    description:
      "ใส่เป้าหมายและระยะเวลา รู้ทันทีว่าต้องออมเดือนละเท่าไหร่ ใช้งานฟรี",
    url: "https://tobtonn.com/savings-calculator",
    locale: "th_TH",
    type: "website",
  },
};

const faqs = [
  {
    q: "ออมเงินยังไงให้ได้ดอกเบี้ยสูง?",
    a: "ปี 2026 ทางเลือกที่ดอกเบี้ยน่าสนใจในไทยมีดังนี้:\n• บัญชีออมทรัพย์ดิจิทัล (KKP Start, ttb me-SAVE, SCB EZ Savings) ดอกเบี้ย 1.5-2% ต่อปี ไม่ต้องล็อกเงิน\n• เงินฝากประจำ 12-24 เดือน ดอกเบี้ย 2-3% ต่อปี\n• สลากออมสิน/ธอส. ดอกเบี้ย 0.5-1% + ลุ้นรางวัล\n• ตราสารหนี้ระยะสั้น (กองทุนตลาดเงิน) ดอกเบี้ย 1.5-2.5% สภาพคล่องดี\nถ้ารับความเสี่ยงได้บ้าง: กองทุนตราสารหนี้ระยะกลาง 2-4%, กองทุนผสม 4-7% ต่อปี",
  },
  {
    q: "ควรออมในธนาคาร หรือกองทุนรวม?",
    a: "ขึ้นกับ \"ระยะเวลา\" และ \"เป้าหมาย\":\n• เป้าหมายระยะสั้น (< 1 ปี) เช่น เก็บเงินเที่ยว ดาวน์รถ → บัญชีออมทรัพย์/ฝากประจำ ปลอดภัยที่สุด\n• เป้าหมายระยะกลาง (1-5 ปี) เช่น ดาวน์บ้าน ทุนแต่งงาน → กองทุนตราสารหนี้ + เงินฝากประจำ ผสมกัน\n• เป้าหมายระยะยาว (5+ ปี) เช่น ส่งลูกเรียน เกษียณ → กองทุนหุ้น/ผสม ผลตอบแทนระยะยาวสูงกว่าเงินเฟ้อ\nกฎคร่าวๆ: เงินที่ใช้ภายใน 3 ปี อย่าไปลงทุนหุ้น เงินที่จะใช้หลัง 7 ปี อย่าฝากธนาคารอย่างเดียว",
  },
  {
    q: "ออมระยะสั้นกับระยะยาว ต่างกันแค่ไหน?",
    a: "ตัวอย่างเก็บเงิน 1,000,000 บาท ที่ดอกเบี้ย 5% ต่อปี:\n• 5 ปี → ต้องออมเดือนละ ~14,700 บาท (ลงทุนรวม 882,000 ดอกเบี้ย 118,000)\n• 10 ปี → ต้องออมเดือนละ ~6,440 บาท (ลงทุนรวม 773,000 ดอกเบี้ย 227,000)\n• 20 ปี → ต้องออมเดือนละ ~2,430 บาท (ลงทุนรวม 583,000 ดอกเบี้ย 417,000)\nระยะยาว \"เงินทำงานแทน\" มากขึ้นเรื่อยๆ จนถึงจุดที่ดอกเบี้ยทบต้นทำงานหนักกว่าตัวเรา",
  },
  {
    q: "ถ้าออมไม่ทันเป้าทำยังไง?",
    a: "มีทางเลือก 4 อย่าง:\n1) ลดเป้าหมาย — เป้าจริงๆ มันต้องเท่านั้นไหม?\n2) ขยายเวลา — จาก 5 ปีเป็น 7 ปี ทำให้ภาระต่อเดือนลดลงมาก\n3) เพิ่มผลตอบแทน — ย้ายจากออมทรัพย์ไปกองทุน (เพิ่มความเสี่ยง)\n4) เพิ่มรายได้ — รับงานเสริม ขายของออนไลน์ ลงทุนในทักษะ\nหลีกเลี่ยงทางลัด เช่น Forex, Crypto leverage, สินทรัพย์ที่สัญญาว่าให้ผลตอบแทนสูงเกินจริง — มันมักเสี่ยงเสียเงินทั้งก้อน",
  },
  {
    q: "กฎ 50/30/20 คืออะไร?",
    a: "เป็นกฎจัดสรรเงินรายได้ที่ใช้ง่ายและเห็นผลจริง:\n• 50% ของรายได้ → ค่าใช้จ่ายจำเป็น (ค่าเช่า อาหาร ค่าเดินทาง)\n• 30% → ความต้องการ/ของฟุ่มเฟือย (กินข้าวนอกบ้าน ช้อปปิ้ง เที่ยว)\n• 20% → ออม/ลงทุน/ใช้หนี้\nสำหรับมือใหม่ที่ต้องการเริ่มออม ลองสลับเป็น 50/20/30 (เพิ่มสัดส่วนการออม) หรือถ้ามีหนี้สูง ใช้ 50/10/40 (ออม 10% + ผ่อนหนี้ 30%) ก็ได้ ปรับให้เหมาะกับสถานการณ์",
  },
  {
    q: "ควรมีเงินฉุกเฉินก่อนเริ่มออมเป้าหมายอื่นไหม?",
    a: "ควร — เงินฉุกเฉินเป็นชั้นแรกของการออม ก่อนคิดเรื่องลงทุนหรือเป้าหมายอื่น แนะนำ:\n• พนักงานเงินเดือนประจำ: เก็บเท่ากับค่าใช้จ่าย 3-6 เดือน\n• ฟรีแลนซ์/ทำธุรกิจ: เก็บ 6-12 เดือน เพราะรายได้ไม่แน่นอน\nวางไว้ในที่ \"กดถอนได้ทันที\" เช่น บัญชีออมทรัพย์ดอกเบี้ยสูง หรือกองทุนตลาดเงิน อย่าเอาเงินฉุกเฉินไปลงหุ้น เพราะตอนวิกฤตมักจะตกพร้อมกับที่คุณต้องใช้",
  },
];

export default function SavingsCalculatorPage() {
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "โปรแกรมคำนวณเงินออม",
    url: "https://tobtonn.com/savings-calculator",
    description:
      "คำนวณว่าต้องออมเดือนละเท่าไหร่เพื่อให้ถึงเป้าหมายที่ตั้งไว้",
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
          Savings Goal Calculator
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-5xl">
          คำนวณ <em className="text-accent">เงินออม</em> ให้ถึงเป้า
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          ตั้งเป้าหมายเงินที่อยากได้และระยะเวลา รู้ทันทีว่าต้องออมเดือนละ
          เท่าไหร่ พร้อมเปรียบเทียบบัญชีออมทรัพย์ ฝากประจำ และกองทุน
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 pb-8">
        <SavingsCalculator />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8">
        <FinancialDisclaimer />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <AdSlot id="savings-calc-below-result" size="horizontal" />
      </section>

      <ToolsGrid exclude="/savings-calculator" />

      <div className="mx-auto max-w-[820px] space-y-16 px-4 pb-20">
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            วิธีตั้งเป้าหมายการออม (กฎ 50/30/20)
          </h2>
          <p className="mb-4 leading-relaxed text-ink-soft">
            กฎ 50/30/20 เป็นวิธีจัดสรรรายได้ที่นิยมใช้ทั่วโลก คิดค้นโดย Elizabeth
            Warren ในหนังสือ &quot;All Your Worth&quot; แนวคิดคือแบ่งเงิน
            หลังหักภาษีออกเป็น 3 ส่วน:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-line bg-white/60 p-5">
              <p className="mb-2 font-mono text-3xl font-bold text-accent">
                50%
              </p>
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink">
                ความจำเป็น
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                ค่าเช่า/ผ่อนบ้าน อาหาร ค่าเดินทาง สาธารณูปโภค ประกัน
              </p>
            </div>
            <div className="rounded-xl border border-line bg-white/60 p-5">
              <p className="mb-2 font-mono text-3xl font-bold text-gold">30%</p>
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink">
                ความต้องการ
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                กินข้าวนอกบ้าน ช้อปปิ้ง เที่ยว Subscription ความบันเทิง
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="mb-2 font-mono text-3xl font-bold text-accent">
                20%
              </p>
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink">
                ออม + ใช้หนี้
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                เงินฉุกเฉิน เกษียณ เป้าหมายระยะยาว และจ่ายหนี้บัตรเครดิต
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            เปรียบเทียบบัญชีออมทรัพย์ดอกเบี้ยสูงในไทย 2026
          </h2>
          <p className="mb-4 leading-relaxed text-ink-soft">
            ดอกเบี้ย 1% ที่ต่างกันส่งผลมหาศาลในระยะยาว — ออมเดือนละ 5,000 บาท 20
            ปี ที่ดอกเบี้ย 1.5% vs 5% ต่างกันถึง 1.4 ล้านบาท การเลือกบัญชี
            ที่เหมาะสมจึงสำคัญพอๆ กับการออมต่อเนื่อง:
          </p>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-accent/5">
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">
                    ประเภท
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-ink-soft">
                    ดอกเบี้ย/ปี
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-ink-soft">
                    สภาพคล่อง
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">
                    เหมาะกับ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">ออมทรัพย์ทั่วไป</td>
                  <td className="px-4 py-3 text-center font-mono">0.25–0.5%</td>
                  <td className="px-4 py-3 text-center">สูงมาก</td>
                  <td className="px-4 py-3 text-ink-soft">
                    เงินใช้จ่ายรายเดือน
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">ออมทรัพย์ดิจิทัล</td>
                  <td className="px-4 py-3 text-center font-mono">1.5–2%</td>
                  <td className="px-4 py-3 text-center">สูง</td>
                  <td className="px-4 py-3 text-ink-soft">เงินฉุกเฉิน</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">ฝากประจำ 12-24 เดือน</td>
                  <td className="px-4 py-3 text-center font-mono">2–3%</td>
                  <td className="px-4 py-3 text-center">ต่ำ</td>
                  <td className="px-4 py-3 text-ink-soft">เป้าหมายระยะกลาง</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">กองทุนตลาดเงิน</td>
                  <td className="px-4 py-3 text-center font-mono">1.5–2.5%</td>
                  <td className="px-4 py-3 text-center">สูง</td>
                  <td className="px-4 py-3 text-ink-soft">พักเงิน 1-6 เดือน</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">กองทุนตราสารหนี้</td>
                  <td className="px-4 py-3 text-center font-mono">2–4%</td>
                  <td className="px-4 py-3 text-center">ปานกลาง</td>
                  <td className="px-4 py-3 text-ink-soft">เป้าหมาย 1-3 ปี</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">กองทุนผสม</td>
                  <td className="px-4 py-3 text-center font-mono">4–7%</td>
                  <td className="px-4 py-3 text-center">ปานกลาง</td>
                  <td className="px-4 py-3 text-ink-soft">เป้าหมาย 5+ ปี</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            ออมเงินยังไงให้ถึง 1 ล้านใน 5 ปี
          </h2>
          <p className="mb-4 leading-relaxed text-ink-soft">
            หลายคนตั้งเป้า &quot;1 ล้านแรก&quot; เพราะเป็นจุดที่เงินเริ่มทำงาน
            ให้เห็นชัด ลองดูว่าต้องเก็บเดือนละเท่าไหร่ใน 5 ปี
            ที่อัตราดอกเบี้ยต่างๆ:
          </p>
          <div className="rounded-xl border border-line bg-white/60 p-6">
            <ul className="space-y-2 text-sm leading-relaxed text-ink-soft">
              <li>
                <strong className="text-ink">ออมทรัพย์ 1.5%</strong> →
                เก็บเดือนละประมาณ{" "}
                <span className="font-mono">16,030</span> บาท
              </li>
              <li>
                <strong className="text-ink">ฝากประจำ 3%</strong> →
                เก็บเดือนละประมาณ{" "}
                <span className="font-mono">15,470</span> บาท
              </li>
              <li>
                <strong className="text-ink">กองทุน 5%</strong> →
                เก็บเดือนละประมาณ{" "}
                <span className="font-mono">14,700</span> บาท
              </li>
              <li>
                <strong className="text-ink">กองทุนหุ้น 8%</strong> →
                เก็บเดือนละประมาณ{" "}
                <span className="font-mono">13,610</span> บาท
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              จะเห็นว่าผลตอบแทนยิ่งสูง ภาระต่อเดือนยิ่งลดลง แต่อย่าลืมว่า
              ผลตอบแทนสูงมาพร้อมความเสี่ยง สำหรับเป้าหมายระยะ 5 ปี
              แนะนำผสมระหว่างฝากประจำกับกองทุนตราสารหนี้-ผสม
            </p>
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
