"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Lock, 
  Landmark,
  Radio,
  Server,
  Users,
  GraduationCap
} from "lucide-react";
import { brand } from "@/lib/site-content";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-mesh-hero border-b border-[#0B3D5F]/8">
      
      {/* Subtle Ambient Radial Light Aura */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#0D9488]/10 via-[#14B8A6]/8 to-[#C5A059]/5 blur-[120px] pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="site-container max-w-6xl mx-auto">
        
        {/* Top Centered Executive Narrative */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Sovereign Canadian Authority Pill with Pulse */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0B3D5F]/12 shadow-2xs mb-8 transition-transform hover:scale-[1.01]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]"></span>
            </span>
            <span className="text-[11.5px] font-bold text-[#062235] tracking-wider uppercase">
              Canada&apos;s Sovereign Public Health AI Platform
            </span>
            <span className="text-[#94A3B8] text-xs" aria-hidden="true">&bull;</span>
            <span className="text-[11.5px] font-semibold text-[#0D9488]">
              OCAP® &amp; PHIPA Aligned
            </span>
          </div>

          {/* Monumental Editorial Headline (Apple/SpaceX Precision) */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-[#062235] leading-[1.05] mb-8">
            Empowering Health. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A4D34] via-[#0D9488] to-[#14B8A6] font-serif-italic font-normal">
              Strengthening
            </span>{" "}
            Communities.
          </h1>

          {/* Crystal Clear Executive Mandate */}
          <p className="text-lg sm:text-2xl text-[#334155] leading-relaxed max-w-3xl mx-auto font-normal mb-12">
            {brand.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
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
