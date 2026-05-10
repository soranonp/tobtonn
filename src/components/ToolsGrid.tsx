import Link from "next/link";

const ALL_TOOLS = [
  {
    href: "/",
    title: "คำนวณดอกเบี้ยทบต้น",
    desc: "คำนวณดอกเบี้ยทบต้น พร้อม DCA แสดงกราฟและตารางรายปี",
  },
  {
    href: "/dca-calculator",
    title: "คำนวณ DCA",
    desc: "ลงทุนรายเดือนในกองทุน เปรียบเทียบกับ Lump Sum",
  },
  {
    href: "/savings-calculator",
    title: "คำนวณเงินออม",
    desc: "ตั้งเป้าหมายแล้วรู้ทันทีว่าต้องออมเดือนละเท่าไหร่",
  },
  {
    href: "/retirement-calculator",
    title: "คำนวณเงินเกษียณ",
    desc: "วางแผนเกษียณ คำนวณเงินที่ต้องเตรียมรวมเงินเฟ้อ",
  },
  {
    href: "/loan-calculator",
    title: "คำนวณดอกเบี้ยเงินกู้",
    desc: "บัตรเครดิต สินเชื่อ ดูภาระหนี้และตารางผ่อน",
  },
];

interface Props {
  exclude: string;
  title?: string;
}

export default function ToolsGrid({
  exclude,
  title = "เครื่องมือคำนวณอื่นๆ",
}: Props) {
  const tools = ALL_TOOLS.filter((t) => t.href !== exclude);
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">
        {title}
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
            <p className="text-sm leading-relaxed text-ink-soft">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
