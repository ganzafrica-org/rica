"use client";

import Link from "next/link";
import { ArrowUpRight, Award, TrendingDown, TrendingUp, Layers } from "lucide-react";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";
import type { AccentKey } from "@/types";
import type { HighlightCard } from "@/types/dashboard";

/** Local copy — KpiCards' equivalent map is module-private by design. */
const toneStyles: Record<AccentKey, { wrap: string; icon: typeof Award }> = {
  seed: { wrap: "bg-stream-seed-soft text-stream-seed", icon: TrendingUp },
  slaughterhouse: {
    wrap: "bg-stream-slaughterhouse-soft text-stream-slaughterhouse",
    icon: Layers,
  },
  agrochemical: {
    wrap: "bg-stream-agrochemical-soft text-stream-agrochemical",
    icon: TrendingDown,
  },
  "seed-producer": {
    wrap: "bg-stream-seed-producer-soft text-stream-seed-producer",
    icon: Award,
  },
  accent: { wrap: "bg-accent-soft text-accent", icon: Award },
};

type HighlightCardsProps = {
  cards: readonly HighlightCard[];
  className?: string;
};

export function HighlightCards({ cards, className }: HighlightCardsProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {cards.map((card) => {
        const tone = toneStyles[card.tone] ?? toneStyles.accent;
        const Icon = tone.icon;

        const body = (
          <SurfaceCard
            contentClassName="px-4 py-3"
            className={cn(
              "h-full transition-colors",
              card.href && "hover:border-accent/60",
            )}
          >
            <div className="flex h-full flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <p className="rica-caption uppercase tracking-wide">
                  {card.label}
                </p>
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center",
                    tone.wrap,
                  )}
                >
                  <Icon className="size-3.5" />
                </div>
              </div>

              {/* The winning unit is the answer, so it reads largest. */}
              <p className="text-base font-semibold leading-tight tracking-tight text-foreground">
                {card.headline}
              </p>

              <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                <span
                  className={cn(
                    "px-2 py-0.5 text-sm font-semibold tabular-nums",
                    tone.wrap,
                  )}
                >
                  {card.value}
                </span>
                {card.href ? (
                  <ArrowUpRight className="size-3.5 text-muted" />
                ) : null}
              </div>

              <p className="rica-caption">{card.hint}</p>
            </div>
          </SurfaceCard>
        );

        return card.href ? (
          <Link
            key={card.id}
            href={card.href}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {body}
          </Link>
        ) : (
          <div key={card.id}>{body}</div>
        );
      })}
    </div>
  );
}
