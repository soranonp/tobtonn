"use client";

import { memo } from "react";
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
import { formatNumberShort } from "@/lib/calculate";
import ChartTooltip from "./ChartTooltip";

interface ChartRow {
  name: string;
  เงินที่จะมี: number;
  เงินที่ต้องการ: number;
}

interface Props {
  data: ChartRow[];
}

function RetirementChart({ data }: Props) {
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#e5dfcc" strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#2d3a35" }}
            tickLine={false}
            axisLine={{ stroke: "#d8d2c0" }}
            tickFormatter={(v) => `${v} ปี`}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#2d3a35" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => formatNumberShort(v)}
          />
          <Tooltip
            content={<ChartTooltip labelPrefix="อายุ " labelSuffix=" ปี" />}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="เงินที่จะมี"
            stroke="#0f4d3a"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="เงินที่ต้องการ"
            stroke="#c9a44c"
            strokeWidth={2.5}
            strokeDasharray="6 3"
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(RetirementChart);
