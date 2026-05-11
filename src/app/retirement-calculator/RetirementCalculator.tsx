"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { formatNumber } from "@/lib/calculate";
import ChartSkeleton from "@/components/charts/ChartSkeleton";

const RetirementChart = dynamic(
  () => import("@/components/charts/RetirementChart"),
  {
    ssr: false,
    loading: () => <ChartSkeleton minHeight={340} />,
  }
);

interface YearRow {
  age: number;
  expected: number;
  needed: number;
}

function simulate(
  currentAge: number,
  retireAge: number,
  monthlyExpenseToday: number,
  pv: number,
  pmt: number,
  returnRate: number,
  inflation: number
) {
  const yearsToRetire = retireAge - currentAge;
  if (yearsToRetire <= 0) return { rows: [], expectedAtRetire: pv, neededAtRetire: 0 };

  const r = Math.pow(1 + returnRate / 100, 1 / 12) - 1;
  let balance = pv;
  const rows: YearRow[] = [];

  // start row at year 0
  rows.push({
    age: currentAge,
    expected: pv,
    needed: monthlyExpenseToday * 12 * 25,
  });

  for (let m = 1; m <= yearsToRetire * 12; m++) {
    balance += pmt;
    balance += balance * r;

    if (m % 12 === 0) {
      const yearsFromNow = m / 12;
      const inflated =
        monthlyExpenseToday * Math.pow(1 + inflation / 100, yearsFromNow);
      rows.push({
        age: currentAge + yearsFromNow,
        expected: balance,
        needed: inflated * 12 * 25,
      });
    }
  }

  const expectedAtRetire = balance;
  const inflatedExpense =
    monthlyExpenseToday * Math.pow(1 + inflation / 100, yearsToRetire);
  const neededAtRetire = inflatedExpense * 12 * 25;

  return { rows, expectedAtRetire, neededAtRetire };
}

