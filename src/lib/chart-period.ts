import { rngFromString } from "@/lib/seeded-random";

export const chartPeriodOptions = [
  { id: "2021-2025", label: "2021-2025" },
  { id: "2024-2028", label: "2024-2028" },
  { id: "2020-2024", label: "2020-2024" },
] as const;

export type ChartPeriodId = (typeof chartPeriodOptions)[number]["id"];

export const defaultChartPeriod: ChartPeriodId = "2021-2025";

const periodFactors: Record<ChartPeriodId, number> = {
  "2021-2025": 1,
  "2024-2028": 1.16,
  "2020-2024": 0.84,
};

export function isChartPeriodId(value: string): value is ChartPeriodId {
  return chartPeriodOptions.some((option) => option.id === value);
}

function scaleNumber(value: number, period: ChartPeriodId, key: string): number {
  if (period === defaultChartPeriod) return value;
  const rng = rngFromString(`chart-period:${period}:${key}:${value}`);
  const next = Math.round(value * periodFactors[period] * (0.9 + rng() * 0.2));
  if (value <= 100) return Math.min(100, Math.max(0, next));
  return Math.max(0, next);
}

export function scaleNamedValues<T extends { name: string; value: number }>(
  rows: readonly T[],
  period: ChartPeriodId,
): T[] {
  return rows.map((row) => ({
    ...row,
    value: scaleNumber(row.value, period, row.name),
  }));
}

export function scaleStackedRows<T extends { name: string }>(
  rows: readonly T[],
  period: ChartPeriodId,
): T[] {
  return rows.map((row) => {
    const next: Record<string, string | number> = { name: row.name };
    for (const [key, value] of Object.entries(row)) {
      if (key === "name" || typeof value !== "number") {
        next[key] = value as string | number;
        continue;
      }
      next[key] = scaleNumber(value, period, `${row.name}:${key}`);
    }
    return next as T;
  });
}

export function scaleTrendPoints<
  T extends { value: number; previous?: number },
>(rows: readonly T[], period: ChartPeriodId): T[] {
  return rows.map((row, index) => ({
    ...row,
    value: scaleNumber(row.value, period, `value:${index}`),
    previous:
      row.previous == null
        ? row.previous
        : scaleNumber(row.previous, period, `previous:${index}`),
  }));
}
