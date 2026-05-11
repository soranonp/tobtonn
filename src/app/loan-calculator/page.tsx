import type { Metadata } from "next";
import LoanCalculator from "./LoanCalculator";
import AccordionFAQ from "@/components/AccordionFAQ";
import ToolsGrid from "@/components/ToolsGrid";
import AdSlot from "@/components/AdSlot";
import FinancialDisclaimer from "@/components/FinancialDisclaimer";

export const metadata: Metadata = {
  title:
    "คำนวณดอกเบี้ยเงินกู้ — บัตรเครดิต สินเชื่อ เห็นภาระหนี้จริง | tobtonn",
  description:
    "เครื่องมือคำนวณดอกเบี้ยเงินกู้ จ่ายขั้นต่ำใช้เวลากี่ปี? เปรียบเทียบจ่ายเพิ่มประหยัดดอกเบี้ยเท่าไหร่ พร้อมตารางผ่อนรายเดือน",
  keywords: [
    "คำนวณดอกเบี้ยเงินกู้",
    "ดอกเบี้ยบัตรเครดิต",
    "loan calculator",
    "จ่ายขั้นต่ำ",
    "ตารางผ่อน",
    "ปลดหนี้บัตรเครดิต",
  ],
  alternates: { canonical: "https://tobtonn.com/loan-calculator" },
  openGraph: {
    title: "คำนวณดอกเบี้ยเงินกู้ — เห็นภาระหนี้จริง",
    description:
      "บัตรเครดิต สินเชื่อ จ่ายขั้นต่ำใช้เวลากี่ปี เห็นตารางผ่อนรายเดือน",
    url: "https://tobtonn.com/loan-calculator",
    locale: "th_TH",
    type: "website",
  },
};

