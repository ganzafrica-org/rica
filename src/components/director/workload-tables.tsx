"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { StatusChip, type StatusKey } from "@/components/ui/status-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/motion/page-transition";
import { PageTitle } from "@/components/layout/page-title";
import {
  imuAssignedListLabels,
  imuIndustryAssignments,
  imuMarketAssignments,
  imuServiceAssignments,
  type ImuBusinessCategoryId,
  type ImuIndustryAssignment,
  type ImuMarketAssignment,
  type ImuServiceAssignment,
} from "@/data/imu";
import { iiuConsignments, type IiuConsignmentRow } from "@/data/iiu";

const PAGE_SIZE = 8;

type StatusFilter = "all" | StatusKey;

function StatusTabs({
  value,
  options,
  onChange,
}: {
  value: StatusFilter;
  options: { id: StatusFilter; label: string }[];
  onChange: (value: StatusFilter) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-[12px] font-medium transition-colors",
            value === option.id
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-surface text-muted hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function PagedTable<T extends object>({
  columns,
  rows,
  ariaLabel,
}: {
  columns: DataTableColumn<T>[];
  rows: readonly T[];
  ariaLabel: string;
}) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = rows.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <SurfaceCard>
      <DataTable
        ariaLabel={ariaLabel}
        columns={columns}
        rows={pageRows}
        getRowKey={(row) => String((row as { id: string }).id)}
        emptyMessage="No records for this selection."
        rowNumberStart={safePage * PAGE_SIZE + 1}
      />
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="rica-caption">
          Page {safePage + 1} of {pageCount} · {rows.length} records
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

function IndustryTable() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const rows = useMemo(
    () =>
      imuIndustryAssignments.filter(
        (row) => status === "all" || row.status === status,
      ),
    [status],
  );
  const columns: DataTableColumn<ImuIndustryAssignment>[] = [
    { key: "name", header: "Industry/company name", isRowHeader: true },
    { key: "products", header: "Manufactured products" },
    { key: "size", header: "Business size" },
    { key: "location", header: "Location" },
    { key: "tin", header: "TIN" },
    { key: "inspector", header: "Inspector" },
    { key: "assignedOn", header: "Assigned on" },
    { key: "outcome", header: "Inspection outcome" },
    {
      key: "status",
      header: "Activity status",
      render: (row) => <StatusChip status={row.status} />,
    },
  ];

  return (
    <div className="space-y-3">
      <StatusTabs
        value={status}
        onChange={setStatus}
        options={[
          { id: "all", label: `All assigned (${imuIndustryAssignments.length})` },
          {
            id: "completed",
            label: `Completed (${imuIndustryAssignments.filter((row) => row.status === "completed").length})`,
          },
          {
            id: "pending-inspection",
            label: `Pending (${imuIndustryAssignments.filter((row) => row.status === "pending-inspection").length})`,
          },
          {
            id: "incomplete",
            label: `Incomplete (${imuIndustryAssignments.filter((row) => row.status === "incomplete").length})`,
          },
        ]}
      />
      <PagedTable
        key={status}
        columns={columns}
        rows={rows}
        ariaLabel="Assigned industries and SMEs"
      />
    </div>
  );
}

function MarketTable() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const rows = useMemo(
    () =>
      imuMarketAssignments.filter(
        (row) => status === "all" || row.status === status,
      ),
    [status],
  );
  const columns: DataTableColumn<ImuMarketAssignment>[] = [
    { key: "tradingCenter", header: "Trading center", isRowHeader: true },
    { key: "location", header: "Location" },
    { key: "outlets", header: "Outlets inspected" },
    { key: "nonCompliant", header: "Non-compliant outlets" },
    { key: "inspector", header: "Inspector" },
    { key: "assignedOn", header: "Assigned on" },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusChip status={row.status} />,
    },
  ];

  return (
    <div className="space-y-3">
      <StatusTabs
        value={status}
        onChange={setStatus}
        options={[
          { id: "all", label: `All assigned (${imuMarketAssignments.length})` },
          {
            id: "completed",
            label: `Completed (${imuMarketAssignments.filter((row) => row.status === "completed").length})`,
          },
          {
            id: "pending",
            label: `Pending (${imuMarketAssignments.filter((row) => row.status === "pending").length})`,
          },
        ]}
      />
      <PagedTable
        key={status}
        columns={columns}
        rows={rows}
        ariaLabel="Assigned trading centers"
      />
    </div>
  );
}

