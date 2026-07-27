"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUp, Reveal, SectionHeading } from "./motion";
import { ClipboardIcon } from "./icons";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CAPACITY = [
  { to: 4800, suffix: "+", label: "practitioners trained" },
  { to: 38, suffix: "", label: "communities of practice" },
  { to: 96, suffix: "%", label: "program completion" },
  { to: 12, suffix: "", label: "languages supported" },
];

const PHASES = [
  {
    name: "Formative",
    when: "before launch",
    copy: "Define the theory of change, set baselines and agree indicators with the community — so success is measurable before it exists.",
    chips: ["logic model", "indicator set", "equity lens"],
    accent: "#7FB069",
  },
  {
    name: "Process",
    when: "during delivery",
    copy: "Track fidelity, reach and dose in real time. Adaptation logs capture what changed and why — implementation science, operationalized.",
    chips: ["live dashboard", "fidelity checks", "adaptation log"],
    accent: "#1F8A8A",
  },
  {
    name: "Outcome",
    when: "what changed",
    copy: "Short and intermediate outcomes, always equity-stratified. If a subgroup was left behind, the report says so — loudly.",
    chips: ["outcome briefs", "disparity analysis", "attribution notes"],
    accent: "#E8A87C",
  },
  {
    name: "Summative",
    when: "what it was worth",
    copy: "Impact, cost and scale decisions synthesized for boards and councils — plain-language verdicts with the evidence attached.",
    chips: ["board synthesis", "cost per outcome", "scale-up memo"],
    accent: "#0B3D5F",
  },
];

/** Capacity band + the four-phase evaluation lifecycle with a drawn timeline. */
export default function CapacityEval() {
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const line = lineRef.current;
    const steps = stepsRef.current;
    if (!line || !steps) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: steps, start: "top 78%", once: true },
      });
      tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power2.inOut" });
      tl.fromTo(
        steps.querySelectorAll(".eval-step"),
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.22 },
        "-=1.0",
      );
    }, steps);
    return () => ctx.revert();
  }, []);

  return (
    <section id="capacity" className="relative overflow-hidden py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_36rem_at_50%_0%,rgba(11,61,95,0.07),transparent_62%)]"
        aria-hidden="true"
      />
      <div className="wrap relative">
        <SectionHeading
          eyebrow="capacity building"
          tone="sage"
          title={
            <>
              Tools are rented. <em className="font-medium text-sage">Capability is kept.</em>
            </>
          }
          copy="Every engagement leaves skills behind: data-literacy labs, mentorship graphs and train-the-trainer paths designed so your team outgrows the platform — proudly."
        />

        {/* capacity counters */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CAPACITY.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <div className="group rounded-2xl border border-ocean/10 bg-white/70 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-sage/50">
                <p className="font-mono text-[30px] font-semibold text-ocean">
                  <CountUp to={c.to} suffix={c.suffix} />
                </p>
                <p className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink/55">
                  {c.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* evaluation lifecycle */}
      <div id="evaluate" className="wrap relative mt-28 scroll-mt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="evaluation lifecycle"
            tone="amber"
            title={
              <>
                Rigor at <em className="font-medium text-amber">every phase.</em>
              </>
            }
            copy="Evaluation is not a chapter written at the end. Phronesis wires it across the full lifecycle — formative, process, outcome, summative — so evidence accumulates instead of evaporating."
          />
          <Reveal delay={0.2} className="pb-1">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
              <ClipboardIcon size={16} className="text-amber" />
              templates included
            </p>
          </Reveal>
        </div>

        <div ref={stepsRef} className="relative mt-16">
          {/* drawn connector */}
          <div className="absolute left-0 right-0 top-[22px] hidden h-[2px] overflow-hidden rounded-full bg-ocean/10 lg:block">
            <div ref={lineRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-sage via-teal to-amber" />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {PHASES.map((ph, i) => (
              <li key={ph.name} className="eval-step relative">
                {/* node */}
                <div className="relative z-10 flex items-center gap-3 lg:block">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full border-4 border-cream font-mono text-[13px] font-semibold text-cream shadow-md"
                    style={{ backgroundColor: ph.accent }}
                  >
                    {i + 1}
                  </span>
                  <div className="lg:mt-5">
                    <h3 className="font-display text-[20px] font-semibold text-ocean">{ph.name}</h3>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/45">
                      {ph.when}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-ink/65">{ph.copy}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {ph.chips.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-ocean/12 bg-white/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/55"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
