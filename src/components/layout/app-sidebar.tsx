"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Activity,
  Beaker,
  Beef,
  Building2,
  ChevronDown,
  ClipboardCheck,
  Droplets,
  Warehouse,
  LayoutDashboard,
  FileBarChart,
  Layers,
  MapPin,
  Store,
  Truck,
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
  butchery: Beef,
  "meat-carrier": Truck,
  warehouse: Warehouse,
  facilities: Store,
  activity: Activity,
  reports: FileBarChart,
  users: Users,
  building: Building2,
  map: MapPin,
  layers: Layers,
};

type AppSidebarProps = {
  items: NavItem[];
  portalLabel: string;
  collapsed?: boolean;
  onNavigate?: () => void;
};

function isActivePath(pathname: string, href: string, homeHref: string) {
  if (href === homeHref) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function itemOrDescendantActive(
  item: NavItem,
  pathname: string,
  homeHref: string,
): boolean {
  if (isActivePath(pathname, item.href, homeHref)) return true;
  return (item.children ?? []).some((child) =>
    itemOrDescendantActive(child, pathname, homeHref),
  );
}

function flattenNavLeaves(items: NavItem[]): NavItem[] {
  return items.flatMap((item) =>
    item.children?.length ? flattenNavLeaves(item.children) : [item],
  );
}

function NavLink({
  item,
  active,
  collapsed,
  onNavigate,
  nested = false,
  depth = 0,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
  nested?: boolean;
  depth?: number;
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
        nested && !collapsed && (depth >= 2 ? "py-1.5 pl-14" : "py-2 pl-10"),
        active
          ? "bg-accent-soft text-accent-soft-foreground"
          : "text-muted hover:bg-default hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "size-[18px] shrink-0",
          nested && "size-4",
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

function NavGroup({
  item,
  pathname,
  homeHref,
  collapsed,
  onNavigate,
  depth = 0,
  open: openControlled,
  onOpenChange,
}: {
  item: NavItem;
  pathname: string;
  homeHref: string;
  collapsed: boolean;
  onNavigate?: () => void;
  depth?: number;
  /** When set, this group is controlled by a parent accordion. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const children = item.children ?? [];
  const childActive = itemOrDescendantActive(item, pathname, homeHref);
  const [openUncontrolled, setOpenUncontrolled] = useState(childActive);
  const open = openControlled ?? openUncontrolled;
  const setOpen = onOpenChange ?? setOpenUncontrolled;
  const Icon = iconMap[item.icon ?? "layers"] ?? Layers;

  const nestedGroups = children.filter((child) => child.children?.length);
  const expandOnly = nestedGroups.length === 0;
  const activeNestedHref =
    nestedGroups.find((child) =>
      itemOrDescendantActive(child, pathname, homeHref),
    )?.href ?? null;
  const [openNestedHref, setOpenNestedHref] = useState<string | null>(
    activeNestedHref,
  );

  // Keep this group's own accordion state in sync with the route.
  // Only update local state here — calling a parent's onOpenChange during
  // render is illegal (Cannot update NavGroup while rendering NavGroup).
  const [syncedPathname, setSyncedPathname] = useState(pathname);
  if (syncedPathname !== pathname) {
    setSyncedPathname(pathname);
    if (openControlled === undefined) setOpenUncontrolled(childActive);
    setOpenNestedHref(activeNestedHref);
  }

  if (collapsed) {
    return (
      <div className="flex flex-col gap-1">
        {flattenNavLeaves(children).map((child) => (
          <NavLink
            key={child.href}
            item={child}
            active={isActivePath(pathname, child.href, homeHref)}
            collapsed
            onNavigate={onNavigate}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      <div
        className={cn(
          "group relative flex w-full items-center text-sm font-medium transition-colors",
          depth >= 1 && "pl-7",
          childActive || open
            ? "bg-accent-soft/60 text-accent-soft-foreground"
            : "text-muted hover:bg-default hover:text-foreground",
        )}
      >
        {expandOnly ? (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={cn(
              "flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-left",
              depth >= 1 && "py-2",
            )}
          >
            <Icon
              className={cn(
                "size-[18px] shrink-0",
                depth >= 1 && "size-4",
                childActive
                  ? "text-accent"
                  : "text-muted group-hover:text-foreground",
              )}
            />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-muted transition-transform",
                open && "rotate-180",
              )}
            />
          </button>
        ) : (
          <>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-left",
                depth >= 1 && "py-2",
              )}
            >
              <Icon
                className={cn(
                  "size-[18px] shrink-0",
                  depth >= 1 && "size-4",
                  childActive
                    ? "text-accent"
                    : "text-muted group-hover:text-foreground",
                )}
              />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
              onClick={() => setOpen(!open)}
              className="px-3 py-2.5 text-muted hover:text-foreground"
            >
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 transition-transform",
                  open && "rotate-180",
                )}
              />
            </button>
          </>
        )}
      </div>
      {open ? (
        <div className="flex flex-col gap-0.5 pb-1">
          {children.map((child) =>
            child.children?.length ? (
              <NavGroup
                key={child.href}
                item={child}
                pathname={pathname}
                homeHref={homeHref}
                collapsed={false}
                onNavigate={onNavigate}
                depth={depth + 1}
                open={openNestedHref === child.href}
                onOpenChange={(nextOpen) =>
                  setOpenNestedHref(nextOpen ? child.href : null)
                }
              />
            ) : (
              <NavLink
                key={child.href}
                item={child}
                active={pathname === child.href}
                collapsed={false}
                nested
                depth={depth + 1}
                onNavigate={onNavigate}
              />
            ),
          )}
        </div>
      ) : null}
    </div>
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
          if (item.children?.length) {
            return (
              <NavGroup
                key={item.href}
                item={item}
                pathname={pathname}
                homeHref={homeHref}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            );
          }

          return (
            <NavLink
              key={item.href}
              item={item}
              active={isActivePath(pathname, item.href, homeHref)}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          );
        })}
      </nav>
    </aside>
  );
}
