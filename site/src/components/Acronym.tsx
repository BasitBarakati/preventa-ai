"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, SectionHeading, usePrefersReducedMotion } from "./motion";
import { PHRONESIS_LETTERS as LETTERS, type PhronesisLetter } from "./pillars-data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/** The letter's badge spins into place as it enters the rail — the same
 *  small colored circle that orbits the hero's brandmark, landing here.
 *  Continuity, not just matching color: the hero and this rail are one
 *  idea, the orbit is just the pillar's first appearance. */
function LetterCard({ l, i, reduced }: { l: PhronesisLetter; i: number; reduced: boolean }) {
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = badgeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.fromTo(
          el,
          { scale: 0.15, rotate: -160, opacity: 0.35 },
          { scale: 1, rotate: 0, opacity: 1, duration: 0.85, ease: "back.out(1.7)" },
        );
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <article
      className={`group relative flex shrink-0 flex-col justify-center overflow-hidden px-[6vw] py-8 lg:px-[4.5vw] ${
        reduced ? "min-h-0 max-w-md basis-full rounded-3xl border border-ocean/10 bg-white/60 sm:basis-[46%] lg:basis-[30%]" : "min-h-[62vh] w-[88vw] border-r border-ocean/10 sm:w-[62vw] lg:min-h-[58vh] lg:w-[42vw] xl:w-[34vw]"
      }`}
    >
      {/* ghost letter */}
      <span
        className="letter-ghost pointer-events-none absolute -right-4 -top-8 select-none font-display text-[clamp(11rem,24vw,19rem)] leading-none font-bold"
        style={{ "--stroke": l.accent } as React.CSSProperties}
        aria-hidden="true"
      >
        {l.letter}
      </span>

      <div className="relative max-w-md">
        <div className="flex items-center gap-3">
          <span
            ref={badgeRef}
            className="grid h-11 w-11 place-items-center rounded-full font-display text-xl font-bold text-cream"
            style={{ backgroundColor: l.accent }}
          >
            {l.letter}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-ink/70">
            {String(i + 1).padStart(2, "0")} · pillar
          </span>
        </div>
        <h3 className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-semibold text-ocean">
          {l.word}
        </h3>
        <p className="mt-4 text-[14.5px] leading-relaxed text-ink/70">{l.copy}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {l.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-ocean/12 bg-white/70 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/60"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/**
 * The name is the mission — a pinned horizontal rail that spells out
 * P·H·R·O·N·E·S·I·S as you scroll. Collapses to a stacked grid under
 * prefers-reduced-motion.
 */
export default function Acronym() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [idx, setIdx] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            const next = Math.min(LETTERS.length, Math.floor(self.progress * (LETTERS.length + 1)));
            setIdx((cur) => (cur === next ? cur : next));
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="acronym"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream"
      aria-label="What PHRONESIS stands for"
      data-cursor-text={reduced ? undefined : "Scroll"}
    >
      {/* header */}
      <div className="wrap flex flex-wrap items-end justify-between gap-6 pt-24 pb-10">
        <SectionHeading
          eyebrow="the name is the mission"
          tone="amber"
          title={
            <>
              Nine letters. One mandate:{" "}
              <em className="font-medium text-teal">practical wisdom.</em>
            </>
          }
        />
        <Reveal className="hidden items-baseline gap-3 pb-2 md:flex" delay={0.2}>
          <span className="font-mono text-sm text-ink/70">
            {String(Math.min(idx + 1, LETTERS.length + 1)).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs text-ink/70">/ {String(LETTERS.length + 1).padStart(2, "0")}</span>
        </Reveal>
      </div>

      {/* rail progress */}
      <div className="wrap mb-6 h-[3px] overflow-hidden rounded-full bg-ocean/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal via-sage to-amber"
          style={{ width: `${Math.max(4, progress * 100)}%` }}
        />
      </div>

      {/* horizontal track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className={`flex will-change-transform ${
            reduced ? "flex-wrap justify-center gap-6 px-[4vw] pb-24" : "w-max items-stretch"
          }`}
        >
          {/* intro panel */}
          <div className={`flex shrink-0 flex-col justify-center px-[6vw] lg:px-[5vw] ${reduced ? "min-h-0 max-w-md basis-full" : "min-h-[62vh] lg:min-h-[58vh]"}`}>
            <p className="font-display text-[clamp(3.4rem,9vw,7rem)] leading-none font-semibold text-ocean">
              Φ
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-teal">
              phronesis · φρόνησις
            </p>
            <p className="mt-5 max-w-sm font-display text-[22px] leading-snug text-ink/80">
              Aristotle&apos;s word for <em className="text-teal">practical wisdom</em> — the
              capacity to judge well in complex, real situations. Public health is not just
              data. It is the wisdom to act on it.
            </p>
            <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.24em] text-ink/70">
              keep scrolling →
            </p>
          </div>

          {LETTERS.map((l, i) => (
            <LetterCard key={`${l.letter}-${l.word}`} l={l} i={i} reduced={reduced} />
          ))}
        </div>
      </div>

      {reduced ? null : <div className="h-20" aria-hidden="true" />}
    </section>
  );
}
