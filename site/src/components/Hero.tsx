"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Lock, 
  Landmark,
  Server,
  Users,
  GraduationCap,
  Cpu,
  Layers,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { brand } from "@/lib/site-content";

const neuralStreams = [
  {
    id: "biometrics",
    name: "01 · Personal Biometrics",
    tag: "Individual & Family",
    icon: Activity,
    color: "#0D9488",
    description: "Daily lifestyle, protective factors, and coping markers evaluated with zero server storage.",
    signal: "PHIPA Compliant • Local Memory Only"
  },
  {
    id: "sdoh",
    name: "02 · Community SDOH",
    tag: "Population Equity",
    icon: Layers,
    color: "#0A4D34",
    description: "Neighborhood census vulnerability, air quality (AQHI), and social determinants of health.",
    signal: "Ottawa Charter §3 Aligned"
  },
  {
    id: "ocap",
    name: "03 · Indigenous Sovereignty",
    tag: "OCAP® Enclave",
    icon: ShieldCheck,
    color: "#C5A059",
    description: "First Nations data ownership, Two-Eyed Seeing (Etuaptmumk), and non-extractive AI guarantees.",
    signal: "100% Community-Held Possession"
  },
  {
    id: "epi",
    name: "04 · Predictive Epidemiology",
    tag: "Early Warning",
    icon: Cpu,
    color: "#14B8A6",
    description: "48-hour advance outbreak modeling, wastewater surveillance, and automated literature synthesis.",
    signal: "Citations Peer-Reviewed"
  },
  {
    id: "workforce",
    name: "05 · Workforce Academy",
    tag: "Capacity Building",
    icon: GraduationCap,
    color: "#062235",
    description: "180+ hours of accredited curriculum and CME micro-credentials for frontline health workers.",
    signal: "Turnkey Health Unit Box"
  }
];

