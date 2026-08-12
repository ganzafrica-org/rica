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
import { ChartCard } from "@/components/dashboard/chart-card";
import { cn } from "@/lib/utils";
import type { TrendGranularity, TrendPoint } from "@/types/dashboard";

const granularities: { id: TrendGranularity; label: string }[] = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

type InspectionTrendChartProps = {
  trend: Record<TrendGranularity, TrendPoint[]>;
};

export function InspectionTrendChart({ trend }: InspectionTrendChartProps) {
  const [granularity, setGranularity] = useState<TrendGranularity>("monthly");

  return (
    <ChartCard
      title="Inspection Trend"
      yLabel="Completed vs pending"
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
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trend[granularity]}
            margin={{ top: 8, right: 12, left: 4, bottom: 4 }}
          >
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
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
              height={28}
              iconType="circle"
              wrapperStyle={{ fontSize: 11, color: "var(--muted)" }}
            />
            <Line
              type="monotone"
              dataKey="completed"
              name="Completed"
              stroke="var(--stream-seed)"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="pending"
              name="Pending"
              stroke="var(--stream-seed-producer)"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
