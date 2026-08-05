import type { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  glow?: "teal" | "violet" | "none";
};

export default function GlassCard({ children, className, glow = "none", ...props }: GlassCardProps) {
  return (
    <div className={twMerge("glass-card", glow !== "none" && `glass-card--${glow}`, className)} {...props}>
      {children}
    </div>
  );
}
