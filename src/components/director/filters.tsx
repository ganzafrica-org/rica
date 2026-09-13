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
};

type DirectorFiltersProps = {
  filterMode: DirectorUnitDashboard["filterMode"];
  className?: string;
  values?: Partial<DirectorFilterValues>;
  onChange?: (key: keyof DirectorFilterValues, value: string) => void;
  /** When product category is chosen in the sidebar (IIU). */
  hideProductCategory?: boolean;
  /** When product name is chosen in the sidebar (IIU). */
  hideProductName?: boolean;
  /** General Category page — commodities without a product checklist. */
  showGeneralCommodity?: boolean;
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
  hideProductCategory = false,
  hideProductName = false,
  showGeneralCommodity = false,
}: DirectorFiltersProps) {
  const current = { ...defaultDirectorFilterValues, ...values };
  const isIiu = filterMode === "iiu";
  const showIiuCategoryFilters =
    isIiu &&
    (!hideProductCategory ||
      showGeneralCommodity ||
      (!hideProductName && !showGeneralCommodity));
  const hasUnitFilters =
    filterMode === "categories" ||
    filterMode === "imu" ||
    showIiuCategoryFilters;

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
              label="Office name"
              options={directorFilterOptions.officeNames}
              selectedKey={current.officeName}
              onSelectionChange={(value) => onChange?.("officeName", value)}
            />
            <FilterSelect
              label="Inspection name"
              options={directorFilterOptions.inspectionNames}
              selectedKey={current.inspectionName}
              onSelectionChange={(value) => onChange?.("inspectionName", value)}
            />
          </>
        ) : (
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
          {filterMode === "imu" ? (
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
          {filterMode === "iiu" ? (
            <>
              {!hideProductCategory ? (
                <FilterSelect
                  label="Product category"
                  options={directorFilterOptions.iiuProductCategories}
                  selectedKey={current.productCategory}
                  onSelectionChange={(value) =>
                    onChange?.("productCategory", value)
                  }
                />
              ) : null}
              {showGeneralCommodity ? (
                <FilterSelect
                  label="General category"
                  options={directorFilterOptions.generalCommodities}
                  selectedKey={current.generalCommodity}
                  onSelectionChange={(value) =>
                    onChange?.("generalCommodity", value)
                  }
                />
              ) : null}
              {!hideProductName && !showGeneralCommodity ? (
                <FilterSelect
                  label="Product name"
                  options={directorFilterOptions.productNames}
                  selectedKey={current.productName}
                  onSelectionChange={(value) =>
                    onChange?.("productName", value)
                  }
                />
              ) : null}
            </>
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
