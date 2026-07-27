"use client";

import type { ReactNode } from "react";
import { Reveal, SectionHeading, TiltCard } from "./motion";
import {
  AppleIcon,
  CheckIcon,
  DropIcon,
  HeartHandIcon,
  LeafIcon,
  LinkIcon,
  MindIcon,
  MoonIcon,
  MoveIcon,
  SunRiseIcon,
} from "./icons";

type Domain = {
  icon: ReactNode;
  title: string;
  copy: string;
  meta: string;
  accent: string;
  featured?: boolean; // Land-Based Wellness — terracotta treatment
  extra?: ReactNode; // height variation for the masonry rhythm
};

const DOMAINS: Domain[] = [
  {
    icon: <SunRiseIcon size={22} />,
    title: "Wholistic Health",
    copy: "Care plans that treat the whole person — physical, mental, emotional and spiritual health assessed together, never in silos.",
    meta: "whole-person baselines",
    accent: "#1F8A8A",
  },
  {
    icon: <AppleIcon size={22} />,
    title: "Nutrition & Food Security",
    copy: "Food-environment scans, pantry network mapping and nutrition literacy programs tuned to local prices and cultures.",
    meta: "food security index",
    accent: "#7FB069",
    extra: (
      <div className="mt-5 space-y-2">
        {[
          ["fresh access", 72, "#7FB069"],
          ["affordability", 58, "#E8A87C"],
          ["literacy", 81, "#1F8A8A"],
        ].map(([label, w, c]) => (
          <div key={label as string} className="flex items-center gap-3">
            <span className="w-24 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/70">
              {label as string}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ocean/10">
              <span
                className="block h-full rounded-full"
                style={{ width: `${w}%`, backgroundColor: c as string }}
              />
            </span>
            <span className="font-mono text-[10px] text-ink/70">{w}%</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <LeafIcon size={22} />,
    title: "Land-Based Wellness",
    copy: "Healing programs rooted in land, language and ceremony — designed with Indigenous partners and governed under OCAP® from day one.",
    meta: "co-designed · OCAP® governed",
    accent: "#C38D6B",
    featured: true,
    extra: (
      <blockquote className="mt-5 border-l-2 border-cream/50 pl-4 font-display text-[14px] italic leading-snug text-cream/90">
        &ldquo;The land is not a setting for wellness. It is the medicine.&rdquo;
        <footer className="mt-2 font-mono text-[10px] uppercase not-italic tracking-[0.16em] text-cream/60">
          — elder advisory circle
        </footer>
      </blockquote>
    ),
  },
  {
    icon: <MoveIcon size={22} />,
    title: "Physical Activity & Movement",
    copy: "From walking-school audits to older-adult strength cohorts — movement prescriptions matched to built-environment data.",
    meta: "built-environment aware",
    accent: "#E8A87C",
  },
  {
    icon: <MindIcon size={22} />,
    title: "Mental & Emotional Wellbeing",
    copy: "Stepped-care pathways, peer support matching and early-signal monitoring that respects privacy at every tier.",
    meta: "stepped-care pathways",
    accent: "#1F8A8A",
    extra: (
      <ul className="mt-5 space-y-1.5">
        {["universal promotion", "targeted groups", "early intervention", "clinical partnership"].map(
          (tier, i) => (
            <li key={tier} className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/70">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-teal/15 text-teal">
                <CheckIcon size={9} />
              </span>
              tier {i + 1} · {tier}
            </li>
          ),
        )}
      </ul>
    ),
  },
  {
    icon: <MoonIcon size={22} />,
    title: "Sleep & Recovery",
    copy: "The most underrated determinant: sleep hygiene programs for shift workers, teens and new parents, measured gently.",
    meta: "gentle measurement",
    accent: "#0B3D5F",
  },
  {
    icon: <DropIcon size={22} />,
    title: "Substance Use & Harm Reduction",
    copy: "Non-judgmental, evidence-first: naloxone network coverage, safer-use education and referral pathways that keep dignity intact.",
    meta: "harm-reduction first",
    accent: "#1F8A8A",
  },
  {
    icon: <LinkIcon size={22} />,
    title: "Social Connection & Belonging",
    copy: "Loneliness is a vital sign. Cohort analysis, welcoming-city audits and intergenerational program design that rebuilds the social fabric.",
    meta: "social infrastructure",
    accent: "#E8A87C",
  },
  {
    icon: <HeartHandIcon size={22} />,
    title: "Sexual & Reproductive Health",
    copy: "Confidential, inclusive services mapping — STBBI testing coverage, contraception access and affirming care directories.",
    meta: "confidential by design",
    accent: "#7FB069",
  },
];

/** Nine wellness domains in a masonry flow; Land-Based Wellness carries
 *  the terracotta treatment to honour its cultural grounding. */
export default function Wellness() {
  return (
    <section id="wellness" className="relative overflow-hidden py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(52rem_40rem_at_90%_10%,rgba(195,141,107,0.13),transparent_60%),radial-gradient(44rem_36rem_at_5%_80%,rgba(31,138,138,0.10),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="wrap relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="health & wellness modules"
            tone="terra"
            title={
              <>
                Nine domains of a <em className="font-medium text-terra">whole life.</em>
              </>
            }
            copy="Wellness is not one program — it is nine interlocking domains. Each module ships with evidence briefs, program templates, indicator sets and equity stratification out of the box."
          />
          <Reveal delay={0.2} className="pb-1">
            <p className="flex items-center gap-3 rounded-full border border-terra/30 bg-terra/10 px-4 py-2">
              <LeafIcon size={15} className="text-terra" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-terra">
                land-based module in terracotta
              </span>
            </p>
          </Reveal>
        </div>

        {/* masonry */}
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {DOMAINS.map((d, i) => (
            <Reveal
              key={d.title}
              delay={(i % 3) * 0.08}
              className="group mb-5 break-inside-avoid"
            >
              <TiltCard
                className={`rounded-3xl border p-7 ${
                  d.featured
                    ? "border-terra/40 bg-terra text-cream shadow-[0_30px_60px_-28px_rgba(195,141,107,0.6)]"
                    : "border-ocean/10 bg-white/75"
                }`}
                glow={d.featured ? "" : "hover:shadow-[0_30px_60px_-30px_rgba(11,61,95,0.35)]"}
              >
                <span
                  className={`absolute right-6 top-6 font-mono text-[10px] tracking-[0.2em] ${
                    d.featured ? "text-cream/50" : "text-ink/70"
                  }`}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 ${
                    d.featured ? "bg-cream/15 text-cream" : "text-cream"
                  }`}
                  style={d.featured ? undefined : { backgroundColor: d.accent }}
                >
                  {d.icon}
                </span>
                <h3
                  className={`mt-5 font-display text-[19px] font-semibold ${
                    d.featured ? "text-cream" : "text-ocean"
                  }`}
                >
                  {d.title}
                </h3>
                <p
                  className={`mt-3 text-[13.5px] leading-relaxed ${
                    d.featured ? "text-cream/85" : "text-ink/65"
                  }`}
                >
                  {d.copy}
                </p>
                {d.extra}
                <p
                  className={`mt-5 inline-flex rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
                    d.featured
                      ? "bg-cream/15 text-cream/85"
                      : "bg-ocean/5 text-ink/70"
                  }`}
                >
                  {d.meta}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
