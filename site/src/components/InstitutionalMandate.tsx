"use client";

import { useState } from "react";
import { 
  Compass, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight,
  CheckCircle2,
  FileText
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
  const [activeTab, setActiveTab] = useState<"goals" | "principles">("goals");

  return (
    <div className="pt-4 pb-14 md:pt-6 md:pb-16 bg-[#FAF8F5] w-full" id="mandate">
      <div className="site-container max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-[11px] font-extrabold uppercase tracking-widest mb-3">
            <Compass size={13} />
            <span>Our Institutional Purpose</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#062235] tracking-tight leading-[1.1] mb-4">
            A Clear Mandate for <br />
            <span className="font-serif-italic font-normal text-[#0D9488]">
              Public Health Transformation.
            </span>
          </h2>
          
          <p className="text-base sm:text-xl text-[#334155] font-normal leading-relaxed mb-6">
            Preventa AI was founded on an uncompromising principle: modern artificial intelligence must serve population wellbeing, uphold Indigenous data sovereignty, and bridge peer-reviewed medical science into frontline community action.
          </p>

          {/* Canadian & International Governance Accreditations */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
            <span className="px-3 py-1 rounded-lg bg-white border border-[#0B3D5F]/10 text-[10.5px] font-mono text-[#062235] font-semibold flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              Ottawa Charter for Health Promotion (WHO/CPHA)
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#0B3D5F]/10 text-[10.5px] font-mono text-[#062235] font-semibold flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A4D34]" />
              First Nations OCAP® Principles
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#0B3D5F]/10 text-[10.5px] font-mono text-[#062235] font-semibold flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
              PHIPA &amp; PIPEDA Canadian Cloud Residency
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#0B3D5F]/10 text-[10.5px] font-mono text-[#062235] font-semibold flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              Two-Eyed Seeing (Etuaptmumk)
            </span>
          </div>
        </div>

        {/* Dual Pillar: Vision & Mission (Monumental Editorial Split) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Vision Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#0B3D5F]/8 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D9488]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#0D9488] uppercase tracking-wider">
                  Our Sovereign Vision
                </span>
                <span className="text-[10px] font-mono text-[#94A3B8]">The North Star</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#062235] leading-snug mb-3">
                &ldquo;{brand.vision}&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                We envision a future where public health authorities and remote communities alike possess equal access to frontier intelligence, preventing chronic illnesses and infectious threats before they escalate.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-[#0B3D5F]/6 flex items-center gap-2 text-xs font-semibold text-[#0A4D34]">
              <CheckCircle2 size={14} className="text-[#14B8A6]" />
              <span>Grounded in Canadian Equity &amp; Universal Access</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-[#062235] text-white border border-[#062235] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#14B8A6]/10 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#14B8A6] uppercase tracking-wider">
                  Our Action Mission
                </span>
                <span className="text-[10px] font-mono text-white/50">Core Purpose</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
                &ldquo;{brand.mission}&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                We equip healthcare ministers, community elders, and public health scholars with verifiable, non-extractive computational infrastructure that respects community ownership.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#14B8A6]">
              <CheckCircle2 size={14} />
              <span>Human Oversight at Every Consequential Step</span>
            </div>
          </div>

        </div>

        {/* Section: The Four Core Strategic Goals & Seven Principles */}
        <div className="pt-4 border-t border-[#0B3D5F]/10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-[#0D9488] uppercase tracking-widest block mb-1">
                National Governance Charter
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235]">
                {activeTab === "goals" ? "Four Strategic Goals (2026–2030)" : "Seven Ethical Guiding Principles"}
              </h3>
            </div>

            <div className="inline-flex p-1 rounded-2xl bg-white border border-[#0B3D5F]/10 shadow-2xs self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("goals")}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "goals"
                    ? "bg-[#062235] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#062235]"
                }`}
              >
                4 Strategic Goals
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("principles")}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "principles"
                    ? "bg-[#062235] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#062235]"
                }`}
              >
                7 Ethical Principles
              </button>
            </div>
          </div>

          {/* TAB 1: Four Strategic Goals */}
          {activeTab === "goals" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-200">
              {goalsWithDetail.map((goal) => (
                <div 
                  key={goal.number}
                  className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#0B3D5F]/8 hover:border-[#0D9488]/40 transition-all hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-extrabold text-[#0D9488] bg-[#0D9488]/8 px-2.5 py-1 rounded-lg">
                        Goal {goal.number}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] font-mono">2026&ndash;2030</span>
                    </div>

                    <h4 className="font-display text-base sm:text-lg font-bold text-[#062235] leading-snug mb-3 group-hover:text-[#0D9488] transition-colors">
                      {goal.title}
                    </h4>

                    <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-6">
                      {goal.focus}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#0B3D5F]/6 flex flex-wrap gap-1.5">
                    {goal.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[10px] font-medium text-[#64748B] border border-[#0B3D5F]/6"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Seven Ethical Guiding Principles */}
          {activeTab === "principles" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-200">
              {principles.map((item, idx) => (
                <div 
                  key={item.title} 
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0B3D5F]/8 hover:border-[#0D9488]/30 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#0D9488] bg-[#0D9488]/8 px-2 py-0.5 rounded">
                        Principle 0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Policy Standard</span>
                    </div>

                    <h4 className="font-display text-base font-bold text-[#062235] mb-2 group-hover:text-[#0D9488] transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-xs text-[#475569] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-[#0B3D5F]/6 flex items-center gap-1.5 text-[11px] text-[#0A4D34] font-medium">
                    <CheckCircle2 size={13} className="text-[#14B8A6]" />
                    <span>Audited Governance Mandate</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
