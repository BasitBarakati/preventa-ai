"use client";

import { useEffect, useRef } from "react";

const PRINCIPLES = [
  "Human-led · AI-assisted",
  "Evidence-informed",
  "Community-validated",
  "Equity by default",
  "Privacy by design",
  "Strengths-based",
  "Ottawa Charter aligned",
  "OCAP® principles",
];

function Row({ dim = false, reverse = false, interactive = false }: { dim?: boolean; reverse?: boolean; interactive?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Hover-scrub — drag/hover position sets speed and direction via the
     Web Animations API's playbackRate, rather than the plain pause-on-hover
     most tickers settle for. Left of center reverses it, right accelerates
     it, center is the resting drift speed. */
  useEffect(() => {
    if (!interactive) return;
    const host = hostRef.current;
    const track = trackRef.current;
    if (!host || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = 1;
    let current = 1;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      target = 1 + px * 7;
    };
    const onLeave = () => {
      target = 1;
    };
    const tick = () => {
      current += (target - current) * 0.07;
      const anim = track.getAnimations()[0];
      if (anim) anim.playbackRate = current;
      raf = requestAnimationFrame(tick);
    };
    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
    };
  }, [interactive]);

  return (
    <div ref={hostRef} className={`relative z-10 overflow-hidden bg-ocean py-4 ${dim ? "opacity-45" : ""}`}>
      <div
        ref={trackRef}
        className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}
        style={{ animationDuration: dim ? "46s" : "30s" }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {PRINCIPLES.map((p) => (
              <span key={`${dup}-${p}`} className="flex items-center">
                <span className={`whitespace-nowrap px-6 font-mono uppercase tracking-[0.22em] text-cream/85 ${dim ? "text-[10px] font-medium" : "text-[12px] font-medium"}`}>
                  {p}
                </span>
                <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
                  <rect x="4.5" y="0" width="6.4" height="6.4" transform="rotate(45 4.5 0)" fill="#E8A87C" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Design-philosophy ticker — a quiet ledger of the principles the platform
 *  is built on. Two counter-scrolling rows for density; the top one scrubs
 *  speed/direction with the cursor, drag-strip style. */
export default function Marquee() {
  return (
    <div className="border-y border-ocean/10" aria-label="Phronesis design philosophy">
      <Row interactive />
      <Row reverse dim />
    </div>
  );
}
