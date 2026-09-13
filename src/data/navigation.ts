import type { BusinessUnitKey, NavItem, UserRole } from "@/types";

/**
 * Director sidebar — only pages that map to Director KPI framework sections:
 * Dashboard (outcomes + trends) · Team · unit deep-dives (streams/categories/…)
 */
export const directorNavByUnit: Record<BusinessUnitKey, NavItem[]> = {
  fpu: [
    { href: "/director", label: "Dashboard", icon: "dashboard" },
    { href: "/director/team", label: "Team", icon: "users" },
    {
      href: "/director/streams",
      label: "Regulatory streams",
      icon: "layers",
      children: [
        {
          href: "/director/streams/livestock",
          label: "Livestock inspection",
          shortLabel: "Livestock",
          icon: "slaughterhouse",
          children: [
            {
              href: "/director/streams/livestock/slaughterhouse",
              label: "Slaughterhouse",
              icon: "slaughterhouse",
            },
            {
              href: "/director/streams/livestock/butchery",
              label: "Butchery",
              icon: "butchery",
            },
            {
              href: "/director/streams/livestock/meat-carrier",
              label: "Meat Carrier",
              icon: "meat-carrier",
            },
            {
              href: "/director/streams/livestock/feed-retailer",
              label: "Feed Retailer",
              icon: "facilities",
            },
            {
              href: "/director/streams/livestock/feed-processing",
              label: "Feed Processing Unit",
              icon: "facilities",
            },
            {
              href: "/director/streams/livestock/beekeeper",
              label: "Beekeeper Cooperative",
              icon: "layers",
            },
            {
              href: "/director/streams/livestock/honey-collection",
              label: "Honey Collection Center",
              icon: "layers",
            },
            {
              href: "/director/streams/livestock/honey-processing",
              label: "Honey Processing Unit",
              icon: "layers",
            },
            {
              href: "/director/streams/livestock/milk-collection",
              label: "Milk Collection Center",
              icon: "layers",
            },
            {
              href: "/director/streams/livestock/milk-kiosk",
              label: "Milk Kiosk",
              icon: "facilities",
            },
            {
              href: "/director/streams/livestock/map",
              label: "MAP",
              icon: "map",
            },
          ],
        },
        {
          href: "/director/streams/plant-warehouse",
          label: "Plant and warehouse Inspection",
          shortLabel: "Plant & warehouse",
          icon: "warehouse",
          children: [
            {
              href: "/director/streams/plant-warehouse/phytosanitary",
              label: "Phytosanitary Export",
              icon: "warehouse",
            },
          ],
        },
        {
          href: "/director/streams/seed",
          label: "Seed Inspection",
          shortLabel: "Seed",
          icon: "seed",
          children: [
            {
              href: "/director/streams/seed/producer-verification",
              label: "Producer Onsite Verification",
              icon: "producer",
            },
            {
              href: "/director/streams/seed/field-inspection",
              label: "Field Inspection",
              icon: "seed",
            },
            {
              href: "/director/streams/seed/potato-seed-store",
              label: "Potato Seed Store Inspection",
              icon: "warehouse",
            },
            {
              href: "/director/streams/seed/seed-sampling",
              label: "Seed Sampling",
              icon: "activity",
            },
          ],
        },
        {
          href: "/director/streams/agrochemical",
          label: "Agrochemical Inspection",
          shortLabel: "Agrochemical",
          icon: "agrochemical",
          children: [
            {
              href: "/director/streams/agrochemical/dealership",
              label: "Agrochemical Dealership Licensing",
              icon: "agrochemical",
            },
          ],
        },
      ],
    },
  ],
  rlu: [
    { href: "/director", label: "Dashboard", icon: "dashboard" },
    { href: "/director/team", label: "Team", icon: "users" },
    {
      href: "/director/streams",
      label: "Licensing categories",
      icon: "layers",
      children: [
        {
          href: "/director/streams/seed-producers",
          label: "Seed Producers",
          shortLabel: "Seed",
          icon: "producer",
        },
        {
          href: "/director/streams/agrochemical",
          label: "Agrochemical Dealers",
          shortLabel: "Agrochem",
          icon: "agrochemical",
        },
        {
          href: "/director/streams/butcheries",
          label: "Butcheries",
          shortLabel: "Butchery",
          icon: "slaughterhouse",
        },
        {
          href: "/director/streams/meat-carriers",
          label: "Meat Carriers",
          shortLabel: "Carriers",
          icon: "slaughterhouse",
        },
        {
          href: "/director/streams/electronics",
          label: "Used Electronics",
          shortLabel: "Electronics",
          icon: "layers",
        },
      ],
    },
  ],
  imu: [
    { href: "/director", label: "Dashboard", icon: "dashboard" },
    { href: "/director/team", label: "Team", icon: "users" },
    { href: "/director/streams", label: "Surveillance", icon: "layers" },
  ],
  iiu: [
    { href: "/director", label: "Dashboard", icon: "dashboard" },
    { href: "/director/team", label: "Team", icon: "users" },
    {
      href: "/director/streams",
      label: "Product categories",
      icon: "layers",
      children: [
        {
          href: "/director/streams/food",
          label: "Food",
          shortLabel: "Food",
          icon: "seed",
          children: [
            { href: "/director/streams/food/rice", label: "Rice", icon: "seed" },
            {
              href: "/director/streams/food/cooking-oil",
              label: "Cooking oil",
              icon: "seed",
            },
            {
              href: "/director/streams/food/sugar",
              label: "Sugar",
              icon: "seed",
            },
            {
              href: "/director/streams/food/flour",
              label: "Flour",
              icon: "seed",
            },
          ],
        },
        {
          href: "/director/streams/cosmetics",
          label: "Cosmetics",
          shortLabel: "Cosmetics",
          icon: "layers",
          children: [
            {
              href: "/director/streams/cosmetics/lotion",
              label: "Lotion",
              icon: "layers",
            },
            {
              href: "/director/streams/cosmetics/soap",
              label: "Soap",
              icon: "layers",
            },
            {
              href: "/director/streams/cosmetics/perfume",
              label: "Perfume",
              icon: "layers",
            },
          ],
        },
        {
          href: "/director/streams/chemicals",
          label: "Chemicals",
          shortLabel: "Chemicals",
          icon: "agrochemical",
          children: [
            {
              href: "/director/streams/chemicals/fertilizer",
              label: "Fertilizer",
              icon: "agrochemical",
            },
            {
              href: "/director/streams/chemicals/pesticide",
              label: "Pesticide",
              icon: "agrochemical",
            },
            {
              href: "/director/streams/chemicals/detergent",
              label: "Detergent",
              icon: "agrochemical",
            },
          ],
        },
        {
          href: "/director/streams/electronics",
          label: "Electronics",
          shortLabel: "Electronics",
          icon: "layers",
          children: [
            {
              href: "/director/streams/electronics/phone",
              label: "Phone",
              icon: "layers",
            },
            {
              href: "/director/streams/electronics/laptop",
              label: "Laptop",
              icon: "layers",
            },
            {
              href: "/director/streams/electronics/charger",
              label: "Charger",
              icon: "layers",
            },
          ],
        },
        {
          href: "/director/streams/general",
          label: "General Category",
          shortLabel: "General",
          icon: "layers",
        },
      ],
    },
  ],
};