const faqs = [
  {
    q: "จ่ายขั้นต่ำ vs จ่ายเต็ม ต่างกันแค่ไหน?",
    a: "ต่างกันมหาศาล — ตัวอย่างหนี้บัตรเครดิต 50,000 บาท ดอกเบี้ย 16% ต่อปี:\n• จ่ายขั้นต่ำ 10% ของยอด → ใช้เวลาประมาณ 9 ปี ดอกเบี้ยรวม ~21,000 บาท\n• จ่ายเดือนละ 3,000 บาท → ใช้เวลา 1 ปี 8 เดือน ดอกเบี้ยรวม ~6,800 บาท\n• จ่ายเต็ม 50,000 บาททีเดียว → ดอกเบี้ย 0 บาท\nกฎเหล็ก: หนี้บัตรเครดิตควรจ่ายให้หมดทุกเดือนก่อนถึงกำหนดชำระ ถ้าจ่ายเต็มไม่ได้ ให้พยายามจ่ายมากกว่าขั้นต่ำให้มากที่สุด เพราะดอกเบี้ย 16-25% ต่อปีกินเงินคุณเร็วกว่าผลตอบแทนการลงทุนในเกือบทุกกรณี",
  },
  {
    q: "รวมหนี้ (Debt Consolidation) ดีไหม?",
    a: "ดี \"ถ้าทำถูกวิธี\" — รวมหนี้คือการนำหนี้ดอกเบี้ยสูงหลายๆ ก้อน (เช่น บัตรเครดิต 16-25%) มารวมเป็นหนี้ก้อนเดียวที่ดอกเบี้ยต่ำกว่า (เช่น สินเชื่อส่วนบุคคล 8-15% หรือสินเชื่อรวมหนี้ 10-13%) ข้อดี:\n• ดอกเบี้ยต่ำกว่า — ประหยัดเงินจริง\n• จ่ายงวดเดียวจัดการง่าย\n• ปลดหนี้เร็วขึ้น\nข้อควรระวัง:\n• ต้องเป็นเงินก้อนใหม่ที่ดอกเบี้ยต่ำกว่าจริง — ลองเทียบ APR (อัตราดอกเบี้ยที่แท้จริง) อย่าดูแค่ดอกเบี้ยรายเดือน\n• อย่าใช้บัตรเครดิตเดิมต่อ — ไม่งั้นจะมีหนี้สองเด้ง\n• อ่านสัญญาเรื่องค่าธรรมเนียมและเงื่อนไขให้ละเอียด",
  },
  {
    q: "ดอกเบี้ยลดต้นลดดอก vs คงที่ ต่างกันอย่างไร?",
    a: "นี่คือสองรูปแบบหลักของดอกเบี้ยเงินกู้ที่ต้องเข้าใจ:\n\n**ลดต้นลดดอก (Reducing Balance / Effective Rate)**\n• ดอกเบี้ยคำนวณจากยอดคงเหลือจริง\n• ทุกเดือนยอดต้นลดลง ดอกเบี้ยจึงลดลงตาม\n• ใช้ในสินเชื่อบ้าน สินเชื่อรถ บัตรเครดิต\n• \"ดอกเบี้ย 8% ต่อปีลดต้นลดดอก\" = อัตราจริง 8%\n\n**คงที่ (Flat Rate)**\n• ดอกเบี้ยคำนวณจากยอดเต็มตลอดสัญญา\n• ดอกเบี้ยรายเดือนเท่ากันทั้งสัญญา ไม่ลดเลย\n• พบในสินเชื่อรถบางที่ Personal Loan ที่ไม่ใส่ใจ\n• \"ดอกเบี้ย 5% ต่อปีคงที่\" = อัตราจริงประมาณ 9-10% (เกือบ 2 เท่า!)\n\n**กฎเหล็ก**: เปรียบเทียบให้ดูที่ APR (Effective Rate) ไม่ใช่ดอกเบี้ยรายเดือน หรือดอกเบี้ยที่โฆษณา",
  },
  {
    q: "สินเชื่อบ้านดอกเบี้ยลอยตัว vs คงที่ เลือกแบบไหน?",
    a: "**ลอยตัว (Floating Rate)**\n• ผูกกับ MRR/MLR ของธนาคาร — ขึ้นลงตาม\n• เริ่มต้นมักต่ำกว่า (~3.5-5%)\n• เสี่ยงดอกเบี้ยขึ้นในอนาคต\n• เหมาะถ้าวางแผน Refinance ทุก 3 ปี\n\n**คงที่ (Fixed Rate)**\n• ดอกเบี้ยคงที่ 1-3 ปีแรก แล้วจึงเปลี่ยนเป็นลอยตัว\n• เริ่มต้นสูงกว่า (~4-6%)\n• ปลอดภัยกว่าในยุคดอกเบี้ยขาขึ้น\n\n**คำแนะนำสำหรับสินเชื่อบ้าน**:\n1) ปี 1-3: เลือกโปรโมชั่นที่ดอกเบี้ยรวมต่ำสุดในช่วงนี้ (ส่วนใหญ่ Fixed สั้นๆ)\n2) ปี 3+: รีไฟแนนซ์ทุก 3 ปี เพื่อล็อกดอกเบี้ยใหม่ที่ต่ำกว่า\n3) อย่าหลงโปรหวือหวา — คำนวณดอกเบี้ยรวมตลอดสัญญา 30 ปีให้ครบ",
  },
  {
    q: "Snowball vs Avalanche method แบบไหนดีกว่า?",
    a: "ทั้งสองวิธีคือกลยุทธ์ปลดหนี้หลายๆ ก้อนพร้อมกัน:\n\n**Avalanche Method** (เหมาะที่สุดในเชิงคณิตศาสตร์)\n• จ่ายขั้นต่ำทุกหนี้ + เงินที่เหลือทั้งหมดทุ่มไปที่ \"ดอกเบี้ยสูงสุด\" ก่อน\n• ประหยัดดอกเบี้ยรวมมากที่สุด\n• ใช้เวลาน้อยที่สุด\n\n**Snowball Method** (เหมาะที่สุดในเชิงจิตวิทยา)\n• จ่ายขั้นต่ำทุกหนี้ + เงินที่เหลือทุ่มไปที่ \"ยอดน้อยที่สุด\" ก่อน\n• ปลดหนี้ก้อนเล็กได้เร็ว → สร้างกำลังใจ\n• ดอกเบี้ยรวมสูงกว่าเล็กน้อย แต่คนทำสำเร็จมากกว่า\n\n**คำแนะนำ**: ถ้ามีวินัยสูง ใช้ Avalanche ถ้ารู้ตัวว่าต้องการแรงผลักดันทางจิตวิทยา ใช้ Snowball — สำคัญที่สุดคือ \"ทำต่อเนื่อง\" ไม่ว่าจะเลือกวิธีไหน",
  },
  {
    q: "Refinance สินเชื่อบ้าน คุ้มเมื่อไหร่?",
    a: "Refinance คือการย้ายสินเชื่อบ้านไปธนาคารใหม่ที่ดอกเบี้ยต่ำกว่า สมการคำนวณ:\n\n**ค่าใช้จ่ายในการ Refinance**:\n• ค่าจดจำนองใหม่ 1% ของวงเงิน (สูงสุด 200,000 บาท)\n• ค่าประเมินราคา ~3,000-5,000 บาท\n• ค่าธรรมเนียมอื่นๆ ~5,000-10,000 บาท\n• รวมประมาณ 1-1.5% ของยอดสินเชื่อคงเหลือ\n\n**คำนวณคุ้ม-ไม่คุ้ม**:\n• ดอกเบี้ยใหม่ต้องต่ำกว่าเดิมอย่างน้อย 0.5-1%\n• ประหยัดดอกเบี้ยใน 3 ปีแรกควรมากกว่าค่า Refinance\n• ตัวอย่าง: ยอดคงเหลือ 3 ล้าน ลดดอกเบี้ย 1% (40,000+/ปี) ค่ารีไฟแนนซ์ 35,000 → คุ้มในปีที่ 1\n\n**ทำเมื่อไหร่**: หลังจบโปรโมชั่นดอกเบี้ยต่ำของธนาคารเดิม (ปกติทุก 3 ปี) — เปรียบเทียบ 2-3 ธนาคารก่อนตัดสินใจ",
  },
];

