"use client";

import { useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { StatusChip } from "@/components/ui/status-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import { Button } from "@/components/ui";
import type {
  InspectorPendingSection,
  PendingInspectionRow,
} from "@/types/dashboard";

const PAGE_SIZE = 10;

type PendingInspectionsTableProps = {
  section: InspectorPendingSection;
};

export function PendingInspectionsTable({
  section,
}: PendingInspectionsTableProps) {
  const [page, setPage] = useState(0);
  const columns: DataTableColumn<PendingInspectionRow>[] = [
    { key: "name", header: section.nameHeader, isRowHeader: true },
    { key: "type", header: section.typeHeader },
    ...(section.extraHeader
      ? [{ key: "extra" as const, header: section.extraHeader }]
      : []),
    { key: "district", header: "District" },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusChip status={row.status} />,
    },
  ];

  const pageCount = Math.max(1, Math.ceil(section.rows.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = section.rows.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <SurfaceCard title={section.title}>
      <DataTable
        ariaLabel={section.title}
        columns={columns}
        rows={pageRows}
        getRowKey={(row) => row.id}
        emptyMessage="No pending records for this selection."
        showActions={false}
        rowNumberStart={safePage * PAGE_SIZE + 1}
      />
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="rica-caption">
          Page {safePage + 1} of {pageCount} · {section.rows.length} records
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            isDisabled={safePage === 0}
            onPress={() => setPage((value) => Math.max(0, value - 1))}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="secondary"
            isDisabled={safePage >= pageCount - 1}
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
