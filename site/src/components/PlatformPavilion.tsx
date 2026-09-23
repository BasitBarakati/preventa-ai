"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Layers, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  GraduationCap, 
  Users, 
  Globe2, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { universityTracks } from "./UniversityInTheBox";

type PillarKey = "assessment" | "wellness" | "indigenous" | "research" | "academy";

const pillarDetails = {
  assessment: {
    number: "01",
    tag: "Multilevel Diagnostics",
    title: "Multi-Level Situation Assessment",
    href: "/situation-assessment",
    philosophy: "Public health failures often begin with fragmented data. Preventa AI connects individual lifestyle markers, neighborhood equity scans, and institutional readiness into one continuous diagnostic continuum.",
    metrics: "3 Assessment Levels • Validated Canadian Indicators • Automated Risk Scores",
    highlights: [
      {
        title: "Individual & Family Wellbeing",
        subtitle: "Lifestyle, biometrics, protective factors, and coping mechanisms",
        badge: "Personal Health Index"
      },
      {
        title: "Community Assessment",
        subtitle: "Demographic equity scans, social assets, and neighborhood SDOH risks",
        badge: "Priority-Setting Matrix"
      },
      {
        title: "Organization Readiness",
        subtitle: "Workforce burnout, safety culture, and digital AI adoption capacity",
        badge: "Institutional Heatmap"
      }
    ]
  },
  wellness: {
    number: "02",
    tag: "Prevention Domains",
    title: "Health & Wellbeing Across Eight Domains",
    href: "/health-and-wellness",
    philosophy: "Moving from episodic sick-care into continuous population health promotion. Every intervention pathway is grounded in the Ottawa Charter, COM-B behavior change models, and peer-reviewed Canadian evidence.",
    metrics: "8 Prevention Domains • WHO Collaborating Standards • Health Literacy Tools",
    highlights: [
      {
        title: "Mental Wellbeing & Coping",
        subtitle: "Early distress screening, peer resilience, and stress reduction",
        badge: "Domain 01"
      },
      {
        title: "Substance Use & Harm Reduction",
        subtitle: "Non-stigmatizing low-barrier support, overdose alert feeds",
        badge: "Domain 02"
      },
      {
        title: "Environmental & Climate Health",
        subtitle: "Air quality index (AQHI), extreme heat alerts, clean water access",
        badge: "Domain 03"
      },
      {
        title: "Chronic Disease & Nutrition",
        subtitle: "Type 2 diabetes, cardiovascular health, and physical activity support",
        badge: "Domain 04"
      }
    ]
  },
  indigenous: {
    number: "03",
    tag: "Data Sovereignty & OCAP®",
    title: "Indigenous Health & Community Sovereignty",
    href: "/indigenous-health",
    philosophy: "Rooted in Two-Eyed Seeing (Etuaptmumk) and the First Nations OCAP® principles. Indigenous communities retain 100% ownership, control, access, and possession of their health knowledge, free from extractive AI practices.",
    metrics: "100% OCAP® Compliant • Two-Eyed Seeing • 100% Subsidized Community Access",
    highlights: [
      {
        title: "Sovereign Community Enclave",
        subtitle: "Zero data leaves sovereign servers; no commercial LLM training",
        badge: "OCAP® Enforced"
      },
      {
        title: "Two-Eyed Seeing (Etuaptmumk)",
        subtitle: "Braiding Indigenous healing traditions with modern computational tools",
        badge: "Cultural Safety"
      },
      {
        title: "Land-Based Healing & Food Sovereignty",
        subtitle: "Supporting traditional harvest systems and community wellness",
        badge: "Community Co-Design"
      }
    ]
  },
  research: {
    number: "04",
    tag: "Computational Epidemiology",
    title: "AI in Research & Risk Prediction",
    href: "/research",
    philosophy: "Automating the synthesis of epidemiological literature while detecting nascent community health risks before emergency rooms are overwhelmed. Always verifiable, auditable, and human-in-the-loop.",
    metrics: "Automated Evidence Synthesis • Predictive Risk Modeling • PHIPA/PIPEDA Certified",
    highlights: [
      {
        title: "Predictive Outbreak Surveillance",
        subtitle: "Autonomous microclimate and wastewater telemetry pattern detection",
        badge: "48h Early Alert"
      },
      {
        title: "Automated Evidence Generation",
        subtitle: "Rapid systematic synthesis of Canadian and WHO clinical publications",
        badge: "Citations Linked"
      },
      {
        title: "Causal Inference & Policy Modeling",
        subtitle: "Simulating SDOH intervention outcomes before committing public budgets",
        badge: "Ottawa Charter"
      }
    ]
  },
  academy: {
    number: "05",
    tag: "Workforce Learning",
    title: "Workforce Academy: University In The Box",
    href: "/courses",
    philosophy: "Deploying institutional-grade public health and AI education directly into local health units, community organizations, and academic programs across Canada.",
    metrics: "6 Specialized Tracks • 180+ Hours • CME/CE Micro-Credentials",
    highlights: [
      {
        title: "6 Specialized Career Tracks",
        subtitle: "From public health AI literacy to advanced predictive epidemiology",
        badge: "Accredited Micro-Credentials"
      },
      {
        title: "Applied Sandbox Computing",
        subtitle: "Hands-on policy modeling, synthetic population data, and logic models",
        badge: "Interactive Labs"
      },
      {
        title: "Turnkey Health Unit Deployment",
        subtitle: "Self-paced cohorts or university-partnered structured programs",
        badge: "Institutional Ready"
      }
    ]
  }
};

