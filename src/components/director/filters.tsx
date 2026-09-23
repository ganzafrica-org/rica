"use client";

import { useMemo } from "react";
import { FilterDateRange, Label, ListBox, Select } from "@/components/ui";
import { directorFilterOptions } from "@/data/director/dashboard";
import type { DirectorUnitDashboard } from "@/data/director/dashboard";
import {
  districtFilterOptions,
  provinceFilterOptions,
  type ProvinceKey,
} from "@/data/rwanda/provinces";
import { cn } from "@/lib/utils";

export type DirectorFilterValues = {
  stream: string;
  category: string;
  province: string;
  district: string;
  businessCategory: string;
  outletType: string;
  productCategory: string;
  productName: string;
  generalCommodity: string;
  officeName: string;
  inspectionName: string;
  country: string;
  hsCode: string;
  tinNumber: string;
  imuServiceCategory: string;
};

export const defaultDirectorFilterValues: DirectorFilterValues = {
  stream: "all",
  category: "all",
  province: "all",
  district: "all",
  businessCategory: "all",
  outletType: "all",
  productCategory: "all",
  productName: "all",
  generalCommodity: "all",
  officeName: "all",
  inspectionName: "all",
  country: "all",
  hsCode: "all",
  tinNumber: "all",
  imuServiceCategory: "all",
};

type DirectorFiltersProps = {
  filterMode: DirectorUnitDashboard["filterMode"];
  className?: string;
  values?: Partial<DirectorFilterValues>;
  onChange?: (key: keyof DirectorFilterValues, value: string) => void;
  /** General Category page — commodities without a product checklist. */
  showGeneralCommodity?: boolean;
  /** IMU business-category pages. */
  imuScope?: "industries" | "market" | "service";
};

