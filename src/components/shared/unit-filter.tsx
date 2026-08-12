"use client";

import { cn } from "@/lib/utils";
import type { UnitDefinition, UnitKey } from "@/types";

type UnitFilterProps = {
  units: readonly UnitDefinition[];
  value: UnitKey | "all";
  onChange: (value: UnitKey | "all") => void;
  className?: string;
};

/**
 * Mirrors ServiceFilter's pill pattern. Kept as its own component rather than
 * generalising ServiceFilter, whose ServiceKey typing is load-bearing on the
 * shipped inspector dashboard.
 */
export function UnitFilter({
  units,
  value,
  onChange,
  className,
}: UnitFilterProps) {
  if (units.length === 0) return null;

  const options: { id: UnitKey | "all"; label: string }[] = [
    { id: "all", label: "All units" },
    ...units.map((unit) => ({ id: unit.id, label: unit.shortLabel })),
  ];

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="group"
      aria-label="Filter by unit"
    >
      {options.map((option) => {
        const isActive = option.id === value;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={isActive}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isActive
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-surface text-muted hover:border-accent/50 hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
