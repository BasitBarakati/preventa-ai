import { ArrowDown, CheckCircle2, ListChecks, LockKeyhole, Network } from "lucide-react";
import GlowingButton from "./ui/GlowingButton";

export default function Hero() {
  return (
    <section className="lux-section lux-hero hero" id="top">
      <div className="lux-hero__grid" aria-hidden="true" />
      <div className="lux-hero__aura" aria-hidden="true" />
      <div className="lux-hero__inner">
        <div className="container lux-hero__layout">
          <div className="lux-hero__copy">
            <p className="lux-eyebrow"><span /> WHO WE ARE</p>
            <h1>AI for <em>Better Public Health.</em></h1>
            <p className="lux-hero__lead">Preventa AI is a public-health technology initiative building responsible, human-overseen AI for equitable, accountable communities.</p>
            <div className="lux-hero__actions"><GlowingButton href="#about">Discover our mission <ArrowDown size={17} /></GlowingButton></div>
            <p className="hero-assurance"><CheckCircle2 size={17} /> Evidence-grounded. Human accountable. Privacy by design.</p>
          </div>
        </div>
        <div className="container hero-metrics" aria-label="Platform scope and governance">
          <div><Network /><strong>5</strong><span>programs offered</span></div>
          <div><ListChecks /><strong>7</strong><span>guiding principles</span></div>
          <div><CheckCircle2 /><strong>OCAP®</strong><span>principles inform governance</span></div>
          <div><LockKeyhole /><strong>Private</strong><span>by-design public preview</span></div>
        </div>
      </div>
    </section>
  );
}
