import Link from "next/link";
import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";

const tools = [
  {
    href: "/dca-calculator",
    title: "คำนวณ DCA",
    desc: "คำนวณผลตอบแทนจากการลงทุนแบบ Dollar-Cost Averaging",
  },
  {
    href: "/savings-calculator",
    title: "คำนวณเงินออม",
    desc: "วางแผนการออมเงินเพื่อเป้าหมายทางการเงิน",
  },
  {
    href: "/retirement-calculator",
    title: "คำนวณเกษียณ",
    desc: "วางแผนเกษียณอายุ คำนวณเงินที่ต้องเตรียม",
  },
  {
    href: "/loan-calculator",
    title: "คำนวณสินเชื่อ",
    desc: "คำนวณค่างวด ดอกเบี้ยสินเชื่อ และตารางผ่อนชำระ",
  },
];

const assetRates = [
  { name: "เงินฝากออมทรัพย์", rate: "0.5 – 1.5%", risk: "ต่ำมาก" },
  { name: "เงินฝากประจำ", rate: "1 – 3%", risk: "ต่ำ" },
  { name: "ตราสารหนี้ / พันธบัตร", rate: "2 – 4%", risk: "ต่ำ–ปานกลาง" },
  { name: "กองทุนรวมผสม", rate: "4 – 7%", risk: "ปานกลาง" },
  { name: "หุ้นไทย (SET)", rate: "5 – 10%", risk: "สูง" },
  { name: "S&P 500 (สหรัฐ)", rate: "~10%", risk: "สูง" },
];

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "DCA คืออะไร?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DCA (Dollar-Cost Averaging) คือการลงทุนด้วยจำนวนเงินเท่าๆ กันเป็นประจำทุกเดือน ช่วยลดความเสี่ยงจากความผันผวนของตลาด",
        },
      },
      {
        "@type": "Question",
        name: "กฎ 72 คืออะไร?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "กฎ 72 เป็นวิธีประมาณการว่าเงินจะเพิ่มเป็นสองเท่าในกี่ปี โดยใช้สูตร 72 ÷ อัตราดอกเบี้ย = จำนวนปี",
        },
      },
      {
        "@type": "Question",
        name: "ดอกเบี้ยทบต้นคืออะไร?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ดอกเบี้ยทบต้นคือดอกเบี้ยที่คำนวณจากเงินต้นรวมกับดอกเบี้ยสะสมก่อนหน้า ทำให้เงินเติบโตแบบทวีคูณตามเวลา",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="px-4 pb-8 pt-12 text-center md:pt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Compound Interest Calculator
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-5xl">
          โปรแกรมคำนวณ{" "}
          <em className="text-accent">ดอกเบี้ยทบต้น</em>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          คำนวณพลังของดอกเบี้ยทบต้น พร้อมการลงทุนเพิ่มรายเดือน (DCA)
          แสดงผลเป็นกราฟและตารางรายปี — ใช้งานฟรี ไม่ต้องสมัครสมาชิก
        </p>
      </section>

      {/* Calculator */}
      <section className="mx-auto max-w-[980px] px-4 pb-16">
        <Calculator />
      </section>

      {/* Tools Grid */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">
          เครื่องมือคำนวณอื่นๆ
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-line bg-white/60 p-5 transition-all hover:border-accent/30 hover:shadow-md"
            >
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink group-hover:text-accent">
                {tool.title}
              </h3>
              <p className="text-sm text-ink-soft">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <div className="mx-auto max-w-[820px] space-y-16 px-4 pb-20">
        {/* ดอกเบี้ยทบต้นคืออะไร */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            ดอกเบี้ยทบต้นคืออะไร?
          </h2>
          <p className="mb-6 leading-relaxed text-ink-soft">
            ดอกเบี้ยทบต้น (Compound Interest)
            คือดอกเบี้ยที่คำนวณจากเงินต้นรวมกับดอกเบี้ยสะสมก่อนหน้า
            ต่างจากดอกเบี้ยธรรมดาที่คำนวณจากเงินต้นเริ่มต้นเท่านั้น
            ทำให้เงินเติบโตแบบทวีคูณเมื่อเวลาผ่านไป อัลเบิร์ต ไอน์สไตน์
            เคยกล่าวว่าดอกเบี้ยทบต้นเป็น &quot;สิ่งมหัศจรรย์อันดับ 8
            ของโลก&quot;
          </p>
          <div className="rounded-xl border border-line bg-white/60 p-6">
            <p className="mb-3 text-sm font-semibold text-ink">
              ตัวอย่าง: ลงทุน 100,000 บาท อัตราผลตอบแทน 7% ต่อปี เป็นเวลา 30
              ปี
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-ink-soft/5 p-4">
                <p className="text-xs text-ink-soft">ดอกเบี้ยธรรมดา (Simple)</p>
                <p className="font-mono text-lg font-bold text-ink-soft">
                  310,000 บาท
                </p>
              </div>
              <div className="rounded-lg bg-accent/5 p-4">
                <p className="text-xs text-accent">ดอกเบี้ยทบต้น (Compound)</p>
                <p className="font-mono text-lg font-bold text-accent">
                  761,226 บาท
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              ดอกเบี้ยทบต้นให้ผลตอบแทนมากกว่าถึง 2.5 เท่า!
            </p>
          </div>
        </section>

        {/* สูตร */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            สูตรดอกเบี้ยทบต้น
          </h2>
          <div className="relative overflow-hidden rounded-xl bg-ink p-6">
            <span className="absolute right-4 top-3 font-display text-xs font-semibold uppercase tracking-wider text-gold">
              FORMULA
            </span>
            <p className="font-mono text-lg text-white md:text-xl">
              FV = PV &times; (1 + i/n)<sup>n&times;t</sup>
            </p>
            <div className="mt-4 space-y-1 text-sm text-white/70">
              <p>
                <span className="font-mono text-gold">FV</span> = มูลค่าในอนาคต
                (Future Value)
              </p>
              <p>
                <span className="font-mono text-gold">PV</span> = เงินต้น
                (Present Value)
              </p>
              <p>
                <span className="font-mono text-gold">i</span> =
                อัตราดอกเบี้ยต่อปี (Annual Interest Rate)
              </p>
              <p>
                <span className="font-mono text-gold">n</span> =
                จำนวนครั้งที่ทบต้นต่อปี
              </p>
              <p>
                <span className="font-mono text-gold">t</span> = ระยะเวลา (ปี)
              </p>
            </div>
          </div>
        </section>

        {/* วิธีใช้งาน + อัตราผลตอบแทน */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            วิธีใช้งานโปรแกรมคำนวณ
          </h2>
          <ol className="mb-6 list-inside list-decimal space-y-2 leading-relaxed text-ink-soft">
            <li>ใส่จำนวนเงินต้นเริ่มต้นที่คุณมี</li>
            <li>ใส่จำนวนเงินที่จะลงทุนเพิ่มทุกเดือน (DCA)</li>
            <li>ใส่อัตราผลตอบแทนต่อปีที่คาดหวัง (ดูตารางด้านล่าง)</li>
            <li>กำหนดระยะเวลาที่ต้องการลงทุน</li>
            <li>เลือกความถี่ในการทบต้น แล้วกดคำนวณ</li>
          </ol>

          <h3 className="mb-3 font-display text-lg font-semibold text-ink">
            อัตราผลตอบแทนตามประเภทสินทรัพย์
          </h3>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-accent/5">
                  <th className="px-4 py-3 text-left font-medium text-ink-soft">
                    ประเภทสินทรัพย์
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-ink-soft">
                    ผลตอบแทนเฉลี่ย/ปี
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-ink-soft">
                    ความเสี่ยง
                  </th>
                </tr>
              </thead>
              <tbody>
                {assetRates.map((asset) => (
                  <tr
                    key={asset.name}
                    className="border-b border-line last:border-b-0"
                  >
                    <td className="px-4 py-2.5">{asset.name}</td>
                    <td className="px-4 py-2.5 text-center font-mono">
                      {asset.rate}
                    </td>
                    <td className="px-4 py-2.5 text-center text-ink-soft">
                      {asset.risk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            คำถามที่พบบ่อย
          </h2>
          <FAQ />
        </section>
      </div>
    </>
  );
}
