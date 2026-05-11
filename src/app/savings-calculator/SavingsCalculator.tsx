"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { formatNumber } from "@/lib/calculate";
import ChartSkeleton from "@/components/charts/ChartSkeleton";

const SavingsChart = dynamic(
  () => import("@/components/charts/SavingsChart"),
  {
    ssr: false,
    loading: () => <ChartSkeleton minHeight={340} />,
  }
);

// Calculate required monthly payment to reach FV given PV, annualRate, totalMonths
// Convention: contribution at beginning of month, interest applied at end of month (annuity-due)
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

interface YearlyRow {
  year: number;
  contribCum: number;
  interestYear: number;
  balance: number;
  pctOfTarget: number;
}

function simulate(
  pv: number,
  pmt: number,
  annualRate: number,
  totalMonths: number,
  target: number
) {
  const r = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  let balance = pv;
  let contribCum = pv;
  let yearInterest = 0;
  const rows: YearlyRow[] = [];

  for (let m = 1; m <= totalMonths; m++) {
    balance += pmt;
    contribCum += pmt;
    const interest = balance * r;
    balance += interest;
    yearInterest += interest;

    if (m % 12 === 0 || m === totalMonths) {
      rows.push({
        year: Math.ceil(m / 12),
        contribCum,
        interestYear: yearInterest,
        balance,
        pctOfTarget: target > 0 ? (balance / target) * 100 : 0,
      });
      yearInterest = 0;
    }
  }

  return rows;
}

