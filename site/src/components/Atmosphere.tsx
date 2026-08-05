"use client";

import { useEffect, useState } from "react";

/**
 * The ambient layer: drifting aurora light fields, film grain, the scroll
 * progress rail, and the custom cursor.
 *
 * All of it is decorative and marked aria-hidden. The cursor elements are
 * rendered but hidden by CSS on coarse pointers and under reduced-motion, so
 * MotionSystem can query them without a render-order race.
 */
export function Atmosphere() {
  return (
    <>
      <div className="aurora-field" aria-hidden="true">
        <span className="aurora-orb aurora-orb--1" />
        <span className="aurora-orb aurora-orb--2" />
        <span className="aurora-orb aurora-orb--3" />
        <span className="aurora-orb aurora-orb--4" />
      </div>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="scroll-rail" aria-hidden="true"><div className="scroll-rail__fill" /></div>
      <div className="lux-cursor" aria-hidden="true" />
      <div className="lux-cursor__dot" aria-hidden="true" />
    </>
  );
}

/**
 * First-paint curtain. Deliberately time-driven rather than gated on a load
 * event or an animation callback: in a throttled/background tab those can
 * never fire, and a preloader that never dismisses is a dead site. Worst
 * case here is the curtain lifting slightly early.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Reduced motion dismisses immediately, but still via the timer rather
    // than a direct setState in the effect body.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setDone(true), reduce ? 0 : 1050);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!done) return;
    const timer = window.setTimeout(() => {
      document.querySelector(".preloader")?.remove();
    }, 900);
    return () => window.clearTimeout(timer);
  }, [done]);

  return (
    <div className="preloader" data-done={done} aria-hidden="true">
      <div className="preloader__mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/preventa-ai-symbol.png" alt="" width={64} height={70} />
        <div className="preloader__bar"><i /></div>
        <span className="preloader__word">Preventa AI</span>
      </div>
    </div>
  );
}
