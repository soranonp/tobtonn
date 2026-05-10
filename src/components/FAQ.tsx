"use client";

import { useState } from "react";

const faqs = [
  {
    q: "DCA คืออะไร? ทำไมต้องลงทุนเพิ่มทุกเดือน?",
    a: "DCA (Dollar-Cost Averaging) คือการลงทุนด้วยจำนวนเงินเท่าๆ กันเป็นประจำทุกเดือน ช่วยลดความเสี่ยงจากความผันผวนของตลาด เพราะคุณจะซื้อได้ทั้งราคาสูงและราคาต่ำ ทำให้ต้นทุนเฉลี่ยลดลง",
  },
  {
    q: "ทบต้นรายปี รายเดือน รายวัน ต่างกันอย่างไร?",
    a: "ยิ่งทบต้นถี่มากขึ้น ดอกเบี้ยก็จะยิ่งมากขึ้นเล็กน้อย เพราะดอกเบี้ยจะถูกนำไปคำนวณรวมกับเงินต้นเร็วขึ้น เช่น ทบต้นรายเดือนจะได้ดอกเบี้ยมากกว่ารายปี แต่ความแตกต่างมักไม่มากนัก",
  },
  {
    q: "ทำไมควรเริ่มลงทุนตั้งแต่อายุน้อย?",
    a: 'เพราะ "เวลา" คือปัจจัยที่ทรงพลังที่สุดของดอกเบี้ยทบต้น ยิ่งเริ่มเร็ว ดอกเบี้ยจะมีเวลาทบทวีมากขึ้น เช่น เริ่มตอนอายุ 25 จะมีเงินมากกว่าเริ่มตอนอายุ 35 อย่างมหาศาล แม้ลงทุนเดือนละเท่ากัน',
  },
  {
    q: "กฎ 72 คืออะไร?",
    a: "กฎ 72 เป็นวิธีประมาณการง่ายๆ ว่าเงินจะเพิ่มเป็นสองเท่าในกี่ปี โดยใช้สูตร: 72 ÷ อัตราดอกเบี้ย = จำนวนปี เช่น ดอกเบี้ย 8% ต่อปี เงินจะเพิ่มเป็น 2 เท่าในเวลา 72 ÷ 8 = 9 ปี",
  },
  {
    q: "ผลลัพธ์จากเครื่องมือนี้แม่นยำแค่ไหน?",
    a: "เครื่องมือนี้คำนวณตามสูตรทางคณิตศาสตร์ที่แม่นยำ แต่เป็นการจำลองสถานการณ์ในอุดมคติ ในความเป็นจริง ผลตอบแทนจะผันผวนตามตลาด ไม่คงที่ตลอด และอาจมีค่าธรรมเนียม ภาษี หรือเงินเฟ้อที่ไม่ได้คำนวณรวมไว้",
  },
  {
    q: "ใช้คำนวณกับเงินกู้ได้ไหม?",
    a: "ได้ ดอกเบี้ยทบต้นทำงานเหมือนกันทั้งในมุมผู้ออมและผู้กู้ สำหรับเงินกู้ ดอกเบี้ยทบต้นคือสิ่งที่ทำให้ยอดหนี้เพิ่มขึ้น คุณสามารถใช้เครื่องมือนี้ดูว่าหนี้จะเติบโตเร็วแค่ไหนถ้าไม่ชำระ",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border border-line bg-white/40 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="pr-4 text-sm font-medium text-ink">
                {faq.q}
              </span>
              <svg
                className={`h-5 w-5 shrink-0 text-ink-soft transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="border-t border-line px-5 py-4 text-sm leading-relaxed text-ink-soft">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
