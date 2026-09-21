"use client";

import { 
  Compass, 
  Target, 
  ShieldAlert, 
  Sparkles, 
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { brand, strategicGoals, principles } from "@/lib/site-content";

const goalsWithDetail = [
  {
    number: "01",
    title: "Pioneer Applied AI for Public Health",
    verbatim: strategicGoals[0],
    focus: "Transforming reactive healthcare into proactive community prevention through predictive epidemiology and automated evidence synthesis.",
    tags: ["Early Cluster Detection", "Population Modeling", "Predictive Surveillance"]
  },
  {
    number: "02",
    title: "Advance Prevention & Policy Translation",
    verbatim: strategicGoals[1],
    focus: "Closing the 17-year gap between peer-reviewed medical research and frontline community interventions using Ottawa Charter logic models.",
    tags: ["Ottawa Charter SDOH", "Evidence Synthesis", "Policy Logic Models"]
  },
  {
    number: "03",
    title: "Champion Equity & Indigenous Sovereignty",
    verbatim: strategicGoals[2],
    focus: "Enforcing First Nations OCAP® principles and Two-Eyed Seeing (Etuaptmumk), guaranteeing communities own and govern their data without extractive exploitation.",
    tags: ["OCAP® Principles", "Two-Eyed Seeing", "Cultural Safety"]
  },
  {
    number: "04",
    title: "Strengthen Ethical Governance & Oversight",
    verbatim: strategicGoals[3],
    focus: "Ensuring every AI synthesis is human-overridden, auditable, and stored strictly on Canadian sovereign cloud infrastructure compliant with PHIPA and PIPEDA.",
    tags: ["Human-in-the-Loop", "PHIPA Compliance", "Canadian Data Residency"]
  }
];

export default function InstitutionalMandate() {
  return (
    <section className="py-24 md:py-36 bg-[#FAF8F5] border-b border-[#0B3D5F]/8" id="mandate">
      <div className="site-container max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-[11px] font-extrabold uppercase tracking-widest mb-4">
            <Compass size={13} />
            <span>Our Institutional Purpose</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#062235] tracking-tight leading-[1.1] mb-6">
            A Clear Mandate for <br />
            <span className="font-serif-italic font-normal text-[#0D9488]">
              Public Health Transformation.
            </span>
          </h2>
          
          <p className="text-base sm:text-xl text-[#334155] font-normal leading-relaxed">
            Preventa AI was founded on an uncompromising principle: modern artificial intelligence must serve population wellbeing, uphold Indigenous data sovereignty, and bridge peer-reviewed medical science into frontline community action.
          </p>
        </div>

        {/* Dual Pillar: Vision & Mission (Monumental Editorial Split) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Vision Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#0B3D5F]/8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D9488]/5 rounded-bl-full pointer-events-none" />
            <div>
              <span className="text-xs font-mono font-bold text-[#0D9488] uppercase tracking-wider block mb-3">
                Our Sovereign Vision
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235] leading-snug mb-4">
                &ldquo;{brand.vision}&rdquo;
              </h3>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                We envision a future where public health authorities and remote communities alike possess equal access to frontier intelligence, preventing chronic illnesses and infectious threats before they escalate.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#0B3D5F]/6 flex items-center gap-2 text-xs font-semibold text-[#0A4D34]">
              <CheckCircle2 size={15} className="text-[#14B8A6]" />
              <span>Grounded in Canadian Equity &amp; Universal Access</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#062235] text-white border border-[#062235] shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#14B8A6]/10 rounded-bl-full pointer-events-none" />
            <div>
              <span className="text-xs font-mono font-bold text-[#14B8A6] uppercase tracking-wider block mb-3">
                Our Action Mission
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug mb-4">
                &ldquo;{brand.mission}&rdquo;
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                We equip healthcare ministers, community elders, and public health scholars with verifiable, non-extractive computational infrastructure that respects community ownership.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#14B8A6]">
              <CheckCircle2 size={15} />
              <span>Human Oversight at Every Consequential Step</span>
            </div>
          </div>

        </div>

        {/* The Four Strategic Goals (Clean Editorial 4-Column Layout) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#0B3D5F]/10 mb-12">
            <div>
              <span className="text-xs font-bold text-[#0D9488] uppercase tracking-widest block mb-1">
                Strategic Alignment
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235]">
                Four Strategic Goals Guiding Every Initiative
              </h3>
            </div>
            <span className="text-xs text-[#64748B] font-medium">
              Verbatim from Preventa AI National Governance Charter
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {goalsWithDetail.map((goal) => (
              <div 
                key={goal.number}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#0B3D5F]/8 hover:border-[#0D9488]/30 transition-all hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-extrabold text-[#0D9488] bg-[#0D9488]/8 px-2.5 py-1 rounded-lg">
                      Goal {goal.number}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] font-mono">2026-2030</span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#062235] leading-snug mb-3 group-hover:text-[#0D9488] transition-colors">
                    {goal.title}
                  </h4>

                  <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed mb-4">
                    {goal.focus}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#0B3D5F]/6 space-y-1.5">
                  {goal.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="inline-block mr-1.5 mb-1 px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[10px] font-medium text-[#64748B] border border-[#0B3D5F]/6"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
