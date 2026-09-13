"use client";

import {
  Beaker,
  Building2,
  ClipboardCheck,
  Droplets,
  ShieldCheck,
} from "lucide-react";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";
import type { AccentKey } from "@/types";
import type { KpiCard } from "@/types/dashboard";

const toneStyles: Record<AccentKey, { icon: typeof Droplets; wrap: string }> = {
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
  accent: {
    icon: ShieldCheck,
    wrap: "bg-accent-soft text-accent",
  },
};

type KpiCardsProps = {
  cards: readonly KpiCard[];
  className?: string;
};

export function KpiCards({ cards, className }: KpiCardsProps) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
        cards.length === 3 && "xl:grid-cols-3",
        cards.length === 5 && "xl:grid-cols-5",
        className,
      )}
    >
      {cards.map((card) => {
        const tone = toneStyles[card.tone] ?? toneStyles.accent;
        const Icon = tone.icon;

        return (
          <SurfaceCard key={card.id} className="h-full" contentClassName="px-4 py-3">
            <div className="flex h-full flex-col gap-2">
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
                  <p className="text-sm font-medium text-foreground">
                    {card.label}
                  </p>
                  {card.hint ? (
                    <p className="mt-0.5 text-[11px] leading-snug text-muted/80">
                      {card.hint}
                    </p>
                  ) : null}
                </div>
              </div>
              {card.progress != null ? (
                <div
                  className="mt-auto h-1.5 w-full overflow-hidden rounded-full bg-default"
                  role="img"
                  aria-label={`${card.label} ${card.progress} percent`}
                >
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
              ) : null}
            </div>
          </SurfaceCard>
        );
      })}
    </div>
  );
}
