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
  /** @deprecated Kept for callers; subtitles under chart titles are not shown. */
  yLabel?: string;
  caption?: string;
  className?: string;
  children: React.ReactNode;
};

/** Chart shell — title only (no subtitle under the title). */
export function ChartCard({
  title,
  caption,
  className,
  children,
}: ChartCardProps) {
  return (
    <SurfaceCard
      title={title}
      className={className}
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
