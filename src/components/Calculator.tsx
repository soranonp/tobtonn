"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { calculate, formatNumber } from "@/lib/calculate";
import YearlyTable from "./YearlyTable";

const CompoundChart = dynamic(() => import("./CompoundChart"), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] w-full animate-pulse rounded-xl bg-line/30" />
  ),
});

type Frequency = 1 | 12 | 365;

export default function Calculator() {
  const [principal, setPrincipal] = useState(100000);
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [months, setMonths] = useState(0);
  const [frequency, setFrequency] = useState<Frequency>(12);

  // Key to force recalculation on button click
  const [calcKey, setCalcKey] = useState(0);

  const totalMonths = years * 12 + months;

  const result = useMemo(() => {
    // Reference calcKey so recalculation is triggered
    void calcKey;
    if (totalMonths <= 0) return null;
    return calculate(principal, monthly, rate, totalMonths, frequency);
  }, [principal, monthly, rate, totalMonths, frequency, calcKey]);

  const displayYears =
    months > 0 ? `${years} ปี ${months} เดือน` : `${years} ปี`;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
      {/* LEFT — Input Card */}
      <div className="min-w-0 rounded-2xl border border-line bg-white/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="space-y-5">
          {/* เงินต้น */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              เงินต้นเริ่มต้น
            </label>
            <div className="relative">
              <input
                id="ci-principal"
                type="number"
                inputMode="decimal"
                enterKeyHint="next"
                min={0}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="h-12 w-full rounded-xl border border-line bg-white px-4 pr-14 font-mono text-base outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                บาท
              </span>
            </div>
          </div>

          {/* DCA */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              เงินลงทุนเพิ่มรายเดือน (DCA)
            </label>
            <div className="relative">
              <input
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                บาท
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              เงินที่จะออม/ลงทุนเพิ่มทุกเดือน
            </p>
          </div>

          {/* อัตราผลตอบแทน */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              อัตราผลตอบแทนต่อปี
            </label>
            <div className="relative">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                step={0.1}
                className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-10 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                %
              </span>
            </div>
          </div>

          {/* ระยะเวลา */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              ระยะเวลา
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative min-w-0">
                <input
                  type="number"
                  inputMode="numeric"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  min={0}
                  className="w-full min-h-[48px] min-w-0 rounded-xl border border-line bg-white px-4 py-3 pr-10 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                  ปี
                </span>
              </div>
              <div className="relative min-w-0">
                <input
                  type="number"
                  inputMode="numeric"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  min={0}
                  max={11}
                  className="w-full min-h-[48px] min-w-0 rounded-xl border border-line bg-white px-4 py-3 pr-12 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                  เดือน
                </span>
              </div>
            </div>
          </div>

          {/* ความถี่ทบต้น */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              ความถี่ในการทบต้น
            </label>
            <div
              role="radiogroup"
              aria-label="ความถี่ในการทบต้น"
              className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-white p-1"
            >
              {([
                [1, "รายปี"],
                [12, "รายเดือน"],
                [365, "รายวัน"],
              ] as const).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  role="radio"
                  aria-checked={frequency === val}
                  onClick={() => setFrequency(val)}
                  className={`min-h-[44px] rounded-lg px-2 py-2 text-sm font-medium transition-all ${
                    frequency === val
                      ? "bg-accent text-white shadow-sm"
                      : "text-ink-soft hover:bg-accent/5"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ปุ่มคำนวณ */}
          <button
            type="button"
            onClick={() => setCalcKey((k) => k + 1)}
            className="min-h-[48px] w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-bright hover:shadow-md active:scale-[0.98]"
          >
            คำนวณใหม่
          </button>
        </div>
      </div>

      {/* RIGHT — Results */}
      {result && (
        <div className="min-w-0 space-y-6">
          {/* Subtitle */}
          <p className="text-sm text-ink-soft">
            ภายใน{" "}
            <span className="font-semibold text-ink">{displayYears}</span>{" "}
            เงินของคุณจะเติบโตเป็น...
          </p>

          {/* 3 Stat Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* เงินที่ลงไปทั้งหมด */}
            <div className="rounded-xl border border-line bg-white/60 p-4 backdrop-blur-sm">
              <p className="mb-1 text-xs text-ink-soft">เงินที่ลงไปทั้งหมด</p>
              <p className="font-mono text-xl font-bold text-ink">
                {formatNumber(result.totalContributed)}
              </p>
              <p className="text-xs text-ink-soft">บาท</p>
            </div>

            {/* ดอกเบี้ยที่ได้รับ */}
            <div className="rounded-xl border border-gold-soft bg-gold-soft/20 p-4">
              <p className="mb-1 text-xs text-ink-soft">ดอกเบี้ยที่ได้รับ</p>
              <p className="font-mono text-xl font-bold text-gold">
                {formatNumber(result.totalInterest)}
              </p>
              <p className="text-xs text-ink-soft">บาท</p>
            </div>

            {/* ยอดเงินรวมสุดท้าย */}
            <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-accent/5 p-4">
              <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-gold/10" />
              <p className="mb-1 text-xs text-ink-soft">ยอดเงินรวมสุดท้าย</p>
              <p className="font-mono text-xl font-bold text-accent">
                {formatNumber(result.balance)}
              </p>
              <p className="text-xs text-ink-soft">บาท</p>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-line bg-white/60 p-5 backdrop-blur-sm">
            <h3 className="mb-4 font-display text-base font-semibold text-ink">
              กราฟการเติบโตของเงิน
            </h3>
            <CompoundChart data={result.yearlyData} />
          </div>

          {/* Table */}
          <div>
            <h3 className="mb-3 font-display text-base font-semibold text-ink">
              ตารางรายปี
            </h3>
            <YearlyTable data={result.yearlyData} />
          </div>
        </div>
      )}
    </div>
  );
}
