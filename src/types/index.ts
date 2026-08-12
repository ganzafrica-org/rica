/** @deprecated Superseded by ServiceKey. Kept while the legacy stream routes exist. */
export type StreamKey =
  | "seed"
  | "slaughterhouse"
  | "agrochemical"
  | "seed-producer";

export type UserRole = "inspector" | "director" | "senior-director";

/** The five RICA organisational units. */
export type UnitKey =
  | "farm-products"
  | "registration-licensing"
  | "industries-market-surveillance"
  | "import-inspection"
  | "competition-consumer-protection";

/**
 * Services an inspector can work on, across all units. Flat rather than nested
 * per unit so a single key identifies itself globally.
 */
export type ServiceKey =
  | "seed"
  | "agrochemical"
  | "slaughterhouse"
  | "butchery"
  | "meat-carrier";

/** Rwanda's five provinces. */
export type ProvinceKey = "kigali" | "north" | "south" | "east" | "west";

/** Accent token used for chart series and KPI icons. */
export type AccentKey =
  | "seed"
  | "slaughterhouse"
  | "agrochemical"
  | "seed-producer"
  | "accent";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  title: string;
  unit: UnitKey;
  /** Seeds the default service filter. A preference, not an access restriction. */
  homeService?: ServiceKey;
  /** Alternate sign-in addresses that resolve to this account. */
  aliases?: string[];
};

export type NavIcon =
  | "dashboard"
  | "seed"
  | "slaughterhouse"
  | "agrochemical"
  | "producer"
  | "butchery"
  | "meat-carrier"
  | "facilities"
  | "activity"
  | "reports"
  | "users"
  | "building";

export type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
  icon?: NavIcon;
};

/** @deprecated Superseded by ServiceDefinition. */
export type StreamNavItem = NavItem & {
  id: StreamKey;
  formCode: string;
  description: string;
};

export type ServiceDefinition = {
  id: ServiceKey;
  label: string;
  shortLabel: string;
  formCode?: string;
  description?: string;
  icon: NavIcon;
  accent: AccentKey;
};

/** Dashboard sections, in the order the source spec lists them. */
export type DashboardSectionKey =
  | "workload"
  | "progress"
  | "facilities"
  | "compliance"
  | "activities"
  | "sampling"
  | "future-modules";

export type UnitDefinition = {
  id: UnitKey;
  label: string;
  shortLabel: string;
  icon: NavIcon;
  /** Empty for units with no service split. */
  services: ServiceDefinition[];
  /** Which sections this unit renders, in order. */
  sections: DashboardSectionKey[];
};
