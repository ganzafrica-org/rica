"use client";

import Link from "next/link";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";
import type { UnitPerformanceRow } from "@/types/dashboard";

type UnitPerformanceTableProps = {
  rows: readonly UnitPerformanceRow[];
  className?: string;
};

export function UnitPerformanceTable({
  rows,
  className,
}: UnitPerformanceTableProps) {
  // Columns are built inside the component so this stays reusable.
  const columns: DataTableColumn<UnitPerformanceRow>[] = [
    {
      key: "unitLabel",
      header: "Unit",
      isRowHeader: true,
      render: (row) => (
        <Link
          href={row.href}
          className="font-medium text-foreground transition-colors hover:text-accent"
        >
          {row.unitLabel}
        </Link>
      ),
    },
    {
      key: "applications",
      header: "Applications",
      className: "tabular-nums",
      render: (row) => row.applications.toLocaleString("en-US"),
    },
    {
      key: "inspections",
      header: "Inspections",
      className: "tabular-nums",
      render: (row) => row.inspections.toLocaleString("en-US"),
    },
    {
      key: "approvalRate",
      header: "Approval Rate",
      className: "tabular-nums",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-medium",
              row.approvalRate >= 70 ? "text-stream-seed" : "text-foreground",
            )}
          >
            {row.approvalRate}%
          </span>
          <span className="h-1.5 w-16 overflow-hidden rounded-full bg-default">
            <span
              className="block h-full rounded-full bg-accent"
              style={{ width: `${row.approvalRate}%` }}
            />
          </span>
        </div>
      ),
    },
    {
      key: "turnaroundDays",
      header: "Avg Turnaround",
      className: "tabular-nums",
      render: (row) => `${row.turnaroundDays.toFixed(1)} days`,
    },
  ];

  return (
    <SurfaceCard
      title="Unit Performance"
      description="How RICA's units compare over the selected period"
      className={className}
    >
      <DataTable
        ariaLabel="Unit performance"
        columns={columns}
        rows={rows}
        getRowKey={(row) => row.unit}
        emptyMessage="No units match this selection."
        showActions={false}
      />
    </SurfaceCard>
  );
}
