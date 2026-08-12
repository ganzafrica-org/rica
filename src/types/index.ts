export type StreamKey =
  | "seed"
  | "slaughterhouse"
  | "agrochemical"
  | "seed-producer";

export type BusinessUnitKey = "fpu" | "rlu" | "imu" | "iiu" | "ccpu";

export type UserRole = "director";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  title: string;
  /** Unit assignment — directors only see their unit. */
  unit?: BusinessUnitKey;
};

export type NavIcon =
  | "dashboard"
  | "seed"
  | "slaughterhouse"
  | "agrochemical"
  | "producer"
  | "reports"
  | "users"
  | "building"
  | "map"
  | "layers";

export type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
  icon?: NavIcon;
  /** Nested sidebar items (dropdown group). */
  children?: NavItem[];
};
