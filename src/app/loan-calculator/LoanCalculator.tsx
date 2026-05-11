"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatNumber, formatNumberShort } from "@/lib/calculate";
import ChartTooltip from "@/components/charts/ChartTooltip";

interface MonthRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface LoanResult {
  months: number;
  totalPaid: number;
  totalInterest: number;
  rows: MonthRow[];
  diverged: boolean;
}

const MAX_MONTHS = 600;

function simulateMin(
  principal: number,
  annualRate: number,
  minPercent: number,
  minBaht: number,
  extra: number
): LoanResult {
  const r = annualRate / 100 / 12;
  let balance = principal;
  let totalPaid = 0;
  let totalInterest = 0;
  const rows: MonthRow[] = [];
  let m = 0;

  while (balance > 0.01 && m < MAX_MONTHS) {
    m++;
    const interest = balance * r;
    let minPayment = Math.max((minPercent / 100) * balance, minBaht);
    let payment = minPayment + extra;

    // last payment: clamp
    if (payment >= balance + interest) {
      payment = balance + interest;
    }

    if (payment <= interest) {
      // diverging
      rows.push({
        month: m,
        payment,
        principal: 0,
        interest,
        balance: balance + interest - payment,
      });
      balance = balance + interest - payment;
      totalPaid += payment;
      totalInterest += interest;
      continue;
    }

    const principalPaid = payment - interest;
    balance -= principalPaid;
    totalPaid += payment;
    totalInterest += interest;
    rows.push({
      month: m,
      payment,
      principal: principalPaid,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return {
    months: m,
    totalPaid,
    totalInterest,
    rows,
    diverged: balance > 0.01,
  };
}

function simulateFixed(
  principal: number,
  annualRate: number,
  fixed: number,
  extra: number
): LoanResult {
  const r = annualRate / 100 / 12;
  let balance = principal;
  let totalPaid = 0;
  let totalInterest = 0;
  const rows: MonthRow[] = [];
  let m = 0;
  const payment0 = fixed + extra;

  while (balance > 0.01 && m < MAX_MONTHS) {
    m++;
    const interest = balance * r;
    let payment = payment0;
    if (payment >= balance + interest) {
      payment = balance + interest;
    }

    if (payment <= interest) {
      rows.push({
        month: m,
        payment,
        principal: 0,
        interest,
        balance: balance + interest - payment,
      });
      balance = balance + interest - payment;
      totalPaid += payment;
      totalInterest += interest;
      continue;
    }

    const principalPaid = payment - interest;
    balance -= principalPaid;
    totalPaid += payment;
    totalInterest += interest;
    rows.push({
      month: m,
      payment,
      principal: principalPaid,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return {
    months: m,
    totalPaid,
    totalInterest,
    rows,
    diverged: balance > 0.01,
  };
}

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(50000);
  const [rate, setRate] = useState(16);
  const [mode, setMode] = useState<"min" | "fixed">("min");
  const [minPercent, setMinPercent] = useState(10);
  const [minBaht, setMinBaht] = useState(500);
  const [fixedPayment, setFixedPayment] = useState(3000);
  const [extra, setExtra] = useState(0);

  const result = useMemo(() => {
    if (principal <= 0 || rate < 0) return null;
    const base =
      mode === "min"
        ? simulateMin(principal, rate, minPercent, minBaht, 0)
        : simulateFixed(principal, rate, fixedPayment, 0);

    const withExtra =
      extra > 0
        ? mode === "min"
          ? simulateMin(principal, rate, minPercent, minBaht, extra)
          : simulateFixed(principal, rate, fixedPayment, extra)
        : null;

    // Comparison scenarios for chart
    const scenarios = [0, 1000, 2000, 3000].map((ex) => {
      const sim =
        mode === "min"
          ? simulateMin(principal, rate, minPercent, minBaht, ex)
          : simulateFixed(principal, rate, fixedPayment, ex);
      return {
        label: ex === 0 ? "ไม่จ่ายเพิ่ม" : `+${formatNumberShort(ex)}/เดือน`,
        months: sim.months,
        interest: sim.totalInterest,
        principal,
        diverged: sim.diverged,
      };
    });

    return { base, withExtra, scenarios };
  }, [principal, rate, mode, minPercent, minBaht, fixedPayment, extra]);

  const formatPeriod = (months: number) => {
    const y = Math.floor(months / 12);
    const m = months % 12;
    if (y === 0) return `${m} เดือน`;
    if (m === 0) return `${y} ปี`;
    return `${y} ปี ${m} เดือน`;
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
      <div className="min-w-0 rounded-2xl border border-line bg-white/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              ยอดหนี้ปัจจุบัน
            </label>
            <div className="relative">
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                บาท
              </span>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              อัตราดอกเบี้ยต่อปี
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
            <p className="mt-1 text-xs text-ink-soft">
              บัตรเครดิต 16-25% / สินเชื่อ 8-15% / บ้าน 3.5-6%
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              รูปแบบการจ่าย
            </label>
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-white p-1">
              {(
                [
                  ["min", "จ่ายขั้นต่ำ"],
                  ["fixed", "จ่ายคงที่"],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setMode(val)}
                  className={`min-h-[44px] rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    mode === val
                      ? "bg-accent text-white shadow-sm"
                      : "text-ink-soft hover:bg-accent/5"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {mode === "min" ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="min-w-0">
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  % ของยอด
                </label>
                <div className="relative min-w-0">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={minPercent}
                    onChange={(e) => setMinPercent(Number(e.target.value))}
                    step={0.5}
                    className="w-full min-h-[48px] min-w-0 rounded-xl border border-line bg-white px-4 py-3 pr-10 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                    %
                  </span>
                </div>
              </div>
              <div className="min-w-0">
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  ขั้นต่ำสุด
                </label>
                <div className="relative min-w-0">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={minBaht}
                    onChange={(e) => setMinBaht(Number(e.target.value))}
                    className="w-full min-h-[48px] min-w-0 rounded-xl border border-line bg-white px-4 py-3 pr-12 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                    บาท
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                จ่ายเดือนละ
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={fixedPayment}
                  onChange={(e) => setFixedPayment(Number(e.target.value))}
                  className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                  บาท
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              จ่ายเพิ่ม (เปรียบเทียบ)
            </label>
            <div className="relative">
              <input
                type="number"
                value={extra}
                onChange={(e) => setExtra(Number(e.target.value))}
                className="w-full min-h-[48px] rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                บาท
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              ใส่จำนวนเงินที่จะจ่ายเพิ่ม เพื่อดูประหยัดเท่าไหร่
            </p>
          </div>
        </div>
      </div>

      {result && (
        <div className="min-w-0 space-y-6">
          {result.base.diverged && (
            <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
              <strong>⚠ จ่ายไม่พอครอบคลุมดอกเบี้ย</strong> — หนี้จะเพิ่มขึ้น
              เรื่อยๆ ลองเพิ่มจำนวนการจ่ายต่อเดือนหรือพิจารณารวมหนี้
            </div>
          )}

          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div
              className={`rounded-xl border p-4 ${
                result.base.months > 60
                  ? "border-red-300 bg-red-50"
                  : "border-line bg-white/60"
              }`}
            >
              <p className="mb-1 text-xs text-ink-soft">เวลาปลดหนี้</p>
              <p
                className={`font-mono text-lg font-bold ${
                  result.base.months > 60 ? "text-red-600" : "text-ink"
                }`}
              >
                {result.base.diverged ? "ไม่หมด" : formatPeriod(result.base.months)}
              </p>
              {result.base.months > 60 && !result.base.diverged && (
                <p className="text-xs text-red-600">⚠ นานเกิน 5 ปี</p>
              )}
            </div>

            <div className="rounded-xl border border-gold-soft bg-gold-soft/20 p-4">
              <p className="mb-1 text-xs text-ink-soft">ดอกเบี้ยรวม</p>
              <p className="font-mono text-lg font-bold text-gold">
                {formatNumber(result.base.totalInterest)}
              </p>
              <p className="text-xs text-ink-soft">บาท</p>
            </div>

            <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
              <p className="mb-1 text-xs text-ink-soft">เงินจ่ายทั้งหมด</p>
              <p className="font-mono text-lg font-bold text-accent">
                {formatNumber(result.base.totalPaid)}
              </p>
              <p className="text-xs text-ink-soft">ต้น + ดอก</p>
            </div>

            {result.withExtra ? (
              <div className="rounded-xl border border-accent/30 bg-white/60 p-4 backdrop-blur-sm">
                <p className="mb-1 text-xs text-ink-soft">ประหยัดได้</p>
                <p className="font-mono text-lg font-bold text-accent">
                  {formatNumber(
                    result.base.totalInterest -
                      result.withExtra.totalInterest
                  )}
                </p>
                <p className="text-xs text-ink-soft">
                  ถ้าจ่ายเพิ่ม {formatNumber(extra)}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-line bg-white/60 p-4 backdrop-blur-sm">
                <p className="mb-1 text-xs text-ink-soft">% ดอกเบี้ย</p>
                <p className="font-mono text-lg font-bold text-ink">
                  {((result.base.totalInterest / principal) * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-ink-soft">ของยอดต้น</p>
              </div>
            )}
          </div>

          {/* Chart - Compare scenarios */}
          <div className="rounded-2xl border border-line bg-white/60 p-5 backdrop-blur-sm">
            <h3 className="mb-4 font-display text-base font-semibold text-ink">
              เปรียบเทียบ: จ่ายเพิ่มประหยัดดอกเบี้ยเท่าไหร่
            </h3>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={result.scenarios.map((s) => ({
                    name: s.label,
                    เงินต้น: Math.round(s.principal),
                    ดอกเบี้ย: s.diverged ? 0 : Math.round(s.interest),
                  }))}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid stroke="#e5dfcc" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#4a5a55" }}
                    tickLine={false}
                    axisLine={{ stroke: "#d8d2c0" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#4a5a55" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => formatNumberShort(v)}
                  />
                  <Tooltip
                    content={
                      <ChartTooltip
                        labelPrefix=""
                        showTotal={true}
                        totalLabel="รวมจ่าย"
                      />
                    }
                  />
                  <Legend />
                  <Bar
                    dataKey="เงินต้น"
                    stackId="a"
                    fill="#0f4d3a"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="ดอกเบี้ย"
                    stackId="a"
                    fill="#c9a44c"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid gap-2 text-xs text-ink-soft sm:grid-cols-4">
              {result.scenarios.map((s) => (
                <div key={s.label} className="rounded-lg bg-accent/5 px-3 py-2">
                  <p className="font-medium text-ink">{s.label}</p>
                  <p className="font-mono">
                    {s.diverged ? "ไม่หมด" : formatPeriod(s.months)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Amortization Table */}
          <div>
            <h3 className="mb-3 font-display text-base font-semibold text-ink">
              ตารางผ่อนรายเดือน{" "}
              {result.base.rows.length >= 36 && (
                <span className="text-xs font-normal text-ink-soft">
                  (แสดงทุก 3 เดือน)
                </span>
              )}
            </h3>
            <div className="table-wrap">
              <table className="text-sm">
                <thead>
                  <tr className="border-b border-line bg-accent/5">
                    <th className="px-4 py-3 text-left font-medium text-ink-soft">
                      เดือน
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      จ่าย
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      ตัดต้น
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      ดอกเบี้ย
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      ยอดคงเหลือ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.base.rows
                    .filter((row, i) => {
                      if (result.base.rows.length < 36) return true;
                      return (
                        row.month % 3 === 0 ||
                        i === 0 ||
                        i === result.base.rows.length - 1
                      );
                    })
                    .map((row, i, arr) => {
                      const isLast = i === arr.length - 1;
                      return (
                        <tr
                          key={row.month}
                          className={`border-b border-line last:border-b-0 ${
                            isLast
                              ? "bg-gold-soft/30 font-semibold"
                              : "hover:bg-accent/3"
                          }`}
                        >
                          <td className="px-4 py-2.5">{row.month}</td>
                          <td className="px-4 py-2.5 text-right font-mono">
                            {formatNumber(row.payment)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono text-accent">
                            {formatNumber(row.principal)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono text-gold">
                            {formatNumber(row.interest)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono">
                            {formatNumber(row.balance)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {result.base.diverged && (
              <p className="mt-2 text-xs text-red-600">
                ⚠ การจำลองหยุดที่ {MAX_MONTHS} เดือนเนื่องจากหนี้ไม่หมด
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
