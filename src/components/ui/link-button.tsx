"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function LinkButton({ href, children, className }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90",
        className,
      )}
    >
      {children}
    </Link>
  );
}
