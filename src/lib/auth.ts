import { demoPassword, demoUsers } from "@/data/users";
import { businessUnits } from "@/data/units";
import type { AuthUser, UserRole } from "@/types";

export const SESSION_COOKIE = "rica_session";

export const roleHomePath: Record<UserRole, string> = {
  director: "/director",
};

export const rolePortalLabel: Record<UserRole, string> = {
  director: "Director portal",
};

export function getPortalLabel(user: AuthUser): string {
  if (user.unit) {
    const unit = businessUnits[user.unit];
    return `Director · ${unit.shortName}`;
  }
  return rolePortalLabel[user.role];
}

export const rolePathPrefix: Record<UserRole, string> = {
  director: "/director",
};

export function getUserById(id: string): AuthUser | undefined {
  return demoUsers.find((user) => user.id === id);
}

export function getUserByEmail(email: string): AuthUser | undefined {
  const normalized = email.trim().toLowerCase();
  return demoUsers.find((user) => user.email.toLowerCase() === normalized);
}

export function authenticate(
  email: string,
  password: string,
): AuthUser | null {
  if (password !== demoPassword) return null;
  return getUserByEmail(email) ?? null;
}

export function getRoleFromPath(pathname: string): UserRole | null {
  if (pathname === "/director" || pathname.startsWith("/director/")) {
    return "director";
  }
  return null;
}
