import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">
        ไม่พบหน้าที่ต้องการ
      </h1>
      <p className="mt-2 text-ink-soft">
        หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
      >
        กลับหน้าแรก
      </Link>
    </div>
  );
}
