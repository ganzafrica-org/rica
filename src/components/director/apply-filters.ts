"use client";

import { useCallback, useState } from "react";
import {
  defaultDirectorFilterValues,
  type DirectorFilterValues,
} from "@/components/director/filters";
import type {
  DirectorUnitDashboard,
  KpiItem,
  NamedValue,
  StackedRow,
} from "@/data/director/dashboard";

const categoryAliases: Record<string, string[]> = {
  "seed-producers": ["seed producers", "seed producer"],
  agrochemical: ["agrochemical", "agrochemical dealers"],
  butcheries: ["butcheries", "butchery"],
  "meat-carriers": ["meat carriers", "meat carrier"],
  electronics: ["electronics", "used electronics", "used electronics traders"],
};

const streamAliases: Record<string, string[]> = {
  livestock: ["livestock"],
  "plant-warehouse": ["plant and warehouse", "plant"],
  seed: ["seed"],
  agrochemical: ["agrochemical"],
};

const businessCategoryAliases: Record<string, string[]> = {
  retail: ["retail"],
  wholesale: ["wholesale"],
  manufacturing: ["manufacturing"],
  hospitality: ["hospitality"],
};

const productCategoryAliases: Record<string, string[]> = {
  food: ["food"],
  cosmetics: ["cosmetics"],
  chemicals: ["chemicals"],
  electronics: ["electronics"],
  general: ["general", "other"],
};

const generalCommodityAliases: Record<string, string[]> = {
  "used-clothing": ["used clothing"],
  construction: ["construction"],
  pharmaceuticals: ["pharmaceuticals"],
  automotive: ["automotive"],
  textiles: ["textiles"],
  plastics: ["plastics"],
  machinery: ["machinery"],
  other: ["other"],
};

const officeAliases: Record<string, string[]> = {
  gatuna: ["gatuna"],
  "airport-cargo": ["airport cargo", "airport"],
};

const provinceAliases: Record<string, string[]> = {
  kigali: ["kigali", "kigali city"],
  northern: ["northern"],
  southern: ["southern"],
  eastern: ["eastern"],
  western: ["western"],
};

function matchesAlias(
  label: string,
  selectedId: string,
  aliases: Record<string, string[]>,
) {
  if (selectedId === "all") return true;
  const needle = label.toLowerCase();
  return (aliases[selectedId] ?? []).some(
    (alias) => needle === alias || needle.includes(alias),
  );
}

function filterNamed(
  rows: NamedValue[] | undefined,
  selectedId: string,
  aliases: Record<string, string[]>,
) {
  if (!rows || selectedId === "all") return rows;
  const filtered = rows.filter((row) =>
    matchesAlias(row.name, selectedId, aliases),
  );
  return filtered.length > 0 ? filtered : rows;
}

function filterStacked(
  rows: StackedRow[] | undefined,
  selectedId: string,
  aliases: Record<string, string[]>,
) {
  if (!rows || selectedId === "all") return rows;
  const filtered = rows.filter((row) =>
    matchesAlias(String(row.name), selectedId, aliases),
  );
  return filtered.length > 0 ? filtered : rows;
}

function filterKpis(
  items: KpiItem[] | undefined,
  selectedId: string,
  aliases: Record<string, string[]>,
) {
  if (!items || selectedId === "all") return items;
  const filtered = items.filter((item) =>
    matchesAlias(item.label, selectedId, aliases),
  );
  return filtered.length > 0 ? filtered : items;
}

function scaleTrend(
  points: DirectorUnitDashboard["completionTrend"],
  factor: number,
) {
  return points.map((point) => ({
    ...point,
    value: Math.max(1, Math.round(point.value * factor)),
    previous:
      point.previous == null
        ? undefined
        : Math.max(1, Math.round(point.previous * factor)),
  }));
}

function inspectionScale(inspection: string) {
  if (inspection === "all") return 1;
  return 0.28;
}

function categoryScale(category: string) {
  if (category === "all") return 1;
  const scales: Record<string, number> = {
    "seed-producers": 0.25,
    agrochemical: 0.21,
    butcheries: 0.24,
    "meat-carriers": 0.15,
    electronics: 0.15,
  };
  return scales[category] ?? 0.2;
}

