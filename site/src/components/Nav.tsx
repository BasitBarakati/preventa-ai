"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  ["Who We Are", "/#top"],
  ["Our Purpose", "/#about"],
  ["Indigenous Health", "/#indigenous-health"],
  ["What We Do", "/#programs"],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const background = [document.querySelector<HTMLElement>("main"), document.querySelector<HTMLElement>(".site-footer")];
    background.forEach((element) => { if (element) element.toggleAttribute("inert", open); });
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("menu-open"); background.forEach((element) => element?.removeAttribute("inert")); window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="site-header__inner">
        <Link href="/#top" prefetch={false} className="nav-brand" aria-label="PREVENTA AI home" onClick={() => setOpen(false)}><Logo variant="symbol" priority /><span className="nav-brand__name">PREVENTA <small>AI</small></span></Link>
        <nav className="desktop-nav pillar-nav" aria-label="Primary navigation">{navLinks.map(([label, href], index) => <a key={href} href={href}><span>0{index + 1}</span>{label}</a>)}</nav>
        <div className="nav-actions nav-actions--icons">
          <Link href="/contact" aria-label="Contact Preventa AI" title="Contact"><Mail /></Link>
        </div>
        <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
      </div>
      <div id="mobile-navigation" className={`mobile-nav ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {navLinks.map(([label, href], index) => <a key={href} href={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>)}
          <div className="mobile-nav__utility"><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></div>
        </nav>
      </div>
    </header>
  );
}