export const directorStreamLabels: Record<
  "livestock" | "plant-warehouse" | "seed" | "agrochemical",
  string
> = {
  livestock: "Livestock inspection",
  "plant-warehouse": "Plant and warehouse Inspection",
  seed: "Seed Inspection",
  agrochemical: "Agrochemical Inspection",
};

export const directorStreamIds = [
  "livestock",
  "plant-warehouse",
  "seed",
  "agrochemical",
] as const;

export type DirectorStreamId = (typeof directorStreamIds)[number];

export function isDirectorStreamId(value: string): value is DirectorStreamId {
  return (directorStreamIds as readonly string[]).includes(value);
}

/** Facility / checklist types nested under each FPU subunit. */
export const directorStreamFacilities: Record<
  DirectorStreamId,
  readonly { id: string; label: string }[]
> = {
  livestock: [
    { id: "slaughterhouse", label: "Slaughterhouse" },
    { id: "butchery", label: "Butchery" },
    { id: "meat-carrier", label: "Meat Carrier" },
    { id: "feed-retailer", label: "Feed Retailer" },
    { id: "feed-processing", label: "Feed Processing Unit" },
    { id: "beekeeper", label: "Beekeeper Cooperative" },
    { id: "honey-collection", label: "Honey Collection Center" },
    { id: "honey-processing", label: "Honey Processing Unit" },
    { id: "milk-collection", label: "Milk Collection Center" },
    { id: "milk-kiosk", label: "Milk Kiosk" },
    { id: "map", label: "MAP" },
  ],
  "plant-warehouse": [
    { id: "phytosanitary", label: "Phytosanitary Export" },
  ],
  seed: [
    { id: "producer-verification", label: "Producer Onsite Verification" },
    { id: "field-inspection", label: "Field Inspection" },
    { id: "potato-seed-store", label: "Potato Seed Store Inspection" },
    { id: "seed-sampling", label: "Seed Sampling" },
  ],
  agrochemical: [
    { id: "dealership", label: "Agrochemical Dealership Licensing" },
  ],
};

