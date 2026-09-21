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
  BarChart3, 
  FileText,
  ChevronRight,
  TrendingUp,
  MapPin
} from "lucide-react";
import { brand } from "@/lib/site-content";

type CockpitMode = "stratification" | "copilot" | "ocap";

export default function Hero() {
  const [activeMode, setActiveMode] = useState<CockpitMode>("stratification");
  const [activeRegion, setActiveRegion] = useState<string>("Northern Health Unit");

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-mesh-hero border-b border-[#0B3D5F]/8">
      {/* Background Radiant Mesh Ambient Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#1F8A8A]/12 via-[#E8A87C]/10 to-[#7FB069]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#C5A059]/6 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="site-container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Core Value Proposition & Institutional Authority */}
          <div className="flex-1 text-center lg:text-left">
            {/* National & Governance Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-[#0B3D5F]/12 shadow-xs mb-6 backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1F8A8A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1F8A8A]"></span>
              </span>
              <span className="text-[11.5px] font-extrabold text-[#0B3D5F] uppercase tracking-wider">
                Public Health AI &bull; Canada
              </span>
              <span className="text-[#5D7185]/40 text-xs">|</span>
              <span className="text-[11.5px] font-bold text-[#8C6D27] flex items-center gap-1">
                <ShieldCheck size={14} className="text-[#C5A059]" /> First Nations OCAP® &amp; PHIPA
              </span>
            </div>

            {/* Main Luxury Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.65rem] font-extrabold tracking-tight text-[#0B3D5F] leading-[1.1] mb-6">
              Empowering Health. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A4D34] via-[#1F8A8A] to-[#17B8C4] italic font-normal">
                Strengthening
              </span>{" "}
              Communities.
            </h1>

            {/* Sub-headline from File 2 */}
            <p className="text-lg sm:text-xl text-[#33485C] leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-normal">
              {brand.subheadline}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <Link 
                href="/#assessment-wizard" 
                className="btn-primary !bg-[#062235] hover:!bg-[#0B3D5F] !py-3.5 !px-7 !text-[0.98rem] !rounded-xl shadow-lg group"
              >
                <span>Launch Assessment Studio</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1 text-[#17B8C4]" />
              </Link>
              
              <Link 
                href="/#ai-copilot" 
                className="btn-secondary !py-3.5 !px-6 !text-[0.98rem] !rounded-xl hover:!border-[#1F8A8A] bg-white/90"
              >
                <Cpu size={18} className="text-[#1F8A8A]" />
                <span>Simulate AI Co-Pilot</span>
              </Link>
              
              <Link 
                href="/contact" 
                className="px-4 py-3 text-sm font-bold text-[#0B3D5F] hover:text-[#1F8A8A] transition-colors underline underline-offset-4"
              >
                Request Advisory Access
              </Link>
            </div>

            {/* Accredited Institutional Trust Strip */}
            <div className="pt-6 border-t border-[#0B3D5F]/10 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-[#536474] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#0A4D34]" />
                Human-in-the-Loop Oversight
              </span>
              <span className="flex items-center gap-1.5">
                <Lock size={15} className="text-[#1F8A8A]" />
                Canadian Sovereign Data Residency
              </span>
              <span className="flex items-center gap-1.5">
                <FileText size={15} className="text-[#C5A059]" />
                Ottawa Charter &amp; PHAC Aligned
              </span>
            </div>
          </div>

          {/* Right Column: High-End Live Health Intelligence Cockpit */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <div className="relative">
              
              {/* Cockpit Card Container */}
              <div className="glass-cockpit p-6 sm:p-7 relative z-10">
                
                {/* Cockpit Header with Mode Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#0B3D5F]/10 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#062235] text-white flex items-center justify-center shadow-sm">
                      <Activity size={20} className="text-[#17B8C4]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-extrabold text-[#0B3D5F] tracking-tight">
                          Public Health Intelligence Cockpit
                        </h3>
                        <span className="text-[10px] font-mono-data font-bold px-1.5 py-0.5 rounded bg-[#0A4D34]/10 text-[#0A4D34]">
                          v2.4
                        </span>
                      </div>
                      <p className="text-[11px] text-[#536474] font-mono-data">
                        Active Telemetry &bull; Canadian Jurisdiction
                      </p>
                    </div>
                  </div>

                  {/* Mode Navigation Tabs */}
                  <div className="flex items-center p-1 rounded-xl bg-[#FAF8F5] border border-[#0B3D5F]/10 text-xs font-semibold text-[#536474]">
                    <button
                      type="button"
                      onClick={() => setActiveMode("stratification")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeMode === "stratification"
                          ? "bg-white text-[#0B3D5F] shadow-xs font-bold"
                          : "hover:text-[#0B3D5F]"
                      }`}
                    >
                      Stratification
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMode("copilot")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeMode === "copilot"
                          ? "bg-white text-[#0B3D5F] shadow-xs font-bold"
                          : "hover:text-[#0B3D5F]"
                      }`}
                    >
                      Co-Pilot
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMode("ocap")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeMode === "ocap"
                          ? "bg-white text-[#0B3D5F] shadow-xs font-bold"
                          : "hover:text-[#0B3D5F]"
                      }`}
                    >
                      OCAP® Gate
                    </button>
                  </div>
                </div>

                {/* MODE 1: Population Risk & Equity Stratification */}
                {activeMode === "stratification" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Region Selector Ribbon */}
                    <div className="flex items-center justify-between bg-[#F2F5F8] p-2.5 rounded-xl border border-[#0B3D5F]/6 text-xs">
                      <div className="flex items-center gap-1.5 text-[#0B3D5F] font-bold">
                        <MapPin size={14} className="text-[#1F8A8A]" />
                        <span>Monitoring:</span>
                        <select 
                          value={activeRegion}
                          onChange={(e) => setActiveRegion(e.target.value)}
                          className="bg-transparent font-semibold text-[#0B3D5F] underline underline-offset-2 focus:outline-none cursor-pointer"
                        >
                          <option value="Northern Health Unit">Northern Health Unit (Ontario/Quebec)</option>
                          <option value="Atlantic Coastal District">Atlantic Coastal Health District</option>
                          <option value="Western Rural Health Region">Western Rural Health Region</option>
                        </select>
                      </div>
                      <span className="badge-pill badge-sage !text-[10px] !py-0.5">
                        Live Census Sync
                      </span>
                    </div>

                    {/* Stratification Metric Triad */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-2xl bg-white border border-[#0B3D5F]/8 shadow-xs">
                        <span className="text-[10.5px] font-bold text-[#536474] uppercase tracking-wider block mb-1">
                          Equity Index
                        </span>
                        <span className="text-xl font-extrabold text-[#0B3D5F] font-display">
                          91.8%
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-[#0A4D34] font-semibold mt-1">
                          <TrendingUp size={12} />
                          <span>+3.4% buffer</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-white border border-[#0B3D5F]/8 shadow-xs">
                        <span className="text-[10.5px] font-bold text-[#536474] uppercase tracking-wider block mb-1">
                          Active Clusters
                        </span>
                        <span className="text-xl font-extrabold text-[#1F8A8A] font-display">
                          3 Priorities
                        </span>
                        <span className="text-[10px] text-[#536474] font-medium block mt-1">
                          Youth mental health, sleep
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white border border-[#0B3D5F]/8 shadow-xs">
                        <span className="text-[10.5px] font-bold text-[#536474] uppercase tracking-wider block mb-1">
                          SDOH Readiness
                        </span>
                        <span className="text-xl font-extrabold text-[#8C6D27] font-display">
                          High (Tier 1)
                        </span>
                        <span className="text-[10px] text-[#536474] font-medium block mt-1">
                          Intervention ready
                        </span>
                      </div>
                    </div>

                    {/* Synthesized Population Intervention Plan */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF8F5] to-[#EBF3E7] border border-[#7FB069]/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles size={15} className="text-[#1F8A8A]" />
                          <span className="text-xs font-bold text-[#062235] uppercase tracking-wider">
                            Evidence-Informed Pathway
                          </span>
                        </div>
                        <span className="text-[10px] font-mono-data text-[#0A4D34] font-bold bg-white px-2 py-0.5 rounded border border-[#7FB069]/30">
                          Ottawa Charter Model
                        </span>
                      </div>
                      <p className="text-xs text-[#2C3E50] leading-relaxed">
                        &ldquo;Elevated stress biomarkers detected in multi-generational households. Recommended protocol: Culturally-grounded peer wellness circles paired with low-barrier physical activity incentives.&rdquo;
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-[#7FB069]/20 text-[#536474]">
                        <span>Reference: PHAC Healthy Living &amp; Chronic Prevention Index</span>
                        <Link href="/situation-assessment" className="font-bold text-[#1F8A8A] hover:underline flex items-center gap-0.5">
                          <span>View Full Stratification</span>
                          <ChevronRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODE 2: AI Co-Pilot Logic Model Simulator */}
                {activeMode === "copilot" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="p-3.5 rounded-2xl bg-[#061A29] text-white space-y-2.5">
                      <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                        <span className="font-mono text-[11px] text-[#17B8C4] flex items-center gap-1.5">
                          <Cpu size={14} /> query://intervention-synthesis
                        </span>
                        <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">
                          Latency: 142ms
                        </span>
                      </div>
                      <p className="text-xs font-mono text-white/90 leading-relaxed">
                        &gt; Synthesizing rural public health intervention for seasonal depression and substance harm reduction...
                      </p>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1 font-mono text-[11px]">
                        <div className="text-[#17B8C4] font-semibold">&bull; Logic Model: Inputs &rarr; Activities &rarr; Outcomes</div>
                        <div>&bull; Primary protective factor: Indigenous land-based healing</div>
                        <div>&bull; Secondary protective factor: Rapid Naloxone peer distribution</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#0B3D5F]/10 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#0A4D34] text-white flex items-center justify-center font-bold text-[10px]">
                          ✓
                        </div>
                        <span className="font-bold text-[#0B3D5F]">Human-in-the-Loop Gate Passed</span>
                      </div>
                      <span className="text-[#536474] font-mono text-[11px]">Epidemiologist Sign-off #849</span>
                    </div>
                  </div>
                )}

                {/* MODE 3: First Nations OCAP® Data Sovereignty Gate */}
                {activeMode === "ocap" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="p-4 rounded-2xl bg-[#FDF8F2] border border-[#C5A059]/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#8C6D27] uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck size={16} /> OCAP® Protocol Active
                        </span>
                        <span className="text-[10px] font-mono text-[#8C6D27] bg-white px-2 py-0.5 rounded border border-[#C5A059]/30 font-bold">
                          First Nations Ownership
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-white border border-[#C5A059]/20">
                          <span className="text-[10px] text-[#536474] block font-bold">Ownership</span>
                          <span className="font-bold text-[#062235]">Community-held</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#C5A059]/20">
                          <span className="text-[10px] text-[#536474] block font-bold">Control</span>
                          <span className="font-bold text-[#062235]">Band Council Consent</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#C5A059]/20">
                          <span className="text-[10px] text-[#536474] block font-bold">Access</span>
                          <span className="font-bold text-[#062235]">Role-based Token</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#C5A059]/20">
                          <span className="text-[10px] text-[#536474] block font-bold">Possession</span>
                          <span className="font-bold text-[#062235]">Canadian On-Soil Encrypted</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#536474] leading-relaxed">
                        Data never leaves Canadian sovereign boundaries. Algorithmic outputs respect Two-Eyed Seeing (Etuaptmumk) frameworks.
                      </p>
                    </div>
                  </div>
                )}

                {/* Cockpit Footer Status */}
                <div className="mt-4 pt-4 border-t border-[#0B3D5F]/8 flex items-center justify-between text-xs text-[#536474]">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-[#0B3D5F]" />
                    <span>Public health units &amp; communities co-governed</span>
                  </span>
                  <Link href="/indigenous-health" className="font-mono-data text-[11px] text-[#1F8A8A] font-bold hover:underline">
                    OCAP® Charter &rarr;
                  </Link>
                </div>
              </div>

              {/* Floating Decorative Badges */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#0B3D5F]/10 items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] text-[#0A4D34] flex items-center justify-center">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#062235]">
                    Indigenous Health Governance
                  </div>
                  <div className="text-[11px] text-[#536474]">
                    OCAP® &amp; Two-Eyed Seeing
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex absolute -top-5 -right-6 bg-white p-3 rounded-2xl shadow-xl border border-[#0B3D5F]/10 items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-xl bg-[#1F8A8A]/10 text-[#1F8A8A] flex items-center justify-center">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#062235]">
                    300+ Validated Indicators
                  </div>
                  <div className="text-[10px] text-[#536474]">
                    WHO / PHAC Indicator Bank
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