function deriveCategoryOutcomes(
  data: DirectorUnitDashboard,
  category: string,
): NamedValue[] {
  if (category === "all") return data.outcomes;

  const approvalRow = filterNamed(
    data.sectionCharts.find((section) => section.id === "approval-by-cat")
      ?.bars,
    category,
    categoryAliases,
  )?.[0];
  const operatorRow = filterNamed(
    data.sectionCharts.find((section) => section.id === "operators")?.bars,
    category,
    categoryAliases,
  )?.[0];

  if (!approvalRow || !operatorRow) return data.outcomes;

  const approved = Math.round((operatorRow.value * approvalRow.value) / 100);
  const rejected = Math.max(0, operatorRow.value - approved);
  return [
    { name: "Approved", value: approved },
    { name: "Rejected", value: rejected },
  ];
}

function scaleStackedProvince(
  rows: StackedRow[],
  factor: number,
): StackedRow[] {
  return rows.map((row) => {
    const next: StackedRow = { name: row.name };
    for (const [key, value] of Object.entries(row)) {
      if (key === "name") continue;
      next[key] =
        typeof value === "number" ? Math.max(0, Math.round(value * factor)) : value;
    }
    return next;
  });
}

export type FilteredDirectorData = {
  outcomes: NamedValue[];
  outcomesByProvince: StackedRow[];
  outcomesByStream?: StackedRow[];
  completionTrend: DirectorUnitDashboard["completionTrend"];
  complianceTrend: DirectorUnitDashboard["complianceTrend"];
  yoyTrend: DirectorUnitDashboard["yoyTrend"];
  sectionOverviewKpis: KpiItem[];
  sectionCharts: DirectorUnitDashboard["sectionCharts"];
  mapProvinces?: NamedValue[];
};

