"use client";

import { cn } from "@/lib/utils";
import type { ServiceDefinition, ServiceKey } from "@/types";

type ServiceFilterProps = {
  services: readonly ServiceDefinition[];
  value: ServiceKey | "all";
  onChange: (value: ServiceKey | "all") => void;
  className?: string;
  /** Optional muted label on the left of the tab bar. */
  label?: string;
};

/** Underline tab bar for service filters on Inspector pages. */
export function ServiceFilter({
  services,
  value,
  onChange,
  className,
  label,
}: ServiceFilterProps) {
  if (services.length === 0) return null;

  const options: { id: ServiceKey | "all"; label: string }[] = [
    { id: "all", label: "All" },
    ...services.map((service) => ({
      id: service.id,
      label: service.shortLabel,
    })),
  ];

  return (
    <div
      className={cn(
        "flex min-w-0 items-stretch gap-6 overflow-x-auto border border-border bg-surface px-5 shadow-sm",
        className,
      )}
      role="tablist"
      aria-label="Filter by service"
    >
      {label ? (
        <span className="flex shrink-0 items-center py-3.5 text-sm font-medium text-muted">
          {label}
        </span>
      ) : null}

      {options.map((option) => {
        const isActive = option.id === value;

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative shrink-0 py-3.5 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              isActive
                ? "text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-accent"
                : "text-foreground hover:text-accent",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