export default function PlatformPavilion() {
  const [activeTab, setActiveTab] = useState<PillarKey>("assessment");
  const current = pillarDetails[activeTab];

  return (
    <div id="platform" className="pt-4 pb-14 md:pt-6 md:pb-16 bg-[#FAF8F5] w-full">
      <div className="site-container max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-[11px] font-extrabold uppercase tracking-widest mb-3">
            <Layers size={13} />
            <span>The Preventa Architecture</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#062235] tracking-tight leading-[1.1] mb-4">
            Five Connected Programs. <br />
            <span className="font-serif-italic font-normal text-[#0D9488]">
              One Sovereign Continuum.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#334155] font-normal leading-relaxed">
            Select any program to explore how Preventa AI unites diagnostics, community governance, peer-reviewed evidence, and workforce learning into a coherent national infrastructure.
          </p>
        </div>

        {/* 5-Pillar Minimalist Tab Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 no-scrollbar" role="tablist">
          {[
            { id: "assessment", label: "01 · Situation Assessment", icon: Activity },
            { id: "wellness", label: "02 · Health & Wellbeing", icon: Layers },
            { id: "indigenous", label: "03 · Indigenous Health (OCAP®)", icon: ShieldCheck },
            { id: "research", label: "04 · AI in Research & Risk", icon: Cpu },
            { id: "academy", label: "05 · University In The Box", icon: GraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id as PillarKey)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? "bg-[#062235] text-white border-[#062235] shadow-xs scale-[1.01]"
                    : "bg-white text-[#334155] hover:bg-[#FAF8F5] border-[#0B3D5F]/10 hover:border-[#0B3D5F]/20"
                }`}
              >
                <Icon size={14} className={isSelected ? "text-[#14B8A6]" : "text-[#0A4D34]"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Architectural Dossier */}
        <div className="p-7 sm:p-10 rounded-3xl bg-white border border-[#0B3D5F]/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Conceptual Overview (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-extrabold text-[#0D9488] bg-[#0D9488]/10 px-2.5 py-1 rounded-lg">
                  Pillar {current.number}
                </span>
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  {current.tag}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235] leading-snug mb-4">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-6 font-normal">
                {current.philosophy}
              </p>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#0B3D5F]/6 text-xs text-[#062235] font-semibold mb-6">
                {current.metrics}
              </div>
            </div>

            <Link
              href={current.href}
              className="btn-primary !py-2.5 !px-5 text-xs font-bold inline-flex items-center gap-2 self-start"
            >
              <span>{activeTab === "academy" ? "Explore Academy Curriculum" : "Explore Program Dossier"}</span>
              <ArrowRight size={13} className="text-[#14B8A6]" />
            </Link>
          </div>

          {/* Right Column: Editorial Highlights or Academy Tracks (7 Cols) */}
          <div className="lg:col-span-7">
            {activeTab === "academy" ? (
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#0B3D5F]/8">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#062235]">
                    6 Accredited Career Tracks (180+ Hours)
                  </span>
                  <span className="text-[11px] text-[#0D9488] font-mono">
                    CME / CE Micro-Credentials
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                  {universityTracks.map((track) => (
                    <div 
                      key={track.id}
                      className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#0B3D5F]/8 hover:border-[#0D9488]/30 transition-all text-left"
                    >
                      <span className="text-[9.5px] font-mono font-bold text-[#0D9488] block mb-1">
                        {track.badge}
                      </span>
                      <h4 className="font-display text-xs font-bold text-[#062235] leading-snug mb-1">
                        {track.title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] leading-tight line-clamp-2">
                        {track.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                {current.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/6 hover:border-[#0D9488]/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-display text-sm sm:text-base font-bold text-[#062235]">
                        {h.title}
                      </h4>
                      <span className="font-mono text-[10px] font-bold text-[#0D9488] bg-white px-2 py-0.5 rounded-md border border-[#0B3D5F]/6">
                        {h.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {h.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
