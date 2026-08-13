"use client";

import { useMemo, useState } from "react";
import {
  DirectorBarChart,
  DirectorDonutChart,
} from "@/components/director/charts";
import { DirectorTeamTable } from "@/components/director/team-table";
import { KpiCards } from "@/components/shared/kpi-cards";
import { PageTitle } from "@/components/layout/page-title";
import { ContentSwap, PageTransition } from "@/components/motion/page-transition";
import { cn } from "@/lib/utils";
import {
  directorDashboards,
  type TeamMemberRow,
} from "@/data/director/dashboard";
import { unitList } from "@/data/units";
import type { UnitKey } from "@/types";
import type { KpiCard } from "@/types/dashboard";

type InspectorRow = TeamMemberRow & {
  unit: UnitKey;
  unitLabel: string;
};

type UnitFilter = UnitKey | "all";

function buildRoster(): InspectorRow[] {
  return unitList.flatMap((unit) =>
    directorDashboards[unit.id].team.map((member) => ({
      ...member,
      unit: unit.id,
      unitLabel: unit.shortLabel,
    })),
  );
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

/** Org-wide inspector workload for Senior Director — filter by unit in-page. */
export function SeniorInspectorsView() {
  const roster = useMemo(() => buildRoster(), []);
  const [unitFilter, setUnitFilter] = useState<UnitFilter>("all");

  const filtered = useMemo(
    () =>
      unitFilter === "all"
        ? roster
        : roster.filter((row) => row.unit === unitFilter),
    [roster, unitFilter],
  );

  const kpis = useMemo((): KpiCard[] => {
    const assigned = filtered.reduce((sum, row) => sum + row.assigned, 0);
    const completed = filtered.reduce((sum, row) => sum + row.completed, 0);
    const pending = filtered.reduce((sum, row) => sum + row.pending, 0);
    const avgCompletion =
      filtered.length === 0
        ? 0
        : Math.round(
            filtered.reduce((sum, row) => sum + row.completionRate, 0) /
              filtered.length,
          );

    return [
      {
        id: "inspectors",
        label: "Inspectors",
        value: formatNumber(filtered.length),
        hint:
          unitFilter === "all"
            ? "Across all units"
            : unitList.find((unit) => unit.id === unitFilter)?.shortLabel ?? "",
        tone: "accent",
      },
      {
        id: "assigned",
        label: "Assigned",
        value: formatNumber(assigned),
        hint: "Total inspections assigned",
        tone: "seed",
      },
      {
        id: "completed",
        label: "Completed",
        value: formatNumber(completed),
        hint: `${assigned ? Math.round((completed / assigned) * 100) : 0}% of assigned`,
        tone: "slaughterhouse",
      },
      {
        id: "pending",
        label: "Pending",
        value: formatNumber(pending),
        hint: "Still in progress",
        tone: "agrochemical",
      },
      {
        id: "avg-completion",
        label: "Avg completion",
        value: `${avgCompletion}%`,
        hint: "Mean inspector completion rate",
        tone: "seed-producer",
      },
    ];
  }, [filtered, unitFilter]);

  const byUnitBars = useMemo(() => {
    return unitList.map((unit) => ({
      name: unit.id.toUpperCase(),
      value: roster
        .filter((row) => row.unit === unit.id)
        .reduce((sum, row) => sum + row.completed, 0),
    }));
  }, [roster]);

  const progressDonut = useMemo(() => {
    const completed = filtered.reduce((sum, row) => sum + row.completed, 0);
    const pending = filtered.reduce((sum, row) => sum + row.pending, 0);
    return [
      { name: "Completed", value: completed },
      { name: "Pending", value: pending },
    ];
  }, [filtered]);

  const tableRows: TeamMemberRow[] = filtered.map(
    ({ unit: _unit, unitLabel, ...member }) => ({
      ...member,
      name: unitFilter === "all" ? `${member.name} · ${unitLabel}` : member.name,
    }),
  );

  const filterOptions: { id: UnitFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...unitList.map((unit) => ({
      id: unit.id as UnitFilter,
      label: unit.shortLabel,
    })),
  ];

  return (
    <PageTransition className="space-y-6">
      <PageTitle title="Inspectors" />

      <div
        className="flex min-w-0 items-stretch gap-6 overflow-x-auto border border-border bg-surface px-5 shadow-sm"
        role="tablist"
        aria-label="Filter inspectors by unit"
      >
        {filterOptions.map((option) => {
          const isActive = option.id === unitFilter;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setUnitFilter(option.id)}
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

      <ContentSwap motionKey={unitFilter} className="space-y-6">
        <KpiCards cards={kpis} />

        <div className="grid gap-6 lg:grid-cols-2">
          <DirectorDonutChart
            title="Completed vs Pending"
            data={progressDonut}
          />
          <DirectorBarChart
            title="Completed inspections by unit"
            data={byUnitBars}
            colorOffset={1}
          />
        </div>

        <DirectorTeamTable rows={tableRows} officerLabel="Inspector" />
      </ContentSwap>
    </PageTransition>
  );
}
