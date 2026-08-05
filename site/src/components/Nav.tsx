"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Bot, ClipboardCheck, Menu, UserRound, X } from "lucide-react";
import Logo from "./Logo";
import { openAssistant } from "./ui/FloatingChatHUD";
import { getPersonaServerSnapshot, getPersonaSnapshot, personas, setActivePersona, subscribeToPersona } from "@/lib/persona-store";

const pillarLinks = [
  ["Situation Assessment", "/platform/situation-assessment"],
  ["Health & AI", "/platform/health-and-ai-implementation"],
  ["Indigenous Health", "/indigenous-health"],
  ["Research", "/research"],
  ["Courses", "/courses"],
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const persona = useSyncExternalStore(subscribeToPersona, getPersonaSnapshot, getPersonaServerSnapshot);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const background = [document.querySelector<HTMLElement>("main"), document.querySelector<HTMLElement>(".site-footer"), document.querySelector<HTMLElement>(".chat-hud")];
    background.forEach((element) => { if (element) element.toggleAttribute("inert", open); });
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("menu-open"); background.forEach((element) => element?.removeAttribute("inert")); window.removeEventListener("keydown", onKey); };
  }, [open]);

  const changePersona = (value: string) => {
    setActivePersona(value);
  };
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="site-header__inner">
        <Link href="/" prefetch={false} className="nav-brand" aria-label="PREVENTA AI home" onClick={() => setOpen(false)}><Logo variant="symbol" priority /><span className="nav-brand__name">PREVENTA <small>AI</small></span></Link>
        <label className="persona-switcher"><span>I’m a</span><select value={persona} onChange={(event) => changePersona(event.target.value)} aria-label="Choose your Preventa AI pathway">{personas.map((item) => <option key={item}>{item}</option>)}</select></label>
        <nav className="desktop-nav pillar-nav" aria-label="Primary navigation">{pillarLinks.map(([label, href], index) => <Link key={href} href={href} prefetch={false} className={active(href) ? "is-active" : ""}><span>0{index + 1}</span>{label}</Link>)}</nav>
        <div className="nav-actions nav-actions--icons">
          <button type="button" onClick={openAssistant} aria-label="Open Public Health AI Assistant" title="Public Health AI Assistant"><Bot /></button>
          <Link href={pathname === "/" ? "#assessment" : "/#assessment"} aria-label="Request an assessment" title="Request an assessment"><ClipboardCheck /></Link>
          <Link href="/sign-in" prefetch={false} aria-label="Open profile and sign in" title="Profile"><UserRound /></Link>
        </div>
        <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
      </div>
      <div id="mobile-navigation" className={`mobile-nav ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          <label className="persona-switcher persona-switcher--mobile"><span>Your pathway</span><select value={persona} onChange={(event) => changePersona(event.target.value)}>{personas.map((item) => <option key={item}>{item}</option>)}</select></label>
          {pillarLinks.map(([label, href], index) => <Link key={href} href={href} prefetch={false} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</Link>)}
          <div className="mobile-nav__actions"><button type="button" className="glow-button glow-button--secondary" onClick={() => { setOpen(false); openAssistant(); }}><Bot size={17} /> AI Assistant</button><Link href="/#assessment" className="glow-button" onClick={() => setOpen(false)}><ClipboardCheck size={17} /> Assessment</Link></div>
          <div className="mobile-nav__utility"><Link href="/resources" onClick={() => setOpen(false)}>Resources</Link><Link href="/about" onClick={() => setOpen(false)}>About</Link><Link href="/sign-in" onClick={() => setOpen(false)}>Sign in</Link></div>
        </nav>
      </div>
    </header>
  );
}
