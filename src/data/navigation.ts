import type { AuthUser, NavItem, StreamNavItem, UserRole } from "@/types";

/**
 * Services are filters on the dashboard rather than routes, so the inspector
 * sidebar is the same for every unit.
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

export const directorNav: NavItem[] = [
  { href: "/director", label: "Dashboard", icon: "dashboard" },
  { href: "/director/inspectors", label: "Inspectors", icon: "users" },
  { href: "/director/streams", label: "Streams", icon: "seed" },
  { href: "/director/reports", label: "Reports", icon: "reports" },
];

export const seniorDirectorNav: NavItem[] = [
  { href: "/senior-director", label: "Dashboard", icon: "dashboard" },
  {
    href: "/senior-director/units",
    label: "Units",
    icon: "building",
  },
  {
    href: "/senior-director/inspectors",
    label: "Inspectors",
    icon: "users",
  },
  { href: "/senior-director/reports", label: "Reports", icon: "reports" },
];

export const navByRole: Record<UserRole, NavItem[]> = {
  inspector: inspectorNav,
  director: directorNav,
  "senior-director": seniorDirectorNav,
};

/** Nav for the signed-in user. Unit-aware once units differ in structure. */
export function navForUser(user: AuthUser): NavItem[] {
  return navByRole[user.role];
}

/** @deprecated Prefer role-specific nav via navForUser */
export const mainNav = inspectorNav;

/** @deprecated Superseded by the unit registry in `@/data/units`. */
export const streams: StreamNavItem[] = [
  {
    id: "seed",
    href: "/inspector/streams/seed-inspection",
    label: "Seed Inspection & Certification",
    formCode: "FPU-FRM-013",
    description: "Field visits tracked across growth stages",
    icon: "seed",
  },
  {
    id: "slaughterhouse",
    href: "/inspector/streams/slaughterhouse",
    label: "Slaughterhouse Inspection",
    formCode: "FPU-FRM-007",
    description: "Small-size slaughterhouse checklist",
    icon: "slaughterhouse",
  },
  {
    id: "agrochemical",
    href: "/inspector/streams/agrochemical",
    label: "Agrochemical Dealership Licensing",
    formCode: "FPU-FRM-099",
    description: "Dealer premises checklist",
    icon: "agrochemical",
  },
  {
    id: "seed-producer",
    href: "/inspector/streams/seed-producer",
    label: "Seed Producer Onsite Verification",
    formCode: "FPU-FRM-087",
    description: "Producer premises checklist",
    icon: "producer",
  },
];
