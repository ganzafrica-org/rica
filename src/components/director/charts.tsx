"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/shared/chart-card";
import { donutPalette } from "@/data/director/dashboard";
import type { NamedValue, StackedRow, TrendPoint } from "@/data/director/dashboard";

const tooltipStyle = {
  borderRadius: 8,
  border: "1px solid var(--border)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
};

export const chartColors = [
  "var(--stream-seed)",
  "var(--stream-slaughterhouse)",
  "var(--stream-agrochemical)",
  "var(--stream-seed-producer)",
  "var(--danger)",
  "var(--accent)",
] as const;

type LineChartCardProps = {
  title: string;
  description?: string;
  data: TrendPoint[];
  showPrevious?: boolean;
  valueLabel?: string;
  previousLabel?: string;
  color?: string;
  previousColor?: string;
};

export function DirectorLineChart({
  title,
  description,
  data,
  showPrevious = false,
  valueLabel = "Current",
  previousLabel = "Previous year",
  color = chartColors[0],
  previousColor = chartColors[1],
}: LineChartCardProps) {
  return (
    <ChartCard title={title} caption={description}>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              verticalAlign="bottom"
              height={28}
              iconType="circle"
              wrapperStyle={{ fontSize: 11, color: "var(--muted)" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              name={valueLabel}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2, fill: "#fff" }}
            />
            {showPrevious ? (
              <Line
                type="monotone"
                dataKey="previous"
                name={previousLabel}
                stroke={previousColor}
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, strokeWidth: 2, fill: "#fff" }}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

type BarChartCardProps = {
  title: string;
  description?: string;
  data: NamedValue[];
  /** Single fill for all bars. When omitted, each bar gets a different palette color. */
  color?: string;
  /** Offset into the shared palette so side-by-side charts don’t match. */
  colorOffset?: number;
};

export function DirectorBarChart({
  title,
  description,
  data,
  color,
  colorOffset = 0,
}: BarChartCardProps) {
  return (
    <ChartCard title={title} caption={description}>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={48}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={
                    color ??
                    chartColors[(index + colorOffset) % chartColors.length]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

type DonutChartCardProps = {
  title: string;
  description?: string;
  data: NamedValue[];
  colorOffset?: number;
};

export function DirectorDonutChart({
  title,
  description,
  data,
  colorOffset = 0,
}: DonutChartCardProps) {
  return (
    <ChartCard title={title} caption={description}>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={
                    donutPalette[(index + colorOffset) % donutPalette.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: 11, color: "var(--muted)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

type StackedBarCardProps = {
  title: string;
  description?: string;
  data: StackedRow[];
  series: readonly { key: string; label: string; color: string }[];
};

export function DirectorStackedBarChart({
  title,
  description,
  data,
  series,
}: StackedBarCardProps) {
  return (
    <ChartCard title={title} caption={description}>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              verticalAlign="bottom"
              height={28}
              wrapperStyle={{ fontSize: 11, color: "var(--muted)" }}
            />
            {series.map((item) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.label}
                stackId="a"
                fill={item.color}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

/** Side-by-side grouped bars (e.g. Approval vs Rejection by Service). */
export function DirectorGroupedBarChart({
  title,
  description,
  data,
  series,
}: StackedBarCardProps) {
  return (
    <ChartCard title={title} caption={description}>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
              interval={0}
              angle={-18}
              textAnchor="end"
              height={48}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              verticalAlign="bottom"
              height={28}
              wrapperStyle={{ fontSize: 11, color: "var(--muted)" }}
            />
            {series.map((item) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.label}
                fill={item.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
