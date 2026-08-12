import type { ProvinceKey } from "@/types";

/**
 * Rwandan administrative geography for the executive coverage map.
 *
 * Coordinates are district-seat centroids, accurate to roughly ±0.05° — ample
 * for a proportional-symbol map over OSM tiles. Note Rwanda sits just south of
 * the equator, so every latitude is negative.
 *
 * Kept separate from `@/data/reference` on purpose: the inspector generator
 * feeds `reference.districts` to `rngPick`, so touching that array would
 * silently change already-shipped inspector numbers.
 */

export type DistrictGeo = {
  id: string;
  name: string;
  province: ProvinceKey;
  lat: number;
  lng: number;
};

export const rwandaCenter = { lat: -1.9403, lng: 29.8739 } as const;

export const rwandaBounds = {
  southWest: { lat: -2.917, lng: 28.856 },
  northEast: { lat: -1.047, lng: 30.899 },
} as const;

/** Generous pan limits so the map cannot be dragged off the region. */
export const rwandaMaxBounds: [[number, number], [number, number]] = [
  [-3.4, 28.4],
  [-0.6, 31.4],
];

export const provinceDefinitions: Record<
  ProvinceKey,
  { id: ProvinceKey; label: string; shortLabel: string }
> = {
  kigali: { id: "kigali", label: "Kigali City", shortLabel: "Kigali" },
  north: { id: "north", label: "Northern Province", shortLabel: "Northern" },
  south: { id: "south", label: "Southern Province", shortLabel: "Southern" },
  east: { id: "east", label: "Eastern Province", shortLabel: "Eastern" },
  west: { id: "west", label: "Western Province", shortLabel: "Western" },
};

export const provinceList = Object.values(provinceDefinitions);

/** All 30 districts: Kigali 3, Northern 5, Southern 8, Eastern 7, Western 7. */
export const rwandaDistricts: readonly DistrictGeo[] = [
  // Kigali City
  { id: "gasabo", name: "Gasabo", province: "kigali", lat: -1.9137, lng: 30.1195 },
  { id: "kicukiro", name: "Kicukiro", province: "kigali", lat: -1.9873, lng: 30.1055 },
  { id: "nyarugenge", name: "Nyarugenge", province: "kigali", lat: -1.9553, lng: 30.0588 },

  // Northern Province
  { id: "burera", name: "Burera", province: "north", lat: -1.4703, lng: 29.8790 },
  { id: "gakenke", name: "Gakenke", province: "north", lat: -1.6947, lng: 29.7797 },
  { id: "gicumbi", name: "Gicumbi", province: "north", lat: -1.5769, lng: 30.1058 },
  { id: "musanze", name: "Musanze", province: "north", lat: -1.4998, lng: 29.6349 },
  { id: "rulindo", name: "Rulindo", province: "north", lat: -1.7642, lng: 30.0647 },

  // Southern Province
  { id: "gisagara", name: "Gisagara", province: "south", lat: -2.5453, lng: 29.8331 },
  { id: "huye", name: "Huye", province: "south", lat: -2.5967, lng: 29.7394 },
  { id: "kamonyi", name: "Kamonyi", province: "south", lat: -2.0058, lng: 29.9053 },
  { id: "muhanga", name: "Muhanga", province: "south", lat: -2.0853, lng: 29.7564 },
  { id: "nyamagabe", name: "Nyamagabe", province: "south", lat: -2.4708, lng: 29.4586 },
  { id: "nyanza", name: "Nyanza", province: "south", lat: -2.3517, lng: 29.7503 },
  { id: "nyaruguru", name: "Nyaruguru", province: "south", lat: -2.6608, lng: 29.5122 },
  { id: "ruhango", name: "Ruhango", province: "south", lat: -2.2314, lng: 29.7817 },

  // Eastern Province
  { id: "bugesera", name: "Bugesera", province: "east", lat: -2.2119, lng: 30.1408 },
  { id: "gatsibo", name: "Gatsibo", province: "east", lat: -1.5850, lng: 30.4103 },
  { id: "kayonza", name: "Kayonza", province: "east", lat: -1.8869, lng: 30.6156 },
  { id: "kirehe", name: "Kirehe", province: "east", lat: -2.2864, lng: 30.7078 },
  { id: "ngoma", name: "Ngoma", province: "east", lat: -2.1553, lng: 30.4536 },
  { id: "nyagatare", name: "Nyagatare", province: "east", lat: -1.2939, lng: 30.3272 },
  { id: "rwamagana", name: "Rwamagana", province: "east", lat: -1.9487, lng: 30.4347 },

  // Western Province
  { id: "karongi", name: "Karongi", province: "west", lat: -2.0003, lng: 29.3800 },
  { id: "ngororero", name: "Ngororero", province: "west", lat: -1.8794, lng: 29.6206 },
  { id: "nyabihu", name: "Nyabihu", province: "west", lat: -1.6553, lng: 29.5081 },
  { id: "nyamasheke", name: "Nyamasheke", province: "west", lat: -2.3489, lng: 29.1400 },
  { id: "rubavu", name: "Rubavu", province: "west", lat: -1.6778, lng: 29.2597 },
  { id: "rusizi", name: "Rusizi", province: "west", lat: -2.4847, lng: 28.9075 },
  { id: "rutsiro", name: "Rutsiro", province: "west", lat: -1.9314, lng: 29.3236 },
];

export const districtsByProvince: Record<ProvinceKey, DistrictGeo[]> =
  provinceList.reduce(
    (acc, province) => {
      acc[province.id] = rwandaDistricts.filter(
        (district) => district.province === province.id,
      );
      return acc;
    },
    {} as Record<ProvinceKey, DistrictGeo[]>,
  );

export function getDistrict(id: string): DistrictGeo | undefined {
  return rwandaDistricts.find((district) => district.id === id);
}

export function isProvinceKey(value: string): value is ProvinceKey {
  return value in provinceDefinitions;
}
