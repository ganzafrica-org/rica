"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageTransition } from "@/components/motion/page-transition";
import { PageTitle } from "@/components/layout/page-title";
import { DirectorFilters } from "@/components/director/filters";
import {
  applyDirectorFilters,
  useDirectorFilterState,
} from "@/components/director/apply-filters";
import { DirectorKpiGrid } from "@/components/director/kpi-grid";
import {
  chartColors,
  DirectorBarChart,
  DirectorDonutChart,
  DirectorLineChart,
  DirectorStackedBarChart,
} from "@/components/director/charts";
import { ProvinceMapCard } from "@/components/director/province-map-card";
import { directorDashboards } from "@/data/director/dashboard";
import {
  directorCategoryLabels,
  directorProductCategoryLabels,
  directorProductLabel,
  directorStreamLabels,
  streamPageCopy,
  type DirectorCategoryId,
  type DirectorProductCategoryId,
  type DirectorStreamId,
} from "@/data/navigation";

type DirectorStreamsViewProps = {
  /** When set (FPU sidebar), lock the view to this regulatory stream. */
  streamId?: DirectorStreamId;
  /** When set (RLU sidebar), lock the view to this licensing category. */
  categoryId?: DirectorCategoryId;
  /** When set (IIU sidebar), lock the view to this product category. */
  productCategoryId?: DirectorProductCategoryId;
  /** When set (IIU nested product), lock to this product name. */
  productNameId?: string;
};

export function DirectorStreamsView({
  streamId,
  categoryId,
  productCategoryId,
  productNameId,
}: DirectorStreamsViewProps) {
  const { user } = useAuth();
  const unitKey = user?.unit ?? "fpu";
  const data = directorDashboards[unitKey];
  const copy = streamPageCopy[unitKey];
  const { filters, onFilterChange } = useDirectorFilterState();

  useEffect(() => {
    if (streamId) onFilterChange("stream", streamId);
    if (categoryId) onFilterChange("category", categoryId);
    if (productCategoryId) onFilterChange("productCategory", productCategoryId);
    if (productNameId) onFilterChange("productName", productNameId);
  }, [
    streamId,
    categoryId,
    productCategoryId,
    productNameId,
    onFilterChange,
  ]);

  const activeFilters = useMemo(
    () => ({
      ...filters,
      ...(streamId ? { stream: streamId } : {}),
      ...(categoryId ? { category: categoryId } : {}),
      ...(productCategoryId ? { productCategory: productCategoryId } : {}),
      ...(productNameId ? { productName: productNameId } : {}),
    }),
    [filters, streamId, categoryId, productCategoryId, productNameId],
  );

  const filtered = useMemo(
    () => applyDirectorFilters(data, activeFilters),
    [data, activeFilters],
  );

  // Cross-unit summaries live on the dashboard (RLU categories, IMU overview).
  // IIU §4.2 charts also render on product pages, scoped by sidebar selection.
  const dashboardOnlySectionIds = new Set([
    "operators",
    "approval-by-cat",
    ...(unitKey === "imu" ? ["business", "assessment", "geo"] : []),
  ]);
  const sections = filtered.sectionCharts.filter(
    (section) => !dashboardOnlySectionIds.has(section.id),
  );
  // Stream/licensing category chosen in sidebar — geo/date only.
  // IIU product pages keep Country of Origin; category/name come from the sidebar.
  const filterMode =
    streamId ||
    categoryId ||
    data.filterMode === "streams" ||
    data.filterMode === "categories"
      ? "basic"
      : productCategoryId
        ? "iiu"
        : data.filterMode;

  const pageTitle = streamId
    ? directorStreamLabels[streamId]
    : categoryId
      ? `${directorCategoryLabels[categoryId]} overview`
      : productNameId && productCategoryId
        ? `${directorProductLabel(productCategoryId, productNameId) ?? productNameId} overview`
        : productCategoryId
          ? `${directorProductCategoryLabels[productCategoryId]} overview`
          : copy.title;

  const charts = sections.flatMap((section, sectionIndex) => {
    const items: ReactNode[] = [];
    if (section.line) {
      items.push(
        <DirectorLineChart
          key={`${section.id}-line`}
          title={`${section.title} — applications over time`}
          data={section.line}
          valueLabel="Received"
          color={chartColors[sectionIndex % chartColors.length]}
        />,
      );
    }
    if (section.bars) {
      items.push(
        <DirectorBarChart
          key={`${section.id}-bars`}
          title={section.title}
          data={section.bars}
          colorOffset={sectionIndex}
        />,
      );
    }
    if (section.donut) {
      items.push(
        <DirectorDonutChart
          key={`${section.id}-donut`}
          title={
            section.bars || section.line || section.stacked
              ? `${section.title} — share of outcomes`
              : section.title
          }
          data={section.donut}
          colorOffset={sectionIndex + 2}
        />,
      );
    }
    if (section.stacked && section.stackedKeys) {
      items.push(
        <DirectorStackedBarChart
          key={`${section.id}-stacked`}
          title={section.title}
          data={section.stacked}
          series={section.stackedKeys}
        />,
      );
    }
    return items;
  });

  // RLU already has a Geographic distribution bar chart — skip the map duplicate.
  const showMap =
    unitKey !== "rlu" &&
    filtered.mapProvinces &&
    filtered.mapProvinces.length > 0 &&
    !streamId;

  if (showMap) {
    charts.push(
      <ProvinceMapCard
        key="province-map"
        title="Geographic distribution"
        data={filtered.mapProvinces!}
        valueSuffix="outlets"
      />,
    );
  }

  const kpiSections = sections.filter(
    (section) => section.kpis && section.kpis.length > 0,
  );

  // IMU / IIU overview KPIs live on the dashboard; RLU category pages keep theirs.
  const showOverview =
    filtered.sectionOverviewKpis.length > 0 &&
    !streamId &&
    unitKey !== "imu" &&
    unitKey !== "iiu";

  const overviewKpis = showOverview ? filtered.sectionOverviewKpis : [];
  // Drop product-surveillance KPIs on IMU (they moved to dashboard).
  const sectionKpis = kpiSections
    .filter((section) =>
      unitKey === "imu" ? section.id !== "product-surveillance" : true,
    )
    .flatMap((section) => section.kpis ?? []);
  const combinedKpis =
    !streamId &&
    !productCategoryId &&
    (overviewKpis.length > 0 || sectionKpis.length > 0)
      ? [...overviewKpis, ...sectionKpis]
      : null;

  return (
    <PageTransition className="space-y-6">
      <PageTitle title={pageTitle} />
      <DirectorFilters
        filterMode={filterMode}
        values={activeFilters}
        onChange={onFilterChange}
        hideProductCategory={Boolean(productCategoryId)}
        hideProductName={Boolean(productNameId)}
      />

      {combinedKpis && combinedKpis.length > 0 ? (
        <DirectorKpiGrid items={combinedKpis} />
      ) : null}

      {(streamId || productCategoryId) && kpiSections.length > 0 ? (
        <DirectorKpiGrid
          items={kpiSections.flatMap((section) => section.kpis ?? [])}
        />
      ) : null}

      {charts.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">{charts}</div>
      ) : (
        <section className="space-y-2">
          <h2 className="rica-title text-foreground">Unit-specific KPIs</h2>
          <p className="rica-caption">
            {streamId ||
            categoryId ||
            productCategoryId ||
            activeFilters.category !== "all"
              ? "No sections match this filter."
              : "To be defined — pending checklist and dataset (§5.2)."}
          </p>
        </section>
      )}
    </PageTransition>
  );
}
