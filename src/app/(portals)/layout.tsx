import { AppShell } from "@/components/layout/app-shell";
import { AuthProvider } from "@/components/auth/auth-provider";
import { navForUser } from "@/data/navigation";
import { unitPortalLabel } from "@/lib/auth";
import { getSessionUser } from "@/lib/session";

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
        navItems={navForUser(user)}
        portalLabel={unitPortalLabel(user)}
        user={user}
      >
        {children}
      </AppShell>
    </AuthProvider>
  );
}
