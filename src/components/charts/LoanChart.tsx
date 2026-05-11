"use client";

import { memo } from "react";
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
import { formatNumberShort } from "@/lib/calculate";
import ChartTooltip from "./ChartTooltip";

interface ChartRow {
  name: string;
  เงินต้น: number;
  ดอกเบี้ย: number;
}

interface Props {
  data: ChartRow[];
}

function LoanChart({ data }: Props) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid stroke="#e5dfcc" strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#2d3a35" }}
            tickLine={false}
            axisLine={{ stroke: "#d8d2c0" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#2d3a35" }}
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
  );
}

export default memo(LoanChart);
