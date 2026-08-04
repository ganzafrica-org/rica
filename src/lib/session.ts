import { cookies } from "next/headers";
import { getUserById, SESSION_COOKIE } from "@/lib/auth";
import type { AuthUser } from "@/types";

export async function getSessionUser(): Promise<AuthUser | null> {
  const store = await cookies();
  const userId = store.get(SESSION_COOKIE)?.value;
  if (!userId) return null;
  return getUserById(userId) ?? null;
}