export function isDirectorStreamFacilityId(
  streamId: DirectorStreamId,
  value: string,
): boolean {
  return directorStreamFacilities[streamId].some(
    (facility) => facility.id === value,
  );
}

export function directorStreamFacilityLabel(
  streamId: DirectorStreamId,
  facilityId: string,
): string | undefined {
  return directorStreamFacilities[streamId].find(
    (facility) => facility.id === facilityId,
  )?.label;
}

const fpuStreamIcons: Record<DirectorStreamId, NavItem["icon"]> = {
  livestock: "slaughterhouse",
  "plant-warehouse": "warehouse",
  seed: "seed",
  agrochemical: "agrochemical",
};

const fpuFacilityIcons: Record<string, NonNullable<NavItem["icon"]>> = {
  slaughterhouse: "slaughterhouse",
  butchery: "butchery",
  "meat-carrier": "meat-carrier",
  "feed-retailer": "facilities",
  "feed-processing": "facilities",
  beekeeper: "layers",
  "honey-collection": "layers",
  "honey-processing": "layers",
  "milk-collection": "layers",
  "milk-kiosk": "facilities",
  map: "map",
  phytosanitary: "warehouse",
  "producer-verification": "producer",
  "field-inspection": "seed",
  "potato-seed-store": "warehouse",
  "seed-sampling": "activity",
  dealership: "agrochemical",
};

/** Same FPU subunit tree for director and inspector sidebars. */
export function fpuStreamNavItems(basePath: string): NavItem[] {
  return directorStreamIds.map((streamId) => ({
    href: `${basePath}/${streamId}`,
    label: directorStreamLabels[streamId],
    shortLabel: directorStreamLabels[streamId],
    icon: fpuStreamIcons[streamId],
    children: directorStreamFacilities[streamId].map((facility) => ({
      href: `${basePath}/${streamId}/${facility.id}`,
      label: facility.label,
      icon: fpuFacilityIcons[facility.id] ?? "layers",
    })),
  }));
}

export const directorCategoryIds = [
  "seed-producers",
  "agrochemical",
  "butcheries",
  "meat-carriers",
  "electronics",
] as const;

export type DirectorCategoryId = (typeof directorCategoryIds)[number];

export const directorCategoryLabels: Record<DirectorCategoryId, string> = {
  "seed-producers": "Seed Producers",
  agrochemical: "Agrochemical Dealers",
  butcheries: "Butcheries",
  "meat-carriers": "Meat Carriers",
  electronics: "Used Electronics",
};

export function isDirectorCategoryId(
  value: string,
): value is DirectorCategoryId {
  return (directorCategoryIds as readonly string[]).includes(value);
}

export const directorProductCategoryIds = [
  "food",
  "cosmetics",
  "chemicals",
  "electronics",
  "general",
] as const;

export type DirectorProductCategoryId =
  (typeof directorProductCategoryIds)[number];

export const directorProductCategoryLabels: Record<
  DirectorProductCategoryId,
  string
> = {
  food: "Food",
  cosmetics: "Cosmetics",
  chemicals: "Chemicals",
  electronics: "Electronics",
  general: "General Category",
};

export function isDirectorProductCategoryId(
  value: string,
): value is DirectorProductCategoryId {
  return (directorProductCategoryIds as readonly string[]).includes(value);
}

/** Products under each IIU import operation category (sidebar nested list). */
export const directorProductsByCategory: Record<
  DirectorProductCategoryId,
  readonly { id: string; label: string }[]