export default function LoanCalculatorPage() {
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "โปรแกรมคำนวณดอกเบี้ยเงินกู้",
    url: "https://tobtonn.com/loan-calculator",
    description:
      "คำนวณดอกเบี้ยเงินกู้ บัตรเครดิต สินเชื่อ พร้อมตารางผ่อนรายเดือน",
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

      <section className="container-wrap pb-8 pt-10 text-center sm:pt-12 md:pt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Loan & Credit Card Calculator
        </p>
        <h1 className="thai-heading font-display font-bold leading-[1.15] text-ink text-[clamp(28px,7vw,56px)]">
          คำนวณ <em className="text-accent">ดอกเบี้ยเงินกู้</em>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          บัตรเครดิต สินเชื่อ จ่ายขั้นต่ำใช้เวลากี่ปี? เปรียบเทียบจ่ายเพิ่ม
          ประหยัดดอกเบี้ยเท่าไหร่ พร้อมตารางผ่อนรายเดือนเต็ม
        </p>
      </section>

      <section className="container-wrap pb-8">
        <div className="mx-auto max-w-[1100px]">
          <LoanCalculator />
        </div>
      </section>

      <section className="container-wrap pb-8">
        <div className="mx-auto max-w-3xl">
          <FinancialDisclaimer />
        </div>
      </section>

      <section className="container-wrap pb-12">
        <div className="mx-auto max-w-3xl">
          <AdSlot id="loan-calc-below-result" size="horizontal" />
        </div>
      </section>

      <ToolsGrid exclude="/loan-calculator" />

      <div className="container-wrap mx-auto max-w-[820px] space-y-16 pb-20">
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            ดอกเบี้ยทบต้นในการกู้ยืม — ทำไมหนี้บัตรน่ากลัว
          </h2>
          <p className="mb-4 leading-relaxed text-ink-soft">
            ดอกเบี้ยทบต้นทำงานในทิศทางตรงข้ามเมื่อคุณ &quot;เป็นหนี้&quot; —
            ในการลงทุน เงินทำงานเพื่อคุณ ในการกู้ ดอกเบี้ยทำงานเพื่อเจ้าหนี้
            ทุกบาทที่ไม่จ่ายในเดือนนี้ จะถูกบวกเข้ากับเงินต้นและคิดดอกเบี้ย
            อีกครั้งในเดือนถัดไป
          </p>
          <div className="rounded-xl border border-line bg-white/60 p-6">
            <p className="mb-3 text-sm font-medium text-ink">
              ตัวอย่าง: ยอดบัตรเครดิต 50,000 บาท ดอกเบี้ย 16% ต่อปี
            </p>
            <ul className="space-y-1.5 text-sm text-ink-soft">
              <li>
                • <strong className="text-ink">จ่ายขั้นต่ำ 10%</strong>:
                ปลดหนี้ในเวลา{" "}
                <span className="font-mono text-red-600">~9 ปี</span>{" "}
                ดอกเบี้ยรวม{" "}
                <span className="font-mono text-red-600">~21,000</span> บาท
              </li>
              <li>
                • <strong className="text-ink">จ่าย 2,000 บาท/เดือน</strong>:
                ปลดในเวลา <span className="font-mono">2 ปี 8 เดือน</span>{" "}
                ดอกเบี้ยรวม{" "}
                <span className="font-mono">~10,400</span> บาท
              </li>
              <li>
                • <strong className="text-ink">จ่าย 5,000 บาท/เดือน</strong>:
                ปลดในเวลา <span className="font-mono">11 เดือน</span>{" "}
                ดอกเบี้ยรวม{" "}
                <span className="font-mono">~3,800</span> บาท
              </li>
            </ul>
            <p className="mt-3 text-xs text-ink-soft">
              ความแตกต่าง 17,000 บาท ระหว่างจ่ายขั้นต่ำกับจ่าย 5,000/เดือน
              คือเงินที่หายไปในมือธนาคาร
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            วิธีหลุดจากกับดักจ่ายขั้นต่ำ — Snowball vs Avalanche
          </h2>
          <p className="mb-4 leading-relaxed text-ink-soft">
            หากมีหนี้หลายก้อน (บัตรเครดิตหลายใบ + สินเชื่อส่วนบุคคล) มี 2
            วิธีที่นิยมในการจัดการ:
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <h3 className="mb-2 font-display text-base font-semibold text-accent">
                Avalanche (ภูเขาน้ำแข็ง)
              </h3>
              <p className="mb-2 text-sm text-ink-soft">
                จ่ายขั้นต่ำทุกหนี้ → เงินที่เหลือทุ่มที่{" "}
                <strong>ดอกเบี้ยสูงสุด</strong> ก่อน
              </p>
              <ul className="space-y-1 text-sm text-ink-soft">
                <li>✓ ประหยัดดอกเบี้ยรวมมากที่สุด</li>
                <li>✓ ใช้เวลาน้อยที่สุด</li>
                <li>✗ อาจรู้สึกท้อ ถ้าหนี้แรกใหญ่</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gold-soft bg-gold-soft/20 p-5">
              <h3 className="mb-2 font-display text-base font-semibold text-gold">
                Snowball (ลูกหิมะ)
              </h3>
              <p className="mb-2 text-sm text-ink-soft">
                จ่ายขั้นต่ำทุกหนี้ → เงินที่เหลือทุ่มที่{" "}
                <strong>ยอดน้อยที่สุด</strong> ก่อน
              </p>
              <ul className="space-y-1 text-sm text-ink-soft">
                <li>✓ ปลดหนี้ก้อนแรกได้เร็ว สร้างกำลังใจ</li>
                <li>✓ คนทำสำเร็จมากกว่า (ในงานวิจัย)</li>
                <li>✗ ดอกเบี้ยรวมสูงกว่า Avalanche เล็กน้อย</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            ผลศึกษาจาก Harvard Business Review (2016) พบว่า{" "}
            <strong>Snowball ทำให้คนปลดหนี้สำเร็จมากกว่า</strong>{" "}
            ถึงแม้คณิตศาสตร์จะบอกว่า Avalanche คุ้มกว่า — เพราะการเห็น
            หนี้ก้อนเล็กหายไปก่อน สร้างความรู้สึกว่า &quot;ทำได้&quot;
            ทำให้ทำต่อเนื่องได้
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            อัตราดอกเบี้ยเงินกู้ที่พบบ่อยในไทย 2026
          </h2>
          <div className="table-wrap">
            <table className="text-sm">
              <thead>
                <tr className="border-b border-line bg-accent/5">
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">
                    ประเภทเงินกู้
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-ink-soft">
                    ดอกเบี้ย/ปี
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">
                    หมายเหตุ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">สินเชื่อบ้าน</td>
                  <td className="px-4 py-3 text-center font-mono">3.5–6%</td>
                  <td className="px-4 py-3 text-ink-soft">ดอกเบี้ยลอยตัว MRR</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">สินเชื่อรถ</td>
                  <td className="px-4 py-3 text-center font-mono">2.5–4.5%*</td>
                  <td className="px-4 py-3 text-ink-soft">
                    Flat rate (จริง ~5–9%)
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">สินเชื่อส่วนบุคคล</td>
                  <td className="px-4 py-3 text-center font-mono">8–25%</td>
                  <td className="px-4 py-3 text-ink-soft">
                    ตามเครดิตและรายได้
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">บัตรเครดิต</td>
                  <td className="px-4 py-3 text-center font-mono">16%</td>
                  <td className="px-4 py-3 text-ink-soft">
                    เพดานตามแบงค์ชาติ
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="px-4 py-3 font-medium">บัตรกดเงินสด</td>
                  <td className="px-4 py-3 text-center font-mono">25%</td>
                  <td className="px-4 py-3 text-ink-soft">
                    เพดานตามแบงค์ชาติ
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">สินเชื่อนอกระบบ</td>
                  <td className="px-4 py-3 text-center font-mono">60–240%</td>
                  <td className="px-4 py-3 text-red-600">เลี่ยงให้ไกลที่สุด</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            *Flat Rate ดูเหมือนต่ำ แต่อัตราจริงประมาณ 2 เท่า ใช้ APR
            เปรียบเทียบเท่านั้น
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
