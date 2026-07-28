"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Reveal, SectionHeading, usePrefersReducedMotion } from "./motion";
import { openAssessment } from "./modalEvents";
import { ArrowIcon, BuildingIcon, CommunityIcon, FamilyIcon, PersonIcon } from "./icons";

type Lens = {
  icon: typeof PersonIcon;
  title: string;
  copy: string;
  chips: string[];
  accent: string;
};

const LENSES: Lens[] = [
  {
    icon: PersonIcon,
    title: "Individual",
    copy: "Whole-person baselines that honour strengths before risks — biometrics, behaviours, goals and the social context that shapes them.",
    chips: ["SDOH screen", "readiness staging", "goal mapping"],
    accent: "#7FB069",
  },
  {
    icon: FamilyIcon,
    title: "Family",
    copy: "Household-level genograms of health: caregivers, routines, food environments and intergenerational patterns — with consent at every edge.",
    chips: ["household profiles", "caregiver load", "food environment"],
    accent: "#1F8A8A",
  },
  {
    icon: CommunityIcon,
    title: "Community",
    copy: "Asset maps and needs indexes that centre community voice. Participatory data collection validated in community sessions before use.",
    chips: ["asset mapping", "needs index", "participatory validation"],
    accent: "#E8A87C",
  },
  {
    icon: BuildingIcon,
    title: "Organizational",
    copy: "Capacity scans across governance, workforce, data maturity and financing — benchmarked against the six core public health functions.",
    chips: ["capacity scan", "function benchmarks", "workforce gaps"],
    accent: "#0B3D5F",
  },
];

/** Four assessment lenses — sticky narrative column beside stacking cards. */
export default function AssessSection() {
  const stackRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  /* a thread draws down through the four lens cards as you scroll past
     them — stitching individual assessment lenses into one evidence
     engine, the same idea the copy above is making in words. */
  useEffect(() => {
    if (reduced) return;
    const stack = stackRef.current;
    const thread = threadRef.current;
    if (!stack || !thread) return;
    const tween = gsap.fromTo(
      thread,
      { scaleY: 0 },
      { scaleY: 1, ease: "none", scrollTrigger: { trigger: stack, start: "top 70%", end: "bottom 75%", scrub: 0.6 } },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section id="assess" className="relative overflow-hidden py-32">
      {/* soft backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_38rem_at_8%_20%,rgba(127,176,105,0.12),transparent_60%),radial-gradient(46rem_34rem_at_95%_75%,rgba(232,168,124,0.12),transparent_62%)]"
        aria-hidden="true"
      />
      <div className="wrap relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* sticky narrative */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="assessment suite"
            tone="sage"
            title={
              <>
                Four lenses, <em className="font-medium text-sage">one true picture.</em>
              </>
            }
            copy="Public health fails when it sees populations but not people — or people but not systems. Phronesis runs the same evidence engine across four nested lenses, so an individual signal can be read against family, community and organizational context."
          />
          <Reveal delay={0.2} className="mt-8">
            <div className="flex items-center gap-4 rounded-2xl border border-sage/30 bg-sage/10 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage text-cream">
                <CommunityIcon size={18} />
              </span>
              <p className="text-[13px] leading-snug text-ink/70">
                <strong className="font-semibold text-ink">OCAP® by default:</strong>{" "}
                community data stays under community ownership, governance and control.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3} className="mt-8">
            <button
              onClick={() => openAssessment({ assessmentType: "community" })}
              className="group inline-flex items-center gap-2.5 rounded-full bg-teal px-6 py-3 text-[14px] font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a7676]"
            >
              Request a lens walkthrough
              <ArrowIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>

        {/* stacking lens cards */}
        <div ref={stackRef} className="relative space-y-6">
          <div
            ref={threadRef}
            className="pointer-events-none absolute left-[26px] top-6 hidden h-[calc(100%-3rem)] w-[2px] origin-top rounded-full bg-gradient-to-b from-sage via-teal to-ocean sm:block"
            aria-hidden="true"
          />
          {LENSES.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.06}>
              <article
                className="group relative overflow-hidden rounded-3xl border border-ocean/10 bg-white/75 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-30px_rgba(11,61,95,0.4)] sm:p-9"
              >
                {/* accent bar grows on hover */}
                <span
                  className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                  style={{ backgroundColor: l.accent }}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-cream transition-transform duration-500 group-hover:rotate-6"
                      style={{ backgroundColor: l.accent }}
                    >
                      <l.icon size={22} />
                    </span>
                    <div>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-ink/70">
                        lens 0{i + 1}
                      </p>
                      <h3 className="font-display text-[22px] font-semibold text-ocean">
                        {l.title}
                      </h3>
                    </div>
                  </div>
                  <ArrowIcon
                    size={20}
                    className="mt-2 text-ocean/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal"
                  />
                </div>
                <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-ink/70">{l.copy}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {l.chips.map((c) => (
                    <li
                      key={c}
                      className="rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em]"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${l.accent} 14%, white)`,
                        color: "color-mix(in srgb, #1A2530 75%, " + l.accent + ")",
                      }}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
