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
import { ChartCard } from "@/components/shared/chart-card";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { ComplianceOutcome } from "@/types/dashboard";

type ComplianceSummaryProps = {
  averageScore: number;
  outcomes: readonly ComplianceOutcome[];
};

export function ComplianceSummary({
  averageScore,
  outcomes,
}: ComplianceSummaryProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
      <SurfaceCard title="Average Compliance Score">
        <div className="flex flex-col gap-3 py-2">
          <p className="text-4xl font-semibold tracking-tight text-foreground">
            {averageScore}
            <span className="text-xl text-muted">%</span>
          </p>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-default"
            role="img"
            aria-label={`Average compliance score ${averageScore} percent`}
          >
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${averageScore}%` }}
            />
          </div>
        </div>
      </SurfaceCard>

      <ChartCard title="Inspection Outcomes" showPeriodSelect={false}>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[...outcomes]}
              margin={{ top: 8, right: 12, left: 4, bottom: 4 }}
            >
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="outcome"
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
                cursor={{ fill: "var(--accent-soft)" }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                }}
              />
              <Bar dataKey="count" name="Inspections" radius={[4, 4, 0, 0]} maxBarSize={48}>
                {outcomes.map((outcome) => (
                  <Cell key={outcome.outcome} fill={outcome.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
