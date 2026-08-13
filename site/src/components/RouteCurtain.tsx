"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

type Phase = "idle" | "covered" | "revealing";

/**
 * A page-transition sweep, not a loading gate.
 *
 * By the time any effect in a persistent layout component can react to a
 * pathname change, Next.js has already committed the new route's content —
 * there is no "before navigation" hook to hang a cover animation on without
 * intercepting every link click and manually delaying router.push, which
 * risks breaking modifier-clicks, new-tab, and prefetch behavior for a
 * cosmetic effect. So this only ever reveals: useLayoutEffect covers the
 * screen synchronously, before the browser paints the new page's raw
 * content, then a couple of animation frames later lifts away to reveal
 * what's already fully rendered underneath. Nothing here can add latency —
 * the content was never waiting on it.
 */
export default function RouteCurtain() {
  const pathname = usePathname();
  const hasNavigated = useRef(false);
  const [phase, setPhase] = useState<Phase>("idle");

  useLayoutEffect(() => {
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Must land before the browser's next paint, or the raw new page shows
    // for a frame first — same justification as Atmosphere.tsx's Preloader.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase("covered");
    let reveal = 0;
    reveal = requestAnimationFrame(() => {
      reveal = requestAnimationFrame(() => setPhase("revealing"));
    });
    const clear = window.setTimeout(() => setPhase("idle"), 700);
    return () => {
      cancelAnimationFrame(reveal);
      window.clearTimeout(clear);
    };
  }, [pathname]);

  return <div className="route-curtain" data-phase={phase} aria-hidden="true" />;
}