> = {
  food: [
    { id: "rice", label: "Rice" },
    { id: "cooking-oil", label: "Cooking oil" },
    { id: "sugar", label: "Sugar" },
    { id: "flour", label: "Flour" },
  ],
  cosmetics: [
    { id: "lotion", label: "Lotion" },
    { id: "soap", label: "Soap" },
    { id: "perfume", label: "Perfume" },
  ],
  chemicals: [
    { id: "fertilizer", label: "Fertilizer" },
    { id: "pesticide", label: "Pesticide" },
    { id: "detergent", label: "Detergent" },
  ],
  electronics: [
    { id: "phone", label: "Phone" },
    { id: "laptop", label: "Laptop" },
    { id: "charger", label: "Charger" },
  ],
  /** No product-level checklists — commodities are filtered on the page. */
  general: [],
};

export function isDirectorProductId(
  categoryId: DirectorProductCategoryId,
  value: string,
): boolean {
  return directorProductsByCategory[categoryId].some(
    (product) => product.id === value,
  );
}

export function directorProductLabel(
  categoryId: DirectorProductCategoryId,
  productId: string,
): string | undefined {
  return directorProductsByCategory[categoryId].find(
    (product) => product.id === productId,
  )?.label;
}

/** @deprecated Prefer directorNavByUnit via getNavForUser */
export const directorNav = directorNavByUnit.fpu;

/**
 * Inspector sidebar. Services are filters on the dashboard rather than routes,
 * so this is the same for every unit.
 */
export const inspectorNav: NavItem[] = [
  { href: "/inspector", label: "Dashboard", icon: "dashboard" },
  {
    href: "/inspector/facilities",
    label: "Assigned Facilities",
    shortLabel: "Facilities",
    icon: "facilities",
  },
  {
    href: "/inspector/activities",
    label: "Inspection Activities",
    shortLabel: "Activities",
    icon: "activity",
  },
  { href: "/inspector/reports", label: "Reports", icon: "reports" },
];

export function getInspectorNav(unit?: BusinessUnitKey): NavItem[] {
  if (unit !== "fpu") return inspectorNav;

  return [
    inspectorNav[0]!,
    {
      href: "/inspector/streams",
      label: "Regulatory streams",
      icon: "layers",
      children: fpuStreamNavItems("/inspector/streams"),
    },
    ...inspectorNav.slice(1),
  ];
}

export const seniorDirectorNav: NavItem[] = [
  { href: "/senior-director", label: "Dashboard", icon: "dashboard" },
  {
    href: "/senior-director/units",
    label: "Units",
    icon: "building",
    children: [
      {
        href: "/senior-director/units/fpu",
        label: "Farm Products",
        shortLabel: "FPU",
        icon: "seed",
      },
      {
        href: "/senior-director/units/rlu",
        label: "Registration & Licensing",
        shortLabel: "RLU",
        icon: "building",
      },
      {
        href: "/senior-director/units/imu",
        label: "Market Surveillance",
        shortLabel: "IMU",
        icon: "building",
      },
      {
        href: "/senior-director/units/iiu",
        label: "Import Inspection",
        shortLabel: "IIU",
        icon: "building",
      },
    ],
  },
  { href: "/senior-director/inspectors", label: "Inspectors", icon: "users" },
  { href: "/senior-director/reports", label: "Reports", icon: "reports" },
];

export const navByRole: Record<UserRole, NavItem[]> = {
  inspector: inspectorNav,
  director: directorNav,
  "senior-director": seniorDirectorNav,
};

export function getDirectorNav(unit?: BusinessUnitKey): NavItem[] {
  return directorNavByUnit[unit ?? "fpu"];
}

export function getNavForUser(user: {
  role: UserRole;
  unit?: BusinessUnitKey;
}): NavItem[] {
  if (user.role === "inspector") return getInspectorNav(user.unit);
  if (user.role === "senior-director") return seniorDirectorNav;
  return getDirectorNav(user.unit);
}

export const streamPageCopy: Record<
  BusinessUnitKey,
  { title: string; description: string }
> = {
  fpu: {
    title: "Regulatory streams",
    description:
      "Livestock, plant and warehouse, seed, and agrochemical inspection (§1.2).",
  },
  rlu: {
    title: "Licensing categories",
    description:
      "Licensing overview and category performance (§2.2).",
  },
  imu: {
    title: "Surveillance",
    description:
      "Product surveillance, decisions, and cross-cutting compliance (§3.2).",
  },
  iiu: {
    title: "Product categories",
    description:
      "Document review, physical inspection, sampling, and import distribution (§4.2).",
  },
};