export default function SavingsCalculator() {
  const [target, setTarget] = useState(1000000);
  const [pv, setPv] = useState(0);
  const [rate, setRate] = useState(2);
  const [years, setYears] = useState(5);
  const [months, setMonths] = useState(0);

  const totalMonths = years * 12 + months;

  const result = useMemo(() => {
    if (totalMonths <= 0 || target <= 0) return null;
    const pmt = requiredMonthly(target, pv, rate, totalMonths);
    const rows = simulate(pv, pmt, rate, totalMonths, target);

    // Compare with different rates
    const compare = [1.5, 3, 5].map((r) => ({
      rate: r,
      pmt: requiredMonthly(target, pv, r, totalMonths),
    }));

    return { pmt, rows, compare };
  }, [target, pv, rate, totalMonths]);

  const displayPeriod =
    months > 0 ? `${years} ปี ${months} เดือน` : `${years} ปี`;

  const insufficient = result && result.pmt < 0;

  const chartData = useMemo(
    () =>
      result
        ? result.rows.map((r) => ({
            name: String(r.year),
            ยอดสะสม: Math.round(r.balance),
          }))
        : [],
    [result]
  );

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
      <div className="min-w-0 rounded-2xl border border-line bg-white/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="sv-target"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              เป้าหมายเงินที่อยากได้
            </label>
            <div className="relative">
              <input
                id="sv-target"
                type="number"
                inputMode="decimal"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                aria-label="เป้าหมายเงินที่อยากได้ (บาท)"
                className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                บาท
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="sv-pv"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              เงินต้นเริ่มต้น (ที่มีอยู่แล้ว)
            </label>
            <div className="relative">
              <input
                id="sv-pv"
                type="number"
                inputMode="decimal"
                value={pv}
                onChange={(e) => setPv(Number(e.target.value))}
                aria-label="เงินต้นเริ่มต้นที่มีอยู่แล้ว (บาท)"
                className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                บาท
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="sv-rate"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              อัตราดอกเบี้ยต่อปี
            </label>
            <div className="relative">
              <input
                id="sv-rate"
                type="number"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                step={0.1}
                aria-label="อัตราดอกเบี้ยต่อปี (เปอร์เซ็นต์)"
                className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-10 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                %
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              ออมทรัพย์ดิจิทัล 1.5-2% / ฝากประจำ 2-3% / กองทุน 4-7%
            </p>
          </div>

          <div>
            <span
              id="sv-period-label"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              ระยะเวลา
            </span>
            <div
              role="group"
              aria-labelledby="sv-period-label"
              className="grid grid-cols-2 gap-3"
            >
              <div className="relative min-w-0">
                <input
                  id="sv-years"
                  type="number"
                  inputMode="numeric"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  min={0}
                  aria-label="ระยะเวลา (ปี)"
                  className="w-full min-h-[48px] min-w-0 rounded-xl border border-line bg-white px-4 py-3 pr-10 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                  ปี
                </span>
              </div>
              <div className="relative min-w-0">
                <input
                  id="sv-months"
                  type="number"
                  inputMode="numeric"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  min={0}
                  max={11}
                  aria-label="ระยะเวลา (เดือนเพิ่มเติม)"
                  className="w-full min-h-[48px] min-w-0 rounded-xl border border-line bg-white px-4 py-3 pr-12 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                  เดือน
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="min-w-0 space-y-6">
          {insufficient ? (
            <div className="rounded-2xl border border-gold-soft bg-gold-soft/30 p-6">
              <p className="mb-1 text-sm font-medium text-ink">
                เงินต้นที่มีอยู่มากเกินเป้าหมาย
              </p>
              <p className="text-sm text-ink-soft">
                ที่ดอกเบี้ย {rate}% ต่อปี เงิน {formatNumber(pv)} บาท จะโตเป็น{" "}
                {formatNumber(
                  pv * Math.pow(1 + rate / 100, years + months / 12)
                )}{" "}
                บาทภายใน {displayPeriod} เกินเป้า {formatNumber(target)} บาท
                แล้ว — ลดเงินต้น เพิ่มเป้าหมาย หรือลดเวลาลง
              </p>
            </div>
          ) : (
            <p className="text-sm text-ink-soft">
              เพื่อให้ถึงเป้า{" "}
              <span className="font-semibold text-ink">
                {formatNumber(target)}
              </span>{" "}
              บาท ภายใน{" "}
              <span className="font-semibold text-ink">{displayPeriod}</span>{" "}
              ที่ดอกเบี้ย{" "}
              <span className="font-semibold text-ink">{rate}%</span> ต่อปี
              คุณต้อง...
            </p>
          )}

          {/* Big stat */}
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-accent/5 p-8">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/10" />
            <p className="mb-1 text-sm text-ink-soft">ต้องออมเดือนละ</p>
            <p className="font-mono text-5xl font-bold text-accent md:text-6xl">
              {formatNumber(Math.max(0, result.pmt))}
            </p>
            <p className="mt-1 text-base text-ink-soft">บาท / เดือน</p>
          </div>

          {/* Comparison rates */}
          <div>
            <p className="mb-3 text-sm font-medium text-ink">
              ถ้าได้ดอกเบี้ยต่างกัน — ภาระต่อเดือนเปลี่ยนเท่าไหร่
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {result.compare.map((c) => (
                <div
                  key={c.rate}
                  className="rounded-xl border border-line bg-white/60 p-4 backdrop-blur-sm"
                >
                  <p className="mb-1 text-xs text-ink-soft">
                    {c.rate === 1.5
                      ? "ออมทรัพย์"
                      : c.rate === 3
                        ? "ฝากประจำ"
                        : "กองทุน"}{" "}
                    {c.rate}%
                  </p>
                  <p className="font-mono text-xl font-bold text-ink">
                    {formatNumber(Math.max(0, c.pmt))}
                  </p>
                  <p className="text-xs text-ink-soft">บาท / เดือน</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-line bg-white/60 p-5 backdrop-blur-sm">
            <h2 className="mb-4 font-display text-base font-semibold text-ink">
              กราฟการเติบโตจนถึงเป้าหมาย
            </h2>
            <SavingsChart data={chartData} target={target} />
          </div>

          {/* Table */}
          <div>
            <h2 className="mb-3 font-display text-base font-semibold text-ink">
              ตารางรายปี
            </h2>
            <div className="table-wrap">
              <table className="text-sm">
                <thead>
                  <tr className="border-b border-line bg-accent/5">
                    <th className="px-4 py-3 text-left font-medium text-ink-soft">
                      ปีที่
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      เงินต้นสะสม
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      ดอกเบี้ยปีนี้
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      ยอดสะสม
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      % ของเป้า
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => {
                    const isLast = i === result.rows.length - 1;
                    return (
                      <tr
                        key={row.year}
                        className={`border-b border-line last:border-b-0 ${
                          isLast
                            ? "bg-gold-soft/30 font-semibold"
                            : "hover:bg-accent/3"
                        }`}
                      >
                        <td className="px-4 py-2.5">{row.year}</td>
                        <td className="px-4 py-2.5 text-right font-mono">
                          {formatNumber(row.contribCum)}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono text-gold">
                          {formatNumber(row.interestYear)}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono text-accent">
                          {formatNumber(row.balance)}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono text-ink-soft">
                          {row.pctOfTarget.toFixed(0)}%
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
