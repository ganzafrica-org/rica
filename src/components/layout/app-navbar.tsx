"use client";

import {
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  UserRound,
} from "lucide-react";
import {
  Dropdown,
  IconChevronLeft,
  IconChevronRight,
  Label,
  Tooltip,
} from "@heroui/react";
import { useAuth } from "@/components/auth/auth-provider";
import { Avatar, Button } from "@/components/ui";
import type { AuthUser } from "@/types";

type AppNavbarProps = {
  title?: string;
  user: AuthUser;
  collapsed?: boolean;
  onMenuPress?: () => void;
  onToggleCollapse?: () => void;
};

export function AppNavbar({
  title = "Dashboard",
  user,
  collapsed = false,
  onMenuPress,
  onToggleCollapse,
}: AppNavbarProps) {
  const { logout } = useAuth();
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface pl-1 pr-4 sm:pl-1.5 sm:pr-6">
      <div className="flex min-w-0 items-center gap-2">
        <Button
          isIconOnly
          aria-label="Open menu"
          className="lg:hidden"
          variant="ghost"
          onPress={onMenuPress}
        >
          <Menu className="size-5" />
        </Button>

        {onToggleCollapse ? (
          <div className="hidden items-center gap-2 lg:flex">
            <Tooltip delay={150}>
              <Tooltip.Trigger>
                <Button
                  isIconOnly
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  size="sm"
                  variant="ghost"
                  onPress={onToggleCollapse}
                >
                  {collapsed ? (
                    <IconChevronRight className="size-4" />
                  ) : (
                    <IconChevronLeft className="size-4" />
                  )}
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content className="rounded-none">
                {collapsed ? "Expand sidebar" : "Collapse sidebar"}
              </Tooltip.Content>
            </Tooltip>
            <span className="h-5 w-px bg-border" aria-hidden />
          </div>
        ) : null}

        <h1 className="truncate text-base font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>

      <Dropdown>
        <Dropdown.Trigger
          aria-label="Open profile menu"
          className="flex shrink-0 items-center gap-2 py-1 pl-1 pr-2 transition-colors hover:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Avatar size="sm">
            <Avatar.Fallback className="bg-accent-soft text-xs font-semibold text-accent-soft-foreground">
              {initials}
            </Avatar.Fallback>
          </Avatar>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight text-foreground">
              {user.name}
            </p>
            <p className="text-[11px] leading-tight text-muted">{user.title}</p>
          </div>
          <ChevronDown className="hidden size-4 text-muted sm:block" />
        </Dropdown.Trigger>

        <Dropdown.Popover
          placement="bottom end"
          className="min-w-48 rounded-none border border-border bg-white p-1 shadow-lg"
        >
          <Dropdown.Menu
            onAction={(key) => {
              if (String(key) === "logout") {
                void logout();
              }
            }}
          >
            <Dropdown.Item id="profile" textValue="Profile" className="rounded-none gap-2.5">
              <UserRound className="size-4 shrink-0 text-muted" />
              <Label>Profile</Label>
            </Dropdown.Item>
            <Dropdown.Item id="setting" textValue="Setting" className="rounded-none gap-2.5">
              <Settings className="size-4 shrink-0 text-muted" />
              <Label>Setting</Label>
            </Dropdown.Item>
            <Dropdown.Item
              id="logout"
              textValue="Logout"
              variant="danger"
              className="rounded-none gap-2.5"
            >
              <LogOut className="size-4 shrink-0" />
              <Label>Logout</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </header>
  );
}
