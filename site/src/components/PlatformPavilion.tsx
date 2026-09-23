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
    tag: "Assessment Streams",
    title: "Multi-Level Situation Assessment",
    href: "/situation-assessment",
    philosophy: "Public health action begins with structured assessments. Preventa AI connects individual lifestyle markers, community priorities and assets, and organization readiness into one coherent diagnostic framework.",
    metrics: "3 Assessment Levels • Validated Indicators • Actionable Outputs",
    highlights: [
      {
        title: "Individual & Family Wellbeing Assessment",
        subtitle: "Physical activity, healthy eating, smoking cessation, low-risk drinking, sleep hygiene, and stress management.",
        badge: "Personal & Family"
      },
      {
        title: "Community Assessment",
        subtitle: "Risk and protective factors, community assets and priorities, high-risk groups, disease incidence, and program effectiveness.",
        badge: "Priority-Setting Matrix"
      },
      {
        title: "Organization Assessment",
        subtitle: "Employee satisfaction (workload, psychological safety, burnout) and organizational culture (values alignment, learning, trust).",
        badge: "Organization Report"
      }
    ]
  },
  wellness: {
    number: "02",
    tag: "Health & Wellbeing",
    title: "Health & Wellbeing Across Key Domains",
    href: "/health-and-wellness",
    philosophy: "Moving from reactive treatment into proactive, continuous population health promotion. Grounded in peer-reviewed evidence, Ottawa Charter frameworks, and validated public health guidelines.",
    metrics: "6 Core Health Domains • Ottawa Charter Logic Models • Plain-Language Evidence",
    highlights: [
      {
        title: "Mental Wellbeing",
        subtitle: "Promoting psychological safety, active coping strategies, and community resilience.",
        badge: "Domain 01"
      },
      {
        title: "Substance Use & Addiction",
        subtitle: "Evidence-informed harm reduction, non-stigmatizing support, and low-barrier resources.",
        badge: "Domain 02"
      },
      {
        title: "Environmental Health",
        subtitle: "Air quality, extreme climate conditions, and environmental determinants of health.",
        badge: "Domain 03"
      },
      {
        title: "Immunization, Sexuality & School Health",
        subtitle: "Vaccine confidence, sexual health education, and school-based child & youth wellness.",
        badge: "Domain 04"
      }
    ]
  },
  indigenous: {
    number: "03",
    tag: "Indigenous Health & Wellbeing",
    title: "Indigenous Health & Community Sovereignty",
    href: "/indigenous-health",
    philosophy: "Rooted in Two-Eyed Seeing (Etuaptmumk) and First Nations OCAP® principles. Indigenous communities retain 100% ownership, control, access, and possession of their health knowledge and data.",
    metrics: "OCAP® Principles Respected • Two-Eyed Seeing • Community-Governed",
    highlights: [
      {
        title: "Wholistic Health",
        subtitle: "Honoring the balance of physical, mental, emotional, and spiritual dimensions of wellbeing.",
        badge: "Wholistic Health"
      },
      {
        title: "Connection to Land and Culture",
        subtitle: "Land-based healing and learning programs paired with traditional food sovereignty resources.",
        badge: "Healing Practice"
      },
      {
        title: "Culture as Prevention and Healing",
        subtitle: "Integrating cultural identity, Elder knowledge, and community self-determination.",
        badge: "Cultural Safety"
      }
    ]
  },
  research: {
    number: "04",
    tag: "Research & Modeling",
    title: "AI in Research & Risk Prediction",
    href: "/research",
    philosophy: "Applying ethical AI to support literature synthesis, disease surveillance, and population risk modeling. Always auditable, evidence-grounded, and guided by human oversight.",
    metrics: "Evidence Generation • Risk Prediction & Modeling • PHIPA/PIPEDA Aligned",
    highlights: [
      {
        title: "AI & Evidence Generation",
        subtitle: "Accelerating systematic evidence synthesis across verified Canadian and international clinical literature.",
        badge: "Evidence Synthesis"
      },
      {
        title: "Surveillance, Risk Prediction & Modeling",
        subtitle: "Ethical use of AI in planning and conducting public health research and population risk modeling.",
        badge: "Risk Modeling"
      },
      {
        title: "Ethical Research Governance",
        subtitle: "Ensuring research methods respect privacy by design, transparency, and human-in-the-loop oversight.",
        badge: "Human Oversight"
      }
    ]
  },
  academy: {
    number: "05",
    tag: "Workforce Training",
    title: "Workforce Academy: University In The Box",
    href: "/courses",
    philosophy: "Deploying institutional-grade public health and practical AI education directly to local health units, community organizations, and academic programs across Canada.",
    metrics: "5 Practical Tracks • Applied Sandboxes • Micro-Credentials",
    highlights: [
      {
        title: "Epidemiology & Health Promotion",
        subtitle: "Foundational and advanced methods in disease tracking, SDOH analysis, and intervention design.",
        badge: "Core Public Health"
      },
      {
        title: "Emergency Preparedness & Response",
        subtitle: "Crisis coordination, outbreak response workflows, and community recovery planning.",
        badge: "Emergency Track"
      },
      {
        title: "Practical AI & Automation",
        subtitle: "Generative AI, public health agents, automated reporting, and interactive dashboards.",
        badge: "AI Systems Track"
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
