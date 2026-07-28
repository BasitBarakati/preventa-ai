"use client";

import { PHRONESIS_LETTERS } from "./pillars-data";
import { usePrefersReducedMotion } from "./motion";

type Shell = { name: string; rMobile: number; rDesktop: number; duration: number; dir: 1 | -1 };

const SHELLS: Shell[] = [
  { name: "a", rMobile: 78, rDesktop: 150, duration: 42, dir: 1 },
  { name: "b", rMobile: 104, rDesktop: 195, duration: 58, dir: -1 },
  { name: "c", rMobile: 130, rDesktop: 240, duration: 74, dir: 1 },
];

/** Traces a full circle as a sequence of translate() waypoints — the node
 *  itself is never rotated, so its content (the letter, the tooltip) never
 *  needs a counter-rotation to stay upright. */
function buildCircleKeyframes(name: string, radius: number, dir: 1 | -1, steps = 24): string {
  const stops: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const pct = ((i / steps) * 100).toFixed(3);
    const a = dir * (i / steps) * Math.PI * 2;
    const x = (Math.cos(a) * radius).toFixed(1);
    const y = (Math.sin(a) * radius).toFixed(1);
    stops.push(`${pct}%{transform:translate(${x}px,${y}px)}`);
  }
  return `@keyframes ${name}{${stops.join("")}}`;
}

const KEYFRAMES_CSS = SHELLS.map(
  (s) => buildCircleKeyframes(`orbit-${s.name}`, s.rMobile, s.dir) + buildCircleKeyframes(`orbit-${s.name}-lg`, s.rDesktop, s.dir),
).join("\n");

const BASE_CSS = SHELLS.map((s) => `.orbit-shell-${s.name}{animation-name:orbit-${s.name}}`).join("");
const MEDIA_CSS = `@media (min-width:1024px){${SHELLS.map((s) => `.orbit-shell-${s.name}{animation-name:orbit-${s.name}-lg}`).join("")}}`;

/**
 * Nine orbiting nodes — one per letter of P·H·R·O·N·E·S·I·S — circling the
 * 3D brandmark in LogoGlobe. Pure DOM/CSS translate-path animation (not
 * WebGL, not rotation): keeps the pillar names real accessible text, keeps
 * the badges always upright, and keeps the ring independent of the Three.js
 * scene entirely. Clicking a node jumps to the Acronym rail below, where
 * the same letter/color/copy reappears — hero and rail read as one idea.
 */
export default function OrbitRing() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {!reduced && <style>{KEYFRAMES_CSS + BASE_CSS + MEDIA_CSS}</style>}
      {SHELLS.map((shell, shellIdx) => {
        const nodes = PHRONESIS_LETTERS.slice(shellIdx * 3, shellIdx * 3 + 3);
        return (
          <div key={shell.name} className="absolute left-1/2 top-1/2">
            {nodes.map((l, i) => {
              const delay = -(i / nodes.length) * shell.duration;
              const staticAngle = shell.dir * (i / nodes.length) * Math.PI * 2;
              const staticX = Math.cos(staticAngle) * shell.rDesktop;
              const staticY = Math.sin(staticAngle) * shell.rDesktop;
              return (
                <div
                  key={l.letter + l.word}
                  className={reduced ? "" : `orbit-shell-${shell.name} absolute left-0 top-0`}
                  style={
                    reduced
                      ? { position: "absolute", left: 0, top: 0, transform: `translate(${staticX}px, ${staticY}px)` }
                      : { animationDuration: `${shell.duration}s`, animationDelay: `${delay}s`, animationTimingFunction: "linear", animationIterationCount: "infinite" }
                  }
                >
                  <a
                    href="#acronym"
                    className="group pointer-events-auto absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center"
                    aria-label={`${l.word} — jump to the Phronesis pillars`}
                  >
                    <span
                      className="glass relative grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[13px] font-bold shadow-sm transition-transform duration-300 group-hover:scale-125"
                      style={{ color: l.accent }}
                    >
                      {l.letter}
                    </span>
                    <span className="orbit-tooltip glass pointer-events-none absolute left-1/2 top-[calc(100%+8px)] w-[168px] -translate-x-1/2 rounded-xl px-3 py-2 text-left opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em]" style={{ color: l.accent }}>
                        {l.letter} · pillar
                      </span>
                      <span className="mt-0.5 block text-[11.5px] font-semibold leading-snug text-ocean">{l.word}</span>
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
