"use client";

import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { StatusChip } from "@/components/ui/status-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { AssignedFacility } from "@/types/dashboard";

export type AssignedTableColumns = {
  name: string;
  classification: string;
  district: string;
  status: string;
};

const defaultColumns: AssignedTableColumns = {
  name: "Facility Name",
  classification: "Facility Classification",
  district: "District",
  status: "Registration Status",
};

type AssignedFacilitiesTableProps = {
  facilities: readonly AssignedFacility[];
  title?: string;
  description?: string;
  columnLabels?: AssignedTableColumns;
  emptyMessage?: string;
  ariaLabel?: string;
};

export function AssignedFacilitiesTable({
  facilities,
  title = "Assigned Facilities",
  description,
  columnLabels = defaultColumns,
  emptyMessage = "No facilities assigned for this selection.",
  ariaLabel = "Assigned facilities",
}: AssignedFacilitiesTableProps) {
  const columns: DataTableColumn<AssignedFacility>[] = [
    { key: "name", header: columnLabels.name, isRowHeader: true },
    { key: "classification", header: columnLabels.classification },
    { key: "district", header: columnLabels.district },
    {
      key: "registrationStatus",
      header: columnLabels.status,
      render: (row) => <StatusChip status={row.registrationStatus} />,
    },
  ];

  return (
    <SurfaceCard title={title} description={description}>
      <DataTable
        ariaLabel={ariaLabel}
        columns={columns}
        rows={facilities}
        getRowKey={(row) => row.id}
        emptyMessage={emptyMessage}
        showActions={false}
      />
    </SurfaceCard>
  );
}
