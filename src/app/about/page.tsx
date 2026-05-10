import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | tobtonn.com",
  description:
    "เรื่องราวของ tobtonn.com — เครื่องมือคำนวณการเงินภาษาไทย ฟรี ไม่ต้องสมัคร ออกแบบให้ใช้งานง่ายและแม่นยำ พร้อมข้อจำกัดความรับผิดชอบที่ชัดเจน",
  alternates: { canonical: "https://tobtonn.com/about" },
  openGraph: {
    title: "เกี่ยวกับเรา | tobtonn.com",
    description:
      "เครื่องมือวางแผนการเงินที่ใช้ง่าย ฟรี ไม่ต้องสมัครสมาชิก",
    url: "https://tobtonn.com/about",
    locale: "th_TH",
    type: "website",
  },
};

const reasons = [
  {
    title: "ฟรี 100% ไม่ต้องสมัคร",
    desc: "ใช้งานได้ทันที ไม่บังคับลงทะเบียน ไม่มีค่าใช้จ่ายแอบแฝง",
  },
  {
    title: "ประมวลผลใน Browser",
    desc: "ตัวเลขที่คุณกรอกไม่ถูกส่งไปยังเซิร์ฟเวอร์ ปลอดภัยและเป็นส่วนตัว",
  },
  {
    title: "ภาษาไทย สูตรแม่นยำ",
    desc: "อิงสูตรการเงินมาตรฐาน อธิบายเป็นภาษาไทยเข้าใจง่าย",
  },
  {
    title: "อัปเดตเนื้อหาสม่ำเสมอ",
    desc: "บทความและเครื่องมือใหม่เพิ่มขึ้นทุกสัปดาห์ ตามแนวโน้มตลาด",
  },
];

export default function AboutPage() {
  const postCount = getAllPosts().length;

  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="px-4 pb-10 pt-14 text-center md:pt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          About tobtonn.com
        </p>
        <h1 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-5xl">
          เครื่องมือวางแผนการเงินที่{" "}
          <em className="text-accent">ใช้ง่าย ฟรี</em>{" "}
          ไม่ต้องสมัครสมาชิก
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          เราเชื่อว่าทุกคนควรเข้าถึงเครื่องมือวางแผนการเงินที่ดีโดยไม่มีกำแพงสมัครสมาชิก
          ไม่ต้องดาวน์โหลด ไม่ต้องเปิดเผยข้อมูลส่วนตัว
        </p>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-[820px] px-4 pb-12">
        <div className="rounded-2xl border border-line bg-white/60 p-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            พันธกิจของเรา
          </h2>
          <p className="leading-relaxed text-ink-soft">
            tobtonn.com มุ่งมั่นที่จะเป็นเพื่อนคู่คิดในการวางแผนการเงินของคนไทย
            ผ่านเครื่องมือคำนวณที่เข้าใจง่าย ตอบโจทย์การใช้งานจริง และเนื้อหาที่อ้างอิงข้อมูลจริง
            เราไม่ขายผลิตภัณฑ์การเงิน ไม่มีนายหน้า
            จึงสามารถนำเสนอข้อมูลที่<strong>ตรงไปตรงมา ไม่ลำเอียง</strong>
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            เราเชื่อว่าการรู้เท่าทันดอกเบี้ยทบต้น การเริ่มลงทุนแต่เนิ่น ๆ
            และการวางแผนการเงินอย่างมีระบบ
            คือทักษะที่เปลี่ยนชีวิตได้ — และทุกคนควรเข้าถึงได้โดยไม่ต้องจ่ายเงิน
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-5xl px-4 pb-14">
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">
          ทำไมต้องใช้เว็บนี้
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="rounded-xl border border-line bg-white/60 p-6"
            >
              <h3 className="mb-2 font-display text-base font-semibold text-ink">
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-[820px] px-4 pb-14">
        <div className="rounded-2xl border border-gold-soft/60 bg-gold-soft/30 p-7">
          <h2 className="mb-3 font-display text-xl font-bold text-ink">
            ข้อจำกัดความรับผิดชอบ (Disclaimer)
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-ink-soft">
            <li>
              <strong className="text-ink">เครื่องมือเป็นเพียงการประมาณการ</strong>
              {" "}— ผลลัพธ์ขึ้นอยู่กับสมมติฐานที่คุณกรอก ไม่รับประกันผลตอบแทนจริง
            </li>
            <li>
              <strong className="text-ink">ไม่ใช่คำแนะนำทางการเงิน/การลงทุน</strong>
              {" "}— เนื้อหาทั้งหมดมีจุดประสงค์เพื่อการศึกษาเท่านั้น
            </li>
            <li>
              <strong className="text-ink">แนะนำให้ปรึกษาที่ปรึกษาการเงินมืออาชีพ</strong>
              {" "}— ก่อนตัดสินใจลงทุนหรือทำธุรกรรมที่มีนัยสำคัญ
            </li>
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-4 pb-14">
        <div className="grid gap-4 rounded-2xl bg-ink p-8 text-center sm:grid-cols-3">
          <div>
            <p className="font-display text-3xl font-bold text-gold md:text-4xl">
              5+
            </p>
            <p className="mt-1 text-sm text-bg/70">เครื่องคำนวณ</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-gold md:text-4xl">
              {postCount}+
            </p>
            <p className="mt-1 text-sm text-bg/70">บทความ</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-gold md:text-4xl">
              ทุกสัปดาห์
            </p>
            <p className="mt-1 text-sm text-bg/70">อัปเดตเนื้อหา</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 pb-20 text-center">
        <h2 className="mb-3 font-display text-2xl font-bold text-ink">
          พร้อมวางแผนการเงินของคุณแล้วหรือยัง?
        </h2>
        <p className="mb-6 text-ink-soft">
          เริ่มต้นด้วยเครื่องคำนวณดอกเบี้ยทบต้น — ใช้งานได้ทันที ไม่ต้องสมัคร
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
          >
            ลองใช้เครื่องคำนวณ
          </Link>
          <Link
            href="/blog"
            className="rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/30"
          >
            อ่านบทความ
          </Link>
        </div>
      </section>
    </div>
  );
}
