import type { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  glow?: "teal" | "violet" | "none";
};

export default function GlassCard({ children, className, glow = "none", ...props }: GlassCardProps) {
  return (
    <div 
      className={twMerge(
        "card-clean p-6 bg-white border border-[#0B3D5F]/10 rounded-2xl shadow-xs hover:border-[#1F8A8A]/40 transition-all",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
