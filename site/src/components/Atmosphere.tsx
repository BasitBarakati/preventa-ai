"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties } from "react";

const LuxuryEmblemScene = dynamic(() => import("./LuxuryEmblemScene"), { ssr: false });

/**
 * The ambient layer: drifting aurora light fields, film grain, the
 * cursor-reactive spotlight, the scroll progress rail, and the custom
 * cursor (ring, dot, a two-point trail, and a contextual label).
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
      <div className="cursor-spotlight" aria-hidden="true" />
      <div className="scroll-rail" aria-hidden="true"><div className="scroll-rail__fill" /></div>
      <div className="lux-cursor" aria-hidden="true" />
      <div className="lux-cursor__dot" aria-hidden="true" />
      <div className="lux-cursor__trail lux-cursor__trail--1" aria-hidden="true" />
      <div className="lux-cursor__trail lux-cursor__trail--2" aria-hidden="true" />
      <span className="lux-cursor__label" aria-hidden="true" />
    </>
  );
}

/**
 * First-paint curtain — a full-bleed port of the uploaded "Luxury 3D Emblem"
 * design (see LuxuryEmblemScene.tsx) with the brand wordmark overlaid, and a
 * two-panel split exit rather than a flat fade.
 *
 * The WebGL scene is dynamically imported (ssr:false) so it never blocks the
 * very first paint: the dark curtain, vignette, and brand text are plain CSS
 * and show instantly, then the canvas fades in once its chunk is ready.
 * Dismissal stays deliberately time-driven rather than gated on a load event
 * or an animation callback: in a throttled/background tab those can never
 * fire, and a preloader that never dismisses is a dead site. DURATION is
 * long enough to let the heavier scene actually paint at least one frame
 * before the curtain lifts.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const DURATION = 2400;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduceMotion(reduce);
    if (reduce) {
      setDone(true);
      return;
    }
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const pct = Math.min(1, (now - start) / DURATION);
      setProgress(pct);
      if (pct < 1) frame = requestAnimationFrame(tick);
      else setDone(true);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!done) return;
    // Lets the sitewide ecosystem backdrop (its own, separate WebGL
    // context) know it's clear to mount — see EcosystemScene.tsx.
    window.dispatchEvent(new CustomEvent("preventa:preloader-done"));
    const timer = window.setTimeout(() => {
      document.querySelector(".preloader")?.remove();
    }, 900);
    return () => window.clearTimeout(timer);
  }, [done]);

  const pct = Math.round(progress * 100);

  return (
    <div className="preloader" data-done={done} aria-hidden="true">
      <span className="preloader__panel preloader__panel--left" />
      <span className="preloader__panel preloader__panel--right" />
      {!reduceMotion && !done && (
        <div className="preloader__canvas">
          <LuxuryEmblemScene />
        </div>
      )}
      <div className="preloader__vignette" />
      <div className="preloader__stage">
        <div className="preloader__mark">
          <span className="preloader__mark-glow" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/preventa-ai-symbol.png" alt="" width={64} height={70} />
        </div>
        <span className="preloader__word">
          {"PREVENTA AI".split("").map((ch, i) => (
            <i key={i} style={{ "--d": `${i * 28}ms` } as CSSProperties}>{ch === " " ? " " : ch}</i>
          ))}
        </span>
        <span className="preloader__tagline">Responsible AI for Public Health</span>
        <span className="preloader__pct">{pct}%</span>
      </div>
    </div>
  );
}
