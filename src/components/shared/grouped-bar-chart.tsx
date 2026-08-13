"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/shared/chart-card";
import type { ComplianceByServicePoint } from "@/types/dashboard";

const unitCodeLabels: Record<string, string> = {
  FPU: "Farm Products",
  RLU: "Registration & Licensing",
  IMU: "Market Surveillance",
  IIU: "Import Inspection",
  CCPU: "Competition & Consumer",
};

type GroupedBarChartProps = {
  title: string;
  data: readonly ComplianceByServicePoint[];
  yLabel?: string;
  caption?: string;
};

/**
 * Approval vs rejection, grouped by service or unit. Kept separate from
 * ActivityCharts, whose single-series data shape can't express two bars per
 * category without breaking the x-axis.
 */
export function GroupedBarChart({
  title,
  data,
  yLabel,
  caption,
}: GroupedBarChartProps) {
  return (
    <ChartCard
      title={title}
      yLabel={yLabel}
      caption={caption}
      showPeriodSelect={false}
    >
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[...data]}
            margin={{ top: 8, right: 12, left: 4, bottom: 28 }}
          >
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-28}
              textAnchor="end"
              height={56}
              tick={{ fill: "var(--foreground)", fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              width={36}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
            />
            <Tooltip
              cursor={{ fill: "var(--accent-soft)" }}
              labelFormatter={(label) =>
                unitCodeLabels[String(label)] ?? String(label)
              }
              contentStyle={{
                borderRadius: 8,
                border: "1px solid var(--border)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={24}
              iconType="circle"
              wrapperStyle={{ fontSize: 11, color: "var(--muted)" }}
            />
            <Bar
              dataKey="approved"
              name="Approved"
              fill="var(--stream-seed)"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="rejected"
              name="Rejected"
              fill="var(--stream-agrochemical)"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
