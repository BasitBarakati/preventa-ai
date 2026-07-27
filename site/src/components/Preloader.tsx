"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoIcon } from "./Logo";
import { usePrefersReducedMotion } from "./motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const LETTERS = ["P", "H", "R", "O", "N", "E", "S", "I", "S"];

/**
 * Cinematic splash — warm-white stage, the brain-tree mark settles in,
 * P·H·R·O·N·E·S·I·S rises letter by letter behind a drawing hairline,
 * then the curtain lifts and `phronesis:ready` fires so the hero choreography
 * begins in perfect sync. Skipped entirely under prefers-reduced-motion.
 */
export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      window.dispatchEvent(new Event("phronesis:ready"));
      return;
    }

    document.body.classList.add("preload-lock");
    let finished = false;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(new Event("phronesis:ready"));
          gsap.to(rootRef.current, {
            yPercent: -100,
            duration: 0.95,
            ease: "power4.inOut",
            onComplete: () => {
              finished = true;
              document.body.classList.remove("preload-lock");
              setGone(true);
              /* re-measure pins/triggers now that the curtain is gone */
              requestAnimationFrame(() => ScrollTrigger.refresh());
            },
          });
        },
      });
      tl.from(".pl-mark", { scale: 0.82, opacity: 0, duration: 1.1, ease: "back.out(1.15)" }, 0.1);
      tl.from(
        ".pl-letter",
        { yPercent: 125, opacity: 0, duration: 0.7, ease: "power4.out", stagger: 0.055 },
        0.35,
      );
      tl.from(".pl-tag", { opacity: 0, y: 10, duration: 0.6, ease: "power2.out" }, 0.9);
      tl.to(".pl-bar", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.3);
      tl.to({}, { duration: 0.3 }); /* hold the composition a beat */
    }, rootRef);

    return () => {
      ctx.revert();
      if (!finished) document.body.classList.remove("preload-lock");
    };
  }, [reduced]);

  if (gone || reduced) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] grid place-items-center bg-cream"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center">
        <span className="pl-mark">
          <LogoIcon size={64} />
        </span>

        <div className="mt-6 flex items-baseline gap-[0.18em]" aria-hidden="true">
          {LETTERS.map((l, i) => (
            <span key={`${l}-${i}`} className="mask-line">
              <span
                className="pl-letter inline-block font-display text-[clamp(1.6rem,5vw,2.6rem)] font-semibold will-change-transform"
                style={{ color: ["#0B3D5F", "#1F8A8A", "#7FB069", "#E8A87C", "#C38D6B"][i % 5] }}
              >
                {l}
              </span>
            </span>
          ))}
        </div>

        <p className="pl-tag mt-3 font-mono text-[10px] uppercase tracking-[0.34em] text-ink/45">
          practical wisdom · loading
        </p>

        <div className="mt-6 h-[2px] w-44 overflow-hidden rounded-full bg-ocean/10">
          <div className="pl-bar h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-teal via-sage to-amber" />
        </div>
      </div>
    </div>
  );
}
