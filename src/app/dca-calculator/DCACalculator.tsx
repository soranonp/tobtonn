"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatNumber, formatNumberShort } from "@/lib/calculate";
import ChartTooltip from "@/components/charts/ChartTooltip";

interface YearRow {
  year: number;
  contributed: number;
  dca: number;
  lumpSum: number;
}

function calcDCAvsLump(
  monthly: number,
  annualRate: number,
  totalMonths: number
) {
  const i = annualRate / 100;
  const monthlyRate = Math.pow(1 + i, 1 / 12) - 1;
  const totalContributed = monthly * totalMonths;

  let dcaBalance = 0;
  let contributed = 0;
  let lumpSumBalance = totalContributed;

  const rows: YearRow[] = [];

  for (let m = 1; m <= totalMonths; m++) {
    dcaBalance += monthly;
    contributed += monthly;
    dcaBalance *= 1 + monthlyRate;
    lumpSumBalance *= 1 + monthlyRate;

    if (m % 12 === 0 || m === totalMonths) {
      rows.push({
        year: Math.ceil(m / 12),
        contributed,
        dca: dcaBalance,
        lumpSum: lumpSumBalance,
      });
    }
  }

  return {
    totalContributed,
    dcaFinal: dcaBalance,
    lumpSumFinal: lumpSumBalance,
    dcaInterest: dcaBalance - totalContributed,
    rows,
  };
}

