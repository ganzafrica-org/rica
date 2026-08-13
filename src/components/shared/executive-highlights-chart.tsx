"use client";

import Link from "next/link";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";
import type { HighlightCard, UnitPerformanceRow } from "@/types/dashboard";

type ExecutiveHighlightsChartProps = {
  cards: readonly HighlightCard[];
  rows: readonly UnitPerformanceRow[];
  className?: string;
};

function parseMetric(value: string): number {
  const cleaned = value.replace(/[,%]/g, "").trim();
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : 0;
}

function highlightPercent(
  card: HighlightCard,
  rows: readonly UnitPerformanceRow[],
): number {
  const totalApps = rows.reduce((sum, row) => sum + row.applications, 0);
  const totalInspections = rows.reduce((sum, row) => sum + row.inspections, 0);
  const metric = parseMetric(card.value);

  if (card.value.includes("%")) {
    return Math.min(100, Math.max(0, Math.round(metric)));
  }

  if (card.id === "busiest-unit" && totalInspections > 0) {
    return Math.min(100, Math.round((metric / totalInspections) * 100));
  }

  if (totalApps > 0) {
    return Math.min(100, Math.round((metric / totalApps) * 100));
  }

  return 0;
}

/** Compact Executive Highlights — stretches to match a paired chart card. */
export function ExecutiveHighlightsChart({
  cards,
  rows,
  className,
}: ExecutiveHighlightsChartProps) {
  return (
    <SurfaceCard
      title="Executive Highlights"
      className={cn("h-full", className)}
      headerClassName="py-2.5"
      contentClassName="pb-2.5"
    >
      <ul className="flex min-h-40 flex-1 flex-col justify-between gap-2">
        {cards.map((card) => {
          const percent = highlightPercent(card, rows);
          const body = (
            <div className="space-y-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-[13px] font-medium text-foreground">
                  {card.label}
                </p>
                <p className="shrink-0 text-[13px] font-semibold tabular-nums text-foreground">
                  {card.value}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-default">
                  <div
                    className="h-full rounded-full bg-accent transition-[width]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-[11px] font-medium tabular-nums text-muted">
                  {percent}%
                </span>
              </div>
              <p className="truncate text-[11px] leading-tight text-muted">
                <span className="font-medium text-foreground">
                  {card.headline}
                </span>
                {card.hint ? ` · ${card.hint}` : null}
              </p>
            </div>
          );

          return (
            <li key={card.id}>
              {card.href ? (
                <Link
                  href={card.href}
                  className={cn(
                    "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  )}
                >
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>
    </SurfaceCard>
  );
}
