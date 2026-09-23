"use client";

import { useState } from "react";
import { Label, ListBox, Select } from "@/components/ui";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  chartPeriodOptions,
  defaultChartPeriod,
  isChartPeriodId,
  type ChartPeriodId,
} from "@/lib/chart-period";

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
  children: React.ReactNode | ((period: ChartPeriodId) => React.ReactNode);
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
  const [period, setPeriod] = useState<ChartPeriodId>(defaultChartPeriod);

  const periodSelect = (
    <Select
      className="w-[132px]"
      selectedKey={period}
      aria-label="Chart period"
      onSelectionChange={(key) => {
        if (key == null) return;
        const next = String(key);
        if (isChartPeriodId(next)) setPeriod(next);
      }}
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
      <div className="flex min-h-0 flex-1 flex-col space-y-1">
        {typeof children === "function" ? children(period) : children}
        {caption ? <p className="rica-caption text-right">{caption}</p> : null}
      </div>
    </SurfaceCard>
  );
}
