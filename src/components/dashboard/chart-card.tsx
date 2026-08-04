"use client";

import { Label, ListBox, Select } from "@/components/ui";
import { SurfaceCard } from "@/components/ui/surface-card";
import { chartPeriodOptions } from "@/data/dashboard";

type ChartCardProps = {
  title: string;
  yLabel?: string;
  caption?: string;
  children: React.ReactNode;
};

export function ChartCard({ title, yLabel, caption, children }: ChartCardProps) {
  return (
    <SurfaceCard
      title={title}
      description={yLabel}
      actions={
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
                <ListBox.Item
                  key={option.id}
                  id={option.id}
                  textValue={option.label}
                >
                  {option.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      }
    >
      <div className="space-y-1">
        {children}
        {caption ? (
          <p className="rica-caption text-right">{caption}</p>
        ) : null}
      </div>
    </SurfaceCard>
  );
}
