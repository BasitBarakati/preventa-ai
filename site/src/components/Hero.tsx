"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  GraduationCap,
  Cpu,
  ChevronDown
} from "lucide-react";
import { brand } from "@/lib/site-content";

export default function Hero() {
  return (
    <section className="relative pt-3 pb-10 md:pt-5 md:pb-12 overflow-hidden bg-mesh-hero w-full max-w-[100vw]">
      
      {/* Subtle Ambient Radial Light Aura */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[450px] bg-gradient-to-tr from-[#0D9488]/10 via-[#14B8A6]/8 to-[#C5A059]/6 blur-[120px] pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="site-container max-w-6xl mx-auto">
        
        {/* Top Centered Executive Narrative */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          
          {/* Sovereign Canadian Authority Pill with Pulse */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0B3D5F]/12 shadow-2xs mb-5 sm:mb-6 transition-transform hover:scale-[1.01] max-w-[calc(100vw-3rem)] text-center">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]"></span>
            </span>
            <span className="text-[9.5px] sm:text-[11.5px] font-bold text-[#062235] tracking-wider uppercase">
              Canada&apos;s Sovereign Public Health AI Platform
            </span>
            <span className="text-[#94A3B8] text-xs hidden sm:inline" aria-hidden="true">&bull;</span>
            <span className="text-[9.5px] sm:text-[11.5px] font-semibold text-[#0D9488]">
              OCAP® &amp; PHIPA Certified
            </span>
          </div>

          {/* Monumental Editorial Headline (Apple/SpaceX Precision) */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7.5xl font-extrabold tracking-tight text-[#062235] leading-[1.12] sm:leading-[1.04] mb-5 sm:mb-6">
            Empowering Health. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A4D34] via-[#0D9488] to-[#14B8A6] font-serif-italic font-normal">
              Strengthening
            </span>{" "}
            <br className="sm:hidden" />
            Communities.
          </h1>

          {/* Crystal Clear Executive Mandate: What We Do */}
          <p className="text-sm sm:text-lg md:text-xl text-[#334155] leading-relaxed max-w-3xl mx-auto font-normal mb-6 sm:mb-8 px-2">
            Canada&apos;s sovereign artificial intelligence infrastructure purpose-built for public health. We connect community data, clinical evidence, and frontline healthcare workers to stop chronic illnesses and infectious threats before they start.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <a 
              href="#mandate" 
              className="btn-primary !py-3 sm:!py-3.5 !px-6 sm:!px-7 !text-[0.9rem] sm:!text-[0.95rem] !rounded-xl group shadow-sm flex items-center gap-2"
            >
              <span>Explore What We Do</span>
              <ChevronDown size={15} className="text-[#14B8A6] transition-transform group-hover:translate-y-0.5" />
            </a>
            
            <Link 
              href="/contact" 
              className="btn-secondary !py-3 sm:!py-3.5 !px-6 sm:!px-7 !text-[0.9rem] sm:!text-[0.95rem] !rounded-xl"
            >
              <span>Book Executive Briefing</span>
            </Link>
          </div>

          {/* Minimalist 3-Pillar Architectural Triad: WHAT WE DO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-5xl mx-auto mb-8">
            
            {/* Pillar 1 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/85 backdrop-blur-md border border-[#0B3D5F]/10 shadow-2xs hover:border-[#0D9488]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mb-4">
                  <Activity size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#0D9488] block mb-1">
                  01 &bull; Surveillance &amp; Prevention
                </span>
                <h3 className="font-display text-lg font-bold text-[#062235] mb-2 leading-snug">
                  Predict &amp; Prevent Outbreaks
                </h3>
                <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                  Automated wastewater surveillance, microclimate telemetry, and Canadian peer-reviewed literature synthesis detecting disease clusters up to 48 hours earlier.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/85 backdrop-blur-md border border-[#0B3D5F]/10 shadow-2xs hover:border-[#0D9488]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0A4D34]/10 text-[#0A4D34] flex items-center justify-center mb-4">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#0A4D34] block mb-1">
                  02 &bull; Indigenous Sovereignty
                </span>
                <h3 className="font-display text-lg font-bold text-[#062235] mb-2 leading-snug">
                  Protect Community Data (OCAP®)
                </h3>
                <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                  First Nations OCAP®-enforced architecture and Two-Eyed Seeing. Communities retain 100% ownership, control, and possession with zero commercial AI training.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/85 backdrop-blur-md border border-[#0B3D5F]/10 shadow-2xs hover:border-[#0D9488]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 text-[#9E7B34] flex items-center justify-center mb-4">
                  <GraduationCap size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#9E7B34] block mb-1">
                  03 &bull; Capacity Building
                </span>
                <h3 className="font-display text-lg font-bold text-[#062235] mb-2 leading-snug">
                  Train the Healthcare Workforce
                </h3>
                <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                  Turnkey &ldquo;University In The Box&rdquo; delivering 180+ hours of accredited CME/CE micro-credentials to health units, municipal nurses, and researchers.
                </p>
              </div>
            </div>

          </div>

          {/* Clean Sovereign Assurance Banner */}
          <div className="pt-6 border-t border-[#0B3D5F]/8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#64748B] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              100% Canadian Soil Cloud Residency
            </span>
            <span className="hidden sm:inline text-slate-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A4D34]" />
              32 Public Health Jurisdictions Modeled
            </span>
            <span className="hidden sm:inline text-slate-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              100% Grassroots Community Subsidy ($0)
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
