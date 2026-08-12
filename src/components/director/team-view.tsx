"use client";

import { useMemo } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageTransition } from "@/components/motion/page-transition";
import { PageTitle } from "@/components/layout/page-title";
import { DirectorFilters } from "@/components/director/filters";
import {
  applyDirectorFilters,
  useDirectorFilterState,
} from "@/components/director/apply-filters";
import { DirectorTeamTable } from "@/components/director/team-table";
import {
  chartColors,
  DirectorLineChart,
} from "@/components/director/charts";
import { directorDashboards } from "@/data/director/dashboard";

export function DirectorTeamView() {
  const { user } = useAuth();
  const unitKey = user?.unit ?? "fpu";
  const data = directorDashboards[unitKey];
  const officerLabel =
    unitKey === "rlu" ? "Licensing Officer" : "Inspector";
  const { filters, onFilterChange } = useDirectorFilterState();
  const filtered = useMemo(
    () => applyDirectorFilters(data, filters),
    [data, filters],
  );

  return (
    <PageTransition className="space-y-6">
      <PageTitle title="Team performance & workload" />
      <DirectorFilters
        filterMode={
          data.filterMode === "categories" ||
          data.filterMode === "imu" ||
          data.filterMode === "iiu"
            ? "basic"
            : data.filterMode
        }
        values={filters}
        onChange={onFilterChange}
      />

      <DirectorTeamTable rows={data.team} officerLabel={officerLabel} />

      <div className="grid gap-6 lg:grid-cols-2">
        <DirectorLineChart
          title="Unit Completion Trend"
          data={filtered.completionTrend}
          valueLabel="Completed"
          color={chartColors[0]}
        />
      </div>
    </PageTransition>
  );
}
