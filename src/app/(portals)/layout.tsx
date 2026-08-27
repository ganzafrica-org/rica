import { AppShell } from "@/components/layout/app-shell";
import { AuthProvider } from "@/components/auth/auth-provider";
import { getNavForUser } from "@/data/navigation";
import { getPortalLabel } from "@/lib/auth";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function PortalsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser();

  if (!user) {
    return children;
  }

  return (
    <AuthProvider user={user}>
      <AppShell
        navItems={getNavForUser(user)}
        portalLabel={getPortalLabel(user)}
        user={user}
      >
        {children}
      </AppShell>
    </AuthProvider>
  );
}