export default function DCACalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(25);
  const [months, setMonths] = useState(0);
  const [compareLump, setCompareLump] = useState(true);

  const totalMonths = years * 12 + months;

  const result = useMemo(() => {
    if (totalMonths <= 0 || monthly <= 0) return null;
    return calcDCAvsLump(monthly, rate, totalMonths);
  }, [monthly, rate, totalMonths]);

  const displayPeriod =
    months > 0 ? `${years} ปี ${months} เดือน` : `${years} ปี`;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[380px_1fr]">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-white/60 p-6 shadow-sm backdrop-blur-sm">
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              เงินลงทุนรายเดือน (DCA)
            </label>
            <div className="relative">
              <input
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                บาท
              </span>
            </div>
          </div>

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
                className="w-full rounded-xl border border-line bg-white px-4 py-3 pr-10 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                %
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              หุ้น/กองทุนหุ้นเฉลี่ย 7-10% ต่อปี
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              ระยะเวลา
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  min={0}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 pr-10 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                  ปี
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  min={0}
                  max={11}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 pr-14 font-mono text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
                  เดือน
                </span>
              </div>
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-white p-3 hover:bg-accent/5">
            <input
              type="checkbox"
              checked={compareLump}
              onChange={(e) => setCompareLump(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-accent"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">
                เปรียบเทียบกับ Lump Sum
              </p>
              <p className="mt-0.5 text-xs text-ink-soft">
                เริ่มต้นลงเงินก้อนเท่ากับ DCA สะสมตั้งแต่วันแรก
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          <p className="text-sm text-ink-soft">
            DCA เดือนละ{" "}
            <span className="font-semibold text-ink">
              {formatNumber(monthly)}
            </span>{" "}
            บาท เป็นเวลา{" "}
            <span className="font-semibold text-ink">{displayPeriod}</span> ที่{" "}
            <span className="font-semibold text-ink">{rate}%</span>{" "}
            ต่อปี
          </p>

          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-line bg-white/60 p-4 backdrop-blur-sm">
              <p className="mb-1 text-xs text-ink-soft">เงินลงทุนรวม</p>
              <p className="font-mono text-lg font-bold text-ink">
                {formatNumber(result.totalContributed)}
              </p>
              <p className="text-xs text-ink-soft">บาท</p>
            </div>
            <div className="rounded-xl border border-gold-soft bg-gold-soft/20 p-4">
              <p className="mb-1 text-xs text-ink-soft">ดอกเบี้ยจาก DCA</p>
              <p className="font-mono text-lg font-bold text-gold">
                {formatNumber(result.dcaInterest)}
              </p>
              <p className="text-xs text-ink-soft">บาท</p>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-accent/5 p-4">
              <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-gold/10" />
              <p className="mb-1 text-xs text-ink-soft">ยอดสุดท้าย DCA</p>
              <p className="font-mono text-lg font-bold text-accent">
                {formatNumber(result.dcaFinal)}
              </p>
              <p className="text-xs text-ink-soft">บาท</p>
            </div>
            {compareLump ? (
              <div className="rounded-xl border border-line bg-white/60 p-4 backdrop-blur-sm">
                <p className="mb-1 text-xs text-ink-soft">ยอด Lump Sum</p>
                <p className="font-mono text-lg font-bold text-ink">
                  {formatNumber(result.lumpSumFinal)}
                </p>
                <p className="text-xs text-ink-soft">
                  {result.lumpSumFinal > result.dcaFinal ? "+" : ""}
                  {formatNumber(result.lumpSumFinal - result.dcaFinal)} เทียบ
                  DCA
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-line bg-white/60 p-4 backdrop-blur-sm">
                <p className="mb-1 text-xs text-ink-soft">% เติบโต</p>
                <p className="font-mono text-lg font-bold text-accent">
                  {(
                    ((result.dcaFinal - result.totalContributed) /
                      result.totalContributed) *
                    100
                  ).toFixed(0)}
                  %
                </p>
                <p className="text-xs text-ink-soft">
                  จากเงินต้น {formatNumber(result.totalContributed)} บาท
                </p>
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-line bg-white/60 p-5 backdrop-blur-sm">
            <h3 className="mb-4 font-display text-base font-semibold text-ink">
              กราฟการเติบโตของเงิน {compareLump && "(DCA vs Lump Sum)"}
            </h3>
            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={result.rows.map((r) => ({
                    name: String(r.year),
                    DCA: Math.round(r.dca),
                    "Lump Sum": Math.round(r.lumpSum),
                  }))}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke="#e5dfcc" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#4a5a55" }}
                    tickLine={false}
                    axisLine={{ stroke: "#d8d2c0" }}
                    tickFormatter={(v) => `ปี ${v}`}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#4a5a55" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => formatNumberShort(v)}
                  />
                  <Tooltip content={<ChartTooltip showTotal={false} />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="DCA"
                    stroke="#0f4d3a"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                  {compareLump && (
                    <Line
                      type="monotone"
                      dataKey="Lump Sum"
                      stroke="#c9a44c"
                      strokeWidth={2.5}
                      strokeDasharray="6 3"
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div>
            <h3 className="mb-3 font-display text-base font-semibold text-ink">
              ตารางรายปี
            </h3>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-line bg-accent/5">
                    <th className="px-4 py-3 text-left font-medium text-ink-soft">
                      สิ้นปีที่
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      เงินลงทุนสะสม
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-ink-soft">
                      ยอด DCA
                    </th>
                    {compareLump && (
                      <>
                        <th className="px-4 py-3 text-right font-medium text-ink-soft">
                          ยอด Lump Sum
                        </th>
                        <th className="px-4 py-3 text-right font-medium text-ink-soft">
                          ส่วนต่าง
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => {
                    const isLast = i === result.rows.length - 1;
                    const diff = row.lumpSum - row.dca;
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
                          {formatNumber(row.contributed)}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono text-accent">
                          {formatNumber(row.dca)}
                        </td>
                        {compareLump && (
                          <>
                            <td className="px-4 py-2.5 text-right font-mono text-gold">
                              {formatNumber(row.lumpSum)}
                            </td>
                            <td className="px-4 py-2.5 text-right font-mono text-ink-soft">
                              {diff >= 0 ? "+" : ""}
                              {formatNumber(diff)}
                            </td>
                          </>
                        )}
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
