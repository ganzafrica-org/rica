import { demoPassword, demoUsers } from "@/data/users";
import { getUnit } from "@/data/units";
import type { AuthUser, UserRole } from "@/types";

export const SESSION_COOKIE = "rica_session";

export const roleHomePath: Record<UserRole, string> = {
  inspector: "/inspector",
  director: "/director",
  "senior-director": "/senior-director",
};

export const rolePortalLabel: Record<UserRole, string> = {
  inspector: "Inspector portal",
  director: "Director portal",
  "senior-director": "Senior Director portal",
};

export const rolePathPrefix: Record<UserRole, string> = {
  inspector: "/inspector",
  director: "/director",
  "senior-director": "/senior-director",
};

export function getUserById(id: string): AuthUser | undefined {
  return demoUsers.find((user) => user.id === id);
}

export function getUserByEmail(email: string): AuthUser | undefined {
  const normalized = email.trim().toLowerCase();
  return demoUsers.find(
    (user) =>
      user.email.toLowerCase() === normalized ||
      user.aliases?.some((alias) => alias.toLowerCase() === normalized),
  );
}

/** Sidebar label — inspectors and directors are identified by their unit. */
export function unitPortalLabel(user: AuthUser): string {
  if (user.role === "senior-director") {
    return rolePortalLabel[user.role];
  }

  const unit = getUnit(user.unit);
  const roleWord = user.role === "director" ? "Director" : "Inspector";

  return `${roleWord} · ${unit.shortLabel}`;
}

export function authenticate(
  email: string,
  password: string,
): AuthUser | null {
  if (password !== demoPassword) return null;
  return getUserByEmail(email) ?? null;
}

export function getRoleFromPath(pathname: string): UserRole | null {
  if (pathname === "/inspector" || pathname.startsWith("/inspector/")) {
    return "inspector";
  }
  if (pathname === "/director" || pathname.startsWith("/director/")) {
    return "director";
  }
  if (
    pathname === "/senior-director" ||
    pathname.startsWith("/senior-director/")
  ) {
    return "senior-director";
  }
  return null;
}
