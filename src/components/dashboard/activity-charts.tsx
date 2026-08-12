"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/dashboard/chart-card";
import { DonutChart } from "@/components/dashboard/donut-chart";
import type { ActivityChart } from "@/types/dashboard";

/**
 * Generic renderer for the unit/service-specific sections. Serves both
 * Inspection Activities and Sampling Activities — a new unit adds data, not
 * a new component.
 */
type ActivityChartsProps = {
  charts: readonly ActivityChart[];
  className?: string;
};

export function ActivityCharts({ charts }: ActivityChartsProps) {
  if (charts.length === 0) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {charts.map((chart) =>
        chart.kind === "donut" ? (
          <DonutChart
            key={chart.id}
            title={chart.title}
            caption={chart.caption}
            slices={chart.data.map((point) => ({
              name: point.name,
              value: point.value,
              color: point.color,
            }))}
            showPeriodSelect={false}
          />
        ) : (
          <ChartCard
            key={chart.id}
            title={chart.title}
            caption={chart.caption}
            showPeriodSelect={false}
          >
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[...chart.data]}
                  margin={{ top: 8, right: 12, left: 4, bottom: 4 }}
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
                    tick={{ fill: "var(--muted)", fontSize: 11 }}
                    interval={0}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted)", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--accent-soft)" }}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    name="Inspections"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  >
                    {chart.data.map((point) => (
                      <Cell key={point.name} fill={point.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        ),
      )}
    </div>
  );
}
