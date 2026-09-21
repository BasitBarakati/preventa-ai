"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Users, 
  CheckCircle2, 
  Lock, 
  Cpu, 
  GraduationCap,
  Layers,
  ChevronRight
} from "lucide-react";
import { brand } from "@/lib/site-content";

const continuumNodes = [
  {
    id: "assess",
    number: "01",
    label: "Situation Assessment",
    badge: "Multilevel Diagnostics",
    icon: Activity,
    summary: "Systematic diagnostics connecting individual biometrics, community equity scans, and institutional readiness.",
    href: "/#platform",
  },
  {
    id: "domains",
    number: "02",
    label: "Health & Wellbeing",
    badge: "8 Priority Areas",
    icon: Layers,
    summary: "Evidence-informed intervention pathways spanning mental health, environmental health, and harm reduction.",
    href: "/#platform",
  },
  {
    id: "indigenous",
    number: "03",
    label: "Indigenous Health",
    badge: "OCAP® Sovereignty",
    icon: ShieldCheck,
    summary: "Grounded in First Nations data sovereignty, Two-Eyed Seeing (Etuaptmumk), and culturally safe co-design.",
    href: "/indigenous-health",
  },
  {
    id: "research",
    number: "04",
    label: "AI Research & Risk",
    badge: "Epidemiology",
    icon: Cpu,
    summary: "Predictive disease surveillance and automated literature synthesis with strict human clinical verification.",
    href: "/research",
  },
  {
    id: "academy",
    number: "05",
    label: "University In The Box",
    badge: "Workforce Learning",
    icon: GraduationCap,
    summary: "Six applied training tracks equipping public health professionals with accredited AI capabilities.",
    href: "/courses",
  },
];

export default function Hero() {
  const [activeNodeId, setActiveNodeId] = useState<string>("assess");
  const activeNode = continuumNodes.find(n => n.id === activeNodeId) || continuumNodes[0];
  const ActiveIcon = activeNode.icon;

  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden bg-mesh-hero border-b border-[#0B3D5F]/6">
      <div className="site-container">
        
        {/* Top Centered Executive Narrative */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          {/* Sovereign Canadian Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#0B3D5F]/10 shadow-2xs mb-8">
            <span className="text-red-500 text-sm">🍁</span>
            <span className="text-[11.5px] font-bold text-[#062235] uppercase tracking-wider">
              Canada&apos;s Public Health AI Infrastructure
            </span>
            <span className="text-[#94A3B8] text-xs">|</span>
            <span className="text-[11.5px] font-semibold text-[#0D9488]">
              OCAP® &amp; PHIPA Aligned
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#062235] leading-[1.08] mb-6">
            Empowering Health. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A4D34] via-[#0D9488] to-[#14B8A6] italic font-normal">
              Strengthening
            </span>{" "}
            Communities.
          </h1>

          {/* Vision & Mission Subtitle */}
          <p className="text-lg sm:text-2xl text-[#334155] leading-relaxed max-w-3xl mx-auto font-normal mb-10">
            {brand.subheadline}
          </p>

          {/* Uncluttered Clear Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/#platform" 
              className="btn-primary !py-3.5 !px-8 !text-[0.95rem] !rounded-xl group shadow-sm"
            >
              <span>Explore Platform Architecture</span>
              <ArrowRight size={16} className="text-[#14B8A6] transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link 
              href="/contact" 
              className="btn-secondary !py-3.5 !px-8 !text-[0.95rem] !rounded-xl"
            >
              <span>Book Executive Consultation</span>
            </Link>
          </div>
        </div>

        {/* The Health Intelligence Continuum (Interactive Architectural Centerpiece) */}
        <div className="max-w-5xl mx-auto card-executive p-6 sm:p-8 lg:p-10 border border-[#0B3D5F]/10 shadow-sm bg-white/95">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0B3D5F]/8 mb-8">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0D9488] block mb-1">
                The Integrated Architecture
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#062235]">
                Five Connected Programs for Population Transformation
              </h3>
            </div>
            <span className="text-xs text-[#64748B] font-medium hidden md:block">
              Click any pillar to inspect its capabilities
            </span>
          </div>

          {/* 5 Continuum Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {continuumNodes.map((node) => {
              const isSelected = activeNodeId === node.id;
              const Icon = node.icon;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#062235] text-white border-[#062235] shadow-md scale-[1.02]"
                      : "bg-[#FAF8F5] hover:bg-white border-[#0B3D5F]/8 hover:border-[#0B3D5F]/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold ${isSelected ? "text-[#14B8A6]" : "text-[#64748B]"}`}>
                      {node.number}
                    </span>
                    <Icon size={18} className={isSelected ? "text-[#14B8A6]" : "text-[#0A4D34]"} />
                  </div>
                  <div className={`text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-[#062235]"}`}>
                    {node.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Card */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#062235] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <ActiveIcon size={24} className="text-[#14B8A6]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-pill badge-teal text-[10px] font-bold">
                    {activeNode.badge}
                  </span>
                  <span className="text-xs text-[#64748B]">Pillar {activeNode.number} of 05</span>
                </div>
                <h4 className="font-display text-lg font-bold text-[#062235] mb-1">
                  {activeNode.label}
                </h4>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-2xl">
                  {activeNode.summary}
                </p>
              </div>
            </div>

            <Link
              href={activeNode.href}
              className="btn-primary !py-2.5 !px-5 text-xs font-bold whitespace-nowrap shrink-0"
            >
              <span>Explore Pillar</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
