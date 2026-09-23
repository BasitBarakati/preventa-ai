"use client";

import { useState } from "react";
import { 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Activity, 
  Users, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  Sliders, 
  ExternalLink,
  BookOpen,
  Info,
  Check,
  Share2,
  Download,
  AlertCircle
} from "lucide-react";

type Scenario = {
  id: string;
  title: string;
  badge: string;
  category: string;
  prompt: string;
  synthesis: {
    lead: string;
    citations: Array<{
      id: string;
      code: string;
      title: string;
      source: string;
      year: string;
      rating: string;
      excerpt: string;
    }>;
  };
  logicModel: {
    inputs: string[];
    activities: string[];
    outputs: string[];
    outcomes: string[];
  };
};

const scenarios: Scenario[] = [
  {
    id: "youth-mental-health",
    title: "Northern & Remote Youth Mental Health",
    badge: "First Nations & Rural",
    category: "Mental Wellbeing & Cultural Safety",
    prompt: "Generate an evidence-informed mental health promotion strategy for youth in northern Ontario remote communities, grounded in cultural connectedness and OCAP® protocols.",
    synthesis: {
      lead: "Synthesizing multi-level social determinants of health across remote geography. Preventa AI correlates land-based healing, peer mentorship circles, and mobile tele-counseling with verified Canadian youth resilience indicators.",
      citations: [
        {
          id: "cit-1",
          code: "FNHA-2022",
          title: "First Nations Mental Wellness Continuum Framework",
          source: "National Collaborating Centre for Indigenous Health & Assembly of First Nations",
          year: "2022",
          rating: "Grade A: Community-Validated Framework",
          excerpt: "Cultural connectedness, identity affirmation, and Elder-led land activities provide up to 48% protective buffering against acute youth distress in remote communities."
        },
        {
          id: "cit-2",
          code: "CIHR-CAN-2024",
          title: "Interventions for Rural and Remote Youth Wellbeing",
          source: "Canadian Institutes of Health Research (CIHR)",
          year: "2024",
          rating: "High Certainty Meta-Synthesis",
          excerpt: "Hybrid models pairing community-held tele-support with continuous local youth navigation yield 3.4x higher 6-month retention compared to fly-in crisis models."
        },
        {
          id: "cit-3",
          code: "OTTAWA-CH-§3",
          title: "Strengthening Community Action",
          source: "Ottawa Charter for Health Promotion (WHO / Health Canada)",
          year: "1986/2021",
          rating: "Foundational Health Promotion Standard",
          excerpt: "Health promotion works through concrete and effective community action in setting priorities, making decisions, planning strategies and implementing them."
        }
      ]
    },
    logicModel: {
      inputs: [
        "Community Elder & Youth Advisory Council",
        "Local band council health infrastructure",
        "Encrypted local satellite uplink",
        "CIHR northern mental health evidence corpus"
      ],
      activities: [
        "Bi-weekly Elder-guided land-based workshops",
        "Youth digital peer-advocacy training track",
        "Low-bandwidth secure asynchronous counseling",
        "Community wellbeing indicator pulse surveys"
      ],
      outputs: [
        "120 youth engaged across 4 remote communities",
        "18 youth peer leaders trained in mental health first aid",
        "Zero data transferred off sovereign community servers"
      ],
      outcomes: [
        "Measurable increase in youth participation and cultural pride",
        "Reduced reliance on emergency crisis interventions",
        "Community-directed data governance under OCAP® protocols"
      ]
    }
  },
  {
    id: "respiratory-surveillance",
    title: "Urban Respiratory & Environmental SDOH",
    badge: "Air Quality & Chronic Disease",
    category: "Epidemiological Surveillance",
    prompt: "Design an early surveillance alert system for pediatric asthma flare-ups correlating PM2.5 industrial particulate with neighborhood socioeconomic vulnerability.",
    synthesis: {
      lead: "Synthesizing regional Air Quality Health Index (AQHI) trends and community vulnerability indices to support school and health unit preparedness before anticipated high-particulate air inversions.",
      citations: [
        {
          id: "cit-4",
          code: "HC-AQHI-2023",
          title: "Health Canada Air Quality Health Index Clinical Correlations",
          source: "Health Canada Environmental Health Directorate",
          year: "2023",
          rating: "Rigorous Cohort Surveillance",
          excerpt: "Sustained PM2.5 levels exceeding 25 ug/m3 correlate with a surge in pediatric emergency inhaler usage in high-density census tracts."
        },
        {
          id: "cit-5",
          code: "CTS-GUIDE-2024",
          title: "Canadian Thoracic Society Pediatric Asthma Consensus Guidelines",
          source: "Canadian Thoracic Society",
          year: "2024",
          rating: "Clinical Practice Guideline Level 1",
          excerpt: "Proactive school-based protocol adjustments before predicted atmospheric inversions reduce severe respiratory exacerbations."
        }
      ]
    },
    logicModel: {
      inputs: [
        "Public Air Quality Health Index (AQHI) surveillance feeds",
        "Aggregated de-identified district health profile data",
        "School board health and physical education coordinators"
      ],
      activities: [
        "Population health risk stratification across district postal codes",
        "Evidence-grounded action alerts drafted for school nurses & community health clinics",
        "Targeted indoor air quality protocols and clean air shelter plans"
      ],
      outputs: [
        "Advance advisory bulletins for vulnerable student populations",
        "School districts equipped with practical air-inversion protocol guides",
        "Zero individual student biometric or personal identifiable data collected"
      ],
      outcomes: [
        "Measurable decrease in acute school-day respiratory exacerbations",
        "Increased student participation through proactive indoor recess management",
        "Strengthened intersectoral coordination between public health and school boards"
      ]
    }
  },
  {
    id: "food-sovereignty",
    title: "Indigenous Food Sovereignty & Diabetes",
    badge: "Wholistic Chronic Disease",
    category: "Culturally Safe Nutrition",
    prompt: "Synthesize an intervention logic model targeting Type 2 diabetes reduction through traditional harvested food programs and Two-Eyed Seeing dietary support.",
    synthesis: {
      lead: "Synthesizing community harvest logistics with clinical glycemic markers. Preventa AI balances Western nutritional guidelines with Indigenous traditional food systems and community hunting protocols.",
      citations: [
        {
          id: "cit-6",
          code: "DC-CPG-2023",
          title: "Diabetes Canada Clinical Practice Guidelines for Indigenous Peoples",
          source: "Diabetes Canada & National Indigenous Diabetes Association",
          year: "2023",
          rating: "National Clinical Consensus",
          excerpt: "Re-introducing traditional wild game, fish, and berries into weekly diet reduces glycemic risk while strengthening cultural protective factors."
        },
        {
          id: "cit-7",
          code: "TWO-EYED-SEEING",
          title: "Etuaptmumk (Two-Eyed Seeing) in Population Health",
          source: "Institute for Integrative Science & Health (Mi'kmaw Elders)",
          year: "2021",
          rating: "Indigenous Knowledge Paradigm",
          excerpt: "Learning to see from one eye with the strengths of Indigenous knowledges, and from the other eye with the strengths of Western knowledges."
        }
      ]
    },
    logicModel: {
      inputs: [
        "Community Hunters & Harvesters Guild",
        "Local greenhouse & community cold-storage facility",
        "Band council health promotion team",
        "Point-of-care health literacy materials"
      ],
      activities: [
        "Seasonal harvest redistribution to Elders and vulnerable families",
        "Two-Eyed Seeing cooking & nutrition workshops",
        "Community-governed health records for glycemic monitoring"
      ],
      outputs: [
        "Community members receiving regular traditional harvest provisions",
        "100% adherence to OCAP® data governance protocols",
        "Community-curated traditional food and wellness repository"
      ],
      outcomes: [
        "Measurable improvement in community food security and traditional food access",
        "Strengthened cultural health practices and community sovereignty",
        "Long-term integration of Two-Eyed Seeing into diabetes prevention"
      ]
    }
  },
  {
    id: "harm-reduction",
    title: "Community Harm Reduction & Overdose Safety",
    badge: "Rapid Response & SDOH",
    category: "Substance Use Prevention",
    prompt: "Formulate a rapid-response public health strategy to counter unexpected toxic adulteration in municipal drug supply with street-level peer engagement.",
    synthesis: {
      lead: "Synthesizing public drug-checking surveillance bulletins with community outreach capacity to formulate proactive peer-led harm reduction pathways.",
      citations: [
        {
          id: "cit-8",
          code: "PHAC-CDSS-2024",
          title: "Canadian Drugs and Substances Strategy Implementation",
          source: "Public Health Agency of Canada (PHAC)",
          year: "2024",
          rating: "Federal Public Health Standard",
          excerpt: "Equipping street-level peer workers with real-time toxic alert notifications supports rapid intervention in affected census tracts."
        },
        {
          id: "cit-9",
          code: "BCCSU-2023",
          title: "Drug Checking and Secondary Harm Reduction Evaluation",
          source: "BC Centre on Substance Use",
          year: "2023",
          rating: "Epidemiological Longitudinal Cohort",
          excerpt: "Confidential, non-stigmatizing point-of-consumption chemical checking increases harm reduction uptake among vulnerable populations."
        }
      ]
    },
    logicModel: {
      inputs: [
        "Validated community drug-checking aggregate reports",
        "Public health unit harm reduction coordination team",
        "Frontline peer outreach network & community health workers"
      ],
      activities: [
        "Evidence-informed toxic alert drafts for peer outreach coordinators",
        "Rapid replenishment protocols for naloxone and test supplies",
        "Harm reduction resource mapping for community health centres"
      ],
      outputs: [
        "Rapid public health advisory dissemination to frontline teams",
        "Harm reduction supplies distributed through verified community partners",
        "Zero law-enforcement or punitive surveillance data sharing"
      ],
      outcomes: [
        "Increased peer worker engagement and timely crisis notification",
        "Higher uptake of point-of-care harm reduction services",
        "Restored trust and continuous collaboration with marginalized populations"
      ]
    }
  }
];

