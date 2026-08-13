"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/shared/chart-card";
import { cn } from "@/lib/utils";
import type { ExecutiveTrendPoint, TrendGranularity } from "@/types/dashboard";

const granularities: { id: TrendGranularity; label: string }[] = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

type ExecutiveTrendChartProps = {
  trend: Record<TrendGranularity, ExecutiveTrendPoint[]>;
  title?: string;
  yLabel?: string;
  className?: string;
};

export function ExecutiveTrendChart({
  trend,
  title = "Organizational Trend",
  yLabel,
  className,
}: ExecutiveTrendChartProps) {
  const [granularity, setGranularity] = useState<TrendGranularity>("monthly");

  return (
    <ChartCard
      title={title}
      yLabel={yLabel}
      className={className}
      actions={
        <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-border bg-default/40 p-0.5">
          {granularities.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setGranularity(option.id)}
              aria-pressed={granularity === option.id}
              className={cn(
                "whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                granularity === option.id
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="min-h-40 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trend[granularity]}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
            />
            <YAxis
              width={36}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid var(--border)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={22}
              iconType="circle"
              wrapperStyle={{ fontSize: 11, color: "var(--muted)" }}
            />
            <Line
              type="monotone"
              dataKey="received"
              name="Received"
              stroke="var(--stream-slaughterhouse)"
              strokeWidth={2}
              dot={{ r: 2, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="approved"
              name="Approved"
              stroke="var(--stream-seed)"
              strokeWidth={2}
              dot={{ r: 2, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
