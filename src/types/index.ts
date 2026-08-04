export type StreamKey =
  | "seed"
  | "slaughterhouse"
  | "agrochemical"
  | "seed-producer";

export type UserRole = "inspector" | "director" | "senior-director";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  title: string;
};

export type NavIcon =
  | "dashboard"
  | "seed"
  | "slaughterhouse"
  | "agrochemical"
  | "producer"
  | "reports"
  | "users"
  | "building";

export type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
  icon?: NavIcon;
};

export type StreamNavItem = NavItem & {
  id: StreamKey;
  formCode: string;
  description: string;
};
