"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { LogoIcon } from "./Logo";
import { usePrefersReducedMotion } from "./motion";

/**
 * Curtain-wipe between routes (currently `/` ↔ `/seven-fires`, and any
 * future route) — reuses the preloader's warm-white curtain + brandmark so
 * a page change feels like one continuous piece rather than a hard cut.
 * Intercepts same-tab clicks on internal links, plays the wipe in, pushes
 * the route, then lifts the curtain once the new route has mounted. Skips
 * entirely under prefers-reduced-motion, falling back to instant native
 * navigation.
 */
export default function RouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const curtainRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const prevPath = useRef(pathname);
  const navigating = useRef(false);

  /* lift the curtain once the new route has actually rendered */
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    if (reduced || !curtainRef.current) return;
    gsap.to(curtainRef.current, { yPercent: -100, duration: 0.7, ease: "power3.inOut", delay: 0.05 });
  }, [pathname, reduced]);

  useEffect(() => {
    if (reduced) return;
    const WIPE_MS = 550;
    const onClick = (e: MouseEvent) => {
      if (navigating.current || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      if (a.target && a.target !== "_self") return;
      const url = new URL(href, window.location.origin);
      if (url.pathname === pathname) return; // in-page anchor — let Lenis handle it

      e.preventDefault();
      navigating.current = true;
      const curtain = curtainRef.current;
      /* Navigation is timer-driven, not gated on the tween's onComplete —
         a backgrounded/throttled tab can suspend requestAnimationFrame
         entirely (GSAP's ticker rides on it), and a route change must
         never hang on a decorative animation. The tween is fire-and-forget
         for whichever tabs actually render it. */
      if (curtain) gsap.fromTo(curtain, { yPercent: 100 }, { yPercent: 0, duration: WIPE_MS / 1000, ease: "power3.inOut" });
      window.setTimeout(() => {
        router.push(href);
        navigating.current = false;
      }, curtain ? WIPE_MS : 0);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, reduced, router]);

  if (reduced) return null;

  return (
    <div
      ref={curtainRef}
      className="pointer-events-none fixed inset-0 z-[95] grid translate-y-full place-items-center bg-cream"
      aria-hidden="true"
    >
      <LogoIcon size={56} />
    </div>
  );
}
