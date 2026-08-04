import { AppShell } from "@/components/layout/app-shell";
import { AuthProvider } from "@/components/auth/auth-provider";
import { navByRole } from "@/data/navigation";
import { rolePortalLabel } from "@/lib/auth";
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
        navItems={navByRole[user.role]}
        portalLabel={rolePortalLabel[user.role]}
        user={user}
      >
        {children}
      </AppShell>
    </AuthProvider>
  );
}