function ServiceTable() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const rows = useMemo(
    () =>
      imuServiceAssignments.filter(
        (row) => status === "all" || row.status === status,
      ),
    [status],
  );
  const columns: DataTableColumn<ImuServiceAssignment>[] = [
    { key: "name", header: "Company name", isRowHeader: true },
    { key: "service", header: "Service provided" },
    { key: "location", header: "Location" },
    { key: "tin", header: "TIN" },
    { key: "inspector", header: "Inspector" },
    { key: "assignedOn", header: "Assigned on" },
    { key: "outcome", header: "Inspection outcome" },
    {
      key: "status",
      header: "Activity status",
      render: (row) => <StatusChip status={row.status} />,
    },
  ];

  return (
    <div className="space-y-3">
      <StatusTabs
        value={status}
        onChange={setStatus}
        options={[
          { id: "all", label: `All assigned (${imuServiceAssignments.length})` },
          {
            id: "completed",
            label: `Completed (${imuServiceAssignments.filter((row) => row.status === "completed").length})`,
          },
          {
            id: "pending-inspection",
            label: `Pending (${imuServiceAssignments.filter((row) => row.status === "pending-inspection").length})`,
          },
          {
            id: "incomplete",
            label: `Incomplete (${imuServiceAssignments.filter((row) => row.status === "incomplete").length})`,
          },
        ]}
      />
      <PagedTable
        key={status}
        columns={columns}
        rows={rows}
        ariaLabel="Assigned service provision companies"
      />
    </div>
  );
}

function ImportTable() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const rows = useMemo(
    () =>
      iiuConsignments.filter((row) => status === "all" || row.status === status),
    [status],
  );
  const columns: DataTableColumn<IiuConsignmentRow>[] = [
    { key: "office", header: "Entry office code", isRowHeader: true },
    { key: "product", header: "Product" },
    { key: "hsCode", header: "HS code" },
    { key: "tin", header: "TIN number" },
    { key: "origin", header: "Country of origin" },
    { key: "decision", header: "Inspection decision" },
    { key: "inspector", header: "Inspector" },
    { key: "assignedOn", header: "Assigned on" },
    {
      key: "status",
      header: "Inspection status",
      render: (row) => <StatusChip status={row.status} />,
    },
  ];

  return (
    <div className="space-y-3">
      <StatusTabs
        value={status}
        onChange={setStatus}
        options={[
          { id: "all", label: `All assigned (${iiuConsignments.length})` },
          {
            id: "completed",
            label: `Completed (${iiuConsignments.filter((row) => row.status === "completed").length})`,
          },
          {
            id: "pending",
            label: `Pending (${iiuConsignments.filter((row) => row.status === "pending").length})`,
          },
          {
            id: "ongoing",
            label: `Ongoing (${iiuConsignments.filter((row) => row.status === "ongoing").length})`,
          },
          {
            id: "not-started",
            label: `Not started (${iiuConsignments.filter((row) => row.status === "not-started").length})`,
          },
        ]}
      />
      <PagedTable
        key={status}
        columns={columns}
        rows={rows}
        ariaLabel="Assigned import consignments"
      />
    </div>
  );
}

type DirectorWorkloadTablesProps = {
  unit: "imu" | "iiu";
  imuCategory?: ImuBusinessCategoryId;
};

export function DirectorWorkloadTables({
  unit,
  imuCategory,
}: DirectorWorkloadTablesProps) {
  if (unit === "iiu") return <ImportTable />;
  if (imuCategory === "industries") return <IndustryTable />;
  if (imuCategory === "market") return <MarketTable />;
  if (imuCategory === "service") return <ServiceTable />;
  return null;
}

export function DirectorAssignmentList({
  imuCategory,
}: {
  imuCategory: ImuBusinessCategoryId;
}) {
  return (
    <PageTransition className="space-y-6">
      <PageTitle title={imuAssignedListLabels[imuCategory]} />
      <DirectorWorkloadTables unit="imu" imuCategory={imuCategory} />
    </PageTransition>
  );
}
