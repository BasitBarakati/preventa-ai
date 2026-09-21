"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "quiet";
  "data-magnetic"?: boolean | "";
};

export default function GlowingButton({ children, href, variant = "primary", className, ...props }: Props) {
  const baseClass = variant === "secondary" 
    ? "btn-secondary" 
    : variant === "quiet" 
      ? "inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3D5F] hover:text-[#1F8A8A] transition-colors" 
      : "btn-primary";
      
  const classes = twMerge(baseClass, className);
  
  if (href) {
    const dataProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => key.startsWith("data-")),
    );
    return <Link href={href} prefetch={false} className={classes} {...dataProps}>{children}</Link>;
  }
  return <button className={classes} {...props}>{children}</button>;
}
