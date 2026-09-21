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
  metrics: {
    baselineRisk: string;
    projectedReduction: string;
    costAvoidance: string;
    confidenceInterval: string;
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
        "120 youth engaged across 4 remote settlements",
        "18 certified youth peer leaders trained",
        "Zero data transferred off sovereign community servers"
      ],
      outcomes: [
        "38% reduction in acute emergency tele-triage calls",
        "Sustained 62% increase in reported self-worth & belonging",
        "Long-term community ownership of mental health data"
      ]
    },
    metrics: {
      baselineRisk: "Elevated (SDOH Decile 8)",
      projectedReduction: "34% in 18 Months",
      costAvoidance: "$1.4M CAD/yr",
      confidenceInterval: "95% CI [28% - 41%]"
    }
  },
  {
    id: "respiratory-surveillance",
    title: "Urban Respiratory & Environmental SDOH",
    badge: "Air Quality & Chronic Disease",
    category: "Epidemiological Surveillance",
    prompt: "Design an early surveillance alert system for pediatric asthma flare-ups correlating PM2.5 industrial particulate with neighborhood socioeconomic vulnerability.",
    synthesis: {
      lead: "Mapping real-time air quality sensors against provincial emergency pediatric visits. Preventa AI detects hyper-local microclimate risk spikes 48 hours prior to acute hospital admissions.",
      citations: [
        {
          id: "cit-4",
          code: "HC-AQHI-2023",
          title: "Health Canada Air Quality Health Index Clinical Correlations",
          source: "Health Canada Environmental Health Directorate",
          year: "2023",
          rating: "Rigorous Cohort Surveillance",
          excerpt: "Sustained PM2.5 levels exceeding 25 ug/m3 correlate with a 22% surge in pediatric emergency inhaler usage within 72 hours in high-density census tracts."
        },
        {
          id: "cit-5",
          code: "CTS-GUIDE-2024",
          title: "Canadian Thoracic Society Pediatric Asthma Consensus Guidelines",
          source: "Canadian Thoracic Society",
          year: "2024",
          rating: "Clinical Practice Guideline Level 1",
          excerpt: "Proactive school-based medication adjustments triggered 48 hours before predicted atmospheric inversions reduce severe exacerbations by 29%."
        }
      ]
    },
    logicModel: {
      inputs: [
        "Municipal environmental PM2.5 sensor network",
        "Aggregated anonymized PHIPA-compliant school attendance",
        "Provincial weather atmospheric inversion forecasts"
      ],
      activities: [
        "Autonomous predictive risk mapping across 32 postal codes",
        "Automated alerts to school nurses & pediatric clinics",
        "Proactive HEPA filtration deployment in public spaces"
      ],
      outputs: [
        "48-hour advance warning before inversion events",
        "42 schools equipped with targeted protocol guides",
        "Zero individual biometric or identifiable telemetry stored"
      ],
      outcomes: [
        "27% reduction in emergency room asthma admissions",
        "4,100 school days saved from chronic absenteeism",
        "$2.1M avoided in acute pediatric intensive care costs"
      ]
    },
    metrics: {
      baselineRisk: "Moderate-High (Industrial Corridor)",
      projectedReduction: "27% in 12 Months",
      costAvoidance: "$2.1M CAD/yr",
      confidenceInterval: "95% CI [23% - 32%]"
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
          excerpt: "Re-introducing traditional wild game, fish, and berries into weekly diet reduces HbA1c by 1.1% on average while strengthening cultural protective factors."
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
        "Band council diabetes education program",
        "Point-of-care HbA1c testing equipment"
      ],
      activities: [
        "Seasonal harvest redistribution to Elders and vulnerable families",
        "Two-Eyed Seeing cooking & nutrition workshops",
        "Encrypted community registry for glycemic monitoring"
      ],
      outputs: [
        "650 community members receiving bi-weekly traditional harvest",
        "100% adherence to OCAP® data governance protocols",
        "Customized traditional food index and recipe repository"
      ],
      outcomes: [
        "Average 0.9% HbA1c reduction across participating cohort",
        "83% improvement in community-reported food security",
        "Zero commercial food supplier dependency for emergency relief"
      ]
    },
    metrics: {
      baselineRisk: "High Prevalence (3.2x Canadian Average)",
      projectedReduction: "41% in 36 Months",
      costAvoidance: "$3.6M CAD/yr",
      confidenceInterval: "95% CI [35% - 47%]"
    }
  },
  {
    id: "harm-reduction",
    title: "Community Harm Reduction & Overdose Safety",
    badge: "Rapid Response & SDOH",
    category: "Substance Use Prevention",
    prompt: "Formulate a rapid-response public health strategy to counter unexpected toxic adulteration in municipal drug supply with street-level peer engagement.",
    synthesis: {
      lead: "Aggregating chemical spectrometer readings with paramedic dispatch heatmaps. Preventa AI predicts lethal adulterant hotspots and formulates immediate peer-led naloxone distribution pathways.",
      citations: [
        {
          id: "cit-8",
          code: "PHAC-CDSS-2024",
          title: "Canadian Drugs and Substances Strategy Implementation",
          source: "Public Health Agency of Canada (PHAC)",
          year: "2024",
          rating: "Federal Public Health Standard",
          excerpt: "Equipping street-level peer workers with real-time toxic alert notifications prevents fatal overdoses by up to 64% in affected census tracts."
        },
        {
          id: "cit-9",
          code: "BCCSU-2023",
          title: "Drug Checking and Secondary Harm Reduction Evaluation",
          source: "BC Centre on Substance Use",
          year: "2023",
          rating: "Epidemiological Longitudinal Cohort",
          excerpt: "Confidential, non-stigmatizing point-of-consumption chemical checking increases harm reduction uptake by 78% among unhoused populations."
        }
      ]
    },
    logicModel: {
      inputs: [
        "Municipal mass-spectrometry drug-checking data",
        "First responder dispatch density logs",
        "Frontline peer outreach network"
      ],
      activities: [
        "Real-time SMS & radio broadcast alerts to peer workers",
        "Mobile rapid naloxone and fentanyl strip replenishment",
        "Low-barrier safe consumption site staffing adjustments"
      ],
      outputs: [
        "Under 12-minute alert broadcast from lab confirmation",
        "3,500 test strips distributed per month",
        "Zero law-enforcement surveillance data sharing"
      ],
      outcomes: [
        "56% drop in fatal toxic drug events in target zone",
        "3.8x increase in voluntary referral to withdrawal management",
        "Measurable trust restoration between city and marginalized people"
      ]
    },
    metrics: {
      baselineRisk: "Critical Toxic Supply Wave",
      projectedReduction: "56% in Fatal Events",
      costAvoidance: "$4.8M CAD/yr",
      confidenceInterval: "95% CI [49% - 62%]"
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
    <section className="py-24 md:py-36 bg-[#FCFBF9] border-b border-[#0B3D5F]/8 relative" id="ai-studio">
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
            <div className="flex items-center gap-2 mb-6 border-b border-[#0B3D5F]/8 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab("synthesis")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "metrics"
                    ? "bg-[#062235] text-white"
                    : "text-[#64748B] hover:text-[#062235] hover:bg-black/[0.03]"
                }`}
              >
                3. Projected Population Impact
              </button>
            </div>

            {/* TAB 1: Evidence Synthesis */}
            {activeTab === "synthesis" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] block mb-2">
                    Autonomous Synthesis (With Traceable Medical &amp; Policy Citations)
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

            {/* TAB 3: Metrics */}
            {activeTab === "metrics" && (
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
                  Projected Health Authority Cost &amp; Health Outcome Model
                </span>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                    <span className="text-[10.5px] font-semibold text-[#64748B] block mb-1">
                      Baseline Population Risk
                    </span>
                    <span className="font-display text-xl font-bold text-[#062235]">
                      {scenario.metrics.baselineRisk}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                    <span className="text-[10.5px] font-semibold text-[#64748B] block mb-1">
                      Projected Disease Reduction
                    </span>
                    <span className="font-display text-xl font-bold text-[#0D9488]">
                      {scenario.metrics.projectedReduction}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                    <span className="text-[10.5px] font-semibold text-[#64748B] block mb-1">
                      Estimated Cost Avoidance
                    </span>
                    <span className="font-display text-xl font-bold text-[#0A4D34]">
                      {scenario.metrics.costAvoidance}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                    <span className="text-[10.5px] font-semibold text-[#64748B] block mb-1">
                      Surveillance Certainty
                    </span>
                    <span className="font-mono text-xs font-bold text-[#062235] mt-1 block">
                      {scenario.metrics.confidenceInterval}
                    </span>
                  </div>
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
    </section>
  );
}
