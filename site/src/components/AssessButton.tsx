"use client";

import type { ReactNode } from "react";
import { openAssessment } from "./modalEvents";

/** Client-side trigger for the global assessment modal — lets Server
 *  Component pages (which can't hold onClick handlers) drop in a CTA. */
export default function AssessButton({
  detail,
  className,
  children,
}: {
  detail?: Record<string, string>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button onClick={() => openAssessment(detail)} className={className}>
      {children}
    </button>
  );
}
