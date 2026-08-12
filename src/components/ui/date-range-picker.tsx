"use client";

import { useEffect, useRef, useState } from "react";
import { RangeCalendar } from "@heroui/react";
import type { DateValue } from "@internationalized/date";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type DateRange = {
  start: DateValue;
  end: DateValue;
};

type FilterDateRangeProps = {
  className?: string;
  label?: string;
};

/** Calendar icon — click to open the date-range calendar. */
export function FilterDateRange({
  className,
  label = "Date range",
}: FilterDateRangeProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<DateRange | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative shrink-0", className)}>
      <Button
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="dialog"
        isIconOnly
        size="sm"
        variant="secondary"
        className={cn(
          "size-10 border border-border bg-surface text-muted",
          open && "border-accent text-accent",
          value && "border-accent text-accent",
        )}
        onPress={() => setOpen((current) => !current)}
      >
        <CalendarDays className="size-5" strokeWidth={1.75} />
      </Button>

      {open ? (
        <div
          role="dialog"
          aria-label={label}
          className="absolute right-0 top-full z-50 mt-2 border border-border bg-surface p-3 shadow-lg"
        >
          <RangeCalendar
            aria-label={label}
            value={value}
            onChange={(next) => {
              setValue(next);
              if (next?.start && next?.end) setOpen(false);
            }}
          >
            <RangeCalendar.Header>
              <RangeCalendar.YearPickerTrigger>
                <RangeCalendar.YearPickerTriggerHeading />
                <RangeCalendar.YearPickerTriggerIndicator />
              </RangeCalendar.YearPickerTrigger>
              <RangeCalendar.NavButton slot="previous" />
              <RangeCalendar.NavButton slot="next" />
            </RangeCalendar.Header>
            <RangeCalendar.Grid>
              <RangeCalendar.GridHeader>
                {(day) => (
                  <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>
                )}
              </RangeCalendar.GridHeader>
              <RangeCalendar.GridBody>
                {(date) => <RangeCalendar.Cell date={date} />}
              </RangeCalendar.GridBody>
            </RangeCalendar.Grid>
            <RangeCalendar.YearPickerGrid>
              <RangeCalendar.YearPickerGridBody>
                {({ year }) => <RangeCalendar.YearPickerCell year={year} />}
              </RangeCalendar.YearPickerGridBody>
            </RangeCalendar.YearPickerGrid>
          </RangeCalendar>
        </div>
      ) : null}
    </div>
  );
}