export default function Hero() {
  const [activeStreamId, setActiveStreamId] = useState<string>("ocap");
  const activeStream = neuralStreams.find(s => s.id === activeStreamId) || neuralStreams[2];
  const ActiveIcon = activeStream.icon;

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-36 overflow-hidden bg-mesh-hero border-b border-[#0B3D5F]/8 w-full max-w-[100vw]">
      
      {/* Subtle Ambient Radial Light Aura */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[750px] h-[500px] bg-gradient-to-tr from-[#0D9488]/10 via-[#14B8A6]/8 to-[#C5A059]/6 blur-[130px] pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="site-container max-w-6xl mx-auto">
        
        {/* Top Centered Executive Narrative */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          
          {/* Sovereign Canadian Authority Pill with Pulse */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0B3D5F]/12 shadow-2xs mb-8 transition-transform hover:scale-[1.01] max-w-[calc(100vw-3rem)] text-center">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]"></span>
            </span>
            <span className="text-[9.5px] sm:text-[11.5px] font-bold text-[#062235] tracking-wider uppercase">
              Canada&apos;s Sovereign Public Health AI Platform
            </span>
            <span className="text-[#94A3B8] text-xs hidden sm:inline" aria-hidden="true">&bull;</span>
            <span className="text-[9.5px] sm:text-[11.5px] font-semibold text-[#0D9488]">
              OCAP® &amp; PHIPA Aligned
            </span>
          </div>

          {/* Monumental Editorial Headline (Apple/SpaceX Precision) */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-[#062235] leading-[1.15] sm:leading-[1.06] mb-8">
            Empowering Health. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A4D34] via-[#0D9488] to-[#14B8A6] font-serif-italic font-normal">
              Strengthening
            </span>{" "}
            <br className="sm:hidden" />
            Communities.
          </h1>

          {/* Crystal Clear Executive Mandate */}
          <p className="text-base sm:text-xl md:text-2xl text-[#334155] leading-relaxed max-w-3xl mx-auto font-normal mb-10 px-2">
            {brand.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <a 
              href="#ai-studio" 
              className="btn-primary !py-4 !px-8 !text-[0.98rem] !rounded-xl group shadow-sm flex items-center gap-2"
            >
              <Sparkles size={18} className="text-[#14B8A6]" />
              <span>Launch Sovereign AI Studio</span>
              <ArrowRight size={16} className="text-[#14B8A6] transition-transform group-hover:translate-x-1" />
            </a>
            
            <Link 
              href="/contact" 
              className="btn-secondary !py-4 !px-8 !text-[0.98rem] !rounded-xl"
            >
              <span>Book Executive Briefing</span>
            </Link>
          </div>

          {/* Out-Of-The-Box: Interactive Sovereign Neural Biome Centerpiece */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-[#0B3D5F]/10 shadow-sm text-left max-w-4xl mx-auto mb-14 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#0B3D5F]/8 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0D9488] block">
                  Interactive Platform Biome
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#062235]">
                  Five Sovereign Streams Converging Into Preventa Core
                </h3>
              </div>
              <span className="text-[11px] text-[#64748B] font-mono">
                Click any stream to inspect telemetry
              </span>
            </div>

            {/* 5 Stream Nodes Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
              {neuralStreams.map((stream) => {
                const isSelected = stream.id === activeStreamId;
                const Icon = stream.icon;

                return (
                  <button
                    key={stream.id}
                    type="button"
                    onClick={() => setActiveStreamId(stream.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#062235] text-white border-[#062235] shadow-xs scale-[1.02]"
                        : "bg-[#FAF8F5] hover:bg-white border-[#0B3D5F]/8 text-[#475569]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9.5px] font-mono font-bold ${isSelected ? "text-[#14B8A6]" : "text-[#64748B]"}`}>
                        {stream.tag}
                      </span>
                      <Icon size={14} className={isSelected ? "text-[#14B8A6]" : "text-[#0A4D34]"} />
                    </div>
                    <span className={`text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-[#062235]"}`}>
                      {stream.name.split("·")[1]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Stream Telemetry Drawer */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#062235] text-white flex items-center justify-center shrink-0">
                  <ActiveIcon size={20} className="text-[#14B8A6]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-display text-sm font-bold text-[#062235]">
                      {activeStream.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#0D9488] bg-white px-2 py-0.5 rounded border border-[#0B3D5F]/6">
                      {activeStream.signal}
                    </span>
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    {activeStream.description}
                  </p>
                </div>
              </div>

              <a
                href="#platform"
                className="text-xs font-bold text-[#062235] hover:text-[#0D9488] flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>Inspect Architecture</span>
                <ChevronRight size={13} />
              </a>
            </div>

          </div>

          {/* Silicon Valley Grade Sovereign Telemetry HUD */}
          <div className="pt-10 border-t border-[#0B3D5F]/8 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#0B3D5F]/8 hover:border-[#0D9488]/30 transition-all shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-2xl font-extrabold text-[#062235]">100%</span>
                <Server size={18} className="text-[#0D9488]" />
              </div>
              <span className="block text-xs font-bold text-[#062235]">Sovereign Compute</span>
              <span className="block text-[11px] text-[#64748B]">Canadian Soil Residency (PHIPA)</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#0B3D5F]/8 hover:border-[#0D9488]/30 transition-all shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-2xl font-extrabold text-[#062235]">32</span>
                <Users size={18} className="text-[#0A4D34]" />
              </div>
              <span className="block text-xs font-bold text-[#062235]">Jurisdictions Modeled</span>
              <span className="block text-[11px] text-[#64748B]">First Nations OCAP® Enforced</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#0B3D5F]/8 hover:border-[#0D9488]/30 transition-all shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-2xl font-extrabold text-[#062235]">180h</span>
                <GraduationCap size={18} className="text-[#C5A059]" />
              </div>
              <span className="block text-xs font-bold text-[#062235]">Workforce Academy</span>
              <span className="block text-[11px] text-[#64748B]">CME &amp; Micro-Credentials</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#0B3D5F]/8 hover:border-[#0D9488]/30 transition-all shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-2xl font-extrabold text-[#062235]">$0</span>
                <ShieldCheck size={18} className="text-[#0D9488]" />
              </div>
              <span className="block text-xs font-bold text-[#062235]">Grassroots Subsidy</span>
              <span className="block text-[11px] text-[#64748B]">Zero Community Exclusion</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
