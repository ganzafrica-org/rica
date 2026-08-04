"use client";

import {
  Beaker,
  Building2,
  ClipboardCheck,
  Droplets,
} from "lucide-react";
import { SurfaceCard } from "@/components/ui/surface-card";
import { kpiCards } from "@/data/dashboard";
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

export function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpiCards.map((card) => {
        const tone = toneStyles[card.tone];
        const Icon = tone.icon;

        return (
          <SurfaceCard key={card.id} contentClassName="px-4 py-3">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center",
                  tone.wrap,
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-semibold tracking-tight text-foreground">
                  {card.value}
                </p>
                <p className="text-sm text-muted">{card.label}</p>
                <p className="rica-caption">{card.hint}</p>
              </div>
            </div>
          </SurfaceCard>
        );
      })}
    </div>
  );
}
