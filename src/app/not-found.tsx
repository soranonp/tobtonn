import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 ไม่พบหน้า | tobtonn.com",
  description: "ไม่พบหน้าที่คุณค้นหา อาจเป็นลิงก์เก่า หรือพิมพ์ URL ผิด",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  {
    href: "/",
    title: "คำนวณดอกเบี้ยทบต้น",
    desc: "เครื่องมือยอดนิยมพร้อม DCA",
  },
  {
    href: "/dca-calculator",
    title: "คำนวณ DCA",
    desc: "Dollar-Cost Averaging vs Lump Sum",
  },
  {
    href: "/savings-calculator",
    title: "คำนวณเงินออม",
    desc: "ตั้งเป้าหมาย รู้ทันทีต้องออมเดือนละเท่าไหร่",
  },
  {
    href: "/retirement-calculator",
    title: "คำนวณเกษียณ",
    desc: "วางแผนเกษียณ คำนึงถึงเงินเฟ้อ",
  },
];

export default function NotFound() {
  return (
    <div className="bg-bg">
      <section className="px-4 pb-12 pt-16 text-center md:pt-24">
        <p
          className="font-display italic text-accent leading-none"
          style={{ fontSize: "clamp(96px, 22vw, 200px)", fontWeight: 200 }}
        >
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink md:text-3xl">
          ไม่พบหน้าที่คุณค้นหา
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          อาจจะเป็นลิงก์เก่า หรือพิมพ์ URL ผิด — ลองดูเครื่องมือยอดนิยมด้านล่างได้เลย
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {QUICK_LINKS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-line bg-white/60 p-5 transition-all hover:border-accent/30 hover:shadow-md"
            >
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink group-hover:text-accent">
                {tool.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 text-center">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
          >
            กลับหน้าแรก
          </Link>
          <Link
            href="/blog"
            className="rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/30"
          >
            ดูบทความทั้งหมด
          </Link>
        </div>
      </section>
    </div>
  );
}
