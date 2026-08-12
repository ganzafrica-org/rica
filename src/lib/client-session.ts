import { SESSION_COOKIE } from "@/lib/auth";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/** Demo session cookie — readable by the edge proxy (frontend-only auth). */
export function setSessionCookie(userId: string) {
  document.cookie = [
    `${SESSION_COOKIE}=${userId}`,
    "path=/",
    "SameSite=Lax",
    `max-age=${SESSION_MAX_AGE_SECONDS}`,
  ].join("; ");
}

export function clearSessionCookie() {
  document.cookie = [
    `${SESSION_COOKIE}=`,
    "path=/",
    "SameSite=Lax",
    "max-age=0",
    "expires=Thu, 01 Jan 1970 00:00:00 GMT",
  ].join("; ");
}
