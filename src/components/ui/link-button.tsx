"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@heroui/react";

type LinkButtonProps = Omit<ButtonProps, "render"> & {
  href: string;
};

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
  return (
    <Button
      {...props}
      render={(domProps) => {
        const linkProps = domProps as unknown as React.ComponentProps<
          typeof Link
        >;
        return <Link {...linkProps} href={href} />;
      }}
    >
      {children}
    </Button>
  );
}
