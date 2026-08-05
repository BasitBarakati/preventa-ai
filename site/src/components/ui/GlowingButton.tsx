"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "quiet";
  /** Opt into the cursor-magnetism effect wired up in MotionSystem. */
  "data-magnetic"?: boolean | "";
};

export default function GlowingButton({ children, href, variant = "primary", className, ...props }: Props) {
  const classes = twMerge("glow-button", `glow-button--${variant}`, className);
  // The link branch forwards data-* hooks too — without this, data-magnetic
  // silently vanished on every href variant, which is most buttons on the site.
  // Only data-* is forwarded: button event handlers are not anchor-compatible.
  if (href) {
    const dataProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => key.startsWith("data-")),
    );
    return <Link href={href} prefetch={false} className={classes} {...dataProps}>{children}</Link>;
  }
  return <button className={classes} {...props}>{children}</button>;
}
