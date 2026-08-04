"use client";

import { Table } from "@heroui/react";
import { cn } from "@/lib/utils";
import {
  TableRowActions,
  type TableRowAction,
} from "@/components/ui/table-row-actions";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  isRowHeader?: boolean;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  ariaLabel: string;
  columns: DataTableColumn<T>[];
  rows: readonly T[];
  getRowKey: (row: T) => string;
  className?: string;
  emptyMessage?: string;
  /** Show a leading # column. Defaults to true. */
  showRowNumbers?: boolean;
  /** Show trailing actions menu. Defaults to true. */
  showActions?: boolean;
  onRowAction?: (action: TableRowAction, row: T) => void;
};

/** Reusable table built on HeroUI Table. */
export function DataTable<T extends object>({
  ariaLabel,
  columns,
  rows,
  getRowKey,
  className,
  emptyMessage = "No records found.",
  showRowNumbers = true,
  showActions = true,
  onRowAction,
}: DataTableProps<T>) {
  const emptyExtraCells =
    (showRowNumbers ? 1 : 0) + (showActions ? 1 : 0) + Math.max(columns.length - 1, 0);

  return (
    <Table className={cn(className)} variant="secondary">
      <Table.ScrollContainer>
        <Table.Content aria-label={ariaLabel} className="min-w-full">
          <Table.Header>
            {showRowNumbers ? (
              <Table.Column className="w-12 text-muted">#</Table.Column>
            ) : null}
            {columns.map((column) => (
              <Table.Column
                key={column.key}
                isRowHeader={column.isRowHeader}
                className={column.className}
              >
                {column.header}
              </Table.Column>
            ))}
            {showActions ? (
              <Table.Column className="w-14 text-right">Actions</Table.Column>
            ) : null}
          </Table.Header>
          <Table.Body>
            {rows.length === 0 ? (
              <Table.Row>
                {showRowNumbers ? <Table.Cell /> : null}
                <Table.Cell>{emptyMessage}</Table.Cell>
                {Array.from({ length: emptyExtraCells }).map((_, index) => (
                  <Table.Cell key={`empty-${index}`} />
                ))}
              </Table.Row>
            ) : (
              rows.map((row, index) => (
                <Table.Row key={getRowKey(row)}>
                  {showRowNumbers ? (
                    <Table.Cell className="tabular-nums text-muted">
                      {index + 1}
                    </Table.Cell>
                  ) : null}
                  {columns.map((column) => {
                    const value =
                      column.render?.(row) ??
                      (row as Record<string, unknown>)[column.key];

                    return (
                      <Table.Cell
                        key={column.key}
                        className={cn(
                          column.isRowHeader && "font-medium",
                          column.className,
                        )}
                      >
                        {value as React.ReactNode}
                      </Table.Cell>
                    );
                  })}
                  {showActions ? (
                    <Table.Cell className="text-right">
                      <TableRowActions row={row} onAction={onRowAction} />
                    </Table.Cell>
                  ) : null}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
