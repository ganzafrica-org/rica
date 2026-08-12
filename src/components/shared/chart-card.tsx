"use client";

import { Label, ListBox, Select } from "@/components/ui";
import { SurfaceCard } from "@/components/ui/surface-card";

const chartPeriodOptions = [
  { id: "2021-2025", label: "2021-2025" },
  { id: "2024-2028", label: "2024-2028" },
  { id: "2020-2024", label: "2020-2024" },
] as const;

type ChartCardProps = {
  title: string;
  /** Subtitle under the chart title. */
  yLabel?: string;
  caption?: string;
  className?: string;
  /** Replaces the default period picker — e.g. a granularity toggle. */
  actions?: React.ReactNode;
  /** Set false for charts whose x-axis is not a reporting period. */
  showPeriodSelect?: boolean;
  children: React.ReactNode;
};

export function ChartCard({
  title,
  yLabel,
  caption,
  className,
  actions,
  showPeriodSelect = true,
  children,
}: ChartCardProps) {
  const periodSelect = (
    <Select
      className="w-[132px]"
      defaultSelectedKey="2021-2025"
      aria-label="Chart period"
    >
      <Label className="sr-only">Period</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {chartPeriodOptions.map((option) => (
            <ListBox.Item key={option.id} id={option.id} textValue={option.label}>
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );

  return (
    <SurfaceCard
      title={title}
      description={yLabel}
      className={className}
      actions={actions ?? (showPeriodSelect ? periodSelect : null)}
    >
      <div className="space-y-1">
        {children}
        {caption ? <p className="rica-caption text-right">{caption}</p> : null}
      </div>
    </SurfaceCard>
  );
}
