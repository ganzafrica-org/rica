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
          href: "/director/streams/seed",
          label: "Seed Inspection",
          shortLabel: "Seed",
          icon: "seed",
        },
        {
          href: "/director/streams/slaughterhouse",
          label: "Slaughterhouse",
          shortLabel: "Slaughter",
          icon: "slaughterhouse",
        },
        {
          href: "/director/streams/agrochemical",
          label: "Agrochemical",
          shortLabel: "Agrochem",
          icon: "agrochemical",
        },
        {
          href: "/director/streams/seed-producer",
          label: "Seed Producer",
          shortLabel: "Producer",
          icon: "producer",
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
      ],
    },
  ],
  ccpu: [
    { href: "/director", label: "Dashboard", icon: "dashboard" },
    { href: "/director/team", label: "Team", icon: "users" },
    { href: "/director/streams", label: "Cases", icon: "layers" },
  ],
};

export const directorStreamLabels: Record<
  "seed" | "slaughterhouse" | "agrochemical" | "seed-producer",
  string
> = {
  seed: "Seed Inspection & Certification",
  slaughterhouse: "Slaughterhouse Inspection",
  agrochemical: "Agrochemical Dealership Licensing",
  "seed-producer": "Seed Producer Onsite Verification",
};

export const directorStreamIds = [
  "seed",
  "slaughterhouse",
  "agrochemical",
  "seed-producer",
] as const;

export type DirectorStreamId = (typeof directorStreamIds)[number];

export function isDirectorStreamId(value: string): value is DirectorStreamId {
  return (directorStreamIds as readonly string[]).includes(value);
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

export const navByRole: Record<UserRole, NavItem[]> = {
  director: directorNav,
};

export function getDirectorNav(unit?: BusinessUnitKey): NavItem[] {
  return directorNavByUnit[unit ?? "fpu"];
}

export function getNavForUser(user: {
  role: UserRole;
  unit?: BusinessUnitKey;
}): NavItem[] {
  return getDirectorNav(user.unit);
}

export const streamPageCopy: Record<
  BusinessUnitKey,
  { title: string; description: string }
> = {
  fpu: {
    title: "Regulatory streams",
    description:
      "Seed, slaughterhouse, agrochemical, and seed-producer performance (§1.2).",
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
  ccpu: {
    title: "Cases & activities",
    description:
      "Unit-specific KPIs pending checklist and dataset (§5.2).",
  },
};
