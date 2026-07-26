"use client";

import { useRef, type ReactNode } from "react";
import { Reveal, SectionHeading } from "./motion";
import { BookIcon, ChartIcon, CompassIcon, NetworkIcon } from "./icons";

type Pillar = {
  icon: ReactNode;
  title: string;
  copy: string;
  points: string[];
  accent: string;
  ring: string;
};

const PILLARS: Pillar[] = [
  {
    icon: <CompassIcon size={26} />,
    title: "Plan Smarter",
    copy: "Needs assessments, priority setting and logic models that draft themselves from your data — then wait for your judgment.",
    points: ["community health profiles", "priority matrices", "logic-model drafts"],
    accent: "#1F8A8A",
    ring: "hover:shadow-[0_30px_60px_-28px_rgba(31,138,138,0.55)]",
  },
  {
    icon: <BookIcon size={26} />,
    title: "Educate Better",
    copy: "Plain-language, culturally safe education kits generated from living evidence and tuned to reading level and language.",
    points: ["12-language kits", "readability tuning", "cultural safety checks"],
    accent: "#7FB069",
    ring: "hover:shadow-[0_30px_60px_-28px_rgba(127,176,105,0.6)]",
  },
  {
    icon: <NetworkIcon size={26} />,
    title: "Build Capacity",
    copy: "Train-the-trainer paths, data-literacy labs and communities of practice that leave skills behind when the project ends.",
    points: ["data-literacy labs", "mentorship graphs", "skill passports"],
    accent: "#E8A87C",
    ring: "hover:shadow-[0_30px_60px_-28px_rgba(232,168,124,0.65)]",
  },
  {
    icon: <ChartIcon size={26} />,
    title: "Evaluate Rigorously",
    copy: "Evaluation frameworks wired in from day one — indicators, baselines and counterfactual thinking before the program launches.",
    points: ["pre-registered indicators", "equity-stratified results", "board-ready synthesis"],
    accent: "#0B3D5F",
    ring: "hover:shadow-[0_30px_60px_-28px_rgba(11,61,95,0.55)]",
  },
];

/** 3D tilt card — cursor-coupled rotation with a travelling glare. */
function TiltCard({
  children,
  className = "",
  ring = "",
}: {
  children: ReactNode;
  className?: string;
  ring?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-6px)`;
    el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden rounded-3xl border border-ocean/10 bg-white/70 p-7 transition-[box-shadow] duration-300 will-change-transform ${ring} ${className}`}
      style={{ transformStyle: "preserve-3d", transition: "transform .25s ease-out, box-shadow .3s ease" }}
    >
      {/* travelling glare */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(22rem 22rem at var(--gx,50%) var(--gy,50%), rgba(31,138,138,0.10), transparent 60%)",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

export default function Pillars() {
  return (
    <section id="pillars" className="relative py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="how ai powers health promotion"
            tone="teal"
            title={
              <>
                Four pillars.{" "}
                <em className="font-medium text-teal">Zero guesswork.</em>
              </>
            }
            copy="Every pillar pairs machine scale with practitioner judgment. The AI drafts, retrieves and measures — your team decides, validates and acts."
          />
          <Reveal delay={0.2} className="pb-1">
            <p className="max-w-[220px] border-l-2 border-sage pl-4 font-display text-[15px] italic leading-snug text-ink/60">
              &ldquo;Wisdom is knowing what to do next; the platform shows you what&apos;s
              known.&rdquo;
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.09} className="group h-full">
              <TiltCard className="flex h-full flex-col" ring={p.ring}>
                <span
                  className="absolute right-6 top-6 font-mono text-[11px] tracking-[0.2em] text-ink/35"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <span
                  className="grid h-13 w-13 place-items-center rounded-2xl text-cream"
                  style={{ backgroundColor: p.accent, height: 52, width: 52 }}
                >
                  {p.icon}
                </span>
                <h3 className="mt-6 font-display text-[21px] font-semibold text-ocean">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink/65">{p.copy}</p>
                <ul className="mt-6 space-y-2 border-t border-ocean/10 pt-4">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/55">
                      <span className="h-1 w-3 rounded-full" style={{ backgroundColor: p.accent }} aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
