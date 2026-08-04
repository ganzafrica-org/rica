"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Beaker,
  Building2,
  ClipboardCheck,
  Droplets,
  LayoutDashboard,
  FileBarChart,
  Users,
} from "lucide-react";
import { Tooltip } from "@heroui/react";
import { cn } from "@/lib/utils";
import { appName } from "@/lib/constants";
import type { NavIcon, NavItem } from "@/types";

const iconMap: Record<NavIcon, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  seed: Droplets,
  slaughterhouse: Building2,
  agrochemical: Beaker,
  producer: ClipboardCheck,
  reports: FileBarChart,
  users: Users,
  building: Building2,
};

type AppSidebarProps = {
  items: NavItem[];
  portalLabel: string;
  collapsed?: boolean;
  onNavigate?: () => void;
};

function NavLink({
  item,
  active,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const Icon = iconMap[item.icon ?? "dashboard"] ?? LayoutDashboard;

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-label={item.label}
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
        collapsed && "justify-center px-0",
        active
          ? "bg-accent-soft text-accent-soft-foreground"
          : "text-muted hover:bg-default hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "size-[18px] shrink-0",
          active ? "text-accent" : "text-muted group-hover:text-foreground",
        )}
      />
      {!collapsed ? <span className="truncate">{item.label}</span> : null}
      {active ? (
        <span className="absolute inset-y-2 right-0 w-1 bg-accent" />
      ) : null}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip delay={150}>
      <Tooltip.Trigger className="w-full">{link}</Tooltip.Trigger>
      <Tooltip.Content className="rounded-none" placement="right">
        {item.label}
      </Tooltip.Content>
    </Tooltip>
  );
}

export function AppSidebar({
  items,
  portalLabel,
  collapsed = false,
  onNavigate,
}: AppSidebarProps) {
  const pathname = usePathname();
  const homeHref = items[0]?.href ?? "/";

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-sidebar transition-[width] duration-200",
        collapsed
          ? "w-[var(--sidebar-width-collapsed)]"
          : "w-[var(--sidebar-width)]",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-border",
          collapsed ? "justify-center px-2" : "gap-2.5 px-3",
        )}
      >
        <div className="flex size-8 shrink-0 items-center justify-center bg-accent text-sm font-bold text-accent-foreground">
          R
        </div>
        {!collapsed ? (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-foreground">
              {appName}
            </p>
            <p className="truncate text-[11px] text-muted">{portalLabel}</p>
          </div>
        ) : null}
      </div>

      <nav
        className={cn(
          "flex flex-1 flex-col gap-1 py-4",
          collapsed ? "px-2" : "px-3",
        )}
      >
        {items.map((item) => {
          const active =
            item.href === homeHref
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <NavLink
              key={item.href}
              item={item}
              active={active}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          );
        })}
      </nav>
    </aside>
  );
}
