"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { YearData, formatNumber, formatNumberShort } from "@/lib/calculate";

interface Props {
  data: YearData[];
}

const TOOLTIP_COLORS: Record<string, string> = {
  เงินต้นสะสม: "#4ade80",
  ดอกเบี้ยสะสม: "#fcd34d",
};

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;
  const total = payload.reduce((sum, entry) => sum + entry.value, 0);
  return (
    <div className="rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm shadow-lg">
      <p className="mb-1.5 font-medium" style={{ color: "#ffffff" }}>
        ปีที่ {label}
      </p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: TOOLTIP_COLORS[entry.name] ?? entry.color }}>
          {entry.name}: <span className="font-mono">{formatNumber(entry.value)}</span> บาท
        </p>
      ))}
      <p
        className="mt-2 border-t pt-2"
        style={{ color: "#ffffff", borderColor: "#374151" }}
      >
        รวม: <span className="font-mono">{formatNumber(total)}</span> บาท
      </p>
    </div>
  );
}

function CustomLegend({
  payload,
}: {
  payload?: Array<{ value: string; color: string }>;
}) {
  if (!payload) return null;
  return (
    <div className="mb-2 flex justify-center gap-6">
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-ink-soft">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </div>
      ))}
    </div>
  );
}

export default function CompoundChart({ data }: Props) {
  const chartData = data.map((d) => ({
    name: String(d.year),
    เงินต้นสะสม: Math.round(d.totalContrib),
    ดอกเบี้ยสะสม: Math.round(d.totalInterest),
  }));

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap="20%">
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
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          <Bar
            dataKey="เงินต้นสะสม"
            stackId="a"
            fill="#0f4d3a"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="ดอกเบี้ยสะสม"
            stackId="a"
            fill="#c9a44c"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
