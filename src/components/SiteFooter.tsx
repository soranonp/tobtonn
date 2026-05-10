import Link from "next/link";

const toolLinks = [
  { href: "/", label: "คำนวณดอกเบี้ยทบต้น" },
  { href: "/dca-calculator", label: "คำนวณ DCA" },
  { href: "/savings-calculator", label: "คำนวณเงินออม" },
  { href: "/retirement-calculator", label: "คำนวณเกษียณ" },
  { href: "/loan-calculator", label: "คำนวณสินเชื่อ" },
];

const contentLinks = [
  { href: "/blog", label: "บทความ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อ" },
];

const policyLinks = [{ href: "/privacy", label: "นโยบายความเป็นส่วนตัว" }];

export default function SiteFooter() {
  return (
    <footer className="border-t-4 border-gold bg-ink text-bg/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-base font-bold text-white">
              ฿
            </span>
            <span className="font-display text-base font-semibold text-white">
              tobtonn.com
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            เครื่องมือคำนวณการเงินออนไลน์ ใช้งานฟรี ไม่ต้องสมัครสมาชิก
          </p>
        </div>

        {/* เครื่องมือ */}
        <div>
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">
            เครื่องมือ
          </h3>
          <ul className="space-y-2">
            {toolLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* เนื้อหา */}
        <div>
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">
            เนื้อหา
          </h3>
          <ul className="space-y-2">
            {contentLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* นโยบาย */}
        <div>
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">
            นโยบาย
          </h3>
          <ul className="space-y-2">
            {policyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-bg/40">
        <p>© 2026 tobtonn.com — สงวนลิขสิทธิ์</p>
        <p className="mt-1">
          ผลลัพธ์จากเครื่องมือนี้เป็นเพียงการประมาณการเท่านั้น
          ไม่ใช่คำแนะนำทางการเงิน กรุณาปรึกษาผู้เชี่ยวชาญก่อนตัดสินใจลงทุน
        </p>
      </div>
    </footer>
  );
}
