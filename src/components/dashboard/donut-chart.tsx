"use client";

import {
  Cell,
  Label as RechartsLabel,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartCard } from "@/components/dashboard/chart-card";
import type { DonutSlice } from "@/types/dashboard";

type DonutChartProps = {
  title: string;
  slices: readonly DonutSlice[];
  yLabel?: string;
  caption?: string;
  centerLabel?: string;
  showPeriodSelect?: boolean;
};

export function DonutChart({
  title,
  slices,
  yLabel,
  caption,
  centerLabel,
  showPeriodSelect = true,
}: DonutChartProps) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <ChartCard
      title={title}
      yLabel={yLabel}
      caption={caption}
      showPeriodSelect={showPeriodSelect}
    >
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[...slices]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={2}
              stroke="none"
              isAnimationActive={false}
            >
              {slices.map((slice) => (
                <Cell key={slice.name} fill={slice.color} />
              ))}
              {/* Rendered inside the SVG so it tracks the donut hole exactly. */}
              <RechartsLabel
                position="center"
                content={({ viewBox }) => {
                  const box = viewBox as
                    | { cx?: number; cy?: number }
                    | undefined;
                  if (box?.cx == null || box?.cy == null) return null;

                  // Recharts requires a single SVG element here — a fragment
                  // is silently discarded, so both texts live inside one <g>.
                  return (
                    <g>
                      <text
                        x={box.cx}
                        y={centerLabel ? box.cy - 5 : box.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="var(--foreground)"
                        fontSize={20}
                        fontWeight={600}
                      >
                        {total}
                      </text>
                      {centerLabel ? (
                        <text
                          x={box.cx}
                          y={box.cy + 14}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="var(--muted)"
                          fontSize={11}
                        >
                          {centerLabel}
                        </text>
                      ) : null}
                    </g>
                  );
                }}
              />
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
