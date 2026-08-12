"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import type { TableRowAction } from "@/components/ui/table-row-actions";
import { SurfaceCard } from "@/components/ui/surface-card";
import { Button } from "@/components/ui";
import type { TeamMemberRow } from "@/data/director/dashboard";

const PAGE_SIZE = 10;

type DirectorTeamTableProps = {
  rows: TeamMemberRow[];
  officerLabel?: string;
};

export function DirectorTeamTable({
  rows,
  officerLabel = "Inspector",
}: DirectorTeamTableProps) {
  const [page, setPage] = useState(0);
  const [sortDesc, setSortDesc] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  function handleRowAction(action: TableRowAction, row: TeamMemberRow) {
    const labels = {
      view: "View details",
      update: "Update",
      delete: "Delete",
    } as const;
    setStatus(`${labels[action]} · ${row.name}`);
  }

  const columns: DataTableColumn<TeamMemberRow>[] = [
    { key: "name", header: officerLabel, isRowHeader: true },
    { key: "assigned", header: "Assigned" },
    { key: "completed", header: "Completed" },
    { key: "pending", header: "Pending" },
    {
      key: "completionRate",
      header: "Completion %",
      render: (row) => `${row.completionRate}%`,
    },
  ];

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) =>
      sortDesc
        ? b.completionRate - a.completionRate
        : a.completionRate - b.completionRate,
    );
  }, [rows, sortDesc]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageRows = sorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <SurfaceCard
      title={`${officerLabel} workload`}
      actions={
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            setSortDesc((value) => !value);
            setPage(0);
          }}
        >
          Sort by completion {sortDesc ? "↓" : "↑"}
        </Button>
      }
    >
      <DataTable
        ariaLabel="Team performance"
        columns={columns}
        rows={pageRows}
        getRowKey={(row) => row.name}
        showActions
        onRowAction={handleRowAction}
      />
      {status ? (
        <p className="rica-caption mt-2 text-accent" role="status">
          {status}
        </p>
      ) : null}
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="rica-caption">
          Page {page + 1} of {pageCount} · {rows.length} people
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            isDisabled={page === 0}
            onPress={() => setPage((value) => Math.max(0, value - 1))}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="secondary"
            isDisabled={page >= pageCount - 1}
            onPress={() =>
              setPage((value) => Math.min(pageCount - 1, value + 1))
            }
          >
            Next
          </Button>
        </div>
      </div>
    </SurfaceCard>
  );
}