/** Apply active director filters to unit dashboard mock data. */
export function applyDirectorFilters(
  data: DirectorUnitDashboard,
  filters: DirectorFilterValues,
): FilteredDirectorData {
  const scale =
    data.filterMode === "categories"
      ? categoryScale(filters.category)
      : data.filterMode === "iiu"
        ? inspectionScale(filters.inspectionName)
        : 1;

  let outcomes = data.outcomes;
  if (data.filterMode === "categories" && filters.category !== "all") {
    outcomes = deriveCategoryOutcomes(data, filters.category);
  }

  let outcomesByProvince = filterStacked(
    data.outcomesByProvince,
    data.filterMode === "iiu" ? filters.officeName : filters.province,
    data.filterMode === "iiu" ? officeAliases : provinceAliases,
  )!;

  if (
    (data.filterMode === "categories" && filters.category !== "all") ||
    (data.filterMode === "iiu" && filters.inspectionName !== "all")
  ) {
    outcomesByProvince = scaleStackedProvince(outcomesByProvince, scale);
  }

  let outcomesByStream = data.outcomesByStream;
  if (data.filterMode === "streams" && filters.stream !== "all") {
    outcomesByStream = filterStacked(
      data.outcomesByStream,
      filters.stream,
      streamAliases,
    );
  }

  const sectionCharts = data.sectionCharts
    .filter((section) => {
      if (data.filterMode === "streams") {
        if (filters.stream === "all") return true;
        return (
          section.id === filters.stream ||
          section.id.startsWith(`${filters.stream}-`)
        );
      }
      return true;
    })
    .map((section) => {
      let bars = section.bars;
      let stacked = section.stacked;
      let kpis = section.kpis;
      let line = section.line;
      let donut = section.donut;

      if (data.filterMode === "categories") {
        bars = filterNamed(bars, filters.category, categoryAliases);
        stacked = filterStacked(stacked, filters.category, categoryAliases);
        kpis = filterKpis(kpis, filters.category, categoryAliases);
        if (filters.category !== "all" && line) {
          line = scaleTrend(line, scale);
        }
        if (
          filters.category !== "all" &&
          donut &&
          section.id === "renewals" &&
          stacked?.[0]
        ) {
          const row = stacked[0];
          donut = [
            { name: "First-time", value: Number(row.firstTime ?? 0) },
            { name: "Renewal", value: Number(row.renewal ?? 0) },
          ];
        }
      }

      if (data.filterMode === "imu") {
        if (section.id === "business") {
          bars = filterNamed(
            bars,
            filters.businessCategory,
            businessCategoryAliases,
          );
        }
        if (
          section.id === "product-surveillance" ||
          section.id === "decisions-by-product"
        ) {
          bars = filterNamed(
            bars,
            filters.productCategory,
            productCategoryAliases,
          );
          stacked = filterStacked(
            stacked,
            filters.productCategory,
            productCategoryAliases,
          );
        }
      }

      if (data.filterMode === "iiu") {
        if (
          section.id === "physical" ||
          section.id === "physical-decisions"
        ) {
          bars = filterNamed(
            bars,
            filters.productCategory,
            productCategoryAliases,
          );
          stacked = filterStacked(
            stacked,
            filters.productCategory,
            productCategoryAliases,
          );
        }
        if (section.id.startsWith("general-")) {
          bars = filterNamed(
            bars,
            filters.generalCommodity,
            generalCommodityAliases,
          );
          stacked = filterStacked(
            stacked,
            filters.generalCommodity,
            generalCommodityAliases,
          );
          if (filters.generalCommodity !== "all" && line) {
            line = scaleTrend(line, 0.18);
          }
          if (filters.generalCommodity !== "all" && donut) {
            donut = donut.map((slice) => ({
              ...slice,
              value: Math.max(1, Math.round(slice.value * 0.18)),
            }));
          }
        }
      }

      if (data.filterMode !== "iiu") {
        bars = filterNamed(bars, filters.province, provinceAliases);
        stacked = filterStacked(stacked, filters.province, provinceAliases);
      } else {
        bars = filterNamed(bars, filters.officeName, officeAliases);
        stacked = filterStacked(stacked, filters.officeName, officeAliases);
      }

      return { ...section, bars, stacked, kpis, line, donut };
    });

  let mapProvinces = filterNamed(
    data.mapProvinces,
    filters.province,
    provinceAliases,
  );
  if (
    data.filterMode === "categories" &&
    filters.category !== "all" &&
    mapProvinces
  ) {
    mapProvinces = mapProvinces.map((row) => ({
      ...row,
      value: Math.max(1, Math.round(row.value * scale)),
    }));
  }

  let sectionOverviewKpis = data.sectionOverviewKpis;
  if (data.filterMode === "categories" && filters.category !== "all") {
    const operator = filterNamed(
      data.sectionCharts.find((section) => section.id === "operators")?.bars,
      filters.category,
      categoryAliases,
    )?.[0];
    const approval = filterNamed(
      data.sectionCharts.find((section) => section.id === "approval-by-cat")
        ?.bars,
      filters.category,
      categoryAliases,
    )?.[0];
    if (operator && approval) {
      sectionOverviewKpis = [
        {
          id: "licensed",
          label: "Total licensed operators",
          value: operator.value.toLocaleString(),
          tone: "seed",
        },
        {
          id: "received",
          label: "Applications received",
          value: String(Math.round(operator.value * 0.28)),
          tone: "slaughterhouse",
        },
        {
          id: "approval",
          label: "Approval rate",
          value: `${approval.value}%`,
          tone: "agrochemical",
        },
        {
          id: "turnaround",
          label: "Average processing turnaround time",
          value: "N/A",
          tone: "seed-producer",
        },
      ];
    }
  }

  return {
    outcomes,
    outcomesByProvince,
    outcomesByStream,
    completionTrend:
      scale === 1
        ? data.completionTrend
        : scaleTrend(data.completionTrend, scale),
    complianceTrend:
      scale === 1
        ? data.complianceTrend
        : scaleTrend(data.complianceTrend, scale),
    yoyTrend: scale === 1 ? data.yoyTrend : scaleTrend(data.yoyTrend, scale),
    sectionOverviewKpis,
    sectionCharts,
    mapProvinces,
  };
}

export function useDirectorFilterState() {
  const [filters, setFilters] = useState<DirectorFilterValues>(
    defaultDirectorFilterValues,
  );

  const onFilterChange = useCallback(
    (key: keyof DirectorFilterValues, value: string) => {
      setFilters((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  return { filters, onFilterChange };
}
