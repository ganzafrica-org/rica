import { getDistricts, getProvinces } from "rwanda-locations";

/** Canonical province keys used by dashboard mock data. */
export type ProvinceKey =
  | "kigali"
  | "northern"
  | "southern"
  | "eastern"
  | "western";

export type RwandaProvince = {
  key: ProvinceKey;
  /** Short label used in charts / mock data */
  shortName: string;
  /** Name returned by rwanda-locations */
  locationName: string;
  /** SVG path in viewBox 0 0 360 400 */
  path: string;
};

/**
 * Rwanda province shapes (simplified choropleth), labeled with
 * names from the `rwanda-locations` package.
 */
export const rwandaProvinces: RwandaProvince[] = [
  {
    key: "northern",
    shortName: "Northern",
    locationName: "Northern",
    path: "M95 18 L210 8 L255 55 L248 120 L200 145 L145 138 L95 115 L70 70 Z",
  },
  {
    key: "western",
    shortName: "Western",
    locationName: "Western",
    path: "M42 78 L95 115 L145 138 L150 205 L120 275 L70 320 L38 270 L28 180 Z",
  },
  {
    key: "kigali",
    shortName: "Kigali",
    locationName: "City Of Kigali",
    path: "M168 148 L210 142 L228 168 L218 198 L175 205 L155 180 Z",
  },
  {
    key: "eastern",
    shortName: "Eastern",
    locationName: "Eastern",
    path: "M210 8 L300 40 L335 120 L340 220 L300 300 L230 285 L218 198 L228 168 L210 142 L200 145 L248 120 L255 55 Z",
  },
  {
    key: "southern",
    shortName: "Southern",
    locationName: "Southern",
    path: "M150 205 L175 205 L218 198 L230 285 L300 300 L270 360 L180 385 L95 360 L70 320 L120 275 Z",
  },
];

export function getRwandaProvinceNames() {
  return getProvinces();
}

export function getRwandaDistricts(provinceLocationName: string) {
  try {
    return getDistricts(provinceLocationName);
  } catch {
    return [] as string[];
  }
}

export function matchProvinceKey(label: string): ProvinceKey | null {
  const value = label.toLowerCase();
  if (value.includes("kigali")) return "kigali";
  if (value.includes("northern")) return "northern";
  if (value.includes("southern")) return "southern";
  if (value.includes("eastern")) return "eastern";
  if (value.includes("western")) return "western";
  return null;
}

export function provinceFilterOptions() {
  return [
    { id: "all", label: "All provinces" },
    ...rwandaProvinces.map((province) => ({
      id: province.key,
      label: province.locationName,
    })),
  ];
}

export function districtFilterOptions(provinceKey: ProvinceKey | "all" = "all") {
  const provinces =
    provinceKey === "all"
      ? rwandaProvinces
      : rwandaProvinces.filter((province) => province.key === provinceKey);

  const districts = provinces.flatMap((province) =>
    getRwandaDistricts(province.locationName).map((district) => ({
      id: district.toLowerCase().replace(/\s+/g, "-"),
      label: district,
    })),
  );

  // Deduplicate by id
  const seen = new Set<string>();
  const unique = districts.filter((district) => {
    if (seen.has(district.id)) return false;
    seen.add(district.id);
    return true;
  });

  return [{ id: "all", label: "All districts" }, ...unique];
}
