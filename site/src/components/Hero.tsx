"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Lock, 
  Landmark
} from "lucide-react";
import { brand } from "@/lib/site-content";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-mesh-hero border-b border-[#0B3D5F]/6">
      <div className="site-container max-w-6xl mx-auto">
        
        {/* Top Centered Executive Narrative */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Sovereign Canadian Authority Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#0B3D5F]/10 shadow-2xs mb-8 transition-transform hover:scale-[1.01]">
            <span className="text-red-500 text-sm" aria-hidden="true">🍁</span>
            <span className="text-[11.5px] font-bold text-[#062235] uppercase tracking-wider">
              Canada&apos;s Sovereign Public Health AI Platform
            </span>
            <span className="text-[#94A3B8] text-xs" aria-hidden="true">&bull;</span>
            <span className="text-[11.5px] font-semibold text-[#0D9488]">
              OCAP® &amp; PHIPA Aligned
            </span>
          </div>

          {/* Monumental Editorial Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-[#062235] leading-[1.06] mb-8">
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
              <span>Launch Interactive AI Studio</span>
              <ArrowRight size={16} className="text-[#14B8A6] transition-transform group-hover:translate-x-1" />
            </a>
            
            <Link 
              href="/contact" 
              className="btn-secondary !py-4 !px-8 !text-[0.98rem] !rounded-xl"
            >
              <span>Book Executive Consultation</span>
            </Link>
          </div>

          {/* Uncluttered Hairline Trust Strip */}
          <div className="pt-10 border-t border-[#0B3D5F]/8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#062235]/5 flex items-center justify-center text-[#0D9488] shrink-0">
                <ShieldCheck size={17} />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#062235]">First Nations OCAP®</span>
                <span className="block text-[11px] text-[#64748B]">Data Sovereignty Guaranteed</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#062235]/5 flex items-center justify-center text-[#C5A059] shrink-0">
                <Landmark size={17} />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#062235]">CPHA Aligned</span>
                <span className="block text-[11px] text-[#64748B]">Ottawa Charter Frameworks</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#062235]/5 flex items-center justify-center text-[#0A4D34] shrink-0">
                <Activity size={17} />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#062235]">PHAC Standards</span>
                <span className="block text-[11px] text-[#64748B]">Core Epidemiological Logic</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#062235]/5 flex items-center justify-center text-[#0B3D5F] shrink-0">
                <Lock size={17} />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#062235]">PHIPA &amp; PIPEDA</span>
                <span className="block text-[11px] text-[#64748B]">100% Canadian Soil Cloud</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
