"use client";

import { cn } from "@/lib/utils";
import type { ServiceDefinition, ServiceKey } from "@/types";

type ServiceFilterProps = {
  services: readonly ServiceDefinition[];
  value: ServiceKey | "all";
  onChange: (value: ServiceKey | "all") => void;
  className?: string;
};

/** Renders nothing for units that have no service split. */
export function ServiceFilter({
  services,
  value,
  onChange,
  className,
}: ServiceFilterProps) {
  if (services.length === 0) return null;

  const options: { id: ServiceKey | "all"; label: string }[] = [
    { id: "all", label: "All services" },
    ...services.map((service) => ({
      id: service.id,
      label: service.shortLabel,
    })),
  ];

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="group"
      aria-label="Filter by service"
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