export default function InteractiveAIStudio() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("youth-mental-health");
  const [populationScale, setPopulationScale] = useState<number>(50000);
  const [ocapGateActive, setOcapGateActive] = useState<boolean>(true);
  const [selectedCitation, setSelectedCitation] = useState<any | null>(null);
  const [isSignedOff, setIsSignedOff] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"synthesis" | "logic-model" | "metrics">("synthesis");

  const scenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  const handleSignOff = () => {
    setIsSignedOff(true);
  };

  return (
    <div className="pt-4 pb-14 md:pt-6 md:pb-16 bg-[#FCFBF9] relative w-full" id="ai-studio">
      <div className="site-container max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-[11px] font-extrabold uppercase tracking-widest mb-4">
            <Sparkles size={13} />
            <span>Interactive Intelligence Engine</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#062235] tracking-tight leading-[1.1] mb-6">
            Transparent AI for <br />
            <span className="font-serif-italic font-normal text-[#0D9488]">
              Evidence-Informed Decisions.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#334155] font-normal leading-relaxed">
            Preventa AI never operates as an unverified black box. Explore our interactive studio below to see how Canadian epidemiological data, peer-reviewed citations, and First Nations OCAP® principles synthesize into actionable public health plans.
          </p>
        </div>

        {/* Studio Shell */}
        <div className="bg-white rounded-3xl border border-[#0B3D5F]/10 shadow-sm overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="p-4 sm:p-6 bg-[#062235] text-white border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/20 flex items-center justify-center text-[#14B8A6]">
                <Activity size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#14B8A6] block">
                  Public Health Decision Workbench
                </span>
                <span className="text-sm font-bold text-white">
                  Sovereign Canadian Evidence Kernel v4.2
                </span>
              </div>
            </div>

            {/* Interactive OCAP Gate & Population Scope */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <button
                type="button"
                onClick={() => setOcapGateActive(!ocapGateActive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  ocapGateActive
                    ? "bg-[#14B8A6]/20 border-[#14B8A6] text-[#14B8A6]"
                    : "bg-white/5 border-white/20 text-white/60"
                }`}
                title="Toggle OCAP Data Sovereignty Gate"
              >
                <Lock size={13} />
                <span className="font-bold">OCAP® Sovereign Gate:</span>
                <span className="uppercase font-mono text-[10px]">
                  {ocapGateActive ? "Enforced (On-Soil)" : "Standard Mode"}
                </span>
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/80">
                <Users size={13} className="text-[#C5A059]" />
                <span className="font-semibold">Jurisdiction Scale:</span>
                <span className="font-mono text-white font-bold">{populationScale.toLocaleString()} Citizens</span>
                <div className="hidden sm:flex items-center gap-1 ml-2 border-l border-white/10 pl-2">
                  {[
                    { label: "5K", val: 5000 },
                    { label: "50K", val: 50000 },
                    { label: "250K", val: 250000 },
                    { label: "1M", val: 1000000 },
                  ].map((p) => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setPopulationScale(p.val)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                        populationScale === p.val ? "bg-[#14B8A6] text-[#062235] font-bold" : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Selector Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#0B3D5F]/8 bg-[#FAF8F5]">
            {scenarios.map((sc) => {
              const isActive = sc.id === activeScenarioId;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    setActiveScenarioId(sc.id);
                    setIsSignedOff(false);
                    setSelectedCitation(null);
                  }}
                  className={`p-4 text-left transition-all cursor-pointer flex flex-col justify-between border-r border-[#0B3D5F]/6 last:border-r-0 ${
                    isActive
                      ? "bg-white border-b-2 border-b-[#0D9488] shadow-xs"
                      : "hover:bg-black/[0.02] text-[#64748B]"
                  }`}
                >
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider mb-1 ${isActive ? "text-[#0D9488]" : "text-[#94A3B8]"}`}>
                    {sc.badge}
                  </span>
                  <span className={`text-xs sm:text-sm font-bold leading-tight ${isActive ? "text-[#062235]" : "text-[#475569]"}`}>
                    {sc.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench Body */}
          <div className="p-6 sm:p-10">
            
            {/* Context Prompt Header */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8 mb-8 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#062235] text-white flex items-center justify-center shrink-0 mt-0.5">
                <FileText size={14} className="text-[#14B8A6]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488]">
                    Input Clinical Query &bull; {scenario.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#062235] italic">
                  &ldquo;{scenario.prompt}&rdquo;
                </p>
              </div>
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-[#0B3D5F]/8 pb-3 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab("synthesis")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === "synthesis"
                    ? "bg-[#062235] text-white"
                    : "text-[#64748B] hover:text-[#062235] hover:bg-black/[0.03]"
                }`}
              >
                1. AI Evidence Synthesis &amp; Linked Citations
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("logic-model")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === "logic-model"
                    ? "bg-[#062235] text-white"
                    : "text-[#64748B] hover:text-[#062235] hover:bg-black/[0.03]"
                }`}
              >
                2. Executable Ottawa Charter Logic Model
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("metrics")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === "metrics"
                    ? "bg-[#062235] text-white"
                    : "text-[#64748B] hover:text-[#062235] hover:bg-black/[0.03]"
                }`}
              >
                3. Assessment Outputs &amp; Human Sign-Off
              </button>
            </div>

            {/* TAB 1: Evidence Synthesis */}
            {activeTab === "synthesis" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] block mb-2">
                    Evidence Synthesis (With Traceable Public Health &amp; Policy Citations)
                  </span>
                  <p className="text-sm sm:text-base text-[#062235] leading-relaxed">
                    {scenario.synthesis.lead}
                  </p>
                </div>

                {/* Clickable Linked Evidence Pills (The Abridge Model) */}
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#062235] flex items-center gap-2">
                      <BookOpen size={14} className="text-[#0D9488]" />
                      Verified Canadian Peer-Reviewed Citations ({scenario.synthesis.citations.length})
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      Click any citation to inspect methodology
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {scenario.synthesis.citations.map((cit) => (
                      <button
                        key={cit.id}
                        type="button"
                        onClick={() => setSelectedCitation(cit)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedCitation?.id === cit.id
                            ? "bg-white border-[#0D9488] shadow-sm ring-2 ring-[#0D9488]/20"
                            : "bg-white/80 hover:bg-white border-[#0B3D5F]/10 hover:border-[#0D9488]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-[10px] font-bold text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded">
                            [{cit.code}]
                          </span>
                          <span className="text-[10.5px] font-mono text-[#94A3B8]">{cit.year}</span>
                        </div>
                        <span className="font-bold text-xs text-[#062235] block leading-snug line-clamp-1 mb-1">
                          {cit.title}
                        </span>
                        <span className="text-[11px] text-[#64748B] block truncate">
                          {cit.source}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Active Citation Inspection Drawer */}
                  {selectedCitation && (
                    <div className="mt-4 p-5 rounded-xl bg-white border border-[#0D9488]/30 shadow-xs animate-in fade-in duration-200">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#0D9488] uppercase block">
                            Evidence Inspector &bull; {selectedCitation.rating}
                          </span>
                          <h4 className="font-display text-base font-bold text-[#062235]">
                            {selectedCitation.title}
                          </h4>
                          <span className="text-xs text-[#64748B]">
                            Published by: {selectedCitation.source} ({selectedCitation.year})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedCitation(null)}
                          className="text-xs text-[#94A3B8] hover:text-[#062235] font-bold px-2 py-1"
                        >
                          Close &times;
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic bg-[#FAF8F5] p-3 rounded-lg border border-[#0B3D5F]/6">
                        &ldquo;{selectedCitation.excerpt}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Executable Logic Model */}
            {activeTab === "logic-model" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                    4-Stage Ottawa Charter Public Health Logic Model
                  </span>
                  <span className="text-[11px] font-mono text-[#0D9488]">
                    Aligned with PHAC Competency Framework
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Inputs */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#062235] block mb-2">
                      1. Target Inputs &amp; SDOH
                    </span>
                    <ul className="space-y-2 text-xs text-[#334155]">
                      {scenario.logicModel.inputs.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className="text-[#0D9488] font-bold">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Activities */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#062235] block mb-2">
                      2. Core Interventions
                    </span>
                    <ul className="space-y-2 text-xs text-[#334155]">
                      {scenario.logicModel.activities.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className="text-[#0A4D34] font-bold">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outputs */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#062235] block mb-2">
                      3. Concrete Outputs
                    </span>
                    <ul className="space-y-2 text-xs text-[#334155]">
                      {scenario.logicModel.outputs.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className="text-[#C5A059] font-bold">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes */}
                  <div className="p-4 rounded-2xl bg-[#062235] text-white border border-[#062235]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#14B8A6] block mb-2">
                      4. Community Outcomes
                    </span>
                    <ul className="space-y-2 text-xs text-white/90">
                      {scenario.logicModel.outcomes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className="text-[#14B8A6] font-bold">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Practical Assessment Outputs & Human Sign-Off */}
            {activeTab === "metrics" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#062235] block">
                      Practical Assessment Outputs &bull; File 2 Aligned
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      Auto-generated draft report and priority-setting matrix for municipal and community health teams
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#0D9488] bg-[#0D9488]/10 px-2.5 py-1 rounded-md">
                    Human Review Required
                  </span>
                </div>

                {/* Practical 3-Part Output Dossier */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Community Needs & Priorities */}
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0D9488] block mb-2">
                      01 &bull; Community Priorities &amp; Needs
                    </span>
                    <ul className="space-y-2 text-xs text-[#334155]">
                      <li className="flex items-start gap-1.5 leading-snug">
                        <span className="text-[#0D9488] font-bold">&bull;</span>
                        <span>Identified high-priority groups: remote youth, elders, and families facing socioeconomic barriers.</span>
                      </li>
                      <li className="flex items-start gap-1.5 leading-snug">
                        <span className="text-[#0D9488] font-bold">&bull;</span>
                        <span>Community-identified assets: Elder guidance circles, traditional food systems, local wellness workers.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Card 2: Priority-Setting Matrix */}
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A4D34] block mb-2">
                      02 &bull; Priority-Setting Matrix
                    </span>
                    <ul className="space-y-2 text-xs text-[#334155]">
                      <li className="flex items-start gap-1.5 leading-snug">
                        <span className="text-[#0A4D34] font-bold">&bull;</span>
                        <span><strong>Tier 1 (Immediate):</strong> Land-based wellness workshops &amp; local peer navigation.</span>
                      </li>
                      <li className="flex items-start gap-1.5 leading-snug">
                        <span className="text-[#0A4D34] font-bold">&bull;</span>
                        <span><strong>Tier 2 (6-Month):</strong> Asynchronous secure tele-support and community indicator tracking.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Card 3: Governance & OCAP Compliance */}
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C5A059] block mb-2">
                      03 &bull; Data Governance &amp; OCAP®
                    </span>
                    <ul className="space-y-2 text-xs text-[#334155]">
                      <li className="flex items-start gap-1.5 leading-snug">
                        <span className="text-[#C5A059] font-bold">&bull;</span>
                        <span>100% community data ownership; zero third-party commercial AI training.</span>
                      </li>
                      <li className="flex items-start gap-1.5 leading-snug">
                        <span className="text-[#C5A059] font-bold">&bull;</span>
                        <span>Local band council / health authority authorization required before any data integration.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Human-in-the-Loop Clinician Sign-Off Drawer */}
                <div className="p-6 rounded-2xl bg-[#062235] text-white border border-[#062235] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck size={16} className="text-[#14B8A6]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#14B8A6]">
                        Mandatory Human Oversight Checkpoint
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                      In compliance with Canadian healthcare privacy and public health governance standards, AI-generated synthesis requires verification by a designated public health officer or community health lead prior to deployment.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSignOff}
                    disabled={isSignedOff}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                      isSignedOff
                        ? "bg-[#14B8A6] text-[#062235]"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    <CheckCircle2 size={14} className={isSignedOff ? "text-[#062235]" : "text-[#14B8A6]"} />
                    <span>{isSignedOff ? "Authorized by Reviewer" : "Simulate Human Sign-Off"}</span>
                  </button>
                </div>

                {/* Practical Intended-Use Boundary Notice */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#0B3D5F]/6 text-[11px] text-[#64748B] leading-relaxed">
                  <strong>Notice of Intended Use:</strong> This interactive studio is an educational and workflow preview. Preventa AI does not provide individualized clinical advice or medical diagnosis. All population health syntheses are intended solely to support qualified health authorities, community elders, and researchers.
                </div>
              </div>
            )}

            {/* Executive Human-in-the-Loop Signoff Ribbon */}
            <div className="pt-8 mt-8 border-t border-[#0B3D5F]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  isSignedOff ? "bg-[#0A4D34] text-white" : "bg-[#FAF8F5] text-[#64748B] border border-[#0B3D5F]/10"
                }`}>
                  {isSignedOff ? <Check size={20} /> : <ShieldCheck size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#062235]">
                      Mandatory Human Oversight &amp; Audit Trail
                    </span>
                    {isSignedOff && (
                      <span className="px-2 py-0.5 rounded-full bg-[#0A4D34]/10 text-[#0A4D34] text-[10px] font-extrabold uppercase">
                        Signed &amp; Sealed
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#64748B] block">
                    {isSignedOff 
                      ? "Cryptographic SHA-256 seal: e8c74a9f... &bull; Approved for provincial/community rollout"
                      : "AI outputs require explicit executive review before deployment into public health policy."}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {!isSignedOff ? (
                  <button
                    type="button"
                    onClick={handleSignOff}
                    className="btn-primary !py-2.5 !px-6 text-xs font-bold w-full sm:w-auto cursor-pointer"
                  >
                    <span>Authorize as Executive Director</span>
                    <CheckCircle2 size={15} className="text-[#14B8A6]" />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => alert("Exporting verifiable logic model report to PDF/JSON...")}
                      className="btn-secondary !py-2 !px-4 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download size={13} />
                      <span>Export Plan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSignedOff(false)}
                      className="text-xs text-[#64748B] hover:text-[#062235] underline cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
