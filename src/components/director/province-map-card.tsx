"use client";

import { useMemo, useState } from "react";
import { ChartCard } from "@/components/shared/chart-card";
import type { NamedValue } from "@/data/director/dashboard";
import {
  matchProvinceKey,
  rwandaProvinces,
  type ProvinceKey,
} from "@/data/rwanda/provinces";
import { cn } from "@/lib/utils";

type ProvinceMapCardProps = {
  title: string;
  description?: string;
  data: NamedValue[];
  valueSuffix?: string;
};

/** Rwanda choropleth map using province names from `rwanda-locations`. */
export function ProvinceMapCard({
  title,
  description,
  data,
  valueSuffix = "entities",
}: ProvinceMapCardProps) {
  const [active, setActive] = useState<ProvinceKey | null>(null);

  const valueByKey = useMemo(() => {
    const map = new Map<ProvinceKey, number>();
    for (const item of data) {
      const key = matchProvinceKey(item.name);
      if (key) map.set(key, item.value);
    }
    return map;
  }, [data]);

  const max = Math.max(...Array.from(valueByKey.values()), 1);
  const activeProvince = rwandaProvinces.find(
    (province) => province.key === active,
  );
  const activeValue = active ? (valueByKey.get(active) ?? 0) : null;

  return (
    <ChartCard title={title}>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative mx-auto w-full max-w-[340px]">
          <svg
            viewBox="0 0 360 400"
            className="h-auto w-full"
            role="img"
            aria-label="Map of Rwanda by province"
          >
            <title>Rwanda provinces</title>
            {rwandaProvinces.map((province) => {
              const value = valueByKey.get(province.key) ?? 0;
              const intensity = value / max;
              const isActive = active === province.key;

              return (
                <path
                  key={province.key}
                  d={province.path}
                  className={cn(
                    "cursor-pointer stroke-white stroke-[1.5] transition-all",
                    isActive && "stroke-2",
                  )}
                  style={{
                    fill: `color-mix(in oklab, var(--accent) ${Math.round(18 + intensity * 72)}%, var(--surface))`,
                    filter: isActive
                      ? "drop-shadow(0 2px 4px rgba(0,0,0,0.18))"
                      : undefined,
                  }}
                  onMouseEnter={() => setActive(province.key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(province.key)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                >
                  <title>
                    {province.locationName}: {value} {valueSuffix}
                  </title>
                </path>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {activeProvince && activeValue != null ? (
            <div className="border border-border bg-surface px-3 py-3">
              <p className="text-sm font-semibold text-foreground">
                {activeProvince.locationName}
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {activeValue}
              </p>
              <p className="rica-caption">{valueSuffix}</p>
            </div>
          ) : (
            <p className="rica-caption">
              Hover a province to see {valueSuffix} counts. Names from
              rwanda-locations.
            </p>
          )}

          <ul className="mt-1 space-y-1.5">
            {rwandaProvinces.map((province) => {
              const value = valueByKey.get(province.key) ?? 0;
              const intensity = value / max;
              return (
                <li
                  key={province.key}
                  className={cn(
                    "flex items-center justify-between gap-2 text-sm",
                    active === province.key && "font-semibold",
                  )}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span
                      className="size-2.5 shrink-0 border border-border"
                      style={{
                        backgroundColor: `color-mix(in oklab, var(--accent) ${Math.round(18 + intensity * 72)}%, var(--surface))`,
                      }}
                    />
                    <span className="truncate text-foreground">
                      {province.shortName}
                    </span>
                  </span>
                  <span className="tabular-nums text-muted">{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ChartCard>
  );
}
