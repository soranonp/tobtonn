import { YearData, formatNumber } from "@/lib/calculate";

interface Props {
  data: YearData[];
}

export default function YearlyTable({ data }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-line bg-accent/5">
            <th className="px-4 py-3 text-left font-medium text-ink-soft">
              สิ้นปีที่
            </th>
            <th className="px-4 py-3 text-right font-medium text-ink-soft">
              เงินต้นสะสม
            </th>
            <th className="px-4 py-3 text-right font-medium text-ink-soft">
              ดอกเบี้ยปีนี้
            </th>
            <th className="px-4 py-3 text-right font-medium text-ink-soft">
              ดอกเบี้ยสะสม
            </th>
            <th className="px-4 py-3 text-right font-medium text-ink-soft">
              ยอดเงินรวม
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            const isLast = i === data.length - 1;
            return (
              <tr
                key={row.year}
                className={`border-b border-line transition-colors last:border-b-0 ${
                  isLast
                    ? "bg-gold-soft/30 font-semibold"
                    : "hover:bg-accent/3"
                }`}
              >
                <td className="px-4 py-2.5 text-left">{row.year}</td>
                <td className="px-4 py-2.5 text-right font-mono">
                  {formatNumber(row.totalContrib)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-gold">
                  {formatNumber(row.interestYear)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-gold">
                  {formatNumber(row.totalInterest)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono font-semibold text-accent">
                  {formatNumber(row.balance)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
