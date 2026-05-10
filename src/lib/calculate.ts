export interface YearData {
  year: number;
  contribYear: number;
  interestYear: number;
  totalContrib: number;
  totalInterest: number;
  balance: number;
}

export interface CalculationResult {
  balance: number;
  totalContributed: number;
  totalInterest: number;
  yearlyData: YearData[];
}

export function calculate(
  PV: number,
  PMT: number,
  annualRate: number,
  totalMonths: number,
  n: number
): CalculationResult {
  const i = annualRate / 100;
  const effectiveMonthlyRate = Math.pow(1 + i / n, n / 12) - 1;

  let balance = PV;
  let totalContributed = PV;
  const yearlyData: YearData[] = [];
  let yearContrib = 0;
  let yearInterest = 0;

  for (let m = 1; m <= totalMonths; m++) {
    balance += PMT;
    totalContributed += PMT;
    yearContrib += PMT;

    const interest = balance * effectiveMonthlyRate;
    balance += interest;
    yearInterest += interest;

    if (m % 12 === 0 || m === totalMonths) {
      yearlyData.push({
        year: Math.ceil(m / 12),
        contribYear: yearContrib,
        interestYear: yearInterest,
        totalContrib: totalContributed,
        totalInterest: balance - totalContributed,
        balance,
      });
      yearContrib = 0;
      yearInterest = 0;
    }
  }

  return {
    balance,
    totalContributed,
    totalInterest: balance - totalContributed,
    yearlyData,
  };
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatNumberShort(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}K`;
  }
  return value.toFixed(0);
}
