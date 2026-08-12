"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import type { AuthUser, NavItem } from "@/types";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
  navItems: NavItem[];
  portalLabel: string;
  user: AuthUser;
};

export function AppShell({
  children,
  navItems,
  portalLabel,
  user,
}: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const title =
    navItems.find((item) =>
      item.href === navItems[0]?.href
        ? pathname === item.href
        : pathname === item.href || pathname.startsWith(`${item.href}/`),
    )?.label ?? "Dashboard";

  const desktopWidth = collapsed
    ? "lg:w-[var(--sidebar-width-collapsed)]"
    : "lg:w-[var(--sidebar-width)]";

  const desktopPadding = collapsed
    ? "lg:pl-[var(--sidebar-width-collapsed)]"
    : "lg:pl-[var(--sidebar-width)]";

  return (
    <div className="flex min-h-screen bg-background">
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:flex lg:transition-[width] lg:duration-300 lg:ease-[cubic-bezier(0.22,1,0.36,1)]",
          desktopWidth,
        )}
      >
        <AppSidebar
          collapsed={collapsed}
          items={navItems}
          portalLabel={portalLabel}
        />
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/30"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <AppSidebar
                items={navItems}
                portalLabel={portalLabel}
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          desktopPadding,
        )}
      >
        <AppNavbar
          title={title}
          user={user}
          collapsed={collapsed}
          onMenuPress={() => setMobileOpen(true)}
          onToggleCollapse={() => setCollapsed((value) => !value)}
        />
        <main className="app-body flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
