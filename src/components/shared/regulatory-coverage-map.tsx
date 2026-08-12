"use client";

import { EntityMap } from "@/components/shared/entity-map";
import { Label, ListBox, Select } from "@/components/ui";
import { SurfaceCard } from "@/components/ui/surface-card";
import { districtsByProvince, provinceList } from "@/data/geo";
import type { ProvinceKey } from "@/types";
import type { GeoPoint } from "@/types/dashboard";

type RegulatoryCoverageMapProps = {
  points: readonly GeoPoint[];
  categories: readonly { id: string; label: string }[];
  category: string;
  onCategoryChange: (id: string) => void;
  province: ProvinceKey | "all";
  onProvinceChange: (province: ProvinceKey | "all") => void;
  district: string | "all";
  onDistrictChange: (district: string | "all") => void;
};

function FilterSelect({
  ariaLabel,
  value,
  options,
  onChange,
  width = "w-[168px]",
}: {
  ariaLabel: string;
  value: string;
  options: readonly { id: string; label: string }[];
  onChange: (id: string) => void;
  width?: string;
}) {
  return (
    <Select
      className={width}
      aria-label={ariaLabel}
      selectedKey={value}
      onSelectionChange={(key) => onChange(String(key))}
    >
      <Label className="sr-only">{ariaLabel}</Label>
      <Select.Trigger>
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

export function RegulatoryCoverageMap({
  points,
  categories,
  category,
  onCategoryChange,
  province,
  onProvinceChange,
  district,
  onDistrictChange,
}: RegulatoryCoverageMapProps) {
  const provinceOptions = [
    { id: "all", label: "All provinces" },
    ...provinceList.map((item) => ({ id: item.id, label: item.label })),
  ];

  // District options depend on the selected province.
  const districtSource =
    province === "all"
      ? provinceList.flatMap((item) => districtsByProvince[item.id])
      : districtsByProvince[province];

  const districtOptions = [
    { id: "all", label: "All districts" },
    ...districtSource.map((item) => ({ id: item.id, label: item.name })),
  ];

  const total = points.reduce((sum, point) => sum + point.value, 0);

  return (
    <SurfaceCard
      title="Distribution of Registered Entities"
      description={`${total.toLocaleString("en-US")} entities across ${points.length} district${points.length === 1 ? "" : "s"}`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <FilterSelect
            ariaLabel="Entity category"
            value={category}
            options={categories}
            onChange={onCategoryChange}
            width="w-[190px]"
          />
          <FilterSelect
            ariaLabel="Province"
            value={province}
            options={provinceOptions}
            onChange={(id) => {
              onProvinceChange(id as ProvinceKey | "all");
              // A district from the old province would filter to nothing.
              onDistrictChange("all");
            }}
          />
          <FilterSelect
            ariaLabel="District"
            value={district}
            options={districtOptions}
            onChange={onDistrictChange}
          />
        </div>
      }
    >
      <EntityMap points={points} />
      <p className="rica-caption mt-2">
        Circle area is proportional to the number of registered entities. Hover
        a district for its exact count.
      </p>
    </SurfaceCard>
  );
}