function FilterSelect({
  label,
  options,
  selectedKey,
  onSelectionChange,
  className,
}: {
  label: string;
  options: readonly { id: string; label: string }[];
  selectedKey: string;
  onSelectionChange?: (key: string) => void;
  className?: string;
}) {
  return (
    <Select
      className={cn("min-w-0 flex-1", className)}
      selectedKey={selectedKey}
      aria-label={label}
      onSelectionChange={(key) => {
        if (key == null) return;
        onSelectionChange?.(String(key));
      }}
    >
      <Label className="sr-only">{label}</Label>
      <Select.Trigger className="w-full whitespace-nowrap text-sm">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item key={option.id} id={option.id} textValue={option.label}>
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

function FilterBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "page-title flex min-w-0 flex-1 items-center gap-2 border border-border bg-surface px-4 py-4 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Two title-sized filter bars side by side on one row. */
export function DirectorFilters({
  filterMode,
  className,
  values,
  onChange,
  showGeneralCommodity = false,
  imuScope,
}: DirectorFiltersProps) {
  const current = { ...defaultDirectorFilterValues, ...values };
  const isIiu = filterMode === "iiu";
  const isImuScope = Boolean(imuScope);
  const hasUnitFilters =
    filterMode === "categories" ||
    (filterMode === "imu" && !isImuScope) ||
    isImuScope ||
    (isIiu && showGeneralCommodity);

  const provinces = useMemo(() => provinceFilterOptions(), []);
  const districts = useMemo(
    () =>
      districtFilterOptions(
        current.province === "all"
          ? "all"
          : (current.province as ProvinceKey),
      ),
    [current.province],
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-3 lg:flex-row lg:items-stretch",
        className,
      )}
    >
      <FilterBar>
        {isIiu ? (
          <>
            <FilterSelect
              label="Entry office code"
              options={directorFilterOptions.officeNames}
              selectedKey={current.officeName}
              onSelectionChange={(value) => onChange?.("officeName", value)}
            />
            <FilterSelect
              label="Inspection decisions"
              options={directorFilterOptions.inspectionNames}
              selectedKey={current.inspectionName}
              onSelectionChange={(value) => onChange?.("inspectionName", value)}
            />
          </>
        ) : imuScope === "market" ? null : (
          <>
            {filterMode === "streams" ? (
              <FilterSelect
                label="Regulatory stream"
                options={directorFilterOptions.streams}
                selectedKey={current.stream}
                onSelectionChange={(value) => onChange?.("stream", value)}
              />
            ) : null}
            <FilterSelect
              label="Province"
              options={provinces}
              selectedKey={current.province}
              onSelectionChange={(value) => {
                onChange?.("province", value);
                onChange?.("district", "all");
              }}
            />
            <FilterSelect
              label="District"
              options={districts}
              selectedKey={current.district}
              onSelectionChange={(value) => onChange?.("district", value)}
            />
          </>
        )}
        <FilterDateRange label="Date range" />
      </FilterBar>

      {isIiu ? (
        <FilterBar>
          <FilterSelect
            label="HS code"
            options={directorFilterOptions.hsCodes}
            selectedKey={current.hsCode}
            onSelectionChange={(value) => onChange?.("hsCode", value)}
          />
          <FilterSelect
            label="TIN number"
            options={directorFilterOptions.tinNumbers}
            selectedKey={current.tinNumber}
            onSelectionChange={(value) => onChange?.("tinNumber", value)}
          />
          <FilterSelect
            label="Country of origin"
            options={directorFilterOptions.countries}
            selectedKey={current.country}
            onSelectionChange={(value) => onChange?.("country", value)}
          />
        </FilterBar>
      ) : null}

      {hasUnitFilters ? (
        <FilterBar>
          {filterMode === "categories" ? (
            <FilterSelect
              label="Category"
              options={directorFilterOptions.categories}
              selectedKey={current.category}
              onSelectionChange={(value) => onChange?.("category", value)}
            />
          ) : null}
          {filterMode === "imu" && !imuScope ? (
            <>
              <FilterSelect
                label="Business category"
                options={directorFilterOptions.businessCategories}
                selectedKey={current.businessCategory}
                onSelectionChange={(value) =>
                  onChange?.("businessCategory", value)
                }
              />
              <FilterSelect
                label="Business outlet type"
                options={directorFilterOptions.outletTypes}
                selectedKey={current.outletType}
                onSelectionChange={(value) => onChange?.("outletType", value)}
              />
              <FilterSelect
                label="Product category"
                options={directorFilterOptions.productCategories}
                selectedKey={current.productCategory}
                onSelectionChange={(value) =>
                  onChange?.("productCategory", value)
                }
              />
            </>
          ) : null}
          {isIiu && showGeneralCommodity ? (
            <FilterSelect
              label="General category"
              options={directorFilterOptions.generalCommodities}
              selectedKey={current.generalCommodity}
              onSelectionChange={(value) =>
                onChange?.("generalCommodity", value)
              }
            />
          ) : null}
          {imuScope === "service" ? (
            <FilterSelect
              label="Service category"
              options={directorFilterOptions.imuServiceCategories}
              selectedKey={current.imuServiceCategory}
              onSelectionChange={(value) =>
                onChange?.("imuServiceCategory", value)
              }
            />
          ) : null}
          {imuScope === "industries" || imuScope === "market" ? (
            <FilterSelect
              label="Product"
              options={directorFilterOptions.imuProducts}
              selectedKey={current.productCategory}
              onSelectionChange={(value) =>
                onChange?.("productCategory", value)
              }
            />
          ) : null}
          {imuScope ? (
            <FilterSelect
              label="TIN number"
              options={directorFilterOptions.imuTinNumbers}
              selectedKey={current.tinNumber}
              onSelectionChange={(value) => onChange?.("tinNumber", value)}
            />
          ) : null}
        </FilterBar>
      ) : null}
    </div>
  );
}

/** Match FPU stream filter to section ids (seed, slaughterhouse-*, …). */
export function sectionMatchesStream(sectionId: string, stream: string) {
  if (stream === "all") return true;
  return sectionId === stream || sectionId.startsWith(`${stream}-`);
}
