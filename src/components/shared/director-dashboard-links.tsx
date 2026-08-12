"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SurfaceCard } from "@/components/ui/surface-card";
import { unitDefinitions } from "@/data/units";
import type { UnitPerformanceRow } from "@/types/dashboard";

type DirectorDashboardLinksProps = {
  rows: readonly UnitPerformanceRow[];
};

/** The spec's "Director Dashboards" section — one tile per unit. */
export function DirectorDashboardLinks({ rows }: DirectorDashboardLinksProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((row) => (
        <Link
          key={row.unit}
          href={row.href}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <SurfaceCard
            contentClassName="px-4 py-3"
            className="h-full transition-colors hover:border-accent/60"
          >
            <div className="flex h-full flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  {row.unitLabel}
                </p>
                <ArrowUpRight className="size-4 shrink-0 text-muted" />
              </div>

              <p className="rica-caption">
                {unitDefinitions[row.unit].label}
              </p>

              <div className="mt-auto flex items-center gap-4 pt-2 text-sm">
                <span className="tabular-nums text-foreground">
                  {row.applications.toLocaleString("en-US")}
                  <span className="ml-1 text-[11px] text-muted">apps</span>
                </span>
                <span className="tabular-nums text-foreground">
                  {row.approvalRate}%
                  <span className="ml-1 text-[11px] text-muted">approved</span>
                </span>
              </div>
            </div>
          </SurfaceCard>
        </Link>
      ))}
    </div>
  );
}