function requiredMonthly(
  fv: number,
  pv: number,
  annualRate: number,
  totalMonths: number
): number {
  if (totalMonths <= 0) return 0;
  const r = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const fvPV = pv * Math.pow(1 + r, totalMonths);
  if (Math.abs(r) < 1e-9) {
    return Math.max(0, (fv - pv) / totalMonths);
  }
  const annuityFactor = ((Math.pow(1 + r, totalMonths) - 1) / r) * (1 + r);
  if (annuityFactor === 0) return 0;
  return (fv - fvPV) / annuityFactor;
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(30000);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [monthlySavings, setMonthlySavings] = useState(8000);
  const [returnRate, setReturnRate] = useState(7);
  const [inflation, setInflation] = useState(3);

  const result = useMemo(() => {
    if (retireAge <= currentAge) return null;
    const sim = simulate(
      currentAge,
      retireAge,
      monthlyExpense,
      currentSavings,
      monthlySavings,
      returnRate,
      inflation
    );

    const gap = sim.expectedAtRetire - sim.neededAtRetire;
    const totalMonths = (retireAge - currentAge) * 12;
    const requiredTotal = requiredMonthly(
      sim.neededAtRetire,
      currentSavings,
      returnRate,
      totalMonths
    );
    const additionalNeeded = Math.max(0, requiredTotal - monthlySavings);

    return {
      ...sim,
      gap,
      additionalNeeded,
      requiredTotal,
    };
  }, [
    currentAge,
    retireAge,
    monthlyExpense,
    currentSavings,
    monthlySavings,
    returnRate,
    inflation,
  ]);

  const yearsToRetire = retireAge - currentAge;

  const chartData = useMemo(
    () =>
      result
        ? result.rows.map((r) => ({
            name: String(r.age),
            เงินที่จะมี: Math.round(r.expected),
            เงินที่ต้องการ: Math.round(r.needed),
          }))
        : [],
    [result]
  );

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
      <div className="min-w-0 rounded-2xl border border-line bg-white/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0">
              <label
                htmlFor="rt-current-age"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                อายุปัจจุบัน
              </label>
              <input
                id="rt-current-age"
                type="number"
                inputMode="numeric"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                min={0}
                max={120}
                aria-label="อายุปัจจุบัน (ปี)"
                className="w-full min-h-[48px] min-w-0 rounded-xl border border-line bg-white px-4 py-3 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div className="min-w-0">
              <label
                htmlFor="rt-retire-age"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                อายุที่จะเกษียณ
              </label>
              <input
                id="rt-retire-age"
                type="number"
                inputMode="numeric"
                value={retireAge}
                onChange={(e) => setRetireAge(Number(e.target.value))}
                min={0}
                max={120}
                aria-label="อายุที่จะเกษียณ (ปี)"
                className="w-full min-h-[48px] min-w-0 rounded-xl border border-line bg-white px-4 py-3 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="rt-expense"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              ค่าใช้จ่ายต่อเดือนหลังเกษียณ (วันนี้)
            </label>
            <div className="relative">
              <input
                id="rt-expense"
                type="number"
                inputMode="decimal"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                aria-label="ค่าใช้จ่ายต่อเดือนหลังเกษียณ ณ ค่าเงินวันนี้ (บาท)"
                className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                บาท
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              ใส่ค่าครองชีพปัจจุบัน เราจะปรับเงินเฟ้อให้เอง
            </p>
          </div>

          <div>
            <label
              htmlFor="rt-savings"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              เงินเก็บปัจจุบัน
            </label>
            <div className="relative">
              <input
                id="rt-savings"
                type="number"
                inputMode="decimal"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                aria-label="เงินเก็บปัจจุบัน (บาท)"
                className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                บาท
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="rt-monthly-savings"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              ออมเพิ่มได้ต่อเดือน
            </label>
            <div className="relative">
              <input
                id="rt-monthly-savings"
                type="number"
                inputMode="decimal"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                aria-label="ออมเพิ่มได้ต่อเดือน (บาท)"
                className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                บาท
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0">
              <label
                htmlFor="rt-return"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                ผลตอบแทนลงทุน
              </label>
              <div className="relative min-w-0">
                <input
                  id="rt-return"
                  type="number"
                  inputMode="decimal"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  step={0.1}
                  aria-label="ผลตอบแทนลงทุนต่อปี (เปอร์เซ็นต์)"
                  className="w-full min-h-[48px] min-w-0 rounded-xl border border-line bg-white px-4 py-3 pr-10 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                  %
                </span>
              </div>
            </div>
            <div className="min-w-0">
              <label
                htmlFor="rt-inflation"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                เงินเฟ้อ
              </label>
              <div className="relative min-w-0">
                <input
                  id="rt-inflation"
                  type="number"
                  inputMode="decimal"
                  value={inflation}
                  onChange={(e) => setInflation(Number(e.target.value))}
                  step={0.1}
                  aria-label="อัตราเงินเฟ้อต่อปี (เปอร์เซ็นต์)"
                  className="w-full min-h-[48px] min-w-0 rounded-xl border border-line bg-white px-4 py-3 pr-10 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                  %
                </span>
              </div>
            </div>
          </div>

          <p className="rounded-lg bg-accent/5 px-3 py-2 text-xs text-ink-soft">
            * ใช้กฎ 25 เท่าของรายจ่ายต่อปี (4% Rule) คำนวณเงินที่ต้องมี
            ตอนเกษียณ
          </p>
        </div>
      </div>

      {result && yearsToRetire > 0 && (
        <div className="min-w-0 space-y-6">
          <p className="text-sm text-ink-soft">
            อีก{" "}
            <span className="font-semibold text-ink">{yearsToRetire}</span> ปี
            จะเกษียณ — แผนของคุณ...
          </p>

          {/* 4 stat cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gold-soft bg-gold-soft/20 p-4">
              <p className="mb-1 text-xs text-ink-soft">
                ต้องมีตอนเกษียณ (ปรับเงินเฟ้อ)
              </p>
              <p className="font-mono text-xl font-bold text-gold">
                {formatNumber(result.neededAtRetire)}
              </p>
              <p className="text-xs text-ink-soft">บาท (อายุ {retireAge})</p>
            </div>

            <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
              <p className="mb-1 text-xs text-ink-soft">
                เงินที่จะมีจริง (ตามแผน)
              </p>
              <p className="font-mono text-xl font-bold text-accent">
                {formatNumber(result.expectedAtRetire)}
              </p>
              <p className="text-xs text-ink-soft">บาท</p>
            </div>

            <div
              className={`rounded-xl border p-4 ${
                result.gap >= 0
                  ? "border-accent/30 bg-accent/5"
                  : "border-red-300 bg-red-50"
              }`}
            >
              <p className="mb-1 text-xs text-ink-soft">
                {result.gap >= 0 ? "เกินเป้า" : "ขาดอยู่"}
              </p>
              <p
                className={`font-mono text-xl font-bold ${
                  result.gap >= 0 ? "text-accent" : "text-red-600"
                }`}
              >
                {result.gap >= 0 ? "+" : ""}
                {formatNumber(result.gap)}
              </p>
              <p className="text-xs text-ink-soft">บาท</p>
            </div>

            <div className="rounded-xl border border-line bg-white/60 p-4 backdrop-blur-sm">
              <p className="mb-1 text-xs text-ink-soft">
                {result.additionalNeeded > 0
                  ? "ต้องออมเพิ่มอีก"
                  : "คุณออมเกินที่ต้องการ"}
              </p>
              <p
                className={`font-mono text-xl font-bold ${
                  result.additionalNeeded > 0 ? "text-red-600" : "text-accent"
                }`}
              >
                {result.additionalNeeded > 0
                  ? formatNumber(result.additionalNeeded)
                  : formatNumber(monthlySavings - result.requiredTotal)}
              </p>
              <p className="text-xs text-ink-soft">
                บาท / เดือน{" "}
                {result.additionalNeeded === 0 && "(ออมพอแล้ว)"}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-line bg-white/60 p-5 backdrop-blur-sm">
            <h2 className="mb-4 font-display text-base font-semibold text-ink">
              เงินที่จะมี vs เงินที่ต้องการ
            </h2>
            <RetirementChart data={chartData} />
          </div>

          {/* Table — every 5 years */}
          <div>
            <h2 className="mb-3 font-display text-base font-semibold text-ink">
              ตารางทุก 5 ปี
            </h2>
            <div className="table-wrap">
              <table className="text-sm">
                <thead>
                  <tr className="border-b border-line bg-accent/5">
                    <th className="px-4 py-3 text-left font-medium text-ink-soft">
                      อายุ
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      เงินที่จะมี
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      เงินที่ต้องการ
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      ส่วนต่าง
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows
                    .filter(
                      (r, i) =>
                        i === 0 ||
                        r.age % 5 === 0 ||
                        i === result.rows.length - 1
                    )
                    .map((row, i, arr) => {
                      const isLast = i === arr.length - 1;
                      const diff = row.expected - row.needed;
                      return (
                        <tr
                          key={row.age}
                          className={`border-b border-line last:border-b-0 ${
                            isLast
                              ? "bg-gold-soft/30 font-semibold"
                              : "hover:bg-accent/3"
                          }`}
                        >
                          <td className="px-4 py-2.5">{row.age}</td>
                          <td className="px-4 py-2.5 text-right font-mono text-accent">
                            {formatNumber(row.expected)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono text-gold">
                            {formatNumber(row.needed)}
                          </td>
                          <td
                            className={`px-4 py-2.5 text-right font-mono ${
                              diff >= 0 ? "text-accent" : "text-red-600"
                            }`}
                          >
                            {diff >= 0 ? "+" : ""}
                            {formatNumber(diff)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
