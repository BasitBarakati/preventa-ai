"use client";

import { useSyncExternalStore } from "react";
import { ArrowDown, Bot, CheckCircle2, LockKeyhole, Network, ShieldCheck, UsersRound } from "lucide-react";
import HeroScene from "./HeroScene";
import GlowingButton from "./ui/GlowingButton";
import { openAssistant } from "./ui/FloatingChatHUD";
import { getPersonaServerSnapshot, getPersonaSnapshot, subscribeToPersona } from "@/lib/persona-store";

const personaCopy: Record<string, string> = {
  Individual: "See everyday wellbeing more clearly and turn reflection into realistic next steps.",
  Community: "Organize community strengths, needs, services, equity considerations, and shared priorities.",
  "Public Health Professional": "Bring assessment, approved evidence, implementation support, and learning into one accountable workflow.",
  Researcher: "Accelerate evidence work and responsible modelling while preserving source traceability and human verification.",
  Organization: "Understand workforce conditions, readiness, governance, and the practical path to responsible implementation.",
};

export default function PersonaHero() {
  const persona = useSyncExternalStore(subscribeToPersona, getPersonaSnapshot, getPersonaServerSnapshot);

  return (
    <section className="lux-hero hero" id="top">
      <div className="lux-hero__grid" aria-hidden="true" />
      <div className="lux-hero__aura" aria-hidden="true" />
      <div className="container lux-hero__layout">
        <div className="lux-hero__copy">
          <p className="lux-eyebrow"><span /> RESPONSIBLE AI · HUMAN OVERSIGHT · PUBLIC HEALTH</p>
          <h1>Architecting the Future of <em>Equitable, AI-Driven</em> Public Health.</h1>
          <p className="lux-hero__lead">An integrated ecosystem combining population health, artificial intelligence, research, education, and culturally safe frameworks to transform evidence into responsible action.</p>
          <div className="persona-context"><span>For {persona}</span><p>{personaCopy[persona]}</p></div>
          <div className="lux-hero__actions"><GlowingButton href="#assessment">Explore the ecosystem <ArrowDown size={17} /></GlowingButton><GlowingButton variant="secondary" onClick={openAssistant}>Ask the AI assistant <Bot size={17} /></GlowingButton></div>
          <p className="hero-assurance"><ShieldCheck size={17} /> Evidence-grounded support. Visible limitations. People remain accountable.</p>
        </div>
        <div className="lux-hero__scene">
          <div className="hero-scene" role="img" aria-label="A connected public-health intelligence network with five platform nodes"><HeroScene /></div>
          <div className="scene-caption"><span>PREVENTA INTELLIGENCE LAYER</span><strong>Signals → evidence → decisions → action</strong></div>
        </div>
      </div>
      <div className="container hero-metrics" aria-label="Platform scope and governance">
        <div><Network /><strong>6</strong><span>wellbeing domains</span></div>
        <div><UsersRound /><strong>4</strong><span>primary audience groups</span></div>
        <div><CheckCircle2 /><strong>OCAP®</strong><span>principles inform governance</span></div>
        <div><LockKeyhole /><strong>Private</strong><span>by-design public preview</span></div>
      </div>
    </section>
  );
}
