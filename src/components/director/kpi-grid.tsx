"use client";

import {
  Beaker,
  Building2,
  ClipboardCheck,
  Droplets,
} from "lucide-react";
import { Card } from "@/components/ui";
import type { KpiItem } from "@/data/director/dashboard";
import { cn } from "@/lib/utils";

const toneStyles = {
  seed: {
    icon: Droplets,
    wrap: "bg-stream-seed-soft text-stream-seed",
  },
  slaughterhouse: {
    icon: Building2,
    wrap: "bg-stream-slaughterhouse-soft text-stream-slaughterhouse",
  },
  agrochemical: {
    icon: Beaker,
    wrap: "bg-stream-agrochemical-soft text-stream-agrochemical",
  },
  "seed-producer": {
    icon: ClipboardCheck,
    wrap: "bg-stream-seed-producer-soft text-stream-seed-producer",
  },
} as const;

type DirectorKpiGridProps = {
  items: KpiItem[];
};

function cardSpanClass(count: number, index: number): string | undefined {
  // 7 → 4 up / 3 down (both rows fill)
  if (count === 7) return index < 4 ? "lg:col-span-3" : "lg:col-span-4";
  // 6 → 4 up / 2 down (both rows fill)
  if (count === 6) return index < 4 ? "lg:col-span-3" : "lg:col-span-6";
  return undefined;
}

/**
 * Compact KPI cards — max 5 per row.
 * 4 cards fill the row; 6 → 4+2; 7 → 4+3; 2–3 stay compact.
 * Labels wrap instead of truncating with ellipsis.
 */
export function DirectorKpiGrid({ items }: DirectorKpiGridProps) {
  const count = items.length;
  const useTwelveCol = count === 6 || count === 7;

  return (
    <div
      className={cn(
        "grid gap-3",
        useTwelveCol
          ? "grid-cols-2 lg:grid-cols-12"
          : count === 4
            ? "grid-cols-4"
            : count === 2
              ? "grid-cols-2"
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      )}
    >
      {items.map((card, index) => {
        const tone = toneStyles[card.tone ?? "seed"];
        const Icon = tone.icon;

        return (
          <Card
            key={card.id}
            className={cn(
              "border-border/70 bg-surface shadow-sm",
              cardSpanClass(count, index),
            )}
          >
            <Card.Content className="px-4 py-4">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center",
                    tone.wrap,
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-semibold tracking-tight text-foreground">
                    {card.value}
                  </p>
                  <p className="text-xs leading-snug text-muted">{card.label}</p>
                  {card.hint ? (
                    <p className="rica-caption">{card.hint}</p>
                  ) : null}
                </div>
              </div>
            </Card.Content>
          </Card>
        );
      })}
    </div>
  );
}
