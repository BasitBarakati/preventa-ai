"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, SectionHeading, usePrefersReducedMotion } from "./motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Letter = {
  letter: string;
  word: string;
  copy: string;
  tags: string[];
  accent: string; // hex used for ghost stroke + details
};

const LETTERS: Letter[] = [
  {
    letter: "P",
    word: "Population Assessment & Surveillance",
    copy: "Continuous, ward-level signals from the places health actually happens — syndromic trends, SDOH layers and community-reported data fused into one live picture.",
    tags: ["syndromic signals", "SDOH mapping", "live dashboards"],
    accent: "#1F8A8A",
  },
  {
    letter: "H",
    word: "Health Promotion & Disease Prevention",
    copy: "Upstream by default. Co-designed campaigns, screening pathways and prevention playbooks that meet people where they are — culturally safe and strengths-based.",
    tags: ["co-design", "screening pathways", "campaign studios"],
    accent: "#7FB069",
  },
  {
    letter: "R",
    word: "Resilience & Emergency Preparedness",
    copy: "Stress-test your system before the crisis does. Scenario modelling, surge playbooks and continuity plans that hold when the pressure arrives.",
    tags: ["scenario modelling", "surge plans", "risk registers"],
    accent: "#E8A87C",
  },
  {
    letter: "O",
    word: "Operations & Policy Review",
    copy: "Turn policy scans and operational audits into decisions — SOP gaps surfaced, jurisdictional comparisons in plain language, momentum tracked to closure.",
    tags: ["policy scans", "SOP audits", "decision memos"],
    accent: "#0B3D5F",
  },
  {
    letter: "N",
    word: "Networked Collaboration",
    copy: "A shared table for health units, NGOs, municipalities and communities. Shared agendas, shared data agreements, shared credit.",
    tags: ["coalition hubs", "data sharing pacts", "communities of practice"],
    accent: "#C38D6B",
  },
  {
    letter: "E",
    word: "Evidence & AI",
    copy: "Living evidence syntheses with retrieval you can audit. Every suggestion cites its source; every model output waits for a human verdict.",
    tags: ["living reviews", "auditable retrieval", "citation trails"],
    accent: "#1F8A8A",
  },
  {
    letter: "S",
    word: "Systems for Health Protection",
    copy: "Outbreak workflows, inspection intelligence and environmental health monitoring — the protective scaffolding that keeps communities safe between emergencies.",
    tags: ["outbreak workflows", "inspection analytics", "environmental monitoring"],
    accent: "#7FB069",
  },
  {
    letter: "I",
    word: "Intelligence & Analytics",
    copy: "Predictive need models, equity-stratified indicators and board-ready analytics — always disaggregated, so no community is averaged out of view.",
    tags: ["predictive need", "equity stratification", "board analytics"],
    accent: "#E8A87C",
  },
  {
    letter: "S",
    word: "Strengthening the 6 Functions",
    copy: "Every module maps back to the six core public health functions — so capability compounds across your whole system, not just one dashboard.",
    tags: ["core functions", "capability map", "system-wide lift"],
    accent: "#0B3D5F",
  },
];

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
            <article
              key={`${l.letter}-${l.word}`}
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
          ))}
        </div>
      </div>

      {reduced ? null : <div className="h-20" aria-hidden="true" />}
    </section>
  );
}
